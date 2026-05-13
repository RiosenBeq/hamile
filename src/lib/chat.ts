// Ask Marigold — conversational AI helper. Calm, evidence-based persona,
// optimised for back-and-forth. Routes through OpenAI (see src/lib/openai.ts);
// falls back to canned answers when no key / no network.

import { getSupabase } from '@/lib/supabase';
import { openaiChat, openaiConfigured, ChatMsg } from '@/lib/openai';

const SYSTEM = `You are Marigold, a calm, evidence-based pregnancy companion.
You give warm, grounded answers about food, medication, activity, symptoms and
emotional well-being during pregnancy and the postpartum period.

Rules:
- Tone: warm, never alarmist. Short paragraphs. No emoji.
- Cite the concern by name when relevant (listeria, mercury, alcohol, etc).
- Never recommend a specific medication. Suggest the user check with their
  midwife / doctor / pharmacist instead.
- Reviewed against NHS, ACOG and LactMed.
- If a question is outside pregnancy/postpartum scope, answer briefly and
  gently steer back.
- Keep replies to 2-4 short paragraphs unless the user asks for detail.`;

export type ChatRole = 'user' | 'assistant';

export type ChatTurn = {
  role: ChatRole;
  content: string;
};

export type ChatContext = {
  week: number;
  country: string;
  stage: 'ttc' | 'pregnant' | 'postpartum';
  conditions: string[];
  language?: string;
};

const buildUserPrefix = (ctx: ChatContext) => {
  const parts = [`Stage: ${ctx.stage}`, `Week: ${ctx.week}`, `Country: ${ctx.country}`];
  if (ctx.conditions.length) parts.push(`Conditions: ${ctx.conditions.join(', ')}`);
  if (ctx.language) parts.push(`Reply in: ${ctx.language}`);
  return `[Context — for your reference, do not quote back] ${parts.join(' · ')}`;
};

const tryEdgeFunction = async (
  history: ChatTurn[],
  ctx: ChatContext,
): Promise<string | null> => {
  const sb = getSupabase();
  if (!sb) return null;
  try {
    const { data, error } = await sb.functions.invoke('chat', {
      body: { history, context: ctx },
    });
    if (error || !data) return null;
    if (typeof data === 'string') return data;
    if (typeof data?.reply === 'string') return data.reply;
    return null;
  } catch {
    return null;
  }
};

const tryOpenAI = async (
  history: ChatTurn[],
  ctx: ChatContext,
): Promise<string | null> => {
  if (!openaiConfigured()) return null;
  const messages: ChatMsg[] = history.map((h, i) => {
    if (i === 0 && h.role === 'user') {
      return { role: 'user', content: `${buildUserPrefix(ctx)}\n\n${h.content}` };
    }
    return { role: h.role, content: h.content };
  });
  return openaiChat(SYSTEM, messages, { model: 'gpt-4o-mini', maxTokens: 800 });
};

const FALLBACKS: { match: RegExp; reply: string }[] = [
  {
    match: /\b(brie|cheese|camembert|blue|soft cheese)\b/i,
    reply:
      "Soft mould-ripened cheeses (brie, camembert, soft blue) sometimes use unpasteurised milk, which can carry listeria. Hard cheeses are completely fine.\n\nIf the label says pasteurised — or the restaurant confirms — you can enjoy it. Otherwise pick a cheddar, manchego or grilled halloumi instead.",
  },
  {
    match: /\b(coffee|caffeine|espresso|tea)\b/i,
    reply:
      "Up to about 200mg of caffeine a day is generally considered safe — that's roughly two small mugs of coffee or three of black tea.\n\nDecaf, herbal tisanes (avoid raspberry leaf in the first two trimesters), and rooibos are all gentle options if you want more cups.",
  },
  {
    match: /\b(sushi|sashimi|raw fish|tuna)\b/i,
    reply:
      "Cooked sushi rolls are fine. Raw fish carries a small listeria risk, and high-mercury fish like tuna, swordfish and king mackerel are best limited to one small portion a fortnight.\n\nSalmon, prawns and most farmed fish are safer picks. If you're craving sashimi, frozen-then-thawed is lower-risk than fresh from a counter.",
  },
  {
    match: /\b(alcohol|wine|beer|champagne|cocktail)\b/i,
    reply:
      "There's no known safe amount of alcohol in pregnancy, so the calm advice is to skip it.\n\nIf you'd like the ritual without the risk, a virgin espresso martini (decaf espresso, vanilla syrup, shaken hard) is genuinely close — and most decent bars will make a thoughtful zero-proof version of anything on the menu.",
  },
  {
    match: /\b(exercise|run|running|yoga|pilates|workout|gym)\b/i,
    reply:
      "Gentle movement is great through pregnancy — walking, prenatal yoga, swimming, light strength work. If you were already running, it's usually fine to continue at an easy pace.\n\nAfter the first trimester, skip deep twists and supine poses, and stop anything that makes you breathless enough that you can't talk. Listen to your body more than the clock.",
  },
  {
    match: /\b(paracetamol|tylenol|ibuprofen|aspirin|medication|medicine|drug)\b/i,
    reply:
      "I won't recommend a specific medicine — your midwife or pharmacist is the right person for that, especially because the answer depends on which trimester you're in and what else you're taking.\n\nFor general aches and fevers, many people are told paracetamol is the first choice, but please check before taking anything.",
  },
  {
    match: /\b(sleep|tired|insomnia|fatigue)\b/i,
    reply:
      "Tiredness in pregnancy is your body working hard. A few things that help: a short afternoon rest if you can swing it, side-lying with a pillow between the knees, dimming screens an hour before bed, and a light snack with protein if you're waking hungry.\n\nIf you're truly exhausted past the first trimester, mention it at your next appointment — iron levels are worth a check.",
  },
  {
    match: /\b(anxiety|worry|scared|stress|overwhelmed|nervous)\b/i,
    reply:
      "Pregnancy worry is so common that it's almost a rite of passage. A small thing that helps: notice the worry, name it, and ask yourself what one calm action would feel like.\n\nIf the anxiety is louder than the rest of your thoughts for more than a couple of weeks, please mention it to your midwife. There are gentle, evidence-based ways to support you.",
  },
];

const cannedFallback = (question: string): string => {
  const hit = FALLBACKS.find((f) => f.match.test(question));
  if (hit) return hit.reply;
  return "I'm running in offline mode right now, so I can't look this up in real time. The calm fallback: if it's about food, default to pasteurised and fully cooked. If it's about activity, keep it gentle. If it's a medication question, ask your midwife or pharmacist.\n\nWhen EXPO_PUBLIC_OPENAI_API_KEY is set (or the Supabase chat edge function is wired up), I can give you a proper answer.";
};

export const askMarigold = async (
  history: ChatTurn[],
  ctx: ChatContext,
): Promise<string> => {
  const fromEdge = await tryEdgeFunction(history, ctx);
  if (fromEdge) return fromEdge;

  const fromOpenAI = await tryOpenAI(history, ctx);
  if (fromOpenAI) return fromOpenAI;

  const lastUser = [...history].reverse().find((h) => h.role === 'user');
  return cannedFallback(lastUser?.content ?? '');
};

export const chatConfigured = (): boolean => openaiConfigured() || Boolean(getSupabase());

export const SUGGESTED_QUESTIONS = [
  'Is brie safe if it says pasteurised?',
  'How much coffee can I have in week 18?',
  'Can I keep running at easy pace?',
  'Trouble sleeping — what helps?',
];
