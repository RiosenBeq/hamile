// Appointments — upcoming and past visits grouped by month, with the date at a
// glance, where and when, and how many questions are still to ask.

import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Btn } from '@/components/Btn';
import { Icon } from '@/components/Icon';
import { Body, EmojiBadge, EmptyState, Eyebrow, H1, NavBar, Segmented, shadow, type TintKey } from '@/components/ui';
import { useAppStore, type Appointment } from '@/store/useAppStore';
import { daysBetween } from '@/lib/pregnancy';
import { useFormat, useT } from '@/i18n';
import { colors, tint } from '@/theme/colors';
import { fonts } from '@/theme/typography';

type Kind = Appointment['kind'];
type Tab = 'upcoming' | 'past';
type Row = { type: 'month'; key: string; label: string } | { type: 'appt'; key: string; appt: Appointment };

const KIND_STYLE: Record<Kind, { emoji: string; hue: TintKey }> = {
  checkup: { emoji: '🩺', hue: 'rose' },
  scan: { emoji: '🖥️', hue: 'lavender' },
  test: { emoji: '🧪', hue: 'sky' },
  class: { emoji: '🎓', hue: 'amber' },
  other: { emoji: '📌', hue: 'sand' },
};

/** A visit stays "upcoming" for an hour after it starts (same rule as Today). */
const UPCOMING_GRACE_MS = 60 * 60 * 1000;

