// Journal — the private pregnancy diary: the bump-photo timeline, a quick mood
// and note composer, "letters to baby" prompts and every entry grouped by
// pregnancy week. Nothing here leaves the phone.

import React, { useCallback, useMemo } from 'react';
import { FlatList, Pressable, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import * as Haptics from 'expo-haptics';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Btn } from '@/components/Btn';
import { Icon } from '@/components/Icon';
import { Body, Chip, CircleButton, EmptyState, Eyebrow, H1, H2, Surface, shadow } from '@/components/ui';
import { useAppStore, type DiaryEntry } from '@/store/useAppStore';
import { usePregnancy } from '@/lib/usePregnancy';
import { daysBetween, pregnancyStatus } from '@/lib/pregnancy';
import { photoSrc } from '@/lib/photos';
import { useFormat, useT } from '@/i18n';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

type T = ReturnType<typeof useT>;

const MOODS = [
  { value: 1, emoji: '😔', label: 'jr.mood.1' },
  { value: 2, emoji: '😕', label: 'jr.mood.2' },
  { value: 3, emoji: '😐', label: 'jr.mood.3' },
  { value: 4, emoji: '🙂', label: 'jr.mood.4' },
  { value: 5, emoji: '😊', label: 'jr.mood.5' },
] as const;

const PROMPTS = [
  { key: 'know', emoji: '💌', label: 'jr.prompt.know' },
  { key: 'foundOut', emoji: '🌟', label: 'jr.prompt.foundOut' },
  { key: 'nursery', emoji: '🧸', label: 'jr.prompt.nursery' },
  { key: 'feel', emoji: '💗', label: 'jr.prompt.feel' },
  { key: 'hope', emoji: '🌈', label: 'jr.prompt.hope' },
  { key: 'move', emoji: '🦋', label: 'jr.prompt.move' },
] as const;

/** "6 photos · Weeks 12–18" */
function bumpSummary(t: T, count: number, weeks: number[]): string {
  const photos = count === 1 ? t('bump.photosOne') : t('bump.photos', { n: count });
  if (!weeks.length) return photos;
  const from = Math.min(...weeks);
  const to = Math.max(...weeks);
  return `${photos} · ${from === to ? t('c.weekN', { n: from }) : t('bump.weeksRange', { from, to })}`;
}

type Row =
  | { type: 'group'; key: string; label: string; count: number }
  | { type: 'entry'; key: string; entry: DiaryEntry };

