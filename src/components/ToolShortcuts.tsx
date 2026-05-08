// Week-aware horizontal row of tool shortcuts. Used on Home, just under the
// week ring + intention. Each card is 120×120, watercolor Illo + label.

import React, { useMemo } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Illo } from '@/components/Blob';
import { Hue } from '@/theme/colors';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

type Tool = { route: string; label: string; hue: Hue };

const ALL: Record<string, Tool> = {
  kick: { route: '/tools/kick-counter', label: 'Kick counter', hue: 'lavender' },
  contractions: { route: '/tools/contractions', label: 'Contractions', hue: 'rose' },
  weight: { route: '/tools/weight', label: 'Weight', hue: 'sage' },
  symptoms: { route: '/tools/symptoms', label: 'Symptoms', hue: 'rose' },
  bag: { route: '/tools/hospital-bag', label: 'Hospital bag', hue: 'amber' },
  birthPlan: { route: '/tools/birth-plan', label: 'Birth plan', hue: 'sand' },
};

function pickByWeek(week: number): Tool[] {
  if (week >= 36) return ['contractions', 'bag', 'birthPlan', 'kick'].map((k) => ALL[k]);
  if (week >= 28) return ['kick', 'contractions', 'weight', 'symptoms', 'bag'].map((k) => ALL[k]);
  if (week >= 14) return ['kick', 'symptoms', 'weight', 'bag'].map((k) => ALL[k]);
  return ['symptoms', 'weight', 'bag', 'birthPlan'].map((k) => ALL[k]);
}

export function ToolShortcuts({ week }: { week: number }) {
  const router = useRouter();
  const tools = useMemo(() => pickByWeek(week), [week]);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 12, paddingHorizontal: 24 }}
    >
      {tools.map((t) => (
        <Pressable
          key={t.route}
          onPress={() => router.push(t.route as any)}
          style={{
            width: 120,
            height: 120,
            backgroundColor: colors.surface,
            borderRadius: 20,
            padding: 14,
            justifyContent: 'space-between',
            shadowColor: colors.ink,
            shadowOpacity: 0.08,
            shadowRadius: 16,
            shadowOffset: { width: 0, height: 4 },
          }}
        >
          <Illo label={t.label} hue={t.hue} size={48} />
          <Text style={{ fontSize: 13, color: colors.ink, fontFamily: fonts.bodyBold }}>{t.label}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

export const TOOLS_GRID: Tool[] = [
  ALL.kick,
  ALL.contractions,
  ALL.weight,
  ALL.symptoms,
  ALL.bag,
  ALL.birthPlan,
];
