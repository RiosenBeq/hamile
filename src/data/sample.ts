import { Hue, Verdict } from '@/theme/colors';

export type RecentItem = {
  id: string;
  name: string;
  label: string;
  hue: Hue;
  verdict: Verdict;
  when: string;
};

export type JournalItem = RecentItem & { week: number };

export const SAMPLE_USER = {
  name: 'Jane',
  week: 18,
  country: 'United Kingdom',
};

export const SAMPLE_RECENTS: RecentItem[] = [
  { id: '1', name: 'Brie', label: 'brie', hue: 'sand', verdict: 'caution', when: 'Today · 1:14 pm' },
  { id: '2', name: 'Paracetamol', label: 'paracet', hue: 'rose', verdict: 'safe', when: 'Today · 9:02 am' },
  { id: '3', name: 'Hot tub', label: 'hot tub', hue: 'amber', verdict: 'avoid', when: 'Yesterday' },
  { id: '4', name: 'Decaf coffee', label: 'decaf', hue: 'sand', verdict: 'safe', when: 'Mon' },
];

export const SAMPLE_JOURNAL: JournalItem[] = [
  { id: 'j1', week: 18, name: 'Brie at lunch', label: 'brie', hue: 'sand', verdict: 'caution', when: 'Today · 1:14 pm' },
  { id: 'j2', week: 18, name: 'Paracetamol 500mg', label: 'paracet', hue: 'rose', verdict: 'safe', when: 'Today · 9:02 am' },
  { id: 'j3', week: 17, name: 'Sourdough starter', label: 'sourdough', hue: 'amber', verdict: 'safe', when: 'Sun' },
  { id: 'j4', week: 17, name: 'Hot tub at the spa', label: 'hot tub', hue: 'amber', verdict: 'avoid', when: 'Sat' },
  { id: 'j5', week: 16, name: 'Tuna sashimi (1pc)', label: 'tuna', hue: 'rose', verdict: 'caution', when: 'Wed' },
  { id: 'j6', week: 16, name: 'Pilates reformer', label: 'pilates', hue: 'sage', verdict: 'safe', when: 'Mon' },
  { id: 'j7', week: 15, name: 'Hair dye (semi-perm)', label: 'hair dye', hue: 'lavender', verdict: 'caution', when: 'Apr 18' },
];

export const REMINDERS = [
  { icon: 'calendar' as const, title: 'Anomaly scan', sub: 'Thursday 14 May · 10:30 with Dr. Shah', tag: 'Doctor' },
  { icon: 'heart' as const, title: 'Iron + folate', sub: 'Daily, with breakfast', tag: 'Routine' },
  { icon: 'spark' as const, title: 'Glucose test prep', sub: "In 4 weeks · we'll remind you", tag: 'Heads-up' },
];

export const TRENDING = [
  { name: 'Sourdough at week 12', count: '1,248 women asked', verdict: 'safe' as Verdict },
  { name: 'Magnesium for cramps', count: '972 asked', verdict: 'caution' as Verdict },
  { name: 'Henna for hair', count: '610 asked', verdict: 'caution' as Verdict },
  { name: 'Pilates reformer', count: '488 asked', verdict: 'safe' as Verdict },
];

export const CATEGORIES = [
  { k: 'food', label: 'Food', hue: 'sage' as Hue },
  { k: 'drinks', label: 'Drinks', hue: 'amber' as Hue },
  { k: 'meds', label: 'Medications', hue: 'rose' as Hue },
  { k: 'activities', label: 'Activities', hue: 'lavender' as Hue },
  { k: 'travel', label: 'Travel', hue: 'sand' as Hue },
  { k: 'beauty', label: 'Beauty', hue: 'rose' as Hue },
];

