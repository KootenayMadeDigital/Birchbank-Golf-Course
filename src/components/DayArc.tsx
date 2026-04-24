"use client";

import { useEffect, useState } from "react";

/**
 * DayArc, sunrise → sunset semicircle with the current sun position
 * marker on the arc. Pure SVG; tiny client island so the marker tracks
 * the actual current time on the visitor's clock.
 *
 * Times come from the daily forecast snapshot ("6:42 a.m." style).
 */
export default function DayArc({
  sunrise,
  sunset,
}: {
  sunrise: string;
  sunset: string;
}) {
  // Convert "6:42 a.m." / "8:14 p.m." → minutes-since-midnight.
  const sunriseMin = parseTimeToMinutes(sunrise);
  const sunsetMin = parseTimeToMinutes(sunset);
  const dayLengthMin = Math.max(1, sunsetMin - sunriseMin);

  const [progress, setProgress] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const nowMin = now.getHours() * 60 + now.getMinutes();
      if (nowMin <= sunriseMin) setProgress(0);
      else if (nowMin >= sunsetMin) setProgress(1);
      else setProgress((nowMin - sunriseMin) / dayLengthMin);
    };
    tick();
    const id = setInterval(tick, 60 * 1000);
    return () => clearInterval(id);
  }, [sunriseMin, sunsetMin, dayLengthMin]);

  const W = 320;
  const H = 80;
  const cx = W / 2;
  const cy = H;
  const r = (W - 24) / 2;

  // Marker position on the arc
  const t = progress ?? 0;
  const angle = Math.PI * (1 - t);
  const mx = cx + Math.cos(angle) * r;
  const my = cy - Math.sin(angle) * r;

  return (
    <div className="w-full max-w-md">
      <svg
        viewBox={`0 0 ${W} ${H + 24}`}
        className="w-full"
        role="img"
        aria-label={`Daylight from ${sunrise} to ${sunset}`}
      >
        {/* Arc path */}
        <path
          d={`M 12 ${cy} A ${r} ${r} 0 0 1 ${W - 12} ${cy}`}
          fill="none"
          stroke="rgba(43,42,40,0.18)"
          strokeWidth="1.5"
        />
        {/* Filled arc up to current progress */}
        {progress !== null && progress > 0 && (
          <path
            d={describeArc(cx, cy, r, 180, 180 - 180 * progress)}
            fill="none"
            stroke="var(--color-tamarack)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        )}
        {/* Sun marker */}
        {progress !== null && (
          <circle
            cx={mx}
            cy={my}
            r="6"
            fill="var(--color-tamarack)"
            stroke="var(--color-paper)"
            strokeWidth="2"
          />
        )}
        {/* Endpoints */}
        <circle cx={12} cy={cy} r="2.5" fill="var(--color-granite)" />
        <circle cx={W - 12} cy={cy} r="2.5" fill="var(--color-granite)" />
        {/* Labels */}
        <text
          x={12}
          y={cy + 16}
          textAnchor="start"
          fontFamily="var(--font-mono)"
          fontSize="10"
          letterSpacing="0.06em"
          fill="rgba(43,42,40,0.65)"
        >
          ↑ {sunrise.toUpperCase().replace(/\s/g, "")}
        </text>
        <text
          x={W - 12}
          y={cy + 16}
          textAnchor="end"
          fontFamily="var(--font-mono)"
          fontSize="10"
          letterSpacing="0.06em"
          fill="rgba(43,42,40,0.65)"
        >
          ↓ {sunset.toUpperCase().replace(/\s/g, "")}
        </text>
      </svg>
    </div>
  );
}

function parseTimeToMinutes(label: string): number {
  // Accepts e.g. "6:42 a.m." or "8:14 p.m." or "06:42"
  const trimmed = label.trim();
  const m = trimmed.match(/^(\d{1,2}):(\d{2})\s*(a\.m\.|p\.m\.|am|pm)?/i);
  if (!m) return 0;
  let h = parseInt(m[1], 10);
  const mins = parseInt(m[2], 10);
  const period = m[3]?.toLowerCase();
  if (period?.startsWith("p") && h < 12) h += 12;
  if (period?.startsWith("a") && h === 12) h = 0;
  return h * 60 + mins;
}

function describeArc(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number,
): string {
  const start = polarToCartesian(cx, cy, r, startAngle);
  const end = polarToCartesian(cx, cy, r, endAngle);
  const largeArcFlag = startAngle - endAngle <= 180 ? 0 : 1;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
}

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy - r * Math.sin(rad) };
}
