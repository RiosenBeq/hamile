// Pregnancy checklist — practical to-dos by trimester with suggested weeks,
// expandable details, per-trimester progress and a small celebration when a
// trimester is all ticked off.

import React, { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
  ZoomIn,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Icon } from '@/components/Icon';
import { Body, EmojiBadge, Eyebrow, H1, MedicalNote, NavBar, Page, Segmented, Surface } from '@/components/ui';
import { useAppStore } from '@/store/useAppStore';
import { usePregnancy } from '@/lib/usePregnancy';
import { CHECKLIST } from '@/content';
import type { ChecklistItem } from '@/content';
import { useL10n, useT } from '@/i18n';
import { colors, tint } from '@/theme/colors';
import { fonts } from '@/theme/typography';

type Tri = '1' | '2' | '3';
const TRIS: Tri[] = ['1', '2', '3'];

// Bundled order is already curated by suggested week.
const BY_TRIMESTER: Record<Tri, ChecklistItem[]> = {
  '1': CHECKLIST.filter((c) => c.trimester === 1),
  '2': CHECKLIST.filter((c) => c.trimester === 2),
  '3': CHECKLIST.filter((c) => c.trimester === 3),
};

// Items that have a matching tool get a shortcut in their details.
const TOOL_LINKS = {
  'start-folic-acid': { route: '/tools/vitamins', label: 'tools.vitamins' },
  'pelvic-floor-exercises': { route: '/tools/kegel', label: 'tools.kegel' },
  'know-baby-movements': { route: '/tools/kick-counter', label: 'tools.kicks' },
  'write-birth-plan': { route: '/tools/birth-plan', label: 'tools.birthPlan' },
  'pack-hospital-bag': { route: '/tools/hospital-bag', label: 'tools.bag' },
} as const;
type ToolLink = (typeof TOOL_LINKS)[keyof typeof TOOL_LINKS];
const linkFor = (id: string): ToolLink | undefined => (TOOL_LINKS as Record<string, ToolLink>)[id];

