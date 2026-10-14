// Marigold notifications — local only (expo-notifications), few and gentle.
//
// `rescheduleAll` is the single source of truth: it cancels every Marigold
// notification and re-creates the set implied by the current profile,
// preferences, appointments and pills. It runs on launch, on foreground, and
// whenever one of those inputs changes. Permission is requested lazily
// (onboarding or the settings toggle), never at launch.
//
// Budget: iOS keeps at most 64 pending local notifications per app, so we
// schedule date-based items for a short horizon and rely on frequent
// re-scheduling to roll the window forward.

import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { useAppStore } from '@/store/useAppStore';
import type { Appointment, NotificationPrefs, NotificationTimes, Pill, Profile } from '@/store/types';
import { localeFor, translate, type LangCode } from '@/i18n';
import { addDays, pregnancyStatus, startOfDay } from '@/lib/pregnancy';
import { affirmationFor, getWeek, sizePhrase } from '@/content';

const TAG = 'marigold';
const CHANNEL_ID = 'marigold-default';
const MILESTONE_WEEKS_AHEAD = 6;
const THOUGHT_DAYS_AHEAD = 7;
const MAX_APPOINTMENTS = 12;

Notifications.setNotificationHandler({
  handleNotification: async () =>
    ({
      shouldShowAlert: true,
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }) as any,
});

const Trigger = (Notifications as any).SchedulableTriggerInputTypes ?? {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  DATE: 'date',
};

type Spec = {
  id: string;
  title: string;
  body: string;
  trigger: Notifications.NotificationTriggerInput;
  url?: string;
};

export async function ensureChannel() {
  if (Platform.OS !== 'android') return;
  try {
    await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
      name: 'Marigold',
      importance: Notifications.AndroidImportance.DEFAULT,
      vibrationPattern: [0, 80, 60, 80],
      lightColor: '#C0694B',
    });
  } catch {}
}

export async function requestPermissionIfNeeded(): Promise<boolean> {
  if (Platform.OS === 'web') return false;
  const settings = await Notifications.getPermissionsAsync();
  if (settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL) return true;
  if (!settings.canAskAgain) return false;
  const result = await Notifications.requestPermissionsAsync({
    ios: { allowAlert: true, allowBadge: false, allowSound: false },
  });
  return !!result.granted;
}

export async function cancelMarigoldSchedules() {
  try {
    const all = await Notifications.getAllScheduledNotificationsAsync();
    await Promise.all(
      all
        .filter((n) => (n.identifier || '').startsWith(TAG + '-'))
        .map((n) => Notifications.cancelScheduledNotificationAsync(n.identifier)),
    );
  } catch {}
}

const daily = (hour: number, minute: number): Notifications.NotificationTriggerInput =>
  ({ type: Trigger.DAILY, hour, minute, channelId: CHANNEL_ID }) as any;

const at = (date: Date): Notifications.NotificationTriggerInput =>
  ({ type: Trigger.DATE, date, channelId: CHANNEL_ID }) as any;

function atTime(day: Date, hour: number, minute: number): Date {
  const d = new Date(day.getFullYear(), day.getMonth(), day.getDate(), hour, minute, 0, 0);
  return d;
}

const NUDGE_AFTER_DAYS = 3;

function hm(v: string | undefined, fallback: [number, number]): [number, number] {
  const m = /^(\d{1,2}):(\d{2})$/.exec(v ?? '');
  if (!m) return fallback;
  const h = Math.min(23, Number(m[1]));
  const min = Math.min(59, Number(m[2]));
  return [h, min];
}

