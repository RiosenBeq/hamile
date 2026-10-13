// Weight. Gentle, units-aware tracking: a 0.1-step stepper to log, a curve,
// the change since before pregnancy and — once height and pre-pregnancy
// weight are known — the IOM 2009 recommended total gain for that BMI.
// The language stays neutral: ranges are information, never a verdict.

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Linking, Pressable, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Btn } from '@/components/Btn';
import { Icon } from '@/components/Icon';
import { Sparkline } from '@/components/charts/Sparkline';
import { Body, Eyebrow, Field, H1, H2, MedicalNote, NavBar, Page, Row, SectionTitle, Segmented, Surface } from '@/components/ui';
import { useAppStore, type WeightEntry } from '@/store/useAppStore';
import type { Units } from '@/store/types';
import { kgToLb, lbToKg } from '@/lib/units';
import { daysBetween } from '@/lib/pregnancy';
import { usePregnancy } from '@/lib/usePregnancy';
import { newId } from '@/lib/id';
import { useFormat, useT } from '@/i18n';
import { colors, tint } from '@/theme/colors';
import { fonts } from '@/theme/typography';

type Range = [number, number];
type BandKey = 'under' | 'normal' | 'over' | 'obese';
type Band = { key: BandKey; below: number; kg: Range; lb: Range; twinsKg: Range | null; twinsLb: Range | null };

// IOM 2009, "Weight Gain During Pregnancy: Reexamining the Guidelines" —
// recommended total gain by pre-pregnancy BMI for one baby. Twin ranges are
// the IOM's provisional guidance; it gives none for twins at a BMI under 18.5.
const IOM: Band[] = [
  { key: 'under', below: 18.5, kg: [12.5, 18], lb: [28, 40], twinsKg: null, twinsLb: null },
  { key: 'normal', below: 25, kg: [11.5, 16], lb: [25, 35], twinsKg: [17, 25], twinsLb: [37, 54] },
  { key: 'over', below: 30, kg: [7, 11.5], lb: [15, 25], twinsKg: [14, 23], twinsLb: [31, 50] },
  { key: 'obese', below: Infinity, kg: [5, 9], lb: [11, 20], twinsKg: [11, 19], twinsLb: [25, 42] },
];

const SOURCES = [
  {
    name: 'IOM (2009): Weight Gain During Pregnancy — Reexamining the Guidelines',
    url: 'https://www.ncbi.nlm.nih.gov/books/NBK32813/',
  },
];

const LIMITS: Record<Units, { min: number; max: number; big: number }> = {
  metric: { min: 30, max: 250, big: 0.5 },
  imperial: { min: 66, max: 550, big: 1 },
};

const round1 = (v: number) => Math.round(v * 10) / 10;
const parseNum = (s: string) => parseFloat(s.replace(',', '.').trim());

