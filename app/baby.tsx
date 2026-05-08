// Baby development sheet — abstract drift-floating illustration plus the
// week's fruit metaphor and three measurements.

import React, { useMemo } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card } from '@/components/Card';
import { Icon } from '@/components/Icon';
import { Illo } from '@/components/Blob';
import { Drift } from '@/components/Drift';
import { useAppStore } from '@/store/useAppStore';
import { WEEK_METAPHORS } from '@/data/sample';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

export default function BabySheet() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const profile = useAppStore((s) => s.profile);
  const meta = useMemo(
    () => WEEK_METAPHORS[profile.week] ?? WEEK_METAPHORS[18],
    [profile.week],
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.base }}>
      <View
        style={{
          paddingTop: insets.top + 8,
          paddingHorizontal: 20,
          paddingBottom: 12,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottomWidth: 1,
          borderBottomColor: colors.line,
        }}
      >
        <Text style={{ fontSize: 12, letterSpacing: 1.6, textTransform: 'uppercase', color: colors.mute, fontFamily: fonts.bodyBold }}>
          Week {profile.week}
        </Text>
        <Pressable onPress={() => router.back()}>
          <Icon.close size={20} color={colors.ink} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 28, paddingBottom: 80 }}>
        <Drift>
          <View style={{ alignItems: 'center' }}>
            <Illo label="baby" hue="lavender" size={180} />
          </View>
        </Drift>
        <Text
          style={{
            marginTop: 28,
            fontFamily: fonts.display,
            fontSize: 30,
            color: colors.ink,
            textAlign: 'center',
            lineHeight: 35,
            letterSpacing: -0.4,
          }}
        >
          {meta.fruit.replace(/^(a|an) /, (m) => m[0].toUpperCase() + m.slice(1))}
        </Text>
        <Text
          style={{
            fontFamily: fonts.display,
            fontSize: 22,
            color: 'rgba(42,37,34,0.55)',
            textAlign: 'center',
            marginTop: 4,
          }}
        >
          about {meta.length}
        </Text>

        <Text
          style={{
            color: colors.mute,
            fontSize: 15,
            lineHeight: 22,
            marginTop: 20,
            textAlign: 'center',
            maxWidth: 300,
            alignSelf: 'center',
            fontFamily: fonts.body,
          }}
        >
          {meta.note}
        </Text>

        <View style={{ marginTop: 32, flexDirection: 'row', gap: 12 }}>
          {[
            ['Length', meta.length],
            ['Weight', meta.weight],
            ['Heart rate', meta.hr],
          ].map(([k, v]) => (
            <Card key={k} style={{ flex: 1, padding: 16, alignItems: 'center' }}>
              <Text style={{ fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase', color: colors.mute, fontFamily: fonts.bodyBold }}>
                {k}
              </Text>
              <Text style={{ fontFamily: fonts.display, fontSize: 22, color: colors.ink, marginTop: 4 }}>{v}</Text>
            </Card>
          ))}
        </View>

        <View style={{ marginTop: 28 }}>
          <Card style={{ padding: 18, backgroundColor: 'rgba(123,155,126,0.12)' }}>
            <Text style={{ fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase', color: colors.mute, fontFamily: fonts.bodyBold }}>
              Try this
            </Text>
            <Text style={{ marginTop: 6, fontFamily: fonts.display, fontSize: 20, color: colors.ink, letterSpacing: -0.2 }}>
              Sing one verse out loud.
            </Text>
            <Text style={{ marginTop: 6, color: colors.mute, fontFamily: fonts.body, fontSize: 14, lineHeight: 20 }}>
              Inner-ear bones harden this week. Babies remember melodies they hear often before birth.
            </Text>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}
