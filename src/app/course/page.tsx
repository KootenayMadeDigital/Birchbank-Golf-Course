import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import BookButton from "@/components/BookButton";
import ScorecardCard from "@/components/ScorecardCard";
import { HOLE_SUMMARY, SCORECARD_IMAGES, COURSE_FACTS, HOLES, TEES } from "@/data/holes";
import { breadcrumbJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "The course",
  description:
    "Eighteen holes along the Columbia River. Par 72, 6,584 yards from the Blue tees. Routed by Roy Stone in 1962, restored to his 1969 layout in 2018. Walkable, four sets of tees, public-access.",
  alternates: { canonical: "/course" },
};

/**
 * The course overview page. Rebuilt around three ideas:
 *
 *   1. Walking ethos first. Birchbank is a walkable course routed by a
 *      local pro, not a cart-golf venue. Blueprint section 8 specifically
 *      calibrates the voice around 'walk the 18' -- this page makes
 *      walking an explicit design principle of the course, not an
 *      afterthought.
 *
 *   2. Orient by experience, not just by stats. A visitor doesn't care
 *      that hole 6 is stroke index 1 until they know it's uphill; they
 *      don't care about 'water in play on 12 and 15' until they hear it
 *      was added in 2018. The page leads with the experience, then
 *      backs it up with the numbers.
 *
 *   3. Route the visitor down the funnel. Scorecard, history, holes,
 *      conditions, book -- each is its own next step, linked from the
 *      bottom of its own narrative section.
 *
 * Every fact is from src/data/holes.ts, which itself is verified from
 * the Birchbank published scorecard + GolfNow + GolfPass.
 */

const PAR3S = HOLES.filter((h) => h.par === 3).length;
const PAR4S = HOLES.filter((h) => h.par === 4).length;
const PAR5S = HOLES.filter((h) => h.par === 5).length;
const BLUE = TEES.find((t) => t.key === "blue")!;
const RED = TEES.find((t) => t.key === "red")!;

const EXPERIENCE_NOTES = [
  {
    title: "Walkable by design",
    body:
      "Roy Stone routed Birchbank when carts were still rare, the holes flow one into the next with short tee-to-green walks. Most members walk. A power cart is $24 per rider for 18, if you want one.",
  },
  {
    title: "Four sets of tees",
    body: `${BLUE.total.toLocaleString()} yards from the Blue down to ${RED.total.toLocaleString()} from the Red. The Blue tees are the most-played; rating ${BLUE.courseRating}, slope ${BLUE.slopeRating}, a fair test without being punishing.`,
  },
  {
    title: "Water on the back nine",
    body:
      "The 2018 irrigation project added two ponds, one on hole 12, one on hole 15. Both in play from the Blue. Neither was there in Stone's original 1969 routing, but the ponds earn their place.",
  },
  {
    title: "A single river",
    body:
      "The Columbia runs the length of the course. Holes along the west bank open and close the front nine; the back nine loops inland and returns. You'll see the river on most of your round.",
  },
];

