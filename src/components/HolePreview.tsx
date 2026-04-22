import Link from "next/link";
import { HOLES } from "@/data/holes";

/**
 * Editorial-row hole preview for the home page. Spotlights three holes
 * that are interesting on verifiable grounds:
 *   • Hole 6  — stroke index 1 (hardest hole on the course)
 *   • Hole 12 — first of two new-irrigation ponds added in 2018
 *   • Hole 15 — second pond; also the walk back along the river
 */
const HIGHLIGHTS: Array<{ number: number; headline: string; body: string }> = [
  { number: 6,  headline: "The test.",          body: "Stroke index 1 from the Blue tees. Par 4, 413 yards. The hardest hole on the course." },
  { number: 12, headline: "First pond.",        body: "Par 4, 398 yards from the Blue. New irrigation system brought water into play here in 2018." },
  { number: 15, headline: "Second pond.",       body: "Par 4, 388 yards from the Blue. The second water hazard on the back nine." },
];

export default function HolePreview() {
  return (
    <section className="py-[var(--spacing-section)]">
      <div className="container-edge">
        <div className="mb-16 max-w-3xl">
          <p className="eyebrow mb-5">Hole by hole</p>
          <h2 className="display-lg font-display">Eighteen holes. Par 72.</h2>
        </div>

        <ul className="divide-y divide-granite/15 border-t border-b border-granite/15">
          {HIGHLIGHTS.map((h) => {
            const hole = HOLES.find((x) => x.number === h.number)!;
            return (
              <li key={h.number}>
                <Link
                  href={`/course/holes/${h.number}`}
                  className="grid grid-cols-12 gap-6 py-8 items-baseline group hover:bg-paper/60 transition-colors"
                >
                  <span className="col-span-2 md:col-span-1 font-mono text-silt text-lg">
                    {String(h.number).padStart(2, "0")}
                  </span>
                  <div className="col-span-10 md:col-span-7">
                    <p className="font-display text-2xl md:text-3xl text-granite group-hover:text-amber transition-colors">
                      {h.headline}
                    </p>
                    <p className="mt-2 text-silt text-base max-w-xl">{h.body}</p>
                  </div>
                  <span className="hidden md:block md:col-span-2 font-mono text-sm text-silt">
                    Par {hole.par} · {hole.yardage.blue} yd
                  </span>
                  <span className="hidden md:block md:col-span-1 font-mono text-sm text-silt text-right">
                    HCP {hole.strokeIndex}
                  </span>
                  <span className="hidden md:block md:col-span-1 text-right text-amber group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link href="/course" className="btn-primary">Walk the 18</Link>
          <Link href="/course/scorecard" className="btn-ghost">Full scorecard</Link>
        </div>
      </div>
    </section>
  );
}
