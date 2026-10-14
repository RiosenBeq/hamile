// Shared shapes for Marigold's bundled, offline content. Everything ships in
// the app binary (no network needed). English is always present; Turkish is
// authored alongside it; Spanish, German, French and Portuguese are layered on
// at load time from ./locales/<lang>/*.json. Readers fall back to English.

export type ContentLang = 'en' | 'tr' | 'es' | 'de' | 'fr' | 'pt';

export type L10n = { en: string; tr?: string } & Partial<Record<Exclude<ContentLang, 'en' | 'tr'>, string>>;
export type L10nList = { en: string[]; tr?: string[] } & Partial<Record<Exclude<ContentLang, 'en' | 'tr'>, string[]>>;

/** A citation shown under medical content (App Review guideline 1.4.1). */
export type Source = { name: string; url: string };

export type Verdict = 'safe' | 'caution' | 'avoid';

// ── Week by week ────────────────────────────────────────────────────────────

export type WeekContent = {
  /** Gestational week, counted from the first day of the last period (1–42). */
  week: number;
  /**
   * Size comparison shown as a big emoji + name ("a lime"). `title`/`phrase`
   * hold the heading noun and the "size of …" phrase for languages whose
   * grammar can't be derived from `name` (articles, cases, de/d'/du…).
   */
  size: { emoji: string; name: L10n; title?: Partial<Record<ContentLang, string>>; phrase?: Partial<Record<ContentLang, string>> };
  /** Approximate crown–rump (≤ week 20) or crown–heel (> week 20) length. Null before it is measurable. */
  lengthCm: number | null;
  /** Approximate weight in grams. Null when negligible / not meaningful. */
  weightG: number | null;
  /** 2–4 warm sentences on what the baby is doing this week. */
  baby: L10n;
  /** 2–4 sentences on what the mother may notice in her body this week. */
  body: L10n;
  /** Exactly 3 short, practical tips for this week. */
  tips: L10nList;
  /** 0–3 concrete to-dos tied to this week (scans, tests, admin). */
  todo: L10nList;
  sources: Source[];
};

// ── "Can I…?" safety library ───────────────────────────────────────────────

export type SafetyCategory =
  | 'food'
  | 'drink'
  | 'medicine'
  | 'supplement'
  | 'beauty'
  | 'activity'
  | 'travel'
  | 'home';

export type SafetyItem = {
  /** Stable kebab-case id, unique across the library. */
  id: string;
  category: SafetyCategory;
  emoji: string;
  name: L10n;
  /** Extra search terms (brand names, spellings, local names). */
  aliases: L10nList;
  verdict: Verdict;
  /** One plain-language sentence — the answer. */
  summary: L10n;
  /** 2–4 sentences: why, what the risk actually is, nuance. */
  details: L10n;
  /** 1–3 practical tips ("ask for it well done", "choose pasteurised"). */
  tips: L10nList;
  sources: Source[];
};

// ── Symptoms: "Is this normal?" ────────────────────────────────────────────

export type SymptomGuide = {
  id: string;
  emoji: string;
  name: L10n;
  aliases: L10nList;
  /** Trimesters in which it is commonly reported. */
  trimesters: (1 | 2 | 3)[];
  /** Why it happens and how common it is — reassuring but honest. */
  about: L10n;
  /** Things that usually help. */
  relief: L10nList;
  /** Red flags: when to call a midwife/doctor (or emergency services). */
  callDoctor: L10nList;
  /** True when the symptom itself can be an emergency sign. */
  urgent: boolean;
  sources: Source[];
};

// ── Checklists & affirmations ──────────────────────────────────────────────

export type ChecklistItem = {
  id: string;
  trimester: 1 | 2 | 3;
  /** Suggested week to surface the item (optional). */
  week?: number;
  title: L10n;
  detail?: L10n;
};

// ── Baby names ─────────────────────────────────────────────────────────────

export type NameGender = 'f' | 'm' | 'u';
export type NameList = 'tr' | 'intl' | 'es' | 'de' | 'fr' | 'pt';

export type BabyName = {
  name: string;
  gender: NameGender;
  /** Origin, e.g. { en: 'Turkish', tr: 'Türkçe' }. */
  origin: L10n;
  meaning: L10n;
  /**
   * Which popular lists it appears in: Turkey, international (English-speaking),
   * or a language market (es: Spain/Mexico, de: DACH, fr: France/Belgium/Québec,
   * pt: Brazil).
   */
  popular: NameList[];
};
