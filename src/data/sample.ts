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
  { id: '5', name: 'Magnesium', label: 'mag', hue: 'lavender', verdict: 'caution', when: 'Sun' },
  { id: '6', name: 'Sourdough', label: 'sourdough', hue: 'amber', verdict: 'safe', when: 'Sat' },
];

export const SAMPLE_JOURNAL: JournalItem[] = [
  { id: 'j1', week: 18, name: 'Brie at lunch', label: 'brie', hue: 'sand', verdict: 'caution', when: 'Today · 1:14 pm' },
  { id: 'j2', week: 18, name: 'Paracetamol 500mg', label: 'paracet', hue: 'rose', verdict: 'safe', when: 'Today · 9:02 am' },
  { id: 'j3', week: 18, name: 'Decaf flat white', label: 'decaf', hue: 'sand', verdict: 'safe', when: 'Today · 8:10 am' },
  { id: 'j4', week: 17, name: 'Sourdough starter', label: 'sourdough', hue: 'amber', verdict: 'safe', when: 'Sun' },
  { id: 'j5', week: 17, name: 'Hot tub at the spa', label: 'hot tub', hue: 'amber', verdict: 'avoid', when: 'Sat' },
  { id: 'j6', week: 17, name: 'Magnesium glycinate 200mg', label: 'mag', hue: 'lavender', verdict: 'caution', when: 'Fri' },
  { id: 'j7', week: 16, name: 'Tuna sashimi (1pc)', label: 'tuna', hue: 'rose', verdict: 'caution', when: 'Wed' },
  { id: 'j8', week: 16, name: 'Pilates reformer', label: 'pilates', hue: 'sage', verdict: 'safe', when: 'Mon' },
  { id: 'j9', week: 16, name: 'Smoked salmon bagel', label: 'salmon', hue: 'rose', verdict: 'caution', when: 'Tue' },
  { id: 'j10', week: 15, name: 'Hair dye (semi-perm)', label: 'hair dye', hue: 'lavender', verdict: 'caution', when: 'Apr 18' },
  { id: 'j11', week: 15, name: 'Long-haul flight (11h)', label: 'flight', hue: 'sand', verdict: 'caution', when: 'Apr 14' },
  { id: 'j12', week: 14, name: 'Iron + folate combined', label: 'iron', hue: 'sage', verdict: 'safe', when: 'Apr 7' },
];

export const REMINDERS = [
  { icon: 'calendar' as const, title: 'Anomaly scan', sub: 'Thursday 14 May · 10:30 with Dr. Shah', tag: 'Doctor' },
  { icon: 'heart' as const, title: 'Iron + folate', sub: 'Daily, with breakfast', tag: 'Routine' },
  { icon: 'spark' as const, title: 'Glucose test prep', sub: "In 4 weeks · we'll remind you", tag: 'Heads-up' },
  { icon: 'calendar' as const, title: 'Antenatal class', sub: 'Saturday 17 May · 10:00 · NCT', tag: 'Class' },
  { icon: 'heart' as const, title: 'Pelvic floor', sub: 'Three sets of 10, twice a day', tag: 'Routine' },
];

