// Restaurant Menu mode — read the whole menu at once, with a three-way tally
// at the top and tap-through to the verdict for any dish.

import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card } from '@/components/Card';
import { Icon } from '@/components/Icon';
import { VerdictDot } from '@/components/Verdict';
import { SAMPLE_MENU } from '@/data/sample';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

export default function MenuMode() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const tally = SAMPLE_MENU.reduce(
    (a, d) => ({ ...a, [d.verdict]: (a as any)[d.verdict] + 1 }),
    { safe: 0, caution: 0, avoid: 0 } as Record<'safe' | 'caution' | 'avoid', number>,
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.base }}>
      <View style={{ paddingTop: insets.top + 8, paddingHorizontal: 20, paddingBottom: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Pressable
          onPress={() => router.back()}
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            borderWidth: 1,
            borderColor: colors.line,
            backgroundColor: colors.surface,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon.back size={18} color={colors.ink} />
        </Pressable>
        <Text style={{ fontSize: 12, letterSpacing: 1.6, textTransform: 'uppercase', color: colors.mute, fontFamily: fonts.bodyBold }}>Menu read</Text>
        <Pressable
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            borderWidth: 1,
            borderColor: colors.line,
            backgroundColor: colors.surface,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon.share size={18} color={colors.ink} />
        </Pressable>
      </View>

      <View style={{ paddingHorizontal: 24, paddingTop: 8 }}>
        <Text style={{ fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase', color: colors.mute, fontFamily: fonts.bodyBold }}>
          Trattoria Anna · Tuesday
        </Text>
        <Text style={{ marginTop: 4, fontFamily: fonts.display, fontSize: 28, color: colors.ink, letterSpacing: -0.4 }}>
          We read the menu.
        </Text>

        <View style={{ marginTop: 14, flexDirection: 'row', gap: 16, alignItems: 'center' }}>
          {(['safe', 'caution', 'avoid'] as const).map((k) => (
            <View key={k} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <VerdictDot kind={k} />
              <Text style={{ fontSize: 13, color: colors.ink, fontFamily: fonts.body }}>
                {tally[k]} {k}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <ScrollView style={{ marginTop: 18 }} contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: insets.bottom + 32 }}>
        <Card>
          {SAMPLE_MENU.map((d, i) => (
            <View key={d.name}>
              <Pressable
                onPress={() =>
                  router.replace({ pathname: '/verdict', params: { item: d.name, mode: 'Food' } })
                }
                style={{ padding: 16, flexDirection: 'row', alignItems: 'flex-start', gap: 12 }}
              >
                <View style={{ paddingTop: 6 }}>
                  <VerdictDot kind={d.verdict} />
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                    <Text style={{ fontSize: 15.5, color: colors.ink, fontFamily: fonts.body, flex: 1 }}>{d.name}</Text>
                    <Text style={{ fontSize: 13, color: colors.mute, fontFamily: fonts.body }}>{d.sub}</Text>
                  </View>
                  {d.why ? (
                    <Text style={{ fontSize: 12.5, color: colors.mute, marginTop: 2, fontFamily: fonts.body }}>{d.why}</Text>
                  ) : null}
                </View>
                <Icon.chevR size={18} color={colors.mute} />
              </Pressable>
              {i < SAMPLE_MENU.length - 1 ? (
                <View style={{ height: 1, backgroundColor: colors.line, marginLeft: 16 }} />
              ) : null}
            </View>
          ))}
        </Card>
      </ScrollView>
    </View>
  );
}
