// Marigold custom 1.5px-stroke line icons. Rounded caps. Never SF defaults.
// Faithful port of the design's `Icon` map.

import React from 'react';
import Svg, { Circle, Path, Rect, G } from 'react-native-svg';

type IconProps = { size?: number; color?: string };

const wrap =
  (children: React.ReactNode) =>
  ({ size = 24, color = '#2A2522' }: IconProps) =>
    (
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
} as const;

export type IconKey = keyof typeof Icon;
