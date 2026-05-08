// Country & cuisine sub-page. Lets the user change the country used for food
// rules (e.g. UK vs US for soft cheese, prawns, etc).

import React, { useCallback, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import { SubScreenHeader } from '@/components/SubScreen';
import { Icon } from '@/components/Icon';
import { useAppStore } from '@/store/useAppStore';
import { COUNTRIES } from '@/data/sample';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

const FLAG: Record<string, string> = {
  'United Kingdom': '🇬🇧',
  'United States': '🇺🇸',
  France: '🇫🇷',
  Germany: '🇩🇪',
  Japan: '🇯🇵',
  Australia: '🇦🇺',
  Canada: '🇨🇦',
  Italy: '🇮🇹',
  Turkey: '🇹🇷',
};

export default function CountrySetting() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const profile = useAppStore((s) => s.profile);
  const patchProfile = useAppStore((s) => s.patchProfile);
  const [q, setQ] = useState('');

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return COUNTRIES;
    return COUNTRIES.filter((c) => c.toLowerCase().includes(needle));
  }, [q]);

  const onPick = useCallback(
    (c: string) => {
      patchProfile({ country: c });
      router.back();
    },
    [patchProfile, router],
  );

  const renderItem = useCallback(
    ({ item, index }: { item: string; index: number }) => {
      const sel = item === profile.country;
      return (
        <View>
          <Pressable
            onPress={() => onPick(item)}
            accessibilityRole="button"
            accessibilityState={{ selected: sel }}
            style={styles.row}
          >
            <Text style={styles.flag}>{FLAG[item] ?? '🌍'}</Text>
            <Text
              style={[
                styles.name,
                { color: sel ? colors.terracotta : colors.ink, fontFamily: sel ? fonts.bodyBold : fonts.body },
              ]}
            >
              {item}
            </Text>
            {sel ? <Icon.check size={18} color={colors.terracotta} /> : null}
          </Pressable>
          {index < list.length - 1 ? <View style={styles.sep} /> : null}
        </View>
      );
    },
    [list.length, onPick, profile.country],
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.base }}>
      <SubScreenHeader caption="Country" />

      <View style={{ paddingHorizontal: 24, paddingTop: 8 }}>
        <Text style={styles.title}>Where you eat.</Text>
        <Text style={styles.subtitle}>
          Food rules and dish names vary. We tune to your country so the verdicts
          match the menu you're holding.
        </Text>
      </View>

      <View style={{ paddingHorizontal: 24, marginTop: 18 }}>
        <View style={styles.searchBox}>
          <Icon.search size={18} color={colors.mute} />
          <TextInput
            value={q}
            onChangeText={setQ}
            placeholder="Search countries"
            placeholderTextColor={colors.mute}
            autoCorrect={false}
            autoCapitalize="words"
            returnKeyType="search"
            style={styles.searchInput}
          />
        </View>
      </View>

      <View style={{ flex: 1, paddingHorizontal: 24, marginTop: 14 }}>
        <View style={styles.listCard}>
          <FlashList
            data={list}
            keyExtractor={(item) => item}
            renderItem={renderItem}
            estimatedItemSize={56}
            contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}
            keyboardShouldPersistTaps="handled"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
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
    height: 48,
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
    fontSize: 15,
    color: colors.ink,
    fontFamily: fonts.body,
  },
  listCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: colors.ink,
    shadowOpacity: 0.06,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  row: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  flag: {
    fontSize: 20,
  },
  name: {
    flex: 1,
    fontSize: 15,
  },
  sep: {
    height: 1,
    backgroundColor: colors.line,
    marginLeft: 50,
  },
});
