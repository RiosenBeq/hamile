// Water — a glass that fills toward today's goal (glasses of ~250 ml), quick
// +1 / −1 logging, an adjustable daily goal and a gentle 7-day view.

import React, { useEffect, useId, useMemo } from 'react';
import { AccessibilityInfo, Linking, Pressable, Text, View } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedProps,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Svg, { ClipPath, Defs, Ellipse, G, Line, LinearGradient as SvgGradient, Path, Rect, Stop } from 'react-native-svg';
import * as Haptics from 'expo-haptics';
import { Icon } from '@/components/Icon';
import { Body, CircleButton, EmojiBadge, Eyebrow, H1, H2, IconBadge, MedicalNote, NavBar, Page, Surface } from '@/components/ui';
import { useAppStore } from '@/store/useAppStore';
import type { Units } from '@/store/types';
import { addDays, dayKey, parseISODate } from '@/lib/pregnancy';
import { useToday } from '@/lib/usePregnancy';
import { useFormat, useLang, useT } from '@/i18n';
import type { LangCode } from '@/i18n';
import { colors, tint } from '@/theme/colors';
import { fonts } from '@/theme/typography';

const ML_PER_GLASS = 250;
const GOAL_MIN = 4;
const GOAL_MAX = 16;
const CHART_H = 112;
const SOURCE_URL = 'https://www.nhs.uk/live-well/eat-well/food-guidelines-and-food-labels/water-drinks-nutrition/';

/** "1,250 ml" (en) / "1.250 ml" (tr), or fluid ounces for imperial users. */
function formatVolume(ml: number, units: Units | undefined, lang: LangCode): string {
  if (units === 'imperial') return `${Math.round(ml / 29.5735)} fl oz`;
  const sep = lang === 'tr' ? '.' : ',';
  return `${String(Math.round(ml)).replace(/\B(?=(\d{3})+(?!\d))/g, sep)} ml`;
}

