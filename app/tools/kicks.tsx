// Kick counter — the standard "ten in two hours" practice from week 28+.
// Tap the big circle for each distinct movement. We log the session, time
// taken, and a soft note about what's expected.

import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { SubScreenHeader } from '@/components/SubScreen';
import { Card } from '@/components/Card';
import { Btn } from '@/components/Btn';
import { Blob } from '@/components/Blob';
import { useAppStore } from '@/store/useAppStore';
import { useT } from '@/i18n';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

const GOAL = 10;

export default function KicksScreen() {
  const t = useT();
  const insets = useSafeAreaInsets();
  const kickSessions = useAppStore((s) => s.kickSessions);
  const addKickSession = useAppStore((s) => s.addKickSession);

  const [count, setCount] = useState(0);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [endedAt, setEndedAt] = useState<number | null>(null);
  const [now, setNow] = useState(Date.now());
  const scale = useSharedValue(1);
  const ringPulse = useSharedValue(0);

  // Tick once a second while a session is active so the elapsed label updates.
  useEffect(() => {
    if (!startedAt || endedAt) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [startedAt, endedAt]);

  // When the goal is hit, snapshot the session and let the user decide whether
  // to save it. We *don't* auto-save — it's their record, their decision.
  useEffect(() => {
    if (count >= GOAL && startedAt && !endedAt) {
      const end = Date.now();
      setEndedAt(end);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(
        () => {},
      );
    }
  }, [count, startedAt, endedAt]);

  const tapped = () => {
    if (endedAt) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    scale.value = withSequence(
      withTiming(0.94, { duration: 80 }),
      withSpring(1, { mass: 0.4, damping: 6 }),
    );
    ringPulse.value = withSequence(
      withTiming(1, { duration: 120 }),
      withTiming(0, { duration: 480 }),
    );
    setCount((c) => {
      if (c === 0) setStartedAt(Date.now());
      return c + 1;
    });
  };

  const restart = () => {
    setCount(0);
    setStartedAt(null);
    setEndedAt(null);
  };

  const save = () => {
    if (!startedAt || !endedAt) return;
    addKickSession({
      id: `k_${Date.now()}`,
      startedAt,
      endedAt,
      count,
    });
    restart();
  };

  const elapsedSec = startedAt
    ? Math.floor(((endedAt ?? now) - startedAt) / 1000)
    : 0;
  const elapsedMin = Math.floor(elapsedSec / 60);
  const elapsedRemS = elapsedSec % 60;

  const buttonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const ringStyle = useAnimatedStyle(() => ({
    opacity: 0.25 + ringPulse.value * 0.6,
    transform: [{ scale: 1 + ringPulse.value * 0.06 }],
  }));

  const progress = Math.min(count / GOAL, 1);

  return (
    <View style={{ flex: 1, backgroundColor: colors.base }}>
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 320 }}>
        <Blob variant="cream" />
      </View>

      <SubScreenHeader caption={t('kicks.caption')} />

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
          {t('kicks.title')}
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
          {t('kicks.intro')}
        </Text>

        {/* Big tappable circle */}
        <View style={{ alignItems: 'center', marginTop: 28 }}>
          <Animated.View
            style={[
              {
                position: 'absolute',
                width: 240,
                height: 240,
                borderRadius: 120,
                borderWidth: 1.5,
                borderColor: colors.terracotta,
                top: 10,
              },
              ringStyle,
            ]}
          />
          <Animated.View style={buttonStyle}>
            <Pressable
              onPress={tapped}
              disabled={!!endedAt}
              style={{
                width: 220,
                height: 220,
                borderRadius: 110,
                backgroundColor: endedAt ? colors.sage : colors.terracotta,
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: colors.terracotta,
                shadowOpacity: 0.35,
                shadowRadius: 24,
                shadowOffset: { width: 0, height: 12 },
              }}
            >
              <Text
                style={{
                  fontFamily: fonts.display,
                  fontSize: 76,
                  color: '#fff',
                  letterSpacing: -2,
                  lineHeight: 78,
                }}
              >
                {count}
              </Text>
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
                {t('kicks.countOf', { n: count })}
              </Text>
            </Pressable>
          </Animated.View>
        </View>

        {/* Progress + elapsed */}
        <View style={{ marginTop: 32 }}>
          <View
            style={{
              height: 6,
              borderRadius: 3,
              backgroundColor: colors.line,
              overflow: 'hidden',
            }}
          >
            <View
              style={{
                width: `${progress * 100}%`,
                height: '100%',
                backgroundColor: colors.sage,
                borderRadius: 3,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 12,
            }}
          >
            <Text style={{ color: colors.mute, fontFamily: fonts.body, fontSize: 12.5 }}>
              {t('kicks.elapsed')}
            </Text>
            <Text style={{ color: colors.ink, fontFamily: fonts.bodyBold, fontSize: 13 }}>
              {elapsedMin}:{String(elapsedRemS).padStart(2, '0')}
            </Text>
          </View>
        </View>

        {/* Completion + actions */}
        {endedAt ? (
          <Card style={{ padding: 20, marginTop: 24 }}>
            <Text
              style={{
                fontFamily: fonts.display,
                fontSize: 22,
                color: colors.ink,
                letterSpacing: -0.2,
                lineHeight: 28,
              }}
            >
              {t('kicks.complete.title', { minutes: elapsedMin })}
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
              {t('kicks.complete.body')}
            </Text>
            <View style={{ flexDirection: 'row', gap: 10, marginTop: 18 }}>
              <Btn onPress={save} style={{ flex: 1 }}>
                {t('kicks.saveJournal')}
              </Btn>
              <Btn kind="secondary" onPress={restart} style={{ flex: 1 }}>
                {t('kicks.restart')}
              </Btn>
            </View>
          </Card>
        ) : null}

        {/* Recent sessions */}
        {kickSessions.length > 0 ? (
          <View style={{ marginTop: 28 }}>
            <Text
              style={{
                color: colors.mute,
                fontFamily: fonts.bodyBold,
                fontSize: 11,
                letterSpacing: 1.6,
                textTransform: 'uppercase',
                marginBottom: 10,
              }}
            >
              {t('kicks.recent')}
            </Text>
            <Card>
              {kickSessions.slice(0, 5).map((s, i, arr) => {
                const dur = Math.max(1, Math.round((s.endedAt - s.startedAt) / 60000));
                const when = new Date(s.startedAt).toLocaleString(undefined, {
                  weekday: 'short',
                  hour: '2-digit',
                  minute: '2-digit',
                });
                return (
                  <View key={s.id}>
                    <View
                      style={{
                        padding: 16,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Text
                        style={{
                          color: colors.ink,
                          fontSize: 14.5,
                          fontFamily: fonts.bodyBold,
                        }}
                      >
                        {t('kicks.session.label', { count: s.count, minutes: dur })}
                      </Text>
                      <Text style={{ color: colors.mute, fontSize: 12, fontFamily: fonts.body }}>
                        {when}
                      </Text>
                    </View>
                    {i < arr.length - 1 ? (
                      <View
                        style={{
                          height: 1,
                          backgroundColor: colors.line,
                          marginLeft: 16,
                        }}
                      />
                    ) : null}
                  </View>
                );
              })}
            </Card>
          </View>
        ) : null}

        <Text
          style={{
            marginTop: 24,
            fontSize: 12,
            color: colors.mute,
            textAlign: 'center',
            fontFamily: fonts.body,
          }}
        >
          {t('kicks.note')}
        </Text>
      </ScrollView>
    </View>
  );
}
