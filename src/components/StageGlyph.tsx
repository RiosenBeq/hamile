// Tiny watercolor glyphs for the three stage options on onboarding step 2.
// Abstract — never cartoonish. A seed (TTC), an apple (pregnant), a moon (postpartum).

import React from 'react';
import Svg, { Defs, RadialGradient, Stop, Circle, Path, Ellipse } from 'react-native-svg';

type Kind = 'ttc' | 'pregnant' | 'postpartum';

export function StageGlyph({ kind, size = 44 }: { kind: Kind; size?: number }) {
  if (kind === 'ttc') return <SeedGlyph size={size} />;
  if (kind === 'pregnant') return <AppleGlyph size={size} />;
  return <MoonGlyph size={size} />;
}

function SeedGlyph({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 44 44">
      <Defs>
        <RadialGradient id="seed-g" cx="40%" cy="40%" rx="60%" ry="60%">
          <Stop offset="0%" stopColor="#CFDDD0" />
          <Stop offset="100%" stopColor="#7B9B7E" />
        </RadialGradient>
      </Defs>
      <Ellipse cx={22} cy={22} rx={9} ry={14} fill="url(#seed-g)" />
      <Path d="M22 8 Q24 14 22 22" stroke="#7B9B7E" strokeWidth={1.4} strokeLinecap="round" fill="none" opacity={0.7} />
    </Svg>
  );
}

function AppleGlyph({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 44 44">
      <Defs>
        <RadialGradient id="apple-g" cx="40%" cy="40%" rx="60%" ry="60%">
          <Stop offset="0%" stopColor="#F0CDC1" />
          <Stop offset="60%" stopColor="#E8C4B8" />
          <Stop offset="100%" stopColor="#C77B5C" />
        </RadialGradient>
      </Defs>
      <Path d="M22 14 Q22 11 24 9" stroke="#7B9B7E" strokeWidth={1.6} strokeLinecap="round" fill="none" />
      <Circle cx={22} cy={26} r={12} fill="url(#apple-g)" />
    </Svg>
  );
}

function MoonGlyph({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 44 44">
      <Defs>
        <RadialGradient id="moon-g" cx="35%" cy="35%" rx="60%" ry="60%">
          <Stop offset="0%" stopColor="#D9D1E3" />
          <Stop offset="100%" stopColor="#B5A8C9" />
        </RadialGradient>
      </Defs>
      <Path
        d="M30 22 Q30 32 20 32 Q10 32 14 22 Q18 12 28 14 Q22 18 22 22 Q22 26 30 22 Z"
        fill="url(#moon-g)"
      />
    </Svg>
  );
}
