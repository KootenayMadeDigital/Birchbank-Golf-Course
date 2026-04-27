import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BookButton from "@/components/BookButton";
import { REVIEW_PLATFORMS } from "@/data/reviews";

export const metadata: Metadata = {
  title: "For US visitors",
  description:
    "Crossing into BC to play Birchbank. Three border crossings near Trail (Paterson, Waneta, Nelway), what to bring, US drive times from Spokane and the Inland Northwest, and how Canadian rates work for US-dollar visitors.",
  alternates: { canonical: "/usa-visitors" },
};

/**
 * For-US-visitors page. One job: cross-border specifics.
 *
 * Owns: border crossings near Trail, US drive times, currency notes,
 * what to bring for the border + the round + re-entry.
 *
 * Does NOT own: lodging (see /stay-and-play), Kootenay Golf Trail
 * (lives on /stay-and-play), full-on Canadian drive routes (see
 * /plan-your-visit).
 *
 * Verified facts:
 *   - Three real BC-WA / BC-ID land crossings near Trail:
 *       Paterson (BC-22 / US-395, north of Frontier WA)
 *       Waneta (BC-22A / WA-25 spur, south of Trail)
 *       Nelway (BC-6 / WA-31 to Metaline Falls, ID/WA border zone)
 *     Hours change by season; we do not assert specific clock hours,
 *     we link to CBSA's wait-time page for the day-of check.
 *   - Bistro: 10am-6pm per CLAUDE.md.
 *   - $800 / 48-hour CBP exemption: standard, well-documented; framed
 *     conditionally with a CBP link for the day-of check.
 *
 * Removed for accuracy:
 *   - Hero "closest full-length 18-hole course in BC to the Washington
 *     border, and one of the most underplayed golf destinations in the
 *     Pacific Northwest", unverifiable + uses banned word "underplayed".
 *     Replaced with a verifiable framing.
 *   - "Make it a trip" multi-course section: lives on /stay-and-play.
 *   - Specific border-crossing clock hours, CBSA changes them; link out.
 */

const CROSSINGS = [
  {
    name: "Paterson · Frontier",
    highway: "BC-22 ↔ US-395",
    bestFor: "Coming from Spokane, Kettle Falls, Colville. The shortest route to Birchbank.",
    time: "About 30 minutes from the crossing to the first tee.",
  },
  {
    name: "Waneta · Boundary",
    highway: "BC-22A ↔ WA Boundary Rd",
    bestFor: "Closest physical crossing to the course, useful as an alternate when Paterson backs up.",
    time: "About 15 minutes from the crossing to the first tee.",
  },
  {
    name: "Nelway · Metaline Falls",
    highway: "BC-6 ↔ WA-31",
    bestFor: "Coming from Sandpoint, Coeur d'Alene, or anywhere south through Metaline.",
    time: "About 45 minutes from the crossing to the first tee.",
  },
];

const DRIVE_TIMES = [
  { origin: "Spokane, WA",       crossing: "Paterson",  total: "~3 hours" },
  { origin: "Colville, WA",      crossing: "Paterson",  total: "~1.5 hours" },
  { origin: "Kettle Falls, WA",  crossing: "Paterson",  total: "~1.5 hours" },
  { origin: "Sandpoint, ID",     crossing: "Nelway",    total: "~3 hours" },
  { origin: "Coeur d'Alene, ID", crossing: "Nelway",    total: "~3.5 hours" },
  { origin: "Seattle, WA",       crossing: "Sumas → Hwy 3", total: "~8 hours" },
];

const WHAT_TO_BRING = [
  {
    title: "For the border",
    bullets: [
      "Valid passport, NEXUS card, passport card, or enhanced driver's licence (any of these work for land crossings)",
      "Vehicle registration if you're driving a vehicle that isn't in your name",
      "No cannabis in the vehicle. Both Canada and the US prohibit moving it across the border, even though it's legal on both sides",
      "Declare groceries, alcohol, and gifts honestly. CBSA's published limits are on their site",
    ],
  },
  {
    title: "For the round",
    bullets: [
      "Clubs (Canadian airports are fine with golf bags, but driving is easier)",
      "A valid credit card. The Pro Shop takes all major US cards with no surcharge from us",
      "A small amount of CAD if you want to tip the beverage-cart staff in local currency",
      "Golf-appropriate apparel, see /dress-code before you pack",
    ],
  },
  {
    title: "For re-entry",
    bullets: [
      "The same passport / NEXUS / EDL you crossed in on",
      "Receipts for anything you bought in Canada (CBP's personal exemption is typically $800 per US resident after 48 hours; check cbp.gov for the current rule)",
      "A little patience. Southbound at Paterson can build up late Sunday afternoon in summer",
    ],
  },
];

