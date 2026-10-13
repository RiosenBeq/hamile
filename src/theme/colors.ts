// Marigold palette — warm, calm, never alarming.
// Verdicts always combine colour + icon + label (never colour alone).

export const colors = {
  base: '#FBF6F0',
  surface: '#FFFFFF',
  sand: '#F4ECE2',
  /** Primary action colour. White text on it passes WCAG AA for bold ≥ 14pt. */
  terracotta: '#C0694B',
  terracottaSoft: '#F6E1D8',
  rose: '#E8C4B8',
  blush: '#F7E4DC',
  peach: '#F9D9C4',
  marigold: '#E3A03A',
  marigoldSoft: '#FBEBD0',
  sage: '#6F9474',
  sageSoft: '#E4EDE3',
  amber: '#D9A05B',
  coral: '#C66B5C',
  ink: '#2A2522',
  ink2: '#4B413B',
  mute: '#776B62',
  faint: '#A99D93',
  line: '#EDE3D7',
  lavender: '#A898C4',
  lavenderSoft: '#EEE9F5',
  sky: '#6F9CC2',
  skySoft: '#E2EDF6',
  danger: '#B4443A',
  dangerSoft: '#F7DEDA',
  shellDark: '#1A1614',
} as const;

export const verdictPalette = {
  safe: { bg: '#E4EEE3', fg: '#35573A', ring: '#6F9474', label: 'Safe' },
  caution: { bg: '#F8EAD3', fg: '#7A5424', ring: '#D9A05B', label: 'Caution' },
  avoid: { bg: '#F4DAD3', fg: '#7A3327', ring: '#C66B5C', label: 'Avoid' },
} as const;

export const hueGradient = {
  rose: ['#F3D5CB', '#E8C4B8', '#D9A99B'],
  sage: ['#D5E3D6', '#B6CBB8', '#94B097'],
  lavender: ['#E1DAEB', '#C3B7D8', '#9C8CBC'],
  amber: ['#F5DEB9', '#E2BA80', '#C99757'],
  sand: ['#F3E9DA', '#E1D0B6', '#C9B58F'],
  sky: ['#DCE8F3', '#B5CDE3', '#86A9C9'],
} as const;

/** Soft tinted backgrounds used behind tool icons and emoji badges. */
export const tint = {
  rose: { bg: '#F8E6E0', fg: '#B0604B' },
  sage: { bg: '#E4EEE3', fg: '#4D7553' },
  lavender: { bg: '#EEE9F5', fg: '#7464A0' },
  amber: { bg: '#FBEBD0', fg: '#A8701F' },
  sand: { bg: '#F4ECE2', fg: '#8A7458' },
  sky: { bg: '#E2EDF6', fg: '#4A7AA3' },
} as const;

export type Hue = keyof typeof hueGradient;
export type Verdict = keyof typeof verdictPalette;
