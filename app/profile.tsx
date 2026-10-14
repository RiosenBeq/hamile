// "You" — profile summary, Plus status and every setting, grouped.

import React from 'react';
import { Alert, Linking, Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from '@/components/Icon';
import { EmojiBadge, Eyebrow, H1, IconBadge, NavBar, Page, Row, Surface } from '@/components/ui';
import { useAppStore } from '@/store/useAppStore';
import { usePregnancy } from '@/lib/usePregnancy';
import { manageSubscription, purchasesAvailable, restore, usePlus } from '@/lib/purchases';
import { appStoreReviewUrl, siteUrl } from '@/lib/links';
import { SUPPORTED_LANGS, useFormat, useT } from '@/i18n';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

export default function Profile() {
  const t = useT();
  const fmt = useFormat();
  const router = useRouter();
  const profile = useAppStore((s) => s.profile);
  const language = useAppStore((s) => s.language);
  const plus = usePlus();
  const p = usePregnancy();
  const version = Constants.expoConfig?.version ?? '1.0.0';
  const langLabel = SUPPORTED_LANGS.find((l) => l.code === language)?.name ?? 'English';

  const onRestore = async () => {
    const r = await restore();
    if (r.ok && r.active) Alert.alert(t('me.restore'), t('me.restoreOk'));
    else if (r.ok) Alert.alert(t('me.restore'), t('me.restoreNone'));
    else Alert.alert(t('me.restore'), r.message ?? t('c.error'));
  };

  const Group = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View style={{ marginTop: 22 }}>
      <Eyebrow style={{ paddingHorizontal: 24, marginBottom: 8 }}>{title}</Eyebrow>
      <View style={{ paddingHorizontal: 20 }}>
        <Surface padded={false} style={{ overflow: 'hidden' }}>{children}</Surface>
      </View>
    </View>
  );

  return (
    <Page header={<NavBar caption={t('me.title')} />}>
      <View style={{ paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', gap: 14 }}>
        <EmojiBadge emoji={profile.babySex === 'boy' ? '💙' : profile.babySex === 'girl' ? '💗' : '🌼'} size={64} bg={colors.blush} />
        <View style={{ flex: 1 }}>
          <H1 style={{ fontSize: 28, lineHeight: 33 }}>{profile.name ? t('me.hello', { name: profile.name }) : t('me.helloAnon')}</H1>
          {p ? (
            <Text style={{ fontFamily: fonts.body, color: colors.mute, fontSize: 14, marginTop: 2 }}>
              {t('me.summary', { weeks: t('c.weeksDays', { w: p.weeks, d: p.days }), date: fmt.date(p.dueDate, { day: 'numeric', month: 'short', year: 'numeric' }) })}
            </Text>
          ) : null}
        </View>
      </View>

      <View style={{ paddingHorizontal: 20, marginTop: 18 }}>
        {plus ? (
          <Surface style={{ flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: colors.marigoldSoft, shadowOpacity: 0 }}>
            <EmojiBadge emoji="🌼" size={44} bg="#fff" />
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: fonts.bodyBold, fontSize: 15.5, color: colors.ink }}>{t('me.plusActive')}</Text>
              <Text style={{ fontFamily: fonts.body, fontSize: 13, color: colors.ink2, marginTop: 2 }}>{t('me.plusActiveSub')}</Text>
            </View>
          </Surface>
        ) : (
          <Pressable onPress={() => router.push({ pathname: '/paywall', params: { from: 'profile' } })} accessibilityRole="button">
            <LinearGradient colors={['#2F2622', '#4A3830']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ borderRadius: 24, padding: 18, flexDirection: 'row', alignItems: 'center', gap: 14 }}>
              <EmojiBadge emoji="🌼" size={44} bg="rgba(255,255,255,0.12)" />
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: fonts.display, fontSize: 19, color: '#FFF6EE' }}>{t('me.plusCta')}</Text>
                <Text style={{ fontFamily: fonts.body, fontSize: 13, color: 'rgba(255,246,238,0.75)', marginTop: 2 }}>{t('me.plusCtaSub')}</Text>
              </View>
              <Icon.chevR size={18} color="#FFF6EE" />
            </LinearGradient>
          </Pressable>
        )}
      </View>

      <Group title={t('me.group.pregnancy')}>
        <Row left={<IconBadge icon={Icon.calendar} hue="rose" size={40} />} title={t('me.pregnancy')} sub={t('me.pregnancySub')} onPress={() => router.push('/settings/pregnancy')} />
        <Row left={<IconBadge icon={Icon.heart} hue="lavender" size={40} />} title={t('me.loss')} sub={t('me.lossSub')} onPress={() => router.push('/settings/loss')} />
        <Row left={<IconBadge icon={Icon.baby} hue="amber" size={40} />} title={t('me.born')} sub={t('me.bornSub')} onPress={() => router.push('/settings/born')} last />
      </Group>

      <Group title={t('me.group.prefs')}>
        <Row left={<IconBadge icon={Icon.bell} hue="sage" size={40} />} title={t('me.notifications')} sub={t('me.notificationsSub')} onPress={() => router.push('/settings/notifications')} />
        <Row left={<IconBadge icon={Icon.globe} hue="sky" size={40} />} title={t('me.language')} sub={langLabel} onPress={() => router.push('/settings/language')} />
        <Row left={<IconBadge icon={Icon.lock} hue="sand" size={40} />} title={t('me.lock')} sub={t('me.lockSub')} onPress={() => router.push('/settings/security')} last />
      </Group>

      <Group title={t('me.group.support')}>
        <Row left={<IconBadge icon={Icon.phone} hue="rose" size={40} />} title={t('today.help')} sub={t('today.helpSub')} onPress={() => router.push('/emergency')} />
        <Row left={<IconBadge icon={Icon.help} hue="lavender" size={40} />} title={t('tools.symptomGuide')} sub={t('tools.symptomGuide.sub')} onPress={() => router.push('/symptoms')} last />
      </Group>

      <Group title={t('me.group.data')}>
        <Row left={<IconBadge icon={Icon.shield} hue="sage" size={40} />} title={t('me.privacy')} sub={t('me.privacySub')} onPress={() => router.push('/settings/privacy')} last />
      </Group>

      <Group title={t('me.group.about')}>
        <Row left={<IconBadge icon={Icon.info} hue="amber" size={40} />} title={t('me.about')} sub={t('me.aboutSub')} onPress={() => router.push('/settings/about')} />
        {purchasesAvailable() ? (
          <>
            <Row left={<IconBadge icon={Icon.download} hue="sky" size={40} />} title={t('me.restore')} onPress={onRestore} chevron={false} />
            {plus ? <Row left={<IconBadge icon={Icon.gear} hue="sand" size={40} />} title={t('me.manage')} onPress={() => manageSubscription()} /> : null}
          </>
        ) : null}
        <Row left={<IconBadge icon={Icon.star} hue="rose" size={40} />} title={t('me.rate')} onPress={() => Linking.openURL(appStoreReviewUrl()).catch(() => {})} />
        <Row left={<IconBadge icon={Icon.external} hue="lavender" size={40} />} title={t('me.contact')} onPress={() => Linking.openURL(siteUrl('support', language)).catch(() => {})} last />
      </Group>

      <Text style={{ textAlign: 'center', marginTop: 26, fontFamily: fonts.bodyBold, fontSize: 11, letterSpacing: 1.4, color: colors.faint, textTransform: 'uppercase' }}>
        {t('me.version', { v: version })}
      </Text>
    </Page>
  );
}
