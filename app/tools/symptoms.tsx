// Mood & symptoms — a ten-second daily check-in across five axes (mood,
// energy, sleep, nausea, cramps) plus an optional note, and a 14-day dot grid
// for spotting patterns. If mood has been low on 3+ of the last 7 check-ins we
// gently point to support; severe nausea or strong cramps surface a "get it
// checked" nudge straight away.

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Linking, Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Btn } from '@/components/Btn';
import { Icon } from '@/components/Icon';
import { Body, EmojiBadge, Eyebrow, Field, H1, MedicalNote, NavBar, Page, SectionTitle, Surface } from '@/components/ui';
import { useAppStore, type SymptomEntry } from '@/store/useAppStore';
import { addDays, dayKey, parseISODate } from '@/lib/pregnancy';
import { usePregnancy, useToday } from '@/lib/usePregnancy';
import { newId } from '@/lib/id';
import { useFormat, useT } from '@/i18n';
import { colors, tint } from '@/theme/colors';
import { fonts } from '@/theme/typography';

type Axis = 'mood' | 'energy' | 'sleep' | 'nausea' | 'cramps';
type Draft = Pick<SymptomEntry, Axis>;
type Level = { v: number; emoji: string; label: string };
type AxisDef = { key: Axis; label: string; color: string; soft: string; levels: Level[] };

const AXES: AxisDef[] = [
  {
    key: 'mood',
    label: 'mood.axis.mood',
    color: colors.lavender,
    soft: colors.lavenderSoft,
    levels: [
      { v: 1, emoji: '😣', label: 'mood.mood.1' },
      { v: 2, emoji: '😔', label: 'mood.mood.2' },
      { v: 3, emoji: '😐', label: 'mood.mood.3' },
      { v: 4, emoji: '🙂', label: 'mood.mood.4' },
      { v: 5, emoji: '😊', label: 'mood.mood.5' },
    ],
  },
  {
    key: 'energy',
    label: 'mood.axis.energy',
    color: colors.terracotta,
    soft: colors.terracottaSoft,
    levels: [
      { v: 1, emoji: '😩', label: 'mood.energy.1' },
      { v: 2, emoji: '😑', label: 'mood.energy.2' },
      { v: 3, emoji: '🙂', label: 'mood.energy.3' },
      { v: 4, emoji: '😃', label: 'mood.energy.4' },
      { v: 5, emoji: '🤩', label: 'mood.energy.5' },
    ],
  },
  {
    key: 'sleep',
    label: 'mood.axis.sleep',
    color: colors.sage,
    soft: colors.sageSoft,
    levels: [
      { v: 1, emoji: '😫', label: 'mood.sleep.1' },
      { v: 2, emoji: '🥱', label: 'mood.sleep.2' },
      { v: 3, emoji: '😐', label: 'mood.sleep.3' },
      { v: 4, emoji: '😌', label: 'mood.sleep.4' },
      { v: 5, emoji: '😴', label: 'mood.sleep.5' },
    ],
  },
  {
    key: 'nausea',
    label: 'mood.axis.nausea',
    color: colors.coral,
    soft: colors.blush,
    levels: [
      { v: 0, emoji: '😌', label: 'mood.nausea.0' },
      { v: 1, emoji: '😕', label: 'mood.nausea.1' },
      { v: 2, emoji: '🤢', label: 'mood.nausea.2' },
      { v: 3, emoji: '🤮', label: 'mood.nausea.3' },
    ],
  },
  {
    key: 'cramps',
    label: 'mood.axis.cramps',
    color: colors.amber,
    soft: colors.marigoldSoft,
    levels: [
      { v: 0, emoji: '😌', label: 'mood.cramps.0' },
      { v: 1, emoji: '😕', label: 'mood.cramps.1' },
      { v: 2, emoji: '😣', label: 'mood.cramps.2' },
      { v: 3, emoji: '😖', label: 'mood.cramps.3' },
    ],
  },
];

