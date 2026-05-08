// Security & sync settings.
// Holds: app lock toggle, sign-in state, manual force-sync, manual backup
// export / import, and a clear "Sign out of this device" option.

import React, { useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card, SectionHead } from '@/components/Card';
import { Icon } from '@/components/Icon';
import { Btn } from '@/components/Btn';
import { SubScreenHeader, Toggle } from '@/components/SubScreen';
import { isBiometricAvailable, useAppLockEnabled } from '@/components/AppLock';
import { exportBackup, importBackup } from '@/lib/backup';
import { forceSync, outboxCount } from '@/lib/sync';
import { getCurrentUser, signOut } from '@/lib/auth';
import { supabaseConfigured } from '@/lib/supabase';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

export default function SecuritySetting() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [appLock, setAppLock] = useAppLockEnabled();
  const [biometric, setBiometric] = useState<boolean>(false);
  const [pending, setPending] = useState(0);
  const [email, setEmail] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  useEffect(() => {
    isBiometricAvailable().then(setBiometric);
    refresh();
  }, []);

  const refresh = async () => {
    setPending(await outboxCount());
    const u = await getCurrentUser();
    setEmail(u?.email ?? null);
  };

  const onAppLockToggle = async (v: boolean) => {
    if (v && !biometric) {
      Alert.alert(
        'No biometrics enrolled',
        'Set up Face ID, Touch ID or a fingerprint in your device settings first, then come back to enable the app lock.',
      );
      return;
    }
    await setAppLock(v);
  };

  const onForceSync = async () => {
    setBusy('sync');
    await forceSync();
    await refresh();
    setBusy(null);
  };

  const onExport = async () => {
    setBusy('export');
    const r = await exportBackup();
    setBusy(null);
    if ('error' in r) {
      Alert.alert("Couldn't export", r.error);
      return;
    }
    Alert.alert('Backup ready', `${(r.bytes / 1024).toFixed(1)} KB written and shared.`);
  };

  const onImport = async () => {
    setBusy('import');
    const r = await importBackup();
    setBusy(null);
    if ('error' in r) {
      Alert.alert("Couldn't import", r.error);
      return;
    }
    if (r.imported > 0) {
      Alert.alert('Restored', `Merged ${r.imported} journal entries from your backup.`);
    }
  };

  const onSignOut = async () => {
    Alert.alert(
      'Sign out?',
      'Your data stays on this phone. To get it back later, sign in with the same email.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign out',
          style: 'destructive',
          onPress: async () => {
            await signOut();
            await refresh();
          },
        },
      ],
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.base }}>
      <SubScreenHeader caption="Security" />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: insets.bottom + 32 }}>
        <Text style={{ fontFamily: fonts.display, fontSize: 30, color: colors.ink, letterSpacing: -0.4, marginTop: 8 }}>
          Locked. Backed up.
        </Text>
        <Text style={{ color: colors.mute, fontSize: 14, marginTop: 8, fontFamily: fonts.body, lineHeight: 20 }}>
          Your journal lives on this phone. Sign in to mirror it to your account
          so it survives a lost or replaced device.
        </Text>

        {/* Account */}
        <View style={{ marginTop: 28 }}>
          <SectionHead caption="Account" title="Cloud sync" />
          <Card style={{ padding: 18 }}>
            {email ? (
              <>
                <Text style={{ fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase', color: colors.mute, fontFamily: fonts.bodyBold }}>
                  Signed in
                </Text>
                <Text style={{ marginTop: 6, fontSize: 16, color: colors.ink, fontFamily: fonts.bodyBold }}>{email}</Text>
                <Text style={{ marginTop: 4, fontSize: 13, color: colors.mute, fontFamily: fonts.body }}>
                  {pending === 0 ? 'Everything synced.' : `${pending} change${pending === 1 ? '' : 's'} waiting to sync.`}
                </Text>
                <View style={{ flexDirection: 'row', gap: 10, marginTop: 16 }}>
                  <Btn kind="secondary" onPress={onForceSync} style={{ flex: 1 }}>
                    {busy === 'sync' ? 'Syncing…' : 'Force sync'}
                  </Btn>
                  <Btn kind="secondary" onPress={onSignOut} style={{ flex: 1 }}>
                    <Text style={{ color: colors.coral, fontFamily: fonts.bodyBold, fontSize: 14 }}>Sign out</Text>
                  </Btn>
                </View>
              </>
            ) : (
              <>
                <Text style={{ fontSize: 16, color: colors.ink, fontFamily: fonts.bodyBold }}>Stay offline forever</Text>
                <Text style={{ marginTop: 6, fontSize: 13, color: colors.mute, fontFamily: fonts.body, lineHeight: 18 }}>
                  Your journal is safe on this device only. If you change phones,
                  use a manual backup below — or sign in to mirror it.
                </Text>
                <View style={{ marginTop: 16 }}>
                  {!supabaseConfigured() ? (
                    <Text style={{ fontSize: 12.5, color: colors.mute, fontFamily: fonts.body }}>
                      Backend not configured. Add EXPO_PUBLIC_SUPABASE_URL to enable sign-in.
                    </Text>
                  ) : (
                    <Btn onPress={() => router.push('/auth')}>Sign in to back up</Btn>
                  )}
                </View>
              </>
            )}
          </Card>
        </View>

        {/* App lock */}
        <View style={{ marginTop: 28 }}>
          <SectionHead caption="On this phone" title="App lock" />
          <Card>
            <View style={{ padding: 16, flexDirection: 'row', alignItems: 'center', gap: 16 }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 15, color: colors.ink, fontFamily: fonts.body }}>
                  Require Face ID / Touch ID
                </Text>
                <Text style={{ fontSize: 12.5, color: colors.mute, marginTop: 2, fontFamily: fonts.body }}>
                  {biometric ? 'Locks the app after one minute backgrounded.' : 'No biometrics enrolled on this device.'}
                </Text>
              </View>
              <Toggle value={appLock} onChange={onAppLockToggle} />
            </View>
            <View style={{ height: 1, backgroundColor: colors.line, marginLeft: 16 }} />
            <View style={{ padding: 16 }}>
              <Text style={{ fontSize: 13, color: colors.mute, fontFamily: fonts.body, lineHeight: 18 }}>
                When app lock is on, the app-switcher thumbnail is also hidden so
                pregnancy details never leak through iOS or Android recents.
              </Text>
            </View>
          </Card>
        </View>

        {/* Manual backup */}
        <View style={{ marginTop: 28 }}>
          <SectionHead caption="Belt and braces" title="Manual backup" />
          <Card>
            <SettingsRow
              title="Export journal as JSON"
              sub="Saves a single file. Share to AirDrop, email, iCloud Drive."
              busy={busy === 'export'}
              icon={Icon.download}
              onPress={onExport}
            />
            <View style={{ height: 1, backgroundColor: colors.line, marginLeft: 16 }} />
            <SettingsRow
              title="Restore from a JSON backup"
              sub="Merges with your current journal — never overwrites local-only entries."
              busy={busy === 'import'}
              icon={Icon.share}
              onPress={onImport}
              isLast
            />
          </Card>
        </View>

        <Text style={{ marginTop: 18, fontSize: 12, color: colors.mute, fontFamily: fonts.body, textAlign: 'center' }}>
          Backups include profile, journal and recents. Photos and audio are never written to disk.
        </Text>
      </ScrollView>
    </View>
  );
}

function SettingsRow({
  title,
  sub,
  icon,
  busy,
  onPress,
  isLast,
}: {
  title: string;
  sub?: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  busy?: boolean;
  onPress?: () => void;
  isLast?: boolean;
}) {
  const Icn = icon;
  return (
    <Pressable
      onPress={onPress}
      disabled={busy}
      style={{ padding: 16, flexDirection: 'row', alignItems: 'center', gap: 16 }}
    >
      <View
        style={{
          width: 36,
          height: 36,
          borderRadius: 18,
          backgroundColor: colors.sand,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icn size={18} color={colors.ink} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 15, color: colors.ink, fontFamily: fonts.body }}>{busy ? `${title}…` : title}</Text>
        {sub ? (
          <Text style={{ fontSize: 12.5, color: colors.mute, marginTop: 2, fontFamily: fonts.body }} numberOfLines={2}>
            {sub}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
}
