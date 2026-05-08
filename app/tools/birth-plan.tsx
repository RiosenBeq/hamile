// Birth plan builder. Form sections feed a single-page PDF via expo-print.
// "A wish list, not a contract" — that copy comes through in the layout
// (no required fields, no scary red, easy to revisit).

import React, { useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { Card, SectionHead } from '@/components/Card';
import { Btn } from '@/components/Btn';
import { Icon } from '@/components/Icon';
import { SubScreenHeader } from '@/components/SubScreen';
import { BIRTH_PLAN_FIELDS } from '@/data/sample';
import { useAppStore } from '@/store/useAppStore';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

export default function BirthPlan() {
  const insets = useSafeAreaInsets();
  const birthPlan = useAppStore((s) => s.birthPlan);
  const setBirthPlanField = useAppStore((s) => s.setBirthPlanField);
  const profile = useAppStore((s) => s.profile);

  const filled = useMemo(
    () =>
      BIRTH_PLAN_FIELDS.filter((f) => {
        const v = birthPlan[f.key];
        if (!v) return false;
        return Array.isArray(v) ? v.length > 0 : v.length > 0;
      }).length,
    [birthPlan],
  );

  const exportPdf = async () => {
    try {
      const html = buildHtml(profile.name, profile.week, birthPlan);
      const { uri } = await Print.printToFileAsync({ html });
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, { UTI: 'com.adobe.pdf', mimeType: 'application/pdf' });
      }
    } catch (e: any) {
      Alert.alert("Couldn't export", String(e?.message ?? e));
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.base }}>
      <SubScreenHeader
        caption="Birth plan"
        right={
          <Pressable onPress={exportPdf}>
            <Icon.download size={18} color={colors.ink} />
          </Pressable>
        }
      />

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: insets.bottom + 100 }}
      >
        <Text style={{ fontFamily: fonts.display, fontSize: 30, color: colors.ink, letterSpacing: -0.4, marginTop: 8 }}>
          A wish list, not a contract.
        </Text>
        <Text style={{ color: colors.mute, fontSize: 14, marginTop: 8, fontFamily: fonts.body, lineHeight: 20 }}>
          Pick what matters most. Keep it short — three to five priorities is plenty for the team.
        </Text>

        <Card style={{ marginTop: 18, padding: 18, backgroundColor: 'rgba(181,168,201,0.16)' }}>
          <Text style={{ fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase', color: colors.mute, fontFamily: fonts.bodyBold }}>
            Progress
          </Text>
          <Text style={{ fontFamily: fonts.display, fontSize: 24, color: colors.ink, marginTop: 4, letterSpacing: -0.2 }}>
            {filled} of {BIRTH_PLAN_FIELDS.length} sections answered
          </Text>
        </Card>

        {BIRTH_PLAN_FIELDS.map((field) => {
          const current = birthPlan[field.key];

          if (field.kind === 'text') {
            return (
              <View key={field.key} style={{ marginTop: 24 }}>
                <SectionHead caption="Note" title={field.question} />
                <TextInput
                  value={typeof current === 'string' ? current : ''}
                  onChangeText={(t) => setBirthPlanField(field.key, t)}
                  multiline
                  placeholder="Anything else? Optional."
                  placeholderTextColor={colors.mute}
                  style={{
                    minHeight: 100,
                    padding: 14,
                    backgroundColor: colors.surface,
                    borderRadius: 18,
                    borderWidth: 1,
                    borderColor: colors.line,
                    fontSize: 15,
                    color: colors.ink,
                    fontFamily: fonts.body,
                    textAlignVertical: 'top',
                  }}
                />
              </View>
            );
          }

          const selected = Array.isArray(current) ? current : [];
          const multi = field.kind === 'multichips';

          return (
            <View key={field.key} style={{ marginTop: 24 }}>
              <SectionHead caption="Choose" title={field.question} />
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {(field.options ?? []).map((opt) => {
                  const sel = selected.includes(opt);
                  return (
                    <Pressable
                      key={opt}
                      onPress={() => {
                        if (multi) {
                          const next = sel ? selected.filter((s) => s !== opt) : [...selected, opt];
                          setBirthPlanField(field.key, next);
                        } else {
                          setBirthPlanField(field.key, sel ? [] : [opt]);
                        }
                      }}
                      style={{
                        paddingHorizontal: 14,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: sel ? colors.ink : colors.surface,
                        borderWidth: 1,
                        borderColor: sel ? colors.ink : colors.line,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Text style={{ color: sel ? colors.base : colors.ink, fontSize: 14, fontFamily: fonts.bodyBold }}>
                        {opt}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          );
        })}
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          paddingHorizontal: 24,
          paddingTop: 12,
          paddingBottom: insets.bottom + 16,
          backgroundColor: colors.base,
          borderTopWidth: 1,
          borderTopColor: colors.line,
        }}
      >
        <Btn onPress={exportPdf}>
          <Icon.download size={16} color="#fff" />
          <Text style={{ color: '#fff', fontFamily: fonts.bodyBold, fontSize: 15 }}>Export as PDF</Text>
        </Btn>
      </View>
    </View>
  );
}

function buildHtml(name: string, week: number, plan: Record<string, string[] | string>): string {
  const today = new Date().toLocaleDateString('en-GB');
  const blocks = BIRTH_PLAN_FIELDS.map((field) => {
    const v = plan[field.key];
    let body = '';
    if (field.kind === 'text') {
      if (!v || typeof v !== 'string' || !v.trim()) return '';
      body = `<p>${escapeHtml(v).replace(/\n/g, '<br/>')}</p>`;
    } else if (Array.isArray(v) && v.length) {
      body = `<ul>${v.map((x) => `<li>${escapeHtml(x)}</li>`).join('')}</ul>`;
    } else {
      return '';
    }
    return `<section><h2>${escapeHtml(field.question)}</h2>${body}</section>`;
  }).join('');

  return `
  <html>
    <head>
      <meta charset="utf-8" />
      <style>
        body { font-family: -apple-system, system-ui, Georgia, serif; color: #2A2522; padding: 40px; max-width: 720px; }
        h1 { font-family: Georgia, serif; font-size: 26px; margin: 0 0 4px; }
        h2 { font-family: Georgia, serif; font-size: 14px; margin: 18px 0 6px; color: #7A6F66; text-transform: uppercase; letter-spacing: 1.4px; font-weight: 600; }
        ul { padding-left: 18px; margin: 0; }
        li { font-size: 13px; margin: 2px 0; }
        p { font-size: 13px; line-height: 1.5; margin: 0; }
        .meta { font-size: 11px; color: #7A6F66; margin-bottom: 24px; }
        section { margin-bottom: 8px; }
        .footer { margin-top: 32px; font-size: 10px; color: #7A6F66; text-align: center; }
      </style>
    </head>
    <body>
      <h1>${escapeHtml(name)}'s birth plan</h1>
      <div class="meta">Week ${week} · prepared ${today} · a wish list, not a contract</div>
      ${blocks}
      <div class="footer">Marigold v1.0 · please give me space to revisit if circumstances change.</div>
    </body>
  </html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