const SRC = {
  nhsDepression: { name: 'NHS: Depression in pregnancy', url: 'https://www.nhs.uk/pregnancy/mental-health-in-pregnancy-and-after-the-birth/depression/' },
  acogDepression: { name: 'ACOG: Depression during pregnancy', url: 'https://www.acog.org/womens-health/faqs/depression-during-pregnancy' },
  nhsVomiting: { name: 'NHS: Severe vomiting in pregnancy', url: 'https://www.nhs.uk/pregnancy/complications/severe-vomiting/' },
  nhsStomachPain: { name: 'NHS: Stomach pain in pregnancy', url: 'https://www.nhs.uk/pregnancy/common-symptoms/stomach-pain/' },
};

const levelOf = (axis: AxisDef, v: number) => axis.levels.find((l) => l.v === v) ?? axis.levels[0];

export default function MoodCheckIn() {
  const t = useT();
  const fmt = useFormat();
  const router = useRouter();
  const symptoms = useAppStore((s) => s.symptoms);
  const addSymptom = useAppStore((s) => s.addSymptom);
  const profileWeek = useAppStore((s) => s.profile.week);
  const p = usePregnancy();
  const todayKey = useToday();

  const U = (s: string) => s.toLocaleUpperCase(fmt.locale);
  const summary = (e: SymptomEntry) => AXES.map((a) => `${t(a.label)}: ${t(levelOf(a, e[a.key]).label)}`).join(', ');

  const todays = useMemo(() => symptoms.find((s) => dayKey(s.at) === todayKey) ?? null, [symptoms, todayKey]);

  const [draft, setDraft] = useState<Draft>(() => ({
    mood: todays?.mood ?? 3,
    energy: todays?.energy ?? 3,
    sleep: todays?.sleep ?? 3,
    nausea: todays?.nausea ?? 0,
    cramps: todays?.cramps ?? 0,
  }));
  const [note, setNote] = useState(todays?.note ?? '');
  const setAxis = (axis: Axis, v: number) => setDraft((d) => ({ ...d, [axis]: v }) as Draft);

  const [justSaved, setJustSaved] = useState(false);
  const savedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (savedTimer.current) clearTimeout(savedTimer.current);
    },
    [],
  );

  const save = () => {
    const entry: SymptomEntry = {
      id: todays?.id ?? newId(),
      at: Date.now(),
      week: p?.weeks ?? profileWeek ?? 0,
      ...draft,
      note: note.trim() || undefined,
    };
    addSymptom(entry);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    setJustSaved(true);
    if (savedTimer.current) clearTimeout(savedTimer.current);
    savedTimer.current = setTimeout(() => setJustSaved(false), 2500);
  };

  // Low mood on 3+ of the last 7 check-ins → gentle support card.
  const lowMood = useMemo(
    () =>
      [...symptoms]
        .sort((a, b) => b.at - a.at)
        .slice(0, 7)
        .filter((s) => s.mood <= 2).length >= 3,
    [symptoms],
  );

  // 14-day grid
  const days = useMemo(() => {
    const end = parseISODate(todayKey);
    return Array.from({ length: 14 }, (_, i) => addDays(end, i - 13));
  }, [todayKey]);
  const byDay = useMemo(() => {
    const m = new Map<string, SymptomEntry>();
    for (const s of symptoms) {
      const k = dayKey(s.at);
      const cur = m.get(k);
      if (!cur || cur.at < s.at) m.set(k, s);
    }
    return m;
  }, [symptoms]);
  const [selDay, setSelDay] = useState<string | null>(null);
  const selEntry = selDay ? byDay.get(selDay) ?? null : null;

  const severe = draft.nausea === 3 || draft.cramps === 3;

  return (
    <Page header={<NavBar caption={U(t('tools.mood'))} />} automaticallyAdjustKeyboardInsets keyboardDismissMode="interactive">
      <View style={{ paddingHorizontal: 20, paddingTop: 4 }}>
        <H1>{t('mood.title')}</H1>
        <Body mute style={{ marginTop: 8 }}>
          {t('mood.sub')}
        </Body>
      </View>

      {lowMood ? (
        <Animated.View entering={FadeInDown.duration(320)} style={{ paddingHorizontal: 20, marginTop: 18 }}>
          <Surface style={{ backgroundColor: colors.lavenderSoft, shadowOpacity: 0 }}>
            <View style={{ flexDirection: 'row', gap: 12, alignItems: 'flex-start' }}>
              <EmojiBadge emoji="💜" size={44} bg={colors.surface} />
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: fonts.bodyBold, fontSize: 16, lineHeight: 21, color: colors.ink }}>{t('mood.low.title')}</Text>
                <Text style={{ fontFamily: fonts.body, fontSize: 14, lineHeight: 20, color: colors.ink2, marginTop: 4 }}>{t('mood.low.body')}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 14 }}>
              <PillButton label={t('mood.low.support')} color={tint.lavender.fg} filled onPress={() => router.push('/emergency')} />
              <PillButton label={t('mood.low.breathe')} color={tint.lavender.fg} onPress={() => router.push('/tools/breathing')} />
            </View>
            <Text style={{ fontFamily: fonts.bodyBold, fontSize: 13, lineHeight: 18, color: colors.ink2, marginTop: 12 }}>{t('mood.low.crisis')}</Text>
            <View style={{ marginTop: 8 }}>
              <SourceLink {...SRC.nhsDepression} />
              <SourceLink {...SRC.acogDepression} />
            </View>
          </Surface>
        </Animated.View>
      ) : null}

      {/* Check-in */}
      <View style={{ paddingHorizontal: 20, marginTop: 18 }}>
        <Surface>
          {AXES.map((a, idx) => {
            const cur = draft[a.key];
            return (
              <View key={a.key} style={{ marginTop: idx ? 20 : 0 }}>
                <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }}>
                  <Eyebrow>{U(t(a.label))}</Eyebrow>
                  <Text style={{ fontFamily: fonts.bodyBold, fontSize: 14, color: colors.ink }}>{t(levelOf(a, cur).label)}</Text>
                </View>
                <View accessibilityRole="radiogroup" accessibilityLabel={t(a.label)} style={{ flexDirection: 'row', gap: 8, marginTop: 10 }}>
                  {a.levels.map((l) => {
                    const sel = l.v === cur;
                    return (
                      <Pressable
                        key={l.v}
                        onPress={() => {
                          Haptics.selectionAsync().catch(() => {});
                          setAxis(a.key, l.v);
                        }}
                        accessibilityRole="radio"
                        accessibilityState={{ checked: sel }}
                        accessibilityLabel={`${t(a.label)}: ${t(l.label)}`}
                        style={({ pressed }) => ({
                          flex: 1,
                          height: 52,
                          borderRadius: 16,
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: sel ? a.soft : colors.surface,
                          borderWidth: sel ? 2 : 1,
                          borderColor: sel ? a.color : colors.line,
                          opacity: pressed ? 0.8 : 1,
                        })}
                      >
                        <Text style={{ fontSize: 24, lineHeight: 30, opacity: sel ? 1 : 0.55 }} allowFontScaling={false}>
                          {l.emoji}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            );
          })}

          <Field
            label={U(t('mood.note'))}
            value={note}
            onChangeText={setNote}
            placeholder={t('mood.notePh')}
            accessibilityLabel={t('mood.note')}
            multiline
            maxLength={500}
            containerStyle={{ marginTop: 22 }}
            style={{ minHeight: 92, textAlignVertical: 'top', backgroundColor: colors.base }}
          />

          {todays && !justSaved ? (
            <Text style={{ fontFamily: fonts.body, fontSize: 13, color: colors.mute, marginTop: 14 }}>
              {t('mood.savedAt', { time: fmt.time(todays.at) })}
            </Text>
          ) : null}
          {justSaved ? (
            <Animated.Text entering={FadeIn.duration(200)} style={{ fontFamily: fonts.bodyBold, fontSize: 13.5, color: tint.sage.fg, marginTop: 14 }}>
              {t('mood.saved')}
            </Animated.Text>
          ) : null}
          <Btn onPress={save} style={{ marginTop: 12 }}>
            {todays ? t('mood.update') : t('mood.save')}
          </Btn>
        </Surface>
      </View>

      {severe ? (
        <Animated.View entering={FadeInDown.duration(280)} style={{ paddingHorizontal: 20, marginTop: 14 }}>
          <Surface style={{ backgroundColor: colors.dangerSoft, shadowOpacity: 0 }}>
            {draft.cramps === 3 ? (
              <Text style={{ fontFamily: fonts.bodyBold, fontSize: 14.5, lineHeight: 21, color: colors.ink }}>{t('mood.severe.cramps')}</Text>
            ) : null}
            {draft.nausea === 3 ? (
              <Text style={{ fontFamily: fonts.bodyBold, fontSize: 14.5, lineHeight: 21, color: colors.ink, marginTop: draft.cramps === 3 ? 8 : 0 }}>
                {t('mood.severe.nausea')}
              </Text>
            ) : null}
            <View style={{ flexDirection: 'row', marginTop: 12 }}>
              <PillButton label={t('mood.severe.cta')} color={colors.danger} filled onPress={() => router.push('/emergency')} />
            </View>
            <View style={{ marginTop: 8 }}>
              {draft.cramps === 3 ? <SourceLink {...SRC.nhsStomachPain} /> : null}
              {draft.nausea === 3 ? <SourceLink {...SRC.nhsVomiting} /> : null}
            </View>
          </Surface>
        </Animated.View>
      ) : null}

      {/* Last 14 days */}
      <View style={{ marginTop: 28 }}>
        <SectionTitle title={t('mood.trend')} />
        <View style={{ paddingHorizontal: 20 }}>
          <Surface>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: 66, paddingTop: 24 }}>
                {AXES.map((a) => (
                  <Text
                    key={a.key}
                    numberOfLines={1}
                    style={{ height: 22, lineHeight: 22, fontFamily: fonts.bodyBold, fontSize: 11.5, color: colors.ink2 }}
                  >
                    {t(a.label)}
                  </Text>
                ))}
              </View>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                {days.map((d) => {
                  const k = dayKey(d);
                  const e = byDay.get(k) ?? null;
                  const sel = selDay === k;
                  const isToday = k === todayKey;
                  return (
                    <Pressable
                      key={k}
                      onPress={() => {
                        Haptics.selectionAsync().catch(() => {});
                        setSelDay(sel ? null : k);
                      }}
                      accessibilityRole="button"
                      accessibilityState={{ selected: sel }}
                      accessibilityLabel={t('mood.a11y.day', { date: fmt.date(d, { weekday: 'long', day: 'numeric', month: 'long' }), summary: e ? summary(e) : t('mood.noEntry') })}
                      style={{ flex: 1, alignItems: 'center', borderRadius: 10, paddingBottom: 4, backgroundColor: sel ? colors.sand : 'transparent' }}
                    >
                      <Text
                        style={{
                          height: 24,
                          lineHeight: 24,
                          fontSize: 10.5,
                          fontFamily: isToday ? fonts.bodyBold : fonts.body,
                          color: isToday ? colors.terracotta : colors.faint,
                        }}
                      >
                        {d.toLocaleDateString(fmt.locale, { weekday: 'narrow' }).charAt(0)}
                      </Text>
                      {AXES.map((a) => {
                        const v = e ? e[a.key] : null;
                        const lo = a.levels[0].v;
                        const hi = a.levels[a.levels.length - 1].v;
                        const ratio = v == null ? 0 : (v - lo + 1) / (hi - lo + 1);
                        return (
                          <View key={a.key} style={{ height: 22, justifyContent: 'center' }}>
                            <View
                              style={{
                                width: 12,
                                height: 12,
                                borderRadius: 6,
                                backgroundColor: v == null ? 'transparent' : a.color,
                                opacity: v == null ? 1 : 0.2 + 0.8 * ratio,
                                borderWidth: v == null ? 1 : 0,
                                borderColor: colors.line,
                              }}
                            />
                          </View>
                        );
                      })}
                    </Pressable>
                  );
                })}
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, paddingLeft: 66 }}>
              <Text style={{ fontFamily: fonts.body, fontSize: 11.5, color: colors.mute }}>{fmt.short(days[0])}</Text>
              <Text style={{ fontFamily: fonts.body, fontSize: 11.5, color: colors.mute }}>{t('c.today')}</Text>
            </View>

            {selDay ? (
              <Animated.View entering={FadeIn.duration(200)} style={{ marginTop: 14, padding: 14, borderRadius: 16, backgroundColor: colors.base }}>
                <Text style={{ fontFamily: fonts.bodyBold, fontSize: 14, color: colors.ink }}>
                  {fmt.date(parseISODate(selDay), { weekday: 'long', day: 'numeric', month: 'long' })}
                </Text>
                {selEntry ? (
                  <>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
                      {AXES.map((a) => {
                        const l = levelOf(a, selEntry[a.key]);
                        return (
                          <View key={a.key} style={{ flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999, backgroundColor: a.soft }}>
                            <Text style={{ fontSize: 13 }}>{l.emoji}</Text>
                            <Text style={{ fontFamily: fonts.bodyBold, fontSize: 12.5, color: colors.ink }}>
                              {t(a.label)}: {t(l.label)}
                            </Text>
                          </View>
                        );
                      })}
                    </View>
                    {selEntry.note ? (
                      <Text style={{ fontFamily: fonts.body, fontSize: 14, lineHeight: 20, color: colors.ink2, marginTop: 10 }}>{selEntry.note}</Text>
                    ) : null}
                  </>
                ) : (
                  <Text style={{ fontFamily: fonts.body, fontSize: 14, color: colors.mute, marginTop: 6 }}>{t('mood.noEntry')}</Text>
                )}
              </Animated.View>
            ) : null}

            <Text style={{ fontFamily: fonts.body, fontSize: 12.5, lineHeight: 18, color: colors.mute, marginTop: 12 }}>{t('mood.trendHint')}</Text>
          </Surface>
        </View>
      </View>

      <MedicalNote text={t('c.medicalNote')} />
    </Page>
  );
}

