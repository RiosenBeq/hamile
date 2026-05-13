// Quick Scan — live camera viewfinder with the design's overlay (corner brackets,
// soft warm scan line, mode selector). Falls back to a faux viewfinder if
// the user denies the camera permission so the experience never breaks.

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import {
  CameraView,
  useCameraPermissions,
  CameraType,
} from 'expo-camera';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Icon } from '@/components/Icon';
import { ScanLine } from '@/components/ScanLine';
import { useAppStore } from '@/store/useAppStore';
import { useT } from '@/i18n';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

const MODES = ['Food', 'Menu', 'Medication', 'Cosmetic', 'Activity'] as const;
type Mode = (typeof MODES)[number];

const SHUTTER_PRESS_MS = 90;
const SHUTTER_HOLD_MS = 200;

const MODE_LABEL_KEY: Record<(typeof MODES)[number], string> = {
  Food: 'scan.mode.food',
  Menu: 'scan.mode.menu',
  Medication: 'scan.mode.medication',
  Cosmetic: 'scan.mode.cosmetic',
  Activity: 'scan.mode.activity',
};

const MODE_POINT_KEY: Record<(typeof MODES)[number], string> = {
  Food: 'scan.point.food',
  Menu: 'scan.point.menu',
  Medication: 'scan.point.medication',
  Cosmetic: 'scan.point.cosmetic',
  Activity: 'scan.point.activity',
};

