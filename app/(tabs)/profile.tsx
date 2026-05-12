// Profile — user header, sharing rows, settings rows, app version footer.

import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card, SectionHead } from '@/components/Card';
import { Icon } from '@/components/Icon';
import { Illo } from '@/components/Blob';
import { useAppStore } from '@/store/useAppStore';
import { useT, SUPPORTED_LANGS } from '@/i18n';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

export default function Profile() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const t = useT();
  const profile = useAppStore((s) => s.profile);
  const language = useAppStore((s) => s.language);

  const partnerName = 'Sam';
  const langLabel =
    SUPPORTED_LANGS.find((l) => l.code === language)?.name ?? 'English';

  const sharingRows: { key: string; title: string; sub: string; go: string }[] = [
    {
      key: 'partner',
      title: t('profile.partner'),
      sub: profile.partnerLinked
        ? t('profile.partner.linked', { name: partnerName })
        : t('profile.partner.invite', { name: partnerName }),
      go: '/partner',
    },
    {
      key: 'pdf',
      title: t('profile.doctorPdf'),
      sub: t('profile.doctorPdf.sub'),
      go: '/pdf',
    },
    {
      key: 'sub',
      title: t('profile.subscription'),
      sub: t('profile.subscription.sub'),
      go: '/paywall',
    },
  ];

  const toolRows: { key: string; title: string; sub: string; go: string }[] = [
    {
      key: 'kicks',
      title: t('tools.kicks.title'),
      sub: t('tools.kicks.sub'),
      go: '/tools/kicks',
    },
    {
      key: 'contractions',
      title: t('tools.contractions.title'),
      sub: t('tools.contractions.sub'),
      go: '/tools/contractions',
    },
    {
      key: 'health',
      title: t('tools.health.title'),
      sub: t('tools.health.sub'),
      go: '/tools/health',
    },
  ];

  const settingsRows: { key: string; title: string; sub: string; go: string }[] = [
    {
      key: 'country',
      title: t('profile.country'),
      sub: profile.country,
      go: '/settings/country',
    },
    {
      key: 'health',
      title: t('profile.health'),
      sub: profile.conditions.length
        ? profile.conditions.join(', ')
        : t('profile.health.empty'),
      go: '/settings/health',
    },
    {
      key: 'notifications',
      title: t('profile.notifications'),
      sub: t('profile.notifications.sub'),
      go: '/settings/notifications',
    },
    {
      key: 'privacy',
      title: t('profile.privacy'),
      sub: t('profile.privacy.sub'),
      go: '/settings/privacy',
    },
    {
      key: 'appearance',
      title: t('profile.appearance'),
      sub: t('profile.appearance.sub'),
      go: '/settings/appearance',
    },
    {
      key: 'language',
      title: t('profile.language'),
      sub: langLabel,
      go: '/settings/language',
    },
  ];

  return (
    <ScrollView
      contentContainerStyle={{ paddingTop: insets.top + 8, paddingBottom: 200 }}
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
              {profile.name} Doe
            </Text>
            <Text
              style={{
                color: colors.mute,
                fontSize: 13,
                fontFamily: fonts.body,
                marginTop: 2,
              }}
            >
              {t('profile.weekCountry', { week: profile.week, country: profile.country })}
            </Text>
          </View>
        </Card>
      </View>

      <View style={{ paddingHorizontal: 24, marginTop: 28 }}>
        <SectionHead caption={t('profile.sharingCaption')} title={t('profile.sharingTitle')} />
        <Card>
          {sharingRows.map((r, i) => (
            <View key={r.key}>
              <Pressable
                onPress={() => router.push(r.go as any)}
                style={{
                  padding: 16,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 16,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 15, color: colors.ink, fontFamily: fonts.body }}>
                    {r.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12.5,
                      color: colors.mute,
                      marginTop: 2,
                      fontFamily: fonts.body,
                    }}
                  >
                    {r.sub}
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
        <SectionHead caption={t('profile.toolsCaption')} title={t('profile.tools')} />
        <Card>
          {toolRows.map((r, i) => (
            <View key={r.key}>
              <Pressable
                onPress={() => router.push(r.go as any)}
                style={{
                  padding: 16,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 16,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 15, color: colors.ink, fontFamily: fonts.body }}>
                    {r.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12.5,
                      color: colors.mute,
                      marginTop: 2,
                      fontFamily: fonts.body,
                    }}
                  >
                    {r.sub}
                  </Text>
                </View>
                <Icon.chevR size={18} color={colors.mute} />
              </Pressable>
              {i < toolRows.length - 1 ? (
                <View style={{ height: 1, backgroundColor: colors.line, marginLeft: 16 }} />
              ) : null}
            </View>
          ))}
        </Card>
      </View>

      <View style={{ paddingHorizontal: 24, marginTop: 28 }}>
        <SectionHead caption={t('profile.settingsCaption')} title={t('profile.settingsTitle')} />
        <Card>
          {settingsRows.map((r, i) => (
            <View key={r.key}>
              <Pressable
                onPress={() => router.push(r.go as any)}
                style={{
                  padding: 16,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 16,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 15, color: colors.ink, fontFamily: fonts.body }}>
                    {r.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12.5,
                      color: colors.mute,
                      marginTop: 2,
                      fontFamily: fonts.body,
                    }}
                    numberOfLines={1}
                  >
                    {r.sub}
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
