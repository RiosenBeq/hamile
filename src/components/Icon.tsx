// Marigold custom 1.5px-stroke line icons. Rounded caps. Never SF defaults.
// Faithful port of the design's `Icon` map.

import React from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

type IconProps = { size?: number; color?: string };

const wrap = (children: React.ReactNode) => {
  const IconComponent = ({ size = 24, color = '#2A2522' }: IconProps) => (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </Svg>
  );
  IconComponent.displayName = 'Icon';
  return IconComponent;
};

export const Icon = {
  home: wrap(
    <>
      <Path d="M4 11.5 12 4l8 7.5" />
      <Path d="M5.5 10.5V20h13v-9.5" />
      <Path d="M10 20v-5h4v5" />
    </>,
  ),
  scan: wrap(
    <>
      <Path d="M4 8V6a2 2 0 0 1 2-2h2" />
      <Path d="M20 8V6a2 2 0 0 0-2-2h-2" />
      <Path d="M4 16v2a2 2 0 0 0 2 2h2" />
      <Path d="M20 16v2a2 2 0 0 1-2 2h-2" />
      <Circle cx={12} cy={12} r={3.2} />
    </>,
  ),
  library: wrap(
    <>
      <Path d="M5 4h6v16H5z" />
      <Path d="M11 4h3v16h-3z" />
      <Path d="m14 5 4 .8-2.4 14.4-4-.8z" />
    </>,
  ),
  journal: wrap(
    <>
      <Path d="M6 4h11a2 2 0 0 1 2 2v14H8a2 2 0 0 1-2-2V4z" />
      <Path d="M9 8h7" />
      <Path d="M9 12h7" />
      <Path d="M9 16h4" />
    </>,
  ),
  user: wrap(
    <>
      <Circle cx={12} cy={9} r={3.5} />
      <Path d="M5 20c1-3.5 4-5.2 7-5.2s6 1.7 7 5.2" />
    </>,
  ),
  close: wrap(
    <>
      <Path d="M6 6l12 12" />
      <Path d="M18 6 6 18" />
    </>,
  ),
  back: wrap(<Path d="M14 6l-6 6 6 6" />),
  flash: wrap(<Path d="M13 3 5 14h6l-1 7 8-11h-6l1-7z" />),
  type: wrap(
    <>
      <Path d="M5 7h14" />
      <Path d="M12 7v12" />
      <Path d="M9 19h6" />
    </>,
  ),
  mic: wrap(
    <>
      <Rect x={9} y={3} width={6} height={11} rx={3} />
      <Path d="M5 11a7 7 0 0 0 14 0" />
      <Path d="M12 18v3" />
    </>,
  ),
  search: wrap(
    <>
      <Circle cx={11} cy={11} r={6.5} />
      <Path d="m20 20-4-4" />
    </>,
  ),
  share: wrap(
    <>
      <Circle cx={6} cy={12} r={2.5} />
      <Circle cx={17} cy={6} r={2.5} />
      <Circle cx={17} cy={18} r={2.5} />
      <Path d="m8.2 10.7 6.6-3.5" />
      <Path d="m8.2 13.3 6.6 3.5" />
    </>,
  ),
  bookmark: wrap(<Path d="M7 4h10v17l-5-3.5L7 21V4z" />),
  arrow: wrap(
    <>
      <Path d="M5 12h14" />
      <Path d="m13 6 6 6-6 6" />
    </>,
  ),
  plus: wrap(
    <>
      <Path d="M12 5v14" />
      <Path d="M5 12h14" />
    </>,
  ),
  check: wrap(<Path d="m5 12.5 4.5 4.5L19 7.5" />),
  warn: wrap(
    <>
      <Path d="M12 5 3 20h18L12 5z" />
      <Path d="M12 11v4" />
      <Circle cx={12} cy={17.6} r={0.6} fill="currentColor" />
    </>,
  ),
  cross: wrap(
    <>
      <Circle cx={12} cy={12} r={8} />
      <Path d="m9 9 6 6" />
      <Path d="m15 9-6 6" />
    </>,
  ),
  calendar: wrap(
    <>
      <Rect x={4} y={6} width={16} height={14} rx={2} />
      <Path d="M4 10h16" />
      <Path d="M9 4v4" />
      <Path d="M15 4v4" />
    </>,
  ),
  bell: wrap(
    <>
      <Path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2H4.5L6 16z" />
      <Path d="M10 20a2 2 0 0 0 4 0" />
    </>,
  ),
  heart: wrap(
    <Path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />,
  ),
  globe: wrap(
    <>
      <Circle cx={12} cy={12} r={8.5} />
      <Path d="M3.5 12h17" />
      <Path d="M12 3.5c2.5 3 2.5 14 0 17" />
      <Path d="M12 3.5c-2.5 3-2.5 14 0 17" />
    </>,
  ),
  menu: wrap(
    <>
      <Path d="M5 7h14" />
      <Path d="M5 12h14" />
      <Path d="M5 17h10" />
    </>,
  ),
  chevR: wrap(<Path d="m9 6 6 6-6 6" />),
  filter: wrap(
    <>
      <Path d="M4 6h16" />
      <Path d="M7 12h10" />
      <Path d="M10 18h4" />
    </>,
  ),
  download: wrap(
    <>
      <Path d="M12 4v12" />
      <Path d="m7 11 5 5 5-5" />
      <Path d="M5 20h14" />
    </>,
  ),
  voice: wrap(
    <>
      <Path d="M4 12h2" />
      <Path d="M8 9v6" />
      <Path d="M11 6v12" />
      <Path d="M14 9v6" />
      <Path d="M17 11v2" />
      <Path d="M20 12h0" />
    </>,
  ),
  qr: wrap(
    <>
      <Rect x={4} y={4} width={6} height={6} />
      <Rect x={14} y={4} width={6} height={6} />
      <Rect x={4} y={14} width={6} height={6} />
      <Path d="M14 14h2v2" />
      <Path d="M18 14v2" />
      <Path d="M14 18h2v2" />
      <Path d="M18 18h2" />
    </>,
  ),
  spark: wrap(
    <>
      <Path d="M12 4v6" />
      <Path d="M12 14v6" />
      <Path d="M4 12h6" />
      <Path d="M14 12h6" />
      <Path d="m6.5 6.5 3 3" />
      <Path d="m14.5 14.5 3 3" />
    </>,
  ),
  stop: wrap(<Rect x={6} y={6} width={12} height={12} rx={2} />),
  play: wrap(<Path d="M8 5v14l11-7L8 5z" />),
  baby: wrap(
    <>
      <Circle cx={12} cy={8} r={4} />
      <Path d="M5 21c1-4 4-6 7-6s6 2 7 6" />
      <Circle cx={10.5} cy={8} r={0.5} fill="currentColor" />
      <Circle cx={13.5} cy={8} r={0.5} fill="currentColor" />
    </>,
  ),
  drop: wrap(<Path d="M12 3.5c3.5 4.2 6 7.6 6 10.5a6 6 0 0 1-12 0c0-2.9 2.5-6.3 6-10.5z" />),
  pill: wrap(
    <>
      <Rect x={3.5} y={8.5} width={17} height={7} rx={3.5} transform="rotate(-45 12 12)" />
      <Path d="m9.5 9.5 5 5" />
    </>,
  ),
  camera: wrap(
    <>
      <Path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2.2l1.4-2h5.8l1.4 2h2.2A1.5 1.5 0 0 1 20 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5z" />
      <Circle cx={12} cy={12.5} r={3.5} />
    </>,
  ),
  image: wrap(
    <>
      <Rect x={4} y={5} width={16} height={14} rx={2} />
      <Circle cx={9} cy={10} r={1.5} />
      <Path d="m4 17 5-4.5 4 3.5 2.5-2 4.5 3.5" />
    </>,
  ),
  edit: wrap(
    <>
      <Path d="M5 19h4L19 9l-4-4L5 15v4z" />
      <Path d="m13.5 6.5 4 4" />
    </>,
  ),
  trash: wrap(
    <>
      <Path d="M5 7h14" />
      <Path d="M10 4h4" />
      <Path d="M7 7l1 13h8l1-13" />
    </>,
  ),
  ruler: wrap(
    <>
      <Rect x={3} y={8} width={18} height={8} rx={1.5} />
      <Path d="M7 8v3" />
      <Path d="M11 8v4" />
      <Path d="M15 8v3" />
    </>,
  ),
  scale: wrap(
    <>
      <Rect x={4} y={4} width={16} height={16} rx={4} />
      <Path d="M8.5 9.5a5 5 0 0 1 7 0" />
      <Path d="m12 10.5 1.2-1.6" />
    </>,
  ),
  timer: wrap(
    <>
      <Circle cx={12} cy={13} r={7} />
      <Path d="M12 13V9.5" />
      <Path d="M10 3h4" />
      <Path d="m18 6 1.5-1.5" />
    </>,
  ),
  list: wrap(
    <>
      <Path d="M10 7h10" />
      <Path d="M10 12h10" />
      <Path d="M10 17h10" />
      <Path d="m4 7 1.2 1.2L7.5 6" />
      <Path d="m4 12 1.2 1.2L7.5 11" />
      <Path d="m4 17 1.2 1.2L7.5 16" />
    </>,
  ),
  star: wrap(<Path d="m12 4 2.4 5 5.4.6-4 3.7 1.1 5.3L12 16l-4.9 2.6 1.1-5.3-4-3.7 5.4-.6z" />),
  gear: wrap(
    <>
      <Circle cx={12} cy={12} r={3} />
      <Path d="M12 3.5v2.2M12 18.3v2.2M20.5 12h-2.2M5.7 12H3.5M18 6l-1.6 1.6M7.6 16.4 6 18M18 18l-1.6-1.6M7.6 7.6 6 6" />
    </>,
  ),
  lock: wrap(
    <>
      <Rect x={5} y={10.5} width={14} height={10} rx={2} />
      <Path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    </>,
  ),
  help: wrap(
    <>
      <Circle cx={12} cy={12} r={8.5} />
      <Path d="M9.6 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1.1.9-1.1 1.7v.4" />
      <Path d="M12 17h.01" />
    </>,
  ),
  info: wrap(
    <>
      <Circle cx={12} cy={12} r={8.5} />
      <Path d="M12 11v5" />
      <Path d="M12 8h.01" />
    </>,
  ),
  phone: wrap(
    <Path d="M6.5 4h3l1.5 4-2 1.3a10 10 0 0 0 5.7 5.7l1.3-2 4 1.5v3a2 2 0 0 1-2 2A15 15 0 0 1 4.5 6a2 2 0 0 1 2-2z" />,
  ),
  leaf: wrap(
    <>
      <Path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14z" />
      <Path d="M5 19 13 11" />
    </>,
  ),
  moon: wrap(<Path d="M19 14.5A7.5 7.5 0 1 1 9.5 5a6 6 0 0 0 9.5 9.5z" />),
  sun: wrap(
    <>
      <Circle cx={12} cy={12} r={3.5} />
      <Path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4" />
    </>,
  ),
  clock: wrap(
    <>
      <Circle cx={12} cy={12} r={8.5} />
      <Path d="M12 7.5V12l3 2" />
    </>,
  ),
  shield: wrap(
    <>
      <Path d="M12 3.5 5 6v5.5c0 4.2 3 7.7 7 9 4-1.3 7-4.8 7-9V6l-7-2.5z" />
      <Path d="m9 12 2.2 2.2L15.5 10" />
    </>,
  ),
  bag: wrap(
    <>
      <Rect x={4} y={8} width={16} height={12} rx={2.5} />
      <Path d="M9 8V6a3 3 0 0 1 6 0v2" />
      <Path d="M4 13h16" />
    </>,
  ),
  foot: wrap(
    <>
      <Path d="M9.5 21c-2.5 0-3.5-2-3.5-4.5S7 11 9.5 11s3 2.5 3 5-1 5-3 5z" />
      <Circle cx={8} cy={7.5} r={1.2} />
      <Circle cx={11} cy={6} r={1.2} />
      <Circle cx={14} cy={7} r={1.1} />
      <Circle cx={16} cy={9.5} r={1} />
    </>,
  ),
  wave: wrap(<Path d="M3 12c2-4 4-4 6 0s4 4 6 0 4-4 6 0" />),
  stethoscope: wrap(
    <>
      <Path d="M6 4v5a4 4 0 0 0 8 0V4" />
      <Path d="M10 13v2a5 5 0 0 0 10 0v-1" />
      <Circle cx={20} cy={12} r={2} />
    </>,
  ),
  book: wrap(
    <>
      <Path d="M12 6.5C10 5 7 4.5 4 5v13c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5V5c-3-.5-6 0-8 1.5z" />
      <Path d="M12 6.5V19" />
    </>,
  ),
  smile: wrap(
    <>
      <Circle cx={12} cy={12} r={8.5} />
      <Path d="M8.5 14a4 4 0 0 0 7 0" />
      <Path d="M9 9.5h.01M15 9.5h.01" />
    </>,
  ),
  sparkles: wrap(
    <>
      <Path d="M10 4.5 11.4 9l4.6 1.5-4.6 1.4L10 16.5 8.6 12 4 10.5 8.6 9z" />
      <Path d="M17.5 14.5l.7 2 2 .8-2 .7-.7 2-.7-2-2-.7 2-.8z" />
    </>,
  ),
  crown: wrap(
    <>
      <Path d="M4 8.5 8 12l4-6 4 6 4-3.5-1.5 9.5h-13z" />
    </>,
  ),
  minus: wrap(<Path d="M5 12h14" />),
  flower: wrap(
    <>
      <Circle cx={12} cy={12} r={2.2} />
      <Path d="M12 9.8C10.5 7.5 10.8 5 12 4c1.2 1 1.5 3.5 0 5.8z" />
      <Path d="M12 14.2c1.5 2.3 1.2 4.8 0 5.8-1.2-1-1.5-3.5 0-5.8z" />
      <Path d="M9.8 12C7.5 13.5 5 13.2 4 12c1-1.2 3.5-1.5 5.8 0z" />
      <Path d="M14.2 12c2.3-1.5 4.8-1.2 5.8 0-1 1.2-3.5 1.5-5.8 0z" />
    </>,
  ),
  people: wrap(
    <>
      <Circle cx={9} cy={8.5} r={3} />
      <Path d="M3.5 19c.7-3 2.9-4.5 5.5-4.5s4.8 1.5 5.5 4.5" />
      <Circle cx={16.5} cy={9} r={2.5} />
      <Path d="M15.5 14.6c2.3-.3 4.3 1 5 3.9" />
    </>,
  ),
  grid: wrap(
    <>
      <Rect x={4} y={4} width={7} height={7} rx={2} />
      <Rect x={13} y={4} width={7} height={7} rx={2} />
      <Rect x={4} y={13} width={7} height={7} rx={2} />
      <Rect x={13} y={13} width={7} height={7} rx={2} />
    </>,
  ),
  external: wrap(
    <>
      <Path d="M14 5h5v5" />
      <Path d="M19 5 11 13" />
      <Path d="M18 14v4a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 5 18V8a1.5 1.5 0 0 1 1.5-1.5H10" />
    </>,
  ),
} as const;

export type IconKey = keyof typeof Icon;
