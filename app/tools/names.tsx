// Baby names — accent-insensitive search over the bundled name library (names
// and meanings), gender and list filters, favourites, a "surprise me" pick and
// sharing the shortlist. Free, offline.

import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AccessibilityInfo, FlatList, Keyboard, Pressable, ScrollView, Share, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring, withTiming, ZoomIn } from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import * as Haptics from 'expo-haptics';
import { Icon } from '@/components/Icon';
import { Body, Chip, CircleButton, EmptyState, Eyebrow, H1, NavBar, Segmented, shadow } from '@/components/ui';
import { useAppStore } from '@/store/useAppStore';
import { BABY_NAMES, normalize } from '@/content';
import type { BabyName, NameGender, NameList } from '@/content';
import { SUPPORTED_LANGS, useLang, useT } from '@/i18n';
import type { LangCode } from '@/i18n';
import { colors, hueGradient } from '@/theme/colors';
import { fonts } from '@/theme/typography';

type GenderFilter = 'all' | NameGender;
type ListFilter = 'all' | NameList;
type Mode = 'all' | 'fav';
type Entry = { item: BabyName; key: string; meaning: Record<LangCode, string>; order: number };

const GENDERS: GenderFilter[] = ['all', 'f', 'm', 'u'];
const LIST_EMOJI: Partial<Record<ListFilter, string>> = { tr: '🇹🇷', intl: '🌍', es: '🇪🇸', de: '🇩🇪', fr: '🇫🇷', pt: '🇧🇷' };

/** The user's own market first, then the other lists that actually have names. */
function listsFor(lang: LangCode): ListFilter[] {
  const markets: NameList[] = lang === 'en' ? ['intl', 'tr'] : lang === 'tr' ? ['tr', 'intl'] : [lang, 'intl', 'tr'];
  const present = new Set(BABY_NAMES.flatMap((n) => n.popular));
  return ['all', ...markets.filter((m) => present.has(m))];
}
const DOT: Record<NameGender, string> = { f: hueGradient.rose[2], m: colors.sky, u: colors.sage };
const HEART = 'M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z';

// Normalised once at load: alphabetical (accent-folded) order, plus folded
// meanings so "moon" or "ay" finds Aylin, Ayla…
const foldMeanings = (m: BabyName['meaning']): Record<LangCode, string> =>
  Object.fromEntries(SUPPORTED_LANGS.map(({ code }) => [code, normalize(m[code] ?? m.en)])) as Record<LangCode, string>;

const ENTRIES: Entry[] = BABY_NAMES.map((item) => ({
  item,
  key: normalize(item.name),
  meaning: foldMeanings(item.meaning),
  order: 0,
}))
  .sort((a, b) => (a.key < b.key ? -1 : a.key > b.key ? 1 : 0))
  .map((e, i) => ({ ...e, order: i }));
const BY_NAME = new Map(ENTRIES.map((e) => [e.item.name, e] as const));

/** Favourites saved from an older name list still show, just without details. */
const fallbackEntry = (name: string): Entry => ({
  item: { name, gender: 'u', origin: { en: '' }, meaning: { en: '' }, popular: [] },
  key: normalize(name),
  meaning: foldMeanings({ en: '' }),
  order: Number.MAX_SAFE_INTEGER,
});

/** Name prefix first, then name substring, then a meaning word that starts with the query. */
function search(pool: Entry[], q: string, lang: LangCode): Entry[] {
  if (!q) return pool;
  const hits: { e: Entry; s: number }[] = [];
  for (const e of pool) {
    let s = -1;
    if (e.key.startsWith(q)) s = 0;
    else if (e.key.includes(q)) s = 1;
    else if (q.length >= 3 && e.meaning[lang].split(' ').some((w) => w.startsWith(q))) s = 2;
    if (s >= 0) hits.push({ e, s });
  }
  return hits.sort((a, b) => a.s - b.s || a.e.order - b.e.order).map((h) => h.e);
}

