// Inline month calendar used for due dates, last-period dates and
// appointments. Pure JS (no native picker) so it looks identical everywhere
// and matches the Marigold palette.

import React, { useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Icon } from '@/components/Icon';
import { addDays, daysBetween, startOfDay } from '@/lib/pregnancy';
import { useFormat, useT } from '@/i18n';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

type Props = {
  value: Date | null;
  onChange: (d: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  /** Optional day to ring (e.g. today). */
  marked?: Date;
};

export function CalendarPicker({ value, onChange, minDate, maxDate, marked }: Props) {
  const t = useT();
  const fmt = useFormat();
  const initial = value ?? marked ?? new Date();
  const [cursor, setCursor] = useState(new Date(initial.getFullYear(), initial.getMonth(), 1));

  const weekdayLabels = useMemo(() => {
    // Monday-first week, localised two-letter labels.
    const monday = new Date(2024, 0, 1); // a Monday
    return Array.from({ length: 7 }).map((_, i) =>
      addDays(monday, i).toLocaleDateString(fmt.locale, { weekday: 'narrow' }),
    );
  }, [fmt.locale]);

  const cells = useMemo(() => {
    const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
    const offset = (first.getDay() + 6) % 7; // Monday = 0
    const start = addDays(first, -offset);
    return Array.from({ length: 42 }).map((_, i) => addDays(start, i));
  }, [cursor]);

  const canPrev = !minDate || new Date(cursor.getFullYear(), cursor.getMonth(), 0) >= startOfDay(minDate);
  const canNext = !maxDate || new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1) <= startOfDay(maxDate);

  const isDisabled = (d: Date) =>
    (minDate && daysBetween(startOfDay(minDate), d) < 0) || (maxDate && daysBetween(d, startOfDay(maxDate)) < 0);
  const same = (a: Date | null | undefined, b: Date) => !!a && daysBetween(a, b) === 0;

  return (
    <View
      style={{
        backgroundColor: colors.surface,
        borderRadius: 24,
        padding: 14,
        borderWidth: 1,
        borderColor: colors.line,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <Pressable
          accessibilityLabel={t('dp.prev')}
          disabled={!canPrev}
          onPress={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
          style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center', opacity: canPrev ? 1 : 0.25 }}
        >
          <Icon.back size={18} color={colors.ink} />
        </Pressable>
        <Text style={{ fontFamily: fonts.display, fontSize: 18, color: colors.ink, textTransform: 'capitalize' }}>
          {cursor.toLocaleDateString(fmt.locale, { month: 'long', year: 'numeric' })}
        </Text>
        <Pressable
          accessibilityLabel={t('dp.next')}
          disabled={!canNext}
          onPress={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
          style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center', opacity: canNext ? 1 : 0.25 }}
        >
          <Icon.chevR size={18} color={colors.ink} />
        </Pressable>
      </View>

      <View style={{ flexDirection: 'row' }}>
        {weekdayLabels.map((w, i) => (
          <Text
            key={i}
            style={{ flex: 1, textAlign: 'center', color: colors.faint, fontFamily: fonts.bodyBold, fontSize: 12, marginBottom: 6 }}
          >
            {w}
          </Text>
        ))}
      </View>

      {Array.from({ length: 6 }).map((_, row) => (
        <View key={row} style={{ flexDirection: 'row' }}>
          {cells.slice(row * 7, row * 7 + 7).map((d) => {
            const inMonth = d.getMonth() === cursor.getMonth();
            const disabled = !!isDisabled(d);
            const selected = same(value, d);
            const isMarked = same(marked, d);
            return (
              <View key={d.toISOString()} style={{ flex: 1, aspectRatio: 1, padding: 2 }}>
                <Pressable
                  disabled={disabled}
                  accessibilityRole="button"
                  accessibilityLabel={d.toLocaleDateString(fmt.locale, { day: 'numeric', month: 'long', year: 'numeric' })}
                  accessibilityState={{ selected, disabled }}
                  onPress={() => {
                    Haptics.selectionAsync().catch(() => {});
                    onChange(startOfDay(d));
                    if (!inMonth) setCursor(new Date(d.getFullYear(), d.getMonth(), 1));
                  }}
                  style={{
                    flex: 1,
                    borderRadius: 999,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: selected ? colors.terracotta : 'transparent',
                    borderWidth: isMarked && !selected ? 1.5 : 0,
                    borderColor: colors.terracotta,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: selected ? fonts.bodyBold : fonts.body,
                      fontSize: 15,
                      color: selected ? '#fff' : disabled ? colors.line : inMonth ? colors.ink : colors.faint,
                    }}
                  >
                    {d.getDate()}
                  </Text>
                </Pressable>
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
}
