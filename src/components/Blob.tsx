// Watercolor blob backgrounds — radial gradients composed with react-native-svg.
// Mirrors the design's `.blob-cream` / `.blob-lavender` and the warm wash on Home.

import React, { memo, useId } from 'react';
import { ViewStyle } from 'react-native';
import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg';
import { Hue, hueGradient } from '@/theme/colors';

type Variant = 'cream' | 'lavender' | 'amber' | 'warm';
type Props = { style?: ViewStyle; variant?: Variant };

function BlobImpl({ style, variant = 'cream' }: Props) {
  // Per-instance gradient ids. <defs> in React Native SVG scope to the owning
  // <Svg>, but on web they collide across components — using useId keeps both
  // renderers honest.
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const g1 = `b1-${uid}`;
  const g2 = `b2-${uid}`;
  const g3 = `b3-${uid}`;
  const isLavender = variant === 'lavender';
  const isAmber = variant === 'amber';

  return (
    <Svg width="100%" height="100%" style={style as any} preserveAspectRatio="xMidYMid slice">
      <Defs>
        <RadialGradient id={g1} cx="30%" cy="20%" rx="60%" ry="50%">
          <Stop offset="0%" stopColor={isLavender ? '#B5A8C9' : '#E8C4B8'} stopOpacity={isLavender ? 0.7 : 0.65} />
          <Stop offset="100%" stopColor="#FBF7F2" stopOpacity={0} />
        </RadialGradient>
        <RadialGradient id={g2} cx="80%" cy="80%" rx="50%" ry="40%">
          <Stop offset="0%" stopColor={isLavender ? '#E8C4B8' : '#B5A8C9'} stopOpacity={0.55} />
          <Stop offset="100%" stopColor="#FBF7F2" stopOpacity={0} />
        </RadialGradient>
        <RadialGradient id={g3} cx="50%" cy="60%" rx="70%" ry="60%">
          <Stop offset="0%" stopColor="#D9A05B" stopOpacity={isAmber ? 0.35 : 0.18} />
          <Stop offset="100%" stopColor="#FBF7F2" stopOpacity={0} />
        </RadialGradient>
      </Defs>
      <Rect x={0} y={0} width="100%" height="100%" fill="#FBF7F2" />
      <Rect x={0} y={0} width="100%" height="100%" fill={`url(#${g3})`} />
      <Rect x={0} y={0} width="100%" height="100%" fill={`url(#${g1})`} />
      <Rect x={0} y={0} width="100%" height="100%" fill={`url(#${g2})`} />
    </Svg>
  );
}

export const Blob = memo(BlobImpl);

// Small abstract circular illustration ("Illo" in the design) — used for items
// in the journal, recents, library tiles, etc. Watercolor look, no cartoons.
function IlloImpl({ label, hue = 'rose', size = 56 }: { label?: string; hue?: Hue; size?: number }) {
  const g = hueGradient[hue];
  // Sanitise the label to be safe inside an SVG id — spaces (e.g. "hot tub")
  // and unicode would otherwise produce malformed `url(#…)` references and
  // render an empty circle.
  const auto = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const safeLabel = (label ?? '').replace(/[^a-zA-Z0-9_-]/g, '') || auto;
  const id = `il-${hue}-${safeLabel}-${auto}`;
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{ borderRadius: size / 2, overflow: 'hidden' } as any}
    >
      <Defs>
        <RadialGradient id={id} cx="35%" cy="30%" rx="60%" ry="60%">
          <Stop offset="0%" stopColor={g[0]} />
          <Stop offset="60%" stopColor={g[1]} />
          <Stop offset="100%" stopColor={g[2]} />
        </RadialGradient>
      </Defs>
      <Rect x={0} y={0} width={100} height={100} fill={`url(#${id})`} />
    </Svg>
  );
}

export const Illo = memo(IlloImpl);
