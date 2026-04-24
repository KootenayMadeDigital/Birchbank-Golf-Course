"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * Quiet paper fade between routes.
 *
 * On every route change a paper-tinted overlay fades up then back out
 * over ~360ms. No motion beyond opacity, just enough to soften the
 * snap of an instant page swap, nothing dramatic.
 *
 * The first render is skipped so the fade doesn't play on initial load.
 * Reduced motion: no overlay at all (browser default snap).
 */
export default function RouteCurtain() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const firstRender = useRef(true);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    setActive(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setActive(false), 380);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [pathname]);

  if (!active) return null;

  return <div aria-hidden className="route-fade" />;
}
