// Marigold notifications. We schedule everything as repeating local
// notifications via `expo-notifications`. The toggles in
// /settings/notifications drive `rescheduleAll` — flipping a toggle
// cancels and re-creates the relevant entries so the system never gets
// out of sync with what the user picked.
//
// Permission is asked lazily on first toggle, never at app launch.

import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { INTENTIONS, WEEK_METAPHORS } from '@/data/sample';
import { Profile, NotificationPrefs } from '@/store/useAppStore';

const TAG = 'marigold';
const CHANNEL_ID = 'marigold-default';

type ScheduleSpec = {
  identifier: string;
  title: string;
  body: string;
  trigger: Notifications.NotificationTriggerInput;
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }) as any,
});

export async function ensureChannel() {
  if (Platform.OS !== 'android') return;
  try {
    await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
      name: 'Marigold',
      importance: Notifications.AndroidImportance.DEFAULT,
      vibrationPattern: [0, 80, 60, 80],
      lightColor: '#C77B5C',
    });
  } catch {}
}

export async function requestPermissionIfNeeded(): Promise<boolean> {
  const settings = await Notifications.getPermissionsAsync();
  if (
    settings.granted ||
    settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
  ) {
    return true;
  }
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

function pickIntention(): string {
  const idx = new Date().getDate() % INTENTIONS.length;
  return INTENTIONS[idx];
}

// `SchedulableTriggerInputTypes` is not exported by every minor of
// expo-notifications we may build against; fall back to the literal strings
// the runtime accepts.
const Trigger = (Notifications as any).SchedulableTriggerInputTypes ?? {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  DATE: 'date',
};

function dailyAt(hour: number, minute: number): Notifications.NotificationTriggerInput {
  return {
    type: Trigger.DAILY,
    hour,
    minute,
    channelId: CHANNEL_ID,
  } as any;
}

function weeklyAt(weekday: number, hour: number, minute: number): Notifications.NotificationTriggerInput {
  return {
    type: Trigger.WEEKLY,
    weekday, // 1..7 Sunday..Saturday on iOS / Sun=1 on Android
    hour,
    minute,
    channelId: CHANNEL_ID,
  } as any;
}

export async function rescheduleAll(profile: Profile, prefs: NotificationPrefs): Promise<void> {
  await ensureChannel();
  await cancelMarigoldSchedules();

  const granted = await Notifications.getPermissionsAsync();
  if (!granted.granted) return; // Lazy permission. Re-runs whenever the user grants.

  const specs: ScheduleSpec[] = [];

  if (prefs.intention) {
    specs.push({
      identifier: `${TAG}-intention`,
      title: 'A small thought for today',
      body: pickIntention(),
      trigger: dailyAt(8, 30),
    });
  }

  if (prefs.milestone) {
    const meta = WEEK_METAPHORS[Math.min(40, profile.week + 1)];
    specs.push({
      identifier: `${TAG}-milestone`,
      title: `Welcome to week ${profile.week + 1}`,
      body: meta ? `Baby is the size of ${meta.fruit}.` : 'A new week — small, real progress.',
      trigger: weeklyAt(2, 9, 0), // Mondays
    });
  }

  if (prefs.kickNudge && profile.week >= 28) {
    specs.push({
      identifier: `${TAG}-kick-nudge`,
      title: 'Have you felt baby today?',
      body: 'Take a quiet five minutes and count a few movements.',
      trigger: dailyAt(19, 0),
    });
  }

  if (prefs.pelvicFloor) {
    specs.push({
      identifier: `${TAG}-pelvic-floor-am`,
      title: 'Pelvic floor · morning set',
      body: 'Three sets of ten. Squeeze, hold, release.',
      trigger: dailyAt(9, 0),
    });
    specs.push({
      identifier: `${TAG}-pelvic-floor-pm`,
      title: 'Pelvic floor · afternoon set',
      body: 'One more round before dinner.',
      trigger: dailyAt(16, 0),
    });
  }

  await Promise.all(
    specs.map((s) =>
      Notifications.scheduleNotificationAsync({
        identifier: s.identifier,
        content: { title: s.title, body: s.body, data: { tag: TAG } },
        trigger: s.trigger,
      }).catch(() => null),
    ),
  );
}

export async function scheduleReminder(at: Date, title: string, body: string): Promise<void> {
  await ensureChannel();
  if (!(await requestPermissionIfNeeded())) return;
  await Notifications.scheduleNotificationAsync({
    identifier: `${TAG}-rem-${at.getTime()}`,
    content: { title, body, data: { tag: TAG } },
    trigger: { type: Trigger.DATE, date: at } as any,
  }).catch(() => {});
}
