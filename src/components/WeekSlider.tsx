// Calm 40-week visualisation with a draggable thumb. Each cell of the strip
// represents one week — lavender for completed, sand for upcoming.

import React, { useEffect } from 'react';
import { Text, View, LayoutChangeEvent } from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

const TOTAL = 40;

export function WeekSlider({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const trackWidth = useSharedValue(0);
  const thumbX = useSharedValue(0);

  // Keep thumb in sync if `value` changes from outside.
  useEffect(() => {
    if (trackWidth.value > 0) {
      thumbX.value = withTiming(((value - 1) / (TOTAL - 1)) * trackWidth.value, { duration: 150 });
    }
  }, [value, trackWidth, thumbX]);

  const onLayout = (e: LayoutChangeEvent) => {
    trackWidth.value = e.nativeEvent.layout.width;
    thumbX.value = ((value - 1) / (TOTAL - 1)) * e.nativeEvent.layout.width;
  };

  const setWeek = (week: number) => {
    if (week !== value) {
      onChange(week);
      Haptics.selectionAsync().catch(() => {});
    }
  };

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      const x = Math.max(0, Math.min(trackWidth.value, e.x));
      thumbX.value = x;
      const week = Math.round((x / trackWidth.value) * (TOTAL - 1)) + 1;
      runOnJS(setWeek)(week);
    })
    .onEnd((e) => {
      const x = Math.max(0, Math.min(trackWidth.value, e.x));
      const week = Math.round((x / trackWidth.value) * (TOTAL - 1)) + 1;
      thumbX.value = withTiming(((week - 1) / (TOTAL - 1)) * trackWidth.value, {
        duration: 120,
      });
    });

  const tap = Gesture.Tap().onEnd((e) => {
    const x = Math.max(0, Math.min(trackWidth.value, e.x));
    const week = Math.round((x / trackWidth.value) * (TOTAL - 1)) + 1;
    thumbX.value = withTiming(((week - 1) / (TOTAL - 1)) * trackWidth.value, { duration: 120 });
    runOnJS(setWeek)(week);
  });

  const composed = Gesture.Race(pan, tap);

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: thumbX.value - 12 }],
  }));

  const trimester = value <= 13 ? 'First' : value <= 26 ? 'Second' : 'Third';

  return (
    <View
      style={{
        marginTop: 28,
        backgroundColor: colors.surface,
        borderRadius: 20,
        padding: 18,
        shadowColor: colors.ink,
        shadowOpacity: 0.06,
        shadowRadius: 24,
        shadowOffset: { width: 0, height: 6 },
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <Text style={{ fontFamily: fonts.display, fontSize: 40, color: colors.ink, letterSpacing: -0.4 }}>
          Week {value}
        </Text>
        <Text style={{ color: colors.mute, fontSize: 13, fontFamily: fonts.body }}>{trimester} trimester</Text>
      </View>

      <View style={{ marginTop: 18, flexDirection: 'row', gap: 2 }}>
        {Array.from({ length: TOTAL }).map((_, i) => {
          const filled = i < value;
          const op = filled ? 0.4 + (i / TOTAL) * 0.6 : 1;
          return (
            <View
              key={i}
              style={{
                flex: 1,
                height: 12,
                backgroundColor: filled ? colors.lavender : colors.line,
                opacity: op,
                borderRadius: 1,
              }}
            />
          );
        })}
      </View>

      <GestureHandlerRootView style={{ marginTop: 18 }}>
        <GestureDetector gesture={composed}>
          <View style={{ height: 36, justifyContent: 'center' }} onLayout={onLayout}>
            <View style={{ height: 4, backgroundColor: colors.line, borderRadius: 2 }} />
            <Animated.View
              style={[
                {
                  position: 'absolute',
                  top: 6,
                  left: 0,
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  backgroundColor: colors.lavender,
                  borderWidth: 4,
                  borderColor: colors.surface,
                  shadowColor: colors.ink,
                  shadowOpacity: 0.18,
                  shadowRadius: 8,
                  shadowOffset: { width: 0, height: 4 },
                },
                thumbStyle,
              ]}
            />
          </View>
        </GestureDetector>
      </GestureHandlerRootView>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 }}>
        {[1, 13, 26, 40].map((w) => (
          <Text key={w} style={{ fontSize: 11, color: colors.mute, fontFamily: fonts.body }}>{w}</Text>
        ))}
      </View>
    </View>
  );
}
