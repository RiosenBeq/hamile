// Pregnancy loss support — one switch pauses every baby update and
// pregnancy notification; journal stays; starting again is always free.

import React from 'react';
import { Linking, Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Icon } from '@/components/Icon';
import { Body, Eyebrow, H1, NavBar, Page, Row, Surface, ToggleRow, IconBadge } from '@/components/ui';
import { useAppStore } from '@/store/useAppStore';
import { rescheduleAll } from '@/lib/notifications';
import { useT } from '@/i18n';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

const RESOURCES: { name: string; url: string }[] = [
  { name: 'NHS — Miscarriage', url: 'https://www.nhs.uk/conditions/miscarriage/' },
  { name: 'Tommy’s — Support after loss', url: 'https://www.tommys.org/baby-loss-support' },
  { name: 'Miscarriage Association (UK)', url: 'https://www.miscarriageassociation.org.uk/' },
  { name: 'Share Pregnancy & Infant Loss Support (US)', url: 'https://nationalshare.org/' },
  { name: 'ACOG — Early pregnancy loss', url: 'https://www.acog.org/womens-health/faqs/early-pregnancy-loss' },
];

export default function LossSupport() {
  const t = useT();
  const router = useRouter();
  const lossMode = useAppStore((s) => !!s.profile.lossMode);
  const patchProfile = useAppStore((s) => s.patchProfile);

  const setLoss = (v: boolean) => {
    patchProfile({ lossMode: v });
    const s = useAppStore.getState();
    rescheduleAll(s.profile, s.notifPrefs).catch(() => {});
  };

  return (
    <Page header={<NavBar caption={t('me.title')} />}>
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 34 }}>🕊️</Text>
        <H1 style={{ marginTop: 8 }}>{t('loss.title')}</H1>
        <Body mute style={{ marginTop: 8 }}>{t('loss.intro')}</Body>
      </View>

      <View style={{ paddingHorizontal: 20, marginTop: 18 }}>
        <Surface padded={false}>
          <ToggleRow title={t('loss.toggle')} sub={t('loss.toggleSub')} value={lossMode} onChange={setLoss} last />
        </Surface>
      </View>

      <View style={{ paddingHorizontal: 20, marginTop: 14 }}>
        <Surface style={{ backgroundColor: colors.lavenderSoft, shadowOpacity: 0 }}>
          <Text style={{ fontFamily: fonts.display, fontSize: 20, color: colors.ink }}>{t('loss.support')}</Text>
          <Body style={{ marginTop: 6 }}>{t('loss.supportBody')}</Body>
        </Surface>
      </View>

      <View style={{ paddingHorizontal: 20, marginTop: 14 }}>
        <Surface>
          <Eyebrow style={{ marginBottom: 4 }}>{t('loss.resources')}</Eyebrow>
          {RESOURCES.map((r) => (
            <Pressable key={r.url} onPress={() => Linking.openURL(r.url).catch(() => {})} style={{ flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 8 }} accessibilityRole="link">
              <Icon.external size={15} color={colors.terracotta} />
              <Text style={{ flex: 1, fontFamily: fonts.body, fontSize: 14.5, color: colors.terracotta }}>{r.name}</Text>
            </Pressable>
          ))}
        </Surface>
      </View>

      <View style={{ paddingHorizontal: 20, marginTop: 14 }}>
        <Surface padded={false} style={{ overflow: 'hidden' }}>
          <Row left={<IconBadge icon={Icon.phone} hue="rose" size={40} />} title={t('today.help')} sub={t('today.helpSub')} onPress={() => router.push('/emergency')} />
          <Row
            left={<IconBadge icon={Icon.calendar} hue="sage" size={40} />}
            title={t('loss.newPregnancy')}
            sub={t('loss.newPregnancySub')}
            onPress={() => {
              setLoss(false);
              router.push('/settings/pregnancy');
            }}
            last
          />
        </Surface>
      </View>
    </Page>
  );
}
