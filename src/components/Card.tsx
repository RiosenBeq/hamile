import React, { memo } from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

type CardProps = {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  onPress?: () => void;
  raised?: boolean;
};

function CardImpl({ children, style, onPress, raised = true }: CardProps) {
  const inner = (
    <View style={[raised ? styles.raised : styles.flat, style as any]}>{children}</View>
  );
  if (!onPress) return inner;
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) =>
        pressed ? styles.pressedTransform : undefined
      }
    >
      {inner}
    </Pressable>
  );
}

export const Card = memo(CardImpl);

function SectionHeadImpl({
  caption,
  title,
  right,
}: {
  caption?: string;
  title: string;
  right?: React.ReactNode;
}) {
  return (
    <View style={styles.sectionHead}>
      <View>
        {caption ? <Text style={styles.sectionCaption}>{caption}</Text> : null}
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {right}
    </View>
  );
}

export const SectionHead = memo(SectionHeadImpl);

export function Divider() {
  return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
  raised: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    shadowColor: colors.ink,
    shadowOpacity: 0.08,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  flat: {
    backgroundColor: colors.surface,
    borderRadius: 20,
  },
  pressedTransform: {
    transform: [{ scale: 0.985 }],
  },
  sectionHead: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionCaption: {
    color: colors.mute,
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 1.6,
    marginBottom: 4,
  },
  sectionTitle: {
    color: colors.ink,
    fontFamily: fonts.display,
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: -0.2,
  },
  divider: {
    height: 1,
    backgroundColor: colors.line,
  },
});
