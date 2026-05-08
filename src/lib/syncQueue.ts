// Offline-first sync queue.
//
// Every mutation that needs to reach Supabase is appended here. On a fresh
// network connection we drain it; on app start we drain it; if a write fails
// we exponential-backoff and retry. The queue is persisted to AsyncStorage
// so it survives crashes and cold starts.

import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import {
  BagItem,
  BirthPlanState,
  Contraction,
  Kick,
  SymptomEntry,
  WeightEntry,
} from '@/store/useAppStore';
import { JournalItem } from '@/data/sample';
import { getSupabase } from '@/lib/supabase';

type Op =
  | { kind: 'journal.upsert'; entry: JournalItem }
  | { kind: 'journal.delete'; id: string }
  | { kind: 'profile.upsert'; profile: Record<string, unknown> }
  | { kind: 'kick.upsert'; kick: Kick }
  | { kind: 'contraction.upsert'; contraction: Contraction }
  | { kind: 'weight.upsert'; weight: WeightEntry }
  | { kind: 'symptom.upsert'; symptom: SymptomEntry }
  | { kind: 'bag.upsert'; item: BagItem }
  | { kind: 'birthplan.upsert'; plan: BirthPlanState };

type QueueItem = {
  id: string;
  attempts: number;
  nextAttemptAt: number;
  op: Op;
};

const QUEUE_KEY = 'marigold.outbox.v1';
const MAX_ATTEMPTS = 8;

let queue: QueueItem[] = [];
let hydrated = false;
let draining = false;
let online = true;
let listenersAttached = false;

async function load() {
  if (hydrated) return;
  try {
    const raw = await AsyncStorage.getItem(QUEUE_KEY);
    queue = raw ? (JSON.parse(raw) as QueueItem[]) : [];
  } catch {
    queue = [];
  }
  hydrated = true;
}

async function persist() {
  try {
    await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
  } catch {}
}

function backoffMs(attempt: number) {
  // 2s, 4s, 8s, 16s, 32s, 1m, 2m, 5m max
  return Math.min(5 * 60_000, 1000 * 2 ** Math.min(attempt, 8));
}

async function attachListeners() {
  if (listenersAttached) return;
  listenersAttached = true;
  NetInfo.addEventListener((s) => {
    const wasOffline = !online;
    online = !!s.isConnected;
    if (online && wasOffline) {
      drain().catch(() => {});
    }
  });
}

async function execOp(op: Op): Promise<boolean> {
  const sb = getSupabase();
  if (!sb) return false;
  const session = await sb.auth.getSession();
  const user = session.data.session?.user;
  if (!user) return false;

  switch (op.kind) {
    case 'journal.upsert': {
      const { entry } = op;
      const { error } = await sb.from('journal_entries').upsert({
        id: entry.id,
        user_id: user.id,
        week: entry.week,
        name: entry.name,
        label: entry.label,
        hue: entry.hue,
        verdict: entry.verdict,
        when_text: entry.when,
        created_at: new Date().toISOString(),
      });
      return !error;
    }
    case 'journal.delete': {
      const { error } = await sb.from('journal_entries').delete().eq('id', op.id).eq('user_id', user.id);
      return !error;
    }
    case 'profile.upsert': {
      const { error } = await sb.from('profiles').upsert({ id: user.id, ...op.profile });
      return !error;
    }
    case 'kick.upsert': {
      const { error } = await sb.from('kicks').upsert({
        id: op.kick.id,
        user_id: user.id,
        session_id: op.kick.sessionId,
        at: new Date(op.kick.at).toISOString(),
      });
      return !error;
    }
    case 'contraction.upsert': {
      const { error } = await sb.from('contractions').upsert({
        id: op.contraction.id,
        user_id: user.id,
        started_at: new Date(op.contraction.startedAt).toISOString(),
        ended_at: new Date(op.contraction.endedAt).toISOString(),
        intensity: op.contraction.intensity ?? null,
      });
      return !error;
    }
    case 'weight.upsert': {
      const { error } = await sb.from('weights').upsert({
        id: op.weight.id,
        user_id: user.id,
        week: op.weight.week,
        kg: op.weight.kg,
        at: new Date(op.weight.at).toISOString(),
        note: op.weight.note ?? null,
      });
      return !error;
    }
    case 'symptom.upsert': {
      const { error } = await sb.from('symptoms').upsert({
        id: op.symptom.id,
        user_id: user.id,
        at: new Date(op.symptom.at).toISOString(),
        week: op.symptom.week,
        mood: op.symptom.mood,
        nausea: op.symptom.nausea,
        sleep: op.symptom.sleep,
        cramps: op.symptom.cramps,
        energy: op.symptom.energy,
        note: op.symptom.note ?? null,
      });
      return !error;
    }
    case 'bag.upsert': {
      const { error } = await sb.from('bag_items').upsert({
        id: op.item.id,
        user_id: user.id,
        group_key: op.item.group,
        label: op.item.label,
        checked: op.item.checked,
        position: op.item.position,
        custom: op.item.custom ?? false,
        updated_at: new Date().toISOString(),
      });
      return !error;
    }
    case 'birthplan.upsert': {
      const { error } = await sb.from('birth_plan').upsert({
        user_id: user.id,
        fields: op.plan,
        updated_at: new Date().toISOString(),
      });
      return !error;
    }
  }
}

export async function enqueue(op: Op) {
  await load();
  await attachListeners();
  queue.push({
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    attempts: 0,
    nextAttemptAt: Date.now(),
    op,
  });
  await persist();
  drain().catch(() => {});
}

export async function drain() {
  if (draining) return;
  draining = true;
  try {
    await load();
    const sb = getSupabase();
    if (!sb) return;
    if (!online) return;
    const now = Date.now();
    const remaining: QueueItem[] = [];
    for (const item of queue) {
      if (item.nextAttemptAt > now) {
        remaining.push(item);
        continue;
      }
      const ok = await execOp(item.op);
      if (ok) continue;
      const attempts = item.attempts + 1;
      if (attempts >= MAX_ATTEMPTS) continue;
      remaining.push({ ...item, attempts, nextAttemptAt: Date.now() + backoffMs(attempts) });
    }
    queue = remaining;
    await persist();
  } finally {
    draining = false;
  }
}

export async function pendingCount(): Promise<number> {
  await load();
  return queue.length;
}

export async function clearQueue() {
  queue = [];
  await persist();
}

export async function bootSyncQueue() {
  await load();
  await attachListeners();
  drain().catch(() => {});
}
