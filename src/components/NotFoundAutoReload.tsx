"use client";

import { useEffect, useState } from "react";

/**
 * Self-healing recovery for stale-RSC 404s.
 *
 * Problem: in Next.js 15 App Router, after a fresh Vercel deploy the
 * previously-loaded client bundle in an open tab still references the
 * old build's chunk hashes. When the user clicks a <Link>, Next fetches
 * the RSC payload from the old hash URL, the new build doesn't have it,
 * and the framework falls back to rendering not-found.tsx. A hard
 * refresh loads fresh HTML and the page works again.
 *
 * Recovery rule:
 *   1. Only kick in when the user arrived at not-found via in-app
 *      navigation (document.referrer is from this same origin). A
 *      direct URL visit to a typo or genuinely missing page should
 *      see the normal 404, not an auto-reload.
 *   2. Only auto-reload once per session per path (sessionStorage
 *      guard). If the path is genuinely missing, the second visit
 *      shows the regular 404 and the user is unblocked.
 *   3. Render a paper-colored overlay during the brief reload window
 *      so the user never sees the 404 content flash.
 */
export default function NotFoundAutoReload() {
  const [reloading, setReloading] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const path = window.location.pathname;
    const key = `nf404:${path}`;
    const cameFromInApp = document.referrer.startsWith(window.location.origin + "/");
    if (!cameFromInApp) return;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
    setReloading(true);
    // Tiny delay so React has time to flush the overlay before the
    // browser starts the reload. 50ms is invisible to humans.
    const id = window.setTimeout(() => window.location.reload(), 50);
    return () => window.clearTimeout(id);
  }, []);

  if (!reloading) return null;
  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[200] bg-paper pointer-events-none"
    />
  );
}
