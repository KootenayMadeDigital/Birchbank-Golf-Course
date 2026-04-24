import type { Metadata } from "next";
import Link from "next/link";
import BookButton from "@/components/BookButton";

export const metadata: Metadata = {
  title: "Stay & play",
  description:
    "Where to stay when you come to play Birchbank — partner hotels and inns in Rossland, Castlegar, and Trail, plus the Kootenay Golf Trail for multi-course trips.",
  alternates: { canonical: "/stay-and-play" },
};

/**
 * Stay-and-play page.
 *
 * Built from the real birchbankgolf.com/more-things-to-do/ page, which
 * lists the following partners:
 *   - Best Western Columbia River Hotel (the only hotel partner
 *     explicitly called out)
 *   - Tourism Rossland (aggregator)
 *   - Kootenay Golf Trail (http://www.kootenaygolftrail.com/)
 *   - Recreation & Parks / City of Trail
 *   - Kootenay Columbia Trails Society
 *   - Trail Historical Society
 *
 * For the 'additional hotels' we list on this page, we use real,
 * currently-operating hotels in the Lower Columbia region that we
 * also named on /plan-your-visit (Sandman Castlegar, Prestige
 * Mountain Resort Rossland, Ramada Trail). Those aren't formal
 * Birchbank partners per birchbankgolf.com -- we present them as
 * 'nearby lodging', not as 'Birchbank partners.'
 *
 * We do NOT invent:
 *   - Formal stay-and-play discount codes with specific hotels
 *   - Package pricing
 *   - Bundled course+hotel tee-time deals
 * Every 'stay here' card frames lodging as independently bookable
 * on the hotel's own site, and recommends calling the Pro Shop for
 * group rates if bundling multiple rounds.
 */

const PARTNER_HOTEL = {
  name: "Best Western Plus Columbia River Hotel",
  area: "Trail · 15 min from the course",
  note: "The only hotel listed as a Birchbank partner on birchbankgolf.com. Riverside location in Trail, on-site restaurant, pool, reliable chain standards.",
  url: "https://www.bestwesterntrail.com",
};

const NEARBY_LODGING = [
  {
    name: "Prestige Mountain Resort Rossland",
    area: "Rossland · 30 min",
    note: "Boutique mountain resort at the base of Red Mountain. On-site restaurant, walking distance to Rossland's breweries and pubs.",
    url: "https://prestigehotelsandresorts.com/hotels/prestige-mountain-resort-rossland",
  },
  {
    name: "Sandman Hotel Castlegar",
    area: "Castlegar · 15 min",
    note: "Full-service chain hotel, pool, 24-hour Denny's on-site. Closest chain option for early morning tee times.",
    url: "https://www.sandmanhotels.com/hotel/castlegar",
  },
  {
    name: "Ramada by Wyndham Trail",
    area: "Trail · 15 min",
    note: "Budget-friendly with pool and continental breakfast. Central to the Trail dining scene.",
    url: "https://www.wyndhamhotels.com/ramada/trail-british-columbia/ramada-trail/overview",
  },
];

const AFTER_THE_ROUND = [
  {
    name: "The Colander",
    area: "Trail",
    note: "Trail's iconic family-style Italian — the kind of dinner you drive for. Open for dinner; get the fish.",
  },
  {
    name: "Rossland Beer Company",
    area: "Rossland",
    note: "Craft brewery and tap room. Pair it with a walk around Rossland's restored downtown.",
  },
  {
    name: "Element Food + Drink",
    area: "Castlegar",
    note: "Locally-sourced plates, an actual wine list. The closest 'nice dinner' option to Birchbank.",
  },
  {
    name: "The Flying Steamshovel",
    area: "Rossland",
    note: "Historic Rossland pub, good burgers, local on tap. Open late.",
  },
];

const LOCAL_RESOURCES = [
  {
    name: "Tourism Rossland",
    blurb:
      "The aggregator for inns, B&Bs, cabins, and mountain lodging in Rossland. Birchbank lists them as a partner.",
    url: "https://tourismrossland.com",
  },
  {
    name: "Destination Castlegar",
    blurb:
      "Castlegar-area visitor information, including smaller motels and vacation rentals.",
    url: "https://destinationcastlegar.com",
  },
  {
    name: "City of Trail — Recreation & Parks",
    blurb:
      "Trail's municipal recreation site, listed as a Birchbank partner. Useful for campgrounds and city-operated facilities.",
    url: "https://trail.ca",
  },
  {
    name: "Kootenay Columbia Trails Society",
    blurb:
      "Hiking and mountain-biking trail network through the Lower Columbia. Birchbank partner. Good plan-B for a non-golf afternoon.",
    url: "https://kcts.ca",
  },
];

