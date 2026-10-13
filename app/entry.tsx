// Journal entry editor — a quick note (mood, words, optional photo) or the
// weekly bump photo. Presented as a modal:
//   /entry?kind=note | /entry?kind=bump      new entry
//   /entry?id=<id>                           edit (the entry decides the kind)
//   /entry?kind=note&mood=4                  note with a mood already picked
//   /entry?kind=note&prompt=know             "letter to baby" from a prompt
//
// Photos are copied into the app's private documents folder (never the camera
// roll, never uploaded) via lib/photos, which stores them as paths relative to
// Documents, and are deleted again together with their entry.

import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import * as Haptics from 'expo-haptics';
import * as ImagePicker from 'expo-image-picker';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Btn } from '@/components/Btn';
import { CalendarPicker } from '@/components/CalendarPicker';
import { Icon } from '@/components/Icon';
import { Body, Chip, CircleButton, EmojiBadge, EmptyState, Eyebrow, Field, H2, IconBadge, NavBar, shadow } from '@/components/ui';
import { useAppStore, type DiaryEntry } from '@/store/useAppStore';
import { daysBetween, pregnancyStatus, startOfDay } from '@/lib/pregnancy';
import { newId } from '@/lib/id';
import { deletePhoto, photoSrc, savePhoto } from '@/lib/photos';
import { useFormat, useT } from '@/i18n';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

type Kind = DiaryEntry['kind'];
type Mood = NonNullable<DiaryEntry['mood']>;
type IconCmp = React.ComponentType<{ size?: number; color?: string }>;

const MOODS: { value: Mood; emoji: string; label: string }[] = [
  { value: 1, emoji: '😔', label: 'jr.mood.1' },
  { value: 2, emoji: '😕', label: 'jr.mood.2' },
  { value: 3, emoji: '😐', label: 'jr.mood.3' },
  { value: 4, emoji: '🙂', label: 'jr.mood.4' },
  { value: 5, emoji: '😊', label: 'jr.mood.5' },
];

const PROMPTS: { key: string; emoji: string; label: string; fill: string }[] = [
  { key: 'know', emoji: '💌', label: 'jr.prompt.know', fill: 'jr.prompt.know.fill' },
  { key: 'foundOut', emoji: '🌟', label: 'jr.prompt.foundOut', fill: 'jr.prompt.foundOut.fill' },
  { key: 'nursery', emoji: '🧸', label: 'jr.prompt.nursery', fill: 'jr.prompt.nursery.fill' },
  { key: 'feel', emoji: '💗', label: 'jr.prompt.feel', fill: 'jr.prompt.feel.fill' },
  { key: 'hope', emoji: '🌈', label: 'jr.prompt.hope', fill: 'jr.prompt.hope.fill' },
  { key: 'move', emoji: '🦋', label: 'jr.prompt.move', fill: 'jr.prompt.move.fill' },
];

// On iOS the system crop box is always square (`aspect` is Android-only), which
// would cut a standing bump photo in half — and the iPhone camera already
// shoots 3:4 portrait — so only Android gets the crop step.
const PICKER_OPTIONS: ImagePicker.ImagePickerOptions = {
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  quality: 0.7,
  allowsEditing: Platform.OS === 'android',
  aspect: [3, 4],
};

