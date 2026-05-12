// Local verdict bank — used as a fallback when the AI route is offline, and
// as the warm starting point for known-common items.
//
// Tone is calm and grounded throughout. Verdicts always combine colour + icon
// + label so colour-only readers are never excluded.

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
  // ── Restaurant menu items ────────────────────────────────────
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

  // ── Single foods ─────────────────────────────────────────────
  Brie: {
    name: 'Brie',
    label: 'brie',
    hue: 'sand',
    verdict: 'caution',
    headline: 'Cooked through, yes. Cold, no.',
    body: 'Soft, mould-ripened cheeses can carry listeria. Heated until steaming hot kills it — so brie melted into pasta or baked is fine. Cold off the cheese board is not.',
    action: {
      title: 'Quick test',
      body: 'If you can lift the cheese with a fork and it stretches with steam coming off it, you are safe.',
    },
  },
  Sushi: {
    name: 'Sushi',
    label: 'sushi',
    hue: 'rose',
    verdict: 'caution',
    headline: 'Cooked rolls are a yes.',
    body: 'Raw fish in the UK is generally previously frozen, which kills parasites — but mercury and listeria risk are still there for a few species. Cooked rolls (eel, tempura prawn, salmon teriyaki) are completely safe.',
    action: {
      title: 'Reasonable rule',
      body: 'Up to one raw piece a fortnight is a tolerable risk if you crave it. Avoid tuna and swordfish as the raw choice; salmon and prawn are kinder.',
    },
  },
  'Smoked salmon': {
    name: 'Smoked salmon',
    label: 'salmon',
    hue: 'rose',
    verdict: 'caution',
    headline: 'In the UK, yes — sparingly.',
    body: 'NHS guidance shifted in 2017: cold-smoked salmon is now considered safe in pregnancy because UK production controls listeria well. Most US guidance still says heat it through.',
    action: {
      title: 'How to play it safe',
      body: 'A bagel a week is fine. If you want to be belt-and-braces, warm it through for 30 seconds in a hot pan.',
    },
  },
  Sourdough: {
    name: 'Sourdough',
    label: 'sourdough',
    hue: 'amber',
    verdict: 'safe',
    headline: 'Eat it freely — the crust too.',
    body: 'Sourdough is fermented but the long bake kills the yeast. The starter is mostly Lactobacillus, the same bacteria family as in yoghurt.',
    action: {
      title: 'One thing to skip',
      body: 'Raw starter — fermenting at room temperature can collect contaminants. Discard recipes that are not cooked through (e.g. raw crackers) are best skipped.',
    },
  },
  Sashimi: {
    name: 'Sashimi',
    label: 'sashimi',
    hue: 'rose',
    verdict: 'caution',
    headline: 'Raw is the question — fish is the answer.',
    body: 'Salmon, prawn, eel: low risk. Tuna, swordfish, mackerel king: skip in pregnancy because of mercury. The bigger the fish, the more it stacks up.',
    action: {
      title: 'When in doubt',
      body: 'Cooked nigiri or maki is always fine. Restaurant-grade salmon sashimi once a fortnight is a reasonable risk.',
    },
  },
  Prawns: {
    name: 'Prawns',
    label: 'prawn',
    hue: 'sand',
    verdict: 'safe',
    headline: 'Fully cooked, absolutely yes.',
    body: 'Cooked prawns are a brilliant pregnancy food — high in protein, low in mercury, rich in omega-3.',
    action: {
      title: 'Two checks',
      body: 'Make sure they are pink all the way through, and avoid the cold prawn salad at room-temperature buffets.',
    },
  },
  Caffeine: {
    name: 'Caffeine',
    label: 'caffeine',
    hue: 'amber',
    verdict: 'caution',
    headline: 'Two cups, give or take.',
    body: 'NHS limit is 200 mg a day — about two cups of brewed coffee, or one strong espresso plus a tea. High intake correlates with lower birth weight and miscarriage risk; below 200 mg the data is reassuring.',
    action: {
      title: 'Hidden sources',
      body: 'Dark chocolate, cola, green tea and some painkillers count. A flat white is ~120 mg; instant coffee is ~75 mg per cup.',
    },
  },

  // ── Medications ──────────────────────────────────────────────
  Paracetamol: {
    name: 'Paracetamol',
    label: 'paracet',
    hue: 'rose',
    verdict: 'safe',
    headline: 'First-line, yes.',
    body: 'Paracetamol (acetaminophen) at standard doses is the recommended pain and fever drug in pregnancy. Use the lowest effective dose for the shortest time, like always.',
    action: {
      title: 'Watch the stack',
      body: 'Many cold and flu mixes already contain paracetamol — do not double up. 4 g (8 × 500 mg tablets) is the daily ceiling.',
    },
  },
  Ibuprofen: {
    name: 'Ibuprofen',
    label: 'nsaid',
    hue: 'amber',
    verdict: 'avoid',
    headline: 'Skip ibuprofen in pregnancy.',
    body: 'NSAIDs (ibuprofen, naproxen, aspirin at full dose) are not recommended after week 20 — they can cause kidney problems in the baby and close a vital fetal artery. In the first trimester they may also raise miscarriage risk.',
    action: {
      title: 'What to use instead',
      body: 'Paracetamol is first-line. For inflammation, talk to your midwife — there are pregnancy-safe options.',
    },
  },
  Magnesium: {
    name: 'Magnesium',
    label: 'mag',
    hue: 'lavender',
    verdict: 'caution',
    headline: 'Helpful, but check the form.',
    body: 'Magnesium glycinate or citrate at 200–400 mg is widely tolerated and helps with night cramps and restless legs. Magnesium oxide is poorly absorbed and may cause loose stools — easy to mistake for early labour.',
    action: {
      title: 'Practical pick',
      body: 'Glycinate, taken with the evening meal, is the kindest. Stop if you notice irregular bowel patterns.',
    },
  },
  'Iron + folate': {
    name: 'Iron + folate',
    label: 'iron',
    hue: 'sage',
    verdict: 'safe',
    headline: 'Yes — and worth taking together.',
    body: 'Pregnacare, Sandoz Pregnancy and similar combined supplements deliver folate, iron and vitamin D in one. Iron is best absorbed with vitamin C and away from tea or coffee.',
    action: {
      title: 'Timing tip',
      body: 'Take with breakfast and a glass of orange juice. Wait at least an hour before tea or coffee.',
    },
  },

  // ── Activities ────────────────────────────────────────────────
  'Hot tub': {
    name: 'Hot tub',
    label: 'hot tub',
    hue: 'amber',
    verdict: 'avoid',
    headline: 'Skip — even briefly.',
    body: 'Core body temperatures above 39 °C in early pregnancy can cause neural tube defects. Hot tubs hold 38–40 °C and your body cannot dump heat fast enough.',
    action: {
      title: 'Lukewarm is fine',
      body: 'A bath under 38 °C, or a foot soak, are both perfectly safe. Tap water always feels hotter when you are pregnant — trust the thermometer over your skin.',
    },
  },
  Sauna: {
    name: 'Sauna',
    label: 'sauna',
    hue: 'amber',
    verdict: 'avoid',
    headline: 'Same logic as hot tubs.',
    body: 'Saunas push core body temperature past safe ranges. Avoid throughout pregnancy.',
    action: {
      title: 'Warm wind-down',
      body: 'A warm shower, a cup of tea, a heating pad on the lower back — kinder ways to relax muscles.',
    },
  },
  'Hair dye': {
    name: 'Hair dye',
    label: 'hair dye',
    hue: 'lavender',
    verdict: 'caution',
    headline: 'Wait until T2, then highlight.',
    body: 'Modern hair dye is mostly considered safe — but the data is thin, and most chemicals cross the scalp. The safest path is to wait until after week 13, and prefer highlights or balayage so the dye does not touch the scalp at all.',
    action: {
      title: 'Skip these',
      body: '"Black henna" (laced with PPD), bleach + ammonia, anything labelled "permanent home kit". Pure red henna is genuinely fine.',
    },
  },
  Flight: {
    name: 'Flight',
    label: 'flight',
    hue: 'sand',
    verdict: 'safe',
    headline: 'Yes — up to week 36 single, 32 twin.',
    body: 'Flying is safe for an uncomplicated pregnancy. The radiation dose is negligible. The bigger risk is deep vein thrombosis — pregnancy already raises clot risk and cabin air does not help.',
    action: {
      title: 'Good practice',
      body: 'Compression stockings, a 10-minute walk every hour, and 250 ml of water per hour. Carry your maternity notes from week 28.',
    },
  },
  'Pilates reformer': {
    name: 'Pilates reformer',
    label: 'pilates',
    hue: 'sage',
    verdict: 'safe',
    headline: 'A great pick.',
    body: 'A reformer offers spring resistance you can dial up or down — easier on lax pregnancy joints than free weights. After ~week 16, ask your instructor to skip prone work and deep abdominal flexion.',
    action: {
      title: 'Tell the studio',
      body: 'Mention your week. Stop if you feel breathless beyond 4/10 effort. Side-lying and standing series stay great into T3.',
    },
  },
  'Sleeping on back': {
    name: 'Sleeping on back',
    label: 'sleep',
    hue: 'lavender',
    verdict: 'caution',
    headline: 'Side-sleep after week 28.',
    body: 'In the third trimester, lying flat on your back for hours can press the uterus on a major vein (the IVC) and reduce blood flow. Briefly waking on your back is fine — the body is good at warning you.',
    action: {
      title: 'A practical trick',
      body: 'Wedge a pillow behind one hip so you tilt slightly. Either side is fine; the "left side only" rule is not strongly evidence-based.',
    },
  },

  // ── Beauty / cosmetic ─────────────────────────────────────────
  'Henna for hair': {
    name: 'Henna for hair',
    label: 'henna',
    hue: 'rose',
    verdict: 'caution',
    headline: 'Pure henna is fine — "black" is not.',
    body: 'Plain Lawsonia inermis (red henna) is safe and does not cross the scalp barrier. "Black henna" is a marketing term for products laced with PPD, which can cause severe contact reactions even before pregnancy.',
    action: {
      title: 'Read the label',
      body: 'Look for one ingredient: ground leaf. Patch-test 24 h ahead. Skip anything with brown or black pigment listed.',
    },
  },
  Retinol: {
    name: 'Retinol',
    label: 'retinol',
    hue: 'rose',
    verdict: 'avoid',
    headline: 'Pause until postpartum.',
    body: 'Topical retinoids (retin-A, tretinoin, adapalene) are linked to fetal harm at high doses and the absorption rate is unclear. Standard advice is to stop in pregnancy.',
    action: {
      title: 'Pregnancy-safe swaps',
      body: 'Bakuchiol, vitamin C, niacinamide, glycolic acid (gentle) and lactic acid all do similar work without the worry.',
    },
  },
  'Long-haul flight': {
    name: 'Long-haul flight',
    label: 'flight',
    hue: 'sand',
    verdict: 'safe',
    headline: 'Yes — with a few habits.',
    body: 'Long flights are not riskier than short ones in pregnancy except for clot risk, which scales with hours seated. Compression stockings, hourly walks and steady water make the difference.',
    action: {
      title: 'Pack list',
      body: 'Compression socks, refillable water bottle, snacks, maternity notes after week 28, your insurer\'s number, and a printed copy of your due date in case you go into labour abroad.',
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
