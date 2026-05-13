// Home — week ring, daily intention, recent checks (horizontal),
// upcoming reminders, and the doctor visit nudge. Floating scan FAB.

import React, { useMemo } from 'react';
import { ScrollView, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card, SectionHead } from '@/components/Card';
import { Icon } from '@/components/Icon';
import { Blob, Illo } from '@/components/Blob';
import { VerdictPill } from '@/components/Verdict';
import { WeekRing } from '@/components/WeekRing';
import { CountUp } from '@/components/CountUp';
import { ToolShortcuts } from '@/components/ToolShortcuts';
import { useAppStore } from '@/store/useAppStore';
import { INTENTIONS, REMINDERS, WEEK_METAPHORS } from '@/data/sample';
import { useT, useLang } from '@/i18n';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

const LOCALE_FOR_LANG: Record<string, string> = {
  en: 'en-US',
  tr: 'tr-TR',
};

// Tiny localized mapping for the weekly fruit metaphor. The source data
// ("an avocado") includes an English article; non-English locales want the
// bare noun. Falls back to stripping the article when we don't have a
// translation yet.
const FRUIT_TR: Record<string, string> = {
  'an avocado': 'avokado',
  'a turnip': 'şalgam',
  'a sweet potato': 'tatlı patates',
  'a mango': 'mango',
  'a banana': 'muz',
};

function formatFruit(fruit: string | undefined, lang: string): string {
  const value = fruit || 'a sweet potato';
  if (lang === 'en') return value;
  if (lang === 'tr') return FRUIT_TR[value] || value.replace(/^(a|an)\s+/i, '');
  return value.replace(/^(a|an)\s+/i, '');
}

const reminderIcons = {
  calendar: Icon.calendar,
  heart: Icon.heart,
  spark: Icon.spark,
};

