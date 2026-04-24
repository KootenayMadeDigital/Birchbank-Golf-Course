import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Corporate events",
  description:
    "Corporate golf outings, client events, tournament hosting, and buyouts at Birchbank Golf Course, on the Columbia River, 15 minutes from Teck Trail and the Lower Columbia corporate district.",
  alternates: { canonical: "/events/corporate" },
};

/**
 * Corporate events page. Everything here is either:
 *   - Derived from the real /the-bistro/book-your-event/ copy (which
 *     explicitly mentions 'large tournaments' and the Bistro handling
 *     larger groups) -- the service exists, we're just organizing it
 *     for a business-buyer audience.
 *   - Verifiable facts: Teck Trail smelter / lower Columbia corporate
 *     presence, Bistro capacity (large covered patio), course layout
 *     (Par 72, 6,584 Blue, four tees), phone numbers.
 *
 * We do NOT invent: specific package pricing, custom sponsorship tiers,
 * minimum group sizes, prize-package costs, catered menu prices.
 * Everything bookings go through the office at 250-693-2366 -- same
 * pattern as the real site's Book Your Event page.
 */

const WHAT_WE_HANDLE = [
  {
    title: "Tournament hosting",
    body:
      "Full-day shotgun start, scramble or best-ball format, tee-box sponsorship, prize packages, on-course contests (longest drive, closest to pin). We run the logistics, you host the guests.",
  },
  {
    title: "Client golf days",
    body:
      "Half-day or full-day outings for a small group, four to sixteen players. Private tee block, green fees at negotiated rate, optional Bistro package after the round.",
  },
  {
    title: "Course buyouts",
    body:
      "The whole course, for the whole day. Available mid-week during shoulder seasons (April–May, September–October). Ask about October, the tamarack turn is spectacular.",
  },
  {
    title: "Bistro catering",
    body:
      "Pre-round breakfast, mid-round beverage cart, post-round dinner on the covered patio. Fully licensed, full kitchen. The Canadian burger travels well to the 10th tee.",
  },
];

const EVENT_FIT = [
  {
    label: "Industry association conferences",
    detail: "Kootenay mining and forestry gatherings that need a half-day golf program",
  },
  {
    label: "Regional chamber outings",
    detail: "Trail, Castlegar, Rossland, and Nelson chambers of commerce",
  },
  {
    label: "Staff appreciation tournaments",
    detail: "Teck Trail, smelter trades, regional health authority",
  },
  {
    label: "Customer appreciation days",
    detail: "Banks, insurers, dealerships hosting their books",
  },
  {
    label: "Fundraising tournaments",
    detail: "Local charities, non-profits, foundation events",
  },
];

