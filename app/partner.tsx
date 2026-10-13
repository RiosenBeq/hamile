// Partner update — compose this week's note (baby size, progress, one way to
// help) and send it through the share sheet. Nothing leaves the phone
// unless the user shares it.

import React, { useMemo, useState } from 'react';
import { Share, Text, View } from 'react-native';
import { Btn } from '@/components/Btn';
import { Body, Eyebrow, Field, H1, NavBar, Page, Surface } from '@/components/ui';
import { useAppStore } from '@/store/useAppStore';
import { usePregnancy } from '@/lib/usePregnancy';
import { getWeek, sizePhrase } from '@/content';
import { useLang, useT } from '@/i18n';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

export default function Partner() {
  const t = useT();
  const lang = useLang();
  const p = usePregnancy();
  const profile = useAppStore((s) => s.profile);
  const patchProfile = useAppStore((s) => s.patchProfile);
  const [name, setName] = useState(profile.partnerName ?? '');

  const tri = p?.trimester ?? 1;
  const tips = [1, 2, 3, 4].map((i) => t(`pt.t${tri}.${i}`));
  const tip = tips[(p?.weeks ?? 0) % tips.length];
  const week = p ? getWeek(p.contentWeek) : null;

  const message = useMemo(() => {
    const lines: string[] = [];
    if (name.trim()) lines.push(t('pt.msg.hi', { name: name.trim() }));
    if (p) lines.push(t('pt.msg.week', { w: p.weeks, d: p.days }));
    if (p && week && p.contentWeek >= 4) lines.push(t('pt.msg.size', { item: sizePhrase(week.size.name, lang), emoji: week.size.emoji }));
    lines.push(t('pt.msg.help', { tip }));
    if (p && p.daysToGo > 0) lines.push(t('pt.msg.days', { n: p.daysToGo }));
    lines.push('', `— ${t('pt.msg.footer')}`);
    return lines.join('\n');
  }, [name, p, week, lang, tip, t]);

  const share = () => {
    patchProfile({ partnerName: name.trim() || undefined });
    Share.share({ message }).catch(() => {});
  };

  return (
    <Page header={<NavBar close caption={t('tools.partner')} />}>
      <View style={{ paddingHorizontal: 20 }}>
        <H1>{t('pt.title')}</H1>
        <Body mute style={{ marginTop: 8 }}>{t('pt.intro')}</Body>
      </View>
      <View style={{ paddingHorizontal: 20, marginTop: 18, gap: 14 }}>
        <Field label={t('pt.name')} value={name} onChangeText={setName} placeholder={t('pt.namePh')} autoCapitalize="words" maxLength={30} />
        <View>
          <Eyebrow style={{ marginBottom: 8 }}>{t('pt.preview')}</Eyebrow>
          <Surface style={{ backgroundColor: colors.blush, shadowOpacity: 0 }}>
            <Text style={{ fontFamily: fonts.body, fontSize: 15.5, lineHeight: 23, color: colors.ink }}>{message}</Text>
          </Surface>
        </View>
        <Btn onPress={share}>{t('pt.share')}</Btn>
        <Surface>
          <Eyebrow style={{ marginBottom: 8 }}>{t('pt.helpTitle')}</Eyebrow>
          {tips.map((x, i) => (
            <Text key={i} style={{ fontFamily: fonts.body, fontSize: 14.5, lineHeight: 21, color: colors.ink2, marginTop: i ? 8 : 0 }}>• {x}</Text>
          ))}
        </Surface>
      </View>
    </Page>
  );
}
