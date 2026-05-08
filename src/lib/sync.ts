// Sync glue. The store calls into here for every mutation; we route the
// write into the offline-first outbox so it survives network drops.

import { JournalItem } from '@/data/sample';
import { enqueue, drain, bootSyncQueue, pendingCount, clearQueue } from '@/lib/syncQueue';

export const syncJournalEntry = (entry: JournalItem) =>
  enqueue({ kind: 'journal.upsert', entry });

export const syncJournalDelete = (id: string) =>
  enqueue({ kind: 'journal.delete', id });

export const syncProfile = (profile: Record<string, unknown>) =>
  enqueue({ kind: 'profile.upsert', profile });

export const forceSync = drain;
export const bootSync = bootSyncQueue;
export const outboxCount = pendingCount;
export const clearOutbox = clearQueue;
