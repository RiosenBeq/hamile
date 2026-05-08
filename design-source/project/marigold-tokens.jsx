// marigold-tokens.jsx
// Design tokens, t() i18n helper, custom inline-SVG line icons (1.5px stroke), shared components.
// Uses Tailwind utility classes everywhere; no external icon library.

const t = (s) => s; // i18n placeholder

// ── Custom 1.5px-stroke line icons. Rounded caps. Never SF defaults. ──
const Stroke = ({ children, size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
       stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const Icon = {
  home:    (p) => <Stroke {...p}><path d="M4 11.5 12 4l8 7.5"/><path d="M5.5 10.5V20h13v-9.5"/><path d="M10 20v-5h4v5"/></Stroke>,
  scan:    (p) => <Stroke {...p}><path d="M4 8V6a2 2 0 0 1 2-2h2"/><path d="M20 8V6a2 2 0 0 0-2-2h-2"/><path d="M4 16v2a2 2 0 0 0 2 2h2"/><path d="M20 16v2a2 2 0 0 1-2 2h-2"/><circle cx="12" cy="12" r="3.2"/></Stroke>,
  library: (p) => <Stroke {...p}><path d="M5 4h6v16H5z"/><path d="M11 4h3v16h-3z"/><path d="m14 5 4 .8-2.4 14.4-4-.8z"/></Stroke>,
  journal: (p) => <Stroke {...p}><path d="M6 4h11a2 2 0 0 1 2 2v14H8a2 2 0 0 1-2-2V4z"/><path d="M9 8h7"/><path d="M9 12h7"/><path d="M9 16h4"/></Stroke>,
  user:    (p) => <Stroke {...p}><circle cx="12" cy="9" r="3.5"/><path d="M5 20c1-3.5 4-5.2 7-5.2s6 1.7 7 5.2"/></Stroke>,
  close:   (p) => <Stroke {...p}><path d="M6 6l12 12"/><path d="M18 6 6 18"/></Stroke>,
  back:    (p) => <Stroke {...p}><path d="M14 6l-6 6 6 6"/></Stroke>,
  flash:   (p) => <Stroke {...p}><path d="M13 3 5 14h6l-1 7 8-11h-6l1-7z"/></Stroke>,
  type:    (p) => <Stroke {...p}><path d="M5 7h14"/><path d="M12 7v12"/><path d="M9 19h6"/></Stroke>,
  mic:     (p) => <Stroke {...p}><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v3"/></Stroke>,
  search:  (p) => <Stroke {...p}><circle cx="11" cy="11" r="6.5"/><path d="m20 20-4-4"/></Stroke>,
  share:   (p) => <Stroke {...p}><circle cx="6" cy="12" r="2.5"/><circle cx="17" cy="6" r="2.5"/><circle cx="17" cy="18" r="2.5"/><path d="m8.2 10.7 6.6-3.5"/><path d="m8.2 13.3 6.6 3.5"/></Stroke>,
  bookmark:(p) => <Stroke {...p}><path d="M7 4h10v17l-5-3.5L7 21V4z"/></Stroke>,
  arrow:   (p) => <Stroke {...p}><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></Stroke>,
  plus:    (p) => <Stroke {...p}><path d="M12 5v14"/><path d="M5 12h14"/></Stroke>,
  check:   (p) => <Stroke {...p}><path d="m5 12.5 4.5 4.5L19 7.5"/></Stroke>,
  warn:    (p) => <Stroke {...p}><path d="M12 5 3 20h18L12 5z"/><path d="M12 11v4"/><circle cx="12" cy="17.6" r="0.6" fill="currentColor"/></Stroke>,
  cross:   (p) => <Stroke {...p}><circle cx="12" cy="12" r="8"/><path d="m9 9 6 6"/><path d="m15 9-6 6"/></Stroke>,
  calendar:(p) => <Stroke {...p}><rect x="4" y="6" width="16" height="14" rx="2"/><path d="M4 10h16"/><path d="M9 4v4"/><path d="M15 4v4"/></Stroke>,
  bell:    (p) => <Stroke {...p}><path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2H4.5L6 16z"/><path d="M10 20a2 2 0 0 0 4 0"/></Stroke>,
  heart:   (p) => <Stroke {...p}><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/></Stroke>,
  globe:   (p) => <Stroke {...p}><circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17"/><path d="M12 3.5c2.5 3 2.5 14 0 17"/><path d="M12 3.5c-2.5 3-2.5 14 0 17"/></Stroke>,
  menu:    (p) => <Stroke {...p}><path d="M5 7h14"/><path d="M5 12h14"/><path d="M5 17h10"/></Stroke>,
  chevR:   (p) => <Stroke {...p}><path d="m9 6 6 6-6 6"/></Stroke>,
  filter:  (p) => <Stroke {...p}><path d="M4 6h16"/><path d="M7 12h10"/><path d="M10 18h4"/></Stroke>,
  download:(p) => <Stroke {...p}><path d="M12 4v12"/><path d="m7 11 5 5 5-5"/><path d="M5 20h14"/></Stroke>,
  voice:   (p) => <Stroke {...p}><path d="M4 12h2"/><path d="M8 9v6"/><path d="M11 6v12"/><path d="M14 9v6"/><path d="M17 11v2"/><path d="M20 12h0"/></Stroke>,
  qr:      (p) => <Stroke {...p}><rect x="4" y="4" width="6" height="6"/><rect x="14" y="4" width="6" height="6"/><rect x="4" y="14" width="6" height="6"/><path d="M14 14h2v2"/><path d="M18 14v2"/><path d="M14 18h2v2"/><path d="M18 18h2"/></Stroke>,
  spark:   (p) => <Stroke {...p}><path d="M12 4v6"/><path d="M12 14v6"/><path d="M4 12h6"/><path d="M14 12h6"/><path d="m6.5 6.5 3 3"/><path d="m14.5 14.5 3 3"/></Stroke>,
};

// ── Verdict pill (color + icon + text — never color alone) ──
function Verdict({ kind, size = 'md' }) {
  const map = {
    safe:    { bg: '#EAF0E9', fg: '#3F5C42', label: 'Safe',    Icn: Icon.check, ring: '#7B9B7E' },
    caution: { bg: '#F8EAD3', fg: '#7A5424', label: 'Caution', Icn: Icon.warn,  ring: '#D9A05B' },
    avoid:   { bg: '#F1D8D1', fg: '#7A3327', label: 'Avoid',   Icn: Icon.cross, ring: '#C66B5C' },
  }[kind];
  const sz = size === 'lg'
    ? 'text-[18px] px-5 py-2.5 gap-2.5'
    : size === 'sm' ? 'text-[12px] px-2.5 py-1 gap-1.5' : 'text-[14px] px-4 py-2 gap-2';
  const iconSz = size === 'lg' ? 22 : size === 'sm' ? 14 : 18;
  return (
    <span className={`inline-flex items-center rounded-full font-medium ${sz}`}
          style={{ backgroundColor: map.bg, color: map.fg }}>
      <map.Icn size={iconSz} />{map.label}
    </span>
  );
}

// ── Verdict dot for inline lists ──
function VerdictDot({ kind, size = 10 }) {
  const c = { safe: '#7B9B7E', caution: '#D9A05B', avoid: '#C66B5C' }[kind];
  return <span className="inline-block rounded-full" style={{ width: size, height: size, backgroundColor: c, boxShadow: `0 0 0 3px ${c}22` }} />;
}

// ── Watercolor placeholder illustration (no cartoons; abstract blob with item label) ──
function Illo({ label, hue = 'rose', className = '' }) {
  const grad = {
    rose:     ['#F0CDC1', '#E8C4B8', '#D9A99B'],
    sage:     ['#CFDDD0', '#B6CBB8', '#94B097'],
    lavender: ['#D9D1E3', '#B5A8C9', '#9385B0'],
    amber:    ['#F2D7AE', '#E2BA80', '#C99757'],
    sand:     ['#F2E7D6', '#E1D0B6', '#C9B58F'],
  }[hue];
  return (
    <div className={`relative overflow-hidden rounded-full grain ${className}`} style={{
      background: `radial-gradient(60% 60% at 35% 30%, ${grad[0]}, ${grad[1]} 60%, ${grad[2]})`,
    }}>
      <div className="absolute inset-0 flex items-end justify-center pb-1.5 pointer-events-none">
        <span className="font-mono text-[9px] tracking-wide text-ink/45 uppercase">{label}</span>
      </div>
    </div>
  );
}

// ── Generic card ──
function Card({ children, className = '', onClick }) {
  return (
    <div onClick={onClick} className={`bg-surface rounded-card shadow-card ${className}`}>
      {children}
    </div>
  );
}

// ── Soft button (primary terracotta / secondary outlined) ──
function Btn({ kind = 'primary', children, onClick, className = '' }) {
  if (kind === 'primary')
    return <button onClick={onClick} className={`w-full h-14 rounded-btn bg-terracotta text-white font-medium tracking-tight active:scale-[0.985] transition-transform ${className}`}>{children}</button>;
  if (kind === 'ghost')
    return <button onClick={onClick} className={`w-full h-11 rounded-btn text-ink font-medium ${className}`}>{children}</button>;
  return <button onClick={onClick} className={`w-full h-11 rounded-btn border border-line bg-surface text-ink font-medium ${className}`}>{children}</button>;
}

// ── Section heading (caption + title) ──
function SectionHead({ caption, title, right }) {
  return (
    <div className="flex items-end justify-between mb-3">
      <div>
        {caption && <div className="text-[11px] uppercase tracking-[0.14em] text-mute font-medium mb-1">{caption}</div>}
        <h3 className="font-display text-[22px] leading-[1.3] text-ink">{title}</h3>
      </div>
      {right}
    </div>
  );
}

// expose
Object.assign(window, { t, Icon, Stroke, Verdict, VerdictDot, Illo, Card, Btn, SectionHead });
