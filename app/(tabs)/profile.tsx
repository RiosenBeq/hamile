// Profile — user header, sharing rows, settings rows, app version footer.

import React from 'react';
import { Pressable, ScrollView, Text, View, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card, SectionHead } from '@/components/Card';
import { Icon } from '@/components/Icon';
import { Illo } from '@/components/Blob';
import { useAppStore } from '@/store/useAppStore';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

export default function Profile() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const profile = useAppStore((s) => s.profile);

  const sharingRows: [string, string, string][] = [
    ['Partner', profile.partnerLinked ? 'Sam · linked' : 'Invite Sam', '/partner'],
    ['Doctor PDF', 'Last sent · 2 weeks ago', '/pdf'],
    ['Subscription', '9-month plan · $49', '/paywall'],
  ];

  const settingsRows: [string, string, string][] = [
    ['Security & sync', 'App lock, sign-in, manual backup', '/settings/security'],
    ['Country & cuisine', profile.country, '/settings/country'],
    ['Health profile', profile.conditions.length ? profile.conditions.join(', ') : 'No conditions logged', '/settings/health'],
    ['Notifications', 'Daily intention · weekly milestone', '/settings/notifications'],
    ['Privacy', 'On-device first · nothing sold', '/settings/privacy'],
    ['Appearance', 'Auto', '/settings/appearance'],
    ['Language', 'English', '/settings/language'],
  ];

  return (
    <ScrollView
      contentContainerStyle={{ paddingTop: insets.top + 8, paddingBottom: 200 }}
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: colors.base }}
    >
      <View style={{ paddingHorizontal: 24 }}>
        <Text style={{ fontSize: 11, letterSpacing: 1.8, textTransform: 'uppercase', color: colors.mute, fontFamily: fonts.bodyBold }}>You</Text>
        <Text style={{ marginTop: 4, fontFamily: fonts.display, fontSize: 30, color: colors.ink, letterSpacing: -0.4 }}>
          Hello, {profile.name}.
        </Text>
      </View>

      <View style={{ paddingHorizontal: 24, marginTop: 18 }}>
        <Card style={{ padding: 18, flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <Illo label="you" hue="rose" size={56} />
          <View>
            <Text style={{ color: colors.ink, fontSize: 16, fontFamily: fonts.bodyBold }}>{profile.name} Doe</Text>
            <Text style={{ color: colors.mute, fontSize: 13, fontFamily: fonts.body, marginTop: 2 }}>
              Week {profile.week} · {profile.country}
            </Text>
          </View>
        </Card>
      </View>

      <View style={{ paddingHorizontal: 24, marginTop: 28 }}>
        <SectionHead caption="Your circle" title="Sharing" />
        <Card>
          {sharingRows.map(([nm, sub, go], i) => (
            <View key={nm}>
              <Pressable
                onPress={() => router.push(go as any)}
                style={{ padding: 16, flexDirection: 'row', alignItems: 'center', gap: 16 }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 15, color: colors.ink, fontFamily: fonts.body }}>{nm}</Text>
                  <Text style={{ fontSize: 12.5, color: colors.mute, marginTop: 2, fontFamily: fonts.body }}>{sub}</Text>
                </View>
                <Icon.chevR size={18} color={colors.mute} />
              </Pressable>
              {i < sharingRows.length - 1 ? <View style={{ height: 1, backgroundColor: colors.line, marginLeft: 16 }} /> : null}
            </View>
          ))}
        </Card>
      </View>

      <View style={{ paddingHorizontal: 24, marginTop: 28 }}>
        <SectionHead caption="Settings" title="Preferences" />
        <Card>
          {settingsRows.map(([nm, sub, go], i) => (
            <View key={nm}>
              <Pressable
                onPress={() => router.push(go as any)}
                style={{ padding: 16, flexDirection: 'row', alignItems: 'center', gap: 16 }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 15, color: colors.ink, fontFamily: fonts.body }}>{nm}</Text>
                  <Text style={{ fontSize: 12.5, color: colors.mute, marginTop: 2, fontFamily: fonts.body }} numberOfLines={1}>
                    {sub}
                  </Text>
                </View>
                <Icon.chevR size={18} color={colors.mute} />
              </Pressable>
              {i < settingsRows.length - 1 ? <View style={{ height: 1, backgroundColor: colors.line, marginLeft: 16 }} /> : null}
            </View>
          ))}
        </Card>
      </View>

      <View style={{ paddingHorizontal: 24, marginTop: 28, alignItems: 'center' }}>
        <Text style={{ fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase', color: colors.mute, fontFamily: fonts.bodyBold }}>
          Marigold v1.0 · made with care
        </Text>
      </View>
    </ScrollView>
  );
}
