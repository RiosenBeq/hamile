// Kick counter. Tap "Start", then tap once per movement while a session timer
// runs. Current guidance (NHS, RCOG) is to know your baby's usual pattern and
// to call the maternity unit straight away if movements slow down, change or
// stop — so that message is always on screen. Timing 10 movements (a common
// US method, ACOG) is offered as a way to count, never as a pass/fail test.

import React, { useEffect, useMemo, useState } from 'react';
import { AppState, Linking, Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Btn } from '@/components/Btn';
import { Icon } from '@/components/Icon';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Body, Eyebrow, H1, H2, IconBadge, MedicalNote, NavBar, Page, ProgressBar, Row, SectionTitle, Surface } from '@/components/ui';
import { useAppStore, type Kick } from '@/store/useAppStore';
import { daysBetween, parseISODate } from '@/lib/pregnancy';
import { usePregnancy, useToday } from '@/lib/usePregnancy';
import { endLiveActivity, updateLiveActivity } from '@/lib/native';
import { useFormat, useT } from '@/i18n';
import { colors, tint } from '@/theme/colors';
import { fonts } from '@/theme/typography';

const TEN = 10;
const MIN = 60_000;
const HOUR = 60 * MIN;

const SOURCES = [
  { name: 'NHS: Your baby’s movements', url: 'https://www.nhs.uk/pregnancy/keeping-well/your-babys-movements/' },
  {
    name: 'RCOG: Your baby’s movements in pregnancy',
    url: 'https://www.rcog.org.uk/for-the-public/browse-our-patient-information/your-babys-movements-in-pregnancy/',
  },
  {
    name: 'ACOG: Special tests for monitoring fetal well-being',
    url: 'https://www.acog.org/womens-health/faqs/special-tests-for-monitoring-fetal-well-being',
  },
];

// The live session survives leaving and re-opening the screen (not an app
// restart). Every tap is persisted straight away, so no count is ever lost.
let liveSessionId: string | null = null;

/** Session ids are `s-<start ms>`, which keeps the start time in the store. */
function sessionStart(id: string): number | null {
  const m = /^s-(\d{10,})$/.exec(id);
  return m ? Number(m[1]) : null;
}

type Session = { id: string; count: number; start: number; end: number; tenAt: number | null };

function summarise(kicks: Kick[]): Session[] {
  const groups = new Map<string, Kick[]>();
  for (const k of kicks) {
    const g = groups.get(k.sessionId);
    if (g) g.push(k);
    else groups.set(k.sessionId, [k]);
  }
  return Array.from(groups, ([id, items]) => {
    items.sort((a, b) => a.at - b.at);
    const first = items[0].at;
    const parsed = sessionStart(id);
    const start = parsed != null && parsed <= first ? parsed : first;
    return {
      id,
      count: items.length,
      start,
      end: items[items.length - 1].at,
      tenAt: items.length >= TEN ? items[TEN - 1].at : null,
    };
  }).sort((a, b) => b.start - a.start);
}

function clock(ms: number): string {
  const s = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const ss = String(s % 60).padStart(2, '0');
  return h > 0 ? `${h}:${String(m).padStart(2, '0')}:${ss}` : `${m}:${ss}`;
}

