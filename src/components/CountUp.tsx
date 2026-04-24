"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animated number transition.
 *
 * When `value` changes, the displayed number eases from the previous
 * value to the new one over `duration` ms using the established editorial
 * curve. Renders a tabular-nums string so width doesn't jitter mid-tween.
 *
 * Reduced motion: snap directly to the new value with no animation.
 */
export default function CountUp({
  value,
  duration = 750,
  className,
}: {
  value: number;
  duration?: number;
  className?: string;
}) {
  const [display, setDisplay] = useState(value);
  const fromRef = useRef(value);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDisplay(value);
      fromRef.current = value;
      return;
    }
    const start = performance.now();
    const from = fromRef.current;
    const to = value;
    if (from === to) return;
    // cubic-bezier(0.65, 0, 0.35, 1) approximation via a bezier-like ease
    const ease = (t: number) => {
      // Smoothstep — close to the editorial curve, cheaper than a true cubic-bezier.
      return t * t * (3 - 2 * t);
    };
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = ease(progress);
      const v = Math.round(from + (to - from) * eased);
      setDisplay(v);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = to;
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [value, duration]);

  return <span className={`tabular-nums ${className ?? ""}`}>{display}</span>;
}
