// Vitamins & medicines — the user's own list with a big "taken today" tick,
// optional daily reminder times, inline add/edit, and general guidance only.

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AccessibilityInfo, Alert, AppState, Linking, Pressable, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring, withTiming } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import * as Notifications from 'expo-notifications';
import { Icon } from '@/components/Icon';
import {
  Body,
  Chip,
  CircleButton,
  EmojiBadge,
  EmptyState,
  Eyebrow,
  Field,
  H1,
  MedicalNote,
  NavBar,
  Page,
  ProgressBar,
  Surface,
  ToggleRow,
} from '@/components/ui';
import { useAppStore } from '@/store/useAppStore';
import type { Pill } from '@/store/types';
import { newId } from '@/lib/id';
import * as notifications from '@/lib/notifications';
import { useToday } from '@/lib/usePregnancy';
import { translate, useFormat, useT } from '@/i18n';
import { colors, tint } from '@/theme/colors';
import { fonts } from '@/theme/typography';

const SOURCE_URL = 'https://www.nhs.uk/pregnancy/keeping-well/pregnancy-vitamins-and-supplements/';
const NEW = '__new__';
const PRESET_TIMES = ['08:00', '12:00', '20:00'];
const STEP_MIN = 15;

const PRESETS = [
  { key: 'prenatal', emoji: '🤰' },
  { key: 'folic', emoji: '🌿' },
  { key: 'vitD', emoji: '☀️' },
  { key: 'iron', emoji: '🥬' },
  { key: 'omega3', emoji: '🐟' },
  { key: 'calcium', emoji: '🥛' },
  { key: 'iodine', emoji: '🧂' },
] as const;
type Preset = (typeof PRESETS)[number];

const norm = (s: string) => s.trim().toLocaleLowerCase();

/** Match a saved name against the presets in either language (names are stored as typed). */
function presetFor(name: string): Preset | undefined {
  const n = norm(name);
  if (!n) return undefined;
  return PRESETS.find((p) => norm(translate('en', `vit.preset.${p.key}`)) === n || norm(translate('tr', `vit.preset.${p.key}`)) === n);
}

const toHHMM = (min: number) => `${String(Math.floor(min / 60)).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}`;
const firstTime = (p: Pill) => (p.times.length ? [...p.times].sort()[0] : '99:99');

/** "08:00" → "08:00" (tr) / "08:00 AM" (en-US). Stored times stay 24-hour. */
function useTimeLabel() {
  const fmt = useFormat();
  return (hhmm: string) => {
    const [h, m] = hhmm.split(':').map((x) => parseInt(x, 10));
    const d = new Date();
    d.setHours(h || 0, m || 0, 0, 0);
    return fmt.time(d);
  };
}

// The notifications module schedules the actual reminders. Its functions are
// looked up at call time (and typed loosely) so this screen keeps working while
// that module evolves — `syncPillReminders` is a no-op until it exists.
type NotifApi = {
  syncPillReminders?: (pills: Pill[]) => unknown;
  requestPermissionIfNeeded?: () => Promise<boolean>;
};
const notif = notifications as unknown as NotifApi;

function syncReminders() {
  try {
    Promise.resolve(notif.syncPillReminders?.(useAppStore.getState().pills)).catch(() => {});
  } catch {
    // Reminders are best-effort; the list itself is already saved.
  }
}

async function ensurePermission(): Promise<boolean> {
  try {
    return (await notif.requestPermissionIfNeeded?.()) ?? true;
  } catch {
    return false;
  }
}

