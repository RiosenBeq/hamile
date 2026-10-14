// Access layer for bundled content: lookups, search and small formatting
// helpers. Screens import from here rather than from the raw data files.

import { WEEKS } from './weeks';
import { SAFETY } from './safety';
import { SYMPTOMS } from './symptoms';
import { CHECKLIST } from './checklist';
import { AFFIRMATIONS } from './affirmations';
import { RED_FLAGS, EMERGENCY_NUMBERS } from './redflags';
import { BABY_NAMES } from './names';
import { applyContentOverlays, LOCAL_SAFETY_IDS } from './locales';
import type { ContentLang, L10n, L10nList, SafetyCategory, SafetyItem, SymptomGuide, WeekContent } from './types';

export { WEEKS, SAFETY, SYMPTOMS, CHECKLIST, AFFIRMATIONS, RED_FLAGS, EMERGENCY_NUMBERS, BABY_NAMES, LOCAL_SAFETY_IDS };
export type * from './types';

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

// Layer es/de/fr/pt translations and market-specific items onto the content
// before any lookup table or search index below is built.
applyContentOverlays({
  weeks: WEEKS,
  safety: SAFETY,
  symptoms: SYMPTOMS,
  checklist: CHECKLIST,
  redFlags: RED_FLAGS,
  affirmations: AFFIRMATIONS,
  names: BABY_NAMES,
  categories: SAFETY_CATEGORIES,
  countries: EMERGENCY_NUMBERS,
});

// Keep "600 g", "30 cm", "38 °C" or "200 mg" on one line in every language.
const UNIT_GAP = /(\d) (?=(?:cm|mm|m|km|g|kg|mg|µg|mcg|ml|l|°C|°F|%|lb|oz|in|ft|kcal|IU|UI|IE)\b|°)/g;
const glue = (v: string) => v.replace(UNIT_GAP, '$1\u00A0');
function glueL10n(o: Record<string, unknown> | undefined) {
  if (!o) return;
  for (const k of Object.keys(o)) {
    const v = o[k];
    if (typeof v === 'string') o[k] = glue(v);
    else if (Array.isArray(v)) o[k] = v.map((x) => (typeof x === 'string' ? glue(x) : x));
  }
}
for (const w of WEEKS) [w.baby, w.body, w.tips, w.todo].forEach(glueL10n);
for (const x of SAFETY) [x.summary, x.details, x.tips].forEach(glueL10n);
for (const x of SYMPTOMS) [x.about, x.relief, x.callDoctor].forEach(glueL10n);
for (const x of CHECKLIST) [x.title, x.detail].forEach(glueL10n);
for (const x of RED_FLAGS) [x.title, x.detail].forEach(glueL10n);

// ── Weeks ──────────────────────────────────────────────────────────────────

const WEEK_BY_NUMBER = new Map(WEEKS.map((w) => [w.week, w] as const));

export function getWeek(n: number): WeekContent {
  const clamped = Math.min(42, Math.max(1, Math.round(n)));
  return WEEK_BY_NUMBER.get(clamped) ?? WEEKS[0];
}

/**
 * The words that complete "the size of …" in the given language:
 * "an avocado" (en), "avokado" (tr), "un aguacate" (es), "d'un avocat" (fr)…
 */
export function sizePhrase(size: WeekContent['size'], lang: ContentLang): string {
  const special = size.phrase?.[lang];
  if (special) return special;
  if (lang === 'tr' && size.name.tr) return size.name.tr.replace(/^bir\s+/i, '');
  const raw = size.name.en.trim();
  if (/^(a|an|the)\s/i.test(raw)) return raw;
  return /^[aeiou]/i.test(raw) ? `an ${raw}` : `a ${raw}`;
}

const TITLE_LOCALE: Record<ContentLang, string> = { en: 'en-US', tr: 'tr-TR', es: 'es-ES', de: 'de-DE', fr: 'fr-FR', pt: 'pt-BR' };

/** Bare noun for headings ("Avocado", "Aguacate", "Avocat"). */
export function sizeTitle(size: WeekContent['size'], lang: ContentLang): string {
  const raw =
    size.title?.[lang] ??
    (lang === 'tr' && size.name.tr ? size.name.tr.replace(/^bir\s+/i, '') : size.name.en.replace(/^(a|an|the)\s+/i, ''));
  return raw.charAt(0).toLocaleUpperCase(TITLE_LOCALE[lang] ?? 'en-US') + raw.slice(1);
}

// ── Search ─────────────────────────────────────────────────────────────────

/**
 * Lower-case and strip accents so "Süt", "sut" and "SÜT" — or "Café",
 * "cafe" and "Käse"/"kase" — all match. Handles Turkish dotted/dotless i and
 * German ß.
 */
export function normalize(s: string): string {
  return s
    .replace(/ß/g, 'ss')
    .replace(/[Œœ]/g, 'oe')
    .replace(/[Ææ]/g, 'ae')
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

const strings = (v: L10n): string[] => Object.values(v).filter((x): x is string => typeof x === 'string' && x.length > 0);
const lists = (v: L10nList): string[] => Object.values(v).flatMap((x) => (Array.isArray(x) ? x : []));

// Search matches every language at once, so a German user typing "sushi" or a
// Turkish word still finds the entry.
function buildIndex<T extends { name: L10n; aliases: L10nList }>(items: T[]): Indexed<T>[] {
  return items.map((item) => ({
    item,
    primary: [...new Set(strings(item.name).map(normalize))],
    secondary: [...new Set(lists(item.aliases).map(normalize))],
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

/** Popular quick-picks shown before the user types (ids that exist in SAFETY). */
const POPULAR: Record<ContentLang, string[]> = {
  en: ['sushi', 'coffee', 'brie', 'paracetamol', 'hair-dye', 'hot-tub', 'flying', 'runny-eggs', 'deli-meat', 'retinol'],
  tr: ['turkish-coffee', 'beyaz-peynir', 'sucuk', 'paracetamol', 'hair-dye', 'hamam', 'sushi', 'cay', 'flying', 'runny-eggs'],
  es: ['coffee', 'sushi', 'paracetamol', 'hair-dye', 'deli-meat', 'runny-eggs', 'flying', 'hot-tub', 'brie', 'retinol'],
  de: ['coffee', 'sushi', 'paracetamol', 'hair-dye', 'brie', 'runny-eggs', 'flying', 'hot-tub', 'deli-meat', 'retinol'],
  fr: ['coffee', 'sushi', 'paracetamol', 'brie', 'hair-dye', 'runny-eggs', 'deli-meat', 'flying', 'hot-tub', 'retinol'],
  pt: ['coffee', 'sushi', 'paracetamol', 'hair-dye', 'runny-eggs', 'flying', 'deli-meat', 'hot-tub', 'brie', 'retinol'],
};

export function popularSafety(lang: ContentLang): SafetyItem[] {
  // Interleave market-specific items (jamón for Spanish, Teewurst for German…)
  // with the everyday questions so the list isn't all "avoid".
  const local = (LOCAL_SAFETY_IDS[lang] ?? []).slice(0, 4);
  const common = POPULAR[lang] ?? POPULAR.en;
  const mixed = common.flatMap((id, i) => (local[i] ? [local[i], id] : [id]));
  const ids = [...new Set(mixed)].slice(0, 10);
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