export const TRENDING = [
  { name: 'Sourdough at week 12', count: '1,248 women asked', verdict: 'safe' as Verdict },
  { name: 'Magnesium for cramps', count: '972 asked', verdict: 'caution' as Verdict },
  { name: 'Henna for hair', count: '610 asked', verdict: 'caution' as Verdict },
  { name: 'Pilates reformer', count: '488 asked', verdict: 'safe' as Verdict },
  { name: 'Smoked salmon', count: '417 asked', verdict: 'caution' as Verdict },
  { name: 'Caffeine limits', count: '385 asked', verdict: 'caution' as Verdict },
  { name: 'Sleeping on back', count: '312 asked', verdict: 'caution' as Verdict },
  { name: 'Long-haul flight', count: '294 asked', verdict: 'safe' as Verdict },
  { name: 'Acupuncture', count: '218 asked', verdict: 'safe' as Verdict },
  { name: 'Fish oil supplement', count: '186 asked', verdict: 'safe' as Verdict },
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
  ['Hot yoga', 'avoid', 'Heat + dehydration risk'],
  ['Running', 'caution', 'Continue if you already ran. Easy pace.'],
  ['Walking briskly', 'safe', 'Aim for 30 minutes most days'],
  ['Massage', 'safe', 'Side-lying, second trimester onward'],
  ['Deep tissue massage', 'caution', 'Avoid lower-back focus in T1'],
  ['Hair dye', 'caution', 'Wait until T2; semi-permanent preferred'],
  ['Highlights', 'safe', 'Foil keeps chemicals off the scalp'],
  ['Manicure', 'safe', 'Ventilate the salon, avoid gel toluene'],
  ['Flight (single)', 'safe', 'Up to week 36, walk every hour'],
  ['Flight (twins)', 'caution', 'Up to week 32, talk to your midwife'],
  ['Sushi class', 'caution', 'Cooked rolls only'],
  ['Spa facial', 'safe', 'Skip retinol & heavy heat'],
  ['Microneedling', 'avoid', 'Skip until postpartum'],
  ['Painting a room', 'caution', 'Latex paint, ventilate well'],
  ['Cleaning kitty litter', 'avoid', 'Toxoplasmosis risk'],
  ['Theme park', 'avoid', 'G-forces & jolts'],
  ['Diving', 'avoid', 'Pressure changes'],
  ['Snorkelling', 'safe', 'Stay shallow, with a buddy'],
  ['Cycling (road)', 'caution', 'Stationary preferred after T2'],
  ['Spinning class', 'caution', 'Listen for fatigue, no breath-holding'],
  ['Pilates reformer', 'safe', 'Tell instructor your week'],
  ['Strength training', 'safe', 'Lighter loads, no breath-holding'],
  ['HIIT', 'caution', 'Drop intensity to RPE 6/10 max'],
  ['Cold plunge', 'caution', 'Brief, never icy'],
  ['Tanning bed', 'avoid', 'UV + heat both risky'],
  ['Acupuncture', 'safe', 'Pick a pregnancy-trained practitioner'],
  ['Chiropractic', 'caution', 'Webster technique only'],
  ['Sex', 'safe', 'Yes — unless your midwife said otherwise'],
  ['Dental X-ray', 'caution', 'Lead apron, only if necessary'],
  ['Hot shower', 'safe', 'Keep below 38°C and you are fine'],
  ['Roller coaster', 'avoid', 'Sudden decel + jolts'],
  ['Horseback riding', 'avoid', 'Falls + jolts'],
  ['Swimming', 'safe', 'Best low-impact cardio there is'],
  ['Skiing', 'avoid', 'Falls + altitude'],
  ['Hiking (low altitude)', 'safe', 'Below 2,500m, plenty of water'],
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
  { name: 'Caesar salad', sub: '£12', verdict: 'caution', why: 'Raw egg in dressing — ask for pasteurised' },
  { name: 'Carbonara', sub: '£16', verdict: 'caution', why: 'Egg should be cooked through, not silken' },
  { name: 'Margherita pizza', sub: '£13', verdict: 'safe' },
];

