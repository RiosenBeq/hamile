// marigold-app.jsx — main shell, navigation, tab bar, screen routing
//
// README:
//   Design system → warm cream base (#FBF7F2), terracotta primary (#C77B5C),
//   sage/amber/coral verdicts, lavender milestone moments. Source Serif 4
//   display + Manrope UI. 8px grid, 20px cards, 14px buttons, soft shadows.
//   Custom 1.5px-stroke icons. Watercolor placeholders for imagery.
//
//   Screens:
//     onboarding(5) · home · scan · verdict · library · menu(restaurant)
//     · activity · emergency · journal · pdf · partner · paywall · profile
//
//   Animations:
//     verdict spring reveal · scan-line sweep · tab-dot shared element
//     · card press scale · pull-to-refresh heart · week count-up
//     · empty-state drift · onboarding parallax · skeleton shimmer · week ring sweep
//
//   Accessibility: 44×44 hit targets, color+icon+label verdicts,
//   16px body min, prefers-reduced-motion fallback to crossfade.

const { motion: mA, AnimatePresence: APA } = window.framerMotion;
const { useState, useEffect } = React;

const SAMPLE = {
  user: { name: 'Jane', week: 18, country: 'United Kingdom' },
  recents: [
    { name: 'Brie',         label: 'brie',     hue: 'sand', verdict: 'caution', when: 'Today · 1:14 pm' },
    { name: 'Paracetamol',  label: 'paracet',  hue: 'rose', verdict: 'safe',    when: 'Today · 9:02 am' },
    { name: 'Hot tub',      label: 'hot tub',  hue: 'amber',verdict: 'avoid',   when: 'Yesterday'        },
    { name: 'Decaf coffee', label: 'decaf',    hue: 'sand', verdict: 'safe',    when: 'Mon'              },
  ],
  journal: [
    { week: 18, name: 'Brie at lunch',          label: 'brie',     hue: 'sand', verdict: 'caution', when: 'Today · 1:14 pm' },
    { week: 18, name: 'Paracetamol 500mg',      label: 'paracet',  hue: 'rose', verdict: 'safe',    when: 'Today · 9:02 am' },
    { week: 17, name: 'Sourdough starter',      label: 'sourdough',hue: 'amber',verdict: 'safe',    when: 'Sun'             },
    { week: 17, name: 'Hot tub at the spa',     label: 'hot tub',  hue: 'amber',verdict: 'avoid',   when: 'Sat'             },
    { week: 16, name: 'Tuna sashimi (1pc)',     label: 'tuna',     hue: 'rose', verdict: 'caution', when: 'Wed'             },
    { week: 16, name: 'Pilates reformer',       label: 'pilates',  hue: 'sage', verdict: 'safe',    when: 'Mon'             },
    { week: 15, name: 'Hair dye (semi-perm)',   label: 'hair dye', hue: 'lavender',verdict:'caution',when:'Apr 18'          },
  ],
};

// Verdict copy bank — used after a scan
function verdictForItem(name, mode) {
  const map = {
    'Burrata, peach, basil': {
      label: 'burrata', hue: 'rose', verdict: 'caution',
      headline: 'Yes, with one tweak.',
      body: "Burrata is fine when made with pasteurised milk — most restaurants in the UK use it. Ask the chef before you eat. The peach and basil are perfectly safe.",
      action: { title: 'What to ask the chef', body: '“Is the burrata pasteurised?” If they hesitate, swap to the pumpkin soup — equally lovely and worry-free.' }
    },
    'Steak tartare': {
      label: 'tartare', hue: 'rose', verdict: 'avoid',
      headline: "Skip this one tonight.",
      body: "Raw beef carries a small but real listeria and toxoplasma risk during pregnancy. The mince is also unaged, so bacteria load can be unpredictable.",
      action: { title: 'What to do instead', body: 'Order it next year. Tonight, the roast chicken or the ragù are both excellent and safe.' }
    },
    'Tuna sashimi': {
      label: 'tuna', hue: 'rose', verdict: 'caution',
      headline: "A small amount, occasionally.",
      body: 'Tuna is high in mercury, which builds up over weeks. One or two pieces is fine; a whole platter is too much for one sitting. Cooked tuna is safer than raw.',
      action: { title: 'How to think about it', body: 'Treat tuna as a treat — once a fortnight, max. Salmon and prawn rolls are kinder choices.' }
    },
    default: {
      label: mode?.toLowerCase() || 'item', hue: 'amber', verdict: 'safe',
      headline: 'Yes — go ahead.',
      body: "Based on a quick read of the ingredients and current guidance, this is a safe choice for week 18. We checked it against the usual concerns: listeria, mercury, alcohol, raw protein.",
      action: { title: 'Good to know', body: 'If something about it changes — say, the dish is reheated, or comes with raw garnish — re-scan to be sure.' }
    },
  };
  return map[name] || { ...map.default, name };
}

