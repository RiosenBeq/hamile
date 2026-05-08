import React, { memo } from 'react';
import { Text, View, ViewStyle } from 'react-native';
import { Icon } from '@/components/Icon';
import { fonts } from '@/theme/typography';
import { verdictPalette, Verdict as V } from '@/theme/colors';

type Size = 'sm' | 'md' | 'lg';

const sizing: Record<Size, { h: number; px: number; gap: number; fs: number; iconSize: number }> = {
  sm: { h: 24, px: 10, gap: 6, fs: 12, iconSize: 14 },
  md: { h: 32, px: 14, gap: 8, fs: 14, iconSize: 18 },
  lg: { h: 44, px: 20, gap: 10, fs: 18, iconSize: 22 },
};

function VerdictPillImpl({ kind, size = 'md', style }: { kind: V; size?: Size; style?: ViewStyle }) {
  const map = verdictPalette[kind];
  const s = sizing[size];
  const Icn = kind === 'safe' ? Icon.check : kind === 'caution' ? Icon.warn : Icon.cross;
  return (
    <View
      accessibilityRole="text"
      accessibilityLabel={`${map.label} verdict`}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'flex-start',
          height: s.h,
          paddingHorizontal: s.px,
          gap: s.gap,
          borderRadius: 9999,
          backgroundColor: map.bg,
        },
        style,
      ]}
    >
      <Icn size={s.iconSize} color={map.fg} />
      <Text style={{ color: map.fg, fontFamily: fonts.bodyBold, fontSize: s.fs }}>{map.label}</Text>
    </View>
  );
}

export const VerdictPill = memo(VerdictPillImpl);

function VerdictDotImpl({ kind, size = 10 }: { kind: V; size?: number }) {
  const c = verdictPalette[kind].ring;
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: c,
        // soft halo
        shadowColor: c,
        shadowOpacity: 0.25,
        shadowRadius: size * 0.6,
        shadowOffset: { width: 0, height: 0 },
        elevation: 0,
      }}
    />
  );
}

export const VerdictDot = memo(VerdictDotImpl);
