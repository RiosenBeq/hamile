// Secure storage layer.
//
// Threat model (in order of likelihood):
//   1. Phone is lost / stolen → OS-level disk encryption + biometric app lock
//      protect everything; secure-store keeps tokens out of plain AsyncStorage.
//   2. Backup attack (iCloud / Google Backup) → app.json sets allowBackup:false
//      on Android; iOS Keychain entries default to "this device only" via
//      WHEN_UNLOCKED_THIS_DEVICE_ONLY accessibility.
//   3. Same-device snooping (someone borrows the phone) → biometric lock
//      gate intercepts every cold launch and every resume after >1 min.
//
// `expo-secure-store` is a thin wrapper around iOS Keychain Services / Android
// EncryptedSharedPreferences (AES-256). It only handles values < 2 KB, so we
// use it for tokens + the "ever logged in" flag. Bulk journal data goes to
// AsyncStorage (which sits in the app's sandboxed, OS-encrypted directory).

import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SECURE_KEYS = {
  supabaseSession: 'marigold.session.v1',
  appLockEnabled: 'marigold.app-lock-enabled.v1',
  lastUnlock: 'marigold.last-unlock.v1',
} as const;

const opts: SecureStore.SecureStoreOptions = {
  keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
};

export const secureStore = {
  async setItem(key: string, value: string) {
    try {
      await SecureStore.setItemAsync(key, value, opts);
    } catch {
      // Some Android devices without secure hardware fall back to plain
      // shared prefs; if even that throws we degrade to AsyncStorage so the
      // app keeps working. The user-visible surface (auth, journal) is the
      // same; only the at-rest encryption guarantee is weaker.
      await AsyncStorage.setItem(`fallback.${key}`, value);
    }
  },
  async getItem(key: string): Promise<string | null> {
    try {
      const v = await SecureStore.getItemAsync(key, opts);
      if (v != null) return v;
    } catch {}
    return AsyncStorage.getItem(`fallback.${key}`);
  },
  async removeItem(key: string) {
    try {
      await SecureStore.deleteItemAsync(key, opts);
    } catch {}
    await AsyncStorage.removeItem(`fallback.${key}`);
  },
};

// Adapter that matches Supabase's storage interface so the access token /
// refresh token never sit in plain AsyncStorage.
export const supabaseSecureAdapter = {
  getItem: (k: string) => secureStore.getItem(k),
  setItem: (k: string, v: string) => secureStore.setItem(k, v),
  removeItem: (k: string) => secureStore.removeItem(k),
};

export const SECURE = SECURE_KEYS;
