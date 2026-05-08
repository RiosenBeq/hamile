// Shared chrome for sub-pages (settings rows, detail screens). Keeps the
// chunky back-pill, centered eyebrow caption and right-side slot consistent.

import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@/components/Icon';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

export function SubScreenHeader({
  caption,
  right,
}: {
  caption?: string;
  right?: React.ReactNode;
}) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingTop: insets.top + 8,
        paddingHorizontal: 20,
        paddingBottom: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Pressable
        onPress={() => router.back()}
        style={{
          width: 36,
          height: 36,
          borderRadius: 18,
          borderWidth: 1,
          borderColor: colors.line,
          backgroundColor: colors.surface,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon.back size={18} color={colors.ink} />
      </Pressable>
      <Text
        style={{
          fontSize: 12,
          letterSpacing: 1.6,
          textTransform: 'uppercase',
          color: colors.mute,
          fontFamily: fonts.bodyBold,
        }}
      >
        {caption ?? ''}
      </Text>
      <View style={{ width: 36, alignItems: 'flex-end' }}>{right}</View>
    </View>
  );
}

export function SettingsRow({
  title,
  sub,
  rightLabel,
  onPress,
  isLast = false,
}: {
  title: string;
  sub?: string;
  rightLabel?: string;
  onPress?: () => void;
  isLast?: boolean;
}) {
  return (
    <View>
      <Pressable
        onPress={onPress}
        style={{
          padding: 16,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 15, color: colors.ink, fontFamily: fonts.body }}>{title}</Text>
          {sub ? (
            <Text style={{ fontSize: 12.5, color: colors.mute, marginTop: 2, fontFamily: fonts.body }}>
              {sub}
            </Text>
          ) : null}
        </View>
        {rightLabel ? (
          <Text style={{ fontSize: 13, color: colors.mute, fontFamily: fonts.body }}>{rightLabel}</Text>
        ) : null}
        {onPress ? <Icon.chevR size={18} color={colors.mute} /> : null}
      </Pressable>
      {!isLast ? <View style={{ height: 1, backgroundColor: colors.line, marginLeft: 16 }} /> : null}
    </View>
  );
}

export function Toggle({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <Pressable
      onPress={() => onChange(!value)}
      style={{
        width: 48,
        height: 28,
        borderRadius: 14,
        backgroundColor: value ? colors.terracotta : '#E0D5C7',
        padding: 2,
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          width: 24,
          height: 24,
          borderRadius: 12,
          backgroundColor: '#fff',
          marginLeft: value ? 20 : 0,
          shadowColor: colors.ink,
          shadowOpacity: 0.18,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 1 },
        }}
      />
    </Pressable>
  );
}
