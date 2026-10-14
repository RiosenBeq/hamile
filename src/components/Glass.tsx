// GlassSurface — Liquid Glass on iOS 26 (native MarigoldGlassView backed by
// UIGlassEffect), a frosted system blur on older iOS, and a translucent cream
// fill elsewhere. Children are layered on top of the material.

import React from 'react';
import { Platform, processColor, requireNativeComponent, StyleSheet, UIManager, View } from 'react-native';
import type { HostComponent, StyleProp, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';

type NativeProps = {
  style?: StyleProp<ViewStyle>;
  radius?: number;
  capsule?: boolean;
  glassStyle?: 'regular' | 'clear';
  tint?: number | null;
};

// requireNativeComponent throws if a name is registered twice (e.g. after a
// hot reload re-runs this module), so keep the component on the global object.
const g = globalThis as { __marigoldGlass?: HostComponent<NativeProps> | null };
if (g.__marigoldGlass === undefined) {
  const available = Platform.OS === 'ios' && !!UIManager.getViewManagerConfig?.('MarigoldGlassView');
  g.__marigoldGlass = available ? requireNativeComponent<NativeProps>('MarigoldGlassView') : null;
}
const NativeGlass = g.__marigoldGlass;

export function GlassSurface({
  style,
  radius = 24,
  capsule = false,
  glassStyle = 'regular',
  tint,
  children,
}: {
  style?: StyleProp<ViewStyle>;
  radius?: number;
  capsule?: boolean;
  glassStyle?: 'regular' | 'clear';
  /** Optional colour wash, e.g. 'rgba(251,246,240,0.4)'. */
  tint?: string;
  children?: React.ReactNode;
}) {
  const borderRadius = capsule ? 999 : radius;
  return (
    <View style={[{ borderRadius }, style]}>
      {NativeGlass ? (
        <NativeGlass
          style={StyleSheet.absoluteFill}
          radius={radius}
          capsule={capsule}
          glassStyle={glassStyle}
          tint={tint ? (processColor(tint) as number) : null}
        />
      ) : Platform.OS === 'ios' ? (
        <BlurView intensity={45} tint="light" style={[StyleSheet.absoluteFill, { borderRadius, overflow: 'hidden' }]} />
      ) : (
        <View style={[StyleSheet.absoluteFill, { borderRadius, backgroundColor: 'rgba(251,246,240,0.96)' }]} />
      )}
      {children}
    </View>
  );
}
