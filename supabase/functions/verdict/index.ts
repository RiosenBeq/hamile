// Supabase Edge Function: POST /functions/v1/verdict
// Body: { item, mode, week, country }
// Returns the same shape as our client-side `VerdictPayload`.
// Keep your ANTHROPIC_API_KEY in Supabase env, never in the mobile bundle.

import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import Anthropic from 'npm:@anthropic-ai/sdk@^0.32.1';

const SYSTEM = `You are Marigold, a calm, evidence-based pregnancy safety companion.
For an item the user is asking about, return JSON in exactly this shape:
{ "verdict": "safe" | "caution" | "avoid",
  "label": "short one-word lowercase tag",
  "hue": "rose" | "sage" | "lavender" | "amber" | "sand",
  "headline": "one short, warm sentence",
  "body": "2-3 sentences citing the concern by name",
  "action": { "title": "short title", "body": "1-2 practical sentences" } }
Tone: warm, grounded, never alarmist.`;

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405, headers: cors });

  let body: any = {};
  try {
    body = await req.json();
  } catch {
    return new Response('Bad request', { status: 400, headers: cors });
  }

  const apiKey = Deno.env.get('ANTHROPIC_API_KEY');
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'ANTHROPIC_API_KEY not configured' }), {
      status: 500,
      headers: { ...cors, 'content-type': 'application/json' },
    });
  }

  const client = new Anthropic({ apiKey });
  try {
    const msg = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 600,
      system: SYSTEM,
      messages: [
        {
          role: 'user',
          content: `Item: ${body.item}\nMode: ${body.mode}\nWeek: ${body.week}\nCountry: ${body.country}\nReturn ONLY the JSON.`,
        },
      ],
    });
    const block = msg.content.find((c: any) => c.type === 'text');
    const text = block && block.type === 'text' ? block.text : '{}';
    const json = JSON.parse(text.trim().replace(/^```json|```$/g, '').trim());
    return new Response(JSON.stringify(json), {
      headers: { ...cors, 'content-type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...cors, 'content-type': 'application/json' },
    });
  }
});
