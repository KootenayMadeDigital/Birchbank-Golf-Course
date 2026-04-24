"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Hole-shape SVG watermark.
 *
 * Renders a simplified path of the hole (fairway centerline, dogleg
 * if any, water hazard if any, green silhouette) behind the giant
 * numeral on each hole page. The path "draws in" via stroke-dashoffset
 * over ~1.6 seconds on mount, with a small initial delay so the numeral
 * lands first and the watermark resolves behind it.
 *
 * The numeral remains visually dominant; the shape resolves as a
 * tamarack watermark behind/around it.
 *
 * Reduced motion: render the path fully drawn at 25% opacity, no
 * animation.
 *
 * The path is expected to use a 0..100 viewBox in both axes. Caller
 * supplies the path d string; this component handles sizing, stroke,
 * and the draw-in animation.
 */
export default function HoleShape({ path }: { path: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const p = pathRef.current;
    if (!p) return;

    const len = p.getTotalLength();
    p.style.strokeDasharray = String(len);

    if (reduced) {
      p.style.strokeDashoffset = "0";
      p.style.opacity = "0.3";
      return;
    }

    p.style.strokeDashoffset = String(len);
    p.style.opacity = "0.65";

    const tween = gsap.to(p, {
      strokeDashoffset: 0,
      duration: 1.6,
      delay: 0.35,
      ease: "power2.out",
    });

    return () => {
      tween.kill();
    };
  }, [path]);

  return (
    <div
      ref={wrapperRef}
      aria-hidden
      className="hole-shape pointer-events-none absolute inset-0 -z-10"
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full"
      >
        <path
          ref={pathRef}
          d={path}
          fill="none"
          stroke="var(--color-tamarack)"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
