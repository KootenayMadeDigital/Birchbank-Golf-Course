"use client";

import { useEffect, useRef, useState } from "react";

/**
 * WindCompass, a Canvas2D wind visualization.
 *
 * The face is a paper-toned compass with subtle silt tick marks for the
 * cardinals. Translucent streaks drift across in the direction the wind
 * is BLOWING TOWARD, scaled in count, color, and speed by `kmh`. A faint
 * compass rose etches behind the streaks. The center reads the kmh value
 * and the cardinal direction.
 *
 * Behavior:
 *   - Pauses via IntersectionObserver when off-screen (no wasted frames).
 *   - Honors `prefers-reduced-motion`: falls back to a static SVG arrow.
 *   - Caps streaks at 60 to keep the frame budget under 16 ms on mid phones.
 *   - Subtle "gust" every 4 to 8 s briefly accelerates the streaks.
 *
 * The arrow / streak direction matches how a player reads wind on the
 * tee: bearing is meteorological (where it comes FROM), so we add 180°
 * to render the direction it heads TOWARD.
 */
export default function WindCompass({
  bearing,
  kmh,
  cardinal,
  size = 160,
}: {
  /** Meteorological bearing 0..360, where the wind comes FROM. */
  bearing: number;
  kmh: number;
  cardinal: string;
  size?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // HiDPI: render at devicePixelRatio for crisp lines.
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    // Visualization parameters scaled from kmh.
    // Streak count, color, base speed.
    const tier = (() => {
      if (kmh < 5) return { count: 8, color: "rgba(140,138,130,0.55)", speed: 12, length: 10, waver: 0.0 };
      if (kmh < 15) return { count: 22, color: "rgba(200,155,60,0.62)", speed: 32, length: 14, waver: 0.4 };
      if (kmh < 30) return { count: 44, color: "rgba(181,105,31,0.62)", speed: 60, length: 18, waver: 1.1 };
      return { count: 60, color: "rgba(181,105,31,0.72)", speed: 92, length: 22, waver: 1.9 };
    })();

    // Cap at 60 hard.
    const STREAK_MAX = 60;
    const count = Math.min(STREAK_MAX, tier.count);

    // The radius the streaks live within (slight inset so they fade at the rim).
    const cx = size / 2;
    const cy = size / 2;
    const radius = size / 2 - 4;

    // Pre-rotate so streaks always travel "downwind" along +x in our local
    // frame. We rotate the whole canvas by the wind's TOWARD direction.
    // Canvas 0° is +x (east). Wind bearing 0 (from N) heads TOWARD S.
    // Rotation in canvas: degrees clockwise. To make streaks head south we
    // need to rotate by 90°. General formula:
    //   towardDeg = (bearing + 180) % 360       // compass deg, 0=N
    //   canvasRot = towardDeg - 90              // shift so 0 maps to +x
    const towardDeg = (bearing + 180) % 360;
    const canvasRot = ((towardDeg - 90) * Math.PI) / 180;

    type Streak = {
      x: number; // local frame: -radius..+radius along travel axis
      y: number; // local frame: -radius..+radius across
      v: number; // per-streak speed multiplier
      len: number;
      alpha: number;
      waver: number; // phase
    };

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const streaks: Streak[] = Array.from({ length: count }).map(() => ({
      x: rand(-radius, radius),
      y: rand(-radius, radius),
      v: rand(0.7, 1.25),
      len: rand(tier.length * 0.6, tier.length * 1.2),
      alpha: rand(0.5, 1),
      waver: rand(0, Math.PI * 2),
    }));

    // Pre-render the static face (rim, ticks, rose) onto an offscreen
    // canvas so we don't repaint it 60 times per second.
    const face = document.createElement("canvas");
    face.width = size * dpr;
    face.height = size * dpr;
    const fctx = face.getContext("2d")!;
    fctx.scale(dpr, dpr);

    // Outer ring
    fctx.strokeStyle = "rgba(43,42,40,0.18)";
    fctx.lineWidth = 1;
    fctx.beginPath();
    fctx.arc(cx, cy, radius + 1, 0, Math.PI * 2);
    fctx.stroke();

    // Faint compass rose: 8 arms at very low opacity.
    fctx.strokeStyle = "rgba(43,42,40,0.06)";
    fctx.lineWidth = 1;
    for (let i = 0; i < 8; i++) {
      const a = (i * Math.PI) / 4;
      fctx.beginPath();
      fctx.moveTo(cx + Math.cos(a) * (radius * 0.18), cy + Math.sin(a) * (radius * 0.18));
      fctx.lineTo(cx + Math.cos(a) * (radius * 0.92), cy + Math.sin(a) * (radius * 0.92));
      fctx.stroke();
    }

    // Cardinal ticks
    const cardinals = [
      { deg: 0, label: "N" },
      { deg: 90, label: "E" },
      { deg: 180, label: "S" },
      { deg: 270, label: "W" },
    ];
    fctx.strokeStyle = "rgba(43,42,40,0.42)";
    fctx.lineWidth = 1;
    for (const c of cardinals) {
      const rad = ((c.deg - 90) * Math.PI) / 180;
      fctx.beginPath();
      fctx.moveTo(cx + Math.cos(rad) * (radius - 2), cy + Math.sin(rad) * (radius - 2));
      fctx.lineTo(cx + Math.cos(rad) * (radius - 8), cy + Math.sin(rad) * (radius - 8));
      fctx.stroke();
    }

    // Cardinal labels
    fctx.fillStyle = "rgba(43,42,40,0.55)";
    fctx.font = `${Math.max(9, size * 0.062)}px var(--font-mono), ui-monospace, monospace`;
    fctx.textAlign = "center";
    fctx.textBaseline = "middle";
    const labelR = radius - 16;
    for (const c of cardinals) {
      const rad = ((c.deg - 90) * Math.PI) / 180;
      fctx.fillText(c.label, cx + Math.cos(rad) * labelR, cy + Math.sin(rad) * labelR);
    }

    // Animation state
    let visible = true;
    let lastTs = performance.now();
    let gustUntil = 0;
    let nextGust = performance.now() + rand(4000, 8000);

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          visible = e.isIntersecting;
        }
      },
      { threshold: 0.05 },
    );
    io.observe(wrap);

    const draw = (ts: number) => {
      rafRef.current = requestAnimationFrame(draw);
      if (!visible) {
        lastTs = ts;
        return;
      }
      const dt = Math.min(0.05, (ts - lastTs) / 1000);
      lastTs = ts;

      // Gust handling: brief acceleration every 4-8 s.
      let gustMul = 1;
      if (ts < gustUntil) {
        gustMul = 1.9;
      } else if (ts > nextGust) {
        gustUntil = ts + rand(450, 900);
        nextGust = ts + rand(4000, 8000);
      }

      // Clear and redraw face.
      ctx.clearRect(0, 0, size, size);
      ctx.drawImage(face, 0, 0, size, size);

      // Clip streaks to a circle so they fade past the rim.
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius - 1, 0, Math.PI * 2);
      ctx.clip();

      // Rotate so the streak travel axis (+x) matches the wind toward direction.
      ctx.translate(cx, cy);
      ctx.rotate(canvasRot);

      ctx.lineCap = "round";
      ctx.lineWidth = kmh >= 30 ? 1.6 : 1;
      ctx.strokeStyle = tier.color;

      const baseSpeed = tier.speed;
      for (const s of streaks) {
        s.x += baseSpeed * s.v * gustMul * dt;
        // Subtle waver perpendicular to travel, scaled by tier.
        if (tier.waver > 0) {
          s.waver += dt * 2.4;
          s.y += Math.sin(s.waver) * tier.waver * dt * 6;
        }
        // Wrap around.
        if (s.x - s.len > radius) {
          s.x = -radius - s.len * 0.5;
          s.y = rand(-radius, radius);
          s.alpha = rand(0.5, 1);
        }
        // Edge fade based on distance from center perpendicular to travel.
        const edgeFade = 1 - Math.min(1, Math.abs(s.y) / radius);
        const a = s.alpha * (0.45 + 0.55 * edgeFade);
        ctx.globalAlpha = a;
        ctx.beginPath();
        ctx.moveTo(s.x - s.len, s.y);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      ctx.restore();
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      io.disconnect();
    };
  }, [bearing, kmh, size, reduced]);

  // Numeric readout sizing scales with the compass size.
  const numSize = Math.round(size * 0.22);
  const captionSize = Math.max(9, Math.round(size * 0.062));

  return (
    <div
      ref={wrapRef}
      className="relative inline-block select-none"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`Wind ${kmh} km/h from ${cardinal}`}
    >
      {reduced ? (
        <StaticArrow bearing={bearing} cardinal={cardinal} size={size} />
      ) : (
        <canvas ref={canvasRef} className="block" />
      )}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        aria-hidden
      >
        <span
          className="font-display text-granite leading-none tabular-nums"
          style={{ fontSize: numSize }}
        >
          {kmh}
        </span>
        <span
          className="font-mono text-silt mt-1 tracking-widest uppercase"
          style={{ fontSize: captionSize }}
        >
          km/h · {cardinal}
        </span>
      </div>
    </div>
  );
}

