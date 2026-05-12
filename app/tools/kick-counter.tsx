// Kick counter. Tap-to-count fetal movements. The standard prenatal advice
// is "10 movements in 2 hours" — we wrap each session in that contract.
// Once you reach 10, we celebrate and end the session.

import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { Btn } from '@/components/Btn';
import { Card, SectionHead } from '@/components/Card';
import { CountUp } from '@/components/CountUp';
import { Icon } from '@/components/Icon';
import { PrimaryButton } from '@/components/PrimaryButton';
import { SubScreenHeader } from '@/components/SubScreen';
import { useAppStore } from '@/store/useAppStore';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

const TARGET = 10;

function fmtElapsed(ms: number) {
  const t = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(t / 3600);
  const m = Math.floor((t % 3600) / 60);
  const s = t % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export default function KickCounter() {
  const insets = useSafeAreaInsets();
  const kicks = useAppStore((s) => s.kicks);
  const addKick = useAppStore((s) => s.addKick);

  const [sessionId, setSessionId] = useState<string | null>(null);
  const [now, setNow] = useState(Date.now());

  // Tick every second while there's an active session
  useEffect(() => {
    if (!sessionId) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [sessionId]);

  const sessionKicks = useMemo(
    () => (sessionId ? kicks.filter((k) => k.sessionId === sessionId).sort((a, b) => a.at - b.at) : []),
    [kicks, sessionId],
  );
  const startedAt = sessionKicks[0]?.at;
  const reached = sessionKicks.length >= TARGET;

  // Today's totals
  const today = useMemo(() => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    return kicks.filter((k) => k.at >= start.getTime());
  }, [kicks]);

  // Past sessions, grouped
  const recent = useMemo(() => {
    const groups = new Map<string, typeof kicks>();
    for (const k of kicks) {
      (groups.get(k.sessionId) ?? groups.set(k.sessionId, []).get(k.sessionId)!).push(k);
    }
    const list = Array.from(groups.entries()).map(([id, items]) => {
      const sorted = [...items].sort((a, b) => a.at - b.at);
      return {
        id,
        count: items.length,
        startedAt: sorted[0].at,
        endedAt: sorted[sorted.length - 1].at,
      };
    });
    return list.sort((a, b) => b.startedAt - a.startedAt).slice(0, 5);
  }, [kicks]);

  const startSession = () => {
    setSessionId(`s-${Date.now()}`);
    setNow(Date.now());
  };

  const onCount = () => {
    if (!sessionId) startSession();
    addKick(sessionId ?? `s-${Date.now()}`);
    if (sessionKicks.length + 1 >= TARGET) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    }
  };

  const endSession = () => {
    setSessionId(null);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.base }}>
      <SubScreenHeader caption="Kick counter" />

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: insets.bottom + 32 }}
      >
        <Text style={{ fontFamily: fonts.display, fontSize: 30, color: colors.ink, letterSpacing: -0.4, marginTop: 8 }}>
          Have you felt baby today?
        </Text>
        <Text style={{ color: colors.mute, fontSize: 14, marginTop: 8, fontFamily: fonts.body, lineHeight: 20 }}>
          The NHS rule of thumb is 10 distinct movements in two hours. Tap when you feel one.
          We'll quietly time the session.
        </Text>

        <View style={{ alignItems: 'center', marginTop: 36 }}>
          <PrimaryButton
            label={String(sessionKicks.length || 0)}
            sublabel={reached ? 'You hit 10 — well done' : sessionId ? 'Tap when you feel one' : 'Tap to start counting'}
            size={220}
            onPress={onCount}
          />
        </View>

        {sessionId ? (
          <View style={{ marginTop: 28, alignItems: 'center' }}>
            <Text style={{ fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase', color: colors.mute, fontFamily: fonts.bodyBold }}>
              Session
            </Text>
            <Text style={{ fontFamily: fonts.display, fontSize: 24, color: colors.ink, marginTop: 4 }}>
              {fmtElapsed(now - (startedAt ?? now))}
            </Text>
            <View style={{ marginTop: 14 }}>
              <Btn kind="secondary" onPress={endSession}>
                {reached ? 'Save & finish' : 'End session'}
              </Btn>
            </View>
          </View>
        ) : null}

        <Card style={{ marginTop: 28, padding: 18 }}>
          <Text style={{ fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase', color: colors.mute, fontFamily: fonts.bodyBold }}>
            Today
          </Text>
          <Text style={{ fontFamily: fonts.display, fontSize: 32, color: colors.ink, marginTop: 4, letterSpacing: -0.4 }}>
            <CountUp to={today.length} style={{ fontFamily: fonts.display, fontSize: 32, color: colors.ink }} /> movements
          </Text>
          <Text style={{ marginTop: 6, color: colors.mute, fontSize: 13.5, lineHeight: 20, fontFamily: fonts.body }}>
            If you notice fewer than usual or movement that feels different, ring your midwife —
            they'd much rather hear from you than have you wonder.
          </Text>
        </Card>

        {recent.length > 0 ? (
          <View style={{ marginTop: 28 }}>
            <SectionHead caption="History" title="Recent sessions" />
            <Card>
              {recent.map((r, i) => (
                <View key={r.id}>
                  <View style={{ padding: 16, flexDirection: 'row', alignItems: 'center', gap: 14 }}>
                    <View
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 18,
                        backgroundColor: r.count >= TARGET ? 'rgba(123,155,126,0.18)' : colors.sand,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {r.count >= TARGET ? (
                        <Icon.check size={18} color={colors.sage} />
                      ) : (
                        <Text style={{ fontSize: 12, color: colors.mute, fontFamily: fonts.bodyBold }}>{r.count}</Text>
                      )}
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 14.5, color: colors.ink, fontFamily: fonts.bodyBold }}>
                        {r.count} movement{r.count === 1 ? '' : 's'}
                      </Text>
                      <Text style={{ fontSize: 12.5, color: colors.mute, marginTop: 2, fontFamily: fonts.body }}>
                        {new Date(r.startedAt).toLocaleString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}{' '}
                        · {fmtElapsed(r.endedAt - r.startedAt)}
                      </Text>
                    </View>
                  </View>
                  {i < recent.length - 1 ? <View style={{ height: 1, backgroundColor: colors.line, marginLeft: 16 }} /> : null}
                </View>
              ))}
            </Card>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}
