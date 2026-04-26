"use client";

import { useEffect, useRef, useState } from "react";

/**
 * WindCompass, a cinematic Canvas2D wind visualization.
 *
 * Six layers, drawn back-to-front:
 *   1. Atmospheric backdrop  - radial gradient that warms with wind speed
 *   2. Compass face          - rim, 16-arm rose, cardinal labels (cached)
 *   3. Speed ring            - Apple-Watch-style concentric arc, animates
 *                              from 0 to (kmh / 50) on mount, gradient stroke
 *   4. Streak field          - up to 90 streaks with head-to-tail gradients,
 *                              two parallax layers, perpendicular waver,
 *                              random gusts every 4-8 s
 *   5. Direction arrow       - big tamarack chevron indicating wind-toward,
 *                              spring-damped when bearing changes
 *   6. Numeric readout       - kmh + Beaufort label + cardinal, in HTML
 *
 * Behavior:
 *   - Pauses via IntersectionObserver when off-screen.
 *   - Honors prefers-reduced-motion: falls back to a static SVG arrow.
 *   - Hover/touch-down briefly accelerates streaks 2.4x (manual gust).
 */

const BEAUFORT = (kmh: number): { label: string; tone: "silt" | "tamarack" | "amber" } => {
  if (kmh < 5) return { label: "Calm", tone: "silt" };
  if (kmh < 12) return { label: "Light air", tone: "silt" };
  if (kmh < 20) return { label: "Light breeze", tone: "tamarack" };
  if (kmh < 29) return { label: "Moderate", tone: "tamarack" };
  if (kmh < 39) return { label: "Fresh breeze", tone: "amber" };
  if (kmh < 50) return { label: "Strong", tone: "amber" };
  return { label: "Gale", tone: "amber" };
};

