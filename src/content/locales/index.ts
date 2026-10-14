// Translation overlays for the bundled content. English and Turkish are
// authored inline in ../*.ts; Spanish, German, French and Portuguese (Brazil)
// live in ./<lang>/*.json (translated from i18n-src/en) and are layered onto
// the same objects once, at startup, by `applyContentOverlays()`.
//
// Each language may also add market-specific "Can I…?" items
// (local-safety.json) and popular baby names (names-local.json).

import type {
  BabyName,
  ChecklistItem,
  ContentLang,
  L10n,
  L10nList,
  SafetyCategory,
  SafetyItem,
  Source,
  SymptomGuide,
  Verdict,
  WeekContent,
} from '../types';

import es_weeks from './es/weeks.json';
import es_safety1 from './es/safety-1.json';
import es_safety2 from './es/safety-2.json';
import es_symptoms from './es/symptoms.json';
import es_checklist from './es/checklist.json';
import es_redflags from './es/redflags.json';
import es_affirmations from './es/affirmations.json';
import es_names from './es/names.json';
import es_misc from './es/misc.json';
import es_localSafety from './es/local-safety.json';
import es_localNames from './es/names-local.json';
import de_weeks from './de/weeks.json';
import de_safety1 from './de/safety-1.json';
import de_safety2 from './de/safety-2.json';
import de_symptoms from './de/symptoms.json';
import de_checklist from './de/checklist.json';
import de_redflags from './de/redflags.json';
import de_affirmations from './de/affirmations.json';
import de_names from './de/names.json';
import de_misc from './de/misc.json';
import de_localSafety from './de/local-safety.json';
import de_localNames from './de/names-local.json';
import fr_weeks from './fr/weeks.json';
import fr_safety1 from './fr/safety-1.json';
import fr_safety2 from './fr/safety-2.json';
import fr_symptoms from './fr/symptoms.json';
import fr_checklist from './fr/checklist.json';
import fr_redflags from './fr/redflags.json';
import fr_affirmations from './fr/affirmations.json';
import fr_names from './fr/names.json';
import fr_misc from './fr/misc.json';
import fr_localSafety from './fr/local-safety.json';
import fr_localNames from './fr/names-local.json';
import pt_weeks from './pt/weeks.json';
import pt_safety1 from './pt/safety-1.json';
import pt_safety2 from './pt/safety-2.json';
import pt_symptoms from './pt/symptoms.json';
import pt_checklist from './pt/checklist.json';
import pt_redflags from './pt/redflags.json';
import pt_affirmations from './pt/affirmations.json';
import pt_names from './pt/names.json';
import pt_misc from './pt/misc.json';
import pt_localSafety from './pt/local-safety.json';
import pt_localNames from './pt/names-local.json';

type Lang = Exclude<ContentLang, 'en' | 'tr'>;
type Dict<T> = Record<string, T>;

type WeekOv = { sizeTitle: string; sizePhrase: string; baby: string; body: string; tips: string[]; todo: string[] };
type SafetyOv = { name: string; aliases: string[]; summary: string; details: string; tips: string[] };
type SymptomOv = { name: string; aliases: string[]; about: string; relief: string[]; callDoctor: string[] };
type LocalSafety = {
  id: string;
  category: SafetyCategory;
  emoji: string;
  verdict: Verdict;
  name: L10n;
  aliases: L10nList;
  summary: L10n;
  details: L10n;
  tips: L10nList;
  sources: Source[];
};
type LocalNames = {
  add?: { name: string; gender: BabyName['gender']; origin: string; meaning: L10n }[];
  alsoPopular?: string[];
  newOrigins?: Dict<L10n>;
};

type Overlay = {
  weeks: Dict<WeekOv>;
  safety1: Dict<SafetyOv>;
  safety2: Dict<SafetyOv>;
  symptoms: Dict<SymptomOv>;
  checklist: Dict<{ title: string; detail?: string }>;
  redflags: Dict<{ title: string; detail: string }>;
  affirmations: string[];
  names: { origins: Dict<string>; meanings: Dict<string> };
  misc: { categories: Dict<string>; countries: Dict<string> };
  localSafety: LocalSafety[];
  localNames: LocalNames;
};

const OVERLAYS: Record<Lang, Overlay> = {
  es: { weeks: es_weeks, safety1: es_safety1, safety2: es_safety2, symptoms: es_symptoms, checklist: es_checklist, redflags: es_redflags, affirmations: es_affirmations, names: es_names, misc: es_misc, localSafety: es_localSafety, localNames: es_localNames } as unknown as Overlay,
  de: { weeks: de_weeks, safety1: de_safety1, safety2: de_safety2, symptoms: de_symptoms, checklist: de_checklist, redflags: de_redflags, affirmations: de_affirmations, names: de_names, misc: de_misc, localSafety: de_localSafety, localNames: de_localNames } as unknown as Overlay,
  fr: { weeks: fr_weeks, safety1: fr_safety1, safety2: fr_safety2, symptoms: fr_symptoms, checklist: fr_checklist, redflags: fr_redflags, affirmations: fr_affirmations, names: fr_names, misc: fr_misc, localSafety: fr_localSafety, localNames: fr_localNames } as unknown as Overlay,
  pt: { weeks: pt_weeks, safety1: pt_safety1, safety2: pt_safety2, symptoms: pt_symptoms, checklist: pt_checklist, redflags: pt_redflags, affirmations: pt_affirmations, names: pt_names, misc: pt_misc, localSafety: pt_localSafety, localNames: pt_localNames } as unknown as Overlay,
};

export const OVERLAY_LANGS = Object.keys(OVERLAYS) as Lang[];

/** Market-specific safety ids per language, in the order they were authored. */
export const LOCAL_SAFETY_IDS: Partial<Record<ContentLang, string[]>> = {};

