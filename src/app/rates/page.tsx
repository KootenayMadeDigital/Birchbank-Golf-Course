import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import BookButton from "@/components/BookButton";
import {
  GREEN_FEES,
  PROMOTIONS,
  CART_FEES,
  RANGE_PASS,
  LOCKERS,
} from "@/data/rates";

export const metadata: Metadata = {
  title: "Rates",
  description:
    "Green fees, cart rates, twilight pricing, Beat the Heat, and punch passes at Birchbank Golf Course. All prices CAD, verified April 2026.",
  alternates: { canonical: "/rates" },
};

/**
 * Rates page, rebuilt for conversion.
 *
 * Every price on this page pulls from src/data/rates.ts (the single
 * source of truth, verified April 2026 CAD). Every primary CTA fires
 * the Chronogolf widget via <BookButton>, exactly the same mechanism
 * used on every other page.
 *
 * Structure follows the approved rates-conversion plan:
 *   1. Hero, editorial split (price anchor left, course photo right)
 *   2. Summary strip, four prices at a glance
 *   3. Green fees, full breakdown with what's included
 *   4. Beat the Heat, cedar-block promo
 *   5. Punch passes, show-the-math
 *   6. Add-ons, power cart + range pass + lockers
 *   7. Membership bridge card (links to /membership, does not re-list tiers)
 *   8. Fine print (taxes, weather, groups)
 *   9. Final CTA, cedar
 */

// Derived show-the-math figures for punch passes. Walk-up anchors are
// the canonical green-fee rates from rates.ts (18-hole $80, 9-hole $45).
const punch18 = { perRound: 68, savings: 12, breakEvenRound: 4 }; // $340 / 5
const punch9  = { perRound: 38, savings: 7,  breakEvenRound: 4 }; // $190 / 5

const SUMMARY_CARDS = [
  { price: "$80", eyebrow: "Day rate",     detail: "18 holes, walking, before 1 PM" },
  { price: "$45", eyebrow: "Twilight",     detail: "After 3 PM, most-booked rate" },
  { price: "$70", eyebrow: "Beat the Heat", detail: "18 + half cart, Jul to Aug, not Wed" },
  { price: "$24", eyebrow: "Power cart",   detail: "Per rider, 18 holes, tax included" },
];

const GREEN_FEE_CARDS = [
  {
    eyebrow: "Day rate, walking",
    price: "$80",
    period: "Before 1 PM",
    includes: "18 holes · walking · full course access",
    tone: "default" as const,
  },
  {
    eyebrow: "Nine holes",
    price: "$45",
    period: "Any time",
    includes: "9 holes · walking · front or back, check with the Pro Shop",
    tone: "default" as const,
  },
  {
    eyebrow: "Twilight after 1 PM",
    price: "$55",
    period: "1 PM to 3 PM window",
    includes: "18 holes · walking · plenty of light left in June and July",
    tone: "default" as const,
  },
  {
    eyebrow: "Twilight after 3 PM",
    price: "$45",
    period: "3 PM until dusk",
    includes: "18 holes · walking · the most-booked rate on the card",
    tone: "amber" as const,
  },
];

const FINE_PRINT = [
  {
    title: "Taxes",
    body:
      "Power cart rates are per rider, tax included. Green fees add GST at the counter unless the receipt states otherwise.",
  },
  {
    title: "Weather",
    body:
      "Rain checks are issued at Pro Shop discretion for weather calls mid-round. Frost delays are posted before the first tee on the Conditions page.",
  },
  {
    title: "Groups and tournaments",
    body:
      "Parties of 8 or more and tournament pricing are quoted directly by the office. Call 250-693-2366 and we'll put together a sheet.",
  },
];

