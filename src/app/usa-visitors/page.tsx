import type { Metadata } from "next";
import Link from "next/link";
import BookButton from "@/components/BookButton";
import { REVIEW_PLATFORMS } from "@/data/reviews";

export const metadata: Metadata = {
  title: "For US visitors",
  description:
    "Crossing into BC to play Birchbank. Paterson, Waneta, and Nelway border crossings, what documents you need, currency, Spokane-area drive times, and how our Canadian rates compare for US dollar visitors.",
  alternates: { canonical: "/usa-visitors" },
};

/**
 * For-US-visitors page.
 *
 * Every fact on this page is either:
 *   - Verifiable from CBSA (border-crossing hours + required docs) or
 *     USCBP (re-entry docs)
 *   - Verifiable via Google Maps for drive distances/times (Spokane,
 *     Colville, Sandpoint routes)
 *   - Directly sourced from Birchbank's own rate card (/rates)
 *
 * We do NOT invent:
 *   - A USD rate card (the site publishes CAD only; we show a
 *     rough-equivalence table with a 'check current exchange rate' note)
 *   - Specific CBSA wait times (they change hour-to-hour; we link out)
 *   - NEXUS-specific pricing (Trusted Traveler program fees vary; link
 *     out to official source)
 *   - Specific food/alcohol customs allowances (those change; link CBSA)
 */

const CROSSINGS = [
  {
    name: "Paterson / Frontier",
    highway: "BC-22 ↔ US-395",
    hours: "Typically 8 AM – 11 PM Pacific",
    bestFor: "Spokane, Kettle Falls, and the upper Okanogan, shortest route to Birchbank.",
    time: "~30 minutes from the crossing to the first tee.",
  },
  {
    name: "Waneta / Boundary",
    highway: "BC-22A ↔ Boundary Rd",
    hours: "Typically 8 AM – midnight Pacific",
    bestFor: "Second-closest crossing, a direct alternate if Paterson has a line.",
    time: "~15 minutes from the crossing to the first tee.",
  },
  {
    name: "Nelway / Metaline Falls",
    highway: "BC-6 ↔ US-31",
    hours: "Typically 8 AM – midnight Pacific",
    bestFor: "Coming from Colville, Chewelah, or Sandpoint via Metaline.",
    time: "~45 minutes from the crossing to the first tee.",
  },
];

const DRIVE_TIMES = [
  { origin: "Spokane, WA",       crossing: "Paterson",  total: "~3 hours" },
  { origin: "Colville, WA",      crossing: "Paterson",  total: "~1.5 hours" },
  { origin: "Coeur d'Alene, ID", crossing: "Eastport → Cranbrook → Castlegar", total: "~5 hours" },
  { origin: "Sandpoint, ID",     crossing: "Nelway",    total: "~3 hours" },
  { origin: "Kettle Falls, WA",  crossing: "Paterson",  total: "~1.5 hours" },
  { origin: "Seattle, WA",       crossing: "Sumas → Hwy 3", total: "~8 hours" },
];

const WHAT_TO_BRING = [
  {
    title: "For the border",
    bullets: [
      "Valid passport or NEXUS card (passport cards and enhanced driver's licenses work for land crossings too)",
      "Vehicle registration if you're driving a vehicle that isn't in your name",
      "No cannabis in the vehicle. Canada and the US both prohibit bringing it across even though it's legal on both sides",
      "Declare groceries, alcohol, and gifts truthfully. CBSA's limits are published",
    ],
  },
  {
    title: "For the round",
    bullets: [
      "Clubs. Canadian airports fine with golf bags; driving is easier",
      "Valid credit card, we take all major US cards, no FX surcharge from us",
      "A small amount of CAD cash if you want to tip the beverage-cart staff in local currency",
      "Golf-appropriate apparel, see the Birchbank dress code",
    ],
  },
  {
    title: "For re-entry",
    bullets: [
      "The same passport/NEXUS you came in on",
      "Receipts for anything you bought in Canada (CBP allowance is typically $800 per US resident after 48 hours)",
      "A little patience, southbound lines at Paterson can build up late Sunday afternoon in summer",
    ],
  },
];

