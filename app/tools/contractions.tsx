// Contraction timer. One big start/stop button; every figure is computed from
// stored timestamps, so backgrounding the app or leaving the screen never
// skews a length or an interval. Intervals are timed start-to-start, the way
// labour frequency is usually measured. A 5-1-1 pattern card and the NHS
// "call now" signs (a contraction over 2 minutes, 6+ in 10 minutes, regular
// contractions before 37 weeks) appear on their own.

import React, { useEffect, useMemo, useState } from 'react';
import { Alert, AppState, Linking, Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Icon } from '@/components/Icon';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Body, Eyebrow, H1, H2, MedicalNote, NavBar, Page, SectionTitle, Surface } from '@/components/ui';
import { useAppStore, type Contraction } from '@/store/useAppStore';
import { daysBetween } from '@/lib/pregnancy';
import { usePregnancy } from '@/lib/usePregnancy';
import { newId } from '@/lib/id';
import { endLiveActivity, updateLiveActivity } from '@/lib/native';
import { useFormat, useT } from '@/i18n';
import { colors, tint } from '@/theme/colors';
import { fonts } from '@/theme/typography';

const SEC = 1000;
const MIN = 60 * SEC;
const HOUR = 60 * MIN;

type Intensity = NonNullable<Contraction['intensity']>;
const INTENSITIES: Intensity[] = [1, 2, 3, 4, 5];

const SOURCES = [
  {
    name: 'NHS: Signs that labour has begun',
    url: 'https://www.nhs.uk/pregnancy/labour-and-birth/signs-of-labour/signs-that-labour-has-begun/',
  },
  { name: 'ACOG: How to tell when labor begins', url: 'https://www.acog.org/womens-health/faqs/how-to-tell-when-labor-begins' },
];

// A contraction in progress survives leaving and re-opening the screen.
let liveStart: number | null = null;

const lengthOf = (c: Contraction) => Math.max(0, c.endedAt - c.startedAt);

function mmss(ms: number): string {
  const s = Math.max(0, Math.floor(ms / SEC));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const ss = String(s % 60).padStart(2, '0');
  return h > 0 ? `${h}:${String(m).padStart(2, '0')}:${ss}` : `${m}:${ss}`;
}

type Analysis = {
  count: number;
  avgLength: number | null;
  avgApart: number | null;
  /** ≈ every 5 min, ≈ 1 min long, for about an hour, and still going. */
  pattern511: boolean;
  /** NHS: a contraction lasting longer than 2 minutes. */
  long: boolean;
  /** NHS: 6 or more contractions in 10 minutes. */
  frequent: boolean;
  /** Under 37 weeks with 4+ contractions in the last hour. */
  preterm: boolean;
};

function analyse(all: Contraction[], now: number, weeks: number | null): Analysis {
  const hour = all
    .filter((c) => c.startedAt >= now - HOUR && c.startedAt <= now)
    .sort((a, b) => a.startedAt - b.startedAt);
  const lengths = hour.map(lengthOf);
  const gaps: number[] = [];
  for (let i = 1; i < hour.length; i++) gaps.push(Math.max(0, hour[i].startedAt - hour[i - 1].startedAt));
  const avg = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : null);
  const avgLength = avg(lengths);
  const avgApart = avg(gaps);

  const last = hour[hour.length - 1];
  const span = hour.length > 1 ? last.startedAt - hour[0].startedAt : 0;
  const pattern511 =
    !!last &&
    now - last.endedAt <= 10 * MIN &&
    span >= 40 * MIN &&
    avgApart != null &&
    avgApart <= 5.5 * MIN &&
    avgLength != null &&
    avgLength >= 45 * SEC;

  let frequent = false;
  for (let i = 0, j = 0; i < hour.length; i++) {
    while (hour[i].startedAt - hour[j].startedAt > 10 * MIN) j++;
    if (i - j + 1 >= 6) {
      frequent = true;
      break;
    }
  }

  return {
    count: hour.length,
    avgLength,
    avgApart,
    pattern511,
    long: lengths.some((l) => l > 2 * MIN),
    frequent,
    preterm: weeks != null && weeks > 0 && weeks < 37 && hour.length >= 4,
  };
}