export default function Vitamins() {
  const t = useT();
  const today = useToday();
  const timeLabel = useTimeLabel();
  const pills = useAppStore((s) => s.pills);
  const takenIds = useAppStore((s) => s.pillLog[today]);
  const upsertPill = useAppStore((s) => s.upsertPill);
  const removePill = useAppStore((s) => s.removePill);
  const togglePillTaken = useAppStore((s) => s.togglePillTaken);
  const [editing, setEditing] = useState<string | null>(null);

  const taken = useMemo(() => new Set(takenIds ?? []), [takenIds]);
  // Morning pills first; the store appends edited pills at the end, so sort for a stable order.
  const sorted = useMemo(
    () => [...pills].sort((a, b) => firstTime(a).localeCompare(firstTime(b)) || a.name.localeCompare(b.name)),
    [pills],
  );
  const takenCount = pills.filter((p) => taken.has(p.id)).length;
  const allTaken = pills.length > 0 && takenCount === pills.length;

  const openNew = () => {
    Haptics.selectionAsync().catch(() => {});
    setEditing(NEW);
  };

  const toggleTaken = (pill: Pill) => {
    // Read the store directly so quick successive taps never see a stale render.
    const before = new Set(useAppStore.getState().pillLog[today] ?? []);
    togglePillTaken(pill.id, today);
    if (before.has(pill.id)) {
      Haptics.selectionAsync().catch(() => {});
      return;
    }
    if (pills.every((p) => p.id === pill.id || before.has(p.id))) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      AccessibilityInfo.announceForAccessibility(t('vit.allTaken'));
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
  };

  const save = (pill: Pill) => {
    upsertPill(pill);
    setEditing(null);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    if (pill.reminders) ensurePermission().finally(syncReminders);
    else syncReminders();
  };

  const confirmDelete = (pill: Pill) => {
    Alert.alert(t('c.deleteConfirm'), t('c.deleteConfirmBody'), [
      { text: t('c.cancel'), style: 'cancel' },
      {
        text: t('c.delete'),
        style: 'destructive',
        onPress: () => {
          removePill(pill.id);
          setEditing(null);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
          syncReminders();
        },
      },
    ]);
  };

  return (
    <Page
      automaticallyAdjustKeyboardInsets
      header={
        <NavBar
          caption={t('tools.vitamins')}
          right={
            pills.length > 0 && !editing ? (
              <CircleButton onPress={openNew} accessibilityLabel={t('vit.add')}>
                <Icon.plus size={18} color={colors.ink} />
              </CircleButton>
            ) : undefined
          }
        />
      }
    >
      <View style={{ paddingHorizontal: 20, paddingTop: 4 }}>
        <H1>{t('vit.title')}</H1>
        <Body mute style={{ marginTop: 8 }}>
          {t('vit.intro')}
        </Body>
      </View>

      {pills.length > 0 ? (
        <View style={{ paddingHorizontal: 20, marginTop: 18 }}>
          <Surface style={{ flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: allTaken ? colors.sageSoft : colors.surface }}>
            <View style={{ flex: 1 }}>
              <Eyebrow>{t('c.today')}</Eyebrow>
              <Text accessibilityLiveRegion="polite" style={{ fontFamily: fonts.display, fontSize: 22, lineHeight: 28, color: colors.ink, marginTop: 4 }}>
                {allTaken ? t('vit.allTaken') : t('vit.progress', { n: takenCount, total: pills.length })}
              </Text>
              <ProgressBar
                value={takenCount / pills.length}
                color={colors.sage}
                track={allTaken ? '#fff' : colors.sageSoft}
                style={{ marginTop: 12 }}
              />
            </View>
            <EmojiBadge emoji={allTaken ? '🌿' : '💊'} size={52} bg={allTaken ? '#fff' : colors.blush} />
          </Surface>
        </View>
      ) : null}

      {editing === NEW ? (
        <View style={{ paddingHorizontal: 20, marginTop: 16 }}>
          <PillForm initial={null} onSave={save} onCancel={() => setEditing(null)} />
        </View>
      ) : null}

      {pills.length === 0 && editing !== NEW ? (
        <EmptyState
          emoji="💊"
          title={t('vit.emptyTitle')}
          body={t('vit.emptyBody')}
          action={<MainButton label={t('vit.addFirst')} onPress={openNew} icon={<Icon.plus size={18} color="#fff" />} />}
        />
      ) : (
        <View style={{ paddingHorizontal: 20, marginTop: 16, gap: 12 }}>
          {sorted.map((pill) =>
            editing === pill.id ? (
              <PillForm
                key={pill.id}
                initial={pill}
                onSave={save}
                onCancel={() => setEditing(null)}
                onDelete={() => confirmDelete(pill)}
              />
            ) : (
              <PillCard
                key={pill.id}
                pill={pill}
                taken={taken.has(pill.id)}
                timeText={pill.times.length ? pill.times.map(timeLabel).join(' · ') : t('vit.anyTime')}
                onToggle={() => toggleTaken(pill)}
                onEdit={() => {
                  Haptics.selectionAsync().catch(() => {});
                  setEditing(pill.id);
                }}
              />
            ),
          )}
          {pills.length > 0 && !editing ? (
            <Pressable
              onPress={openNew}
              accessibilityRole="button"
              accessibilityLabel={t('vit.add')}
              style={({ pressed }) => ({
                minHeight: 56,
                borderRadius: 20,
                borderWidth: 1.5,
                borderStyle: 'dashed',
                borderColor: '#DCCFC1',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                paddingVertical: 14,
                paddingHorizontal: 16,
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <Icon.plus size={18} color={colors.terracotta} />
              <Text style={{ fontFamily: fonts.bodyBold, fontSize: 15, color: colors.terracotta }}>{t('vit.add')}</Text>
            </Pressable>
          ) : null}
        </View>
      )}

      {/* General guidance — no dosing advice beyond public guidance. The empty
          state already says this, so only repeat it once there's a list. */}
      <View style={{ paddingHorizontal: 20, marginTop: 22 }}>
        {pills.length > 0 || editing === NEW ? (
          <View style={{ flexDirection: 'row', gap: 10, padding: 14, borderRadius: 18, backgroundColor: colors.lavenderSoft, marginBottom: 18 }}>
            <Icon.stethoscope size={18} color={tint.lavender.fg} />
            <Text style={{ flex: 1, fontFamily: fonts.body, fontSize: 13.5, lineHeight: 19, color: colors.ink2 }}>{t('vit.advice')}</Text>
          </View>
        ) : null}
        <Eyebrow style={{ marginBottom: 4 }}>{t('c.sources')}</Eyebrow>
        <Pressable
          onPress={() => Linking.openURL(SOURCE_URL).catch(() => {})}
          accessibilityRole="link"
          accessibilityLabel={t('vit.source')}
          style={{ flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 6 }}
        >
          <Icon.external size={14} color={colors.terracotta} />
          <Text style={{ flex: 1, fontFamily: fonts.body, fontSize: 13.5, color: colors.terracotta }}>{t('vit.source')}</Text>
        </Pressable>
      </View>
      <MedicalNote text={t('c.medicalNote')} />
    </Page>
  );
}

// ── Pill card ──────────────────────────────────────────────────────────────

function PillCard({
  pill,
  taken,
  timeText,
  onToggle,
  onEdit,
}: {
  pill: Pill;
  taken: boolean;
  timeText: string;
  onToggle: () => void;
  onEdit: () => void;
}) {
  const t = useT();
  const emoji = presetFor(pill.name)?.emoji ?? '💊';
  const reminderText = pill.reminders ? t('vit.remindersOn') : t('vit.remindersOff');
  return (
    <Surface padded={false} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: taken ? '#F6FAF5' : colors.surface }}>
      <Pressable
        onPress={onEdit}
        accessibilityRole="button"
        accessibilityLabel={`${pill.name}. ${timeText}. ${reminderText}`}
        accessibilityHint={t('vit.editHint')}
        style={({ pressed }) => ({
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 14,
          paddingVertical: 16,
          paddingLeft: 16,
          paddingRight: 8,
          opacity: pressed ? 0.7 : 1,
        })}
      >
        <EmojiBadge emoji={emoji} size={46} bg={taken ? colors.sageSoft : colors.blush} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: fonts.bodyBold, fontSize: 16, color: colors.ink }} numberOfLines={2}>
            {pill.name}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 }}>
            <Icon.clock size={14} color={colors.mute} />
            <Text style={{ flex: 1, fontFamily: fonts.body, fontSize: 13, color: colors.mute }}>{timeText}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 3 }}>
            <Icon.bell size={14} color={pill.reminders ? tint.sage.fg : colors.faint} />
            <Text style={{ flex: 1, fontFamily: fonts.body, fontSize: 12.5, color: pill.reminders ? tint.sage.fg : colors.faint }}>
              {reminderText}
            </Text>
          </View>
        </View>
        <Icon.edit size={16} color={colors.faint} />
      </Pressable>
      <TakenButton taken={taken} onPress={onToggle} label={t('vit.takenA11y', { name: pill.name })} />
    </Surface>
  );
}

