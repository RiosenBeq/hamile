// Verdict generation — text path and camera (vision) path.
//
// Marigold AI is OFF in v1 — the app ships with the bundled, cited safety
// library instead. It only turns on when EXPO_PUBLIC_AI_ENABLED=1 AND the
// Supabase edge functions are configured, so no API key ever ships in the
// client and no personal data reaches a third-party AI without a backend
// (and, per App Review 5.1.2(i), an explicit consent screen).
//
// Order of preference for both paths:
//   1. Supabase Edge Function `verdict` / `verdict-photo` (key stays server-side)
//   2. Local fallback bank (always available, keeps the app responsive offline)
//
// The function keeps the same shape regardless of provider, so callers don't
// have to branch.

import { getSupabase, supabaseConfigured } from '@/lib/supabase';

/** True only when the optional AI backend is explicitly enabled. */
export const aiConfigured = (): boolean =>
  process.env.EXPO_PUBLIC_AI_ENABLED === '1' && supabaseConfigured();
import { Hue, Verdict } from '@/theme/colors';
import { buildDefaultVerdict, VERDICT_BANK, VerdictPayload } from '@/data/verdicts';

const SYSTEM = `You are Marigold, a calm, evidence-based pregnancy safety companion.
For an item the user is asking about, return JSON in exactly this shape:
{ "name": "what the user actually saw — short, human (e.g. 'Brie, peach, basil')",
  "verdict": "safe" | "caution" | "avoid",
  "label": "short one-word lowercase tag",
  "hue": "rose" | "sage" | "lavender" | "amber" | "sand",
  "headline": "one short, warm sentence",
  "body": "2-3 sentences. Cite the concern by name (listeria, mercury, alcohol, etc).",
  "action": { "title": "short title", "body": "1-2 practical sentences" } }
Tone: warm, grounded, never alarmist. Never recommend a medication; suggest the user check with their midwife instead. Reviewed against NHS, ACOG and LactMed.`;

export type Mode = 'Food' | 'Menu' | 'Medication' | 'Cosmetic' | 'Activity';

export type VerdictRequest = {
  item: string;
  mode: Mode;
  week: number;
  country: string;
  language?: string;
};

export type PhotoRequest = {
  base64: string;
  mode: Mode;
  week: number;
  country: string;
  language?: string;
};

const HUES = ['rose', 'sage', 'lavender', 'amber', 'sand'] as const;
const VERDICTS = ['safe', 'caution', 'avoid'] as const;

const tryTextEdge = async (
  req: VerdictRequest,
  signal?: AbortSignal,
): Promise<VerdictPayload | null> => {
  const sb = getSupabase();
  if (!sb) return null;
  try {
    const { data, error } = await sb.functions.invoke('verdict', { body: req });
    if (signal?.aborted) return null;
    if (error || !data) return null;
    return normaliseVerdict(req.item, data);
  } catch {
    return null;
  }
};

const tryPhotoEdge = async (
  req: PhotoRequest,
  signal?: AbortSignal,
): Promise<VerdictPayload | null> => {
  const sb = getSupabase();
  if (!sb) return null;
  try {
    const { data, error } = await sb.functions.invoke('verdict-photo', { body: req });
    if (signal?.aborted) return null;
    if (error || !data) return null;
    return normaliseVerdict(data.name || 'Scanned item', data);
  } catch {
    return null;
  }
};

const normaliseVerdict = (item: string, raw: any): VerdictPayload => ({
  name: String(raw.name ?? item),
  label: String(raw.label ?? item.slice(0, 10)).toLowerCase(),
  hue: ((HUES as readonly string[]).includes(raw.hue) ? raw.hue : 'amber') as Hue,
  verdict: ((VERDICTS as readonly string[]).includes(raw.verdict)
    ? raw.verdict
    : 'safe') as Verdict,
  headline: String(raw.headline ?? 'Yes — go ahead.'),
  body: String(raw.body ?? ''),
  action: {
    title: String(raw.action?.title ?? 'Good to know'),
    body: String(raw.action?.body ?? ''),
  },
});

export const fetchVerdict = async (
  req: VerdictRequest,
  signal?: AbortSignal,
): Promise<VerdictPayload> => {
  if (VERDICT_BANK[req.item]) return VERDICT_BANK[req.item];

  const fromEdge = await tryTextEdge(req, signal);
  if (fromEdge) return fromEdge;
  if (signal?.aborted) return buildDefaultVerdict(req.item, req.mode, req.week);

  return buildDefaultVerdict(req.item, req.mode, req.week);
};

export const analyzePhoto = async (
  req: PhotoRequest,
  signal?: AbortSignal,
): Promise<VerdictPayload> => {
  const fromEdge = await tryPhotoEdge(req, signal);
  if (fromEdge) return fromEdge;
  if (signal?.aborted) return fallbackPhotoPayload();

  return fallbackPhotoPayload();
};

const fallbackPhotoPayload = (): VerdictPayload => ({
  name: 'Scanned item',
  label: 'scan',
  hue: 'sand',
  verdict: 'safe',
  headline: "We couldn't read the photo clearly.",
  body:
    "We can't analyse photos right now. Try again with more light, or search the item by name in the Can I…? library.",
  action: {
    title: 'Type it instead',
    body: 'Tap "Type instead" on the scan screen and we\'ll give you the verdict that way.',
  },
});
