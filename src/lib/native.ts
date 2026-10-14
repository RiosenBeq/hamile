// JS side of the iOS-only bridge (ios/Marigold/MarigoldNative.swift):
//  • syncWidget()  — writes the data the Home/Lock Screen widget needs
//  • Live Activities for the contraction timer and kick counter
// Every call is a safe no-op on Android, web, older iOS or when the native
// module isn't present (e.g. Expo Go).

import { NativeModules, Platform } from 'react-native';
import { getWeek, sizePhrase } from '@/content';
import { translate } from '@/i18n';
import type { LangCode } from '@/i18n/translations';
import type { Profile } from '@/store/types';

type Native = {
  setWidgetData(json: string): Promise<boolean>;
  activitiesEnabled(): Promise<boolean>;
  startActivity(json: string): Promise<string | null>;
  updateActivity(json: string): Promise<boolean>;
  endActivity(kind: string): Promise<boolean>;
};

const mod: Native | undefined = Platform.OS === 'ios' ? (NativeModules.MarigoldNative as Native | undefined) : undefined;

let lastWidgetJson = '';

export async function syncWidget(profile: Profile, lang: LangCode): Promise<void> {
  if (!mod) return;
  const t = (k: string) => translate(lang, k);
  const weeks = Array.from({ length: 42 }).map((_, i) => {
    const w = getWeek(i + 1);
    return { w: i + 1, e: w.size.emoji, n: sizePhrase(w.size, lang) };
  });
  const payload = {
    dueDate: profile.dueDate,
    lossMode: !!profile.lossMode,
    postpartum: profile.stage === 'postpartum',
    weeks,
    labels: {
      week: t('widget.week'),
      weeksDays: t('widget.weeksDays'),
      daysToGo: t('widget.daysToGo'),
      dueToday: t('c.dueToday'),
      overdue: t('widget.overdue'),
      sizeOf: t('widget.sizeOf'),
      trimester: t('widget.trimester'),
      setup: t('widget.setup'),
      paused: t('widget.paused'),
    },
  };
  const json = JSON.stringify(payload);
  if (json === lastWidgetJson) return;
  lastWidgetJson = json;
  try {
    await mod.setWidgetData(json);
  } catch {
    lastWidgetJson = '';
  }
}

export type ActivityKind = 'contraction' | 'kicks';

export type ActivityState = {
  kind: ActivityKind;
  active: boolean;
  /** epoch ms the visible timer counts up from */
  since: number;
  count: number;
  avgIntervalMin?: number | null;
  avgDurationSec?: number | null;
  title: string;
  subtitle: string;
  countLabel: string;
};

const running = new Set<ActivityKind>();

export async function startLiveActivity(state: ActivityState): Promise<void> {
  if (!mod) return;
  try {
    if (!(await mod.activitiesEnabled())) return;
    const id = await mod.startActivity(JSON.stringify(clean(state)));
    if (id) running.add(state.kind);
  } catch {}
}

export async function updateLiveActivity(state: ActivityState): Promise<void> {
  if (!mod) return;
  try {
    if (!running.has(state.kind)) {
      await startLiveActivity(state);
      return;
    }
    await mod.updateActivity(JSON.stringify(clean(state)));
  } catch {}
}

export async function endLiveActivity(kind: ActivityKind): Promise<void> {
  if (!mod) return;
  running.delete(kind);
  try {
    await mod.endActivity(kind);
  } catch {}
}

function clean(s: ActivityState) {
  // Swift decodes optional doubles; drop nulls so they decode as nil.
  const out: Record<string, unknown> = { ...s };
  if (out.avgIntervalMin == null) delete out.avgIntervalMin;
  if (out.avgDurationSec == null) delete out.avgDurationSec;
  return out;
}