function TakenButton({ taken, onPress, label }: { taken: boolean; onPress: () => void; label: string }) {
  const scale = useSharedValue(1);
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (taken) scale.value = withSequence(withTiming(1.14, { duration: 110 }), withSpring(1, { damping: 9, stiffness: 220 }));
  }, [taken, scale]);
  const style = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: taken }}
      accessibilityLabel={label}
      hitSlop={8}
      style={{ paddingRight: 16, paddingLeft: 6, paddingVertical: 12 }}
    >
      <Animated.View
        style={[
          {
            width: 54,
            height: 54,
            borderRadius: 27,
            borderWidth: 2,
            borderColor: taken ? colors.sage : colors.line,
            backgroundColor: taken ? colors.sage : colors.surface,
            alignItems: 'center',
            justifyContent: 'center',
          },
          style,
        ]}
      >
        <Icon.check size={26} color={taken ? '#fff' : '#D8CCBF'} />
      </Animated.View>
    </Pressable>
  );
}

// ── Add / edit form ────────────────────────────────────────────────────────

function PillForm({
  initial,
  onSave,
  onCancel,
  onDelete,
}: {
  initial: Pill | null;
  onSave: (p: Pill) => void;
  onCancel: () => void;
  onDelete?: () => void;
}) {
  const t = useT();
  const router = useRouter();
  const timeLabel = useTimeLabel();
  const remindersPref = useAppStore((s) => s.notifPrefs.reminders);
  const [name, setName] = useState(initial?.name ?? '');
  const [times, setTimes] = useState<string[]>(initial?.times ?? ['08:00']);
  const [reminders, setReminders] = useState(initial?.reminders ?? true);
  const [custom, setCustom] = useState(false);
  const [customMin, setCustomMin] = useState(9 * 60);
  const [permDenied, setPermDenied] = useState(false);
  const [tried, setTried] = useState(false);
  const nameRef = useRef<TextInput>(null);

  // Only a definite "no" counts as denied; undetermined is asked on save.
  const refreshPermission = useCallback(() => {
    Notifications.getPermissionsAsync()
      .then((s) => setPermDenied(!s.granted && !s.canAskAgain))
      .catch(() => {});
  }, []);

  useEffect(() => {
    refreshPermission();
    const sub = AppState.addEventListener('change', (s) => {
      if (s === 'active') refreshPermission();
    });
    return () => sub.remove();
  }, [refreshPermission]);

  const trimmed = name.trim();
  const matched = presetFor(name);
  const needsTime = reminders && times.length === 0;
  const customTimes = times.filter((x) => !PRESET_TIMES.includes(x));
  const customLabel = timeLabel(toHHMM(customMin));

  const toggleTime = (hhmm: string) =>
    setTimes((cur) => (cur.includes(hhmm) ? cur.filter((x) => x !== hhmm) : [...cur, hhmm].sort()));

  const addCustom = () => {
    const hhmm = toHHMM(customMin);
    Haptics.selectionAsync().catch(() => {});
    setTimes((cur) => (cur.includes(hhmm) ? cur : [...cur, hhmm].sort()));
    setCustom(false);
  };

  const shift = (delta: number) => {
    Haptics.selectionAsync().catch(() => {});
    setCustomMin((m) => (m + delta + 1440) % 1440);
  };

  const changeReminders = (v: boolean) => {
    setReminders(v);
    if (!v) {
      setPermDenied(false);
      return;
    }
    ensurePermission().then((ok) => setPermDenied(!ok));
  };

  const submit = () => {
    if (!trimmed || needsTime) {
      setTried(true);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
      if (!trimmed) nameRef.current?.focus();
      return;
    }
    onSave({ id: initial?.id ?? newId(), name: trimmed, times: [...times].sort(), reminders });
  };

  return (
    <Surface style={{ borderWidth: 1, borderColor: colors.terracottaSoft }}>
      <Eyebrow>{initial ? t('vit.editTitle') : t('vit.newTitle')}</Eyebrow>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 14 }}>
        {PRESETS.map((p) => {
          const label = t(`vit.preset.${p.key}`);
          return (
            <Chip
              key={p.key}
              small
              emoji={p.emoji}
              label={label}
              selected={matched?.key === p.key}
              onPress={() => setName(label)}
            />
          );
        })}
        <Chip
          small
          emoji="✏️"
          label={t('vit.preset.other')}
          selected={!!trimmed && !matched}
          onPress={() => {
            if (matched) setName('');
            nameRef.current?.focus();
          }}
        />
      </View>

      <Field
        ref={nameRef}
        label={t('vit.name')}
        value={name}
        onChangeText={setName}
        placeholder={t('vit.namePh')}
        accessibilityLabel={t('vit.name')}
        autoCapitalize="sentences"
        returnKeyType="done"
        maxLength={60}
        containerStyle={{ marginTop: 16 }}
      />
      {tried && !trimmed ? <Hint text={t('vit.needName')} /> : null}

      <Eyebrow style={{ marginTop: 18, marginBottom: 10 }}>{t('vit.times')}</Eyebrow>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {PRESET_TIMES.map((hhmm) => (
          <Chip key={hhmm} small label={timeLabel(hhmm)} selected={times.includes(hhmm)} onPress={() => toggleTime(hhmm)} />
        ))}
        {customTimes.map((hhmm) => (
          <Pressable
            key={hhmm}
            onPress={() => {
              Haptics.selectionAsync().catch(() => {});
              toggleTime(hhmm);
            }}
            accessibilityRole="button"
            accessibilityLabel={t('vit.removeTime', { time: timeLabel(hhmm) })}
            style={({ pressed }) => ({
              minHeight: 34,
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 999,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              backgroundColor: colors.ink,
              opacity: pressed ? 0.8 : 1,
            })}
          >
            <Text style={{ color: colors.base, fontFamily: fonts.bodyBold, fontSize: 13 }}>{timeLabel(hhmm)}</Text>
            <Icon.close size={13} color={colors.base} />
          </Pressable>
        ))}
        <Chip small emoji="🕒" label={t('vit.custom')} selected={custom} onPress={() => setCustom((v) => !v)} />
      </View>

      {custom ? (
        <View style={{ marginTop: 12, padding: 12, borderRadius: 18, backgroundColor: colors.sand }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <RepeatButton label={t('vit.earlier')} onStep={() => shift(-STEP_MIN)}>
              <Icon.minus size={18} color={colors.ink} />
            </RepeatButton>
            <View
              accessible
              accessibilityRole="adjustable"
              accessibilityLabel={t('vit.customTime')}
              accessibilityValue={{ text: customLabel }}
              accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
              onAccessibilityAction={(e) => shift(e.nativeEvent.actionName === 'increment' ? STEP_MIN : -STEP_MIN)}
              style={{ flex: 1, alignItems: 'center' }}
            >
              <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontFamily: fonts.display, fontSize: 26, color: colors.ink }}>
                {customLabel}
              </Text>
            </View>
            <RepeatButton label={t('vit.later')} onStep={() => shift(STEP_MIN)}>
              <Icon.plus size={18} color={colors.ink} />
            </RepeatButton>
          </View>
          <Pressable
            onPress={addCustom}
            accessibilityRole="button"
            accessibilityLabel={t('vit.addTime', { time: customLabel })}
            style={({ pressed }) => ({
              marginTop: 12,
              minHeight: 44,
              paddingHorizontal: 14,
              paddingVertical: 10,
              borderRadius: 14,
              backgroundColor: colors.terracotta,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              opacity: pressed ? 0.85 : 1,
            })}
          >
            <Icon.plus size={16} color="#fff" />
            <Text style={{ color: '#fff', fontFamily: fonts.bodyBold, fontSize: 14.5 }}>{t('vit.addTime', { time: customLabel })}</Text>
          </Pressable>
        </View>
      ) : null}

      <View style={{ marginHorizontal: -16, marginTop: 10 }}>
        <ToggleRow title={t('vit.reminders')} sub={t('vit.remindersSub')} value={reminders} onChange={changeReminders} last />
      </View>
      {tried && needsTime ? <Hint text={t('vit.needTime')} /> : null}
      {reminders && permDenied ? (
        <NoticeLink
          text={t('vit.permDenied')}
          action={t('vit.openSettings')}
          onPress={() => Linking.openSettings().catch(() => {})}
        />
      ) : reminders && !remindersPref ? (
        <NoticeLink
          text={t('vit.prefOff')}
          action={t('vit.openNotifSettings')}
          onPress={() => router.push('/settings/notifications')}
        />
      ) : null}

      <View style={{ flexDirection: 'row', gap: 10, marginTop: 18 }}>
        <MainButton kind="secondary" label={t('c.cancel')} onPress={onCancel} style={{ flex: 1 }} />
        <MainButton label={t('c.save')} onPress={submit} style={{ flex: 1.4 }} />
      </View>
      {onDelete ? (
        <Pressable
          onPress={onDelete}
          accessibilityRole="button"
          accessibilityLabel={t('vit.deleteA11y', { name: initial?.name ?? '' })}
          hitSlop={8}
          style={({ pressed }) => ({
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            marginTop: 14,
            paddingVertical: 6,
            opacity: pressed ? 0.6 : 1,
          })}
        >
          <Icon.trash size={16} color={colors.danger} />
          <Text style={{ fontFamily: fonts.bodyBold, fontSize: 14, color: colors.danger }}>{t('c.delete')}</Text>
        </Pressable>
      ) : null}
    </Surface>
  );
}