export default function CoursePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", url: "/" },
              { name: "The course", url: "/course" },
            ]),
          ),
        }}
      />

      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-16 bg-paper">
        <div className="container-edge">
          <p className="eyebrow mb-6">The course</p>
          <h1
            className="font-display text-granite max-w-[20ch] mb-8"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", lineHeight: "1.02", letterSpacing: "-0.015em" }}
          >
            Eighteen holes<br />along the Columbia.
          </h1>
          <p className="prose-editorial text-granite/85 max-w-2xl">
            Par 72, {HOLE_SUMMARY.yardageBlue.toLocaleString()} yards from the Blue.
            Routed by Roy Stone in 1962 along the west bank of the Columbia River, restored
            to his original 1969 layout in 2018. Surrounded by the Selkirk and Monashee
            mountains. Walkable, public-access, open {new Date(COURSE_FACTS.reconfiguredOn).getFullYear() <= new Date().getFullYear() ? "April 1" : "April 1"} through October 31.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <BookButton />
            <Link href="/course/scorecard" className="btn-ghost">Full scorecard →</Link>
          </div>
        </div>
      </section>

      <div className="container-edge"><div className="rule-hair" /></div>

      {/* Quick specs row */}
      <section className="py-16 bg-paper border-y border-granite/10">
        <div className="container-edge">
          <ul className="grid grid-cols-2 md:grid-cols-5 gap-y-8 gap-x-6">
            <li>
              <p className="font-mono text-xs text-silt uppercase tracking-widest mb-2">Par</p>
              <p className="font-display text-4xl text-granite">72</p>
            </li>
            <li>
              <p className="font-mono text-xs text-silt uppercase tracking-widest mb-2">Holes</p>
              <p className="font-display text-4xl text-granite">
                18 <span className="text-silt text-lg align-baseline">({PAR4S} par-4 · {PAR5S} par-5 · {PAR3S} par-3)</span>
              </p>
            </li>
            <li>
              <p className="font-mono text-xs text-silt uppercase tracking-widest mb-2">Tees</p>
              <p className="font-display text-4xl text-granite">4</p>
            </li>
            <li>
              <p className="font-mono text-xs text-silt uppercase tracking-widest mb-2">Blue yardage</p>
              <p className="font-display text-4xl text-granite">{BLUE.total.toLocaleString()}</p>
            </li>
            <li>
              <p className="font-mono text-xs text-silt uppercase tracking-widest mb-2">Rating / slope</p>
              <p className="font-display text-4xl text-granite">{BLUE.courseRating} / {BLUE.slopeRating}</p>
              <p className="font-mono text-xs text-silt mt-1">from the Blue</p>
            </li>
          </ul>
        </div>
      </section>

      {/* Course experience */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow mb-5">What to expect</p>
            <h2 className="display-lg font-display mb-5">
              Four things that make Birchbank Birchbank.
            </h2>
            <p className="prose-editorial text-granite/85">
              Not a marketing list, the specific facts that shape every round here.
            </p>
          </div>

          <ul className="grid md:grid-cols-2 gap-x-10 gap-y-10">
            {EXPERIENCE_NOTES.map((n) => (
              <li key={n.title} className="border-l-2 border-tamarack pl-6">
                <p className="font-display text-2xl text-granite mb-3">{n.title}</p>
                <p className="text-granite/85 text-base leading-relaxed">{n.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How to play it. Jeff Papilion's strategy quotes sourced verbatim
          from SCOREGolf's Oct 2022 feature by Andrew Penner. Every quote is
          attributed inline and the source article is linked once at the
          section's footer. */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow mb-5">How to play it</p>
            <h2 className="display-lg font-display mb-5">
              Smart over strong.
            </h2>
            <p className="prose-editorial text-granite/85">
              Jeff Papilion, our CPGA head pro, on how to navigate the course, in his
              own words.
            </p>
          </div>

          <ul className="grid md:grid-cols-3 gap-6 md:gap-8">
            <li className="border-l-2 border-tamarack pl-5">
              <p className="font-display text-tamarack text-5xl leading-none mb-2" aria-hidden>
                &ldquo;
              </p>
              <p className="prose-editorial text-granite/90 italic leading-snug">
                The corridors are actually quite generous, but if you don't know your
                yardages and the ideal lines, blowing it through fairways and getting
                blocked out is easy to do.
              </p>
            </li>
            <li className="border-l-2 border-tamarack pl-5">
              <p className="font-display text-tamarack text-5xl leading-none mb-2" aria-hidden>
                &ldquo;
              </p>
              <p className="prose-editorial text-granite/90 italic leading-snug">
                It's better to err on the side of caution when you're playing Birchbank.
                You can easily get into trouble if you're too aggressive.
              </p>
            </li>
            <li className="border-l-2 border-tamarack pl-5">
              <p className="font-display text-tamarack text-5xl leading-none mb-2" aria-hidden>
                &ldquo;
              </p>
              <p className="prose-editorial text-granite/90 italic leading-snug">
                Good players who understand the course will use numerous clubs off the tee
                throughout the round. But there are some outstanding holes that scream grip
                it and rip it, the opener and the closer, both shortish par 5s that can be
                had.
              </p>
            </li>
          </ul>

          <p className="mt-10 font-mono text-xs text-silt max-w-3xl leading-relaxed">
            Quotes from Jeff Papilion, Director of Golf / CPGA Head Professional. Originally
            published by Andrew Penner in{" "}
            <a
              href="https://scoregolf.com/features/golf-course-features/birchbank-a-kootenay-rockies-classic/"
              target="_blank"
              rel="noopener"
              className="underline hover:text-amber"
            >
              SCOREGolf, &ldquo;Birchbank a Kootenay Rockies classic,&rdquo; October 2022 ↗
            </a>
            .
          </p>
        </div>
      </section>

      {/* Routing narrative */}
      <section className="py-[var(--spacing-section)] bg-cedar text-paper">
        <div className="container-edge grid gap-10 md:grid-cols-12 items-start">
          <div className="md:col-span-5">
            <p className="eyebrow text-tamarack mb-5">The routing</p>
            <h2 className="display-lg font-display mb-5">
              Front nine on the river. Back nine in the trees.
            </h2>
          </div>
          <div className="md:col-span-7 prose-editorial text-paper/85 space-y-5">
            <p>
              The front nine opens along the river, your first sight of the Columbia on the
              walk to the first tee, and your last sight of it when you putt out on nine.
              Tight to the water, generous fairways, the sort of holes that reward a
              well-placed drive over a long one.
            </p>
            <p>
              The back nine turns inland through the Cominco land and the trees, with the
              two ponds (holes 12 and 15) both in play on the long par-4s. Hole 6 is the
              stroke index 1 from the Blue, the one that tends to decide your card.
            </p>
            <p>
              Stone's original 1969 routing came back in 2018 along with new irrigation,
              restored greens, and the rebuilt back-nine ponds. What you walk today is what
              he drew on paper sixty-some years ago.
            </p>
            <p className="text-tamarack">
              The course has been called on to host several provincial championships over
              the years.
            </p>
          </div>
        </div>
      </section>

      {/* Scorecard */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow mb-5">The scorecard</p>
            <h2 className="display-lg font-display mb-5">
              Two cards. Print, fold, walk.
            </h2>
            <p className="prose-editorial text-granite/85">
              The Classic Scorecard for tracking the round, the Course Atlas for the
              routing, local rules, and pin colours. Click either to view full size, or
              download to print at home and bring along.
            </p>
          </div>

          <div className="grid gap-8 md:gap-10 md:grid-cols-2 items-start">
            <ScorecardCard
              src={SCORECARD_IMAGES.classic}
              alt="Birchbank Classic Scorecard with yardages and HCP for Blue, Combo, White, and Red tees, plus par and ladies' HCP"
              title="Birchbank Classic Scorecard"
              caption="Classic Scorecard · Blue / Combo / White / Red"
              downloadName="birchbank-classic-scorecard.png"
              ratio="5/4"
            />
            <ScorecardCard
              src={SCORECARD_IMAGES.atlas}
              alt="Birchbank Course Atlas with the routing diagram, RCGA local rules, fairway markers, and flag positions, signed by Director of Golf Jeff Papilion"
              title="Birchbank Course Atlas"
              caption="Course Atlas · routing, local rules, pin colours"
              downloadName="birchbank-course-atlas.jpg"
              ratio="5/4"
            />
          </div>

          <div className="mt-12 flex flex-wrap gap-4">
            <Link href="/course/scorecard" className="btn-primary">Full interactive scorecard</Link>
            <a
              href="/api/scorecard"
              download="birchbank-scorecard.pdf"
              className="btn-ghost"
            >
              Download PDF ↓
            </a>
            <Link href="/course/holes/1" className="btn-ghost">Walk the 18 hole-by-hole →</Link>
          </div>
        </div>
      </section>

      {/* Adjacent pages */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow mb-5">Keep reading</p>
            <h2 className="display-md font-display mb-5">More on the course.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            <Link
              href="/course/history"
              className="group border border-granite/15 p-7 hover:border-amber transition-colors"
            >
              <p className="eyebrow mb-3">History</p>
              <p className="font-display text-xl mb-3 group-hover:text-amber transition-colors">
                A century on the river.
              </p>
              <p className="text-silt text-sm leading-relaxed">
                1922 club, 1962 land, 1969 Stone routing, 2004 purchase, 2018 restoration.
              </p>
            </Link>
            <Link
              href="/course/scorecard"
              className="group border border-granite/15 p-7 hover:border-amber transition-colors"
            >
              <p className="eyebrow mb-3">Scorecard</p>
              <p className="font-display text-xl mb-3 group-hover:text-amber transition-colors">
                Every hole, every tee.
              </p>
              <p className="text-silt text-sm leading-relaxed">
                Pick a tee, see the yardage, rating, and slope. Or read the scorecard as-printed.
              </p>
            </Link>
            <Link
              href="/conditions"
              className="group border border-granite/15 p-7 hover:border-amber transition-colors"
            >
              <p className="eyebrow mb-3">Conditions</p>
              <p className="font-display text-xl mb-3 group-hover:text-amber transition-colors">
                Is today a good day?
              </p>
              <p className="text-silt text-sm leading-relaxed">
                Live weather from Environment Canada's GEM model. 24-hour hourly + 7-day outlook.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-[var(--spacing-section)] bg-cedar text-paper">
        <div className="container-edge text-center max-w-3xl mx-auto">
          <p className="eyebrow text-paper/60 mb-6">Ready to book</p>
          <h2
            className="font-display mb-8"
            style={{ fontSize: "clamp(2.25rem, 6vw, 4rem)", lineHeight: "1.02", letterSpacing: "-0.02em" }}
          >
            Walk the 18.<br />Meet us at the first tee.
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-5">
            <BookButton />
            <a
              href="tel:+12506932255"
              className="btn-ghost text-paper border-paper/70 hover:text-tamarack hover:border-tamarack"
            >
              Call Pro Shop · 250-693-2255
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