export default function Water() {
  const t = useT();
  const lang = useLang();
  const fmt = useFormat();
  const today = useToday();
  const count = useAppStore((s) => s.waterByDay[today] ?? 0);
  const byDay = useAppStore((s) => s.waterByDay);
  const goal = useAppStore((s) => s.waterGoal);
  const units = useAppStore((s) => s.profile.units);
  const addWater = useAppStore((s) => s.addWater);
  const setWaterGoal = useAppStore((s) => s.setWaterGoal);

  const vol = (glasses: number) => formatVolume(glasses * ML_PER_GLASS, units, lang);
  const left = Math.max(0, goal - count);
  const status =
    count >= goal
      ? t('water.reached')
      : count === 0
        ? t('water.start')
        : left === 1
          ? t('water.leftOne')
          : t('water.leftMany', { n: left });

  const add = () => {
    if (count + 1 === goal) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      AccessibilityInfo.announceForAccessibility(t('water.reached'));
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    addWater(1, today);
  };

  const remove = () => {
    if (count <= 0) return;
    Haptics.selectionAsync().catch(() => {});
    addWater(-1, today);
  };

  const changeGoal = (delta: number) => {
    const next = Math.max(GOAL_MIN, Math.min(GOAL_MAX, goal + delta));
    if (next === goal) return;
    Haptics.selectionAsync().catch(() => {});
    setWaterGoal(next);
  };

  // Last seven calendar days, oldest first, ending today.
  const week = useMemo(() => {
    const base = parseISODate(today);
    return Array.from({ length: 7 }, (_, i) => {
      const date = addDays(base, i - 6);
      const key = dayKey(date);
      return { key, date, n: byDay[key] ?? 0 };
    });
  }, [today, byDay]);
  const peak = Math.max(goal, ...week.map((d) => d.n));
  const metDays = week.filter((d) => d.n >= goal).length;

  return (
    <Page header={<NavBar caption={t('tools.water')} />}>
      <View style={{ paddingHorizontal: 20, paddingTop: 4 }}>
        <H1>{t('water.title')}</H1>
        <Body mute style={{ marginTop: 8 }}>
          {t('water.intro')}
        </Body>
      </View>

      {/* Glass + quick log */}
      <View style={{ paddingHorizontal: 20, marginTop: 18 }}>
        <Surface style={{ alignItems: 'center', paddingTop: 26, paddingBottom: 20, backgroundColor: '#F5F9FC' }}>
          <View
            accessible
            accessibilityRole="progressbar"
            accessibilityLabel={t('water.glassA11y')}
            accessibilityValue={{ min: 0, max: goal, now: Math.min(count, goal), text: t('water.ofGoal', { n: count, goal }) }}
          >
            <Glass level={Math.min(1, count / goal)} goal={goal} width={168} />
          </View>
          <Text style={{ fontFamily: fonts.display, fontSize: 30, lineHeight: 36, color: colors.ink, marginTop: 18, letterSpacing: -0.4, textAlign: 'center' }}>
            {t('water.ofGoal', { n: count, goal })}
          </Text>
          <Text style={{ fontFamily: fonts.body, fontSize: 14, color: colors.mute, marginTop: 2, textAlign: 'center' }}>
            {t('water.volume', { done: vol(count), goal: vol(goal) })}
          </Text>
          <Text
            accessibilityLiveRegion="polite"
            style={{ fontFamily: fonts.bodyBold, fontSize: 14, color: count >= goal ? tint.sage.fg : tint.sky.fg, marginTop: 10, textAlign: 'center' }}
          >
            {status}
          </Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 20, alignSelf: 'stretch' }}>
            <CircleButton
              size={58}
              onPress={remove}
              accessibilityLabel={t('water.removeA11y')}
              style={{ opacity: count > 0 ? 1 : 0.4 }}
            >
              <Icon.minus size={22} color={colors.ink} />
            </CircleButton>
            <Pressable
              onPress={add}
              accessibilityRole="button"
              accessibilityLabel={t('water.addA11y')}
              style={({ pressed }) => ({
                flex: 1,
                minHeight: 58,
                borderRadius: 20,
                paddingHorizontal: 18,
                paddingVertical: 14,
                backgroundColor: tint.sky.fg,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                transform: [{ scale: pressed ? 0.97 : 1 }],
                shadowColor: tint.sky.fg,
                shadowOpacity: 0.3,
                shadowRadius: 16,
                shadowOffset: { width: 0, height: 8 },
              })}
            >
              <Icon.plus size={20} color="#fff" />
              <Text style={{ color: '#fff', fontFamily: fonts.bodyBold, fontSize: 17 }}>{t('water.add')}</Text>
            </Pressable>
          </View>
        </Surface>
      </View>

      {/* Daily goal */}
      <View style={{ paddingHorizontal: 20, marginTop: 14 }}>
        <Surface style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <IconBadge icon={Icon.drop} hue="sky" size={38} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: fonts.bodyBold, fontSize: 15.5, color: colors.ink }}>{t('water.goal')}</Text>
            <Text style={{ fontFamily: fonts.body, fontSize: 13, color: colors.mute, marginTop: 2 }}>{vol(goal)}</Text>
          </View>
          <CircleButton
            onPress={() => changeGoal(-1)}
            accessibilityLabel={t('water.goalLess')}
            style={{ opacity: goal > GOAL_MIN ? 1 : 0.4 }}
          >
            <Icon.minus size={18} color={colors.ink} />
          </CircleButton>
          <View
            accessible
            accessibilityRole="adjustable"
            accessibilityLabel={t('water.goal')}
            accessibilityValue={{ min: GOAL_MIN, max: GOAL_MAX, now: goal, text: t('water.goalValue', { n: goal }) }}
            accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
            onAccessibilityAction={(e) => changeGoal(e.nativeEvent.actionName === 'increment' ? 1 : -1)}
            style={{ minWidth: 34, alignItems: 'center' }}
          >
            <Text style={{ fontFamily: fonts.display, fontSize: 24, color: colors.ink }}>{goal}</Text>
          </View>
          <CircleButton
            onPress={() => changeGoal(1)}
            accessibilityLabel={t('water.goalMore')}
            style={{ opacity: goal < GOAL_MAX ? 1 : 0.4 }}
          >
            <Icon.plus size={18} color={colors.ink} />
          </CircleButton>
        </Surface>
      </View>

      {/* Last 7 days */}
      <View style={{ paddingHorizontal: 20, marginTop: 14 }}>
        <Surface>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <Eyebrow>{t('water.week')}</Eyebrow>
            <Text style={{ fontFamily: fonts.bodyBold, fontSize: 12.5, color: colors.mute, flexShrink: 1, textAlign: 'right' }}>
              {t('water.weekMet', { n: metDays })}
            </Text>
          </View>
          <View style={{ marginTop: 16, height: CHART_H + 20 }}>
            <View pointerEvents="none" style={{ position: 'absolute', left: 0, right: 0, bottom: (goal / peak) * CHART_H - 1 }}>
              <Svg width="100%" height={2}>
                <Line x1="0" y1="1" x2="100%" y2="1" stroke={colors.sky} strokeWidth={1.5} strokeDasharray="3 5" strokeLinecap="round" />
              </Svg>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', height: '100%', gap: 8 }}>
              {week.map((d) => (
                <View
                  key={d.key}
                  accessible
                  accessibilityLabel={t('water.dayA11y', { day: fmt.weekday(d.date), n: d.n })}
                  style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'flex-end' }}
                >
                  {d.n ? (
                    <Text maxFontSizeMultiplier={1.3} style={{ fontFamily: fonts.bodyBold, fontSize: 11, color: colors.mute, marginBottom: 4 }}>
                      {d.n}
                    </Text>
                  ) : null}
                  <View
                    style={{
                      width: '72%',
                      maxWidth: 30,
                      height: d.n ? Math.max(8, (d.n / peak) * CHART_H) : 6,
                      borderRadius: 9,
                      backgroundColor: d.n >= goal ? tint.sky.fg : d.n ? '#A9CBE8' : colors.skySoft,
                    }}
                  />
                </View>
              ))}
            </View>
          </View>
          <View
            style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
          >
            {week.map((d) => {
              const isToday = d.key === today;
              return (
                <Text
                  key={d.key}
                  maxFontSizeMultiplier={1.4}
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    fontSize: 12,
                    fontFamily: isToday ? fonts.bodyBold : fonts.body,
                    color: isToday ? colors.ink : colors.mute,
                  }}
                >
                  {d.date.toLocaleDateString(fmt.locale, { weekday: 'narrow' })}
                </Text>
              );
            })}
          </View>
        </Surface>
      </View>

      {/* Gentle guidance */}
      <View style={{ paddingHorizontal: 20, marginTop: 14 }}>
        <Surface style={{ backgroundColor: colors.skySoft, shadowOpacity: 0 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <EmojiBadge emoji="💧" size={40} bg="#fff" />
            <H2 style={{ flex: 1, fontSize: 20, lineHeight: 26 }}>{t('water.tipTitle')}</H2>
          </View>
          <Body style={{ marginTop: 12 }}>{t('water.tip')}</Body>
          <Body mute style={{ marginTop: 8, fontSize: 14, lineHeight: 20 }}>
            {t('water.tipSick')}
          </Body>
          <Pressable
            onPress={() => Linking.openURL(SOURCE_URL).catch(() => {})}
            accessibilityRole="link"
            accessibilityLabel={`${t('c.sources')}: ${t('water.source')}`}
            hitSlop={6}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 14 }}
          >
            <Icon.external size={14} color={tint.sky.fg} />
            <Text style={{ flex: 1, fontFamily: fonts.bodyBold, fontSize: 13.5, color: tint.sky.fg }}>{t('water.source')}</Text>
          </Pressable>
        </Surface>
      </View>

      <MedicalNote text={t('c.medicalNote')} />
    </Page>
  );
}

