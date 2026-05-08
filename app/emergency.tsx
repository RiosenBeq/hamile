// Emergency mode — calm two-step flow. The user describes what happened,
// then we offer grounded next steps and the option to call their midwife.

import React, { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card } from '@/components/Card';
import { Icon } from '@/components/Icon';
import { Btn } from '@/components/Btn';
import { Blob } from '@/components/Blob';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

export default function Emergency() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [stage, setStage] = useState<'ask' | 'response'>('ask');
  const [text, setText] = useState('');

  return (
    <View style={{ flex: 1, backgroundColor: colors.base }}>
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
        <Blob variant="cream" />
      </View>

      <View
        style={{
          paddingTop: insets.top + 8,
          paddingHorizontal: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Pressable
          onPress={() => router.back()}
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            borderWidth: 1,
            borderColor: colors.line,
            backgroundColor: 'rgba(255,255,255,0.8)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon.close size={18} color={colors.ink} />
        </Pressable>
        <Text style={{ fontSize: 12, letterSpacing: 1.6, textTransform: 'uppercase', color: colors.mute, fontFamily: fonts.bodyBold }}>Help</Text>
        <View style={{ width: 36 }} />
      </View>

      {stage === 'ask' ? (
        <View style={{ paddingHorizontal: 28, paddingTop: 32, flex: 1 }}>
          <Text style={{ fontFamily: fonts.display, fontSize: 34, lineHeight: 38, color: colors.ink, letterSpacing: -0.6 }}>
            Take a breath.
          </Text>
          <Text style={{ fontFamily: fonts.display, fontSize: 34, lineHeight: 38, color: 'rgba(42,37,34,0.55)', letterSpacing: -0.6 }}>
            Tell me what happened.
          </Text>
          <Text style={{ color: colors.mute, fontSize: 15, marginTop: 20, lineHeight: 22, fontFamily: fonts.body }}>
            I'll listen first, then suggest what to do — calmly.
          </Text>

          <TextInput
            value={text}
            onChangeText={setText}
            multiline
            placeholder="e.g. I bumped my stomach getting out of the car. No bleeding."
            placeholderTextColor={colors.mute}
            style={{
              marginTop: 24,
              minHeight: 160,
              padding: 16,
              backgroundColor: colors.surface,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: colors.line,
              fontSize: 15,
              color: colors.ink,
              fontFamily: fonts.body,
              textAlignVertical: 'top',
            }}
          />

          <View style={{ marginTop: 16, flexDirection: 'row', gap: 12 }}>
            <Btn kind="secondary" onPress={() => {}} style={{ flex: 1 }}>
              <Icon.mic size={18} color={colors.ink} />
              <Text style={{ color: colors.ink, fontFamily: fonts.bodyBold, fontSize: 14 }}>Speak instead</Text>
            </Btn>
            <Btn onPress={() => setStage('response')} style={{ flex: 1, backgroundColor: colors.ink }}>
              <Text style={{ color: colors.base, fontFamily: fonts.bodyBold, fontSize: 14 }}>Continue</Text>
              <Icon.arrow size={16} color={colors.base} />
            </Btn>
          </View>
          <Text style={{ marginTop: 18, fontSize: 12.5, color: colors.mute, lineHeight: 18, fontFamily: fonts.body }}>
            If you are bleeding heavily, fainting, or in severe pain — call your maternity unit now.
          </Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ paddingHorizontal: 28, paddingTop: 24, paddingBottom: insets.bottom + 32 }}>
          <Text style={{ fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase', color: colors.mute, fontFamily: fonts.bodyBold }}>
            You said
          </Text>
          <Text style={{ color: colors.ink, fontSize: 15, marginTop: 8, fontFamily: fonts.body }}>
            {text || 'I bumped my stomach getting out of the car. No bleeding.'}
          </Text>

          <Text style={{ marginTop: 28, fontFamily: fonts.display, fontSize: 26, lineHeight: 32, color: colors.ink, letterSpacing: -0.4 }}>
            Most likely you and the baby are okay.
          </Text>
          <Text style={{ color: 'rgba(42,37,34,0.85)', fontSize: 15, marginTop: 12, lineHeight: 22, fontFamily: fonts.body }}>
            After 20 weeks, the uterus is well-cushioned. A small bump rarely causes harm. Here's how to gently check in over the next hour or two.
          </Text>

          <View style={{ marginTop: 24, gap: 12 }}>
            {[
              ['Sit somewhere quiet', 'Lie on your left side, drink a cold glass of water.'],
              ['Count movements', 'Watch for at least 10 in the next 2 hours. Most babies stir within 30 minutes.'],
              ['Gentle check-in', 'Press lightly around the bump. Sharp, persistent pain on one side warrants a call.'],
              ['Trust your gut', "If something feels off, ring your midwife — that's exactly what they're there for."],
            ].map(([h, b], i) => (
              <Card key={h} style={{ padding: 16, flexDirection: 'row', gap: 12 }}>
                <View
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 14,
                    backgroundColor: colors.sand,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ fontSize: 13, color: colors.ink, fontFamily: fonts.bodyBold }}>{i + 1}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 15, color: colors.ink, fontFamily: fonts.bodyBold }}>{h}</Text>
                  <Text style={{ fontSize: 13.5, color: colors.mute, marginTop: 2, lineHeight: 20, fontFamily: fonts.body }}>{b}</Text>
                </View>
              </Card>
            ))}
          </View>

          <View style={{ marginTop: 24, flexDirection: 'row', gap: 12 }}>
            <Btn kind="secondary" onPress={() => router.back()} style={{ flex: 1 }}>
              Save to journal
            </Btn>
            <Btn
              onPress={() => Linking.openURL('tel:111').catch(() => {})}
              style={{ flex: 1, backgroundColor: colors.ink }}
            >
              <Text style={{ color: colors.base, fontFamily: fonts.bodyBold, fontSize: 14 }}>Call midwife</Text>
            </Btn>
          </View>
        </ScrollView>
      )}
    </View>
  );
}
