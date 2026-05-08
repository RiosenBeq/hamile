// Floating Quick Scan button. Tap = scan, long-press = emergency.
// Sits ~30px above the tab bar; uses safe-area inset so the button never
// overlaps the home indicator on devices that have one.
//
// We rely on Pressable's built-in onPress / onLongPress instead of a manual
// setTimeout — earlier versions paired a 600 ms timer with the Pressable's
// own onLongPress (default 500 ms) which fired first and cancelled the timer
// before the user's emergency callback could run.

import React, { useCallback } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Icon } from '@/components/Icon';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

// Tab bar (height) is roughly inset.bottom + 18 + 10 + 44 ≈ 92–112px depending
// on device. We sit the FAB so the bottom of its label clears the bar.
export const FAB_CLEARANCE = 132;
const LONG_PRESS_MS = 500;

export function ScanFAB({
  onScan,
  onLongPress,
}: {
  onScan: () => void;
  onLongPress?: () => void;
}) {
  const insets = useSafeAreaInsets();
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  const handlePressIn = useCallback(() => {
    scale.value = withTiming(0.94, { duration: 100 });
  }, [scale]);

  const handlePressOut = useCallback(() => {
    scale.value = withTiming(1, { duration: 120 });
  }, [scale]);

  const handlePress = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    onScan();
  }, [onScan]);

  const handleLongPress = useCallback(() => {
    if (!onLongPress) return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
    onLongPress();
  }, [onLongPress]);

  return (
    <View
      pointerEvents="box-none"
      style={[styles.wrap, { bottom: insets.bottom + FAB_CLEARANCE - 32 }]}
    >
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        onLongPress={handleLongPress}
        delayLongPress={LONG_PRESS_MS}
        accessibilityRole="button"
        accessibilityLabel="Scan"
        accessibilityHint="Tap to scan, hold for emergency help"
        hitSlop={12}
      >
        <Animated.View style={[styles.fab, animatedStyle]}>
          <Icon.scan size={26} color="#fff" />
        </Animated.View>
      </Pressable>
      <Text style={styles.caption}>Tap to scan · hold for help</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  fab: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.terracotta,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.terracotta,
    shadowOpacity: 0.5,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 14 },
    elevation: 8,
  },
  caption: {
    marginTop: 6,
    color: colors.mute,
    fontSize: 11,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    fontFamily: fonts.bodyBold,
  },
});
