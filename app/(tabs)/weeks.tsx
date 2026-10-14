// Week by week — a 1–42 week strip, then the selected week's size comparison,
// baby development, body changes, tips, to-dos and sources.

import React, { useEffect, useRef, useState } from 'react';
import { Linking, Pressable, ScrollView, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Icon } from '@/components/Icon';
import { Body, Eyebrow, H1, H2, MedicalNote, Surface, shadow } from '@/components/ui';
import { Btn } from '@/components/Btn';
import { useAppStore } from '@/store/useAppStore';
import { usePregnancy } from '@/lib/usePregnancy';
import { formatLength, formatWeight } from '@/lib/units';
import { getWeek, sizePhrase, sizeTitle } from '@/content';
import { useL10n, useL10nList, useLang, useT } from '@/i18n';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

const CHIP_W = 56;
const CHIP_GAP = 8;

export default function Weeks() {
  const t = useT();
  const L = useL10n();
  const LL = useL10nList();
  const lang = useLang();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ w?: string }>();
  const units = useAppStore((s) => s.profile.units);
  const lossMode = useAppStore((s) => s.profile.lossMode);
  const p = usePregnancy();
  const current = p?.contentWeek ?? 12;
  const [sel, setSel] = useState<number>(params.w ? Number(params.w) : current);
  const strip = useRef<ScrollView>(null);

  useEffect(() => {
    if (params.w) setSel(Math.min(42, Math.max(1, Number(params.w))));
  }, [params.w]);

  useEffect(() => {
    const x = Math.max(0, (sel - 1) * (CHIP_W + CHIP_GAP) - 140);
    const id = setTimeout(() => strip.current?.scrollTo({ x, animated: true }), 60);
    return () => clearTimeout(id);
  }, [sel]);

  const w = getWeek(sel);
  const tips = LL(w.tips);
  const todo = LL(w.todo);

  if (lossMode) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.base, paddingTop: insets.top + 24, paddingHorizontal: 24 }}>
        <Text style={{ fontSize: 34 }}>🕊️</Text>
        <H1 style={{ marginTop: 12 }}>{t('loss.weeksTitle')}</H1>
        <Body mute style={{ marginTop: 10 }}>{t('loss.weeksBody')}</Body>
        <Btn kind="secondary" style={{ marginTop: 24 }} onPress={() => router.push('/settings/loss')}>
          {t('loss.manage')}
        </Btn>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.base }}>
      <View style={{ paddingTop: insets.top + 8, paddingHorizontal: 20 }}>
        <Eyebrow>{p ? t('c.weeksDays', { w: p.weeks, d: p.days }) : t('weeks.eyebrow')}</Eyebrow>
        <H1 style={{ marginTop: 6 }}>{t('weeks.title')}</H1>
      </View>

      <ScrollView
        ref={strip}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 0, height: 78, marginTop: 14 }}
        contentContainerStyle={{ paddingHorizontal: 20, gap: CHIP_GAP, paddingBottom: 6 }}
      >
        {Array.from({ length: 42 }).map((_, i) => {
          const n = i + 1;
          const active = n === sel;
          const isNow = n === current && !!p;
          return (
            <Pressable
              key={n}
              onPress={() => {
                Haptics.selectionAsync().catch(() => {});
                setSel(n);
              }}
              accessibilityRole="button"
              accessibilityLabel={t('c.weekN', { n })}
              accessibilityState={{ selected: active }}
              style={{
                width: CHIP_W,
                height: 64,
                borderRadius: 18,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: active ? colors.terracotta : colors.surface,
                borderWidth: 1,
                borderColor: active ? colors.terracotta : colors.line,
              }}
            >
              <Text style={{ fontSize: 10.5, fontFamily: fonts.bodyBold, color: active ? 'rgba(255,255,255,0.8)' : colors.faint, letterSpacing: 0.6 }}>
                {t('c.week').toUpperCase()}
              </Text>
              <Text style={{ fontSize: 20, fontFamily: fonts.display, color: active ? '#fff' : colors.ink }}>{n}</Text>
              {isNow ? <View style={{ position: 'absolute', bottom: 6, width: 5, height: 5, borderRadius: 3, backgroundColor: active ? '#fff' : colors.terracotta }} /> : null}
            </Pressable>
          );
        })}
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 130 }}>
        <Animated.View key={sel} entering={FadeIn.duration(250)}>
          {/* Hero */}
          <View style={{ paddingHorizontal: 20, marginTop: 14 }}>
            <LinearGradient
              colors={['#FBE6D8', '#F6DDD6', '#EEE6F4']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ borderRadius: 30, padding: 22, alignItems: 'center', ...shadow.card }}
            >
              <View style={{ width: 150, height: 150, borderRadius: 75, backgroundColor: 'rgba(255,255,255,0.8)', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 86, lineHeight: 104 }} allowFontScaling={false}>{w.size.emoji}</Text>
              </View>
              <Text style={{ fontFamily: fonts.display, fontSize: 30, color: colors.ink, marginTop: 14, letterSpacing: -0.4 }}>
                {sel >= 4 ? sizeTitle(w.size, lang) : t('c.weekN', { n: sel })}
              </Text>
              <Text style={{ fontFamily: fonts.body, fontSize: 14.5, color: colors.ink2, marginTop: 4, textAlign: 'center' }}>
                {sel >= 4 ? t('today.sizeOf', { item: sizePhrase(w.size, lang) }) : t('weeks.early')}
              </Text>
              {w.lengthCm || w.weightG ? (
                <View style={{ flexDirection: 'row', gap: 10, marginTop: 16 }}>
                  {w.lengthCm ? (
                    <Stat icon={<Icon.ruler size={16} color={colors.terracotta} />} label={t('today.length')} value={formatLength(w.lengthCm, units)} />
                  ) : null}
                  {w.weightG ? (
                    <Stat icon={<Icon.scale size={16} color={colors.terracotta} />} label={t('today.weight')} value={formatWeight(w.weightG, units)} />
                  ) : null}
                </View>
              ) : null}
            </LinearGradient>
          </View>

          <Section emoji="👶" title={t('weeks.baby')} bg={colors.blush}>
            <Body>{L(w.baby)}</Body>
          </Section>
          <Section emoji="🤰" title={t('weeks.body')} bg={colors.lavenderSoft}>
            <Body>{L(w.body)}</Body>
          </Section>
          {tips.length ? (
            <Section emoji="💡" title={t('weeks.tips')} bg={colors.marigoldSoft}>
              {tips.map((tip, i) => (
                <View key={i} style={{ flexDirection: 'row', gap: 10, marginTop: i ? 10 : 0 }}>
                  <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: colors.marigold, marginTop: 9 }} />
                  <Body style={{ flex: 1 }}>{tip}</Body>
                </View>
              ))}
            </Section>
          ) : null}
          {todo.length ? (
            <Section emoji="✅" title={t('weeks.todo')} bg={colors.sageSoft}>
              {todo.map((item, i) => (
                <View key={i} style={{ flexDirection: 'row', gap: 10, marginTop: i ? 10 : 0 }}>
                  <Icon.check size={18} color={colors.sage} />
                  <Body style={{ flex: 1 }}>{item}</Body>
                </View>
              ))}
              <Pressable onPress={() => router.push('/tools/checklist')} style={{ marginTop: 14, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Text style={{ fontFamily: fonts.bodyBold, color: colors.sage, fontSize: 14 }}>{t('weeks.openChecklist')}</Text>
                <Icon.arrow size={14} color={colors.sage} />
              </Pressable>
            </Section>
          ) : null}

          {w.sources.length ? (
            <View style={{ paddingHorizontal: 20, marginTop: 22 }}>
              <Eyebrow style={{ marginBottom: 8 }}>{t('c.sources')}</Eyebrow>
              {w.sources.map((s) => (
                <Pressable key={s.url} onPress={() => Linking.openURL(s.url).catch(() => {})} style={{ flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 6 }}>
                  <Icon.external size={14} color={colors.terracotta} />
                  <Text style={{ flex: 1, fontFamily: fonts.body, fontSize: 13.5, color: colors.terracotta }} numberOfLines={1}>{s.name}</Text>
                </Pressable>
              ))}
            </View>
          ) : null}
          <MedicalNote text={t('c.medicalNote')} />
        </Animated.View>
      </ScrollView>
    </View>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <View style={{ backgroundColor: 'rgba(255,255,255,0.75)', borderRadius: 16, paddingHorizontal: 14, paddingVertical: 10, alignItems: 'center', minWidth: 110 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
        {icon}
        <Text style={{ fontFamily: fonts.bodyBold, fontSize: 11, color: colors.mute, textTransform: 'uppercase', letterSpacing: 1 }}>{label}</Text>
      </View>
      <Text style={{ fontFamily: fonts.display, fontSize: 20, color: colors.ink, marginTop: 2 }}>{value}</Text>
    </View>
  );
}

function Section({ emoji, title, bg, children }: { emoji: string; title: string; bg: string; children: React.ReactNode }) {
  return (
    <View style={{ paddingHorizontal: 20, marginTop: 14 }}>
      <Surface>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <View style={{ width: 36, height: 36, borderRadius: 12, backgroundColor: bg, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 18 }}>{emoji}</Text>
          </View>
          <H2 style={{ fontSize: 20 }}>{title}</H2>
        </View>
        {children}
      </Surface>
    </View>
  );
}
