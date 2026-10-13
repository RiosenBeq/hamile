// Manual backup. The user can export a single JSON file holding everything
// Marigold stores (except photos), and restore it on a new device via the
// file picker. There are no accounts, so this is the way to move phones.
//
// We embed a SHA-256 checksum keyed with a per-device secret
// (expo-secure-store). Restoring a file from another device is allowed —
// the checksum only tells us whether the same device's export was edited.

import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as Crypto from 'expo-crypto';
import * as DocumentPicker from 'expo-document-picker';
import { Platform } from 'react-native';
import { secureStore } from '@/lib/secureStorage';
import { useAppStore } from '@/store/useAppStore';

const BACKUP_KEY_NAME = 'marigold.backup-key.v1';
const BACKUP_VERSION = 2;

/** Persisted slices included in a backup. */
const KEYS = [
  'profile',
  'language',
  'languageSet',
  'onboarded',
  'journal',
  'recents',
  'kicks',
  'contractions',
  'weights',
  'symptoms',
  'bag',
  'birthPlan',
  'notifPrefs',
  'appointments',
  'diary',
  'waterByDay',
  'waterGoal',
  'pills',
  'pillLog',
  'kegel',
  'favoriteNames',
  'checklistDone',
  'safetyRecent',
  'safetySaved',
] as const;

type BackupShape = {
  v: number;
  exportedAt: string;
  data: Record<string, unknown>;
  checksum: string;
};

async function getOrCreateBackupKey(): Promise<string> {
  const existing = await secureStore.getItem(BACKUP_KEY_NAME);
  if (existing) return existing;
  const bytes = Crypto.getRandomBytes(32);
  const hex = Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  await secureStore.setItem(BACKUP_KEY_NAME, hex);
  return hex;
}

async function checksum(payload: object, key: string): Promise<string> {
  return Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, `${key}:${JSON.stringify(payload)}`);
}

export async function exportBackup(): Promise<{ uri: string; bytes: number } | { error: string }> {
  try {
    const state = useAppStore.getState() as unknown as Record<string, unknown>;
    const data = Object.fromEntries(KEYS.map((k) => [k, state[k]]));
    const key = await getOrCreateBackupKey();
    const payload = { v: BACKUP_VERSION, exportedAt: new Date().toISOString(), data };
    const full: BackupShape = { ...payload, checksum: await checksum(payload, key) };
    const json = JSON.stringify(full, null, 2);
    const fname = `marigold-backup-${new Date().toISOString().split('T')[0]}.json`;
    const uri = `${FileSystem.documentDirectory}${fname}`;
    await FileSystem.writeAsStringAsync(uri, json, { encoding: FileSystem.EncodingType.UTF8 });
    if (Platform.OS !== 'web' && (await Sharing.isAvailableAsync())) {
      await Sharing.shareAsync(uri, { mimeType: 'application/json', UTI: 'public.json', dialogTitle: 'Marigold backup' });
    }
    return { uri, bytes: json.length };
  } catch (e: any) {
    return { error: String(e?.message ?? e) };
  }
}

const byId = <T extends { id: string }>(a: T[] = [], b: T[] = []): T[] => {
  const m = new Map<string, T>();
  for (const x of a) m.set(x.id, x);
  for (const x of b) m.set(x.id, x);
  return Array.from(m.values());
};

export async function importBackup(): Promise<{ imported: number } | { error: string }> {
  try {
    const pick = await DocumentPicker.getDocumentAsync({ type: 'application/json', copyToCacheDirectory: true });
    if (pick.canceled || !pick.assets?.[0]) return { imported: 0 };
    const json = await FileSystem.readAsStringAsync(pick.assets[0].uri);
    const parsed = JSON.parse(json) as any;

    // v1 files only carried profile + journal + recents.
    const data: Record<string, any> =
      parsed?.v === 1 ? { profile: parsed.profile, journal: parsed.journal, recents: parsed.recents } : parsed?.data;
    if (!data || typeof data !== 'object') return { error: 'Unsupported backup file.' };

    const cur = useAppStore.getState() as any;
    const next: Record<string, unknown> = {};
    let imported = 0;
    for (const k of KEYS) {
      const incoming = data[k];
      if (incoming === undefined || incoming === null) continue;
      const existing = cur[k];
      if (Array.isArray(incoming) && Array.isArray(existing) && incoming.every((x: any) => x && typeof x.id === 'string')) {
        next[k] = byId(existing, incoming);
        imported += incoming.length;
      } else if (Array.isArray(incoming)) {
        next[k] = Array.from(new Set([...(existing ?? []), ...incoming]));
      } else if (typeof incoming === 'object' && typeof existing === 'object' && existing) {
        next[k] = { ...existing, ...incoming };
      } else {
        next[k] = incoming;
      }
    }
    useAppStore.setState(next as any);
    return { imported };
  } catch (e: any) {
    return { error: String(e?.message ?? e) };
  }
}
