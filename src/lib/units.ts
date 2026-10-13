// Metric / imperial formatting for baby measurements and the weight tracker.

import type { Units } from '@/store/types';

export function formatLength(cm: number, units: Units = 'metric'): string {
  if (units === 'imperial') {
    const inches = cm / 2.54;
    return inches < 10 ? `${inches.toFixed(1)} in` : `${Math.round(inches)} in`;
  }
  return cm < 10 ? `${cm.toFixed(1).replace(/\.0$/, '')} cm` : `${Math.round(cm)} cm`;
}

export function formatWeight(grams: number, units: Units = 'metric'): string {
  if (units === 'imperial') {
    const oz = grams / 28.3495;
    if (oz < 16) return `${oz < 1 ? oz.toFixed(2) : oz.toFixed(1)} oz`;
    const lb = Math.floor(oz / 16);
    const rest = Math.round(oz - lb * 16);
    return rest ? `${lb} lb ${rest} oz` : `${lb} lb`;
  }
  if (grams < 1) return '<1 g';
  if (grams < 1000) return `${Math.round(grams)} g`;
  return `${(grams / 1000).toFixed(grams < 10000 ? 2 : 1).replace(/0$/, '')} kg`;
}

export const kgToLb = (kg: number) => kg * 2.20462;
export const lbToKg = (lb: number) => lb / 2.20462;

export function formatBodyWeight(kg: number, units: Units = 'metric'): string {
  return units === 'imperial' ? `${kgToLb(kg).toFixed(1)} lb` : `${kg.toFixed(1)} kg`;
}
