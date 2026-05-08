// Auth surface. Magic-link by default — no password to remember, no password
// to leak. We send a one-time link to the user's email, they tap it, the app
// opens via deep link, Supabase exchanges the code for a session, and we
// auto-pull their server data so cross-device recovery is one-click.

import * as Linking from 'expo-linking';
import { Session, User } from '@supabase/supabase-js';
import { getSupabase } from '@/lib/supabase';
import { useAppStore } from '@/store/useAppStore';
import { JournalItem } from '@/data/sample';

const REDIRECT = Linking.createURL('/auth-callback');

export async function sendMagicLink(email: string): Promise<{ error?: string }> {
  const sb = getSupabase();
  if (!sb) return { error: 'Backend not configured. Set EXPO_PUBLIC_SUPABASE_URL.' };
  const { error } = await sb.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: REDIRECT, shouldCreateUser: true },
  });
  return error ? { error: error.message } : {};
}

export async function getCurrentUser(): Promise<User | null> {
  const sb = getSupabase();
  if (!sb) return null;
  const { data } = await sb.auth.getSession();
  return data.session?.user ?? null;
}

export async function signOut() {
  const sb = getSupabase();
  if (!sb) return;
  await sb.auth.signOut();
  // Server data stays on the server. Local data stays on the device. Sign-out
  // simply forgets the session token.
}

export async function onSession(cb: (s: Session | null) => void) {
  const sb = getSupabase();
  if (!sb) return () => {};
  const { data } = sb.auth.onAuthStateChange((_, session) => cb(session));
  return () => data.subscription.unsubscribe();
}

// Pull-down: on sign-in we hydrate the local store from the server, so a new
// device walks back into the user's existing pregnancy journal.
export async function hydrateFromServer(): Promise<{ pulled: number }> {
  const sb = getSupabase();
  if (!sb) return { pulled: 0 };
  const { data: sess } = await sb.auth.getSession();
  const user = sess.session?.user;
  if (!user) return { pulled: 0 };

  // Profile
  const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).maybeSingle();
  if (profile) {
    useAppStore.getState().patchProfile({
      name: profile.name ?? undefined,
      stage: profile.stage ?? undefined,
      week: profile.week ?? undefined,
      conditions: profile.conditions ?? [],
      country: profile.country ?? undefined,
    });
  }

  // Journal — merge by id, server wins on conflict but we never drop local
  // entries that haven't synced yet.
  const { data: server } = await sb
    .from('journal_entries')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(500);

  if (server && server.length) {
    const local = useAppStore.getState().journal;
    const localById = new Map(local.map((e) => [e.id, e] as const));
    const merged: JournalItem[] = [];

    for (const row of server) {
      merged.push({
        id: row.id,
        week: row.week,
        name: row.name,
        label: row.label ?? row.name.toLowerCase().slice(0, 8),
        hue: (row.hue ?? 'amber') as JournalItem['hue'],
        verdict: row.verdict as JournalItem['verdict'],
        when: row.when_text ?? '',
      });
      localById.delete(row.id);
    }
    // Anything still in localById is local-only — keep it.
    for (const e of localById.values()) merged.push(e);

    useAppStore.setState({ journal: merged });
    return { pulled: server.length };
  }
  return { pulled: 0 };
}
