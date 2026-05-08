// Animated count-up. Used for the giant week number on Home.

import React, { useEffect, useState } from 'react';
import { Text, TextStyle } from 'react-native';

export function CountUp({
  to,
  duration = 800,
  style,
}: {
  to: number;
  duration?: number;
  style?: TextStyle;
}) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const start = Date.now();
    let raf: number;
    const tick = () => {
      const p = Math.min(1, (Date.now() - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);
  return <Text style={style}>{v}</Text>;
}
