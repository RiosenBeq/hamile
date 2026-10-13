// Hospital bag — grouped checklist with per-group and overall progress, your
// own items per group, and a gentle "when to pack" note (NHS: at least three
// weeks before the due date). Template rows store a translation key in
// `label`; custom rows store the user's own text as-is.

import React, { useMemo, useState } from 'react';
import { Alert, Linking, Pressable, Text, View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Icon } from '@/components/Icon';
import { Body, EmojiBadge, Eyebrow, Field, H1, NavBar, Page, ProgressBar, Surface } from '@/components/ui';
import { BAG_GROUPS, type BagGroup } from '@/data/sample';
import { useAppStore, type BagItem } from '@/store/useAppStore';
import { usePregnancy } from '@/lib/usePregnancy';
import { useFormat, useT } from '@/i18n';
import { colors, tint } from '@/theme/colors';
import { fonts } from '@/theme/typography';

const GROUP: Record<BagGroup, { title: string; emoji: string; bg: string }> = {
  labour: { title: 'bag.group.labour', emoji: '💪', bg: colors.blush },
  postBirth: { title: 'bag.group.postBirth', emoji: '🛁', bg: colors.lavenderSoft },
  baby: { title: 'bag.group.baby', emoji: '🍼', bg: colors.skySoft },
  docs: { title: 'bag.group.docs', emoji: '📄', bg: colors.marigoldSoft },
};

const SOURCES = [
  {
    name: 'NHS: Hospital bag checklist',
    url: 'https://www.nhs.uk/pregnancy/labour-and-birth/preparing-for-the-birth/pack-your-bag-for-labour/',
  },
];