export default function KickCounter() {
  const t = useT();
  const fmt = useFormat();
  const router = useRouter();
  const kicks = useAppStore((s) => s.kicks);
  const addKick = useAppStore((s) => s.addKick);
  const careName = useAppStore((s) => s.profile.careName);
  const carePhone = useAppStore((s) => s.profile.carePhone);
  const p = usePregnancy();
  const todayKey = useToday();

  const U = (s: string) => s.toLocaleUpperCase(fmt.locale);
  const plural = (base: string, n: number) => t(`${base}.${n === 1 ? 'one' : 'other'}`, { n });
  const duration = (ms: number) => {
    const mins = Math.floor(Math.max(0, ms) / MIN);
    if (mins < 1) return t('kick.duration.lt1');
    if (mins < 60) return t('kick.duration.min', { m: mins });
    return t('kick.duration.hmin', { h: Math.floor(mins / 60), m: mins % 60 });
  };
  const dayLabel = (ts: number) => {
    const diff = daysBetween(new Date(ts), new Date());
    if (diff === 0) return t('c.today');
    if (diff === 1) return t('c.yesterday');
    return fmt.short(ts);
  };

  const [sessionId, setSessionIdState] = useState<string | null>(() => {
    const start = liveSessionId ? sessionStart(liveSessionId) : null;
    // A session left running for hours was almost certainly forgotten.
    if (start != null && Date.now() - start < 6 * HOUR) return liveSessionId;
    liveSessionId = null;
    return null;
  });
  const setSessionId = (id: string | null) => {
    liveSessionId = id;
    setSessionIdState(id);
  };

  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!sessionId) return;
    setNow(Date.now());
    const tick = setInterval(() => setNow(Date.now()), 1000);
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active') setNow(Date.now());
    });
    return () => {
      clearInterval(tick);
      sub.remove();
    };
  }, [sessionId]);

  const sessions = useMemo(() => summarise(kicks), [kicks]);
  const live = sessionId ? sessions.find((s) => s.id === sessionId) ?? null : null;
  const liveCount = live?.count ?? 0;
  const liveStart = sessionId ? sessionStart(sessionId) ?? live?.start ?? now : now;
  const elapsed = Math.max(0, now - liveStart);
  const reached = liveCount >= TEN;

  const todayStart = useMemo(() => parseISODate(todayKey).getTime(), [todayKey]);
  const todayKicks = useMemo(() => kicks.filter((k) => k.at >= todayStart), [kicks, todayStart]);
  const todaySessions = useMemo(() => new Set(todayKicks.map((k) => k.sessionId)).size, [todayKicks]);
  const recent = useMemo(() => sessions.filter((s) => s.id !== sessionId).slice(0, 8), [sessions, sessionId]);

  // Show the running session on the Lock Screen / Dynamic Island.
  useEffect(() => {
    if (!sessionId) {
      endLiveActivity('kicks');
      return;
    }
    updateLiveActivity({
      kind: 'kicks',
      active: true,
      since: liveStart,
      count: liveCount,
      title: t('la.kick.title'),
      subtitle: liveCount >= TEN ? t('la.kick.done') : t('la.kick.sub'),
      countLabel: t('la.kick.count'),
    });
  }, [sessionId, liveCount]); // eslint-disable-line react-hooks/exhaustive-deps

  const onPress = () => {
    if (!sessionId) {
      setSessionId(`s-${Date.now()}`);
      return;
    }
    addKick(sessionId);
    if (liveCount + 1 === TEN) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    }
  };

  const finish = () => {
    if (liveCount > 0) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    setSessionId(null);
  };

  const callUnit = () => {
    if (!carePhone) return;
    Linking.openURL(`tel:${carePhone.replace(/[^\d+]/g, '')}`).catch(() => {});
  };

  const weeks = p?.weeks ?? 0;

  return (
    <Page header={<NavBar caption={U(t('tools.kicks'))} />}>
      <View style={{ paddingHorizontal: 20, paddingTop: 4 }}>
        <H1>{t('kick.title')}</H1>
        <Body mute style={{ marginTop: 8 }}>
          {t('kick.sub')}
        </Body>
      </View>

      {weeks > 0 && weeks < 24 ? (
        <View
          style={{
            marginHorizontal: 20,
            marginTop: 16,
            flexDirection: 'row',
            gap: 10,
            padding: 14,
            borderRadius: 18,
            backgroundColor: colors.lavenderSoft,
          }}
        >
          <Icon.info size={18} color={tint.lavender.fg} />
          <Text style={{ flex: 1, fontFamily: fonts.body, fontSize: 13.5, lineHeight: 19, color: colors.ink2 }}>{t('kick.early')}</Text>
        </View>
      ) : null}

      {/* Counter */}
      <View
        accessible
        accessibilityRole="button"
        accessibilityLabel={sessionId ? t('kick.a11y.count', { n: liveCount }) : t('kick.a11y.start')}
        onAccessibilityTap={onPress}
        style={{ alignItems: 'center', marginTop: 30 }}
      >
        <PrimaryButton
          label={sessionId ? String(liveCount) : t('kick.start')}
          sublabel={U(sessionId ? t('kick.tapHint') : t('kick.startHint'))}
          bg={reached ? colors.sage : colors.terracotta}
          size={220}
          onPress={onPress}
        />
      </View>

      {sessionId ? (
        <Animated.View entering={FadeInDown.duration(300)} style={{ paddingHorizontal: 20, marginTop: 28 }}>
          <Surface>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <View>
                <Eyebrow>{U(t('kick.session'))}</Eyebrow>
                <Text
                  style={{ fontFamily: fonts.display, fontSize: 34, color: colors.ink, letterSpacing: -0.5, marginTop: 2 }}
                  accessibilityLabel={duration(elapsed)}
                >
                  {clock(elapsed)}
                </Text>
              </View>
              <Text style={{ fontFamily: fonts.bodyBold, fontSize: 15, color: reached ? colors.sage : colors.ink2, marginBottom: 6 }}>
                {t('kick.towardTen', { n: liveCount })}
              </Text>
            </View>
            <ProgressBar
              value={liveCount / TEN}
              color={reached ? colors.sage : colors.terracotta}
              track={reached ? colors.sageSoft : colors.sand}
              style={{ marginTop: 12 }}
            />
            {reached && live?.tenAt ? (
              <Text style={{ fontFamily: fonts.bodyBold, fontSize: 14, lineHeight: 20, color: tint.sage.fg, marginTop: 12 }}>
                {t('kick.reached', { time: duration(live.tenAt - liveStart) })}
              </Text>
            ) : elapsed >= 2 * HOUR ? (
              <Text style={{ fontFamily: fonts.bodyBold, fontSize: 14, lineHeight: 20, color: colors.danger, marginTop: 12 }}>
                {t('kick.twoHours')}
              </Text>
            ) : null}
            <Btn kind="secondary" onPress={finish} style={{ marginTop: 14, height: 50 }}>
              {t('kick.finish')}
            </Btn>
          </Surface>
        </Animated.View>
      ) : null}

      {/* Today */}
      <View style={{ paddingHorizontal: 20, marginTop: sessionId ? 14 : 30 }}>
        <Surface style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
          <IconBadge icon={Icon.foot} hue="lavender" />
          <View style={{ flex: 1 }}>
            <Eyebrow>{U(t('kick.today'))}</Eyebrow>
            {todayKicks.length ? (
              <>
                <Text style={{ fontFamily: fonts.display, fontSize: 24, color: colors.ink, marginTop: 2 }}>
                  {plural('kick.movements', todayKicks.length)}
                </Text>
                <Text style={{ fontFamily: fonts.body, fontSize: 13, color: colors.mute }}>{plural('kick.sessions', todaySessions)}</Text>
              </>
            ) : (
              <Text style={{ fontFamily: fonts.body, fontSize: 14.5, color: colors.ink2, marginTop: 4 }}>{t('kick.todayNone')}</Text>
            )}
          </View>
        </Surface>
      </View>

      {/* Red flag — always visible */}
      <View style={{ paddingHorizontal: 20, marginTop: 14 }}>
        <Surface style={{ backgroundColor: colors.dangerSoft, shadowOpacity: 0 }}>
          <View style={{ flexDirection: 'row', gap: 12, alignItems: 'flex-start' }}>
            <View style={{ width: 40, height: 40, borderRadius: 14, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' }}>
              <Icon.phone size={19} color={colors.danger} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: fonts.bodyBold, fontSize: 16, lineHeight: 21, color: colors.danger }}>{t('kick.alert.title')}</Text>
              <Text style={{ fontFamily: fonts.body, fontSize: 14, lineHeight: 20, color: colors.ink2, marginTop: 4 }}>{t('kick.alert.body')}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 14 }}>
            <PillButton label={t('kick.alert.cta')} onPress={() => router.push('/emergency')} />
            {carePhone ? (
              <PillButton
                outline
                label={careName ? t('kick.alert.call', { name: careName }) : t('kick.alert.callUnit')}
                onPress={callUnit}
              />
            ) : null}
          </View>
        </Surface>
      </View>

      {/* History */}
      {recent.length ? (
        <View style={{ marginTop: 28 }}>
          <SectionTitle title={t('kick.recent')} />
          <View style={{ paddingHorizontal: 20 }}>
            <Surface padded={false}>
              {recent.map((s, i) => (
                <Row
                  key={s.id}
                  chevron={false}
                  last={i === recent.length - 1}
                  left={<CountBadge n={s.count} done={s.count >= TEN} />}
                  title={plural('kick.movements', s.count)}
                  sub={[
                    `${dayLabel(s.start)} · ${fmt.time(s.start)}`,
                    duration(s.end - s.start),
                    s.tenAt ? t('kick.timeToTen', { time: duration(s.tenAt - s.start) }) : null,
                  ]
                    .filter(Boolean)
                    .join(' · ')}
                />
              ))}
            </Surface>
          </View>
        </View>
      ) : null}

      {/* About */}
      <View style={{ paddingHorizontal: 20, marginTop: 28 }}>
        <Surface>
          <H2 style={{ fontSize: 20 }}>{t('kick.about.title')}</H2>
          <Body style={{ marginTop: 8 }}>{t('kick.about.pattern')}</Body>
          <Body style={{ marginTop: 10 }}>{t('kick.about.ten')}</Body>
          <Eyebrow style={{ marginTop: 16, marginBottom: 4 }}>{U(t('c.sources'))}</Eyebrow>
          {SOURCES.map((s) => (
            <SourceLink key={s.url} name={s.name} url={s.url} />
          ))}
        </Surface>
      </View>

      <MedicalNote text={t('c.medicalNote')} />
    </Page>
  );
}

