// Appointment editor — type, title, date and time, place, notes, reminder and
// a "questions to ask" list with suggestions for the trimester the visit falls
// in. Reminders are (re)planned by the notifications module after every save
// or delete; this screen never schedules anything itself.
//   /appointments/edit           new appointment
//   /appointments/edit?id=<id>   edit

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, LayoutChangeEvent, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Btn } from '@/components/Btn';
import { CalendarPicker } from '@/components/CalendarPicker';
import { Icon } from '@/components/Icon';
import { Chip, CircleButton, EmptyState, Eyebrow, Field, IconBadge, NavBar, Segmented } from '@/components/ui';
import { useAppStore, type Appointment } from '@/store/useAppStore';
import * as notifications from '@/lib/notifications';
import { addDays, pregnancyStatus, startOfDay, type Trimester } from '@/lib/pregnancy';
import { newId } from '@/lib/id';
import { useFormat, useT } from '@/i18n';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

type Kind = Appointment['kind'];
type Remind = Appointment['remind'];
type Question = Appointment['questions'][number];

const KINDS: { value: Kind; emoji: string; label: string; title: string }[] = [
  { value: 'checkup', emoji: '🩺', label: 'appt.kind.checkup', title: 'appt.default.checkup' },
  { value: 'scan', emoji: '🖥️', label: 'appt.kind.scan', title: 'appt.default.scan' },
  { value: 'test', emoji: '🧪', label: 'appt.kind.test', title: 'appt.default.test' },
  { value: 'class', emoji: '🎓', label: 'appt.kind.class', title: 'appt.default.class' },
  { value: 'other', emoji: '📌', label: 'appt.kind.other', title: 'appt.default.other' },
];

const REMINDERS: { value: Remind; label: string; hint: string }[] = [
  { value: 'none', label: 'appt.remind.none', hint: 'appt.remindHint.none' },
  { value: '1h', label: 'appt.remind.1h', hint: 'appt.remindHint.1h' },
  { value: '1d', label: 'appt.remind.1d', hint: 'appt.remindHint.1d' },
  { value: 'both', label: 'appt.remind.both', hint: 'appt.remindHint.both' },
];

const SUGGESTIONS: Record<Trimester, string[]> = {
  1: ['appt.q.t1.1', 'appt.q.t1.2', 'appt.q.t1.3', 'appt.q.t1.4', 'appt.q.t1.5'],
  2: ['appt.q.t2.1', 'appt.q.t2.2', 'appt.q.t2.3', 'appt.q.t2.4', 'appt.q.t2.5'],
  3: ['appt.q.t3.1', 'appt.q.t3.2', 'appt.q.t3.3', 'appt.q.t3.4', 'appt.q.t3.5'],
};

type ReminderSync = (appointments: Appointment[]) => unknown;

/** Hands the whole list to the notifications module, which owns scheduling. */
function syncReminders() {
  const sync = (notifications as unknown as { syncAppointmentReminders?: ReminderSync }).syncAppointmentReminders;
  try {
    Promise.resolve(sync?.(useAppStore.getState().appointments)).catch(() => {});
  } catch {
    // Best effort — the appointment itself is already saved.
  }
}

/** New appointments default to tomorrow at 09:00. */
function defaultStart(): Date {
  const d = addDays(new Date(), 1);
  d.setHours(9, 0, 0, 0);
  return d;
}

const pad2 = (n: number) => String(n).padStart(2, '0');
const sameText = (a: string, b: string) => a.trim().toLocaleLowerCase() === b.trim().toLocaleLowerCase();

/**
 * Keyboard visibility plus the offset KeyboardAvoidingView needs. KAV measures
 * itself relative to its parent, which is wrong whenever the screen does not
 * start at the top of the window (e.g. presented as an iOS sheet).
 */
function useKeyboardFrame() {
  const ref = useRef<View>(null);
  const [open, setOpen] = useState(false);
  const [offset, setOffset] = useState(0);
  const measure = useCallback(() => {
    ref.current?.measureInWindow((_x, y) => setOffset(Math.max(0, Math.round(y))));
  }, []);
  useEffect(() => {
    const ios = Platform.OS === 'ios';
    const show = Keyboard.addListener(ios ? 'keyboardWillShow' : 'keyboardDidShow', () => {
      measure();
      setOpen(true);
    });
    const hide = Keyboard.addListener(ios ? 'keyboardWillHide' : 'keyboardDidHide', () => setOpen(false));
    return () => {
      show.remove();
      hide.remove();
    };
  }, [measure]);
  return { ref, measure, open, offset };
}

