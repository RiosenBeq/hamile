// Journal — week-grouped log of every check, with verdict filter and PDF export.

import React, { memo, useCallback, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card, SectionHead } from '@/components/Card';
import { Icon } from '@/components/Icon';
import { Illo } from '@/components/Blob';
import { VerdictDot, VerdictPill } from '@/components/Verdict';
import { Drift } from '@/components/Drift';
import { useAppStore } from '@/store/useAppStore';
import { JournalItem } from '@/data/sample';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';
import { Verdict } from '@/theme/colors';

type FilterKey = Verdict | 'all';

const FILTERS: { k: FilterKey; label: string }[] = [
  { k: 'all', label: 'All' },
  { k: 'safe', label: 'Safe' },
  { k: 'caution', label: 'Caution' },
  { k: 'avoid', label: 'Avoid' },
];

const Row = memo(function Row({
  e,
  isLast,
  onPress,
}: {
  e: JournalItem;
  isLast: boolean;
  onPress: (item: JournalItem) => void;
}) {
  return (
    <View>
      <Pressable
        onPress={() => onPress(e)}
        accessibilityRole="button"
        style={styles.row}
      >
        <Illo label={e.label} hue={e.hue} size={44} />
        <View style={{ flex: 1 }}>
          <Text style={styles.rowTitle} numberOfLines={1}>
            {e.name}
          </Text>
          <Text style={styles.rowSub}>{e.when}</Text>
        </View>
        <VerdictPill kind={e.verdict} size="sm" />
      </Pressable>
      {!isLast ? <View style={styles.sep} /> : null}
    </View>
  );
});

export default function Journal() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const journal = useAppStore((s) => s.journal);
  const [filter, setFilter] = useState<FilterKey>('all');

  const groups = useMemo(() => {
    const filtered = filter === 'all' ? journal : journal.filter((j) => j.verdict === filter);
    const map = new Map<string, JournalItem[]>();
    for (const e of filtered) {
      const key = `Week ${e.week}`;
      const list = map.get(key);
      if (list) list.push(e);
      else map.set(key, [e]);
    }
    return Array.from(map.entries()).map(([wk, items]) => ({ wk, items }));
  }, [journal, filter]);

  const isEmpty = groups.length === 0;

  const openVerdict = useCallback(
    (e: JournalItem) =>
      router.push({ pathname: '/verdict', params: { item: e.name, mode: 'Food' } }),
    [router],
  );
  const openPdf = useCallback(() => router.push('/pdf'), [router]);

  return (
    <ScrollView
      contentContainerStyle={{ paddingTop: insets.top + 8, paddingBottom: 200 }}
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: colors.base }}
      removeClippedSubviews
    >
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.eyebrow}>Journal</Text>
          <Text style={styles.title}>What you asked.</Text>
        </View>
        <Pressable onPress={openPdf} accessibilityRole="button" style={styles.exportBtn}>
          <Icon.download size={15} color={colors.ink} />
          <Text style={styles.exportText}>Export PDF</Text>
        </Pressable>
      </View>

      <View style={styles.filtersRow}>
        {FILTERS.map((f) => {
          const sel = filter === f.k;
          return (
            <Pressable
              key={f.k}
              onPress={() => setFilter(f.k)}
              accessibilityRole="button"
              accessibilityState={{ selected: sel }}
              style={[
                styles.filterChip,
                {
                  backgroundColor: sel ? colors.ink : colors.surface,
                  borderWidth: sel ? 0 : 1,
                  borderColor: colors.line,
                },
              ]}
            >
              {f.k !== 'all' ? <VerdictDot kind={f.k as Verdict} size={8} /> : null}
              <Text
                style={[
                  styles.filterText,
                  { color: sel ? colors.base : colors.ink },
                ]}
              >
                {f.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {isEmpty ? (
        <View style={styles.emptyWrap}>
          <Drift>
            <View style={styles.emptyBlob} />
          </Drift>
          <Text style={styles.emptyTitle}>Nothing here yet.</Text>
          <Text style={styles.emptyBody}>Your first scan will land here.</Text>
        </View>
      ) : null}

      {groups.map(({ wk, items }) => (
        <View key={wk} style={{ paddingHorizontal: 24, marginTop: 28 }}>
          <Text style={styles.weekHead}>{wk}</Text>
          <Card>
            {items.map((e, i) => (
              <Row key={e.id} e={e} isLast={i === items.length - 1} onPress={openVerdict} />
            ))}
          </Card>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  eyebrow: {
    fontSize: 11,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    color: colors.mute,
    fontFamily: fonts.bodyBold,
  },
  title: {
    marginTop: 4,
    fontFamily: fonts.display,
    fontSize: 30,
    color: colors.ink,
    letterSpacing: -0.4,
  },
  exportBtn: {
    marginTop: 6,
    paddingHorizontal: 14,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.ink,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  exportText: {
    fontFamily: fonts.bodyBold,
    fontSize: 13,
    color: colors.ink,
  },
  filtersRow: {
    paddingHorizontal: 24,
    marginTop: 18,
    flexDirection: 'row',
    gap: 8,
  },
  filterChip: {
    height: 36,
    paddingHorizontal: 14,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  filterText: {
    fontSize: 13,
    fontFamily: fonts.bodyBold,
  },
  emptyWrap: {
    paddingHorizontal: 24,
    marginTop: 64,
    alignItems: 'center',
  },
  emptyBlob: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: colors.rose,
  },
  emptyTitle: {
    fontFamily: fonts.display,
    fontSize: 22,
    color: colors.ink,
    marginTop: 24,
  },
  emptyBody: {
    color: colors.mute,
    fontSize: 14,
    marginTop: 8,
    fontFamily: fonts.body,
  },
  weekHead: {
    fontSize: 11,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: colors.mute,
    fontFamily: fonts.bodyBold,
    marginBottom: 12,
  },
  row: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  rowTitle: {
    fontSize: 15,
    color: colors.ink,
    fontFamily: fonts.body,
  },
  rowSub: {
    fontSize: 12,
    color: colors.mute,
    marginTop: 2,
    fontFamily: fonts.body,
  },
  sep: {
    height: 1,
    backgroundColor: colors.line,
    marginLeft: 16,
  },
});
