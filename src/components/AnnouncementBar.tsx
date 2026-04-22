"use client";

import { useEffect, useState } from "react";
import { STRIP_ANNOUNCEMENT } from "@/data/announcements";

/**
 * Fixed strip at the very top of the viewport (above Nav). One message at
 * a time. Dismissible via × button; the dismissal persists for the session
 * (sessionStorage) and is keyed on the announcement `id` so a new
 * announcement appears even if a previous one was dismissed.
 *
 * When visible, it sets --announcement-h on <html> so Nav can slide down
 * and below-content can compensate.
 */
export default function AnnouncementBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!STRIP_ANNOUNCEMENT) return;

    // Auto-expire past activeUntil.
    if (STRIP_ANNOUNCEMENT.activeUntil) {
      const expires = new Date(STRIP_ANNOUNCEMENT.activeUntil).getTime();
      if (Date.now() > expires) return;
    }

    // Skip if dismissed this session.
    try {
      const dismissed = sessionStorage.getItem("bb:strip") === STRIP_ANNOUNCEMENT.id;
      if (dismissed) return;
    } catch { /* ignore */ }

    setVisible(true);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (visible) {
      root.style.setProperty("--announcement-h", "40px");
    } else {
      root.style.setProperty("--announcement-h", "0px");
    }
    return () => {
      root.style.setProperty("--announcement-h", "0px");
    };
  }, [visible]);

  const dismiss = () => {
    setVisible(false);
    try {
      if (STRIP_ANNOUNCEMENT) sessionStorage.setItem("bb:strip", STRIP_ANNOUNCEMENT.id);
    } catch { /* ignore */ }
  };

  if (!STRIP_ANNOUNCEMENT || !visible) return null;

  return (
    <div
      role="region"
      aria-label="Course announcement"
      className="fixed inset-x-0 top-0 z-50 bg-amber text-paper"
      style={{ height: "40px" }}
    >
      <div className="container-edge h-full flex items-center justify-between gap-4 text-sm">
        <div className="flex items-center gap-3 min-w-0 font-mono">
          <span aria-hidden className="inline-block w-1.5 h-1.5 rounded-full bg-paper/80" />
          <span className="truncate">
            <span className="font-medium">{STRIP_ANNOUNCEMENT.message}</span>
            {STRIP_ANNOUNCEMENT.cta && (
              <>
                <span className="mx-2 text-paper/60">·</span>
                <a
                  href={STRIP_ANNOUNCEMENT.cta.href}
                  className="underline underline-offset-4 decoration-paper/50 hover:decoration-paper"
                >
                  {STRIP_ANNOUNCEMENT.cta.label}
                </a>
              </>
            )}
          </span>
        </div>
        <button
          onClick={dismiss}
          aria-label="Dismiss announcement"
          className="shrink-0 w-8 h-8 -mr-2 flex items-center justify-center text-paper/80 hover:text-paper hover:bg-paper/10 transition-colors rounded-full text-lg"
        >
          ×
        </button>
      </div>
    </div>
  );
}
