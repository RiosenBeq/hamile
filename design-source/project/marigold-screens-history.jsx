// marigold-screens-history.jsx — Journal, Doctor PDF Preview, Partner Share, Paywall, Profile

const { motion: m4 } = window.framerMotion;

// ──────────────────────── JOURNAL ────────────────────────
function Journal({ entries, onPick, goto }) {
  const [filter, setFilter] = React.useState('all');
  const filtered = filter === 'all' ? entries : entries.filter(e => e.verdict === filter);
  const grouped = filtered.reduce((acc, e) => {
    const key = `Week ${e.week}`;
    (acc[key] = acc[key] || []).push(e);
    return acc;
  }, {});

  return (
    <div className="h-full bg-base overflow-y-auto no-scrollbar pb-32">
      <div className="px-6 pt-3 pb-2 flex items-start justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-mute font-medium">{t('Journal')}</div>
          <h1 className="font-display text-[30px] leading-[1.15] text-ink mt-1">{t('What you asked.')}</h1>
        </div>
        <button onClick={() => goto('pdf')} className="mt-1.5 h-10 px-4 rounded-full border border-ink text-ink text-[13px] font-medium flex items-center gap-1.5">
          <Icon.download size={15}/>{t('Export PDF')}
        </button>
      </div>

      {/* filter */}
      <div className="px-6 mt-4 flex gap-2">
        {[['all','All'],['safe','Safe'],['caution','Caution'],['avoid','Avoid']].map(([k,label]) => (
          <button key={k} onClick={() => setFilter(k)}
            className={`h-9 px-3.5 rounded-full text-[13px] font-medium flex items-center gap-1.5 ${filter===k ? 'bg-ink text-base' : 'bg-surface border border-line text-ink'}`}>
            {k!=='all' && <VerdictDot kind={k} size={8}/>}
            {label}
          </button>
        ))}
      </div>

      {Object.keys(grouped).length === 0 && (
        <div className="px-6 mt-16 text-center">
          <div className="w-32 h-32 mx-auto rounded-full drift" style={{
            background: 'radial-gradient(60% 60% at 35% 30%, #E8C4B8, #B5A8C9)'
          }}/>
          <p className="font-display text-[22px] text-ink mt-6">{t('Nothing here yet.')}</p>
          <p className="text-mute text-[14px] mt-2">{t('Your first scan will land here.')}</p>
        </div>
      )}

      {Object.entries(grouped).map(([wk, items]) => (
        <div key={wk} className="px-6 mt-7">
          <div className="text-[11px] uppercase tracking-[0.14em] text-mute font-medium mb-3">{wk}</div>
          <Card className="divide-y divide-line">
            {items.map((e,i) => (
              <button key={i} onClick={() => onPick(e)} className="w-full p-4 flex items-center gap-4 text-left">
                <Illo label={e.label} hue={e.hue} className="w-11 h-11 shrink-0"/>
                <div className="flex-1 min-w-0">
                  <div className="text-[15px] text-ink truncate">{e.name}</div>
                  <div className="text-[12px] text-mute mt-0.5">{e.when}</div>
                </div>
                <Verdict kind={e.verdict} size="sm"/>
              </button>
            ))}
          </Card>
        </div>
      ))}
    </div>
  );
}

