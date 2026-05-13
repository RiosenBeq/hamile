// Notifications sub-page. Toggles for each cadence; we don't actually wire a
// scheduler here — that hooks into expo-notifications when you ship.

import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card, SectionHead } from '@/components/Card';
import { SubScreenHeader, Toggle } from '@/components/SubScreen';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

export default function NotificationsSetting() {
  const insets = useSafeAreaInsets();
  const [intention, setIntention] = useState(true);
  const [milestone, setMilestone] = useState(true);
  const [reminders, setReminders] = useState(true);
  const [partner, setPartner] = useState(false);
  const [emergency, setEmergency] = useState(true);

  return (
    <View style={{ flex: 1, backgroundColor: colors.base }}>
      <SubScreenHeader caption="Notifications" />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: insets.bottom + 32 }}>
        <Text style={{ fontFamily: fonts.display, fontSize: 30, color: colors.ink, letterSpacing: -0.4, marginTop: 8 }}>
          Quiet by design.
        </Text>
        <Text style={{ color: colors.mute, fontSize: 14, marginTop: 8, fontFamily: fonts.body }}>
          We send only what's actually useful. Turn anything off — Marigold
          will never bother you about it again.
        </Text>

        <View style={{ marginTop: 24 }}>
          <SectionHead caption="Cadence" title="When we'll nudge you" />
          <Card>
            <ToggleRow
              title="Daily intention"
              sub="One short, calm thought each morning"
              value={intention}
              onChange={setIntention}
              isLast={false}
            />
            <ToggleRow
              title="Weekly milestone"
              sub="A new week, a new fruit metaphor"
              value={milestone}
              onChange={setMilestone}
              isLast={false}
            />
            <ToggleRow
              title="Doctor visit reminders"
              sub="The day before · the morning of"
              value={reminders}
              onChange={setReminders}
              isLast={true}
            />
          </Card>
        </View>

        <View style={{ marginTop: 24 }}>
          <SectionHead caption="People" title="Sharing" />
          <Card>
            <ToggleRow
              title="Partner activity"
              sub="When your partner saves or asks something"
              value={partner}
              onChange={setPartner}
              isLast={false}
            />
            <ToggleRow
              title="Emergency follow-up"
              sub="A check-in the morning after"
              value={emergency}
              onChange={setEmergency}
              isLast={true}
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
  isLast,
}: {
  title: string;
  sub?: string;
  value: boolean;
  onChange: (v: boolean) => void;
  isLast: boolean;
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
