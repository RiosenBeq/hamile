// Weight tracker. Stepper to log a fresh entry; sparkline shows the curve.
// Healthy band derived from pre-pregnancy BMI (kg/m²) using Institute of
// Medicine ranges. We never lecture — the band is shown softly behind the
// line, not as a verdict.

import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Btn } from '@/components/Btn';
import { Card, SectionHead } from '@/components/Card';
import { Stepper } from '@/components/Stepper';
import { Sparkline } from '@/components/charts/Sparkline';
import { SubScreenHeader } from '@/components/SubScreen';
import { useAppStore, type WeightEntry } from '@/store/useAppStore';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

// IOM 2009 recommended total weight gain ranges by pre-pregnancy BMI.
function gainRange(bmi: number): { lo: number; hi: number } {
  if (!bmi || isNaN(bmi)) return { lo: 11.5, hi: 16 }; // assume healthy weight
  if (bmi < 18.5) return { lo: 12.5, hi: 18 };
  if (bmi < 25) return { lo: 11.5, hi: 16 };
  if (bmi < 30) return { lo: 7, hi: 11.5 };
  return { lo: 5, hi: 9 };
}

// Convert "weeks → expected weight" into the rough trajectory line.
// Most weight is gained from week 13 onward (~0.4 kg/week in healthy BMI).
function expectedAt(week: number, prePregKg: number, range: { lo: number; hi: number }): { lo: number; hi: number } {
  const fraction = Math.max(0, Math.min(1, (week - 4) / 36));
  const tmrLo = fraction * range.lo;
  const tmrHi = fraction * range.hi;
  return { lo: prePregKg + tmrLo, hi: prePregKg + tmrHi };
}

export default function WeightTracker() {
  const insets = useSafeAreaInsets();
  const profile = useAppStore((s) => s.profile);
  const weights = useAppStore((s) => s.weights);
  const addWeight = useAppStore((s) => s.addWeight);
  const removeWeight = useAppStore((s) => s.removeWeight);
  const patchProfile = useAppStore((s) => s.patchProfile);

  const lastKg = weights[0]?.kg ?? profile.prePregnancyKg ?? 65;
  const [draft, setDraft] = useState<number>(+lastKg);

  const heightCm = profile.heightCm ?? 165;
  const heightM = heightCm / 100;
  const prePregKg = profile.prePregnancyKg ?? lastKg;
  const bmi = prePregKg / (heightM * heightM);
  const totalRange = gainRange(bmi);
  const expectedNow = expectedAt(profile.week, prePregKg, totalRange);

  const sortedWeights = useMemo(() => [...weights].sort((a, b) => a.week - b.week), [weights]);
  const points = sortedWeights.map((w) => ({ x: w.week, y: w.kg, label: `Wk ${w.week}` }));

  const onSave = () => {
    const w: WeightEntry = {
      id: `w-${Date.now()}`,
      week: profile.week,
      kg: +draft.toFixed(1),
      at: Date.now(),
    };
    addWeight(w);
    if (!profile.prePregnancyKg) {
      patchProfile({ prePregnancyKg: +draft.toFixed(1) });
    }
  };

  const totalGain = sortedWeights.length
    ? +(sortedWeights[sortedWeights.length - 1].kg - prePregKg).toFixed(1)
    : 0;

  return (
    <View style={{ flex: 1, backgroundColor: colors.base }}>
      <SubScreenHeader caption="Weight" />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: insets.bottom + 32 }}>
        <Text style={{ fontFamily: fonts.display, fontSize: 30, color: colors.ink, letterSpacing: -0.4, marginTop: 8 }}>
          Slow and steady.
        </Text>
        <Text style={{ color: colors.mute, fontSize: 14, marginTop: 8, fontFamily: fonts.body, lineHeight: 20 }}>
          Log it whenever feels right — once a week is plenty. The band shows the IOM healthy gain
          range for your pre-pregnancy BMI.
        </Text>

        <Card style={{ marginTop: 24, padding: 18 }}>
          <Text style={{ fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase', color: colors.mute, fontFamily: fonts.bodyBold }}>
            Week {profile.week}
          </Text>
          <Stepper value={draft} onChange={setDraft} />
          <View style={{ marginTop: 12 }}>
            <Btn onPress={onSave}>Save weight</Btn>
          </View>
        </Card>

        <Card style={{ marginTop: 20, padding: 18 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <Text style={{ fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase', color: colors.mute, fontFamily: fonts.bodyBold }}>
              Total gain
            </Text>
            <Text style={{ fontSize: 13, color: colors.mute, fontFamily: fonts.body }}>
              Healthy range: +{totalRange.lo}–{totalRange.hi} kg total
            </Text>
          </View>
          <Text style={{ fontFamily: fonts.display, fontSize: 36, color: colors.ink, marginTop: 4, letterSpacing: -0.6 }}>
            {totalGain >= 0 ? '+' : ''}
            {totalGain} kg
          </Text>
          <Sparkline
            points={points}
            height={180}
            yMin={Math.min(prePregKg - 1, ...points.map((p) => p.y))}
            yMax={Math.max(prePregKg + totalRange.hi + 2, ...points.map((p) => p.y))}
            rangeMin={expectedNow.lo}
            rangeMax={expectedNow.hi}
            xLabel={(w) => `Wk ${w}`}
          />
        </Card>

        {weights.length > 0 ? (
          <View style={{ marginTop: 28 }}>
            <SectionHead caption="Log" title="Recent entries" />
            <Card>
              {[...weights].slice(0, 6).map((w, i, arr) => (
                <View key={w.id}>
                  <Pressable
                    onLongPress={() => removeWeight(w.id)}
                    style={{ padding: 16, flexDirection: 'row', alignItems: 'center', gap: 14 }}
                  >
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 14.5, color: colors.ink, fontFamily: fonts.bodyBold }}>
                        Week {w.week} · {w.kg.toFixed(1)} kg
                      </Text>
                      <Text style={{ fontSize: 12.5, color: colors.mute, marginTop: 2, fontFamily: fonts.body }}>
                        {new Date(w.at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                      </Text>
                    </View>
                  </Pressable>
                  {i < arr.length - 1 ? <View style={{ height: 1, backgroundColor: colors.line, marginLeft: 16 }} /> : null}
                </View>
              ))}
            </Card>
            <Text style={{ marginTop: 8, fontSize: 12, color: colors.mute, fontFamily: fonts.body, textAlign: 'center' }}>
              Long-press a row to remove.
            </Text>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}
