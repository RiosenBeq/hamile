// Animated count-up. Used for the giant week number on Home.
//
// We only commit a setState when the rendered integer actually changes — for a
// week count that goes 0 → 18 in 800 ms, that's 18 commits instead of ~48
// frames worth of churn that the previous RAF-per-frame implementation caused.

import React, { memo, useEffect, useRef, useState } from 'react';
import { Text, TextStyle } from 'react-native';

function CountUpImpl({
  to,
  duration = 800,
  style,
}: {
  to: number;
  duration?: number;
  style?: TextStyle;
}) {
  const [v, setV] = useState(to);
  const target = useRef(to);

  useEffect(() => {
    target.current = to;
    if (duration <= 0) {
      setV(to);
      return;
    }
    const start = Date.now();
    const from = 0;
    let raf = 0;
    let lastInt = -1;
    const tick = () => {
      const p = Math.min(1, (Date.now() - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const next = Math.round(from + (to - from) * eased);
      if (next !== lastInt) {
        lastInt = next;
        setV(next);
      }
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    setV(from);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);

  return <Text style={style}>{v}</Text>;
}

export const CountUp = memo(CountUpImpl);
