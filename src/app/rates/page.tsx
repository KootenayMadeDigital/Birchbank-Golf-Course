import type { Metadata } from "next";
import Link from "next/link";
import BookButton from "@/components/BookButton";
import {
  GREEN_FEES,
  PROMOTIONS,
  CART_FEES,
  PUNCH_PASSES,
  RANGE_PASS,
  LOCKERS,
} from "@/data/rates";

export const metadata: Metadata = {
  title: "Rates",
  description:
    "Green fees, power cart rates, twilight pricing, punch passes, and the Beat the Heat promotion at Birchbank Golf Course. All prices in CAD, verified April 2026.",
  alternates: { canonical: "/rates" },
};

/**
 * Rates page rebuilt around three ideas:
 *
 *   1. Anchor on the best value, not the list.  The hero shows the two
 *      everyday numbers the golfer is deciding between ($80 day rate vs.
 *      $45 twilight) and the Beat the Heat promo, which is the single
 *      most-asked-about rate. Everything else is transparently listed
 *      below for the completist.
 *
 *   2. Show the math.  Punch passes are $340 for 5 rounds ($68/round --
 *      $12 off the walk-up rate) and $190 for 5 nines ($38/round -- $7
 *      off). Making the math explicit turns a pricing list into buying
 *      advice, which is the Kootenay voice we're calibrating to.
 *
 *   3. Be honest about what is not on this page.  Membership pricing has
 *      its own tier comparison on /membership; corporate + tournament
 *      rates are quoted by the office. Pointing that out keeps the page
 *      focused and builds trust by not hiding information.
 *
 * All numbers in src/data/rates.ts are verified from birchbankgolf.com/
 * rates -- April 2026.
 */

const punch18 = { perRound: 68, savings: 12 }; // $340 / 5 rounds; $80 rack
const punch9  = { perRound: 38, savings: 7 };  // $190 / 5 rounds; $45 rack

const TRANSPARENCY_NOTES = [
  {
    title: "What's not on this page",
    body: "Membership pricing (seven tiers, with Fall Early Bird discounts through November) lives on the Memberships page. Corporate outings, weddings, and tournament pricing are quoted by the office.",
  },
  {
    title: "Taxes",
    body: "Green fees are listed pre-tax. Power cart rates are per rider, tax included. GST applies to all Pro Shop purchases.",
  },
  {
    title: "Reciprocal rates",
    body: "Members of participating clubs receive 25% off rack. Bring your member card to the Pro Shop or ask when you book, we'll match it on the line.",
  },
];

function RateList({ title, items, note }: { title: string; items: { label: string; amount: string; note?: string }[]; note?: string }) {
  return (
    <div>
      <p className="eyebrow mb-4">{title}</p>
      <ul className="border-t border-granite/15">
        {items.map((r) => (
          <li key={r.label} className="flex items-baseline justify-between gap-6 py-4 border-b border-granite/10">
            <span className="font-sans text-base">
              {r.label}
              {r.note && <span className="block text-xs text-silt mt-1">{r.note}</span>}
            </span>
            <span className="font-mono text-sm whitespace-nowrap">{r.amount}</span>
          </li>
        ))}
      </ul>
      {note && <p className="mt-4 text-xs text-silt">{note}</p>}
    </div>
  );
}

