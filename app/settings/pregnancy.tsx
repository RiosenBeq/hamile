// Pregnancy details — name, due date (with the same calendar as onboarding),
// baby nickname/sex, twins and measurement units.

import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { CalendarPicker } from '@/components/CalendarPicker';
import { Btn } from '@/components/Btn';
import { Body, Chip, Eyebrow, Field, H1, NavBar, Page, Segmented, Surface, ToggleRow } from '@/components/ui';
import { useAppStore } from '@/store/useAppStore';
import { addDays, parseISODate, pregnancyStatus, startOfDay, toISODate } from '@/lib/pregnancy';
import { useFormat, useT } from '@/i18n';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';
import type { BabySex, Units } from '@/store/types';

export default function PregnancySettings() {
  const t = useT();
  const fmt = useFormat();
  const router = useRouter();
  const profile = useAppStore((s) => s.profile);
  const patchProfile = useAppStore((s) => s.patchProfile);
  const setDueDate = useAppStore((s) => s.setDueDate);

  const today = startOfDay(new Date());
  const [name, setName] = useState(profile.name);
  const [due, setDue] = useState<Date | null>(profile.dueDate ? parseISODate(profile.dueDate) : null);
  const [babyName, setBabyName] = useState(profile.babyName ?? '');
  const [sex, setSex] = useState<BabySex>(profile.babySex ?? 'unknown');
  const [multiples, setMultiples] = useState(!!profile.multiples);
  const [units, setUnits] = useState<Units>(profile.units ?? 'metric');
  const [showCal, setShowCal] = useState(!profile.dueDate);

  const status = due ? pregnancyStatus(toISODate(due)) : null;

  const save = () => {
    if (due) setDueDate(toISODate(due));
    patchProfile({ name: name.trim(), babyName: babyName.trim() || undefined, babySex: sex, multiples, units });
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    router.back();
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
      <Page header={<NavBar caption={t('me.title')} />}>
        <View style={{ paddingHorizontal: 20 }}>
          <H1>{t('pg.title')}</H1>
        </View>

        <View style={{ paddingHorizontal: 20, marginTop: 18, gap: 16 }}>
          <Field label={t('pg.name')} value={name} onChangeText={setName} autoCapitalize="words" maxLength={40} placeholder={t('ob.name.placeholder')} />

          <View>
            <Eyebrow style={{ marginBottom: 8 }}>{t('pg.due')}</Eyebrow>
            <Surface>
              <Text style={{ fontFamily: fonts.display, fontSize: 22, color: colors.ink }}>{due ? fmt.date(due) : '—'}</Text>
              {status ? (
                <Text style={{ fontFamily: fonts.body, fontSize: 14, color: colors.mute, marginTop: 4 }}>
                  {t('ob.date.result', { w: status.weeks, d: status.days })}
                </Text>
              ) : null}
              <Body mute style={{ marginTop: 8, fontSize: 13.5, lineHeight: 19 }}>{t('pg.dueHint')}</Body>
              {!showCal ? (
                <Btn kind="secondary" style={{ marginTop: 12, height: 46 }} onPress={() => setShowCal(true)}>{t('pg.dueChange')}</Btn>
              ) : null}
            </Surface>
            {showCal ? (
              <View style={{ marginTop: 10 }}>
                <CalendarPicker value={due} onChange={setDue} minDate={addDays(today, -28)} maxDate={addDays(today, 294)} marked={today} />
              </View>
            ) : null}
          </View>

          <Field label={t('pg.babyName')} value={babyName} onChangeText={setBabyName} autoCapitalize="words" maxLength={30} placeholder={t('ob.baby.nicknamePh')} />

          <View>
            <Eyebrow style={{ marginBottom: 8 }}>{t('pg.babySex')}</Eyebrow>
            <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
              <Chip emoji="🎀" label={t('ob.baby.girl')} selected={sex === 'girl'} onPress={() => setSex('girl')} />
              <Chip emoji="🧢" label={t('ob.baby.boy')} selected={sex === 'boy'} onPress={() => setSex('boy')} />
              <Chip emoji="✨" label={t('ob.baby.unknown')} selected={sex === 'unknown'} onPress={() => setSex('unknown')} />
            </View>
          </View>

          <Surface padded={false}>
            <ToggleRow title={t('pg.multiples')} value={multiples} onChange={setMultiples} last />
          </Surface>

          <View>
            <Eyebrow style={{ marginBottom: 8 }}>{t('pg.units')}</Eyebrow>
            <Segmented
              value={units}
              onChange={setUnits}
              options={[
                { value: 'metric', label: t('pg.metric') },
                { value: 'imperial', label: t('pg.imperial') },
              ]}
            />
          </View>

          <Btn onPress={save} style={{ marginTop: 6 }}>{t('c.save')}</Btn>
        </View>
      </Page>
    </KeyboardAvoidingView>
  );
}
