// "My baby has arrived" — record the birthday, switch out of pregnancy mode,
// and point to Baby Bloom for newborn tracking.

import React, { useState } from 'react';
import { Linking, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { CalendarPicker } from '@/components/CalendarPicker';
import { Btn } from '@/components/Btn';
import { Body, Eyebrow, H1, NavBar, Page, Surface } from '@/components/ui';
import { useAppStore } from '@/store/useAppStore';
import { addDays, parseISODate, startOfDay, toISODate } from '@/lib/pregnancy';
import { rescheduleAll } from '@/lib/notifications';
import { BABY_BLOOM_URL } from '@/lib/links';
import { useT } from '@/i18n';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

export default function BabyArrived() {
  const t = useT();
  const router = useRouter();
  const profile = useAppStore((s) => s.profile);
  const patchProfile = useAppStore((s) => s.patchProfile);
  const today = startOfDay(new Date());
  const [date, setDate] = useState<Date | null>(profile.babyBornAt ? parseISODate(profile.babyBornAt) : today);
  const born = profile.stage === 'postpartum' && !!profile.babyBornAt;

  const save = () => {
    if (!date) return;
    patchProfile({ stage: 'postpartum', babyBornAt: toISODate(date) });
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    const s = useAppStore.getState();
    rescheduleAll(s.profile, s.notifPrefs).catch(() => {});
  };

  return (
    <Page header={<NavBar caption={t('me.title')} />}>
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 34 }}>👶</Text>
        <H1 style={{ marginTop: 8 }}>{born ? t('born.saved') : t('born.title')}</H1>
        <Body mute style={{ marginTop: 8 }}>{t('born.intro')}</Body>
      </View>
      <View style={{ paddingHorizontal: 20, marginTop: 18 }}>
        <Eyebrow style={{ marginBottom: 8 }}>{t('born.date')}</Eyebrow>
        <CalendarPicker value={date} onChange={setDate} minDate={addDays(today, -120)} maxDate={today} marked={today} />
        <Btn style={{ marginTop: 14 }} disabled={!date} onPress={save}>{t('born.save')}</Btn>
      </View>
      <View style={{ paddingHorizontal: 20, marginTop: 16 }}>
        <Surface style={{ backgroundColor: colors.marigoldSoft, shadowOpacity: 0 }}>
          <Text style={{ fontFamily: fonts.display, fontSize: 19, color: colors.ink }}>Baby Bloom</Text>
          <Body style={{ marginTop: 6 }}>{t('born.next')}</Body>
          <Btn kind="secondary" style={{ marginTop: 12, height: 46 }} onPress={() => Linking.openURL(BABY_BLOOM_URL).catch(() => {})}>
            App Store
          </Btn>
        </Surface>
      </View>
      {born ? (
        <View style={{ paddingHorizontal: 20, marginTop: 16 }}>
          <Btn
            kind="ghost"
            onPress={() => {
              patchProfile({ stage: 'pregnant', babyBornAt: null });
              router.back();
            }}
          >
            {t('born.undo')}
          </Btn>
        </View>
      ) : null}
    </Page>
  );
}
