// Verdict generation. Order of preference:
//   1. Supabase Edge Function `verdict` (recommended; key stays server-side)
//   2. Anthropic API directly (only when EXPO_PUBLIC_ANTHROPIC_API_KEY is set —
//      personal builds, never production: the key would ship in the bundle)
//   3. Local fallback bank (always available, makes the app feel "alive" offline)
//
// The function keeps the same shape regardless of provider, so callers don't
// have to branch.

import Anthropic from '@anthropic-ai/sdk';
import { getSupabase } from '@/lib/supabase';
import { Hue, Verdict } from '@/theme/colors';
import { buildDefaultVerdict, VERDICT_BANK, VerdictPayload } from '@/data/verdicts';

// The Anthropic key is only ever read on the client when explicitly opted in
// via the EXPO_PUBLIC_ prefix. Production builds keep the key on the server.
const ANTHROPIC_KEY = process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY;

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

const HUES = ['rose', 'sage', 'lavender', 'amber', 'sand'] as const;
const VERDICTS = ['safe', 'caution', 'avoid'] as const;

// Strip Markdown JSON fences and surrounding text. Claude usually returns just
// the JSON, but a defensive parse keeps us from blowing up the whole flow.
const parseJsonFromModel = (text: string): unknown => {
  const cleaned = text.trim().replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '').trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (!match) return null;
    try {
      return JSON.parse(match[0]);
    } catch {
      return null;
    }
  }
};

const tryEdgeFunction = async (
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

const tryAnthropic = async (
  req: VerdictRequest,
  signal?: AbortSignal,
): Promise<VerdictPayload | null> => {
  if (!ANTHROPIC_KEY) return null;
  try {
    const client = new Anthropic({
      apiKey: ANTHROPIC_KEY,
      // The SDK refuses to run in non-server environments unless explicitly
      // opted in. We ship this code path off by default; opt-in is documented.
      dangerouslyAllowBrowser: true,
    });
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
    if (signal?.aborted) return null;
    const block = msg.content.find((c) => c.type === 'text');
    if (!block || block.type !== 'text') return null;
    const json = parseJsonFromModel(block.text);
    if (!json) return null;
    return normaliseVerdict(req.item, json);
  } catch {
    return null;
  }
};

const normaliseVerdict = (item: string, raw: any): VerdictPayload => {
  const r = raw && typeof raw === 'object' ? raw : {};
  const action = r.action && typeof r.action === 'object' ? r.action : {};
  return {
    name: item,
    label: String(r.label ?? item.slice(0, 8)).toLowerCase(),
    hue: (HUES as readonly string[]).includes(r.hue) ? (r.hue as Hue) : 'amber',
    verdict: (VERDICTS as readonly string[]).includes(r.verdict)
      ? (r.verdict as Verdict)
      : 'safe',
    headline: String(r.headline ?? 'Yes — go ahead.'),
    body: String(r.body ?? ''),
    action: {
      title: String(action.title ?? 'Good to know'),
      body: String(action.body ?? ''),
    },
  };
};

export const fetchVerdict = async (
  req: VerdictRequest,
  signal?: AbortSignal,
): Promise<VerdictPayload> => {
  // 1) Local bank wins for known items — keeps copy consistent and instant.
  if (VERDICT_BANK[req.item]) return VERDICT_BANK[req.item];

  // 2) Try edge function, then direct Anthropic call.
  const fromEdge = await tryEdgeFunction(req, signal);
  if (fromEdge) return fromEdge;

  const fromClaude = await tryAnthropic(req, signal);
  if (fromClaude) return fromClaude;

  // 3) Calm fallback so the experience never breaks.
  return buildDefaultVerdict(req.item, req.mode, req.week);
};
