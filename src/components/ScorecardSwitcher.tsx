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
        {TEES.map((t) => (
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
        ))}
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
          {tee === "combo" && "totalWomen" in activeTeeInfo && activeTeeInfo.totalWomen && (
            <span className="text-silt">
              Women's combo · {activeTeeInfo.totalWomen.toLocaleString()} yd · rating{" "}
              <span className="text-granite">{activeTeeInfo.courseRatingWomen}</span> / slope{" "}
              <span className="text-granite">{activeTeeInfo.slopeRatingWomen}</span>
            </span>
          )}
        </div>
      )}

      {/* Per-hole table renders for every tee — all 18 yardages now
          published per the official Birchbank scorecard. */}
      {hasPerHoleData(tee) ? (
        <ScorecardTable tee={tee} />
      ) : (
        <div className="border border-granite/15 bg-paper p-7 md:p-8">
          <p className="eyebrow mb-4">{activeTeeInfo.name} tees · summary</p>
          <p className="font-display text-5xl text-granite mb-2">
            {activeTeeInfo.total?.toLocaleString()}{" "}
            <span className="text-silt text-2xl align-baseline ml-1">yd</span>
          </p>
          <p className="text-xs text-silt font-mono">
            Ask at the Pro Shop for current pin sheets · 250-693-2255
          </p>
        </div>
      )}
    </div>
  );
}
