// Marigold design-system primitives. Small, composable, token-driven pieces
// shared by every screen: large-title headers, chips, segmented controls,
// progress bars, emoji/icon badges, list rows, inputs and empty states.

import React from 'react';
import {
  Pressable,
  ScrollView,
  ScrollViewProps,
  StyleProp,
  Switch,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { Icon } from '@/components/Icon';
import { colors, tint } from '@/theme/colors';
import { fonts } from '@/theme/typography';
import { useAppStore } from '@/store/useAppStore';
import { LOCALE_FOR_LANG, useT } from '@/i18n';

export type TintKey = keyof typeof tint;
type IconCmp = React.ComponentType<{ size?: number; color?: string }>;

export const shadow = {
  card: {
    shadowColor: '#5B4636',
    shadowOpacity: 0.07,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  } as ViewStyle,
  lift: {
    shadowColor: '#5B4636',
    shadowOpacity: 0.12,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  } as ViewStyle,
};

// ── Typography helpers ─────────────────────────────────────────────────────

export function Eyebrow({ children, style, color }: { children: React.ReactNode; style?: StyleProp<TextStyle>; color?: string }) {
  // iOS uppercases "i" to "I" even in Turkish; do it ourselves with the right locale.
  const lang = useAppStore((s) => s.language);
  const content = typeof children === 'string' ? children.toLocaleUpperCase(LOCALE_FOR_LANG[lang]) : children;
  return (
    <Text
      style={[
        {
          fontSize: 11,
          letterSpacing: 1.6,
          color: color ?? colors.mute,
          fontFamily: fonts.bodyBold,
        },
        style,
      ]}
    >
      {content}
    </Text>
  );
}

export function H1({ children, style }: { children: React.ReactNode; style?: StyleProp<TextStyle> }) {
  return (
    <Text style={[{ fontFamily: fonts.display, fontSize: 32, lineHeight: 37, color: colors.ink, letterSpacing: -0.5 }, style]}>
      {children}
    </Text>
  );
}

export function H2({ children, style }: { children: React.ReactNode; style?: StyleProp<TextStyle> }) {
  return (
    <Text style={[{ fontFamily: fonts.display, fontSize: 22, lineHeight: 28, color: colors.ink, letterSpacing: -0.2 }, style]}>
      {children}
    </Text>
  );
}

export function Body({ children, style, mute, numberOfLines }: { children: React.ReactNode; style?: StyleProp<TextStyle>; mute?: boolean; numberOfLines?: number }) {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[{ fontFamily: fonts.body, fontSize: 15.5, lineHeight: 23, color: mute ? colors.mute : colors.ink2 }, style]}
    >
      {children}
    </Text>
  );
}

// ── Screen scaffolding ─────────────────────────────────────────────────────

/** Scrollable page with the standard cream background and safe-area padding. */
export function Page({
  children,
  header,
  contentStyle,
  bottomInset = 32,
  tabBar = false,
  ...rest
}: {
  children: React.ReactNode;
  header?: React.ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
  bottomInset?: number;
  /** Leave room for the floating tab bar. */
  tabBar?: boolean;
} & ScrollViewProps) {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, backgroundColor: colors.base }}>
      {header}
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[
          { paddingBottom: insets.bottom + (tabBar ? 120 : bottomInset) },
          contentStyle,
        ]}
        {...rest}
      >
        {children}
      </ScrollView>
    </View>
  );
}

/** Back button + optional centred caption + right slot, for pushed screens. */
export function NavBar({
  caption,
  right,
  onBack,
  close = false,
  transparent = false,
}: {
  caption?: string;
  right?: React.ReactNode;
  onBack?: () => void;
  close?: boolean;
  transparent?: boolean;
}) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const t = useT();
  const back = () => {
    if (onBack) return onBack();
    if (router.canGoBack()) router.back();
    else router.replace('/(tabs)');
  };
  const BackIcon = close ? Icon.close : Icon.back;
  return (
    <View
      style={{
        paddingTop: insets.top + 6,
        paddingHorizontal: 16,
        paddingBottom: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: transparent ? 'transparent' : colors.base,
      }}
    >
      <CircleButton onPress={back} accessibilityLabel={close ? t('c.close') : t('c.back')}>
        <BackIcon size={18} color={colors.ink} />
      </CircleButton>
      <Eyebrow style={{ flex: 1, textAlign: 'center', marginHorizontal: 8 }}>{caption ?? ''}</Eyebrow>
      <View style={{ minWidth: 40, alignItems: 'flex-end' }}>{right}</View>
    </View>
  );
}