export default function WeightTracker() {
  const t = useT();
  const fmt = useFormat();
  const profile = useAppStore((s) => s.profile);
  const weights = useAppStore((s) => s.weights);
  const addWeight = useAppStore((s) => s.addWeight);
  const removeWeight = useAppStore((s) => s.removeWeight);
  const patchProfile = useAppStore((s) => s.patchProfile);
  const p = usePregnancy();

  const units: Units = profile.units ?? 'metric';
  const imperial = units === 'imperial';
  const unit = t(imperial ? 'wt.unit.lb' : 'wt.unit.kg');
  const limits = LIMITS[units];
  const week = p?.weeks ?? profile.week ?? 0;
  const pre = profile.prePregnancyKg ?? null;
  const heightCm = profile.heightCm ?? null;
  const twins = !!profile.multiples;

  const U = (s: string) => s.toLocaleUpperCase(fmt.locale);
  const num = (v: number, max = 1, min = max) =>
    v.toLocaleString(fmt.locale, { minimumFractionDigits: min, maximumFractionDigits: max, useGrouping: false });
  const toDisplay = (kg: number) => (imperial ? kgToLb(kg) : kg);
  const showKg = (kg: number) => `${num(toDisplay(kg))} ${unit}`;
  const signed = (v: number) => {
    const sign = v >= 0.05 ? '+' : v <= -0.05 ? '−' : '';
    return `${sign}${num(Math.abs(v))} ${unit}`;
  };
  const dayLabel = (ts: number) => {
    const diff = daysBetween(new Date(ts), new Date());
    if (diff === 0) return t('c.today');
    if (diff === 1) return t('c.yesterday');
    return fmt.date(ts, { day: 'numeric', month: 'short', year: 'numeric' });
  };

  // Oldest → newest for the chart; newest → oldest for the list.
  const series = useMemo(() => [...weights].sort((a, b) => a.at - b.at), [weights]);
  const desc = useMemo(() => [...series].reverse(), [series]);
  const latest = desc[0] ?? null;

  // ── Logging ──────────────────────────────────────────────────────────────
  const clampDraft = (v: number) => Math.min(limits.max, Math.max(limits.min, round1(v)));
  const [draft, setDraft] = useState(() => clampDraft(toDisplay(latest?.kg ?? pre ?? 65)));
  const shownUnits = useRef(units);
  useEffect(() => {
    if (shownUnits.current === units) return;
    shownUnits.current = units;
    setDraft((d) => {
      const v = round1(units === 'imperial' ? kgToLb(d) : lbToKg(d));
      return Math.min(LIMITS[units].max, Math.max(LIMITS[units].min, v));
    });
  }, [units]);

  const [saved, setSaved] = useState(false);
  const savedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (savedTimer.current) clearTimeout(savedTimer.current);
    },
    [],
  );

  const save = () => {
    const kg = Math.round((imperial ? lbToKg(draft) : draft) * 1000) / 1000;
    const entry: WeightEntry = { id: newId(), week, kg, at: Date.now() };
    addWeight(entry);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    setSaved(true);
    if (savedTimer.current) clearTimeout(savedTimer.current);
    savedTimer.current = setTimeout(() => setSaved(false), 2200);
  };

  const confirmDelete = (w: WeightEntry) => {
    Alert.alert(t('c.deleteConfirm'), t('c.deleteConfirmBody'), [
      { text: t('c.cancel'), style: 'cancel' },
      {
        text: t('c.delete'),
        style: 'destructive',
        onPress: () => {
          removeWeight(w.id);
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
        },
      },
    ]);
  };

  // ── IOM range ────────────────────────────────────────────────────────────
  // Rounded first so the BMI shown and the row highlighted always agree.
  const bmi = pre != null && heightCm ? round1(pre / Math.pow(heightCm / 100, 2)) : null;
  const band = bmi != null ? IOM.find((b) => bmi < b.below) ?? IOM[IOM.length - 1] : null;
  const rangeFor = (b: Band): Range | null => (twins ? (imperial ? b.twinsLb : b.twinsKg) : imperial ? b.lb : b.kg);
  const myRange = band ? rangeFor(band) : null;
  const bandLabel: Record<BandKey, string> = {
    under: t('wt.range.under', { v: num(18.5) }),
    normal: t('wt.range.between', { a: num(18.5), b: num(24.9) }),
    over: t('wt.range.between', { a: num(25, 1, 0), b: num(29.9) }),
    obese: t('wt.range.over', { v: num(30, 1, 0) }),
  };

  // Inline height + pre-pregnancy weight entry.
  const [editing, setEditing] = useState(false);
  const showSetup = editing || bmi == null;
  const [cm, setCm] = useState('');
  const [ft, setFt] = useState('');
  const [inch, setInch] = useState('');
  const [preText, setPreText] = useState('');
  const [invalid, setInvalid] = useState(false);
  useEffect(() => {
    if (heightCm) {
      const totalIn = Math.round(heightCm / 2.54);
      setCm(String(Math.round(heightCm)));
      setFt(String(Math.floor(totalIn / 12)));
      setInch(String(totalIn % 12));
    }
    setPreText(pre != null ? num(toDisplay(pre), 1, 0) : '');
    setInvalid(false);
    // Refill when the form opens or the units change; typing must not reset it.
  }, [units, editing]); // eslint-disable-line react-hooks/exhaustive-deps

  const saveSetup = () => {
    const h = imperial ? (parseNum(ft) * 12 + (parseNum(inch) || 0)) * 2.54 : parseNum(cm);
    const w = parseNum(preText);
    const kg = imperial ? lbToKg(w) : w;
    if (!(h >= 120 && h <= 230) || !(kg >= 30 && kg <= 250)) {
      setInvalid(true);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
      return;
    }
    patchProfile({ heightCm: round1(h), prePregnancyKg: Math.round(kg * 1000) / 1000 });
    setEditing(false);
    setInvalid(false);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
  };

  // ── Chart ────────────────────────────────────────────────────────────────
  const points = series.map((w) => ({ x: w.at, y: toDisplay(w.kg) }));
  const preShown = pre != null ? toDisplay(pre) : null;
  const bandLo = preShown != null && myRange ? preShown + myRange[0] : undefined;
  const bandHi = preShown != null && myRange ? preShown + myRange[1] : undefined;
  const ys = points.map((pt) => pt.y);
  const pad = imperial ? 4 : 2;
  const yMin = ys.length ? Math.floor(Math.min(...ys, preShown ?? Infinity) - pad) : 0;
  const yMax = ys.length ? Math.ceil(Math.max(...ys, bandHi ?? -Infinity) + pad) : 1;
  const xLabel = (x: number) => {
    const e = series.find((w) => w.at === x);
    return e && e.week > 0 ? t('wt.wk', { n: e.week }) : fmt.short(x);
  };

  const base = pre ?? (series.length > 1 ? series[0].kg : null);
  const change = latest && base != null ? toDisplay(latest.kg) - toDisplay(base) : null;

  return (
    <Page header={<NavBar caption={U(t('tools.weight'))} />} automaticallyAdjustKeyboardInsets keyboardDismissMode="interactive">
      <View style={{ paddingHorizontal: 20, paddingTop: 4 }}>
        <H1>{t('wt.title')}</H1>
        <Body mute style={{ marginTop: 8 }}>
          {t('wt.sub')}
        </Body>
      </View>

      {/* Log */}
      <View style={{ paddingHorizontal: 20, marginTop: 22 }}>
        <Surface>
          <Segmented<Units>
            options={[
              { value: 'metric', label: t('wt.unit.metric') },
              { value: 'imperial', label: t('wt.unit.imperial') },
            ]}
            value={units}
            onChange={(u) => patchProfile({ units: u })}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 18 }}>
            <Eyebrow>{U(t('wt.log'))}</Eyebrow>
            {week > 0 ? <Eyebrow color={colors.terracotta}>{U(t('c.weekN', { n: week }))}</Eyebrow> : null}
          </View>
          <WeightStepper
            value={draft}
            onChange={setDraft}
            min={limits.min}
            max={limits.max}
            bigStep={limits.big}
            unit={unit}
            label={t('wt.a11y.stepper')}
            format={(v) => num(v)}
          />
          <Btn onPress={save} style={{ marginTop: 6 }}>
            {saved ? `✓ ${t('wt.saved')}` : t('wt.save')}
          </Btn>
        </Surface>
      </View>

      {/* Latest + change */}
      {latest ? (
        <View style={{ paddingHorizontal: 20, marginTop: 14 }}>
          <Surface style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
            <View style={{ flex: 1 }}>
              <Eyebrow>{U(t('wt.latest'))}</Eyebrow>
              <Text style={{ fontFamily: fonts.display, fontSize: 28, color: colors.ink, marginTop: 2, letterSpacing: -0.4 }}>
                {showKg(latest.kg)}
              </Text>
              <Text style={{ fontFamily: fonts.body, fontSize: 13, color: colors.mute }}>
                {[latest.week > 0 ? t('c.weekN', { n: latest.week }) : null, dayLabel(latest.at)].filter(Boolean).join(' · ')}
              </Text>
            </View>
            {change != null ? (
              <View style={{ alignItems: 'flex-end', maxWidth: '50%' }}>
                <Text style={{ fontFamily: fonts.display, fontSize: 22, color: colors.ink }}>{signed(change)}</Text>
                <Text style={{ fontFamily: fonts.body, fontSize: 12.5, color: colors.mute, textAlign: 'right' }}>
                  {t(pre != null ? 'wt.since.pre' : 'wt.since.first')}
                </Text>
              </View>
            ) : null}
          </Surface>
        </View>
      ) : null}

      {/* Chart */}
      <View style={{ marginTop: 28 }}>
        <SectionTitle title={t('wt.chart')} />
        <View style={{ paddingHorizontal: 20 }}>
          <Surface>
            {points.length >= 2 ? (
              <>
                <Sparkline
                  points={points}
                  height={180}
                  yMin={yMin}
                  yMax={yMax}
                  rangeMin={bandLo}
                  rangeMax={bandHi}
                  xLabel={xLabel}
                />
                {bandLo != null ? (
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 10 }}>
                    <View style={{ width: 14, height: 10, borderRadius: 3, backgroundColor: colors.sage, opacity: 0.25 }} />
                    <Text style={{ flex: 1, fontFamily: fonts.body, fontSize: 12.5, color: colors.mute }}>{t('wt.chartBand')}</Text>
                  </View>
                ) : null}
              </>
            ) : (
              <View style={{ alignItems: 'center', paddingVertical: 18 }}>
                <Icon.scale size={28} color={colors.faint} />
                <Text style={{ fontFamily: fonts.body, fontSize: 14.5, color: colors.mute, marginTop: 8, textAlign: 'center' }}>
                  {t('wt.chartEmpty')}
                </Text>
              </View>
            )}
          </Surface>
        </View>
      </View>

      {/* Recommended range */}
      <View style={{ paddingHorizontal: 20, marginTop: 14 }}>
        {showSetup ? (
          <Animated.View entering={FadeInDown.duration(260)}>
            <Surface>
              <H2 style={{ fontSize: 19, lineHeight: 25 }}>{t('wt.setup.title')}</H2>
              <Body mute style={{ marginTop: 4 }}>
                {t('wt.setup.body')}
              </Body>

              <Eyebrow style={{ marginTop: 16, marginBottom: 8 }}>{U(t('wt.setup.height'))}</Eyebrow>
              {imperial ? (
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <UnitField value={ft} onChangeText={setFt} unit={t('wt.setup.ft')} label={`${t('wt.setup.height')} (${t('wt.setup.ft')})`} />
                  <UnitField value={inch} onChangeText={setInch} unit={t('wt.setup.in')} label={`${t('wt.setup.height')} (${t('wt.setup.in')})`} />
                </View>
              ) : (
                <UnitField value={cm} onChangeText={setCm} unit={t('wt.setup.cm')} label={`${t('wt.setup.height')} (${t('wt.setup.cm')})`} />
              )}

              <Eyebrow style={{ marginTop: 14, marginBottom: 8 }}>{U(t('wt.setup.pre'))}</Eyebrow>
              <UnitField value={preText} onChangeText={setPreText} unit={unit} label={`${t('wt.setup.pre')} (${unit})`} decimal />

              {invalid ? (
                <Text style={{ fontFamily: fonts.body, fontSize: 13.5, color: colors.danger, marginTop: 10 }}>{t('wt.setup.invalid')}</Text>
              ) : null}

              <View style={{ flexDirection: 'row', gap: 10, marginTop: 16 }}>
                {editing && bmi != null ? (
                  <Btn kind="secondary" onPress={() => setEditing(false)} style={{ flex: 1, height: 50 }}>
                    {t('c.cancel')}
                  </Btn>
                ) : null}
                <Btn onPress={saveSetup} style={{ flex: 1, height: 50 }}>
                  {t('wt.setup.save')}
                </Btn>
              </View>
            </Surface>
          </Animated.View>
        ) : band && bmi != null ? (
          <Surface>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12 }}>
              <H2 style={{ flex: 1, fontSize: 19, lineHeight: 25 }}>{t(twins ? 'wt.range.twinsTitle' : 'wt.range.title')}</H2>
              <Pressable onPress={() => setEditing(true)} accessibilityRole="button" accessibilityLabel={t('c.edit')} hitSlop={10}>
                <Text style={{ fontFamily: fonts.bodyBold, fontSize: 14, color: colors.terracotta, marginTop: 3 }}>{t('c.edit')}</Text>
              </Pressable>
            </View>
            <Text style={{ fontFamily: fonts.body, fontSize: 13.5, color: colors.mute, marginTop: 4 }}>
              {t('wt.range.bmi', { bmi: num(bmi) })}
            </Text>

            <View style={{ marginTop: 12, gap: 2 }}>
              {IOM.map((b) => {
                const r = rangeFor(b);
                const mine = b.key === band.key;
                const value = r ? t('wt.range.value', { lo: num(r[0], 1, 0), hi: num(r[1], 1, 0), unit }) : t('wt.range.noData');
                return (
                  <View
                    key={b.key}
                    accessible
                    accessibilityLabel={`${bandLabel[b.key]}: ${value}${mine ? `. ${t('wt.range.yours')}` : ''}`}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                      paddingVertical: 10,
                      paddingHorizontal: 12,
                      borderRadius: 14,
                      backgroundColor: mine ? colors.sageSoft : 'transparent',
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontFamily: mine ? fonts.bodyBold : fonts.body, fontSize: 14.5, color: colors.ink }}>{bandLabel[b.key]}</Text>
                      {mine ? (
                        <Text style={{ fontFamily: fonts.bodyBold, fontSize: 11.5, color: tint.sage.fg, marginTop: 1 }}>{t('wt.range.yours')}</Text>
                      ) : null}
                    </View>
                    <Text style={{ fontFamily: fonts.bodyBold, fontSize: 14.5, color: mine ? tint.sage.fg : colors.ink2, textAlign: 'right', flexShrink: 1 }}>
                      {value}
                    </Text>
                  </View>
                );
              })}
            </View>

            <Body style={{ marginTop: 12 }}>{t('wt.range.note')}</Body>
            {!twins ? (
              <Text style={{ fontFamily: fonts.body, fontSize: 13, lineHeight: 18, color: colors.mute, marginTop: 8 }}>{t('wt.range.twinsNote')}</Text>
            ) : null}
            <Eyebrow style={{ marginTop: 14, marginBottom: 2 }}>{U(t('c.sources'))}</Eyebrow>
            {SOURCES.map((s) => (
              <SourceLink key={s.url} name={s.name} url={s.url} />
            ))}
          </Surface>
        ) : null}
      </View>

      {/* History */}
      {desc.length ? (
        <View style={{ marginTop: 28 }}>
          <SectionTitle title={t('wt.history')} />
          <View style={{ paddingHorizontal: 20 }}>
            <Surface padded={false}>
              {desc.slice(0, 20).map((w, i, arr) => {
                const older = desc[i + 1];
                const delta = older ? toDisplay(w.kg) - toDisplay(older.kg) : null;
                return (
                  <Row
                    key={w.id}
                    chevron={false}
                    last={i === arr.length - 1}
                    title={showKg(w.kg)}
                    sub={[w.week > 0 ? t('c.weekN', { n: w.week }) : null, dayLabel(w.at)].filter(Boolean).join(' · ')}
                    right={
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        {delta != null ? (
                          <Text style={{ fontFamily: fonts.body, fontSize: 13, color: colors.mute }}>{signed(delta)}</Text>
                        ) : null}
                        <Pressable
                          onPress={() => confirmDelete(w)}
                          accessibilityRole="button"
                          accessibilityLabel={t('wt.a11y.delete', { date: fmt.short(w.at) })}
                          hitSlop={8}
                          style={({ pressed }) => ({ width: 36, height: 36, alignItems: 'center', justifyContent: 'center', opacity: pressed ? 0.5 : 1 })}
                        >
                          <Icon.trash size={18} color={colors.faint} />
                        </Pressable>
                      </View>
                    }
                  />
                );
              })}
            </Surface>
          </View>
        </View>
      ) : null}

      <MedicalNote text={t('c.medicalNote')} />
    </Page>
  );
}

