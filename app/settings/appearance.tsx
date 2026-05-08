// Appearance — light / dark / auto, plus a quick text-size preview. We render
// real preview cards rather than abstract swatches so the choice feels honest.

import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card } from '@/components/Card';
import { Icon } from '@/components/Icon';
import { SubScreenHeader } from '@/components/SubScreen';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

type Mode = 'auto' | 'light' | 'dark';

export default function AppearanceSetting() {
  const insets = useSafeAreaInsets();
  const [mode, setMode] = useState<Mode>('auto');
  const [textSize, setTextSize] = useState<'small' | 'normal' | 'large'>('normal');

  const sizeMap = { small: 14, normal: 16, large: 18 };
  const previewBg = mode === 'dark' ? '#2A2522' : colors.base;
  const previewInk = mode === 'dark' ? '#FBF7F2' : colors.ink;
  const previewMute = mode === 'dark' ? 'rgba(255,255,255,0.55)' : colors.mute;

  return (
    <View style={{ flex: 1, backgroundColor: colors.base }}>
      <SubScreenHeader caption="Appearance" />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: insets.bottom + 32 }}>
        <Text style={{ fontFamily: fonts.display, fontSize: 30, color: colors.ink, letterSpacing: -0.4, marginTop: 8 }}>
          How it looks.
        </Text>
        <Text style={{ color: colors.mute, fontSize: 14, marginTop: 8, fontFamily: fonts.body }}>
          Pick the mode and text size that feels easiest on your eyes.
        </Text>

        {/* Live preview */}
        <View
          style={{
            marginTop: 24,
            padding: 20,
            backgroundColor: previewBg,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: colors.line,
          }}
        >
          <Text style={{ fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase', color: previewMute, fontFamily: fonts.bodyBold }}>
            Today
          </Text>
          <Text style={{ fontFamily: fonts.display, fontSize: 22, color: previewInk, marginTop: 4, letterSpacing: -0.2 }}>
            Week 18 · Wednesday
          </Text>
          <Text style={{ fontSize: sizeMap[textSize], color: previewInk, marginTop: 10, lineHeight: sizeMap[textSize] * 1.5, fontFamily: fonts.body }}>
            It's okay to ask the same question twice.
          </Text>
        </View>

        <Text style={{ marginTop: 28, fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase', color: colors.mute, fontFamily: fonts.bodyBold, marginBottom: 12 }}>
          Mode
        </Text>
        <Card>
          {(['auto', 'light', 'dark'] as const).map((m, i) => (
            <View key={m}>
              <Pressable
                onPress={() => setMode(m)}
                style={{ padding: 16, flexDirection: 'row', alignItems: 'center', gap: 16 }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 15, color: colors.ink, fontFamily: fonts.body }}>
                    {m === 'auto' ? 'Match system' : m === 'light' ? 'Always light' : 'Always dark'}
                  </Text>
                  <Text style={{ fontSize: 12.5, color: colors.mute, marginTop: 2, fontFamily: fonts.body }}>
                    {m === 'auto' && 'Recommended — switches with iOS / Android'}
                    {m === 'light' && 'Warm cream, terracotta accents'}
                    {m === 'dark' && 'Soft ink, lavender highlights'}
                  </Text>
                </View>
                {mode === m ? <Icon.check size={18} color={colors.terracotta} /> : null}
              </Pressable>
              {i < 2 ? <View style={{ height: 1, backgroundColor: colors.line, marginLeft: 16 }} /> : null}
            </View>
          ))}
        </Card>

        <Text style={{ marginTop: 24, fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase', color: colors.mute, fontFamily: fonts.bodyBold, marginBottom: 12 }}>
          Text size
        </Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {(['small', 'normal', 'large'] as const).map((s) => {
            const sel = textSize === s;
            return (
              <Pressable
                key={s}
                onPress={() => setTextSize(s)}
                style={{
                  flex: 1,
                  paddingVertical: 14,
                  borderRadius: 14,
                  alignItems: 'center',
                  backgroundColor: sel ? colors.ink : colors.surface,
                  borderWidth: 1,
                  borderColor: sel ? colors.ink : colors.line,
                }}
              >
                <Text style={{ fontSize: sizeMap[s], color: sel ? colors.base : colors.ink, fontFamily: fonts.bodyBold }}>
                  Aa
                </Text>
                <Text style={{ marginTop: 4, fontSize: 11, color: sel ? colors.base : colors.mute, fontFamily: fonts.body, textTransform: 'capitalize' }}>
                  {s}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
