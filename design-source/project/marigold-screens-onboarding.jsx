// marigold-screens-onboarding.jsx — 5 swipeable onboarding screens

const { motion, AnimatePresence } = window.framerMotion;

function Onboarding({ onDone }) {
  const [step, setStep] = React.useState(0);
  const [stage, setStage] = React.useState('pregnant');
  const [dueWeek, setDueWeek] = React.useState(18);
  const [conds, setConds] = React.useState(new Set());
  const [country, setCountry] = React.useState('United Kingdom');

  const next = () => step < 4 ? setStep(step + 1) : onDone({ stage, dueWeek, conds: [...conds], country });
  const back = () => step > 0 && setStep(step - 1);

  const screens = [
    () => (
      <div className="relative h-full blob-cream grain overflow-hidden">
        <div className="absolute inset-0 flex flex-col justify-end p-7 pb-12">
          <div className="text-[11px] uppercase tracking-[0.18em] text-mute font-medium mb-4">Marigold</div>
          <h1 className="font-display text-[40px] leading-[1.05] text-ink">{t("You don't have to know everything.")}</h1>
          <h1 className="font-display text-[40px] leading-[1.05] text-ink/55 mt-1">{t("We do.")}</h1>
          <p className="text-mute mt-5 text-[15px] leading-[1.55] max-w-[300px]">{t("A calm, second opinion in your pocket. For the next nine months — and beyond.")}</p>
          <div className="mt-9"><Btn onClick={next}>{t('Begin')}</Btn></div>
          <div className="text-center text-[12px] text-mute mt-4">{t('This stays on your phone.')}</div>
        </div>
      </div>
    ),
    () => (
      <div className="h-full bg-base p-7 pt-14 flex flex-col">
        <div className="text-[11px] uppercase tracking-[0.18em] text-mute font-medium mb-3">{t('Step 2 of 5')}</div>
        <h2 className="font-display text-[30px] leading-[1.15] text-ink">{t('Where are you in this?')}</h2>
        <p className="text-mute mt-3 text-[15px]">{t('You can change this anytime.')}</p>
        <div className="mt-8 flex flex-col gap-3">
          {[
            ['ttc', 'Trying to conceive', 'Gentle prep, no pressure.'],
            ['pregnant', "I'm pregnant", 'Your daily companion.'],
            ['postpartum', 'Postpartum & breastfeeding', 'For the fourth trimester.'],
          ].map(([k, label, sub]) => (
            <button key={k} onClick={() => setStage(k)}
              className={`text-left p-5 rounded-card border transition ${stage===k ? 'border-terracotta bg-rose/15' : 'border-line bg-surface'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-ink text-[17px] font-medium">{t(label)}</div>
                  <div className="text-mute text-[13px] mt-0.5">{t(sub)}</div>
                </div>
                <div className={`w-5 h-5 rounded-full border ${stage===k ? 'border-terracotta bg-terracotta' : 'border-line'}`}>
                  {stage===k && <Icon.check size={18} color="#fff"/>}
                </div>
              </div>
            </button>
          ))}
        </div>
        <div className="mt-auto flex gap-3"><Btn kind="secondary" onClick={back}>{t('Back')}</Btn><Btn onClick={next}>{t('Continue')}</Btn></div>
      </div>
    ),
    () => {
      const trimester = dueWeek <= 13 ? 'First' : dueWeek <= 26 ? 'Second' : 'Third';
      return (
        <div className="h-full bg-base p-7 pt-14 flex flex-col">
          <div className="text-[11px] uppercase tracking-[0.18em] text-mute font-medium mb-3">{t('Step 3 of 5')}</div>
          <h2 className="font-display text-[30px] leading-[1.15] text-ink">{t('When are you due?')}</h2>
          <p className="text-mute mt-3 text-[15px]">{t('We use this only to time the right reminders.')}</p>

          {/* Subtle week visualization */}
          <div className="mt-8 bg-surface rounded-card p-5 shadow-card">
            <div className="flex items-baseline justify-between">
              <div className="font-display text-[40px] text-ink">{t('Week')} {dueWeek}</div>
              <div className="text-mute text-[13px]">{trimester} {t('trimester')}</div>
            </div>
            <div className="mt-5 grid grid-cols-[repeat(40,1fr)] gap-[2px]">
              {Array.from({length: 40}).map((_,i) => (
                <div key={i} className="h-3 rounded-[1px]" style={{
                  backgroundColor: i < dueWeek ? '#B5A8C9' : '#EDE4D8',
                  opacity: i < dueWeek ? (0.4 + (i/40)*0.6) : 1,
                }}/>
              ))}
            </div>
            <input type="range" min="1" max="40" value={dueWeek}
              onChange={e => setDueWeek(+e.target.value)}
              className="w-full mt-5 accent-lavender"/>
            <div className="flex justify-between text-[11px] text-mute mt-1">
              <span>1</span><span>13</span><span>26</span><span>40</span>
            </div>
          </div>

          <div className="mt-5 text-[13px] text-mute">{t('Estimated due date:')} <span className="text-ink">{new Date(Date.now() + (40-dueWeek)*7*864e5).toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' })}</span></div>

          <div className="mt-auto flex gap-3"><Btn kind="secondary" onClick={back}>{t('Back')}</Btn><Btn onClick={next}>{t('Continue')}</Btn></div>
        </div>
      );
    },
    () => {
      const opts = ['Gestational diabetes','Hypertension','Twins','IVF','Previous loss','None of these'];
      const toggle = (o) => {
        const n = new Set(conds);
        if (o === 'None of these') { n.clear(); n.add(o); } else { n.delete('None of these'); n.has(o) ? n.delete(o) : n.add(o); }
        setConds(n);
      };
      return (
        <div className="h-full bg-base p-7 pt-14 flex flex-col">
          <div className="text-[11px] uppercase tracking-[0.18em] text-mute font-medium mb-3">{t('Step 4 of 5')}</div>
          <h2 className="font-display text-[30px] leading-[1.15] text-ink">{t('Anything we should know?')}</h2>
          <p className="text-mute mt-3 text-[15px]">{t('We tailor advice quietly. Pick any that apply.')}</p>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {opts.map(o => (
              <button key={o} onClick={() => toggle(o)}
                className={`px-4 h-11 rounded-full border text-[14px] font-medium transition active:scale-[0.97] ${conds.has(o) ? 'bg-ink text-base border-ink' : 'bg-surface text-ink border-line'}`}>
                {t(o)}
              </button>
            ))}
          </div>
          <div className="mt-auto flex gap-3"><Btn kind="secondary" onClick={back}>{t('Back')}</Btn><Btn onClick={next}>{t('Continue')}</Btn></div>
        </div>
      );
    },
    () => {
      const list = ['United Kingdom','United States','France','Germany','Japan','Australia','Canada','Italy','Turkey'];
      return (
        <div className="h-full bg-base p-7 pt-14 flex flex-col">
          <div className="text-[11px] uppercase tracking-[0.18em] text-mute font-medium mb-3">{t('Step 5 of 5')}</div>
          <h2 className="font-display text-[30px] leading-[1.15] text-ink">{t('Where are you?')}</h2>
          <p className="text-mute mt-3 text-[15px]">{t('Food rules vary by country. We tune to where you eat.')}</p>
          <div className="mt-6 flex items-center gap-3 px-4 h-12 rounded-btn bg-surface border border-line">
            <Icon.globe size={18} color="#7A6F66"/>
            <div className="text-[14px] text-ink">{country}</div>
            <span className="ml-auto text-[12px] text-mute">{t('Auto-detected')}</span>
          </div>
          <div className="mt-3 max-h-[300px] overflow-auto no-scrollbar bg-surface rounded-card border border-line divide-y divide-line">
            {list.map(c => (
              <button key={c} onClick={() => setCountry(c)} className={`w-full text-left px-4 py-3.5 text-[15px] flex items-center justify-between ${c===country?'text-terracotta':'text-ink'}`}>
                {c}{c===country && <Icon.check size={18} color="#C77B5C"/>}
              </button>
            ))}
          </div>
          <div className="mt-auto flex gap-3"><Btn kind="secondary" onClick={back}>{t('Back')}</Btn><Btn onClick={next}>{t('Done')}</Btn></div>
        </div>
      );
    }
  ];

  return (
    <div className="relative h-full">
      {/* progress dots */}
      <div className="absolute top-3 left-0 right-0 z-10 flex justify-center gap-1.5">
        {screens.map((_,i) => (
          <div key={i} className="h-1 rounded-full transition-all" style={{ width: i===step ? 22 : 6, backgroundColor: i<=step ? '#2A2522' : '#EDE4D8' }}/>
        ))}
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={step}
          initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -40, opacity: 0 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0">
          {screens[step]()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

window.Onboarding = Onboarding;
