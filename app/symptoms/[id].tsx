// Symptom detail — why it happens, what helps, and exactly when to call.

import React from 'react';
import { Linking, Pressable, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Animated, { ZoomIn } from 'react-native-reanimated';
import { Icon } from '@/components/Icon';
import { Body, EmojiBadge, Eyebrow, H1, MedicalNote, NavBar, Page, Surface, EmptyState } from '@/components/ui';
import { Btn } from '@/components/Btn';
import { getSymptom } from '@/content';
import { useL10n, useL10nList, useT } from '@/i18n';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

export default function SymptomDetail() {
  const t = useT();
  const L = useL10n();
  const LL = useL10nList();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = getSymptom(String(id));

  if (!item) {
    return (
      <Page header={<NavBar />}>
        <EmptyState emoji="🤔" title={t('check.notFound')} />
      </Page>
    );
  }

  const relief = LL(item.relief);
  const call = LL(item.callDoctor);

  return (
    <Page header={<NavBar caption={t('tools.symptomGuide')} />}>
      <View style={{ paddingHorizontal: 20, paddingTop: 6 }}>
        <Animated.View entering={ZoomIn.duration(360)}>
          <EmojiBadge emoji={item.emoji} size={72} bg={item.urgent ? colors.dangerSoft : colors.lavenderSoft} />
        </Animated.View>
        <H1 style={{ marginTop: 14 }}>{L(item.name)}</H1>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
          <Text style={{ fontFamily: fonts.bodyBold, fontSize: 12.5, color: colors.mute }}>{t('sym.trimester')}:</Text>
          {item.trimesters.map((n) => (
            <View key={n} style={{ paddingHorizontal: 8, paddingVertical: 2, borderRadius: 999, backgroundColor: colors.sand }}>
              <Text style={{ fontFamily: fonts.bodyBold, fontSize: 12, color: colors.ink2 }}>{t('c.trimesterN', { n })}</Text>
            </View>
          ))}
        </View>
      </View>

      {item.urgent ? (
        <View style={{ paddingHorizontal: 20, marginTop: 16 }}>
          <Surface style={{ backgroundColor: colors.dangerSoft, shadowOpacity: 0 }}>
            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
              <Icon.warn size={20} color={colors.danger} />
              <Text style={{ fontFamily: fonts.bodyBold, color: colors.danger, fontSize: 15.5 }}>{t('sym.callUrgent')}</Text>
            </View>
            {call.map((c, i) => (
              <Text key={i} style={{ fontFamily: fonts.body, fontSize: 14.5, lineHeight: 21, color: colors.ink, marginTop: 8 }}>• {c}</Text>
            ))}
            <Btn style={{ marginTop: 14, height: 48, backgroundColor: colors.danger }} onPress={() => router.push('/emergency')}>
              {t('today.help')}
            </Btn>
          </Surface>
        </View>
      ) : null}

      <View style={{ paddingHorizontal: 20, marginTop: 14 }}>
        <Surface>
          <Eyebrow style={{ marginBottom: 8 }}>{t('sym.about')}</Eyebrow>
          <Body>{L(item.about)}</Body>
        </Surface>
      </View>

      {relief.length ? (
        <View style={{ paddingHorizontal: 20, marginTop: 14 }}>
          <Surface>
            <Eyebrow style={{ marginBottom: 10 }}>{t('sym.relief')}</Eyebrow>
            {relief.map((r, i) => (
              <View key={i} style={{ flexDirection: 'row', gap: 10, marginTop: i ? 10 : 0 }}>
                <Icon.check size={18} color={colors.sage} />
                <Body style={{ flex: 1 }}>{r}</Body>
              </View>
            ))}
          </Surface>
        </View>
      ) : null}

      {!item.urgent && call.length ? (
        <View style={{ paddingHorizontal: 20, marginTop: 14 }}>
          <Surface style={{ backgroundColor: colors.marigoldSoft, shadowOpacity: 0 }}>
            <Eyebrow style={{ marginBottom: 10 }} color={colors.ink2}>{t('sym.call')}</Eyebrow>
            {call.map((c, i) => (
              <View key={i} style={{ flexDirection: 'row', gap: 10, marginTop: i ? 8 : 0 }}>
                <Icon.phone size={16} color={colors.terracotta} />
                <Body style={{ flex: 1 }}>{c}</Body>
              </View>
            ))}
          </Surface>
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
      <MedicalNote text={t('c.medicalNote')} />
    </Page>
  );
}