// ── Bottom tab bar with shared-element dot ──
function TabBar({ tab, setTab, onScanPress, onScanLong }) {
  const tabs = [
    { k:'home',    Icn: Icon.home },
    { k:'library', Icn: Icon.library },
    { k:'scan',    Icn: Icon.scan, big: true },
    { k:'journal', Icn: Icon.journal },
    { k:'profile', Icn: Icon.user },
  ];
  const tRef = React.useRef(null);
  const start = (k) => {
    if (k !== 'scan') return;
    tRef.current = setTimeout(() => { onScanLong?.(); tRef.current = null; }, 600);
  };
  const end = (k) => {
    if (k === 'scan') {
      if (tRef.current) { clearTimeout(tRef.current); onScanPress(); tRef.current = null; }
      return;
    }
    setTab(k);
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 pb-7 pt-2 px-5 bg-base/85 backdrop-blur-xl border-t border-line/60">
      <div className="relative flex justify-between items-center max-w-[360px] mx-auto">
        {tabs.map(({k, Icn, big}) => (
          <button key={k}
            onPointerDown={() => start(k)} onPointerUp={() => end(k)} onPointerLeave={() => clearTimeout(tRef.current)}
            className="relative flex flex-col items-center justify-center w-[44px] h-[44px]">
            <Icn size={big ? 26 : 22} color={tab === k ? '#2A2522' : '#7A6F66'}/>
            {tab === k && !big && (
              <mA.div layoutId="tab-dot" className="w-1 h-1 rounded-full bg-ink mt-1"
                transition={{ type: 'spring', stiffness: 320, damping: 28 }}/>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [phase, setPhase] = useState('onboarding'); // onboarding | app
  const [user, setUser] = useState(SAMPLE.user);
  const [tab, setTab] = useState('home');
  const [overlay, setOverlay] = useState(null); // 'scan' | 'verdict' | 'baby' | 'menu' | 'emergency' | 'pdf' | 'partner' | 'paywall'
  const [verdictItem, setVerdictItem] = useState(null);

  const goto = (k) => {
    if (['home','library','journal','profile'].includes(k)) { setTab(k); setOverlay(null); return; }
    if (k === 'activity') { setTab('library'); setOverlay(null); return; }
    setOverlay(k);
  };

  const handleScanCapture = (mode) => {
    if (mode === 'Menu') { setOverlay('menu'); return; }
    setVerdictItem(verdictForItem('default', mode));
    setOverlay('verdict');
  };

  const screens = {
    home:    <Home user={user} recents={SAMPLE.recents} onScan={() => setOverlay('scan')} onOpenBaby={() => setOverlay('baby')} goto={goto} onEmergency={() => setOverlay('emergency')}/>,
    library: <Library goto={goto} onPick={() => setOverlay('scan')}/>,
    journal: <Journal entries={SAMPLE.journal} onPick={(e) => { setVerdictItem(verdictForItem('default','Food')); setOverlay('verdict'); }} goto={goto}/>,
    profile: <Profile user={user} goto={goto}/>,
  };

  return (
    <div className="flex items-center justify-center w-screen min-h-screen p-6 bg-[#1A1614]">
      <IOSDevice>
        <div className="relative w-full h-full bg-base overflow-hidden">
          {/* root screen (under any overlay) */}
          {phase === 'onboarding' ? (
            <Onboarding onDone={(d) => { setPhase('app'); setUser({...user, week: d.dueWeek, country: d.country}); }}/>
          ) : (
            <>
              <APA mode="wait">
                <mA.div key={tab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }} className="absolute inset-0">
                  {screens[tab]}
                </mA.div>
              </APA>
              <TabBar tab={tab} setTab={setTab}
                onScanPress={() => setOverlay('scan')}
                onScanLong={() => setOverlay('emergency')}/>
            </>
          )}

          {/* overlays */}
          <APA>
            {overlay === 'scan' && (
              <mA.div key="scan" initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
                transition={{ type: 'spring', stiffness: 260, damping: 30 }}
                className="absolute inset-0">
                <QuickScan onClose={() => setOverlay(null)} onCapture={handleScanCapture} onType={() => setOverlay(null)}/>
              </mA.div>
            )}
            {overlay === 'verdict' && verdictItem && (
              <VerdictModal key="verdict" item={verdictItem} onClose={() => setOverlay(null)} goto={goto}/>
            )}
            {overlay === 'baby' && <BabySheet key="baby" user={user} onClose={() => setOverlay(null)}/>}
            {overlay === 'menu' && (
              <mA.div key="menu" initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
                transition={{ type: 'spring', stiffness: 260, damping: 30 }}
                className="absolute inset-0">
                <MenuMode onClose={() => setOverlay(null)} onPick={(d) => { setVerdictItem(verdictForItem(d.name,'Food')); setOverlay('verdict'); }}/>
              </mA.div>
            )}
            {overlay === 'emergency' && <Emergency key="em" onClose={() => setOverlay(null)}/>}
            {overlay === 'pdf' && <PdfPreview key="pdf" user={user} entries={SAMPLE.journal} onClose={() => setOverlay(null)}/>}
            {overlay === 'partner' && <Partner key="partner" onClose={() => setOverlay(null)}/>}
            {overlay === 'paywall' && <Paywall key="paywall" onClose={() => setOverlay(null)}/>}
          </APA>
        </div>
      </IOSDevice>

      {/* Dev screen-switcher (Tweaks-style; visible by default for prototype) */}
      <DevSwitcher phase={phase} setPhase={setPhase} tab={tab} setTab={setTab} overlay={overlay} setOverlay={setOverlay}
        openVerdict={() => { setVerdictItem(verdictForItem('Burrata, peach, basil','Food')); setOverlay('verdict'); }}/>
    </div>
  );
}

function DevSwitcher({ phase, setPhase, tab, setTab, overlay, setOverlay, openVerdict }) {
  const [open, setOpen] = useState(true);
  const items = [
    ['Onboarding', () => setPhase('onboarding')],
    ['Home',       () => { setPhase('app'); setTab('home'); setOverlay(null); }],
    ['Quick Scan', () => { setPhase('app'); setOverlay('scan'); }],
    ['Verdict',    () => { setPhase('app'); openVerdict(); }],
    ['Library',    () => { setPhase('app'); setTab('library'); setOverlay(null); }],
    ['Menu mode',  () => { setPhase('app'); setOverlay('menu'); }],
    ['Activity',   () => { setPhase('app'); setTab('library'); setOverlay(null); }],
    ['Emergency',  () => { setPhase('app'); setOverlay('emergency'); }],
    ['Journal',    () => { setPhase('app'); setTab('journal'); setOverlay(null); }],
    ['Doctor PDF', () => { setPhase('app'); setOverlay('pdf'); }],
    ['Partner',    () => { setPhase('app'); setOverlay('partner'); }],
    ['Paywall',    () => { setPhase('app'); setOverlay('paywall'); }],
    ['Baby sheet', () => { setPhase('app'); setOverlay('baby'); }],
  ];
  if (!open) return (
    <button onClick={() => setOpen(true)} className="fixed bottom-6 right-6 px-3 h-9 rounded-full bg-white/10 backdrop-blur text-white/80 text-[12px] tracking-wider uppercase">Screens</button>
  );
  return (
    <div className="fixed top-6 right-6 w-[180px] bg-[#1F1A17]/90 backdrop-blur rounded-2xl p-3 text-white shadow-cardHi border border-white/10">
      <div className="flex items-center justify-between mb-2 px-1">
        <div className="text-[10px] uppercase tracking-[0.18em] text-white/55 font-medium">Screens</div>
        <button onClick={() => setOpen(false)} className="text-white/55"><Icon.close size={14} color="#fff"/></button>
      </div>
      <div className="grid grid-cols-1 gap-1 max-h-[460px] overflow-y-auto no-scrollbar">
        {items.map(([nm,fn]) => (
          <button key={nm} onClick={fn} className="text-left px-3 h-8 rounded-lg text-[12.5px] hover:bg-white/10 text-white/85">
            {nm}
          </button>
        ))}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