function CountBadge({ n, done }: { n: number; done: boolean }) {
  return (
    <View
      style={{
        width: 44,
        height: 44,
        borderRadius: 16,
        backgroundColor: done ? colors.sageSoft : colors.lavenderSoft,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {done ? (
        <Icon.check size={20} color={tint.sage.fg} />
      ) : (
        <Text style={{ fontFamily: fonts.bodyBold, fontSize: 15, color: tint.lavender.fg }}>{n}</Text>
      )}
    </View>
  );
}

function PillButton({ label, onPress, outline }: { label: string; onPress: () => void; outline?: boolean }) {
  return (
    <Pressable
      onPress={() => {
        Haptics.selectionAsync().catch(() => {});
        onPress();
      }}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => ({
        height: 44,
        paddingHorizontal: 18,
        borderRadius: 999,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: outline ? colors.surface : colors.danger,
        borderWidth: outline ? 1 : 0,
        borderColor: colors.danger,
        opacity: pressed ? 0.8 : 1,
      })}
    >
      {outline ? <Icon.phone size={16} color={colors.danger} /> : null}
      <Text style={{ fontFamily: fonts.bodyBold, fontSize: 14.5, color: outline ? colors.danger : '#fff' }}>{label}</Text>
      {outline ? null : <Icon.chevR size={16} color="#fff" />}
    </Pressable>
  );
}

function SourceLink({ name, url }: { name: string; url: string }) {
  return (
    <Pressable
      onPress={() => Linking.openURL(url).catch(() => {})}
      accessibilityRole="link"
      accessibilityLabel={name}
      style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 6, opacity: pressed ? 0.6 : 1 })}
    >
      <Icon.external size={14} color={colors.terracotta} />
      <Text style={{ flex: 1, fontFamily: fonts.body, fontSize: 13.5, color: colors.terracotta }} numberOfLines={2}>
        {name}
      </Text>
    </Pressable>
  );
}