export function CircleButton({
  children,
  onPress,
  size = 40,
  bg = colors.surface,
  accessibilityLabel,
  style,
}: {
  children: React.ReactNode;
  onPress?: () => void;
  size?: number;
  bg?: string;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      hitSlop={6}
      style={({ pressed }) => [
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: bg,
          borderWidth: 1,
          borderColor: colors.line,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: pressed ? 0.7 : 1,
        },
        style,
      ]}
    >
      {children}
    </Pressable>
  );
}

/** Large title block used at the top of tab screens. */
export function TitleBlock({
  eyebrow,
  title,
  sub,
  right,
  style,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  right?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[{ paddingHorizontal: 20, flexDirection: 'row', alignItems: 'flex-start' }, style]}>
      <View style={{ flex: 1 }}>
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <H1 style={{ marginTop: eyebrow ? 6 : 0 }}>{title}</H1>
        {sub ? <Body mute style={{ marginTop: 6 }}>{sub}</Body> : null}
      </View>
      {right ? <View style={{ marginLeft: 12, marginTop: 4 }}>{right}</View> : null}
    </View>
  );
}

// ── Surfaces ───────────────────────────────────────────────────────────────

export function Surface({
  children,
  style,
  onPress,
  padded = true,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  padded?: boolean;
}) {
  const base: ViewStyle = {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: padded ? 18 : 0,
    ...shadow.card,
  };
  if (!onPress) return <View style={[base, style]}>{children}</View>;
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [base, style, { transform: [{ scale: pressed ? 0.985 : 1 }] }]}
    >
      {children}
    </Pressable>
  );
}

