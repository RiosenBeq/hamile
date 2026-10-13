// Access layer for bundled content: lookups, search and small formatting
// helpers. Screens import from here rather than from the raw data files.

import { WEEKS } from './weeks';
import { SAFETY } from './safety';
import { SYMPTOMS } from './symptoms';
import { CHECKLIST } from './checklist';
import { AFFIRMATIONS } from './affirmations';
import type { L10n, SafetyCategory, SafetyItem, SymptomGuide, WeekContent } from './types';

export { WEEKS, SAFETY, SYMPTOMS, CHECKLIST, AFFIRMATIONS };
export { RED_FLAGS, EMERGENCY_NUMBERS } from './redflags';
export { BABY_NAMES } from './names';
export type * from './types';

// ── Weeks ──────────────────────────────────────────────────────────────────

const WEEK_BY_NUMBER = new Map(WEEKS.map((w) => [w.week, w] as const));

export function getWeek(n: number): WeekContent {
  const clamped = Math.min(42, Math.max(1, Math.round(n)));
  return WEEK_BY_NUMBER.get(clamped) ?? WEEKS[0];
}

/** "an avocado" (en) / "avokado" (tr) — grammatical form for "the size of …". */
export function sizePhrase(name: L10n, lang: 'en' | 'tr'): string {
  if (lang === 'tr') return name.tr.replace(/^bir\s+/i, '');
  const raw = name.en.trim();
  if (/^(a|an|the)\s/i.test(raw)) return raw;
  return /^[aeiou]/i.test(raw) ? `an ${raw}` : `a ${raw}`;
}

/** Bare noun for headings ("Avocado"). */
export function sizeTitle(name: L10n, lang: 'en' | 'tr'): string {
  const raw = lang === 'tr' ? name.tr.replace(/^bir\s+/i, '') : name.en.replace(/^(a|an|the)\s+/i, '');
  return raw.charAt(0).toLocaleUpperCase(lang === 'tr' ? 'tr-TR' : 'en-US') + raw.slice(1);
}

// ── Search ─────────────────────────────────────────────────────────────────

/** Lower-case, strip accents and Turkish dotted/dotless i so "Süt", "sut" and "SÜT" all match. */
export function normalize(s: string): string {
  return s
    .replace(/İ/g, 'i')
    .replace(/I/g, 'i')
    .toLowerCase()
    .replace(/ı/g, 'i')
    .replace(/ş/g, 's')
    .replace(/ğ/g, 'g')
    .replace(/ç/g, 'c')
    .replace(/ö/g, 'o')
    .replace(/ü/g, 'u')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

type Indexed<T> = { item: T; primary: string[]; secondary: string[] };

function score(q: string, entry: Indexed<unknown>): number {
  let best = 0;
  for (const p of entry.primary) {
    if (p === q) return 100;
    if (p.startsWith(q)) best = Math.max(best, 80);
    else if (p.split(' ').some((w) => w.startsWith(q))) best = Math.max(best, 65);
    else if (p.includes(q)) best = Math.max(best, 45);
  }
  for (const s of entry.secondary) {
    if (s === q) best = Math.max(best, 70);
    else if (s.startsWith(q)) best = Math.max(best, 55);
    else if (s.split(' ').some((w) => w.startsWith(q))) best = Math.max(best, 40);
    else if (q.length >= 4 && s.includes(q)) best = Math.max(best, 25);
  }
  return best;
}

function buildIndex<T extends { name: L10n; aliases: { en: string[]; tr: string[] } }>(items: T[]): Indexed<T>[] {
  return items.map((item) => ({
    item,
    primary: [normalize(item.name.en), normalize(item.name.tr)],
    secondary: [...item.aliases.en, ...item.aliases.tr].map(normalize),
  }));
}

const SAFETY_INDEX = buildIndex(SAFETY);
const SYMPTOM_INDEX = buildIndex(SYMPTOMS);
const SAFETY_BY_ID = new Map(SAFETY.map((s) => [s.id, s] as const));
const SYMPTOM_BY_ID = new Map(SYMPTOMS.map((s) => [s.id, s] as const));

export function searchSafety(query: string, category?: SafetyCategory | 'all'): SafetyItem[] {
  const q = normalize(query);
  const pool = category && category !== 'all' ? SAFETY_INDEX.filter((e) => e.item.category === category) : SAFETY_INDEX;
  if (!q) return pool.map((e) => e.item);
  return pool
    .map((e) => ({ e, s: score(q, e) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .map((x) => x.e.item);
}

export function searchSymptoms(query: string): SymptomGuide[] {
  const q = normalize(query);
  if (!q) return SYMPTOMS;
  return SYMPTOM_INDEX.map((e) => ({ e, s: score(q, e) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .map((x) => x.e.item);
}

export const getSafetyItem = (id: string) => SAFETY_BY_ID.get(id);
export const getSymptom = (id: string) => SYMPTOM_BY_ID.get(id);

export const SAFETY_CATEGORIES: { key: SafetyCategory; emoji: string; label: L10n }[] = [
  { key: 'food', emoji: '🥗', label: { en: 'Food', tr: 'Yiyecek' } },
  { key: 'drink', emoji: '☕', label: { en: 'Drinks', tr: 'İçecek' } },
  { key: 'medicine', emoji: '💊', label: { en: 'Medicine', tr: 'İlaç' } },
  { key: 'supplement', emoji: '🌿', label: { en: 'Supplements', tr: 'Takviye' } },
  { key: 'beauty', emoji: '💅', label: { en: 'Beauty', tr: 'Güzellik' } },
  { key: 'activity', emoji: '🧘‍♀️', label: { en: 'Activities', tr: 'Aktivite' } },
  { key: 'travel', emoji: '✈️', label: { en: 'Travel', tr: 'Seyahat' } },
  { key: 'home', emoji: '🏠', label: { en: 'Home', tr: 'Ev' } },
];

/** Popular quick-picks shown before the user types (ids that exist in SAFETY). */
export function popularSafety(lang: 'en' | 'tr'): SafetyItem[] {
  const en = ['sushi', 'coffee', 'brie', 'paracetamol', 'hair-dye', 'hot-tub', 'flying', 'runny-eggs', 'deli-meat', 'retinol'];
  const tr = ['turkish-coffee', 'beyaz-peynir', 'sucuk', 'paracetamol', 'hair-dye', 'hamam', 'sushi', 'cay', 'flying', 'runny-eggs'];
  const ids = lang === 'tr' ? tr : en;
  const found = ids.map((id) => SAFETY_BY_ID.get(id)).filter(Boolean) as SafetyItem[];
  // Fall back to the first items of each category if ids drift.
  if (found.length >= 6) return found;
  return SAFETY.slice(0, 10);
}

// ── Daily thought ──────────────────────────────────────────────────────────

export function affirmationFor(date = new Date()): L10n {
  const start = new Date(date.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((date.getTime() - start.getTime()) / 86_400_000);
  return AFFIRMATIONS[dayOfYear % AFFIRMATIONS.length];
}
