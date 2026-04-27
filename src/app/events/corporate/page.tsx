import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HOLE_SUMMARY } from "@/data/holes";

export const metadata: Metadata = {
  title: "Corporate events",
  description:
    "Corporate golf outings, client appreciation days, staff appreciation tournaments, and full-day buyouts at Birchbank Golf Course in Genelle, BC. Six published Bistro Banquet packages from $35 to $53 per person. 18 holes, par 72, member-owned since 2004.",
  alternates: { canonical: "/events/corporate" },
};

/**
 * Corporate events page. Built strictly from verified sources:
 *
 *   - https://www.birchbankgolf.com/the-bistro/book-your-event/
 *     "From a round of golf for a small group to a large tournament" +
 *     "the Bistro dining area can handle larger groups for meals,
 *     appetizers, and refreshments, as a standalone function or paired
 *     with a golf package. The large covered patio suits summer
 *     gatherings."
 *   - public/bistro/menus/banquet.pdf  (six buffet packages, per-person prices)
 *   - src/data/holes.ts  (par 72, 6,584 yd Blue, four sets of tees, ponds 12 + 15)
 *   - src/app/plan-your-visit/page.tsx  (verified drive times: 15 min Castlegar,
 *     12 min Trail; ~3h Spokane; ~3.5h Kelowna; ~6.5-7.5h Calgary; ~7h Vancouver)
 *   - SCOREGolf, Andrew Penner, Oct 2022 (Jeff Papilion quote)
 *
 * What we deliberately DON'T claim, because we couldn't verify it:
 *   - "Largest 18-hole venue in the Lower Columbia" (no source)
 *   - Specific named past customers (Teck, banks, dealerships, named charities)
 *   - "office@birchbankgolf.com" (no live page lists it)
 *   - A "Canadian burger" (the actual Bistro signature is the Crispy
 *     Birdie Burger; the menu has no Canadian burger)
 *   - Player-count specifics like "four to sixteen players" (no source)
 *   - Mid-week shoulder-season buyout availability (no source)
 *
 * Every banquet price below is transcribed from public/bistro/menus/banquet.pdf.
 */

/**
 * Banquet detail (six packages with full dish lists, MenuPdfCard,
 * pricing footnotes) lives canonically on /events/book. This page
 * keeps a brief banquet teaser only, with a link out, so the B2B
 * visitor isn't reading the same package list twice.
 *
 * Three audience verticals. Worded as "groups we are built to host"
 * rather than "groups we have hosted" because we can't verify a named
 * customer list.
 */
const BUILT_TO_HOST = [
  {
    title: "Corporate tournaments",
    body:
      "A full day on the course with a shotgun start, a banquet on the patio after. The office and Pro Shop scope the format with you; the Bistro handles the meal.",
  },
  {
    title: "Client appreciation days",
    body:
      "A small to mid-sized group, a tee block, and a published banquet package. Confirm your numbers, hand over your guest list, show up to host.",
  },
  {
    title: "Staff appreciation outings",
    body:
      "Mixed-ability foursomes from four sets of tees mean a 12-handicap and a first-time golfer can both have a good day. Banquet after on the covered patio.",
  },
];

