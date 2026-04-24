import type { HourlyPoint } from "@/lib/weather";

/**
 * HourChart, a 24-hour outlook in a single SVG: temperature as a smooth
 * line, precipitation probability as light-blue bars rising from the
 * baseline. A vertical tamarack band marks the optimal playing window
 * the parent computes (lowest precip + manageable wind + comfortable temp).
 *
 * Server-renderable: pure SVG, no client JS.
 */
export default function HourChart({
  hourly,
  bestWindow,
}: {
  hourly: HourlyPoint[];
  bestWindow?: { startIdx: number; endIdx: number } | null;
}) {
  const W = 1000;
  const H = 220;
  const padX = 24;
  const padTop = 28;
  const padBottom = 36;
  const innerW = W - padX * 2;
  const innerH = H - padTop - padBottom;

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

  // Smooth catmull-rom-ish curve
  const tempPath = smoothPath(tempPoints);

  // Show every Nth label to avoid crowding
  const labelEvery = hourly.length > 12 ? 3 : 2;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="24-hour outlook chart with temperature and precipitation"
      className="w-full h-auto"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Best-window band */}
      {bestWindow && bestWindow.endIdx > bestWindow.startIdx && (
        <rect
          x={padX + bestWindow.startIdx * colW}
          y={padTop - 6}
          width={(bestWindow.endIdx - bestWindow.startIdx) * colW}
          height={innerH + 12}
          fill="rgba(200, 155, 60, 0.10)"
          stroke="rgba(200, 155, 60, 0.45)"
          strokeWidth="1"
          strokeDasharray="3 4"
        />
      )}

      {/* Precipitation bars */}
      {hourly.map((h, i) => {
        const x = padX + i * colW - colW * 0.32;
        const w = colW * 0.64;
        const barH = (h.precipProb / 100) * (innerH * 0.55);
        const y = padTop + innerH - barH;
        return (
          <rect
            key={`p-${i}`}
            x={x}
            y={y}
            width={Math.max(2, w)}
            height={Math.max(0, barH)}
            fill="rgba(60, 74, 53, 0.18)"
            rx="1.5"
          />
        );
      })}

      {/* Temperature line */}
      <path
        d={tempPath}
        fill="none"
        stroke="var(--color-tamarack)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Temperature dots */}
      {tempPoints.map((p, i) => (
        <circle
          key={`d-${i}`}
          cx={p.x}
          cy={p.y}
          r="2.5"
          fill="var(--color-tamarack)"
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

      {/* Temperature labels above each labeled hour */}
      {hourly.map((h, i) => {
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
          >
            {h.tempC}°
          </text>
        );
      })}
    </svg>
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
