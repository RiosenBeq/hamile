// Floating Quick Scan button. Tap = scan, long-press = emergency.

import React, { useRef } from 'react';
import { Pressable, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Icon } from '@/components/Icon';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

export function ScanFAB({
  onScan,
  onLongPress,
}: {
  onScan: () => void;
  onLongPress?: () => void;
}) {
  const scale = useSharedValue(1);
  const tRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const a = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  const start = () => {
    scale.value = withTiming(0.94, { duration: 100 });
    tRef.current = setTimeout(() => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
      onLongPress?.();
      tRef.current = null;
    }, 600);
  };
  const end = () => {
    scale.value = withTiming(1, { duration: 120 });
    if (tRef.current) {
      clearTimeout(tRef.current);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
      onScan();
      tRef.current = null;
    }
  };
  const cancel = () => {
    scale.value = withTiming(1, { duration: 120 });
    if (tRef.current) {
      clearTimeout(tRef.current);
      tRef.current = null;
    }
  };

  return (
    <View style={{ position: 'absolute', bottom: 100, left: 0, right: 0, alignItems: 'center' }}>
      <Pressable onPressIn={start} onPressOut={end} onLongPress={cancel}>
        <Animated.View
          style={[
            {
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
            a,
          ]}
        >
          <Icon.scan size={26} color="#fff" />
        </Animated.View>
      </Pressable>
      <Text
        style={{
          marginTop: 6,
          color: colors.mute,
          fontSize: 11,
          letterSpacing: 1.6,
          textTransform: 'uppercase',
          fontFamily: fonts.bodyBold,
        }}
      >
        Tap to scan · hold for help
      </Text>
    </View>
  );
}
