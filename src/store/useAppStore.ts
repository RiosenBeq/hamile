// Marigold app store. Offline-first by design — everything is cached in
// AsyncStorage and (only when a backend is configured) queued for Supabase
// sync via the outbox in lib/syncQueue.

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { BAG_TEMPLATE, JournalItem, RecentItem } from '@/data/sample';
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
import { dayKey, dueDateForCurrentWeek, pregnancyStatus, toISODate } from '@/lib/pregnancy';
import { newId } from '@/lib/id';
import { enableWrites, resilientStorage, STORE_VERSION, watchAppStateForBackup } from '@/lib/storage';
import type { LangCode } from '@/i18n/translations';
import type {
  Appointment,
  BagGroup,
  BagItem,
  BirthPlanState,
  ChatMessage,
  Contraction,
  DiaryEntry,
  KegelSession,
  Kick,
  NotificationPrefs,
  NotificationTimes,
  Pill,
  PremiumState,
  Profile,
  SymptomEntry,
  WeightEntry,
} from './types';

export type {
  Appointment,
  BagItem,
  BirthPlanState,
  ChatMessage,
  Contraction,
  DiaryEntry,
  KegelSession,
  Kick,
  NotificationPrefs,
  Pill,
  PremiumState,
  Profile,
  SymptomEntry,
  WeightEntry,
} from './types';

type State = {
  hydrated: boolean;
  onboarded: boolean;
  language: LangCode;
  languageSet: boolean;
  profile: Profile;

  /** History of AI verdicts (only populated when Marigold AI is configured). */
  recents: RecentItem[];
  journal: JournalItem[];
  chat: ChatMessage[];
  pendingPhoto: string | null;

  kicks: Kick[];
  contractions: Contraction[];
  weights: WeightEntry[];
  symptoms: SymptomEntry[];
  bag: BagItem[];
  birthPlan: BirthPlanState;
  notifPrefs: NotificationPrefs;
  notifTimes: NotificationTimes;

  appointments: Appointment[];
  diary: DiaryEntry[];
  waterByDay: Record<string, number>;
  waterGoal: number;
  pills: Pill[];
  pillLog: Record<string, string[]>;
  kegel: KegelSession[];
  favoriteNames: string[];
  checklistDone: Record<string, boolean>;
  safetyRecent: string[];
  safetySaved: string[];
  premium: PremiumState;
  /** Last pregnancy week the user has "seen" — drives the new-week moment. */
  lastSeenWeek: number;
  /** First launch (epoch ms) — the gentle Plus offer waits a few days. */
  firstOpenAt: number;
  paywallNudged: boolean;

  setOnboarded: (v: boolean) => void;
  setLanguage: (l: LangCode) => void;
  patchProfile: (p: Partial<Profile>) => void;
  setDueDate: (iso: string) => void;
  addJournalEntry: (entry: JournalItem) => void;
  addRecent: (item: RecentItem) => void;
  removeJournalEntry: (id: string) => void;
  appendChat: (msg: ChatMessage) => void;
  clearChat: () => void;
  setPendingPhoto: (b64: string | null) => void;

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
  patchNotifTimes: (p: Partial<NotificationTimes>) => void;

  upsertAppointment: (a: Appointment) => void;
  removeAppointment: (id: string) => void;
  upsertDiary: (d: DiaryEntry) => void;
  removeDiary: (id: string) => void;
  addWater: (delta: number, day?: string) => void;
  setWaterGoal: (g: number) => void;
  upsertPill: (p: Pill) => void;
  removePill: (id: string) => void;
  togglePillTaken: (pillId: string, day?: string) => void;
  addKegel: (s: KegelSession) => void;
  toggleFavoriteName: (name: string) => void;
  toggleChecklist: (id: string) => void;
  pushSafetyRecent: (id: string) => void;
  toggleSafetySaved: (id: string) => void;
  setPremium: (p: PremiumState) => void;
  setLastSeenWeek: (w: number) => void;
  markPaywallNudged: () => void;
  resetAll: () => void;
};

export const defaultProfile: Profile = {
  name: '',
  stage: 'pregnant',
  dueDate: null,
  week: 0,
  conditions: [],
  country: '',
  partnerLinked: false,
  units: 'metric',
  lossMode: false,
  babyBornAt: null,
};

export const defaultBag = (): BagItem[] =>
  BAG_TEMPLATE.map((b, i) => ({
    id: `bag-${b.group}-${i}`,
    group: b.group,
    label: b.key,
    checked: false,
    position: i,
  }));

export const defaultPrefs: NotificationPrefs = {
  intention: true,
  milestone: true,
  reminders: true,
  partner: false,
  emergency: true,
  pelvicFloor: false,
  kickNudge: true,
  water: false,
  nudge: true,
};

export const defaultTimes: NotificationTimes = { week: '09:00', thought: '08:30', kick: '19:00' };

