// +/- stepper used to log weight. Long-press accelerates by 0.5 units / 100ms.

import React, { useEffect, useRef } from 'react';
import { Pressable, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Icon } from '@/components/Icon';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

type Props = {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  largeStep?: number;
  unit?: string;
  precision?: number;
};

export function Stepper({
  value,
  onChange,
  min = 30,
  max = 200,
  step = 0.1,
  largeStep = 0.5,
  unit = 'kg',
  precision = 1,
}: Props) {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const valueRef = useRef(value);
  valueRef.current = value;

  const clamp = (v: number) => Math.min(max, Math.max(min, +v.toFixed(precision)));
  const tick = (delta: number) => {
    Haptics.selectionAsync().catch(() => {});
    onChange(clamp(value + delta));
  };

  useEffect(() => () => intervalRef.current && clearInterval(intervalRef.current), []);

  const startRepeat = (delta: number) => {
    intervalRef.current = setInterval(() => {
      onChange(clamp(valueRef.current + delta));
    }, 100);
  };
  const stopRepeat = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
      }}
    >
      <Pressable
        onPress={() => tick(-step)}
        onLongPress={() => startRepeat(-largeStep)}
        onPressOut={stopRepeat}
        style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.line,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ fontSize: 24, color: colors.ink, fontFamily: fonts.bodyBold }}>−</Text>
      </Pressable>

      <View style={{ alignItems: 'center', minWidth: 120 }}>
        <Text
          style={{
            fontFamily: fonts.display,
            fontSize: 56,
            color: colors.ink,
            letterSpacing: -1.2,
          }}
        >
          {value.toFixed(precision)}
        </Text>
        <Text style={{ fontSize: 12, color: colors.mute, fontFamily: fonts.bodyBold, marginTop: -4 }}>
          {unit}
        </Text>
      </View>

      <Pressable
        onPress={() => tick(step)}
        onLongPress={() => startRepeat(largeStep)}
        onPressOut={stopRepeat}
        style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.line,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon.plus size={20} color={colors.ink} />
      </Pressable>
    </View>
  );
}
