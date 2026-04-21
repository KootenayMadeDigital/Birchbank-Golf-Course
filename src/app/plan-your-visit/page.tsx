import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "More things to do",
  description: "Staying longer and playing more — explore the Kootenay Golf Trail and attractions in the Lower Columbia region around Trail and Rossland, BC.",
  alternates: { canonical: "/plan-your-visit" },
};

// All partners and descriptions below are drawn from
// https://www.birchbankgolf.com/more-things-to-do/ — no invented drive times or codes.
const PARTNERS = [
  { name: "Recreation & Parks — City of Trail", url: "https://trail.ca" },
  { name: "Tourism Rossland", url: "https://tourismrossland.com" },
  { name: "Kootenay Columbia Trails Society", url: "https://kcts.ca" },
  { name: "Trail Historical Society", url: "https://trailhistory.com" },
  { name: "Best Western Columbia River Hotel", url: "https://bestwesterntrail.com" },
];

export default function MoreThingsToDo() {
  return (
    <>
      <section className="pt-40 pb-16 container-edge">
        <p className="eyebrow mb-6">More things to do</p>
        <h1 className="display-xl max-w-[18ch] mb-10">
          Staying longer and playing more.
        </h1>
        <p className="prose-editorial max-w-2xl text-granite/85">
          Our region's courses are as varied as the terrain they're built on — riverside,
          mountainside, tree-lined, or open — each different, and there's more than just
          golf. Camping, lodging, parks, museums, wineries, breweries, fishing, hiking,
          mountain biking, swimming, paddling — year-round attractions across all four
          seasons.
        </p>
      </section>

      <section className="pb-[var(--spacing-section)] container-edge grid gap-12 md:grid-cols-2">
        <div>
          <p className="eyebrow mb-6">Kootenay Golf Trail</p>
          <p className="prose-editorial text-granite/85">
            Explore the Kootenay Golf Trail for regional course options. Our region
            supports multiple courses within a short drive of Birchbank.
          </p>
        </div>

        <div>
          <p className="eyebrow mb-6">Local partners</p>
          <ul className="divide-y divide-granite/15 border-t border-b border-granite/15">
            {PARTNERS.map((p) => (
              <li key={p.name}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener"
                  className="flex items-baseline justify-between py-4 gap-4 hover:text-amber"
                >
                  <span className="font-display text-lg">{p.name}</span>
                  <span className="font-mono text-xs text-silt">visit ↗</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-silt">
            Partners listed on birchbankgolf.com/more-things-to-do.
          </p>
        </div>
      </section>

      <section className="py-16 bg-cedar text-paper">
        <div className="container-edge max-w-3xl">
          <p className="eyebrow text-paper/60 mb-5">Come for the golf</p>
          <p className="display-md font-display mb-6">
            Stay for the adventure.
          </p>
          <Link href="/book" className="btn-primary bg-tamarack text-granite hover:bg-paper">
            Book a tee time
          </Link>
        </div>
      </section>
    </>
  );
}