const initialData = () => ({
  onboarded: false,
  profile: defaultProfile,
  recents: [] as RecentItem[],
  journal: [] as JournalItem[],
  chat: [] as ChatMessage[],
  pendingPhoto: null as string | null,
  kicks: [] as Kick[],
  contractions: [] as Contraction[],
  weights: [] as WeightEntry[],
  symptoms: [] as SymptomEntry[],
  bag: defaultBag(),
  birthPlan: {} as BirthPlanState,
  notifPrefs: defaultPrefs,
  notifTimes: defaultTimes,
  appointments: [] as Appointment[],
  diary: [] as DiaryEntry[],
  waterByDay: {} as Record<string, number>,
  waterGoal: 8,
  pills: [] as Pill[],
  pillLog: {} as Record<string, string[]>,
  kegel: [] as KegelSession[],
  favoriteNames: [] as string[],
  checklistDone: {} as Record<string, boolean>,
  safetyRecent: [] as string[],
  safetySaved: [] as string[],
  premium: { active: false } as PremiumState,
  lastSeenWeek: 0,
  firstOpenAt: Date.now(),
  paywallNudged: false,
});

const MAX_DAYS_KEPT = 120;
const trimDays = <T,>(rec: Record<string, T>): Record<string, T> => {
  const keys = Object.keys(rec).sort();
  if (keys.length <= MAX_DAYS_KEPT) return rec;
  const keep = keys.slice(-MAX_DAYS_KEPT);
  return Object.fromEntries(keep.map((k) => [k, rec[k]]));
};

