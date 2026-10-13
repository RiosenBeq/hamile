// Birth plan — "a wish list, not a contract". Chip sections (choose one or
// many) plus free-text notes, exported as a localised one-page PDF via
// expo-print. Exporting is free. Questions and options are translation keys
// (see BIRTH_PLAN_FIELDS); plans saved by older builds hold English labels,
// which are mapped back onto those keys when read.

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Linking, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as FileSystem from 'expo-file-system';
import * as Haptics from 'expo-haptics';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { Btn } from '@/components/Btn';
import { Icon } from '@/components/Icon';
import { Body, Chip, CircleButton, Eyebrow, Field, H1, H2, NavBar, Page, ProgressBar, Surface } from '@/components/ui';
import { BIRTH_PLAN_FIELDS } from '@/data/sample';
import { useAppStore, type BirthPlanState } from '@/store/useAppStore';
import { parseISODate } from '@/lib/pregnancy';
import { usePregnancy } from '@/lib/usePregnancy';
import { useFormat, useLang, useT } from '@/i18n';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

const SOURCES = [
  {
    name: 'NHS: What to include in your birth plan',
    url: 'https://www.nhs.uk/pregnancy/labour-and-birth/preparing-for-the-birth/how-to-make-a-birth-plan/',
  },
];

// English labels stored by builds before the plan was localised.
const LEGACY: Record<string, string> = {
  'Gas & air': 'bp.o.gasAir',
  'Water (pool / bath)': 'bp.o.water',
  'TENS machine': 'bp.o.tens',
  'Pethidine / opioids': 'bp.o.opioids',
  Epidural: 'bp.o.epidural',
  'No pharmaceutical pain relief': 'bp.o.noMeds',
  'Dim lighting': 'bp.o.dimLights',
  'My playlist': 'bp.o.playlist',
  Aromatherapy: 'bp.o.aromatherapy',
  'No interruptions': 'bp.o.quiet',
  'Birthing pool': 'bp.o.pool',
  'Standing / squatting positions': 'bp.o.positions',
  Partner: 'bp.o.partner',
  Doula: 'bp.o.doula',
  'Mother / sister': 'bp.o.family',
  Friend: 'bp.o.friend',
  'Just me + the team': 'bp.o.justTeam',
  'Skin-to-skin immediately': 'bp.o.skinToSkin',
  'Delayed cord clamping': 'bp.o.delayedCord',
  'Partner cuts the cord': 'bp.o.partnerCord',
  'Vitamin K injection': 'bp.o.vitKInjection',
  'Vitamin K oral': 'bp.o.vitKOral',
  'Breastfeed exclusively': 'bp.o.breastfeed',
  'Mixed feeding': 'bp.o.mixed',
  'Formula from the start': 'bp.o.formula',
  'Decide after birth': 'bp.o.decideLater',
  'Lower screen / clear drape': 'bp.o.clearDrape',
  'Skin-to-skin in theatre': 'bp.o.skinTheatre',
  'Partner stays with me': 'bp.o.partnerStays',
  'Music kept on': 'bp.o.music',
};

const normalise = (values: string[]) => Array.from(new Set(values.map((v) => LEGACY[v] ?? v)));
const choicesOf = (plan: BirthPlanState, key: string) => {
  const v = plan[key];
  return Array.isArray(v) ? normalise(v) : [];
};
const textOf = (plan: BirthPlanState, key: string) => {
  const v = plan[key];
  return typeof v === 'string' ? v : '';
};

