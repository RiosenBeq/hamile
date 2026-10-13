// React hook exposing the live pregnancy status. Re-evaluates when the app
// returns to the foreground or the calendar day flips, so "Week 16, day 3"
// never goes stale on a phone that stays unlocked overnight.

import { useEffect, useMemo, useState } from 'react';
import { AppState } from 'react-native';
import { useAppStore } from '@/store/useAppStore';
import { dayKey, pregnancyStatus, PregnancyStatus } from '@/lib/pregnancy';

export function useToday(): string {
  const [key, setKey] = useState(dayKey());
  useEffect(() => {
    const sub = AppState.addEventListener('change', (s) => {
      if (s === 'active') setKey(dayKey());
    });
    // Also tick once a minute so a foregrounded app crosses midnight cleanly.
    const id = setInterval(() => setKey(dayKey()), 60_000);
    return () => {
      sub.remove();
      clearInterval(id);
    };
  }, []);
  return key;
}

export function usePregnancy(): PregnancyStatus | null {
  const dueDate = useAppStore((s) => s.profile.dueDate);
  const today = useToday();
  return useMemo(() => (dueDate ? pregnancyStatus(dueDate) : null), [dueDate, today]);
}
