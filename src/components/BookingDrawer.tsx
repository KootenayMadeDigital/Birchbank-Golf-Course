"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * In-house booking drawer that replaces the body-injected Chronogolf
 * widget script (cdn2.chronogolf.com/widgets/v2). That script broke
 * SPA navigation because it physically moved DOM nodes out of React's
 * tree, corrupting reconciliation on every route change.
 *
 * This component:
 *   - Renders a fixed bottom-right "Book a tee time" trigger button
 *     (visually identical to the original Chronogolf widget button).
 *   - On click, slides up a panel containing an iframe pointed at the
 *     Chronogolf tee-sheet widget. The iframe is React-owned; the
 *     content inside the iframe is Chronogolf-owned. The two never
 *     touch each other's DOM, so route changes are safe.
 *   - The iframe is lazy-mounted on first open, then kept alive (and
 *     simply hidden on close) so the visitor's booking flow isn't
 *     reset every time they peek at the drawer.
 *   - Exposes window.chronogolfOpen() so the existing BookButton
 *     component (and any other call site that uses that hook) opens
 *     this drawer instead of attempting to open the killed widget.
 *   - Closes on Escape, on backdrop click, and on the explicit close
 *     button. Locks body scroll while open.
 */

declare global {
  interface Window {
    chronogolfOpen?: () => void;
  }
}

const WIDGET_SRC = `https://chronogolf.com/club/${
  process.env.NEXT_PUBLIC_CHRONOGOLF_CLUB_ID || "738"
}/widget?medium=widget&source=club`;

