"use client";

import { useState } from "react";
import clsx from "clsx";
import ScorecardTable from "./ScorecardTable";
import { TEES, type TeeKey } from "@/data/holes";

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
          // Disable tees we don't have a per-hole breakdown for. We use the
          // presence of a course rating as the proxy — Blue / White / Red all
          // have one published; Gold / Combo do not, and we haven't
          // transcribed their per-hole yardage yet.
          const disabled = t.courseRating == null;
          return (
            <button
              key={t.key}
              onClick={() => setTee(t.key)}
              aria-pressed={tee === t.key}
              disabled={!!disabled}
              className={clsx(
                "px-4 py-2 font-mono text-xs uppercase tracking-widest border transition-colors rounded-sm",
                tee === t.key
                  ? "bg-cedar text-paper border-cedar"
                  : disabled
                  ? "border-granite/10 text-silt/50 cursor-not-allowed"
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

      <ScorecardTable tee={tee} />

      {!activeTeeInfo.courseRating && activeTeeInfo.total && (
        <p className="mt-6 text-xs text-silt font-mono">
          Per-hole breakdown for {activeTeeInfo.name} tees not yet published — total of{" "}
          {activeTeeInfo.total.toLocaleString()} yards is confirmed.
        </p>
      )}
    </div>
  );
}