export default function Scan() {
  const t = useT();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [perm, requestPerm] = useCameraPermissions();
  const [mode, setMode] = useState<Mode>('Food');
  const [facing] = useState<CameraType>('back');
  const [capturing, setCapturing] = useState(false);
  const cameraReady = perm?.granted === true;
  const cameraRef = useRef<CameraView | null>(null);
  const setPendingPhoto = useAppStore((s) => s.setPendingPhoto);
  const captureScale = useSharedValue(1);
  const animatedCapture = useAnimatedStyle(() => ({ transform: [{ scale: captureScale.value }] }));
  const shutterTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (shutterTimer.current) clearTimeout(shutterTimer.current);
    },
    [],
  );

  const onShutter = useCallback(async () => {
    if (capturing || shutterTimer.current) return; // ignore double-taps mid-capture
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy).catch(() => {});
    captureScale.value = withTiming(0.9, { duration: SHUTTER_PRESS_MS });

    // Menu mode skips the verdict screen and goes straight to /menu-mode.
    if (mode === 'Menu') {
      shutterTimer.current = setTimeout(() => {
        captureScale.value = withTiming(1, { duration: 120 });
        shutterTimer.current = null;
        router.replace('/menu-mode');
      }, SHUTTER_HOLD_MS);
      return;
    }

    // Try a real photo capture when the camera is ready; fall back to the
    // text-only verdict path otherwise (no permission, simulator without
    // camera support, etc.) so the experience never breaks.
    if (cameraReady && cameraRef.current) {
      try {
        setCapturing(true);
        const shot = await cameraRef.current.takePictureAsync({
          base64: true,
          quality: 0.5,
          skipProcessing: true,
        });
        captureScale.value = withTiming(1, { duration: 120 });
        if (shot?.base64) {
          setPendingPhoto(shot.base64);
          router.replace({ pathname: '/verdict', params: { mode, source: 'photo' } });
          return;
        }
      } catch {
        // fall through to text path
      } finally {
        setCapturing(false);
      }
    }

    shutterTimer.current = setTimeout(() => {
      captureScale.value = withTiming(1, { duration: 120 });
      shutterTimer.current = null;
      router.replace({ pathname: '/verdict', params: { item: '__pending__', mode } });
    }, SHUTTER_HOLD_MS);
  }, [capturing, cameraReady, captureScale, mode, router, setPendingPhoto]);

  return (
    <View style={{ flex: 1, backgroundColor: '#13110F' }}>
      {/* Camera or fallback */}
      {cameraReady ? (
        <CameraView
          ref={cameraRef}
          facing={facing}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        />
      ) : (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#13110F' }}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                width: 230,
                height: 230,
                borderRadius: 115,
                backgroundColor: '#C99757',
              }}
            />
          </View>
        </View>
      )}

      {/* Warm vignette to keep colour calibration honest */}
      <View
        pointerEvents="none"
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(19,17,15,0.35)' }}
      />

      {/* Corner brackets */}
      <View pointerEvents="none" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
        {[
          { top: 160, left: 28, rotate: '0deg' },
          { top: 160, right: 28, rotate: '90deg' },
          { bottom: 260, left: 28, rotate: '-90deg' },
          { bottom: 260, right: 28, rotate: '180deg' },
        ].map((p, i) => (
          <View
            key={i}
            style={{
              position: 'absolute',
              width: 28,
              height: 28,
              transform: [{ rotate: p.rotate }],
              top: p.top,
              left: p.left,
              right: p.right,
              bottom: p.bottom,
            }}
          >
            <View style={{ position: 'absolute', top: 0, left: 0, height: 2, width: '100%', backgroundColor: 'rgba(255,255,255,0.6)' }} />
            <View style={{ position: 'absolute', top: 0, left: 0, width: 2, height: '100%', backgroundColor: 'rgba(255,255,255,0.6)' }} />
          </View>
        ))}
      </View>

      <ScanLine />

      {/* Top bar */}
      <View
        style={{
          position: 'absolute',
          top: insets.top + 8,
          left: 0,
          right: 0,
          paddingHorizontal: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Pressable
          onPress={() => router.back()}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: 'rgba(255,255,255,0.18)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon.close size={20} color="#fff" />
        </Pressable>
        <Text
          style={{
            color: 'rgba(255,255,255,0.75)',
            fontSize: 12,
            letterSpacing: 1.6,
            textTransform: 'uppercase',
            fontFamily: fonts.bodyBold,
          }}
        >
          {t(MODE_POINT_KEY[mode])}
        </Text>
        <Pressable
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: 'rgba(255,255,255,0.18)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon.flash size={18} color="#fff" />
        </Pressable>
      </View>

      <Pressable
        onPress={() => router.replace('/(tabs)/library')}
        accessibilityRole="link"
        accessibilityLabel={t('scan.typeInstead')}
        hitSlop={12}
        style={{ position: 'absolute', top: insets.top + 56, right: 24 }}
      >
        <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, fontFamily: fonts.body, textDecorationLine: 'underline' }}>
          {t('scan.typeInstead')}
        </Text>
      </Pressable>

      {!cameraReady ? (
        <View style={{ position: 'absolute', top: insets.top + 96, left: 24, right: 24 }}>
          <Pressable
            onPress={() => requestPerm()}
            style={{
              backgroundColor: 'rgba(255,255,255,0.15)',
              borderRadius: 14,
              padding: 14,
            }}
          >
            <Text style={{ color: '#fff', fontSize: 13, fontFamily: fonts.bodyBold }}>
              {t('scan.allow.title')}
            </Text>
            <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 4, fontFamily: fonts.body }}>
              {t('scan.allow.body')}
            </Text>
          </Pressable>
        </View>
      ) : null}

      {/* Bottom sheet */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: colors.base,
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
          paddingTop: 12,
          paddingBottom: insets.bottom + 24,
          paddingHorizontal: 24,
        }}
      >
        <View style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: colors.line, alignSelf: 'center' }} />

        <View style={{ marginTop: 18, flexDirection: 'row', gap: 8, justifyContent: 'flex-start' }}>
          {MODES.map((mo) => {
            const sel = mode === mo;
            return (
              <Pressable
                key={mo}
                onPress={() => setMode(mo)}
                style={{
                  paddingHorizontal: 14,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: sel ? colors.ink : colors.surface,
                  borderWidth: sel ? 0 : 1,
                  borderColor: colors.line,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ color: sel ? colors.base : colors.ink, fontSize: 13, fontFamily: fonts.bodyBold }}>{t(MODE_LABEL_KEY[mo])}</Text>
              </Pressable>
            );
          })}
        </View>

        <View
          style={{
            marginTop: 22,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Pressable
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: colors.surface,
              borderWidth: 1,
              borderColor: colors.line,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon.library size={20} color={colors.ink} />
          </Pressable>
          <Pressable onPress={onShutter} disabled={capturing}>
            <Animated.View
              style={[
                {
                  width: 78,
                  height: 78,
                  borderRadius: 39,
                  backgroundColor: '#fff',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 4,
                  borderColor: colors.terracotta,
                },
                animatedCapture,
              ]}
            >
              {capturing ? (
                <ActivityIndicator color={colors.terracotta} />
              ) : (
                <View style={{ width: 58, height: 58, borderRadius: 29, backgroundColor: colors.terracotta }} />
              )}
            </Animated.View>
          </Pressable>
          <Pressable
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: colors.surface,
              borderWidth: 1,
              borderColor: colors.line,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon.mic size={20} color={colors.ink} />
          </Pressable>
        </View>
        <Text
          style={{
            textAlign: 'center',
            marginTop: 12,
            fontSize: 11,
            letterSpacing: 1.6,
            textTransform: 'uppercase',
            color: colors.mute,
            fontFamily: fonts.bodyBold,
          }}
        >
          {t('scan.hint')}
        </Text>
      </View>
    </View>
  );
}
