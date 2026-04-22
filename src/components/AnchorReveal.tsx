"use client";

import { useEffect, useRef } from "react";

/**
 * The emotional anchor after the hero lands — "213 days on the Columbia."
 * Full-viewport cream block with scroll-triggered stagger on each line.
 */
export default function AnchorReveal() {
  const ref = useRef<HTMLDivElement>(null);

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
            fontSize: "clamp(3rem, 10vw, 9rem)",
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
          className="mt-14 pt-10 border-t border-granite/15 flex flex-wrap gap-x-10 gap-y-3 font-mono text-sm text-silt opacity-0"
          style={{ willChange: "transform, opacity" }}
        >
          <span><span className="text-granite">Par 72</span> · 18 holes</span>
          <span><span className="text-granite">6,788 yd</span> · from the Gold tees</span>
          <span><span className="text-granite">Since 1962</span> · restored 2018</span>
          <span><span className="text-granite">Genelle, BC</span> · on the Columbia</span>
        </div>
      </div>
    </section>
  );
}
