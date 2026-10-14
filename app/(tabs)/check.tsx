// "Can I…?" — search the bundled safety library (food, drinks, medicine,
// supplements, beauty, activities, travel, home) with category filters,
// popular quick-picks, recent and saved lookups. Works fully offline.

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, Pressable, Text, TextInput, View, Keyboard } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@/components/Icon';
import { VerdictPill } from '@/components/Verdict';
import { Chip, EmojiBadge, Eyebrow, H1, Surface, EmptyState } from '@/components/ui';
import { useAppStore } from '@/store/useAppStore';
import { getSafetyItem, popularSafety, SAFETY, SAFETY_CATEGORIES, searchSafety } from '@/content';
import type { SafetyCategory, SafetyItem } from '@/content';
import { aiConfigured } from '@/lib/ai';
import { useL10n, useLang, useT } from '@/i18n';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

export default function Check() {
  const t = useT();
  const L = useL10n();
  const lang = useLang();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ focus?: string; cat?: string }>();
  const recentIds = useAppStore((s) => s.safetyRecent);
  const savedIds = useAppStore((s) => s.safetySaved);
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState<SafetyCategory | 'all'>('all');
  const input = useRef<TextInput>(null);

  useEffect(() => {
    if (params.focus) {
      const id = setTimeout(() => input.current?.focus(), 350);
      return () => clearTimeout(id);
    }
  }, [params.focus]);
  useEffect(() => {
    if (params.cat) setCat(params.cat as SafetyCategory);
  }, [params.cat]);

  const searching = query.trim().length > 0 || cat !== 'all';
  const results = useMemo(() => (searching ? searchSafety(query, cat) : []), [query, cat, searching]);
  const recents = useMemo(() => recentIds.map(getSafetyItem).filter(Boolean) as SafetyItem[], [recentIds]);
  const saved = useMemo(() => savedIds.map(getSafetyItem).filter(Boolean) as SafetyItem[], [savedIds]);
  // Skip anything already shown under Saved / Recent so the lists don't repeat.
  const popular = useMemo(() => {
    const shown = new Set([...savedIds, ...recentIds.slice(0, 5)]);
    return popularSafety(lang).filter((i) => !shown.has(i.id));
  }, [lang, savedIds, recentIds]);

  const open = (item: SafetyItem) => {
    Keyboard.dismiss();
    router.push({ pathname: '/safety/[id]', params: { id: item.id } });
  };

  const renderItem = ({ item, index }: { item: SafetyItem; index: number }) => (
    <Pressable
      onPress={() => open(item)}
      accessibilityRole="button"
      style={({ pressed }) => ({
        marginHorizontal: 20,
        paddingHorizontal: 14,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        backgroundColor: pressed ? colors.sand : colors.surface,
        borderTopLeftRadius: index === 0 ? 20 : 0,
        borderTopRightRadius: index === 0 ? 20 : 0,
        borderBottomLeftRadius: index === results.length - 1 ? 20 : 0,
        borderBottomRightRadius: index === results.length - 1 ? 20 : 0,
        borderBottomWidth: index === results.length - 1 ? 0 : 1,
        borderBottomColor: colors.line,
      })}
    >
      <EmojiBadge emoji={item.emoji} size={42} />
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: fonts.bodyBold, fontSize: 15.5, color: colors.ink }} numberOfLines={1}>{L(item.name)}</Text>
        <Text style={{ fontFamily: fonts.body, fontSize: 13, color: colors.mute, marginTop: 2 }} numberOfLines={1}>{L(item.summary)}</Text>
      </View>
      <VerdictPill kind={item.verdict} size="sm" style={{ alignSelf: 'center' }} />
    </Pressable>
  );

  const header = (
    <View>
      <View style={{ paddingTop: insets.top + 8, paddingHorizontal: 20 }}>
        <Eyebrow>{t('check.eyebrow', { n: SAFETY.length })}</Eyebrow>
        <H1 style={{ marginTop: 6 }}>{t('check.title')}</H1>
      </View>

      <View style={{ paddingHorizontal: 20, marginTop: 16 }}>
        <View
          style={{
            height: 52,
            borderRadius: 16,
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.line,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 14,
            gap: 10,
          }}
        >
          <Icon.search size={19} color={colors.mute} />
          <TextInput
            ref={input}
            value={query}
            onChangeText={setQuery}
            placeholder={t('today.canIPh')}
            placeholderTextColor={colors.faint}
            returnKeyType="search"
            autoCorrect={false}
            style={{ flex: 1, fontSize: 16, color: colors.ink, fontFamily: fonts.body, height: '100%' }}
          />
          {query ? (
            <Pressable onPress={() => setQuery('')} hitSlop={10} accessibilityLabel={t('c.close')}>
              <Icon.close size={18} color={colors.mute} />
            </Pressable>
          ) : null}
        </View>
      </View>

      <FlatList
        horizontal
        data={[{ key: 'all' as const, emoji: '✨', label: { en: t('common.all') } }, ...SAFETY_CATEGORIES]}
        keyExtractor={(c) => c.key}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, gap: 8, paddingVertical: 14 }}
        renderItem={({ item: c }) => (
          <Chip small emoji={c.emoji} label={L(c.label)} selected={cat === c.key} onPress={() => setCat(c.key)} />
        )}
      />

      {searching ? (
        <Text style={{ paddingHorizontal: 24, marginBottom: 10, fontFamily: fonts.bodyBold, fontSize: 12.5, color: colors.mute }}>
          {t('check.results', { n: results.length })}
        </Text>
      ) : null}
    </View>
  );

  if (searching) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.base }}>
        <FlatList
          data={results}
          keyExtractor={(i) => i.id}
          renderItem={renderItem}
          ListHeaderComponent={header}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          contentContainerStyle={{ paddingBottom: insets.bottom + 130 }}
          ListEmptyComponent={
            <EmptyState
              emoji="🔍"
              title={t('check.noResults', { q: query.trim() })}
              body={aiConfigured() ? t('check.noResultsAi') : t('check.noResultsBody')}
              action={
                aiConfigured() ? (
                  <Pressable
                    onPress={() => router.push({ pathname: '/ask', params: { q: t('check.askPrefill', { q: query.trim() }) } })}
                    style={{ height: 50, borderRadius: 14, backgroundColor: colors.terracotta, alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Text style={{ color: '#fff', fontFamily: fonts.bodyBold, fontSize: 15 }}>{t('check.askAi')}</Text>
                  </Pressable>
                ) : undefined
              }
            />
          }
        />
      </View>
    );
  }

  const Group = ({ title, items }: { title: string; items: SafetyItem[] }) =>
    items.length ? (
      <View style={{ marginTop: 18 }}>
        <Eyebrow style={{ paddingHorizontal: 24, marginBottom: 10 }}>{title}</Eyebrow>
        <View style={{ paddingHorizontal: 20 }}>
          <Surface padded={false} style={{ overflow: 'hidden' }}>
            {items.map((item, i) => (
              <Pressable
                key={item.id}
                onPress={() => open(item)}
                style={({ pressed }) => ({
                  paddingHorizontal: 14,
                  paddingVertical: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12,
                  backgroundColor: pressed ? colors.sand : 'transparent',
                  borderBottomWidth: i === items.length - 1 ? 0 : 1,
                  borderBottomColor: colors.line,
                })}
              >
                <EmojiBadge emoji={item.emoji} size={40} />
                <Text style={{ flex: 1, fontFamily: fonts.bodyBold, fontSize: 15, color: colors.ink }} numberOfLines={1}>{L(item.name)}</Text>
                <VerdictPill kind={item.verdict} size="sm" style={{ alignSelf: 'center' }} />
              </Pressable>
            ))}
          </Surface>
        </View>
      </View>
    ) : null;

  return (
    <View style={{ flex: 1, backgroundColor: colors.base }}>
      <FlatList
        data={[]}
        renderItem={null}
        ListHeaderComponent={
          <View>
            {header}
            {aiConfigured() ? (
              <View style={{ paddingHorizontal: 20, flexDirection: 'row', gap: 12 }}>
                <Surface style={{ flex: 1, padding: 14 }} onPress={() => router.push('/scan')}>
                  <Icon.camera size={22} color={colors.terracotta} />
                  <Text style={{ fontFamily: fonts.bodyBold, fontSize: 14.5, color: colors.ink, marginTop: 8 }}>{t('check.scan')}</Text>
                  <Text style={{ fontFamily: fonts.body, fontSize: 12.5, color: colors.mute, marginTop: 2 }}>{t('check.scanSub')}</Text>
                </Surface>
                <Surface style={{ flex: 1, padding: 14 }} onPress={() => router.push('/ask')}>
                  <Icon.sparkles size={22} color={colors.lavender} />
                  <Text style={{ fontFamily: fonts.bodyBold, fontSize: 14.5, color: colors.ink, marginTop: 8 }}>{t('check.ask')}</Text>
                  <Text style={{ fontFamily: fonts.body, fontSize: 12.5, color: colors.mute, marginTop: 2 }}>{t('check.askSub')}</Text>
                </Surface>
              </View>
            ) : null}
            <Group title={t('check.saved')} items={saved} />
            <Group title={t('check.recent')} items={recents.slice(0, 5)} />
            <Group title={t('check.popular')} items={popular} />
            <View style={{ paddingHorizontal: 20, marginTop: 18 }}>
              <Surface onPress={() => router.push('/symptoms')} style={{ flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: colors.lavenderSoft, shadowOpacity: 0 }}>
                <EmojiBadge emoji="🩺" size={46} bg="#fff" />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: fonts.bodyBold, fontSize: 15.5, color: colors.ink }}>{t('check.symptoms')}</Text>
                  <Text style={{ fontFamily: fonts.body, fontSize: 13, color: colors.mute, marginTop: 2 }}>{t('check.symptomsSub')}</Text>
                </View>
                <Icon.chevR size={18} color={colors.faint} />
              </Surface>
            </View>
          </View>
        }
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: insets.bottom + 130 }}
      />
    </View>
  );
}
