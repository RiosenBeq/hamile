// Bump timeline — every bump photo as a cross-fading time-lapse (free), a
// two-column grid by week and a shareable collage export (Plus). Photos are
// read straight from the app's private documents folder.

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import * as Sharing from 'expo-sharing';
import { captureRef } from 'react-native-view-shot';
import Svg, { Path, Rect } from 'react-native-svg';
import Animated, { Easing, FadeIn, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Btn } from '@/components/Btn';
import { Icon } from '@/components/Icon';
import { Body, Chip, CircleButton, EmptyState, Eyebrow, H1, IconBadge, NavBar, ProgressBar, Surface } from '@/components/ui';
import { useAppStore } from '@/store/useAppStore';
import { pregnancyStatus } from '@/lib/pregnancy';
import { photoSrc } from '@/lib/photos';
import { usePlus } from '@/lib/purchases';
import { useFormat, useT } from '@/i18n';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

type T = ReturnType<typeof useT>;
type Frame = { id: string; uri: string; week: number; at: number };
type Speed = 'slow' | 'normal' | 'fast';

const SPEEDS: { value: Speed; ms: number; label: string }[] = [
  { value: 'slow', ms: 1200, label: 'bump.slow' },
  { value: 'normal', ms: 700, label: 'bump.normal' },
  { value: 'fast', ms: 400, label: 'bump.fast' },
];

const COLLAGE_MAX = 9;
const COLLAGE_W = 360; // dp; captured at device scale, so ~1080 px wide on a 3x phone
const COLLAGE_PAD = 20;
const COLLAGE_GAP = 8;

/** "Weeks 12–18", "Week 12" or '' when no week is known. */
function weeksRange(t: T, weeks: number[]): string {
  if (!weeks.length) return '';
  const from = Math.min(...weeks);
  const to = Math.max(...weeks);
  return from === to ? t('c.weekN', { n: from }) : t('bump.weeksRange', { from, to });
}

/** Up to `max` items spread evenly across the list, always keeping the first and last. */
function spread<I>(items: I[], max: number): I[] {
  if (items.length <= max) return items;
  const picked = new Set<number>();
  for (let i = 0; i < max; i++) picked.add(Math.round((i * (items.length - 1)) / (max - 1)));
  return [...picked].map((i) => items[i]);
}

