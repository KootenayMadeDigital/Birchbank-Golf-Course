import Link from "next/link";
import { HOLES } from "@/data/holes";

/**
 * 18-dot progress strip shown on each hole page.
 *
 * Visual rhythm of a round: front nine on the left, OUT pillar,
 * back nine on the right, IN pillar. Each dot is a tiny Link to its
 * hole page with the hole number + par under it; the current hole
 * is highlighted in tamarack and scales slightly. Completed holes
 * (1..current-1) read in granite, upcoming holes (current+1..18) in
 * silt so the eye reads a clear direction of travel.
 *
 * No JS. No scroll anchors. Just a server-rendered nav strip that
 * feels like a paper scorecard margin.
 */
export default function RoundProgress({ current }: { current: number }) {
  const front = HOLES.slice(0, 9);
  const back = HOLES.slice(9, 18);

  return (
    <nav
      aria-label="Round progress, 18-hole navigation"
      className="border-t border-b border-granite/15 py-5 md:py-6"
    >
      <div className="container-edge">
        <p className="eyebrow mb-4 text-center md:text-left">The round</p>

        <div className="flex items-center gap-2 md:gap-4 overflow-x-auto -mx-4 px-4 pb-1">
          <HalfStrip holes={front} current={current} label="Out" />
          <span
            aria-hidden
            className="self-stretch w-px bg-granite/20 shrink-0 mx-1 md:mx-2"
          />
          <HalfStrip holes={back} current={current} label="In" />
        </div>
      </div>
    </nav>
  );
}

function HalfStrip({
  holes,
  current,
  label,
}: {
  holes: (typeof HOLES)[number][];
  current: number;
  label: string;
}) {
  return (
    <div className="flex items-end gap-1 md:gap-1.5 shrink-0">
      {holes.map((h) => {
        const state =
          h.number === current ? "current" : h.number < current ? "done" : "ahead";
        return (
          <Link
            key={h.number}
            href={`/course/holes/${h.number}`}
            aria-label={`Hole ${h.number}, par ${h.par}${state === "current" ? " (current)" : ""}`}
            className={[
              "group block w-7 md:w-8 text-center transition-colors",
              state === "current"
                ? "text-tamarack"
                : state === "done"
                  ? "text-granite hover:text-amber"
                  : "text-silt/70 hover:text-amber",
            ].join(" ")}
          >
            <span
              aria-hidden
              className={[
                "block mx-auto transition-all",
                state === "current"
                  ? "w-2 h-2 rounded-full bg-tamarack shadow-[0_0_0_4px_rgba(200,155,60,0.15)]"
                  : state === "done"
                    ? "w-1.5 h-1.5 rounded-full bg-granite/70 group-hover:bg-amber"
                    : "w-1 h-1 rounded-full bg-silt/50 group-hover:bg-amber",
              ].join(" ")}
            />
            <span className="block font-mono text-[10px] mt-2 tabular-nums">
              {h.number}
            </span>
            <span className="block font-mono text-[9px] text-silt mt-0.5 tabular-nums">
              {h.par}
            </span>
          </Link>
        );
      })}
      <span className="self-start ml-1 md:ml-2 font-mono text-[10px] uppercase tracking-widest text-silt">
        {label}
      </span>
    </div>
  );
}
