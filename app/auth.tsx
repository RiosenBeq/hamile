// Magic-link sign-in. The user types an email, taps "Send link", we hand
// off to Supabase to mail a single-use OTP. When they tap the link the
// `auth-callback` deep-link route exchanges the code, hydrates from server,
// and bounces them home.

import React, { useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, TextInput, View, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Btn } from '@/components/Btn';
import { Card } from '@/components/Card';
import { Icon } from '@/components/Icon';
import { Blob } from '@/components/Blob';
import { MarigoldMark } from '@/components/MarigoldMark';
import { SubScreenHeader } from '@/components/SubScreen';
import { sendMagicLink } from '@/lib/auth';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

export default function Auth() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [stage, setStage] = useState<'enter' | 'sending' | 'sent' | 'error'>('enter');
  const [errMsg, setErr] = useState<string | null>(null);

  const submit = async () => {
    if (!email.includes('@')) {
      setErr('Please enter a valid email.');
      setStage('error');
      return;
    }
    setStage('sending');
    setErr(null);
    const { error } = await sendMagicLink(email.trim());
    if (error) {
      setErr(error);
      setStage('error');
      return;
    }
    setStage('sent');
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.base }}>
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.5 }}>
        <Blob variant="lavender" />
      </View>

      <SubScreenHeader caption="Sign in" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 28, paddingBottom: insets.bottom + 32 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={{ alignItems: 'center', marginTop: 12 }}>
            <MarigoldMark size={120} />
          </View>

          <Text
            style={{
              fontFamily: fonts.display,
              fontSize: 30,
              lineHeight: 35,
              color: colors.ink,
              textAlign: 'center',
              marginTop: 18,
              letterSpacing: -0.4,
            }}
          >
            Save it forever.
          </Text>
          <Text
            style={{
              color: colors.mute,
              fontSize: 15,
              lineHeight: 22,
              marginTop: 8,
              textAlign: 'center',
              fontFamily: fonts.body,
            }}
          >
            Sign in to keep your journal across phones, share with your partner,
            and pick up exactly where you left off.
          </Text>

          {stage !== 'sent' && (
            <View style={{ marginTop: 28 }}>
              <Text style={{ fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase', color: colors.mute, fontFamily: fonts.bodyBold, marginBottom: 8 }}>
                Email
              </Text>
              <View
                style={{
                  height: 52,
                  paddingHorizontal: 14,
                  borderRadius: 14,
                  backgroundColor: colors.surface,
                  borderWidth: 1,
                  borderColor: stage === 'error' ? colors.coral : colors.line,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <Icon.user size={18} color={colors.mute} />
                <TextInput
                  value={email}
                  onChangeText={(t) => {
                    setEmail(t);
                    if (stage === 'error') setStage('enter');
                  }}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  placeholder="you@example.com"
                  placeholderTextColor={colors.mute}
                  style={{ flex: 1, fontSize: 15, color: colors.ink, fontFamily: fonts.body }}
                />
              </View>
              {errMsg ? (
                <Text style={{ marginTop: 8, color: colors.coral, fontSize: 13, fontFamily: fonts.body }}>
                  {errMsg}
                </Text>
              ) : null}

              <View style={{ marginTop: 20 }}>
                <Btn onPress={submit} disabled={stage === 'sending'}>
                  {stage === 'sending' ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    'Send sign-in link'
                  )}
                </Btn>
              </View>
            </View>
          )}

          {stage === 'sent' && (
            <Card style={{ marginTop: 28, padding: 22, alignItems: 'center' }}>
              <View
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  backgroundColor: 'rgba(123,155,126,0.18)',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon.check size={26} color={colors.sage} />
              </View>
              <Text
                style={{
                  marginTop: 14,
                  fontFamily: fonts.display,
                  fontSize: 22,
                  color: colors.ink,
                  textAlign: 'center',
                  letterSpacing: -0.2,
                }}
              >
                Check your email.
              </Text>
              <Text
                style={{
                  marginTop: 8,
                  color: colors.mute,
                  fontSize: 14,
                  textAlign: 'center',
                  lineHeight: 20,
                  fontFamily: fonts.body,
                }}
              >
                We sent a one-time sign-in link to{'\n'}
                <Text style={{ color: colors.ink, fontFamily: fonts.bodyBold }}>{email}</Text>.
                Tap it on this phone and we'll do the rest.
              </Text>
              <Pressable onPress={() => setStage('enter')} style={{ marginTop: 18 }}>
                <Text style={{ color: colors.terracotta, fontSize: 13, fontFamily: fonts.bodyBold }}>
                  Use a different email
                </Text>
              </Pressable>
            </Card>
          )}

          <View style={{ marginTop: 32 }}>
            <Card style={{ padding: 18 }}>
              <Text style={{ fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase', color: colors.mute, fontFamily: fonts.bodyBold }}>
                Why sign in
              </Text>
              <View style={{ marginTop: 12, gap: 10 }}>
                {[
                  'Your journal travels with you to a new phone',
                  'Encrypted in transit, locked to your device at rest',
                  'Partner sharing without exposing the medical journal',
                  'No password — magic link by email each time',
                ].map((b) => (
                  <View key={b} style={{ flexDirection: 'row', gap: 8, alignItems: 'flex-start' }}>
                    <Icon.check size={16} color={colors.sage} />
                    <Text style={{ flex: 1, fontSize: 14, color: colors.ink, fontFamily: fonts.body }}>{b}</Text>
                  </View>
                ))}
              </View>
            </Card>
          </View>

          <Pressable onPress={() => router.back()} style={{ marginTop: 24, alignItems: 'center' }}>
            <Text style={{ color: colors.mute, fontSize: 13, fontFamily: fonts.body }}>
              Stay offline for now
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
