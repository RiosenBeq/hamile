// Watercolor blob backgrounds — radial gradients composed with react-native-svg.
// Mirrors the design's `.blob-cream` / `.blob-lavender` and the warm wash on Home.

import React from 'react';
import { ViewStyle } from 'react-native';
import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg';
import { Hue, hueGradient } from '@/theme/colors';

type Props = { style?: ViewStyle; variant?: 'cream' | 'lavender' | 'amber' | 'warm' };

export function Blob({ style, variant = 'cream' }: Props) {
  return (
    <Svg width="100%" height="100%" style={style as any} preserveAspectRatio="xMidYMid slice">
      <Defs>
        <RadialGradient id="g1" cx="30%" cy="20%" rx="60%" ry="50%">
          <Stop
            offset="0%"
            stopColor={variant === 'lavender' ? '#B5A8C9' : '#E8C4B8'}
            stopOpacity={variant === 'lavender' ? 0.7 : 0.65}
          />
          <Stop offset="100%" stopColor="#FBF7F2" stopOpacity={0} />
        </RadialGradient>
        <RadialGradient id="g2" cx="80%" cy="80%" rx="50%" ry="40%">
          <Stop
            offset="0%"
            stopColor={variant === 'lavender' ? '#E8C4B8' : '#B5A8C9'}
            stopOpacity={0.55}
          />
          <Stop offset="100%" stopColor="#FBF7F2" stopOpacity={0} />
        </RadialGradient>
        <RadialGradient id="g3" cx="50%" cy="60%" rx="70%" ry="60%">
          <Stop offset="0%" stopColor="#D9A05B" stopOpacity={variant === 'amber' ? 0.35 : 0.18} />
          <Stop offset="100%" stopColor="#FBF7F2" stopOpacity={0} />
        </RadialGradient>
      </Defs>
      <Rect x={0} y={0} width="100%" height="100%" fill="#FBF7F2" />
      <Rect x={0} y={0} width="100%" height="100%" fill="url(#g3)" />
      <Rect x={0} y={0} width="100%" height="100%" fill="url(#g1)" />
      <Rect x={0} y={0} width="100%" height="100%" fill="url(#g2)" />
    </Svg>
  );
}

// Small abstract circular illustration ("Illo" in the design) — used for items
// in the journal, recents, library tiles, etc. Watercolor look, no cartoons.
export function Illo({ label, hue = 'rose', size = 56 }: { label: string; hue?: Hue; size?: number }) {
  const g = hueGradient[hue];
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{ borderRadius: size / 2, overflow: 'hidden' } as any}
    >
      <Defs>
        <RadialGradient id={`il-${hue}-${label}`} cx="35%" cy="30%" rx="60%" ry="60%">
          <Stop offset="0%" stopColor={g[0]} />
          <Stop offset="60%" stopColor={g[1]} />
          <Stop offset="100%" stopColor={g[2]} />
        </RadialGradient>
      </Defs>
      <Rect x={0} y={0} width={100} height={100} fill={`url(#il-${hue}-${label})`} />
    </Svg>
  );
}
