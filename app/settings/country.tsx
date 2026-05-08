// Country & cuisine sub-page. Lets the user change the country used for food
// rules (e.g. UK vs US for soft cheese, prawns, etc).

import React, { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SubScreenHeader } from '@/components/SubScreen';
import { Icon } from '@/components/Icon';
import { useAppStore } from '@/store/useAppStore';
import { COUNTRIES } from '@/data/sample';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

const FLAG: Record<string, string> = {
  'United Kingdom': '🇬🇧',
  'United States': '🇺🇸',
  France: '🇫🇷',
  Germany: '🇩🇪',
  Japan: '🇯🇵',
  Australia: '🇦🇺',
  Canada: '🇨🇦',
  Italy: '🇮🇹',
  Turkey: '🇹🇷',
};

export default function CountrySetting() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const profile = useAppStore((s) => s.profile);
  const patchProfile = useAppStore((s) => s.patchProfile);
  const [q, setQ] = useState('');

  const list = COUNTRIES.filter((c) => c.toLowerCase().includes(q.toLowerCase()));

  return (
    <View style={{ flex: 1, backgroundColor: colors.base }}>
      <SubScreenHeader caption="Country" />

      <View style={{ paddingHorizontal: 24, paddingTop: 8 }}>
        <Text style={{ fontFamily: fonts.display, fontSize: 30, color: colors.ink, letterSpacing: -0.4 }}>
          Where you eat.
        </Text>
        <Text style={{ color: colors.mute, fontSize: 14, marginTop: 8, fontFamily: fonts.body }}>
          Food rules and dish names vary. We tune to your country so the verdicts
          match the menu you're holding.
        </Text>
      </View>

      <View style={{ paddingHorizontal: 24, marginTop: 18 }}>
        <View
          style={{
            height: 48,
            paddingHorizontal: 14,
            borderRadius: 14,
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.line,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <Icon.search size={18} color={colors.mute} />
          <TextInput
            value={q}
            onChangeText={setQ}
            placeholder="Search countries"
            placeholderTextColor={colors.mute}
            style={{ flex: 1, fontSize: 15, color: colors.ink, fontFamily: fonts.body }}
          />
        </View>
      </View>

      <ScrollView
        style={{ marginTop: 14 }}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: insets.bottom + 32 }}
      >
        <View
          style={{
            backgroundColor: colors.surface,
            borderRadius: 20,
            shadowColor: colors.ink,
            shadowOpacity: 0.06,
            shadowRadius: 16,
            shadowOffset: { width: 0, height: 4 },
          }}
        >
          {list.map((c, i) => {
            const sel = c === profile.country;
            return (
              <View key={c}>
                <Pressable
                  onPress={() => {
                    patchProfile({ country: c });
                    router.back();
                  }}
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 14,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 12,
                  }}
                >
                  <Text style={{ fontSize: 20 }}>{FLAG[c] ?? '🌍'}</Text>
                  <Text style={{ flex: 1, fontSize: 15, color: sel ? colors.terracotta : colors.ink, fontFamily: sel ? fonts.bodyBold : fonts.body }}>
                    {c}
                  </Text>
                  {sel ? <Icon.check size={18} color={colors.terracotta} /> : null}
                </Pressable>
                {i < list.length - 1 ? (
                  <View style={{ height: 1, backgroundColor: colors.line, marginLeft: 50 }} />
                ) : null}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
