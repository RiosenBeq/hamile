// Custom bottom tab bar — frosted glass, dot indicator, big centre scan.
// Hosts the floating scan FAB itself so it sits above the bar.

import React, { memo, useCallback } from 'react';
import { Pressable, Platform, StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { Icon } from '@/components/Icon';
import { colors } from '@/theme/colors';

type Tab = {
  key: string;
  route: string;
  Icn: React.ComponentType<{ size?: number; color?: string }>;
  big?: boolean;
  label: string;
};

const tabs: Tab[] = [
  { key: 'home', route: '/(tabs)', Icn: Icon.home, label: 'Home' },
  { key: 'library', route: '/(tabs)/library', Icn: Icon.library, label: 'Library' },
  { key: 'scan', route: '/scan', Icn: Icon.scan, big: true, label: 'Scan' },
  { key: 'journal', route: '/(tabs)/journal', Icn: Icon.journal, label: 'Journal' },
  { key: 'profile', route: '/(tabs)/profile', Icn: Icon.user, label: 'Profile' },
];

function MarigoldTabBarImpl({ active }: { active: string }) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const press = useCallback(
    (t: Tab) => {
      Haptics.selectionAsync().catch(() => {});
      if (t.key === 'scan') {
        router.push('/scan');
        return;
      }
      router.navigate(t.route as any);
    },
    [router],
  );

  return (
    <View
      style={[
        styles.bar,
        {
          paddingBottom: Math.max(insets.bottom, 18),
          backgroundColor:
            Platform.OS === 'android' ? 'rgba(251,247,242,0.96)' : 'transparent',
        },
      ]}
    >
      {Platform.OS === 'ios' && (
        <BlurView intensity={30} tint="light" style={StyleSheet.absoluteFill} />
      )}
      <View style={styles.row}>
        {tabs.map((t) => {
          const isActive = active === t.key;
          return (
            <Pressable
              key={t.key}
              onPress={() => press(t)}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
              accessibilityLabel={t.label}
              style={styles.tab}
            >
              <t.Icn size={t.big ? 26 : 22} color={isActive ? colors.ink : colors.mute} />
              {isActive && !t.big ? <View style={styles.activeDot} /> : null}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export const MarigoldTabBar = memo(MarigoldTabBarImpl);

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(237,228,216,0.6)',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: 360,
    alignSelf: 'center',
    width: '100%',
  },
  tab: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 4,
    backgroundColor: colors.ink,
  },
});