export const INTENTIONS = [
  "It's okay to ask the same question twice.",
  'You are doing more than you can see.',
  'Slow is also a kind of progress.',
  'Rest counts as preparation.',
  'Trust the questions you keep asking.',
  'Your body is not a problem to solve.',
  'A short walk is a kind of medicine.',
  'You can change your mind today.',
  'Hunger is a sentence, not a crisis.',
  'It is allowed to nap at noon.',
  'Worry shrinks when written down.',
  'Tomorrow is closer than you think.',
  'You do not have to be brave today.',
  'A slow day is not a wasted day.',
  'You can be tired and still be enough.',
  'Small kindnesses count: a glass of water, a window opened.',
  "Hope is a muscle. It's allowed to ache.",
  'Birth plans are wishes, not contracts.',
  'A full breath is the cheapest treatment there is.',
  'You will not remember the worst hour.',
  'Boredom is sometimes the goal.',
  'Today, choose softness.',
  'You are not late. There is no race.',
  'Eat the second breakfast.',
  'Ask the question, take the answer.',
  'Your nervous system is on overtime — be kind to it.',
  'A cancelled plan is a gift to your future self.',
  'Notice one beautiful thing today.',
  'Drink the water you have been postponing.',
  'You are allowed to love this and find it hard.',
];

