// Profile — user header, sharing rows, settings rows, app version footer.

import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card, SectionHead } from '@/components/Card';
import { Icon } from '@/components/Icon';
import { Illo } from '@/components/Blob';
import { useAppStore } from '@/store/useAppStore';
import { SUPPORTED_LANGS, useT } from '@/i18n';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

export default function Profile() {
  const t = useT();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const profile = useAppStore((s) => s.profile);
  const language = useAppStore((s) => s.language);

  const langLabel = SUPPORTED_LANGS.find((l) => l.code === language)?.name ?? 'English';

  const sharingRows: [string, string, string][] = [
    [
      t('profile.partner'),
      profile.partnerLinked
        ? t('profile.partner.linked', { name: 'Sam' })
        : t('profile.partner.invite', { name: 'Sam' }),
      '/partner',
    ],
    [t('profile.doctorPdf'), t('profile.doctorPdf.sub'), '/pdf'],
    [t('profile.subscription'), t('profile.subscription.sub'), '/paywall'],
  ];

  const settingsRows: [string, string, string][] = [
    [t('profile.security'), t('profile.security.sub'), '/settings/security'],
    [t('profile.country'), profile.country, '/settings/country'],
    [
      t('profile.health'),
      profile.conditions.length ? profile.conditions.join(', ') : t('profile.health.empty'),
      '/settings/health',
    ],
    [t('profile.notifications'), t('profile.notifications.sub'), '/settings/notifications'],
    [t('profile.privacy'), t('profile.privacy.sub'), '/settings/privacy'],
    [t('profile.appearance'), t('profile.appearance.sub'), '/settings/appearance'],
    [t('profile.language'), langLabel, '/settings/language'],
  ];

  return (
    <ScrollView
      contentContainerStyle={{ paddingTop: insets.top + 8, paddingBottom: insets.bottom + 140 }}
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: colors.base }}
    >
      <View style={{ paddingHorizontal: 24 }}>
        <Text
          style={{
            fontSize: 11,
            letterSpacing: 1.8,
            textTransform: 'uppercase',
            color: colors.mute,
            fontFamily: fonts.bodyBold,
          }}
        >
          {t('profile.you')}
        </Text>
        <Text
          style={{
            marginTop: 4,
            fontFamily: fonts.display,
            fontSize: 30,
            color: colors.ink,
            letterSpacing: -0.4,
          }}
        >
          {t('profile.hello', { name: profile.name })}
        </Text>
      </View>

      <View style={{ paddingHorizontal: 24, marginTop: 18 }}>
        <Card style={{ padding: 18, flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <Illo label="you" hue="rose" size={56} />
          <View>
            <Text style={{ color: colors.ink, fontSize: 16, fontFamily: fonts.bodyBold }}>
              {t('profile.fullName', { first: profile.name })}
            </Text>
            <Text style={{ color: colors.mute, fontSize: 13, fontFamily: fonts.body, marginTop: 2 }}>
              {t('profile.weekCountry', { week: profile.week, country: profile.country })}
            </Text>
          </View>
        </Card>
      </View>

      <View style={{ paddingHorizontal: 24, marginTop: 28 }}>
        <SectionHead caption={t('profile.sharingCaption')} title={t('profile.sharingTitle')} />
        <Card>
          {sharingRows.map(([nm, sub, go], i) => (
            <View key={nm}>
              <Pressable
                onPress={() => router.push(go as any)}
                style={{ padding: 16, flexDirection: 'row', alignItems: 'center', gap: 16 }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 15, color: colors.ink, fontFamily: fonts.body }}>{nm}</Text>
                  <Text style={{ fontSize: 12.5, color: colors.mute, marginTop: 2, fontFamily: fonts.body }}>
                    {sub}
                  </Text>
                </View>
                <Icon.chevR size={18} color={colors.mute} />
              </Pressable>
              {i < sharingRows.length - 1 ? (
                <View style={{ height: 1, backgroundColor: colors.line, marginLeft: 16 }} />
              ) : null}
            </View>
          ))}
        </Card>
      </View>

      <View style={{ paddingHorizontal: 24, marginTop: 28 }}>
        <SectionHead caption={t('profile.settingsCaption')} title={t('profile.settingsTitle')} />
        <Card>
          {settingsRows.map(([nm, sub, go], i) => (
            <View key={nm}>
              <Pressable
                onPress={() => router.push(go as any)}
                style={{ padding: 16, flexDirection: 'row', alignItems: 'center', gap: 16 }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 15, color: colors.ink, fontFamily: fonts.body }}>{nm}</Text>
                  <Text
                    style={{ fontSize: 12.5, color: colors.mute, marginTop: 2, fontFamily: fonts.body }}
                    numberOfLines={1}
                  >
                    {sub}
                  </Text>
                </View>
                <Icon.chevR size={18} color={colors.mute} />
              </Pressable>
              {i < settingsRows.length - 1 ? (
                <View style={{ height: 1, backgroundColor: colors.line, marginLeft: 16 }} />
              ) : null}
            </View>
          ))}
        </Card>
      </View>

      <View style={{ paddingHorizontal: 24, marginTop: 28, alignItems: 'center' }}>
        <Text
          style={{
            fontSize: 11,
            letterSpacing: 1.6,
            textTransform: 'uppercase',
            color: colors.mute,
            fontFamily: fonts.bodyBold,
          }}
        >
          {t('profile.footer')}
        </Text>
      </View>
    </ScrollView>
  );
}
