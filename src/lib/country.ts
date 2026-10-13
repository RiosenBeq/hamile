// Resolve the user's country (ISO alpha-2) for emergency numbers. Older builds
// stored English country names; new installs fall back to the device region.

import { EMERGENCY_NUMBERS } from '@/content';
import { detectRegion } from '@/i18n';

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

export function resolveCountry(raw: string | undefined): string {
  if (raw && EMERGENCY_NUMBERS[raw]) return raw;
  if (raw && LEGACY_COUNTRY[raw]) return LEGACY_COUNTRY[raw];
  const region = detectRegion();
  return EMERGENCY_NUMBERS[region] ? region : 'TR';
}

export function emergencyNumberFor(raw: string | undefined): string {
  return EMERGENCY_NUMBERS[resolveCountry(raw)]?.number ?? '112';
}
