// Activity check — trimester-aware list with quick search.

import React, { useCallback, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import { Icon } from '@/components/Icon';
import { VerdictDot } from '@/components/Verdict';
import { ACTIVITY_LIST } from '@/data/sample';
import { Verdict, colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

type Row = { name: string; verdict: Verdict; why: string };

const ACTIVITIES: Row[] = ACTIVITY_LIST.map(([name, verdict, why]) => ({ name, verdict, why }));

export default function Activity() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return ACTIVITIES;
    return ACTIVITIES.filter((row) => row.name.toLowerCase().includes(needle));
  }, [q]);

  const renderItem = useCallback(
    ({ item, index }: { item: Row; index: number }) => (
      <View>
        <Pressable
          onPress={() =>
            router.replace({ pathname: '/verdict', params: { item: item.name, mode: 'Activity' } })
          }
          accessibilityRole="button"
          style={styles.row}
        >
          <VerdictDot kind={item.verdict} />
          <View style={{ flex: 1 }}>
            <Text style={styles.title} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={styles.sub} numberOfLines={1}>
              {item.why}
            </Text>
          </View>
          <Icon.chevR size={18} color={colors.mute} />
        </Pressable>
        {index < filtered.length - 1 ? <View style={styles.sep} /> : null}
      </View>
    ),
    [filtered.length, router],
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.base }}>
      <View
        style={[styles.header, { paddingTop: insets.top + 8 }]}
      >
        <Pressable
          onPress={() => router.back()}
          accessibilityLabel="Back"
          hitSlop={8}
          style={styles.headerBtn}
        >
          <Icon.back size={18} color={colors.ink} />
        </Pressable>
        <Text style={styles.headerLabel}>Activity</Text>
        <View style={{ width: 36 }} />
      </View>

      <View style={{ paddingHorizontal: 24, paddingTop: 8 }}>
        <Text style={styles.title30}>What can I do?</Text>
        <Text style={styles.subtitle}>Trimester-aware. Tap any line for the why.</Text>
      </View>

      <View style={{ paddingHorizontal: 24, marginTop: 18 }}>
        <View style={styles.searchBox}>
          <Icon.search size={16} color={colors.mute} />
          <TextInput
            value={q}
            onChangeText={setQ}
            placeholder="Search activities"
            placeholderTextColor={colors.mute}
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="search"
            style={styles.searchInput}
          />
          <Pressable hitSlop={8}>
            <Icon.filter size={16} color={colors.mute} />
          </Pressable>
        </View>
      </View>

      <View style={{ flex: 1, paddingHorizontal: 24, marginTop: 18 }}>
        <View style={styles.listCard}>
          <FlashList
            data={filtered}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            estimatedItemSize={64}
            contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
            keyboardShouldPersistTaps="handled"
          />
        </View>
      </View>
    </View>
  );
}

const keyExtractor = (item: Row) => item.name;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerLabel: {
    fontSize: 12,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: colors.mute,
    fontFamily: fonts.bodyBold,
  },
  title30: {
    fontFamily: fonts.display,
    fontSize: 30,
    color: colors.ink,
    letterSpacing: -0.4,
  },
  subtitle: {
    color: colors.mute,
    fontSize: 14,
    marginTop: 8,
    fontFamily: fonts.body,
  },
  searchBox: {
    height: 44,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.ink,
    fontFamily: fonts.body,
  },
  listCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: colors.ink,
    shadowOpacity: 0.08,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  row: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontSize: 15,
    color: colors.ink,
    fontFamily: fonts.body,
  },
  sub: {
    fontSize: 12.5,
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
