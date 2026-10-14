// Today — the pregnancy hero (week, day, size comparison, days to go), this
// week at a glance, quick logging, next appointment, the "Can I…?" search
// entry, checklist progress, a daily thought and the always-visible help card.

import React, { useEffect, useMemo } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Icon } from '@/components/Icon';
import { Blob } from '@/components/Blob';
import { CircleButton, Eyebrow, EmojiBadge, H2, IconBadge, ProgressBar, SectionTitle, Surface, shadow } from '@/components/ui';
import { useAppStore } from '@/store/useAppStore';
import { usePregnancy } from '@/lib/usePregnancy';
import { dayKey, daysBetween, parseISODate } from '@/lib/pregnancy';
import { formatLength, formatWeight } from '@/lib/units';
import { affirmationFor, CHECKLIST, getWeek, sizePhrase } from '@/content';
import { useFormat, useL10n, useL10nList, useLang, useT } from '@/i18n';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

function greetingKey(h: number) {
  if (h < 12) return 'today.morning';
  if (h < 18) return 'today.afternoon';
  return 'today.evening';
}

export default function Today() {
  const t = useT();
  const L = useL10n();
  const LL = useL10nList();
  const lang = useLang();
  const fmt = useFormat();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const profile = useAppStore((s) => s.profile);
  const appointments = useAppStore((s) => s.appointments);
  const checklistDone = useAppStore((s) => s.checklistDone);
  const water = useAppStore((s) => s.waterByDay[dayKey()] ?? 0);
  const waterGoal = useAppStore((s) => s.waterGoal);
  const addWater = useAppStore((s) => s.addWater);
  const premium = useAppStore((s) => s.premium.active);
  const lastSeenWeek = useAppStore((s) => s.lastSeenWeek);
  const setLastSeenWeek = useAppStore((s) => s.setLastSeenWeek);
  const patchProfile = useAppStore((s) => s.patchProfile);
  const p = usePregnancy();

  const week = p ? getWeek(p.contentWeek) : null;
  const isNewWeek = !!p && p.weeks > lastSeenWeek && lastSeenWeek > 0;

  useEffect(() => {
    if (!p) return;
    if (profile.week !== p.weeks) patchProfile({ week: p.weeks });
    // First launch after the week changes: show the "welcome to week N" ribbon
    // once, then remember we've shown it.
    if (lastSeenWeek === 0) setLastSeenWeek(p.weeks);
  }, [p?.weeks]); // eslint-disable-line react-hooks/exhaustive-deps

  const firstOpenAt = useAppStore((s) => s.firstOpenAt);
  const paywallNudged = useAppStore((s) => s.paywallNudged);
  const markPaywallNudged = useAppStore((s) => s.markPaywallNudged);

  // One gentle Plus offer, a few days in — never on first launch.
  useEffect(() => {
    if (premium || paywallNudged || profile.lossMode) return;
    if (Date.now() - firstOpenAt < 4 * 86_400_000) return;
    const id = setTimeout(() => {
      markPaywallNudged();
      router.push({ pathname: '/paywall', params: { from: 'nudge' } });
    }, 1200);
    return () => clearTimeout(id);
  }, [premium, paywallNudged, firstOpenAt, profile.lossMode]); // eslint-disable-line react-hooks/exhaustive-deps

  const nextAppt = useMemo(
    () => appointments.filter((a) => a.at >= Date.now() - 60 * 60 * 1000).sort((a, b) => a.at - b.at)[0],
    [appointments],
  );

  const trimester = p?.trimester ?? 1;
  const trimesterItems = CHECKLIST.filter((c) => c.trimester === trimester);
  const doneCount = trimesterItems.filter((c) => checklistDone[c.id]).length;
  const thought = affirmationFor();

  const daysLabel = !p
    ? ''
    : p.daysToGo > 1
      ? t('c.daysToGo', { n: p.daysToGo })
      : p.daysToGo === 1
        ? t('c.dayToGo')
        : p.daysToGo === 0
          ? t('c.dueToday')
          : t('c.daysOverdue', { n: -p.daysToGo });

  const greeting = t(greetingKey(new Date().getHours()));

  return (
    <View style={{ flex: 1, backgroundColor: colors.base }}>
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 360 }}>
        <Blob variant="cream" />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: insets.top + 8, paddingBottom: insets.bottom + 130 }}
      >
        {/* Header */}
        <View style={{ paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <Eyebrow>{fmt.date(new Date(), { weekday: 'long', day: 'numeric', month: 'long' })}</Eyebrow>
            <Text style={{ fontFamily: fonts.display, fontSize: 26, color: colors.ink, letterSpacing: -0.4, marginTop: 4 }} numberOfLines={1}>
              {profile.name ? t('today.greetingName', { greeting, name: profile.name }) : greeting}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <CircleButton onPress={() => router.push('/emergency')} accessibilityLabel={t('today.help')}>
              <Icon.help size={19} color={colors.ink} />
            </CircleButton>
            <CircleButton onPress={() => router.push('/profile')} accessibilityLabel="Profile">
              <Icon.user size={19} color={colors.ink} />
            </CircleButton>
          </View>
        </View>

        {/* Hero */}
        <View style={{ paddingHorizontal: 20, marginTop: 18 }}>
          {profile.stage === 'postpartum' && profile.babyBornAt ? (
            <Surface style={{ padding: 22, backgroundColor: colors.marigoldSoft }} onPress={() => router.push('/settings/born')}>
              <Text style={{ fontSize: 34 }}>👶</Text>
              <H2 style={{ marginTop: 10 }}>
                {(() => {
                  const days = Math.max(0, daysBetween(parseISODate(profile.babyBornAt), new Date()));
                  const age = days < 28 ? t('born.days', { n: days }) : t('born.weeks', { n: Math.floor(days / 7) });
                  return profile.babyName ? t('born.homeTitle', { name: profile.babyName, age }) : t('born.homeTitleAnon', { age });
                })()}
              </H2>
              <Text style={{ color: colors.ink2, fontFamily: fonts.body, fontSize: 15, lineHeight: 22, marginTop: 6 }}>{t('born.next')}</Text>
            </Surface>
          ) : profile.lossMode ? (
            <Surface style={{ padding: 22, backgroundColor: colors.lavenderSoft }} onPress={() => router.push('/settings/loss')}>
              <Text style={{ fontSize: 30 }}>🕊️</Text>
              <H2 style={{ marginTop: 10 }}>{t('loss.homeTitle')}</H2>
              <Text style={{ color: colors.ink2, fontFamily: fonts.body, fontSize: 15, lineHeight: 22, marginTop: 6 }}>{t('loss.homeBody')}</Text>
            </Surface>
          ) : p && week ? (
            <Animated.View entering={FadeInDown.duration(500)}>
              <Pressable onPress={() => router.push({ pathname: '/(tabs)/weeks', params: { w: String(p.contentWeek) } })} accessibilityRole="button">
                <LinearGradient
                  colors={['#F9DCCB', '#F4D0C6', '#E9DDF0']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{ borderRadius: 30, padding: 22, overflow: 'hidden', ...shadow.lift }}
                >
                  <View style={{ position: 'absolute', right: -50, top: -40, width: 210, height: 210, borderRadius: 105, backgroundColor: 'rgba(255,255,255,0.28)' }} />
                  {isNewWeek ? (
                    <View style={{ alignSelf: 'flex-start', backgroundColor: 'rgba(255,255,255,0.75)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999, marginBottom: 12 }}>
                      <Text style={{ fontFamily: fonts.bodyBold, fontSize: 12, color: colors.terracotta }}>✨ {t('today.newWeek', { n: p.weeks })}</Text>
                    </View>
                  ) : null}
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                    <View style={{ width: 104, height: 104, borderRadius: 52, backgroundColor: 'rgba(255,255,255,0.85)', alignItems: 'center', justifyContent: 'center', ...shadow.card }}>
                      <Text style={{ fontSize: 58, lineHeight: 72 }} allowFontScaling={false}>{week.size.emoji}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Eyebrow color={colors.ink2}>{t('c.trimesterN', { n: p.trimester })}</Eyebrow>
                      <Text style={{ fontFamily: fonts.display, fontSize: 40, lineHeight: 44, color: colors.ink, letterSpacing: -0.8, marginTop: 2 }}>
                        {t('c.weekN', { n: p.weeks })}
                      </Text>
                      <Text style={{ fontFamily: fonts.bodyBold, fontSize: 14, color: colors.ink2 }}>
                        {t('c.weeksDays', { w: p.weeks, d: p.days })}
                      </Text>
                    </View>
                  </View>
                  <Text style={{ fontFamily: fonts.body, fontSize: 15, lineHeight: 21, color: colors.ink, marginTop: 16 }}>
                    {p.contentWeek >= 4 ? t('today.sizeOf', { item: sizePhrase(week.size, lang) }) : t('weeks.early')}
                    {week.lengthCm ? `  ·  ${formatLength(week.lengthCm, profile.units)}` : ''}
                    {week.weightG ? `  ·  ${formatWeight(week.weightG, profile.units)}` : ''}
                  </Text>
                  <ProgressBar value={p.progress} color={colors.terracotta} track="rgba(255,255,255,0.65)" style={{ marginTop: 16 }} />
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                    <Text style={{ fontFamily: fonts.bodyBold, fontSize: 12.5, color: colors.ink2 }}>{daysLabel}</Text>
                    <Text style={{ fontFamily: fonts.body, fontSize: 12.5, color: colors.ink2 }}>{t('today.dueOn', { date: fmt.date(p.dueDate, { day: 'numeric', month: 'short', year: 'numeric' }) })}</Text>
                  </View>
                </LinearGradient>
              </Pressable>
            </Animated.View>
          ) : (
            <Surface onPress={() => router.push('/settings/pregnancy')} style={{ padding: 22 }}>
              <Text style={{ fontSize: 30 }}>📅</Text>
              <H2 style={{ marginTop: 8 }}>{t('today.setup')}</H2>
              <Text style={{ color: colors.mute, fontFamily: fonts.body, marginTop: 4 }}>{t('today.setupSub')}</Text>
            </Surface>
          )}
        </View>

        {/* This week */}
        {p && week && !profile.lossMode && profile.stage !== 'postpartum' ? (
          <View style={{ marginTop: 28 }}>
            <SectionTitle
              title={t('today.thisWeek')}
              action={t('c.seeAll')}
              onAction={() => router.push({ pathname: '/(tabs)/weeks', params: { w: String(p.contentWeek) } })}
            />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}>
              {[
                { key: 'baby', emoji: '👶', title: t('today.baby'), text: L(week.baby), bg: colors.blush },
                { key: 'body', emoji: '🤰', title: t('today.body'), text: L(week.body), bg: colors.lavenderSoft },
                { key: 'tip', emoji: '💡', title: t('today.tip'), text: LL(week.tips)[0] ?? '', bg: colors.marigoldSoft },
              ].map((c) => (
                <Surface
                  key={c.key}
                  style={{ width: 236, minHeight: 172, backgroundColor: c.bg, shadowOpacity: 0 }}
                  onPress={() => router.push({ pathname: '/(tabs)/weeks', params: { w: String(p.contentWeek) } })}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Text style={{ fontSize: 20 }}>{c.emoji}</Text>
                    <Text style={{ fontFamily: fonts.bodyBold, fontSize: 14, color: colors.ink }}>{c.title}</Text>
                  </View>
                  <Text style={{ fontFamily: fonts.body, fontSize: 14, lineHeight: 20, color: colors.ink2, marginTop: 10 }} numberOfLines={5}>
                    {c.text}
                  </Text>
                </Surface>
              ))}
            </ScrollView>
          </View>
        ) : null}

        {/* Quick log */}
        <View style={{ marginTop: 28 }}>
          <SectionTitle title={t('today.quick')} />
          <View style={{ paddingHorizontal: 20, flexDirection: 'row', gap: 12 }}>
            <Surface style={{ flex: 1.25, padding: 16 }} onPress={() => router.push('/tools/water')}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <IconBadge icon={Icon.drop} hue="sky" size={40} />
                <Pressable
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
                    addWater(1);
                  }}
                  hitSlop={10}
                  accessibilityLabel="+1"
                  style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: colors.sky, alignItems: 'center', justifyContent: 'center' }}
                >
                  <Icon.plus size={18} color="#fff" />
                </Pressable>
              </View>
              <Text style={{ fontFamily: fonts.bodyBold, fontSize: 15, color: colors.ink, marginTop: 12 }}>{t('today.water')}</Text>
              <Text style={{ fontFamily: fonts.body, fontSize: 13, color: colors.mute, marginTop: 2 }}>{t('today.waterSub', { n: water, goal: waterGoal })}</Text>
              <ProgressBar value={water / waterGoal} color={colors.sky} track={colors.skySoft} height={6} style={{ marginTop: 10 }} />
            </Surface>
            <View style={{ flex: 1, gap: 12 }}>
              {(p && p.weeks >= 24
                ? [
                    { icon: Icon.foot, hue: 'lavender' as const, label: t('tools.kicks'), route: '/tools/kick-counter' },
                    { icon: Icon.camera, hue: 'rose' as const, label: t('tools.bump'), route: '/entry?kind=bump' },
                  ]
                : [
                    { icon: Icon.smile, hue: 'amber' as const, label: t('tools.mood'), route: '/tools/symptoms' },
                    { icon: Icon.camera, hue: 'rose' as const, label: t('tools.bump'), route: '/entry?kind=bump' },
                  ]
              ).map((q) => (
                <Surface key={q.route} style={{ flex: 1, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 10 }} onPress={() => router.push(q.route as any)}>
                  <IconBadge icon={q.icon} hue={q.hue} size={34} />
                  <Text style={{ flex: 1, fontFamily: fonts.bodyBold, fontSize: 13.5, color: colors.ink }} numberOfLines={2}>{q.label}</Text>
                </Surface>
              ))}
            </View>
          </View>
        </View>

        {/* Next appointment */}
        <View style={{ marginTop: 28 }}>
          <SectionTitle title={t('today.next')} action={t('c.seeAll')} onAction={() => router.push('/appointments')} />
          <View style={{ paddingHorizontal: 20 }}>
            {nextAppt ? (
              <Surface onPress={() => router.push({ pathname: '/appointments/edit', params: { id: nextAppt.id } })} style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
                <View style={{ width: 56, borderRadius: 16, backgroundColor: colors.terracottaSoft, alignItems: 'center', paddingVertical: 8 }}>
                  <Text style={{ fontFamily: fonts.bodyBold, fontSize: 11, color: colors.terracotta, textTransform: 'uppercase' }}>
                    {new Date(nextAppt.at).toLocaleDateString(fmt.locale, { month: 'short' })}
                  </Text>
                  <Text style={{ fontFamily: fonts.display, fontSize: 24, color: colors.ink }}>{new Date(nextAppt.at).getDate()}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: fonts.bodyBold, fontSize: 16, color: colors.ink }} numberOfLines={1}>{nextAppt.title}</Text>
                  <Text style={{ fontFamily: fonts.body, fontSize: 13.5, color: colors.mute, marginTop: 3 }} numberOfLines={1}>
                    {fmt.weekday(nextAppt.at)} · {fmt.time(nextAppt.at)}
                    {nextAppt.location ? ` · ${nextAppt.location}` : ''}
                  </Text>
                  {nextAppt.questions.length ? (
                    <Text style={{ fontFamily: fonts.body, fontSize: 12.5, color: colors.terracotta, marginTop: 4 }}>
                      {(() => {
                        const open = nextAppt.questions.filter((q) => !q.done).length;
                        return open === 0 ? t('appt.allAsked') : open === 1 ? t('appt.questionsCountOne') : t('appt.questionsCount', { n: open });
                      })()}
                    </Text>
                  ) : null}
                </View>
                <Icon.chevR size={18} color={colors.faint} />
              </Surface>
            ) : (
              <Surface onPress={() => router.push('/appointments/edit')} style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
                <IconBadge icon={Icon.stethoscope} hue="rose" />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: fonts.bodyBold, fontSize: 15.5, color: colors.ink }}>{t('today.noAppt')}</Text>
                  <Text style={{ fontFamily: fonts.body, fontSize: 13, color: colors.mute, marginTop: 2 }}>{t('today.noApptSub')}</Text>
                </View>
                <View style={{ width: 34, height: 34, borderRadius: 17, backgroundColor: colors.terracotta, alignItems: 'center', justifyContent: 'center' }}>
                  <Icon.plus size={18} color="#fff" />
                </View>
              </Surface>
            )}
          </View>
        </View>

        {/* Can I…? */}
        <View style={{ paddingHorizontal: 20, marginTop: 28 }}>
          <Surface onPress={() => router.push({ pathname: '/(tabs)/check', params: { focus: '1' } })} style={{ backgroundColor: colors.sageSoft, shadowOpacity: 0 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <IconBadge icon={Icon.shield} hue="sage" />
              <View style={{ flex: 1 }}>
                <H2 style={{ fontSize: 20 }}>{t('today.canI')}</H2>
                <Text style={{ fontFamily: fonts.body, fontSize: 13, color: colors.mute }}>{t('today.canISub')}</Text>
              </View>
            </View>
            <View style={{ marginTop: 14, height: 46, borderRadius: 14, backgroundColor: colors.surface, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, gap: 10 }}>
              <Icon.search size={18} color={colors.mute} />
              <Text style={{ fontFamily: fonts.body, fontSize: 15, color: colors.faint }}>{t('today.canIPh')}</Text>
            </View>
          </Surface>
        </View>

        {/* Checklist */}
        {!profile.lossMode && trimesterItems.length ? (
          <View style={{ paddingHorizontal: 20, marginTop: 16 }}>
            <Surface onPress={() => router.push('/tools/checklist')} style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
              <IconBadge icon={Icon.list} hue="amber" />
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: fonts.bodyBold, fontSize: 15.5, color: colors.ink }}>{t('today.checklist')}</Text>
                <Text style={{ fontFamily: fonts.body, fontSize: 13, color: colors.mute, marginTop: 2 }}>
                  {t('today.checklistProgress', { done: doneCount, total: trimesterItems.length })}
                </Text>
                <ProgressBar value={doneCount / Math.max(1, trimesterItems.length)} color={colors.marigold} track={colors.marigoldSoft} height={6} style={{ marginTop: 10 }} />
              </View>
              <Icon.chevR size={18} color={colors.faint} />
            </Surface>
          </View>
        ) : null}

        {/* Daily thought */}
        <View style={{ paddingHorizontal: 20, marginTop: 16 }}>
          <Surface style={{ backgroundColor: colors.surface, overflow: 'hidden' }}>
            <View style={{ position: 'absolute', right: -36, top: -36, width: 140, height: 140, borderRadius: 70, backgroundColor: colors.blush }} />
            <Eyebrow>{t('today.intention')}</Eyebrow>
            <Text style={{ fontFamily: fonts.display, fontSize: 22, lineHeight: 29, color: colors.ink, marginTop: 8, letterSpacing: -0.2 }}>
              {L(thought)}
            </Text>
          </Surface>
        </View>

        {/* Plus */}
        {!premium ? (
          <View style={{ paddingHorizontal: 20, marginTop: 16 }}>
            <Pressable onPress={() => router.push('/paywall')} accessibilityRole="button">
              <LinearGradient colors={['#2F2622', '#4A3830']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ borderRadius: 24, padding: 18, flexDirection: 'row', alignItems: 'center', gap: 14 }}>
                <EmojiBadge emoji="🌼" size={44} bg="rgba(255,255,255,0.12)" />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: fonts.display, fontSize: 19, color: '#FFF6EE' }}>{t('today.plusTitle')}</Text>
                  <Text style={{ fontFamily: fonts.body, fontSize: 13, color: 'rgba(255,246,238,0.75)', marginTop: 2 }}>{t('today.plusSub')}</Text>
                </View>
                <Icon.chevR size={18} color="#FFF6EE" />
              </LinearGradient>
            </Pressable>
          </View>
        ) : null}

        {/* Help */}
        <View style={{ paddingHorizontal: 20, marginTop: 16 }}>
          <Surface onPress={() => router.push('/emergency')} style={{ flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: colors.dangerSoft, shadowOpacity: 0 }}>
            <View style={{ width: 44, height: 44, borderRadius: 16, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
              <Icon.phone size={20} color={colors.danger} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: fonts.bodyBold, fontSize: 15.5, color: colors.danger }}>{t('today.help')}</Text>
              <Text style={{ fontFamily: fonts.body, fontSize: 13, color: colors.ink2, marginTop: 2 }}>{t('today.helpSub')}</Text>
            </View>
            <Icon.chevR size={18} color={colors.danger} />
          </Surface>
        </View>
      </ScrollView>
    </View>
  );
}
