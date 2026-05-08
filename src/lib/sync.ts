// Optional background sync. Silent no-op when Supabase isn't configured.

import { JournalItem } from '@/data/sample';
import { getSupabase } from '@/lib/supabase';

export const syncJournalEntry = async (entry: JournalItem) => {
  const sb = getSupabase();
  if (!sb) return;
  const session = await sb.auth.getSession();
  const user = session.data.session?.user;
  if (!user) return;
  await sb.from('journal_entries').upsert({
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
};