export default function Home() {
  const t = useT();
  const lang = useLang();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const profile = useAppStore((s) => s.profile);
  const recents = useAppStore((s) => s.recents);

  const intention = useMemo(() => INTENTIONS[new Date().getDate() % INTENTIONS.length], []);
  const wd = useMemo(
    () =>
      new Date().toLocaleDateString(LOCALE_FOR_LANG[lang] || 'en-US', {
        weekday: 'long',
      }),
    [lang],
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.base }}>
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 280 }}>
        <Blob variant="cream" />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: insets.top + 8, paddingBottom: insets.bottom + 220 }}
      >
        {/* Header */}
        <View style={{ paddingHorizontal: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 11, letterSpacing: 1.8, textTransform: 'uppercase', color: colors.mute, fontFamily: fonts.bodyBold }}>Marigold</Text>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <Pressable
              onPress={() => router.push('/ask' as any)}
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: 'rgba(255,255,255,0.7)',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: colors.line,
              }}
            >
              <Icon.spark size={18} color={colors.ink} />
            </Pressable>
            <Pressable
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: 'rgba(255,255,255,0.7)',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: colors.line,
              }}
            >
              <Icon.bell size={18} color={colors.ink} />
            </Pressable>
          </View>
        </View>

        {/* Week + day */}
        <View style={{ paddingHorizontal: 24, marginTop: 18, flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <WeekRing week={profile.week} onPress={() => router.push('/baby')} />
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontFamily: fonts.display,
                fontSize: 32,
                lineHeight: 35,
                color: colors.ink,
                letterSpacing: -0.4,
              }}
            >
              {t('home.week')} <CountUp to={profile.week} style={{ fontFamily: fonts.display, fontSize: 32, color: colors.ink }} />, {wd}
            </Text>
            <Pressable
              onPress={() => router.push('/baby')}
              style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 }}
            >
              <Text style={{ color: colors.mute, fontSize: 13, fontFamily: fonts.body }}>
                {t('home.babySize', {
                  fruit: formatFruit(WEEK_METAPHORS[profile.week]?.fruit, lang),
                })}
              </Text>
              <Icon.chevR size={14} color={colors.mute} />
            </Pressable>
          </View>
        </View>

        {/* Today's tools — week-aware shortcuts */}
        <View style={{ marginTop: 24 }}>
          <View style={{ paddingHorizontal: 24, marginBottom: 12 }}>
            <Text style={{ fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase', color: colors.mute, fontFamily: fonts.bodyBold }}>
              {t('tools.title')}
            </Text>
          </View>
          <ToolShortcuts week={profile.week} />
        </View>

        {/* Today's intention */}
        <View style={{ paddingHorizontal: 24, marginTop: 28 }}>
          <Card style={{ padding: 24, overflow: 'hidden' }}>
            <View
              style={{
                position: 'absolute',
                right: -40,
                top: -40,
                width: 176,
                height: 176,
                borderRadius: 88,
                backgroundColor: 'rgba(232,196,184,0.55)',
              }}
            />
            <Text style={{ fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase', color: colors.mute, fontFamily: fonts.bodyBold }}>
              {t('home.intention.caption')}
            </Text>
            <Text
              style={{
                fontFamily: fonts.display,
                fontSize: 24,
                lineHeight: 30,
                color: colors.ink,
                marginTop: 8,
                letterSpacing: -0.2,
              }}
            >
              {intention}
            </Text>
          </Card>
        </View>

        {/* Ask Marigold */}
        <View style={{ paddingHorizontal: 24, marginTop: 20 }}>
          <Pressable onPress={() => router.push('/ask' as any)}>
            <Card style={{ padding: 20, backgroundColor: 'rgba(199,123,92,0.10)', flexDirection: 'row', alignItems: 'center', gap: 14 }}>
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: colors.terracotta,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon.spark size={20} color="#fff" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: fonts.display, fontSize: 18, color: colors.ink, letterSpacing: -0.2 }}>
                  {t('home.askMarigold')}
                </Text>
                <Text style={{ color: colors.mute, fontSize: 13, marginTop: 2, fontFamily: fonts.body }}>
                  {t('home.askMarigold.sub')}
                </Text>
              </View>
              <Icon.chevR size={18} color={colors.mute} />
            </Card>
          </Pressable>
        </View>

        {/* Recent checks */}
        <View style={{ paddingHorizontal: 24, marginTop: 28 }}>
          <SectionHead
            caption={t('home.recent.caption')}
            title={t('home.recent.title')}
            right={
              <Pressable onPress={() => router.navigate('/(tabs)/journal')}>
                <Text style={{ color: colors.mute, fontSize: 13, fontFamily: fonts.body }}>{t('common.all')}</Text>
              </Pressable>
            }
          />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
            {recents.map((r) => (
              <Card key={r.id} style={{ width: 170, padding: 16 }}>
                <Illo label={r.label} hue={r.hue} size={56} />
                <Text style={{ marginTop: 12, fontSize: 15, color: colors.ink, fontFamily: fonts.bodyBold }}>
                  {r.name}
                </Text>
                <View style={{ marginTop: 12 }}>
                  <VerdictPill kind={r.verdict} size="sm" />
                </View>
                <Text style={{ marginTop: 8, fontSize: 11, color: colors.mute, fontFamily: fonts.body }}>{r.when}</Text>
              </Card>
            ))}
          </ScrollView>
        </View>

        {/* Reminders */}
        <View style={{ paddingHorizontal: 24, marginTop: 28 }}>
          <SectionHead caption={t('home.reminders.caption')} title={t('home.reminders.title')} />
          <Card>
            {REMINDERS.map((r, i) => {
              const I = reminderIcons[r.icon];
              return (
                <View key={r.title}>
                  <Pressable
                    onPress={() => router.push({ pathname: '/reminder', params: { title: r.title } })}
                    style={{ padding: 16, flexDirection: 'row', alignItems: 'center', gap: 16 }}
                  >
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: colors.sand,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <I size={20} color={colors.mute} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 15, color: colors.ink, fontFamily: fonts.bodyBold }}>{r.title}</Text>
                      <Text style={{ fontSize: 12.5, color: colors.mute, marginTop: 2, fontFamily: fonts.body }} numberOfLines={1}>
                        {r.sub}
                      </Text>
                    </View>
                    <Icon.chevR size={18} color={colors.mute} />
                  </Pressable>
                  {i < REMINDERS.length - 1 ? (
                    <View style={{ height: 1, backgroundColor: colors.line, marginLeft: 16 }} />
                  ) : null}
                </View>
              );
            })}
          </Card>
        </View>

        {/* Doctor visit nudge */}
        <View style={{ paddingHorizontal: 24, marginTop: 20 }}>
          <Card style={{ padding: 20, backgroundColor: 'rgba(181,168,201,0.18)' }}>
            <Text style={{ fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase', color: colors.mute, fontFamily: fonts.bodyBold }}>
              {t('home.doctor.caption')}
            </Text>
            <Text style={{ fontFamily: fonts.display, fontSize: 20, color: colors.ink, marginTop: 4, letterSpacing: -0.2 }}>
              {t('home.doctor.title')}
            </Text>
            <Text style={{ color: colors.mute, fontSize: 13, marginTop: 4, fontFamily: fonts.body }}>
              {t('home.doctor.body')}
            </Text>
            <Pressable
              onPress={() => router.push('/pdf')}
              style={{ marginTop: 14, flexDirection: 'row', alignItems: 'center', gap: 6 }}
            >
              <Text style={{ color: colors.terracotta, fontSize: 13, fontFamily: fonts.bodyBold }}>{t('home.doctor.action')}</Text>
              <Icon.arrow size={14} color={colors.terracotta} />
            </Pressable>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}
