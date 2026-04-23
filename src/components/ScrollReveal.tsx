"use client";

import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  /** Stagger children (direct descendants) on reveal. Default: false — whole block fades as one. */
  stagger?: boolean;
  /** Delay in ms before the animation starts when it enters the viewport. Default 0. */
  delay?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
};

/**
 * Scroll-triggered fade/rise wrapper. Uses the native IntersectionObserver
 * for the reveal trigger and a CSS transition for the animation — no GSAP
 * dependency, no ScrollTrigger position-recalc edge cases. Content is
 * never left permanently invisible:
 *   - reduced-motion: content visible immediately, no animation
 *   - IntersectionObserver unsupported: content visible immediately
 *   - 2.5s safety net: if the observer hasn't fired (iframe, offscreen
 *     edge case), content reveals anyway
 *
 * Previously backed by GSAP which had a bug leaving sections invisible
 * on production (review grid + rates cards most affected).
 */
export default function ScrollReveal({
  children,
  stagger = false,
  delay = 0,
  className,
  as = "div",
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const noIO = typeof IntersectionObserver === "undefined";

    const reveal = () => {
      el.classList.add("sr-in");
      if (stagger) {
        Array.from(el.children).forEach((c, i) => {
          (c as HTMLElement).style.transitionDelay = `${delay + i * 120}ms`;
        });
      } else {
        el.style.transitionDelay = `${delay}ms`;
      }
    };

    if (reduce || noIO) {
      el.classList.add("sr-ready", "sr-in", "sr-no-motion");
      return;
    }

    el.classList.add("sr-ready");
    if (stagger) el.classList.add("sr-stagger");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal();
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.01 },
    );
    io.observe(el);

    // Safety net: reveal after 2.5s regardless so content is never stuck.
    const safety = window.setTimeout(reveal, 2500);

    return () => {
      io.disconnect();
      clearTimeout(safety);
    };
  }, [stagger, delay]);

  const Tag = as as React.ElementType;
  return (
    <Tag ref={ref as React.RefObject<HTMLElement>} className={className}>
      {children}
    </Tag>
  );
}
