// 5-step onboarding. Each step gets a soft watercolor blob and parallax-style
// fade-in. Step 0 is the warm welcome with the Marigold mark; step 1 uses
// abstract glyphs for stage selection; step 2 is the calm 40-week slider;
// step 3 is condition chips; step 4 is country picker.

import React, { useState, useMemo } from 'react';
import { ScrollView, Text, View, Pressable } from 'react-native';
import Animated, { FadeInRight, FadeIn, ZoomIn, FadeInUp } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Btn } from '@/components/Btn';
import { Icon } from '@/components/Icon';
import { Blob } from '@/components/Blob';
import { MarigoldMark } from '@/components/MarigoldMark';
import { StageGlyph } from '@/components/StageGlyph';
import { useAppStore } from '@/store/useAppStore';
import { COUNTRIES, CONDITIONS } from '@/data/sample';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';
import { WeekSlider } from '@/components/WeekSlider';

const COUNTRY_FLAG: Record<string, string> = {
  'United Kingdom': '🇬🇧',
  'United States': '🇺🇸',
  France: '🇫🇷',
  Germany: '🇩🇪',
  Japan: '🇯🇵',
  Australia: '🇦🇺',
  Canada: '🇨🇦',
  Italy: '🇮🇹',
  Turkey: '🇹🇷',
};