function buildSpecs(
  profile: Profile,
  prefs: NotificationPrefs,
  times: NotificationTimes,
  appointments: Appointment[],
  pills: Pill[],
  lang: LangCode,
): Spec[] {
  const [weekH, weekM] = hm(times.week, [9, 0]);
  const [thH, thM] = hm(times.thought, [8, 30]);
  const [kickH, kickM] = hm(times.kick, [19, 0]);
  const t = (key: string, vars?: Record<string, string | number>) => translate(lang, key, vars);
  const now = new Date();
  const specs: Spec[] = [];
  const pregnancyActive = profile.stage === 'pregnant' && !profile.lossMode && !!profile.dueDate;

  // New-week notes on the morning each week starts.
  if (pregnancyActive && prefs.milestone && profile.dueDate) {
    const status = pregnancyStatus(profile.dueDate, now);
    for (let i = 1; i <= MILESTONE_WEEKS_AHEAD; i++) {
      const week = status.weeks + i;
      if (week > 42) break;
      const when = atTime(addDays(status.weekStart, 7 * i), weekH, weekM);
      if (when <= now) continue;
      const content = getWeek(week);
      specs.push({
        id: `${TAG}-week-${week}`,
        title: t('notif.week.title', { n: week }),
        body:
          week >= 4
            ? t('notif.week.body', { item: sizePhrase(content.size, lang) })
            : t('notif.week.bodyEarly'),
        trigger: at(when),
        url: `/(tabs)/weeks?w=${Math.min(42, week)}`,
      });
    }
  }

  // A different calm sentence each morning (pregnancy mode only).
  if (pregnancyActive && prefs.intention) {
    for (let i = 0; i < THOUGHT_DAYS_AHEAD; i++) {
      const day = addDays(startOfDay(now), i);
      const when = atTime(day, thH, thM);
      if (when <= now) continue;
      const thought = affirmationFor(day);
      specs.push({
        id: `${TAG}-thought-${i}`,
        title: t('notif.thought.title'),
        body: thought[lang] ?? thought.en,
        trigger: at(when),
        url: '/(tabs)',
      });
    }
  }

  if (pregnancyActive && prefs.kickNudge && profile.dueDate && pregnancyStatus(profile.dueDate, now).weeks >= 28) {
    specs.push({
      id: `${TAG}-kick`,
      title: t('notif.kick.title'),
      body: t('notif.kick.body'),
      trigger: daily(kickH, kickM),
      url: '/tools/kick-counter',
    });
  }

  if (prefs.water) {
    [
      [10, 30],
      [14, 0],
      [17, 30],
    ].forEach(([h, m], i) =>
      specs.push({
        id: `${TAG}-water-${i}`,
        title: t('notif.water.title'),
        body: t('notif.water.body'),
        trigger: daily(h, m),
        url: '/tools/water',
      }),
    );
  }

  if (prefs.pelvicFloor && !profile.lossMode) {
    [
      [9, 0],
      [16, 0],
    ].forEach(([h, m], i) =>
      specs.push({
        id: `${TAG}-pelvic-${i}`,
        title: t('notif.pelvic.title'),
        body: t('notif.pelvic.body'),
        trigger: daily(h, m),
        url: '/tools/kegel',
      }),
    );
  }

  if (prefs.reminders) {
    const upcoming = appointments
      .filter((a) => a.at > now.getTime() && a.remind !== 'none')
      .sort((a, b) => a.at - b.at)
      .slice(0, MAX_APPOINTMENTS);
    for (const a of upcoming) {
      const time = new Date(a.at).toLocaleTimeString(localeFor(lang), { hour: '2-digit', minute: '2-digit' });
      if (a.remind === '1d' || a.remind === 'both') {
        const when = new Date(a.at - 24 * 3600 * 1000);
        if (when > now)
          specs.push({
            id: `${TAG}-appt-${a.id}-1d`,
            title: t('notif.appt.tomorrow', { title: a.title }),
            body: a.questions.some((q) => !q.done) ? t('notif.appt.questions', { time }) : t('notif.appt.body', { time }),
            trigger: at(when),
            url: `/appointments/edit?id=${a.id}`,
          });
      }
      if (a.remind === '1h' || a.remind === 'both') {
        const when = new Date(a.at - 3600 * 1000);
        if (when > now)
          specs.push({
            id: `${TAG}-appt-${a.id}-1h`,
            title: t('notif.appt.soon', { title: a.title }),
            body: a.location ? t('notif.appt.where', { time, place: a.location }) : t('notif.appt.body', { time }),
            trigger: at(when),
            url: `/appointments/edit?id=${a.id}`,
          });
      }
    }

    for (const p of pills.filter((x) => x.reminders)) {
      p.times.forEach((hhmm, i) => {
        const [h, m] = hhmm.split(':').map((n) => parseInt(n, 10));
        if (Number.isNaN(h) || Number.isNaN(m)) return;
        specs.push({
          id: `${TAG}-pill-${p.id}-${i}`,
          title: t('notif.pill.title', { name: p.name }),
          body: t('notif.pill.body'),
          trigger: daily(h, m),
          url: '/tools/vitamins',
        });
      });
    }
  }

  // A single gentle "come back" note if the app isn't opened for a few days.
  // Re-scheduled on every launch, so it only fires after real absence.
  if (prefs.nudge !== false && !profile.lossMode) {
    const when = atTime(addDays(startOfDay(now), NUDGE_AFTER_DAYS), thH, thM);
    const week =
      profile.dueDate && profile.stage === 'pregnant' ? pregnancyStatus(profile.dueDate, when).weeks : null;
    specs.push({
      id: `${TAG}-nudge`,
      title: t('notif.nudge.title'),
      body: week && week > 0 && week <= 42 ? t('notif.nudge.body', { n: week }) : t('notif.nudge.bodyGeneric'),
      trigger: at(when),
      url: '/(tabs)',
    });
  }

  return specs.slice(0, 60);
}

let running: Promise<void> | null = null;

export async function rescheduleAll(profile?: Profile, prefs?: NotificationPrefs): Promise<void> {
  if (Platform.OS === 'web') return;
  // Serialise concurrent calls — each one cancels and re-creates the set.
  const previous = running;
  const job = (async () => {
    if (previous) await previous.catch(() => {});
    const s = useAppStore.getState();
    const p = profile ?? s.profile;
    const n = prefs ?? s.notifPrefs;
    await ensureChannel();
    await cancelMarigoldSchedules();
    const perm = await Notifications.getPermissionsAsync().catch(() => null);
    if (!perm?.granted) return;
    const specs = buildSpecs(p, n, s.notifTimes, s.appointments, s.pills, s.language);
    for (const spec of specs) {
      await Notifications.scheduleNotificationAsync({
        identifier: spec.id,
        content: { title: spec.title, body: spec.body, data: { tag: TAG, url: spec.url } },
        trigger: spec.trigger,
      }).catch(() => null);
    }
  })();
  running = job;
  return job;
}

export const syncAppointmentReminders = (_appointments?: Appointment[]) => rescheduleAll();
export const syncPillReminders = (_pills?: Pill[]) => rescheduleAll();
