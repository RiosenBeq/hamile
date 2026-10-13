// Safety item detail — verdict, one-line answer, the why, practical tips,
// citations, save/share, and a reminder to check with a professional.

import React, { useEffect } from 'react';
import { Linking, Pressable, Share, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Animated, { FadeInDown, ZoomIn } from 'react-native-reanimated';
import { Icon } from '@/components/Icon';
import { VerdictPill } from '@/components/Verdict';
import { Body, CircleButton, EmojiBadge, Eyebrow, H1, MedicalNote, NavBar, Page, Surface, EmptyState } from '@/components/ui';
import { useAppStore } from '@/store/useAppStore';
import { getSafetyItem, SAFETY_CATEGORIES } from '@/content';
import { useL10n, useL10nList, useT } from '@/i18n';
import { colors, verdictPalette } from '@/theme/colors';
import { fonts } from '@/theme/typography';

const VERDICT_BG = { safe: '#EEF4ED', caution: '#FBF1E2', avoid: '#F8E5E0' } as const;

export default function SafetyDetail() {
  const t = useT();
  const L = useL10n();
  const LL = useL10nList();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = getSafetyItem(String(id));
  const saved = useAppStore((s) => s.safetySaved.includes(String(id)));
  const toggleSaved = useAppStore((s) => s.toggleSafetySaved);
  const pushRecent = useAppStore((s) => s.pushSafetyRecent);

  useEffect(() => {
    if (item) pushRecent(item.id);
  }, [item?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!item) {
    return (
      <Page header={<NavBar />}>
        <EmptyState emoji="🤔" title={t('check.notFound')} />
      </Page>
    );
  }

  const cat = SAFETY_CATEGORIES.find((c) => c.key === item.category);
  const tips = LL(item.tips);
  const pal = verdictPalette[item.verdict];

  const share = () => {
    const text = `${L(item.name)} — ${t(`verdict.${item.verdict}`)}\n${L(item.summary)}\n\n${t('share.footer')}`;
    Share.share({ message: text }).catch(() => {});
  };

  return (
    <Page
      header={
        <NavBar
          caption={cat ? L(cat.label) : ''}
          right={
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <CircleButton onPress={share} accessibilityLabel={t('c.share')}>
                <Icon.share size={17} color={colors.ink} />
              </CircleButton>
              <CircleButton onPress={() => toggleSaved(item.id)} accessibilityLabel={t('check.save')} bg={saved ? colors.terracottaSoft : colors.surface}>
                <Icon.bookmark size={17} color={saved ? colors.terracotta : colors.ink} />
              </CircleButton>
            </View>
          }
        />
      }
    >
      <View style={{ paddingHorizontal: 20, paddingTop: 8 }}>
        <Animated.View entering={ZoomIn.duration(380)} style={{ alignItems: 'flex-start' }}>
          <EmojiBadge emoji={item.emoji} size={76} bg={VERDICT_BG[item.verdict]} />
        </Animated.View>
        <H1 style={{ marginTop: 16 }}>{L(item.name)}</H1>
        <Animated.View entering={FadeInDown.delay(120).duration(380)} style={{ marginTop: 12 }}>
          <VerdictPill kind={item.verdict} size="lg" label={t(`verdict.${item.verdict}`)} />
        </Animated.View>
      </View>

      <View style={{ paddingHorizontal: 20, marginTop: 18 }}>
        <Surface style={{ backgroundColor: VERDICT_BG[item.verdict], shadowOpacity: 0, borderWidth: 1, borderColor: pal.bg }}>
          <Text style={{ fontFamily: fonts.display, fontSize: 21, lineHeight: 28, color: colors.ink }}>{L(item.summary)}</Text>
        </Surface>
      </View>

      <View style={{ paddingHorizontal: 20, marginTop: 14 }}>
        <Surface>
          <Eyebrow style={{ marginBottom: 8 }}>{t('safety.why')}</Eyebrow>
          <Body>{L(item.details)}</Body>
        </Surface>
      </View>

      {tips.length ? (
        <View style={{ paddingHorizontal: 20, marginTop: 14 }}>
          <Surface>
            <Eyebrow style={{ marginBottom: 10 }}>{t('safety.tips')}</Eyebrow>
            {tips.map((tip, i) => (
              <View key={i} style={{ flexDirection: 'row', gap: 10, marginTop: i ? 10 : 0 }}>
                <Icon.check size={18} color={colors.sage} />
                <Body style={{ flex: 1 }}>{tip}</Body>
              </View>
            ))}
          </Surface>
        </View>
      ) : null}

      {item.category === 'medicine' || item.category === 'supplement' ? (
        <View style={{ paddingHorizontal: 20, marginTop: 14 }}>
          <View style={{ flexDirection: 'row', gap: 10, padding: 14, borderRadius: 18, backgroundColor: colors.lavenderSoft }}>
            <Icon.stethoscope size={18} color={colors.lavender} />
            <Text style={{ flex: 1, fontFamily: fonts.body, fontSize: 13.5, lineHeight: 19, color: colors.ink2 }}>{t('safety.medsNote')}</Text>
          </View>
        </View>
      ) : null}

      {item.sources.length ? (
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <Eyebrow style={{ marginBottom: 6 }}>{t('c.sources')}</Eyebrow>
          {item.sources.map((s) => (
            <Pressable key={s.url} onPress={() => Linking.openURL(s.url).catch(() => {})} style={{ flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 6 }}>
              <Icon.external size={14} color={colors.terracotta} />
              <Text style={{ flex: 1, fontFamily: fonts.body, fontSize: 13.5, color: colors.terracotta }} numberOfLines={1}>{s.name}</Text>
            </Pressable>
          ))}
        </View>
      ) : null}

      <Pressable onPress={() => router.push('/emergency')} style={{ marginHorizontal: 20, marginTop: 16, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Icon.phone size={15} color={colors.danger} />
        <Text style={{ fontFamily: fonts.bodyBold, fontSize: 13.5, color: colors.danger }}>{t('safety.worried')}</Text>
      </Pressable>
      <MedicalNote text={t('c.medicalNote')} />
    </Page>
  );
}
