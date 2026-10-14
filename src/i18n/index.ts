// Tiny i18n hook. Reads the active language from the app store, falls back to
// English, and supports {name} style interpolation.
//
// Usage:
//   const t = useT();
//   <Text>{t('kicks.title')}</Text>
//   <Text>{t('kicks.complete.title', { minutes: 42 })}</Text>
//
// Bundled content (weeks, safety library, symptoms…) is stored as
// `{ en, tr, es?, de?, fr?, pt? }` objects — read it with `useL10n()`, which
// falls back to English for anything not translated.

import { useCallback } from 'react';
import { NativeModules, Platform } from 'react-native';
import { useAppStore } from '@/store/useAppStore';
import { TRANSLATIONS, LangCode, SUPPORTED_LANGS } from './translations';
import type { L10n, L10nList } from '@/content/types';

export type Vars = Record<string, string | number>;

export function translate(lang: LangCode, key: string, vars?: Vars): string {
  const dict = TRANSLATIONS[lang] ?? TRANSLATIONS.en;
  const raw = dict[key] ?? TRANSLATIONS.en[key] ?? key;
  if (!vars) return raw;
  return raw.replace(/\{(\w+)\}/g, (_m, k) => String(vars[k] ?? `{${k}}`));
}

export function useT() {
  const lang = useAppStore((s) => s.language);
  return useCallback((key: string, vars?: Vars) => translate(lang, key, vars), [lang]);
}

export function useLang(): LangCode {
  return useAppStore((s) => s.language);
}

/** Pick the active language from a bundled L10n string (English fallback). */
export function useL10n() {
  const lang = useAppStore((s) => s.language);
  return useCallback((v: L10n | undefined | null): string => (v ? v[lang] ?? v.en : ''), [lang]);
}

/** Pick the active language from a bundled L10n list (English fallback). */
export function useL10nList() {
  const lang = useAppStore((s) => s.language);
  return useCallback((v: L10nList | undefined | null): string[] => (v ? v[lang] ?? v.en : []), [lang]);
}

export const LOCALE_FOR_LANG: Record<LangCode, string> = {
  en: 'en-US',
  tr: 'tr-TR',
  es: 'es-ES',
  de: 'de-DE',
  fr: 'fr-FR',
  pt: 'pt-BR',
};

/**
 * BCP-47 locale for dates and numbers. Uses the device region when it speaks
 * the same language (es-MX, de-AT, fr-CA, en-GB…), else a sensible default.
 */
export function localeFor(lang: LangCode): string {
  const region = detectRegion();
  if (region) {
    const candidate = `${lang}-${region}`;
    try {
      if (Intl.DateTimeFormat.supportedLocalesOf([candidate]).length) return candidate;
    } catch {
      // Older engines without supportedLocalesOf: fall through.
    }
  }
  return LOCALE_FOR_LANG[lang] ?? 'en-US';
}

/** Locale-aware date formatting helper bound to the active language. */
export function useFormat() {
  const lang = useAppStore((s) => s.language);
  const locale = localeFor(lang);
  return {
    locale,
    date: (d: Date | number, opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' }) =>
      new Date(d).toLocaleDateString(locale, opts),
    time: (d: Date | number) =>
      new Date(d).toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' }),
    weekday: (d: Date | number) => new Date(d).toLocaleDateString(locale, { weekday: 'long' }),
    short: (d: Date | number) => new Date(d).toLocaleDateString(locale, { day: 'numeric', month: 'short' }),
  };
}

// Detect the device's preferred language without pulling in a native dep.
// Falls back to 'en' if anything looks off or isn't in SUPPORTED_LANGS.
export function detectSystemLanguage(): LangCode {
  let raw = 'en';
  try {
    if (Platform.OS === 'ios') {
      raw =
        NativeModules.SettingsManager?.settings?.AppleLocale ||
        NativeModules.SettingsManager?.settings?.AppleLanguages?.[0] ||
        'en';
    } else if (Platform.OS === 'android') {
      raw = NativeModules.I18nManager?.localeIdentifier || 'en';
    } else {
      raw = (typeof navigator !== 'undefined' && (navigator as any).language) || 'en';
    }
  } catch {
    raw = 'en';
  }
  const code = String(raw).toLowerCase().slice(0, 2);
  return SUPPORTED_LANGS.some((l) => l.code === code) ? (code as LangCode) : 'en';
}

let cachedRegion: string | null = null;

/** Best-effort region code from the device locale ("TR", "US", "GB"…). */
export function detectRegion(): string {
  if (cachedRegion !== null) return cachedRegion;
  let raw = '';
  try {
    if (Platform.OS === 'ios') {
      raw = NativeModules.SettingsManager?.settings?.AppleLocale || '';
    } else if (Platform.OS === 'android') {
      raw = NativeModules.I18nManager?.localeIdentifier || '';
    } else {
      raw = (typeof navigator !== 'undefined' && (navigator as any).language) || '';
    }
  } catch {
    raw = '';
  }
  const m = String(raw).match(/[-_]([A-Za-z]{2})\b/);
  cachedRegion = m ? m[1].toUpperCase() : '';
  return cachedRegion;
}

export { SUPPORTED_LANGS } from './translations';
export type { LangCode };
