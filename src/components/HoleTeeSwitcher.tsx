"use client";

import { useMemo, useState } from "react";
import { TEES, type Hole, type TeeKey } from "@/data/holes";
import CountUp from "./CountUp";

/**
 * Per-hole interactive tee selector.
 *
 * Shown on the individual hole page (/course/holes/[n]). The visitor
 * picks a tee. Gold / Blue / Combo / White / Red, and the single
 * big readout underneath updates to that tee's yardage for this hole,
 * plus the stroke index appropriate to the tee set (forward tees
 * share a women's stroke index; the Blue men's index applies elsewhere).
 *
 * Honesty rules:
 *   - A tee whose per-hole yardage isn't in the data (currently Gold
 *     and Combo, see holes.ts) renders its pill as disabled with a
 *     dash readout rather than fabricating a number.
 *   - Rating / slope come from TEES; they don't change per hole, so
 *     we show the tee's course rating + slope alongside for context.
 */
export default function HoleTeeSwitcher({ hole }: { hole: Hole }) {
  // Default to the most-played tee that has a yardage for this hole.
  const initial: TeeKey = useMemo(() => {
    const preferred: TeeKey[] = ["blue", "white", "red", "gold", "combo"];
    return preferred.find((t) => typeof hole.yardage[t] === "number") ?? "blue";
  }, [hole]);

  const [selected, setSelected] = useState<TeeKey>(initial);
  const active = TEES.find((t) => t.key === selected)!;
  const yards = hole.yardage[selected];
  const forwardHcp = selected === "white" || selected === "red";
  const hcp = forwardHcp ? (hole.strokeIndexForward ?? hole.strokeIndex) : hole.strokeIndex;

  return (
    <div>
      <p className="eyebrow mb-4">Play it from</p>

      {/* Pill row */}
      <div
        role="radiogroup"
        aria-label="Choose tee"
        className="flex flex-wrap gap-2 mb-8"
      >
        {TEES.map((tee) => {
          const isActive = tee.key === selected;
          const hasYardage = typeof hole.yardage[tee.key] === "number";
          return (
            <button
              key={tee.key}
              type="button"
              role="radio"
              aria-checked={isActive}
              disabled={!hasYardage}
              onClick={() => hasYardage && setSelected(tee.key)}
              className={[
                "min-h-[44px] min-w-[72px] px-4 font-mono text-xs uppercase tracking-widest",
                "border rounded-sm transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tamarack focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
                !hasYardage
                  ? "border-granite/15 text-silt/40 cursor-not-allowed"
                  : isActive
                    ? "bg-cedar border-cedar text-paper"
                    : "bg-transparent border-granite/25 text-granite hover:border-amber hover:text-amber",
              ].join(" ")}
              title={hasYardage ? `${tee.name} · ${hole.yardage[tee.key]} yd` : `${tee.name}, per-hole yardage not published for this tee`}
            >
              {tee.name}
            </button>
          );
        })}
      </div>

      {/* Readout */}
      <div className="flex flex-wrap items-baseline gap-x-10 gap-y-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-silt mb-1">
            Yardage
          </p>
          <p className="font-display text-5xl md:text-6xl text-granite">
            {typeof yards === "number" ? (
              <>
                <CountUp value={yards} duration={750} />
                <span className="text-silt text-2xl md:text-3xl align-baseline ml-2">yd</span>
              </>
            ) : (
              <span className="text-silt">–</span>
            )}
          </p>
        </div>

        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-silt mb-1">
            Stroke index
          </p>
          <p
            key={`hcp-${selected}`}
            className="font-display text-3xl md:text-4xl text-granite motion-safe:animate-[fadeIn_180ms_ease-out]"
          >
            {hcp}
          </p>
        </div>

        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-silt mb-1">
            Course rating / slope
          </p>
          <p className="font-display text-3xl md:text-4xl text-granite">
            {active.courseRating.toFixed(1)}
            <span className="text-silt text-xl md:text-2xl"> / </span>
            {active.slopeRating}
          </p>
        </div>
      </div>

      {typeof yards !== "number" && (
        <p className="mt-6 text-xs text-silt font-mono max-w-xl">
          Per-hole yardage for {active.name} tees isn't published on the 2020 scorecard
          or GolfNow's course panel, the aggregate total ({active.total.toLocaleString()} yd)
          is confirmed. Ask the Pro Shop for a printed {active.name}-set pin sheet at
          check-in.
        </p>
      )}
    </div>
  );
}
