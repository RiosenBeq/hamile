// "Is this normal?" — searchable guide to common pregnancy symptoms, with
// urgent ones flagged and a shortcut to the warning-signs screen.

import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@/components/Icon';
import { Body, Chip, EmojiBadge, Eyebrow, H1, NavBar, Surface } from '@/components/ui';
import { usePregnancy } from '@/lib/usePregnancy';
import { searchSymptoms, SYMPTOMS } from '@/content';
import type { SymptomGuide } from '@/content';
import { useL10n, useT } from '@/i18n';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

export default function SymptomGuideList() {
  const t = useT();
  const L = useL10n();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const p = usePregnancy();
  const [query, setQuery] = useState('');
  const [tri, setTri] = useState<0 | 1 | 2 | 3>(0);

  const items = useMemo(() => {
    const base = searchSymptoms(query);
    return tri ? base.filter((s) => s.trimesters.includes(tri)) : base;
  }, [query, tri]);

  const renderItem = ({ item, index }: { item: SymptomGuide; index: number }) => (
    <Pressable
      onPress={() => router.push({ pathname: '/symptoms/[id]', params: { id: item.id } })}
      accessibilityRole="button"
      style={({ pressed }) => ({
        marginHorizontal: 20,
        paddingHorizontal: 14,
        paddingVertical: 13,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        backgroundColor: pressed ? colors.sand : colors.surface,
        borderTopLeftRadius: index === 0 ? 20 : 0,
        borderTopRightRadius: index === 0 ? 20 : 0,
        borderBottomLeftRadius: index === items.length - 1 ? 20 : 0,
        borderBottomRightRadius: index === items.length - 1 ? 20 : 0,
        borderBottomWidth: index === items.length - 1 ? 0 : 1,
        borderBottomColor: colors.line,
      })}
    >
      <EmojiBadge emoji={item.emoji} size={42} bg={item.urgent ? colors.dangerSoft : colors.lavenderSoft} />
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: fonts.bodyBold, fontSize: 15.5, color: colors.ink }} numberOfLines={1}>{L(item.name)}</Text>
        <Text style={{ fontFamily: fonts.body, fontSize: 13, color: colors.mute, marginTop: 2 }} numberOfLines={1}>{L(item.about)}</Text>
      </View>
      {item.urgent ? (
        <View style={{ paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999, backgroundColor: colors.dangerSoft }}>
          <Text style={{ fontFamily: fonts.bodyBold, fontSize: 11, color: colors.danger }}>{t('sym.urgent')}</Text>
        </View>
      ) : (
        <Icon.chevR size={18} color={colors.faint} />
      )}
    </Pressable>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.base }}>
      <NavBar caption={t('tools.symptomGuide')} />
      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        renderItem={renderItem}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
        ListHeaderComponent={
          <View>
            <View style={{ paddingHorizontal: 20 }}>
              <Eyebrow>{t('sym.eyebrow', { n: SYMPTOMS.length })}</Eyebrow>
              <H1 style={{ marginTop: 6 }}>{t('sym.title')}</H1>
              <Body mute style={{ marginTop: 8 }}>{t('sym.intro')}</Body>
            </View>
            <View style={{ paddingHorizontal: 20, marginTop: 16 }}>
              <Surface onPress={() => router.push('/emergency')} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.dangerSoft, shadowOpacity: 0 }}>
                <Icon.warn size={22} color={colors.danger} />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: fonts.bodyBold, color: colors.danger, fontSize: 15 }}>{t('sym.redFlags')}</Text>
                  <Text style={{ fontFamily: fonts.body, color: colors.ink2, fontSize: 13 }}>{t('sym.redFlagsSub')}</Text>
                </View>
                <Icon.chevR size={18} color={colors.danger} />
              </Surface>
            </View>
            <View style={{ paddingHorizontal: 20, marginTop: 14 }}>
              <View style={{ height: 50, borderRadius: 16, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, gap: 10 }}>
                <Icon.search size={18} color={colors.mute} />
                <TextInput
                  value={query}
                  onChangeText={setQuery}
                  placeholder={t('sym.search')}
                  placeholderTextColor={colors.faint}
                  autoCorrect={false}
                  style={{ flex: 1, height: '100%', fontSize: 16, color: colors.ink, fontFamily: fonts.body }}
                />
              </View>
            </View>
            <View style={{ flexDirection: 'row', gap: 8, paddingHorizontal: 20, paddingVertical: 14, flexWrap: 'wrap' }}>
              <Chip small label={t('c.seeAll')} selected={tri === 0} onPress={() => setTri(0)} />
              {([1, 2, 3] as const).map((n) => (
                <Chip
                  key={n}
                  small
                  label={t('c.trimesterN', { n })}
                  selected={tri === n}
                  emoji={p?.trimester === n ? '📍' : undefined}
                  onPress={() => setTri(n)}
                />
              ))}
            </View>
          </View>
        }
      />
    </View>
  );
}