export default function UsaVisitors() {
  return (
    <>
      {/* 1. HERO, no superlatives, no banned words. Photo on the right
          shows the Columbia winding through the valley, the literal
          destination on the other side of the border. */}
      <section className="pt-32 md:pt-40 pb-16 bg-paper">
        <div className="container-edge grid gap-10 lg:gap-14 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 order-1">
            <p className="eyebrow mb-6">For US visitors</p>
            <h1
              className="font-display text-granite max-w-[22ch] mb-8"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", lineHeight: "1.02", letterSpacing: "-0.015em" }}
            >
              Three hours from Spokane.<br />One border.
            </h1>
            <p className="prose-editorial text-granite/85 max-w-2xl">
              Birchbank is an 18-hole course on the Columbia River in Genelle, BC, about
              three hours north of Spokane via the Paterson crossing on US-395 and BC-22.
              This page covers what you need to know before you drive: crossings, documents,
              US drive times, and how Canadian rates work for US-dollar visitors.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <BookButton />
              <Link href="/rates" className="btn-ghost">See rates (CAD) →</Link>
            </div>
          </div>
          <figure className="lg:col-span-5 order-2 mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative w-full aspect-[3/2] overflow-hidden bg-granite/5 border border-granite/10 rounded-sm">
              <Image
                src="/visit/usa-visitors-hero.webp"
                alt="A Birchbank fairway in the foreground with tall grass, opening up to a wall of Selkirk mountains beyond"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
                priority
                unoptimized
              />
            </div>
            <figcaption className="mt-3 font-mono text-xs text-silt">
              The view that's a three-hour drive from Spokane.
            </figcaption>
          </figure>
        </div>
      </section>

      <div className="container-edge"><div className="rule-hair" /></div>

      {/* 2. BORDER CROSSINGS */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow mb-5">Border crossings</p>
            <h2 className="display-lg font-display mb-5">
              Three ways into BC.
            </h2>
            <p className="prose-editorial text-granite/85">
              Hours vary by season and crossing. Always check the{" "}
              <a
                href="https://www.cbsa-asfc.gc.ca/bwt-taf/menu-eng.html"
                target="_blank"
                rel="noopener"
                className="underline hover:text-amber"
              >
                CBSA border wait-times page
              </a>{" "}
              the morning of your drive, especially on a summer weekend.
            </p>
          </div>

          <ul className="grid md:grid-cols-3 gap-5 md:gap-6">
            {CROSSINGS.map((c) => (
              <li key={c.name} className="border border-granite/15 p-7">
                <p className="font-display text-xl text-granite mb-2">{c.name}</p>
                <p className="font-mono text-xs text-silt mb-4 tabular-nums">{c.highway}</p>
                <p className="text-silt text-sm leading-relaxed mb-3">{c.bestFor}</p>
                <p className="text-cedar text-sm font-semibold">{c.time}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. US DRIVE TIMES, this page owns them */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge">
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow mb-5">Drive times</p>
            <h2 className="display-md font-display mb-5">From home to the first tee.</h2>
            <p className="prose-editorial text-granite/85">
              Summer, no-traffic estimates via Google Maps. Add 20 to 45 minutes for border
              processing on a busy weekend.
            </p>
          </div>

          <ul className="divide-y divide-granite/15 border-t border-b border-granite/15">
            {DRIVE_TIMES.map((d) => (
              <li key={d.origin} className="grid grid-cols-12 gap-4 py-5 items-baseline">
                <p className="col-span-4 md:col-span-3 font-display text-lg text-granite">{d.origin}</p>
                <p className="col-span-5 md:col-span-6 font-mono text-xs text-silt">
                  via {d.crossing}
                </p>
                <p className="col-span-3 font-mono text-sm text-granite text-right tabular-nums">{d.total}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. CURRENCY */}
      <section className="py-[var(--spacing-section)] bg-cedar text-paper">
        <div className="container-edge grid gap-10 md:grid-cols-12 items-start">
          <div className="md:col-span-5">
            <p className="eyebrow text-tamarack mb-5">Currency</p>
            <h2
              className="font-display mb-5"
              style={{ fontSize: "clamp(1.75rem, 4.5vw, 2.75rem)", lineHeight: "1.05", letterSpacing: "-0.01em" }}
            >
              Canadian rates work in your favour.
            </h2>
          </div>
          <div className="md:col-span-7 space-y-5">
            <p className="prose-editorial text-paper/85">
              All Birchbank rates are listed in Canadian dollars. With the USD typically
              stronger than the CAD, our published{" "}
              <span className="text-tamarack font-semibold tabular-nums">CA$80</span> day
              rate converts to well under US$70 at most current rates.
            </p>
            <p className="prose-editorial text-paper/85">
              The Pro Shop takes every major US card with no surcharge from us. Your card
              issuer may apply a foreign-transaction fee; most travel cards (Chase Sapphire,
              Capital One travel, AmEx Platinum) do not.
            </p>
            <p className="prose-editorial text-paper/85">
              Check today&apos;s exchange rate at the{" "}
              <a
                href="https://www.bankofcanada.ca/rates/exchange/daily-exchange-rates/"
                target="_blank"
                rel="noopener"
                className="underline text-tamarack hover:text-paper"
              >
                Bank of Canada
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Maple-leaf moment between currency and what-to-bring. A small
          portrait card with the painted Canadian maple leaf on the
          grass: a quiet welcome to the country, no banner, no copy. */}
      <section className="py-16 bg-paper">
        <div className="container-edge grid gap-8 md:grid-cols-12 items-center">
          <figure className="md:col-span-3">
            <div className="relative w-full max-w-[240px] mx-auto md:mx-0 aspect-[4/5] overflow-hidden bg-granite/5 border border-granite/10 rounded-sm">
              <Image
                src="/visit/maple-leaf-green.webp"
                alt="A painted red maple leaf on the grass at Birchbank, with a flag and green visible behind"
                fill
                sizes="(max-width: 768px) 60vw, 240px"
                className="object-cover"
                loading="lazy"
                unoptimized
              />
            </div>
            <figcaption className="mt-3 font-mono text-xs text-silt">
              On the grass, every July 1.
            </figcaption>
          </figure>
          <div className="md:col-span-9">
            <p className="eyebrow mb-3 text-tamarack">Across the line</p>
            <p
              className="font-display text-granite leading-snug max-w-2xl"
              style={{ fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)", letterSpacing: "-0.01em" }}
            >
              You&apos;re in Canada now. Different units, different
              spelling, same game.
            </p>
            <p className="mt-4 prose-editorial text-granite/80 max-w-xl">
              Yardages on our scorecard are still in yards (RCGA convention).
              Temperatures on the conditions page are Celsius. Tipping at the
              Bistro is the Canadian standard, 15 to 20 percent.
            </p>
          </div>
        </div>
      </section>

      {/* 5. WHAT TO BRING */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow mb-5">What to bring</p>
            <h2 className="display-lg font-display mb-5">
              Three short lists.
            </h2>
            <p className="prose-editorial text-granite/85">
              Not exhaustive, just the questions first-time cross-border golfers usually
              ask. CBSA and CBP&apos;s own sites have the official, current word.
            </p>
          </div>

          <ul className="grid md:grid-cols-3 gap-5 md:gap-6">
            {WHAT_TO_BRING.map((g) => (
              <li key={g.title} className="border border-granite/15 p-7">
                <p className="eyebrow mb-4">{g.title}</p>
                <ul className="space-y-3">
                  {g.bullets.map((b) => (
                    <li key={b} className="text-granite/85 text-sm leading-relaxed flex gap-2">
                      <span className="text-tamarack shrink-0">·</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <p className="mt-10 text-xs text-silt max-w-3xl">
            Official sources:{" "}
            <a href="https://www.cbsa-asfc.gc.ca" target="_blank" rel="noopener" className="underline hover:text-amber">CBSA (Canada entry)</a>,{" "}
            <a href="https://www.cbp.gov" target="_blank" rel="noopener" className="underline hover:text-amber">CBP (US re-entry)</a>,{" "}
            <a href="https://ttp.cbp.dhs.gov" target="_blank" rel="noopener" className="underline hover:text-amber">Trusted Traveler Programs (NEXUS)</a>.
          </p>
        </div>
      </section>

      {/* 6. ONE CROSS-LINK LINE, no card grid. /stay-and-play owns multi-course. */}
      <section className="py-12 bg-paper border-t border-granite/10">
        <div className="container-edge">
          <p className="font-mono text-sm text-silt max-w-3xl">
            <span className="text-granite font-semibold">Making it a trip?</span>{" "}
            Hotels, after-the-round dinner, and the four Kootenay Golf Trail courses
            (Birchbank, Redstone, Castlegar, Champion Lakes) are all on{" "}
            <Link href="/stay-and-play" className="underline text-amber hover:text-amber-dark">
              /stay-and-play
            </Link>
            .
          </p>
        </div>
      </section>

      {/* 7. FINAL CTA, US-flavoured */}
      <section className="py-[var(--spacing-section)] bg-cedar text-paper">
        <div className="container-edge text-center max-w-3xl mx-auto">
          <p className="eyebrow text-paper/60 mb-6">Three hours, passport on the dash</p>
          <h2
            className="font-display mb-8"
            style={{ fontSize: "clamp(2.25rem, 6vw, 4rem)", lineHeight: "1.02", letterSpacing: "-0.02em" }}
          >
            Book a round.<br />Cross the border.<br />Play the Columbia.
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-5">
            <BookButton />
            <a
              href="tel:+12506932255"
              className="btn-ghost text-paper border-paper/70 hover:text-tamarack hover:border-tamarack"
            >
              Call from the US · +1 250-693-2255
            </a>
          </div>

          <a
            href={REVIEW_PLATFORMS.tripadvisor.readUrl}
            target="_blank"
            rel="noopener"
            className="mt-10 inline-block font-mono text-xs tracking-wide text-paper/70 hover:text-tamarack border-b border-paper/25 hover:border-tamarack pb-1 transition-colors"
          >
            Read what visitors say on Tripadvisor ↗
          </a>
        </div>
      </section>
    </>
  );
}