export default function BirthPlan() {
  const t = useT();
  const fmt = useFormat();
  const lang = useLang();
  const insets = useSafeAreaInsets();
  const birthPlan = useAppStore((s) => s.birthPlan);
  const setBirthPlanField = useAppStore((s) => s.setBirthPlanField);
  const profile = useAppStore((s) => s.profile);
  const p = usePregnancy();

  const U = (s: string) => s.toLocaleUpperCase(fmt.locale);
  const optionLabel = (v: string) => (v.startsWith('bp.o.') ? t(v) : v);

  // Notes are edited locally and committed on blur / export / leaving, so we
  // don't write (and sync) the whole plan on every keystroke.
  const [notes, setNotes] = useState(() => textOf(birthPlan, 'notes'));
  const notesRef = useRef(notes);
  notesRef.current = notes;
  const commitNotes = useCallback(() => {
    if (textOf(useAppStore.getState().birthPlan, 'notes') !== notesRef.current) {
      setBirthPlanField('notes', notesRef.current);
    }
  }, [setBirthPlanField]);
  useEffect(() => commitNotes, [commitNotes]);

  const answered = useMemo(
    () =>
      BIRTH_PLAN_FIELDS.filter((f) =>
        f.kind === 'text' ? (f.key === 'notes' ? notes : textOf(birthPlan, f.key)).trim().length > 0 : choicesOf(birthPlan, f.key).length > 0,
      ).length,
    [birthPlan, notes],
  );

  const toggle = (key: string, option: string, multi: boolean) => {
    const selected = choicesOf(birthPlan, key);
    const on = selected.includes(option);
    const next = multi ? (on ? selected.filter((x) => x !== option) : [...selected, option]) : on ? [] : [option];
    setBirthPlanField(key, next);
  };

  const [busy, setBusy] = useState(false);
  const exportPdf = async () => {
    if (busy) return;
    commitNotes();
    const plan: BirthPlanState = { ...useAppStore.getState().birthPlan, notes: notesRef.current };
    const sections = BIRTH_PLAN_FIELDS.map((f) =>
      f.kind === 'text'
        ? { title: t(f.question), items: [] as string[], text: textOf(plan, f.key).trim() }
        : { title: t(f.question), items: choicesOf(plan, f.key).map(optionLabel), text: '' },
    ).filter((s) => s.items.length || s.text);

    if (!sections.length) {
      Alert.alert(t('bp.empty.title'), t('bp.empty.body'));
      return;
    }

    setBusy(true);
    try {
      const name = profile.name.trim();
      const meta = [
        profile.dueDate ? t('bp.pdf.due', { date: fmt.date(parseISODate(profile.dueDate)) }) : null,
        p && p.weeks > 0 ? t('c.weekN', { n: p.weeks }) : null,
        profile.careName ? t('bp.pdf.unit', { name: profile.careName + (profile.carePhone ? ` · ${profile.carePhone}` : '') }) : null,
      ].filter((x): x is string => !!x);

      const html = buildHtml({
        lang,
        title: name ? t('bp.pdf.titleName', { name }) : t('bp.pdf.title'),
        meta,
        intro: t('bp.pdf.intro'),
        sections,
        footerLeft: t('bp.pdf.footer'),
        footerRight: t('bp.pdf.prepared', { date: fmt.date(new Date()) }),
      });

      const { uri } = await Print.printToFileAsync({ html });
      let file = uri;
      if (FileSystem.cacheDirectory) {
        // Give the shared file a readable name instead of a random id.
        const target = `${FileSystem.cacheDirectory}${t('bp.pdf.filename')}.pdf`;
        try {
          await FileSystem.deleteAsync(target, { idempotent: true });
          await FileSystem.moveAsync({ from: uri, to: target });
          file = target;
        } catch {
          file = uri;
        }
      }
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(file, { UTI: 'com.adobe.pdf', mimeType: 'application/pdf', dialogTitle: t('tools.birthPlan') });
      } else {
        await Print.printAsync({ uri: file });
      }
    } catch {
      Alert.alert(t('bp.error'));
    } finally {
      setBusy(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.base }}>
      <Page
        header={
          <NavBar
            caption={U(t('tools.birthPlan'))}
            right={
              <CircleButton onPress={exportPdf} accessibilityLabel={t('bp.a11y.export')}>
                <Icon.share size={17} color={colors.ink} />
              </CircleButton>
            }
          />
        }
        bottomInset={120}
        automaticallyAdjustKeyboardInsets
        keyboardDismissMode="interactive"
      >
        <View style={{ paddingHorizontal: 20, paddingTop: 4 }}>
          <H1>{t('bp.title')}</H1>
          <Body mute style={{ marginTop: 8 }}>
            {t('bp.sub')}
          </Body>
        </View>

        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <Surface style={{ backgroundColor: colors.lavenderSoft, shadowOpacity: 0 }}>
            <Text style={{ fontFamily: fonts.display, fontSize: 20, color: colors.ink }}>
              {t('bp.progress', { n: answered, total: BIRTH_PLAN_FIELDS.length })}
            </Text>
            <ProgressBar value={answered / BIRTH_PLAN_FIELDS.length} color={colors.lavender} track="rgba(255,255,255,0.7)" style={{ marginTop: 12 }} />
          </Surface>
        </View>

        {BIRTH_PLAN_FIELDS.map((field) => {
          if (field.kind === 'text') {
            return (
              <View key={field.key} style={{ paddingHorizontal: 20, marginTop: 14 }}>
                <Surface>
                  <H2 style={{ fontSize: 19, lineHeight: 25 }}>{t(field.question)}</H2>
                  <Field
                    value={field.key === 'notes' ? notes : textOf(birthPlan, field.key)}
                    onChangeText={(v) => (field.key === 'notes' ? setNotes(v) : setBirthPlanField(field.key, v))}
                    onBlur={commitNotes}
                    placeholder={t('bp.notesPh')}
                    accessibilityLabel={t(field.question)}
                    multiline
                    maxLength={1200}
                    containerStyle={{ marginTop: 12 }}
                    style={{ minHeight: 110, textAlignVertical: 'top', backgroundColor: colors.base }}
                  />
                </Surface>
              </View>
            );
          }

          const multi = field.kind === 'multichips';
          const selected = choicesOf(birthPlan, field.key);
          return (
            <View key={field.key} style={{ paddingHorizontal: 20, marginTop: 14 }}>
              <Surface>
                <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', gap: 10 }}>
                  <H2 style={{ flex: 1, fontSize: 19, lineHeight: 25 }}>{t(field.question)}</H2>
                  <Eyebrow>{U(t(multi ? 'bp.chooseAny' : 'bp.chooseOne'))}</Eyebrow>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
                  {(field.options ?? []).map((opt) => (
                    <Chip key={opt} label={t(opt)} selected={selected.includes(opt)} onPress={() => toggle(field.key, opt, multi)} />
                  ))}
                </View>
              </Surface>
            </View>
          );
        })}

        <View style={{ paddingHorizontal: 20, marginTop: 22 }}>
          <Eyebrow style={{ marginBottom: 2 }}>{U(t('c.sources'))}</Eyebrow>
          {SOURCES.map((s) => (
            <Pressable
              key={s.url}
              onPress={() => Linking.openURL(s.url).catch(() => {})}
              accessibilityRole="link"
              accessibilityLabel={s.name}
              style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 6, opacity: pressed ? 0.6 : 1 })}
            >
              <Icon.external size={14} color={colors.terracotta} />
              <Text style={{ flex: 1, fontFamily: fonts.body, fontSize: 13.5, color: colors.terracotta }} numberOfLines={2}>
                {s.name}
              </Text>
            </Pressable>
          ))}
        </View>
      </Page>

      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          paddingHorizontal: 20,
          paddingTop: 12,
          paddingBottom: insets.bottom + 12,
          backgroundColor: colors.base,
          borderTopWidth: 1,
          borderTopColor: colors.line,
        }}
      >
        <Btn onPress={exportPdf} disabled={busy}>
          <Icon.download size={18} color="#fff" />
          <Text style={{ color: '#fff', fontFamily: fonts.bodyBold, fontSize: 16 }}>{busy ? t('bp.exporting') : t('bp.export')}</Text>
        </Btn>
      </View>
    </View>
  );
}

