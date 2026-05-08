import React, { memo, useCallback } from 'react';
import { Pressable, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';
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

function BtnImpl({ kind = 'primary', children, onPress, style, textStyle, disabled }: Props) {
  const press = useCallback(() => {
    if (disabled) return;
    Haptics.selectionAsync().catch(() => {});
    onPress?.();
  }, [disabled, onPress]);

  if (kind === 'primary') {
    return (
      <Pressable
        onPress={press}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityState={{ disabled: !!disabled }}
        style={({ pressed }) => [
          styles.base,
          styles.primary,
          disabled && styles.primaryDisabled,
          pressed && styles.pressed,
          style,
        ]}
      >
        {typeof children === 'string' ? (
          <Text style={[styles.primaryText, textStyle]}>{children}</Text>
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
        accessibilityRole="button"
        accessibilityState={{ disabled: !!disabled }}
        style={({ pressed }) => [styles.base, styles.ghost, pressed && styles.ghostPressed, style]}
      >
        {typeof children === 'string' ? (
          <Text style={[styles.ghostText, textStyle]}>{children}</Text>
        ) : (
          children
        )}
      </Pressable>
    );
  }
  return (
    <Pressable
      onPress={press}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      style={({ pressed }) => [styles.base, styles.secondary, pressed && styles.secondaryPressed, style]}
    >
      {typeof children === 'string' ? (
        <Text style={[styles.secondaryText, textStyle]}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

export const Btn = memo(BtnImpl);

const styles = StyleSheet.create({
  base: {
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  primary: {
    height: 56,
    backgroundColor: colors.terracotta,
    shadowColor: colors.terracotta,
    shadowOpacity: 0.25,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
  },
  primaryDisabled: {
    backgroundColor: '#D9C7B6',
    shadowOpacity: 0,
  },
  pressed: {
    transform: [{ scale: 0.985 }],
  },
  primaryText: {
    color: '#fff',
    fontFamily: fonts.bodyBold,
    fontSize: 16,
    letterSpacing: -0.2,
  },
  ghost: {
    height: 44,
  },
  ghostPressed: {
    opacity: 0.6,
  },
  ghostText: {
    color: colors.ink,
    fontFamily: fonts.bodyBold,
    fontSize: 15,
  },
  secondary: {
    height: 56,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
  },
  secondaryPressed: {
    opacity: 0.85,
  },
  secondaryText: {
    color: colors.ink,
    fontFamily: fonts.bodyBold,
    fontSize: 15,
  },
});