// Approximate baby-fruit metaphors per week — used by the Baby sheet.
// All 40 weeks. Heart rate is approximate; lengths are crown-rump until ~20w
// and crown-heel afterwards (the standard convention in NHS leaflets).
export const WEEK_METAPHORS: Record<number, { fruit: string; length: string; weight: string; hr: string; note: string }> = {
  4: { fruit: 'a poppy seed', length: '<2 mm', weight: '<1 g', hr: '—', note: 'Implantation just finished. The placenta is starting to wire up — most people feel completely normal still.' },
  5: { fruit: 'a sesame seed', length: '2 mm', weight: '<1 g', hr: '—', note: 'The neural tube — what becomes the brain and spine — folds shut this week. Folate is doing real work.' },
  6: { fruit: 'a lentil', length: '4 mm', weight: '<1 g', hr: '110', note: 'A flicker of a heartbeat is sometimes visible on an early scan now.' },
  7: { fruit: 'a blueberry', length: '10 mm', weight: '1 g', hr: '130', note: 'Tiny arm and leg buds. Nausea may peak around now — small, frequent meals help.' },
  8: { fruit: 'a raspberry', length: '16 mm', weight: '1 g', hr: '150', note: 'Fingers and toes are webbed but distinct. Eyelids are forming.' },
  9: { fruit: 'a cherry', length: '23 mm', weight: '2 g', hr: '170', note: 'Tail is gone. The baby is officially a fetus.' },
  10: { fruit: 'a strawberry', length: '31 mm', weight: '4 g', hr: '170', note: 'Tooth buds, tiny nails, a swallow reflex. They are practising movement, even if you cannot feel it.' },
  11: { fruit: 'a lime', length: '41 mm', weight: '7 g', hr: '170', note: 'Genitals start to differentiate. The risk window for miscarriage drops sharply this week.' },
  12: { fruit: 'a plum', length: '54 mm', weight: '14 g', hr: '165', note: 'End of first trimester. The placenta is now in charge of hormone supply.' },
  13: { fruit: 'a peach', length: '74 mm', weight: '23 g', hr: '160', note: 'Vocal cords are forming. The body is starting to grow faster than the head.' },
  14: { fruit: 'a lemon', length: '85 mm', weight: '43 g', hr: '155', note: "Facial muscles work — they're squinting and frowning, mostly at random." },
  15: { fruit: 'an apple', length: '10 cm', weight: '70 g', hr: '155', note: 'Hair pattern on the scalp is being decided. Bones are getting tougher.' },
  16: { fruit: 'an avocado', length: '11.5 cm', weight: '110 g', hr: '152', note: 'Tiny limbs are now coordinated. They might suck a thumb.' },
  17: { fruit: 'a turnip', length: '13 cm', weight: '140 g', hr: '150', note: 'Sweat glands are forming. The skeleton is hardening from cartilage.' },
  18: { fruit: 'a sweet potato', length: '14 cm', weight: '190 g', hr: '148', note: "This week, the baby's hearing is sharpening. Hum along to your favourite song — they may hear the rhythm." },
  19: { fruit: 'a mango', length: '15 cm', weight: '240 g', hr: '147', note: 'Vernix — the white, waxy coating — starts protecting the skin.' },
  20: { fruit: 'a banana', length: '16.5 cm', weight: '300 g', hr: '146', note: 'Halfway. You may start to feel the first proper kicks soon.' },
  21: { fruit: 'a carrot', length: '27 cm', weight: '360 g', hr: '145', note: 'Quickening — those soft pops in your belly — is real now, not gas.' },
  22: { fruit: 'a spaghetti squash', length: '28 cm', weight: '430 g', hr: '144', note: 'Eyelashes and eyebrows. Lips are clearly defined.' },
  23: { fruit: 'a grapefruit', length: '29 cm', weight: '500 g', hr: '143', note: 'They can hear loud noises from outside the womb.' },
  24: { fruit: 'an ear of corn', length: '30 cm', weight: '600 g', hr: '142', note: 'Viability threshold. Lungs are still immature, but a NICU could help if needed.' },
  25: { fruit: 'a cauliflower', length: '34 cm', weight: '680 g', hr: '141', note: 'Hair has colour now. The hands have a real grip strength.' },
  26: { fruit: 'a lettuce', length: '35 cm', weight: '760 g', hr: '140', note: 'Eyes open for the first time. They blink when there is sudden light.' },
  27: { fruit: 'a head of broccoli', length: '36 cm', weight: '880 g', hr: '140', note: 'Brain folds are forming — the architecture of memory is getting wired.' },
  28: { fruit: 'an aubergine', length: '37 cm', weight: '1.0 kg', hr: '140', note: 'Third trimester. They have sleep-wake cycles now.' },
  29: { fruit: 'a butternut squash', length: '38 cm', weight: '1.15 kg', hr: '139', note: 'Bones absorb a lot of calcium this week. Dairy or fortified plant milks help.' },
  30: { fruit: 'a cucumber', length: '40 cm', weight: '1.3 kg', hr: '138', note: 'Eyes can track movement. Vision is still blurry.' },
  31: { fruit: 'a coconut', length: '41 cm', weight: '1.5 kg', hr: '137', note: 'They put on five different fat layers in the next few weeks.' },
  32: { fruit: 'a jicama', length: '42 cm', weight: '1.7 kg', hr: '136', note: 'Lungs are practising breathing rhythms with amniotic fluid.' },
  33: { fruit: 'a pineapple', length: '43 cm', weight: '1.9 kg', hr: '135', note: 'Skull bones are still soft and overlapping — designed to mould through the birth canal.' },
  34: { fruit: 'a cantaloupe', length: '44 cm', weight: '2.15 kg', hr: '135', note: 'Most babies turn head-down between 32 and 36 weeks.' },
  35: { fruit: 'a honeydew melon', length: '45 cm', weight: '2.4 kg', hr: '134', note: 'They can recognise your voice. Read out loud if you fancy it.' },
  36: { fruit: 'a romaine lettuce', length: '46 cm', weight: '2.65 kg', hr: '133', note: 'Officially "early term" if born now. Still slightly premature, but well prepared.' },
  37: { fruit: 'swiss chard', length: '48 cm', weight: '2.85 kg', hr: '132', note: '"Full term" begins this week. Bag-packing time.' },
  38: { fruit: 'a leek', length: '49 cm', weight: '3.1 kg', hr: '132', note: 'Most reflexes are wired — grip, suck, blink, startle.' },
  39: { fruit: 'a small watermelon', length: '50 cm', weight: '3.3 kg', hr: '131', note: 'Brain is still building. Each day in here adds neurons.' },
  40: { fruit: 'a small pumpkin', length: '51 cm', weight: '3.5 kg', hr: '130', note: 'Due date. Only ~5% of babies arrive on it — you are right on schedule whenever they come.' },
};

export const COUNTRIES = [
  'United Kingdom', 'United States', 'France', 'Germany', 'Japan',
  'Australia', 'Canada', 'Italy', 'Turkey', 'Spain', 'Netherlands', 'Sweden', 'Ireland',
];

