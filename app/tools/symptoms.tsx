// Symptom log. Daily check-in across five axes (mood, nausea, sleep, cramps,
// energy) plus a free-text note. The 14-day bar strip gives a glance at the
// rhythm of your week.

import React, { useMemo, useState } from 'react';
import { ScrollView, Text, TextInput, View, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Btn } from '@/components/Btn';
import { Card, SectionHead } from '@/components/Card';
import { BarStrip } from '@/components/charts/BarStrip';
import { SubScreenHeader } from '@/components/SubScreen';
import { useAppStore, type SymptomEntry } from '@/store/useAppStore';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

const MOOD_LABEL = ['', 'Rough', 'Low', 'Steady', 'Bright', 'Glowing'];
const NAUSEA_LABEL = ['None', 'Mild', 'Bad', 'Severe'];
const SLEEP_LABEL = ['', 'Wrecked', 'Patchy', 'Okay', 'Good', 'Restful'];
const CRAMPS_LABEL = ['None', 'Mild', 'Bad', 'Severe'];
const ENERGY_LABEL = ['', 'Drained', 'Low', 'Steady', 'Up', 'Buzzing'];

function Scale<T extends number>({
  label,
  value,
  setValue,
  options,
  labels,
  tint,
}: {
  label: string;
  value: T;
  setValue: (v: T) => void;
  options: T[];
  labels: string[];
  tint: string;
}) {
  return (
    <View style={{ paddingVertical: 12 }}>
      <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 13, letterSpacing: 1.4, textTransform: 'uppercase', color: colors.mute, fontFamily: fonts.bodyBold }}>
          {label}
        </Text>
        <Text style={{ fontSize: 13, color: colors.ink, fontFamily: fonts.bodyBold }}>{labels[value] ?? '—'}</Text>
      </View>
      <View style={{ flexDirection: 'row', gap: 8, marginTop: 10 }}>
        {options.map((o) => {
          const sel = value === o;
          return (
            <Pressable
              key={o}
              onPress={() => setValue(o)}
              style={{
                flex: 1,
                height: 44,
                borderRadius: 14,
                backgroundColor: sel ? tint : colors.surface,
                borderWidth: 1,
                borderColor: sel ? tint : colors.line,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ color: sel ? '#fff' : colors.ink, fontFamily: fonts.bodyBold, fontSize: 14 }}>
                {o}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default function Symptoms() {
  const insets = useSafeAreaInsets();
  const profile = useAppStore((s) => s.profile);
  const symptoms = useAppStore((s) => s.symptoms);
  const addSymptom = useAppStore((s) => s.addSymptom);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todays = useMemo(() => symptoms.find((s) => {
    const d = new Date(s.at); d.setHours(0, 0, 0, 0);
    return d.getTime() === today.getTime();
  }), [symptoms, today]);

  const [mood, setMood] = useState<1 | 2 | 3 | 4 | 5>(todays?.mood ?? 3);
  const [nausea, setNausea] = useState<0 | 1 | 2 | 3>(todays?.nausea ?? 0);
  const [sleep, setSleep] = useState<1 | 2 | 3 | 4 | 5>(todays?.sleep ?? 3);
  const [cramps, setCramps] = useState<0 | 1 | 2 | 3>(todays?.cramps ?? 0);
  const [energy, setEnergy] = useState<1 | 2 | 3 | 4 | 5>(todays?.energy ?? 3);
  const [note, setNote] = useState(todays?.note ?? '');

  const onSave = () => {
    const entry: SymptomEntry = {
      id: todays?.id ?? `sy-${Date.now()}`,
      at: Date.now(),
      week: profile.week,
      mood,
      nausea,
      sleep,
      cramps,
      energy,
      note: note.trim() || undefined,
    };
    addSymptom(entry);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.base }}>
      <SubScreenHeader caption="Symptoms" />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: insets.bottom + 32 }}>
        <Text style={{ fontFamily: fonts.display, fontSize: 30, color: colors.ink, letterSpacing: -0.4, marginTop: 8 }}>
          How was today?
        </Text>
        <Text style={{ color: colors.mute, fontSize: 14, marginTop: 8, fontFamily: fonts.body, lineHeight: 20 }}>
          One quick read across the day. We'll show patterns over the last two weeks below.
        </Text>

        <Card style={{ marginTop: 22, padding: 18 }}>
          <Scale
            label="Mood"
            value={mood}
            setValue={setMood}
            options={[1, 2, 3, 4, 5] as const as any}
            labels={MOOD_LABEL}
            tint={colors.lavender}
          />
          <Scale
            label="Nausea"
            value={nausea}
            setValue={setNausea}
            options={[0, 1, 2, 3] as const as any}
            labels={NAUSEA_LABEL}
            tint={colors.coral}
          />
          <Scale
            label="Sleep"
            value={sleep}
            setValue={setSleep}
            options={[1, 2, 3, 4, 5] as const as any}
            labels={SLEEP_LABEL}
            tint={colors.sage}
          />
          <Scale
            label="Cramps"
            value={cramps}
            setValue={setCramps}
            options={[0, 1, 2, 3] as const as any}
            labels={CRAMPS_LABEL}
            tint={colors.amber}
          />
          <Scale
            label="Energy"
            value={energy}
            setValue={setEnergy}
            options={[1, 2, 3, 4, 5] as const as any}
            labels={ENERGY_LABEL}
            tint={colors.terracotta}
          />

          <View style={{ marginTop: 12 }}>
            <Text style={{ fontSize: 13, letterSpacing: 1.4, textTransform: 'uppercase', color: colors.mute, fontFamily: fonts.bodyBold }}>
              Note
            </Text>
            <TextInput
              value={note}
              onChangeText={setNote}
              placeholder="Anything notable today? Optional."
              placeholderTextColor={colors.mute}
              multiline
              style={{
                marginTop: 8,
                minHeight: 80,
                padding: 12,
                backgroundColor: colors.base,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: colors.line,
                fontSize: 14,
                color: colors.ink,
                fontFamily: fonts.body,
                textAlignVertical: 'top',
              }}
            />
          </View>

          <View style={{ marginTop: 16 }}>
            <Btn onPress={onSave}>{todays ? 'Update today' : 'Save today'}</Btn>
          </View>
        </Card>

        <View style={{ marginTop: 28 }}>
          <SectionHead caption="Trend" title="Last two weeks" />
          <Card style={{ padding: 18 }}>
            <BarStrip symptoms={symptoms} />
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}
