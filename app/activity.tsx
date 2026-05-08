// Activity check — trimester-aware list with quick search.

import React, { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card } from '@/components/Card';
import { Icon } from '@/components/Icon';
import { VerdictDot } from '@/components/Verdict';
import { ACTIVITY_LIST } from '@/data/sample';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

export default function Activity() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [q, setQ] = useState('');

  const filtered = ACTIVITY_LIST.filter(([nm]) => nm.toLowerCase().includes(q.toLowerCase()));

  return (
    <View style={{ flex: 1, backgroundColor: colors.base }}>
      <View
        style={{
          paddingTop: insets.top + 8,
          paddingHorizontal: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Pressable
          onPress={() => router.back()}
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            borderWidth: 1,
            borderColor: colors.line,
            backgroundColor: colors.surface,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon.back size={18} color={colors.ink} />
        </Pressable>
        <Text style={{ fontSize: 12, letterSpacing: 1.6, textTransform: 'uppercase', color: colors.mute, fontFamily: fonts.bodyBold }}>
          Activity
        </Text>
        <View style={{ width: 36 }} />
      </View>

      <View style={{ paddingHorizontal: 24, paddingTop: 8 }}>
        <Text style={{ fontFamily: fonts.display, fontSize: 30, color: colors.ink, letterSpacing: -0.4 }}>
          What can I do?
        </Text>
        <Text style={{ color: colors.mute, fontSize: 14, marginTop: 8, fontFamily: fonts.body }}>
          Trimester-aware. Tap any line for the why.
        </Text>
      </View>

      <View style={{ paddingHorizontal: 24, marginTop: 18 }}>
        <View
          style={{
            height: 44,
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
          <Icon.search size={16} color={colors.mute} />
          <TextInput
            value={q}
            onChangeText={setQ}
            placeholder="Search activities"
            placeholderTextColor={colors.mute}
            style={{ flex: 1, fontSize: 14, color: colors.ink, fontFamily: fonts.body }}
          />
          <Pressable>
            <Icon.filter size={16} color={colors.mute} />
          </Pressable>
        </View>
      </View>

      <ScrollView style={{ marginTop: 18 }} contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: insets.bottom + 40 }}>
        <Card>
          {filtered.map(([nm, v, why], i) => (
            <View key={nm}>
              <Pressable
                onPress={() => router.replace({ pathname: '/verdict', params: { item: nm, mode: 'Activity' } })}
                style={{ padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12 }}
              >
                <VerdictDot kind={v} />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 15, color: colors.ink, fontFamily: fonts.body }}>{nm}</Text>
                  <Text style={{ fontSize: 12.5, color: colors.mute, marginTop: 2, fontFamily: fonts.body }} numberOfLines={1}>
                    {why}
                  </Text>
                </View>
                <Icon.chevR size={18} color={colors.mute} />
              </Pressable>
              {i < filtered.length - 1 ? (
                <View style={{ height: 1, backgroundColor: colors.line, marginLeft: 16 }} />
              ) : null}
            </View>
          ))}
        </Card>
      </ScrollView>
    </View>
  );
}
