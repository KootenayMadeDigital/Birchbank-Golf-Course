import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BookButton from "@/components/BookButton";

export const metadata: Metadata = {
  title: "Stay & play",
  description:
    "Where to sleep, eat, and play more golf when you visit Birchbank. Best Western Plus Columbia River Hotel, nearby lodging, after-the-round dining, and the four Kootenay Golf Trail courses.",
  alternates: { canonical: "/stay-and-play" },
};

/**
 * Stay-and-play page. One job: where to stay + the multi-course trip.
 *
 * Owns: lodging (partner hotel + nearby), after-the-round dining
 * (handled honestly, no speculative descriptions), Kootenay Golf Trail
 * with the 4 courses.
 *
 * Verified facts:
 *   - Best Western Plus Columbia River Hotel: 1001 Rossland Ave, Trail BC,
 *     (250) 368-3355, on-site Columbia Steakhouse. Listed on
 *     birchbankgolf.com/more-things-to-do/.
 *   - Bistro: 10 am to 6 pm daily, per CLAUDE.md and the Bistro page.
 *   - Kootenay Golf Trail courses: kootenaygolftrail.com redirects to
 *     tourismrossland.com/golfing, which features Birchbank, Redstone,
 *     Castlegar, and Champion Lakes.
 *   - Tourism Rossland, KCTS, City of Trail Recreation & Parks: all
 *     listed as Birchbank partners on the more-things-to-do page.
 *
 * Removed for accuracy:
 *   - "The Bistro closes at 5", was wrong, fixed to 6.
 *   - Speculative restaurant descriptions ("get the fish", "kind of dinner
 *     you drive for"), replaced with neutral "ask the Pro Shop"
 *     recommendation, since we can't verify each restaurant's voice claims.
 */

const PARTNER_HOTEL = {
  name: "Best Western Plus Columbia River Hotel",
  area: "Trail · 15 min from the course",
  address: "1001 Rossland Avenue, Trail, BC",
  phone: "250-368-3355",
  note: "Our partner hotel. Downtown Trail, on-site Columbia Steakhouse, on-site Coffee Garden for breakfast, meeting facilities for groups.",
  url: "https://www.bestwesterntrail.com",
};

const NEARBY_LODGING = [
  {
    name: "Prestige Mountain Resort Rossland",
    area: "Rossland · 30 min",
    note: "Mountain resort at the base of Red Mountain. On-site restaurant, walking distance to Rossland's downtown bars and pubs.",
    url: "https://prestigehotelsandresorts.com/hotels/prestige-mountain-resort-rossland",
  },
  {
    name: "Sandman Hotel Castlegar",
    area: "Castlegar · 15 min",
    note: "Full-service chain hotel with pool and 24-hour Denny's on-site. Closest reliable chain option for early morning tee times.",
    url: "https://www.sandmanhotels.com/hotel/castlegar",
  },
  {
    name: "Ramada by Wyndham Trail",
    area: "Trail · 15 min",
    note: "Budget-friendly with pool and continental breakfast. Central to Trail's restaurants and shops.",
    url: "https://www.wyndhamhotels.com/ramada/trail-british-columbia/ramada-trail/overview",
  },
];

const LOCAL_RESOURCES = [
  {
    name: "Tourism Rossland",
    blurb:
      "The aggregator for inns, B&Bs, cabins, and mountain lodging in Rossland. Listed as a Birchbank partner.",
    url: "https://tourismrossland.com",
  },
  {
    name: "Destination Castlegar",
    blurb:
      "Castlegar-area visitor information, including smaller motels, vacation rentals, and local events.",
    url: "https://destinationcastlegar.com",
  },
  {
    name: "City of Trail · Recreation & Parks",
    blurb:
      "Trail's municipal recreation site, listed as a Birchbank partner. Useful for campgrounds, trails, and city facilities.",
    url: "https://trail.ca",
  },
  {
    name: "Kootenay Columbia Trails Society",
    blurb:
      "Hiking and mountain-biking trail network through the Lower Columbia. Birchbank partner, good plan-B for a non-golf afternoon.",
    url: "https://kcts.ca",
  },
];

const TRAIL_COURSES = [
  {
    name: "Birchbank Golf Course",
    detail: "Par 72 · 6,584 yd · riverside · Genelle, BC",
    note: "You're here. Roy Stone's 1962 routing along the Columbia, reconfigured in 2018 to resemble the original.",
    href: "/course",
    external: false,
  },
  {
    name: "Redstone Resort Golf Course",
    detail: "18 holes · Les Furber design · Rossland, BC",
    note: "About 25 minutes north. A mountain layout, pairs naturally with Birchbank for a river-then-mountain weekend.",
    href: "https://www.redstoneresort.com/golf",
    external: true,
  },
  {
    name: "Castlegar Golf Club",
    detail: "18 holes · tree-lined · Castlegar, BC",
    note: "About 15 minutes north. Shorter and tighter than Birchbank, an easy second 18 the same day.",
    href: "https://www.castlegargolfclub.com",
    external: true,
  },
  {
    name: "Champion Lakes Golf Course",
    detail: "18 holes · mountain parkland · Fruitvale, BC",
    note: "About 30 minutes east, set inside Champion Lakes Provincial Park. Worth the drive for the setting.",
    href: "https://championlakesgolfcourse.com",
    external: true,
  },
];

