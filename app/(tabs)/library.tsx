// Library — search field with rotating placeholder, recent chips, browse-by-
// category grid, and the "Asked this week" trending list.

import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Card, SectionHead } from '@/components/Card';
import { Icon } from '@/components/Icon';
import { Illo } from '@/components/Blob';
import { VerdictDot } from '@/components/Verdict';
import { CATEGORIES, TRENDING } from '@/data/sample';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

const PLACEHOLDERS = ['Sushi?', 'Paracetamol?', 'Hot yoga?', 'Hair dye?'];

export default function Library() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const [ph, setPh] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setPh((p) => (p + 1) % PLACEHOLDERS.length), 2200);
    return () => clearInterval(id);
  }, []);

  const submit = () => {
    if (!query.trim()) return;
    router.push({ pathname: '/verdict', params: { item: query.trim(), mode: 'Food' } });
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingTop: insets.top + 8, paddingBottom: 200 }}
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: colors.base }}
    >
      <View style={{ paddingHorizontal: 24 }}>
        <Text style={{ fontSize: 11, letterSpacing: 1.8, textTransform: 'uppercase', color: colors.mute, fontFamily: fonts.bodyBold }}>Library</Text>
        <Text style={{ marginTop: 4, fontFamily: fonts.display, fontSize: 30, color: colors.ink, letterSpacing: -0.4 }}>
          Look up anything.
        </Text>
      </View>

      {/* Search */}
      <View style={{ paddingHorizontal: 24, marginTop: 18 }}>
        <View
          style={{
            height: 48,
            paddingHorizontal: 14,
            borderRadius: 14,
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.line,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <Icon.search size={18} color={colors.mute} />
          <View style={{ flex: 1, height: '100%', justifyContent: 'center' }}>
            <TextInput
              value={query}
              onChangeText={setQuery}
              onSubmitEditing={submit}
              returnKeyType="search"
              placeholderTextColor="transparent"
              style={{ fontSize: 15, color: colors.ink, fontFamily: fonts.body, height: '100%' }}
            />
            {query.length === 0 ? (
              <View pointerEvents="none" style={{ position: 'absolute', left: 0, right: 0 }}>
                <Animated.View key={ph} entering={FadeIn.duration(200)} exiting={FadeOut.duration(200)}>
                  <Text style={{ color: colors.mute, fontSize: 15, fontFamily: fonts.body }}>{PLACEHOLDERS[ph]}</Text>
                </Animated.View>
              </View>
            ) : null}
          </View>
          <Pressable>
            <Icon.mic size={18} color={colors.mute} />
          </Pressable>
        </View>
      </View>

      {/* Recent chips */}
      <View style={{ paddingHorizontal: 24, marginTop: 28 }}>
        <Text style={{ fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase', color: colors.mute, fontFamily: fonts.bodyBold, marginBottom: 12 }}>
          Recent
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {['Brie', 'Ibuprofen', 'Sauna', 'Smoked salmon', 'Decaf coffee'].map((r) => (
            <Pressable
              key={r}
              onPress={() => router.push({ pathname: '/verdict', params: { item: r, mode: 'Food' } })}
              style={{
                paddingHorizontal: 14,
                height: 36,
                borderRadius: 18,
                backgroundColor: colors.surface,
                borderWidth: 1,
                borderColor: colors.line,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ color: colors.ink, fontSize: 13, fontFamily: fonts.body }}>{r}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Browse */}
      <View style={{ paddingHorizontal: 24, marginTop: 28 }}>
        <SectionHead caption="Browse" title="By category" />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          {CATEGORIES.map((c) => (
            <Pressable
              key={c.k}
              onPress={() => router.push('/activity')}
              style={{
                width: '31%',
                backgroundColor: colors.surface,
                borderRadius: 20,
                padding: 14,
                shadowColor: colors.ink,
                shadowOpacity: 0.08,
                shadowRadius: 16,
                shadowOffset: { width: 0, height: 4 },
              }}
            >
              <Illo label={c.label} hue={c.hue} size={48} />
              <Text style={{ marginTop: 10, fontSize: 14, color: colors.ink, fontFamily: fonts.bodyBold }}>{c.label}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Trending */}
      <View style={{ paddingHorizontal: 24, marginTop: 28 }}>
        <SectionHead caption="Trending" title="Asked this week" />
        <Card>
          {TRENDING.map((t, i) => (
            <View key={t.name}>
              <Pressable
                onPress={() => router.push({ pathname: '/verdict', params: { item: t.name, mode: 'Food' } })}
                style={{ padding: 16, flexDirection: 'row', alignItems: 'center', gap: 16 }}
              >
                <VerdictDot kind={t.verdict} />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 15, color: colors.ink, fontFamily: fonts.body }}>{t.name}</Text>
                  <Text style={{ fontSize: 12, color: colors.mute, marginTop: 2, fontFamily: fonts.body }}>{t.count}</Text>
                </View>
                <Icon.chevR size={18} color={colors.mute} />
              </Pressable>
              {i < TRENDING.length - 1 ? (
                <View style={{ height: 1, backgroundColor: colors.line, marginLeft: 16 }} />
              ) : null}
            </View>
          ))}
        </Card>
      </View>
    </ScrollView>
  );
}
