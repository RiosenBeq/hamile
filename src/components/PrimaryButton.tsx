// Big haptic-aware circular button. Used by the kick counter ("count")
// and the contraction timer (start / stop).

import React from 'react';
import { Pressable, Text, View, ViewStyle, ColorValue } from 'react-native';
import * as Haptics from 'expo-haptics';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

type Props = {
  label: string;
  sublabel?: string;
  onPress: () => void;
  size?: number;
  bg?: ColorValue;
  fg?: ColorValue;
  disabled?: boolean;
  style?: ViewStyle;
};

export function PrimaryButton({
  label,
  sublabel,
  onPress,
  size = 200,
  bg = colors.terracotta,
  fg = '#fff',
  disabled = false,
  style,
}: Props) {
  const scale = useSharedValue(1);
  const a = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Pressable
      disabled={disabled}
      onPressIn={() => {
        scale.value = withTiming(0.94, { duration: 90 });
      }}
      onPressOut={() => {
        scale.value = withTiming(1, { duration: 140 });
      }}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy).catch(() => {});
        onPress();
      }}
      style={style}
    >
      <Animated.View
        style={[
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: disabled ? '#D9C7B6' : bg,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: bg as any,
            shadowOpacity: disabled ? 0 : 0.45,
            shadowRadius: 32,
            shadowOffset: { width: 0, height: 16 },
            elevation: 10,
          },
          a,
        ]}
      >
        <Text
          style={{
            color: fg as any,
            fontFamily: fonts.display,
            fontSize: size * 0.16,
            letterSpacing: -0.4,
          }}
        >
          {label}
        </Text>
        {sublabel ? (
          <Text
            style={{
              color: fg as any,
              opacity: 0.75,
              marginTop: 6,
              fontSize: 12,
              letterSpacing: 1.6,
              textTransform: 'uppercase',
              fontFamily: fonts.bodyBold,
            }}
          >
            {sublabel}
          </Text>
        ) : null}
      </Animated.View>
    </Pressable>
  );
}
