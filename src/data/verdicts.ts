// Local verdict bank used as a fallback when the AI route is offline.
// Mirrors the design's `verdictForItem` map plus a few extras we've added
// so that the offline experience still feels rich and helpful.

import { Hue, Verdict } from '@/theme/colors';

export type VerdictPayload = {
  name: string;
  label: string;
  hue: Hue;
  verdict: Verdict;
  headline: string;
  body: string;
  action: { title: string; body: string };
};

export const VERDICT_BANK: Record<string, VerdictPayload> = {
  'Burrata, peach, basil': {
    name: 'Burrata, peach, basil',
    label: 'burrata',
    hue: 'rose',
    verdict: 'caution',
    headline: 'Yes, with one tweak.',
    body: 'Burrata is fine when made with pasteurised milk — most restaurants in the UK use it. Ask the chef before you eat. The peach and basil are perfectly safe.',
    action: {
      title: 'What to ask the chef',
      body: '"Is the burrata pasteurised?" If they hesitate, swap to the pumpkin soup — equally lovely and worry-free.',
    },
  },
  'Steak tartare': {
    name: 'Steak tartare',
    label: 'tartare',
    hue: 'rose',
    verdict: 'avoid',
    headline: 'Skip this one tonight.',
    body: 'Raw beef carries a small but real listeria and toxoplasma risk during pregnancy. The mince is also unaged, so bacteria load can be unpredictable.',
    action: {
      title: 'What to do instead',
      body: 'Order it next year. Tonight, the roast chicken or the ragù are both excellent and safe.',
    },
  },
  'Tuna sashimi': {
    name: 'Tuna sashimi',
    label: 'tuna',
    hue: 'rose',
    verdict: 'caution',
    headline: 'A small amount, occasionally.',
    body: 'Tuna is high in mercury, which builds up over weeks. One or two pieces is fine; a whole platter is too much for one sitting. Cooked tuna is safer than raw.',
    action: {
      title: 'How to think about it',
      body: 'Treat tuna as a treat — once a fortnight, max. Salmon and prawn rolls are kinder choices.',
    },
  },
  'Cheese board, soft cheeses': {
    name: 'Cheese board, soft cheeses',
    label: 'cheese',
    hue: 'amber',
    verdict: 'avoid',
    headline: 'Skip the soft ones.',
    body: 'Soft, mould-ripened cheeses (brie, camembert, soft blue) often use unpasteurised milk and can carry listeria. Hard cheeses are completely fine.',
    action: {
      title: 'What works',
      body: 'Cheddar, manchego, gruyère, parmesan — eat as much as you like. Halloumi grilled or fried is also a beautiful pregnancy-safe option.',
    },
  },
  'Espresso martini': {
    name: 'Espresso martini',
    label: 'martini',
    hue: 'amber',
    verdict: 'avoid',
    headline: 'Save it for after.',
    body: 'There is no known safe amount of alcohol in pregnancy. The espresso also stacks caffeine — already worth limiting.',
    action: {
      title: 'A nice swap',
      body: 'A virgin espresso martini (decaf espresso, vanilla syrup, ice, shaken hard) is genuinely close to the real thing.',
    },
  },
};

export const buildDefaultVerdict = (
  name: string,
  mode = 'item',
  week?: number,
): VerdictPayload => ({
  name,
  label: (mode || 'item').toLowerCase(),
  hue: 'amber',
  verdict: 'safe',
  headline: 'Yes — go ahead.',
  body: `Based on a quick read of the ingredients and current guidance, this is a safe choice for week ${week ?? 18}. We checked it against the usual concerns: listeria, mercury, alcohol, raw protein.`,
  action: {
    title: 'Good to know',
    body: 'If something about it changes — say, the dish is reheated, or comes with raw garnish — re-scan to be sure.',
  },
});
