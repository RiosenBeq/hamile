// Soft idle motions used for empty-state and the Baby sheet illustration.

import React, { useEffect } from 'react';
import { ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

export function Drift({
  children,
  amplitude = 8,
  duration = 3000,
  style,
}: {
  children: React.ReactNode;
  amplitude?: number;
  duration?: number;
  style?: ViewStyle;
}) {
  const t = useSharedValue(0);
  useEffect(() => {
    t.value = withRepeat(
      withTiming(1, { duration, easing: Easing.inOut(Easing.sin) }),
      -1,
      true,
    );
  }, [duration, t]);
  const a = useAnimatedStyle(() => ({
    transform: [{ translateY: -amplitude * t.value }],
  }));
  return <Animated.View style={[a, style]}>{children}</Animated.View>;
}

export function PulseSoft({
  children,
  duration = 2400,
}: {
  children: React.ReactNode;
  duration?: number;
}) {
  const t = useSharedValue(1);
  useEffect(() => {
    t.value = withRepeat(withTiming(0.55, { duration, easing: Easing.inOut(Easing.sin) }), -1, true);
  }, [duration, t]);
  const a = useAnimatedStyle(() => ({ opacity: t.value }));
  return <Animated.View style={a}>{children}</Animated.View>;
}

export function Shimmer({
  width = 200,
  height = 36,
  radius = 12,
}: {
  width?: number | string;
  height?: number;
  radius?: number;
}) {
  const t = useSharedValue(0);
  useEffect(() => {
    t.value = withRepeat(withTiming(1, { duration: 1400, easing: Easing.linear }), -1, false);
  }, [t]);
  const a = useAnimatedStyle(() => ({
    transform: [{ translateX: -200 + t.value * 400 }],
  }));
  return (
    <Animated.View
      style={{
        width: width as any,
        height,
        borderRadius: radius,
        backgroundColor: '#F4EDE4',
        overflow: 'hidden',
      }}
    >
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: 120,
            backgroundColor: '#FBF7F2',
            opacity: 0.9,
          },
          a,
        ]}
      />
    </Animated.View>
  );
}
