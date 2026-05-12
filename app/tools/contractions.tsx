// Contraction timer. Press-and-hold the big button during each contraction.
// We log duration and the gap from the previous start, then compute the
// classic 5-1-1 pattern (every 5 min, lasting 1 min, for an hour).

import React, { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { SubScreenHeader } from '@/components/SubScreen';
import { Card } from '@/components/Card';
import { Btn } from '@/components/Btn';
import { Blob } from '@/components/Blob';
import { useAppStore } from '@/store/useAppStore';
import { useT } from '@/i18n';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

export default function ContractionsScreen() {
  const t = useT();
  const insets = useSafeAreaInsets();
  const contractions = useAppStore((s) => s.contractions);
  const addContraction = useAppStore((s) => s.addContraction);
  const clearContractions = useAppStore((s) => s.clearContractions);

  const [holding, setHolding] = useState(false);
  const [holdStart, setHoldStart] = useState<number | null>(null);
  const [now, setNow] = useState(Date.now());
  const ringScale = useSharedValue(1);
  const ringOpacity = useSharedValue(0.4);

  useEffect(() => {
    if (!holding) return;
    const id = setInterval(() => setNow(Date.now()), 200);
    return () => clearInterval(id);
  }, [holding]);

  const onPressIn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy).catch(() => {});
    setHolding(true);
    setHoldStart(Date.now());
    ringScale.value = withTiming(1.18, { duration: 600, easing: Easing.out(Easing.cubic) });
    ringOpacity.value = withTiming(0.85, { duration: 600 });
  };

  const onPressOut = () => {
    if (!holdStart) return;
    const end = Date.now();
    const durationSec = Math.max(1, Math.round((end - holdStart) / 1000));
    const last = contractions[contractions.length - 1];
    const gapSec = last ? Math.round((holdStart - last.startedAt) / 1000) : 0;
    addContraction({
      id: `c_${holdStart}`,
      startedAt: holdStart,
      durationSec,
      gapSec,
    });
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    setHolding(false);
    setHoldStart(null);
    ringScale.value = withSequence(
      withTiming(0.9, { duration: 120 }),
      withTiming(1, { duration: 220 }),
    );
    ringOpacity.value = withTiming(0.4, { duration: 320 });
  };

  const heldSec = holding && holdStart ? Math.floor((now - holdStart) / 1000) : 0;

  // Last-hour stats — count, avg duration, avg gap. We use these to detect 5-1-1.
  const lastHour = useMemo(() => {
    const cutoff = Date.now() - 60 * 60 * 1000;
    return contractions.filter((c) => c.startedAt >= cutoff);
  }, [contractions]);

  const avgDuration =
    lastHour.length === 0
      ? 0
      : Math.round(lastHour.reduce((a, c) => a + c.durationSec, 0) / lastHour.length);
  const gaps = lastHour.filter((c) => c.gapSec > 0).map((c) => c.gapSec);
  const avgGapMin =
    gaps.length === 0 ? 0 : Math.round(gaps.reduce((a, g) => a + g, 0) / gaps.length / 60);

  const is511 =
    lastHour.length >= 8 && avgGapMin > 0 && avgGapMin <= 5 && avgDuration >= 55;

  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ scale: ringScale.value }],
    opacity: ringOpacity.value,
  }));

  return (
    <View style={{ flex: 1, backgroundColor: colors.base }}>
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 320 }}>
        <Blob variant="lavender" />
      </View>

      <SubScreenHeader caption={t('contractions.caption')} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: insets.bottom + 32,
        }}
      >
        <Text
          style={{
            fontFamily: fonts.display,
            fontSize: 30,
            color: colors.ink,
            letterSpacing: -0.4,
            marginTop: 4,
          }}
        >
          {t('contractions.title')}
        </Text>
        <Text
          style={{
            color: colors.mute,
            fontSize: 14,
            lineHeight: 21,
            marginTop: 10,
            fontFamily: fonts.body,
          }}
        >
          {t('contractions.intro')}
        </Text>

        {/* Hold button */}
        <View style={{ alignItems: 'center', marginTop: 28 }}>
          <Animated.View
            style={[
              {
                position: 'absolute',
                width: 240,
                height: 240,
                borderRadius: 120,
                backgroundColor: colors.lavender,
                top: 10,
              },
              ringStyle,
            ]}
          />
          <Pressable
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            style={{
              width: 220,
              height: 220,
              borderRadius: 110,
              backgroundColor: holding ? colors.coral : colors.terracotta,
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: colors.terracotta,
              shadowOpacity: 0.3,
              shadowRadius: 24,
              shadowOffset: { width: 0, height: 12 },
            }}
          >
            <Text
              style={{
                fontFamily: fonts.display,
                fontSize: holding ? 64 : 22,
                color: '#fff',
                letterSpacing: holding ? -1.5 : -0.2,
                lineHeight: holding ? 68 : 28,
                textAlign: 'center',
                paddingHorizontal: 24,
              }}
            >
              {holding ? `${heldSec}s` : t('contractions.hold')}
            </Text>
            {holding ? (
              <Text
                style={{
                  marginTop: 6,
                  color: 'rgba(255,255,255,0.85)',
                  fontFamily: fonts.bodyBold,
                  fontSize: 12,
                  letterSpacing: 1.4,
                  textTransform: 'uppercase',
                }}
              >
                {t('contractions.release')}
              </Text>
            ) : null}
          </Pressable>
        </View>

        {/* 5-1-1 alert */}
        {is511 ? (
          <Card
            style={{
              marginTop: 24,
              padding: 18,
              backgroundColor: '#F1D8D1',
              borderWidth: 1,
              borderColor: colors.coral,
            }}
          >
            <Text
              style={{
                fontFamily: fonts.bodyBold,
                fontSize: 11,
                letterSpacing: 1.6,
                textTransform: 'uppercase',
                color: '#7A3327',
              }}
            >
              5-1-1
            </Text>
            <Text
              style={{
                fontFamily: fonts.display,
                fontSize: 20,
                color: '#7A3327',
                letterSpacing: -0.2,
                marginTop: 4,
                lineHeight: 26,
              }}
            >
              {t('contractions.511')}
            </Text>
          </Card>
        ) : null}

        {/* Summary card */}
        {lastHour.length > 0 ? (
          <Card style={{ marginTop: 20, padding: 18 }}>
            <Text
              style={{
                color: colors.mute,
                fontFamily: fonts.bodyBold,
                fontSize: 11,
                letterSpacing: 1.6,
                textTransform: 'uppercase',
              }}
            >
              {t('contractions.summary')}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 12,
                gap: 18,
                flexWrap: 'wrap',
              }}
            >
              <SummaryStat label={t('contractions.summary.count', { n: lastHour.length })} />
              {avgDuration ? (
                <SummaryStat
                  label={t('contractions.summary.avgDuration', { n: avgDuration })}
                />
              ) : null}
              {avgGapMin ? (
                <SummaryStat label={t('contractions.summary.avgGap', { n: avgGapMin })} />
              ) : null}
            </View>
          </Card>
        ) : null}

        {/* History list */}
        {contractions.length === 0 ? (
          <Text
            style={{
              color: colors.mute,
              fontSize: 14,
              textAlign: 'center',
              marginTop: 28,
              fontFamily: fonts.body,
            }}
          >
            {t('contractions.empty')}
          </Text>
        ) : (
          <View style={{ marginTop: 22 }}>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 16,
                paddingBottom: 6,
              }}
            >
              <ColHeader flex={1.4}>{t('contractions.col.start')}</ColHeader>
              <ColHeader flex={1}>{t('contractions.col.duration')}</ColHeader>
              <ColHeader flex={1} align="right">
                {t('contractions.col.gap')}
              </ColHeader>
            </View>
            <Card>
              {[...contractions]
                .slice(-12)
                .reverse()
                .map((c, i, arr) => (
                  <View key={c.id}>
                    <View
                      style={{
                        padding: 14,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <Cell flex={1.4}>
                        {new Date(c.startedAt).toLocaleTimeString(undefined, {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </Cell>
                      <Cell flex={1}>{c.durationSec}s</Cell>
                      <Cell flex={1} align="right">
                        {c.gapSec ? `${Math.round(c.gapSec / 60)}m ${c.gapSec % 60}s` : '—'}
                      </Cell>
                    </View>
                    {i < arr.length - 1 ? (
                      <View
                        style={{
                          height: 1,
                          backgroundColor: colors.line,
                          marginLeft: 14,
                        }}
                      />
                    ) : null}
                  </View>
                ))}
            </Card>

            <Btn
              kind="secondary"
              onPress={clearContractions}
              style={{ marginTop: 18 }}
            >
              {t('contractions.clear')}
            </Btn>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function SummaryStat({ label }: { label: string }) {
  return (
    <View>
      <Text
        style={{
          color: colors.ink,
          fontFamily: fonts.display,
          fontSize: 18,
          letterSpacing: -0.2,
        }}
      >
        {label}
      </Text>
    </View>
  );
}

function ColHeader({
  children,
  flex,
  align = 'left',
}: {
  children: React.ReactNode;
  flex: number;
  align?: 'left' | 'right';
}) {
  return (
    <Text
      style={{
        flex,
        color: colors.mute,
        fontFamily: fonts.bodyBold,
        fontSize: 10.5,
        letterSpacing: 1.4,
        textTransform: 'uppercase',
        textAlign: align,
      }}
    >
      {children}
    </Text>
  );
}

function Cell({
  children,
  flex,
  align = 'left',
}: {
  children: React.ReactNode;
  flex: number;
  align?: 'left' | 'right';
}) {
  return (
    <Text
      style={{
        flex,
        color: colors.ink,
        fontSize: 14,
        fontFamily: fonts.body,
        textAlign: align,
      }}
    >
      {children}
    </Text>
  );
}
