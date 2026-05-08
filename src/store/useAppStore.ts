// Marigold app store. Offline-first by design — everything is cached in
// AsyncStorage and only synced to Supabase when env vars are present.

import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  JournalItem,
  RecentItem,
  SAMPLE_JOURNAL,
  SAMPLE_RECENTS,
  SAMPLE_USER,
} from '@/data/sample';
import { syncJournalEntry } from '@/lib/sync';

export type Profile = {
  name: string;
  stage: 'ttc' | 'pregnant' | 'postpartum';
  week: number;
  conditions: string[];
  country: string;
  partnerLinked: boolean;
};

type State = {
  hydrated: boolean;
  onboarded: boolean;
  profile: Profile;
  recents: RecentItem[];
  journal: JournalItem[];
  setOnboarded: (v: boolean) => void;
  patchProfile: (p: Partial<Profile>) => void;
  addJournalEntry: (entry: JournalItem) => void;
  addRecent: (item: RecentItem) => void;
  removeJournalEntry: (id: string) => void;
};

const defaultProfile: Profile = {
  name: SAMPLE_USER.name,
  stage: 'pregnant',
  week: SAMPLE_USER.week,
  conditions: [],
  country: SAMPLE_USER.country,
  partnerLinked: false,
};

export const useAppStore = create<State>()(
  persist(
    (set) => ({
      hydrated: false,
      onboarded: false,
      profile: defaultProfile,
      recents: SAMPLE_RECENTS,
      journal: SAMPLE_JOURNAL,
      setOnboarded: (v) => set({ onboarded: v }),
      patchProfile: (p) => set((s) => ({ profile: { ...s.profile, ...p } })),
      addJournalEntry: (entry) => {
        set((s) => ({ journal: [entry, ...s.journal] }));
        syncJournalEntry(entry).catch(() => {});
      },
      addRecent: (item) =>
        set((s) => ({ recents: [item, ...s.recents].slice(0, 10) })),
      removeJournalEntry: (id) =>
        set((s) => ({ journal: s.journal.filter((j) => j.id !== id) })),
    }),
    {
      name: 'marigold-app-state',
      storage: createJSONStorage(() => AsyncStorage),
      // Persist only the fields that should survive a relaunch. `hydrated`
      // must always start false on cold boot so the splash gate works.
      partialize: (s) => ({
        onboarded: s.onboarded,
        profile: s.profile,
        recents: s.recents,
        journal: s.journal,
      }),
    },
  ),
);

// Mark the store as hydrated via setState so subscribers re-render. Mutating
// `state.hydrated` directly inside `onRehydrateStorage` does NOT notify React,
// which left the splash screen stuck on cold start.
useAppStore.persist.onFinishHydration(() => {
  useAppStore.setState({ hydrated: true });
});

// If the persisted state is empty / first launch, hydration finishes
// synchronously before the listener is attached. Schedule a one-shot fallback.
if (useAppStore.persist.hasHydrated()) {
  useAppStore.setState({ hydrated: true });
}
