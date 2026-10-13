// Language picker. Switching is instant; notifications are re-scheduled so
// their text follows the new language.

import React from 'react';
import { Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Icon } from '@/components/Icon';
import { Body, H1, NavBar, Page, Row, Surface } from '@/components/ui';
import { useAppStore } from '@/store/useAppStore';
import { rescheduleAll } from '@/lib/notifications';
import { SUPPORTED_LANGS, useT } from '@/i18n';
import { colors } from '@/theme/colors';

export default function LanguageSettings() {
  const t = useT();
  const language = useAppStore((s) => s.language);
  const setLanguage = useAppStore((s) => s.setLanguage);

  return (
    <Page header={<NavBar caption={t('me.title')} />}>
      <View style={{ paddingHorizontal: 20 }}>
        <H1>{t('lang.title')}</H1>
        <Body mute style={{ marginTop: 8 }}>{t('lang.intro')}</Body>
      </View>
      <View style={{ paddingHorizontal: 20, marginTop: 18 }}>
        <Surface padded={false} style={{ overflow: 'hidden' }}>
          {SUPPORTED_LANGS.map((l, i) => (
            <Row
              key={l.code}
              left={<Text style={{ fontSize: 26 }}>{l.flag}</Text>}
              title={l.name}
              chevron={false}
              right={language === l.code ? <Icon.check size={20} color={colors.terracotta} /> : null}
              onPress={() => {
                Haptics.selectionAsync().catch(() => {});
                setLanguage(l.code);
                const s = useAppStore.getState();
                rescheduleAll(s.profile, s.notifPrefs).catch(() => {});
              }}
              last={i === SUPPORTED_LANGS.length - 1}
            />
          ))}
        </Surface>
      </View>
    </Page>
  );
}
