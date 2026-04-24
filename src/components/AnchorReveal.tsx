"use client";

import { useEffect, useRef } from "react";
import { useNow, getSeasonStatus } from "@/lib/season";

/**
 * The emotional anchor after the hero lands, "213 days on the Columbia."
 * Full-viewport cream block with scroll-triggered stagger on each line.
 *
 * The fourth chip in the metadata row is live: it reads the visitor's
 * clock, computes day-of-season, and shows a tamarack pulse dot when the
 * course is open. Other three chips are static by design, the Aman
 * discipline of "one thing moves per view."
 */
export default function AnchorReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const now = useNow();
  const season = now ? getSeasonStatus(now) : null;
  const time = now ? now.toLocaleTimeString("en-CA", { hour: "numeric", minute: "2-digit" }) : "";
  const isOpen = season?.label === "Open";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.querySelectorAll<HTMLElement>("[data-reveal]").forEach((node) => {
        node.style.opacity = "1";
        node.style.transform = "none";
      });
      return;
    }

    let cleanup: (() => void) | undefined;

    (async () => {
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      const gsap = gsapMod.default || gsapMod.gsap;
      const ScrollTrigger = stMod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.fromTo(
          el.querySelectorAll("[data-reveal]"),
          { y: 48, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.0,
            ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: el,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          },
        );
      }, el);
      cleanup = () => ctx.revert();
    })();

    return () => cleanup?.();
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-[100vh] flex items-center py-[var(--spacing-section)]"
      aria-labelledby="anchor-heading"
    >
      <div className="container-edge w-full">
        <p data-reveal className="eyebrow mb-8 opacity-0" style={{ willChange: "transform, opacity" }}>
          The course
        </p>
        <h2
          id="anchor-heading"
          data-reveal
          className="font-display text-granite opacity-0"
          style={{
            fontSize: "clamp(2.5rem, 10vw, 9rem)",
            lineHeight: "0.95",
            letterSpacing: "-0.02em",
            willChange: "transform, opacity",
          }}
        >
          213 days<br />on the Columbia.
        </h2>
        <div
          data-reveal
          className="mt-10 max-w-2xl prose-editorial text-granite/85 opacity-0"
          style={{ willChange: "transform, opacity" }}
        >
          <p>
            One river. Sixty-plus seasons. The 18-hole course of the Rossland Trail
            Country Club, routed by local pro Roy Stone and restored in 2018 to his
            original 1969 layout. Surrounded by the Selkirk and Monashee mountains.
          </p>
        </div>

        <div
          data-reveal
          className="mt-12 md:mt-14 pt-8 md:pt-10 border-t border-granite/15 grid grid-cols-2 md:flex md:flex-wrap gap-x-6 md:gap-x-10 gap-y-3 font-mono text-xs md:text-sm text-silt opacity-0"
          style={{ willChange: "transform, opacity" }}
        >
          <span><span className="text-granite">Par 72</span> · 18 holes</span>
          <span><span className="text-granite">6,788 yd</span> · Gold tees</span>
          <span><span className="text-granite">Genelle, BC</span> · on the Columbia</span>
          {/* Live chip, only this one animates. Renders a neutral placeholder
              during SSR/pre-hydration so the layout doesn't shift when the
              client clock kicks in. */}
          {season && now ? (
            <span className="inline-flex items-center gap-2 whitespace-nowrap">
              {isOpen ? (
                <span className="relative inline-flex h-2 w-2 shrink-0">
                  <span className="absolute inset-0 rounded-full bg-tamarack animate-pulse-live" aria-hidden="true" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-tamarack" aria-hidden="true" />
                </span>
              ) : null}
              <span className="text-granite">
                {isOpen && season.dayOfSeason ? `Day ${season.dayOfSeason} of 213` : season.label}
              </span>
              {time ? <span>· {time}</span> : null}
            </span>
          ) : (
            <span><span className="text-granite">Apr 1 – Oct 31</span> · 213-day season</span>
          )}
        </div>
      </div>
    </section>
  );
}
