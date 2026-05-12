// Tiny i18n hook. Reads the active language from the app store, falls back to
// English, and supports {name} style interpolation.
//
// Usage:
//   const t = useT();
//   <Text>{t('kicks.title')}</Text>
//   <Text>{t('kicks.complete.title', { minutes: 42 })}</Text>

import { useAppStore } from '@/store/useAppStore';
import { TRANSLATIONS, LangCode } from './translations';

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

export { SUPPORTED_LANGS } from './translations';
export type { LangCode };
