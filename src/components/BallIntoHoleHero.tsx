"use client";

import { useEffect, useRef, useState } from "react";
import BookButton from "./BookButton";

const FRAME_COUNT = 120;
const FRAME_PATH = (i: number) => `/hero/${String(i + 1).padStart(4, "0")}.webp`;

/**
 * Scroll-scrubbed image sequence hero — works identically across fine and
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

    // Re-render current frame on resize/rotate so the new focal bias takes effect
    // without waiting for the next scroll tick.
    const onResize = () => { sizeCanvas(); render(state.frame); };
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    (async () => {
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      const gsap = gsapMod.default || gsapMod.gsap;
      const ScrollTrigger = stMod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

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

        if (isCoarse) {
          // Touch: 300vh wrapper + sticky inner. Progress 0→1 maps to frames 0→119.
          gsap.to(state, {
            ...common,
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.4,
              invalidateOnRefresh: true,
            },
          });
        } else {
          // Desktop: 100vh section, pinned, scrubbed across an extra 1200px of scroll.
          gsap.to(state, {
            ...common,
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "+=1200",
              scrub: 0.5,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
        }
      }, hero);

      return () => {
        lenis?.destroy?.();
      };
    })();

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      gsapCtx?.revert();
    };
  }, [reduced, framesAvailable]);

  return (
    <section
      ref={heroRef}
      className="hero-wrap relative w-full bg-granite"
      aria-label="Birchbank Golf — opening sequence"
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

        <div
          className="absolute inset-0 bg-gradient-to-b from-granite/10 via-transparent to-granite/70"
          aria-hidden="true"
        />

        <div className="relative h-full container-edge flex flex-col justify-end pb-16 sm:pb-20 md:pb-28">
          <p className="eyebrow text-paper/80 mb-4 md:mb-5">
            Genelle, British Columbia · Since 1962
          </p>
          <h1 className="display-xl text-paper max-w-[18ch]">Birchbank Golf Club.</h1>
          <p className="prose-editorial text-paper/85 mt-5 md:mt-6 max-w-xl text-base md:text-lg">
            Set along the banks of the Columbia River. The 18-hole course of the Rossland
            Trail Country Club. Open April 1 through October 31 — 213 days of golf.
          </p>
          <div className="mt-8 md:mt-10 flex flex-wrap items-center gap-4 md:gap-5">
            <BookButton />
            <a
              href="/course"
              className="btn-ghost text-paper border-paper/70 hover:text-tamarack hover:border-tamarack"
            >
              Walk the 18 →
            </a>
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
