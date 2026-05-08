// marigold-screens-tools.jsx — Library/Search, Restaurant Menu Mode, Activity Check, Emergency Mode

const { motion: m3, AnimatePresence: AP3 } = window.framerMotion;

// ──────────────────────── LIBRARY / SEARCH ────────────────────────
function Library({ goto, onPick }) {
  const placeholders = ['Sushi?', 'Paracetamol?', 'Hot yoga?', 'Hair dye?'];
  const [ph, setPh] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setPh(p => (p + 1) % placeholders.length), 2200);
    return () => clearInterval(id);
  }, []);

  const cats = [
    { k:'food', label:'Food', hue:'sage' },
    { k:'drinks', label:'Drinks', hue:'amber' },
    { k:'meds', label:'Medications', hue:'rose' },
    { k:'activities', label:'Activities', hue:'lavender' },
    { k:'travel', label:'Travel', hue:'sand' },
    { k:'beauty', label:'Beauty', hue:'rose' },
  ];

  const recents = ['Brie', 'Ibuprofen', 'Sauna', 'Smoked salmon', 'Decaf coffee'];

  return (
    <div className="h-full bg-base overflow-y-auto no-scrollbar pb-32">
      <div className="px-6 pt-3 pb-2">
        <div className="text-[11px] uppercase tracking-[0.18em] text-mute font-medium">{t('Library')}</div>
        <h1 className="font-display text-[30px] leading-[1.15] text-ink mt-1">{t('Look up anything.')}</h1>
      </div>

      {/* search */}
      <div className="px-6 mt-4">
        <div className="h-12 px-4 rounded-btn bg-surface border border-line flex items-center gap-3">
          <Icon.search size={18} color="#7A6F66"/>
          <div className="relative flex-1 h-full flex items-center">
            <AP3 mode="wait">
              <m3.span key={ph} initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -8, opacity: 0 }}
                transition={{ duration: 0.25 }} className="text-[15px] text-mute absolute">
                {t(placeholders[ph])}
              </m3.span>
            </AP3>
          </div>
          <Icon.mic size={18} color="#7A6F66"/>
        </div>
      </div>

      {/* recent searches */}
      <div className="px-6 mt-6">
        <div className="text-[11px] uppercase tracking-[0.14em] text-mute font-medium mb-3">{t('Recent')}</div>
        <div className="flex flex-wrap gap-2">
          {recents.map(r => (
            <button key={r} className="px-3.5 h-9 rounded-full bg-surface border border-line text-[13px] text-ink">{r}</button>
          ))}
        </div>
      </div>

      {/* browse */}
      <div className="px-6 mt-7">
        <SectionHead caption={t('Browse')} title={t('By category')}/>
        <div className="grid grid-cols-3 gap-3">
          {cats.map(c => (
            <button key={c.k} onClick={() => onPick(c.k)} className="bg-surface rounded-card p-4 shadow-card text-left">
              <Illo label={c.label} hue={c.hue} className="w-12 h-12 mb-2.5"/>
              <div className="text-[14px] text-ink font-medium">{t(c.label)}</div>
            </button>
          ))}
        </div>
      </div>

      {/* trending */}
      <div className="px-6 mt-7">
        <SectionHead caption={t('Trending')} title={t('Asked this week')}/>
        <Card className="divide-y divide-line">
          {[
            ['Sourdough at week 12','1,248 women asked','safe'],
            ['Magnesium for cramps','972 asked','caution'],
            ['Henna for hair','610 asked','caution'],
            ['Pilates reformer','488 asked','safe'],
          ].map(([nm,c,v]) => (
            <button key={nm} className="w-full p-4 flex items-center gap-4 text-left">
              <VerdictDot kind={v}/>
              <div className="flex-1 min-w-0">
                <div className="text-[15px] text-ink">{nm}</div>
                <div className="text-[12px] text-mute mt-0.5">{c}</div>
              </div>
              <Icon.chevR size={18} color="#7A6F66"/>
            </button>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ──────────────────────── RESTAURANT MENU MODE ────────────────────────
function MenuMode({ onClose, onPick }) {
  const dishes = [
    { name: 'Burrata, peach, basil', sub: '£14', v: 'caution', why: 'Confirm pasteurised milk' },
    { name: 'Pumpkin soup, sage oil', sub: '£9', v: 'safe' },
    { name: 'Steak tartare', sub: '£21', v: 'avoid', why: 'Raw beef · listeria risk' },
    { name: 'Roast chicken, potatoes', sub: '£24', v: 'safe' },
    { name: 'Tagliatelle, beef ragù', sub: '£19', v: 'safe' },
    { name: 'Tuna sashimi', sub: '£17', v: 'caution', why: 'High-mercury fish · keep small' },
    { name: 'Grilled aubergine, tahini', sub: '£15', v: 'safe' },
    { name: 'Cheese board, soft cheeses', sub: '£18', v: 'avoid', why: 'Unpasteurised varieties likely' },
    { name: 'Espresso martini', sub: '£12', v: 'avoid', why: 'Alcohol' },
    { name: 'Apple sorbet', sub: '£7', v: 'safe' },
  ];
  const tally = dishes.reduce((a,d) => (a[d.v]++, a), {safe:0,caution:0,avoid:0});

  return (
    <div className="absolute inset-0 bg-base flex flex-col">
      {/* top */}
      <div className="px-5 py-3 flex items-center justify-between">
        <button onClick={onClose} className="w-9 h-9 rounded-full bg-surface border border-line flex items-center justify-center"><Icon.back size={18}/></button>
        <div className="text-[12px] uppercase tracking-[0.16em] text-mute">{t('Menu read')}</div>
        <button className="w-9 h-9 rounded-full bg-surface border border-line flex items-center justify-center"><Icon.share size={18}/></button>
      </div>

      <div className="px-6 pt-1">
        <div className="text-[11px] uppercase tracking-[0.14em] text-mute font-medium">{t('Trattoria Anna · Tuesday')}</div>
        <h1 className="font-display text-[28px] leading-[1.15] text-ink mt-1">{t('We read the menu.')}</h1>

        {/* counter */}
        <div className="mt-4 flex items-center gap-4 text-[13px]">
          <span className="flex items-center gap-1.5"><VerdictDot kind="safe"/>{tally.safe} {t('safe')}</span>
          <span className="flex items-center gap-1.5"><VerdictDot kind="caution"/>{tally.caution} {t('caution')}</span>
          <span className="flex items-center gap-1.5"><VerdictDot kind="avoid"/>{tally.avoid} {t('avoid')}</span>
        </div>
      </div>

      <div className="mt-5 px-6 flex-1 overflow-y-auto no-scrollbar pb-8">
        <Card className="divide-y divide-line">
          {dishes.map((d,i) => (
            <button key={i} onClick={() => onPick(d)} className="w-full p-4 flex items-start gap-3 text-left">
              <div className="pt-1.5"><VerdictDot kind={d.v}/></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-3">
                  <div className="text-[15.5px] text-ink">{d.name}</div>
                  <div className="text-[13px] text-mute">{d.sub}</div>
                </div>
                {d.why && <div className="text-[12.5px] text-mute mt-0.5">{d.why}</div>}
              </div>
              <Icon.chevR size={18} color="#7A6F66"/>
            </button>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ──────────────────────── ACTIVITY CHECK ────────────────────────
function Activity({ goto, onPick }) {
  const list = [
    ['Sauna','avoid','High heat · core temp'],
    ['Hot tub','avoid','Same — short, lukewarm baths fine'],
    ['Yoga (prenatal)','safe','Avoid deep twists & supine after T2'],
    ['Running','caution','Continue if you already ran. Easy pace.'],
    ['Massage','safe','Side-lying, second trimester onward'],
    ['Hair dye','caution','Wait until T2; semi-permanent preferred'],
    ['Flight','safe','Up to week 36 single, 32 twin'],
    ['Sushi class','caution','Cooked rolls only'],
    ['Spa facial','safe','Skip retinol & heavy heat'],
    ['Painting a room','caution','Latex paint, ventilate well'],
    ['Cleaning kitty litter','avoid','Toxoplasmosis risk'],
    ['Theme park','avoid','G-forces & jolts'],
    ['Diving','avoid','Pressure changes'],
    ['Cycling','caution','Stationary preferred after T2'],
    ['Cold plunge','caution','Brief, never icy'],
  ];
  return (
    <div className="h-full bg-base overflow-y-auto no-scrollbar pb-32">
      <div className="px-6 pt-3 pb-2">
        <div className="text-[11px] uppercase tracking-[0.18em] text-mute font-medium">{t('Activity')}</div>
        <h1 className="font-display text-[30px] leading-[1.15] text-ink mt-1">{t('What can I do?')}</h1>
        <p className="text-mute text-[14px] mt-2">{t('Trimester-aware. Tap any line for the why.')}</p>
      </div>
      <div className="px-6 mt-5">
        <div className="h-11 px-3.5 rounded-btn bg-surface border border-line flex items-center gap-3">
          <Icon.search size={16} color="#7A6F66"/>
          <input className="flex-1 bg-transparent outline-none text-[14px] placeholder:text-mute" placeholder={t('Search activities')}/>
          <button><Icon.filter size={16} color="#7A6F66"/></button>
        </div>
      </div>
      <div className="px-6 mt-5">
        <Card className="divide-y divide-line">
          {list.map(([nm,v,why]) => (
            <button key={nm} onClick={() => onPick({ name: nm, v, why })} className="w-full p-4 flex items-center gap-3 text-left">
              <VerdictDot kind={v}/>
              <div className="flex-1 min-w-0">
                <div className="text-[15px] text-ink">{nm}</div>
                <div className="text-[12.5px] text-mute mt-0.5 truncate">{why}</div>
              </div>
              <Icon.chevR size={18} color="#7A6F66"/>
            </button>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ──────────────────────── EMERGENCY MODE ────────────────────────
function Emergency({ onClose }) {
  const [stage, setStage] = React.useState('ask'); // ask | response
  const [text, setText] = React.useState('');
  return (
    <m3.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="absolute inset-0 blob-cream">
      <div className="grain absolute inset-0 pointer-events-none"/>
      <div className="relative h-full flex flex-col">
        <div className="px-5 py-3 flex items-center justify-between">
          <button onClick={onClose} className="w-9 h-9 rounded-full bg-surface/80 backdrop-blur border border-line flex items-center justify-center"><Icon.close size={18}/></button>
          <div className="text-[12px] uppercase tracking-[0.16em] text-mute">{t('Help')}</div>
          <div className="w-9"/>
        </div>

        {stage === 'ask' && (
          <div className="px-7 mt-8">
            <h1 className="font-display text-[34px] leading-[1.1] text-ink">{t('Take a breath.')}</h1>
            <h1 className="font-display text-[34px] leading-[1.1] text-ink/55">{t('Tell me what happened.')}</h1>
            <p className="text-mute text-[15px] mt-5 leading-[1.55]">{t("I'll listen first, then suggest what to do — calmly.")}</p>

            <textarea value={text} onChange={e=>setText(e.target.value)}
              placeholder={t('e.g. I bumped my stomach getting out of the car. No bleeding.')}
              className="mt-6 w-full h-36 p-4 bg-surface rounded-card border border-line text-[15px] text-ink placeholder:text-mute outline-none resize-none"/>

            <div className="mt-4 flex gap-3">
              <button className="flex-1 h-14 rounded-btn bg-surface border border-line flex items-center justify-center gap-2 text-[14px] text-ink font-medium"><Icon.mic size={18}/>{t('Speak instead')}</button>
              <button onClick={() => setStage('response')} className="flex-1 h-14 rounded-btn bg-ink text-base flex items-center justify-center gap-2 text-[14px] font-medium">{t('Continue')}<Icon.arrow size={16} color="#FBF7F2"/></button>
            </div>
            <div className="mt-5 text-[12.5px] text-mute leading-[1.5]">{t('If you are bleeding heavily, fainting, or in severe pain — call your maternity unit now.')}</div>
          </div>
        )}

        {stage === 'response' && (
          <div className="px-7 mt-6 overflow-y-auto no-scrollbar pb-12">
            <div className="text-[11px] uppercase tracking-[0.14em] text-mute font-medium">{t('You said')}</div>
            <p className="text-ink text-[15px] mt-2">{text || t('I bumped my stomach getting out of the car. No bleeding.')}</p>

            <h2 className="font-display text-[26px] leading-[1.2] text-ink mt-7">{t("Most likely you and the baby are okay.")}</h2>
            <p className="text-ink/85 text-[15px] mt-3 leading-[1.55]">
              {t("After 20 weeks, the uterus is well-cushioned. A small bump rarely causes harm. Here's how to gently check in over the next hour or two.")}
            </p>

            <div className="mt-6 space-y-3">
              {[
                ['Sit somewhere quiet', 'Lie on your left side, drink a cold glass of water.'],
                ['Count movements', 'Watch for at least 10 in the next 2 hours. Most babies stir within 30 minutes.'],
                ['Gentle check-in', 'Press lightly around the bump. Sharp, persistent pain on one side warrants a call.'],
                ['Trust your gut', "If something feels off, ring your midwife — that's exactly what they're there for."],
              ].map(([h,b],i) => (
                <Card key={i} className="p-4 flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-sand flex items-center justify-center text-[13px] font-medium text-ink shrink-0">{i+1}</div>
                  <div>
                    <div className="text-[15px] text-ink font-medium">{t(h)}</div>
                    <div className="text-[13.5px] text-mute mt-0.5 leading-[1.5]">{t(b)}</div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="h-14 rounded-btn bg-surface border border-line text-[14px] font-medium text-ink">{t('Save to journal')}</button>
              <button className="h-14 rounded-btn bg-ink text-base text-[14px] font-medium">{t('Call midwife')}</button>
            </div>
          </div>
        )}
      </div>
    </m3.div>
  );
}

Object.assign(window, { Library, MenuMode, Activity, Emergency });