export default function Checklist() {
  const t = useT();
  const router = useRouter();
  const p = usePregnancy();
  const done = useAppStore((s) => s.checklistDone);
  const toggle = useAppStore((s) => s.toggleChecklist);
  const [tri, setTri] = useState<Tri>(p ? (String(p.trimester) as Tri) : '1');
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [justDone, setJustDone] = useState<Tri | null>(null);

  const items = BY_TRIMESTER[tri];
  const doneCount = items.filter((i) => done[i.id]).length;
  const allDone = items.length > 0 && doneCount === items.length;

  const onToggle = (item: ChecklistItem) => {
    // Read the store directly so quick successive taps never see a stale render.
    const before = useAppStore.getState().checklistDone;
    toggle(item.id);
    if (before[item.id]) {
      Haptics.selectionAsync().catch(() => {});
      if (justDone === tri) setJustDone(null);
      return;
    }
    if (items.every((i) => i.id === item.id || before[i.id])) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      setJustDone(tri);
      AccessibilityInfo.announceForAccessibility(t('cl.allDoneTitle', { n: tri }));
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
  };

  const toggleOpen = (id: string) => {
    Haptics.selectionAsync().catch(() => {});
    setOpen((o) => ({ ...o, [id]: !o[id] }));
  };

  return (
    <Page header={<NavBar caption={t('tools.checklist')} />}>
      <View style={{ paddingHorizontal: 20, paddingTop: 4 }}>
        {p ? <Eyebrow style={{ marginBottom: 6 }}>{t('cl.youAre', { n: p.trimester, w: p.weeks })}</Eyebrow> : null}
        <H1>{t('cl.title')}</H1>
        <Body mute style={{ marginTop: 8 }}>
          {t('cl.intro')}
        </Body>
      </View>

      <View style={{ paddingHorizontal: 20, marginTop: 18 }}>
        <Segmented
          options={TRIS.map((n) => ({ value: n, label: t('c.trimesterN', { n }) }))}
          value={tri}
          onChange={(v) => setTri(v)}
        />
      </View>

      <View style={{ paddingHorizontal: 20, marginTop: 14 }}>
        <Surface>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <Text accessibilityLiveRegion="polite" style={{ flex: 1, fontFamily: fonts.bodyBold, fontSize: 15.5, color: colors.ink }}>
              {t('cl.progress', { done: doneCount, total: items.length })}
            </Text>
            <Text style={{ fontFamily: fonts.display, fontSize: 20, color: tint.amber.fg }}>
              {Math.round((doneCount / Math.max(1, items.length)) * 100)}%
            </Text>
          </View>
          <AnimatedBar value={doneCount / Math.max(1, items.length)} />
        </Surface>
      </View>

      {allDone ? (
        <Animated.View
          key={`done-${tri}`}
          entering={justDone === tri ? ZoomIn.springify().damping(13) : FadeIn.duration(250)}
          style={{ paddingHorizontal: 20, marginTop: 14 }}
        >
          <Surface style={{ backgroundColor: colors.marigoldSoft, shadowOpacity: 0, flexDirection: 'row', alignItems: 'center', gap: 14 }}>
            <Wiggle active={justDone === tri}>
              <EmojiBadge emoji="🎉" size={52} bg="#fff" />
            </Wiggle>
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: fonts.display, fontSize: 20, lineHeight: 26, color: colors.ink }}>{t('cl.allDoneTitle', { n: tri })}</Text>
              <Text style={{ fontFamily: fonts.body, fontSize: 14, lineHeight: 20, color: colors.ink2, marginTop: 2 }}>{t('cl.allDoneBody')}</Text>
            </View>
          </Surface>
        </Animated.View>
      ) : null}

      <View style={{ paddingHorizontal: 20, marginTop: 14 }}>
        <Surface padded={false}>
          {items.map((item, i) => {
            const link = linkFor(item.id);
            return (
              <ItemRow
                key={item.id}
                item={item}
                done={!!done[item.id]}
                open={!!open[item.id]}
                due={!!p && !!item.week && p.weeks >= item.week && !done[item.id]}
                last={i === items.length - 1}
                onToggle={() => onToggle(item)}
                onExpand={() => toggleOpen(item.id)}
                linkLabel={link ? t('cl.openTool', { tool: t(link.label) }) : undefined}
                onLink={link ? () => router.push(link.route) : undefined}
              />
            );
          })}
        </Surface>
      </View>

      <Text style={{ paddingHorizontal: 24, marginTop: 16, fontFamily: fonts.body, fontSize: 13, lineHeight: 19, color: colors.mute }}>
        {t('cl.localNote')}
      </Text>
      <MedicalNote text={t('c.medicalNote')} />
    </Page>
  );
}

// ── Rows ───────────────────────────────────────────────────────────────────

