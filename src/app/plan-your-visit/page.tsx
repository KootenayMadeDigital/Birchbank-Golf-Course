import type { Metadata } from "next";
import Link from "next/link";
import BookButton from "@/components/BookButton";
import { REVIEW_PLATFORMS } from "@/data/reviews";

export const metadata: Metadata = {
  title: "Plan your visit",
  description:
    "How to get to Birchbank Golf Course in Genelle, BC, drive routes from Spokane, Kelowna, Calgary, and Vancouver; the four regional airports; and the Kootenay weather window.",
  alternates: { canonical: "/plan-your-visit" },
};

/**
 * Plan-your-visit page, scoped strictly to "how to get here."
 *
 * Distinct from its Visit-submenu siblings:
 *   /stay-and-play   → lodging + dinner + multi-course trips
 *   /usa-visitors    → border crossings, NEXUS, currency, USA drive times
 *   /dress-code      → course dress code
 *   /faq             → frequently asked
 *
 * Content kept here: drive routes (4 major origins), airports (4),
 * weather window + seasonal calendar. Cross-links down to the other
 * pages as natural next steps.
 *
 * Sourcing: highway numbers from Transport Canada / DriveBC; airport
 * info from each airport's own site; weather window per blueprint
 * seasonal-lines section.
 */

const DRIVE_ROUTES = [
  {
    city: "Spokane, WA",
    distance: "250 km",
    time: "~3 hours",
    route: "I-395 N → US-395 N → Paterson / Frontier border → BC-22 N",
    note: "Shortest + most popular route for WA golfers. Paterson border is smaller and faster than Eastport. Full cross-border detail on the For US visitors page.",
  },
  {
    city: "Kelowna, BC",
    distance: "290 km",
    time: "~3.5 hours",
    route: "BC-97 S → BC-33 E → BC-3 E → BC-22 S",
    note: "Through Rock Creek and Grand Forks. All-season route; watch Paulson Summit in winter.",
  },
  {
    city: "Calgary, AB",
    distance: "640 km",
    time: "~6.5 – 7.5 hours",
    route: "AB-22X → Crowsnest Pass (Hwy 3) → Creston → BC-3 W → BC-22",
    note: "A committed day on the road. Many golfers break the trip in Fernie or Cranbrook, good courses in both.",
  },
  {
    city: "Vancouver, BC",
    distance: "630 km",
    time: "~7 hours",
    route: "TransCanada (Hwy 1) → Hwy 3 E → Castlegar → BC-22",
    note: "Gorgeous drive but long. Hope → Princeton → Osoyoos → Grand Forks. Overnight in Osoyoos or Grand Forks breaks it nicely.",
  },
];

const AIRPORTS = [
  {
    code: "YCG",
    name: "West Kootenay Regional (Castlegar)",
    distance: "13 km · 15 min",
    notes: "Closest airport. Air Canada service from Vancouver (YVR) and Calgary (YYC). Car rental on-site.",
  },
  {
    code: "GEG",
    name: "Spokane International",
    distance: "260 km · ~3 hours",
    notes: "Best option for US visitors. Many daily flights, full-service rental counters, cross at Paterson.",
  },
  {
    code: "YLW",
    name: "Kelowna International",
    distance: "290 km · ~3.5 hours",
    notes: "If you're flying from eastern Canada or Vancouver. More daily flights than YCG.",
  },
  {
    code: "YXC",
    name: "Canadian Rockies International (Cranbrook)",
    distance: "250 km · ~3 hours",
    notes: "Alternative for trips routing through the Rockies. Calgary-bound WestJet flights stop here.",
  },
];

const SEASONAL = [
  { window: "April – May",   detail: "Opening weeks, firm fairways, lowest rates" },
  { window: "June – August", detail: "Peak season, long days, Bistro patio runs late" },
  { window: "July – August", detail: "Beat the Heat promo after 1 PM (non-Wed)" },
  { window: "September – October", detail: "Cooler, quieter, fall colour on the 14th fairway" },
  { window: "November – March",    detail: "Closed for the season" },
];

