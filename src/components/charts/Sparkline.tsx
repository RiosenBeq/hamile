// Minimal SVG line chart. Animated path-draw on mount via stroke-dashoffset
// (same trick WeekRing uses). Dotted grid + soft sage range band.

import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, LayoutChangeEvent } from 'react-native';
import Svg, { Path, Line, Circle, Rect, Defs, LinearGradient, Stop } from 'react-native-svg';
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

const APath = Animated.createAnimatedComponent(Path);

export type SparklinePoint = { x: number; y: number; label?: string };

type Props = {
  points: SparklinePoint[];
  height?: number;
  yMin?: number;
  yMax?: number;
  rangeMin?: number; // healthy band lower bound
  rangeMax?: number; // healthy band upper bound
  yLabel?: (v: number) => string;
  xLabel?: (v: number) => string;
};

export function Sparkline({
  points,
  height = 180,
  yMin,
  yMax,
  rangeMin,
  rangeMax,
  yLabel,
  xLabel,
}: Props) {
  const [width, setWidth] = useState(0);

  const sorted = useMemo(() => [...points].sort((a, b) => a.x - b.x), [points]);
  const lo = yMin ?? Math.min(...sorted.map((p) => p.y), rangeMin ?? Infinity);
  const hi = yMax ?? Math.max(...sorted.map((p) => p.y), rangeMax ?? -Infinity);
  const xLo = sorted.length ? sorted[0].x : 0;
  const xHi = sorted.length ? sorted[sorted.length - 1].x : 1;
  const padX = 16;
  const padTop = 12;
  const padBottom = 28;

  const project = (p: SparklinePoint) => {
    const span = Math.max(0.0001, xHi - xLo);
    const yspan = Math.max(0.0001, hi - lo);
    const x = padX + ((p.x - xLo) / span) * (width - padX * 2);
    const y = padTop + (1 - (p.y - lo) / yspan) * (height - padTop - padBottom);
    return { x, y };
  };

  const pathD = useMemo(() => {
    if (!width || sorted.length === 0) return '';
    const projected = sorted.map(project);
    if (projected.length === 1) {
      const { x, y } = projected[0];
      return `M ${x} ${y}`;
    }
    return projected
      .map((p, i) => {
        if (i === 0) return `M ${p.x} ${p.y}`;
        // smooth cubic between points
        const prev = projected[i - 1];
        const cx = (prev.x + p.x) / 2;
        return `Q ${cx} ${prev.y} ${p.x} ${p.y}`;
      })
      .join(' ');
  }, [sorted, width, height, lo, hi]);

  const [pathLength, setPathLength] = useState(0);
  const drawn = useSharedValue(0);
  useEffect(() => {
    if (!pathD) return;
    drawn.value = 0;
    drawn.value = withTiming(1, { duration: 900, easing: Easing.out(Easing.cubic) });
  }, [pathD]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: pathLength * (1 - drawn.value),
  }));

  // Range band coords
  const bandY = useMemo(() => {
    if (rangeMin == null || rangeMax == null || !width) return null;
    const yspan = Math.max(0.0001, hi - lo);
    const top = padTop + (1 - (rangeMax - lo) / yspan) * (height - padTop - padBottom);
    const bot = padTop + (1 - (rangeMin - lo) / yspan) * (height - padTop - padBottom);
    return { top, height: bot - top };
  }, [rangeMin, rangeMax, lo, hi, width, height]);

  return (
    <View
      style={{ height, width: '100%' }}
      onLayout={(e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width)}
    >
      {width > 0 ? (
        <Svg width={width} height={height}>
          <Defs>
            <LinearGradient id="line-fill" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor={colors.terracotta} stopOpacity={0.18} />
              <Stop offset="100%" stopColor={colors.terracotta} stopOpacity={0} />
            </LinearGradient>
          </Defs>

          {/* horizontal dotted gridlines */}
          {[0.25, 0.5, 0.75].map((f) => (
            <Line
              key={f}
              x1={padX}
              x2={width - padX}
              y1={padTop + f * (height - padTop - padBottom)}
              y2={padTop + f * (height - padTop - padBottom)}
              stroke={colors.line}
              strokeDasharray="2,4"
              strokeWidth={1}
            />
          ))}

          {/* healthy band */}
          {bandY ? (
            <Rect
              x={padX}
              y={bandY.top}
              width={width - padX * 2}
              height={Math.max(0, bandY.height)}
              fill={colors.sage}
              opacity={0.12}
              rx={6}
            />
          ) : null}

          {/* line */}
          {pathD ? (
            <APath
              d={pathD}
              stroke={colors.terracotta}
              strokeWidth={2.5}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              ref={(node: any) => {
                if (node && node.getTotalLength) {
                  try {
                    const len = node.getTotalLength();
                    if (len && len !== pathLength) setPathLength(len);
                  } catch {}
                }
              }}
              strokeDasharray={pathLength ? `${pathLength},${pathLength}` : undefined}
              animatedProps={animatedProps}
            />
          ) : null}

          {/* dots */}
          {sorted.map((p, i) => {
            const { x, y } = project(p);
            return <Circle key={i} cx={x} cy={y} r={3.5} fill={colors.terracotta} />;
          })}
        </Svg>
      ) : null}

      {/* x labels */}
      {xLabel && sorted.length > 0 ? (
        <View
          style={{
            position: 'absolute',
            left: padX,
            right: padX,
            bottom: 4,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text style={{ fontSize: 11, color: colors.mute, fontFamily: fonts.body }}>
            {xLabel(sorted[0].x)}
          </Text>
          <Text style={{ fontSize: 11, color: colors.mute, fontFamily: fonts.body }}>
            {xLabel(sorted[sorted.length - 1].x)}
          </Text>
        </View>
      ) : null}
    </View>
  );
}
