"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Hole-shape SVG watermark.
 *
 * Renders a simplified path of the hole (fairway centerline, dogleg
 * if any, water hazard if any, green silhouette) behind the giant
 * numeral on each hole page. As the numeral scrolls past viewport
 * center, GSAP ScrollTrigger animates the path's stroke-dashoffset
 * from `pathLength` to `0`, drawing it in over the scroll distance.
 *
 * The numeral remains visually dominant; the shape resolves as a
 * tamarack watermark behind/around it.
 *
 * Reduced motion: render the path fully drawn at 25% opacity, no
 * animation.
 *
 * The path is expected to use a 0..100 viewBox in both axes. Caller
 * supplies the path d string; this component handles sizing, stroke,
 * and the scroll-driven draw.
 */
export default function HoleShape({ path }: { path: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const p = pathRef.current;
    const wrap = wrapperRef.current;
    if (!p || !wrap) return;

    const len = p.getTotalLength();
    p.style.strokeDasharray = String(len);

    if (reduced) {
      p.style.strokeDashoffset = "0";
      p.style.opacity = "0.25";
      return;
    }

    p.style.strokeDashoffset = String(len);
    p.style.opacity = "0.7";

    const tween = gsap.to(p, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: wrap,
        start: "top 75%",
        end: "top 15%",
        scrub: 0.6,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
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
          strokeWidth="0.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
