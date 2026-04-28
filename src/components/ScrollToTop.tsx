"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * Scroll-to-top on every internal route change.
 *
 * Next.js App Router *usually* scrolls to the top on Link navigation,
 * but the behavior is fragile in a few real cases:
 *   - Same-route navigation that only changes search params
 *   - Routes that share a layout where React reconciliation preserves
 *     scroll position
 *   - When the browser's own scroll-restoration logic kicks in for
 *     forward/back history entries on routes the visitor has seen
 *     before in the same session
 *
 * This component runs once on every (pathname, searchParams) change
 * and snaps the window to (0, 0). The snap is intentionally instant,
 * not smooth — a visitor who clicks "About" should land at the top of
 * /about, not watch the new page scroll up underneath them.
 *
 * Honors anchored links: if the URL has a hash (e.g. /events#packages)
 * the browser is allowed to handle the in-page jump itself, and we
 * leave the scroll alone.
 *
 * Mounted in the root layout, runs for every navigation.
 */
export default function ScrollToTop() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined") return;
    // If the URL targets a section, let the browser jump there.
    if (window.location.hash) return;
    // `instant` (not "smooth") so the new page lands at the top
    // immediately. Visitors should never see the new page momentarily
    // scrolled to a stale offset.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, searchParams]);

  return null;
}
