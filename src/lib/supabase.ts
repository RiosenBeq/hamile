// Lazy Supabase client. We only construct it when env vars are present so the
// app boots cleanly with no backend wired up.

import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const anon = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

let client: SupabaseClient | null = null;

export const getSupabase = (): SupabaseClient | null => {
  if (!url || !anon) return null;
  if (client) return client;
  client = createClient(url, anon, {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  });
  return client;
};

export const supabaseConfigured = (): boolean => Boolean(url && anon);
