// Biometric app lock + privacy shield.
//
// AppLock wraps the entire app. On cold launch (or after a configurable
// idle timeout) the screen is replaced with the lock veil and the user
// has to authenticate with Face ID / Touch ID / device passcode.
//
// PrivacyShield is layered separately — it's the soft cream wash that
// replaces app content the *moment* the app goes inactive, so the iOS
// app-switcher screenshot and Android recents thumbnail never expose
// pregnancy data.

import React, { useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus, Pressable, Text, View } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { secureStore, SECURE } from '@/lib/secureStorage';
import { Btn } from '@/components/Btn';
import { Icon } from '@/components/Icon';
import { Blob } from '@/components/Blob';
import { MarigoldMark } from '@/components/MarigoldMark';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

const LOCK_TIMEOUT_MS = 60_000; // Re-prompt after 1 minute backgrounded.

export function useAppLockEnabled() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    secureStore.getItem(SECURE.appLockEnabled).then((v) => setEnabled(v === '1'));
  }, []);
  const set = async (v: boolean) => {
    await secureStore.setItem(SECURE.appLockEnabled, v ? '1' : '0');
    setEnabled(v);
  };
  return [enabled, set] as const;
}

export async function isBiometricAvailable(): Promise<boolean> {
  try {
    const has = await LocalAuthentication.hasHardwareAsync();
    if (!has) return false;
    const enrolled = await LocalAuthentication.isEnrolledAsync();
    return enrolled;
  } catch {
    return false;
  }
}

export function AppLock({ children }: { children: React.ReactNode }) {
  const [locked, setLocked] = useState(false);
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [shieldVisible, setShieldVisible] = useState(false);
  const lastActiveRef = useRef(Date.now());

  // Read the persisted setting on mount.
  useEffect(() => {
    secureStore.getItem(SECURE.appLockEnabled).then((v) => {
      const on = v === '1';
      setEnabled(on);
      if (on) setLocked(true);
    });
  }, []);

  // App state — privacy shield + idle-timeout based re-locking.
  useEffect(() => {
    const onChange = (s: AppStateStatus) => {
      if (s === 'active') {
        setShieldVisible(false);
        if (enabled && Date.now() - lastActiveRef.current > LOCK_TIMEOUT_MS) {
          setLocked(true);
        }
      } else {
        // background or inactive
        setShieldVisible(true);
        lastActiveRef.current = Date.now();
      }
    };
    const sub = AppState.addEventListener('change', onChange);
    return () => sub.remove();
  }, [enabled]);

  // Auto-prompt once when we lock.
  useEffect(() => {
    if (!locked) return;
    let cancelled = false;
    (async () => {
      const ok = await tryAuth();
      if (!cancelled && ok) setLocked(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [locked]);

  if (enabled === null) {
    // Still resolving — render nothing but the cream base so we don't flash
    // protected content for a frame.
    return <View style={{ flex: 1, backgroundColor: colors.base }} />;
  }

  return (
    <>
      {children}
      {(locked || shieldVisible) && <LockVeil locked={locked} onUnlock={() => setLocked(false)} />}
    </>
  );
}

async function tryAuth(): Promise<boolean> {
  try {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Unlock Marigold',
      fallbackLabel: 'Use device passcode',
      cancelLabel: 'Cancel',
      disableDeviceFallback: false,
    });
    return result.success;
  } catch {
    return false;
  }
}

function LockVeil({ locked, onUnlock }: { locked: boolean; onUnlock: () => void }) {
  // While shielding (app inactive but not yet timed-out) we just show the
  // cream wash with no Unlock button — this is the app-switcher case.
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: colors.base,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32,
      }}
    >
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
        <Blob variant="cream" />
      </View>
      <MarigoldMark size={140} />
      <Text style={{ marginTop: 24, fontFamily: fonts.display, fontSize: 26, color: colors.ink, letterSpacing: -0.3 }}>
        Marigold
      </Text>
      <Text style={{ marginTop: 6, color: colors.mute, fontSize: 14, fontFamily: fonts.body, textAlign: 'center' }}>
        Locked. Tap to unlock.
      </Text>
      {locked ? (
        <Pressable
          onPress={async () => {
            const ok = await tryAuth();
            if (ok) onUnlock();
          }}
          style={{
            marginTop: 28,
            paddingHorizontal: 22,
            height: 52,
            borderRadius: 26,
            backgroundColor: colors.terracotta,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <Icon.user size={18} color="#fff" />
          <Text style={{ color: '#fff', fontFamily: fonts.bodyBold, fontSize: 15 }}>Unlock</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