export default function HospitalBag() {
  const t = useT();
  const fmt = useFormat();
  const bag = useAppStore((s) => s.bag);
  const toggleBagItem = useAppStore((s) => s.toggleBagItem);
  const addBagItem = useAppStore((s) => s.addBagItem);
  const removeBagItem = useAppStore((s) => s.removeBagItem);
  const p = usePregnancy();

  const U = (s: string) => s.toLocaleUpperCase(fmt.locale);
  const labelOf = (it: BagItem) => (it.custom ? it.label : t(it.label));

  const grouped = useMemo(() => {
    const map = new Map<BagGroup, BagItem[]>(BAG_GROUPS.map((g) => [g, []]));
    for (const it of bag) map.get(it.group)?.push(it);
    for (const items of map.values()) items.sort((a, b) => a.position - b.position);
    return map;
  }, [bag]);

  const total = bag.length;
  const done = bag.filter((b) => b.checked).length;
  const allDone = total > 0 && done === total;

  const [adding, setAdding] = useState<BagGroup | null>(null);
  const [draft, setDraft] = useState('');

  const toggle = (it: BagItem) => {
    const items = grouped.get(it.group) ?? [];
    const groupDoneAfter = items.filter((x) => (x.id === it.id ? !x.checked : x.checked)).length === items.length;
    const allDoneAfter = done + (it.checked ? -1 : 1) === total;
    toggleBagItem(it.id);
    if (!it.checked && (groupDoneAfter || allDoneAfter)) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    } else {
      Haptics.selectionAsync().catch(() => {});
    }
  };

  const openAdd = (g: BagGroup) => {
    Haptics.selectionAsync().catch(() => {});
    setAdding(g);
    setDraft('');
  };

  const submit = () => {
    const label = draft.trim();
    if (!adding || !label) return;
    addBagItem(adding, label);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    setDraft('');
  };

  const confirmRemove = (it: BagItem) => {
    Alert.alert(t('bag.removeTitle'), labelOf(it), [
      { text: t('c.cancel'), style: 'cancel' },
      {
        text: t('bag.remove'),
        style: 'destructive',
        onPress: () => {
          removeBagItem(it.id);
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
        },
      },
    ]);
  };

  const weeks = p?.weeks ?? 0;

  return (
    <Page header={<NavBar caption={U(t('tools.bag'))} />} automaticallyAdjustKeyboardInsets keyboardDismissMode="interactive">
      <View style={{ paddingHorizontal: 20, paddingTop: 4 }}>
        <H1>{t('bag.title')}</H1>
        <Body mute style={{ marginTop: 8 }}>
          {t('bag.sub')}
        </Body>
      </View>

      {/* Overall */}
      <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
        <Surface style={{ backgroundColor: allDone ? colors.sageSoft : colors.surface }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
            <EmojiBadge emoji={allDone ? '🎉' : '🧳'} size={48} bg={allDone ? colors.surface : colors.sand} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: fonts.display, fontSize: 22, color: colors.ink, letterSpacing: -0.2 }}>{t('bag.progress', { done, total })}</Text>
              {allDone ? (
                <Animated.Text entering={FadeIn.duration(250)} style={{ fontFamily: fonts.bodyBold, fontSize: 13.5, color: tint.sage.fg, marginTop: 2 }}>
                  {t('bag.allPacked')}
                </Animated.Text>
              ) : null}
            </View>
          </View>
          <ProgressBar value={total ? done / total : 0} color={colors.sage} track={allDone ? colors.surface : colors.sageSoft} style={{ marginTop: 14 }} />
          <View style={{ flexDirection: 'row', gap: 10, marginTop: 14, alignItems: 'flex-start' }}>
            <Icon.calendar size={17} color={colors.mute} />
            <View style={{ flex: 1 }}>
              {weeks >= 34 && !allDone ? (
                <Text style={{ fontFamily: fonts.bodyBold, fontSize: 13.5, lineHeight: 19, color: colors.ink, marginBottom: 2 }}>
                  {t('bag.whenNow', { n: weeks })}
                </Text>
              ) : null}
              <Text style={{ fontFamily: fonts.body, fontSize: 13.5, lineHeight: 19, color: colors.ink2 }}>{t('bag.when')}</Text>
            </View>
          </View>
        </Surface>
      </View>

      {BAG_GROUPS.map((g) => {
        const items = grouped.get(g) ?? [];
        const gDone = items.filter((i) => i.checked).length;
        const meta = GROUP[g];
        const isAdding = adding === g;
        return (
          <View key={g} style={{ paddingHorizontal: 20, marginTop: 16 }}>
            <Surface padded={false}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16, paddingBottom: 12 }}>
                <EmojiBadge emoji={meta.emoji} size={40} bg={meta.bg} />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: fonts.display, fontSize: 19, color: colors.ink }}>{t(meta.title)}</Text>
                  <ProgressBar
                    value={items.length ? gDone / items.length : 0}
                    color={colors.sage}
                    track={colors.sand}
                    height={5}
                    style={{ marginTop: 6 }}
                  />
                </View>
                <Text style={{ fontFamily: fonts.bodyBold, fontSize: 13.5, color: gDone === items.length && items.length ? tint.sage.fg : colors.mute }}>
                  {gDone}/{items.length}
                </Text>
              </View>

              {items.map((it) => {
                const label = labelOf(it);
                return (
                  <View key={it.id}>
                    <View style={{ height: 1, backgroundColor: colors.line, marginLeft: 16 }} />
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Pressable
                        onPress={() => toggle(it)}
                        accessibilityRole="checkbox"
                        accessibilityState={{ checked: it.checked }}
                        accessibilityLabel={label}
                        style={({ pressed }) => ({
                          flex: 1,
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 14,
                          paddingVertical: 13,
                          paddingLeft: 16,
                          paddingRight: it.custom ? 4 : 16,
                          backgroundColor: pressed ? colors.base : 'transparent',
                        })}
                      >
                        <View
                          style={{
                            width: 26,
                            height: 26,
                            borderRadius: 13,
                            borderWidth: 1.5,
                            borderColor: it.checked ? colors.sage : colors.faint,
                            backgroundColor: it.checked ? colors.sage : 'transparent',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {it.checked ? <Icon.check size={16} color="#fff" /> : null}
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text
                            style={{
                              fontFamily: fonts.body,
                              fontSize: 15.5,
                              lineHeight: 21,
                              color: it.checked ? colors.mute : colors.ink,
                              textDecorationLine: it.checked ? 'line-through' : 'none',
                            }}
                          >
                            {label}
                          </Text>
                          {it.custom ? (
                            <Text style={{ fontFamily: fonts.body, fontSize: 11.5, color: colors.faint, marginTop: 1 }}>{t('bag.custom')}</Text>
                          ) : null}
                        </View>
                      </Pressable>
                      {it.custom ? (
                        <Pressable
                          onPress={() => confirmRemove(it)}
                          accessibilityRole="button"
                          accessibilityLabel={t('bag.a11y.remove', { item: label })}
                          hitSlop={6}
                          style={({ pressed }) => ({ width: 44, height: 44, marginRight: 6, alignItems: 'center', justifyContent: 'center', opacity: pressed ? 0.5 : 1 })}
                        >
                          <Icon.trash size={18} color={colors.faint} />
                        </Pressable>
                      ) : null}
                    </View>
                  </View>
                );
              })}

              <View style={{ height: 1, backgroundColor: colors.line, marginLeft: 16 }} />
              {isAdding ? (
                <Animated.View entering={FadeInDown.duration(200)} style={{ flexDirection: 'row', alignItems: 'center', gap: 8, padding: 12 }}>
                  <Field
                    value={draft}
                    onChangeText={setDraft}
                    placeholder={t('bag.addPh')}
                    accessibilityLabel={t('bag.addItem')}
                    autoFocus
                    maxLength={60}
                    returnKeyType="done"
                    blurOnSubmit={false}
                    onSubmitEditing={submit}
                    containerStyle={{ flex: 1 }}
                    style={{ minHeight: 44, paddingVertical: 10, backgroundColor: colors.base }}
                  />
                  <Pressable
                    onPress={submit}
                    disabled={!draft.trim()}
                    accessibilityRole="button"
                    accessibilityLabel={t('c.add')}
                    accessibilityState={{ disabled: !draft.trim() }}
                    style={({ pressed }) => ({
                      height: 44,
                      paddingHorizontal: 16,
                      borderRadius: 14,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: draft.trim() ? colors.terracotta : colors.sand,
                      opacity: pressed ? 0.8 : 1,
                    })}
                  >
                    <Text style={{ fontFamily: fonts.bodyBold, fontSize: 14.5, color: draft.trim() ? '#fff' : colors.faint }}>{t('c.add')}</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      setAdding(null);
                      setDraft('');
                    }}
                    accessibilityRole="button"
                    accessibilityLabel={t('c.done')}
                    hitSlop={6}
                    style={({ pressed }) => ({ width: 36, height: 44, alignItems: 'center', justifyContent: 'center', opacity: pressed ? 0.5 : 1 })}
                  >
                    <Icon.close size={18} color={colors.mute} />
                  </Pressable>
                </Animated.View>
              ) : (
                <Pressable
                  onPress={() => openAdd(g)}
                  accessibilityRole="button"
                  accessibilityLabel={`${t('bag.addItem')} — ${t(meta.title)}`}
                  style={({ pressed }) => ({
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                    paddingVertical: 14,
                    paddingHorizontal: 16,
                    borderBottomLeftRadius: 24,
                    borderBottomRightRadius: 24,
                    backgroundColor: pressed ? colors.base : 'transparent',
                  })}
                >
                  <Icon.plus size={18} color={colors.terracotta} />
                  <Text style={{ fontFamily: fonts.bodyBold, fontSize: 14.5, color: colors.terracotta }}>{t('bag.addItem')}</Text>
                </Pressable>
              )}
            </Surface>
          </View>
        );
      })}

      <View style={{ paddingHorizontal: 20, marginTop: 22 }}>
        <Eyebrow style={{ marginBottom: 2 }}>{U(t('c.sources'))}</Eyebrow>
        {SOURCES.map((s) => (
          <Pressable
            key={s.url}
            onPress={() => Linking.openURL(s.url).catch(() => {})}
            accessibilityRole="link"
            accessibilityLabel={s.name}
            style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 6, opacity: pressed ? 0.6 : 1 })}
          >
            <Icon.external size={14} color={colors.terracotta} />
            <Text style={{ flex: 1, fontFamily: fonts.body, fontSize: 13.5, color: colors.terracotta }} numberOfLines={2}>
              {s.name}
            </Text>
          </Pressable>
        ))}
      </View>
    </Page>
  );
}