export default function Names() {
  const t = useT();
  const lang = useLang();
  const insets = useSafeAreaInsets();
  const babySex = useAppStore((s) => s.profile.babySex);
  const favorites = useAppStore((s) => s.favoriteNames);
  const toggleFavoriteName = useAppStore((s) => s.toggleFavoriteName);
  const [query, setQuery] = useState('');
  const [gender, setGender] = useState<GenderFilter>(babySex === 'girl' ? 'f' : babySex === 'boy' ? 'm' : 'all');
  const [list, setList] = useState<ListFilter>('all');
  const lists = useMemo(() => listsFor(lang), [lang]);
  const [mode, setMode] = useState<Mode>('all');
  const [spot, setSpot] = useState<BabyName | null>(null);
  const listRef = useRef<FlatList<BabyName>>(null);

  const favSet = useMemo(() => new Set(favorites), [favorites]);
  const q = normalize(query);

  const results = useMemo(() => {
    const pool =
      mode === 'fav'
        ? favorites.map((name) => BY_NAME.get(name) ?? fallbackEntry(name))
        : ENTRIES.filter(
            (e) => (gender === 'all' || e.item.gender === gender) && (list === 'all' || e.item.popular.includes(list)),
          );
    return search(pool, q, lang).map((e) => e.item);
  }, [mode, favorites, gender, list, q, lang]);

  const toggleFav = useCallback(
    (name: string) => {
      const adding = !useAppStore.getState().favoriteNames.includes(name);
      if (adding) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
      else Haptics.selectionAsync().catch(() => {});
      toggleFavoriteName(name);
    },
    [toggleFavoriteName],
  );

  const surprise = () => {
    if (!results.length) return;
    let pick = results[Math.floor(Math.random() * results.length)];
    if (results.length > 1 && spot && pick.name === spot.name) {
      pick = results[(results.indexOf(pick) + 1) % results.length];
    }
    Keyboard.dismiss();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    setSpot(pick);
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
    AccessibilityInfo.announceForAccessibility(t('names.surpriseA11y', { name: pick.name, meaning: pick.meaning[lang] ?? pick.meaning.en }));
  };

  const share = () => {
    const lines = favorites.map((name) => {
      const m = BY_NAME.get(name)?.item.meaning;
      const meaning = m ? m[lang] ?? m.en : '';
      return meaning ? `• ${name} — ${meaning}` : `• ${name}`;
    });
    Share.share({ message: `${t('names.shareTitle')}\n\n${lines.join('\n')}\n\n${t('names.shareFooter')}` }).catch(() => {});
  };

  const renderItem = useCallback(
    ({ item, index }: { item: BabyName; index: number }) => (
      <NameRow
        item={item}
        fav={favSet.has(item.name)}
        first={index === 0}
        last={index === results.length - 1}
        onToggle={toggleFav}
      />
    ),
    [favSet, results.length, toggleFav],
  );

  const header = (
    <View>
      <View style={{ paddingHorizontal: 20, paddingTop: 4 }}>
        <H1>{t('names.title')}</H1>
        <Body mute style={{ marginTop: 8 }}>
          {t('names.intro', { n: BABY_NAMES.length })}
        </Body>
      </View>

      <View style={{ paddingHorizontal: 20, marginTop: 18 }}>
        <Segmented
          options={[
            { value: 'all' as const, label: t('names.mode.all') },
            { value: 'fav' as const, label: favorites.length ? t('names.mode.favN', { n: favorites.length }) : t('names.mode.fav') },
          ]}
          value={mode}
          onChange={(v) => {
            setMode(v);
            setSpot(null);
          }}
        />
      </View>

      <View style={{ paddingHorizontal: 20, marginTop: 12 }}>
        <View
          style={{
            minHeight: 52,
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
            value={query}
            onChangeText={setQuery}
            placeholder={t('names.searchPh')}
            placeholderTextColor={colors.faint}
            accessibilityLabel={t('c.search')}
            returnKeyType="search"
            autoCorrect={false}
            autoCapitalize="none"
            clearButtonMode="never"
            style={{ flex: 1, fontSize: 16, color: colors.ink, fontFamily: fonts.body, paddingVertical: 14 }}
          />
          {query ? (
            <Pressable onPress={() => setQuery('')} hitSlop={10} accessibilityRole="button" accessibilityLabel={t('names.clearSearch')}>
              <Icon.close size={18} color={colors.mute} />
            </Pressable>
          ) : null}
        </View>
      </View>

      {mode === 'all' ? (
        <>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            style={{ marginTop: 12 }}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}
          >
            {GENDERS.map((g) => (
              <Chip key={g} small label={t(`names.gender.${g}`)} selected={gender === g} onPress={() => setGender(g)} />
            ))}
          </ScrollView>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            style={{ marginTop: 8 }}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}
          >
            {lists.map((l) => (
              <Chip
                key={l}
                small
                emoji={LIST_EMOJI[l]}
                label={t(`names.list.${l}`)}
                selected={list === l}
                onPress={() => setList(l)}
              />
            ))}
          </ScrollView>
        </>
      ) : null}

      <View style={{ paddingHorizontal: 24, marginTop: 16, marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Text accessibilityLiveRegion="polite" style={{ flex: 1, fontFamily: fonts.bodyBold, fontSize: 13, color: colors.mute }}>
          {results.length === 1 ? t('names.countOne') : t('names.countMany', { n: results.length })}
        </Text>
        {results.length > 1 ? (
          <Pressable
            onPress={surprise}
            accessibilityRole="button"
            accessibilityLabel={t('names.surprise')}
            hitSlop={6}
            style={({ pressed }) => ({
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              minHeight: 36,
              paddingHorizontal: 14,
              paddingVertical: 8,
              borderRadius: 999,
              backgroundColor: colors.terracottaSoft,
              opacity: pressed ? 0.75 : 1,
            })}
          >
            <Icon.sparkles size={16} color={colors.terracotta} />
            <Text style={{ fontFamily: fonts.bodyBold, fontSize: 13.5, color: colors.terracotta }}>{t('names.surprise')}</Text>
          </Pressable>
        ) : null}
      </View>

      {spot ? (
        <Spotlight
          key={spot.name}
          name={spot}
          fav={favSet.has(spot.name)}
          onToggle={() => toggleFav(spot.name)}
          onAnother={surprise}
          onClose={() => setSpot(null)}
          canReroll={results.length > 1}
        />
      ) : null}
    </View>
  );

  const empty =
    mode === 'fav' && favorites.length === 0 ? (
      <EmptyState emoji="🤍" title={t('names.favEmptyTitle')} body={t('names.favEmptyBody')} />
    ) : (
      <EmptyState emoji="🔍" title={t('names.noResults')} body={t('names.noResultsBody')} />
    );

  return (
    <View style={{ flex: 1, backgroundColor: colors.base }}>
      <NavBar
        caption={t('tools.names')}
        right={
          favorites.length ? (
            <CircleButton onPress={share} accessibilityLabel={t('names.share')}>
              <Icon.share size={17} color={colors.ink} />
            </CircleButton>
          ) : undefined
        }
      />
      <FlatList
        ref={listRef}
        data={results}
        keyExtractor={(n) => n.name}
        renderItem={renderItem}
        extraData={favSet}
        ListHeaderComponent={header}
        ListEmptyComponent={empty}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        initialNumToRender={14}
        maxToRenderPerBatch={16}
        windowSize={11}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}
      />
    </View>
  );
}

// ── Rows ───────────────────────────────────────────────────────────────────

const NameRow = memo(function NameRow({
  item,
  fav,
  first,
  last,
  onToggle,
}: {
  item: BabyName;
  fav: boolean;
  first: boolean;
  last: boolean;
  onToggle: (name: string) => void;
}) {
  const t = useT();
  const lang = useLang();
  const origin = item.origin[lang] ?? item.origin.en;
  const meaning = item.meaning[lang] ?? item.meaning.en;
  const genderLabel = t(`names.gender.${item.gender}`);
  return (
    <View
      style={{
        marginHorizontal: 20,
        paddingLeft: 16,
        paddingRight: 4,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        backgroundColor: colors.surface,
        borderTopLeftRadius: first ? 20 : 0,
        borderTopRightRadius: first ? 20 : 0,
        borderBottomLeftRadius: last ? 20 : 0,
        borderBottomRightRadius: last ? 20 : 0,
        borderBottomWidth: last ? 0 : 1,
        borderBottomColor: colors.line,
      }}
    >
      <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: DOT[item.gender] }} />
      <View
        style={{ flex: 1, paddingVertical: 2 }}
        accessible
        accessibilityLabel={[item.name, genderLabel, origin, meaning].filter(Boolean).join(', ')}
      >
        <Text style={{ fontFamily: fonts.display, fontSize: 21, lineHeight: 27, color: colors.ink }}>{item.name}</Text>
        {origin || meaning ? (
          <Text numberOfLines={2} style={{ fontFamily: fonts.body, fontSize: 13.5, lineHeight: 19, color: colors.mute, marginTop: 1 }}>
            {origin ? <Text style={{ fontFamily: fonts.bodyBold, color: colors.ink2 }}>{origin}</Text> : null}
            {origin && meaning ? '  ·  ' : ''}
            {meaning}
          </Text>
        ) : null}
      </View>
      <HeartButton
        active={fav}
        onPress={() => onToggle(item.name)}
        label={fav ? t('names.unfavA11y', { name: item.name }) : t('names.favA11y', { name: item.name })}
      />
    </View>
  );
});

