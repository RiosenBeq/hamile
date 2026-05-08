// 14-day stack of horizontal-bar groups for symptom intensity. Each day shows
// 5 short bars (mood / nausea / sleep / cramps / energy), height encoding
// intensity. Empty days render as ghost rails so the rhythm of the strip is
// readable at a glance.

import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';
import { SymptomEntry } from '@/store/useAppStore';

type Props = {
  symptoms: SymptomEntry[];
  days?: number;
  onDayPress?: (entry: SymptomEntry | null, day: Date) => void;
};

const METRICS: { key: keyof SymptomEntry; tint: string; max: number }[] = [
  { key: 'mood', tint: colors.lavender, max: 5 },
  { key: 'nausea', tint: colors.coral, max: 3 },
  { key: 'sleep', tint: colors.sage, max: 5 },
  { key: 'cramps', tint: colors.amber, max: 3 },
  { key: 'energy', tint: colors.terracotta, max: 5 },
];

const dayKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

export function BarStrip({ symptoms, days = 14, onDayPress }: Props) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const byDay = new Map<string, SymptomEntry>();
  for (const s of symptoms) {
    const d = new Date(s.at);
    d.setHours(0, 0, 0, 0);
    byDay.set(dayKey(d), s);
  }

  const cells: { day: Date; entry: SymptomEntry | null }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    cells.push({ day: d, entry: byDay.get(dayKey(d)) ?? null });
  }

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 4, height: 96 }}>
        {cells.map(({ day, entry }) => (
          <Pressable
            key={day.toISOString()}
            onPress={() => onDayPress?.(entry, day)}
            style={{
              flex: 1,
              height: '100%',
              backgroundColor: 'rgba(237,228,216,0.45)',
              borderRadius: 4,
              padding: 3,
              gap: 2,
              justifyContent: 'flex-end',
            }}
          >
            {METRICS.map((m) => {
              const v = entry ? (entry[m.key] as number) : 0;
              const ratio = v / m.max;
              return (
                <View
                  key={m.key}
                  style={{
                    height: Math.max(2, 14 * ratio),
                    backgroundColor: entry ? m.tint : 'transparent',
                    borderRadius: 2,
                    opacity: 0.85,
                  }}
                />
              );
            })}
          </Pressable>
        ))}
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 }}>
        <Text style={{ fontSize: 11, color: colors.mute, fontFamily: fonts.body }}>
          {cells[0].day.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
        </Text>
        <Text style={{ fontSize: 11, color: colors.mute, fontFamily: fonts.body }}>Today</Text>
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 14 }}>
        {METRICS.map((m) => (
          <View key={m.key} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <View style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: m.tint }} />
            <Text style={{ fontSize: 12, color: colors.ink, fontFamily: fonts.body, textTransform: 'capitalize' }}>
              {m.key}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
