// "When to get help" — one-tap call to local emergency services and to the
// user's own maternity unit, followed by clear, calm warning signs.

import React, { useMemo, useState } from 'react';
import { Linking, Pressable, ScrollView, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Icon } from '@/components/Icon';
import { Body, Chip, Eyebrow, Field, H1, MedicalNote, NavBar, Page, Surface } from '@/components/ui';
import { Btn } from '@/components/Btn';
import { useAppStore } from '@/store/useAppStore';
import { EMERGENCY_NUMBERS, RED_FLAGS } from '@/content';
import { useL10n, useT } from '@/i18n';
import { resolveCountry } from '@/lib/country';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

export default function Emergency() {
  const t = useT();
  const L = useL10n();
  const profile = useAppStore((s) => s.profile);
  const patchProfile = useAppStore((s) => s.patchProfile);
  const [country, setCountry] = useState(resolveCountry(profile.country));
  const [editing, setEditing] = useState(false);
  const [careName, setCareName] = useState(profile.careName ?? '');
  const [carePhone, setCarePhone] = useState(profile.carePhone ?? '');
  const emergency = EMERGENCY_NUMBERS[country] ?? { country: { en: '', tr: '' }, number: '112' };

  const countries = useMemo(() => Object.keys(EMERGENCY_NUMBERS), []);

  const call = (num: string) => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
    Linking.openURL(`tel:${num.replace(/[^\d+]/g, '')}`).catch(() => {});
  };

  return (
    <Page header={<NavBar close caption={t('today.help')} />}>
      <View style={{ paddingHorizontal: 20 }}>
        <H1>{t('em.title')}</H1>
        <Body mute style={{ marginTop: 8 }}>{t('em.intro')}</Body>
      </View>

      <View style={{ paddingHorizontal: 20, marginTop: 18, gap: 12 }}>
        <Pressable
          onPress={() => call(emergency.number)}
          accessibilityRole="button"
          accessibilityLabel={t('em.call', { number: emergency.number })}
          style={({ pressed }) => ({
            backgroundColor: colors.danger,
            borderRadius: 22,
            padding: 18,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 14,
            opacity: pressed ? 0.85 : 1,
          })}
        >
          <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center' }}>
            <Icon.phone size={24} color="#fff" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#fff', fontFamily: fonts.display, fontSize: 24 }}>{t('em.call', { number: emergency.number })}</Text>
            <Text style={{ color: 'rgba(255,255,255,0.85)', fontFamily: fonts.body, fontSize: 13.5 }}>
              {t('em.callSub', { country: L(emergency.country) })}
            </Text>
          </View>
        </Pressable>

        <Surface>
          {profile.carePhone && !editing ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <Pressable onPress={() => call(profile.carePhone!)} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12 }} accessibilityRole="button">
                <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: colors.terracottaSoft, alignItems: 'center', justifyContent: 'center' }}>
                  <Icon.stethoscope size={21} color={colors.terracotta} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: fonts.bodyBold, fontSize: 16, color: colors.ink }}>
                    {t('em.myCareCall', { name: profile.careName || t('em.myCare') })}
                  </Text>
                  <Text style={{ fontFamily: fonts.body, fontSize: 13.5, color: colors.mute }}>{profile.carePhone}</Text>
                </View>
              </Pressable>
              <Pressable onPress={() => setEditing(true)} hitSlop={10} accessibilityLabel={t('c.edit')}>
                <Icon.edit size={18} color={colors.mute} />
              </Pressable>
            </View>
          ) : editing ? (
            <View style={{ gap: 10 }}>
              <Eyebrow>{t('em.myCare')}</Eyebrow>
              <Field value={careName} onChangeText={setCareName} placeholder={t('em.namePh')} />
              <Field value={carePhone} onChangeText={setCarePhone} placeholder={t('em.numberPh')} keyboardType="phone-pad" />
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <Btn kind="secondary" style={{ flex: 1, height: 48 }} onPress={() => setEditing(false)}>{t('c.cancel')}</Btn>
                <Btn
                  style={{ flex: 1, height: 48 }}
                  disabled={!carePhone.trim()}
                  onPress={() => {
                    patchProfile({ careName: careName.trim(), carePhone: carePhone.trim() });
                    setEditing(false);
                  }}
                >
                  {t('c.save')}
                </Btn>
              </View>
            </View>
          ) : (
            <Pressable onPress={() => setEditing(true)} style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }} accessibilityRole="button">
              <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: colors.terracottaSoft, alignItems: 'center', justifyContent: 'center' }}>
                <Icon.plus size={20} color={colors.terracotta} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: fonts.bodyBold, fontSize: 15.5, color: colors.ink }}>{t('em.myCare')}</Text>
                <Text style={{ fontFamily: fonts.body, fontSize: 13, color: colors.mute, marginTop: 2 }}>{t('em.myCareSub')}</Text>
              </View>
            </Pressable>
          )}
        </Surface>
      </View>

      <Eyebrow style={{ paddingHorizontal: 24, marginTop: 22, marginBottom: 8 }}>{t('em.country')}</Eyebrow>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}>
        {countries.map((c) => (
          <Chip
            key={c}
            small
            label={`${L(EMERGENCY_NUMBERS[c].country)} · ${EMERGENCY_NUMBERS[c].number}`}
            selected={country === c}
            onPress={() => {
              setCountry(c);
              patchProfile({ country: c });
            }}
          />
        ))}
      </ScrollView>

      <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
        <Eyebrow style={{ marginBottom: 10 }}>{t('em.signs')}</Eyebrow>
        <Surface padded={false}>
          {RED_FLAGS.map((f, i) => (
            <View key={f.id} style={{ padding: 16, flexDirection: 'row', gap: 12, borderBottomWidth: i === RED_FLAGS.length - 1 ? 0 : 1, borderBottomColor: colors.line }}>
              <Text style={{ fontSize: 22, width: 30, textAlign: 'center' }}>{f.emoji}</Text>
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: fonts.bodyBold, fontSize: 15.5, color: colors.ink }}>{L(f.title)}</Text>
                <Text style={{ fontFamily: fonts.body, fontSize: 14, lineHeight: 20, color: colors.ink2, marginTop: 4 }}>{L(f.detail)}</Text>
              </View>
            </View>
          ))}
        </Surface>
      </View>

      <View style={{ paddingHorizontal: 20, marginTop: 16 }}>
        <Surface style={{ backgroundColor: colors.lavenderSoft, shadowOpacity: 0 }}>
          <Text style={{ fontFamily: fonts.display, fontSize: 20, color: colors.ink }}>{t('em.mental')}</Text>
          <Body style={{ marginTop: 6 }}>{t('em.mentalBody')}</Body>
        </Surface>
      </View>
      <MedicalNote text={t('c.medicalNote')} />
    </Page>
  );
}
