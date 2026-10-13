// About Marigold — how content is written and sourced, how the calculators
// work, the medical disclaimer, and legal links (App Review 1.4.1 / 3.1.2).

import React from 'react';
import { Linking, Pressable, Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import { Body, Eyebrow, H1, NavBar, Page, Surface } from '@/components/ui';
import { APPLE_EULA_URL, PRIVACY_URL, SUPPORT_URL, TERMS_URL } from '@/lib/links';
import { useT } from '@/i18n';
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

export default function About() {
  const t = useT();

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
          {SOURCES.map((s) => (
            <LinkRow key={s.url} label={s.name} url={s.url} />
          ))}
        </Surface>
        <Surface>
          <LinkRow label={t('ab.privacy')} url={PRIVACY_URL} />
          <LinkRow label={t('ab.terms')} url={TERMS_URL} />
          <LinkRow label="Apple Standard EULA" url={APPLE_EULA_URL} />
          <LinkRow label={t('ab.contact')} url={SUPPORT_URL} />
        </Surface>
      </View>
    </Page>
  );
}