export default function Contractions() {
  const t = useT();
  const fmt = useFormat();
  const router = useRouter();
  const contractions = useAppStore((s) => s.contractions);
  const addContraction = useAppStore((s) => s.addContraction);
  const removeContraction = useAppStore((s) => s.removeContraction);
  const careName = useAppStore((s) => s.profile.careName);
  const carePhone = useAppStore((s) => s.profile.carePhone);
  const p = usePregnancy();
  const weeks = p ? p.weeks : null;

  const U = (s: string) => s.toLocaleUpperCase(fmt.locale);

  const [activeStart, setActiveState] = useState<number | null>(() => {
    // Nothing lasts half an hour — a start that old was left running by mistake.
    if (liveStart != null && Date.now() - liveStart < 30 * MIN) return liveStart;
    liveStart = null;
    return null;
  });
  const setActive = (v: number | null) => {
    liveStart = v;
    setActiveState(v);
  };

  const [now, setNow] = useState(() => Date.now());
  const sorted = useMemo(() => [...contractions].sort((a, b) => b.startedAt - a.startedAt), [contractions]);
  const last = sorted[0] ?? null;
  const ticking = activeStart != null || (last != null && now - last.startedAt < 3 * HOUR);

  useEffect(() => {
    if (!ticking) return;
    const id = setInterval(() => setNow(Date.now()), SEC);
    return () => clearInterval(id);
  }, [ticking]);
  useEffect(() => {
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active') setNow(Date.now());
    });
    return () => sub.remove();
  }, []);

  const a = useMemo(() => analyse(sorted, now, weeks), [sorted, now, weeks]);
  const urgent = a.long || a.frequent || a.preterm;

  // Mirror the timer on the Lock Screen / Dynamic Island while timing.
  useEffect(() => {
    const apart = a.avgApart != null ? Math.round(a.avgApart / MIN) : null;
    const len = a.avgLength != null ? Math.round(a.avgLength / SEC) : null;
    const subtitle =
      apart != null && len != null ? t('la.con.pattern', { m: apart, s: len }) : t('la.con.tap');
    if (activeStart != null) {
      updateLiveActivity({
        kind: 'contraction',
        active: true,
        since: activeStart,
        count: a.count,
        avgIntervalMin: apart,
        avgDurationSec: len,
        title: t('la.con.active'),
        subtitle,
        countLabel: t('la.con.lastHour'),
      });
    } else if (last && Date.now() - last.endedAt < HOUR) {
      updateLiveActivity({
        kind: 'contraction',
        active: false,
        since: last.endedAt,
        count: a.count,
        avgIntervalMin: apart,
        avgDurationSec: len,
        title: t('la.con.resting'),
        subtitle,
        countLabel: t('la.con.lastHour'),
      });
    } else {
      endLiveActivity('contraction');
    }
  }, [activeStart, last?.id, last?.endedAt, a.count]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggle = () => {
    const ts = Date.now();
    setNow(ts);
    if (activeStart == null) {
      setActive(ts);
      return;
    }
    addContraction({ id: newId(), startedAt: activeStart, endedAt: Math.max(ts, activeStart) });
    setActive(null);
  };

  const discard = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
    setActive(null);
  };

  const canRate = activeStart == null && last != null && now - last.endedAt < 15 * MIN;
  const rate = (n: Intensity) => {
    if (!last) return;
    Haptics.selectionAsync().catch(() => {});
    removeContraction(last.id);
    addContraction({ ...last, intensity: last.intensity === n ? undefined : n });
  };

  const confirmDelete = (c: Contraction) => {
    Alert.alert(t('c.deleteConfirm'), t('c.deleteConfirmBody'), [
      { text: t('c.cancel'), style: 'cancel' },
      {
        text: t('c.delete'),
        style: 'destructive',
        onPress: () => {
          removeContraction(c.id);
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
        },
      },
    ]);
  };

  const callUnit = () => {
    if (!carePhone) return;
    Linking.openURL(`tel:${carePhone.replace(/[^\d+]/g, '')}`).catch(() => {});
  };
  const callLabel = careName ? t('con.call', { name: careName }) : t('con.callUnit');

  const rows = sorted.slice(0, 30);
  const liveMs = activeStart != null ? now - activeStart : 0;
  const sinceLast = activeStart == null && last != null && now - last.startedAt < 2 * HOUR ? now - last.startedAt : null;

  return (
    <Page header={<NavBar caption={U(t('tools.contractions'))} />}>
      <View style={{ paddingHorizontal: 20, paddingTop: 4 }}>
        <H1>{t('con.title')}</H1>
        <Body mute style={{ marginTop: 8 }}>
          {t('con.sub')}
        </Body>
      </View>

      {/* Start / stop */}
      <View
        accessible
        accessibilityRole="button"
        accessibilityLabel={activeStart != null ? t('con.a11y.stop', { time: mmss(liveMs) }) : t('con.a11y.start')}
        onAccessibilityTap={toggle}
        style={{ alignItems: 'center', marginTop: 30 }}
      >
        <PrimaryButton
          label={activeStart != null ? mmss(liveMs) : t('con.start')}
          sublabel={U(activeStart != null ? t('con.stopHint') : t('con.startHint'))}
          bg={activeStart != null ? colors.coral : colors.terracotta}
          size={210}
          onPress={toggle}
        />
      </View>

      <View style={{ alignItems: 'center', marginTop: 16, minHeight: 24 }}>
        {activeStart != null ? (
          <Pressable onPress={discard} accessibilityRole="button" accessibilityLabel={t('con.discard')} hitSlop={10}>
            <Text style={{ fontFamily: fonts.bodyBold, fontSize: 14, color: colors.mute, textDecorationLine: 'underline' }}>
              {t('con.discard')}
            </Text>
          </Pressable>
        ) : sinceLast != null ? (
          <Text style={{ fontFamily: fonts.body, fontSize: 14, color: colors.mute }}>{t('con.sinceLast', { time: mmss(sinceLast) })}</Text>
        ) : null}
      </View>

      {canRate && last ? (
        <Animated.View entering={FadeInDown.duration(280)} style={{ paddingHorizontal: 20, marginTop: 14 }}>
          <Surface>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <Text style={{ fontFamily: fonts.bodyBold, fontSize: 15, color: colors.ink, flex: 1 }}>{t('con.rate')}</Text>
              <Text style={{ fontFamily: fonts.body, fontSize: 12.5, color: colors.faint }}>{t('c.optional')}</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 8, marginTop: 12 }}>
              {INTENSITIES.map((n) => {
                const sel = last.intensity === n;
                return (
                  <Pressable
                    key={n}
                    onPress={() => rate(n)}
                    accessibilityRole="button"
                    accessibilityLabel={t('con.a11y.rate', { n })}
                    accessibilityState={{ selected: sel }}
                    style={({ pressed }) => ({
                      flex: 1,
                      height: 44,
                      borderRadius: 14,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: sel ? colors.coral : colors.surface,
                      borderWidth: 1,
                      borderColor: sel ? colors.coral : colors.line,
                      opacity: pressed ? 0.8 : 1,
                    })}
                  >
                    <Text style={{ fontFamily: fonts.bodyBold, fontSize: 15, color: sel ? '#fff' : colors.ink }}>{n}</Text>
                  </Pressable>
                );
              })}
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 }}>
              <Text style={{ fontFamily: fonts.body, fontSize: 12, color: colors.mute }}>{t('con.rate.mild')}</Text>
              <Text style={{ fontFamily: fonts.body, fontSize: 12, color: colors.mute }}>{t('con.rate.strong')}</Text>
            </View>
          </Surface>
        </Animated.View>
      ) : null}

      {/* Call now — NHS urgent signs */}
      {urgent ? (
        <Animated.View entering={FadeInDown.duration(320)} style={{ paddingHorizontal: 20, marginTop: 14 }}>
          <Surface style={{ backgroundColor: colors.dangerSoft, shadowOpacity: 0 }}>
            <View style={{ flexDirection: 'row', gap: 12, alignItems: 'flex-start' }}>
              <View style={{ width: 40, height: 40, borderRadius: 14, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' }}>
                <Icon.phone size={19} color={colors.danger} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: fonts.bodyBold, fontSize: 16, lineHeight: 21, color: colors.danger }}>{t('con.urgent.title')}</Text>
                {a.long ? <Reason text={t('con.urgent.long')} /> : null}
                {a.frequent ? <Reason text={t('con.urgent.frequent')} /> : null}
                {a.preterm ? <Reason text={t('con.urgent.preterm')} /> : null}
              </View>
            </View>
            <CallButtons
              cta={t('con.cta')}
              onHelp={() => router.push('/emergency')}
              callLabel={carePhone ? callLabel : null}
              onCall={callUnit}
            />
          </Surface>
        </Animated.View>
      ) : a.pattern511 ? (
        <Animated.View entering={FadeInDown.duration(320)} style={{ paddingHorizontal: 20, marginTop: 14 }}>
          <Surface style={{ backgroundColor: colors.marigoldSoft, shadowOpacity: 0 }}>
            <View style={{ flexDirection: 'row', gap: 12, alignItems: 'flex-start' }}>
              <View style={{ width: 40, height: 40, borderRadius: 14, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' }}>
                <Icon.clock size={19} color={tint.amber.fg} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: fonts.bodyBold, fontSize: 16, lineHeight: 21, color: colors.ink }}>{t('con.pattern.title')}</Text>
                <Text style={{ fontFamily: fonts.body, fontSize: 14, lineHeight: 20, color: colors.ink2, marginTop: 4 }}>
                  {t('con.pattern.body')}
                </Text>
              </View>
            </View>
            <CallButtons
              cta={t('con.cta')}
              onHelp={() => router.push('/emergency')}
              callLabel={carePhone ? callLabel : null}
              onCall={callUnit}
            />
          </Surface>
        </Animated.View>
      ) : null}

      {/* Last hour */}
      <View style={{ marginTop: 28 }}>
        <SectionTitle title={t('con.stats.title')} />
        <View style={{ paddingHorizontal: 20, flexDirection: 'row', gap: 10 }}>
          <Stat label={U(t('con.stats.count'))} value={String(a.count)} />
          <Stat label={U(t('con.stats.length'))} value={a.avgLength != null ? mmss(a.avgLength) : '—'} />
          <Stat label={U(t('con.stats.every'))} value={a.avgApart != null ? mmss(a.avgApart) : '—'} />
        </View>
      </View>

      {/* 5-1-1 explainer */}
      <View style={{ paddingHorizontal: 20, marginTop: 14 }}>
        <Surface style={{ backgroundColor: colors.lavenderSoft, shadowOpacity: 0 }}>
          <H2 style={{ fontSize: 19, lineHeight: 25 }}>{t('con.rule.title')}</H2>
          <Body style={{ marginTop: 8 }}>{t('con.rule.body')}</Body>
          <Text style={{ fontFamily: fonts.bodyBold, fontSize: 14.5, lineHeight: 21, color: colors.ink, marginTop: 10 }}>
            {t('con.rule.sooner')}
          </Text>
          <Eyebrow style={{ marginTop: 14, marginBottom: 2 }}>{U(t('c.sources'))}</Eyebrow>
          {SOURCES.map((s) => (
            <SourceLink key={s.url} name={s.name} url={s.url} />
          ))}
        </Surface>
      </View>

      {/* Log */}
      <View style={{ marginTop: 28 }}>
        <SectionTitle title={t('con.recent')} />
        <View style={{ paddingHorizontal: 20 }}>
          {rows.length ? (
            <Surface padded={false}>
              <View style={{ flexDirection: 'row', paddingHorizontal: 16, paddingTop: 14, paddingBottom: 8 }}>
                <Eyebrow style={{ flex: 1.3 }}>{U(t('con.col.time'))}</Eyebrow>
                <Eyebrow style={{ flex: 1 }}>{U(t('con.col.length'))}</Eyebrow>
                <Eyebrow style={{ flex: 1 }}>{U(t('con.col.apart'))}</Eyebrow>
                <View style={{ width: 36 }} />
              </View>
              {rows.map((c, i) => {
                const prev = sorted[i + 1];
                const gap = prev ? c.startedAt - prev.startedAt : null;
                const apart = gap != null && gap >= 0 && gap <= HOUR ? gap : null;
                const diff = daysBetween(new Date(c.startedAt), new Date(now));
                const day = diff === 0 ? null : diff === 1 ? t('c.yesterday') : fmt.short(c.startedAt);
                const time = fmt.time(c.startedAt);
                const length = mmss(lengthOf(c));
                return (
                  <View key={c.id}>
                    <View style={{ height: 1, backgroundColor: colors.line, marginLeft: 16 }} />
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 16, paddingRight: 8, paddingVertical: 10 }}>
                      <View
                        accessible
                        accessibilityLabel={
                          apart != null
                            ? t('con.a11y.row', { time, length, apart: mmss(apart) })
                            : t('con.a11y.rowFirst', { time, length })
                        }
                        style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
                      >
                        <View style={{ flex: 1.3 }}>
                          <Text style={{ fontFamily: fonts.bodyBold, fontSize: 15, color: colors.ink }}>{time}</Text>
                          {day ? <Text style={{ fontFamily: fonts.body, fontSize: 12, color: colors.mute }}>{day}</Text> : null}
                          {c.intensity ? <Dots n={c.intensity} /> : null}
                        </View>
                        <Text style={{ flex: 1, fontFamily: fonts.bodyBold, fontSize: 15, color: lengthOf(c) > 2 * MIN ? colors.danger : colors.ink }}>
                          {length}
                        </Text>
                        <Text style={{ flex: 1, fontFamily: fonts.body, fontSize: 15, color: apart != null ? colors.ink2 : colors.faint }}>
                          {apart != null ? mmss(apart) : '—'}
                        </Text>
                      </View>
                      <Pressable
                        onPress={() => confirmDelete(c)}
                        accessibilityRole="button"
                        accessibilityLabel={t('con.a11y.delete', { time })}
                        hitSlop={8}
                        style={({ pressed }) => ({ width: 36, height: 36, alignItems: 'center', justifyContent: 'center', opacity: pressed ? 0.5 : 1 })}
                      >
                        <Icon.trash size={18} color={colors.faint} />
                      </Pressable>
                    </View>
                  </View>
                );
              })}
            </Surface>
          ) : (
            <Surface style={{ alignItems: 'center', paddingVertical: 26 }}>
              <Icon.timer size={26} color={colors.faint} />
              <Text style={{ fontFamily: fonts.body, fontSize: 14.5, color: colors.mute, marginTop: 8, textAlign: 'center' }}>{t('con.empty')}</Text>
            </Surface>
          )}
          <Text style={{ fontFamily: fonts.body, fontSize: 12.5, lineHeight: 18, color: colors.mute, marginTop: 10, paddingHorizontal: 4 }}>
            {t('con.measure')}
          </Text>
        </View>
      </View>

      <MedicalNote text={t('c.medicalNote')} />
    </Page>
  );
}

