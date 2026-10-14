// Custom bottom tab bar — a floating Liquid Glass capsule with labelled icons,
// a glass "lens" that glides to the selected tab, and a raised centre
// "Can I?" button for the safety library.

import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring, withTiming } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Icon } from '@/components/Icon';
import { GlassSurface } from '@/components/Glass';
import { useT } from '@/i18n';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

type IconCmp = React.ComponentType<{ size?: number; color?: string }>;
type Tab = { key: string; route: string; Icn: IconCmp; label: string; center?: boolean };

const TABS: Tab[] = [
  { key: 'index', route: '/(tabs)', Icn: Icon.home, label: 'tab.today' },
  { key: 'weeks', route: '/(tabs)/weeks', Icn: Icon.calendar, label: 'tab.weeks' },
  { key: 'check', route: '/(tabs)/check', Icn: Icon.shield, label: 'tab.check', center: true },
  { key: 'journal', route: '/(tabs)/journal', Icn: Icon.book, label: 'tab.journal' },
  { key: 'tools', route: '/(tabs)/tools', Icn: Icon.grid, label: 'tab.tools' },
];

const BAR_H = 66;
const LENS_INSET = 5;
const SPRING = { damping: 17, stiffness: 190, mass: 0.9 };

/** Height the floating bar occupies above the home indicator (for screen padding). */
export const TAB_BAR_SPACE = BAR_H + 28;

export function MarigoldTabBar({ active }: { active: string }) {
  const t = useT();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [width, setWidth] = useState(0);

  const index = Math.max(0, TABS.findIndex((tab) => tab.key === active));
  const slot = width / TABS.length;
  const lensX = useSharedValue(0);
  const lensStretch = useSharedValue(1);
  const lensOpacity = useSharedValue(0);

  useEffect(() => {
    if (!slot) return;
    const onCenter = TABS[index]?.center;
    lensOpacity.value = withTiming(onCenter ? 0 : 1, { duration: 180 });
    if (onCenter) return;
    lensX.value = withSpring(index * slot + LENS_INSET, SPRING);
    // A little liquid squash-and-stretch while the lens travels.
    lensStretch.value = withSequence(withTiming(1.14, { duration: 110 }), withSpring(1, SPRING));
  }, [index, slot, lensX, lensStretch, lensOpacity]);

  const lensStyle = useAnimatedStyle(() => ({
    opacity: lensOpacity.value,
    transform: [{ translateX: lensX.value }, { scaleX: lensStretch.value }],
  }));

  const press = (tab: Tab) => {
    Haptics.selectionAsync().catch(() => {});
    router.navigate(tab.route as any);
  };

  return (
    <View
      pointerEvents="box-none"
      style={{ position: 'absolute', left: 16, right: 16, bottom: Math.max(insets.bottom - 6, 14) }}
    >
      <View style={styles.shadow}>
        <GlassSurface capsule style={{ height: BAR_H }}>
          <View style={[StyleSheet.absoluteFill, styles.clip]} pointerEvents="none">
            <LinearGradient
              colors={['rgba(255,252,247,0.55)', 'rgba(251,246,240,0.18)']}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 0.7 }}
              style={StyleSheet.absoluteFill}
            />
          </View>
          <View style={[StyleSheet.absoluteFill, styles.rim]} pointerEvents="none" />

          <View style={{ flex: 1, flexDirection: 'row' }} onLayout={(e) => setWidth(e.nativeEvent.layout.width)}>
            {slot ? (
              <Animated.View
                pointerEvents="none"
                style={[styles.lens, { width: slot - LENS_INSET * 2, height: BAR_H - LENS_INSET * 2 }, lensStyle]}
              />
            ) : null}

            {TABS.map((tab) => {
              const isActive = active === tab.key;
              const tint = isActive ? colors.terracotta : colors.ink2;
              if (tab.center) {
                return (
                  <Pressable
                    key={tab.key}
                    onPress={() => press(tab)}
                    accessibilityRole="tab"
                    accessibilityLabel={t(tab.label)}
                    accessibilityState={{ selected: isActive }}
                    style={{ flex: 1, alignItems: 'center' }}
                  >
                    <View style={styles.centerRing}>
                      <LinearGradient colors={['#D88464', '#B95D3F']} start={{ x: 0.2, y: 0 }} end={{ x: 0.8, y: 1 }} style={styles.centerButton}>
                        <tab.Icn size={25} color="#fff" />
                      </LinearGradient>
                    </View>
                    <Text numberOfLines={1} style={[styles.label, { color: isActive ? colors.terracotta : colors.ink2, marginTop: 1 }]}>
                      {t(tab.label)}
                    </Text>
                  </Pressable>
                );
              }
              return (
                <Pressable
                  key={tab.key}
                  onPress={() => press(tab)}
                  accessibilityRole="tab"
                  accessibilityLabel={t(tab.label)}
                  accessibilityState={{ selected: isActive }}
                  style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                >
                  <tab.Icn size={23} color={tint} />
                  <Text numberOfLines={1} style={[styles.label, { color: tint }]}>
                    {t(tab.label)}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </GlassSurface>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    borderRadius: 999,
    shadowColor: '#5B4636',
    shadowOpacity: 0.16,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 10 },
  },
  clip: { borderRadius: 999, overflow: 'hidden' },
  rim: { borderRadius: 999, borderWidth: 1, borderColor: 'rgba(255,255,255,0.7)' },
  lens: {
    position: 'absolute',
    top: LENS_INSET,
    left: 0,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.62)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.95)',
    shadowColor: '#5B4636',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  label: { fontSize: 10.5, marginTop: 2, fontFamily: fonts.bodyBold, letterSpacing: 0.1 },
  centerRing: {
    marginTop: -22,
    width: 60,
    height: 60,
    borderRadius: 30,
    padding: 4,
    backgroundColor: 'rgba(255,255,255,0.75)',
    shadowColor: colors.terracotta,
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
  centerButton: { flex: 1, borderRadius: 26, alignItems: 'center', justifyContent: 'center' },
});