export default function AppointmentEditor() {
  const t = useT();
  const fmt = useFormat();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ id?: string }>();
  const stored = useAppStore((s) => (params.id ? s.appointments.find((a) => a.id === params.id) : undefined));
  // Snapshot on open, so the screen doesn't flash "not found" on its way out
  // after a delete.
  const [initial] = useState(stored);
  const dueDate = useAppStore((s) => s.profile.dueDate);
  const lossMode = useAppStore((s) => !!s.profile.lossMode);
  const upsertAppointment = useAppStore((s) => s.upsertAppointment);
  const removeAppointment = useAppStore((s) => s.removeAppointment);
  const kb = useKeyboardFrame();
  const scrollRef = useRef<ScrollView>(null);
  const sectionY = useRef<Record<string, number>>({});

  const [start] = useState(() => {
    const at = initial ? new Date(initial.at) : defaultStart();
    const questions = initial?.questions ?? [];
    return {
      kind: initial?.kind ?? ('checkup' as Kind),
      title: initial?.title ?? t('appt.default.checkup'),
      at: at.getTime(),
      location: initial?.location ?? '',
      provider: initial?.provider ?? '',
      notes: initial?.notes ?? '',
      remind: initial?.remind ?? ('1d' as Remind),
      questions,
      questionsKey: JSON.stringify(questions),
    };
  });
  const [apptId] = useState(() => initial?.id ?? newId());
  const [kind, setKind] = useState<Kind>(start.kind);
  const [title, setTitle] = useState(start.title);
  const [day, setDay] = useState(() => startOfDay(new Date(start.at)));
  const [hour, setHour] = useState(() => new Date(start.at).getHours());
  const [minute, setMinute] = useState(() => new Date(start.at).getMinutes());
  const [location, setLocation] = useState(start.location);
  const [provider, setProvider] = useState(start.provider);
  const [notes, setNotes] = useState(start.notes);
  const [remind, setRemind] = useState<Remind>(start.remind);
  const [questions, setQuestions] = useState<Question[]>(start.questions);
  const [draft, setDraft] = useState('');
  const [calendarOpen, setCalendarOpen] = useState(!initial);

  const up = (s: string) => s.toLocaleUpperCase(fmt.locale);
  const when = new Date(day.getFullYear(), day.getMonth(), day.getDate(), hour, minute);
  const at = when.getTime();
  const isPast = at < Date.now();
  const preg = dueDate ? pregnancyStatus(dueDate, when) : null;
  // Suggestions follow the trimester the visit falls in, not just today's.
  const trimester: Trimester = preg?.trimester ?? 1;
  const kindInfo = KINDS.find((k) => k.value === kind) ?? KINDS[0];
  const suggestions = lossMode
    ? []
    : SUGGESTIONS[trimester].map((key) => t(key)).filter((s) => !questions.some((q) => sameText(q.text, s)));
  const asked = questions.filter((q) => q.done).length;

  const dirty =
    kind !== start.kind ||
    title !== start.title ||
    at !== start.at ||
    location !== start.location ||
    provider !== start.provider ||
    notes !== start.notes ||
    remind !== start.remind ||
    draft.trim() !== '' ||
    JSON.stringify(questions) !== start.questionsKey;

  const leave = () => (router.canGoBack() ? router.back() : router.replace('/appointments'));

  const close = () => {
    if (!dirty) return leave();
    Alert.alert(t('entry.discardTitle'), t('entry.discardBody'), [
      { text: t('entry.keepEditing'), style: 'cancel' },
      { text: t('entry.discard'), style: 'destructive', onPress: leave },
    ]);
  };

  // ── Field helpers ────────────────────────────────────────────────────────

  const track = (key: string) => (e: LayoutChangeEvent) => {
    sectionY.current[key] = e.nativeEvent.layout.y;
  };
  // Bring a field near the top once the keyboard has opened.
  const reveal = (key: string) => () => {
    setTimeout(
      () => scrollRef.current?.scrollTo({ y: Math.max(0, (sectionY.current[key] ?? 0) - 12), animated: true }),
      Platform.OS === 'ios' ? 300 : 150,
    );
  };

  const pickKind = (k: Kind) => {
    // Swap the title only while it is still one of our defaults.
    if (!title.trim() || KINDS.some((x) => t(x.title) === title.trim())) {
      setTitle(t(KINDS.find((x) => x.value === k)?.title ?? 'appt.default.other'));
    }
    setKind(k);
  };

  const stepHour = (dir: 1 | -1) => {
    Haptics.selectionAsync().catch(() => {});
    setHour((h) => (h + dir + 24) % 24);
  };

  // 15-minute steps; an odd time (e.g. 9:10) snaps to the next quarter.
  const stepMinutes = (dir: 1 | -1) => {
    Haptics.selectionAsync().catch(() => {});
    const total = hour * 60 + minute;
    const snapped = dir > 0 ? Math.floor(total / 15) * 15 + 15 : Math.ceil(total / 15) * 15 - 15;
    const next = (snapped + 1440) % 1440;
    setHour(Math.floor(next / 60));
    setMinute(next % 60);
  };

  const addQuestion = (raw: string) => {
    const text = raw.trim();
    if (!text || questions.some((q) => sameText(q.text, text))) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    setQuestions((qs) => [...qs, { id: newId(), text, done: false }]);
  };

  const submitDraft = () => {
    addQuestion(draft);
    setDraft('');
  };

  const toggleQuestion = (id: string) => {
    Haptics.selectionAsync().catch(() => {});
    setQuestions((qs) => qs.map((q) => (q.id === id ? { ...q, done: !q.done } : q)));
  };

  const removeQuestion = (id: string) => {
    Haptics.selectionAsync().catch(() => {});
    setQuestions((qs) => qs.filter((q) => q.id !== id));
  };

  // ── Save / delete ────────────────────────────────────────────────────────

  const save = () => {
    Keyboard.dismiss();
    const pending = draft.trim();
    const list =
      pending && !questions.some((q) => sameText(q.text, pending))
        ? [...questions, { id: newId(), text: pending, done: false }]
        : questions;
    upsertAppointment({
      id: apptId,
      kind,
      title: title.trim() || t(kindInfo.title),
      at,
      location: location.trim() || undefined,
      provider: provider.trim() || undefined,
      notes: notes.trim() || undefined,
      questions: list.map((q) => ({ ...q, text: q.text.trim() })).filter((q) => q.text),
      remind,
    });
    syncReminders();
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    leave();
  };

  const confirmDelete = () => {
    if (!initial) return;
    Alert.alert(t('appt.deleteConfirm'), t('c.deleteConfirmBody'), [
      { text: t('c.cancel'), style: 'cancel' },
      {
        text: t('c.delete'),
        style: 'destructive',
        onPress: () => {
          removeAppointment(initial.id);
          syncReminders();
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
          leave();
        },
      },
    ]);
  };

  if (params.id && !initial) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.base }}>
        <NavBar onBack={leave} />
        <EmptyState emoji="🗓️" title={t('appt.notFound')} />
      </View>
    );
  }

  const hourLabel = new Date(2000, 0, 1, hour).toLocaleTimeString(fmt.locale, { hour: 'numeric' });
  const remindHint = isPast ? t('appt.remindPast') : t(REMINDERS.find((r) => r.value === remind)?.hint ?? 'appt.remindHint.none');

  return (
    <View ref={kb.ref} onLayout={kb.measure} style={{ flex: 1, backgroundColor: colors.base }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={kb.offset}
      >
        <NavBar
          onBack={close}
          caption={up(initial ? t('appt.edit') : t('appt.new'))}
          right={
            initial ? (
              <CircleButton onPress={confirmDelete} accessibilityLabel={t('appt.delete')}>
                <Icon.trash size={18} color={colors.danger} />
              </CircleButton>
            ) : undefined
          }
        />

        <ScrollView
          ref={scrollRef}
          style={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 6, paddingBottom: 28 }}
        >
          {/* Type */}
          <Eyebrow style={{ marginBottom: 10 }}>{up(t('appt.type'))}</Eyebrow>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {KINDS.map((k) => (
              <Chip key={k.value} emoji={k.emoji} label={t(k.label)} selected={kind === k.value} onPress={() => pickKind(k.value)} />
            ))}
          </View>

          {/* Title */}
          <View onLayout={track('title')} style={{ marginTop: 22 }}>
            <Field
              label={up(t('appt.titleLabel'))}
              value={title}
              onChangeText={setTitle}
              placeholder={t(kindInfo.title)}
              onFocus={reveal('title')}
              returnKeyType="done"
              maxLength={80}
            />
          </View>

          {/* Date & time */}
          <Eyebrow style={{ marginTop: 22, marginBottom: 10 }}>{up(t('appt.when'))}</Eyebrow>
          <Pressable
            onPress={() => {
              Haptics.selectionAsync().catch(() => {});
              Keyboard.dismiss();
              setCalendarOpen((o) => !o);
            }}
            accessibilityRole="button"
            accessibilityState={{ expanded: calendarOpen }}
            style={({ pressed }) => ({
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
              padding: 14,
              borderRadius: 18,
              backgroundColor: pressed ? colors.sand : colors.surface,
              borderWidth: 1,
              borderColor: colors.line,
            })}
          >
            <IconBadge icon={Icon.calendar} hue="rose" size={38} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: fonts.bodyBold, fontSize: 15, color: colors.ink }} numberOfLines={1}>
                {fmt.date(when, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </Text>
              <Text style={{ fontFamily: fonts.body, fontSize: 13, color: colors.mute, marginTop: 2 }}>
                {fmt.time(when)}
                {preg && preg.weeks > 0 ? ` · ${t('c.weekN', { n: preg.weeks })}` : ''}
              </Text>
            </View>
            <View style={{ transform: [{ rotate: calendarOpen ? '90deg' : '0deg' }] }}>
              <Icon.chevR size={18} color={colors.faint} />
            </View>
          </Pressable>
          {calendarOpen ? (
            <Animated.View entering={FadeIn.duration(200)} style={{ marginTop: 10 }}>
              <CalendarPicker value={day} onChange={setDay} marked={new Date()} />
            </Animated.View>
          ) : null}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 10 }}>
            <TimeStepper
              value={hourLabel}
              caption={up(t('appt.hour'))}
              lessLabel={t('appt.hourEarlier')}
              moreLabel={t('appt.hourLater')}
              onStep={stepHour}
            />
            <Text style={{ fontFamily: fonts.display, fontSize: 24, color: colors.faint }}>:</Text>
            <TimeStepper
              value={pad2(minute)}
              caption={up(t('appt.minute'))}
              lessLabel={t('appt.minEarlier')}
              moreLabel={t('appt.minLater')}
              onStep={stepMinutes}
            />
          </View>

          {/* Place */}
          <View onLayout={track('place')} style={{ marginTop: 22 }}>
            <Field
              label={up(t('appt.location'))}
              value={location}
              onChangeText={setLocation}
              placeholder={t('appt.locationPh')}
              onFocus={reveal('place')}
              returnKeyType="done"
              maxLength={120}
            />
            <Field
              label={up(t('appt.provider'))}
              value={provider}
              onChangeText={setProvider}
              placeholder={t('appt.providerPh')}
              onFocus={reveal('place')}
              returnKeyType="done"
              maxLength={80}
              containerStyle={{ marginTop: 16 }}
            />
          </View>

          {/* Notes */}
          <View onLayout={track('notes')} style={{ marginTop: 22 }}>
            <Field
              label={up(t('appt.notes'))}
              value={notes}
              onChangeText={setNotes}
              placeholder={t('appt.notesPh')}
              onFocus={reveal('notes')}
              multiline
              maxLength={1000}
              style={{ minHeight: 104, textAlignVertical: 'top', lineHeight: 22 }}
            />
          </View>

          {/* Reminder */}
          <Eyebrow style={{ marginTop: 22, marginBottom: 10 }}>{up(t('appt.remind'))}</Eyebrow>
          <Segmented
            options={REMINDERS.map((r) => ({ value: r.value, label: t(r.label) }))}
            value={remind}
            onChange={setRemind}
          />
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8, paddingHorizontal: 4 }}>
            <Icon.bell size={14} color={colors.mute} />
            <Text style={{ flex: 1, fontFamily: fonts.body, fontSize: 13, color: colors.mute }}>{remindHint}</Text>
          </View>

          {/* Questions to ask */}
          <View onLayout={track('questions')} style={{ marginTop: 26 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <Eyebrow>{up(t('appt.questions'))}</Eyebrow>
              {questions.length ? (
                <Text style={{ fontFamily: fonts.bodyBold, fontSize: 12.5, color: colors.mute }}>
                  {t('appt.questionsProgress', { done: asked, total: questions.length })}
                </Text>
              ) : null}
            </View>

            {questions.length ? (
              <View style={{ backgroundColor: colors.surface, borderRadius: 20, borderWidth: 1, borderColor: colors.line, overflow: 'hidden' }}>
                {questions.map((q, i) => (
                  <View
                    key={q.id}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingLeft: 14,
                      paddingRight: 4,
                      paddingVertical: 8,
                      borderTopWidth: i ? 1 : 0,
                      borderTopColor: colors.line,
                    }}
                  >
                    <Pressable
                      onPress={() => toggleQuestion(q.id)}
                      accessibilityRole="checkbox"
                      accessibilityState={{ checked: q.done }}
                      accessibilityLabel={q.text}
                      accessibilityHint={t('appt.markAsked')}
                      style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 4 }}
                    >
                      <View
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: 12,
                          borderWidth: 1.5,
                          borderColor: q.done ? colors.sage : colors.faint,
                          backgroundColor: q.done ? colors.sage : 'transparent',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {q.done ? <Icon.check size={15} color="#fff" /> : null}
                      </View>
                      <Text
                        style={{
                          flex: 1,
                          fontFamily: fonts.body,
                          fontSize: 15,
                          lineHeight: 21,
                          color: q.done ? colors.mute : colors.ink,
                          textDecorationLine: q.done ? 'line-through' : 'none',
                        }}
                      >
                        {q.text}
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={() => removeQuestion(q.id)}
                      accessibilityRole="button"
                      accessibilityLabel={t('appt.removeQuestion')}
                      hitSlop={6}
                      style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}
                    >
                      <Icon.close size={16} color={colors.faint} />
                    </Pressable>
                  </View>
                ))}
              </View>
            ) : (
              <Text style={{ fontFamily: fonts.body, fontSize: 14, lineHeight: 20, color: colors.mute }}>{t('appt.noQuestions')}</Text>
            )}

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 12 }}>
              <Field
                value={draft}
                onChangeText={setDraft}
                placeholder={t('appt.questionPh')}
                onFocus={reveal('questions')}
                onSubmitEditing={submitDraft}
                blurOnSubmit={false}
                returnKeyType="done"
                maxLength={200}
                containerStyle={{ flex: 1 }}
              />
              <CircleButton
                size={52}
                bg={draft.trim() ? colors.terracotta : colors.surface}
                onPress={submitDraft}
                accessibilityLabel={t('appt.addQuestion')}
              >
                <Icon.plus size={20} color={draft.trim() ? '#fff' : colors.ink} />
              </CircleButton>
            </View>

            {suggestions.length ? (
              <View style={{ marginTop: 18 }}>
                <Eyebrow style={{ marginBottom: 10 }}>
                  {up(preg ? t('appt.suggested', { n: trimester }) : t('appt.suggestedPlain'))}
                </Eyebrow>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                  {suggestions.map((s) => (
                    <SuggestionChip key={s} label={s} onPress={() => addQuestion(s)} />
                  ))}
                </View>
              </View>
            ) : null}
          </View>

          {initial ? (
            <Btn kind="ghost" onPress={confirmDelete} style={{ marginTop: 24 }} textStyle={{ color: colors.danger }}>
              {t('appt.delete')}
            </Btn>
          ) : null}
        </ScrollView>

        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 10,
            paddingBottom: kb.open ? 10 : Math.max(insets.bottom, 12) + 4,
            borderTopWidth: 1,
            borderTopColor: colors.line,
            backgroundColor: colors.base,
          }}
        >
          <Btn onPress={save}>{t('c.save')}</Btn>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

