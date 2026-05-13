// Journal — week-grouped log of every check, with verdict filter and PDF export.

import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card } from '@/components/Card';
import { Icon } from '@/components/Icon';
import { Illo } from '@/components/Blob';
import { VerdictDot, VerdictPill } from '@/components/Verdict';
import { Drift } from '@/components/Drift';
import { useAppStore } from '@/store/useAppStore';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';
import { Verdict } from '@/theme/colors';

const FILTERS: { k: Verdict | 'all'; label: string }[] = [
  { k: 'all', label: 'All' },
  { k: 'safe', label: 'Safe' },
  { k: 'caution', label: 'Caution' },
  { k: 'avoid', label: 'Avoid' },
];

export default function Journal() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const journal = useAppStore((s) => s.journal);
  const [filter, setFilter] = useState<Verdict | 'all'>('all');

  const grouped = useMemo(() => {
    const filtered = filter === 'all' ? journal : journal.filter((j) => j.verdict === filter);
    return filtered.reduce<Record<string, typeof journal>>((acc, e) => {
      const k = `Week ${e.week}`;
      (acc[k] = acc[k] || []).push(e);
      return acc;
    }, {});
  }, [journal, filter]);

  const isEmpty = Object.keys(grouped).length === 0;

  return (
    <ScrollView
      contentContainerStyle={{ paddingTop: insets.top + 8, paddingBottom: 200 }}
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: colors.base }}
    >
      <View style={{ paddingHorizontal: 24, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <View>
          <Text style={{ fontSize: 11, letterSpacing: 1.8, textTransform: 'uppercase', color: colors.mute, fontFamily: fonts.bodyBold }}>
            Journal
          </Text>
          <Text style={{ marginTop: 4, fontFamily: fonts.display, fontSize: 30, color: colors.ink, letterSpacing: -0.4 }}>
            What you asked.
          </Text>
        </View>
        <Pressable
          onPress={() => router.push('/pdf')}
          style={{
            marginTop: 6,
            paddingHorizontal: 14,
            height: 40,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: colors.ink,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <Icon.download size={15} color={colors.ink} />
          <Text style={{ fontFamily: fonts.bodyBold, fontSize: 13, color: colors.ink }}>Export PDF</Text>
        </Pressable>
      </View>

      <View style={{ paddingHorizontal: 24, marginTop: 18, flexDirection: 'row', gap: 8 }}>
        {FILTERS.map((f) => {
          const sel = filter === f.k;
          return (
            <Pressable
              key={f.k}
              onPress={() => setFilter(f.k)}
              style={{
                height: 36,
                paddingHorizontal: 14,
                borderRadius: 18,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 6,
                backgroundColor: sel ? colors.ink : colors.surface,
                borderWidth: sel ? 0 : 1,
                borderColor: colors.line,
              }}
            >
              {f.k !== 'all' ? <VerdictDot kind={f.k as Verdict} size={8} /> : null}
              <Text style={{ color: sel ? colors.base : colors.ink, fontSize: 13, fontFamily: fonts.bodyBold }}>{f.label}</Text>
            </Pressable>
          );
        })}
      </View>

      {isEmpty ? (
        <View style={{ paddingHorizontal: 24, marginTop: 64, alignItems: 'center' }}>
          <Drift>
            <View
              style={{
                width: 128,
                height: 128,
                borderRadius: 64,
                backgroundColor: colors.rose,
              }}
            />
          </Drift>
          <Text style={{ fontFamily: fonts.display, fontSize: 22, color: colors.ink, marginTop: 24 }}>Nothing here yet.</Text>
          <Text style={{ color: colors.mute, fontSize: 14, marginTop: 8, fontFamily: fonts.body }}>Your first scan will land here.</Text>
        </View>
      ) : null}

      {Object.entries(grouped).map(([wk, items]) => (
        <View key={wk} style={{ paddingHorizontal: 24, marginTop: 28 }}>
          <Text style={{ fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase', color: colors.mute, fontFamily: fonts.bodyBold, marginBottom: 12 }}>
            {wk}
          </Text>
          <Card>
            {items.map((e, i) => (
              <View key={e.id}>
                <Pressable
                  onPress={() => router.push({ pathname: '/verdict', params: { item: e.name, mode: 'Food' } })}
                  style={{ padding: 16, flexDirection: 'row', alignItems: 'center', gap: 16 }}
                >
                  <Illo label={e.label} hue={e.hue} size={44} />
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 15, color: colors.ink, fontFamily: fonts.body }} numberOfLines={1}>
                      {e.name}
                    </Text>
                    <Text style={{ fontSize: 12, color: colors.mute, marginTop: 2, fontFamily: fonts.body }}>{e.when}</Text>
                  </View>
                  <VerdictPill kind={e.verdict} size="sm" />
                </Pressable>
                {i < items.length - 1 ? (
                  <View style={{ height: 1, backgroundColor: colors.line, marginLeft: 16 }} />
                ) : null}
              </View>
            ))}
          </Card>
        </View>
      ))}
    </ScrollView>
  );
}
