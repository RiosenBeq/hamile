// Sync glue. The store calls into here for every mutation; we route the
// write into the offline-first outbox so it survives network drops.

import { JournalItem } from '@/data/sample';
import {
  BagItem,
  BirthPlanState,
  Contraction,
  Kick,
  SymptomEntry,
  WeightEntry,
} from '@/store/useAppStore';
import { enqueue, drain, bootSyncQueue, pendingCount, clearQueue } from '@/lib/syncQueue';

export const syncJournalEntry = (entry: JournalItem) =>
  enqueue({ kind: 'journal.upsert', entry });

export const syncJournalDelete = (id: string) =>
  enqueue({ kind: 'journal.delete', id });

export const syncProfile = (profile: Record<string, unknown>) =>
  enqueue({ kind: 'profile.upsert', profile });

export const syncKick = (kick: Kick) => enqueue({ kind: 'kick.upsert', kick });
export const syncContraction = (contraction: Contraction) =>
  enqueue({ kind: 'contraction.upsert', contraction });
export const syncWeight = (weight: WeightEntry) => enqueue({ kind: 'weight.upsert', weight });
export const syncSymptom = (symptom: SymptomEntry) => enqueue({ kind: 'symptom.upsert', symptom });
export const syncBagItem = (item: BagItem) => enqueue({ kind: 'bag.upsert', item });
export const syncBirthPlan = (plan: BirthPlanState) =>
  enqueue({ kind: 'birthplan.upsert', plan });

export const forceSync = drain;
export const bootSync = bootSyncQueue;
export const outboxCount = pendingCount;
export const clearOutbox = clearQueue;
