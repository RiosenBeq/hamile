// marigold-screens-core.jsx — Home, Quick Scan, Verdict Card (the 3 wow screens)

const { motion: m2, AnimatePresence: AP2 } = window.framerMotion;

// ── Animated number counter (used on Home for the week count) ──
function CountUp({ to, duration = 800 }) {
  const [v, setV] = React.useState(0);
  React.useEffect(() => {
    const start = performance.now();
    let raf;
    const tick = (n) => {
      const p = Math.min(1, (n - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out
      setV(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);
  return <>{v}</>;
}

// ── Pregnancy week ring (lavender stroke, animates clockwise) ──
function WeekRing({ week = 18, total = 40, size = 56, onClick }) {
  const r = (size - 8) / 2;
  const c = 2 * Math.PI * r;
  const off = c * (1 - week / total);
  return (
    <button onClick={onClick} className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size/2} cy={size/2} r={r} stroke="#EDE4D8" strokeWidth="3" fill="none"/>
        <m2.circle cx={size/2} cy={size/2} r={r} stroke="#B5A8C9" strokeWidth="3" fill="none" strokeLinecap="round"
          transform={`rotate(-90 ${size/2} ${size/2})`}
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: off }}
          transition={{ duration: 1.2, ease: 'easeOut' }}/>
        {/* baby silhouette — abstract */}
        <g transform={`translate(${size/2 - 8} ${size/2 - 8})`} opacity="0.8">
          <circle cx="8" cy="6" r="3" fill="#B5A8C9"/>
          <path d="M4 14 Q8 9 12 14 Q12 16 8 16 Q4 16 4 14 Z" fill="#B5A8C9"/>
        </g>
      </svg>
    </button>
  );
}

// ──────────────────────────── HOME ────────────────────────────
function Home({ user, recents, onScan, onOpenBaby, goto, onEmergency }) {
  const date = new Date();
  const wd = date.toLocaleDateString('en-US', { weekday: 'long' });
  return (
    <div className="relative h-full bg-base">
      {/* warm wash at top */}
      <div className="absolute top-0 left-0 right-0 h-[260px] blob-cream opacity-90 pointer-events-none"/>

      <div className="relative h-full overflow-y-auto no-scrollbar pb-[120px]">
        {/* Header */}
        <div className="px-6 pt-3 pb-2 flex items-center justify-between">
          <div className="text-[11px] uppercase tracking-[0.18em] text-mute font-medium">Marigold</div>
          <button className="w-9 h-9 rounded-full bg-surface/70 backdrop-blur flex items-center justify-center border border-line">
            <Icon.bell size={18}/>
          </button>
        </div>

        {/* Week + day */}
        <div className="px-6 mt-4 flex items-center gap-4">
          <WeekRing week={user.week} onClick={onOpenBaby}/>
          <div>
            <div className="font-display text-[34px] leading-[1.05] text-ink">
              {t('Week')} <CountUp to={user.week}/>, {wd}
            </div>
            <button onClick={onOpenBaby} className="text-[13px] text-mute mt-1 flex items-center gap-1">
              {t('Baby is the size of a sweet potato')}<Icon.chevR size={14}/>
            </button>
          </div>
        </div>

        {/* Today's intention — hero card */}
        <div className="px-6 mt-7">
          <Card className="p-6 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-44 h-44 rounded-full" style={{
              background: 'radial-gradient(circle, rgba(232,196,184,0.55), transparent 70%)'
            }}/>
            <div className="text-[11px] uppercase tracking-[0.14em] text-mute font-medium">{t("Today's intention")}</div>
            <p className="font-display text-[24px] leading-[1.25] text-ink mt-2 relative">
              {t("It's okay to ask the same question twice.")}
            </p>
          </Card>
        </div>

        {/* Recent checks */}
        <div className="px-6 mt-7">
          <SectionHead caption={t('Recent')} title={t('Recent checks')}
            right={<button onClick={() => goto('journal')} className="text-[13px] text-mute">{t('All')}</button>}/>
          <div className="-mx-6 px-6 flex gap-3 overflow-x-auto no-scrollbar">
            {recents.map((r, i) => (
              <Card key={i} className="shrink-0 w-[170px] p-4">
                <Illo label={r.label} hue={r.hue} className="w-14 h-14 mb-3"/>
                <div className="text-[15px] font-medium text-ink leading-tight">{r.name}</div>
                <div className="mt-3"><Verdict kind={r.verdict} size="sm"/></div>
                <div className="text-[11px] text-mute mt-2">{r.when}</div>
              </Card>
            ))}
          </div>
        </div>

        {/* This week's reminders */}
        <div className="px-6 mt-7">
          <SectionHead caption={t('Up next')} title={t("This week's reminders")}/>
          <Card className="divide-y divide-line">
            {[
              { Icn: Icon.calendar, t: 'Anomaly scan', s: 'Thursday 14 May · 10:30 with Dr. Shah', tag: 'Doctor' },
              { Icn: Icon.heart, t: 'Iron + folate', s: 'Daily, with breakfast', tag: 'Routine' },
              { Icn: Icon.spark, t: 'Glucose test prep', s: 'In 4 weeks · we\'ll remind you', tag: 'Heads-up' },
            ].map((r, i) => (
              <div key={i} className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-sand flex items-center justify-center shrink-0">
                  <r.Icn size={20} color="#7A6F66"/>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[15px] text-ink font-medium">{t(r.t)}</div>
                  <div className="text-[12.5px] text-mute mt-0.5 truncate">{t(r.s)}</div>
                </div>
                <Icon.chevR size={18} color="#7A6F66"/>
              </div>
            ))}
          </Card>
        </div>

        {/* Doctor visit */}
        <div className="px-6 mt-5">
          <Card className="p-5 bg-lavender/15">
            <div className="text-[11px] uppercase tracking-[0.14em] text-mute font-medium">{t('In 2 days')}</div>
            <div className="font-display text-[20px] text-ink mt-1">{t('Doctor visit on Thursday')}</div>
            <p className="text-[13px] text-mute mt-1">{t('Tap to draft questions to bring along.')}</p>
            <button onClick={() => goto('pdf')} className="mt-4 text-[13px] text-terracotta font-medium flex items-center gap-1">
              {t('Prepare a summary')}<Icon.arrow size={14}/>
            </button>
          </Card>
        </div>
      </div>

      {/* Floating Quick Scan button — long press = emergency */}
      <ScanFAB onScan={onScan} onLongPress={onEmergency}/>
    </div>
  );
}

function ScanFAB({ onScan, onLongPress }) {
  const tRef = React.useRef(null);
  const start = () => { tRef.current = setTimeout(() => { onLongPress?.(); tRef.current = null; }, 600); };
  const end = () => { if (tRef.current) { clearTimeout(tRef.current); onScan(); tRef.current = null; } };
  return (
    <m2.button
      onPointerDown={start} onPointerUp={end} onPointerLeave={() => clearTimeout(tRef.current)}
      whileTap={{ scale: 0.94 }}
      className="absolute bottom-[100px] left-1/2 -translate-x-1/2 w-[64px] h-[64px] rounded-full text-white flex items-center justify-center"
      style={{ backgroundColor: '#C77B5C', boxShadow: '0 14px 36px -8px rgba(199,123,92,0.55), 0 4px 14px rgba(42,37,34,0.18)' }}>
      <Icon.scan size={26}/>
      <span className="absolute -bottom-6 text-[11px] uppercase tracking-[0.14em] text-mute whitespace-nowrap font-medium">{t('Tap to scan · hold for help')}</span>
    </m2.button>
  );
}

// ──────────────────────── QUICK SCAN ────────────────────────
function QuickScan({ onClose, onCapture, onType }) {
  const [mode, setMode] = React.useState('Food');
  const modes = ['Food','Menu','Medication','Cosmetic','Activity'];
  return (
    <div className="absolute inset-0 bg-[#13110F] text-white flex flex-col">
      {/* Faux camera viewfinder — soft warm tones, never harsh */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(120% 80% at 50% 35%, #2A2522 0%, #13110F 70%)'
        }}/>
        {/* Mock subject — soft circle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[230px] h-[230px] rounded-full grain" style={{
            background: 'radial-gradient(60% 60% at 35% 30%, #E2BA80, #C99757 60%, #8E6532)'
          }}/>
        </div>
        {/* corner brackets */}
        {[
          'top-[160px] left-7','top-[160px] right-7 rotate-90',
          'bottom-[260px] left-7 -rotate-90','bottom-[260px] right-7 rotate-180',
        ].map((p,i) => (
          <div key={i} className={`absolute w-7 h-7 ${p}`}>
            <div className="absolute top-0 left-0 w-full h-[1.5px] bg-white/60"/>
            <div className="absolute top-0 left-0 h-full w-[1.5px] bg-white/60"/>
          </div>
        ))}
        {/* scan line — sweeps top to bottom every 2s */}
        <m2.div className="scanline"
          initial={{ top: 170 }}
          animate={{ top: [170, 540, 170] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}/>
      </div>

      {/* Top bar */}
      <div className="relative pt-3 px-5 flex items-center justify-between">
        <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center"><Icon.close size={20} color="#fff"/></button>
        <div className="text-[12px] uppercase tracking-[0.16em] text-white/70">{t('Point at')} {mode.toLowerCase()}</div>
        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center"><Icon.flash size={18} color="#fff"/></button>
        </div>
      </div>

      {/* Type instead */}
      <button onClick={onType} className="absolute top-[60px] right-5 text-[12px] text-white/70 underline underline-offset-2">{t('Type instead')}</button>

      {/* Bottom sheet */}
      <div className="mt-auto relative">
        <div className="bg-base text-ink rounded-t-[28px] pt-3 pb-8 px-6">
          <div className="w-10 h-1 rounded-full bg-line mx-auto"/>
          {/* mode segmented */}
          <div className="mt-5 -mx-1 flex gap-1.5 overflow-x-auto no-scrollbar">
            {modes.map(mo => (
              <button key={mo} onClick={() => setMode(mo)}
                className={`shrink-0 px-4 h-9 rounded-full text-[13px] font-medium transition ${mode===mo ? 'bg-ink text-base' : 'bg-surface text-ink border border-line'}`}>
                {t(mo)}
              </button>
            ))}
          </div>

          {/* capture row */}
          <div className="mt-6 flex items-center justify-between">
            <button className="w-12 h-12 rounded-full bg-surface border border-line flex items-center justify-center"><Icon.library size={20}/></button>
            <m2.button
              whileTap={{ scale: 0.92 }}
              onClick={() => onCapture(mode)}
              className="w-[78px] h-[78px] rounded-full bg-white flex items-center justify-center shadow-card"
              style={{ boxShadow: '0 0 0 4px #FBF7F2, 0 0 0 5.5px #C77B5C' }}>
              <div className="w-[58px] h-[58px] rounded-full bg-terracotta"/>
            </m2.button>
            <button className="w-12 h-12 rounded-full bg-surface border border-line flex items-center justify-center"><Icon.mic size={20}/></button>
          </div>
          <div className="text-center text-[11px] uppercase tracking-[0.14em] text-mute mt-3">{t('Tap to scan · hold to ask out loud')}</div>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────── VERDICT CARD ────────────────────────
function VerdictModal({ item, onClose, goto }) {
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const id = setTimeout(() => setLoading(false), 1100);
    return () => clearTimeout(id);
  }, []);

  if (loading) return <VerdictSkeleton onClose={onClose}/>;

  const v = item.verdict;
  const tone = v === 'safe' ? 'sage' : v === 'caution' ? 'amber' : 'coral';
  const headline = item.headline;

  return (
    <m2.div
      initial={{ y: 60, opacity: 0, scale: 0.94 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 280, damping: 26 }}
      className="absolute inset-0 bg-base overflow-y-auto no-scrollbar">
      {/* top bar */}
      <div className="sticky top-0 z-10 bg-base/85 backdrop-blur px-5 py-3 flex items-center justify-between border-b border-line/60">
        <button onClick={onClose} className="w-9 h-9 rounded-full bg-surface border border-line flex items-center justify-center"><Icon.back size={18}/></button>
        <div className="text-[12px] uppercase tracking-[0.16em] text-mute">{t('Verdict')}</div>
        <button className="w-9 h-9 rounded-full bg-surface border border-line flex items-center justify-center"><Icon.share size={18}/></button>
      </div>

      <div className="px-6 pt-6 pb-8">
        {/* hero illustration */}
        <div className="flex justify-center">
          <m2.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.05, type: 'spring', stiffness: 240, damping: 22 }}>
            <Illo label={item.label} hue={item.hue} className="w-[160px] h-[160px]"/>
          </m2.div>
        </div>

        {/* verdict pill */}
        <m2.div className="mt-7 flex justify-center"
          initial={{ y: -6, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 320, damping: 18 }}>
          <Verdict kind={v} size="lg"/>
        </m2.div>

        <h1 className="font-display text-[36px] leading-[1.1] text-ink text-center mt-5 px-2">{headline}</h1>

        <p className="text-ink/85 text-[16.5px] leading-[1.55] mt-5">
          {item.body}
        </p>

        {/* secondary card */}
        <Card className="mt-6 p-5">
          <div className="text-[11px] uppercase tracking-[0.14em] text-mute font-medium">{t(item.action.title)}</div>
          <p className="text-ink text-[15.5px] leading-[1.55] mt-2">{item.action.body}</p>
        </Card>

        {/* source */}
        <div className="mt-5 text-[12px] text-mute leading-[1.5]">
          {t('Reviewed against')} <span className="text-ink/80">NHS guidelines · ACOG 2024 · LactMed</span>. {t('Last checked April 2026.')}
        </div>

        {/* actions */}
        <div className="mt-7 grid grid-cols-3 gap-2">
          <button className="h-12 rounded-btn bg-surface border border-line flex flex-col items-center justify-center text-[11px] text-ink gap-1"><Icon.bookmark size={18}/>{t('Save')}</button>
          <button className="h-12 rounded-btn bg-surface border border-line flex flex-col items-center justify-center text-[11px] text-ink gap-1"><Icon.share size={18}/>{t('Partner')}</button>
          <button className="h-12 rounded-btn bg-surface border border-line flex flex-col items-center justify-center text-[11px] text-ink gap-1"><Icon.spark size={18}/>{t('Follow-up')}</button>
        </div>
      </div>
    </m2.div>
  );
}

function VerdictSkeleton({ onClose }) {
  return (
    <div className="absolute inset-0 bg-base">
      <div className="px-5 py-3 flex items-center justify-between">
        <button onClick={onClose} className="w-9 h-9 rounded-full bg-surface border border-line flex items-center justify-center"><Icon.back size={18}/></button>
        <div className="text-[12px] uppercase tracking-[0.16em] text-mute flex items-center gap-2">
          <span>{t('Thinking')}</span>
          <span className="flex gap-1">
            {[0,1,2].map(i => (
              <m2.span key={i} className="w-1 h-1 rounded-full bg-mute"
                animate={{ opacity: [0.3,1,0.3] }} transition={{ duration: 1, repeat: Infinity, delay: i*0.18 }}/>
            ))}
          </span>
        </div>
        <div className="w-9"/>
      </div>
      <div className="px-6 pt-8">
        <div className="w-[160px] h-[160px] rounded-full mx-auto shimmer"/>
        <div className="h-9 w-32 mx-auto mt-7 rounded-full shimmer"/>
        <div className="h-9 w-[80%] mx-auto mt-5 rounded-md shimmer"/>
        <div className="h-9 w-[64%] mx-auto mt-2 rounded-md shimmer"/>
        <div className="mt-7 h-24 rounded-card shimmer"/>
      </div>
    </div>
  );
}

// Baby development sheet
function BabySheet({ user, onClose }) {
  return (
    <m2.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
      transition={{ type: 'spring', stiffness: 240, damping: 28 }}
      className="absolute inset-x-0 bottom-0 top-[80px] bg-base rounded-t-[28px] overflow-hidden">
      <div className="p-5 flex items-center justify-between border-b border-line">
        <div className="text-[12px] uppercase tracking-[0.16em] text-mute">{t('Week')} {user.week}</div>
        <button onClick={onClose}><Icon.close size={20}/></button>
      </div>
      <div className="p-6 overflow-y-auto no-scrollbar h-full pb-24">
        <Illo label="baby" hue="lavender" className="w-[180px] h-[180px] mx-auto drift"/>
        <h2 className="font-display text-[30px] text-ink text-center mt-6 leading-[1.15]">{t('A sweet potato')}<br/><span className="text-ink/55">{t('about 14 cm')}</span></h2>
        <p className="text-mute text-[15px] leading-[1.55] mt-5 text-center max-w-[300px] mx-auto">
          {t("This week, the baby's hearing is sharpening. Hum along to your favourite song — they may hear the rhythm.")}
        </p>
        <div className="mt-8 grid grid-cols-3 gap-3">
          {[['Length','14 cm'],['Weight','190 g'],['Heart rate','148']].map(([k,v]) => (
            <Card key={k} className="p-4 text-center">
              <div className="text-[11px] uppercase tracking-[0.14em] text-mute">{t(k)}</div>
              <div className="font-display text-[22px] text-ink mt-1">{v}</div>
            </Card>
          ))}
        </div>
      </div>
    </m2.div>
  );
}

Object.assign(window, { Home, QuickScan, VerdictModal, BabySheet });