// ── PDF ─────────────────────────────────────────────────────────────────────

type PdfSection = { title: string; items: string[]; text: string };

function buildHtml(o: {
  lang: string;
  title: string;
  meta: string[];
  intro: string;
  sections: PdfSection[];
  footerLeft: string;
  footerRight: string;
}): string {
  const sections = o.sections
    .map((s) => {
      const body = s.items.length
        ? `<div class="pills">${s.items.map((i) => `<span class="pill">${esc(i)}</span>`).join('')}</div>`
        : `<p class="note">${esc(s.text)}</p>`;
      return `<section><h2>${esc(s.title)}</h2>${body}</section>`;
    })
    .join('');

  return `<!doctype html>
<html lang="${esc(o.lang)}">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<style>
  @page { margin: 20mm 18mm; }
  * { box-sizing: border-box; }
  body { margin: 0; color: #2A2522; font: 12.5px/1.5 -apple-system, 'Helvetica Neue', Helvetica, Arial, sans-serif; }
  .brand { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #C0694B; font-weight: 700; }
  .brand i { display: inline-block; width: 9px; height: 9px; border-radius: 50%; background: #E3A03A; margin-right: 7px; vertical-align: -1px; }
  h1 { font-family: Georgia, 'Times New Roman', serif; font-weight: 600; font-size: 30px; line-height: 1.15; letter-spacing: -0.3px; margin: 10px 0 6px; }
  .meta { color: #776B62; font-size: 11.5px; }
  .meta span { white-space: nowrap; }
  .meta span + span::before { content: '·'; color: #A99D93; margin: 0 8px; }
  .intro { margin: 18px 0 4px; padding: 12px 16px; background: #FBF6F0; border-left: 3px solid #C0694B; border-radius: 10px; color: #4B413B; font-style: italic; }
  section { margin-top: 12px; padding: 13px 16px 9px; border: 1px solid #EDE3D7; border-radius: 14px; page-break-inside: avoid; break-inside: avoid; }
  h2 { font-family: Georgia, 'Times New Roman', serif; font-weight: 600; font-size: 15px; margin: 0 0 8px; color: #2A2522; }
  .pill { display: inline-block; margin: 0 6px 6px 0; padding: 4px 11px; border-radius: 999px; background: #F6E1D8; color: #7A3327; font-weight: 600; font-size: 12px; }
  .note { margin: 0 0 4px; white-space: pre-wrap; }
  .footer { margin-top: 24px; padding-top: 10px; border-top: 1px solid #EDE3D7; color: #A99D93; font-size: 10px; display: flex; justify-content: space-between; }
</style>
</head>
<body>
  <div class="brand" lang="en"><i></i>Marigold</div>
  <h1>${esc(o.title)}</h1>
  ${o.meta.length ? `<div class="meta">${o.meta.map((m) => `<span>${esc(m)}</span>`).join('')}</div>` : ''}
  <div class="intro">${esc(o.intro)}</div>
  ${sections}
  <div class="footer"><span>${esc(o.footerLeft)}</span><span>${esc(o.footerRight)}</span></div>
</body>
</html>`;
}

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