/** Accessible ±0.1 stepper with long-press acceleration and locale-aware digits. */
function WeightStepper({
  value,
  onChange,
  min,
  max,
  bigStep,
  unit,
  label,
  format,
}: {
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  bigStep: number;
  unit: string;
  label: string;
  format: (v: number) => string;
}) {
  const valueRef = useRef(value);
  valueRef.current = value;
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const clamp = (v: number) => Math.min(max, Math.max(min, round1(v)));
  const stop = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  };
  useEffect(() => stop, []);

  const nudge = (d: number) => {
    Haptics.selectionAsync().catch(() => {});
    onChange(clamp(valueRef.current + d));
  };
  const repeat = (d: number) => {
    stop();
    let v = valueRef.current;
    timer.current = setInterval(() => {
      v = clamp(v + d);
      onChange(v);
    }, 100);
  };

  const btn = (d: number, child: React.ReactNode) => (
    <Pressable
      onPress={() => nudge(d)}
      onLongPress={() => repeat(d > 0 ? bigStep : -bigStep)}
      onPressOut={stop}
      style={({ pressed }) => ({
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: pressed ? colors.sand : colors.surface,
        borderWidth: 1,
        borderColor: colors.line,
        alignItems: 'center',
        justifyContent: 'center',
      })}
    >
      {child}
    </Pressable>
  );

  return (
    <View
      accessible
      accessibilityRole="adjustable"
      accessibilityLabel={label}
      accessibilityValue={{ text: `${format(value)} ${unit}` }}
      accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
      onAccessibilityAction={(e) => {
        if (e.nativeEvent.actionName === 'increment') nudge(0.1);
        if (e.nativeEvent.actionName === 'decrement') nudge(-0.1);
      }}
      style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12 }}
    >
      {btn(-0.1, <Icon.minus size={22} color={colors.ink} />)}
      <View style={{ alignItems: 'center', flex: 1 }}>
        <Text style={{ fontFamily: fonts.display, fontSize: 54, color: colors.ink, letterSpacing: -1.2 }} allowFontScaling={false}>
          {format(value)}
        </Text>
        <Text style={{ fontFamily: fonts.bodyBold, fontSize: 13, color: colors.mute, marginTop: -4 }}>{unit}</Text>
      </View>
      {btn(0.1, <Icon.plus size={22} color={colors.ink} />)}
    </View>
  );
}

function UnitField({
  value,
  onChangeText,
  unit,
  label,
  decimal,
}: {
  value: string;
  onChangeText: (s: string) => void;
  unit: string;
  label: string;
  decimal?: boolean;
}) {
  return (
    <View style={{ flex: 1 }}>
      <Field
        value={value}
        onChangeText={(s) => onChangeText(s.replace(/[^\d.,]/g, ''))}
        keyboardType={decimal ? 'decimal-pad' : 'number-pad'}
        returnKeyType="done"
        maxLength={6}
        accessibilityLabel={label}
        style={{ paddingRight: 52 }}
      />
      <View pointerEvents="none" style={{ position: 'absolute', right: 16, top: 0, bottom: 0, justifyContent: 'center' }}>
        <Text style={{ fontFamily: fonts.bodyBold, fontSize: 14, color: colors.mute }}>{unit}</Text>
      </View>
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
