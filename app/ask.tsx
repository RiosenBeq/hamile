// Ask Marigold — conversational AI surface. Tap a suggested prompt or type
// your own question. Replies stream in from Claude via src/lib/chat.ts, with
// a calm canned fallback when no key/edge function is wired up.

import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { Icon } from '@/components/Icon';
import { MarigoldMark } from '@/components/MarigoldMark';
import { useAppStore, ChatMessage } from '@/store/useAppStore';
import { askMarigold, ChatTurn, SUGGESTED_QUESTIONS } from '@/lib/chat';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

const makeId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

export default function Ask() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const profile = useAppStore((s) => s.profile);
  const chat = useAppStore((s) => s.chat);
  const appendChat = useAppStore((s) => s.appendChat);
  const clearChat = useAppStore((s) => s.clearChat);

  const [draft, setDraft] = useState('');
  const [pending, setPending] = useState(false);
  const scrollRef = useRef<ScrollView | null>(null);

  useEffect(() => {
    const id = setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 60);
    return () => clearTimeout(id);
  }, [chat.length, pending]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || pending) return;
    Haptics.selectionAsync().catch(() => {});
    setDraft('');
    const userMsg: ChatMessage = {
      id: makeId(),
      role: 'user',
      content: trimmed,
      ts: Date.now(),
    };
    appendChat(userMsg);
    setPending(true);
    const history: ChatTurn[] = [...chat, userMsg].map((m) => ({
      role: m.role,
      content: m.content,
    }));
    const reply = await askMarigold(history, {
      week: profile.week,
      country: profile.country,
      stage: profile.stage,
      conditions: profile.conditions,
    });
    appendChat({
      id: makeId(),
      role: 'assistant',
      content: reply,
      ts: Date.now(),
    });
    setPending(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.base }}>
      {/* Header */}
      <View
        style={{
          paddingTop: insets.top + 8,
          paddingBottom: 12,
          paddingHorizontal: 16,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          borderBottomWidth: 1,
          borderBottomColor: colors.line,
          backgroundColor: colors.surface,
        }}
      >
        <Pressable
          onPress={() => router.back()}
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon.back size={20} color={colors.ink} />
        </Pressable>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <MarigoldMark size={32} />
          <View>
            <Text
              style={{
                fontSize: 11,
                letterSpacing: 1.6,
                textTransform: 'uppercase',
                color: colors.mute,
                fontFamily: fonts.bodyBold,
              }}
            >
              Ask
            </Text>
            <Text
              style={{
                fontFamily: fonts.display,
                fontSize: 18,
                color: colors.ink,
                letterSpacing: -0.2,
              }}
            >
              Marigold
            </Text>
          </View>
        </View>
        {chat.length > 0 ? (
          <Pressable
            onPress={() => {
              Haptics.selectionAsync().catch(() => {});
              clearChat();
            }}
            style={{
              paddingHorizontal: 12,
              height: 32,
              borderRadius: 16,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: colors.line,
            }}
          >
            <Text style={{ color: colors.mute, fontSize: 12, fontFamily: fonts.bodyBold }}>
              Clear
            </Text>
          </Pressable>
        ) : null}
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <ScrollView
          ref={scrollRef}
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 16, paddingBottom: 24, gap: 12 }}
          keyboardShouldPersistTaps="handled"
        >
          {chat.length === 0 ? (
            <View style={{ paddingVertical: 8, gap: 14 }}>
              <Text
                style={{
                  fontFamily: fonts.display,
                  fontSize: 24,
                  lineHeight: 30,
                  color: colors.ink,
                  letterSpacing: -0.3,
                }}
              >
                Anything on your mind?
              </Text>
              <Text
                style={{
                  color: colors.mute,
                  fontSize: 14,
                  lineHeight: 20,
                  fontFamily: fonts.body,
                }}
              >
                Food, medications, activity, symptoms, feelings — I'll answer in plain English,
                grounded in NHS, ACOG and LactMed.
              </Text>
              <View style={{ gap: 8, marginTop: 6 }}>
                {SUGGESTED_QUESTIONS.map((q) => (
                  <Pressable
                    key={q}
                    onPress={() => send(q)}
                    style={({ pressed }) => ({
                      padding: 14,
                      borderRadius: 14,
                      backgroundColor: colors.surface,
                      borderWidth: 1,
                      borderColor: colors.line,
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                      opacity: pressed ? 0.7 : 1,
                    })}
                  >
                    <Icon.spark size={16} color={colors.terracotta} />
                    <Text
                      style={{
                        flex: 1,
                        color: colors.ink,
                        fontSize: 14,
                        fontFamily: fonts.body,
                      }}
                    >
                      {q}
                    </Text>
                    <Icon.arrow size={14} color={colors.mute} />
                  </Pressable>
                ))}
              </View>
              <Text
                style={{
                  color: colors.mute,
                  fontSize: 12,
                  fontFamily: fonts.body,
                  marginTop: 8,
                  lineHeight: 18,
                }}
              >
                Marigold is helpful, not a substitute for medical advice. For anything urgent,
                contact your midwife or doctor.
              </Text>
            </View>
          ) : (
            chat.map((m) => <Bubble key={m.id} msg={m} />)
          )}
          {pending ? <TypingBubble /> : null}
        </ScrollView>

        {/* Composer */}
        <View
          style={{
            paddingHorizontal: 12,
            paddingTop: 8,
            paddingBottom: Math.max(insets.bottom, 12),
            borderTopWidth: 1,
            borderTopColor: colors.line,
            backgroundColor: colors.surface,
            flexDirection: 'row',
            alignItems: 'flex-end',
            gap: 8,
          }}
        >
          <View
            style={{
              flex: 1,
              borderRadius: 22,
              backgroundColor: colors.sand,
              minHeight: 44,
              maxHeight: 120,
              paddingHorizontal: 16,
              paddingVertical: Platform.OS === 'ios' ? 12 : 6,
              justifyContent: 'center',
            }}
          >
            <TextInput
              value={draft}
              onChangeText={setDraft}
              placeholder="Ask anything…"
              placeholderTextColor={colors.mute}
              multiline
              style={{
                color: colors.ink,
                fontSize: 15,
                fontFamily: fonts.body,
                lineHeight: 20,
                maxHeight: 100,
              }}
              onSubmitEditing={() => send(draft)}
              blurOnSubmit
              returnKeyType="send"
            />
          </View>
          <Pressable
            onPress={() => send(draft)}
            disabled={!draft.trim() || pending}
            style={({ pressed }) => ({
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: draft.trim() && !pending ? colors.terracotta : colors.line,
              alignItems: 'center',
              justifyContent: 'center',
              transform: [{ scale: pressed ? 0.94 : 1 }],
            })}
          >
            <Icon.arrow size={18} color="#fff" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

function Bubble({ msg }: { msg: ChatMessage }) {
  const isUser = msg.role === 'user';
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
      }}
    >
      <View
        style={{
          maxWidth: '85%',
          paddingHorizontal: 14,
          paddingVertical: 10,
          borderRadius: 18,
          backgroundColor: isUser ? colors.terracotta : colors.surface,
          borderWidth: isUser ? 0 : 1,
          borderColor: colors.line,
          borderBottomRightRadius: isUser ? 4 : 18,
          borderBottomLeftRadius: isUser ? 18 : 4,
        }}
      >
        <Text
          style={{
            color: isUser ? '#fff' : colors.ink,
            fontSize: 15,
            lineHeight: 22,
            fontFamily: fonts.body,
          }}
        >
          {msg.content}
        </Text>
      </View>
    </View>
  );
}

function TypingBubble() {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderRadius: 18,
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.line,
          borderBottomLeftRadius: 4,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <ActivityIndicator size="small" color={colors.terracotta} />
        <Text style={{ color: colors.mute, fontSize: 13, fontFamily: fonts.body }}>
          Marigold is thinking…
        </Text>
      </View>
    </View>
  );
}