export const useAppStore = create<State>()(
  persist(
    (set, get) => ({
      hydrated: false,
      language: 'en',
      languageSet: false,
      ...initialData(),

      setOnboarded: (v) => set({ onboarded: v }),
      setLanguage: (l) => set({ language: l, languageSet: true }),
      patchProfile: (p) => {
        set((s) => ({ profile: { ...s.profile, ...p } }));
        syncProfile(p as Record<string, unknown>).catch(() => {});
      },
      setDueDate: (iso) => {
        const week = pregnancyStatus(iso).weeks;
        set((s) => ({ profile: { ...s.profile, dueDate: iso, week }, lastSeenWeek: week }));
        syncProfile({ dueDate: iso, week }).catch(() => {});
      },
      addJournalEntry: (entry) => {
        set((s) => ({ journal: [entry, ...s.journal].slice(0, 300) }));
        syncJournalEntry(entry).catch(() => {});
      },
      addRecent: (item) => set((s) => ({ recents: [item, ...s.recents].slice(0, 10) })),
      removeJournalEntry: (id) => {
        set((s) => ({ journal: s.journal.filter((j) => j.id !== id) }));
        syncJournalDelete(id).catch(() => {});
      },
      appendChat: (msg) => set((s) => ({ chat: [...s.chat, msg].slice(-50) })),
      clearChat: () => set({ chat: [] }),
      setPendingPhoto: (b64) => set({ pendingPhoto: b64 }),

      addKick: (sessionId) => {
        const k: Kick = { id: newId(), sessionId, at: Date.now() };
        set((s) => ({ kicks: [...s.kicks, k].slice(-2000) }));
        syncKick(k).catch(() => {});
      },
      endKickSession: () => {},
      addContraction: (c) => {
        set((s) => ({ contractions: [c, ...s.contractions].slice(0, 500) }));
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
          symptoms: [sym, ...s.symptoms.filter((x) => x.id !== sym.id)]
            .sort((a, b) => b.at - a.at)
            .slice(0, 400),
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
          id: `bag-custom-${newId()}`,
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
      patchNotifTimes: (p) => set((s) => ({ notifTimes: { ...s.notifTimes, ...p } })),

      upsertAppointment: (a) =>
        set((s) => ({
          appointments: [a, ...s.appointments.filter((x) => x.id !== a.id)].sort((x, y) => x.at - y.at),
        })),
      removeAppointment: (id) =>
        set((s) => ({ appointments: s.appointments.filter((a) => a.id !== id) })),
      upsertDiary: (d) =>
        set((s) => ({
          diary: [d, ...s.diary.filter((x) => x.id !== d.id)].sort((x, y) => y.at - x.at),
        })),
      removeDiary: (id) => set((s) => ({ diary: s.diary.filter((d) => d.id !== id) })),
      addWater: (delta, day = dayKey()) =>
        set((s) => {
          const next = Math.max(0, Math.min(30, (s.waterByDay[day] ?? 0) + delta));
          return { waterByDay: trimDays({ ...s.waterByDay, [day]: next }) };
        }),
      setWaterGoal: (g) => set({ waterGoal: Math.max(4, Math.min(16, Math.round(g))) }),
      upsertPill: (p) => set((s) => ({ pills: [...s.pills.filter((x) => x.id !== p.id), p] })),
      removePill: (id) => set((s) => ({ pills: s.pills.filter((p) => p.id !== id) })),
      togglePillTaken: (pillId, day = dayKey()) =>
        set((s) => {
          const cur = s.pillLog[day] ?? [];
          const next = cur.includes(pillId) ? cur.filter((x) => x !== pillId) : [...cur, pillId];
          return { pillLog: trimDays({ ...s.pillLog, [day]: next }) };
        }),
      addKegel: (k) => set((s) => ({ kegel: [k, ...s.kegel].slice(0, 500) })),
      toggleFavoriteName: (name) =>
        set((s) => ({
          favoriteNames: s.favoriteNames.includes(name)
            ? s.favoriteNames.filter((n) => n !== name)
            : [name, ...s.favoriteNames],
        })),
      toggleChecklist: (id) =>
        set((s) => ({ checklistDone: { ...s.checklistDone, [id]: !s.checklistDone[id] } })),
      pushSafetyRecent: (id) =>
        set((s) => ({ safetyRecent: [id, ...s.safetyRecent.filter((x) => x !== id)].slice(0, 12) })),
      toggleSafetySaved: (id) =>
        set((s) => ({
          safetySaved: s.safetySaved.includes(id)
            ? s.safetySaved.filter((x) => x !== id)
            : [id, ...s.safetySaved],
        })),
      setPremium: (p) => set({ premium: p }),
      setLastSeenWeek: (w) => set({ lastSeenWeek: w }),
      markPaywallNudged: () => set({ paywallNudged: true }),
      resetAll: () => set({ ...initialData(), language: get().language, languageSet: get().languageSet }),
    }),
    {
      name: 'marigold-app-state',
      version: STORE_VERSION,
      storage: createJSONStorage(() => resilientStorage),
      // Deep-merge nested objects so fields added in newer versions get
      // their defaults instead of being dropped.
      merge: (persisted: any, current) => {
        const p = (persisted ?? {}) as Partial<State>;
        return {
          ...current,
          ...p,
          profile: { ...current.profile, ...(p.profile ?? {}) },
          notifPrefs: { ...current.notifPrefs, ...(p.notifPrefs ?? {}) },
          notifTimes: { ...current.notifTimes, ...(p.notifTimes ?? {}) },
          premium: { ...current.premium, ...(p.premium ?? {}) },
        } as State;
      },
      onRehydrateStorage: () => () => {
        // Only now is it safe to write: the user's data is in memory.
        enableWrites();
        watchAppStateForBackup();
      },
      // `hydrated` must always start false on cold boot; persisting it would
      // race with React subscribers seeing a stale `true` from the previous
      // session before AsyncStorage actually finishes loading.
      partialize: (s) => {
        const { hydrated: _h, pendingPhoto: _p, ...rest } = s;
        // Strip functions — zustand's JSON storage drops them anyway, but this
        // keeps the persisted blob honest.
        return Object.fromEntries(
          Object.entries(rest).filter(([, v]) => typeof v !== 'function'),
        ) as Partial<State>;
      },
      migrate: (persisted: any, version) => {
        const state = { ...(persisted ?? {}) };
        // Never let a migration bug wipe data: on any error keep what we have
        // (the raw pre-migration value is also saved by lib/storage).
        try {
          migrateInPlace(state, version);
        } catch (e) {
          if (__DEV__) console.warn('[store] migration failed', e);
        }
        return state as State;
      },
    },
  ),
);

function migrateInPlace(state: any, version: number) {
        if (version < 2) {
          // v1 stored a static week and shipped demo journal/recents.
          const profile = { ...defaultProfile, ...(state.profile ?? {}) };
          if (!profile.dueDate && typeof profile.week === 'number' && profile.week > 0) {
            profile.dueDate = toISODate(dueDateForCurrentWeek(profile.week));
          }
          if (profile.name === 'Jane') profile.name = '';
          state.profile = profile;
          const demoJournal = new Set(['j1', 'j2', 'j3', 'j4', 'j5', 'j6', 'j7', 'j8', 'j9', 'j10', 'j11', 'j12']);
          state.journal = (state.journal ?? []).filter((j: JournalItem) => !demoJournal.has(j.id));
          const demoRecents = new Set(['1', '2', '3', '4', '5', '6']);
          state.recents = (state.recents ?? []).filter((r: RecentItem) => !demoRecents.has(r.id));
          // Old bag rows stored English labels; map them onto translation keys.
          const byLabel = new Map(BAG_TEMPLATE.map((b) => [b.legacy, b.key] as const));
          state.bag = (state.bag ?? defaultBag()).map((b: BagItem) =>
            !b.custom && byLabel.has(b.label) ? { ...b, label: byLabel.get(b.label)! } : b,
          );
          state.notifPrefs = { ...defaultPrefs, ...(state.notifPrefs ?? {}) };
          state.lastSeenWeek = profile.dueDate ? pregnancyStatus(profile.dueDate).weeks : 0;
          state.firstOpenAt = Date.now();
          state.paywallNudged = false;
        }
}

// Mark the store as hydrated via setState so subscribers re-render. Mutating
// `state.hydrated` directly inside `onRehydrateStorage` does NOT notify React,
// which left the splash gate stuck on a blank cream screen on cold start.
useAppStore.persist.onFinishHydration(() => {
  useAppStore.setState({ hydrated: true });
});

// If hydration completed synchronously (first launch with empty storage)
// before the listener was attached, flip the flag manually.
if (useAppStore.persist.hasHydrated()) {
  useAppStore.setState({ hydrated: true });
}
