"use client";

import { useEffect, useRef, useState } from "react";
import BookButton from "./BookButton";

const FRAME_COUNT = 120;
const FRAME_PATH = (i: number) => `/hero/${String(i + 1).padStart(4, "0")}.webp`;

export default function BallIntoHoleHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
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
    // Probe first frame — if 404, render the static fallback gracefully.
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

    // Preload all frames
    const images: HTMLImageElement[] = [];
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = FRAME_PATH(i);
      images.push(img);
    }
    imagesRef.current = images;

    const sizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    sizeCanvas();
    window.addEventListener("resize", sizeCanvas);

    const state = { frame: 0 };
    let ticking = false;
    let gsapCtx: { revert: () => void } | null = null;

    const render = (frame: number) => {
      const img = images[Math.floor(frame)];
      if (!img?.complete || img.naturalWidth === 0) return;
      const { width: cw, height: ch } = canvas.getBoundingClientRect();
      const ir = img.naturalWidth / img.naturalHeight;
      const cr = cw / ch;
      let dw = cw, dh = ch, dx = 0, dy = 0;
      if (ir > cr) { dh = ch; dw = ch * ir; dx = (cw - dw) / 2; }
      else { dw = cw; dh = cw / ir; dy = (ch - dh) / 2; }
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);
    };

    // First frame as soon as possible
    images[0].onload = () => render(0);
    if (images[0].complete) render(0);

    (async () => {
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      const gsap = gsapMod.default || gsapMod.gsap;
      const ScrollTrigger = stMod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      // Lenis smooth scroll — desktop only
      type LenisLike = { on: (e: string, cb: () => void) => void; raf: (t: number) => void; destroy: () => void };
      let lenis: LenisLike | null = null;
      const isTouch = matchMedia("(pointer: coarse)").matches;
      if (!isTouch) {
        const { default: Lenis } = await import("lenis");
        const instance = new Lenis({ smoothWheel: true, duration: 1.1 });
        lenis = instance as unknown as LenisLike;
        lenis.on("scroll", ScrollTrigger.update);
        const loop = (t: number) => { lenis?.raf(t); requestAnimationFrame(loop); };
        requestAnimationFrame(loop);
      }

      gsapCtx = gsap.context(() => {
        gsap.to(state, {
          frame: FRAME_COUNT - 1,
          snap: "frame",
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "+=1200",
            scrub: 0.5,
            pin: !isTouch,
            anticipatePin: 1,
          },
          onUpdate: () => {
            if (!ticking) {
              ticking = true;
              requestAnimationFrame(() => { render(state.frame); ticking = false; });
            }
          },
        });
      }, hero);

      return () => {
        lenis?.destroy?.();
      };
    })();

    return () => {
      window.removeEventListener("resize", sizeCanvas);
      gsapCtx?.revert();
    };
  }, [reduced, framesAvailable]);

  return (
    <section
      ref={heroRef}
      className="relative w-full h-[100vh] bg-granite overflow-hidden"
      aria-label="Birchbank Golf — opening sequence"
    >
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
            backgroundImage: "linear-gradient(180deg, rgba(43,42,40,0.25), rgba(43,42,40,0.55)), url(/hero/fallback.jpg)",
            backgroundColor: "#2B2A28",
          }}
          aria-hidden="true"
        />
      )}

      {/* Scrim for legibility */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-granite/10 via-transparent to-granite/60"
        aria-hidden="true"
      />

      {/* Text overlay */}
      <div className="relative h-full container-edge flex flex-col justify-end pb-20 md:pb-28">
        <p className="eyebrow text-paper/80 mb-5">Genelle, British Columbia · Since 1962</p>
        <h1 className="display-xl text-paper max-w-[18ch]">
          Birchbank Golf Club.
        </h1>
        <p className="prose-editorial text-paper/85 mt-6 max-w-xl">
          Set along the banks of the Columbia River. The 18-hole course of the Rossland
          Trail Country Club. Open April 1 through October 31 — 213 days of golf.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-5">
          <BookButton />
          <a href="/course" className="btn-ghost text-paper border-paper/70 hover:text-tamarack hover:border-tamarack">
            Walk the 18 →
          </a>
        </div>
      </div>

      {/* Skip-intro affordance */}
      <a
        href="#below-hero"
        className="absolute bottom-6 right-6 z-10 text-paper/70 hover:text-tamarack text-xs font-mono"
      >
        Skip intro ↓
      </a>

      <span id="below-hero" className="sr-only">End of hero</span>
    </section>
  );
}
