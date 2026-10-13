// Marigold Plus paywall (RevenueCat). Honest by design: live StoreKit prices,
// no pre-selected plan, no "most popular" badge, a clear free option, trial
// and renewal terms next to the button, Restore + Terms + Privacy links.

import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, Linking, Pressable, ScrollView, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Purchases, { INTRO_ELIGIBILITY_STATUS, PurchasesPackage } from 'react-native-purchases';
import * as Haptics from 'expo-haptics';
import { Icon } from '@/components/Icon';
import { Btn } from '@/components/Btn';
import { CircleButton } from '@/components/ui';
import { buy, loadPackages, PlusPackages, purchasesAvailable, restore, usePlus } from '@/lib/purchases';
import { APPLE_EULA_URL, PRIVACY_URL } from '@/lib/links';
import { useT } from '@/i18n';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

type Choice = 'monthly' | 'pass' | null;

export default function Paywall() {
  const t = useT();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { from } = useLocalSearchParams<{ from?: string }>();
  const plus = usePlus();
  const [pkgs, setPkgs] = useState<PlusPackages | null>(null);
  const [choice, setChoice] = useState<Choice>(null);
  const [busy, setBusy] = useState(false);
  const [trialEligible, setTrialEligible] = useState(false);

  useEffect(() => {
    let alive = true;
    loadPackages().then(async (p) => {
      if (!alive) return;
      setPkgs(p);
      const id = p.monthly?.product.identifier;
      if (id && p.monthly?.product.introPrice) {
        try {
          const res = await Purchases.checkTrialOrIntroductoryPriceEligibility([id]);
          if (alive) setTrialEligible(res[id]?.status !== INTRO_ELIGIBILITY_STATUS.INTRO_ELIGIBILITY_STATUS_INELIGIBLE);
        } catch {
          if (alive) setTrialEligible(true);
        }
      }
    });
    return () => {
      alive = false;
    };
  }, []);

  const close = () => (router.canGoBack() ? router.back() : router.replace('/(tabs)'));

  const monthly = pkgs?.monthly;
  const pass = pkgs?.pass;
  const intro = monthly?.product.introPrice;
  const showTrial = !!intro && trialEligible && intro.price === 0;

  const trialLabel = useMemo(() => {
    if (!intro) return '';
    const n = intro.periodNumberOfUnits * (intro.periodUnit === 'WEEK' ? 7 : intro.periodUnit === 'MONTH' ? 30 : 1);
    return n === 7 ? t('pw.trialWeek') : t('pw.trialDays', { n });
  }, [intro, t]);

  const savePct = useMemo(() => {
    if (!monthly || !pass) return 0;
    const nine = monthly.product.price * 9;
    return nine > pass.product.price ? Math.round((1 - pass.product.price / nine) * 100) : 0;
  }, [monthly, pass]);

  const selected: PurchasesPackage | undefined = choice === 'monthly' ? monthly : choice === 'pass' ? pass : undefined;

  const onBuy = async () => {
    if (!selected) return;
    setBusy(true);
    const r = await buy(selected);
    setBusy(false);
    if (r.ok) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      Alert.alert(t('pw.title'), t('pw.thanks'), [{ text: t('c.done'), onPress: close }]);
    } else if (!r.cancelled) {
      Alert.alert(t('pw.title'), r.message ? `${t('pw.error')}\n\n${r.message}` : t('pw.error'));
    }
  };

  const onRestore = async () => {
    setBusy(true);
    const r = await restore();
    setBusy(false);
    if (r.ok && r.active) Alert.alert(t('pw.title'), t('pw.restored'), [{ text: t('c.done'), onPress: close }]);
    else if (r.ok) Alert.alert(t('pw.title'), t('pw.nothingToRestore'));
    else Alert.alert(t('pw.title'), r.message ?? t('pw.unavailable'));
  };

  const benefits: [React.ComponentType<{ size?: number; color?: string }>, string, string][] = [
    [Icon.download, t('pw.b1'), t('pw.b1s')],
    [Icon.image, t('pw.b2'), t('pw.b2s')],
    [Icon.book, t('pw.b3'), t('pw.b3s')],
    [Icon.heart, t('pw.b4'), t('pw.b4s')],
  ];

  const loading = purchasesAvailable() && pkgs === null;
  const unavailable = !loading && (!monthly && !pass);

  const PlanCard = ({ k, title, price, sub, extra }: { k: Exclude<Choice, null>; title: string; price: string; sub: string; extra?: string }) => {
    const sel = choice === k;
    return (
      <Pressable
        onPress={() => {
          Haptics.selectionAsync().catch(() => {});
          setChoice(k);
        }}
        accessibilityRole="radio"
        accessibilityState={{ checked: sel }}
        accessibilityLabel={`${title}, ${price}`}
        style={{
          borderRadius: 22,
          borderWidth: 2,
          borderColor: sel ? colors.terracotta : colors.line,
          backgroundColor: sel ? colors.terracottaSoft : colors.surface,
          padding: 16,
          flexDirection: 'row',
          gap: 12,
          alignItems: 'center',
        }}
      >
        <View style={{ width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: sel ? colors.terracotta : colors.faint, alignItems: 'center', justifyContent: 'center' }}>
          {sel ? <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: colors.terracotta }} /> : null}
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: fonts.bodyBold, fontSize: 16, color: colors.ink }}>{title}</Text>
          <Text style={{ fontFamily: fonts.display, fontSize: 22, color: colors.ink, marginTop: 2 }}>{price}</Text>
          <Text style={{ fontFamily: fonts.body, fontSize: 13, color: colors.ink2, marginTop: 2, lineHeight: 18 }}>{sub}</Text>
          {extra ? <Text style={{ fontFamily: fonts.bodyBold, fontSize: 12.5, color: colors.sage, marginTop: 4 }}>{extra}</Text> : null}
        </View>
      </Pressable>
    );
  };

  const ctaLabel = !choice
    ? t('pw.ctaChoose')
    : choice === 'pass'
      ? t('pw.ctaPass')
      : showTrial
        ? t('pw.ctaTrial')
        : t('pw.ctaMonthly');

  return (
    <View style={{ flex: 1, backgroundColor: colors.base }}>
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 24 }} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={['#F9DCCB', '#F4D0C6', '#E9DDF0']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ paddingTop: insets.top + 12, paddingBottom: 28, paddingHorizontal: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <CircleButton onPress={close} accessibilityLabel={t('c.close')} bg="rgba(255,255,255,0.8)">
              <Icon.close size={18} color={colors.ink} />
            </CircleButton>
          </View>
          <Text style={{ fontSize: 54, textAlign: 'center', marginTop: 4 }}>🌼</Text>
          <Text style={{ fontFamily: fonts.display, fontSize: 34, color: colors.ink, textAlign: 'center', marginTop: 6, letterSpacing: -0.5 }}>{t('pw.title')}</Text>
          <Text style={{ fontFamily: fonts.body, fontSize: 15, lineHeight: 22, color: colors.ink2, textAlign: 'center', marginTop: 8 }}>{t('pw.sub')}</Text>
        </LinearGradient>

        <View style={{ paddingHorizontal: 20, marginTop: 18, gap: 14 }}>
          {benefits.map(([Icn, title, sub]) => (
            <View key={title} style={{ flexDirection: 'row', gap: 12, alignItems: 'flex-start' }}>
              <View style={{ width: 36, height: 36, borderRadius: 12, backgroundColor: colors.marigoldSoft, alignItems: 'center', justifyContent: 'center' }}>
                <Icn size={18} color={colors.terracotta} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: fonts.bodyBold, fontSize: 15.5, color: colors.ink }}>{title}</Text>
                <Text style={{ fontFamily: fonts.body, fontSize: 13.5, color: colors.mute, marginTop: 2, lineHeight: 19 }}>{sub}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={{ paddingHorizontal: 20, marginTop: 22, gap: 12 }}>
          {plus ? (
            <Text style={{ fontFamily: fonts.bodyBold, fontSize: 15, color: colors.sage, textAlign: 'center' }}>{t('pw.active')}</Text>
          ) : loading ? (
            <View style={{ alignItems: 'center', padding: 20, gap: 8 }}>
              <ActivityIndicator color={colors.terracotta} />
              <Text style={{ fontFamily: fonts.body, color: colors.mute }}>{t('pw.loading')}</Text>
            </View>
          ) : unavailable ? (
            <Text style={{ fontFamily: fonts.body, fontSize: 14, color: colors.mute, textAlign: 'center' }}>{t('pw.unavailable')}</Text>
          ) : (
            <>
              <Text style={{ fontFamily: fonts.bodyBold, fontSize: 12, letterSpacing: 1.4, color: colors.mute, textTransform: 'uppercase' }}>{t('pw.choose')}</Text>
              {monthly ? (
                <PlanCard
                  k="monthly"
                  title={t('pw.monthly')}
                  price={t('pw.monthlyPrice', { price: monthly.product.priceString })}
                  sub={showTrial ? t('pw.trial', { trial: trialLabel, price: monthly.product.priceString }) : t('pw.cancelAnytime')}
                />
              ) : null}
              {pass ? (
                <PlanCard
                  k="pass"
                  title={t('pw.pass')}
                  price={t('pw.passPrice', { price: pass.product.priceString })}
                  sub={t('pw.passSub')}
                  extra={savePct > 0 ? t('pw.passSave', { pct: savePct }) : undefined}
                />
              ) : null}
            </>
          )}
        </View>

        {!plus ? (
          <View style={{ paddingHorizontal: 20, marginTop: 18 }}>
            <Btn disabled={!selected || busy} onPress={onBuy}>
              {busy ? <ActivityIndicator color="#fff" /> : ctaLabel}
            </Btn>
            <Text style={{ fontFamily: fonts.body, fontSize: 11.5, lineHeight: 16, color: colors.mute, marginTop: 12 }}>
              {choice === 'pass' ? t('pw.legalPass') : t('pw.legalSub')}
            </Text>
          </View>
        ) : null}

        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 18, marginTop: 16, flexWrap: 'wrap', paddingHorizontal: 20 }}>
          <Pressable onPress={onRestore} disabled={busy} accessibilityRole="button">
            <Text style={{ fontFamily: fonts.bodyBold, fontSize: 13, color: colors.ink2, textDecorationLine: 'underline' }}>{t('pw.restore')}</Text>
          </Pressable>
          <Pressable onPress={() => Linking.openURL(APPLE_EULA_URL).catch(() => {})} accessibilityRole="link">
            <Text style={{ fontFamily: fonts.bodyBold, fontSize: 13, color: colors.ink2, textDecorationLine: 'underline' }}>{t('pw.terms')}</Text>
          </Pressable>
          <Pressable onPress={() => Linking.openURL(PRIVACY_URL).catch(() => {})} accessibilityRole="link">
            <Text style={{ fontFamily: fonts.bodyBold, fontSize: 13, color: colors.ink2, textDecorationLine: 'underline' }}>{t('pw.privacy')}</Text>
          </Pressable>
        </View>

        <Btn kind="ghost" style={{ marginTop: 10 }} onPress={close}>
          {from === 'onboarding' || from === 'nudge' ? t('pw.free') : t('c.close')}
        </Btn>
      </ScrollView>
    </View>
  );
}