export default function Appointments() {
  const t = useT();
  const fmt = useFormat();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const appointments = useAppStore((s) => s.appointments);
  const [tab, setTab] = useState<Tab>('upcoming');
  const [now, setNow] = useState(() => Date.now());
  const locale = fmt.locale;

  // Re-split upcoming/past whenever the screen comes back into view.
  useFocusEffect(
    useCallback(() => {
      setNow(Date.now());
    }, []),
  );

  const { upcoming, past } = useMemo(() => {
    const cutoff = now - UPCOMING_GRACE_MS;
    return {
      upcoming: appointments.filter((a) => a.at >= cutoff).sort((a, b) => a.at - b.at),
      past: appointments.filter((a) => a.at < cutoff).sort((a, b) => b.at - a.at),
    };
  }, [appointments, now]);

  const list = tab === 'upcoming' ? upcoming : past;

  const rows = useMemo(() => {
    const out: Row[] = [];
    let month = '';
    for (const a of list) {
      const d = new Date(a.at);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      if (key !== month) {
        month = key;
        out.push({
          type: 'month',
          key: `m-${key}`,
          label: d.toLocaleDateString(locale, { month: 'long', year: 'numeric' }).toLocaleUpperCase(locale),
        });
      }
      out.push({ type: 'appt', key: a.id, appt: a });
    }
    return out;
  }, [list, locale]);

  const add = () => router.push('/appointments/edit');
  const openAppt = (a: Appointment) => router.push({ pathname: '/appointments/edit', params: { id: a.id } });

  const tabLabel = (key: string, n: number) => (n ? `${t(key)} · ${n}` : t(key));

  const renderItem = ({ item }: { item: Row }) => {
    if (item.type === 'month') {
      return <Eyebrow style={{ paddingHorizontal: 24, marginTop: 20, marginBottom: 10 }}>{item.label}</Eyebrow>;
    }
    const a = item.appt;
    const isPast = tab === 'past';
    const d = new Date(a.at);
    const style = KIND_STYLE[a.kind] ?? KIND_STYLE.other;
    const questions = a.questions ?? [];
    const toAsk = questions.filter((q) => !q.done).length;
    const inDays = daysBetween(new Date(now), d);
    const soon = isPast ? null : inDays === 0 ? t('c.today') : inDays === 1 ? t('c.tomorrow') : null;
    const meta = [fmt.weekday(a.at), fmt.time(a.at), a.location].filter(Boolean).join(' · ');
    const questionsLabel = !questions.length
      ? null
      : toAsk === 0
        ? t('appt.allAsked')
        : toAsk === 1
          ? t('appt.questionsCountOne')
          : t('appt.questionsCount', { n: toAsk });

    return (
      <View style={{ paddingHorizontal: 20, marginBottom: 10 }}>
        <Pressable
          onPress={() => openAppt(a)}
          accessibilityRole="button"
          accessibilityLabel={[a.title, fmt.date(a.at, { weekday: 'long', day: 'numeric', month: 'long' }), fmt.time(a.at), a.location, questionsLabel]
            .filter(Boolean)
            .join(', ')}
          style={({ pressed }) => ({
            flexDirection: 'row',
            alignItems: 'center',
            gap: 14,
            padding: 14,
            borderRadius: 22,
            backgroundColor: colors.surface,
            ...shadow.card,
            transform: [{ scale: pressed ? 0.985 : 1 }],
          })}
        >
          <View style={{ width: 58, borderRadius: 16, paddingVertical: 8, alignItems: 'center', backgroundColor: isPast ? colors.sand : colors.terracottaSoft }}>
            <Text style={{ fontFamily: fonts.bodyBold, fontSize: 11, letterSpacing: 0.6, color: isPast ? colors.mute : colors.terracotta }}>
              {d.toLocaleDateString(locale, { month: 'short' }).toLocaleUpperCase(locale)}
            </Text>
            <Text style={{ fontFamily: fonts.display, fontSize: 26, lineHeight: 31, color: isPast ? colors.ink2 : colors.ink }}>{d.getDate()}</Text>
          </View>

          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Text style={{ flexShrink: 1, fontFamily: fonts.bodyBold, fontSize: 16, color: isPast ? colors.ink2 : colors.ink }} numberOfLines={1}>
                {a.title}
              </Text>
              {soon ? (
                <View style={{ borderRadius: 999, paddingHorizontal: 8, paddingVertical: 2, backgroundColor: colors.terracotta }}>
                  <Text style={{ fontFamily: fonts.bodyBold, fontSize: 11, color: '#fff' }}>{soon}</Text>
                </View>
              ) : null}
            </View>
            <Text style={{ fontFamily: fonts.body, fontSize: 13.5, color: colors.mute, marginTop: 3 }} numberOfLines={1}>
              {meta}
            </Text>
            {questionsLabel ? (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 5 }}>
                {toAsk === 0 ? <Icon.check size={14} color={colors.sage} /> : <Icon.help size={14} color={colors.terracotta} />}
                <Text style={{ fontFamily: fonts.bodyBold, fontSize: 12.5, color: toAsk === 0 ? colors.sage : colors.terracotta }}>{questionsLabel}</Text>
              </View>
            ) : null}
          </View>

          <EmojiBadge emoji={style.emoji} size={42} bg={tint[style.hue].bg} />
        </Pressable>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.base }}>
      <NavBar />
      <FlatList
        data={rows}
        keyExtractor={(r) => r.key}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 110 }}
        ListHeaderComponent={
          <View style={{ paddingHorizontal: 20, paddingTop: 4 }}>
            <H1>{t('appt.title')}</H1>
            <Body mute style={{ marginTop: 6 }}>
              {t('appt.sub')}
            </Body>
            <Segmented
              options={[
                { value: 'upcoming', label: tabLabel('appt.upcoming', upcoming.length) },
                { value: 'past', label: tabLabel('appt.past', past.length) },
              ]}
              value={tab}
              onChange={setTab}
              style={{ marginTop: 18, marginBottom: 4 }}
            />
          </View>
        }
        ListEmptyComponent={
          tab === 'upcoming' ? (
            <EmptyState emoji="🩺" title={t('appt.empty.upcoming')} body={t('appt.empty.upcomingBody')} />
          ) : (
            <EmptyState emoji="📋" title={t('appt.empty.past')} body={t('appt.empty.pastBody')} />
          )
        }
      />

      <View
        pointerEvents="box-none"
        style={{ position: 'absolute', left: 0, right: 0, bottom: 0, paddingHorizontal: 20, paddingTop: 28, paddingBottom: Math.max(insets.bottom, 16) }}
      >
        <LinearGradient
          pointerEvents="none"
          colors={['rgba(251,246,240,0)', colors.base]}
          locations={[0, 0.45]}
          style={StyleSheet.absoluteFill}
        />
        <Btn onPress={add}>
          <Icon.plus size={20} color="#fff" />
          <Text style={{ color: '#fff', fontFamily: fonts.bodyBold, fontSize: 16 }}>{t('appt.add')}</Text>
        </Btn>
      </View>
    </View>
  );
}