function TimeStepper({
  value,
  caption,
  lessLabel,
  moreLabel,
  onStep,
}: {
  value: string;
  caption: string;
  lessLabel: string;
  moreLabel: string;
  onStep: (dir: 1 | -1) => void;
}) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        borderRadius: 18,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.line,
      }}
    >
      <CircleButton size={38} bg={colors.sand} onPress={() => onStep(-1)} accessibilityLabel={lessLabel}>
        <Icon.minus size={16} color={colors.ink} />
      </CircleButton>
      <View style={{ flex: 1, alignItems: 'center' }} accessible accessibilityLabel={`${caption} ${value}`}>
        <Text style={{ fontFamily: fonts.display, fontSize: 22, lineHeight: 27, color: colors.ink }}>{value}</Text>
        <Text style={{ fontFamily: fonts.bodyBold, fontSize: 10.5, letterSpacing: 1, color: colors.faint }}>{caption}</Text>
      </View>
      <CircleButton size={38} bg={colors.sand} onPress={() => onStep(1)} accessibilityLabel={moreLabel}>
        <Icon.plus size={16} color={colors.ink} />
      </CircleButton>
    </View>
  );
}

function SuggestionChip({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => ({
        maxWidth: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingVertical: 9,
        paddingLeft: 10,
        paddingRight: 14,
        borderRadius: 18,
        backgroundColor: pressed ? colors.sand : colors.surface,
        borderWidth: 1,
        borderColor: colors.line,
      })}
    >
      <Icon.plus size={15} color={colors.terracotta} />
      <Text style={{ flexShrink: 1, fontFamily: fonts.bodyBold, fontSize: 13.5, lineHeight: 18, color: colors.ink }}>{label}</Text>
    </Pressable>
  );
}
