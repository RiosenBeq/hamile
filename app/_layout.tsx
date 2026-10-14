// Marigold root layout. Loads fonts, hydrates the store, configures
// purchases, keeps local notifications fresh, then gates on onboarding.

import { useEffect } from 'react';
import { AppState, Platform, View } from 'react-native';
import { Stack, SplashScreen, useRouter } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as Notifications from 'expo-notifications';
import { useFonts, Manrope_500Medium, Manrope_700Bold } from '@expo-google-fonts/manrope';
import { SourceSerif4_600SemiBold, SourceSerif4_700Bold } from '@expo-google-fonts/source-serif-4';
import { useAppStore } from '@/store/useAppStore';
import { AppLock } from '@/components/AppLock';
import { bootSync } from '@/lib/sync';
import { rescheduleAll } from '@/lib/notifications';
import { configurePurchases } from '@/lib/purchases';
import { syncWidget } from '@/lib/native';
import { setUnitsLocale } from '@/lib/units';
import { localeFor } from '@/i18n';
import { colors } from '@/theme/colors';

SplashScreen.preventAutoHideAsync().catch(() => {});

export const unstable_settings = { initialRouteName: 'index' };

export default function RootLayout() {
  // Only load the four weights the design actually uses.
  const [fontsLoaded, fontError] = useFonts({
    Manrope_500Medium,
    Manrope_700Bold,
    SourceSerif_600SemiBold: SourceSerif4_600SemiBold,
    SourceSerif_700Bold: SourceSerif4_700Bold,
  });
  const hydrated = useAppStore((s) => s.hydrated);
  const language = useAppStore((s) => s.language);
  const ready = (fontsLoaded || !!fontError) && hydrated;
  // Idempotent and cheap: number formatting must follow the language before
  // the first screen paints, not one effect later.
  if (ready) setUnitsLocale(localeFor(language));

  useEffect(() => {
    if (!ready) return;
    SplashScreen.hideAsync().catch(() => {});
    bootSync().catch(() => {});
    configurePurchases().catch(() => {});
    rescheduleAll().catch(() => {});
    // Keep the Home/Lock Screen widget in step with the due date & language.
    const pushWidget = () => {
      const s = useAppStore.getState();
      syncWidget(s.profile, s.language).catch(() => {});
    };
    pushWidget();
    const unsubWidget = useAppStore.subscribe((s, prev) => {
      if (s.language !== prev.language) setUnitsLocale(localeFor(s.language));
      if (s.profile !== prev.profile || s.language !== prev.language) pushWidget();
    });
    // Roll the notification window forward whenever the app comes back.
    const sub = AppState.addEventListener('change', (s) => {
      if (s === 'active') rescheduleAll().catch(() => {});
    });
    return () => {
      sub.remove();
      unsubWidget();
    };
  }, [ready]);

  if (!ready) return <View style={{ flex: 1, backgroundColor: colors.base }} />;

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.base }}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <AppLock>
          {Platform.OS !== 'web' ? <NotificationRouter /> : null}
          <RootStack />
        </AppLock>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

/** Opens the screen a tapped notification points at (data.url). */
function NotificationRouter() {
  const router = useRouter();
  const lastResponse = Notifications.useLastNotificationResponse();
  useEffect(() => {
    const url = lastResponse?.notification.request.content.data?.url;
    if (typeof url === 'string' && url.startsWith('/') && useAppStore.getState().onboarded) {
      const id = setTimeout(() => router.push(url as any), 250);
      return () => clearTimeout(id);
    }
  }, [lastResponse, router]);
  return null;
}

const modal = { presentation: 'modal' as const, animation: 'slide_from_bottom' as const };
const push = { animation: 'slide_from_right' as const };

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
      <Stack.Screen name="onboarding" options={{ animation: 'fade', gestureEnabled: false }} />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="profile" options={push} />
      <Stack.Screen name="settings" options={push} />
      <Stack.Screen name="tools" options={push} />
      <Stack.Screen name="appointments" options={push} />
      <Stack.Screen name="safety/[id]" options={push} />
      <Stack.Screen name="symptoms/index" options={push} />
      <Stack.Screen name="symptoms/[id]" options={push} />
      <Stack.Screen name="emergency" options={modal} />
      <Stack.Screen name="paywall" options={modal} />
      <Stack.Screen name="entry" options={modal} />
      <Stack.Screen name="bump" options={push} />
      <Stack.Screen name="pdf" options={modal} />
      <Stack.Screen name="partner" options={modal} />
      <Stack.Screen name="scan" options={modal} />
      <Stack.Screen name="verdict" options={modal} />
      <Stack.Screen name="ask" options={modal} />
      <Stack.Screen name="auth" options={modal} />
      <Stack.Screen name="auth-callback" />
    </Stack>
  );
}
