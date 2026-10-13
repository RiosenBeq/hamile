// Pelvic floor (Kegel) trainer — guided squeeze / relax sets around a circle
// that grows and softens with each phase, three levels, a weekly tally and a
// plain-language how-to with sources.

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AccessibilityInfo, AppState, Linking, Pressable, Text, View, useWindowDimensions } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  FadeIn,
  interpolateColor,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Icon } from '@/components/Icon';
import { Body, EmojiBadge, Eyebrow, H1, H2, IconBadge, MedicalNote, NavBar, Page, Segmented, Surface } from '@/components/ui';
import { useAppStore } from '@/store/useAppStore';
import { newId } from '@/lib/id';
import { addDays, parseISODate } from '@/lib/pregnancy';
import { useToday } from '@/lib/usePregnancy';
import { useT } from '@/i18n';
import { colors, tint } from '@/theme/colors';
import { fonts } from '@/theme/typography';

type LevelKey = 'gentle' | 'standard' | 'strong';
type Level = { reps: number; hold: number; rest: number };

const LEVELS: Record<LevelKey, Level> = {
  gentle: { reps: 5, hold: 3, rest: 3 },
  standard: { reps: 10, hold: 5, rest: 5 },
  strong: { reps: 10, hold: 10, rest: 5 },
};
const LEVEL_KEYS: LevelKey[] = ['gentle', 'standard', 'strong'];
const READY_SECS = 3;
const SETS_PER_DAY = 3;
/** Circle "breath" between sets: 0 = fully relaxed (small), 1 = squeezed (full). */
const AT_REST = 0.5;

const SOURCES = [
  { label: 'kegel.source1', url: 'https://www.nhs.uk/conditions/urinary-incontinence/10-ways-to-stop-leaks/' },
  { label: 'kegel.source2', url: 'https://www.nhs.uk/pregnancy/common-symptoms/common-health-problems/' },
];
const HOW_TO = ['kegel.how1', 'kegel.how2', 'kegel.how3', 'kegel.how4'];

type Phase = 'ready' | 'squeeze' | 'relax';
type Seg = { phase: Phase; rep: number; start: number; dur: number };
type Status = 'idle' | 'running' | 'paused' | 'done';

/** The whole set as a timeline of seconds: a short "get ready", then squeeze/relax pairs. */
function buildPlan(l: Level): { segs: Seg[]; total: number } {
  const segs: Seg[] = [{ phase: 'ready', rep: 0, start: 0, dur: READY_SECS }];
  let at = READY_SECS;
  for (let rep = 1; rep <= l.reps; rep++) {
    segs.push({ phase: 'squeeze', rep, start: at, dur: l.hold });
    at += l.hold;
    segs.push({ phase: 'relax', rep, start: at, dur: l.rest });
    at += l.rest;
  }
  return { segs, total: at };
}

function segIndexAt(segs: Seg[], sec: number): number {
  for (let i = segs.length - 1; i >= 0; i--) if (sec >= segs[i].start) return i;
  return 0;
}

