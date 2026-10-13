// Calm breathing — a slow breathing orb on a soft sky-to-lavender wash. Three
// patterns (gentle 4-6, box 4-4-4-4, 4-7-8), a short session with a progress
// ring, and calm notes on light-headedness and breath-holds in pregnancy.

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, AppState, Linking, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedProps,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import * as Haptics from 'expo-haptics';
import { Icon } from '@/components/Icon';
import { Body, Chip, Eyebrow, H1, NavBar, Segmented } from '@/components/ui';
import { useT } from '@/i18n';
import { colors, tint } from '@/theme/colors';
import { fonts } from '@/theme/typography';

type PatternKey = 'gentle' | 'box' | 'f478';
type StepKind = 'in' | 'hold' | 'out' | 'rest';
type Step = { kind: StepKind; secs: number };
type Status = 'idle' | 'running' | 'done';

const PATTERNS: Record<PatternKey, Step[]> = {
  gentle: [
    { kind: 'in', secs: 4 },
    { kind: 'out', secs: 6 },
  ],
  box: [
    { kind: 'in', secs: 4 },
    { kind: 'hold', secs: 4 },
    { kind: 'out', secs: 4 },
    { kind: 'rest', secs: 4 },
  ],
  f478: [
    { kind: 'in', secs: 4 },
    { kind: 'hold', secs: 7 },
    { kind: 'out', secs: 8 },
  ],
};
const PATTERN_KEYS: PatternKey[] = ['gentle', 'box', 'f478'];
const MINUTES = [1, 2, 5] as const;
/** Orb size between sessions (0 = empty lungs, 1 = full). */
const AT_REST = 0.6;
const SOURCE_URL = 'https://www.nhs.uk/mental-health/self-help/guides-tools-and-activities/breathing-exercises-for-stress/';

const ACircle = Animated.createAnimatedComponent(Circle);

/** Where we are in the session: which breath, which step, seconds left in it. */
function locate(steps: Step[], cycleLen: number, sec: number) {
  const cycle = Math.floor(sec / cycleLen);
  let rest = sec - cycle * cycleLen;
  for (let i = 0; i < steps.length; i++) {
    if (rest < steps[i].secs) return { cycle, idx: i, left: steps[i].secs - rest };
    rest -= steps[i].secs;
  }
  return { cycle, idx: steps.length - 1, left: 0 };
}

const mmss = (s: number) => `${Math.floor(s / 60)}:${String(Math.max(0, Math.floor(s % 60))).padStart(2, '0')}`;

