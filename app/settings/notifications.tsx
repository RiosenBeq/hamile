// Notifications sub-page. Toggles drive the live expo-notifications schedule.
// Permission is requested lazily on the first "on" toggle.

import React from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card, SectionHead } from '@/components/Card';
import { SubScreenHeader, Toggle } from '@/components/SubScreen';
import { useAppStore, type NotificationPrefs } from '@/store/useAppStore';
import { rescheduleAll, requestPermissionIfNeeded } from '@/lib/notifications';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

type Key = keyof NotificationPrefs;

export default function NotificationsSetting() {
  const insets = useSafeAreaInsets();
  const profile = useAppStore((s) => s.profile);
  const prefs = useAppStore((s) => s.notifPrefs);
  const patchNotifPrefs = useAppStore((s) => s.patchNotifPrefs);

  const setKey = async (key: Key, value: boolean) => {
    if (value) {
      const ok = await requestPermissionIfNeeded();
      if (!ok) {
        Alert.alert(
          'Notifications are off',
          'Open Settings → Marigold → Notifications to allow them, then come back.',
        );
        return;
      }
    }
    patchNotifPrefs({ [key]: value } as Partial<NotificationPrefs>);
    rescheduleAll(profile, { ...prefs, [key]: value }).catch(() => {});
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.base }}>
      <SubScreenHeader caption="Notifications" />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: insets.bottom + 32 }}>
        <Text style={{ fontFamily: fonts.display, fontSize: 30, color: colors.ink, letterSpacing: -0.4, marginTop: 8 }}>
          Quiet by design.
        </Text>
        <Text style={{ color: colors.mute, fontSize: 14, marginTop: 8, fontFamily: fonts.body }}>
          We send only what's actually useful. Turn anything off — Marigold will never bother you
          about it again.
        </Text>

        <View style={{ marginTop: 24 }}>
          <SectionHead caption="Cadence" title="When we'll nudge you" />
          <Card>
            <ToggleRow
              title="Daily intention"
              sub="One short, calm thought each morning"
              value={prefs.intention}
              onChange={(v) => setKey('intention', v)}
            />
            <ToggleRow
              title="Weekly milestone"
              sub="A new week, a new fruit metaphor — Mondays at 9am"
              value={prefs.milestone}
              onChange={(v) => setKey('milestone', v)}
            />
            <ToggleRow
              title="Doctor visit reminders"
              sub="The day before · the morning of"
              value={prefs.reminders}
              onChange={(v) => setKey('reminders', v)}
              isLast
            />
          </Card>
        </View>

        <View style={{ marginTop: 24 }}>
          <SectionHead caption="Wellbeing" title="Self-care" />
          <Card>
            <ToggleRow
              title="Kick count nudge"
              sub={profile.week >= 28 ? 'Evening, only on days with no movements logged' : 'Activates from week 28'}
              value={prefs.kickNudge}
              onChange={(v) => setKey('kickNudge', v)}
            />
            <ToggleRow
              title="Pelvic floor"
              sub="Twice a day · 9am and 4pm"
              value={prefs.pelvicFloor}
              onChange={(v) => setKey('pelvicFloor', v)}
              isLast
            />
          </Card>
        </View>

        <View style={{ marginTop: 24 }}>
          <SectionHead caption="People" title="Sharing" />
          <Card>
            <ToggleRow
              title="Partner activity"
              sub="When your partner saves or asks something"
              value={prefs.partner}
              onChange={(v) => setKey('partner', v)}
            />
            <ToggleRow
              title="Emergency follow-up"
              sub="A check-in the morning after"
              value={prefs.emergency}
              onChange={(v) => setKey('emergency', v)}
              isLast
            />
          </Card>
        </View>

        <Text style={{ marginTop: 20, fontSize: 12, color: colors.mute, fontFamily: fonts.body, textAlign: 'center' }}>
          Notifications never include diagnoses or sensitive details.
        </Text>
      </ScrollView>
    </View>
  );
}

function ToggleRow({
  title,
  sub,
  value,
  onChange,
  isLast = false,
}: {
  title: string;
  sub?: string;
  value: boolean;
  onChange: (v: boolean) => void;
  isLast?: boolean;
}) {
  return (
    <View>
      <View style={{ padding: 16, flexDirection: 'row', alignItems: 'center', gap: 16 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 15, color: colors.ink, fontFamily: fonts.body }}>{title}</Text>
          {sub ? (
            <Text style={{ fontSize: 12.5, color: colors.mute, marginTop: 2, fontFamily: fonts.body }}>{sub}</Text>
          ) : null}
        </View>
        <Toggle value={value} onChange={onChange} />
      </View>
      {!isLast ? <View style={{ height: 1, backgroundColor: colors.line, marginLeft: 16 }} /> : null}
    </View>
  );
}
