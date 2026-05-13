// Verdict modal — calls the AI route, shows a calm shimmer while it thinks,
// then springs in the verdict pill, illustration, headline, body, action card,
// and source attribution.

import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';
import { Card } from '@/components/Card';
import { Icon } from '@/components/Icon';
import { Illo } from '@/components/Blob';
import { VerdictPill } from '@/components/Verdict';
import { Shimmer, PulseSoft } from '@/components/Drift';
import { analyzePhoto, fetchVerdict, Mode } from '@/lib/ai';
import { VerdictPayload } from '@/data/verdicts';
import { useAppStore } from '@/store/useAppStore';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

export default function Verdict() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { item, mode, source } = useLocalSearchParams<{
    item?: string;
    mode?: string;
    source?: string;
  }>();
  const profile = useAppStore((s) => s.profile);
  const pendingPhoto = useAppStore((s) => s.pendingPhoto);
  const setPendingPhoto = useAppStore((s) => s.setPendingPhoto);
  const addJournalEntry = useAppStore((s) => s.addJournalEntry);
  const addRecent = useAppStore((s) => s.addRecent);

  const [v, setV] = useState<VerdictPayload | null>(null);

  useEffect(() => {
    let cancelled = false;
    const start = Date.now();
    const resolvedMode = ((mode as Mode) || 'Food') as Mode;

    const promise =
      source === 'photo' && pendingPhoto
        ? analyzePhoto({
            base64: pendingPhoto,
            mode: resolvedMode,
            week: profile.week,
            country: profile.country,
          })
        : fetchVerdict({
            item: item === '__pending__' ? 'Burrata, peach, basil' : item || 'Item',
            mode: resolvedMode,
            week: profile.week,
            country: profile.country,
          });

    promise.then((r) => {
      // Keep the shimmer visible for at least 700ms — it feels considered.
      const elapsed = Date.now() - start;
      const wait = Math.max(0, 700 - elapsed);
      setTimeout(() => {
        if (cancelled) return;
        setV(r);
        if (source === 'photo') setPendingPhoto(null);
        const id = `${Date.now()}`;
        addJournalEntry({
          id,
          week: profile.week,
          name: r.name,
          label: r.label,
          hue: r.hue,
          verdict: r.verdict,
          when: 'Just now',
        });
        addRecent({
          id,
          name: r.name,
          label: r.label,
          hue: r.hue,
          verdict: r.verdict,
          when: 'Just now',
        });
      }, wait);
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.base }}>
      <View
        style={{
          paddingTop: insets.top + 8,
          paddingHorizontal: 20,
          paddingBottom: 12,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(237,228,216,0.6)',
          backgroundColor: 'rgba(251,247,242,0.85)',
        }}
      >
        <Pressable
          onPress={() => router.back()}
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            borderWidth: 1,
            borderColor: colors.line,
            backgroundColor: colors.surface,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon.back size={18} color={colors.ink} />
        </Pressable>
        <Text style={{ fontSize: 12, letterSpacing: 1.6, textTransform: 'uppercase', color: colors.mute, fontFamily: fonts.bodyBold }}>
          {v ? 'Verdict' : 'Thinking'}
        </Text>
        <Pressable
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            borderWidth: 1,
            borderColor: colors.line,
            backgroundColor: colors.surface,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon.share size={18} color={colors.ink} />
        </Pressable>
      </View>

      {v == null ? (
        <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 32, paddingBottom: 40 }}>
          <View style={{ alignItems: 'center' }}>
            <PulseSoft>
              <View
                style={{
                  width: 160,
                  height: 160,
                  borderRadius: 80,
                  backgroundColor: colors.sand,
                }}
              />
            </PulseSoft>
            <View style={{ marginTop: 28 }}>
              <Shimmer width={140} height={36} radius={18} />
            </View>
            <View style={{ marginTop: 20 }}>
              <Shimmer width={280} height={28} radius={8} />
            </View>
            <View style={{ marginTop: 8 }}>
              <Shimmer width={220} height={28} radius={8} />
            </View>
            <View style={{ marginTop: 28, width: '100%' }}>
              <Shimmer width="100%" height={88} radius={20} />
            </View>
          </View>
        </ScrollView>
      ) : (
        <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 28, paddingBottom: 60 }}>
          <Animated.View entering={ZoomIn.duration(420)} style={{ alignItems: 'center' }}>
            <Illo label={v.label} hue={v.hue} size={160} />
          </Animated.View>

          <Animated.View entering={FadeIn.delay(120).duration(280)} style={{ marginTop: 24, alignItems: 'center' }}>
            <VerdictPill kind={v.verdict} size="lg" />
          </Animated.View>

          <Animated.Text
            entering={FadeIn.delay(220).duration(320)}
            style={{
              fontFamily: fonts.display,
              fontSize: 36,
              lineHeight: 40,
              color: colors.ink,
              textAlign: 'center',
              marginTop: 20,
              letterSpacing: -0.6,
            }}
          >
            {v.headline}
          </Animated.Text>

          <Animated.Text
            entering={FadeIn.delay(320).duration(320)}
            style={{
              color: 'rgba(42,37,34,0.85)',
              fontSize: 16.5,
              lineHeight: 26,
              marginTop: 20,
              fontFamily: fonts.body,
            }}
          >
            {v.body}
          </Animated.Text>

          <Animated.View entering={FadeIn.delay(420).duration(320)}>
            <Card style={{ marginTop: 24, padding: 18 }}>
              <Text style={{ fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase', color: colors.mute, fontFamily: fonts.bodyBold }}>
                {v.action.title}
              </Text>
              <Text style={{ color: colors.ink, fontSize: 15.5, lineHeight: 24, marginTop: 8, fontFamily: fonts.body }}>
                {v.action.body}
              </Text>
            </Card>
          </Animated.View>

          <Text style={{ marginTop: 18, fontSize: 12, color: colors.mute, lineHeight: 18, fontFamily: fonts.body }}>
            Reviewed against <Text style={{ color: 'rgba(42,37,34,0.8)' }}>NHS guidelines · ACOG 2024 · LactMed</Text>. Last checked April 2026.
          </Text>

          <View style={{ marginTop: 24, flexDirection: 'row', gap: 8 }}>
            {[
              { label: 'Save', I: Icon.bookmark, onPress: () => router.back() },
              { label: 'Partner', I: Icon.share, onPress: () => router.replace('/partner') },
              { label: 'Follow-up', I: Icon.spark, onPress: () => router.replace('/emergency') },
            ].map(({ label, I, onPress }) => (
              <Pressable
                key={label}
                onPress={onPress}
                style={{
                  flex: 1,
                  height: 56,
                  borderRadius: 14,
                  backgroundColor: colors.surface,
                  borderWidth: 1,
                  borderColor: colors.line,
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 4,
                }}
              >
                <I size={18} color={colors.ink} />
                <Text style={{ fontSize: 11, color: colors.ink, fontFamily: fonts.body }}>{label}</Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}
