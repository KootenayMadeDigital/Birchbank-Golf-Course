"use client";

import { useEffect, useRef, useState } from "react";

/**
 * "Live" conditions widget — static numbers for now, animated feel.
 * Timestamp updates once per minute; a small green dot pulses beside it.
 * Once wired to a real feed, swap `useStaticConditions` for a fetcher.
 */
function useNow() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const tick = () => setNow(new Date());
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export default function ConditionsWidget() {
  const ref = useRef<HTMLDivElement>(null);
  const now = useNow();
  const [greens, setGreens] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setGreens(10.2);
      return;
    }

    let cleanup: (() => void) | undefined;
    (async () => {
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      const gsap = gsapMod.default || gsapMod.gsap;
      const ScrollTrigger = stMod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      const obj = { value: 0 };
      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              value: 10.2,
              duration: 1.6,
              ease: "power2.out",
              onUpdate: () => setGreens(Number(obj.value.toFixed(1))),
            });
          },
        });
      }, el);
      cleanup = () => ctx.revert();
    })();
    return () => cleanup?.();
  }, []);

  const day = now.toLocaleDateString("en-CA", { weekday: "long" });
  const time = now.toLocaleTimeString("en-CA", { hour: "numeric", minute: "2-digit" });

  return (
    <aside
      ref={ref}
      aria-label="Course conditions"
      aria-live="polite"
      className="border border-granite/15 bg-paper rounded-sm p-6 md:p-7"
    >
      <div className="flex items-center justify-between mb-5">
        <p className="eyebrow text-cedar">Conditions</p>
        <div className="flex items-center gap-2 font-mono text-xs text-silt">
          <span className="relative inline-flex w-2 h-2">
            <span className="absolute inset-0 rounded-full bg-cedar animate-pulse-live" />
            <span className="relative inline-flex rounded-full w-2 h-2 bg-cedar" />
          </span>
          Live
        </div>
      </div>

      <p className="font-mono text-sm leading-relaxed text-granite">
        {day}, {time}. Course open.
      </p>

      <dl className="mt-5 grid grid-cols-2 gap-y-3 gap-x-6 font-mono text-sm">
        <div>
          <dt className="text-silt text-xs">Greens speed</dt>
          <dd className="font-display text-2xl text-granite mt-0.5">
            {greens.toFixed(1)}
          </dd>
        </div>
        <div>
          <dt className="text-silt text-xs">Fairway firmness</dt>
          <dd className="font-display text-2xl text-granite mt-0.5">
            7<span className="text-silt text-base">/10</span>
          </dd>
        </div>
        <div>
          <dt className="text-silt text-xs">Wind</dt>
          <dd className="font-display text-2xl text-granite mt-0.5">SW 12</dd>
        </div>
        <div>
          <dt className="text-silt text-xs">Frost delay</dt>
          <dd className="font-display text-2xl text-granite mt-0.5">None</dd>
        </div>
      </dl>

      <a href="/conditions" className="mt-6 inline-block text-xs text-amber hover:underline font-mono">
        Full conditions report →
      </a>
    </aside>
  );
}
