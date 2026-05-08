// Marigold palette — warm, calm, never alarming.
// Verdicts always combine colour + icon + label (never colour alone).

export const colors = {
  base: '#FBF7F2',
  surface: '#FFFFFF',
  sand: '#F4EDE4',
  terracotta: '#C77B5C',
  rose: '#E8C4B8',
  sage: '#7B9B7E',
  amber: '#D9A05B',
  coral: '#C66B5C',
  ink: '#2A2522',
  mute: '#7A6F66',
  line: '#EDE4D8',
  lavender: '#B5A8C9',
  shellDark: '#1A1614',
} as const;

export const verdictPalette = {
  safe: { bg: '#EAF0E9', fg: '#3F5C42', ring: '#7B9B7E', label: 'Safe' },
  caution: { bg: '#F8EAD3', fg: '#7A5424', ring: '#D9A05B', label: 'Caution' },
  avoid: { bg: '#F1D8D1', fg: '#7A3327', ring: '#C66B5C', label: 'Avoid' },
} as const;

export const hueGradient = {
  rose: ['#F0CDC1', '#E8C4B8', '#D9A99B'],
  sage: ['#CFDDD0', '#B6CBB8', '#94B097'],
  lavender: ['#D9D1E3', '#B5A8C9', '#9385B0'],
  amber: ['#F2D7AE', '#E2BA80', '#C99757'],
  sand: ['#F2E7D6', '#E1D0B6', '#C9B58F'],
} as const;

export type Hue = keyof typeof hueGradient;
export type Verdict = keyof typeof verdictPalette;