// ──────────────────────── DOCTOR PDF PREVIEW ────────────────────────
function PdfPreview({ user, entries, onClose }) {
  return (
    <div className="absolute inset-0 bg-[#2A2522] text-white flex flex-col">
      <div className="px-5 py-3 flex items-center justify-between">
        <button onClick={onClose} className="w-9 h-9 rounded-full bg-white/10 backdrop-blur flex items-center justify-center"><Icon.back size={18} color="#fff"/></button>
        <div className="text-[12px] uppercase tracking-[0.16em] text-white/70">{t('Doctor summary')}</div>
        <button className="w-9 h-9 rounded-full bg-white/10 backdrop-blur flex items-center justify-center"><Icon.share size={18} color="#fff"/></button>
      </div>

      {/* Page */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-6 py-5">
        <div className="bg-base text-ink rounded-[6px] shadow-cardHi p-7 mx-auto" style={{ aspectRatio: '210/297' }}>
          {/* header */}
          <div className="flex items-start justify-between border-b border-line pb-4">
            <div>
              <div className="text-[9px] uppercase tracking-[0.2em] text-mute">Marigold</div>
              <div className="font-display text-[18px] text-ink leading-tight mt-0.5">Pregnancy summary</div>
            </div>
            <div className="text-right text-[8.5px] text-mute leading-tight">
              Prepared 14 March 2026<br/>For Dr. P. Smith<br/>Patient: Jane Doe · Week 18
            </div>
          </div>

          <div className="mt-5">
            <div className="text-[8.5px] uppercase tracking-[0.18em] text-mute mb-1.5">Concerns logged</div>
            <ul className="text-[10.5px] text-ink leading-[1.55] space-y-0.5">
              <li>· Occasional pelvic twinges, left side, evenings</li>
              <li>· One episode of light-headedness on day 87</li>
              <li>· Mild heartburn after large meals</li>
            </ul>
          </div>

          <div className="mt-5">
            <div className="text-[8.5px] uppercase tracking-[0.18em] text-mute mb-1.5">Foods consumed (notable)</div>
            <table className="w-full text-[9.5px] text-ink">
              <tbody>
                {[
                  ['Soft cheese (pasteurised)', 'Wk 14', '✓'],
                  ['Tuna sashimi (1 piece)', 'Wk 16', '!'],
                  ['Espresso, single shot', 'Wk 17', '✓'],
                  ['Cured ham (cooked through)', 'Wk 18', '✓'],
                ].map(([a,b,c]) => (
                  <tr key={a} className="border-t border-line/70"><td className="py-1.5 pr-2">{a}</td><td className="text-mute pr-2">{b}</td><td className="text-right">{c}</td></tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5">
            <div className="text-[8.5px] uppercase tracking-[0.18em] text-mute mb-1.5">Medications questioned</div>
            <ul className="text-[10.5px] text-ink leading-[1.55] space-y-0.5">
              <li>· Paracetamol 500mg — used 4 times for headaches</li>
              <li>· Avoided ibuprofen on app guidance</li>
            </ul>
          </div>

          <div className="mt-5">
            <div className="text-[8.5px] uppercase tracking-[0.18em] text-mute mb-1.5">Symptoms tracked</div>
            <div className="grid grid-cols-3 gap-1.5 text-[9px]">
              {['Nausea','Fatigue','Sleep','Mood','Movements','Cramps'].map(s => (
                <div key={s} className="border border-line rounded-md px-2 py-1.5">
                  <div className="text-mute">{s}</div>
                  <div className="text-ink font-medium">{Math.floor(Math.random()*4)+1}/5 avg</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-line">
            <div className="text-[8.5px] uppercase tracking-[0.18em] text-mute mb-1.5">Questions for today</div>
            <ol className="text-[10.5px] text-ink leading-[1.55] list-decimal pl-4 space-y-0.5">
              <li>Should I continue iron + folate, or move to a combined?</li>
              <li>Glucose test — when, and how should I prepare?</li>
              <li>Is the left-side twinge round ligament, or worth scanning?</li>
            </ol>
          </div>

          <div className="mt-6 text-center text-[8px] text-mute">Page 1 of 3 · Marigold v3.4 · NHS / ACOG references attached</div>
        </div>
      </div>

      {/* actions */}
      <div className="px-6 pb-7 pt-3 grid grid-cols-3 gap-2">
        {[['AirDrop',Icon.share],['Email',Icon.share],['Print',Icon.download]].map(([nm,Icn],i) => (
          <button key={i} className="h-12 rounded-btn bg-white/10 backdrop-blur text-white flex items-center justify-center gap-2 text-[13.5px]">
            <Icn size={16} color="#fff"/>{nm}
          </button>
        ))}
      </div>
    </div>
  );
}

// ──────────────────────── PARTNER SHARE ────────────────────────
function Partner({ onClose }) {
  return (
    <div className="absolute inset-0 bg-base">
      <div className="px-5 py-3 flex items-center justify-between">
        <button onClick={onClose} className="w-9 h-9 rounded-full bg-surface border border-line flex items-center justify-center"><Icon.back size={18}/></button>
        <div className="text-[12px] uppercase tracking-[0.16em] text-mute">{t('Partner')}</div>
        <div className="w-9"/>
      </div>
      <div className="px-7 mt-6">
        <div className="text-[11px] uppercase tracking-[0.14em] text-mute font-medium">{t('Invite')}</div>
        <h1 className="font-display text-[34px] leading-[1.1] text-ink mt-1">{t('Bring them in.')}</h1>
        <p className="text-mute text-[15px] mt-3 leading-[1.55] max-w-[300px]">{t('Marigold for two — they see what helps at home, never the medical journal.')}</p>

        {/* QR */}
        <div className="mt-7 mx-auto w-[200px] h-[200px] bg-surface rounded-card shadow-card p-3 flex items-center justify-center">
          <div className="grid grid-cols-12 gap-[2px] w-full h-full">
            {Array.from({length:144}).map((_,i) => {
              const corner = (i<3 || (i%12)<3 && i<36) || (i%12 > 8 && i<36) || (i>108 && i%12<3);
              const on = corner || Math.random() > 0.45;
              return <div key={i} className="rounded-[1px]" style={{ background: on ? '#2A2522' : '#FBF7F2' }}/>;
            })}
          </div>
        </div>
        <div className="text-center text-[12px] text-mute mt-3">marigold.app/j/9KQ-LMNT</div>

        <div className="mt-7 bg-surface rounded-card border border-line p-5">
          <div className="text-[11px] uppercase tracking-[0.14em] text-mute font-medium">{t('What they will see')}</div>
          <ul className="mt-3 space-y-2.5 text-[14px] text-ink">
            {['Weekly milestone — what to expect','Foods to skip when cooking together','Doctor visits added to their calendar','Saved scans you tag for them'].map(x => (
              <li key={x} className="flex items-start gap-2.5"><Icon.check size={16} color="#7B9B7E"/><span>{t(x)}</span></li>
            ))}
          </ul>
          <div className="mt-3 text-[12.5px] text-mute">{t('Never shared: journal, symptoms, emergencies you log privately.')}</div>
        </div>

        <div className="mt-6"><Btn>{t('Send invite link')}</Btn></div>
      </div>
    </div>
  );
}

// ──────────────────────── PAYWALL ────────────────────────
function Paywall({ onClose }) {
  const [plan, setPlan] = React.useState('9mo');
  const plans = [
    { k:'9mo', name:'9-month full pregnancy', price:'$49', sub:'Once · about $5/mo', tag:'Most chosen' },
    { k:'mo', name:'Monthly', price:'$7.99', sub:'Pause anytime' },
    { k:'fam', name:'Family', price:'$79', sub:'Mother + partner + 2 grandparents' },
  ];
  return (
    <div className="absolute inset-0 bg-base flex flex-col">
      <div className="relative h-[200px] blob-lavender">
        <div className="grain absolute inset-0"/>
        <button onClick={onClose} className="absolute top-3 right-5 w-9 h-9 rounded-full bg-white/70 backdrop-blur flex items-center justify-center"><Icon.close size={18}/></button>
      </div>

      <div className="px-7 -mt-12 relative pb-6">
        <h1 className="font-display text-[36px] leading-[1.05] text-ink">{t('For the next 9 months —')}</h1>
        <h1 className="font-display text-[36px] leading-[1.05] text-ink/55">{t('and beyond.')}</h1>

        <ul className="mt-6 space-y-2.5 text-[15px] text-ink">
          {[
            'Unlimited scans, with AI verdict in seconds',
            'Trimester-aware activity & food guidance',
            'Doctor PDF, generated in one tap',
            'Partner & family sharing',
            'Reviewed by OB-GYNs · zero ads',
          ].map(x => <li key={x} className="flex items-start gap-2.5"><Icon.check size={18} color="#7B9B7E"/><span>{t(x)}</span></li>)}
        </ul>
      </div>

      <div className="px-6 flex-1 overflow-y-auto no-scrollbar">
        <div className="space-y-2.5">
          {plans.map(p => (
            <button key={p.k} onClick={() => setPlan(p.k)}
              className={`w-full text-left p-5 rounded-card border transition relative ${plan===p.k ? 'border-terracotta bg-rose/15' : 'border-line bg-surface'}`}>
              {p.tag && <div className="absolute -top-2.5 right-4 px-2.5 h-5 rounded-full bg-ink text-base text-[10.5px] uppercase tracking-[0.12em] font-medium flex items-center">{p.tag}</div>}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[15.5px] text-ink font-medium">{t(p.name)}</div>
                  <div className="text-[12.5px] text-mute mt-0.5">{p.sub}</div>
                </div>
                <div className="font-display text-[24px] text-ink">{p.price}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 pb-8 pt-4">
        <Btn>{t('Start with')} {plans.find(p=>p.k===plan).name}</Btn>
        <div className="mt-3 text-center text-[12px] text-mute">{t('Cancel anytime · Reviewed by OB-GYNs · No ads, ever.')}</div>
      </div>
    </div>
  );
}

// ──────────────────────── PROFILE ────────────────────────
function Profile({ user, goto }) {
  return (
    <div className="h-full bg-base overflow-y-auto no-scrollbar pb-32">
      <div className="px-6 pt-3">
        <div className="text-[11px] uppercase tracking-[0.18em] text-mute font-medium">{t('You')}</div>
        <h1 className="font-display text-[30px] leading-[1.15] text-ink mt-1">{t('Hello, Jane.')}</h1>
      </div>

      <div className="px-6 mt-5">
        <Card className="p-5 flex items-center gap-4">
          <Illo label="you" hue="rose" className="w-14 h-14"/>
          <div>
            <div className="text-[16px] text-ink font-medium">Jane Doe</div>
            <div className="text-[13px] text-mute">{t('Week')} {user.week} · {t('United Kingdom')}</div>
          </div>
        </Card>
      </div>

      <div className="px-6 mt-7">
        <SectionHead caption={t('Your circle')} title={t('Sharing')}/>
        <Card className="divide-y divide-line">
          {[
            ['Partner', 'Invite Sam', 'partner'],
            ['Doctor PDF', 'Last sent · 2 weeks ago', 'pdf'],
            ['Subscription', '9-month plan · $49', 'paywall'],
          ].map(([nm,sub,go]) => (
            <button key={nm} onClick={() => goto(go)} className="w-full p-4 flex items-center gap-4 text-left">
              <div className="flex-1 min-w-0">
                <div className="text-[15px] text-ink">{nm}</div>
                <div className="text-[12.5px] text-mute mt-0.5">{sub}</div>
              </div>
              <Icon.chevR size={18} color="#7A6F66"/>
            </button>
          ))}
        </Card>
      </div>

      <div className="px-6 mt-7">
        <SectionHead caption={t('Settings')} title={t('Preferences')}/>
        <Card className="divide-y divide-line">
          {[
            ['Country & cuisine', 'United Kingdom'],
            ['Health profile', 'No conditions logged'],
            ['Notifications', 'Daily intention · weekly milestone'],
            ['Privacy', 'On-device first · nothing sold'],
            ['Dark mode', 'Auto'],
            ['Language', 'English'],
          ].map(([nm,sub]) => (
            <button key={nm} className="w-full p-4 flex items-center gap-4 text-left">
              <div className="flex-1 min-w-0">
                <div className="text-[15px] text-ink">{nm}</div>
                <div className="text-[12.5px] text-mute mt-0.5">{sub}</div>
              </div>
              <Icon.chevR size={18} color="#7A6F66"/>
            </button>
          ))}
        </Card>
      </div>

      <div className="px-6 mt-7 text-center text-[11px] text-mute uppercase tracking-[0.14em]">Marigold v3.4 · made with care</div>
    </div>
  );
}

Object.assign(window, { Journal, PdfPreview, Partner, Paywall, Profile });
