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

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  ts: number;
};

type State = {
  hydrated: boolean;
  onboarded: boolean;
  profile: Profile;
  recents: RecentItem[];
  journal: JournalItem[];
  chat: ChatMessage[];
  pendingPhoto: string | null;
  setOnboarded: (v: boolean) => void;
  patchProfile: (p: Partial<Profile>) => void;
  addJournalEntry: (entry: JournalItem) => void;
  addRecent: (item: RecentItem) => void;
  removeJournalEntry: (id: string) => void;
  appendChat: (msg: ChatMessage) => void;
  clearChat: () => void;
  setPendingPhoto: (b64: string | null) => void;
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
      profile: defaultProfile,
      recents: SAMPLE_RECENTS,
      journal: SAMPLE_JOURNAL,
      chat: [],
      pendingPhoto: null,
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
      appendChat: (msg) =>
        set((s) => ({ chat: [...s.chat, msg].slice(-50) })),
      clearChat: () => set({ chat: [] }),
      setPendingPhoto: (b64) => set({ pendingPhoto: b64 }),
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
