// Partner share — QR matrix + invite link + a privacy-focused list of what
// the partner can / cannot see.

import React from 'react';
import { Pressable, ScrollView, Text, View, Share } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Btn } from '@/components/Btn';
import { Icon } from '@/components/Icon';
import { Card } from '@/components/Card';
import { useAppStore } from '@/store/useAppStore';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

const APP_URL = process.env.EXPO_PUBLIC_APP_URL || 'https://marigold.app';
const INVITE = `${APP_URL}/j/9KQ-LMNT`;

// Deterministic faux-QR — looks like a QR while making it obvious that the
// real one comes from your backend.
function fauxQrPattern(seed: string): boolean[] {
  const out: boolean[] = [];
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  for (let i = 0; i < 144; i++) {
    h = (h * 9301 + 49297) % 233280;
    out.push(h % 100 > 45);
  }
  // hard corners (positioning markers)
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) out[r * 12 + c] = true;
  for (let r = 0; r < 3; r++) for (let c = 9; c < 12; c++) out[r * 12 + c] = true;
  for (let r = 9; r < 12; r++) for (let c = 0; c < 3; c++) out[r * 12 + c] = true;
  return out;
}

export default function Partner() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const setPartnerLinked = useAppStore((s) => s.patchProfile);
  const pattern = fauxQrPattern(INVITE);

  return (
    <View style={{ flex: 1, backgroundColor: colors.base }}>
      <View style={{ paddingTop: insets.top + 8, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
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
        <Text style={{ fontSize: 12, letterSpacing: 1.6, textTransform: 'uppercase', color: colors.mute, fontFamily: fonts.bodyBold }}>Partner</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 28, paddingTop: 18, paddingBottom: insets.bottom + 32 }}>
        <Text style={{ fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase', color: colors.mute, fontFamily: fonts.bodyBold }}>
          Invite
        </Text>
        <Text style={{ marginTop: 4, fontFamily: fonts.display, fontSize: 34, color: colors.ink, letterSpacing: -0.6, lineHeight: 38 }}>
          Bring them in.
        </Text>
        <Text style={{ color: colors.mute, fontSize: 15, marginTop: 12, lineHeight: 22, maxWidth: 300, fontFamily: fonts.body }}>
          Marigold for two — they see what helps at home, never the medical journal.
        </Text>

        <View
          style={{
            marginTop: 28,
            alignSelf: 'center',
            width: 200,
            height: 200,
            backgroundColor: colors.surface,
            borderRadius: 20,
            shadowColor: colors.ink,
            shadowOpacity: 0.08,
            shadowRadius: 20,
            shadowOffset: { width: 0, height: 6 },
            padding: 12,
          }}
        >
          <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
            {pattern.map((on, i) => (
              <View
                key={i}
                style={{
                  width: `${100 / 12}%`,
                  height: `${100 / 12}%`,
                  backgroundColor: on ? colors.ink : colors.base,
                  borderRadius: 1,
                }}
              />
            ))}
          </View>
        </View>
        <Text style={{ textAlign: 'center', fontSize: 12, color: colors.mute, marginTop: 12, fontFamily: fonts.body }}>
          {INVITE}
        </Text>

        <Card style={{ marginTop: 28, padding: 18 }}>
          <Text style={{ fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase', color: colors.mute, fontFamily: fonts.bodyBold }}>
            What they will see
          </Text>
          <View style={{ marginTop: 12, gap: 10 }}>
            {[
              'Weekly milestone — what to expect',
              'Foods to skip when cooking together',
              'Doctor visits added to their calendar',
              'Saved scans you tag for them',
            ].map((x) => (
              <View key={x} style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
                <Icon.check size={16} color={colors.sage} />
                <Text style={{ fontSize: 14, color: colors.ink, fontFamily: fonts.body }}>{x}</Text>
              </View>
            ))}
          </View>
          <Text style={{ marginTop: 12, fontSize: 12.5, color: colors.mute, fontFamily: fonts.body }}>
            Never shared: journal, symptoms, emergencies you log privately.
          </Text>
        </Card>

        <View style={{ marginTop: 24 }}>
          <Btn
            onPress={async () => {
              await Share.share({ message: `Join me on Marigold — ${INVITE}` });
              setPartnerLinked({ partnerLinked: true });
            }}
          >
            Send invite link
          </Btn>
        </View>
      </ScrollView>
    </View>
  );
}