function PillButton({ label, onPress, color, filled }: { label: string; onPress: () => void; color: string; filled?: boolean }) {
  return (
    <Pressable
      onPress={() => {
        Haptics.selectionAsync().catch(() => {});
        onPress();
      }}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => ({
        height: 44,
        paddingHorizontal: 18,
        borderRadius: 999,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: filled ? color : colors.surface,
        borderWidth: filled ? 0 : 1,
        borderColor: color,
        opacity: pressed ? 0.8 : 1,
      })}
    >
      <Text style={{ fontFamily: fonts.bodyBold, fontSize: 14.5, color: filled ? '#fff' : color }}>{label}</Text>
      <Icon.chevR size={16} color={filled ? '#fff' : color} />
    </Pressable>
  );
}

function SourceLink({ name, url }: { name: string; url: string }) {
  return (
    <Pressable
      onPress={() => Linking.openURL(url).catch(() => {})}
      accessibilityRole="link"
      accessibilityLabel={name}
      style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 5, opacity: pressed ? 0.6 : 1 })}
    >
      <Icon.external size={14} color={colors.terracotta} />
      <Text style={{ flex: 1, fontFamily: fonts.body, fontSize: 13, color: colors.terracotta }} numberOfLines={2}>
        {name}
      </Text>
    </Pressable>
  );
}