export default function BookingDrawer() {
  const pathname = usePathname();
  // True only on the home page (which has the cinematic
  // BallIntoHoleHero). Used to default `heroInView` to true at first
  // paint on home so the floating trigger never flashes over the hero
  // before the IntersectionObserver attaches. Subpages have no hero,
  // so they default to "hero NOT in view" and the trigger reveals
  // immediately.
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [heroInView, setHeroInView] = useState(isHome);
  const [footerInView, setFooterInView] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setHasMounted(true);
    window.chronogolfOpen = () => setOpen(true);
    return () => {
      if (window.chronogolfOpen) delete window.chronogolfOpen;
    };
  }, []);

  // Re-sync the heroInView default when the pathname changes (SPA
  // navigation). Without this, navigating from / to /course leaves
  // heroInView=true, hiding the button on every subpage until the
  // observer's else-branch fires.
  useEffect(() => {
    setHeroInView(isHome);
  }, [isHome]);

  /**
   * Hide the floating trigger when it would overlap meaningful content,
   * on every viewport:
   *
   *   - Home-page hero: the hero already has a "Book a tee time" CTA
   *     plus a "Walk the 18" secondary, and the floating trigger sits
   *     directly over the secondary on desktop and duplicates the
   *     primary on mobile. Hide while hero is in view.
   *   - Footer: the trigger sits over the footer's bottom row when the
   *     visitor scrolls all the way down, covering the land
   *     acknowledgement link and the office email. Hide while footer
   *     is in view.
   *
   * Trigger fades back in the moment the visitor scrolls between those
   * two regions.
   */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const hero = document.querySelector(
      '[aria-label="Birchbank Golf, opening sequence"]',
    );
    if (hero) {
      // Strict intersection (no negative bottom margin). The trigger
      // stays hidden until the hero wrapper's bottom edge has fully
      // crossed the top of the viewport, i.e. the visitor has
      // scrolled completely past the cinematic intro. Previously a
      // -25% bottom margin let the button appear while a quarter of
      // the hero was still on screen, which read as "duplicate CTA".
      const heroIO = new IntersectionObserver(
        ([entry]) => setHeroInView(entry.isIntersecting),
        { rootMargin: "0px", threshold: 0 },
      );
      heroIO.observe(hero);
      observers.push(heroIO);
    } else {
      setHeroInView(false);
    }

    const footer = document.querySelector("footer");
    if (footer) {
      const footerIO = new IntersectionObserver(
        ([entry]) => setFooterInView(entry.isIntersecting),
        // Trigger as soon as ~12% of the footer enters the viewport, well
        // before the floating button would visually overlap the bottom row.
        { rootMargin: "0px 0px 12% 0px", threshold: 0 },
      );
      footerIO.observe(footer);
      observers.push(footerIO);
    }

    return () => observers.forEach((io) => io.disconnect());
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  if (!hasMounted) return null;

  return (
    <>
      {/* Floating trigger, bottom-right of every page. Respects iOS safe-area
          inset so it never sits under the home-bar gesture region. */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open the booking panel"
        style={{
          bottom: "max(1.25rem, env(safe-area-inset-bottom))",
          right: "max(1.25rem, env(safe-area-inset-right))",
        }}
        className={[
          "fixed md:bottom-6 md:right-6 z-30",
          "inline-flex items-center gap-2 min-h-[48px] px-5 py-3 md:px-5 md:py-3.5",
          "bg-cedar text-paper border-t border-tamarack rounded-sm",
          "text-sm md:text-sm font-medium tracking-[0.04em]",
          "shadow-[0_10px_30px_-10px_rgba(43,42,40,0.45)]",
          "transition-all duration-200 will-change-transform",
          "hover:bg-cedar-dark hover:-translate-y-0.5 active:opacity-80",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
          open || heroInView || footerInView
            ? "opacity-0 pointer-events-none translate-y-2"
            : "opacity-100",
        ].join(" ")}
      >
        Book a tee time
        <span aria-hidden className="text-tamarack">→</span>
      </button>

      {/* Backdrop */}
      <div
        aria-hidden
        onClick={() => setOpen(false)}
        className={[
          "fixed inset-0 z-40 bg-granite/45 backdrop-blur-[2px]",
          "transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0 pointer-events-none",
        ].join(" ")}
      />

      {/* Panel. Bottom-right corner card on desktop, full sheet on mobile. */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Birchbank tee time booking"
        className={[
          "fixed z-50",
          // Mobile: full-screen sheet from the bottom
          "inset-x-0 bottom-0 top-12",
          // Desktop: pinned bottom-right corner card
          "md:inset-auto md:right-6 md:bottom-6 md:top-auto md:left-auto",
          "md:w-[min(460px,calc(100vw-3rem))] md:h-[min(760px,calc(100vh-7rem))]",
          "bg-paper shadow-[0_-12px_40px_-10px_rgba(43,42,40,0.45)]",
          "rounded-t-md md:rounded-md overflow-hidden",
          "flex flex-col",
          "transition-all duration-300 ease-out will-change-transform",
          open
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6 pointer-events-none",
        ].join(" ")}
      >
        <header className="flex items-center justify-between px-5 py-3 border-b border-granite/12 bg-paper">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-silt">
              Birchbank Golf
            </p>
            <p className="font-display text-base text-granite leading-tight">
              Book a tee time
            </p>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close the booking panel"
            className="w-11 h-11 -mr-2 inline-flex items-center justify-center text-granite hover:text-amber transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber rounded-sm"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
              <path
                d="M3 3 L13 13 M13 3 L3 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="square"
                fill="none"
              />
            </svg>
          </button>
        </header>

        <div className="flex-1 relative bg-paper">
          {/* Iframe is mounted on first open and kept alive thereafter
              so re-opening doesn't reset the booking flow. */}
          {open || iframeLoaded ? (
            <iframe
              ref={iframeRef}
              src={WIDGET_SRC}
              title="Birchbank Golf, Chronogolf tee time booking"
              className="absolute inset-0 w-full h-full border-0 bg-paper"
              allow="payment"
              onLoad={() => setIframeLoaded(true)}
            />
          ) : null}

          {!iframeLoaded && (
            <div className="absolute inset-0 grid place-items-center bg-paper">
              <div className="flex flex-col items-center gap-3 text-silt">
                <span
                  aria-hidden
                  className="block w-6 h-6 rounded-full border-2 border-granite/15 border-t-cedar animate-spin"
                />
                <p className="font-mono text-[11px] uppercase tracking-[0.16em]">
                  Loading tee sheet
                </p>
              </div>
            </div>
          )}
        </div>

        <footer className="px-5 py-3 border-t border-granite/12 bg-paper text-[13px] text-silt flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono inline-flex items-center min-h-[44px]">
            Or call{" "}
            <a
              href="tel:+12506932255"
              className="text-granite hover:text-amber underline underline-offset-2 inline-flex items-center min-h-[44px] ml-1 px-1"
            >
              250-693-2255
            </a>
          </span>
          <a
            href="/book"
            className="font-mono text-granite hover:text-amber underline underline-offset-2 inline-flex items-center min-h-[44px]"
          >
            Open in full page →
          </a>
        </footer>
      </aside>
    </>
  );
}