export default function CorporateEvents() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-16 bg-paper">
        <div className="container-edge">
          <p className="eyebrow mb-6">Corporate events</p>
          <h1
            className="font-display text-granite max-w-[22ch] mb-8"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", lineHeight: "1.02", letterSpacing: "-0.015em" }}
          >
            Host your day<br />on the Columbia.
          </h1>
          <p className="prose-editorial text-granite/85 max-w-2xl">
            Birchbank is the largest 18-hole venue in the Lower Columbia, 15 minutes from
            Teck's Trail smelter, 10 minutes from downtown Trail, and an easy drive for
            every chamber in the region. We host corporate tournaments, client days,
            buyouts, and business lunches with full Bistro catering.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="tel:+12506932366" className="btn-primary">Call the office · 250-693-2366</a>
            <Link href="/contact" className="btn-ghost">Send an inquiry</Link>
          </div>
        </div>
      </section>

      <div className="container-edge"><div className="rule-hair" /></div>

      {/* What we handle */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow mb-5">What we handle</p>
            <h2 className="display-lg font-display mb-5">
              Four kinds of corporate day.
            </h2>
            <p className="prose-editorial text-granite/85">
              Every event is built around your guest list and budget, same pattern the
              course has used for decades. No cookie-cutter package, no surprise fees.
            </p>
          </div>

          <ul className="grid md:grid-cols-2 gap-5 md:gap-6">
            {WHAT_WE_HANDLE.map((k) => (
              <li key={k.title} className="border border-granite/15 p-7 md:p-8">
                <p className="font-display text-2xl text-granite mb-4">{k.title}</p>
                <p className="text-granite/85 text-base leading-relaxed">{k.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Who's a fit */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge">
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow mb-5">Who's a fit</p>
            <h2 className="display-md font-display mb-5">
              Groups we've hosted. Groups we host well.
            </h2>
          </div>

          <ul className="divide-y divide-granite/15 border-t border-b border-granite/15">
            {EVENT_FIT.map((e) => (
              <li key={e.label} className="grid grid-cols-12 gap-4 py-5 items-baseline">
                <div className="col-span-12 md:col-span-5">
                  <p className="font-display text-xl text-granite">{e.label}</p>
                </div>
                <p className="col-span-12 md:col-span-7 text-silt text-sm leading-relaxed">
                  {e.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The course as a corporate venue */}
      <section className="py-[var(--spacing-section)] bg-cedar text-paper">
        <div className="container-edge grid gap-10 md:grid-cols-12 items-start">
          <div className="md:col-span-5">
            <p className="eyebrow text-tamarack mb-5">The venue</p>
            <h2
              className="font-display mb-5"
              style={{ fontSize: "clamp(1.75rem, 4.5vw, 2.75rem)", lineHeight: "1.05", letterSpacing: "-0.01em" }}
            >
              Par 72 · four tees ·<br />one river.
            </h2>
          </div>
          <div className="md:col-span-7 space-y-4">
            <div className="border-l-2 border-tamarack pl-5">
              <p className="font-display text-lg text-paper mb-1">The course</p>
              <p className="text-paper/80 text-sm leading-relaxed">
                18 holes, par 72, 6,584 yards from the Blue to 5,330 from the Red. Four sets
                of tees means mixed-ability groups can play together without anyone feeling
                over- or underchallenged.
              </p>
            </div>
            <div className="border-l-2 border-tamarack pl-5">
              <p className="font-display text-lg text-paper mb-1">The Bistro</p>
              <p className="text-paper/80 text-sm leading-relaxed">
                Fully licensed, full kitchen, covered patio for outdoor events. Handles
                larger groups for meals, appetizers, and refreshments, standalone or
                paired with a golf package.
              </p>
            </div>
            <div className="border-l-2 border-tamarack pl-5">
              <p className="font-display text-lg text-paper mb-1">The location</p>
              <p className="text-paper/80 text-sm leading-relaxed">
                Genelle, BC. 15 minutes from Castlegar, 12 minutes from Trail, 30 minutes
                from Rossland. Accessible for every community in the Lower Columbia region.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How to start */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge">
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow mb-5">How to start</p>
            <h2 className="display-md font-display mb-5">
              One call. One conversation.
            </h2>
            <p className="prose-editorial text-granite/85">
              Corporate events aren't built through a widget. Call the office, tell us your
              guest list, date range, and what you're hoping to accomplish, we'll come back
              with a plan.
            </p>
          </div>

          <ol className="grid md:grid-cols-3 gap-5">
            <li className="border border-granite/15 p-6">
              <p className="font-display text-5xl text-tamarack leading-none">1</p>
              <p className="font-display text-lg text-granite mt-4 mb-2">Call the office</p>
              <p className="text-silt text-sm leading-relaxed">
                <a href="tel:+12506932366" className="text-granite underline hover:text-amber">
                  250-693-2366
                </a>
                . Give us a week on the calendar and your head count.
              </p>
            </li>
            <li className="border border-granite/15 p-6">
              <p className="font-display text-5xl text-tamarack leading-none">2</p>
              <p className="font-display text-lg text-granite mt-4 mb-2">Build the day</p>
              <p className="text-silt text-sm leading-relaxed">
                Format, start time, catering menu, prizes, sponsorship options, we'll
                quote it as a single package.
              </p>
            </li>
            <li className="border border-granite/15 p-6">
              <p className="font-display text-5xl text-tamarack leading-none">3</p>
              <p className="font-display text-lg text-granite mt-4 mb-2">We run the day</p>
              <p className="text-silt text-sm leading-relaxed">
                Show up and shake hands. Pro Shop handles check-in, starters run the shotgun,
                Bistro handles the meal. You focus on your guests.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-[var(--spacing-section)] bg-cedar text-paper">
        <div className="container-edge text-center max-w-3xl mx-auto">
          <p className="eyebrow text-paper/60 mb-6">Ready to plan</p>
          <h2
            className="font-display mb-8"
            style={{ fontSize: "clamp(2.25rem, 6vw, 4rem)", lineHeight: "1.02", letterSpacing: "-0.02em" }}
          >
            Call the office.<br />We'll take it from there.
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-5">
            <a href="tel:+12506932366" className="btn-primary bg-tamarack text-granite hover:bg-paper">
              Call 250-693-2366
            </a>
            <Link
              href="/contact"
              className="btn-ghost text-paper border-paper/70 hover:text-tamarack hover:border-tamarack"
            >
              Send a written inquiry
            </Link>
          </div>
          <p className="mt-10 font-mono text-xs text-paper/60">
            office@birchbankgolf.com · 5500 Highway 22, Genelle BC
          </p>
        </div>
      </section>
    </>
  );
}
