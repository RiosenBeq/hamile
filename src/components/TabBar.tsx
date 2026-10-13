// Custom bottom tab bar — frosted cream glass, labelled icons, and a raised
// centre "Can I?" button for the safety library.

import React from 'react';
import { Platform, Pressable, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { Icon } from '@/components/Icon';
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

export function MarigoldTabBar({ active }: { active: string }) {
  const t = useT();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const press = (tab: Tab) => {
    Haptics.selectionAsync().catch(() => {});
    router.navigate(tab.route as any);
  };

  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        paddingBottom: Math.max(insets.bottom, 12),
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: 'rgba(237,227,215,0.9)',
        backgroundColor: Platform.OS === 'ios' ? 'rgba(251,246,240,0.72)' : 'rgba(251,246,240,0.97)',
      }}
    >
      {Platform.OS === 'ios' ? (
        <BlurView intensity={40} tint="light" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
      ) : null}
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-around', paddingHorizontal: 8 }}>
        {TABS.map((tab) => {
          const isActive = active === tab.key;
          if (tab.center) {
            return (
              <Pressable
                key={tab.key}
                onPress={() => press(tab)}
                accessibilityRole="tab"
                accessibilityLabel={t(tab.label)}
                accessibilityState={{ selected: isActive }}
                style={{ alignItems: 'center', width: 76, marginTop: -26 }}
              >
                <View
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    backgroundColor: colors.terracotta,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 4,
                    borderColor: colors.base,
                    shadowColor: colors.terracotta,
                    shadowOpacity: 0.35,
                    shadowRadius: 12,
                    shadowOffset: { width: 0, height: 6 },
                    elevation: 6,
                  }}
                >
                  <tab.Icn size={26} color="#fff" />
                </View>
                <Text style={{ fontSize: 11, marginTop: 3, fontFamily: fonts.bodyBold, color: isActive ? colors.terracotta : colors.mute }}>
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
              style={{ alignItems: 'center', width: 64, paddingTop: 4 }}
            >
              <tab.Icn size={24} color={isActive ? colors.terracotta : colors.mute} />
              <Text style={{ fontSize: 11, marginTop: 3, fontFamily: fonts.bodyBold, color: isActive ? colors.terracotta : colors.mute }}>
                {t(tab.label)}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
