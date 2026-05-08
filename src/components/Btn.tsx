import React from 'react';
import { Pressable, Text, ViewStyle, TextStyle } from 'react-native';
import * as Haptics from 'expo-haptics';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

type Kind = 'primary' | 'secondary' | 'ghost';

type Props = {
  kind?: Kind;
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
};

const base: ViewStyle = {
  borderRadius: 14,
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
  gap: 8,
};

export function Btn({ kind = 'primary', children, onPress, style, textStyle, disabled }: Props) {
  const press = () => {
    if (disabled) return;
    Haptics.selectionAsync().catch(() => {});
    onPress?.();
  };
  if (kind === 'primary') {
    return (
      <Pressable
        onPress={press}
        disabled={disabled}
        style={({ pressed }) => [
          base,
          {
            height: 56,
            backgroundColor: disabled ? '#D9C7B6' : colors.terracotta,
            transform: [{ scale: pressed ? 0.985 : 1 }],
            shadowColor: colors.terracotta,
            shadowOpacity: 0.25,
            shadowRadius: 16,
            shadowOffset: { width: 0, height: 8 },
          },
          style,
        ]}
      >
        {typeof children === 'string' ? (
          <Text
            style={[
              { color: '#fff', fontFamily: fonts.bodyBold, fontSize: 16, letterSpacing: -0.2 },
              textStyle,
            ]}
          >
            {children}
          </Text>
        ) : (
          children
        )}
      </Pressable>
    );
  }
  if (kind === 'ghost') {
    return (
      <Pressable
        onPress={press}
        disabled={disabled}
        style={({ pressed }) => [
          base,
          { height: 44, opacity: pressed ? 0.6 : 1 },
          style,
        ]}
      >
        {typeof children === 'string' ? (
          <Text style={[{ color: colors.ink, fontFamily: fonts.bodyBold, fontSize: 15 }, textStyle]}>
            {children}
          </Text>
        ) : (
          children
        )}
      </Pressable>
    );
  }
  // secondary / outlined
  return (
    <Pressable
      onPress={press}
      disabled={disabled}
      style={({ pressed }) => [
        base,
        {
          height: 56,
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.line,
          opacity: pressed ? 0.85 : 1,
        },
        style,
      ]}
    >
      {typeof children === 'string' ? (
        <Text style={[{ color: colors.ink, fontFamily: fonts.bodyBold, fontSize: 15 }, textStyle]}>
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
}
