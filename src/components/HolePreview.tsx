import Link from "next/link";
import { HOLES } from "@/data/holes";

/**
 * Editorial-row hole preview for the home page. Spotlights three holes
 * on verifiable grounds:
 *   • Hole 2, signature hole (downhill par 3, Columbia River gorge view , 
 *     per SCOREGolf feature by Andrew Penner, Oct 2022)
 *   • Hole 6, stroke index 1 (hardest hole on the course)
 *   • Hole 15, second pond + Columbia River view; published photo by
 *     Andrew Penner (SCOREGolf)
 */
const HIGHLIGHTS: Array<{
  number: number;
  headline: string;
  body: string;
  aside: string;
  badge?: string;
}> = [
  {
    number: 2,
    headline: "The signature.",
    body: "Downhill par 3 with a spectacular view down the Columbia River gorge. One of the best tee shots in the Kootenays.",
    aside: "Pro tip: the drop changes your yardage more than you think, take one club less, and commit to it.",
    badge: "Signature",
  },
  {
    number: 6,
    headline: "The test.",
    body: "Stroke index 1 from the Blue. Par 4, 413 yards. The one that decides your card.",
    aside: "Local wildlife: wild turkeys cross the fairway in the morning.",
  },
  {
    number: 15,
    headline: "The river view.",
    body: "Par 4, 388 yards. The second pond, then the walk back along the Columbia, looking upstream toward the Selkirks.",
    aside: "Photo on the hole page by Andrew Penner · SCOREGolf, 2022.",
  },
];

export default function HolePreview() {
  return (
    <section className="py-[var(--spacing-section)]">
      <div className="container-edge">
        <div className="mb-16 max-w-3xl">
          <p className="eyebrow mb-5">Hole by hole</p>
          <h2 className="display-lg font-display">
            Three holes that'll tell you what you're in for.
          </h2>
          <p className="prose-editorial text-granite/85 mt-6 max-w-xl">
            Par 72 across 18 holes, from 5,345 yards at the Red tees to 6,788 at the
            Gold. Here are three worth scouting before your round.
          </p>
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
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <p className="font-display text-2xl md:text-3xl text-granite group-hover:text-amber transition-colors">
                        {h.headline}
                      </p>
                      {h.badge && (
                        <span className="inline-flex items-center px-2 py-0.5 bg-tamarack text-paper text-[10px] font-mono uppercase tracking-widest rounded-sm">
                          {h.badge}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-silt text-base max-w-xl">{h.body}</p>
                    {/* Aside, always visible on mobile (since the HCP / yardage
                        columns are hidden there); on md+ it's tucked under
                        the fold and rises in on hover as a reveal. */}
                    <p
                      className={[
                        "mt-2 font-mono text-xs text-silt/80 max-w-xl",
                        "md:opacity-0 md:translate-y-1 md:transition-all md:duration-300",
                        "md:group-hover:opacity-100 md:group-hover:translate-y-0",
                        "md:group-focus-within:opacity-100 md:group-focus-within:translate-y-0",
                      ].join(" ")}
                    >
                      {h.aside}
                    </p>
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