function NoticeLink({ text, action, onPress }: { text: string; action: string; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${text} ${action}`}
      style={({ pressed }) => ({
        flexDirection: 'row',
        gap: 8,
        padding: 12,
        borderRadius: 14,
        backgroundColor: colors.marigoldSoft,
        marginTop: 6,
        opacity: pressed ? 0.8 : 1,
      })}
    >
      <Icon.bell size={16} color={tint.amber.fg} />
      <Text style={{ flex: 1, fontFamily: fonts.body, fontSize: 13, lineHeight: 18, color: colors.ink2 }}>
        {text} <Text style={{ fontFamily: fonts.bodyBold, color: tint.amber.fg }}>{action}</Text>
      </Text>
    </Pressable>
  );
}

function Hint({ text }: { text: string }) {
  return (
    <Text accessibilityLiveRegion="polite" style={{ fontFamily: fonts.body, fontSize: 13, color: colors.danger, marginTop: 8 }}>
      {text}
    </Text>
  );
}

/** Round ± button: tap for one step, press and hold to keep stepping. */
function RepeatButton({ label, onStep, children }: { label: string; onStep: () => void; children: React.ReactNode }) {
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const stop = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  };
  useEffect(() => {
    const ref = timer;
    return () => {
      if (ref.current) clearInterval(ref.current);
    };
  }, []);
  return (
    <Pressable
      onPress={onStep}
      onLongPress={() => {
        stop();
        timer.current = setInterval(onStep, 120);
      }}
      onPressOut={stop}
      delayLongPress={350}
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={6}
      style={({ pressed }) => ({
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.line,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: pressed ? 0.7 : 1,
      })}
    >
      {children}
    </Pressable>
  );
}

function MainButton({
  label,
  onPress,
  icon,
  kind = 'primary',
  style,
}: {
  label: string;
  onPress: () => void;
  icon?: React.ReactNode;
  kind?: 'primary' | 'secondary';
  style?: { flex?: number };
}) {
  const primary = kind === 'primary';
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [
        {
          minHeight: 54,
          borderRadius: 18,
          paddingHorizontal: 18,
          paddingVertical: 14,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          backgroundColor: primary ? colors.terracotta : colors.surface,
          borderWidth: primary ? 0 : 1,
          borderColor: colors.line,
          transform: [{ scale: pressed ? 0.985 : 1 }],
        },
        style,
      ]}
    >
      {icon}
      <Text style={{ fontFamily: fonts.bodyBold, fontSize: 16, color: primary ? '#fff' : colors.ink }}>{label}</Text>
    </Pressable>
  );
}
