// Verdict generation. Order of preference:
//   1. Supabase Edge Function `verdict` (recommended; key stays server-side)
//   2. Anthropic API directly (fine for prototypes / personal builds)
//   3. Local fallback bank (always available, makes the app feel "alive" offline)
//
// The function keeps the same shape regardless of provider, so callers don't
// have to branch.

import Anthropic from '@anthropic-ai/sdk';
import { getSupabase } from '@/lib/supabase';
import { Hue, Verdict } from '@/theme/colors';
import { buildDefaultVerdict, VERDICT_BANK, VerdictPayload } from '@/data/verdicts';

const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;

const SYSTEM = `You are Marigold, a calm, evidence-based pregnancy safety companion.
For an item the user is asking about, return JSON in exactly this shape:
{ "verdict": "safe" | "caution" | "avoid",
  "label": "short one-word lowercase tag",
  "hue": "rose" | "sage" | "lavender" | "amber" | "sand",
  "headline": "one short, warm sentence",
  "body": "2-3 sentences. Cite the concern by name (listeria, mercury, alcohol, etc).",
  "action": { "title": "short title", "body": "1-2 practical sentences" } }
Tone: warm, grounded, never alarmist. Never recommend a medication; suggest the user check with their midwife instead. Reviewed against NHS, ACOG and LactMed.`;

export type VerdictRequest = {
  item: string;
  mode: 'Food' | 'Menu' | 'Medication' | 'Cosmetic' | 'Activity';
  week: number;
  country: string;
};

const tryEdgeFunction = async (
  req: VerdictRequest,
): Promise<VerdictPayload | null> => {
  const sb = getSupabase();
  if (!sb) return null;
  try {
    const { data, error } = await sb.functions.invoke('verdict', {
      body: req,
    });
    if (error || !data) return null;
    return normaliseVerdict(req.item, data);
  } catch {
    return null;
  }
};

const tryAnthropic = async (
  req: VerdictRequest,
): Promise<VerdictPayload | null> => {
  if (!ANTHROPIC_KEY) return null;
  try {
    const client = new Anthropic({ apiKey: ANTHROPIC_KEY });
    const msg = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 600,
      system: SYSTEM,
      messages: [
        {
          role: 'user',
          content: `Item: ${req.item}\nMode: ${req.mode}\nWeek: ${req.week}\nCountry: ${req.country}\nReturn ONLY the JSON, no prose.`,
        },
      ],
    });
    const block = msg.content.find((c) => c.type === 'text');
    if (!block || block.type !== 'text') return null;
    const json = JSON.parse(block.text.trim().replace(/^```json|```$/g, '').trim());
    return normaliseVerdict(req.item, json);
  } catch {
    return null;
  }
};

const normaliseVerdict = (item: string, raw: any): VerdictPayload => ({
  name: item,
  label: String(raw.label ?? item.slice(0, 8)).toLowerCase(),
  hue: (['rose', 'sage', 'lavender', 'amber', 'sand'].includes(raw.hue)
    ? raw.hue
    : 'amber') as Hue,
  verdict: (['safe', 'caution', 'avoid'].includes(raw.verdict)
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
): Promise<VerdictPayload> => {
  // 1) Local bank wins for known items — keeps copy consistent and instant.
  if (VERDICT_BANK[req.item]) return VERDICT_BANK[req.item];

  // 2) Try edge function, then direct Anthropic call.
  const fromEdge = await tryEdgeFunction(req);
  if (fromEdge) return fromEdge;

  const fromClaude = await tryAnthropic(req);
  if (fromClaude) return fromClaude;

  // 3) Calm fallback so the experience never breaks.
  return buildDefaultVerdict(req.item, req.mode, req.week);
};
