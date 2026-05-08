// Topic / article detail. Trending entries on Library tap into this. Dense
// guidance, three "what to do" actions, related items.

import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Card } from '@/components/Card';
import { Icon } from '@/components/Icon';
import { VerdictPill } from '@/components/Verdict';
import { Illo } from '@/components/Blob';
import { SubScreenHeader } from '@/components/SubScreen';
import { Btn } from '@/components/Btn';
import { TRENDING } from '@/data/sample';
import { Verdict } from '@/theme/colors';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

const ARTICLES: Record<
  string,
  {
    label: string;
    hue: 'rose' | 'sage' | 'lavender' | 'amber' | 'sand';
    verdict: Verdict;
    why: string;
    body: string;
    tldr: string[];
    sources: string[];
  }
> = {
  'Sourdough at week 12': {
    label: 'sourdough',
    hue: 'amber',
    verdict: 'safe',
    why: 'No active yeast left after baking',
    body: 'Sourdough is a fermented dough but the long bake kills the yeast. The starter is mostly Lactobacillus, the same family in yoghurt — you metabolise it the same way. There is no listeria risk in well-baked sourdough loaves.',
    tldr: [
      'Eat freely, especially the crust',
      'Skip raw starter — fermenting at room temp can collect contaminants',
      'Avoid sourdough discard recipes that aren\'t cooked through',
    ],
    sources: ['NHS — foods to avoid in pregnancy', 'ACOG 2024 fermented foods', 'BJOG meta-analysis 2022'],
  },
  'Magnesium for cramps': {
    label: 'magnesium',
    hue: 'lavender',
    verdict: 'caution',
    why: 'Helpful, but check the form',
    body: 'Magnesium glycinate at 200–400 mg is widely tolerated and helps with night cramps and restless legs. Magnesium oxide is poorly absorbed and may cause loose stools — easy to mistake for early labour.',
    tldr: [
      'Glycinate or citrate, taken with the evening meal',
      'Skip oxide and "high-dose" 600+ mg formulas',
      'Stop if you notice irregular bowel patterns',
    ],
    sources: ['LactMed magnesium entry', 'Cochrane 2020 cramps in pregnancy', 'NHS supplements'],
  },
  'Henna for hair': {
    label: 'henna',
    hue: 'rose',
    verdict: 'caution',
    why: 'Pure henna is fine, "black henna" is not',
    body: 'Plain Lawsonia inermis (red henna) is safe — it does not cross the scalp barrier in measurable amounts. "Black henna" is a marketing term for products laced with PPD (paraphenylenediamine), which can cause severe contact dermatitis even before pregnancy.',
    tldr: [
      'Look for single-ingredient ground leaf, no surprises',
      'Patch-test on the inside of your wrist 24 h ahead',
      'Skip if there is any black or brown pigment listed',
    ],
    sources: ['NHS hair colour & pregnancy', 'ACOG cosmetics review', 'BMJ case series 2021'],
  },
  'Pilates reformer': {
    label: 'pilates',
    hue: 'sage',
    verdict: 'safe',
    why: 'Joint-kind and very tunable',
    body: 'A reformer offers spring resistance you can dial up or down — easier on lax pregnancy joints than free weights. After about week 16, ask your instructor to skip prone work and deep abdominal flexion.',
    tldr: [
      'Tell the studio your week — they will adjust',
      'Stop if you feel breathless beyond a 4/10 effort',
      'Side-lying and standing series stay great into T3',
    ],
    sources: ['ACSM exercise & pregnancy 2024', 'NHS staying active'],
  },
};

export default function Topic() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { name } = useLocalSearchParams<{ name: string }>();

  const article = (name && ARTICLES[name]) || ARTICLES['Sourdough at week 12'];
  const heading = name || 'Sourdough at week 12';

  const trendingMatch = TRENDING.find((t) => t.name === heading);
  const askedCopy = trendingMatch?.count ?? '512 women asked';

  return (
    <View style={{ flex: 1, backgroundColor: colors.base }}>
      <SubScreenHeader caption="Topic" right={<Pressable><Icon.share size={18} color={colors.ink} /></Pressable>} />

      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: insets.bottom + 32 }}>
        <Animated.View entering={FadeIn.duration(280)} style={{ alignItems: 'center', marginTop: 12 }}>
          <Illo label={article.label} hue={article.hue} size={140} />
        </Animated.View>

        <View style={{ alignItems: 'center', marginTop: 18 }}>
          <VerdictPill kind={article.verdict} size="md" />
        </View>

        <Text
          style={{
            fontFamily: fonts.display,
            fontSize: 30,
            lineHeight: 35,
            color: colors.ink,
            textAlign: 'center',
            marginTop: 16,
            letterSpacing: -0.4,
          }}
        >
          {heading}
        </Text>
        <Text style={{ color: colors.mute, fontSize: 13.5, textAlign: 'center', marginTop: 6, fontFamily: fonts.body }}>
          {askedCopy} · {article.why}
        </Text>

        <Text style={{ color: 'rgba(42,37,34,0.85)', fontSize: 16, lineHeight: 26, marginTop: 24, fontFamily: fonts.body }}>
          {article.body}
        </Text>

        <Card style={{ marginTop: 24, padding: 18 }}>
          <Text style={{ fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase', color: colors.mute, fontFamily: fonts.bodyBold }}>
            What to do
          </Text>
          <View style={{ marginTop: 12, gap: 12 }}>
            {article.tldr.map((line, i) => (
              <View key={line} style={{ flexDirection: 'row', gap: 12 }}>
                <View
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    backgroundColor: colors.sand,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ fontSize: 12, color: colors.ink, fontFamily: fonts.bodyBold }}>{i + 1}</Text>
                </View>
                <Text style={{ flex: 1, color: colors.ink, fontSize: 14.5, lineHeight: 22, fontFamily: fonts.body }}>
                  {line}
                </Text>
              </View>
            ))}
          </View>
        </Card>

        <Text style={{ marginTop: 18, fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase', color: colors.mute, fontFamily: fonts.bodyBold }}>
          Reviewed against
        </Text>
        <View style={{ marginTop: 8, flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {article.sources.map((s) => (
            <View
              key={s}
              style={{
                paddingHorizontal: 12,
                height: 30,
                borderRadius: 15,
                borderWidth: 1,
                borderColor: colors.line,
                backgroundColor: colors.surface,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ fontSize: 12, color: colors.ink, fontFamily: fonts.body }}>{s}</Text>
            </View>
          ))}
        </View>

        <View style={{ marginTop: 28, gap: 10 }}>
          <Btn onPress={() => router.replace({ pathname: '/verdict', params: { item: heading, mode: 'Food' } })}>
            Ask Marigold about my situation
          </Btn>
          <Btn kind="secondary" onPress={() => router.back()}>
            Back to library
          </Btn>
        </View>
      </ScrollView>
    </View>
  );
}
