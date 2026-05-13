// OpenAI client — used by Marigold AI for both conversational chat and
// camera-based photo analysis. The key is read from
// EXPO_PUBLIC_OPENAI_API_KEY, which means it ships in the JS bundle.
// Fine for personal dev builds, NEVER for a published app — for production
// route through your own backend or a Supabase edge function instead.

const OPENAI_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
const ENDPOINT = 'https://api.openai.com/v1/chat/completions';

export type ChatMsg = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

type ChatOpts = {
  model?: string;
  maxTokens?: number;
  jsonMode?: boolean;
};

export const openaiConfigured = (): boolean => Boolean(OPENAI_KEY);

const callOpenAI = async (body: object): Promise<string | null> => {
  if (!OPENAI_KEY) return null;
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENAI_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      if (__DEV__) {
        const text = await res.text();
        console.warn('[openai] HTTP', res.status, text.slice(0, 240));
      }
      return null;
    }
    const json = await res.json();
    const reply = json?.choices?.[0]?.message?.content;
    return typeof reply === 'string' ? reply : null;
  } catch (err) {
    if (__DEV__) console.warn('[openai] error', err);
    return null;
  }
};

export const openaiChat = async (
  system: string,
  history: ChatMsg[],
  opts: ChatOpts = {},
): Promise<string | null> => {
  const body: Record<string, unknown> = {
    model: opts.model ?? 'gpt-4o-mini',
    max_tokens: opts.maxTokens ?? 800,
    messages: [{ role: 'system', content: system }, ...history],
  };
  if (opts.jsonMode) body.response_format = { type: 'json_object' };
  return callOpenAI(body);
};

export const openaiVision = async (
  system: string,
  prompt: string,
  base64Image: string,
  opts: ChatOpts = {},
): Promise<string | null> => {
  const body: Record<string, unknown> = {
    model: opts.model ?? 'gpt-4o',
    max_tokens: opts.maxTokens ?? 700,
    messages: [
      { role: 'system', content: system },
      {
        role: 'user',
        content: [
          { type: 'text', text: prompt },
          {
            type: 'image_url',
            image_url: { url: `data:image/jpeg;base64,${base64Image}`, detail: 'low' },
          },
        ],
      },
    ],
  };
  if (opts.jsonMode) body.response_format = { type: 'json_object' };
  return callOpenAI(body);
};

export const parseJsonReply = <T = unknown>(raw: string | null): T | null => {
  if (!raw) return null;
  try {
    const cleaned = raw
      .trim()
      .replace(/^```(?:json)?/i, '')
      .replace(/```$/, '')
      .trim();
    return JSON.parse(cleaned) as T;
  } catch {
    return null;
  }
};
