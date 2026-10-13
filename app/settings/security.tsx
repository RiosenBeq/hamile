// App lock — Face ID / Touch ID / passcode gate (see components/AppLock).

import React, { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { Body, H1, NavBar, Page, Surface, ToggleRow } from '@/components/ui';
import { isBiometricAvailable, useAppLockEnabled } from '@/components/AppLock';
import { useT } from '@/i18n';

export default function SecuritySettings() {
  const t = useT();
  const [enabled, setEnabled] = useAppLockEnabled();
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    isBiometricAvailable().then(setAvailable).catch(() => setAvailable(false));
  }, []);

  return (
    <Page header={<NavBar caption={t('me.title')} />}>
      <View style={{ paddingHorizontal: 20 }}>
        <H1>{t('lock.title')}</H1>
        <Body mute style={{ marginTop: 8 }}>{t('lock.intro')}</Body>
      </View>
      <View style={{ paddingHorizontal: 20, marginTop: 18 }}>
        <Surface padded={false}>
          <ToggleRow
            title={t('lock.toggle')}
            value={enabled}
            onChange={async (v) => {
              if (v && !available) {
                Alert.alert(t('lock.title'), t('lock.noBiometrics'));
                return;
              }
              await setEnabled(v);
            }}
            last
          />
        </Surface>
      </View>
    </Page>
  );
}