function Reason({ text }: { text: string }) {
  return (
    <View style={{ flexDirection: 'row', gap: 8, marginTop: 6 }}>
      <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: colors.danger, marginTop: 8 }} />
      <Text style={{ flex: 1, fontFamily: fonts.body, fontSize: 14, lineHeight: 20, color: colors.ink2 }}>{text}</Text>
    </View>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <Surface style={{ flex: 1, paddingVertical: 14, paddingHorizontal: 10, alignItems: 'center' }}>
      <Text style={{ fontFamily: fonts.display, fontSize: 22, color: colors.ink }}>{value}</Text>
      <Text
        style={{ fontFamily: fonts.bodyBold, fontSize: 10.5, letterSpacing: 0.8, color: colors.mute, marginTop: 4, textAlign: 'center' }}
        numberOfLines={2}
      >
        {label}
      </Text>
    </Surface>
  );
}

function Dots({ n }: { n: number }) {
  return (
    <View style={{ flexDirection: 'row', gap: 3, marginTop: 4 }}>
      {INTENSITIES.map((i) => (
        <View key={i} style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: i <= n ? colors.coral : colors.line }} />
      ))}
    </View>
  );
}

function CallButtons({
  cta,
  onHelp,
  callLabel,
  onCall,
}: {
  cta: string;
  onHelp: () => void;
  callLabel: string | null;
  onCall: () => void;
}) {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 14 }}>
      <Pressable
        onPress={() => {
          Haptics.selectionAsync().catch(() => {});
          onHelp();
        }}
        accessibilityRole="button"
        accessibilityLabel={cta}
        style={({ pressed }) => ({
          height: 44,
          paddingHorizontal: 18,
          borderRadius: 999,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          backgroundColor: colors.danger,
          opacity: pressed ? 0.8 : 1,
        })}
      >
        <Text style={{ fontFamily: fonts.bodyBold, fontSize: 14.5, color: '#fff' }}>{cta}</Text>
        <Icon.chevR size={16} color="#fff" />
      </Pressable>
      {callLabel ? (
        <Pressable
          onPress={() => {
            Haptics.selectionAsync().catch(() => {});
            onCall();
          }}
          accessibilityRole="button"
          accessibilityLabel={callLabel}
          style={({ pressed }) => ({
            height: 44,
            paddingHorizontal: 16,
            borderRadius: 999,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.danger,
            opacity: pressed ? 0.8 : 1,
          })}
        >
          <Icon.phone size={16} color={colors.danger} />
          <Text style={{ fontFamily: fonts.bodyBold, fontSize: 14.5, color: colors.danger }}>{callLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

function SourceLink({ name, url }: { name: string; url: string }) {
  return (
    <Pressable
      onPress={() => Linking.openURL(url).catch(() => {})}
      accessibilityRole="link"
      accessibilityLabel={name}
      style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 6, opacity: pressed ? 0.6 : 1 })}
    >
      <Icon.external size={14} color={colors.terracotta} />
      <Text style={{ flex: 1, fontFamily: fonts.body, fontSize: 13.5, color: colors.terracotta }} numberOfLines={2}>
        {name}
      </Text>
    </Pressable>
  );
}
