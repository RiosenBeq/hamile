import React from 'react';
import { Pressable, View, ViewStyle, Text } from 'react-native';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

type CardProps = {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  onPress?: () => void;
  raised?: boolean;
};

export function Card({ children, style, onPress, raised = true }: CardProps) {
  const inner = (
    <View
      style={[
        {
          backgroundColor: colors.surface,
          borderRadius: 20,
          shadowColor: colors.ink,
          shadowOpacity: raised ? 0.08 : 0,
          shadowRadius: 24,
          shadowOffset: { width: 0, height: 4 },
          elevation: raised ? 2 : 0,
        },
        style as any,
      ]}
    >
      {children}
    </View>
  );
  if (!onPress) return inner;
  return (
    <Pressable onPress={onPress} style={({ pressed }) => ({ transform: [{ scale: pressed ? 0.985 : 1 }] })}>
      {inner}
    </Pressable>
  );
}

export function SectionHead({
  caption,
  title,
  right,
}: {
  caption?: string;
  title: string;
  right?: React.ReactNode;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginBottom: 12,
      }}
    >
      <View>
        {caption ? (
          <Text
            style={{
              color: colors.mute,
              fontFamily: fonts.bodyBold,
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: 1.6,
              marginBottom: 4,
            }}
          >
            {caption}
          </Text>
        ) : null}
        <Text
          style={{
            color: colors.ink,
            fontFamily: fonts.display,
            fontSize: 22,
            lineHeight: 28,
            letterSpacing: -0.2,
          }}
        >
          {title}
        </Text>
      </View>
      {right}
    </View>
  );
}

export function Divider() {
  return <View style={{ height: 1, backgroundColor: colors.line }} />;
}