export default function PlanYourVisit() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-16 bg-paper">
        <div className="container-edge">
          <p className="eyebrow mb-6">Plan your visit</p>
          <h1
            className="font-display text-granite max-w-[22ch] mb-8"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", lineHeight: "1.02", letterSpacing: "-0.015em" }}
          >
            Three hours from Spokane.<br />Seven from Calgary.<br />Worth the drive.
          </h1>
          <p className="prose-editorial text-granite/85 max-w-2xl">
            Birchbank sits on the west bank of the Columbia River in Genelle, BC, 15 minutes
            from Castlegar, 12 minutes from Trail. This page covers the logistics of getting
            here. For where to stay, see{" "}
            <Link href="/stay-and-play" className="underline hover:text-amber">Stay &amp; play</Link>;
            for cross-border specifics see{" "}
            <Link href="/usa-visitors" className="underline hover:text-amber">For US visitors</Link>.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <BookButton />
            <a href="#drive-routes" className="btn-ghost">Drive routes →</a>
          </div>
        </div>
      </section>

      <div className="container-edge"><div className="rule-hair" /></div>

      {/* Drive routes */}
      <section id="drive-routes" className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow mb-5">By road</p>
            <h2 className="display-lg font-display mb-5">
              Four ways in.
            </h2>
            <p className="prose-editorial text-granite/85">
              Drive times below are summer / no-traffic estimates. Winter pass closures on Hwy 3
              (Paulson and Crowsnest) can add an hour. Always check{" "}
              <a href="https://www.drivebc.ca" target="_blank" rel="noopener" className="underline hover:text-amber">
                DriveBC
              </a>{" "}
              before a long haul.
            </p>
          </div>

          <ul className="grid md:grid-cols-2 gap-5 md:gap-6">
            {DRIVE_ROUTES.map((r) => (
              <li
                key={r.city}
                className="border border-granite/12 p-6 md:p-7 bg-paper hover:border-amber transition-colors"
              >
                <div className="flex items-baseline justify-between mb-2">
                  <p className="font-display text-2xl text-granite">{r.city}</p>
                  <p className="font-mono text-xs text-silt">{r.distance} · {r.time}</p>
                </div>
                <p className="font-mono text-xs text-silt mt-3 mb-3 tracking-tight leading-relaxed">
                  {r.route}
                </p>
                <p className="text-silt text-sm leading-relaxed">{r.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="container-edge"><div className="rule-hair" /></div>

      {/* Airports */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow mb-5">By air</p>
            <h2 className="display-lg font-display mb-5">
              Four airports, four routes in.
            </h2>
            <p className="prose-editorial text-granite/85">
              YCG is closest; GEG is best for US visitors. Car rental at all four.
            </p>
          </div>

          <ul className="divide-y divide-granite/15 border-t border-b border-granite/15">
            {AIRPORTS.map((a) => (
              <li key={a.code} className="grid grid-cols-12 gap-4 py-6 items-baseline">
                <span className="col-span-3 md:col-span-2 font-display text-2xl md:text-3xl text-granite">
                  {a.code}
                </span>
                <div className="col-span-9 md:col-span-7">
                  <p className="font-display text-lg text-granite">{a.name}</p>
                  <p className="text-silt text-sm mt-1">{a.notes}</p>
                </div>
                <span className="hidden md:block md:col-span-3 font-mono text-sm text-silt text-right">
                  {a.distance}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Cross-border callout, routes to the dedicated /usa-visitors page. */}
      <section className="py-[var(--spacing-section)] bg-cedar text-paper">
        <div className="container-edge grid gap-8 md:grid-cols-12 items-center">
          <div className="md:col-span-8">
            <p className="eyebrow text-tamarack mb-4">Coming from the US?</p>
            <h2
              className="font-display mb-3"
              style={{ fontSize: "clamp(1.75rem, 4.5vw, 2.75rem)", lineHeight: "1.05", letterSpacing: "-0.01em" }}
            >
              Three border crossings · passport details · USD rates.
            </h2>
            <p className="prose-editorial text-paper/85 max-w-xl">
              We keep all the cross-border specifics. Paterson / Frontier, Waneta / Boundary,
              Nelway / Metaline Falls, NEXUS, what to bring, CAD versus USD, on one
              dedicated page.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link
              href="/usa-visitors"
              className="btn-primary bg-tamarack text-granite hover:bg-paper"
            >
              For US visitors →
            </Link>
          </div>
        </div>
      </section>

      {/* Weather window */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge grid gap-10 md:grid-cols-12 items-center">
          <div className="md:col-span-7">
            <p className="eyebrow mb-5">When to come</p>
            <h2 className="display-lg font-display mb-5">
              June 15 – September 15.
            </h2>
            <p className="prose-editorial text-granite/85 max-w-xl">
              The Kootenay summer is warm, dry, and long. Shoulder seasons. April to early June,
              mid-September to October, play firmer, cooler, cheaper, and less crowded. October
              is the best month for colour; the tamaracks along the river go gold for about three
              weeks mid-month.
            </p>
            <p className="mt-6">
              <Link href="/conditions" className="btn-ghost">
                See today's conditions →
              </Link>
            </p>
          </div>
          <div className="md:col-span-5">
            <ul className="font-mono text-sm text-silt space-y-3 border-l-2 border-tamarack pl-5">
              {SEASONAL.map((s) => (
                <li key={s.window}>
                  <span className="text-granite">{s.window}:</span> {s.detail}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Next steps, the three sibling pages */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge">
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow mb-5">Next</p>
            <h2 className="display-md font-display mb-5">
              You know how to get here. Now what?
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            <Link
              href="/stay-and-play"
              className="group border border-granite/15 p-7 hover:border-amber transition-colors"
            >
              <p className="eyebrow mb-3">Stay &amp; play</p>
              <p className="font-display text-xl mb-3 group-hover:text-amber transition-colors">
                Hotels, dinner, more golf.
              </p>
              <p className="text-silt text-sm leading-relaxed">
                Lodging partners, after-round dining, and the Kootenay Golf Trail for
                multi-day trips.
              </p>
            </Link>
            <Link
              href="/usa-visitors"
              className="group border border-granite/15 p-7 hover:border-amber transition-colors"
            >
              <p className="eyebrow mb-3">For US visitors</p>
              <p className="font-display text-xl mb-3 group-hover:text-amber transition-colors">
                Border, NEXUS, currency.
              </p>
              <p className="text-silt text-sm leading-relaxed">
                Three crossings, documents, and how CAD rates play for US-dollar visitors.
              </p>
            </Link>
            <Link
              href="/dress-code"
              className="group border border-granite/15 p-7 hover:border-amber transition-colors"
            >
              <p className="eyebrow mb-3">Dress code</p>
              <p className="font-display text-xl mb-3 group-hover:text-amber transition-colors">
                What to wear.
              </p>
              <p className="text-silt text-sm leading-relaxed">
                Soft-soled shoes, collared shirts, no metal spikes. Full rules for
                ladies / men / footwear.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-[var(--spacing-section)] bg-cedar text-paper">
        <div className="container-edge text-center max-w-3xl mx-auto">
          <p className="eyebrow text-paper/60 mb-6">Ready when you are</p>
          <h2
            className="font-display mb-8"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", lineHeight: "0.98", letterSpacing: "-0.02em" }}
          >
            Pick a day. Book a time.<br />The river will be here.
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
