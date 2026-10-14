// About Marigold — how content is written and sourced, how the calculators
// work, the medical disclaimer, and legal links (App Review 1.4.1 / 3.1.2).

import React, { useMemo } from 'react';
import { Linking, Pressable, Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import { Body, Eyebrow, H1, NavBar, Page, Surface } from '@/components/ui';
import { APPLE_EULA_URL, siteUrl } from '@/lib/links';
import { getSafetyItem, LOCAL_SAFETY_IDS } from '@/content';
import { useLang, useT } from '@/i18n';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

const SOURCES: { name: string; url: string }[] = [
  { name: 'NHS — Pregnancy', url: 'https://www.nhs.uk/pregnancy/' },
  { name: 'ACOG — Pregnancy topics', url: 'https://www.acog.org/womens-health/pregnancy' },
  { name: 'WHO — Antenatal care recommendations', url: 'https://www.who.int/publications/i/item/9789241549912' },
  { name: 'CDC — Pregnancy', url: 'https://www.cdc.gov/pregnancy/' },
  { name: 'MotherToBaby — Fact sheets', url: 'https://mothertobaby.org/fact-sheets/' },
  { name: 'FDA — Advice about eating fish', url: 'https://www.fda.gov/food/consumers/advice-about-eating-fish' },
  { name: 'Institute of Medicine — Weight Gain During Pregnancy (2009)', url: 'https://www.ncbi.nlm.nih.gov/books/NBK32813/' },
  { name: 'T.C. Sağlık Bakanlığı — Doğum öncesi bakım rehberi', url: 'https://hsgm.saglik.gov.tr/tr/' },
];

/** National bodies cited by the market-specific items for this language. */
function localSources(lang: string): { name: string; url: string }[] {
  const seen = new Set<string>();
  const out: { name: string; url: string }[] = [];
  for (const id of LOCAL_SAFETY_IDS[lang as keyof typeof LOCAL_SAFETY_IDS] ?? []) {
    for (const s of getSafetyItem(id)?.sources ?? []) {
      if (seen.has(s.url)) continue;
      seen.add(s.url);
      out.push(s);
    }
  }
  return out.slice(0, 6);
}

export default function About() {
  const t = useT();
  const lang = useLang();
  const sources = useMemo(() => [...SOURCES, ...localSources(lang)], [lang]);

  const LinkRow = ({ label, url }: { label: string; url: string }) => (
    <Pressable onPress={() => Linking.openURL(url).catch(() => {})} style={{ flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 8 }} accessibilityRole="link">
      <Icon.external size={15} color={colors.terracotta} />
      <Text style={{ flex: 1, fontFamily: fonts.body, fontSize: 14.5, color: colors.terracotta }}>{label}</Text>
    </Pressable>
  );

  return (
    <Page header={<NavBar caption={t('me.title')} />}>
      <View style={{ paddingHorizontal: 20 }}>
        <H1>{t('ab.title')}</H1>
        <Body mute style={{ marginTop: 8 }}>{t('ab.intro')}</Body>
      </View>

      <View style={{ paddingHorizontal: 20, marginTop: 16, gap: 12 }}>
        <Surface>
          <Eyebrow style={{ marginBottom: 8 }}>{t('ab.how')}</Eyebrow>
          <Body>{t('ab.howBody')}</Body>
          <Text style={{ fontFamily: fonts.bodyBold, fontSize: 12.5, color: colors.mute, marginTop: 10 }}>{t('ab.updated')}</Text>
        </Surface>
        <Surface>
          <Eyebrow style={{ marginBottom: 8 }}>{t('ab.calc')}</Eyebrow>
          <Body>{t('ab.calcBody')}</Body>
        </Surface>
        <Surface style={{ backgroundColor: colors.marigoldSoft, shadowOpacity: 0 }}>
          <Eyebrow style={{ marginBottom: 8 }} color={colors.ink2}>{t('ab.disclaimer')}</Eyebrow>
          <Body>{t('ab.disclaimerBody')}</Body>
        </Surface>
        <Surface>
          <Eyebrow style={{ marginBottom: 4 }}>{t('ab.sources')}</Eyebrow>
          {sources.map((s) => (
            <LinkRow key={s.url} label={s.name} url={s.url} />
          ))}
        </Surface>
        <Surface>
          <LinkRow label={t('ab.privacy')} url={siteUrl('privacy', lang)} />
          <LinkRow label={t('ab.terms')} url={siteUrl('terms', lang)} />
          <LinkRow label="Apple Standard EULA" url={APPLE_EULA_URL} />
          <LinkRow label={t('ab.contact')} url={siteUrl('support', lang)} />
        </Surface>
      </View>
    </Page>
  );
}
