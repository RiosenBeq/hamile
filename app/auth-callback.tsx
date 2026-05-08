// Deep-link callback. Supabase appends ?code=... or a hash with the access
// token; we exchange it, then hydrate the store from server, then bounce home.

import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { hydrateFromServer } from '@/lib/auth';
import { getSupabase } from '@/lib/supabase';
import { bootSync } from '@/lib/sync';
import { MarigoldMark } from '@/components/MarigoldMark';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

export default function AuthCallback() {
  const router = useRouter();
  const params = useLocalSearchParams<{ code?: string; access_token?: string; refresh_token?: string }>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const sb = getSupabase();
      if (!sb) {
        setError('Backend not configured.');
        return;
      }

      // Two link styles: PKCE code (?code=...) or fragment tokens
      // (#access_token=...). expo-router only surfaces query params, so PKCE
      // is the supported flow on mobile.
      if (params.code) {
        const { error: exErr } = await sb.auth.exchangeCodeForSession(String(params.code));
        if (exErr) {
          setError(exErr.message);
          return;
        }
      } else if (params.access_token && params.refresh_token) {
        const { error: setErr } = await sb.auth.setSession({
          access_token: String(params.access_token),
          refresh_token: String(params.refresh_token),
        });
        if (setErr) {
          setError(setErr.message);
          return;
        }
      }

      try {
        await hydrateFromServer();
      } catch {}
      bootSync().catch(() => {});

      if (!cancelled) router.replace('/(tabs)');
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.base, alignItems: 'center', justifyContent: 'center', padding: 32 }}>
      <MarigoldMark size={120} />
      <Text style={{ marginTop: 28, fontFamily: fonts.display, fontSize: 22, color: colors.ink, letterSpacing: -0.2 }}>
        {error ? 'Something went wrong.' : 'Picking up where you left off…'}
      </Text>
      {error ? (
        <Text style={{ marginTop: 8, color: colors.coral, fontSize: 14, textAlign: 'center', fontFamily: fonts.body }}>
          {error}
        </Text>
      ) : (
        <ActivityIndicator color={colors.terracotta} style={{ marginTop: 18 }} />
      )}
    </View>
  );
}