/** Static fallback for prefers-reduced-motion. Same shape, no animation. */
function StaticArrow({
  bearing,
  cardinal,
  size,
}: {
  bearing: number;
  cardinal: string;
  size: number;
}) {
  void cardinal; // label is rendered by the parent overlay
  const r = size / 2;
  const arrowRot = (bearing + 180) % 360;
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} className="block">
      <circle cx={r} cy={r} r={r - 4} fill="none" stroke="rgba(43,42,40,0.18)" />
      {[0, 90, 180, 270].map((deg) => {
        const rad = ((deg - 90) * Math.PI) / 180;
        const x1 = r + Math.cos(rad) * (r - 6);
        const y1 = r + Math.sin(rad) * (r - 6);
        const x2 = r + Math.cos(rad) * (r - 12);
        const y2 = r + Math.sin(rad) * (r - 12);
        return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(43,42,40,0.42)" />;
      })}
      <g transform={`rotate(${arrowRot} ${r} ${r})`}>
        <path
          d={`M ${r} ${14} L ${r - 6} ${24} L ${r} ${20} L ${r + 6} ${24} Z`}
          fill="var(--color-tamarack)"
        />
        <line
          x1={r}
          y1={r}
          x2={r}
          y2={20}
          stroke="var(--color-tamarack)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
