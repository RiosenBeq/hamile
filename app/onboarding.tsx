// Onboarding — five calm steps: welcome (+ language), name, due date (by due
// date, last period, IVF transfer or current week), baby details, and
// notifications. Everything is optional except the date.

import React, { useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import Animated, { FadeIn, FadeInRight, FadeInUp, ZoomIn } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Btn } from '@/components/Btn';
import { Blob } from '@/components/Blob';
import { MarigoldMark } from '@/components/MarigoldMark';
import { CalendarPicker } from '@/components/CalendarPicker';
import { Chip, Eyebrow, Field, H1, Body, Segmented, EmojiBadge } from '@/components/ui';
import { Icon } from '@/components/Icon';
import { useAppStore } from '@/store/useAppStore';
import { SUPPORTED_LANGS, useFormat, useT, useLang } from '@/i18n';
import {
  addDays,
  dueDateForCurrentWeek,
  dueDateFrom,
  isPlausibleDueDate,
  pregnancyStatus,
  startOfDay,
  toISODate,
} from '@/lib/pregnancy';
import { requestPermissionIfNeeded } from '@/lib/notifications';
import { getWeek, sizePhrase } from '@/content';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';
import type { BabySex } from '@/store/types';

type Method = 'due' | 'lmp' | 'ivf' | 'week';
const TOTAL = 4;

