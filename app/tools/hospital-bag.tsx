// Interactive hospital bag. Persists check state via the new `bag` zustand
// slice. Add custom rows; long-press a custom row to remove.

import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card, SectionHead } from '@/components/Card';
import { Icon } from '@/components/Icon';
import { Btn } from '@/components/Btn';
import { SubScreenHeader } from '@/components/SubScreen';
import { BAG_GROUP_LABEL, BagGroup } from '@/data/sample';
import { useAppStore } from '@/store/useAppStore';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

const ORDER: BagGroup[] = ['labour', 'postBirth', 'baby', 'docs'];

export default function HospitalBag() {
  const insets = useSafeAreaInsets();
  const bag = useAppStore((s) => s.bag);
  const toggleBagItem = useAppStore((s) => s.toggleBagItem);
  const addBagItem = useAppStore((s) => s.addBagItem);
  const removeBagItem = useAppStore((s) => s.removeBagItem);

  const [draftFor, setDraftFor] = useState<BagGroup | null>(null);
  const [draft, setDraft] = useState('');

  const grouped = useMemo(() => {
    const map = new Map<BagGroup, typeof bag>();
    for (const k of ORDER) map.set(k, []);
    for (const it of bag) (map.get(it.group) ?? []).push(it);
    return map;
  }, [bag]);

  const totalChecked = bag.filter((b) => b.checked).length;

  const submitDraft = () => {
    if (!draftFor || !draft.trim()) return;
    addBagItem(draftFor, draft.trim());
    setDraft('');
    setDraftFor(null);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.base }}>
      <SubScreenHeader caption="Hospital bag" />

      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: insets.bottom + 32 }}>
        <Text style={{ fontFamily: fonts.display, fontSize: 30, color: colors.ink, letterSpacing: -0.4, marginTop: 8 }}>
          Three little bags.
        </Text>
        <Text style={{ color: colors.mute, fontSize: 14, marginTop: 8, fontFamily: fonts.body, lineHeight: 20 }}>
          Easier than one giant one. Tick as you pack — your partner can see what's still missing.
        </Text>

        <Card style={{ marginTop: 18, padding: 18, backgroundColor: 'rgba(123,155,126,0.12)' }}>
          <Text style={{ fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase', color: colors.mute, fontFamily: fonts.bodyBold }}>
            Progress
          </Text>
          <Text style={{ fontFamily: fonts.display, fontSize: 30, color: colors.ink, marginTop: 4, letterSpacing: -0.4 }}>
            {totalChecked} of {bag.length} packed
          </Text>
        </Card>

        {ORDER.map((group) => {
          const items = grouped.get(group) ?? [];
          const groupChecked = items.filter((i) => i.checked).length;
          return (
            <View key={group} style={{ marginTop: 28 }}>
              <SectionHead
                caption={`${groupChecked}/${items.length}`}
                title={BAG_GROUP_LABEL[group]}
                right={
                  <Pressable
                    onPress={() => {
                      setDraftFor(group);
                      setDraft('');
                    }}
                    style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}
                  >
                    <Icon.plus size={16} color={colors.terracotta} />
                    <Text style={{ color: colors.terracotta, fontSize: 13, fontFamily: fonts.bodyBold }}>Add</Text>
                  </Pressable>
                }
              />
              <Card>
                {items.map((it, i) => (
                  <View key={it.id}>
                    <Pressable
                      onPress={() => toggleBagItem(it.id)}
                      onLongPress={() => {
                        if (!it.custom) return;
                        Alert.alert('Remove this item?', it.label, [
                          { text: 'Cancel', style: 'cancel' },
                          { text: 'Remove', style: 'destructive', onPress: () => removeBagItem(it.id) },
                        ]);
                      }}
                      style={{ padding: 14, flexDirection: 'row', alignItems: 'center', gap: 14 }}
                    >
                      <View
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: 12,
                          borderWidth: 1.5,
                          borderColor: it.checked ? colors.sage : colors.line,
                          backgroundColor: it.checked ? colors.sage : 'transparent',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {it.checked ? <Icon.check size={16} color="#fff" /> : null}
                      </View>
                      <Text
                        style={{
                          flex: 1,
                          fontSize: 15,
                          color: it.checked ? colors.mute : colors.ink,
                          fontFamily: fonts.body,
                          textDecorationLine: it.checked ? 'line-through' : 'none',
                        }}
                      >
                        {it.label}
                      </Text>
                    </Pressable>
                    {i < items.length - 1 ? (
                      <View style={{ height: 1, backgroundColor: colors.line, marginLeft: 50 }} />
                    ) : null}
                  </View>
                ))}

                {draftFor === group ? (
                  <View
                    style={{
                      padding: 14,
                      borderTopWidth: 1,
                      borderTopColor: colors.line,
                      flexDirection: 'row',
                      gap: 10,
                      alignItems: 'center',
                    }}
                  >
                    <TextInput
                      value={draft}
                      autoFocus
                      onChangeText={setDraft}
                      onSubmitEditing={submitDraft}
                      placeholder="Add an item"
                      placeholderTextColor={colors.mute}
                      returnKeyType="done"
                      style={{
                        flex: 1,
                        height: 40,
                        paddingHorizontal: 12,
                        backgroundColor: colors.base,
                        borderRadius: 12,
                        borderWidth: 1,
                        borderColor: colors.line,
                        fontSize: 14,
                        color: colors.ink,
                        fontFamily: fonts.body,
                      }}
                    />
                    <Btn kind="ghost" onPress={submitDraft} style={{ height: 40, paddingHorizontal: 14 }}>
                      <Text style={{ color: colors.terracotta, fontFamily: fonts.bodyBold, fontSize: 14 }}>Add</Text>
                    </Btn>
                  </View>
                ) : null}
              </Card>
            </View>
          );
        })}

        <Text style={{ marginTop: 18, fontSize: 12, color: colors.mute, fontFamily: fonts.body, textAlign: 'center' }}>
          Long-press a custom row to remove it.
        </Text>
      </ScrollView>
    </View>
  );
}
