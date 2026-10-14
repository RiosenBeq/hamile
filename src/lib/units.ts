// Metric / imperial formatting for baby measurements and the weight tracker.
// Numbers follow the app language's locale ("1.6 cm" en, "1,6 cm" de/fr/es…)
// and a no-break space keeps a value and its unit on the same line.

import type { Units } from '@/store/types';

const NBSP = '\u00A0';
let numberLocale = 'en-US';

/** Called by the root layout whenever the app language changes. */
export function setUnitsLocale(locale: string) {
  numberLocale = locale;
}

function num(v: number, maxDigits: number, minDigits = 0): string {
  try {
    return v.toLocaleString(numberLocale, { minimumFractionDigits: minDigits, maximumFractionDigits: maxDigits });
  } catch {
    return v.toFixed(maxDigits);
  }
}

const unit = (value: string, u: string) => `${value}${NBSP}${u}`;

export function formatLength(cm: number, units: Units = 'metric'): string {
  if (units === 'imperial') {
    const inches = cm / 2.54;
    return unit(inches < 10 ? num(inches, 1, 1) : num(Math.round(inches), 0), 'in');
  }
  return unit(cm < 10 ? num(cm, 1) : num(Math.round(cm), 0), 'cm');
}

export function formatWeight(grams: number, units: Units = 'metric'): string {
  if (units === 'imperial') {
    const oz = grams / 28.3495;
    if (oz < 16) return unit(oz < 1 ? num(oz, 2, 2) : num(oz, 1, 1), 'oz');
    const lb = Math.floor(oz / 16);
    const rest = Math.round(oz - lb * 16);
    return rest ? `${unit(String(lb), 'lb')} ${unit(String(rest), 'oz')}` : unit(String(lb), 'lb');
  }
  if (grams < 1) return unit('<1', 'g');
  if (grams < 1000) return unit(num(Math.round(grams), 0), 'g');
  return unit(num(grams / 1000, grams < 10000 ? 2 : 1, 1), 'kg');
}

export const kgToLb = (kg: number) => kg * 2.20462;
export const lbToKg = (lb: number) => lb / 2.20462;

export function formatBodyWeight(kg: number, units: Units = 'metric'): string {
  return units === 'imperial' ? unit(num(kgToLb(kg), 1, 1), 'lb') : unit(num(kg, 1, 1), 'kg');
}