export default function Journal() {
  const t = useT();
  const fmt = useFormat();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const diary = useAppStore((s) => s.diary);
  const dueDate = useAppStore((s) => s.profile.dueDate);
  const lossMode = useAppStore((s) => !!s.profile.lossMode);
  const p = usePregnancy();
  const currentWeek = p?.weeks ?? -1;
  const locale = fmt.locale;
  const up = (s: string) => s.toLocaleUpperCase(locale);

  // Recomputed from the due date rather than trusting the stored week, so a
  // corrected due date (e.g. after the dating scan) regroups everything.
  const weekOf = useCallback(
    (e: DiaryEntry) => (dueDate ? pregnancyStatus(dueDate, new Date(e.at)).weeks : e.week),
    [dueDate],
  );

  const entries = useMemo(() => [...diary].sort((a, b) => b.at - a.at), [diary]);

  const rows = useMemo(() => {
    const out: Row[] = [];
    let group: Extract<Row, { type: 'group' }> | null = null;
    let groupKey = '';
    for (const e of entries) {
      const w = weekOf(e);
      const d = new Date(e.at);
      // Without a due date there is no week to group by — fall back to months.
      const key = w > 0 ? `w${w}` : `m${d.getFullYear()}-${d.getMonth()}`;
      if (!group || key !== groupKey) {
        groupKey = key;
        const label =
          w > 0
            ? t('c.weekN', { n: w }) + (w === currentWeek ? ` · ${t('today.thisWeek')}` : '')
            : d.toLocaleDateString(locale, { month: 'long', year: 'numeric' });
        group = { type: 'group', key: `${key}-${e.id}`, label, count: 0 };
        out.push(group);
      }
      group.count += 1;
      out.push({ type: 'entry', key: e.id, entry: e });
    }
    return out;
  }, [entries, weekOf, t, locale, currentWeek]);

  const bumps = useMemo(() => entries.filter((e) => e.kind === 'bump' && !!e.photoUri), [entries]);
  const thisWeekBump = currentWeek > 0 ? bumps.find((b) => weekOf(b) === currentWeek) : undefined;

  const openNote = (extra?: { mood?: string; prompt?: string }) =>
    router.push({ pathname: '/entry', params: { kind: 'note', ...extra } });
  const openEntry = (e: DiaryEntry) => router.push({ pathname: '/entry', params: { kind: e.kind, id: e.id } });
  const addBump = () =>
    thisWeekBump ? openEntry(thisWeekBump) : router.push({ pathname: '/entry', params: { kind: 'bump' } });

  const dayLabel = (ts: number) => {
    const ago = daysBetween(new Date(ts), new Date());
    if (ago === 0) return t('c.today');
    if (ago === 1) return t('c.yesterday');
    return fmt.date(ts, { weekday: 'short', day: 'numeric', month: 'short' });
  };

  // ── Header: title, bump timeline, composer, letters ──────────────────────

  const hero = (
    <Animated.View entering={FadeInDown.duration(450)} style={{ paddingHorizontal: 20, marginTop: 20 }}>
      <View style={{ borderRadius: 28, ...shadow.card }}>
        <LinearGradient
          colors={['#FBE6D8', '#F6DDD6', '#EEE6F4']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ borderRadius: 28, paddingVertical: 20, overflow: 'hidden' }}
        >
          <View
            pointerEvents="none"
            style={{ position: 'absolute', right: -50, top: -60, width: 190, height: 190, borderRadius: 95, backgroundColor: 'rgba(255,255,255,0.32)' }}
          />
          <View style={{ paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <View style={{ flex: 1 }}>
              <Eyebrow color={colors.ink2}>{up(t('bump.caption'))}</Eyebrow>
              <Text style={{ fontFamily: fonts.display, fontSize: 21, lineHeight: 26, color: colors.ink, marginTop: 4 }} numberOfLines={2}>
                {bumps.length ? bumpSummary(t, bumps.length, bumps.map(weekOf).filter((w) => w > 0)) : t('jr.bumpEmptyTitle')}
              </Text>
            </View>
            {bumps.length ? (
              <Pressable
                onPress={() => router.push('/bump')}
                accessibilityRole="button"
                accessibilityLabel={t('jr.bumpPlay')}
                style={({ pressed }) => ({
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 6,
                  height: 38,
                  paddingHorizontal: 14,
                  borderRadius: 999,
                  backgroundColor: 'rgba(255,255,255,0.88)',
                  opacity: pressed ? 0.75 : 1,
                })}
              >
                <Icon.play size={14} color={colors.terracotta} />
                <Text style={{ fontFamily: fonts.bodyBold, fontSize: 13, color: colors.ink }}>{t('jr.play')}</Text>
              </Pressable>
            ) : null}
          </View>

          {bumps.length ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: 16 }}
              contentContainerStyle={{ paddingHorizontal: 20, gap: 10 }}
            >
              {bumps.slice(0, 12).map((b) => {
                const w = weekOf(b);
                const label = w > 0 ? t('c.weekN', { n: w }) : fmt.short(b.at);
                return (
                  <Pressable
                    key={b.id}
                    onPress={() => openEntry(b)}
                    accessibilityRole="button"
                    accessibilityLabel={t('bump.photoA11y', { label })}
                    style={({ pressed }) => ({ alignItems: 'center', opacity: pressed ? 0.8 : 1 })}
                  >
                    <Image
                      source={{ uri: photoSrc(b.photoUri) }}
                      style={{ width: 78, height: 104, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.6)' }}
                      contentFit="cover"
                      cachePolicy="memory"
                      recyclingKey={b.id}
                      transition={150}
                    />
                    <Text style={{ fontFamily: fonts.bodyBold, fontSize: 11.5, color: colors.ink2, marginTop: 6 }}>{label}</Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          ) : (
            <Text style={{ paddingHorizontal: 20, marginTop: 6, fontFamily: fonts.body, fontSize: 14.5, lineHeight: 21, color: colors.ink2 }}>
              {t('jr.bumpEmpty')}
            </Text>
          )}

          <View style={{ paddingHorizontal: 20, marginTop: 18 }}>
            <Btn onPress={addBump} style={{ height: 52 }}>
              <Icon.camera size={19} color="#fff" />
              <Text style={{ color: '#fff', fontFamily: fonts.bodyBold, fontSize: 15 }} numberOfLines={1}>
                {thisWeekBump ? t('jr.bumpUpdate') : t('jr.bumpAdd')}
              </Text>
            </Btn>
          </View>
        </LinearGradient>
      </View>
    </Animated.View>
  );

  const composer = (
    <Animated.View entering={FadeInDown.delay(80).duration(450)} style={{ paddingHorizontal: 20, marginTop: 16 }}>
      <Surface>
        <Text style={{ fontFamily: fonts.display, fontSize: 20, color: colors.ink }}>{t('jr.compose.title')}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 14 }}>
          {MOODS.map((m) => (
            <Pressable
              key={m.value}
              onPress={() => {
                Haptics.selectionAsync().catch(() => {});
                openNote({ mood: String(m.value) });
              }}
              accessibilityRole="button"
              accessibilityLabel={t(m.label)}
              style={({ pressed }) => ({
                width: 54,
                height: 54,
                borderRadius: 27,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: pressed ? colors.terracottaSoft : colors.sand,
                transform: [{ scale: pressed ? 0.92 : 1 }],
              })}
            >
              <Text style={{ fontSize: 27 }} allowFontScaling={false}>
                {m.emoji}
              </Text>
            </Pressable>
          ))}
        </View>
        <Pressable
          onPress={() => openNote()}
          accessibilityRole="button"
          accessibilityLabel={t('jr.compose.ph')}
          style={({ pressed }) => ({
            marginTop: 14,
            height: 50,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: colors.line,
            backgroundColor: pressed ? colors.sand : colors.base,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            paddingHorizontal: 14,
          })}
        >
          <Icon.edit size={18} color={colors.mute} />
          <Text style={{ fontFamily: fonts.body, fontSize: 15, color: colors.faint }}>{t('jr.compose.ph')}</Text>
        </Pressable>
      </Surface>
    </Animated.View>
  );

  const letters = (
    <View style={{ marginTop: 22 }}>
      <View style={{ paddingHorizontal: 20 }}>
        <Eyebrow>{up(t('jr.letters'))}</Eyebrow>
        <Text style={{ fontFamily: fonts.body, fontSize: 13.5, color: colors.mute, marginTop: 4 }}>{t('jr.lettersSub')}</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 12, gap: 8 }}>
        {PROMPTS.map((pr) => (
          <Chip key={pr.key} small emoji={pr.emoji} label={t(pr.label)} onPress={() => openNote({ prompt: pr.key })} />
        ))}
      </ScrollView>
    </View>
  );

  const header = (
    <View>
      <View style={{ paddingHorizontal: 20, flexDirection: 'row', alignItems: 'flex-start' }}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Icon.lock size={13} color={colors.mute} />
            <Eyebrow>{up(t('jr.eyebrow'))}</Eyebrow>
          </View>
          <H1 style={{ marginTop: 6 }}>{t('jr.title')}</H1>
          <Body mute style={{ marginTop: 4 }}>
            {t('jr.sub')}
          </Body>
        </View>
        <CircleButton
          onPress={() => openNote()}
          accessibilityLabel={t('jr.new')}
          size={44}
          bg={colors.terracotta}
          style={{ borderColor: colors.terracotta, marginLeft: 12, marginTop: 2 }}
        >
          <Icon.plus size={20} color="#fff" />
        </CircleButton>
      </View>

      {/* Bump photos and letters to baby are paused in pregnancy-loss mode. */}
      {!lossMode ? hero : null}
      {composer}
      {!lossMode ? letters : null}

      {rows.length ? (
        <View style={{ paddingHorizontal: 20, marginTop: 30, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <H2>{t('jr.entries')}</H2>
          <Text style={{ fontFamily: fonts.bodyBold, fontSize: 13, color: colors.mute, marginBottom: 3 }}>
            {entries.length === 1 ? t('jr.countOne') : t('jr.count', { n: entries.length })}
          </Text>
        </View>
      ) : null}
    </View>
  );

  // ── Feed rows ────────────────────────────────────────────────────────────

  const renderItem = ({ item }: { item: Row }) => {
    if (item.type === 'group') {
      return (
        <View style={{ paddingHorizontal: 24, marginTop: 18, marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Eyebrow>{up(item.label)}</Eyebrow>
          <View style={{ flex: 1, height: 1, backgroundColor: colors.line }} />
          <Text style={{ fontFamily: fonts.bodyBold, fontSize: 12, color: colors.faint }}>{item.count}</Text>
        </View>
      );
    }
    const e = item.entry;
    const mood = e.mood ? MOODS[e.mood - 1] : undefined;
    const when = `${dayLabel(e.at)} · ${fmt.time(e.at)}`;
    const text = e.text?.trim();
    const a11y = [when, e.kind === 'bump' ? t('jr.bumpEntry') : null, mood ? t(mood.label) : null, text].filter(Boolean).join(', ');
    return (
      <View style={{ paddingHorizontal: 20, marginBottom: 10 }}>
        <Pressable
          onPress={() => openEntry(e)}
          accessibilityRole="button"
          accessibilityLabel={a11y}
          style={({ pressed }) => ({
            flexDirection: 'row',
            gap: 14,
            padding: 16,
            borderRadius: 22,
            backgroundColor: colors.surface,
            ...shadow.card,
            transform: [{ scale: pressed ? 0.985 : 1 }],
          })}
        >
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              {e.kind === 'bump' ? (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, borderRadius: 999, paddingHorizontal: 8, paddingVertical: 3, backgroundColor: colors.terracottaSoft }}>
                  <Icon.camera size={12} color={colors.terracotta} />
                  <Text style={{ fontFamily: fonts.bodyBold, fontSize: 11, color: colors.terracotta }}>{t('jr.bumpEntry')}</Text>
                </View>
              ) : mood ? (
                <Text style={{ fontSize: 18 }} allowFontScaling={false}>
                  {mood.emoji}
                </Text>
              ) : null}
              <Text style={{ flex: 1, fontFamily: fonts.bodyBold, fontSize: 12.5, color: colors.mute }} numberOfLines={1}>
                {when}
              </Text>
            </View>
            {text ? (
              <Text style={{ marginTop: 8, fontFamily: fonts.body, fontSize: 15, lineHeight: 22, color: colors.ink }} numberOfLines={3}>
                {text}
              </Text>
            ) : null}
          </View>
          {e.photoUri ? (
            <Image
              source={{ uri: photoSrc(e.photoUri) }}
              style={{ width: 64, height: 86, borderRadius: 14, backgroundColor: colors.sand }}
              contentFit="cover"
              cachePolicy="memory"
              recyclingKey={e.id}
              transition={150}
            />
          ) : null}
        </Pressable>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.base }}>
      <FlatList
        data={rows}
        keyExtractor={(r) => r.key}
        renderItem={renderItem}
        ListHeaderComponent={header}
        ListEmptyComponent={<EmptyState emoji="📔" title={t('jr.empty.title')} body={t('jr.empty.body')} />}
        ListFooterComponent={
          rows.length ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 18, paddingHorizontal: 32 }}>
              <Icon.lock size={14} color={colors.faint} />
              <Text style={{ fontFamily: fonts.body, fontSize: 12.5, color: colors.faint, textAlign: 'center' }}>{t('jr.privacy')}</Text>
            </View>
          ) : null
        }
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        windowSize={9}
        contentContainerStyle={{ paddingTop: insets.top + 8, paddingBottom: insets.bottom + 130 }}
      />
    </View>
  );
}
