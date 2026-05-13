// Custom bottom tab bar — frosted glass, dot indicator, big centre scan.
// Hosts the floating scan FAB itself so it sits above the bar.

import React from 'react';
import { Pressable, View, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { Icon } from '@/components/Icon';
import { colors } from '@/theme/colors';

type Tab = { key: string; route: string; Icn: React.ComponentType<{ size?: number; color?: string }>; big?: boolean };

const tabs: Tab[] = [
  { key: 'home', route: '/(tabs)/', Icn: Icon.home },
  { key: 'library', route: '/(tabs)/library', Icn: Icon.library },
  { key: 'scan', route: '/scan', Icn: Icon.scan, big: true },
  { key: 'journal', route: '/(tabs)/journal', Icn: Icon.journal },
  { key: 'profile', route: '/(tabs)/profile', Icn: Icon.user },
];

export function MarigoldTabBar({ active }: { active: string }) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const press = (t: Tab) => {
    Haptics.selectionAsync().catch(() => {});
    if (t.key === 'scan') {
      router.push('/scan');
      return;
    }
    router.navigate(t.route as any);
  };

  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        paddingBottom: Math.max(insets.bottom, 18),
        paddingTop: 10,
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderTopColor: 'rgba(237,228,216,0.6)',
        backgroundColor: Platform.OS === 'android' ? 'rgba(251,247,242,0.96)' : 'transparent',
      }}
    >
      {Platform.OS === 'ios' && (
        <BlurView
          intensity={30}
          tint="light"
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        />
      )}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: 360,
          alignSelf: 'center',
          width: '100%',
        }}
      >
        {tabs.map((t) => {
          const isActive = active === t.key;
          return (
            <Pressable
              key={t.key}
              onPress={() => press(t)}
              style={{
                width: 44,
                height: 44,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <t.Icn size={t.big ? 26 : 22} color={isActive ? colors.ink : colors.mute} />
              {isActive && !t.big ? (
                <View
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: 2,
                    marginTop: 4,
                    backgroundColor: colors.ink,
                  }}
                />
              ) : null}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