export default function WindCompass({
  bearing,
  kmh,
  cardinal,
  size = 200,
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
  const hoverGustRef = useRef(false);
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

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const radius = size / 2 - 2;

    // Wind tier drives streak density, color, base speed. We always show
    // streaks (even at calm) so the compass never reads "dead".
    const tier = (() => {
      if (kmh < 5)  return { count: 32, color: [140, 138, 130], speed: 16, length: 14, waver: 0.05 };
      if (kmh < 15) return { count: 48, color: [200, 155,  60], speed: 38, length: 18, waver: 0.45 };
      if (kmh < 30) return { count: 70, color: [200, 155,  60], speed: 70, length: 22, waver: 1.0 };
      return            { count: 90, color: [181, 105,  31], speed: 105, length: 26, waver: 1.7 };
    })();
    const STREAK_MAX = 90;
    const count = Math.min(STREAK_MAX, tier.count);

    // bearing is meteorological (where wind comes FROM). Streaks travel TOWARD.
    const towardDeg = (bearing + 180) % 360;
    const canvasRot = ((towardDeg - 90) * Math.PI) / 180;

    type Streak = {
      x: number;
      y: number;
      v: number;
      len: number;
      alpha: number;
      waver: number;
      layer: 0 | 1; // 0 = far/slow/dim, 1 = near/fast/bold
    };

    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const streaks: Streak[] = Array.from({ length: count }).map((_, i) => ({
      x: rand(-radius, radius),
      y: rand(-radius, radius),
      v: rand(0.7, 1.3),
      len: rand(tier.length * 0.55, tier.length * 1.25),
      alpha: rand(0.5, 1),
      waver: rand(0, Math.PI * 2),
      layer: i % 3 === 0 ? 0 : 1,
    }));

    // Pre-render the static face.
    const face = document.createElement("canvas");
    face.width = size * dpr;
    face.height = size * dpr;
    const fctx = face.getContext("2d")!;
    fctx.scale(dpr, dpr);

    // Atmospheric backdrop: radial gradient warming with wind speed.
    const heat = Math.min(1, kmh / 40);
    const bg = fctx.createRadialGradient(cx, cy, radius * 0.2, cx, cy, radius);
    bg.addColorStop(0, `rgba(245, 242, 234, 1)`);
    bg.addColorStop(
      0.7,
      `rgba(245, 242, 234, ${0.95 - heat * 0.15})`,
    );
    bg.addColorStop(
      1,
      heat > 0.5
        ? `rgba(200, 155, 60, ${0.05 + heat * 0.07})`
        : `rgba(43, 42, 40, ${0.04 + heat * 0.03})`,
    );
    fctx.fillStyle = bg;
    fctx.beginPath();
    fctx.arc(cx, cy, radius, 0, Math.PI * 2);
    fctx.fill();

    // 16-arm compass rose (8 strong + 8 secondary).
    for (let i = 0; i < 16; i++) {
      const a = (i * Math.PI) / 8;
      const isCardinal = i % 4 === 0;
      const isOrdinal = i % 2 === 0;
      fctx.strokeStyle = isCardinal
        ? "rgba(43,42,40,0.10)"
        : isOrdinal
          ? "rgba(43,42,40,0.06)"
          : "rgba(43,42,40,0.04)";
      fctx.lineWidth = isCardinal ? 1 : 0.75;
      const inner = isCardinal ? radius * 0.16 : radius * 0.32;
      const outer = isCardinal ? radius * 0.94 : radius * 0.86;
      fctx.beginPath();
      fctx.moveTo(cx + Math.cos(a) * inner, cy + Math.sin(a) * inner);
      fctx.lineTo(cx + Math.cos(a) * outer, cy + Math.sin(a) * outer);
      fctx.stroke();
    }

    // Outer rim.
    fctx.strokeStyle = "rgba(43,42,40,0.22)";
    fctx.lineWidth = 1;
    fctx.beginPath();
    fctx.arc(cx, cy, radius - 0.5, 0, Math.PI * 2);
    fctx.stroke();

    // Cardinal ticks + labels.
    const cardinals = [
      { deg: 0, label: "N" },
      { deg: 90, label: "E" },
      { deg: 180, label: "S" },
      { deg: 270, label: "W" },
    ];
    fctx.strokeStyle = "rgba(43,42,40,0.55)";
    fctx.lineWidth = 1.2;
    for (const c of cardinals) {
      const rad = ((c.deg - 90) * Math.PI) / 180;
      fctx.beginPath();
      fctx.moveTo(cx + Math.cos(rad) * (radius - 1), cy + Math.sin(rad) * (radius - 1));
      fctx.lineTo(cx + Math.cos(rad) * (radius - 9), cy + Math.sin(rad) * (radius - 9));
      fctx.stroke();
    }

    fctx.fillStyle = "rgba(140,138,130,0.85)";
    fctx.font = `${Math.max(10, Math.round(size * 0.062))}px var(--font-mono), ui-monospace, monospace`;
    fctx.textAlign = "center";
    fctx.textBaseline = "middle";
    const labelR = radius - 18;
    for (const c of cardinals) {
      const rad = ((c.deg - 90) * Math.PI) / 180;
      fctx.fillText(c.label, cx + Math.cos(rad) * labelR, cy + Math.sin(rad) * labelR);
    }

    // Speed ring constants. Maps 0-50 km/h to a 75% sweep so even gale-force
    // doesn't fully close the loop (visual headroom).
    const ringR = radius - 4;
    const ringFullSweep = Math.PI * 1.5; // 270°
    const ringStartAngle = -Math.PI / 2 - ringFullSweep / 2; // top, centered
    const targetSpeedFrac = Math.min(1, kmh / 50);

    // Spring state for direction arrow (smoothly animates if bearing changes).
    let arrowAngle = canvasRot;
    let arrowVel = 0;
    const ARROW_STIFFNESS = 80;
    const ARROW_DAMPING = 14;

    // Speed ring draw-in.
    let speedFrac = 0;

    // Animation loop state.
    let visible = true;
    let lastTs = performance.now();
    let gustUntil = 0;
    let nextGust = performance.now() + rand(4000, 8000);

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible = e.isIntersecting;
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

      // Auto gust every 4-8 s + manual gust on hover.
      let gustMul = 1;
      if (ts < gustUntil) gustMul = 2;
      else if (ts > nextGust) {
        gustUntil = ts + rand(420, 880);
        nextGust = ts + rand(4000, 8000);
      }
      if (hoverGustRef.current) gustMul = Math.max(gustMul, 2.4);

      // Spring towards target arrow angle.
      const targetAngle = canvasRot;
      let diff = targetAngle - arrowAngle;
      while (diff > Math.PI) diff -= Math.PI * 2;
      while (diff < -Math.PI) diff += Math.PI * 2;
      const force = ARROW_STIFFNESS * diff;
      const damp = -ARROW_DAMPING * arrowVel;
      arrowVel += (force + damp) * dt;
      arrowAngle += arrowVel * dt;

      // Ease speed ring towards target on mount.
      speedFrac += (targetSpeedFrac - speedFrac) * Math.min(1, dt * 3);

      // ---- DRAW ----
      ctx.clearRect(0, 0, size, size);
      ctx.drawImage(face, 0, 0, size, size);

      // Speed ring (concentric arc, gradient stroke).
      const ringStroke = ctx.createLinearGradient(0, 0, size, 0);
      ringStroke.addColorStop(0, "rgba(200,155,60,0.95)");
      ringStroke.addColorStop(1, "rgba(181,105,31,0.95)");
      // Track (faint full ring).
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.strokeStyle = "rgba(43,42,40,0.06)";
      ctx.beginPath();
      ctx.arc(cx, cy, ringR, ringStartAngle, ringStartAngle + ringFullSweep);
      ctx.stroke();
      // Filled portion.
      ctx.strokeStyle = ringStroke;
      ctx.beginPath();
      ctx.arc(
        cx,
        cy,
        ringR,
        ringStartAngle,
        ringStartAngle + ringFullSweep * speedFrac,
      );
      ctx.stroke();

      // Streak field, clipped to the inside of the ring.
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, ringR - 5, 0, Math.PI * 2);
      ctx.clip();
      ctx.translate(cx, cy);
      ctx.rotate(arrowAngle);

      const baseSpeed = tier.speed;
      const [cr, cg, cb] = tier.color;
      ctx.lineCap = "round";

      for (const s of streaks) {
        const layerScale = s.layer === 0 ? 0.55 : 1;
        s.x += baseSpeed * s.v * gustMul * layerScale * dt;
        if (tier.waver > 0) {
          s.waver += dt * 2.4;
          s.y += Math.sin(s.waver) * tier.waver * dt * 6;
        }
        if (s.x - s.len > radius + 8) {
          s.x = -radius - s.len * 0.5 - rand(0, 30);
          s.y = rand(-radius, radius);
          s.alpha = rand(0.5, 1);
        }
        const edgeFade = 1 - Math.min(1, Math.abs(s.y) / radius);
        const headAlpha =
          s.alpha * (s.layer === 0 ? 0.35 : 0.85) * (0.4 + 0.6 * edgeFade);

        // Head-to-tail gradient streak so the leading edge feels brighter
        // than the trailing edge (gives motion a sense of direction).
        const grad = ctx.createLinearGradient(s.x - s.len, s.y, s.x, s.y);
        grad.addColorStop(0, `rgba(${cr},${cg},${cb},0)`);
        grad.addColorStop(1, `rgba(${cr},${cg},${cb},${headAlpha})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = s.layer === 0 ? 1 : kmh >= 30 ? 2 : 1.5;

        ctx.beginPath();
        ctx.moveTo(s.x - s.len, s.y);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();
      }

      // Direction arrow chevron at the leading edge of the rotated frame.
      const arrowR = radius - 14;
      ctx.fillStyle = "rgba(60, 74, 53, 0.95)"; // cedar
      ctx.beginPath();
      ctx.moveTo(arrowR, 0);
      ctx.lineTo(arrowR - 11, -7);
      ctx.lineTo(arrowR - 7, 0);
      ctx.lineTo(arrowR - 11, 7);
      ctx.closePath();
      ctx.fill();
      // A short tamarack tail behind it.
      ctx.strokeStyle = "rgba(200,155,60,0.85)";
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(arrowR - 14, 0);
      ctx.lineTo(arrowR - 28, 0);
      ctx.stroke();

      ctx.restore();
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      io.disconnect();
    };
  }, [bearing, kmh, size, reduced]);

  // Hover/touch-down triggers a manual gust.
  const onPointerDown = () => { hoverGustRef.current = true; };
  const onPointerUp = () => { hoverGustRef.current = false; };
  const onMouseEnter = () => { hoverGustRef.current = true; };
  const onMouseLeave = () => { hoverGustRef.current = false; };

  const numSize = Math.round(size * 0.21);
  const captionSize = Math.max(9, Math.round(size * 0.058));
  const beaufort = BEAUFORT(kmh);
  const beaufortColor =
    beaufort.tone === "silt" ? "text-silt" : beaufort.tone === "tamarack" ? "text-tamarack" : "text-amber";

  return (
    <div
      ref={wrapRef}
      className="relative inline-block select-none cursor-pointer"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`Wind ${kmh} km/h from ${cardinal}, ${beaufort.label.toLowerCase()}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {reduced ? (
        <StaticArrow bearing={bearing} size={size} />
      ) : (
        <canvas ref={canvasRef} className="block" />
      )}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center"
        aria-hidden
      >
        <span
          className="font-display text-granite leading-none tabular-nums"
          style={{ fontSize: numSize }}
        >
          {kmh}
        </span>
        <span
          className="font-mono text-silt mt-1.5 tracking-[0.18em] uppercase"
          style={{ fontSize: captionSize }}
        >
          km/h · {cardinal}
        </span>
        <span
          className={`font-mono mt-2 tracking-[0.22em] uppercase ${beaufortColor}`}
          style={{ fontSize: Math.max(8, Math.round(captionSize * 0.85)) }}
        >
          {beaufort.label}
        </span>
      </div>
    </div>
  );
}

/** Static fallback for prefers-reduced-motion. Larger, more dignified. */
function StaticArrow({ bearing, size }: { bearing: number; size: number }) {
  const r = size / 2;
  const arrowRot = (bearing + 180) % 360;
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} className="block">
      <defs>
        <radialGradient id="bk-bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F5F2EA" stopOpacity="1" />
          <stop offset="100%" stopColor="#F5F2EA" stopOpacity="0.85" />
        </radialGradient>
      </defs>
      <circle cx={r} cy={r} r={r - 2} fill="url(#bk-bg)" stroke="rgba(43,42,40,0.22)" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
        const rad = ((deg - 90) * Math.PI) / 180;
        const isCardinal = deg % 90 === 0;
        const inner = isCardinal ? r * 0.16 : r * 0.32;
        const outer = isCardinal ? r * 0.94 : r * 0.86;
        return (
          <line
            key={deg}
            x1={r + Math.cos(rad) * inner}
            y1={r + Math.sin(rad) * inner}
            x2={r + Math.cos(rad) * outer}
            y2={r + Math.sin(rad) * outer}
            stroke={isCardinal ? "rgba(43,42,40,0.10)" : "rgba(43,42,40,0.05)"}
            strokeWidth={isCardinal ? 1 : 0.75}
          />
        );
      })}
      {[0, 90, 180, 270].map((deg) => {
        const rad = ((deg - 90) * Math.PI) / 180;
        return (
          <line
            key={`tick-${deg}`}
            x1={r + Math.cos(rad) * (r - 3)}
            y1={r + Math.sin(rad) * (r - 3)}
            x2={r + Math.cos(rad) * (r - 11)}
            y2={r + Math.sin(rad) * (r - 11)}
            stroke="rgba(43,42,40,0.55)"
            strokeWidth="1.2"
          />
        );
      })}
      <g transform={`rotate(${arrowRot} ${r} ${r})`}>
        <path
          d={`M ${r} ${16} L ${r - 7} ${28} L ${r} ${24} L ${r + 7} ${28} Z`}
          fill="var(--color-cedar)"
        />
        <line
          x1={r}
          y1={r}
          x2={r}
          y2={24}
          stroke="var(--color-tamarack)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
