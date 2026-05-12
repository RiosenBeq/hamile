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
import type { LangCode } from '@/i18n/translations';

export type Profile = {
  name: string;
  stage: 'ttc' | 'pregnant' | 'postpartum';
  week: number;
  conditions: string[];
  country: string;
  partnerLinked: boolean;
};

// One kick-counting session: when it started, how long it took, and how many
// movements were tapped. Anything above 10 is rare but kept honest.
export type KickSession = {
  id: string;
  startedAt: number; // ms since epoch
  endedAt: number; // ms since epoch
  count: number;
};

// One contraction: a single tap-and-hold. `gapSec` is the gap from the *start*
// of the previous contraction (or 0 for the first one in a session).
export type Contraction = {
  id: string;
  startedAt: number;
  durationSec: number;
  gapSec: number;
};

// A single health reading. We use a discriminated union so weight/bp/glucose
// keep their own shape — easier to render and to fill a doctor summary.
export type HealthLog =
  | {
      id: string;
      at: number;
      kind: 'weight';
      kg: number;
      note?: string;
    }
  | {
      id: string;
      at: number;
      kind: 'bp';
      systolic: number;
      diastolic: number;
      note?: string;
    }
  | {
      id: string;
      at: number;
      kind: 'glucose';
      mgdl: number;
      fasting?: boolean;
      note?: string;
    };

type State = {
  hydrated: boolean;
  onboarded: boolean;
  language: LangCode;
  profile: Profile;
  recents: RecentItem[];
  journal: JournalItem[];
  kickSessions: KickSession[];
  contractions: Contraction[];
  healthLogs: HealthLog[];
  setOnboarded: (v: boolean) => void;
  setLanguage: (l: LangCode) => void;
  patchProfile: (p: Partial<Profile>) => void;
  addJournalEntry: (entry: JournalItem) => void;
  addRecent: (item: RecentItem) => void;
  removeJournalEntry: (id: string) => void;
  addKickSession: (s: KickSession) => void;
  addContraction: (c: Contraction) => void;
  clearContractions: () => void;
  addHealthLog: (h: HealthLog) => void;
  removeHealthLog: (id: string) => void;
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
    (set, get) => ({
      hydrated: false,
      onboarded: false,
      language: 'en',
      profile: defaultProfile,
      recents: SAMPLE_RECENTS,
      journal: SAMPLE_JOURNAL,
      kickSessions: [],
      contractions: [],
      healthLogs: [],
      setOnboarded: (v) => set({ onboarded: v }),
      setLanguage: (l) => set({ language: l }),
      patchProfile: (p) => set((s) => ({ profile: { ...s.profile, ...p } })),
      addJournalEntry: (entry) => {
        set((s) => ({ journal: [entry, ...s.journal] }));
        syncJournalEntry(entry).catch(() => {});
      },
      addRecent: (item) =>
        set((s) => ({ recents: [item, ...s.recents].slice(0, 10) })),
      removeJournalEntry: (id) =>
        set((s) => ({ journal: s.journal.filter((j) => j.id !== id) })),
      addKickSession: (s) =>
        set((st) => ({ kickSessions: [s, ...st.kickSessions].slice(0, 50) })),
      addContraction: (c) =>
        set((st) => ({ contractions: [...st.contractions, c] })),
      clearContractions: () => set({ contractions: [] }),
      addHealthLog: (h) =>
        set((st) => ({ healthLogs: [h, ...st.healthLogs].slice(0, 200) })),
      removeHealthLog: (id) =>
        set((st) => ({ healthLogs: st.healthLogs.filter((h) => h.id !== id) })),
    }),
    {
      name: 'marigold-app-state',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state && (state.hydrated = true);
      },
    },
  ),
);