export default function RatesPage() {
  return (
    <>
      {/* Hero, lead with the two numbers the golfer is actually deciding
          between, not the word 'Rates'. */}
      <section className="pt-32 md:pt-40 pb-16 bg-paper">
        <div className="container-edge">
          <p className="eyebrow mb-6">Rates</p>
          <h1
            className="font-display text-granite max-w-[20ch] mb-8"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", lineHeight: "1.02", letterSpacing: "-0.015em" }}
          >
            Eighty bucks, walking.<br />Forty-five after three.
          </h1>
          <p className="prose-editorial text-granite/85 max-w-2xl">
            Everyday rates, no surcharges, no dynamic pricing games. All prices Canadian,
            verified April 2026. Cart pricing per rider. Taxes per the line below.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <BookButton />
            <a href="tel:+12506932255" className="btn-ghost">Or call · 250-693-2255</a>
          </div>
        </div>
      </section>

      <div className="container-edge"><div className="rule-hair" /></div>

      {/* Everyday green fees, the featured block. Three tiles the eye can
          tape between at a glance: walk-up, twilight, reciprocal. */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow mb-5">Green fees</p>
            <h2 className="display-lg font-display mb-5">
              The two numbers that matter.
            </h2>
            <p className="prose-editorial text-granite/85">
              Walk-up or twilight, full 18 or a quick nine. Everything else on this page is
              a permutation of these four rows.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            <div className="border border-granite/15 bg-paper p-7">
              <p className="eyebrow mb-3">Day rate · walking</p>
              <p className="font-display text-5xl text-granite">$80</p>
              <p className="text-silt text-sm mt-2">18 holes, all day until 1 PM.</p>
              <p className="text-silt text-xs mt-3">9 holes · $45</p>
            </div>
            <div className="border border-amber/40 bg-amber/5 p-7 relative">
              <span className="absolute -top-3 left-6 bg-amber text-paper font-mono text-[10px] uppercase tracking-widest px-2 py-0.5">
                Most booked
              </span>
              <p className="eyebrow mb-3 text-amber">Twilight · after 3 PM</p>
              <p className="font-display text-5xl text-granite">$45</p>
              <p className="text-silt text-sm mt-2">18 holes, walking, while light holds.</p>
              <p className="text-silt text-xs mt-3">After 1 PM · $55</p>
            </div>
            <div className="border border-cedar/30 bg-cedar/5 p-7">
              <p className="eyebrow mb-3 text-cedar">Reciprocal</p>
              <p className="font-display text-5xl text-granite">25% off</p>
              <p className="text-silt text-sm mt-2">For members of participating clubs, bring your card.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Beat the Heat, promoted into its own cedar block. This is the
          single most-searched-for rate at Birchbank by a wide margin. */}
      <section className="py-[var(--spacing-section)] bg-cedar text-paper">
        <div className="container-edge grid gap-10 md:grid-cols-12 items-center">
          <div className="md:col-span-7">
            <p className="eyebrow text-tamarack mb-5">{PROMOTIONS[0].window}</p>
            <h2 className="display-lg font-display mb-5">
              Beat the Heat.
            </h2>
            <p className="prose-editorial text-paper/85 max-w-xl">
              {PROMOTIONS[0].price} gets you 18 holes and a half power cart through the peak
              of the Kootenay summer. Start after 1 PM, the course cools down, the fairways
              play long, and the Bistro patio's running until five.
            </p>
          </div>
          <div className="md:col-span-5 md:text-right">
            <p className="font-display text-6xl md:text-7xl text-paper">{PROMOTIONS[0].price}</p>
            <p className="font-mono text-xs text-paper/60 mt-2">{PROMOTIONS[0].includes}</p>
            <div className="mt-6 flex justify-start md:justify-end">
              <BookButton label="Book a twilight tee time" />
            </div>
          </div>
        </div>
      </section>

      {/* Punch passes, with the math shown explicitly. */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow mb-5">Punch passes</p>
            <h2 className="display-lg font-display mb-5">
              Five rounds, fewer dollars.
            </h2>
            <p className="prose-editorial text-granite/85">
              For the regular. Good any time the course is open. Shareable with family members in
              the same household. No blackout dates.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="border border-granite/15 p-7">
              <p className="eyebrow mb-3">5 rounds · 18 holes</p>
              <div className="flex items-baseline gap-4">
                <p className="font-display text-5xl text-granite">$340</p>
                <p className="font-mono text-sm text-silt">${punch18.perRound}/round</p>
              </div>
              <p className="text-silt text-sm mt-3">
                ${punch18.savings} off the $80 walk-up rate per round. Breaks even at round four.
              </p>
            </div>
            <div className="border border-granite/15 p-7">
              <p className="eyebrow mb-3">5 rounds · 9 holes</p>
              <div className="flex items-baseline gap-4">
                <p className="font-display text-5xl text-granite">$190</p>
                <p className="font-mono text-sm text-silt">${punch9.perRound}/round</p>
              </div>
              <p className="text-silt text-sm mt-3">
                ${punch9.savings} off the $45 walk-up rate per round. Built for the after-work nine.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Power cart + storage + range + lockers, the transparent long list. */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow mb-5">Everything else</p>
            <h2 className="display-lg font-display mb-5">
              The rest, in full.
            </h2>
            <p className="prose-editorial text-granite/85">
              Power carts, cart storage for members, range passes, and lockers. Listed
              here so you don't have to ask.
            </p>
          </div>

          <div className="grid gap-14 md:grid-cols-2">
            <RateList title="Power cart" items={CART_FEES} />
            <RateList title="Range pass" items={RANGE_PASS} note="Range access is a member benefit. Single-day range use is included with lessons." />
            <RateList title="Lockers" items={LOCKERS} />
            <RateList title="Green fees, full list" items={GREEN_FEES} />
          </div>
        </div>
      </section>

      {/* Transparency block, the Kootenay-honest callouts. */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow mb-5">Transparency</p>
            <h2 className="display-md font-display mb-5">
              A few things worth saying plainly.
            </h2>
          </div>
          <ul className="grid md:grid-cols-3 gap-8">
            {TRANSPARENCY_NOTES.map((n) => (
              <li key={n.title} className="border-l-2 border-tamarack pl-5">
                <p className="font-display text-xl text-granite mb-2">{n.title}</p>
                <p className="text-silt text-sm leading-relaxed">{n.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-[var(--spacing-section)] bg-cedar text-paper">
        <div className="container-edge text-center max-w-3xl mx-auto">
          <p className="eyebrow text-paper/60 mb-6">Ready when you are</p>
          <h2
            className="font-display mb-8"
            style={{ fontSize: "clamp(2.25rem, 6vw, 4rem)", lineHeight: "1.02", letterSpacing: "-0.02em" }}
          >
            Pick a tee time.<br />We'll see you at the first.
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-5">
            <BookButton />
            <Link
              href="/membership"
              className="btn-ghost text-paper border-paper/70 hover:text-tamarack hover:border-tamarack"
            >
              See memberships instead
            </Link>
          </div>
          <p className="mt-10 font-mono text-xs text-paper/60 leading-relaxed">
            Pro Shop 9 am – 7 pm · 7 days · 250-693-2255
          </p>
        </div>
      </section>
    </>
  );
}
