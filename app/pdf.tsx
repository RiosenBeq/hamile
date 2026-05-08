// Doctor summary — preview the printable PDF, then export via expo-print +
// expo-sharing.

import React, { useMemo } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { Icon } from '@/components/Icon';
import { useAppStore } from '@/store/useAppStore';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

export default function Pdf() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const profile = useAppStore((s) => s.profile);
  const journal = useAppStore((s) => s.journal);

  const html = useMemo(() => buildHtml(profile.name, profile.week, journal), [profile, journal]);

  const exportPdf = async () => {
    try {
      const { uri } = await Print.printToFileAsync({ html });
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, { UTI: 'com.adobe.pdf', mimeType: 'application/pdf' });
      }
    } catch {}
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#2A2522' }}>
      <View
        style={{
          paddingTop: insets.top + 8,
          paddingHorizontal: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Pressable
          onPress={() => router.back()}
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: 'rgba(255,255,255,0.12)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon.back size={18} color="#fff" />
        </Pressable>
        <Text style={{ fontSize: 12, letterSpacing: 1.6, textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', fontFamily: fonts.bodyBold }}>
          Doctor summary
        </Text>
        <Pressable
          onPress={exportPdf}
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: 'rgba(255,255,255,0.12)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon.share size={18} color="#fff" />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: insets.bottom + 32 }}>
        <View
          style={{
            backgroundColor: colors.base,
            borderRadius: 6,
            padding: 28,
            shadowColor: '#000',
            shadowOpacity: 0.4,
            shadowRadius: 30,
            shadowOffset: { width: 0, height: 12 },
          }}
        >
          {/* Page header */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: colors.line, paddingBottom: 14 }}>
            <View>
              <Text style={{ fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: colors.mute, fontFamily: fonts.bodyBold }}>Marigold</Text>
              <Text style={{ fontFamily: fonts.display, fontSize: 18, color: colors.ink, marginTop: 2 }}>Pregnancy summary</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ fontSize: 8.5, color: colors.mute, lineHeight: 12, fontFamily: fonts.body }}>
                Prepared {new Date().toLocaleDateString('en-GB')}
                {'\n'}For Dr. P. Smith{'\n'}Patient: {profile.name} Doe · Week {profile.week}
              </Text>
            </View>
          </View>

          <PdfBlock title="Concerns logged">
            {[
              'Occasional pelvic twinges, left side, evenings',
              'One episode of light-headedness on day 87',
              'Mild heartburn after large meals',
            ].map((c) => (
              <Text key={c} style={pdfStyles.li}>· {c}</Text>
            ))}
          </PdfBlock>

          <PdfBlock title="Foods consumed (notable)">
            {journal.slice(0, 4).map((j) => (
              <View key={j.id} style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: 'rgba(237,228,216,0.7)', paddingVertical: 6 }}>
                <Text style={[pdfStyles.cell, { flex: 2 }]}>{j.name}</Text>
                <Text style={[pdfStyles.cell, { color: colors.mute, flex: 1 }]}>Wk {j.week}</Text>
                <Text style={[pdfStyles.cell, { textAlign: 'right' }]}>
                  {j.verdict === 'safe' ? '✓' : j.verdict === 'caution' ? '!' : '✕'}
                </Text>
              </View>
            ))}
          </PdfBlock>

          <PdfBlock title="Medications questioned">
            <Text style={pdfStyles.li}>· Paracetamol 500mg — used 4 times for headaches</Text>
            <Text style={pdfStyles.li}>· Avoided ibuprofen on app guidance</Text>
          </PdfBlock>

          <PdfBlock title="Symptoms tracked">
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
              {['Nausea', 'Fatigue', 'Sleep', 'Mood', 'Movements', 'Cramps'].map((s) => (
                <View
                  key={s}
                  style={{
                    width: '31%',
                    borderWidth: 1,
                    borderColor: colors.line,
                    borderRadius: 6,
                    paddingHorizontal: 8,
                    paddingVertical: 6,
                  }}
                >
                  <Text style={{ fontSize: 9, color: colors.mute, fontFamily: fonts.body }}>{s}</Text>
                  <Text style={{ fontSize: 11, color: colors.ink, fontFamily: fonts.bodyBold, marginTop: 2 }}>
                    {Math.floor(Math.random() * 4) + 1}/5 avg
                  </Text>
                </View>
              ))}
            </View>
          </PdfBlock>

          <PdfBlock title="Questions for today">
            {[
              'Should I continue iron + folate, or move to a combined?',
              'Glucose test — when, and how should I prepare?',
              'Is the left-side twinge round ligament, or worth scanning?',
            ].map((q, i) => (
              <Text key={q} style={pdfStyles.li}>{i + 1}. {q}</Text>
            ))}
          </PdfBlock>

          <Text style={{ marginTop: 18, textAlign: 'center', fontSize: 8, color: colors.mute, fontFamily: fonts.body }}>
            Page 1 of 3 · Marigold v1.0 · NHS / ACOG references attached
          </Text>
        </View>
      </ScrollView>

      <View style={{ paddingHorizontal: 24, paddingBottom: insets.bottom + 12, paddingTop: 8, flexDirection: 'row', gap: 8 }}>
        {[
          { label: 'AirDrop', I: Icon.share },
          { label: 'Email', I: Icon.share },
          { label: 'Print', I: Icon.download },
        ].map(({ label, I }) => (
          <Pressable
            key={label}
            onPress={exportPdf}
            style={{
              flex: 1,
              height: 48,
              borderRadius: 14,
              backgroundColor: 'rgba(255,255,255,0.12)',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            <I size={16} color="#fff" />
            <Text style={{ color: '#fff', fontSize: 13.5, fontFamily: fonts.bodyBold }}>{label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

function PdfBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={{ marginTop: 18 }}>
      <Text
        style={{
          fontSize: 9,
          letterSpacing: 1.6,
          textTransform: 'uppercase',
          color: colors.mute,
          fontFamily: fonts.bodyBold,
          marginBottom: 6,
        }}
      >
        {title}
      </Text>
      {children}
    </View>
  );
}

const pdfStyles = {
  li: { fontSize: 11, color: colors.ink, lineHeight: 18, fontFamily: fonts.body },
  cell: { fontSize: 10, color: colors.ink, fontFamily: fonts.body },
} as const;

function buildHtml(name: string, week: number, journal: any[]): string {
  const today = new Date().toLocaleDateString('en-GB');
  return `
  <html>
    <head>
      <meta charset="utf-8" />
      <style>
        body { font-family: -apple-system, system-ui, sans-serif; color: #2A2522; padding: 32px; }
        h1 { font-family: Georgia, serif; font-size: 22px; margin: 0; }
        .h { font-size: 9px; letter-spacing: 1.6px; text-transform: uppercase; color: #7A6F66; margin-bottom: 4px; }
        .row { display: flex; justify-content: space-between; }
        .li { font-size: 11px; color: #2A2522; margin: 2px 0; }
        table { width: 100%; border-collapse: collapse; }
        td { padding: 4px 0; border-top: 1px solid #EDE4D8; font-size: 10px; }
        .mute { color: #7A6F66; }
      </style>
    </head>
    <body>
      <div class="row">
        <div>
          <div class="h">Marigold</div>
          <h1>Pregnancy summary</h1>
        </div>
        <div style="text-align:right; font-size:9px; color:#7A6F66">
          Prepared ${today}<br/>For Dr. P. Smith<br/>Patient: ${name} Doe · Week ${week}
        </div>
      </div>
      <hr/>
      <div class="h">Concerns logged</div>
      <p class="li">· Occasional pelvic twinges, left side, evenings</p>
      <p class="li">· One episode of light-headedness on day 87</p>
      <p class="li">· Mild heartburn after large meals</p>

      <div class="h" style="margin-top:18px">Foods consumed (notable)</div>
      <table>
        ${journal
          .slice(0, 8)
          .map(
            (j) => `
              <tr>
                <td>${j.name}</td>
                <td class="mute">Wk ${j.week}</td>
                <td style="text-align:right">${j.verdict === 'safe' ? '✓' : j.verdict === 'caution' ? '!' : '✕'}</td>
              </tr>`,
          )
          .join('')}
      </table>

      <div class="h" style="margin-top:18px">Medications questioned</div>
      <p class="li">· Paracetamol 500mg — used 4 times for headaches</p>
      <p class="li">· Avoided ibuprofen on app guidance</p>

      <div class="h" style="margin-top:18px">Questions for today</div>
      <ol style="padding-left:18px">
        <li class="li">Should I continue iron + folate, or move to a combined?</li>
        <li class="li">Glucose test — when, and how should I prepare?</li>
        <li class="li">Is the left-side twinge round ligament, or worth scanning?</li>
      </ol>

      <p style="margin-top:24px; text-align:center; font-size:8px; color:#7A6F66">
        Marigold v1.0 · NHS / ACOG references attached
      </p>
    </body>
  </html>`;
}