/**
 * Keyboard visibility plus the offset KeyboardAvoidingView needs. KAV measures
 * itself relative to its parent, but inside an iOS page-sheet modal the screen
 * starts below the top of the window, so pass that distance along.
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

export default function EntryEditor() {
  const t = useT();
  const fmt = useFormat();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ kind?: string; id?: string; mood?: string; prompt?: string }>();
  const stored = useAppStore((s) => (params.id ? s.diary.find((d) => d.id === params.id) : undefined));
  // Snapshot on open, so the sheet doesn't flash "not found" while it slides
  // away after a delete.
  const [initial] = useState(stored);
  const dueDate = useAppStore((s) => s.profile.dueDate);
  const babyName = useAppStore((s) => s.profile.babyName);
  const upsertDiary = useAppStore((s) => s.upsertDiary);
  const removeDiary = useAppStore((s) => s.removeDiary);
  const kb = useKeyboardFrame();
  const scrollRef = useRef<ScrollView>(null);
  const textRef = useRef<TextInput>(null);

  const kind: Kind = initial?.kind ?? (params.kind === 'bump' ? 'bump' : 'note');

  const letter = useCallback(
    (key: string) => {
      const prompt = PROMPTS.find((p) => p.key === key);
      if (!prompt) return '';
      const name = babyName?.trim();
      return `${name ? t('jr.dearName', { name }) : t('jr.dear')}\n\n${t(prompt.fill)}`;
    },
    [babyName, t],
  );

  const [start] = useState(() => {
    const m = Number(params.mood);
    return {
      text: initial?.text ?? (params.prompt ? letter(params.prompt) : ''),
      mood: initial?.mood ?? (m >= 1 && m <= 5 ? (Math.round(m) as Mood) : undefined),
      photo: initial?.photoUri,
      at: initial?.at ?? Date.now(),
    };
  });
  const [entryId] = useState(() => initial?.id ?? newId());
  const [text, setText] = useState(start.text);
  const [mood, setMood] = useState<Mood | undefined>(start.mood);
  const [photo, setPhoto] = useState<string | undefined>(start.photo);
  const [at, setAt] = useState(() => new Date(start.at));
  const [dateOpen, setDateOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  // A new note opens ready to type (after the sheet has settled).
  useEffect(() => {
    if (kind !== 'note' || initial) return;
    const id = setTimeout(() => textRef.current?.focus(), 450);
    return () => clearTimeout(id);
  }, [kind, initial]);

  const up = (s: string) => s.toLocaleUpperCase(fmt.locale);
  const weekAt = (d: Date) => (dueDate ? pregnancyStatus(dueDate, d).weeks : initial?.week ?? 0);
  const week = weekAt(at);
  const ago = daysBetween(at, new Date());
  const dayText =
    ago === 0 ? t('c.today') : ago === 1 ? t('c.yesterday') : fmt.date(at, { weekday: 'long', day: 'numeric', month: 'long' });
  const caption =
    kind === 'bump' ? t(initial ? 'entry.editBump' : 'entry.newBump') : t(initial ? 'entry.editNote' : 'entry.newNote');

  const dirty =
    text.trim() !== start.text.trim() || mood !== start.mood || photo !== start.photo || at.getTime() !== start.at;
  const canSave = kind === 'bump' ? !!photo : !!(text.trim() || photo);

  const leave = () => (router.canGoBack() ? router.back() : router.replace('/(tabs)/journal'));

  const close = () => {
    if (!dirty) return leave();
    Alert.alert(t('entry.discardTitle'), t('entry.discardBody'), [
      { text: t('entry.keepEditing'), style: 'cancel' },
      { text: t('entry.discard'), style: 'destructive', onPress: leave },
    ]);
  };

  // ── Photos ───────────────────────────────────────────────────────────────

  const acceptPhoto = (uri: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    setPhoto(uri);
  };

  const askForSettings = (title: string, body: string) =>
    Alert.alert(title, body, [
      { text: t('c.notNow'), style: 'cancel' },
      { text: t('entry.openSettings'), onPress: () => Linking.openSettings().catch(() => {}) },
    ]);

  const takePhoto = async () => {
    Keyboard.dismiss();
    try {
      let perm = await ImagePicker.getCameraPermissionsAsync();
      if (!perm.granted && perm.canAskAgain) perm = await ImagePicker.requestCameraPermissionsAsync();
      if (!perm.granted) {
        askForSettings(t('entry.cameraOff'), t('entry.cameraOffBody'));
        return;
      }
      const res = await ImagePicker.launchCameraAsync(PICKER_OPTIONS);
      if (!res.canceled && res.assets[0]) acceptPhoto(res.assets[0].uri);
    } catch {
      // No camera (simulator, restricted device).
      Alert.alert(t('entry.cameraUnavailable'));
    }
  };

  // The system photo picker needs no permission on current iOS and Android, so
  // we only ask if it refuses — nobody gets prompted for their whole library.
  const choosePhoto = async (retried = false): Promise<void> => {
    Keyboard.dismiss();
    try {
      const res = await ImagePicker.launchImageLibraryAsync(PICKER_OPTIONS);
      if (!res.canceled && res.assets[0]) acceptPhoto(res.assets[0].uri);
    } catch {
      if (!retried) {
        const perm = await ImagePicker.requestMediaLibraryPermissionsAsync().catch(() => null);
        if (perm?.granted) return choosePhoto(true);
      }
      askForSettings(t('entry.photosOff'), t('entry.photosOffBody'));
    }
  };

  const removePhoto = () => {
    Haptics.selectionAsync().catch(() => {});
    setPhoto(undefined);
  };

  // ── Save / delete ────────────────────────────────────────────────────────

  const save = async () => {
    if (!canSave || saving) return;
    setSaving(true);
    Keyboard.dismiss();
    try {
      const photoUri = photo && photo !== initial?.photoUri ? await savePhoto(photo, entryId) : photo;
      upsertDiary({
        id: entryId,
        kind,
        at: at.getTime(),
        week: weekAt(at),
        text: text.trim() || undefined,
        mood: kind === 'note' ? mood : undefined,
        photoUri,
      });
      if (initial?.photoUri && initial.photoUri !== photoUri) deletePhoto(initial.photoUri);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      leave();
    } catch {
      setSaving(false);
      Alert.alert(t('c.error'));
    }
  };

  const confirmDelete = () => {
    if (!initial) return;
    Alert.alert(t('entry.deleteConfirm'), initial.photoUri ? t('entry.deletePhotoBody') : t('c.deleteConfirmBody'), [
      { text: t('c.cancel'), style: 'cancel' },
      {
        text: t('c.delete'),
        style: 'destructive',
        onPress: () => {
          removeDiary(initial.id);
          deletePhoto(initial.photoUri);
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
          leave();
        },
      },
    ]);
  };

  const pickDay = (d: Date) => {
    const next = new Date(d.getFullYear(), d.getMonth(), d.getDate(), at.getHours(), at.getMinutes());
    setAt(next.getTime() > Date.now() ? new Date() : next);
  };

  const applyPrompt = (key: string) => {
    setText(letter(key));
    setTimeout(() => textRef.current?.focus(), 60);
  };

  const revealEnd = () => setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 280);

  if (params.id && !initial) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.base }}>
        <NavBar close onBack={leave} />
        <EmptyState emoji="🍃" title={t('entry.notFound')} />
      </View>
    );
  }

  // ── Sections ─────────────────────────────────────────────────────────────

  const bumpSection = (
    <View>
      <View style={{ borderRadius: 28, ...shadow.card }}>
        <View style={{ aspectRatio: 3 / 4, borderRadius: 28, overflow: 'hidden', backgroundColor: colors.blush }}>
          {photo ? (
            <>
              <Image
                source={{ uri: photoSrc(photo) }}
                style={{ flex: 1 }}
                contentFit="cover"
                cachePolicy="memory"
                transition={250}
                accessibilityLabel={t('jr.bumpEntry')}
              />
              {week > 0 ? <WeekPill label={t('c.weekN', { n: week })} /> : null}
              <View style={{ position: 'absolute', right: 14, bottom: 14, flexDirection: 'row', gap: 10 }}>
                <CircleButton size={46} bg="rgba(255,255,255,0.92)" onPress={takePhoto} accessibilityLabel={t('entry.takePhoto')}>
                  <Icon.camera size={20} color={colors.ink} />
                </CircleButton>
                <CircleButton size={46} bg="rgba(255,255,255,0.92)" onPress={() => choosePhoto()} accessibilityLabel={t('entry.choosePhoto')}>
                  <Icon.image size={20} color={colors.ink} />
                </CircleButton>
              </View>
            </>
          ) : (
            <Pressable
              onPress={takePhoto}
              accessibilityRole="button"
              accessibilityLabel={t('entry.takePhoto')}
              style={({ pressed }) => ({ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 28, opacity: pressed ? 0.85 : 1 })}
            >
              <View
                pointerEvents="none"
                style={{ position: 'absolute', top: 12, left: 12, right: 12, bottom: 12, borderRadius: 20, borderWidth: 1.5, borderStyle: 'dashed', borderColor: colors.rose }}
              />
              <EmojiBadge emoji="🤰" size={92} bg="rgba(255,255,255,0.8)" />
              <H2 style={{ marginTop: 18, textAlign: 'center' }}>{t('entry.bumpTitle')}</H2>
              <Body mute style={{ textAlign: 'center', marginTop: 6 }}>
                {t('entry.bumpHint')}
              </Body>
              {week > 0 ? <WeekPill label={t('c.weekN', { n: week })} /> : null}
            </Pressable>
          )}
        </View>
      </View>

      {!photo ? (
        <View style={{ flexDirection: 'row', gap: 10, marginTop: 14 }}>
          <Btn style={{ flex: 1 }} onPress={takePhoto}>
            <Icon.camera size={19} color="#fff" />
            <Text style={{ color: '#fff', fontFamily: fonts.bodyBold, fontSize: 15 }}>{t('entry.takePhoto')}</Text>
          </Btn>
          <Btn kind="secondary" style={{ flex: 1 }} onPress={() => choosePhoto()}>
            <Icon.image size={19} color={colors.ink} />
            <Text style={{ color: colors.ink, fontFamily: fonts.bodyBold, fontSize: 15 }}>{t('entry.choosePhoto')}</Text>
          </Btn>
        </View>
      ) : null}

      <Field
        label={up(t('entry.caption'))}
        placeholder={t('entry.captionPh')}
        value={text}
        onChangeText={setText}
        onFocus={revealEnd}
        multiline
        maxLength={600}
        containerStyle={{ marginTop: 22 }}
        style={{ minHeight: 88, textAlignVertical: 'top', lineHeight: 22 }}
      />
    </View>
  );

  const noteSection = (
    <View>
      <Eyebrow>{up(t('entry.moodQ'))}</Eyebrow>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
        {MOODS.map((m) => {
          const sel = mood === m.value;
          return (
            <Pressable
              key={m.value}
              onPress={() => {
                Haptics.selectionAsync().catch(() => {});
                setMood(sel ? undefined : m.value);
              }}
              accessibilityRole="button"
              accessibilityLabel={t(m.label)}
              accessibilityState={{ selected: sel }}
              hitSlop={4}
              style={({ pressed }) => ({
                width: 58,
                height: 58,
                borderRadius: 29,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: sel ? colors.terracottaSoft : colors.surface,
                borderWidth: sel ? 2 : 1,
                borderColor: sel ? colors.terracotta : colors.line,
                transform: [{ scale: pressed ? 0.92 : sel ? 1.06 : 1 }],
              })}
            >
              <Text style={{ fontSize: 28 }} allowFontScaling={false}>
                {m.emoji}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <Text style={{ textAlign: 'center', marginTop: 8, minHeight: 18, fontFamily: fonts.bodyBold, fontSize: 13, color: colors.terracotta }}>
        {mood ? t(MOODS[mood - 1].label) : ''}
      </Text>

      <Field
        ref={textRef}
        value={text}
        onChangeText={setText}
        placeholder={t('entry.notePh')}
        multiline
        maxLength={5000}
        containerStyle={{ marginTop: 10 }}
        style={{ minHeight: 190, textAlignVertical: 'top', fontSize: 16.5, lineHeight: 24 }}
      />

      {!text.trim() ? (
        <View style={{ marginTop: 14 }}>
          <Eyebrow>{up(t('entry.prompts'))}</Eyebrow>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            style={{ marginHorizontal: -20, marginTop: 10 }}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}
          >
            {PROMPTS.map((p) => (
              <Chip key={p.key} small emoji={p.emoji} label={t(p.label)} onPress={() => applyPrompt(p.key)} />
            ))}
          </ScrollView>
        </View>
      ) : null}

      <Eyebrow style={{ marginTop: 22, marginBottom: 10 }}>{up(t('entry.photo'))}</Eyebrow>
      {photo ? (
        <View style={{ alignSelf: 'flex-start' }}>
          <Image
            source={{ uri: photoSrc(photo) }}
            style={{ width: 126, height: 168, borderRadius: 18, backgroundColor: colors.sand }}
            contentFit="cover"
            cachePolicy="memory"
            transition={200}
            accessibilityLabel={t('entry.photo')}
          />
          <Pressable
            onPress={removePhoto}
            accessibilityRole="button"
            accessibilityLabel={t('entry.removePhoto')}
            hitSlop={10}
            style={{
              position: 'absolute',
              top: -8,
              right: -8,
              width: 30,
              height: 30,
              borderRadius: 15,
              backgroundColor: colors.ink,
              borderWidth: 2,
              borderColor: colors.base,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon.close size={14} color="#fff" />
          </Pressable>
        </View>
      ) : (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
          <PillButton icon={Icon.camera} label={t('entry.takePhoto')} onPress={takePhoto} />
          <PillButton icon={Icon.image} label={t('entry.choosePhoto')} onPress={() => choosePhoto()} />
        </View>
      )}
    </View>
  );

  return (
    <View ref={kb.ref} onLayout={kb.measure} style={{ flex: 1, backgroundColor: colors.base }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={kb.offset}
      >
        <NavBar
          close
          onBack={close}
          caption={caption}
          right={
            initial ? (
              <CircleButton onPress={confirmDelete} accessibilityLabel={t('c.delete')}>
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
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 6, paddingBottom: 24 }}
        >
          {kind === 'bump' ? bumpSection : noteSection}

          {/* Date (collapsed: defaults to now) */}
          <Eyebrow style={{ marginTop: 24, marginBottom: 10 }}>{up(t('entry.date'))}</Eyebrow>
          <Pressable
            onPress={() => {
              Haptics.selectionAsync().catch(() => {});
              Keyboard.dismiss();
              setDateOpen((o) => !o);
            }}
            accessibilityRole="button"
            accessibilityState={{ expanded: dateOpen }}
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
            <IconBadge icon={Icon.calendar} hue="sand" size={38} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: fonts.bodyBold, fontSize: 15, color: colors.ink }} numberOfLines={1}>
                {dayText}, {fmt.time(at)}
              </Text>
              {week > 0 ? (
                <Text style={{ fontFamily: fonts.body, fontSize: 13, color: colors.mute, marginTop: 2 }}>{t('c.weekN', { n: week })}</Text>
              ) : null}
            </View>
            <View style={{ transform: [{ rotate: dateOpen ? '90deg' : '0deg' }] }}>
              <Icon.chevR size={18} color={colors.faint} />
            </View>
          </Pressable>
          {dateOpen ? (
            <Animated.View entering={FadeIn.duration(200)} style={{ marginTop: 10 }}>
              <CalendarPicker value={startOfDay(at)} onChange={pickDay} maxDate={new Date()} marked={new Date()} />
            </Animated.View>
          ) : null}

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 22 }}>
            <Icon.lock size={15} color={colors.faint} />
            <Text style={{ fontFamily: fonts.body, fontSize: 12.5, color: colors.faint }}>{t('entry.privacy')}</Text>
          </View>
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
          <Btn onPress={save} disabled={!canSave || saving}>
            {t('c.save')}
          </Btn>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

function WeekPill({ label }: { label: string }) {
  return (
    <View
      style={{
        position: 'absolute',
        top: 14,
        left: 14,
        borderRadius: 999,
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: 'rgba(255,255,255,0.92)',
      }}
    >
      <Text style={{ fontFamily: fonts.bodyBold, fontSize: 13, color: colors.ink }}>{label}</Text>
    </View>
  );
}

function PillButton({ icon: Icn, label, onPress }: { icon: IconCmp; label: string; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        height: 44,
        paddingHorizontal: 16,
        borderRadius: 999,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.line,
        opacity: pressed ? 0.75 : 1,
      })}
    >
      <Icn size={18} color={colors.terracotta} />
      <Text style={{ fontFamily: fonts.bodyBold, fontSize: 14, color: colors.ink }}>{label}</Text>
    </Pressable>
  );
}