export default function BumpTimeline() {
  const t = useT();
  const fmt = useFormat();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width: winW, height: winH } = useWindowDimensions();
  const diary = useAppStore((s) => s.diary);
  const dueDate = useAppStore((s) => s.profile.dueDate);
  const plus = usePlus();
  const up = (s: string) => s.toLocaleUpperCase(fmt.locale);

  // Oldest first: the time-lapse and the grid both read as a timeline. Every
  // stored path goes through photoSrc (player, grid and collage export alike).
  const frames = useMemo<Frame[]>(
    () =>
      diary
        .filter((d) => d.kind === 'bump' && !!d.photoUri)
        .sort((a, b) => a.at - b.at)
        .map((d) => ({
          id: d.id,
          uri: photoSrc(d.photoUri) ?? '',
          week: dueDate ? pregnancyStatus(dueDate, new Date(d.at)).weeks : d.week,
          at: d.at,
        }))
        .filter((f) => !!f.uri),
    [diary, dueDate],
  );

  const label = (f: Frame) => (f.week > 0 ? t('c.weekN', { n: f.week }) : fmt.short(f.at));
  const weeks = frames.map((f) => f.week).filter((w) => w > 0);
  const photos = frames.length === 1 ? t('bump.photosOne') : t('bump.photos', { n: frames.length });
  const range = weeksRange(t, weeks);
  const summary = range ? `${photos} · ${range}` : photos;

  const playerW = Math.min(winW - 40, Math.round(winH * 0.56 * 0.75));
  const cellW = Math.floor((winW - 40 - 12) / 2);
  // Remount the player whenever the set of photos changes, resetting playback.
  const framesKey = frames.map((f) => `${f.id}:${f.uri}`).join('|');

  const addPhoto = () => router.push({ pathname: '/entry', params: { kind: 'bump' } });
  const openPhoto = (id: string) => router.push({ pathname: '/entry', params: { kind: 'bump', id } });

  // ── Collage export (Plus) ─────────────────────────────────────────────────

  const collageRef = useRef<View>(null);
  const collageFrames = useMemo(() => spread(frames, COLLAGE_MAX), [frames]);
  const [exporting, setExporting] = useState(false);
  const painted = useRef(new Set<string>());
  const capturing = useRef(false);

  const capture = useCallback(async () => {
    if (capturing.current) return;
    capturing.current = true;
    let uri: string | null = null;
    try {
      // One more frame so the last photo is actually on screen.
      await new Promise((resolve) => setTimeout(resolve, 80));
      uri = await captureRef(collageRef, { format: 'jpg', quality: 0.92, result: 'tmpfile' });
    } catch {
      uri = null;
    }
    setExporting(false);
    if (!uri) {
      Alert.alert(t('bump.exportError'));
      return;
    }
    try {
      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert(t('bump.shareUnavailable'));
        return;
      }
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      await Sharing.shareAsync(uri, { mimeType: 'image/jpeg', UTI: 'public.jpeg', dialogTitle: t('bump.export') });
    } catch {
      // Share sheet dismissed or failed to open — nothing else to do.
    }
  }, [t]);

  const onCollagePhoto = useCallback(
    (id: string) => {
      painted.current.add(id);
      if (painted.current.size >= collageFrames.length) capture();
    },
    [collageFrames.length, capture],
  );

  // Safety net: capture anyway if a photo never reports back.
  useEffect(() => {
    if (!exporting) return;
    const id = setTimeout(() => capture(), 3000);
    return () => clearTimeout(id);
  }, [exporting, capture]);

  const exportCollage = () => {
    if (!plus) {
      router.push({ pathname: '/paywall', params: { from: 'bump' } });
      return;
    }
    if (exporting || !frames.length) return;
    Haptics.selectionAsync().catch(() => {});
    painted.current = new Set();
    capturing.current = false;
    setExporting(true);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.base }}>
      {exporting ? (
        <Collage
          ref={collageRef}
          frames={collageFrames}
          title={t('bump.collageTitle')}
          subtitle={range || photos}
          footer={t('bump.collageFooter')}
          label={label}
          onPhoto={onCollagePhoto}
        />
      ) : null}

      <NavBar
        caption={up(t('bump.caption'))}
        right={
          <CircleButton onPress={addPhoto} accessibilityLabel={t('bump.add')}>
            <Icon.plus size={18} color={colors.ink} />
          </CircleButton>
        }
      />

      <ScrollView
        style={{ flex: 1, backgroundColor: colors.base }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}
      >
        <View style={{ paddingHorizontal: 20, paddingTop: 4 }}>
          <H1>{t('bump.title')}</H1>
          {frames.length ? (
            <Body mute style={{ marginTop: 6 }}>
              {summary}
            </Body>
          ) : null}
        </View>

        {frames.length ? (
          <>
            <Player key={framesKey} frames={frames} width={playerW} label={label} />

            <View style={{ paddingHorizontal: 20, marginTop: 26 }}>
              <Surface onPress={exportCollage} style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
                <IconBadge icon={Icon.grid} hue="rose" />
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Text style={{ flexShrink: 1, fontFamily: fonts.bodyBold, fontSize: 15.5, color: colors.ink }}>
                      {exporting ? t('bump.exporting') : t('bump.export')}
                    </Text>
                    {!plus ? (
                      <View style={{ backgroundColor: colors.ink, borderRadius: 999, paddingHorizontal: 8, paddingVertical: 3 }}>
                        <Text style={{ color: '#FFF6EE', fontFamily: fonts.bodyBold, fontSize: 10.5, letterSpacing: 0.6 }}>{up(t('c.plus'))}</Text>
                      </View>
                    ) : null}
                  </View>
                  <Text style={{ fontFamily: fonts.body, fontSize: 13, color: colors.mute, marginTop: 2 }}>{t('bump.exportSub')}</Text>
                </View>
                {exporting ? <ActivityIndicator color={colors.terracotta} /> : <Icon.share size={20} color={colors.ink} />}
              </Surface>
            </View>

            <View style={{ paddingHorizontal: 20, marginTop: 28 }}>
              <Eyebrow style={{ marginBottom: 12 }}>{up(t('bump.all'))}</Eyebrow>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
                {frames.map((f) => (
                  <Pressable
                    key={f.id}
                    onPress={() => openPhoto(f.id)}
                    accessibilityRole="button"
                    accessibilityLabel={t('bump.photoA11y', { label: label(f) })}
                    style={({ pressed }) => ({ width: cellW, opacity: pressed ? 0.85 : 1 })}
                  >
                    <View style={{ width: cellW, height: Math.round((cellW * 4) / 3), borderRadius: 20, overflow: 'hidden', backgroundColor: colors.sand }}>
                      <Image source={{ uri: f.uri }} style={{ flex: 1 }} contentFit="cover" cachePolicy="memory" recyclingKey={f.id} transition={150} />
                      <View style={{ position: 'absolute', top: 10, left: 10, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4, backgroundColor: 'rgba(255,255,255,0.92)' }}>
                        <Text style={{ fontFamily: fonts.bodyBold, fontSize: 12, color: colors.ink }}>{label(f)}</Text>
                      </View>
                    </View>
                    <Text style={{ marginTop: 6, marginLeft: 2, fontFamily: fonts.body, fontSize: 12.5, color: colors.mute }}>
                      {fmt.date(f.at, { day: 'numeric', month: 'short', year: 'numeric' })}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </>
        ) : (
          <View>
            <EmptyState
              emoji="🤰"
              title={t('bump.empty.title')}
              body={t('bump.empty.body')}
              action={<Btn onPress={addPhoto}>{t('bump.empty.cta')}</Btn>}
            />
            <View style={{ paddingHorizontal: 20 }}>
              <Surface>
                <Eyebrow style={{ marginBottom: 12 }}>{up(t('bump.tips.title'))}</Eyebrow>
                {['bump.tip1', 'bump.tip2', 'bump.tip3'].map((k, i) => (
                  <View key={k} style={{ flexDirection: 'row', gap: 10, marginTop: i ? 10 : 0 }}>
                    <Icon.check size={18} color={colors.sage} />
                    <Body style={{ flex: 1 }}>{t(k)}</Body>
                  </View>
                ))}
              </Surface>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

// ── Time-lapse player ──────────────────────────────────────────────────────
//
// Two stacked image layers: the bottom one is always opaque, the top one fades
// in or out. The next photo is loaded into whichever layer is hidden and the
// fade only starts once it has actually been drawn, so frames never flash in
// half-loaded. Only two photos are ever decoded at a time.

function Player({ frames, width, label }: { frames: Frame[]; width: number; label: (f: Frame) => string }) {
  const t = useT();
  const fmt = useFormat();
  const n = frames.length;
  const height = Math.round((width * 4) / 3);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState<Speed>('normal');
  // Start on the newest photo; pressing play runs the timeline from the start.
  const [shown, setShown] = useState(n - 1);
  const [layers, setLayers] = useState<[string | null, string | null]>(() => [frames[n - 1].uri, null]);

  const front = useRef<0 | 1>(0);
  const drawn = useRef<[string | null, string | null]>([null, null]);
  const pending = useRef<{ layer: 0 | 1; uri: string; frame: number } | null>(null);
  const fallback = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stepMs = SPEEDS.find((s) => s.value === speed)?.ms ?? 700;
  const fadeMs = useRef(385);
  useEffect(() => {
    fadeMs.current = Math.round(Math.min(450, stepMs * 0.55));
  }, [stepMs]);
  const topOpacity = useSharedValue(0);
  const topStyle = useAnimatedStyle(() => ({ opacity: topOpacity.value }));

  const reveal = useCallback(() => {
    const next = pending.current;
    if (!next) return;
    pending.current = null;
    if (fallback.current) clearTimeout(fallback.current);
    front.current = next.layer;
    topOpacity.value = withTiming(next.layer === 1 ? 1 : 0, {
      duration: fadeMs.current,
      easing: Easing.inOut(Easing.quad),
    });
    setShown(next.frame);
  }, [topOpacity]);

  const goTo = useCallback(
    (frame: number) => {
      const uri = frames[frame]?.uri;
      if (!uri) return;
      const layer: 0 | 1 = front.current === 0 ? 1 : 0;
      pending.current = { layer, uri, frame };
      if (drawn.current[layer] === uri) {
        reveal();
        return;
      }
      drawn.current[layer] = null;
      setLayers((cur) => (layer === 0 ? [uri, cur[1]] : [cur[0], uri]));
      // A missing or unreadable file never reports back — don't stall on it.
      if (fallback.current) clearTimeout(fallback.current);
      fallback.current = setTimeout(reveal, 1500);
    },
    [frames, reveal],
  );

  const onDrawn = (layer: 0 | 1, uri: string | null) => {
    drawn.current[layer] = uri;
    const next = pending.current;
    if (next && next.layer === layer && next.uri === uri) reveal();
  };

  useEffect(() => {
    if (!playing || n < 2) return;
    // Linger on the newest photo before looping back to the first.
    const hold = shown === n - 1 ? stepMs * 2.2 : stepMs;
    const id = setTimeout(() => goTo((shown + 1) % n), hold);
    return () => clearTimeout(id);
  }, [playing, shown, stepMs, n, goTo]);

  useEffect(
    () => () => {
      if (fallback.current) clearTimeout(fallback.current);
    },
    [],
  );

  const toggle = () => {
    if (n < 2) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    if (playing) {
      setPlaying(false);
      return;
    }
    if (shown === n - 1) goTo(0);
    setPlaying(true);
  };

  const step = (dir: 1 | -1) => {
    Haptics.selectionAsync().catch(() => {});
    setPlaying(false);
    const base = pending.current?.frame ?? shown;
    goTo((base + dir + n) % n);
  };

  const f = frames[shown] ?? frames[n - 1];
  const playLabel = playing ? t('bump.pause') : t('bump.play');

  return (
    <View style={{ alignItems: 'center', marginTop: 18 }}>
      <Pressable
        onPress={toggle}
        disabled={n < 2}
        accessibilityRole="button"
        accessibilityLabel={n < 2 ? label(f) : playLabel}
        style={{ width, height, borderRadius: 28, overflow: 'hidden', backgroundColor: colors.shellDark }}
      >
        <Image
          source={layers[0] ? { uri: layers[0] } : null}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          cachePolicy="memory"
          onDisplay={() => onDrawn(0, layers[0])}
          onError={() => onDrawn(0, layers[0])}
        />
        <Animated.View style={[StyleSheet.absoluteFill, topStyle]}>
          <Image
            source={layers[1] ? { uri: layers[1] } : null}
            style={StyleSheet.absoluteFill}
            contentFit="cover"
            cachePolicy="memory"
            onDisplay={() => onDrawn(1, layers[1])}
            onError={() => onDrawn(1, layers[1])}
          />
        </Animated.View>
        <LinearGradient
          pointerEvents="none"
          colors={['rgba(26,22,20,0.38)', 'rgba(26,22,20,0)']}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 96 }}
        />
        <LinearGradient
          pointerEvents="none"
          colors={['rgba(26,22,20,0)', 'rgba(26,22,20,0.62)']}
          style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 160 }}
        />
        {n > 1 ? (
          <View pointerEvents="none" style={{ position: 'absolute', top: 14, left: 16, right: 16 }}>
            <ProgressBar value={(shown + 1) / n} color="#fff" track="rgba(255,255,255,0.28)" height={4} />
            <Text style={{ alignSelf: 'flex-end', marginTop: 8, fontFamily: fonts.bodyBold, fontSize: 12, color: 'rgba(255,255,255,0.92)' }}>
              {t('bump.frame', { i: shown + 1, n })}
            </Text>
          </View>
        ) : null}
        <View pointerEvents="none" style={{ position: 'absolute', left: 20, right: 20, bottom: 18 }}>
          <Animated.Text
            key={f.id}
            entering={FadeIn.duration(220)}
            style={{ fontFamily: fonts.display, fontSize: 36, lineHeight: 42, color: '#fff', letterSpacing: -0.5 }}
          >
            {label(f)}
          </Animated.Text>
          <Text style={{ fontFamily: fonts.body, fontSize: 13.5, color: 'rgba(255,255,255,0.85)', marginTop: 2 }}>{fmt.date(f.at)}</Text>
        </View>
      </Pressable>

      {n > 1 ? (
        <>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 22, marginTop: 18 }}>
            <CircleButton size={48} onPress={() => step(-1)} accessibilityLabel={t('bump.prev')}>
              <Icon.back size={20} color={colors.ink} />
            </CircleButton>
            <Pressable
              onPress={toggle}
              accessibilityRole="button"
              accessibilityLabel={playLabel}
              style={({ pressed }) => ({
                width: 68,
                height: 68,
                borderRadius: 34,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.terracotta,
                shadowColor: colors.terracotta,
                shadowOpacity: 0.3,
                shadowRadius: 14,
                shadowOffset: { width: 0, height: 6 },
                transform: [{ scale: pressed ? 0.94 : 1 }],
              })}
            >
              {playing ? <PauseGlyph /> : <PlayGlyph />}
            </Pressable>
            <CircleButton size={48} onPress={() => step(1)} accessibilityLabel={t('bump.next')}>
              <Icon.chevR size={20} color={colors.ink} />
            </CircleButton>
          </View>
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 16 }}>
            {SPEEDS.map((s) => (
              <Chip key={s.value} small label={t(s.label)} selected={speed === s.value} onPress={() => setSpeed(s.value)} />
            ))}
          </View>
        </>
      ) : (
        <Body mute style={{ textAlign: 'center', marginTop: 14, paddingHorizontal: 32 }}>
          {t('bump.needTwo')}
        </Body>
      )}
    </View>
  );
}

