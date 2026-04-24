"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * Paper-curtain page transition.
 *
 * Each route change passes a single paper-colored sheet vertically across
 * the viewport (enters from above, fully covers at midpoint, exits below)
 * over 700ms. A small mono "Birchbank" wordmark + tamarack rule travels
 * with the sheet so the brand briefly stamps the transition.
 *
 * Mounted once at the layout root. Listens to Next.js `usePathname()`.
 * The first render is skipped so the curtain doesn't play on initial load.
 *
 * Reduced motion: the sheet does not animate; a 150ms paper flash is shown
 * via opacity so the transition still acknowledges the change without
 * sustained motion.
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
    setActive(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setActive(false), 720);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [pathname]);

  if (!active) return null;

  return (
    <div aria-hidden className="route-curtain">
      <div className="route-curtain__mark">
        <span className="route-curtain__wordmark">BIRCHBANK</span>
        <span className="route-curtain__rule" />
      </div>
    </div>
  );
}
