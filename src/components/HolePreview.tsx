import Link from "next/link";

/**
 * Editorial-row hole preview for the home page. We can't publish per-hole yardages
 * (not transcribed yet), so we spotlight what's verifiably public: the two ponds
 * (holes 12 and 15) and the opener (hole 1).
 */
const HIGHLIGHTS = [
  {
    number: 1,
    headline: "The first tee.",
    body: "Eighteen holes begin here, walking the west bank of the Columbia.",
  },
  {
    number: 12,
    headline: "First pond.",
    body: "New irrigation system; water in play on the approach.",
  },
  {
    number: 15,
    headline: "Second pond.",
    body: "Second water hazard added during the 2018 reconfiguration.",
  },
];

export default function HolePreview() {
  return (
    <section className="py-[var(--spacing-section)]">
      <div className="container-edge">
        <div className="mb-16 max-w-3xl">
          <p className="eyebrow mb-5">Hole by hole</p>
          <h2 className="display-lg font-display">
            Eighteen holes. Restored to the 1969 routing.
          </h2>
        </div>

        <ul className="divide-y divide-granite/15 border-t border-b border-granite/15">
          {HIGHLIGHTS.map((h) => (
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
                <span className="hidden md:block md:col-span-3 font-mono text-sm text-silt">
                  Walk hole {h.number}
                </span>
                <span className="hidden md:block md:col-span-1 text-right text-amber group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link href="/course" className="btn-primary">Walk the 18</Link>
          <Link href="/course/scorecard" className="btn-ghost">See the scorecard</Link>
        </div>
      </div>
    </section>
  );
}