export default function Kegel() {
  const t = useT();
  const today = useToday();
  const reduce = useReducedMotion();
  const { width } = useWindowDimensions();
  const sessions = useAppStore((s) => s.kegel);
  const addKegel = useAppStore((s) => s.addKegel);

  const [levelKey, setLevelKey] = useState<LevelKey>('standard');
  const level = LEVELS[levelKey];
  const plan = useMemo(() => buildPlan(level), [level]);
  const [status, setStatus] = useState<Status>('idle');
  const [sec, setSec] = useState(0);

  const live = useRef(false); // true only while the clock should run
  const banked = useRef(0); // ms completed before the current run (pauses)
  const runStart = useRef(0); // Date.now() when the current run began
  const lastSeg = useRef(-1);
  const squeeze = useSharedValue(AT_REST); // 0 relaxed … 1 squeezed

  const animateTo = useCallback(
    (phase: Phase, ms: number) => {
      squeeze.value = withTiming(phase === 'squeeze' ? 1 : 0, {
        duration: Math.max(0, phase === 'ready' ? 400 : ms),
        easing: Easing.inOut(Easing.quad),
      });
    },
    [squeeze],
  );

  // Timestamp-based clock (10 Hz) so pausing and resuming never drifts.
  useEffect(() => {
    if (status !== 'running') return;
    const tick = () => {
      if (!live.current) return;
      const ms = banked.current + Date.now() - runStart.current;
      if (ms >= plan.total * 1000) {
        live.current = false;
        banked.current = 0;
        lastSeg.current = -1;
        setSec(plan.total);
        setStatus('done');
        squeeze.value = withTiming(AT_REST, { duration: 700 });
        addKegel({ id: newId(), at: Date.now(), reps: level.reps, seconds: plan.total - READY_SECS });
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
        AccessibilityInfo.announceForAccessibility(t('kegel.doneTitle'));
        return;
      }
      const idx = segIndexAt(plan.segs, ms / 1000);
      if (idx !== lastSeg.current) {
        lastSeg.current = idx;
        const seg = plan.segs[idx];
        animateTo(seg.phase, (seg.start + seg.dur) * 1000 - ms);
        Haptics.impactAsync(
          seg.phase === 'squeeze' ? Haptics.ImpactFeedbackStyle.Medium : Haptics.ImpactFeedbackStyle.Light,
        ).catch(() => {});
        AccessibilityInfo.announceForAccessibility(t(`kegel.phase.${seg.phase}`));
      }
      setSec(Math.floor(ms / 1000));
    };
    tick();
    const id = setInterval(tick, 100);
    return () => clearInterval(id);
  }, [status, plan, level.reps, addKegel, animateTo, squeeze, t]);

  const pause = useCallback(() => {
    if (!live.current) return;
    live.current = false;
    banked.current += Date.now() - runStart.current;
    cancelAnimation(squeeze);
    setStatus('paused');
  }, [squeeze]);

  // Leaving the app mid-set pauses it rather than racing ahead.
  useEffect(() => {
    if (status !== 'running') return;
    const sub = AppState.addEventListener('change', (s) => {
      if (s !== 'active') pause();
    });
    return () => sub.remove();
  }, [status, pause]);

  const start = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    banked.current = 0;
    lastSeg.current = -1;
    runStart.current = Date.now();
    live.current = true;
    setSec(0);
    setStatus('running');
  };

  const resume = () => {
    Haptics.selectionAsync().catch(() => {});
    const seg = plan.segs[segIndexAt(plan.segs, banked.current / 1000)];
    animateTo(seg.phase, (seg.start + seg.dur) * 1000 - banked.current);
    runStart.current = Date.now();
    live.current = true;
    setStatus('running');
  };

  const stop = () => {
    Haptics.selectionAsync().catch(() => {});
    live.current = false;
    banked.current = 0;
    lastSeg.current = -1;
    cancelAnimation(squeeze);
    squeeze.value = withTiming(AT_REST, { duration: 400 });
    setSec(0);
    setStatus('idle');
  };

  const { weekCount, todayCount } = useMemo(() => {
    const dayStart = parseISODate(today).getTime();
    const weekStart = addDays(parseISODate(today), -6).getTime();
    return {
      weekCount: sessions.filter((k) => k.at >= weekStart).length,
      todayCount: sessions.filter((k) => k.at >= dayStart).length,
    };
  }, [sessions, today]);

  const active = status === 'running' || status === 'paused';
  const seg = active ? plan.segs[segIndexAt(plan.segs, sec)] : null;
  const left = seg ? Math.max(1, seg.start + seg.dur - sec) : 0;
  const repsDone =
    status === 'done' ? level.reps : seg ? (seg.phase === 'relax' ? seg.rep : Math.max(0, seg.rep - 1)) : 0;
  const minutes = Math.max(1, Math.round((level.reps * (level.hold + level.rest)) / 60));
  const weekText = weekCount === 1 ? t('kegel.weekOne') : t('kegel.weekMany', { n: weekCount });

  const D = Math.min(250, width - 110);
  const circleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: reduce ? 1 : 0.64 + 0.36 * squeeze.value }],
    backgroundColor: interpolateColor(squeeze.value, [0, 1], ['#E4EEE3', '#AFC8B2']),
  }));

  const circleLabel =
    status === 'idle'
      ? t('kegel.readyWhenYouAre')
      : status === 'done'
        ? t('kegel.doneTitle')
        : seg
          ? t(`kegel.phase.${seg.phase}`)
          : '';

  return (
    <Page header={<NavBar caption={t('tools.kegel')} />}>
      <View style={{ paddingHorizontal: 20, paddingTop: 4 }}>
        <H1>{t('kegel.title')}</H1>
        <Body mute style={{ marginTop: 8 }}>
          {t('kegel.intro')}
        </Body>
      </View>

      {/* Level */}
      <View
        pointerEvents={active ? 'none' : 'auto'}
        accessibilityElementsHidden={active}
        importantForAccessibility={active ? 'no-hide-descendants' : 'auto'}
        style={{ paddingHorizontal: 20, marginTop: 18, opacity: active ? 0.5 : 1 }}
      >
        <Segmented
          options={LEVEL_KEYS.map((k) => ({ value: k, label: t(`kegel.level.${k}`) }))}
          value={levelKey}
          onChange={(v) => {
            if (active) return;
            setLevelKey(v);
            if (status === 'done') setStatus('idle');
          }}
        />
        <Text style={{ fontFamily: fonts.body, fontSize: 13.5, color: colors.mute, textAlign: 'center', marginTop: 10 }}>
          {t('kegel.levelDesc', { reps: level.reps, hold: level.hold, rest: level.rest, min: minutes })}
        </Text>
      </View>

      {/* Trainer */}
      <View style={{ alignItems: 'center', marginTop: 22 }}>
        <View style={{ width: D, height: D, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ position: 'absolute', width: D, height: D, borderRadius: D / 2, borderWidth: 2, borderColor: '#D5E3D6' }} />
          <Animated.View style={[{ position: 'absolute', width: D, height: D, borderRadius: D / 2 }, circleStyle]} />
          <View
            accessible
            accessibilityLabel={seg ? `${circleLabel}, ${left}` : circleLabel}
            style={{ alignItems: 'center', maxWidth: D * 0.72 }}
          >
            {status === 'paused' ? <Eyebrow style={{ marginBottom: 4 }}>{t('kegel.paused')}</Eyebrow> : null}
            {status === 'done' ? (
              <Text style={{ fontSize: 44, lineHeight: 54 }} allowFontScaling={false}>
                🌸
              </Text>
            ) : null}
            <Text
              maxFontSizeMultiplier={1.3}
              style={{ fontFamily: fonts.display, fontSize: 22, lineHeight: 28, color: colors.ink, textAlign: 'center' }}
            >
              {circleLabel}
            </Text>
            {seg ? (
              <Text maxFontSizeMultiplier={1.2} style={{ fontFamily: fonts.display, fontSize: 60, lineHeight: 70, color: tint.sage.fg }}>
                {left}
              </Text>
            ) : status === 'idle' ? (
              <Text maxFontSizeMultiplier={1.2} style={{ fontFamily: fonts.display, fontSize: 30, lineHeight: 38, color: tint.sage.fg, marginTop: 4 }}>
                {t('kegel.repsShort', { reps: level.reps, hold: level.hold })}
              </Text>
            ) : null}
          </View>
        </View>

        <View
          accessible
          accessibilityLabel={t('kegel.repsDone', { n: repsDone, total: level.reps })}
          style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginTop: 20, paddingHorizontal: 48 }}
        >
          {Array.from({ length: level.reps }, (_, i) => (
            <View
              key={i}
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: i < repsDone ? colors.sage : seg && seg.rep === i + 1 ? '#AFC8B2' : colors.line,
              }}
            />
          ))}
        </View>
        {seg && seg.phase !== 'ready' ? (
          <Text style={{ fontFamily: fonts.bodyBold, fontSize: 13, color: colors.mute, marginTop: 10 }}>
            {t('kegel.repOf', { n: seg.rep, total: level.reps })}
          </Text>
        ) : null}
      </View>

      {/* Controls */}
      <View style={{ paddingHorizontal: 20, marginTop: 22, flexDirection: 'row', gap: 10 }}>
        {active ? (
          <>
            <MainButton kind="secondary" label={t('kegel.stop')} onPress={stop} icon={<Icon.stop size={18} color={colors.ink} />} flex={1} />
            {status === 'running' ? (
              <MainButton
                label={t('kegel.pause')}
                onPress={() => {
                  Haptics.selectionAsync().catch(() => {});
                  pause();
                }}
                flex={1.4}
              />
            ) : (
              <MainButton label={t('kegel.resume')} onPress={resume} icon={<Icon.play size={18} color="#fff" />} flex={1.4} />
            )}
          </>
        ) : (
          <MainButton
            label={status === 'done' ? t('kegel.again') : t('kegel.start')}
            onPress={start}
            icon={<Icon.play size={18} color="#fff" />}
            flex={1}
          />
        )}
      </View>

      {status === 'done' ? (
        <Animated.View entering={FadeIn.duration(400)} style={{ paddingHorizontal: 20, marginTop: 16 }}>
          <Surface style={{ backgroundColor: colors.sageSoft, shadowOpacity: 0, flexDirection: 'row', alignItems: 'center', gap: 14 }}>
            <EmojiBadge emoji="🌿" size={48} bg="#fff" />
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: fonts.bodyBold, fontSize: 15.5, color: colors.ink }}>{weekText}</Text>
              <Text style={{ fontFamily: fonts.body, fontSize: 13.5, lineHeight: 19, color: colors.ink2, marginTop: 3 }}>
                {t('kegel.doneBody')}
              </Text>
            </View>
          </Surface>
        </Animated.View>
      ) : null}

      {/* Tally (the done card above already carries this week's count) */}
      {status !== 'done' ? (
        <View style={{ paddingHorizontal: 20, marginTop: 14 }}>
          <Surface style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }} accessible accessibilityLabel={weekText}>
              <Eyebrow>{t('kegel.thisWeek')}</Eyebrow>
              <Text style={{ fontFamily: fonts.display, fontSize: 30, lineHeight: 36, color: colors.ink, marginTop: 4 }}>{weekCount}</Text>
              <Text style={{ fontFamily: fonts.body, fontSize: 13, color: colors.mute }}>
                {weekCount === 1 ? t('kegel.session') : t('kegel.sessions')}
              </Text>
            </View>
            <View style={{ width: 1, backgroundColor: colors.line, marginHorizontal: 16 }} />
            <View
              style={{ flex: 1 }}
              accessible
              accessibilityLabel={`${t('c.today')}: ${t('kegel.todayOf', { n: todayCount, goal: SETS_PER_DAY })}`}
            >
              <Eyebrow>{t('c.today')}</Eyebrow>
              <Text style={{ fontFamily: fonts.display, fontSize: 30, lineHeight: 36, color: colors.ink, marginTop: 4 }}>
                {todayCount}
                <Text style={{ fontFamily: fonts.body, fontSize: 16, color: colors.faint }}> / {SETS_PER_DAY}</Text>
              </Text>
              <Text style={{ fontFamily: fonts.body, fontSize: 13, color: colors.mute }}>{t('kegel.setsToday')}</Text>
            </View>
          </Surface>
        </View>
      ) : null}

      {/* How to */}
      <View style={{ paddingHorizontal: 20, marginTop: 14 }}>
        <Surface>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <IconBadge icon={Icon.flower} hue="sage" size={40} />
            <H2 style={{ flex: 1, fontSize: 20, lineHeight: 26 }}>{t('kegel.howTitle')}</H2>
          </View>
          {HOW_TO.map((k) => (
            <View key={k} style={{ flexDirection: 'row', gap: 10, marginTop: 14 }}>
              <View style={{ paddingTop: 3 }}>
                <Icon.check size={18} color={colors.sage} />
              </View>
              <Body style={{ flex: 1 }}>{t(k)}</Body>
            </View>
          ))}
          <View style={{ flexDirection: 'row', gap: 10, padding: 14, borderRadius: 18, backgroundColor: colors.lavenderSoft, marginTop: 16 }}>
            <Icon.stethoscope size={18} color={tint.lavender.fg} />
            <Text style={{ flex: 1, fontFamily: fonts.body, fontSize: 13.5, lineHeight: 19, color: colors.ink2 }}>{t('kegel.howHelp')}</Text>
          </View>
        </Surface>
      </View>

      <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
        <Eyebrow style={{ marginBottom: 4 }}>{t('c.sources')}</Eyebrow>
        {SOURCES.map((s) => (
          <Pressable
            key={s.url}
            onPress={() => Linking.openURL(s.url).catch(() => {})}
            accessibilityRole="link"
            accessibilityLabel={t(s.label)}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 6 }}
          >
            <Icon.external size={14} color={colors.terracotta} />
            <Text style={{ flex: 1, fontFamily: fonts.body, fontSize: 13.5, color: colors.terracotta }}>{t(s.label)}</Text>
          </Pressable>
        ))}
      </View>
      <MedicalNote text={t('c.medicalNote')} />
    </Page>
  );
}

function MainButton({
  label,
  onPress,
  icon,
  kind = 'primary',
  flex,
}: {
  label: string;
  onPress: () => void;
  icon?: React.ReactNode;
  kind?: 'primary' | 'secondary';
  flex?: number;
}) {
  const primary = kind === 'primary';
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => ({
        flex,
        minHeight: 56,
        borderRadius: 18,
        paddingHorizontal: 18,
        paddingVertical: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: primary ? colors.terracotta : colors.surface,
        borderWidth: primary ? 0 : 1,
        borderColor: colors.line,
        transform: [{ scale: pressed ? 0.985 : 1 }],
        ...(primary
          ? { shadowColor: colors.terracotta, shadowOpacity: 0.22, shadowRadius: 14, shadowOffset: { width: 0, height: 6 } }
          : null),
      })}
    >
      {icon}
      <Text style={{ fontFamily: fonts.bodyBold, fontSize: 16, color: primary ? '#fff' : colors.ink }}>{label}</Text>
    </Pressable>
  );
}
