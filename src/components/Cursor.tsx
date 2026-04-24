"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Custom cursor — additive layer.
 *
 * A small granite dot follows the cursor with a soft trail. Over interactive
 * elements (anything that's an `<a>`, `<button>`, role=button/radio/link, has
 * `[data-cursor-target]`, or matches a few opted-in selectors) it expands
 * into a tamarack-stroked ring. The native cursor stays visible — this is
 * an additive ink layer, not a replacement, so accessibility tools and OS
 * preferences continue to work.
 *
 * Disabled when:
 *   - the device is touch (pointer: coarse)
 *   - the user prefers reduced motion
 *   - any form input is focused (don't compete with the system caret)
 *   - the cursor is over the Chronogolf widget iframe (out of our context)
 *
 * Position is updated via `transform: translate3d(...)` on the dot/ring
 * elements, not `top/left`, to stay on the compositor at 60fps.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reducedMotion) {
      setEnabled(false);
      return;
    }
    setEnabled(true);

    let raf = 0;
    let dotX = window.innerWidth / 2;
    let dotY = window.innerHeight / 2;
    let ringX = dotX;
    let ringY = dotY;
    let targetX = dotX;
    let targetY = dotY;
    let isOverInteractive = false;
    let suppressed = false;

    const isInteractive = (el: Element | null): boolean => {
      let cur: Element | null = el;
      while (cur && cur !== document.body) {
        if (cur instanceof HTMLElement) {
          if (cur.matches('a, button, [data-cursor-target], [role="button"], [role="link"], [role="radio"], [role="tab"], [role="switch"], summary, label, input[type="submit"], input[type="button"], input[type="reset"], select')) {
            return true;
          }
        }
        cur = cur.parentElement;
      }
      return false;
    };

    const isOverChrono = (el: Element | null): boolean => {
      let cur: Element | null = el;
      while (cur && cur !== document.body) {
        if (cur instanceof HTMLElement && (cur.classList.contains("chrono-container") || cur.tagName === "IFRAME")) {
          return true;
        }
        cur = cur.parentElement;
      }
      return false;
    };

    const isFormInputFocused = () => {
      const a = document.activeElement;
      if (!a) return false;
      const tag = a.tagName;
      return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || (a as HTMLElement).isContentEditable;
    };

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      const target = document.elementFromPoint(e.clientX, e.clientY);
      isOverInteractive = isInteractive(target);
      suppressed = isOverChrono(target) || isFormInputFocused();
    };

    const onLeave = () => {
      suppressed = true;
    };

    const onEnter = () => {
      suppressed = isFormInputFocused();
    };

    const tick = () => {
      // Dot: tight follow (12% per frame ≈ 80ms ease-out feel)
      dotX += (targetX - dotX) * 0.55;
      dotY += (targetY - dotY) * 0.55;
      // Ring: softer trail (~250ms)
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      const dot = dotRef.current;
      const ring = ringRef.current;
      if (dot && ring) {
        const opacity = suppressed ? 0 : 1;
        dot.style.opacity = String(opacity);
        ring.style.opacity = String(opacity);
        dot.style.transform = `translate3d(${dotX - 4}px, ${dotY - 4}px, 0)`;
        ring.style.transform = `translate3d(${ringX - 16}px, ${ringY - 16}px, 0) scale(${isOverInteractive ? 1 : 0.35})`;
        ring.style.borderColor = isOverInteractive ? "var(--color-tamarack)" : "transparent";
      }
      raf = requestAnimationFrame(tick);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div ref={ringRef} aria-hidden className="cursor-ring" />
      <div ref={dotRef} aria-hidden className="cursor-dot" />
    </>
  );
}
