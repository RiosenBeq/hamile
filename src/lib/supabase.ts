// Lazy Supabase client. We only construct it when env vars are present so the
// app boots cleanly with no backend wired up. Auth tokens are persisted via
// expo-secure-store (Keychain / Keystore) so they never sit in plain
// AsyncStorage — see src/lib/secureStorage.ts for the threat model.

import 'react-native-url-polyfill/auto';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { supabaseSecureAdapter } from '@/lib/secureStorage';

const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const anon = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

let client: SupabaseClient | null = null;

export const getSupabase = (): SupabaseClient | null => {
  if (!url || !anon) return null;
  if (client) return client;
  client = createClient(url, anon, {
    auth: {
      storage: supabaseSecureAdapter,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  });
  return client;
};

export const supabaseConfigured = (): boolean => Boolean(url && anon);