type Targets = {
  weeks: WeekContent[];
  safety: SafetyItem[];
  symptoms: SymptomGuide[];
  checklist: ChecklistItem[];
  redFlags: { id: string; title: L10n; detail: L10n }[];
  affirmations: L10n[];
  names: BabyName[];
  categories: { key: SafetyCategory; label: L10n }[];
  countries: Record<string, { country: L10n }>;
};

/**
 * Layer every translation onto the shared content objects. Safe to run more
 * than once (e.g. after a hot reload re-creates some of the targets): text is
 * simply re-assigned and items/names are only added when missing.
 */
export function applyContentOverlays(t: Targets): void {
  for (const lang of OVERLAY_LANGS) {
    try {
      applyOne(lang, OVERLAYS[lang], t);
    } catch (e) {
      // A broken translation file must never take the app down — English
      // (and Turkish) stay intact and the UI falls back to them.
      if (__DEV__) console.warn(`content overlay ${lang} failed`, e);
    }
  }
}

function applyOne(lang: Lang, ov: Overlay, t: Targets) {
  for (const w of t.weeks) {
    const o = ov.weeks?.[String(w.week)];
    if (!o) continue;
    w.size.title = { ...w.size.title, [lang]: o.sizeTitle };
    w.size.phrase = { ...w.size.phrase, [lang]: o.sizePhrase };
    w.size.name[lang] = o.sizePhrase;
    w.baby[lang] = o.baby;
    w.body[lang] = o.body;
    w.tips[lang] = o.tips;
    w.todo[lang] = o.todo;
  }

  const safety = { ...(ov.safety1 ?? {}), ...(ov.safety2 ?? {}) };
  for (const s of t.safety) {
    const o = safety[s.id];
    if (!o) continue;
    s.name[lang] = o.name;
    s.aliases[lang] = o.aliases ?? [];
    s.summary[lang] = o.summary;
    s.details[lang] = o.details;
    s.tips[lang] = o.tips;
  }

  for (const s of t.symptoms) {
    const o = ov.symptoms?.[s.id];
    if (!o) continue;
    s.name[lang] = o.name;
    s.aliases[lang] = o.aliases ?? [];
    s.about[lang] = o.about;
    s.relief[lang] = o.relief;
    s.callDoctor[lang] = o.callDoctor;
  }

  for (const c of t.checklist) {
    const o = ov.checklist?.[c.id];
    if (!o) continue;
    c.title[lang] = o.title;
    if (c.detail && o.detail) c.detail[lang] = o.detail;
  }

  for (const r of t.redFlags) {
    const o = ov.redflags?.[r.id];
    if (!o) continue;
    r.title[lang] = o.title;
    r.detail[lang] = o.detail;
  }

  if (Array.isArray(ov.affirmations) && ov.affirmations.length === t.affirmations.length) {
    t.affirmations.forEach((a, i) => {
      a[lang] = ov.affirmations[i];
    });
  }

  for (const c of t.categories) {
    const label = ov.misc?.categories?.[c.key];
    if (label) c.label[lang] = label;
  }
  for (const [code, entry] of Object.entries(t.countries)) {
    const label = ov.misc?.countries?.[code];
    if (label && !entry.country[lang]) entry.country[lang] = label;
  }

  // Baby names: origin vocabulary + meanings, then market lists.
  const origins = ov.names?.origins ?? {};
  const meanings = ov.names?.meanings ?? {};
  const byName = new Map(t.names.map((n) => [n.name.toLocaleLowerCase('en-US'), n] as const));
  for (const n of t.names) {
    const o = origins[n.origin.en];
    if (o) n.origin[lang] = o;
    const m = meanings[n.name];
    if (m) n.meaning[lang] = m;
  }
  const local = ov.localNames ?? {};
  for (const name of local.alsoPopular ?? []) {
    const hit = byName.get(name.toLocaleLowerCase('en-US'));
    if (hit && !hit.popular.includes(lang)) hit.popular.push(lang);
  }
  const originFor = (label: string): L10n => {
    const existing = t.names.find((n) => n.origin.en === label)?.origin;
    if (existing) return existing;
    const fresh = local.newOrigins?.[label];
    return fresh ? { ...fresh, en: fresh.en || label } : { en: label, [lang]: label };
  };
  for (const a of local.add ?? []) {
    const key = a.name.toLocaleLowerCase('en-US');
    const hit = byName.get(key);
    if (hit) {
      if (!hit.popular.includes(lang)) hit.popular.push(lang);
      continue;
    }
    const entry: BabyName = { name: a.name, gender: a.gender, origin: originFor(a.origin), meaning: a.meaning, popular: [lang] };
    t.names.push(entry);
    byName.set(key, entry);
  }

  // Market-specific safety items (never overwrite an existing id).
  const ids: string[] = [];
  const known = new Set(t.safety.map((s) => s.id));
  for (const item of ov.localSafety ?? []) {
    if (!item?.id) continue;
    if (known.has(item.id)) {
      // Already added by an earlier pass — still count it for this market.
      if (t.safety.find((s) => s.id === item.id)?.name[lang] === item.name[lang]) ids.push(item.id);
      continue;
    }
    t.safety.push({
      id: item.id,
      category: item.category,
      emoji: item.emoji,
      verdict: item.verdict,
      name: item.name,
      aliases: { ...item.aliases, en: item.aliases?.en ?? [] },
      summary: item.summary,
      details: item.details,
      tips: { ...item.tips, en: item.tips?.en ?? [] },
      sources: item.sources ?? [],
    });
    known.add(item.id);
    ids.push(item.id);
  }
  LOCAL_SAFETY_IDS[lang] = ids;
}
