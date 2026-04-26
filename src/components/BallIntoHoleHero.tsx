"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const FRAME_COUNT = 120;
const FRAME_PATH = (i: number) => `/hero/${String(i + 1).padStart(4, "0")}.webp`;

/**
 * Scroll-scrubbed image sequence hero, works identically across fine and
 * coarse pointer devices.
 *
 * Layout is driven by CSS (see .hero-wrap / .hero-inner in globals.css):
 *   • Fine pointer (desktop): wrapper is 100vh + inner absolute → GSAP pins it
 *   • Coarse pointer (touch):  wrapper is 300vh + inner sticky  → GSAP scrubs
 *     frames across the 300vh scroll distance without pinning
 *
 * Keeping the layout in CSS avoids SSR/client hydration mismatches.
 */
export default function BallIntoHoleHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [reduced, setReduced] = useState(false);
  const [framesAvailable, setFramesAvailable] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const probe = new Image();
    probe.onload = () => setFramesAvailable(true);
    probe.onerror = () => setFramesAvailable(false);
    probe.src = FRAME_PATH(0);
  }, []);

  useEffect(() => {
    if (reduced || !framesAvailable) return;

    const canvas = canvasRef.current;
    const hero = heroRef.current;
    if (!canvas || !hero) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const images: HTMLImageElement[] = [];
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = FRAME_PATH(i);
      images.push(img);
    }

    const sizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, rect.width * dpr);
      canvas.height = Math.max(1, rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    sizeCanvas();

    const state = { frame: 0 };
    let ticking = false;
    let gsapCtx: { revert: () => void } | null = null;

    // Horizontal crop bias. The source video has the ball entering from the
    // left and the hole at ~75% of frame width. A pure center crop on a
    // portrait viewport would lose the hole off the right edge, so we
    // right-bias the crop on narrow / portrait viewports while keeping
    // wide / desktop viewports centered. 0 = left-aligned, 0.5 = center,
    // 1 = right-aligned.
    const focalX = () => {
      const vw = window.innerWidth;
      const portrait = window.innerHeight > vw;
      if (vw <= 480) return 0.75;            // phone portrait
      if (vw <= 768 && portrait) return 0.65; // tablet portrait
      if (vw <= 1024) return 0.55;            // small laptop / split screen
      return 0.5;                              // desktop / wide
    };

    const render = (frame: number) => {
      const img = images[Math.floor(frame)];
      if (!img?.complete || img.naturalWidth === 0) return;
      const rect = canvas.getBoundingClientRect();
      const cw = rect.width;
      const ch = rect.height;
      const ir = img.naturalWidth / img.naturalHeight;
      const cr = cw / ch;
      let dw = cw, dh = ch, dx = 0, dy = 0;
      if (ir > cr) {
        // Image wider than canvas: scale to match height, crop horizontally.
        dh = ch;
        dw = ch * ir;
        dx = -(dw - cw) * focalX();
      } else {
        // Image taller than canvas (very rare here): scale to width, crop vertically.
        dw = cw;
        dh = cw / ir;
        dy = (ch - dh) / 2;
      }
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);
    };

    images[0].onload = () => render(0);
    if (images[0].complete) render(0);

    // Hold a ref to ScrollTrigger so the resize handler can refresh it once
    // GSAP has finished loading. On resize, both the canvas pixel buffer AND
    // GSAP's pin-spacer math need to be recomputed or you get a ghosted /
    // duplicated render (the canvas drew to new dimensions but GSAP thinks
    // the pin is still at the old ones).
    let scrollTriggerRef: { refresh: () => void } | null = null;

    // Debounce + batch: resize events fire hundreds of times during a drag.
    // Running sizeCanvas / render on every one leaves the canvas in half-
    // painted states. Debounce lightly; rAF the settle so we paint once the
    // layout has actually relaxed.
    //
    // Mobile-specific: the iOS/Android URL bar collapses on scroll, which
    // fires resize on every frame of the chrome animation but only changes
    // the viewport HEIGHT, not its width. Letting that re-run sizeCanvas +
    // ScrollTrigger.refresh mid-scroll causes a visible canvas-clear-and-
    // redraw flicker plus a sticky-element re-pin jolt. So we ignore any
    // resize where the width has not changed; orientation changes (which
    // do change width) and desktop window resizes still re-fit correctly.
    let resizeTimer: number | undefined;
    let resizeRAF: number | undefined;
    let lastWidth = window.innerWidth;
    const handleResize = () => {
      const w = window.innerWidth;
      if (w === lastWidth) return; // height-only change (URL bar): ignore
      lastWidth = w;
      if (resizeTimer) window.clearTimeout(resizeTimer);
      if (resizeRAF) cancelAnimationFrame(resizeRAF);
      resizeTimer = window.setTimeout(() => {
        resizeRAF = requestAnimationFrame(() => {
          sizeCanvas();
          render(state.frame);
          scrollTriggerRef?.refresh();
        });
      }, 120);
    };

    // Orientation flips reset our cached width too, since the new portrait /
    // landscape width is genuinely different.
    const handleOrientation = () => {
      lastWidth = window.innerWidth;
      handleResize();
    };

    // ResizeObserver on the canvas would also fire on URL-bar collapse; skip
    // it on touch devices and rely on width-gated window resize instead.
    const isCoarsePointer = matchMedia("(pointer: coarse)").matches;
    const ro =
      !isCoarsePointer && "ResizeObserver" in window
        ? new ResizeObserver(handleResize)
        : null;
    ro?.observe(canvas);
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleOrientation);

    (async () => {
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      const gsap = gsapMod.default || gsapMod.gsap;
      const ScrollTrigger = stMod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      scrollTriggerRef = ScrollTrigger;

      const isCoarse = matchMedia("(pointer: coarse)").matches;

      type LenisLike = { on: (e: string, cb: () => void) => void; raf: (t: number) => void; destroy: () => void };
      let lenis: LenisLike | null = null;
      if (!isCoarse) {
        const { default: Lenis } = await import("lenis");
        const instance = new Lenis({ smoothWheel: true, duration: 1.1 });
        lenis = instance as unknown as LenisLike;
        lenis.on("scroll", ScrollTrigger.update);
        const loop = (t: number) => { lenis?.raf(t); requestAnimationFrame(loop); };
        requestAnimationFrame(loop);
      }

      gsapCtx = gsap.context(() => {
        const common = {
          frame: FRAME_COUNT - 1,
          snap: "frame",
          ease: "none",
          onUpdate: () => {
            if (!ticking) {
              ticking = true;
              requestAnimationFrame(() => { render(state.frame); ticking = false; });
            }
          },
        };

        // Same approach on every viewport: a long sticky wrapper (CSS in
        // globals.css) plus a scroll-scrubbed frame sequence. We deliberately
        // do NOT use GSAP's `pin: true` on desktop anymore. That option
        // wraps the trigger element in a `.pin-spacer` div as a side effect
        // of layout, and on SPA navigation away from the home page React's
        // reconciler tries to remove the original element from its original
        // parent, which is no longer where it is. That's the source of the
        // intermittent "Failed to execute 'removeChild' on 'Node'" 404
        // cascade visitors were hitting on /course (and elsewhere). CSS
        // sticky leaves the element exactly where React put it, so
        // unmounting is clean.
        gsap.to(state, {
          ...common,
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom bottom",
            scrub: isCoarse ? true : 0.4,
            invalidateOnRefresh: true,
          },
        });
      }, hero);

      return () => {
        lenis?.destroy?.();
      };
    })();

    return () => {
      ro?.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleOrientation);
      if (resizeTimer) window.clearTimeout(resizeTimer);
      if (resizeRAF) cancelAnimationFrame(resizeRAF);
      gsapCtx?.revert();
    };
  }, [reduced, framesAvailable]);

  return (
    <section
      ref={heroRef}
      className="hero-wrap"
      aria-label="Birchbank Golf, opening sequence"
    >
      <div className="hero-inner">
        {framesAvailable && !reduced ? (
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="absolute inset-0 w-full h-full"
          />
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(43,42,40,0.25), rgba(43,42,40,0.55)), url(/hero/fallback.jpg)",
              backgroundColor: "#2B2A28",
            }}
            aria-hidden="true"
          />
        )}

        {/* Scrim, balanced across the frame so text reads cleanly across the
            varied bokeh. Slightly darker top (nav legibility), light middle
            (let the grass show), stronger bottom (protects hero text + CTAs). */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-granite/35 via-granite/15 to-granite/85"
          aria-hidden="true"
        />

        <div
          className="relative h-full container-edge flex flex-col justify-end pb-20 sm:pb-24 md:pb-28"
          style={{ textShadow: "0 1px 2px rgba(20,20,20,0.35), 0 4px 18px rgba(20,20,20,0.35)" }}
        >
          <p className="font-mono uppercase tracking-[0.16em] text-paper/95 mb-3 md:mb-5 text-[11px] sm:text-xs">
            Genelle, British Columbia · Since 1962
          </p>
          <h1 className="display-xl text-paper max-w-[14ch] sm:max-w-[18ch] font-medium">
            Come for the drop.
          </h1>
          <p className="prose-editorial text-paper/95 mt-4 md:mt-6 max-w-xl text-[15px] sm:text-base md:text-lg leading-snug sm:leading-normal">
            Set along the banks of the Columbia River. The 18-hole course of the Rossland
            Trail Country Club. Open April 1 through October 31, 213 days of golf.
          </p>
          <div className="mt-7 md:mt-10 flex flex-wrap items-center gap-4 md:gap-6">
            {/* Tier 1, signature invitation (hero CTA).
                Gilt-edged cedar artifact, not a standard button.
                Do NOT add .chrono-bookingbutton here: the Chronogolf
                script clones that class and the cloned anchor hides
                our styled one. The bottom-right widget already owns
                the Chronogolf trigger role; this link navigates to
                /book where the inline widget is embedded. */}
            <Link
              href="/book"
              className="header-cta header-cta-primary whitespace-nowrap"
            >
              Book a tee time
              <span aria-hidden className="text-tamarack">→</span>
            </Link>
            {/* Tier 2, editorial secondary.
                Gambetta serif with a hairline underline; inherits
                currentColor so it reads correctly on the dark hero. */}
            <Link
              href="/course"
              className="header-cta header-cta-editorial text-paper"
            >
              Walk the 18
            </Link>
          </div>
        </div>

        <a
          href="#below-hero"
          className="absolute bottom-5 right-5 md:bottom-6 md:right-6 z-10 text-paper/70 hover:text-tamarack text-xs font-mono"
        >
          Skip intro ↓
        </a>
      </div>

      <span id="below-hero" className="sr-only">
        End of hero
      </span>
    </section>
  );
}
