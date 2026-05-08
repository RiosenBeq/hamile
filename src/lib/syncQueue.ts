// Offline-first sync queue.
//
// Every mutation that needs to reach Supabase is appended here. On a fresh
// network connection we drain it; on app start we drain it; if a write fails
// we exponential-backoff and retry. The queue is persisted to AsyncStorage
// so it survives crashes and cold starts.

import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { JournalItem } from '@/data/sample';
import { getSupabase } from '@/lib/supabase';

type Op =
  | { kind: 'journal.upsert'; entry: JournalItem }
  | { kind: 'journal.delete'; id: string }
  | { kind: 'profile.upsert'; profile: Record<string, unknown> };

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
  if (!sb) return false; // Backend not configured — keep retrying later in case
  // it's wired up.
  const session = await sb.auth.getSession();
  const user = session.data.session?.user;
  if (!user) return false; // Not signed in yet — flush will retry on next call.

  if (op.kind === 'journal.upsert') {
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
  if (op.kind === 'journal.delete') {
    const { error } = await sb.from('journal_entries').delete().eq('id', op.id).eq('user_id', user.id);
    return !error;
  }
  if (op.kind === 'profile.upsert') {
    const { error } = await sb.from('profiles').upsert({ id: user.id, ...op.profile });
    return !error;
  }
  return true;
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
      if (attempts >= MAX_ATTEMPTS) {
        // Drop after a long retry window — caller already wrote locally and
        // can re-trigger via "Force sync" in settings if they care.
        continue;
      }
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