export default function Onboarding() {
  const t = useT();
  const lang = useLang();
  const fmt = useFormat();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const setLanguage = useAppStore((s) => s.setLanguage);
  const setOnboarded = useAppStore((s) => s.setOnboarded);
  const patchProfile = useAppStore((s) => s.patchProfile);
  const setDueDate = useAppStore((s) => s.setDueDate);
  const patchNotifPrefs = useAppStore((s) => s.patchNotifPrefs);

  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [method, setMethod] = useState<Method>('due');
  const [picked, setPicked] = useState<Date | null>(null);
  const [ivfDay, setIvfDay] = useState<3 | 5>(5);
  const [weekPick, setWeekPick] = useState(12);
  const [sex, setSex] = useState<BabySex>('unknown');
  const [nickname, setNickname] = useState('');
  const [multiples, setMultiples] = useState(false);

  const today = useMemo(() => startOfDay(new Date()), []);

  const due: Date | null = useMemo(() => {
    if (method === 'week') return dueDateForCurrentWeek(weekPick, 0, today);
    if (!picked) return null;
    if (method === 'lmp') return dueDateFrom('lmp', picked);
    if (method === 'ivf') return dueDateFrom(ivfDay === 3 ? 'ivf3' : 'ivf5', picked);
    return dueDateFrom('due', picked);
  }, [method, picked, ivfDay, weekPick, today]);

  const status = due ? pregnancyStatus(toISODate(due)) : null;
  const plausible = due ? isPlausibleDueDate(due) : false;

  const bounds = useMemo(() => {
    if (method === 'due') return { min: addDays(today, -28), max: addDays(today, 294) };
    return { min: addDays(today, -300), max: today };
  }, [method, today]);

  const finish = async (allowNotifs: boolean) => {
    if (due) setDueDate(toISODate(due));
    patchProfile({
      name: name.trim(),
      babySex: sex,
      babyName: nickname.trim() || undefined,
      multiples,
      stage: 'pregnant',
    });
    if (allowNotifs) {
      const ok = await requestPermissionIfNeeded().catch(() => false);
      patchNotifPrefs({ milestone: ok, reminders: ok, intention: ok });
    } else {
      patchNotifPrefs({ milestone: false, intention: false });
    }
    setOnboarded(true);
    router.replace('/(tabs)');
  };

  const footer = (primary: React.ReactNode) => (
    <View style={{ flexDirection: 'row', gap: 12, paddingTop: 12, paddingBottom: insets.bottom + 16 }}>
      <Btn kind="secondary" onPress={() => setStep(step - 1)} style={{ width: 64 }}>
        <Icon.back size={20} color={colors.ink} />
      </Btn>
      <View style={{ flex: 1 }}>{primary}</View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.base }}>
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: step === 0 ? 1 : 0.5 }}>
        <Blob variant="cream" />
      </View>

      {step > 0 ? (
        <View style={{ paddingTop: insets.top + 14, paddingHorizontal: 24, flexDirection: 'row', gap: 6 }}>
          {Array.from({ length: TOTAL }).map((_, i) => (
            <View
              key={i}
              style={{
                flex: 1,
                height: 4,
                borderRadius: 2,
                backgroundColor: i < step ? colors.terracotta : 'rgba(42,37,34,0.10)',
              }}
            />
          ))}
        </View>
      ) : null}

      {step === 0 && (
        <Animated.View entering={FadeIn.duration(400)} style={{ flex: 1, paddingHorizontal: 28, paddingTop: insets.top + 12, paddingBottom: insets.bottom + 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 8 }}>
            {SUPPORTED_LANGS.map((l) => (
              <Chip key={l.code} small label={`${l.flag} ${l.name}`} selected={lang === l.code} onPress={() => setLanguage(l.code)} />
            ))}
          </View>
          <Animated.View entering={ZoomIn.delay(100).duration(700)} style={{ alignItems: 'center', marginTop: 24 }}>
            <MarigoldMark size={210} />
          </Animated.View>
          <View style={{ flex: 1 }} />
          <Animated.View entering={FadeInUp.delay(350).duration(450)}>
            <Eyebrow>Marigold</Eyebrow>
            <Text style={{ fontFamily: fonts.display, fontSize: 36, lineHeight: 40, color: colors.ink, letterSpacing: -0.6, marginTop: 10 }}>
              {t('ob.welcome.title')}
            </Text>
            <Body mute style={{ marginTop: 14 }}>{t('ob.welcome.body')}</Body>
          </Animated.View>
          <Animated.View entering={FadeInUp.delay(550).duration(450)} style={{ marginTop: 26 }}>
            <Btn onPress={() => setStep(1)}>{t('ob.welcome.cta')}</Btn>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 14 }}>
              <Icon.lock size={14} color={colors.mute} />
              <Text style={{ color: colors.mute, fontSize: 12.5, fontFamily: fonts.body }}>{t('ob.welcome.foot')}</Text>
            </View>
          </Animated.View>
        </Animated.View>
      )}

      {step === 1 && (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
          <Animated.View entering={FadeInRight.duration(260)} style={{ flex: 1, paddingHorizontal: 24, paddingTop: 28 }}>
            <Eyebrow>{t('ob.step', { n: 1, total: TOTAL })}</Eyebrow>
            <H1 style={{ marginTop: 10 }}>{t('ob.name.title')}</H1>
            <Body mute style={{ marginTop: 10 }}>{t('ob.name.body')}</Body>
            <Field
              autoFocus
              value={name}
              onChangeText={setName}
              placeholder={t('ob.name.placeholder')}
              autoCapitalize="words"
              autoCorrect={false}
              returnKeyType="next"
              onSubmitEditing={() => setStep(2)}
              maxLength={40}
              containerStyle={{ marginTop: 24 }}
            />
            <View style={{ flex: 1 }} />
            {footer(<Btn onPress={() => setStep(2)}>{name.trim() ? t('c.continue') : t('c.skip')}</Btn>)}
          </Animated.View>
        </KeyboardAvoidingView>
      )}

      {step === 2 && (
        <Animated.View entering={FadeInRight.duration(260)} style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 28, paddingBottom: 16 }} showsVerticalScrollIndicator={false}>
            <Eyebrow>{t('ob.step', { n: 2, total: TOTAL })}</Eyebrow>
            <H1 style={{ marginTop: 10 }}>{t('ob.date.title')}</H1>
            <Body mute style={{ marginTop: 10 }}>{t('ob.date.body')}</Body>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 20, marginHorizontal: -24 }} contentContainerStyle={{ gap: 8, paddingHorizontal: 24 }}>
              {(['due', 'lmp', 'ivf', 'week'] as Method[]).map((m) => (
                <Chip
                  key={m}
                  label={t(`ob.date.method.${m}`)}
                  selected={method === m}
                  onPress={() => {
                    setMethod(m);
                    setPicked(null);
                  }}
                />
              ))}
            </ScrollView>

            {method === 'week' ? (
              <View style={{ marginTop: 20 }}>
                <Text style={{ color: colors.mute, fontFamily: fonts.body, fontSize: 14 }}>{t('ob.date.weekHint')}</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
                  {Array.from({ length: 39 }).map((_, i) => {
                    const w = i + 4;
                    const sel = w === weekPick;
                    return (
                      <Pressable
                        key={w}
                        onPress={() => setWeekPick(w)}
                        style={{
                          width: 52,
                          height: 44,
                          borderRadius: 14,
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: sel ? colors.terracotta : colors.surface,
                          borderWidth: 1,
                          borderColor: sel ? colors.terracotta : colors.line,
                        }}
                      >
                        <Text style={{ fontFamily: fonts.bodyBold, color: sel ? '#fff' : colors.ink, fontSize: 15 }}>{w}</Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            ) : (
              <View style={{ marginTop: 18 }}>
                {method !== 'due' ? (
                  <Text style={{ color: colors.mute, fontFamily: fonts.body, fontSize: 14, marginBottom: 10 }}>
                    {method === 'lmp' ? t('ob.date.lmpHint') : t('ob.date.ivfHint')}
                  </Text>
                ) : null}
                {method === 'ivf' ? (
                  <Segmented
                    style={{ marginBottom: 12 }}
                    value={String(ivfDay) as '3' | '5'}
                    onChange={(v) => setIvfDay(v === '3' ? 3 : 5)}
                    options={[
                      { value: '5', label: t('ob.date.ivfDay5') },
                      { value: '3', label: t('ob.date.ivfDay3') },
                    ]}
                  />
                ) : null}
                <CalendarPicker value={picked} onChange={setPicked} minDate={bounds.min} maxDate={bounds.max} marked={today} />
              </View>
            )}

            {status && due ? (
              <Animated.View entering={FadeIn} style={{ marginTop: 18, padding: 16, borderRadius: 20, backgroundColor: plausible ? colors.terracottaSoft : colors.dangerSoft, flexDirection: 'row', gap: 14, alignItems: 'center' }}>
                <EmojiBadge emoji={getWeek(status.contentWeek).size.emoji} size={52} bg="#fff" />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: fonts.bodyBold, color: colors.ink, fontSize: 15 }}>
                    {plausible ? t('ob.date.result', { w: status.weeks, d: status.days }) : t('ob.date.implausible')}
                  </Text>
                  <Text style={{ fontFamily: fonts.body, color: colors.mute, fontSize: 13.5, marginTop: 3 }}>
                    {t('ob.date.resultDue', { date: fmt.date(due) })}
                  </Text>
                </View>
              </Animated.View>
            ) : null}
          </ScrollView>
          <View style={{ paddingHorizontal: 24 }}>
            {footer(<Btn disabled={!due || !plausible} onPress={() => setStep(3)}>{t('c.continue')}</Btn>)}
          </View>
        </Animated.View>
      )}

      {step === 3 && (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
          <Animated.View entering={FadeInRight.duration(260)} style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 28 }} keyboardShouldPersistTaps="handled">
              <Eyebrow>{t('ob.step', { n: 3, total: TOTAL })}</Eyebrow>
              <H1 style={{ marginTop: 10 }}>{t('ob.baby.title')}</H1>
              <Body mute style={{ marginTop: 10 }}>{t('ob.baby.body')}</Body>
              <Eyebrow style={{ marginTop: 24, marginBottom: 10 }}>{t('ob.baby.sex')}</Eyebrow>
              <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
                <Chip emoji="🎀" label={t('ob.baby.girl')} selected={sex === 'girl'} onPress={() => setSex('girl')} />
                <Chip emoji="🧢" label={t('ob.baby.boy')} selected={sex === 'boy'} onPress={() => setSex('boy')} />
                <Chip emoji="✨" label={t('ob.baby.unknown')} selected={sex === 'unknown'} onPress={() => setSex('unknown')} />
              </View>
              <Field
                label={t('ob.baby.nickname')}
                value={nickname}
                onChangeText={setNickname}
                placeholder={t('ob.baby.nicknamePh')}
                autoCapitalize="words"
                maxLength={30}
                containerStyle={{ marginTop: 24 }}
              />
              <View style={{ marginTop: 18 }}>
                <Chip emoji="👶👶" label={t('ob.baby.twins')} selected={multiples} onPress={() => setMultiples(!multiples)} style={{ alignSelf: 'flex-start' }} />
              </View>
            </ScrollView>
            <View style={{ paddingHorizontal: 24 }}>{footer(<Btn onPress={() => setStep(4)}>{t('c.continue')}</Btn>)}</View>
          </Animated.View>
        </KeyboardAvoidingView>
      )}

      {step === 4 && (
        <Animated.View entering={FadeInRight.duration(260)} style={{ flex: 1, paddingHorizontal: 24, paddingTop: 28 }}>
          <Eyebrow>{t('ob.step', { n: 4, total: TOTAL })}</Eyebrow>
          <H1 style={{ marginTop: 10 }}>{t('ob.notif.title')}</H1>
          <Body mute style={{ marginTop: 10 }}>{t('ob.notif.body')}</Body>
          <View style={{ alignItems: 'center', marginTop: 34 }}>
            <View style={{ width: '100%', backgroundColor: colors.surface, borderRadius: 22, padding: 16, flexDirection: 'row', gap: 12, alignItems: 'center', borderWidth: 1, borderColor: colors.line }}>
              <EmojiBadge emoji={status ? getWeek(Math.min(42, status.contentWeek + 1)).size.emoji : '🌼'} size={44} bg={colors.blush} />
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: fonts.bodyBold, color: colors.ink, fontSize: 14.5 }}>
                  {t('today.newWeek', { n: status ? Math.min(42, status.weeks + 1) : 13 })}
                </Text>
                <Text style={{ fontFamily: fonts.body, color: colors.mute, fontSize: 13, marginTop: 2 }} numberOfLines={2}>
                  {status
                    ? t('today.sizeOf', { item: sizePhrase(getWeek(Math.min(42, status.weeks + 1)).size.name, lang) })
                    : t('today.newWeekSub')}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ flex: 1 }} />
          <View style={{ paddingBottom: insets.bottom + 16, gap: 10 }}>
            <Btn onPress={() => finish(true)}>{t('ob.notif.allow')}</Btn>
            <Btn kind="ghost" onPress={() => finish(false)}>{t('c.notNow')}</Btn>
          </View>
        </Animated.View>
      )}
    </View>
  );
}
