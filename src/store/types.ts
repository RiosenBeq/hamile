// Persisted data shapes. Everything lives on-device (AsyncStorage) unless the
// optional Supabase backend is configured.

export type Stage = 'pregnant' | 'postpartum';
export type BabySex = 'girl' | 'boy' | 'unknown';
export type Units = 'metric' | 'imperial';

export type Profile = {
  name: string;
  stage: Stage;
  /** Estimated due date, YYYY-MM-DD (local). Source of truth for the week. */
  dueDate: string | null;
  /** Legacy/derived: current completed week. Kept in sync for older code paths. */
  week: number;
  conditions: string[];
  country: string;
  partnerLinked: boolean;
  partnerName?: string;
  babyName?: string;
  babySex?: BabySex;
  multiples?: boolean;
  prePregnancyKg?: number;
  heightCm?: number;
  units?: Units;
  /** Pregnancy-loss support mode: pauses all baby-development content & nudges. */
  lossMode?: boolean;
  /** Set when the user tells us the baby has arrived (YYYY-MM-DD). */
  babyBornAt?: string | null;
  /** The user's own maternity unit / midwife, for one-tap calling. */
  careName?: string;
  carePhone?: string;
};

export type Kick = { id: string; sessionId: string; at: number };

export type Contraction = {
  id: string;
  startedAt: number;
  endedAt: number;
  intensity?: 1 | 2 | 3 | 4 | 5;
};

export type WeightEntry = { id: string; week: number; kg: number; at: number; note?: string };

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

export type BagGroup = 'labour' | 'postBirth' | 'baby' | 'docs';
export type BagItem = {
  id: string;
  group: BagGroup;
  label: string;
  checked: boolean;
  position: number;
  custom?: boolean;
};

export type BirthPlanState = Record<string, string[] | string>;

export type AppointmentKind = 'checkup' | 'scan' | 'test' | 'class' | 'other';
export type ReminderLead = 'none' | '1h' | '1d' | 'both';

export type Appointment = {
  id: string;
  kind: AppointmentKind;
  title: string;
  /** Start time, epoch ms. */
  at: number;
  location?: string;
  provider?: string;
  notes?: string;
  /** Questions to ask at the visit. */
  questions: { id: string; text: string; done: boolean }[];
  remind: ReminderLead;
};

export type DiaryKind = 'note' | 'bump';
export type DiaryEntry = {
  id: string;
  kind: DiaryKind;
  at: number;
  /** Week of pregnancy when the entry was made. */
  week: number;
  text?: string;
  mood?: 1 | 2 | 3 | 4 | 5;
  /** Absolute file:// URI inside the app's document directory. */
  photoUri?: string;
};

export type Pill = {
  id: string;
  name: string;
  /** "HH:MM" local times for the daily reminder. */
  times: string[];
  reminders: boolean;
};

export type KegelSession = { id: string; at: number; reps: number; seconds: number };

export type NotificationPrefs = {
  intention: boolean;
  milestone: boolean;
  reminders: boolean;
  partner: boolean;
  emergency: boolean;
  pelvicFloor: boolean;
  kickNudge: boolean;
  water: boolean;
  /** Gentle "come back" reminder after a few days without opening the app. */
  nudge?: boolean;
};

/** User-chosen notification times ("HH:MM", local). */
export type NotificationTimes = {
  week: string;
  thought: string;
  kick: string;
};

export type ChatMessage = { id: string; role: 'user' | 'assistant'; content: string; ts: number };

export type PremiumState = {
  active: boolean;
  /** Product identifier of the active entitlement, if any. */
  productId?: string | null;
  /** Expiration (epoch ms); null for lifetime. */
  expiresAt?: number | null;
  /** When we last heard from RevenueCat. */
  checkedAt?: number;
};
