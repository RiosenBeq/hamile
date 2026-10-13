// Privacy & your data — plain-language promises, backup export/import, the
// privacy policy, and a hard "delete everything".

import React, { useState } from 'react';
import { Alert, Linking, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import * as Notifications from 'expo-notifications';
import { Icon } from '@/components/Icon';
import { Body, H1, IconBadge, NavBar, Page, Row, Surface } from '@/components/ui';
import { useAppStore } from '@/store/useAppStore';
import { exportBackup, importBackup } from '@/lib/backup';
import { clearOutbox } from '@/lib/sync';
import { PRIVACY_URL } from '@/lib/links';
import { useT } from '@/i18n';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

export default function PrivacySettings() {
  const t = useT();
  const router = useRouter();
  const resetAll = useAppStore((s) => s.resetAll);
  const [busy, setBusy] = useState(false);

  const onExport = async () => {
    setBusy(true);
    const r = await exportBackup();
    setBusy(false);
    if ('error' in r) Alert.alert(t('pv.export'), r.error);
    else Alert.alert(t('pv.export'), t('pv.exported', { kb: (r.bytes / 1024).toFixed(1) }));
  };

  const onImport = async () => {
    setBusy(true);
    const r = await importBackup();
    setBusy(false);
    if ('error' in r) Alert.alert(t('pv.import'), r.error);
    else if (r.imported > 0) Alert.alert(t('pv.import'), t('pv.imported', { n: r.imported }));
  };

  const onDelete = () => {
    Alert.alert(t('pv.deleteConfirm'), t('pv.deleteConfirmBody'), [
      { text: t('c.cancel'), style: 'cancel' },
      {
        text: t('c.delete'),
        style: 'destructive',
        onPress: async () => {
          await clearOutbox().catch(() => {});
          await Notifications.cancelAllScheduledNotificationsAsync().catch(() => {});
          const dir = `${FileSystem.documentDirectory}journal`;
          await FileSystem.deleteAsync(dir, { idempotent: true }).catch(() => {});
          await AsyncStorage.clear().catch(() => {});
          resetAll();
          Alert.alert(t('pv.deleted'));
          router.replace('/onboarding');
        },
      },
    ]);
  };

  const points = [t('pv.point1'), t('pv.point2'), t('pv.point3'), t('pv.point4')];

  return (
    <Page header={<NavBar caption={t('me.title')} />}>
      <View style={{ paddingHorizontal: 20 }}>
        <H1>{t('pv.title')}</H1>
        <Body mute style={{ marginTop: 8 }}>{t('pv.intro')}</Body>
      </View>

      <View style={{ paddingHorizontal: 20, marginTop: 16 }}>
        <Surface style={{ backgroundColor: colors.sageSoft, shadowOpacity: 0, gap: 10 }}>
          {points.map((p) => (
            <View key={p} style={{ flexDirection: 'row', gap: 10, alignItems: 'flex-start' }}>
              <Icon.check size={18} color={colors.sage} />
              <Text style={{ flex: 1, fontFamily: fonts.bodyBold, fontSize: 14.5, color: colors.ink, lineHeight: 20 }}>{p}</Text>
            </View>
          ))}
        </Surface>
      </View>

      <View style={{ paddingHorizontal: 20, marginTop: 16 }}>
        <Surface padded={false} style={{ overflow: 'hidden' }}>
          <Row left={<IconBadge icon={Icon.download} hue="sky" size={40} />} title={t('pv.export')} sub={t('pv.exportSub')} onPress={busy ? undefined : onExport} />
          <Row left={<IconBadge icon={Icon.image} hue="lavender" size={40} />} title={t('pv.import')} sub={t('pv.importSub')} onPress={busy ? undefined : onImport} />
          <Row left={<IconBadge icon={Icon.shield} hue="sage" size={40} />} title={t('pv.policy')} onPress={() => Linking.openURL(PRIVACY_URL).catch(() => {})} last />
        </Surface>
      </View>

      <View style={{ paddingHorizontal: 20, marginTop: 16 }}>
        <Surface padded={false} style={{ overflow: 'hidden' }}>
          <Row left={<IconBadge icon={Icon.trash} hue="rose" size={40} />} title={t('pv.delete')} sub={t('pv.deleteSub')} danger onPress={onDelete} last />
        </Surface>
      </View>
    </Page>
  );
}
