// Marigold app store. Offline-first by design — everything is cached in
// AsyncStorage and queued for Supabase sync via the outbox in lib/syncQueue.

import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  BAG_TEMPLATE,
  BagGroup,
  JournalItem,
  RecentItem,
  SAMPLE_JOURNAL,
  SAMPLE_RECENTS,
  SAMPLE_USER,
} from '@/data/sample';
import {
  syncBagItem,
  syncBirthPlan,
  syncContraction,
  syncJournalDelete,
  syncJournalEntry,
  syncKick,
  syncProfile,
  syncSymptom,
  syncWeight,
} from '@/lib/sync';

export type Profile = {
  name: string;
  stage: 'ttc' | 'pregnant' | 'postpartum';
  week: number;
  conditions: string[];
  country: string;
  partnerLinked: boolean;
  prePregnancyKg?: number;
  heightCm?: number;
};

export type Kick = { id: string; sessionId: string; at: number };
export type Contraction = {
  id: string;
  startedAt: number;
  endedAt: number;
  intensity?: 1 | 2 | 3 | 4 | 5;
};
export type WeightEntry = {
  id: string;
  week: number;
  kg: number;
  at: number;
  note?: string;
};
export type SymptomEntry = {
  id: string;
  at: number;
  week: number;
  mood: 1 | 2 | 3 | 4 | 5;
  nausea: 0 | 1 | 2 | 3;
  sleep: 1 | 2 | 3 | 4 | 5;
  cramps: 0 | 1 | 2 | 3;
  energy: 1 | 2 | 3 | 4 | 5;
  note?: string;
};
export type BagItem = {
  id: string;
  group: BagGroup;
  label: string;
  checked: boolean;
  position: number;
  custom?: boolean;
};
export type BirthPlanState = Record<string, string[] | string>;

export type NotificationPrefs = {
  intention: boolean;
  milestone: boolean;
  reminders: boolean;
  partner: boolean;
  emergency: boolean;
  pelvicFloor: boolean;
  kickNudge: boolean;
};

type State = {
  hydrated: boolean;
  onboarded: boolean;
  profile: Profile;
  recents: RecentItem[];
  journal: JournalItem[];

  kicks: Kick[];
  contractions: Contraction[];
  weights: WeightEntry[];
  symptoms: SymptomEntry[];
  bag: BagItem[];
  birthPlan: BirthPlanState;
  notifPrefs: NotificationPrefs;

  setOnboarded: (v: boolean) => void;
  patchProfile: (p: Partial<Profile>) => void;
  addJournalEntry: (entry: JournalItem) => void;
  addRecent: (item: RecentItem) => void;
  removeJournalEntry: (id: string) => void;

  addKick: (sessionId: string) => void;
  endKickSession: () => void;
  addContraction: (c: Contraction) => void;
  removeContraction: (id: string) => void;
  addWeight: (w: WeightEntry) => void;
  removeWeight: (id: string) => void;
  addSymptom: (s: SymptomEntry) => void;
  toggleBagItem: (id: string) => void;
  addBagItem: (group: BagGroup, label: string) => void;
  removeBagItem: (id: string) => void;
  setBirthPlanField: (key: string, value: string[] | string) => void;
  patchNotifPrefs: (p: Partial<NotificationPrefs>) => void;
};

const defaultProfile: Profile = {
  name: SAMPLE_USER.name,
  stage: 'pregnant',
  week: SAMPLE_USER.week,
  conditions: [],
  country: SAMPLE_USER.country,
  partnerLinked: false,
};

const defaultBag = (): BagItem[] =>
  BAG_TEMPLATE.map((b, i) => ({
    id: `bag-${b.group}-${i}`,
    group: b.group,
    label: b.label,
    checked: false,
    position: i,
  }));

const defaultPrefs: NotificationPrefs = {
  intention: true,
  milestone: true,
  reminders: true,
  partner: false,
  emergency: true,
  pelvicFloor: false,
  kickNudge: true,
};

export const useAppStore = create<State>()(
  persist(
    (set, get) => ({
      hydrated: false,
      onboarded: false,
      profile: defaultProfile,
      recents: SAMPLE_RECENTS,
      journal: SAMPLE_JOURNAL,

      kicks: [],
      contractions: [],
      weights: [],
      symptoms: [],
      bag: defaultBag(),
      birthPlan: {},
      notifPrefs: defaultPrefs,

      setOnboarded: (v) => set({ onboarded: v }),
      patchProfile: (p) => {
        set((s) => ({ profile: { ...s.profile, ...p } }));
        syncProfile(p as Record<string, unknown>).catch(() => {});
      },
      addJournalEntry: (entry) => {
        set((s) => ({ journal: [entry, ...s.journal] }));
        syncJournalEntry(entry).catch(() => {});
      },
      addRecent: (item) => set((s) => ({ recents: [item, ...s.recents].slice(0, 10) })),
      removeJournalEntry: (id) => {
        set((s) => ({ journal: s.journal.filter((j) => j.id !== id) }));
        syncJournalDelete(id).catch(() => {});
      },

      addKick: (sessionId) => {
        const k: Kick = {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          sessionId,
          at: Date.now(),
        };
        set((s) => ({ kicks: [...s.kicks, k] }));
        syncKick(k).catch(() => {});
      },
      endKickSession: () => {
        // No-op for state — sessions are an in-memory grouping. Hook for
        // future analytics.
      },
      addContraction: (c) => {
        set((s) => ({ contractions: [c, ...s.contractions] }));
        syncContraction(c).catch(() => {});
      },
      removeContraction: (id) =>
        set((s) => ({ contractions: s.contractions.filter((c) => c.id !== id) })),
      addWeight: (w) => {
        set((s) => ({
          weights: [w, ...s.weights.filter((x) => x.id !== w.id)].sort((a, b) => b.at - a.at),
        }));
        syncWeight(w).catch(() => {});
      },
      removeWeight: (id) => set((s) => ({ weights: s.weights.filter((w) => w.id !== id) })),
      addSymptom: (sym) => {
        set((s) => ({
          symptoms: [sym, ...s.symptoms.filter((x) => x.id !== sym.id)].sort(
            (a, b) => b.at - a.at,
          ),
        }));
        syncSymptom(sym).catch(() => {});
      },
      toggleBagItem: (id) => {
        let updated: BagItem | null = null;
        set((s) => ({
          bag: s.bag.map((b) => {
            if (b.id !== id) return b;
            updated = { ...b, checked: !b.checked };
            return updated;
          }),
        }));
        if (updated) syncBagItem(updated).catch(() => {});
      },
      addBagItem: (group, label) => {
        const item: BagItem = {
          id: `bag-custom-${Date.now()}`,
          group,
          label,
          checked: false,
          position: get().bag.length,
          custom: true,
        };
        set((s) => ({ bag: [...s.bag, item] }));
        syncBagItem(item).catch(() => {});
      },
      removeBagItem: (id) => set((s) => ({ bag: s.bag.filter((b) => b.id !== id) })),
      setBirthPlanField: (key, value) => {
        set((s) => ({ birthPlan: { ...s.birthPlan, [key]: value } }));
        syncBirthPlan(get().birthPlan).catch(() => {});
      },
      patchNotifPrefs: (p) => set((s) => ({ notifPrefs: { ...s.notifPrefs, ...p } })),
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
