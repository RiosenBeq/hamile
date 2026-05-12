// Health log — quick capture for weight, blood pressure and glucose. We let
// each reading type have its own gentle hint (it's surprisingly easy to take
// these wrong, and that's where most of the noise comes from in pregnancy data).

import React, { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  Modal,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SubScreenHeader } from '@/components/SubScreen';
import { Card } from '@/components/Card';
import { Btn } from '@/components/Btn';
import { Blob } from '@/components/Blob';
import { Icon } from '@/components/Icon';
import { useAppStore, HealthLog } from '@/store/useAppStore';
import { useT } from '@/i18n';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

type Kind = HealthLog['kind'];

export default function HealthScreen() {
  const t = useT();
  const insets = useSafeAreaInsets();
  const healthLogs = useAppStore((s) => s.healthLogs);
  const addHealthLog = useAppStore((s) => s.addHealthLog);
  const removeHealthLog = useAppStore((s) => s.removeHealthLog);

  const [open, setOpen] = useState(false);
  const [kind, setKind] = useState<Kind>('weight');
  const [weight, setWeight] = useState('');
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [glucose, setGlucose] = useState('');
  const [note, setNote] = useState('');

  const reset = () => {
    setWeight('');
    setSystolic('');
    setDiastolic('');
    setGlucose('');
    setNote('');
  };

  const save = () => {
    const id = `h_${Date.now()}`;
    const at = Date.now();
    const trimmedNote = note.trim() || undefined;
    if (kind === 'weight') {
      const kg = parseFloat(weight.replace(',', '.'));
      if (!isFinite(kg) || kg <= 0) return;
      addHealthLog({ id, at, kind: 'weight', kg, note: trimmedNote });
    } else if (kind === 'bp') {
      const s = parseInt(systolic, 10);
      const d = parseInt(diastolic, 10);
      if (!isFinite(s) || !isFinite(d) || s <= 0 || d <= 0) return;
      addHealthLog({ id, at, kind: 'bp', systolic: s, diastolic: d, note: trimmedNote });
    } else if (kind === 'glucose') {
      const m = parseFloat(glucose.replace(',', '.'));
      if (!isFinite(m) || m <= 0) return;
      addHealthLog({ id, at, kind: 'glucose', mgdl: m, note: trimmedNote });
    }
    reset();
    setOpen(false);
  };

  const grouped = useMemo(() => {
    const w = healthLogs.filter((l) => l.kind === 'weight');
    const bp = healthLogs.filter((l) => l.kind === 'bp');
    const g = healthLogs.filter((l) => l.kind === 'glucose');
    return { w, bp, g };
  }, [healthLogs]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.base }}>
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 280 }}>
        <Blob variant="amber" />
      </View>

      <SubScreenHeader caption={t('health.caption')} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: insets.bottom + 120,
        }}
      >
        <Text
          style={{
            fontFamily: fonts.display,
            fontSize: 30,
            color: colors.ink,
            letterSpacing: -0.4,
            marginTop: 4,
          }}
        >
          {t('health.title')}
        </Text>
        <Text
          style={{
            color: colors.mute,
            fontSize: 14,
            lineHeight: 21,
            marginTop: 10,
            fontFamily: fonts.body,
          }}
        >
          {t('health.intro')}
        </Text>

        {healthLogs.length === 0 ? (
          <View
            style={{
              marginTop: 32,
              padding: 24,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: colors.mute,
                fontSize: 14,
                textAlign: 'center',
                fontFamily: fonts.body,
              }}
            >
              {t('health.empty')}
            </Text>
          </View>
        ) : (
          <>
            <ReadingsSection
              title={t('health.section.weight')}
              rows={grouped.w.slice(0, 5).map((l) => ({
                id: l.id,
                primary: `${(l as any).kg} ${t('health.kg')}`,
                when: l.at,
                note: l.note,
              }))}
              onRemove={removeHealthLog}
              hint={t('health.hint.weight')}
            />
            <ReadingsSection
              title={t('health.section.bp')}
              rows={grouped.bp.slice(0, 5).map((l) => ({
                id: l.id,
                primary: `${(l as any).systolic}/${(l as any).diastolic} ${t('health.mmHg')}`,
                when: l.at,
                note: l.note,
              }))}
              onRemove={removeHealthLog}
              hint={t('health.hint.bp')}
            />
            <ReadingsSection
              title={t('health.section.glucose')}
              rows={grouped.g.slice(0, 5).map((l) => ({
                id: l.id,
                primary: `${(l as any).mgdl} ${t('health.mgdl')}`,
                when: l.at,
                note: l.note,
              }))}
              onRemove={removeHealthLog}
              hint={t('health.hint.glucose')}
            />
          </>
        )}
      </ScrollView>

      {/* Floating add button */}
      <View
        style={{
          position: 'absolute',
          left: 24,
          right: 24,
          bottom: insets.bottom + 16,
        }}
      >
        <Btn onPress={() => setOpen(true)}>{t('health.add')}</Btn>
      </View>

      {/* Add modal */}
      <Modal
        visible={open}
        transparent
        animationType="slide"
        onRequestClose={() => setOpen(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.4)',
            justifyContent: 'flex-end',
          }}
        >
          <View
            style={{
              backgroundColor: colors.base,
              borderTopLeftRadius: 28,
              borderTopRightRadius: 28,
              padding: 24,
              paddingBottom: insets.bottom + 24,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 16,
              }}
            >
              <Text
                style={{
                  fontFamily: fonts.display,
                  fontSize: 22,
                  color: colors.ink,
                  letterSpacing: -0.2,
                }}
              >
                {t('health.add')}
              </Text>
              <Pressable onPress={() => setOpen(false)}>
                <Icon.close size={22} color={colors.mute} />
              </Pressable>
            </View>

            {/* Type chips */}
            <Text
              style={{
                color: colors.mute,
                fontFamily: fonts.bodyBold,
                fontSize: 11,
                letterSpacing: 1.4,
                textTransform: 'uppercase',
                marginBottom: 8,
              }}
            >
              {t('health.unit.select')}
            </Text>
            <View style={{ flexDirection: 'row', gap: 8, marginBottom: 16 }}>
              {(['weight', 'bp', 'glucose'] as Kind[]).map((k) => {
                const active = kind === k;
                return (
                  <Pressable
                    key={k}
                    onPress={() => setKind(k)}
                    style={{
                      paddingHorizontal: 14,
                      height: 36,
                      borderRadius: 18,
                      borderWidth: 1,
                      borderColor: active ? colors.terracotta : colors.line,
                      backgroundColor: active ? colors.terracotta : colors.surface,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text
                      style={{
                        color: active ? '#fff' : colors.ink,
                        fontFamily: active ? fonts.bodyBold : fonts.body,
                        fontSize: 13,
                      }}
                    >
                      {t(`health.type.${k}`)}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {/* Inputs */}
            {kind === 'weight' ? (
              <Field
                label={t('health.weight')}
                unit={t('health.kg')}
                value={weight}
                onChange={setWeight}
                hint={t('health.hint.weight')}
              />
            ) : null}

            {kind === 'bp' ? (
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <View style={{ flex: 1 }}>
                  <Field
                    label={t('health.systolic')}
                    unit={t('health.mmHg')}
                    value={systolic}
                    onChange={setSystolic}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Field
                    label={t('health.diastolic')}
                    unit={t('health.mmHg')}
                    value={diastolic}
                    onChange={setDiastolic}
                  />
                </View>
              </View>
            ) : null}

            {kind === 'bp' ? (
              <Text
                style={{
                  color: colors.mute,
                  fontSize: 12.5,
                  marginTop: 8,
                  fontFamily: fonts.body,
                }}
              >
                {t('health.hint.bp')}
              </Text>
            ) : null}

            {kind === 'glucose' ? (
              <Field
                label={t('health.glucose')}
                unit={t('health.mgdl')}
                value={glucose}
                onChange={setGlucose}
                hint={t('health.hint.glucose')}
              />
            ) : null}

            {/* Note */}
            <Text
              style={{
                color: colors.mute,
                fontFamily: fonts.bodyBold,
                fontSize: 11,
                letterSpacing: 1.4,
                textTransform: 'uppercase',
                marginTop: 16,
                marginBottom: 6,
              }}
            >
              {t('health.notes')}
            </Text>
            <TextInput
              placeholder={t('health.notesPlaceholder')}
              placeholderTextColor={colors.mute}
              value={note}
              onChangeText={setNote}
              multiline
              style={{
                backgroundColor: colors.surface,
                borderRadius: 14,
                borderWidth: 1,
                borderColor: colors.line,
                padding: 14,
                minHeight: 64,
                color: colors.ink,
                fontFamily: fonts.body,
                fontSize: 14.5,
              }}
            />

            <Btn onPress={save} style={{ marginTop: 20 }}>
              {t('common.save')}
            </Btn>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function Field({
  label,
  unit,
  value,
  onChange,
  hint,
}: {
  label: string;
  unit: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
}) {
  return (
    <View>
      <Text
        style={{
          color: colors.mute,
          fontFamily: fonts.bodyBold,
          fontSize: 11,
          letterSpacing: 1.4,
          textTransform: 'uppercase',
          marginBottom: 6,
        }}
      >
        {label}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.surface,
          borderRadius: 14,
          borderWidth: 1,
          borderColor: colors.line,
          paddingHorizontal: 14,
        }}
      >
        <TextInput
          value={value}
          onChangeText={onChange}
          keyboardType="decimal-pad"
          style={{
            flex: 1,
            fontFamily: fonts.display,
            fontSize: 22,
            color: colors.ink,
            paddingVertical: 12,
          }}
        />
        <Text style={{ color: colors.mute, fontFamily: fonts.body, fontSize: 13 }}>{unit}</Text>
      </View>
      {hint ? (
        <Text
          style={{
            color: colors.mute,
            fontSize: 12.5,
            marginTop: 8,
            fontFamily: fonts.body,
          }}
        >
          {hint}
        </Text>
      ) : null}
    </View>
  );
}

function ReadingsSection({
  title,
  rows,
  onRemove,
  hint,
}: {
  title: string;
  rows: { id: string; primary: string; when: number; note?: string }[];
  onRemove: (id: string) => void;
  hint?: string;
}) {
  if (rows.length === 0) return null;
  return (
    <View style={{ marginTop: 24 }}>
      <Text
        style={{
          color: colors.mute,
          fontFamily: fonts.bodyBold,
          fontSize: 11,
          letterSpacing: 1.6,
          textTransform: 'uppercase',
          marginBottom: 10,
        }}
      >
        {title}
      </Text>
      <Card>
        {rows.map((r, i, arr) => (
          <View key={r.id}>
            <View
              style={{
                padding: 16,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    color: colors.ink,
                    fontFamily: fonts.display,
                    fontSize: 18,
                    letterSpacing: -0.2,
                  }}
                >
                  {r.primary}
                </Text>
                <Text
                  style={{
                    color: colors.mute,
                    fontSize: 12.5,
                    marginTop: 2,
                    fontFamily: fonts.body,
                  }}
                >
                  {new Date(r.when).toLocaleString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                  {r.note ? ` · ${r.note}` : ''}
                </Text>
              </View>
              <Pressable onPress={() => onRemove(r.id)} hitSlop={10}>
                <Icon.close size={16} color={colors.mute} />
              </Pressable>
            </View>
            {i < arr.length - 1 ? (
              <View
                style={{
                  height: 1,
                  backgroundColor: colors.line,
                  marginLeft: 16,
                }}
              />
            ) : null}
          </View>
        ))}
      </Card>
      {hint ? (
        <Text
          style={{
            color: colors.mute,
            fontSize: 12.5,
            marginTop: 10,
            fontFamily: fonts.body,
          }}
        >
          {hint}
        </Text>
      ) : null}
    </View>
  );
}
