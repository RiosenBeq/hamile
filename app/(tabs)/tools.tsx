// Tools hub — every tracker and planner, grouped. Core tools are free;
// Plus-only extras are marked with a small badge.

import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@/components/Icon';
import { Eyebrow, H1, IconBadge, TintKey, shadow } from '@/components/ui';
import { usePlus } from '@/lib/purchases';
import { useT } from '@/i18n';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

type IconCmp = React.ComponentType<{ size?: number; color?: string }>;
type Tool = { key: string; route: string; icon: IconCmp; hue: TintKey; plus?: boolean };

const GROUPS: { title: string; tools: Tool[] }[] = [
  {
    title: 'tools.group.track',
    tools: [
      { key: 'kicks', route: '/tools/kick-counter', icon: Icon.foot, hue: 'lavender' },
      { key: 'contractions', route: '/tools/contractions', icon: Icon.wave, hue: 'rose' },
      { key: 'weight', route: '/tools/weight', icon: Icon.scale, hue: 'sage' },
      { key: 'mood', route: '/tools/symptoms', icon: Icon.smile, hue: 'amber' },
      { key: 'water', route: '/tools/water', icon: Icon.drop, hue: 'sky' },
      { key: 'vitamins', route: '/tools/vitamins', icon: Icon.pill, hue: 'rose' },
    ],
  },
  {
    title: 'tools.group.prepare',
    tools: [
      { key: 'appointments', route: '/appointments', icon: Icon.stethoscope, hue: 'rose' },
      { key: 'checklist', route: '/tools/checklist', icon: Icon.list, hue: 'amber' },
      { key: 'bag', route: '/tools/hospital-bag', icon: Icon.bag, hue: 'sand' },
      { key: 'birthPlan', route: '/tools/birth-plan', icon: Icon.edit, hue: 'lavender' },
      { key: 'names', route: '/tools/names', icon: Icon.star, hue: 'rose' },
    ],
  },
  {
    title: 'tools.group.wellbeing',
    tools: [
      { key: 'symptomGuide', route: '/symptoms', icon: Icon.help, hue: 'lavender' },
      { key: 'breathing', route: '/tools/breathing', icon: Icon.leaf, hue: 'sky' },
      { key: 'kegel', route: '/tools/kegel', icon: Icon.flower, hue: 'sage' },
    ],
  },
  {
    title: 'tools.group.keep',
    tools: [
      { key: 'bump', route: '/bump', icon: Icon.camera, hue: 'rose' },
      { key: 'partner', route: '/partner', icon: Icon.people, hue: 'sage' },
      { key: 'report', route: '/pdf', icon: Icon.download, hue: 'amber', plus: true },
    ],
  },
];

export default function Tools() {
  const t = useT();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const plus = usePlus();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.base }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: insets.top + 8, paddingBottom: insets.bottom + 130 }}
    >
      <View style={{ paddingHorizontal: 20 }}>
        <Eyebrow>{t('tools.eyebrow')}</Eyebrow>
        <H1 style={{ marginTop: 6 }}>{t('tools.heading')}</H1>
      </View>

      {GROUPS.map((g) => (
        <View key={g.title} style={{ marginTop: 26 }}>
          <Eyebrow style={{ paddingHorizontal: 24, marginBottom: 10 }}>{t(g.title)}</Eyebrow>
          <View style={{ paddingHorizontal: 20, flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
            {g.tools.map((tool) => (
              <Pressable
                key={tool.key}
                onPress={() => router.push(tool.route as any)}
                accessibilityRole="button"
                accessibilityLabel={t(`tools.${tool.key}`)}
                style={({ pressed }) => ({
                  width: '48%',
                  flexGrow: 1,
                  minHeight: 128,
                  backgroundColor: colors.surface,
                  borderRadius: 22,
                  padding: 16,
                  transform: [{ scale: pressed ? 0.98 : 1 }],
                  ...shadow.card,
                })}
              >
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <IconBadge icon={tool.icon} hue={tool.hue} size={42} />
                  {tool.plus && !plus ? (
                    <View style={{ backgroundColor: colors.ink, borderRadius: 999, paddingHorizontal: 8, paddingVertical: 3 }}>
                      <Text style={{ color: '#FFF6EE', fontFamily: fonts.bodyBold, fontSize: 10.5, letterSpacing: 0.6 }}>PLUS</Text>
                    </View>
                  ) : null}
                </View>
                <Text style={{ fontFamily: fonts.bodyBold, fontSize: 15, color: colors.ink, marginTop: 12 }}>{t(`tools.${tool.key}`)}</Text>
                <Text style={{ fontFamily: fonts.body, fontSize: 12.5, color: colors.mute, marginTop: 3, lineHeight: 17 }} numberOfLines={2}>
                  {t(`tools.${tool.key}.sub`)}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
