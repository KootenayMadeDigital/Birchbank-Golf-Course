"use client";

import { useState } from "react";
import { TEES } from "@/data/holes";

type TeeKey = typeof TEES[number]["key"];

/**
 * Compact interactive tee selector for the home-page scorecard cedar block.
 *
 * Replaces the static yardage grid with a tap-to-select pill row: the
 * visitor picks Blue / Combo / White / Red and sees the matching yardage
 * + course rating / slope update live in a single large readout.
 *
 * Not to be confused with the full-table `ScorecardSwitcher` used on the
 * dedicated /course/scorecard page. This one is a summary only, no per-hole
 * breakdown, no table, intended for the one-screen moment on the home page.
 *
 * UI/UX Pro Max checks:
 *   - 44x44pt tap targets on every pill (touch-target-size rule)
 *   - Keyboard-nav: Tab through pills; Enter/Space selects
 *   - Focus-visible ring uses the global tamarack scheme
 *   - Reduced-motion: no opacity/transform transition on the readout
 */
export default function ScorecardCompact() {
  // Default to Blue, the men's tee with full published rating/slope
  // and the most-played of the five sets per the course scorecard.
  const [selected, setSelected] = useState<TeeKey>("blue");

  const active = TEES.find((t) => t.key === selected)!;

  return (
    <div>
      <div
        role="radiogroup"
        aria-label="Tee selection"
        className="flex flex-wrap gap-2"
      >
        {TEES.map((tee) => {
          const isActive = tee.key === selected;
          return (
            <button
              key={tee.key}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => setSelected(tee.key)}
              className={[
                "min-h-[44px] min-w-[64px] px-4 font-mono text-xs uppercase tracking-widest",
                "border rounded-sm transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tamarack focus-visible:ring-offset-2 focus-visible:ring-offset-cedar",
                isActive
                  ? "bg-tamarack border-tamarack text-granite"
                  : "bg-transparent border-paper/30 text-paper/75 hover:border-paper hover:text-paper",
              ].join(" ")}
            >
              {tee.name}
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex flex-wrap items-baseline gap-x-10 gap-y-3">
        <div>
          <p className="text-paper/60 text-xs font-mono uppercase tracking-widest mb-1">
            Total yardage
          </p>
          <p
            key={`yd-${active.key}`}
            className="font-display text-4xl md:text-5xl text-paper motion-safe:animate-[fadeIn_180ms_ease-out]"
          >
            {active.total.toLocaleString("en-CA")}
            <span className="text-paper/60 text-xl md:text-2xl align-baseline ml-2">yd</span>
          </p>
        </div>
        <div>
          <p className="text-paper/60 text-xs font-mono uppercase tracking-widest mb-1">
            Course / slope
          </p>
          <p
            key={`rs-${active.key}`}
            className="font-display text-2xl md:text-3xl text-paper motion-safe:animate-[fadeIn_180ms_ease-out]"
          >
            {active.courseRating && active.slopeRating
              ? `${active.courseRating.toFixed(1)} / ${active.slopeRating}`
              : "–"}
          </p>
          {(!active.courseRating || !active.slopeRating) && (
            <p className="text-paper/50 text-xs font-mono mt-1">
              Rating pending for this tee
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
