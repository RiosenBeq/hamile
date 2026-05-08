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
import { ScanFAB } from '@/components/ScanFAB';
import { useAppStore } from '@/store/useAppStore';
import { INTENTIONS, REMINDERS } from '@/data/sample';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

const reminderIcons = {
  calendar: Icon.calendar,
  heart: Icon.heart,
  spark: Icon.spark,
};

export default function Home() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const profile = useAppStore((s) => s.profile);
  const recents = useAppStore((s) => s.recents);

  const intention = useMemo(() => INTENTIONS[new Date().getDate() % INTENTIONS.length], []);
  const wd = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <View style={{ flex: 1, backgroundColor: colors.base }}>
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 280 }}>
        <Blob variant="cream" />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: insets.top + 8, paddingBottom: 200 }}
      >
        {/* Header */}
        <View style={{ paddingHorizontal: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 11, letterSpacing: 1.8, textTransform: 'uppercase', color: colors.mute, fontFamily: fonts.bodyBold }}>Marigold</Text>
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
              Week <CountUp to={profile.week} style={{ fontFamily: fonts.display, fontSize: 32, color: colors.ink }} />, {wd}
            </Text>
            <Pressable
              onPress={() => router.push('/baby')}
              style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 }}
            >
              <Text style={{ color: colors.mute, fontSize: 13, fontFamily: fonts.body }}>Baby is the size of a sweet potato</Text>
              <Icon.chevR size={14} color={colors.mute} />
            </Pressable>
          </View>
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
              Today's intention
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

        {/* Recent checks */}
        <View style={{ paddingHorizontal: 24, marginTop: 28 }}>
          <SectionHead
            caption="Recent"
            title="Recent checks"
            right={
              <Pressable onPress={() => router.navigate('/(tabs)/journal')}>
                <Text style={{ color: colors.mute, fontSize: 13, fontFamily: fonts.body }}>All</Text>
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
          <SectionHead caption="Up next" title="This week's reminders" />
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
              In 2 days
            </Text>
            <Text style={{ fontFamily: fonts.display, fontSize: 20, color: colors.ink, marginTop: 4, letterSpacing: -0.2 }}>
              Doctor visit on Thursday
            </Text>
            <Text style={{ color: colors.mute, fontSize: 13, marginTop: 4, fontFamily: fonts.body }}>
              Tap to draft questions to bring along.
            </Text>
            <Pressable
              onPress={() => router.push('/pdf')}
              style={{ marginTop: 14, flexDirection: 'row', alignItems: 'center', gap: 6 }}
            >
              <Text style={{ color: colors.terracotta, fontSize: 13, fontFamily: fonts.bodyBold }}>Prepare a summary</Text>
              <Icon.arrow size={14} color={colors.terracotta} />
            </Pressable>
          </Card>
        </View>
      </ScrollView>

      <ScanFAB onScan={() => router.push('/scan')} onLongPress={() => router.push('/emergency')} />
    </View>
  );
}