export const ACTIVITY_LIST: [string, Verdict, string][] = [
  ['Sauna', 'avoid', 'High heat · core temp'],
  ['Hot tub', 'avoid', 'Same — short, lukewarm baths fine'],
  ['Yoga (prenatal)', 'safe', 'Avoid deep twists & supine after T2'],
  ['Running', 'caution', 'Continue if you already ran. Easy pace.'],
  ['Massage', 'safe', 'Side-lying, second trimester onward'],
  ['Hair dye', 'caution', 'Wait until T2; semi-permanent preferred'],
  ['Flight', 'safe', 'Up to week 36 single, 32 twin'],
  ['Sushi class', 'caution', 'Cooked rolls only'],
  ['Spa facial', 'safe', 'Skip retinol & heavy heat'],
  ['Painting a room', 'caution', 'Latex paint, ventilate well'],
  ['Cleaning kitty litter', 'avoid', 'Toxoplasmosis risk'],
  ['Theme park', 'avoid', 'G-forces & jolts'],
  ['Diving', 'avoid', 'Pressure changes'],
  ['Cycling', 'caution', 'Stationary preferred after T2'],
  ['Cold plunge', 'caution', 'Brief, never icy'],
];

export type Dish = { name: string; sub: string; verdict: Verdict; why?: string };
export const SAMPLE_MENU: Dish[] = [
  { name: 'Burrata, peach, basil', sub: '£14', verdict: 'caution', why: 'Confirm pasteurised milk' },
  { name: 'Pumpkin soup, sage oil', sub: '£9', verdict: 'safe' },
  { name: 'Steak tartare', sub: '£21', verdict: 'avoid', why: 'Raw beef · listeria risk' },
  { name: 'Roast chicken, potatoes', sub: '£24', verdict: 'safe' },
  { name: 'Tagliatelle, beef ragù', sub: '£19', verdict: 'safe' },
  { name: 'Tuna sashimi', sub: '£17', verdict: 'caution', why: 'High-mercury fish · keep small' },
  { name: 'Grilled aubergine, tahini', sub: '£15', verdict: 'safe' },
  { name: 'Cheese board, soft cheeses', sub: '£18', verdict: 'avoid', why: 'Unpasteurised varieties likely' },
  { name: 'Espresso martini', sub: '£12', verdict: 'avoid', why: 'Alcohol' },
  { name: 'Apple sorbet', sub: '£7', verdict: 'safe' },
];

export const INTENTIONS = [
  "It's okay to ask the same question twice.",
  'You are doing more than you can see.',
  'Slow is also a kind of progress.',
  'Rest counts as preparation.',
  'Trust the questions you keep asking.',
];

// Approximate baby-fruit metaphors per week — used by the Baby sheet.
export const WEEK_METAPHORS: Record<number, { fruit: string; length: string; weight: string; hr: string; note: string }> = {
  16: { fruit: 'an avocado', length: '11.5 cm', weight: '110 g', hr: '152', note: 'Tiny limbs are now coordinated. They might suck a thumb.' },
  17: { fruit: 'a turnip', length: '13 cm', weight: '140 g', hr: '150', note: 'Sweat glands are forming. The skeleton is hardening from cartilage.' },
  18: { fruit: 'a sweet potato', length: '14 cm', weight: '190 g', hr: '148', note: "This week, the baby's hearing is sharpening. Hum along to your favourite song — they may hear the rhythm." },
  19: { fruit: 'a mango', length: '15 cm', weight: '240 g', hr: '147', note: 'Vernix — the white, waxy coating — starts protecting the skin.' },
  20: { fruit: 'a banana', length: '16.5 cm', weight: '300 g', hr: '146', note: 'Halfway. You may start to feel the first proper kicks soon.' },
};

export const COUNTRIES = [
  'United Kingdom', 'United States', 'France', 'Germany', 'Japan',
  'Australia', 'Canada', 'Italy', 'Turkey',
];

export const CONDITIONS = [
  'Gestational diabetes', 'Hypertension', 'Twins', 'IVF', 'Previous loss', 'None of these',
];