export default function CorporateEvents() {
  return (
    <>
      {/* 1. HERO. Photo on the right shows actual people on the course
          (a B2B buyer is buying their group's day, not the venue
          itself; the human element matters). */}
      <section className="pt-32 md:pt-40 pb-16 bg-paper">
        <div className="container-edge grid gap-10 lg:gap-14 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 order-1">
            <p className="eyebrow mb-6">Corporate events</p>
            <h1
              className="font-display text-granite max-w-[22ch] mb-8"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", lineHeight: "1.02", letterSpacing: "-0.015em" }}
            >
              Host your day<br />on the Columbia.
            </h1>
            <p className="prose-editorial text-granite/85 max-w-2xl">
              18 holes on the river, member-owned since 2004, the original Roy Stone
              routing restored in 2018. Six published Bistro Banquet packages,
              from $35 to $53 a person. The office runs the day, the Pro Shop
              handles the round, the Bistro handles the meal.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="tel:+12506932366" className="btn-primary">
                Call the office · 250-693-2366
              </a>
              <Link href="/contact" className="btn-ghost">
                Send a written inquiry
              </Link>
            </div>
          </div>
          <figure className="lg:col-span-5 order-2 mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative w-full aspect-[3/2] overflow-hidden bg-granite/5 border border-granite/10 rounded-sm">
              <Image
                src="/events/players-on-green.webp"
                alt="A foursome on the green at Birchbank with cart parked on the cart path, the Selkirks rising behind"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
                priority
                unoptimized
              />
            </div>
            <figcaption className="mt-3 font-mono text-xs text-silt">
              A foursome on the 8th, midweek.
            </figcaption>
          </figure>
        </div>
      </section>

      <div className="container-edge"><div className="rule-hair" /></div>

      {/* 2. BUILT TO HOST */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow mb-5">Built to host</p>
            <h2 className="display-lg font-display mb-5">
              Three kinds of corporate day.
            </h2>
            <p className="prose-editorial text-granite/85">
              Every event is built around your guest list and your format. The
              published banquet PDF below answers most of the food questions
              before you call.
            </p>
          </div>

          <ul className="grid md:grid-cols-3 gap-5 md:gap-6">
            {BUILT_TO_HOST.map((k) => (
              <li
                key={k.title}
                className="border border-granite/15 p-7 md:p-8 hover:border-amber transition-colors"
              >
                <p className="font-display text-2xl text-granite mb-4">{k.title}</p>
                <p className="text-granite/85 text-base leading-relaxed">{k.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. THE COURSE */}
      <section className="py-[var(--spacing-section)] bg-cedar text-paper">
        <div className="container-edge grid gap-10 md:grid-cols-12 items-start">
          <div className="md:col-span-5">
            <p className="eyebrow text-tamarack mb-5">The venue</p>
            <h2
              className="font-display mb-5"
              style={{ fontSize: "clamp(1.75rem, 4.5vw, 2.75rem)", lineHeight: "1.05", letterSpacing: "-0.01em" }}
            >
              Par 72, four tees,<br />one Columbia River.
            </h2>
            <p className="prose-editorial text-paper/85 mb-7 max-w-md">
              Roy Stone's original 1969 routing, restored in 2018 with new
              irrigation and ponds on holes 12 and 15. Walkable for the fit
              foursome, cart-friendly for everyone else.
            </p>
            <Link
              href="/course"
              className="btn-ghost text-paper border-paper/70 hover:text-tamarack hover:border-tamarack"
            >
              The course →
            </Link>
          </div>

          <div className="md:col-span-7 space-y-5">
            <div className="border-l-2 border-tamarack pl-5">
              <p className="font-display text-lg text-paper mb-1">The course</p>
              <p className="text-paper/80 text-sm leading-relaxed tabular-nums">
                18 holes, par {HOLE_SUMMARY.par}, {HOLE_SUMMARY.yardageBlue.toLocaleString()} yards from
                the Blue down to {HOLE_SUMMARY.yardageRed.toLocaleString()} from the Red. Four sets of
                tees so a mixed-ability foursome plays together comfortably.
              </p>
            </div>
            <div className="border-l-2 border-tamarack pl-5">
              <p className="font-display text-lg text-paper mb-1">The Bistro</p>
              <p className="text-paper/80 text-sm leading-relaxed">
                Fully licensed kitchen, full bar, large covered patio. Per the
                Bistro&apos;s own published copy, &ldquo;the Bistro dining area
                can handle larger groups for meals, appetizers, and
                refreshments, as a standalone function or paired with a golf
                package.&rdquo;
              </p>
            </div>
            <div className="border-l-2 border-tamarack pl-5">
              <p className="font-display text-lg text-paper mb-1">The location</p>
              <p className="text-paper/80 text-sm leading-relaxed">
                5500 Highway 22, Genelle BC. 12 minutes from Trail, 15 from
                Castlegar, half an hour from Rossland, three hours from
                Spokane.{" "}
                <Link href="/plan-your-visit" className="underline hover:text-tamarack">
                  Plan your visit →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BANQUET TEASER. Detail lives on /events/book. */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge">
          <div className="grid gap-8 md:grid-cols-12 items-center max-w-5xl mx-auto border border-granite/15 p-8 md:p-10 rounded-sm">
            <div className="md:col-span-8">
              <p className="eyebrow mb-4">The Bistro Banquet</p>
              <h2 className="display-md font-display mb-4 max-w-[22ch]">
                Six buffets. Per-person prices. No surprises.
              </h2>
              <p className="prose-editorial text-granite/85 max-w-xl">
                Top Sirloin at $53, the Burger Buffet at $35. Most groups land
                between. Full per-person pricing, every dish listed, and the
                downloadable PDF live on{" "}
                <Link href="/events/book" className="underline hover:text-amber">
                  /events/book
                </Link>
                .
              </p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <Link
                href="/events/book"
                className="btn-primary"
              >
                See banquet packages →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. THE PATIO, with verified Jeff/SCOREGolf quote */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge max-w-3xl">
          <p className="eyebrow mb-6">From the head pro</p>
          <blockquote className="border-l-2 border-tamarack pl-6 md:pl-8">
            <p
              className="font-display text-granite leading-snug"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", letterSpacing: "-0.01em" }}
            >
              The Bistro, thanks to the delicious food and the huge, covered
              deck, is the perfect spot for your after-golf winddown.
            </p>
            <footer className="mt-5 font-mono text-xs text-silt leading-relaxed">
              Jeff Papilion, Director of Golf · CPGA Head Professional. Quoted in{" "}
              <a
                href="https://scoregolf.com/features/golf-course-features/birchbank-a-kootenay-rockies-classic/"
                target="_blank"
                rel="noopener"
                className="underline hover:text-amber"
              >
                SCOREGolf · October 2022 ↗
              </a>
              , by Andrew Penner.
            </footer>
          </blockquote>
          <p className="mt-8 prose-editorial text-granite/85">
            The patio sits one tier above the first green. From any table you
            are looking down the front nine, across the Columbia, and up at
            the Monashee foothills.{" "}
            <Link href="/bistro" className="underline hover:text-amber">
              See the Bistro →
            </Link>
          </p>
        </div>
      </section>

      {/* 6. HOW TO START */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge">
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow mb-5">How to start</p>
            <h2 className="display-md font-display mb-5">
              One call. One conversation.
            </h2>
            <p className="prose-editorial text-granite/85">
              Corporate events are not built through a widget. Call the office,
              tell us your guest list, your date range, and what you are
              hoping to accomplish. We come back with a plan.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            <div className="border border-granite/15 p-7">
              <p className="eyebrow mb-3">Office</p>
              <a
                href="tel:+12506932366"
                className="font-display text-2xl text-granite hover:text-amber"
              >
                250-693-2366
              </a>
              <p className="text-silt text-sm mt-2">
                Event bookings, tournament coordination
              </p>
            </div>
            <div className="border border-granite/15 p-7">
              <p className="eyebrow mb-3">Pro Shop</p>
              <a
                href="tel:+12506932255"
                className="font-display text-2xl text-granite hover:text-amber"
              >
                250-693-2255
              </a>
              <p className="text-silt text-sm mt-2">
                Tee times, group rates, day-of questions
              </p>
            </div>
            <div className="border border-granite/15 p-7">
              <p className="eyebrow mb-3">Bistro</p>
              <a
                href="tel:+12506935451"
                className="font-display text-2xl text-granite hover:text-amber"
              >
                250-693-5451
              </a>
              <p className="text-silt text-sm mt-2">
                <a
                  href="mailto:bistro@birchbankgolf.com"
                  className="underline hover:text-amber"
                >
                  bistro@birchbankgolf.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA */}
      <section className="py-[var(--spacing-section)] bg-cedar text-paper">
        <div className="container-edge text-center max-w-3xl mx-auto">
          <p className="eyebrow text-paper/60 mb-6">Ready to plan</p>
          <h2
            className="font-display mb-8"
            style={{ fontSize: "clamp(2.25rem, 6vw, 4rem)", lineHeight: "1.02", letterSpacing: "-0.02em" }}
          >
            Call the office.<br />We&apos;ll take it from there.
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-5">
            <a
              href="tel:+12506932366"
              className="btn-primary bg-tamarack text-granite hover:bg-paper"
            >
              Call 250-693-2366
            </a>
            <Link
              href="/events/book"
              className="btn-ghost text-paper border-paper/70 hover:text-tamarack hover:border-tamarack"
            >
              Booking details
            </Link>
          </div>
          <p className="mt-10 font-mono text-xs text-paper/60">
            5500 Highway 22, Genelle BC · April through October
          </p>
        </div>
      </section>
    </>
  );
}
