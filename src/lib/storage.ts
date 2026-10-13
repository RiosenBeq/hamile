// Resilient persistence for the app store.
//
// Everything a user records lives in one AsyncStorage key (written
// atomically by RNCAsyncStorage). On top of that this wrapper adds:
//
//  1. Write guard — nothing is written until the stored state has been read
//     back (hydrated). A write before hydration would replace the user's
//     data with empty defaults.
//  2. Rolling backup — a copy of the last good state is kept under
//     `<key>.bak` (refreshed at most every few minutes and whenever the app
//     goes to the background). If the main value is ever missing or
//     unreadable, we restore from the backup instead of starting empty.
//  3. Pre-migration snapshot — before an older schema version is migrated,
//     the raw value is copied to `<key>.v<version>` so nothing is lost even
//     if a migration has a bug.
//  4. Corrupt values are quarantined to `<key>.corrupt` rather than
//     silently overwritten.

import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState } from 'react-native';
import type { StateStorage } from 'zustand/middleware';

const BACKUP_EVERY_MS = 3 * 60 * 1000;

let writesEnabled = false;
let lastBackupAt = 0;
let lastValue: { name: string; value: string } | null = null;

const backupKey = (name: string) => `${name}.bak`;

function isValidState(raw: string | null): raw is string {
  if (!raw) return false;
  try {
    const parsed = JSON.parse(raw);
    return !!parsed && typeof parsed === 'object' && typeof parsed.state === 'object' && parsed.state !== null;
  } catch {
    return false;
  }
}

async function writeBackup(name: string, value: string) {
  try {
    await AsyncStorage.setItem(backupKey(name), value);
    lastBackupAt = Date.now();
  } catch {
    // best effort
  }
}

export const resilientStorage: StateStorage = {
  getItem: async (name) => {
    let primary: string | null = null;
    try {
      primary = await AsyncStorage.getItem(name);
    } catch {
      primary = null;
    }

    if (isValidState(primary)) {
      // Keep the raw value of an older schema before it gets migrated.
      try {
        const v = JSON.parse(primary).version ?? 0;
        if (typeof v === 'number' && v < STORE_VERSION) {
          const snapKey = `${name}.v${v}`;
          if (!(await AsyncStorage.getItem(snapKey))) await AsyncStorage.setItem(snapKey, primary);
        }
      } catch {}
      return primary;
    }

    // Main value missing or unreadable — fall back to the rolling backup.
    let backup: string | null = null;
    try {
      backup = await AsyncStorage.getItem(backupKey(name));
    } catch {
      backup = null;
    }
    if (primary !== null) {
      // Quarantine the unreadable value instead of overwriting it.
      try {
        await AsyncStorage.setItem(`${name}.corrupt`, primary);
      } catch {}
    }
    if (isValidState(backup)) return backup;
    return null;
  },

  setItem: async (name, value) => {
    if (!writesEnabled) return;
    lastValue = { name, value };
    await AsyncStorage.setItem(name, value);
    if (Date.now() - lastBackupAt > BACKUP_EVERY_MS) await writeBackup(name, value);
  },

  removeItem: async (name) => {
    await AsyncStorage.removeItem(name);
  },
};

/** Current persisted schema version (keep in sync with useAppStore). */
export const STORE_VERSION = 2;

/** Called once the store has finished reading state back from disk. */
export function enableWrites() {
  writesEnabled = true;
}

/** Refresh the backup copy now (e.g. when the app goes to the background). */
export async function flushBackup() {
  if (lastValue) await writeBackup(lastValue.name, lastValue.value);
}

let listening = false;
export function watchAppStateForBackup() {
  if (listening) return;
  listening = true;
  AppState.addEventListener('change', (s) => {
    if (s === 'background' || s === 'inactive') flushBackup().catch(() => {});
  });
}

/** Erase the main value and every backup copy (used by "Delete all my data"). */
export async function wipeAll(name: string) {
  const keys = await AsyncStorage.getAllKeys();
  await AsyncStorage.multiRemove(keys.filter((k) => k === name || k.startsWith(`${name}.`)));
}
