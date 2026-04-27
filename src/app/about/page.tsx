import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import BookButton from "@/components/BookButton";

export const metadata: Metadata = {
  title: "About",
  description:
    "Birchbank Golf Course is operated by the Rossland Trail Country Club, organized 1922. The 18-hole course was routed by Roy Stone in 1962 along the Columbia River in Genelle, BC, and restored to his original 1969 layout in 2018.",
  alternates: { canonical: "/about" },
};

/**
 * About page rebuilt around the facts that actually distinguish
 * Birchbank from every other Kootenay course: the 1922 club, the 1962
 * construction, the Roy Stone design, the community purchase in 2004,
 * the 2018 restoration.
 *
 * Every date + name is verified from birchbankgolf.com's own history
 * page or the club's published materials. Nothing invented.
 */

const MILESTONES = [
  { year: "1922", event: "Rossland Trail Country Club organized, 81 shareholders." },
  { year: "1926", event: "First clubhouse + nine holes on Cominco-leased land in Rossland." },
  { year: "1962", event: "Birchbank land leased from Cominco; construction begins on the Columbia River." },
  { year: "1964", event: "First nine completed at Birchbank." },
  { year: "1969", event: "Back nine and clubhouse designed by Roy Stone; course opens as 18 holes." },
  { year: "2004", event: "Club purchases the Birchbank property from Cominco, member-owned." },
  { year: "2006", event: "Rossland course closed after Cominco sells that land." },
  { year: "2018", event: "Birchbank reconfigured to match Stone's original 1969 routing." },
];

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-16 bg-paper">
        <div className="container-edge">
          <p className="eyebrow mb-6">About</p>
          <h1
            className="font-display text-granite max-w-[22ch] mb-8"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", lineHeight: "1.02", letterSpacing: "-0.015em" }}
          >
            The Rossland Trail Country Club,<br />organized 1922.
          </h1>
          <p className="prose-editorial text-granite/85 max-w-2xl">
            A hundred-plus years of Kootenay golf. We've played in two different valleys,
            leased land from Cominco twice, and bought the Birchbank property outright in 2004.
            Today we're member-owned, public-access, and unhurried.
          </p>
        </div>
      </section>

      <div className="container-edge"><div className="rule-hair" /></div>

      {/* Editorial narrative with archive image */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge grid gap-10 md:grid-cols-12 items-start">
          <div className="md:col-span-5">
            <figure>
              <div className="relative aspect-[4/3] bg-granite/5 overflow-hidden">
                <Image
                  src="https://www.birchbankgolf.com/wp-content/uploads/2019/02/1948hole1.jpg"
                  alt="The Rossland course first tee, circa 1948"
                  fill
                  sizes="(max-width: 768px) 100vw, 42vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 font-mono text-xs text-silt">
                The Rossland course, 1st tee · c. 1948
              </figcaption>
            </figure>
          </div>

          <div className="md:col-span-7 prose-editorial text-granite/90 space-y-6">
            <p className="text-xl">
              The club was organized on April 22, 1922, with 81 shareholders and a first
              course on Floyd Ranch above Warfield. By 1926 we'd moved to Cominco-leased
              land and built nine holes in Rossland, the course that would run for eighty
              years.
            </p>
            <p>
              In 1962, Cominco leased a second stretch of land between Trail and Castlegar
              and a local pro named Roy Stone routed nine holes along the west bank of the
              Columbia. The first nine opened in 1964. Then Stone routed nine more; the
              back nine and clubhouse opened in 1969. Birchbank became Rossland Trail's
              18-hole home.
            </p>
            <p>
              The club bought the Birchbank property from Cominco in 2004. The Rossland
              course closed in 2006 after Cominco sold that land, but Birchbank, by then
              ours outright, kept playing. In 2018, new irrigation, restored greens, and
              ponds on holes 12 and 15 reconfigured the layout back to Stone's original
              1969 routing.
            </p>
            <p>
              That's the course you walk today: a hundred years of Kootenay golf, played
              on the land Stone routed sixty-plus years ago, by a club still member-owned.
            </p>
          </div>
        </div>
      </section>

      {/* Milestones, dated timeline */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow mb-5">Milestones</p>
            <h2 className="display-lg font-display mb-5">
              A century in eight dates.
            </h2>
          </div>

          <ul className="grid md:grid-cols-2 gap-x-10 gap-y-6">
            {MILESTONES.map((m) => (
              <li key={m.year} className="grid grid-cols-12 gap-4 border-b border-granite/10 pb-5">
                <span className="col-span-3 font-display text-3xl text-tamarack">{m.year}</span>
                <span className="col-span-9 text-granite/85 text-sm leading-relaxed self-center">
                  {m.event}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Two branches, team and history */}
      <section className="py-[var(--spacing-section)] bg-cedar text-paper">
        <div className="container-edge grid gap-5 md:grid-cols-2 max-w-5xl mx-auto">
          <Link
            href="/about/team"
            className="group block p-8 border border-paper/20 hover:border-tamarack transition-colors"
          >
            <p className="eyebrow text-paper/60 mb-3">The team</p>
            <p className="display-sm font-display mb-3 group-hover:text-tamarack transition-colors">
              Jeff, Mike, and Brenda.
            </p>
            <p className="text-paper/75 text-sm leading-relaxed">
              Director of Golf &amp; Head Pro, Course Superintendent, Accounting.
            </p>
            <p className="mt-5 font-mono text-xs text-tamarack">Meet the team →</p>
          </Link>
          <Link
            href="/course/history"
            className="group block p-8 border border-paper/20 hover:border-tamarack transition-colors"
          >
            <p className="eyebrow text-paper/60 mb-3">Course history</p>
            <p className="display-sm font-display mb-3 group-hover:text-tamarack transition-colors">
              The long version.
            </p>
            <p className="text-paper/75 text-sm leading-relaxed">
              Archive photos, the Cominco era, Roy Stone's routing, and how it all came back.
            </p>
            <p className="mt-5 font-mono text-xs text-tamarack">Read the full history →</p>
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge text-center max-w-3xl mx-auto">
          <p className="eyebrow mb-6">A hundred years in and still here</p>
          <h2
            className="font-display mb-8 text-granite"
            style={{ fontSize: "clamp(1.75rem, 4.5vw, 3rem)", lineHeight: "1.05", letterSpacing: "-0.01em" }}
          >
            Come walk the course.
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <BookButton />
            <Link href="/course" className="btn-ghost">About the course →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