function ItemRow({
  item,
  done,
  open,
  due,
  last,
  onToggle,
  onExpand,
  linkLabel,
  onLink,
}: {
  item: ChecklistItem;
  done: boolean;
  open: boolean;
  due: boolean;
  last: boolean;
  onToggle: () => void;
  onExpand: () => void;
  linkLabel?: string;
  onLink?: () => void;
}) {
  const t = useT();
  const L = useL10n();
  const title = L(item.title);
  const detail = item.detail ? L(item.detail) : '';
  const weekLabel = item.week ? t('c.weekN', { n: item.week }) : '';

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
        paddingLeft: 14,
        paddingRight: 16,
        paddingVertical: 14,
        borderBottomWidth: last ? 0 : 1,
        borderBottomColor: colors.line,
      }}
    >
      <CheckButton checked={done} onPress={onToggle} label={title} />
      <View style={{ flex: 1 }}>
        <Pressable
          onPress={detail ? onExpand : onToggle}
          accessibilityRole="button"
          accessibilityLabel={weekLabel ? `${title}, ${weekLabel}` : title}
          accessibilityState={detail ? { expanded: open } : { checked: done }}
          accessibilityHint={detail ? (open ? t('cl.collapseHint') : t('cl.expandHint')) : undefined}
          style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
        >
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
            <Text
              style={{
                flex: 1,
                fontFamily: fonts.bodyBold,
                fontSize: 15.5,
                lineHeight: 21,
                color: done ? colors.mute : colors.ink,
                textDecorationLine: done ? 'line-through' : 'none',
              }}
            >
              {title}
            </Text>
            {detail ? (
              <View style={{ paddingTop: 2, transform: [{ rotate: open ? '90deg' : '0deg' }] }}>
                <Icon.chevR size={16} color={colors.faint} />
              </View>
            ) : null}
          </View>
          {weekLabel ? (
            <View
              style={{
                alignSelf: 'flex-start',
                marginTop: 7,
                paddingHorizontal: 9,
                paddingVertical: 3,
                borderRadius: 999,
                backgroundColor: due ? colors.terracottaSoft : colors.sand,
              }}
            >
              <Text style={{ fontFamily: fonts.bodyBold, fontSize: 11.5, color: due ? colors.terracotta : colors.mute }}>{weekLabel}</Text>
            </View>
          ) : null}
        </Pressable>
        {open && detail ? (
          <Animated.View entering={FadeIn.duration(220)}>
            <Body style={{ fontSize: 14.5, lineHeight: 21, marginTop: 10 }}>{detail}</Body>
            {linkLabel && onLink ? (
              <Pressable
                onPress={onLink}
                accessibilityRole="link"
                accessibilityLabel={linkLabel}
                hitSlop={6}
                style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 10, opacity: pressed ? 0.6 : 1 })}
              >
                <Text style={{ fontFamily: fonts.bodyBold, fontSize: 14, color: colors.terracotta }}>{linkLabel}</Text>
                <Icon.arrow size={14} color={colors.terracotta} />
              </Pressable>
            ) : null}
          </Animated.View>
        ) : null}
      </View>
    </View>
  );
}

function CheckButton({ checked, onPress, label }: { checked: boolean; onPress: () => void; label: string }) {
  const scale = useSharedValue(1);
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (checked) scale.value = withSequence(withTiming(1.2, { duration: 110 }), withSpring(1, { damping: 9, stiffness: 240 }));
  }, [checked, scale]);
  const style = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Pressable onPress={onPress} accessibilityRole="checkbox" accessibilityState={{ checked }} accessibilityLabel={label} hitSlop={10}>
      <Animated.View
        style={[
          {
            width: 28,
            height: 28,
            borderRadius: 14,
            borderWidth: 1.5,
            borderColor: checked ? colors.sage : '#D8CCBF',
            backgroundColor: checked ? colors.sage : colors.surface,
            alignItems: 'center',
            justifyContent: 'center',
          },
          style,
        ]}
      >
        {checked ? <Icon.check size={17} color="#fff" /> : null}
      </Animated.View>
    </Pressable>
  );
}

function AnimatedBar({ value }: { value: number }) {
  const v = useSharedValue(value);
  useEffect(() => {
    v.value = withTiming(Math.max(0, Math.min(1, value)), { duration: 450 });
  }, [value, v]);
  const style = useAnimatedStyle(() => ({ width: `${v.value * 100}%` }));
  return (
    <View style={{ height: 8, borderRadius: 4, backgroundColor: colors.marigoldSoft, overflow: 'hidden', marginTop: 12 }}>
      <Animated.View style={[{ height: '100%', borderRadius: 4, backgroundColor: colors.marigold }, style]} />
    </View>
  );
}

/** A happy little wobble, played once when a trimester is completed. */
function Wiggle({ active, children }: { active: boolean; children: React.ReactNode }) {
  const r = useSharedValue(0);
  useEffect(() => {
    if (!active) return;
    r.value = withDelay(
      250,
      withSequence(
        withTiming(-12, { duration: 90 }),
        withTiming(12, { duration: 120 }),
        withTiming(-8, { duration: 110 }),
        withTiming(6, { duration: 100 }),
        withTiming(0, { duration: 90 }),
      ),
    );
  }, [active, r]);
  const style = useAnimatedStyle(() => ({ transform: [{ rotate: `${r.value}deg` }] }));
  return <Animated.View style={style}>{children}</Animated.View>;
}