const TRAIL_COURSES = [
  {
    name: "Birchbank Golf Course",
    detail: "Par 72 · 6,788 yd · riverside routing · Genelle, BC",
    note: "You're here. Par 72 along the Columbia, Roy Stone's 1962 routing, restored 2018.",
    href: "/course",
    external: false,
  },
  {
    name: "Redstone Resort Golf Course",
    detail: "18 holes · Les Furber design · Rossland, BC",
    note: "25 minutes north. Pair with Birchbank for a river/mountain 2-course weekend.",
    href: "https://www.redstoneresort.com/golf",
    external: true,
  },
  {
    name: "Castlegar Golf Club",
    detail: "18 holes · tree-lined · Castlegar, BC",
    note: "15 minutes north. The other local 18 — shorter and tighter, great for an afternoon round.",
    href: "https://www.castlegargolfclub.com",
    external: true,
  },
  {
    name: "Champion Lakes Golf Course",
    detail: "18 holes · mountain parkland · Fruitvale, BC",
    note: "30 minutes east. Set inside a provincial park. Worth the drive for the setting alone.",
    href: "https://championlakesgolfcourse.com",
    external: true,
  },
];

export default function StayAndPlay() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-16 bg-paper">
        <div className="container-edge">
          <p className="eyebrow mb-6">Stay &amp; play</p>
          <h1
            className="font-display text-granite max-w-[22ch] mb-8"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", lineHeight: "1.02", letterSpacing: "-0.015em" }}
          >
            Come for the golf.<br />Stay for the adventure.
          </h1>
          <p className="prose-editorial text-granite/85 max-w-2xl">
            Birchbank's own words, and the calibration for this page. Play a round, stay
            in Trail or Rossland for a night, hit another course on the{" "}
            <a
              href="http://www.kootenaygolftrail.com/"
              target="_blank"
              rel="noopener"
              className="underline hover:text-amber"
            >
              Kootenay Golf Trail
            </a>
            {" "}in the morning, and you've got a weekend trip that beats most destination
            packages.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <BookButton />
            <Link href="/plan-your-visit" className="btn-ghost">Plan your visit →</Link>
          </div>
        </div>
      </section>

      <div className="container-edge"><div className="rule-hair" /></div>

      {/* Partner hotel callout */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge">
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow mb-5">Partner hotel</p>
            <h2 className="display-lg font-display mb-5">
              Best Western Plus.<br />Riverside in Trail.
            </h2>
            <p className="prose-editorial text-granite/85">
              The hotel listed as a Birchbank partner on the current
              birchbankgolf.com/more-things-to-do page. 15 minutes from the first tee.
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
            <p className="font-mono text-sm text-amber">Visit hotel site ↗</p>
          </a>

          <p className="mt-6 font-mono text-xs text-silt max-w-2xl">
            Bundling a round with a room? Call the Pro Shop at{" "}
            <a href="tel:+12506932255" className="underline hover:text-amber">250-693-2255</a>{" "}
            before you book the hotel — if we're hosting an event or have group rates
            available, we'll let you know.
          </p>
        </div>
      </section>

      {/* Nearby lodging (not formal partners) */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge">
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow mb-5">Also nearby</p>
            <h2 className="display-md font-display mb-5">
              Three more hotels within 30 minutes.
            </h2>
            <p className="prose-editorial text-granite/85">
              Not formal Birchbank partners, but well-reviewed options covering Rossland's
              mountain-town feel, Castlegar's chain-hotel reliability, and Trail's
              budget-conscious category.
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

      {/* After the round — where to eat dinner once the Bistro closes. */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge">
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow mb-5">After the round</p>
            <h2 className="display-md font-display mb-5">
              The Bistro closes at 5. Dinner is 15 minutes away.
            </h2>
            <p className="prose-editorial text-granite/85">
              The Birchbank Bistro runs 12–5 every day. When it closes, the Kootenay dining
              scene takes over — four spots we'd send family to.
            </p>
          </div>

          <ul className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {AFTER_THE_ROUND.map((r) => (
              <li key={r.name} className="border border-granite/15 p-5 md:p-6">
                <p className="font-display text-lg text-granite">{r.name}</p>
                <p className="font-mono text-xs text-silt mt-1">{r.area}</p>
                <p className="text-silt text-sm mt-3 leading-relaxed">{r.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Kootenay Golf Trail */}
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
              Birchbank sits on a trail of BC Interior courses as varied as the terrain they
              occupy — riverside, mountainside, tree-lined, or open. A 2- or 3-day trip
              across the region is what the local tourism boards are built around.
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
                  <p className="font-mono text-xs text-paper/60 mt-1">{c.detail}</p>
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

      {/* Local resources — partners + aggregators */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge">
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow mb-5">Local resources</p>
            <h2 className="display-md font-display mb-5">
              Regional tourism partners.
            </h2>
            <p className="prose-editorial text-granite/85">
              These four are the region's accommodation and recreation aggregators.
              Tourism Rossland, the Kootenay Columbia Trails Society, and the City of
              Trail's Recreation & Parks site are all listed as Birchbank partners on the
              current birchbankgolf.com.
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

      {/* Final CTA */}
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
            <Link href="/plan-your-visit" className="btn-ghost">Plan your visit →</Link>
            <Link href="/usa-visitors" className="btn-ghost">For US visitors →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
