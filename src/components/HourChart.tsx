"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { HourlyPoint } from "@/lib/weather";

/**
 * HourChart, a 24-hour outlook in a single SVG.
 *
 * Features:
 *   - Temperature line draws in left-to-right when in view (stroke-dashoffset).
 *   - Gradient fill under the temp line, hue scales with the day's max temp.
 *   - Precip bars rise from the baseline with a stagger; bars >60% get a
 *     subtle hashed pattern.
 *   - "Now" hairline at index 0 (the data already starts at the current hour).
 *   - Hover/tap snaps a guide to the nearest hour and shows a tooltip with
 *     time, temperature, precip%, and wind.
 *   - Best-window band (paper on tamarack), labelled "BEST 3 HOURS".
 *   - Mobile responsive: drops per-point dots and thins labels on narrow widths.
 *
 * Reduced motion: skips the draw-in and bar-rise animations, snaps to final state.
 */
export default function HourChart({
  hourly,
  bestWindow,
}: {
  hourly: HourlyPoint[];
  bestWindow?: { startIdx: number; endIdx: number } | null;
}) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [played, setPlayed] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [isNarrow, setIsNarrow] = useState(false);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  // Detect prefers-reduced-motion.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Detect narrow viewport for mobile rendering decisions.
  useEffect(() => {
    const check = () => setIsNarrow(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Trigger draw-in when scrolled into view.
  useEffect(() => {
    if (reduced) {
      setPlayed(true);
      return;
    }
    const wrap = wrapRef.current;
    if (!wrap) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setPlayed(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.2 },
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, [reduced]);

  const W = 1000;
  const H = 240;
  const padX = 24;
  const padTop = 32;
  const padBottom = 40;
  const innerW = W - padX * 2;
  const innerH = H - padTop - padBottom;

  const layout = useMemo(() => {
    if (hourly.length === 0) return null;
    const temps = hourly.map((h) => h.tempC);
    const tMin = Math.min(...temps) - 1;
    const tMax = Math.max(...temps) + 1;
    const tRange = Math.max(1, tMax - tMin);
    const colW = innerW / Math.max(1, hourly.length - 1);

    const tempPoints = hourly.map((h, i) => {
      const x = padX + i * colW;
      const y = padTop + innerH - ((h.tempC - tMin) / tRange) * innerH;
      return { x, y };
    });

    const tempPath = smoothPath(tempPoints);
    // Closed path for the gradient fill below the line.
    const fillPath =
      tempPath +
      ` L ${tempPoints[tempPoints.length - 1].x} ${padTop + innerH}` +
      ` L ${tempPoints[0].x} ${padTop + innerH} Z`;

    return { tempPoints, tempPath, fillPath, colW, tMax, tMin };
  }, [hourly, innerH, innerW]);

  // Path length for stroke-dashoffset draw-in. Computed unconditionally so
  // hook order stays stable; we early-return below if the layout is empty.
  const pathLen = useMemo(() => {
    if (!layout) return 0;
    const pts = layout.tempPoints;
    let len = 0;
    for (let i = 1; i < pts.length; i++) {
      const dx = pts[i].x - pts[i - 1].x;
      const dy = pts[i].y - pts[i - 1].y;
      len += Math.hypot(dx, dy);
    }
    return Math.ceil(len) + 12;
  }, [layout]);

  if (!layout || hourly.length === 0) return null;
  const { tempPoints, tempPath, fillPath, colW, tMax } = layout;

  // Pick warm vs cool gradient by the day's max temp.
  const warm = tMax >= 18;
  const fillTop = warm ? "rgba(181, 105, 31, 0.35)" : "rgba(200, 155, 60, 0.32)";
  const fillBottom = "rgba(245, 242, 234, 0)";

  // Label density: every 3rd hour on narrow, every 2nd on wide.
  const labelEvery = isNarrow ? 3 : 2;

  // Hover handling: convert pointer x to nearest hour index.
  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width;
    const xInSvg = xRatio * W;
    const localX = xInSvg - padX;
    let idx = Math.round(localX / colW);
    if (idx < 0) idx = 0;
    if (idx > hourly.length - 1) idx = hourly.length - 1;
    setHoverIdx(idx);
  };
  const onLeave = () => setHoverIdx(null);

  const baselineY = padTop + innerH;

  return (
    <div ref={wrapRef} className="relative">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="24-hour outlook chart with temperature and precipitation"
        className="w-full h-auto touch-none"
        preserveAspectRatio="xMidYMid meet"
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        onPointerDown={onMove}
      >
        <defs>
          <linearGradient id="tempFill" x1="0" y1={padTop} x2="0" y2={baselineY} gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={fillTop} />
            <stop offset="100%" stopColor={fillBottom} />
          </linearGradient>
          <linearGradient id="precipFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(60, 74, 53, 0.55)" />
            <stop offset="100%" stopColor="rgba(60, 74, 53, 0.18)" />
          </linearGradient>
          {/* Hashing pattern for high-precip bars. */}
          <pattern id="precipHash" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="4" stroke="rgba(60, 74, 53, 0.45)" strokeWidth="1" />
          </pattern>
        </defs>

        {/* Best-window band */}
        {bestWindow && bestWindow.endIdx > bestWindow.startIdx && (
          <g>
            <rect
              x={padX + bestWindow.startIdx * colW}
              y={padTop - 10}
              width={(bestWindow.endIdx - bestWindow.startIdx) * colW}
              height={innerH + 18}
              fill="rgba(200, 155, 60, 0.14)"
              stroke="rgba(200, 155, 60, 0.55)"
              strokeWidth="1"
              strokeDasharray="3 4"
            />
            <text
              x={padX + bestWindow.startIdx * colW + ((bestWindow.endIdx - bestWindow.startIdx) * colW) / 2}
              y={padTop - 14}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize="11"
              letterSpacing="0.18em"
              fill="var(--color-tamarack)"
            >
              BEST 3 HOURS
            </text>
          </g>
        )}

        {/* Precipitation bars */}
        {hourly.map((h, i) => {
          const x = padX + i * colW - colW * 0.32;
          const w = Math.max(2, colW * 0.64);
          const fullH = (h.precipProb / 100) * (innerH * 0.55);
          const barH = played || reduced ? fullH : 0;
          const y = baselineY - barH;
          const opacity = 0.5 + Math.min(0.5, h.precipProb / 200);
          const delay = reduced ? 0 : i * 35;
          return (
            <g key={`p-${i}`}>
              <rect
                x={x}
                y={y}
                width={w}
                height={Math.max(0, barH)}
                fill="url(#precipFill)"
                rx="1.5"
                opacity={opacity}
                style={{
                  transition: reduced ? "none" : `y 600ms ${delay}ms cubic-bezier(0.22, 1, 0.36, 1), height 600ms ${delay}ms cubic-bezier(0.22, 1, 0.36, 1)`,
                }}
              />
              {h.precipProb >= 60 && (
                <rect
                  x={x}
                  y={y}
                  width={w}
                  height={Math.max(0, barH)}
                  fill="url(#precipHash)"
                  rx="1.5"
                  opacity={played || reduced ? 0.7 : 0}
                  style={{
                    transition: reduced ? "none" : `opacity 600ms ${delay + 100}ms ease-out`,
                  }}
                />
              )}
            </g>
          );
        })}

        {/* Gradient fill under the temp line */}
        <path
          d={fillPath}
          fill="url(#tempFill)"
          opacity={played || reduced ? 1 : 0}
          style={{
            transition: reduced ? "none" : "opacity 1200ms 400ms ease-out",
          }}
        />

        {/* Temperature line: draws in via stroke-dashoffset */}
        <path
          d={tempPath}
          fill="none"
          stroke="var(--color-tamarack)"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={pathLen}
          strokeDashoffset={played || reduced ? 0 : pathLen}
          style={{
            transition: reduced ? "none" : "stroke-dashoffset 1400ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />

        {/* Temperature dots (skip on narrow) */}
        {!isNarrow &&
          tempPoints.map((p, i) => (
            <circle
              key={`d-${i}`}
              cx={p.x}
              cy={p.y}
              r="2.5"
              fill="var(--color-tamarack)"
              opacity={played || reduced ? 1 : 0}
              style={{
                transition: reduced ? "none" : `opacity 300ms ${600 + i * 25}ms ease-out`,
              }}
            />
          ))}

        {/* Hour labels */}
        {hourly.map((h, i) => {
          if (i % labelEvery !== 0) return null;
          return (
            <text
              key={`hl-${i}`}
              x={padX + i * colW}
              y={H - 14}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize="10"
              letterSpacing="0.04em"
              fill="rgba(43,42,40,0.65)"
            >
              {h.hourLabel}
            </text>
          );
        })}

        {/* Temperature labels above each labeled hour (skip on narrow) */}
        {!isNarrow &&
          hourly.map((h, i) => {
            if (i % labelEvery !== 0) return null;
            const p = tempPoints[i];
            return (
              <text
                key={`tl-${i}`}
                x={p.x}
                y={p.y - 10}
                textAnchor="middle"
                fontFamily="var(--font-display)"
                fontSize="13"
                fill="var(--color-granite)"
                opacity={played || reduced ? 1 : 0}
                style={{
                  transition: reduced ? "none" : `opacity 300ms ${800 + i * 25}ms ease-out`,
                }}
              >
                {h.tempC}°
              </text>
            );
          })}

        {/* "Now" hairline at the first hour */}
        <g>
          <line
            x1={tempPoints[0].x}
            y1={padTop - 4}
            x2={tempPoints[0].x}
            y2={baselineY + 4}
            stroke="var(--color-tamarack)"
            strokeWidth="1"
            strokeDasharray="2 3"
            opacity="0.7"
          />
          <circle cx={tempPoints[0].x} cy={tempPoints[0].y} r="3.5" fill="var(--color-tamarack)" />
          <circle cx={tempPoints[0].x} cy={tempPoints[0].y} r="6" fill="none" stroke="var(--color-tamarack)" strokeWidth="1" opacity="0.4" />
          <text
            x={tempPoints[0].x + 6}
            y={padTop - 8}
            textAnchor="start"
            fontFamily="var(--font-mono)"
            fontSize="10"
            letterSpacing="0.18em"
            fill="var(--color-tamarack)"
          >
            NOW
          </text>
        </g>

        {/* Hover guide + readout */}
        {hoverIdx !== null && hoverIdx >= 0 && hoverIdx < tempPoints.length && (
          <g pointerEvents="none">
            <line
              x1={tempPoints[hoverIdx].x}
              y1={padTop - 4}
              x2={tempPoints[hoverIdx].x}
              y2={baselineY + 4}
              stroke="rgba(43,42,40,0.45)"
              strokeWidth="1"
            />
            <circle cx={tempPoints[hoverIdx].x} cy={tempPoints[hoverIdx].y} r="4.5" fill="var(--color-granite)" />
          </g>
        )}
      </svg>

      {/* Tooltip overlay (HTML so it can use brand classes / be touch-target sized). */}
      {hoverIdx !== null && hoverIdx >= 0 && hoverIdx < hourly.length && (
        <Tooltip
          point={hourly[hoverIdx]}
          xPct={((tempPoints[hoverIdx].x) / W) * 100}
        />
      )}
    </div>
  );
}

function Tooltip({ point, xPct }: { point: HourlyPoint; xPct: number }) {
  // Clamp the tooltip horizontal position so it never escapes the chart frame.
  const left = Math.max(8, Math.min(92, xPct));
  return (
    <div
      className="absolute -top-2 -translate-x-1/2 pointer-events-none"
      style={{ left: `${left}%` }}
      aria-hidden
    >
      <div className="border border-granite/15 bg-paper rounded-sm px-3 py-2 shadow-sm min-w-[112px]">
        <p className="font-mono text-[10px] uppercase tracking-widest text-silt">
          {point.hourLabel}
        </p>
        <p className="font-display text-lg text-granite leading-tight tabular-nums">
          {point.tempC}°
        </p>
        <p className="font-mono text-[10px] text-silt mt-0.5">
          <span className="text-cedar">{point.precipProb}%</span> precip
          <span className="mx-1 text-silt/40">·</span>
          <span className="text-tamarack">{point.windKmh}</span> km/h
        </p>
      </div>
    </div>
  );
}

function smoothPath(pts: { x: number; y: number }[]): string {
  if (pts.length === 0) return "";
  if (pts.length === 1) return `M ${pts[0].x} ${pts[0].y}`;
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}
