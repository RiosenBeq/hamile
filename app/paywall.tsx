// Paywall — soft lavender header, three plan cards, generous "what's included"
// list, and a single primary CTA.

import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Btn } from '@/components/Btn';
import { Icon } from '@/components/Icon';
import { Blob } from '@/components/Blob';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

type Plan = { k: '9mo' | 'mo' | 'fam'; name: string; price: string; sub: string; tag?: string };

const PLANS: Plan[] = [
  { k: '9mo', name: '9-month full pregnancy', price: '$49', sub: 'Once · about $5/mo', tag: 'Most chosen' },
  { k: 'mo', name: 'Monthly', price: '$7.99', sub: 'Pause anytime' },
  { k: 'fam', name: 'Family', price: '$79', sub: 'Mother + partner + 2 grandparents' },
];

export default function Paywall() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [plan, setPlan] = useState<Plan['k']>('9mo');
  const selected = PLANS.find((p) => p.k === plan)!;

  return (
    <View style={{ flex: 1, backgroundColor: colors.base }}>
      <View style={{ height: 200 + insets.top, position: 'relative' }}>
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
          <Blob variant="lavender" />
        </View>
        <Pressable
          onPress={() => router.back()}
          style={{
            position: 'absolute',
            top: insets.top + 12,
            right: 20,
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: 'rgba(255,255,255,0.7)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon.close size={18} color={colors.ink} />
        </Pressable>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}>
        <View style={{ paddingHorizontal: 28, marginTop: -48 }}>
          <Text style={{ fontFamily: fonts.display, fontSize: 36, lineHeight: 38, color: colors.ink, letterSpacing: -0.6 }}>
            For the next 9 months —
          </Text>
          <Text style={{ fontFamily: fonts.display, fontSize: 36, lineHeight: 38, color: 'rgba(42,37,34,0.55)', letterSpacing: -0.6 }}>
            and beyond.
          </Text>

          <View style={{ marginTop: 24, gap: 10 }}>
            {[
              'Unlimited scans, with AI verdict in seconds',
              'Trimester-aware activity & food guidance',
              'Doctor PDF, generated in one tap',
              'Partner & family sharing',
              'Reviewed by OB-GYNs · zero ads',
            ].map((x) => (
              <View key={x} style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
                <Icon.check size={18} color={colors.sage} />
                <Text style={{ fontSize: 15, color: colors.ink, fontFamily: fonts.body, flex: 1 }}>{x}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ paddingHorizontal: 24, marginTop: 28, gap: 10 }}>
          {PLANS.map((p) => {
            const sel = plan === p.k;
            return (
              <Pressable
                key={p.k}
                onPress={() => setPlan(p.k)}
                style={{
                  padding: 18,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: sel ? colors.terracotta : colors.line,
                  backgroundColor: sel ? 'rgba(232,196,184,0.18)' : colors.surface,
                  position: 'relative',
                }}
              >
                {p.tag ? (
                  <View
                    style={{
                      position: 'absolute',
                      top: -10,
                      right: 16,
                      paddingHorizontal: 10,
                      height: 20,
                      borderRadius: 10,
                      backgroundColor: colors.ink,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text style={{ color: colors.base, fontSize: 10.5, letterSpacing: 1, textTransform: 'uppercase', fontFamily: fonts.bodyBold }}>
                      {p.tag}
                    </Text>
                  </View>
                ) : null}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View style={{ flex: 1, paddingRight: 12 }}>
                    <Text style={{ fontSize: 15.5, color: colors.ink, fontFamily: fonts.bodyBold }}>{p.name}</Text>
                    <Text style={{ fontSize: 12.5, color: colors.mute, marginTop: 2, fontFamily: fonts.body }}>{p.sub}</Text>
                  </View>
                  <Text style={{ fontFamily: fonts.display, fontSize: 24, color: colors.ink }}>{p.price}</Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          paddingHorizontal: 24,
          paddingBottom: insets.bottom + 16,
          paddingTop: 12,
          backgroundColor: colors.base,
          borderTopWidth: 1,
          borderTopColor: colors.line,
        }}
      >
        <Btn onPress={() => router.back()}>Start with {selected.name}</Btn>
        <Text style={{ marginTop: 10, textAlign: 'center', fontSize: 12, color: colors.mute, fontFamily: fonts.body }}>
          Cancel anytime · Reviewed by OB-GYNs · No ads, ever.
        </Text>
      </View>
    </View>
  );
}
