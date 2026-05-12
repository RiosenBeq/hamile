// Language sub-page. Stores the selected language in the app store so every
// `useT()` consumer sees the change instantly. New strings get added to
// `src/i18n/translations.ts` — anything not yet translated falls back to EN.

import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SubScreenHeader } from '@/components/SubScreen';
import { Icon } from '@/components/Icon';
import { Card } from '@/components/Card';
import { useAppStore } from '@/store/useAppStore';
import { useT, SUPPORTED_LANGS, LangCode } from '@/i18n';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

export default function LanguageSetting() {
  const t = useT();
  const insets = useSafeAreaInsets();
  const language = useAppStore((s) => s.language);
  const setLanguage = useAppStore((s) => s.setLanguage);

  return (
    <View style={{ flex: 1, backgroundColor: colors.base }}>
      <SubScreenHeader caption={t('profile.language')} />
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: insets.bottom + 32 }}
      >
        <Text
          style={{
            fontFamily: fonts.display,
            fontSize: 30,
            color: colors.ink,
            letterSpacing: -0.4,
            marginTop: 8,
          }}
        >
          {t('lang.title')}
        </Text>
        <Text style={{ color: colors.mute, fontSize: 14, marginTop: 8, fontFamily: fonts.body }}>
          {t('lang.sub')}
        </Text>

        <Card style={{ marginTop: 24 }}>
          {SUPPORTED_LANGS.map((l, i) => {
            const sel = language === l.code;
            return (
              <View key={l.code}>
                <Pressable
                  onPress={() => setLanguage(l.code as LangCode)}
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 14,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 14,
                  }}
                >
                  <Text style={{ fontSize: 22 }}>{l.flag}</Text>
                  <Text
                    style={{
                      flex: 1,
                      fontSize: 15,
                      color: sel ? colors.terracotta : colors.ink,
                      fontFamily: sel ? fonts.bodyBold : fonts.body,
                    }}
                  >
                    {l.name}
                  </Text>
                  {sel ? <Icon.check size={18} color={colors.terracotta} /> : null}
                </Pressable>
                {i < SUPPORTED_LANGS.length - 1 ? (
                  <View
                    style={{ height: 1, backgroundColor: colors.line, marginLeft: 50 }}
                  />
                ) : null}
              </View>
            );
          })}
        </Card>

        <Text
          style={{
            marginTop: 18,
            fontSize: 12,
            color: colors.mute,
            fontFamily: fonts.body,
            textAlign: 'center',
          }}
        >
          {t('lang.footer')}
        </Text>
      </ScrollView>
    </View>
  );
}