export default function Onboarding() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState(0);
  const [stage, setStage] = useState<'ttc' | 'pregnant' | 'postpartum'>('pregnant');
  const [dueWeek, setDueWeek] = useState(18);
  const [conditions, setConditions] = useState<Set<string>>(new Set());
  const [country, setCountry] = useState('United Kingdom');

  const setOnboarded = useAppStore((s) => s.setOnboarded);
  const patchProfile = useAppStore((s) => s.patchProfile);

  const next = () => {
    if (step < 4) setStep(step + 1);
    else {
      patchProfile({
        stage,
        week: dueWeek,
        conditions: Array.from(conditions),
        country,
      });
      setOnboarded(true);
      router.replace('/(tabs)');
    }
  };
  const back = () => step > 0 && setStep(step - 1);

  const dueDate = useMemo(() => {
    const d = new Date(Date.now() + (40 - dueWeek) * 7 * 86400000);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  }, [dueWeek]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.base }}>
      {/* Soft warm wash for every step */}
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: step === 0 ? 1 : 0.55 }}>
        <Blob variant={step === 4 ? 'lavender' : 'cream'} />
      </View>

      {/* Progress dots */}
      <View
        style={{
          position: 'absolute',
          top: insets.top + 14,
          left: 0,
          right: 0,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 6,
          zIndex: 10,
        }}
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <View
            key={i}
            style={{
              height: 4,
              width: i === step ? 22 : 6,
              borderRadius: 2,
              backgroundColor: i <= step ? colors.ink : 'rgba(237,228,216,0.8)',
            }}
          />
        ))}
      </View>

      {step === 0 && (
        <Animated.View entering={FadeIn.duration(420)} style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              padding: 28,
              paddingTop: insets.top + 60,
              paddingBottom: insets.bottom + 36,
            }}
          >
            <Animated.View entering={ZoomIn.delay(120).duration(720)} style={{ alignItems: 'center', marginTop: 12 }}>
              <MarigoldMark size={220} />
            </Animated.View>

            <View style={{ flex: 1 }} />

            <Animated.Text
              entering={FadeInUp.delay(420).duration(420)}
              style={{
                fontSize: 11,
                letterSpacing: 1.8,
                textTransform: 'uppercase',
                color: colors.mute,
                fontFamily: fonts.bodyBold,
                marginBottom: 14,
              }}
            >
              Marigold
            </Animated.Text>
            <Animated.Text
              entering={FadeInUp.delay(520).duration(420)}
              style={{
                fontFamily: fonts.display,
                fontSize: 40,
                lineHeight: 42,
                color: colors.ink,
                letterSpacing: -0.6,
              }}
            >
              You don't have to know everything.
            </Animated.Text>
            <Animated.Text
              entering={FadeInUp.delay(620).duration(420)}
              style={{
                fontFamily: fonts.display,
                fontSize: 40,
                lineHeight: 42,
                color: 'rgba(42,37,34,0.55)',
                letterSpacing: -0.6,
                marginTop: 4,
              }}
            >
              We do.
            </Animated.Text>
            <Animated.Text
              entering={FadeInUp.delay(720).duration(420)}
              style={{
                color: colors.mute,
                marginTop: 20,
                fontSize: 15,
                lineHeight: 22,
                maxWidth: 320,
                fontFamily: fonts.body,
              }}
            >
              A calm, second opinion in your pocket. For the next nine months — and beyond.
            </Animated.Text>
            <Animated.View entering={FadeInUp.delay(820).duration(420)} style={{ marginTop: 28 }}>
              <Btn onPress={next}>Begin</Btn>
            </Animated.View>
            <Text
              style={{
                textAlign: 'center',
                marginTop: 14,
                color: colors.mute,
                fontSize: 12,
                fontFamily: fonts.body,
              }}
            >
              This stays on your phone.
            </Text>
          </View>
        </Animated.View>
      )}

      {step === 1 && (
        <Animated.View entering={FadeInRight.duration(280)} style={{ flex: 1, paddingHorizontal: 28, paddingTop: insets.top + 56 }}>
          <Text style={{ fontSize: 11, letterSpacing: 1.8, textTransform: 'uppercase', color: colors.mute, fontFamily: fonts.bodyBold, marginBottom: 12 }}>
            Step 2 of 5
          </Text>
          <Text style={{ fontFamily: fonts.display, fontSize: 30, lineHeight: 35, color: colors.ink, letterSpacing: -0.4 }}>
            Where are you in this?
          </Text>
          <Text style={{ color: colors.mute, marginTop: 12, fontSize: 15, fontFamily: fonts.body }}>
            You can change this anytime.
          </Text>
          <View style={{ marginTop: 24, gap: 12 }}>
            {(
              [
                ['ttc', 'Trying to conceive', 'Gentle prep, no pressure.'],
                ['pregnant', "I'm pregnant", 'Your daily companion.'],
                ['postpartum', 'Postpartum & breastfeeding', 'For the fourth trimester.'],
              ] as const
            ).map(([k, label, sub]) => {
              const sel = stage === k;
              return (
                <Pressable
                  key={k}
                  onPress={() => setStage(k)}
                  style={{
                    padding: 16,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: sel ? colors.terracotta : colors.line,
                    backgroundColor: sel ? 'rgba(232,196,184,0.18)' : colors.surface,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 14,
                  }}
                >
                  <StageGlyph kind={k} size={48} />
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: colors.ink, fontSize: 17, fontFamily: fonts.bodyBold }}>{label}</Text>
                    <Text style={{ color: colors.mute, fontSize: 13, fontFamily: fonts.body, marginTop: 2 }}>{sub}</Text>
                  </View>
                  <View
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 11,
                      borderWidth: 1,
                      borderColor: sel ? colors.terracotta : colors.line,
                      backgroundColor: sel ? colors.terracotta : 'transparent',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {sel ? <Icon.check size={16} color="#fff" /> : null}
                  </View>
                </Pressable>
              );
            })}
          </View>
          <View style={{ flex: 1 }} />
          <View style={{ flexDirection: 'row', gap: 12, paddingBottom: insets.bottom + 24 }}>
            <Btn kind="secondary" onPress={back} style={{ flex: 1 }}>Back</Btn>
            <Btn onPress={next} style={{ flex: 1 }}>Continue</Btn>
          </View>
        </Animated.View>
      )}

      {step === 2 && (
        <Animated.View entering={FadeInRight.duration(280)} style={{ flex: 1, paddingHorizontal: 28, paddingTop: insets.top + 56 }}>
          <Text style={{ fontSize: 11, letterSpacing: 1.8, textTransform: 'uppercase', color: colors.mute, fontFamily: fonts.bodyBold, marginBottom: 12 }}>
            Step 3 of 5
          </Text>
          <Text style={{ fontFamily: fonts.display, fontSize: 30, lineHeight: 35, color: colors.ink, letterSpacing: -0.4 }}>
            When are you due?
          </Text>
          <Text style={{ color: colors.mute, marginTop: 12, fontSize: 15, fontFamily: fonts.body }}>
            We use this only to time the right reminders.
          </Text>
          <WeekSlider value={dueWeek} onChange={setDueWeek} />
          <Text style={{ color: colors.mute, fontSize: 13, marginTop: 18, fontFamily: fonts.body }}>
            Estimated due date: <Text style={{ color: colors.ink }}>{dueDate}</Text>
          </Text>
          <View style={{ flex: 1 }} />
          <View style={{ flexDirection: 'row', gap: 12, paddingBottom: insets.bottom + 24 }}>
            <Btn kind="secondary" onPress={back} style={{ flex: 1 }}>Back</Btn>
            <Btn onPress={next} style={{ flex: 1 }}>Continue</Btn>
          </View>
        </Animated.View>
      )}

      {step === 3 && (
        <Animated.View entering={FadeInRight.duration(280)} style={{ flex: 1, paddingHorizontal: 28, paddingTop: insets.top + 56 }}>
          <Text style={{ fontSize: 11, letterSpacing: 1.8, textTransform: 'uppercase', color: colors.mute, fontFamily: fonts.bodyBold, marginBottom: 12 }}>
            Step 4 of 5
          </Text>
          <Text style={{ fontFamily: fonts.display, fontSize: 30, lineHeight: 35, color: colors.ink, letterSpacing: -0.4 }}>
            Anything we should know?
          </Text>
          <Text style={{ color: colors.mute, marginTop: 12, fontSize: 15, fontFamily: fonts.body }}>
            We tailor advice quietly. Pick any that apply.
          </Text>
          <View style={{ marginTop: 24, flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
            {CONDITIONS.map((o) => {
              const sel = conditions.has(o);
              return (
                <Pressable
                  key={o}
                  onPress={() => {
                    const n = new Set(conditions);
                    if (o === 'None of these') {
                      n.clear();
                      n.add(o);
                    } else {
                      n.delete('None of these');
                      if (sel) n.delete(o);
                      else n.add(o);
                    }
                    setConditions(n);
                  }}
                  style={{
                    paddingHorizontal: 16,
                    height: 44,
                    borderRadius: 22,
                    borderWidth: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: sel ? colors.ink : colors.surface,
                    borderColor: sel ? colors.ink : colors.line,
                  }}
                >
                  <Text style={{ color: sel ? colors.base : colors.ink, fontFamily: fonts.bodyBold, fontSize: 14 }}>{o}</Text>
                </Pressable>
              );
            })}
          </View>
          <View style={{ flex: 1 }} />
          <View style={{ flexDirection: 'row', gap: 12, paddingBottom: insets.bottom + 24 }}>
            <Btn kind="secondary" onPress={back} style={{ flex: 1 }}>Back</Btn>
            <Btn onPress={next} style={{ flex: 1 }}>Continue</Btn>
          </View>
        </Animated.View>
      )}

      {step === 4 && (
        <Animated.View entering={FadeInRight.duration(280)} style={{ flex: 1, paddingHorizontal: 28, paddingTop: insets.top + 56 }}>
          <Text style={{ fontSize: 11, letterSpacing: 1.8, textTransform: 'uppercase', color: colors.mute, fontFamily: fonts.bodyBold, marginBottom: 12 }}>
            Step 5 of 5
          </Text>
          <Text style={{ fontFamily: fonts.display, fontSize: 30, lineHeight: 35, color: colors.ink, letterSpacing: -0.4 }}>
            Where are you?
          </Text>
          <Text style={{ color: colors.mute, marginTop: 12, fontSize: 15, fontFamily: fonts.body }}>
            Food rules vary by country. We tune to where you eat.
          </Text>

          <View
            style={{
              marginTop: 22,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              paddingHorizontal: 16,
              height: 52,
              borderRadius: 14,
              backgroundColor: colors.surface,
              borderWidth: 1,
              borderColor: colors.line,
            }}
          >
            <Text style={{ fontSize: 22 }}>{COUNTRY_FLAG[country] ?? '🌍'}</Text>
            <Text style={{ fontSize: 15, color: colors.ink, fontFamily: fonts.bodyBold }}>{country}</Text>
            <Text style={{ marginLeft: 'auto', fontSize: 12, color: colors.mute, fontFamily: fonts.body }}>Auto-detected</Text>
          </View>

          <ScrollView
            style={{
              marginTop: 12,
              maxHeight: 320,
              backgroundColor: colors.surface,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: colors.line,
            }}
            contentContainerStyle={{ paddingVertical: 4 }}
          >
            {COUNTRIES.map((c) => (
              <Pressable
                key={c}
                onPress={() => setCountry(c)}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 14,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12,
                  borderBottomColor: colors.line,
                  borderBottomWidth: 1,
                }}
              >
                <Text style={{ fontSize: 18 }}>{COUNTRY_FLAG[c] ?? '🌍'}</Text>
                <Text style={{ flex: 1, fontSize: 15, color: c === country ? colors.terracotta : colors.ink, fontFamily: fonts.body }}>{c}</Text>
                {c === country ? <Icon.check size={18} color={colors.terracotta} /> : null}
              </Pressable>
            ))}
          </ScrollView>

          <View style={{ flex: 1 }} />
          <View style={{ flexDirection: 'row', gap: 12, paddingBottom: insets.bottom + 24 }}>
            <Btn kind="secondary" onPress={back} style={{ flex: 1 }}>Back</Btn>
            <Btn onPress={next} style={{ flex: 1 }}>Done</Btn>
          </View>
        </Animated.View>
      )}
    </View>
  );
}
