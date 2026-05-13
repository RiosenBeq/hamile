// Pregnancy week ring — lavender stroke that animates clockwise.
// Uses react-native-reanimated to drive the dash-offset.

import React, { useEffect } from 'react';
import { Pressable } from 'react-native';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import Svg, { Circle, Path, G } from 'react-native-svg';
import { colors } from '@/theme/colors';

const ACircle = Animated.createAnimatedComponent(Circle);

type Props = { week: number; total?: number; size?: number; onPress?: () => void };

export function WeekRing({ week, total = 40, size = 56, onPress }: Props) {
  const r = (size - 8) / 2;
  const c = 2 * Math.PI * r;
  const progress = useSharedValue(c);

  useEffect(() => {
    progress.value = withTiming(c * (1 - Math.min(week, total) / total), {
      duration: 1200,
      easing: Easing.out(Easing.cubic),
    });
  }, [week, total, c, progress]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: progress.value,
  }));

  return (
    <Pressable onPress={onPress} style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        <Circle cx={size / 2} cy={size / 2} r={r} stroke={colors.line} strokeWidth={3} fill="none" />
        <ACircle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={colors.lavender}
          strokeWidth={3}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${c}`}
          animatedProps={animatedProps}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        {/* abstract baby silhouette, anchored to centre */}
        <G x={size / 2 - 8} y={size / 2 - 8} opacity={0.85}>
          <Circle cx={8} cy={6} r={3} fill={colors.lavender} />
          <Path d="M4 14 Q8 9 12 14 Q12 16 8 16 Q4 16 4 14 Z" fill={colors.lavender} />
        </G>
      </Svg>
    </Pressable>
  );
}