function HeartButton({ active, onPress, label, size = 22 }: { active: boolean; onPress: () => void; label: string; size?: number }) {
  const scale = useSharedValue(1);
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (active) scale.value = withSequence(withTiming(1.3, { duration: 110 }), withSpring(1, { damping: 8, stiffness: 260 }));
  }, [active, scale]);
  const style = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ selected: active }}
      hitSlop={4}
      style={{ width: 44, height: 44, alignItems: 'center', justifyContent: 'center' }}
    >
      <Animated.View style={style}>
        <Heart filled={active} size={size} />
      </Animated.View>
    </Pressable>
  );
}

function Heart({ filled, size }: { filled: boolean; size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d={HEART}
        fill={filled ? colors.terracotta : 'none'}
        stroke={filled ? colors.terracotta : colors.faint}
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// ── Surprise pick ──────────────────────────────────────────────────────────

function Spotlight({
  name,
  fav,
  onToggle,
  onAnother,
  onClose,
  canReroll,
}: {
  name: BabyName;
  fav: boolean;
  onToggle: () => void;
  onAnother: () => void;
  onClose: () => void;
  canReroll: boolean;
}) {
  const t = useT();
  const lang = useLang();
  const origin = name.origin[lang] ?? name.origin.en;
  const meaning = name.meaning[lang] ?? name.meaning.en;
  return (
    <Animated.View entering={ZoomIn.springify().damping(14)} style={{ paddingHorizontal: 20, marginBottom: 14 }}>
      <LinearGradient
        colors={['#FBE6D8', '#F6DDD6', '#EEE6F4']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ borderRadius: 26, padding: 20, ...shadow.card }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Eyebrow color={colors.ink2} style={{ flex: 1 }}>
            {t('names.howAbout')}
          </Eyebrow>
          <Pressable
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel={t('c.close')}
            hitSlop={10}
            style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.7)', alignItems: 'center', justifyContent: 'center' }}
          >
            <Icon.close size={15} color={colors.ink} />
          </Pressable>
        </View>
        <Text style={{ fontFamily: fonts.display, fontSize: 40, lineHeight: 48, color: colors.ink, marginTop: 4, letterSpacing: -0.6 }}>{name.name}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 2 }}>
          <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: DOT[name.gender] }} />
          <Text style={{ flex: 1, fontFamily: fonts.bodyBold, fontSize: 13.5, color: colors.ink2 }}>
            {[t(`names.gender.${name.gender}`), origin].filter(Boolean).join('  ·  ')}
          </Text>
        </View>
        {meaning ? <Body style={{ marginTop: 10, color: colors.ink }}>{meaning}</Body> : null}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 16 }}>
          <Pressable
            onPress={onToggle}
            accessibilityRole="button"
            accessibilityState={{ selected: fav }}
            accessibilityLabel={fav ? t('names.unfavA11y', { name: name.name }) : t('names.favA11y', { name: name.name })}
            style={({ pressed }) => ({
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              minHeight: 44,
              paddingHorizontal: 16,
              paddingVertical: 10,
              borderRadius: 999,
              backgroundColor: fav ? colors.terracotta : 'rgba(255,255,255,0.85)',
              opacity: pressed ? 0.8 : 1,
            })}
          >
            <Svg width={18} height={18} viewBox="0 0 24 24">
              <Path d={HEART} fill={fav ? '#fff' : 'none'} stroke={fav ? '#fff' : colors.terracotta} strokeWidth={1.8} strokeLinejoin="round" />
            </Svg>
            <Text style={{ fontFamily: fonts.bodyBold, fontSize: 14.5, color: fav ? '#fff' : colors.terracotta }}>
              {fav ? t('names.saved') : t('names.save')}
            </Text>
          </Pressable>
          {canReroll ? (
            <Pressable
              onPress={onAnother}
              accessibilityRole="button"
              accessibilityLabel={t('names.another')}
              style={({ pressed }) => ({
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                minHeight: 44,
                paddingHorizontal: 16,
                paddingVertical: 10,
                borderRadius: 999,
                backgroundColor: 'rgba(255,255,255,0.85)',
                opacity: pressed ? 0.8 : 1,
              })}
            >
              <Icon.sparkles size={17} color={colors.ink} />
              <Text style={{ fontFamily: fonts.bodyBold, fontSize: 14.5, color: colors.ink }}>{t('names.another')}</Text>
            </Pressable>
          ) : null}
        </View>
      </LinearGradient>
    </Animated.View>
  );
}
