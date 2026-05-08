// Marigold mark — abstract watercolor flower built from radial gradients.
// Used on the welcome screen and as the in-app loading mark.

import React, { useEffect } from 'react';
import { View, ViewStyle } from 'react-native';
import Svg, { Defs, RadialGradient, Stop, Circle, Ellipse, G } from 'react-native-svg';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming, Easing } from 'react-native-reanimated';

const PETALS = 8;

export function MarigoldMark({ size = 200, style }: { size?: number; style?: ViewStyle }) {
  const spin = useSharedValue(0);
  const breathe = useSharedValue(1);

  useEffect(() => {
    spin.value = withRepeat(withTiming(1, { duration: 24000, easing: Easing.linear }), -1, false);
    breathe.value = withRepeat(withTiming(1.04, { duration: 3600, easing: Easing.inOut(Easing.sin) }), -1, true);
  }, [spin, breathe]);

  const style$ = useAnimatedStyle(() => ({
    transform: [{ rotate: `${spin.value * 360}deg` }, { scale: breathe.value }],
  }));

  const cx = size / 2;
  const cy = size / 2;
  const petalR = size * 0.32;
  const petalRadius = size * 0.18;

  return (
    <View style={[{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }, style]}>
      <Animated.View style={style$}>
        <Svg width={size} height={size}>
          <Defs>
            <RadialGradient id="petal" cx="40%" cy="40%" rx="60%" ry="60%">
              <Stop offset="0%" stopColor="#F2D7AE" stopOpacity={0.95} />
              <Stop offset="55%" stopColor="#E2BA80" stopOpacity={0.85} />
              <Stop offset="100%" stopColor="#C77B5C" stopOpacity={0.55} />
            </RadialGradient>
            <RadialGradient id="core" cx="50%" cy="50%" rx="50%" ry="50%">
              <Stop offset="0%" stopColor="#7A3327" stopOpacity={1} />
              <Stop offset="100%" stopColor="#C66B5C" stopOpacity={0.8} />
            </RadialGradient>
            <RadialGradient id="halo" cx="50%" cy="50%" rx="50%" ry="50%">
              <Stop offset="0%" stopColor="#E8C4B8" stopOpacity={0.55} />
              <Stop offset="100%" stopColor="#FBF7F2" stopOpacity={0} />
            </RadialGradient>
          </Defs>

          {/* outer halo */}
          <Circle cx={cx} cy={cy} r={size * 0.48} fill="url(#halo)" />

          {/* petals */}
          <G>
            {Array.from({ length: PETALS }).map((_, i) => {
              const a = (i / PETALS) * Math.PI * 2;
              return (
                <Ellipse
                  key={i}
                  cx={cx + Math.cos(a) * petalR}
                  cy={cy + Math.sin(a) * petalR}
                  rx={petalRadius}
                  ry={petalRadius * 1.3}
                  fill="url(#petal)"
                  transform={`rotate(${(a * 180) / Math.PI + 90} ${cx + Math.cos(a) * petalR} ${cy + Math.sin(a) * petalR})`}
                  opacity={0.92}
                />
              );
            })}
          </G>

          {/* inner petals (smaller, offset) */}
          <G>
            {Array.from({ length: PETALS }).map((_, i) => {
              const a = ((i + 0.5) / PETALS) * Math.PI * 2;
              const r2 = petalR * 0.6;
              return (
                <Ellipse
                  key={i}
                  cx={cx + Math.cos(a) * r2}
                  cy={cy + Math.sin(a) * r2}
                  rx={petalRadius * 0.7}
                  ry={petalRadius * 0.95}
                  fill="url(#petal)"
                  transform={`rotate(${(a * 180) / Math.PI + 90} ${cx + Math.cos(a) * r2} ${cy + Math.sin(a) * r2})`}
                  opacity={0.85}
                />
              );
            })}
          </G>

          {/* core */}
          <Circle cx={cx} cy={cy} r={size * 0.13} fill="url(#core)" />
        </Svg>
      </Animated.View>
    </View>
  );
}
