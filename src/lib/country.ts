// Resolve the user's country (ISO alpha-2) for emergency numbers. Older builds
// stored English country names; new installs fall back to the device region.

import { EMERGENCY_NUMBERS } from '@/content';
import { detectRegion, type LangCode } from '@/i18n';

const LEGACY_COUNTRY: Record<string, string> = {
  'United Kingdom': 'GB',
  'United States': 'US',
  Turkey: 'TR',
  France: 'FR',
  Germany: 'DE',
  Italy: 'IT',
  Spain: 'ES',
  Netherlands: 'NL',
  Sweden: 'SE',
  Ireland: 'IE',
  Australia: 'AU',
  Canada: 'CA',
};

/** Where to assume the user is when the device region isn't in our table. */
const FALLBACK_FOR_LANG: Record<LangCode, string> = { en: 'US', tr: 'TR', es: 'ES', de: 'DE', fr: 'FR', pt: 'BR' };

export function resolveCountry(raw: string | undefined, lang?: LangCode): string {
  if (raw && EMERGENCY_NUMBERS[raw]) return raw;
  if (raw && LEGACY_COUNTRY[raw]) return LEGACY_COUNTRY[raw];
  const region = detectRegion();
  if (EMERGENCY_NUMBERS[region]) return region;
  return (lang && FALLBACK_FOR_LANG[lang]) || 'TR';
}

export function emergencyNumberFor(raw: string | undefined, lang?: LangCode): string {
  return EMERGENCY_NUMBERS[resolveCountry(raw, lang)]?.number ?? '112';
}