function PlayGlyph() {
  return (
    <Svg width={28} height={28} viewBox="0 0 24 24" style={{ marginLeft: 3 }}>
      <Path d="M8 5.6v12.8a1 1 0 0 0 1.52.85l10.2-6.4a1 1 0 0 0 0-1.7L9.52 4.75A1 1 0 0 0 8 5.6z" fill="#fff" />
    </Svg>
  );
}

function PauseGlyph() {
  return (
    <Svg width={28} height={28} viewBox="0 0 24 24">
      <Rect x={6.5} y={5} width={4} height={14} rx={1.5} fill="#fff" />
      <Rect x={13.5} y={5} width={4} height={14} rx={1.5} fill="#fff" />
    </Svg>
  );
}

// ── Collage ────────────────────────────────────────────────────────────────
//
// Rendered underneath the screen content only while exporting: laid out and
// drawn as far as the snapshot is concerned, but covered for the user.

type CollageProps = {
  frames: Frame[];
  title: string;
  subtitle: string;
  footer: string;
  label: (f: Frame) => string;
  onPhoto: (id: string) => void;
};

const Collage = React.forwardRef<View, CollageProps>(function Collage({ frames, title, subtitle, footer, label, onPhoto }, ref) {
  const cols = frames.length === 1 ? 1 : frames.length <= 4 ? 2 : 3;
  const cell = Math.floor((COLLAGE_W - COLLAGE_PAD * 2 - COLLAGE_GAP * (cols - 1)) / cols);
  return (
    <View pointerEvents="none" style={{ position: 'absolute', top: 0, left: 0 }}>
      <View ref={ref} collapsable={false} style={{ width: COLLAGE_W, padding: COLLAGE_PAD, backgroundColor: colors.base }}>
        <Text style={{ fontFamily: fonts.display, fontSize: 26, lineHeight: 31, color: colors.ink, letterSpacing: -0.4 }}>{title}</Text>
        <Text style={{ fontFamily: fonts.bodyBold, fontSize: 13, color: colors.terracotta, marginTop: 2 }}>{subtitle}</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: COLLAGE_GAP, marginTop: 16 }}>
          {frames.map((f) => (
            <View key={f.id} style={{ width: cell, height: Math.round((cell * 4) / 3), borderRadius: 14, overflow: 'hidden', backgroundColor: colors.sand }}>
              <Image
                source={{ uri: f.uri }}
                style={{ flex: 1 }}
                contentFit="cover"
                cachePolicy="memory"
                onDisplay={() => onPhoto(f.id)}
                onError={() => onPhoto(f.id)}
              />
              <View style={{ position: 'absolute', left: 6, bottom: 6, borderRadius: 999, paddingHorizontal: 8, paddingVertical: 3, backgroundColor: 'rgba(255,255,255,0.92)' }}>
                <Text style={{ fontFamily: fonts.bodyBold, fontSize: cols === 3 ? 10.5 : 12, color: colors.ink }}>{label(f)}</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 16 }}>
          <Text style={{ fontSize: 15 }}>🌼</Text>
          <Text style={{ fontFamily: fonts.display, fontSize: 15, color: colors.ink2 }}>{footer}</Text>
        </View>
      </View>
    </View>
  );
});