export default function Breathing() {
  const t = useT();
  const insets = useSafeAreaInsets();
  const reduce = useReducedMotion();
  const { width } = useWindowDimensions();
  const [pattern, setPattern] = useState<PatternKey>('gentle');
  const [minutes, setMinutes] = useState<(typeof MINUTES)[number]>(2);
  const [status, setStatus] = useState<Status>('idle');
  const [sec, setSec] = useState(0);

  const steps = PATTERNS[pattern];
  const cycleLen = steps.reduce((a, s) => a + s.secs, 0);
  const cycles = Math.max(1, Math.round((minutes * 60) / cycleLen));
  const total = cycles * cycleLen;

  const live = useRef(false);
  const startedAt = useRef(0);
  const lastStep = useRef(-1);
  const orb = useSharedValue(AT_REST); // 0 = empty lungs … 1 = full
  const ring = useSharedValue(0); // session progress 0 … 1

  const animateStep = useCallback(
    (kind: StepKind, ms: number) => {
      const easing = Easing.inOut(Easing.sin);
      if (kind === 'in') orb.value = withTiming(1, { duration: Math.max(0, ms), easing });
      else if (kind === 'out') orb.value = withTiming(0, { duration: Math.max(0, ms), easing });
    },
    [orb],
  );

  useEffect(() => {
    if (status !== 'running') return;
    const tick = () => {
      if (!live.current) return;
      const ms = Date.now() - startedAt.current;
      if (ms >= total * 1000) {
        live.current = false;
        lastStep.current = -1;
        setSec(total);
        setStatus('done');
        orb.value = withTiming(AT_REST, { duration: 900, easing: Easing.inOut(Easing.sin) });
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
        AccessibilityInfo.announceForAccessibility(t('breath.doneTitle'));
        return;
      }
      const pos = locate(steps, cycleLen, ms / 1000);
      const key = pos.cycle * steps.length + pos.idx;
      if (key !== lastStep.current) {
        lastStep.current = key;
        const step = steps[pos.idx];
        animateStep(step.kind, pos.left * 1000);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft).catch(() => {});
        AccessibilityInfo.announceForAccessibility(t(`breath.step.${step.kind}`));
      }
      setSec(Math.floor(ms / 1000));
    };
    tick();
    const id = setInterval(tick, 100);
    return () => clearInterval(id);
  }, [status, steps, cycleLen, total, animateStep, orb, t]);

  const stop = useCallback(() => {
    live.current = false;
    lastStep.current = -1;
    cancelAnimation(orb);
    cancelAnimation(ring);
    orb.value = withTiming(AT_REST, { duration: 600 });
    ring.value = withTiming(0, { duration: 400 });
    setSec(0);
    setStatus('idle');
  }, [orb, ring]);

  // A breathing session doesn't make sense in the background — end it quietly.
  useEffect(() => {
    if (status !== 'running') return;
    const sub = AppState.addEventListener('change', (s) => {
      if (s !== 'active') stop();
    });
    return () => sub.remove();
  }, [status, stop]);

  const start = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    lastStep.current = -1;
    startedAt.current = Date.now();
    live.current = true;
    cancelAnimation(ring);
    ring.value = 0;
    ring.value = withTiming(1, { duration: total * 1000, easing: Easing.linear });
    setSec(0);
    setStatus('running');
  };

  const ringSize = Math.min(300, width - 64);
  const stroke = 6;
  const r = (ringSize - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const orbSize = ringSize - 44;

  const ringProps = useAnimatedProps(() => ({ strokeDashoffset: circumference * (1 - ring.value) }));
  const orbStyle = useAnimatedStyle(() =>
    reduce
      ? { opacity: 0.55 + 0.45 * orb.value, transform: [{ scale: 0.84 }] }
      : { opacity: 0.82 + 0.18 * orb.value, transform: [{ scale: 0.5 + 0.5 * orb.value }] },
  );
  const glowStyle = useAnimatedStyle(() =>
    reduce
      ? { opacity: 0.25 + 0.2 * orb.value, transform: [{ scale: 0.96 }] }
      : { opacity: 0.18 + 0.27 * orb.value, transform: [{ scale: 0.6 + 0.42 * orb.value }] },
  );

  const running = status === 'running';
  const pos = running ? locate(steps, cycleLen, sec) : null;
  const step = pos ? steps[pos.idx] : null;
  const orbLabel = step ? t(`breath.step.${step.kind}`) : status === 'done' ? t('breath.doneTitle') : t('breath.ready');
  const patternDesc = steps.map((s) => t(`breath.short.${s.kind}`, { n: s.secs })).join(' · ');

  return (
    <View style={{ flex: 1, backgroundColor: colors.base }}>
      <LinearGradient
        colors={['#DCE8F3', '#E7E1F1', '#F6EFF3']}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <NavBar caption={t('tools.breathing')} transparent />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}>
        <View style={{ paddingHorizontal: 20, paddingTop: 4 }}>
          <H1>{t('breath.title')}</H1>
          <Body mute style={{ marginTop: 8, color: colors.ink2 }}>
            {t('breath.intro')}
          </Body>
        </View>

        {/* Pattern */}
        <View
          pointerEvents={running ? 'none' : 'auto'}
          accessibilityElementsHidden={running}
          importantForAccessibility={running ? 'no-hide-descendants' : 'auto'}
          style={{ paddingHorizontal: 20, marginTop: 18, opacity: running ? 0.5 : 1 }}
        >
          <Segmented
            options={PATTERN_KEYS.map((k) => ({ value: k, label: t(`breath.pattern.${k}`) }))}
            value={pattern}
            onChange={(v) => {
              if (running) return;
              setPattern(v);
              if (status === 'done') setStatus('idle');
            }}
            style={{ backgroundColor: 'rgba(255,255,255,0.55)' }}
          />
          <Text style={{ fontFamily: fonts.bodyBold, fontSize: 13.5, color: colors.ink2, textAlign: 'center', marginTop: 10 }}>
            {patternDesc}
          </Text>
        </View>

        {/* Orb */}
        <View style={{ alignItems: 'center', marginTop: 26 }}>
          <View style={{ width: ringSize, height: ringSize, alignItems: 'center', justifyContent: 'center' }}>
            <Svg width={ringSize} height={ringSize} style={StyleSheet.absoluteFill}>
              <Circle cx={ringSize / 2} cy={ringSize / 2} r={r} stroke="rgba(255,255,255,0.7)" strokeWidth={stroke} fill="none" />
              <ACircle
                cx={ringSize / 2}
                cy={ringSize / 2}
                r={r}
                stroke={tint.lavender.fg}
                strokeOpacity={0.55}
                strokeWidth={stroke}
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${circumference}`}
                animatedProps={ringProps}
                transform={`rotate(-90 ${ringSize / 2} ${ringSize / 2})`}
              />
            </Svg>
            <Animated.View
              style={[
                { position: 'absolute', width: orbSize, height: orbSize, borderRadius: orbSize / 2, backgroundColor: '#FFFFFF' },
                glowStyle,
              ]}
            />
            <Animated.View
              style={[{ position: 'absolute', width: orbSize - 28, height: orbSize - 28, borderRadius: (orbSize - 28) / 2, overflow: 'hidden' }, orbStyle]}
            >
              <LinearGradient colors={['#C9DCEE', '#CFC5E3']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ flex: 1 }} />
            </Animated.View>
            <View
              accessible
              accessibilityLabel={step && pos ? `${orbLabel}, ${pos.left}` : orbLabel}
              style={{ alignItems: 'center', maxWidth: (orbSize - 28) * 0.8 }}
            >
              {status === 'done' ? (
                <Text style={{ fontSize: 40, lineHeight: 50 }} allowFontScaling={false}>
                  🌿
                </Text>
              ) : null}
              <Text maxFontSizeMultiplier={1.3} style={{ fontFamily: fonts.display, fontSize: 26, lineHeight: 32, color: colors.ink, textAlign: 'center' }}>
                {orbLabel}
              </Text>
              {step && pos ? (
                <Text maxFontSizeMultiplier={1.2} style={{ fontFamily: fonts.display, fontSize: 44, lineHeight: 52, color: tint.lavender.fg, marginTop: 2 }}>
                  {pos.left}
                </Text>
              ) : null}
            </View>
          </View>

          {running && pos ? (
            <Text style={{ fontFamily: fonts.bodyBold, fontSize: 13.5, color: colors.ink2, marginTop: 16 }}>
              {t('breath.progress', { n: Math.min(cycles, pos.cycle + 1), total: cycles, time: mmss(total - sec) })}
            </Text>
          ) : (
            <View style={{ alignItems: 'center', marginTop: 16 }}>
              {status === 'done' ? (
                <Text style={{ fontFamily: fonts.body, fontSize: 14.5, lineHeight: 21, color: colors.ink2, textAlign: 'center', paddingHorizontal: 32, marginBottom: 16 }}>
                  {t('breath.doneBody')}
                </Text>
              ) : null}
              <Eyebrow color={colors.ink2}>{t('breath.length')}</Eyebrow>
              <View style={{ flexDirection: 'row', gap: 8, marginTop: 10 }}>
                {MINUTES.map((m) => (
                  <Chip key={m} small label={t('breath.minutes', { n: m })} selected={minutes === m} onPress={() => setMinutes(m)} />
                ))}
              </View>
            </View>
          )}
        </View>

        {/* Start / stop */}
        <View style={{ paddingHorizontal: 20, marginTop: 22 }}>
          <Pressable
            onPress={
              running
                ? () => {
                    Haptics.selectionAsync().catch(() => {});
                    stop();
                  }
                : start
            }
            accessibilityRole="button"
            accessibilityLabel={running ? t('breath.stop') : status === 'done' ? t('breath.again') : t('breath.start')}
            style={({ pressed }) => ({
              minHeight: 56,
              borderRadius: 18,
              paddingHorizontal: 18,
              paddingVertical: 14,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              backgroundColor: running ? 'rgba(255,255,255,0.85)' : colors.terracotta,
              borderWidth: running ? 1 : 0,
              borderColor: colors.line,
              transform: [{ scale: pressed ? 0.985 : 1 }],
            })}
          >
            {running ? <Icon.stop size={18} color={colors.ink} /> : <Icon.play size={18} color="#fff" />}
            <Text style={{ fontFamily: fonts.bodyBold, fontSize: 16, color: running ? colors.ink : '#fff' }}>
              {running ? t('breath.stop') : status === 'done' ? t('breath.again') : t('breath.start')}
            </Text>
          </Pressable>
        </View>

        {/* Gentle notes */}
        <View style={{ paddingHorizontal: 20, marginTop: 22 }}>
          <View style={{ borderRadius: 22, padding: 16, backgroundColor: 'rgba(255,255,255,0.72)' }}>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <View style={{ paddingTop: 2 }}>
                <Icon.info size={18} color={tint.lavender.fg} />
              </View>
              <Text style={{ flex: 1, fontFamily: fonts.body, fontSize: 14, lineHeight: 20, color: colors.ink2 }}>{t('breath.noteDizzy')}</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 10, marginTop: 12 }}>
              <View style={{ paddingTop: 2 }}>
                <Icon.heart size={18} color={tint.rose.fg} />
              </View>
              <Text style={{ flex: 1, fontFamily: fonts.body, fontSize: 14, lineHeight: 20, color: colors.ink2 }}>{t('breath.notePregnancy')}</Text>
            </View>
            <Pressable
              onPress={() => Linking.openURL(SOURCE_URL).catch(() => {})}
              accessibilityRole="link"
              accessibilityLabel={`${t('c.sources')}: ${t('breath.source')}`}
              hitSlop={6}
              style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 14 }}
            >
              <Icon.external size={14} color={colors.terracotta} />
              <Text style={{ flex: 1, fontFamily: fonts.body, fontSize: 13.5, color: colors.terracotta }}>{t('breath.source')}</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
