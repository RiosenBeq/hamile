// Tiny i18n hook. Reads the active language from the app store, falls back to
// English, and supports {name} style interpolation.
//
// Usage:
//   const t = useT();
//   <Text>{t('kicks.title')}</Text>
//   <Text>{t('kicks.complete.title', { minutes: 42 })}</Text>

import { NativeModules, Platform } from 'react-native';
import { useAppStore } from '@/store/useAppStore';
import { TRANSLATIONS, LangCode, SUPPORTED_LANGS } from './translations';

export type Vars = Record<string, string | number>;

export function translate(lang: LangCode, key: string, vars?: Vars): string {
  const dict = TRANSLATIONS[lang] ?? TRANSLATIONS.en;
  const raw = dict[key] ?? TRANSLATIONS.en[key] ?? key;
  if (!vars) return raw;
  return raw.replace(/\{(\w+)\}/g, (_m, k) => String(vars[k] ?? `{${k}}`));
}

export function useT() {
  const lang = useAppStore((s) => s.language);
  return (key: string, vars?: Vars) => translate(lang, key, vars);
}

export function useLang(): LangCode {
  return useAppStore((s) => s.language);
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

export { SUPPORTED_LANGS } from './translations';
export type { LangCode };