export default function StayAndPlay() {
  return (
    <>
      {/* 1. HERO with sun-drenched fairway photo on the right. */}
      <section className="pt-32 md:pt-40 pb-16 bg-paper">
        <div className="container-edge grid gap-10 lg:gap-14 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 order-1">
            <p className="eyebrow mb-6">Stay &amp; play</p>
            <h1
              className="font-display text-granite max-w-[22ch] mb-8"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", lineHeight: "1.02", letterSpacing: "-0.015em" }}
            >
              Come for the golf.<br />Stay for the adventure.
            </h1>
            <p className="prose-editorial text-granite/85 max-w-2xl">
              Birchbank&apos;s own framing, and the calibration for this page. Play a round,
              stay in Trail or Rossland for the night, hit a second course on the{" "}
              <a
                href="http://www.kootenaygolftrail.com/"
                target="_blank"
                rel="noopener"
                className="underline hover:text-amber"
              >
                Kootenay Golf Trail
              </a>
              {" "}in the morning, and you have a weekend that beats most destination packages.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <BookButton />
              <Link href="/plan-your-visit" className="btn-ghost">How to get here →</Link>
            </div>
          </div>
          <figure className="lg:col-span-5 order-2 mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-granite/5 border border-granite/10 rounded-sm">
              <Image
                src="/visit/stay-and-play-hero.webp"
                alt="The fairway at Birchbank running into a wall of mountains, late-morning sun raking across the grass"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-[center_45%]"
                priority
              />
            </div>
            <figcaption className="mt-3 font-mono text-xs text-silt">
              Looking east into the Selkirks from the fairway.
            </figcaption>
          </figure>
        </div>
      </section>

      <div className="container-edge"><div className="rule-hair" /></div>

      {/* 2. PARTNER HOTEL */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge">
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow mb-5">Partner hotel</p>
            <h2 className="display-lg font-display mb-5">
              Best Western Plus.<br />Downtown Trail.
            </h2>
            <p className="prose-editorial text-granite/85">
              Our partner hotel for visitors playing the course. About 15 minutes from
              the first tee.
            </p>
          </div>

          <a
            href={PARTNER_HOTEL.url}
            target="_blank"
            rel="noopener"
            className="block border-2 border-amber bg-amber/5 p-8 md:p-10 hover:bg-amber/10 transition-colors"
          >
            <div className="flex items-baseline justify-between gap-4 flex-wrap mb-4">
              <p className="font-display text-2xl md:text-3xl text-granite">{PARTNER_HOTEL.name}</p>
              <p className="font-mono text-xs text-silt">{PARTNER_HOTEL.area}</p>
            </div>
            <p className="text-granite/85 text-base leading-relaxed mb-4 max-w-2xl">
              {PARTNER_HOTEL.note}
            </p>
            <p className="font-mono text-xs text-silt mb-3 tabular-nums">
              {PARTNER_HOTEL.address} · {PARTNER_HOTEL.phone}
            </p>
            <p className="font-mono text-sm text-amber">Visit hotel site ↗</p>
          </a>

          <p className="mt-6 font-mono text-xs text-silt max-w-2xl">
            Bundling a round with a room? Call the Pro Shop at{" "}
            <a href="tel:+12506932255" className="underline hover:text-amber">250-693-2255</a>{" "}
            before you book the hotel. If we have group rates or an event in your window,
            we&apos;ll let you know.
          </p>
        </div>
      </section>

      {/* 3. NEARBY LODGING */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge">
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow mb-5">Also nearby</p>
            <h2 className="display-md font-display mb-5">
              Three more hotels within 30 minutes.
            </h2>
            <p className="prose-editorial text-granite/85">
              Not formal Birchbank partners, but well-reviewed options covering
              Rossland&apos;s mountain-town feel, Castlegar&apos;s chain reliability, and
              Trail&apos;s budget category.
            </p>
          </div>

          <ul className="grid md:grid-cols-3 gap-5 md:gap-6">
            {NEARBY_LODGING.map((h) => (
              <li key={h.name} className="border border-granite/15 p-6">
                <p className="font-display text-lg text-granite mb-1">{h.name}</p>
                <p className="font-mono text-xs text-silt mb-3">{h.area}</p>
                <p className="text-silt text-sm leading-relaxed mb-4">{h.note}</p>
                <a
                  href={h.url}
                  target="_blank"
                  rel="noopener"
                  className="font-mono text-xs text-amber hover:underline"
                >
                  Hotel site ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. AFTER THE ROUND, honest framing only. */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge">
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow mb-5">After the round</p>
            <h2 className="display-md font-display mb-5">
              The Bistro runs 10 to 6. Dinner is 15 minutes away.
            </h2>
            <p className="prose-editorial text-granite/85">
              The Birchbank Bistro is open daily 10 am to 6 pm, breakfast through an early
              dinner on the covered patio. After 6, the Trail and Rossland dining scene takes
              over. Italian, brewpubs, steak, casual.
            </p>
          </div>

          <div className="grid md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-7 space-y-5">
              <p className="prose-editorial text-granite/85">
                <span className="font-semibold text-granite">In Trail.</span> Downtown Trail
                has Italian (a Lower Columbia tradition), the Columbia Steakhouse at the
                Best Western Plus, and casual pubs. The downtown core is walkable from the
                partner hotel.
              </p>
              <p className="prose-editorial text-granite/85">
                <span className="font-semibold text-granite">In Rossland.</span> A mountain
                town with craft breweries, casual restaurants, and historic hotel pubs.
                30 minutes from the course but worth the drive on a long evening.
              </p>
              <p className="prose-editorial text-granite/85">
                <span className="font-semibold text-granite">In Castlegar.</span> Closer to
                the course (15 min) and the closer of the two for a quick post-round dinner
                before turning in.
              </p>
            </div>
            <div className="md:col-span-5">
              <div className="border border-amber/40 bg-amber/5 p-6 md:p-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-amber mb-3">
                  Tonight&apos;s pick
                </p>
                <p className="font-display text-xl text-granite leading-snug mb-4">
                  Ask at the Pro Shop.
                </p>
                <p className="text-silt text-sm leading-relaxed mb-5">
                  Hours and menus shift; the Pro Shop knows what&apos;s open tonight,
                  what&apos;s busy, and where to walk in without a reservation. Call
                  before the round if you want a table held in town.
                </p>
                <a
                  href="tel:+12506932255"
                  className="font-mono text-xs text-amber hover:underline"
                >
                  Pro Shop · 250-693-2255
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. KOOTENAY GOLF TRAIL, this page owns it. */}
      <section className="py-[var(--spacing-section)] bg-cedar text-paper">
        <div className="container-edge">
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow text-tamarack mb-5">Multiple rounds</p>
            <h2
              className="font-display mb-5"
              style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)", lineHeight: "1.05", letterSpacing: "-0.01em" }}
            >
              The Kootenay Golf Trail.
            </h2>
            <p className="prose-editorial text-paper/85">
              Birchbank sits among a small collection of BC Interior courses, riverside,
              mountainside, parkland, all within 30 minutes of each other. A two- or
              three-day trip across the region is what the Tourism Rossland golf hub is
              built around.
            </p>
            <p className="mt-4">
              <a
                href="http://www.kootenaygolftrail.com/"
                target="_blank"
                rel="noopener"
                className="btn-ghost text-paper border-paper/70 hover:text-tamarack hover:border-tamarack"
              >
                Kootenay Golf Trail ↗
              </a>
            </p>
          </div>

          <ul className="space-y-0 divide-y divide-paper/15 border-t border-b border-paper/15">
            {TRAIL_COURSES.map((c) => (
              <li key={c.name} className="grid grid-cols-12 gap-4 py-6 items-baseline">
                <div className="col-span-12 md:col-span-5">
                  <p className="font-display text-xl md:text-2xl text-paper">{c.name}</p>
                  <p className="font-mono text-xs text-paper/60 mt-1 tabular-nums">{c.detail}</p>
                </div>
                <p className="col-span-12 md:col-span-5 text-paper/80 text-sm leading-relaxed">
                  {c.note}
                </p>
                <div className="col-span-12 md:col-span-2 md:text-right">
                  {c.external ? (
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noopener"
                      className="font-mono text-sm text-tamarack hover:text-paper underline"
                    >
                      Visit ↗
                    </a>
                  ) : (
                    <Link href={c.href} className="font-mono text-sm text-tamarack hover:text-paper underline">
                      You are here
                    </Link>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. LOCAL RESOURCES */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge">
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow mb-5">Local resources</p>
            <h2 className="display-md font-display mb-5">
              Regional tourism partners.
            </h2>
            <p className="prose-editorial text-granite/85">
              Tourism Rossland, the Kootenay Columbia Trails Society, and the City of
              Trail&apos;s Recreation &amp; Parks site. Birchbank partners on the things
              to do beyond the round.
            </p>
          </div>

          <ul className="grid md:grid-cols-2 gap-5 md:gap-6">
            {LOCAL_RESOURCES.map((r) => (
              <li key={r.name} className="border border-granite/15 p-6 md:p-7">
                <p className="font-display text-xl text-granite mb-2">{r.name}</p>
                <p className="text-silt text-sm leading-relaxed mb-4">{r.blurb}</p>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener"
                  className="font-mono text-xs text-amber hover:underline"
                >
                  Visit ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7. FINAL CTA, lodger-flavoured */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge text-center max-w-3xl mx-auto">
          <p className="eyebrow mb-6">Weekend trip, sorted</p>
          <h2
            className="font-display text-granite mb-8"
            style={{ fontSize: "clamp(2rem, 5.5vw, 3.5rem)", lineHeight: "1.02", letterSpacing: "-0.015em" }}
          >
            Pick a tee time.<br />Pick a hotel.<br />See you on the river.
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <BookButton />
            <a
              href="tel:+12506932255"
              className="btn-ghost"
            >
              Pro Shop · 250-693-2255
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