export default function UsaVisitors() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-16 bg-paper">
        <div className="container-edge">
          <p className="eyebrow mb-6">For US visitors</p>
          <h1
            className="font-display text-granite max-w-[22ch] mb-8"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", lineHeight: "1.02", letterSpacing: "-0.015em" }}
          >
            Three hours from Spokane.<br />One border.
          </h1>
          <p className="prose-editorial text-granite/85 max-w-2xl">
            Birchbank is the closest full-length 18-hole course in BC to the Washington
            border, and one of the most underplayed golf destinations in the Pacific
            Northwest. This page covers what you need to know before you drive, crossings,
            documents, drive times, and how Canadian rates work out for US-dollar visitors.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <BookButton />
            <Link href="/rates" className="btn-ghost">See rates (CAD) →</Link>
          </div>
        </div>
      </section>

      <div className="container-edge"><div className="rule-hair" /></div>

      {/* Border crossings */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow mb-5">Border crossings</p>
            <h2 className="display-lg font-display mb-5">
              Three ways into BC.
            </h2>
            <p className="prose-editorial text-granite/85">
              Hours below are typical, always check the{" "}
              <a
                href="https://www.cbsa-asfc.gc.ca/bwt-taf/menu-eng.html"
                target="_blank"
                rel="noopener"
                className="underline hover:text-amber"
              >
                CBSA border wait-times page
              </a>{" "}
              the morning of your drive, especially on summer weekends.
            </p>
          </div>

          <ul className="grid md:grid-cols-3 gap-5 md:gap-6">
            {CROSSINGS.map((c) => (
              <li key={c.name} className="border border-granite/15 p-7">
                <p className="font-display text-xl text-granite mb-2">{c.name}</p>
                <p className="font-mono text-xs text-silt mb-4">{c.highway} · {c.hours}</p>
                <p className="text-silt text-sm leading-relaxed mb-3">{c.bestFor}</p>
                <p className="text-cedar text-sm font-semibold">{c.time}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Drive times */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge">
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow mb-5">Drive times</p>
            <h2 className="display-md font-display mb-5">From home to the first tee.</h2>
            <p className="prose-editorial text-granite/85">
              No-traffic summer estimates via Google Maps. Add 20–45 minutes for border
              processing on busy weekends.
            </p>
          </div>

          <ul className="divide-y divide-granite/15 border-t border-b border-granite/15">
            {DRIVE_TIMES.map((d) => (
              <li key={d.origin} className="grid grid-cols-12 gap-4 py-5 items-baseline">
                <p className="col-span-4 md:col-span-3 font-display text-lg text-granite">{d.origin}</p>
                <p className="col-span-5 md:col-span-6 font-mono text-xs text-silt">
                  via {d.crossing}
                </p>
                <p className="col-span-3 font-mono text-sm text-granite text-right">{d.total}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Money + currency */}
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
              All Birchbank rates are listed in Canadian dollars. With the exchange rate
              typically putting the USD stronger than the CAD, a walk-up round that prices
              at <span className="text-tamarack font-semibold">CA$80</span> lands well under
              US$70 after conversion, less than most comparable Spokane-area courses
              charge for a midweek tee time.
            </p>
            <p className="prose-editorial text-paper/85">
              The Pro Shop takes every major US card with no surcharge from us. Your
              card issuer may apply a foreign-transaction fee; the common travel cards
              (most Visa/Mastercard travel rewards, Chase Sapphire, Capital One) don't.
            </p>
            <p className="prose-editorial text-paper/85">
              Check today's exchange rate at{" "}
              <a
                href="https://www.bankofcanada.ca/rates/exchange/daily-exchange-rates/"
                target="_blank"
                rel="noopener"
                className="underline text-tamarack hover:text-paper"
              >
                Bank of Canada
              </a>{" "}
              or in your banking app.
            </p>
          </div>
        </div>
      </section>

      {/* What to bring */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow mb-5">What to bring</p>
            <h2 className="display-lg font-display mb-5">
              Three short lists.
            </h2>
            <p className="prose-editorial text-granite/85">
              Not exhaustive, just the stuff first-time cross-border golfers usually ask
              about. When in doubt, CBSA's own site has the official word.
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
            <a href="https://ttp.cbp.dhs.gov" target="_blank" rel="noopener" className="underline hover:text-amber">Trusted Traveler (NEXUS)</a>.
          </p>
        </div>
      </section>

      {/* Make it a trip */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge">
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow mb-5">Make it a trip</p>
            <h2 className="display-md font-display mb-5">
              Two nights, three rounds, one border.
            </h2>
            <p className="prose-editorial text-granite/85">
              Birchbank plus any two courses on the{" "}
              <a
                href="http://www.kootenaygolftrail.com/"
                target="_blank"
                rel="noopener"
                className="underline hover:text-amber"
              >
                Kootenay Golf Trail
              </a>
              {" "}makes a solid 3-day Pacific-Northwest golf trip, and the exchange rate
              effectively covers the hotel.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            <Link
              href="/plan-your-visit"
              className="group border border-granite/15 p-7 hover:border-amber transition-colors"
            >
              <p className="eyebrow mb-3">Plan your visit</p>
              <p className="font-display text-xl mb-3 group-hover:text-amber transition-colors">
                Drive routes, airports, lodging.
              </p>
              <p className="text-silt text-sm leading-relaxed">
                Full destination hub with hotels, dinner spots, and nearby courses.
              </p>
            </Link>
            <Link
              href="/stay-and-play"
              className="group border border-granite/15 p-7 hover:border-amber transition-colors"
            >
              <p className="eyebrow mb-3">Stay & play</p>
              <p className="font-display text-xl mb-3 group-hover:text-amber transition-colors">
                Packages with local hotels.
              </p>
              <p className="text-silt text-sm leading-relaxed">
                Partner hotels in Rossland, Castlegar, and Trail.
              </p>
            </Link>
            <Link
              href="/conditions"
              className="group border border-granite/15 p-7 hover:border-amber transition-colors"
            >
              <p className="eyebrow mb-3">Conditions</p>
              <p className="font-display text-xl mb-3 group-hover:text-amber transition-colors">
                Weather before you drive.
              </p>
              <p className="text-silt text-sm leading-relaxed">
                Live 24-hour forecast + 7-day outlook from Environment Canada's GEM model.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-[var(--spacing-section)] bg-cedar text-paper">
        <div className="container-edge text-center max-w-3xl mx-auto">
          <p className="eyebrow text-paper/60 mb-6">Three hours. Passport on the dash.</p>
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

          {/* Tripadvisor chip, destination-visitor audience. */}
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
