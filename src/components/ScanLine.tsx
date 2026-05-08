// Soft warm scan-line that sweeps top-to-bottom across the viewfinder.

import React, { useEffect } from 'react';
import { ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

export function ScanLine({ style }: { style?: ViewStyle }) {
  const t = useSharedValue(0);
  useEffect(() => {
    t.value = withRepeat(
      withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.sin) }),
      -1,
      true,
    );
  }, [t]);
  const a = useAnimatedStyle(() => ({ top: 170 + t.value * 370 }));
  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          left: '6%',
          right: '6%',
          height: 2,
          shadowColor: '#D9A05B',
          shadowOpacity: 0.7,
          shadowRadius: 18,
          shadowOffset: { width: 0, height: 0 },
        },
        a,
        style,
      ]}
    >
      <LinearGradient
        colors={['transparent', 'rgba(217,160,91,0.85)', 'transparent']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ flex: 1, borderRadius: 2 }}
      />
    </Animated.View>
  );
}