// ── The glass ──────────────────────────────────────────────────────────────

const ARect = Animated.createAnimatedComponent(Rect);
const AEllipse = Animated.createAnimatedComponent(Ellipse);

// Geometry in a 160×200 viewBox: a gently tapered tumbler, 62 → 47.5 half-width.
const VB_W = 160;
const VB_H = 200;
const CX = 80;
const RIM_Y = 12;
const WALL_END_Y = 178.5;
const BASE_Y = 188;
const FULL_Y = 28; // water line once the goal is met
const GLASS = 'M18 12 H142 L127.5 178.5 Q126.5 188 117 188 H43 Q33.5 188 32.5 178.5 Z';

function halfWidth(y: number): number {
  'worklet';
  const k = Math.min(1, Math.max(0, (y - RIM_Y) / (WALL_END_Y - RIM_Y)));
  return 62 - 14.5 * k;
}

function waterLine(level: number): number {
  'worklet';
  return BASE_Y - level * (BASE_Y - FULL_Y);
}

function Glass({ level, goal, width }: { level: number; goal: number; width: number }) {
  const reduce = useReducedMotion();
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const fill = useSharedValue(0);
  const wave = useSharedValue(0);

  useEffect(() => {
    fill.value = withTiming(level, { duration: reduce ? 0 : 700, easing: Easing.out(Easing.cubic) });
  }, [level, reduce, fill]);

  useEffect(() => {
    if (reduce) return;
    wave.value = withRepeat(withTiming(1, { duration: 2400, easing: Easing.inOut(Easing.sin) }), -1, true);
    return () => cancelAnimation(wave);
  }, [reduce, wave]);

  const waterProps = useAnimatedProps(() => {
    const y = waterLine(fill.value);
    return { y, height: VB_H - y };
  });
  const surfaceProps = useAnimatedProps(() => {
    const y = waterLine(fill.value);
    return { cy: y, rx: halfWidth(y) - 1.5, ry: 3.5 + wave.value * 1.5, opacity: fill.value > 0.02 ? 1 : 0 };
  });

  // One small tick per glass on the right-hand wall.
  const ticks = useMemo(
    () =>
      Array.from({ length: Math.max(0, goal - 1) }, (_, i) => {
        const y = waterLine((i + 1) / goal);
        const edge = CX + halfWidth(y);
        return { y, x1: edge - 14, x2: edge - 6 };
      }),
    [goal],
  );
  const surfaceY = waterLine(level);

  return (
    <Svg width={width} height={(width * VB_H) / VB_W} viewBox={`0 0 ${VB_W} ${VB_H}`}>
      <Defs>
        <ClipPath id={`glass-${uid}`}>
          <Path d={GLASS} />
        </ClipPath>
        <SvgGradient id={`water-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#A9CBE8" />
          <Stop offset="1" stopColor="#6F9CC2" />
        </SvgGradient>
      </Defs>
      <Path d={GLASS} fill="#FFFFFF" />
      <G clipPath={`url(#glass-${uid})`}>
        <ARect x={0} width={VB_W} fill={`url(#water-${uid})`} animatedProps={waterProps} />
        <AEllipse cx={CX} fill="#CFE2F2" animatedProps={surfaceProps} />
      </G>
      {ticks.map((tk, i) => (
        <Line
          key={i}
          x1={tk.x1}
          y1={tk.y}
          x2={tk.x2}
          y2={tk.y}
          stroke={tk.y > surfaceY ? 'rgba(255,255,255,0.85)' : '#C9DAEA'}
          strokeWidth={2}
          strokeLinecap="round"
        />
      ))}
      <Path d={GLASS} fill="none" stroke="#B5CDE3" strokeWidth={3} strokeLinejoin="round" />
      <Path d="M31 30 L42 165" stroke="#FFFFFF" strokeOpacity={0.75} strokeWidth={5} strokeLinecap="round" />
    </Svg>
  );
}
