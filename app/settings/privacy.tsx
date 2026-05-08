// Privacy sub-page. Plain-language explainer + a hard "delete everything"
// button that wipes the local store.

import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card } from '@/components/Card';
import { Icon } from '@/components/Icon';
import { SubScreenHeader } from '@/components/SubScreen';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

export default function PrivacySetting() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const wipe = async () => {
    await AsyncStorage.clear();
    router.replace('/onboarding');
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.base }}>
      <SubScreenHeader caption="Privacy" />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: insets.bottom + 32 }}>
        <Text style={{ fontFamily: fonts.display, fontSize: 30, color: colors.ink, letterSpacing: -0.4, marginTop: 8 }}>
          On-device first.
        </Text>
        <Text style={{ color: colors.mute, fontSize: 14.5, marginTop: 12, lineHeight: 22, fontFamily: fonts.body }}>
          Marigold runs almost entirely on your phone. Scans, journal entries,
          symptoms — they live locally and only sync to your account if you
          choose to.
        </Text>

        <Card style={{ padding: 18, marginTop: 24, gap: 14 }}>
          {[
            ['On-device', 'Scans, journal, reminders, intentions, symptom tracker'],
            ['Optional sync', 'Profile + journal sync to Supabase only when you sign in'],
            ['Encrypted in transit', 'TLS 1.2+, signed Anthropic and NHS API calls'],
            ['Never sold', 'Zero ad networks, zero analytics resold to anyone'],
          ].map(([t, b]) => (
            <View key={t} style={{ flexDirection: 'row', gap: 12, alignItems: 'flex-start' }}>
              <View
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                  backgroundColor: 'rgba(123,155,126,0.2)',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon.check size={16} color={colors.sage} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 14, color: colors.ink, fontFamily: fonts.bodyBold }}>{t}</Text>
                <Text style={{ fontSize: 13, color: colors.mute, marginTop: 2, fontFamily: fonts.body }}>{b}</Text>
              </View>
            </View>
          ))}
        </Card>

        <Card style={{ padding: 18, marginTop: 16 }}>
          <Text style={{ fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase', color: colors.mute, fontFamily: fonts.bodyBold }}>
            What we never collect
          </Text>
          <Text style={{ marginTop: 8, color: colors.ink, fontSize: 14, lineHeight: 22, fontFamily: fonts.body }}>
            Photos from your scans (we read the label, then forget). Location
            beyond country. Contacts. Calendar. Microphone audio outside the
            "ask out loud" prompt.
          </Text>
        </Card>

        <Pressable
          onPress={wipe}
          style={{
            marginTop: 28,
            padding: 18,
            borderRadius: 14,
            borderWidth: 1,
            borderColor: 'rgba(198,107,92,0.3)',
            backgroundColor: 'rgba(241,216,209,0.4)',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: colors.coral, fontFamily: fonts.bodyBold, fontSize: 14 }}>
            Delete everything on this phone
          </Text>
          <Text style={{ marginTop: 4, color: colors.mute, fontSize: 12, fontFamily: fonts.body }}>
            Logs you out and resets onboarding.
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
