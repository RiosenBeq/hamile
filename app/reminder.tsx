// Reminder detail page. Opened when the user taps a row on Home → "This week's
// reminders". Shows the appointment with a quick checklist and a draft-questions
// CTA that hops to the doctor PDF.

import React from 'react';
import { ScrollView, Text, View, Linking } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card } from '@/components/Card';
import { Btn } from '@/components/Btn';
import { Icon } from '@/components/Icon';
import { SubScreenHeader } from '@/components/SubScreen';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

const REMINDER_DETAILS: Record<
  string,
  {
    when: string;
    where: string;
    note: string;
    checklist: string[];
    questions: string[];
  }
> = {
  'Anomaly scan': {
    when: 'Thursday 14 May · 10:30',
    where: 'Dr. Shah · St. Mary\'s, ground floor',
    note: 'Drink a tall glass of water 30 minutes before — a fuller bladder gives clearer images.',
    checklist: ['Maternity notes', 'Photo ID', 'Comfortable two-piece (top lifts up)', 'A snack for after'],
    questions: [
      'Are all the major organs developing as expected?',
      'Is the placenta well-placed for week 20+?',
      'Should I keep taking aspirin?',
    ],
  },
  'Iron + folate': {
    when: 'Daily, with breakfast',
    where: 'Pregnacare or generic Sandoz',
    note: 'Take with vitamin C (orange juice, kiwi) for absorption. Avoid tea or coffee within an hour.',
    checklist: ['Set a 7am phone reminder', 'Keep the bottle on the kitchen counter', 'Track skipped days in the journal'],
    questions: ['My iron came back at 11.4 — is that low enough to need a higher dose?'],
  },
  'Glucose test prep': {
    when: 'In 4 weeks',
    where: 'Lab will text the slot',
    note: 'No diet changes needed. Eat normally for 3 days before the test.',
    checklist: ['Drink 2L water the day before', 'Avoid heavy exercise the morning of', 'Bring a magazine — it\'s a 2-hour wait'],
    questions: ['How long will my results take? Who calls if abnormal?'],
  },
};

export default function Reminder() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { title } = useLocalSearchParams<{ title: string }>();
  const key = title || 'Anomaly scan';
  const detail = REMINDER_DETAILS[key] || REMINDER_DETAILS['Anomaly scan'];

  return (
    <View style={{ flex: 1, backgroundColor: colors.base }}>
      <SubScreenHeader caption="Reminder" />

      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: insets.bottom + 100 }}>
        <Text style={{ fontFamily: fonts.display, fontSize: 30, color: colors.ink, letterSpacing: -0.4, marginTop: 8 }}>
          {key}
        </Text>
        <Text style={{ color: colors.terracotta, fontSize: 14, marginTop: 6, fontFamily: fonts.bodyBold }}>
          {detail.when}
        </Text>
        <Text style={{ color: colors.mute, fontSize: 14, marginTop: 4, fontFamily: fonts.body }}>
          {detail.where}
        </Text>

        <Card style={{ padding: 18, marginTop: 24, backgroundColor: 'rgba(181,168,201,0.16)' }}>
          <Text style={{ fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase', color: colors.mute, fontFamily: fonts.bodyBold }}>
            Heads-up
          </Text>
          <Text style={{ color: colors.ink, fontSize: 15, marginTop: 6, lineHeight: 22, fontFamily: fonts.body }}>
            {detail.note}
          </Text>
        </Card>

        <Text style={{ marginTop: 28, fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase', color: colors.mute, fontFamily: fonts.bodyBold, marginBottom: 12 }}>
          What to bring
        </Text>
        <Card>
          {detail.checklist.map((c, i) => (
            <View key={c}>
              <View style={{ padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <View
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 11,
                    borderWidth: 1,
                    borderColor: colors.line,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                />
                <Text style={{ flex: 1, fontSize: 14.5, color: colors.ink, fontFamily: fonts.body }}>{c}</Text>
              </View>
              {i < detail.checklist.length - 1 ? (
                <View style={{ height: 1, backgroundColor: colors.line, marginLeft: 14 }} />
              ) : null}
            </View>
          ))}
        </Card>

        <Text style={{ marginTop: 28, fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase', color: colors.mute, fontFamily: fonts.bodyBold, marginBottom: 12 }}>
          Questions to ask
        </Text>
        <Card>
          {detail.questions.map((q, i) => (
            <View key={q}>
              <View style={{ padding: 14, flexDirection: 'row', gap: 12 }}>
                <Text style={{ color: colors.terracotta, fontFamily: fonts.bodyBold, fontSize: 14 }}>{i + 1}.</Text>
                <Text style={{ flex: 1, fontSize: 14.5, color: colors.ink, lineHeight: 22, fontFamily: fonts.body }}>
                  {q}
                </Text>
              </View>
              {i < detail.questions.length - 1 ? (
                <View style={{ height: 1, backgroundColor: colors.line, marginLeft: 14 }} />
              ) : null}
            </View>
          ))}
        </Card>
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          paddingHorizontal: 24,
          paddingTop: 12,
          paddingBottom: insets.bottom + 16,
          backgroundColor: colors.base,
          borderTopWidth: 1,
          borderTopColor: colors.line,
          flexDirection: 'row',
          gap: 10,
        }}
      >
        <Btn kind="secondary" onPress={() => Linking.openURL('tel:111').catch(() => {})} style={{ flex: 1 }}>
          <Icon.bell size={16} color={colors.ink} />
          <Text style={{ color: colors.ink, fontSize: 14, fontFamily: fonts.bodyBold }}>Call clinic</Text>
        </Btn>
        <Btn onPress={() => router.replace('/pdf')} style={{ flex: 1.4 }}>
          Prepare summary
        </Btn>
      </View>
    </View>
  );
}
