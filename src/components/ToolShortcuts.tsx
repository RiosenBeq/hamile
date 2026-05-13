// Week-aware horizontal row of tool shortcuts. Used on Home, just under the
// week ring + intention. Each card is 120×120, watercolor Illo + label.

import React, { useMemo } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Illo } from '@/components/Blob';
import { Hue } from '@/theme/colors';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';
import { useT } from '@/i18n';

type Tool = { route: string; labelKey: string; hue: Hue };

const ALL: Record<string, Tool> = {
  kick: { route: '/tools/kick-counter', labelKey: 'tools.kicks.title', hue: 'lavender' },
  contractions: { route: '/tools/contractions', labelKey: 'tools.contractions.title', hue: 'rose' },
  weight: { route: '/tools/weight', labelKey: 'tools.weight.title', hue: 'sage' },
  symptoms: { route: '/tools/symptoms', labelKey: 'tools.symptoms.title', hue: 'rose' },
  bag: { route: '/tools/hospital-bag', labelKey: 'tools.bag.title', hue: 'amber' },
  birthPlan: { route: '/tools/birth-plan', labelKey: 'tools.birthPlan.title', hue: 'sand' },
};

function pickByWeek(week: number): Tool[] {
  if (week >= 36) return ['contractions', 'bag', 'birthPlan', 'kick'].map((k) => ALL[k]);
  if (week >= 28) return ['kick', 'contractions', 'weight', 'symptoms', 'bag'].map((k) => ALL[k]);
  if (week >= 14) return ['kick', 'symptoms', 'weight', 'bag'].map((k) => ALL[k]);
  return ['symptoms', 'weight', 'bag', 'birthPlan'].map((k) => ALL[k]);
}

export function ToolShortcuts({ week }: { week: number }) {
  const t = useT();
  const router = useRouter();
  const tools = useMemo(() => pickByWeek(week), [week]);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 12, paddingHorizontal: 24 }}
    >
      {tools.map((tool) => {
        const label = t(tool.labelKey);
        return (
          <Pressable
            key={tool.route}
            onPress={() => router.push(tool.route as any)}
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
            <Illo label={label} hue={tool.hue} size={48} />
            <Text style={{ fontSize: 13, color: colors.ink, fontFamily: fonts.bodyBold }}>{label}</Text>
          </Pressable>
        );
      })}
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
