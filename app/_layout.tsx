// Marigold root layout. Loads fonts, hydrates the store, then gates on
// onboarding. Modals slide up over the tabs.

import { useEffect } from 'react';
import { Stack, SplashScreen, Redirect } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import {
  useFonts,
  Manrope_500Medium,
  Manrope_700Bold,
} from '@expo-google-fonts/manrope';
import {
  SourceSerif4_600SemiBold,
  SourceSerif4_700Bold,
} from '@expo-google-fonts/source-serif-4';
import { useAppStore } from '@/store/useAppStore';
import { AppLock } from '@/components/AppLock';
import { bootSync } from '@/lib/sync';
import { rescheduleAll } from '@/lib/notifications';
import { colors } from '@/theme/colors';

SplashScreen.preventAutoHideAsync().catch(() => {});

export const unstable_settings = { initialRouteName: 'index' };

export default function RootLayout() {
  // Only load the four weights the design actually uses. Skipping the others
  // shaves a few hundred KB off the bundle and shortens cold start.
  const [fontsLoaded, fontError] = useFonts({
    Manrope_500Medium,
    Manrope_700Bold,
    SourceSerif_600SemiBold: SourceSerif4_600SemiBold,
    SourceSerif_700Bold: SourceSerif4_700Bold,
  });
  const hydrated = useAppStore((s) => s.hydrated);
  const ready = (fontsLoaded || !!fontError) && hydrated;

  useEffect(() => {
    if (ready) {
      SplashScreen.hideAsync().catch(() => {});
      bootSync().catch(() => {});
      const { profile, notifPrefs } = useAppStore.getState();
      rescheduleAll(profile, notifPrefs).catch(() => {});
    }
  }, [ready]);

  if (!ready) return <View style={{ flex: 1, backgroundColor: colors.base }} />;

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.shellDark }}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <AppLock>
          <RootStack />
        </AppLock>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

function RootStack() {
  return (
    <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.base },
            animation: 'fade',
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="onboarding" options={{ animation: 'fade' }} />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="scan"
            options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
          />
          <Stack.Screen
            name="verdict"
            options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
          />
          <Stack.Screen
            name="baby"
            options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
          />
          <Stack.Screen
            name="menu-mode"
            options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
          />
          <Stack.Screen
            name="emergency"
            options={{ presentation: 'modal', animation: 'fade' }}
          />
          <Stack.Screen
            name="pdf"
            options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
          />
          <Stack.Screen
            name="partner"
            options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
          />
          <Stack.Screen
            name="paywall"
            options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
          />
          <Stack.Screen
            name="activity"
            options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
          />
          <Stack.Screen name="topic" options={{ animation: 'slide_from_right' }} />
          <Stack.Screen name="reminder" options={{ animation: 'slide_from_right' }} />
          <Stack.Screen name="settings" options={{ animation: 'slide_from_right' }} />
          <Stack.Screen name="tools" options={{ animation: 'slide_from_right' }} />
          <Stack.Screen name="auth" options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
          <Stack.Screen name="auth-callback" />
        </Stack>
  );
}
