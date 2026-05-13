// Health profile sub-page. Lets the user edit pregnancy stage, due week and
// any conditions we should tailor advice for.

import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Btn } from '@/components/Btn';
import { Icon } from '@/components/Icon';
import { Card } from '@/components/Card';
import { StageGlyph } from '@/components/StageGlyph';
import { WeekSlider } from '@/components/WeekSlider';
import { SubScreenHeader } from '@/components/SubScreen';
import { useAppStore } from '@/store/useAppStore';
import { CONDITIONS } from '@/data/sample';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

export default function HealthSetting() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const profile = useAppStore((s) => s.profile);
  const patchProfile = useAppStore((s) => s.patchProfile);

  const [stage, setStage] = useState(profile.stage);
  const [week, setWeek] = useState(profile.week);
  const [conds, setConds] = useState<Set<string>>(new Set(profile.conditions));

  const save = () => {
    patchProfile({ stage, week, conditions: Array.from(conds) });
    router.back();
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.base }}>
      <SubScreenHeader caption="Health profile" />

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: insets.bottom + 100 }}
      >
        <Text style={{ fontFamily: fonts.display, fontSize: 30, color: colors.ink, letterSpacing: -0.4, marginTop: 8 }}>
          Tune your guidance.
        </Text>
        <Text style={{ color: colors.mute, fontSize: 14, marginTop: 8, fontFamily: fonts.body }}>
          The more we know, the more we can tailor verdicts to your body's
          actual risk profile. None of this leaves your phone.
        </Text>

        <Text style={{ marginTop: 28, fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase', color: colors.mute, fontFamily: fonts.bodyBold, marginBottom: 12 }}>
          Stage
        </Text>
        <View style={{ gap: 10 }}>
          {(
            [
              ['ttc', 'Trying to conceive'],
              ['pregnant', "I'm pregnant"],
              ['postpartum', 'Postpartum & breastfeeding'],
            ] as const
          ).map(([k, label]) => {
            const sel = stage === k;
            return (
              <Pressable
                key={k}
                onPress={() => setStage(k)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 14,
                  padding: 14,
                  borderRadius: 16,
                  backgroundColor: colors.surface,
                  borderWidth: 1,
                  borderColor: sel ? colors.terracotta : colors.line,
                }}
              >
                <StageGlyph kind={k} size={36} />
                <Text style={{ flex: 1, fontSize: 15, color: colors.ink, fontFamily: sel ? fonts.bodyBold : fonts.body }}>
                  {label}
                </Text>
                {sel ? <Icon.check size={18} color={colors.terracotta} /> : null}
              </Pressable>
            );
          })}
        </View>

        {stage === 'pregnant' && (
          <>
            <Text style={{ marginTop: 28, fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase', color: colors.mute, fontFamily: fonts.bodyBold, marginBottom: 12 }}>
              Week
            </Text>
            <WeekSlider value={week} onChange={setWeek} />
          </>
        )}

        <Text style={{ marginTop: 28, fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase', color: colors.mute, fontFamily: fonts.bodyBold, marginBottom: 12 }}>
          Conditions
        </Text>
        <Card style={{ padding: 16 }}>
          <Text style={{ fontSize: 13, color: colors.mute, fontFamily: fonts.body, marginBottom: 12 }}>
            Pick any that apply. We use these only to highlight relevant warnings.
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {CONDITIONS.map((o) => {
              const sel = conds.has(o);
              return (
                <Pressable
                  key={o}
                  onPress={() => {
                    const n = new Set(conds);
                    if (o === 'None of these') {
                      n.clear();
                      n.add(o);
                    } else {
                      n.delete('None of these');
                      if (sel) n.delete(o);
                      else n.add(o);
                    }
                    setConds(n);
                  }}
                  style={{
                    paddingHorizontal: 14,
                    height: 36,
                    borderRadius: 18,
                    borderWidth: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: sel ? colors.ink : colors.surface,
                    borderColor: sel ? colors.ink : colors.line,
                  }}
                >
                  <Text style={{ color: sel ? colors.base : colors.ink, fontFamily: fonts.bodyBold, fontSize: 13 }}>
                    {o}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </Card>
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          paddingHorizontal: 24,
          paddingTop: 12,
          paddingBottom: insets.bottom + 16,
          backgroundColor: colors.base,
          borderTopWidth: 1,
          borderTopColor: colors.line,
        }}
      >
        <Btn onPress={save}>Save</Btn>
      </View>
    </View>
  );
}
