"use client";

import { useState } from "react";
import clsx from "clsx";
import ScorecardTable from "./ScorecardTable";
import { TEES, HOLES, type TeeKey } from "@/data/holes";

/**
 * True when HOLES has a yardage value on every hole for this tee.
 * Per-hole tables only render for tees that satisfy this; others get
 * the summary-only panel.
 */
function hasPerHoleData(tee: TeeKey): boolean {
  return HOLES.every((h) => typeof h.yardage[tee] === "number");
}

/**
 * Tee-selector tabs + scorecard table. Per-tee data is fully static; switching
 * tees just re-renders the same table with a different yardage column.
 */
export default function ScorecardSwitcher({ initialTee = "blue" }: { initialTee?: TeeKey }) {
  const [tee, setTee] = useState<TeeKey>(initialTee);
  const activeTeeInfo = TEES.find((t) => t.key === tee)!;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <p className="eyebrow mr-4">Tee</p>
        {TEES.map((t) => {
          // Every tee is selectable. Tees without published per-hole data
          // (currently Gold and Combo, see holes.ts) render a summary-only
          // panel instead of a per-hole table. No grey-out, no fabrication.
          return (
            <button
              key={t.key}
              onClick={() => setTee(t.key)}
              aria-pressed={tee === t.key}
              className={clsx(
                "px-4 py-2 font-mono text-xs uppercase tracking-widest border transition-colors rounded-sm",
                tee === t.key
                  ? "bg-cedar text-paper border-cedar"
                  : "border-granite/20 text-granite hover:border-amber hover:text-amber",
              )}
            >
              {t.name}
              {t.total && <span className="ml-2 text-silt normal-case">· {t.total.toLocaleString()} yd</span>}
            </button>
          );
        })}
      </div>

      {activeTeeInfo.courseRating && (
        <div className="mb-8 flex flex-wrap gap-x-10 gap-y-3 font-mono text-sm border-b border-granite/15 pb-5">
          <span>
            <span className="text-silt">Course rating</span>{" "}
            <span className="font-display text-lg text-granite">{activeTeeInfo.courseRating.toFixed(1)}</span>
          </span>
          <span>
            <span className="text-silt">Slope</span>{" "}
            <span className="font-display text-lg text-granite">{activeTeeInfo.slopeRating}</span>
          </span>
        </div>
      )}

      {/* Per-hole table only for tees where HOLES has every hole's yardage.
          Currently Blue / White / Red satisfy that; Gold / Combo don't , 
          those tees show the summary panel with the honest caveat. */}
      {hasPerHoleData(tee) ? (
        <ScorecardTable tee={tee} />
      ) : (
        <div className="border border-granite/15 bg-paper p-7 md:p-8">
          <p className="eyebrow mb-4">{activeTeeInfo.name} tees · summary</p>
          <p className="font-display text-5xl text-granite mb-2">
            {activeTeeInfo.total?.toLocaleString()}{" "}
            <span className="text-silt text-2xl align-baseline ml-1">yd</span>
          </p>
          <p className="text-sm text-granite/85 leading-relaxed max-w-xl mb-4">
            Aggregate yardage, course rating, and slope are verified via GolfNow's
            Birchbank course panel.
            {activeTeeInfo.name === "Gold" && (
              <> Gold is the back-most tee set and was added after the 2020 printed
              scorecard was produced, per-hole breakdown isn't published publicly yet.
              Ask the Pro Shop for a Gold-set pin sheet when you check in.</>
            )}
            {activeTeeInfo.name === "Combo" && (
              <> Combo plays a mixed-yardage routing (some Blue holes, some White) , 
              Birchbank prints the aggregate but not an extractable per-hole column.
              Pick up a printed card at the counter.</>
            )}
          </p>
          <p className="text-xs text-silt font-mono">
            Ask at the Pro Shop for current pin sheets · 250-693-2255
          </p>
        </div>
      )}
    </div>
  );
}