export function SectionTitle({ title, action, onAction, style }: { title: string; action?: string; onAction?: () => void; style?: StyleProp<ViewStyle> }) {
  return (
    <View style={[{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 12, paddingHorizontal: 20 }, style]}>
      <H2 style={{ flex: 1 }}>{title}</H2>
      {action ? (
        <Pressable onPress={onAction} hitSlop={8}>
          <Text style={{ color: colors.terracotta, fontFamily: fonts.bodyBold, fontSize: 14 }}>{action}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

// ── Badges ─────────────────────────────────────────────────────────────────

export function EmojiBadge({ emoji, size = 48, bg = colors.sand, style }: { emoji: string; size?: number; bg?: string; style?: StyleProp<ViewStyle> }) {
  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: bg,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
    >
      <Text style={{ fontSize: size * 0.52, lineHeight: size * 0.68, textAlign: 'center' }} allowFontScaling={false}>
        {emoji}
      </Text>
    </View>
  );
}

export function IconBadge({ icon: Icn, hue = 'rose', size = 44, iconSize }: { icon: IconCmp; hue?: TintKey; size?: number; iconSize?: number }) {
  const t = tint[hue];
  return (
    <View style={{ width: size, height: size, borderRadius: size * 0.36, backgroundColor: t.bg, alignItems: 'center', justifyContent: 'center' }}>
      <Icn size={iconSize ?? size * 0.5} color={t.fg} />
    </View>
  );
}

// ── Controls ───────────────────────────────────────────────────────────────

export function Chip({
  label,
  selected,
  onPress,
  emoji,
  style,
  small,
}: {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  emoji?: string;
  style?: StyleProp<ViewStyle>;
  small?: boolean;
}) {
  return (
    <Pressable
      onPress={() => {
        Haptics.selectionAsync().catch(() => {});
        onPress?.();
      }}
      accessibilityRole="button"
      accessibilityState={{ selected: !!selected }}
      style={({ pressed }) => [
        {
          height: small ? 34 : 40,
          paddingHorizontal: small ? 12 : 16,
          borderRadius: 999,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
          backgroundColor: selected ? colors.ink : colors.surface,
          borderWidth: 1,
          borderColor: selected ? colors.ink : colors.line,
          opacity: pressed ? 0.8 : 1,
        },
        style,
      ]}
    >
      {emoji ? <Text style={{ fontSize: small ? 14 : 16 }}>{emoji}</Text> : null}
      <Text style={{ color: selected ? colors.base : colors.ink, fontFamily: fonts.bodyBold, fontSize: small ? 13 : 14 }}>{label}</Text>
    </Pressable>
  );
}

export function Segmented<T extends string>({
  options,
  value,
  onChange,
  style,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View
      style={[
        { flexDirection: 'row', backgroundColor: colors.sand, borderRadius: 14, padding: 4, gap: 4 },
        style,
      ]}
    >
      {options.map((o) => {
        const sel = o.value === value;
        return (
          <Pressable
            key={o.value}
            onPress={() => {
              Haptics.selectionAsync().catch(() => {});
              onChange(o.value);
            }}
            accessibilityRole="button"
            accessibilityState={{ selected: sel }}
            style={{
              flex: 1,
              height: 38,
              borderRadius: 11,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: sel ? colors.surface : 'transparent',
              ...(sel ? shadow.card : {}),
            }}
          >
            <Text style={{ fontFamily: fonts.bodyBold, fontSize: 13.5, color: sel ? colors.ink : colors.mute }} numberOfLines={1}>
              {o.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function ProgressBar({ value, color = colors.terracotta, track = colors.sand, height = 8, style }: { value: number; color?: string; track?: string; height?: number; style?: StyleProp<ViewStyle> }) {
  const pct = Math.max(0, Math.min(1, value));
  return (
    <View style={[{ height, borderRadius: height / 2, backgroundColor: track, overflow: 'hidden' }, style]}>
      <View style={{ width: `${pct * 100}%`, height: '100%', borderRadius: height / 2, backgroundColor: color }} />
    </View>
  );
}

// ── Lists ──────────────────────────────────────────────────────────────────

export function Row({
  title,
  sub,
  right,
  left,
  onPress,
  chevron = true,
  danger,
  last,
}: {
  title: string;
  sub?: string;
  right?: React.ReactNode;
  left?: React.ReactNode;
  onPress?: () => void;
  chevron?: boolean;
  danger?: boolean;
  last?: boolean;
}) {
  return (
    <View>
      <Pressable
        onPress={onPress}
        disabled={!onPress}
        accessibilityRole={onPress ? 'button' : undefined}
        style={({ pressed }) => ({
          paddingHorizontal: 16,
          paddingVertical: 14,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 14,
          backgroundColor: pressed ? colors.sand : 'transparent',
        })}
      >
        {left}
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 15.5, color: danger ? colors.danger : colors.ink, fontFamily: fonts.bodyBold }}>{title}</Text>
          {sub ? (
            <Text style={{ fontSize: 13, color: colors.mute, marginTop: 2, fontFamily: fonts.body, lineHeight: 18 }} numberOfLines={2}>
              {sub}
            </Text>
          ) : null}
        </View>
        {right}
        {onPress && chevron ? <Icon.chevR size={18} color={colors.faint} /> : null}
      </Pressable>
      {!last ? <View style={{ height: 1, backgroundColor: colors.line, marginLeft: left ? 74 : 16 }} /> : null}
    </View>
  );
}

export function ToggleRow({ title, sub, value, onChange, last }: { title: string; sub?: string; value: boolean; onChange: (v: boolean) => void; last?: boolean }) {
  return (
    <Row
      title={title}
      sub={sub}
      chevron={false}
      last={last}
      right={
        <Switch
          value={value}
          onValueChange={(v) => {
            Haptics.selectionAsync().catch(() => {});
            onChange(v);
          }}
          trackColor={{ true: colors.terracotta, false: colors.line }}
          thumbColor="#fff"
          ios_backgroundColor={colors.line}
        />
      }
    />
  );
}

// ── Inputs ─────────────────────────────────────────────────────────────────

export const Field = React.forwardRef<TextInput, TextInputProps & { label?: string; containerStyle?: StyleProp<ViewStyle> }>(
  function Field({ label, containerStyle, style, ...props }, ref) {
    return (
      <View style={containerStyle}>
        {label ? <Eyebrow style={{ marginBottom: 8 }}>{label}</Eyebrow> : null}
        <TextInput
          ref={ref}
          placeholderTextColor={colors.faint}
          style={[
            {
              minHeight: 52,
              paddingHorizontal: 16,
              paddingVertical: 14,
              borderRadius: 16,
              backgroundColor: colors.surface,
              borderWidth: 1,
              borderColor: colors.line,
              fontSize: 16,
              color: colors.ink,
              fontFamily: fonts.body,
            },
            style,
          ]}
          {...props}
        />
      </View>
    );
  },
);

// ── Empty state ────────────────────────────────────────────────────────────

export function EmptyState({ emoji, title, body, action }: { emoji: string; title: string; body?: string; action?: React.ReactNode }) {
  return (
    <View style={{ alignItems: 'center', paddingHorizontal: 32, paddingVertical: 36 }}>
      <EmojiBadge emoji={emoji} size={84} bg={colors.blush} />
      <H2 style={{ marginTop: 18, textAlign: 'center' }}>{title}</H2>
      {body ? <Body mute style={{ textAlign: 'center', marginTop: 8 }}>{body}</Body> : null}
      {action ? <View style={{ marginTop: 18, alignSelf: 'stretch' }}>{action}</View> : null}
    </View>
  );
}

/** Small "for information only" footnote shown under medical content. */
export function MedicalNote({ text }: { text: string }) {
  return (
    <View style={{ flexDirection: 'row', gap: 8, paddingHorizontal: 20, marginTop: 20, alignItems: 'flex-start' }}>
      <Icon.info size={16} color={colors.faint} />
      <Text style={{ flex: 1, color: colors.faint, fontSize: 12, lineHeight: 17, fontFamily: fonts.body }}>{text}</Text>
    </View>
  );
}
