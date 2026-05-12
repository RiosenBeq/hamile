// Contraction timer. Big start/stop button. While a contraction is in
// progress, we show its live duration; between contractions we show the
// time since the previous one ended (the "interval"). Pattern detection
// (regular vs. variable, mean duration / interval) summarised in the
// recent log so the user can read off whether their contractions are
// "5-1-1" (every 5 minutes, lasting 1 minute, for 1 hour — go to hospital).

import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card, SectionHead } from '@/components/Card';
import { PrimaryButton } from '@/components/PrimaryButton';
import { SubScreenHeader } from '@/components/SubScreen';
import { useAppStore, type Contraction } from '@/store/useAppStore';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

function fmt(ms: number) {
  const t = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(t / 60);
  const s = t % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export default function Contractions() {
  const insets = useSafeAreaInsets();
  const contractions = useAppStore((s) => s.contractions);
  const addContraction = useAppStore((s) => s.addContraction);

  const [activeStart, setActiveStart] = useState<number | null>(null);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(id);
  }, []);

  const last24 = useMemo(() => {
    const cutoff = Date.now() - 24 * 3600 * 1000;
    return [...contractions].filter((c) => c.startedAt >= cutoff).sort((a, b) => b.startedAt - a.startedAt);
  }, [contractions]);

  const lastEnded = last24[0]?.endedAt;
  const intervalMs = activeStart != null
    ? null
    : lastEnded
      ? now - lastEnded
      : null;
  const liveMs = activeStart ? now - activeStart : 0;

  const meanDuration = useMemo(() => {
    if (last24.length === 0) return 0;
    const sum = last24.reduce((a, c) => a + (c.endedAt - c.startedAt), 0);
    return Math.round(sum / last24.length);
  }, [last24]);
  const meanInterval = useMemo(() => {
    if (last24.length < 2) return 0;
    const gaps: number[] = [];
    for (let i = 0; i < last24.length - 1; i++) {
      gaps.push(last24[i].startedAt - last24[i + 1].endedAt);
    }
    return Math.round(gaps.reduce((a, b) => a + b, 0) / gaps.length);
  }, [last24]);

  const onStartStop = () => {
    if (activeStart) {
      const c: Contraction = {
        id: `c-${Date.now()}`,
        startedAt: activeStart,
        endedAt: Date.now(),
      };
      addContraction(c);
      setActiveStart(null);
    } else {
      setActiveStart(Date.now());
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.base }}>
      <SubScreenHeader caption="Contractions" />

      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: insets.bottom + 32 }}>
        <Text style={{ fontFamily: fonts.display, fontSize: 30, color: colors.ink, letterSpacing: -0.4, marginTop: 8 }}>
          Time them.
        </Text>
        <Text style={{ color: colors.mute, fontSize: 14, marginTop: 8, fontFamily: fonts.body, lineHeight: 20 }}>
          Press start when one begins. Stop when it eases. We'll watch the pattern for you.
        </Text>

        <View style={{ alignItems: 'center', marginTop: 36 }}>
          <PrimaryButton
            label={activeStart ? fmt(liveMs) : 'Start'}
            sublabel={activeStart ? 'Tap when it eases' : intervalMs ? `Last ended ${fmt(intervalMs)} ago` : 'Press when it begins'}
            bg={activeStart ? colors.coral : colors.terracotta}
            size={220}
            onPress={onStartStop}
          />
        </View>

        <View style={{ marginTop: 28, flexDirection: 'row', gap: 12 }}>
          <Card style={{ flex: 1, padding: 16, alignItems: 'center' }}>
            <Text style={{ fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase', color: colors.mute, fontFamily: fonts.bodyBold }}>
              Avg duration
            </Text>
            <Text style={{ fontFamily: fonts.display, fontSize: 22, color: colors.ink, marginTop: 4 }}>
              {meanDuration ? fmt(meanDuration) : '—'}
            </Text>
          </Card>
          <Card style={{ flex: 1, padding: 16, alignItems: 'center' }}>
            <Text style={{ fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase', color: colors.mute, fontFamily: fonts.bodyBold }}>
              Avg interval
            </Text>
            <Text style={{ fontFamily: fonts.display, fontSize: 22, color: colors.ink, marginTop: 4 }}>
              {meanInterval ? fmt(meanInterval) : '—'}
            </Text>
          </Card>
          <Card style={{ flex: 1, padding: 16, alignItems: 'center' }}>
            <Text style={{ fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase', color: colors.mute, fontFamily: fonts.bodyBold }}>
              In 24h
            </Text>
            <Text style={{ fontFamily: fonts.display, fontSize: 22, color: colors.ink, marginTop: 4 }}>
              {last24.length}
            </Text>
          </Card>
        </View>

        <Card style={{ marginTop: 24, padding: 18, backgroundColor: 'rgba(181,168,201,0.16)' }}>
          <Text style={{ fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase', color: colors.mute, fontFamily: fonts.bodyBold }}>
            Rule of thumb · 5-1-1
          </Text>
          <Text style={{ marginTop: 6, color: colors.ink, fontSize: 14.5, lineHeight: 21, fontFamily: fonts.body }}>
            Once contractions are 5 minutes apart, lasting 1 minute, for 1 hour — call your maternity unit
            and head in. Earlier than that, walk, hydrate, rest.
          </Text>
        </Card>

        {last24.length > 0 ? (
          <View style={{ marginTop: 28 }}>
            <SectionHead caption="Recent" title="Last contractions" />
            <Card>
              {last24.slice(0, 12).map((c, i) => (
                <View key={c.id}>
                  <View style={{ padding: 16, flexDirection: 'row', alignItems: 'center', gap: 14 }}>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 14.5, color: colors.ink, fontFamily: fonts.bodyBold }}>
                        {fmt(c.endedAt - c.startedAt)}
                      </Text>
                      <Text style={{ fontSize: 12.5, color: colors.mute, marginTop: 2, fontFamily: fonts.body }}>
                        {new Date(c.startedAt).toLocaleTimeString('en-GB', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                        {i < last24.length - 1
                          ? ` · ${fmt(c.startedAt - last24[i + 1].endedAt)} after previous`
                          : ''}
                      </Text>
                    </View>
                  </View>
                  {i < last24.length - 1 ? <View style={{ height: 1, backgroundColor: colors.line, marginLeft: 16 }} /> : null}
                </View>
              ))}
            </Card>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}
