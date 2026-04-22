"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

declare global {
  interface Window {
    chronogolfOpen?: () => void;
  }
}

/**
 * Dismissible booking pill. Appears bottom-right on desktop and bottom sheet on
 * mobile once the user has scrolled past the hero. Hides itself when dismissed
 * and stays dismissed for the session (sessionStorage).
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
        "fixed z-30 transition-all duration-300",
        "bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-4 md:right-6",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
      )}
      role="complementary"
      aria-label="Quick booking"
    >
      <div className="flex items-center gap-1 bg-cedar text-paper shadow-lg rounded-full pr-1">
        <a
          href="/book"
          onClick={handleBook}
          data-chrono-book
          className="chrono-bookingbutton flex items-center gap-2 py-3 pl-5 pr-2 text-sm font-medium hover:text-tamarack transition-colors min-h-[44px]"
        >
          Book a tee time
          <span aria-hidden>→</span>
        </a>
        <button
          onClick={dismiss}
          aria-label="Dismiss booking bar"
          className="w-9 h-9 flex items-center justify-center rounded-full text-paper/70 hover:text-paper hover:bg-paper/10 transition-colors"
        >
          ×
        </button>
      </div>
    </div>
  );
}