export default function RatesPage() {
  return (
    <>
      {/* 1. HERO, editorial split */}
      <section className="pt-28 md:pt-32 pb-[var(--spacing-section)] bg-paper">
        <div className="container-edge">
          <div className="grid gap-10 md:gap-14 md:grid-cols-12 items-center">
            <div className="md:col-span-7 md:order-1 order-2">
              <p className="eyebrow text-cedar mb-6">Rates · 2026</p>
              <h1
                className="font-display text-granite mb-7"
                style={{
                  fontSize: "clamp(2.25rem, 6vw, 5rem)",
                  lineHeight: "1.02",
                  letterSpacing: "-0.018em",
                }}
              >
                Eighty dollars.<br />
                Walking the Columbia.
              </h1>
              <p className="prose-editorial text-granite/85 mb-8 max-w-xl">
                A full eighteen, all day until 1 PM. After 3 PM, it drops to
                forty-five. A power cart is twenty-four per rider if you want
                one. No surcharges, no dynamic pricing, no games.
              </p>

              <div className="flex flex-wrap gap-3 mb-6">
                <BookButton />
                <a href="tel:+12506932255" className="btn-ghost">
                  Call 250-693-2255
                </a>
              </div>

              <p className="font-mono text-xs text-silt uppercase tracking-widest">
                Pro Shop · 8 AM to dusk · 7 days · April 1 to October 31
              </p>
            </div>

            <figure className="md:col-span-5 md:order-2 order-1">
              {/* Natural ~16:10 of the source ball-on-tee shot. The
                  Birchbank wooden sign + mountain backdrop is the
                  literal "ready-to-play" anchor for the $80 price
                  the headline leads with. */}
              <div className="relative aspect-[16/10] bg-granite/5 overflow-hidden">
                <Image
                  src="/visit/ball-on-tee.webp"
                  alt="A Callaway ball on a red tee at Birchbank, the wooden Birchbank Golf Club sign in the middle distance and the mountains beyond"
                  fill
                  sizes="(max-width: 768px) 100vw, 42vw"
                  priority
                  className="object-cover"
                  unoptimized
                />
              </div>
              <figcaption className="mt-3 font-mono text-xs uppercase tracking-widest text-silt">
                The first tee · ready to play
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <div className="container-edge"><div className="rule-hair" /></div>

      {/* 2. SUMMARY STRIP, four prices at a glance */}
      <section className="py-16 md:py-20 bg-paper">
        <div className="container-edge">
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {SUMMARY_CARDS.map((c) => (
              <li
                key={c.eyebrow}
                className="border border-granite/15 bg-paper p-6"
              >
                <p
                  className="font-display text-granite tabular-nums leading-none"
                  style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
                >
                  {c.price}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-tamarack mt-3">
                  {c.eyebrow}
                </p>
                <p className="text-granite/75 text-xs mt-2 leading-relaxed">
                  {c.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. GREEN FEES, full breakdown */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow text-cedar mb-3">Green fees</p>
            <h2 className="display-lg font-display mb-5">
              Four ways to play eighteen.
            </h2>
            <p className="prose-editorial text-granite/85">
              Every green fee on the card, with the time window and what it
              includes. The reciprocal rate for members of participating
              clubs is 25% off rack; bring your card to the Pro Shop.
            </p>
          </div>

          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {GREEN_FEE_CARDS.map((c) => (
              <li
                key={c.eyebrow}
                className={
                  "p-7 relative " +
                  (c.tone === "amber"
                    ? "border border-amber/40 bg-amber/5"
                    : "border border-granite/15 bg-paper")
                }
              >
                {c.tone === "amber" && (
                  <span className="absolute -top-3 left-6 bg-amber text-paper font-mono text-[10px] uppercase tracking-widest px-2 py-0.5">
                    Most booked
                  </span>
                )}
                <p className={"eyebrow mb-3 " + (c.tone === "amber" ? "text-amber" : "")}>
                  {c.eyebrow}
                </p>
                <p className="font-display text-5xl text-granite tabular-nums leading-none">
                  {c.price}
                </p>
                <p className="font-mono text-xs text-silt uppercase tracking-widest mt-4">
                  {c.period}
                </p>
                <p className="text-granite/75 text-sm mt-3 leading-relaxed">
                  {c.includes}
                </p>
              </li>
            ))}
          </ul>

          <p className="mt-10 font-mono text-xs text-silt max-w-2xl leading-relaxed">
            Approximate US$: $80 CA ≈ $58 US at current rates. See the{" "}
            <Link href="/usa-visitors" className="underline hover:text-amber">
              USA visitors primer
            </Link>{" "}
            for the Paterson crossing and the border essentials.
          </p>
        </div>
      </section>

      {/* 4. BEAT THE HEAT, cedar block */}
      <section className="py-[var(--spacing-section)] bg-cedar text-paper">
        <div className="container-edge grid gap-10 md:grid-cols-12 items-center">
          <div className="md:col-span-7">
            <p className="eyebrow text-tamarack mb-5">
              {PROMOTIONS[0].window}
            </p>
            <h2
              className="font-display mb-6"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.25rem)",
                lineHeight: "1.05",
                letterSpacing: "-0.01em",
              }}
            >
              {PROMOTIONS[0].price}. Eighteen holes and half a cart.
            </h2>
            <p className="prose-editorial text-paper/85 max-w-xl">
              When the mercury climbs, we climb with it. Beat the Heat runs
              every day of July and August except Wednesdays, after 1 PM.
              Day rate, cart included for one side. The Columbia does the
              rest.
            </p>
          </div>
          <div className="md:col-span-5 md:text-right">
            <p
              className="font-display text-paper tabular-nums leading-none"
              style={{ fontSize: "clamp(4rem, 11vw, 7rem)" }}
            >
              {PROMOTIONS[0].price}
            </p>
            <p className="font-mono text-xs text-paper/60 mt-3">
              {PROMOTIONS[0].includes}
            </p>
            <div className="mt-7 flex justify-start md:justify-end">
              <BookButton label="Book a twilight tee time" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. PUNCH PASSES, show-the-math */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow text-cedar mb-3">Punch passes</p>
            <h2 className="display-lg font-display mb-5">
              Five rounds, fewer dollars.
            </h2>
            <p className="prose-editorial text-granite/85">
              For the regular. Good any time the course is open, shareable
              with family in the same household, no blackout dates. The
              math below is what the pack saves you versus paying per round
              at the walk-up rate.
            </p>
          </div>

          <ul className="grid md:grid-cols-2 gap-5 md:gap-6">
            <li className="border border-granite/15 p-7 md:p-8 bg-paper">
              <p className="eyebrow mb-3">Five rounds · 18 holes</p>
              <p
                className="font-display text-granite tabular-nums leading-none"
                style={{ fontSize: "clamp(2.75rem, 5vw, 4rem)" }}
              >
                $340
              </p>
              <p className="mt-5 font-display text-2xl text-granite leading-snug">
                ${punch18.perRound} per round.
              </p>
              <p className="mt-2 font-mono text-xs uppercase tracking-widest text-tamarack">
                ${punch18.savings} less than walk-up, every time
              </p>
              <p className="mt-5 text-granite/75 text-sm leading-relaxed">
                Breaks even at round {punch18.breakEvenRound} versus paying
                the $80 day rate. Use the fifth round whenever you want, it
                never expires inside the season.
              </p>
            </li>
            <li className="border border-granite/15 p-7 md:p-8 bg-paper">
              <p className="eyebrow mb-3">Five rounds · 9 holes</p>
              <p
                className="font-display text-granite tabular-nums leading-none"
                style={{ fontSize: "clamp(2.75rem, 5vw, 4rem)" }}
              >
                $190
              </p>
              <p className="mt-5 font-display text-2xl text-granite leading-snug">
                ${punch9.perRound} per round.
              </p>
              <p className="mt-2 font-mono text-xs uppercase tracking-widest text-tamarack">
                ${punch9.savings} less than walk-up, every time
              </p>
              <p className="mt-5 text-granite/75 text-sm leading-relaxed">
                Built for the after-work nine. Breaks even at round{" "}
                {punch9.breakEvenRound} versus the $45 walk-up. Same
                household can share a pass.
              </p>
            </li>
          </ul>
        </div>
      </section>

      {/* 6. ADD-ONS, power cart + range + lockers */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow text-cedar mb-3">The extras</p>
            <h2 className="display-md font-display mb-5">
              Cart, range, locker.
            </h2>
            <p className="prose-editorial text-granite/85">
              Prices you might not remember on the drive up, listed here so
              you don&apos;t have to ask at the counter. Cart rates include
              tax.
            </p>
          </div>

          <div className="grid gap-12 md:gap-10 md:grid-cols-3">
            <RateList title="Power cart" items={CART_FEES} />
            <RateList
              title="Range pass"
              items={RANGE_PASS}
              note="Range access is a member benefit. Single-day range use is included with lessons."
            />
            <RateList title="Lockers" items={LOCKERS} />
          </div>
        </div>
      </section>

      {/* 7. MEMBERSHIP BRIDGE, amber card */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge">
          <div className="border border-amber/40 bg-amber/5 p-7 md:p-10 grid gap-6 md:grid-cols-12 items-center">
            <div className="md:col-span-8">
              <p className="eyebrow text-amber mb-3">Playing a lot?</p>
              <h2
                className="font-display text-granite mb-4"
                style={{
                  fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                  lineHeight: "1.08",
                  letterSpacing: "-0.012em",
                }}
              >
                Twenty-five rounds pays for the year.
              </h2>
              <p className="prose-editorial text-granite/85 max-w-xl">
                A Single Full Play membership at $1,969 breaks even at the
                day rate after twenty-five rounds. Seven tiers in total,
                from Student at $640 to Family at $4,050. 2025 Early Bird
                prices displayed; 2026 confirmed by the Pro Shop.
              </p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <Link href="/membership" className="btn-primary inline-flex">
                See the seven tiers
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FINE PRINT, tamarack left borders */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow text-cedar mb-3">A few plain words</p>
            <h2 className="display-md font-display mb-5">
              The fine print, up front.
            </h2>
          </div>
          <ul className="grid gap-8 md:grid-cols-3">
            {FINE_PRINT.map((n) => (
              <li
                key={n.title}
                className="border-l-2 border-tamarack pl-5"
              >
                <p className="font-display text-xl text-granite mb-2 leading-tight">
                  {n.title}
                </p>
                <p className="text-granite/80 text-sm leading-relaxed">
                  {n.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 9. FINAL CTA, cedar */}
      <section className="py-[var(--spacing-section)] bg-cedar text-paper">
        <div className="container-edge text-center max-w-3xl mx-auto">
          <p className="eyebrow text-paper/60 mb-6">Ready when you are</p>
          <h2
            className="font-display mb-8"
            style={{
              fontSize: "clamp(2.25rem, 6vw, 4rem)",
              lineHeight: "1.02",
              letterSpacing: "-0.02em",
            }}
          >
            First tee at nine.<br />Book online or call.
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-5">
            <BookButton />
            <a
              href="tel:+12506932255"
              className="btn-ghost text-paper border-paper/70 hover:text-tamarack hover:border-tamarack"
            >
              Call 250-693-2255
            </a>
          </div>
          <p className="mt-10 font-mono text-xs text-paper/60 leading-relaxed">
            Pro Shop 8 am to dusk · 7 days · April 1 to October 31
          </p>
        </div>
      </section>
    </>
  );
}

function RateList({
  title,
  items,
  note,
}: {
  title: string;
  items: { label: string; amount: string; note?: string }[];
  note?: string;
}) {
  return (
    <div>
      <p className="eyebrow mb-4">{title}</p>
      <ul className="border-t border-granite/15">
        {items.map((r) => (
          <li
            key={r.label}
            className="flex items-baseline justify-between gap-6 py-4 border-b border-granite/10"
          >
            <span className="font-sans text-base text-granite">
              {r.label}
              {r.note && (
                <span className="block text-xs text-silt mt-1">{r.note}</span>
              )}
            </span>
            <span className="font-mono text-sm text-granite whitespace-nowrap tabular-nums">
              {r.amount}
            </span>
          </li>
        ))}
      </ul>
      {note && (
        <p className="mt-4 text-xs text-silt leading-relaxed">{note}</p>
      )}
    </div>
  );
}
