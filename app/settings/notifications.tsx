// Notification preferences — few, gentle, never promotional.

import React, { useCallback, useEffect, useState } from 'react';
import { AppState, Linking, Pressable, Text, View } from 'react-native';
import * as Notifications from 'expo-notifications';
import { Btn } from '@/components/Btn';
import { Body, Eyebrow, H1, NavBar, Page, Surface, ToggleRow } from '@/components/ui';
import { Icon } from '@/components/Icon';
import { useAppStore } from '@/store/useAppStore';
import { rescheduleAll, requestPermissionIfNeeded } from '@/lib/notifications';
import { useT } from '@/i18n';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';
import type { NotificationPrefs, NotificationTimes } from '@/store/types';

export default function NotificationSettings() {
  const t = useT();
  const prefs = useAppStore((s) => s.notifPrefs);
  const patch = useAppStore((s) => s.patchNotifPrefs);
  const times = useAppStore((s) => s.notifTimes);
  const patchTimes = useAppStore((s) => s.patchNotifTimes);

  const shift = (key: keyof NotificationTimes, delta: number) => {
    const [h, m] = (times[key] ?? '09:00').split(':').map(Number);
    let mins = (h * 60 + m + delta + 24 * 60) % (24 * 60);
    mins = Math.round(mins / 15) * 15;
    const hh = String(Math.floor(mins / 60) % 24).padStart(2, '0');
    const mm = String(mins % 60).padStart(2, '0');
    patchTimes({ [key]: `${hh}:${mm}` });
    const st = useAppStore.getState();
    rescheduleAll(st.profile, st.notifPrefs).catch(() => {});
  };
  const [status, setStatus] = useState<'granted' | 'denied' | 'undetermined'>('undetermined');

  const refresh = useCallback(async () => {
    try {
      const s = await Notifications.getPermissionsAsync();
      setStatus(s.granted ? 'granted' : s.canAskAgain ? 'undetermined' : 'denied');
    } catch {
      setStatus('undetermined');
    }
  }, []);

  useEffect(() => {
    refresh();
    const sub = AppState.addEventListener('change', (st) => st === 'active' && refresh());
    return () => sub.remove();
  }, [refresh]);

  const set = async (key: keyof NotificationPrefs, value: boolean) => {
    if (value && status !== 'granted') {
      const ok = await requestPermissionIfNeeded().catch(() => false);
      await refresh();
      if (!ok) return;
    }
    patch({ [key]: value });
    const s = useAppStore.getState();
    rescheduleAll(s.profile, s.notifPrefs).catch(() => {});
  };

  const rows: [keyof NotificationPrefs, string, string][] = [
    ['milestone', t('nt.milestone'), t('nt.milestoneSub')],
    ['reminders', t('nt.reminders'), t('nt.remindersSub')],
    ['intention', t('nt.intention'), t('nt.intentionSub')],
    ['kickNudge', t('nt.kick'), t('nt.kickSub')],
    ['water', t('nt.water'), t('nt.waterSub')],
    ['pelvicFloor', t('nt.pelvic'), t('nt.pelvicSub')],
    ['nudge', t('nt.nudge'), t('nt.nudgeSub')],
  ];

  const timeRows: [keyof NotificationTimes, string][] = [
    ['week', t('nt.time.week')],
    ['thought', t('nt.time.thought')],
    ['kick', t('nt.time.kick')],
  ];

  return (
    <Page header={<NavBar caption={t('me.title')} />}>
      <View style={{ paddingHorizontal: 20 }}>
        <H1>{t('nt.title')}</H1>
        <Body mute style={{ marginTop: 8 }}>{t('nt.intro')}</Body>
      </View>

      {status === 'denied' ? (
        <View style={{ paddingHorizontal: 20, marginTop: 16 }}>
          <Surface style={{ backgroundColor: colors.marigoldSoft, shadowOpacity: 0 }}>
            <Text style={{ fontFamily: fonts.bodyBold, fontSize: 15, color: colors.ink }}>{t('nt.off')}</Text>
            <Btn kind="secondary" style={{ marginTop: 12, height: 46 }} onPress={() => Linking.openSettings().catch(() => {})}>
              {t('nt.openSettings')}
            </Btn>
          </Surface>
        </View>
      ) : status === 'undetermined' ? (
        <View style={{ paddingHorizontal: 20, marginTop: 16 }}>
          <Btn
            onPress={async () => {
              await requestPermissionIfNeeded().catch(() => false);
              await refresh();
              const s = useAppStore.getState();
              rescheduleAll(s.profile, s.notifPrefs).catch(() => {});
            }}
          >
            {t('nt.enable')}
          </Btn>
        </View>
      ) : null}

      <View style={{ paddingHorizontal: 20, marginTop: 16 }}>
        <Surface padded={false} style={{ overflow: 'hidden' }}>
          {rows.map(([key, title, sub], i) => (
            <ToggleRow
              key={key}
              title={title}
              sub={sub}
              value={status === 'granted' && (key === 'nudge' ? prefs.nudge !== false : !!prefs[key])}
              onChange={(v) => set(key, v)}
              last={i === rows.length - 1}
            />
          ))}
        </Surface>
      </View>

      <View style={{ paddingHorizontal: 20, marginTop: 18 }}>
        <Eyebrow style={{ marginBottom: 8 }}>{t('nt.times')}</Eyebrow>
        <Surface padded={false} style={{ overflow: 'hidden' }}>
          {timeRows.map(([key, label], i) => (
            <View
              key={key}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 16,
                paddingVertical: 12,
                borderBottomWidth: i === timeRows.length - 1 ? 0 : 1,
                borderBottomColor: colors.line,
              }}
            >
              <Text style={{ flex: 1, fontFamily: fonts.bodyBold, fontSize: 15, color: colors.ink }}>{label}</Text>
              <Pressable onPress={() => shift(key, -15)} hitSlop={8} accessibilityLabel={t('nt.earlier')} style={{ width: 34, height: 34, borderRadius: 17, backgroundColor: colors.sand, alignItems: 'center', justifyContent: 'center' }}>
                <Icon.minus size={16} color={colors.ink} />
              </Pressable>
              <Text style={{ width: 64, textAlign: 'center', fontFamily: fonts.display, fontSize: 19, color: colors.ink }}>{times[key]}</Text>
              <Pressable onPress={() => shift(key, 15)} hitSlop={8} accessibilityLabel={t('nt.later')} style={{ width: 34, height: 34, borderRadius: 17, backgroundColor: colors.sand, alignItems: 'center', justifyContent: 'center' }}>
                <Icon.plus size={16} color={colors.ink} />
              </Pressable>
            </View>
          ))}
        </Surface>
      </View>
    </Page>
  );
}
