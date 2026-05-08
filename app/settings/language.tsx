// Language sub-page. Visual list with flag-style hue swatches; the heavy
// lifting lives in the i18n layer (added when we wire up react-intl).

import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SubScreenHeader } from '@/components/SubScreen';
import { Icon } from '@/components/Icon';
import { Card } from '@/components/Card';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

const LANGS: { code: string; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

export default function LanguageSetting() {
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = React.useState('en');

  return (
    <View style={{ flex: 1, backgroundColor: colors.base }}>
      <SubScreenHeader caption="Language" />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: insets.bottom + 32 }}>
        <Text style={{ fontFamily: fonts.display, fontSize: 30, color: colors.ink, letterSpacing: -0.4, marginTop: 8 }}>
          Your words.
        </Text>
        <Text style={{ color: colors.mute, fontSize: 14, marginTop: 8, fontFamily: fonts.body }}>
          We use the system language by default. Change it here without
          touching iOS or Android settings.
        </Text>

        <Card style={{ marginTop: 24 }}>
          {LANGS.map((l, i) => {
            const sel = selected === l.code;
            return (
              <View key={l.code}>
                <Pressable
                  onPress={() => setSelected(l.code)}
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 14,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 14,
                  }}
                >
                  <Text style={{ fontSize: 22 }}>{l.flag}</Text>
                  <Text style={{ flex: 1, fontSize: 15, color: sel ? colors.terracotta : colors.ink, fontFamily: sel ? fonts.bodyBold : fonts.body }}>
                    {l.name}
                  </Text>
                  {sel ? <Icon.check size={18} color={colors.terracotta} /> : null}
                </Pressable>
                {i < LANGS.length - 1 ? <View style={{ height: 1, backgroundColor: colors.line, marginLeft: 50 }} /> : null}
              </View>
            );
          })}
        </Card>

        <Text style={{ marginTop: 18, fontSize: 12, color: colors.mute, fontFamily: fonts.body, textAlign: 'center' }}>
          Verdicts come back in your chosen language — translated by Claude on
          the way out, never machine-translated cosmetic copy.
        </Text>
      </ScrollView>
    </View>
  );
}
