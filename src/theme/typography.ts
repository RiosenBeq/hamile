// Marigold typography — warm serif (Source Serif 4) for display, humanist
// sans (Manrope) for UI. We load via @expo/google-fonts in app/_layout.tsx.

import { TextStyle } from 'react-native';

export const fonts = {
  display: 'SourceSerif_600SemiBold',
  displayBold: 'SourceSerif_700Bold',
  body: 'Manrope_500Medium',
  bodyBold: 'Manrope_700Bold',
} as const;

const tracking = (em: number, fontSize: number) => em * fontSize;

export const text = {
  // Display sizes — used for hero headlines and the giant week count.
  hero: {
    fontFamily: fonts.display,
    fontSize: 40,
    lineHeight: 42,
    letterSpacing: tracking(-0.02, 40),
  } satisfies TextStyle,
  display: {
    fontFamily: fonts.display,
    fontSize: 34,
    lineHeight: 36,
    letterSpacing: tracking(-0.02, 34),
  } satisfies TextStyle,
  title: {
    fontFamily: fonts.display,
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: tracking(-0.02, 30),
  } satisfies TextStyle,
  cardTitle: {
    fontFamily: fonts.display,
    fontSize: 24,
    lineHeight: 30,
    letterSpacing: tracking(-0.01, 24),
  } satisfies TextStyle,
  sectionTitle: {
    fontFamily: fonts.display,
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: tracking(-0.01, 22),
  } satisfies TextStyle,

  // Body sizes
  body: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 24,
  } satisfies TextStyle,
  bodySmall: {
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 22,
  } satisfies TextStyle,
  bodyMute: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 20,
  } satisfies TextStyle,
  caption: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 1.8,
    textTransform: 'uppercase' as const,
  } satisfies TextStyle,
  label: {
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 18,
  } satisfies TextStyle,
};

export const radii = { card: 20, btn: 14, pill: 9999 } as const;
export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, '2xl': 24, '3xl': 32 } as const;
