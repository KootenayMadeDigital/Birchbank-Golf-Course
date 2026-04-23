"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

declare global {
  interface Window {
    chronogolfOpen?: () => void;
  }
}

/**
 * Premium sticky booking pill. Anchors to the bottom-right of the
 * viewport (respecting the mobile safe-area inset) once the user has
 * scrolled past the hero section. Dismissible with × — dismissal
 * persists for the browser session.
 *
 * Visual design:
 *   • Cedar background with amber accent line above for gravitas
 *   • Two-line layout: "Ready to book?" eyebrow + CTA row
 *   • Drop shadow for separation from page content
 *   • Scales comfortably for touch — 48px+ tap targets
 */
export default function StickyBookBar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("bb:stickyDismissed") === "1") {
      setDismissed(true);
      return;
    }
    const onScroll = () => {
      const hero = document.querySelector('[aria-label="Birchbank Golf — opening sequence"]');
      if (!hero) {
        setVisible(window.scrollY > 300);
        return;
      }
      const rect = hero.getBoundingClientRect();
      setVisible(rect.bottom < 120);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dismiss = () => {
    setDismissed(true);
    try { sessionStorage.setItem("bb:stickyDismissed", "1"); } catch {}
  };

  const handleBook = (e: React.MouseEvent) => {
    if (typeof window !== "undefined" && typeof window.chronogolfOpen === "function") {
      e.preventDefault();
      window.chronogolfOpen();
    }
  };

  if (dismissed) return null;

  return (
    <div
      className={clsx(
        "fixed z-30 transition-all duration-500",
        "bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-4 md:right-6",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none",
      )}
      role="complementary"
      aria-label="Quick booking"
    >
      <div className="relative overflow-hidden rounded-md shadow-2xl ring-1 ring-granite/10">
        {/* Thin tamarack rule across the top */}
        <span aria-hidden className="block h-[2px] bg-tamarack" />

        <div className="flex items-stretch bg-cedar text-paper">
          <a
            href="/book"
            onClick={handleBook}
            data-chrono-book
            className="chrono-bookingbutton flex items-center gap-3 py-3 pl-5 pr-4 md:py-4 md:pl-6 md:pr-5 min-h-[52px] hover:bg-cedar-dark transition-colors"
          >
            <div className="flex flex-col items-start leading-tight">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-tamarack">
                Ready to play?
              </span>
              <span className="text-[15px] md:text-base font-medium mt-0.5">
                Book a tee time
              </span>
            </div>
            <span
              aria-hidden
              className="text-tamarack text-lg md:text-xl translate-x-0 group-hover:translate-x-1 transition-transform"
            >
              →
            </span>
          </a>

          <button
            onClick={dismiss}
            aria-label="Dismiss booking bar"
            className="shrink-0 w-10 md:w-11 flex items-center justify-center text-paper/60 hover:text-paper hover:bg-paper/10 transition-colors border-l border-paper/15 text-lg"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