export const CONDITIONS = [
  'Gestational diabetes', 'Hypertension', 'Twins', 'IVF', 'Previous loss', 'None of these',
];

// ── Tools data ───────────────────────────────────────────────
// Default hospital-bag template. Users can add custom rows on top of these.

export type BagGroup = 'labour' | 'postBirth' | 'baby' | 'docs';
export const BAG_GROUP_LABEL: Record<BagGroup, string> = {
  labour: 'For labour',
  postBirth: 'Post-birth',
  baby: 'Baby',
  docs: 'Documents',
};

export const BAG_TEMPLATE: { group: BagGroup; label: string }[] = [
  { group: 'labour', label: 'Lip balm' },
  { group: 'labour', label: 'Hair ties' },
  { group: 'labour', label: 'Snacks (low-sugar, high-protein)' },
  { group: 'labour', label: 'Hot water bottle' },
  { group: 'labour', label: 'Slippers' },
  { group: 'labour', label: 'Phone + extra-long charger' },
  { group: 'postBirth', label: 'Big knickers (5 pairs)' },
  { group: 'postBirth', label: 'Maternity pads (1 pack)' },
  { group: 'postBirth', label: 'Dark towel' },
  { group: 'postBirth', label: 'Loose pyjamas' },
  { group: 'postBirth', label: 'Going-home outfit (loose)' },
  { group: 'postBirth', label: 'Toiletries' },
  { group: 'baby', label: 'Vests × 2' },
  { group: 'baby', label: 'Sleepsuits × 2' },
  { group: 'baby', label: 'Hat' },
  { group: 'baby', label: 'Scratch mittens' },
  { group: 'baby', label: 'Blanket' },
  { group: 'baby', label: 'Newborn nappies' },
  { group: 'docs', label: 'Maternity notes' },
  { group: 'docs', label: 'Photo ID' },
  { group: 'docs', label: 'Hospital paperwork' },
  { group: 'docs', label: 'Birth plan printout' },
];

// Birth plan: structured fields with chip choices.

export type BirthPlanFieldDef = {
  key: string;
  question: string;
  kind: 'chips' | 'multichips' | 'text';
  options?: string[];
};

export const BIRTH_PLAN_FIELDS: BirthPlanFieldDef[] = [
  {
    key: 'painRelief',
    question: 'Pain relief preferences',
    kind: 'multichips',
    options: ['Gas & air', 'Water (pool / bath)', 'TENS machine', 'Pethidine / opioids', 'Epidural', 'No pharmaceutical pain relief'],
  },
  {
    key: 'environment',
    question: 'Birth environment',
    kind: 'multichips',
    options: ['Dim lighting', 'My playlist', 'Aromatherapy', 'No interruptions', 'Birthing pool', 'Standing / squatting positions'],
  },
  {
    key: 'companions',
    question: 'Who will be with me',
    kind: 'multichips',
    options: ['Partner', 'Doula', 'Mother / sister', 'Friend', 'Just me + the team'],
  },
  {
    key: 'afterBirth',
    question: 'Right after the baby arrives',
    kind: 'multichips',
    options: ['Skin-to-skin immediately', 'Delayed cord clamping', 'Partner cuts the cord', 'Vitamin K injection', 'Vitamin K oral'],
  },
  {
    key: 'feeding',
    question: 'Feeding plan',
    kind: 'chips',
    options: ['Breastfeed exclusively', 'Mixed feeding', 'Formula from the start', 'Decide after birth'],
  },
  {
    key: 'cesarean',
    question: 'If a c-section becomes necessary',
    kind: 'multichips',
    options: ['Lower screen / clear drape', 'Skin-to-skin in theatre', 'Partner stays with me', 'Music kept on'],
  },
  {
    key: 'notes',
    question: 'Anything else the team should know',
    kind: 'text',
  },
];

