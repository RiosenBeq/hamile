// Reports (Marigold Plus): a doctor-ready summary built only from the user's
// own logs, and a keepsake "journal book" with notes and bump photos.

import React, { useMemo, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { Icon } from '@/components/Icon';
import { Btn } from '@/components/Btn';
import { Body, Eyebrow, H1, IconBadge, NavBar, Page, Segmented, Surface, ToggleRow } from '@/components/ui';
import { useAppStore } from '@/store/useAppStore';
import { usePlus } from '@/lib/purchases';
import { pregnancyStatus, dayKey, addDays, parseISODate } from '@/lib/pregnancy';
import { formatBodyWeight } from '@/lib/units';
import { useFormat, useT } from '@/i18n';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

type Kind = 'doctor' | 'book';
type SectionKey = 'overview' | 'weight' | 'symptoms' | 'kicks' | 'contractions' | 'appointments' | 'pills';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const CSS = `
  body { font-family: -apple-system, 'Helvetica Neue', sans-serif; color: #2A2522; padding: 28px 30px; }
  h1 { font-family: Georgia, 'Times New Roman', serif; font-size: 26px; margin: 4px 0 2px; font-weight: 600; }
  h2 { font-family: Georgia, serif; font-size: 17px; margin: 22px 0 8px; font-weight: 600; }
  .eyebrow { font-size: 9px; letter-spacing: 1.6px; text-transform: uppercase; color: #776B62; }
  .mute { color: #776B62; }
  .card { border: 1px solid #EDE3D7; border-radius: 12px; padding: 12px 14px; margin: 6px 0; }
  table { width: 100%; border-collapse: collapse; font-size: 11px; }
  th { text-align: left; font-size: 9px; letter-spacing: 1px; text-transform: uppercase; color: #776B62; padding: 6px 4px; border-bottom: 1px solid #EDE3D7; }
  td { padding: 6px 4px; border-bottom: 1px solid #F4ECE2; vertical-align: top; }
  .grid { display: flex; gap: 10px; flex-wrap: wrap; }
  .kv { flex: 1 1 40%; }
  .kv b { display: block; font-size: 15px; margin-top: 2px; }
  .foot { margin-top: 28px; font-size: 8.5px; color: #776B62; text-align: center; }
  .entry { page-break-inside: avoid; margin: 0 0 18px; }
  .entry img { width: 100%; max-height: 420px; object-fit: cover; border-radius: 12px; margin-top: 8px; }
  .wk { display: inline-block; background: #F6E1D8; color: #C0694B; border-radius: 999px; padding: 2px 8px; font-size: 10px; font-weight: 700; }
`;

export default function Reports() {
  const t = useT();
  const fmt = useFormat();
  const router = useRouter();
  const plus = usePlus();
  const s = useAppStore();
  const [kind, setKind] = useState<Kind>('doctor');
  const [busy, setBusy] = useState(false);
  const [sections, setSections] = useState<Record<SectionKey, boolean>>({
    overview: true,
    weight: true,
    symptoms: true,
    kicks: true,
    contractions: true,
    appointments: true,
    pills: true,
  });

  const counts = useMemo(
    () => ({
      weight: s.weights.length,
      symptoms: s.symptoms.length,
      kicks: s.kicks.length,
      contractions: s.contractions.length,
      appointments: s.appointments.length,
      pills: s.pills.length,
      diary: s.diary.length,
    }),
    [s.weights, s.symptoms, s.kicks, s.contractions, s.appointments, s.pills, s.diary],
  );

  const doctorHtml = (): string => {
    const now = new Date();
    const p = s.profile.dueDate ? pregnancyStatus(s.profile.dueDate, now) : null;
    const parts: string[] = [];
    parts.push(`<div class="eyebrow">Marigold</div><h1>${esc(t('pdf.doc.title'))}</h1><div class="mute" style="font-size:11px">${esc(t('pdf.doc.prepared', { date: fmt.date(now) }))}</div>`);

    if (sections.overview) {
      parts.push(`<div class="card grid">
        ${s.profile.name ? `<div class="kv"><span class="eyebrow">${esc(t('pdf.doc.patient'))}</span><b>${esc(s.profile.name)}</b></div>` : ''}
        ${s.profile.dueDate ? `<div class="kv"><span class="eyebrow">${esc(t('pdf.doc.due'))}</span><b>${esc(fmt.date(parseISODate(s.profile.dueDate)))}</b></div>` : ''}
        ${p ? `<div class="kv"><span class="eyebrow">${esc(t('pdf.doc.gest'))}</span><b>${esc(t('c.weeksDays', { w: p.weeks, d: p.days }))}</b></div>` : ''}
        ${s.profile.multiples ? `<div class="kv"><span class="eyebrow">${esc(t('pdf.doc.multiples'))}</span><b>${esc(t('pdf.doc.yes'))}</b></div>` : ''}
      </div>`);
    }

    if (sections.appointments) {
      const upcoming = s.appointments.filter((a) => a.at >= now.getTime() - 3600_000).sort((a, b) => a.at - b.at).slice(0, 6);
      if (upcoming.length) {
        parts.push(`<h2>${esc(t('pdf.s.appointments'))}</h2>`);
        for (const a of upcoming) {
          const qs = a.questions.filter((q) => !q.done);
          parts.push(`<div class="card"><b>${esc(a.title)}</b> <span class="mute">· ${esc(fmt.date(a.at, { weekday: 'short', day: 'numeric', month: 'short' }))} ${esc(fmt.time(a.at))}${a.location ? ' · ' + esc(a.location) : ''}</span>
            ${qs.length ? `<ol style="margin:8px 0 0 18px;padding:0;font-size:11.5px">${qs.map((q) => `<li>${esc(q.text)}</li>`).join('')}</ol>` : ''}
          </div>`);
        }
      }
    }

    if (sections.weight && s.weights.length) {
      const rows = [...s.weights].sort((a, b) => b.at - a.at).slice(0, 12);
      parts.push(`<h2>${esc(t('pdf.s.weight'))}</h2><table><tr><th>${esc(t('pdf.doc.date'))}</th><th>${esc(t('pdf.doc.week'))}</th><th>${esc(t('pdf.doc.weight'))}</th><th>${esc(t('pdf.doc.notes'))}</th></tr>
        ${rows.map((w) => `<tr><td>${esc(fmt.date(w.at, { day: 'numeric', month: 'short' }))}</td><td>${w.week}</td><td>${esc(formatBodyWeight(w.kg, s.profile.units))}</td><td>${esc(w.note ?? '')}</td></tr>`).join('')}</table>`);
    }

    if (sections.symptoms && s.symptoms.length) {
      const since = addDays(now, -14).getTime();
      const rows = s.symptoms.filter((x) => x.at >= since).sort((a, b) => b.at - a.at);
      if (rows.length) {
        parts.push(`<h2>${esc(t('pdf.s.symptoms'))}</h2><table><tr><th>${esc(t('pdf.doc.date'))}</th><th>${esc(t('pdf.doc.mood'))}</th><th>${esc(t('pdf.doc.nausea'))}</th><th>${esc(t('pdf.doc.sleep'))}</th><th>${esc(t('pdf.doc.cramps'))}</th><th>${esc(t('pdf.doc.energy'))}</th><th>${esc(t('pdf.doc.notes'))}</th></tr>
          ${rows.map((r) => `<tr><td>${esc(fmt.date(r.at, { day: 'numeric', month: 'short' }))}</td><td>${r.mood}/5</td><td>${r.nausea}/3</td><td>${r.sleep}/5</td><td>${r.cramps}/3</td><td>${r.energy}/5</td><td>${esc(r.note ?? '')}</td></tr>`).join('')}</table>`);
      }
    }

    if (sections.kicks && s.kicks.length) {
      const since = addDays(now, -7).getTime();
      const groups = new Map<string, number[]>();
      for (const k of s.kicks.filter((x) => x.at >= since)) {
        groups.set(k.sessionId, [...(groups.get(k.sessionId) ?? []), k.at]);
      }
      const rows = Array.from(groups.values())
        .map((ts) => ts.sort((a, b) => a - b))
        .sort((a, b) => b[0] - a[0]);
      if (rows.length) {
        parts.push(`<h2>${esc(t('pdf.s.kicks'))}</h2><table><tr><th>${esc(t('pdf.doc.start'))}</th><th>${esc(t('pdf.doc.count'))}</th><th>${esc(t('pdf.doc.duration'))}</th></tr>
          ${rows.map((ts) => `<tr><td>${esc(fmt.date(ts[0], { day: 'numeric', month: 'short' }))} ${esc(fmt.time(ts[0]))}</td><td>${ts.length}</td><td>${Math.max(1, Math.round((ts[ts.length - 1] - ts[0]) / 60000))} min</td></tr>`).join('')}</table>`);
      }
    }

    if (sections.contractions && s.contractions.length) {
      const since = now.getTime() - 24 * 3600_000;
      const rows = s.contractions.filter((c) => c.startedAt >= since).sort((a, b) => b.startedAt - a.startedAt);
      if (rows.length) {
        parts.push(`<h2>${esc(t('pdf.s.contractions'))}</h2><table><tr><th>${esc(t('pdf.doc.start'))}</th><th>${esc(t('pdf.doc.length'))}</th><th>${esc(t('pdf.doc.interval'))}</th></tr>
          ${rows
            .map((c, i) => {
              const prev = rows[i + 1];
              const len = Math.round((c.endedAt - c.startedAt) / 1000);
              const gap = prev ? Math.round((c.startedAt - prev.startedAt) / 60000) : null;
              return `<tr><td>${esc(fmt.time(c.startedAt))}</td><td>${len} s</td><td>${gap !== null ? `${gap} min` : '—'}</td></tr>`;
            })
            .join('')}</table>`);
      }
    }

    if (sections.pills && s.pills.length) {
      const days = Array.from({ length: 7 }).map((_, i) => dayKey(addDays(now, -i)));
      parts.push(`<h2>${esc(t('pdf.s.pills'))}</h2><table><tr><th>${esc(t('tools.vitamins'))}</th><th>${esc(t('pdf.doc.times'))}</th><th>${esc(t('pdf.doc.taken7'))}</th></tr>
        ${s.pills.map((p) => `<tr><td>${esc(p.name)}</td><td>${esc(p.times.join(', '))}</td><td>${days.filter((d) => (s.pillLog[d] ?? []).includes(p.id)).length}/7</td></tr>`).join('')}</table>`);
    }

    parts.push(`<div class="foot">${esc(t('pdf.doc.note'))}</div>`);
    return `<html><head><meta charset="utf-8"/><style>${CSS}</style></head><body>${parts.join('\n')}</body></html>`;
  };

  const bookHtml = async (): Promise<string> => {
    const MOODS = ['', '😔', '😕', '😐', '🙂', '😊'];
    const entries = [...s.diary].sort((a, b) => a.at - b.at);
    const blocks: string[] = [];
    for (const e of entries) {
      let img = '';
      if (e.photoUri) {
        try {
          const b64 = await FileSystem.readAsStringAsync(e.photoUri, { encoding: FileSystem.EncodingType.Base64 });
          img = `<img src="data:image/jpeg;base64,${b64}"/>`;
        } catch {
          img = '';
        }
      }
      blocks.push(`<div class="entry"><span class="wk">${esc(t('c.weekN', { n: e.week }))}</span> <span class="mute" style="font-size:11px">${esc(fmt.date(e.at))}</span> ${e.mood ? MOODS[e.mood] : ''}
        ${e.text ? `<p style="font-size:13px;line-height:1.55;margin:8px 0 0">${esc(e.text).replace(/\n/g, '<br/>')}</p>` : ''}${img}</div>`);
    }
    const name = s.profile.name ? ` — ${esc(s.profile.name)}` : '';
    return `<html><head><meta charset="utf-8"/><style>${CSS}</style></head><body>
      <div style="text-align:center;margin:40px 0 30px"><div style="font-size:48px">🌼</div><h1>${esc(t('pdf.book.title'))}${name}</h1><div class="mute">${esc(t('pdf.book.subtitle'))}</div></div>
      ${blocks.join('\n')}
    </body></html>`;
  };

  const create = async () => {
    if (!plus) {
      router.push({ pathname: '/paywall', params: { from: 'pdf' } });
      return;
    }
    setBusy(true);
    try {
      const html = kind === 'doctor' ? doctorHtml() : await bookHtml();
      const { uri } = await Print.printToFileAsync({ html });
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, { mimeType: 'application/pdf', UTI: 'com.adobe.pdf' });
      }
    } catch (e: any) {
      Alert.alert(t('pdf.title'), e?.message ?? t('c.error'));
    } finally {
      setBusy(false);
    }
  };

  const toggles: [SectionKey, string, number | null][] = [
    ['overview', t('pdf.s.overview'), null],
    ['appointments', t('pdf.s.appointments'), counts.appointments],
    ['weight', t('pdf.s.weight'), counts.weight],
    ['symptoms', t('pdf.s.symptoms'), counts.symptoms],
    ['kicks', t('pdf.s.kicks'), counts.kicks],
    ['contractions', t('pdf.s.contractions'), counts.contractions],
    ['pills', t('pdf.s.pills'), counts.pills],
  ];

  const nothing = kind === 'book' ? counts.diary === 0 : false;

  return (
    <Page header={<NavBar close caption={t('pdf.title')} />}>
      <View style={{ paddingHorizontal: 20 }}>
        <H1>{t('pdf.heading')}</H1>
        <Body mute style={{ marginTop: 8 }}>{t('pdf.intro')}</Body>
      </View>
      <View style={{ paddingHorizontal: 20, marginTop: 16 }}>
        <Segmented
          value={kind}
          onChange={setKind}
          options={[
            { value: 'doctor', label: t('pdf.doctor') },
            { value: 'book', label: t('pdf.book') },
          ]}
        />
      </View>

      <View style={{ paddingHorizontal: 20, marginTop: 14 }}>
        <Surface style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
          <IconBadge icon={kind === 'doctor' ? Icon.stethoscope : Icon.book} hue={kind === 'doctor' ? 'rose' : 'amber'} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: fonts.bodyBold, fontSize: 15.5, color: colors.ink }}>{kind === 'doctor' ? t('pdf.doctor') : t('pdf.book')}</Text>
            <Text style={{ fontFamily: fonts.body, fontSize: 13, color: colors.mute, marginTop: 2 }}>{kind === 'doctor' ? t('pdf.doctorSub') : t('pdf.bookSub')}</Text>
          </View>
        </Surface>
      </View>

      {kind === 'doctor' ? (
        <View style={{ paddingHorizontal: 20, marginTop: 14 }}>
          <Eyebrow style={{ marginBottom: 8 }}>{t('pdf.include')}</Eyebrow>
          <Surface padded={false} style={{ overflow: 'hidden' }}>
            {toggles.map(([key, label, n], i) => (
              <ToggleRow
                key={key}
                title={label}
                sub={n === null ? undefined : String(n)}
                value={sections[key]}
                onChange={(v) => setSections((cur) => ({ ...cur, [key]: v }))}
                last={i === toggles.length - 1}
              />
            ))}
          </Surface>
        </View>
      ) : nothing ? (
        <Body mute style={{ paddingHorizontal: 20, marginTop: 14 }}>{t('pdf.empty')}</Body>
      ) : null}

      <View style={{ paddingHorizontal: 20, marginTop: 18 }}>
        {!plus ? (
          <Pressable onPress={() => router.push({ pathname: '/paywall', params: { from: 'pdf' } })} style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <Icon.crown size={16} color={colors.marigold} />
            <Text style={{ fontFamily: fonts.bodyBold, fontSize: 13.5, color: colors.ink2 }}>{t('pdf.plusOnly')}</Text>
          </Pressable>
        ) : null}
        <Btn disabled={busy || nothing} onPress={create}>
          {busy ? <ActivityIndicator color="#fff" /> : plus ? t('pdf.create') : t('pdf.unlock')}
        </Btn>
      </View>
    </Page>
  );
}
