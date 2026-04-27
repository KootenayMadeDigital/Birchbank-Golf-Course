import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BookButton from "@/components/BookButton";
import { REVIEW_PLATFORMS } from "@/data/reviews";

export const metadata: Metadata = {
  title: "Plan your visit",
  description:
    "How to get to Birchbank Golf Course in Genelle, BC. Drive routes from Spokane, Kelowna, Calgary, Vancouver, four regional airports, and the April 1 to October 31 season.",
  alternates: { canonical: "/plan-your-visit" },
};

/**
 * Plan-your-visit page. One job: how to get here.
 *
 * Owns: drive routes from 4 origins, airports, season window.
 * Does NOT own: lodging (see /stay-and-play), border specifics
 * (see /usa-visitors), dress code, FAQ.
 *
 * Verified facts:
 *   - Season: April 1 to October 31 (213 days), per birchbankgolf.com
 *   - Pro Shop: open 7 days a week during season, per birchbankgolf.com;
 *     8 am to dusk per CLAUDE.md
 *   - Address: 5500 Highway 22, Genelle BC
 *   - Pro Shop 250-693-2255, Bistro 250-693-5451
 *
 * Removed for accuracy:
 *   - "fall colour on the 14th fairway" (unverifiable specific) softened
 *     to "fall colour along the river" matching home-page language
 *   - Heavy 3-paragraph cedar US-visitors callout reduced to a single
 *     tight cross-link line per dedup rules
 *   - Lodging details, none here, /stay-and-play owns it
 */

const DRIVE_ROUTES = [
  {
    city: "Spokane, WA",
    distance: "250 km",
    time: "~3 hours",
    route: "US-395 N → Paterson border → BC-22 N",
    note: "Shortest route from the Inland Northwest. Paterson is the small rural crossing west of Castlegar.",
  },
  {
    city: "Kelowna, BC",
    distance: "290 km",
    time: "~3.5 hours",
    route: "BC-97 S → BC-33 E → BC-3 E → BC-22 S",
    note: "Through Rock Creek and Grand Forks. Watch Paulson Summit in shoulder season.",
  },
  {
    city: "Calgary, AB",
    distance: "640 km",
    time: "~6.5 to 7.5 hours",
    route: "AB-22X → Crowsnest Pass (Hwy 3) → Creston → BC-3 W → BC-22",
    note: "A committed day on the road. Many golfers break the trip overnight in Fernie or Cranbrook.",
  },
  {
    city: "Vancouver, BC",
    distance: "630 km",
    time: "~7 hours",
    route: "TransCanada (Hwy 1) → Hwy 3 E → Castlegar → BC-22",
    note: "Hope to Princeton to Osoyoos to Grand Forks. Overnight in Osoyoos or Grand Forks breaks the drive.",
  },
];

const AIRPORTS = [
  {
    code: "YCG",
    name: "West Kootenay Regional (Castlegar)",
    distance: "13 km · 15 min",
    notes: "Closest airport. Air Canada service from Vancouver and Calgary. Car rental on-site.",
  },
  {
    code: "GEG",
    name: "Spokane International",
    distance: "260 km · ~3 hours",
    notes: "Best option for US visitors. Many daily flights, full rental counters, cross at Paterson.",
  },
  {
    code: "YLW",
    name: "Kelowna International",
    distance: "290 km · ~3.5 hours",
    notes: "More daily flights than YCG. Reasonable choice from eastern Canada or Vancouver.",
  },
  {
    code: "YXC",
    name: "Canadian Rockies International (Cranbrook)",
    distance: "250 km · ~3 hours",
    notes: "Alternative for trips routing through the Rockies. WestJet flights from Calgary stop here.",
  },
];

const SEASONAL = [
  { window: "April to May",          detail: "Opening weeks, firm fairways, lowest rates" },
  { window: "June to August",        detail: "Peak season, long days, Bistro patio runs late" },
  { window: "July to August",        detail: "Beat the Heat promo after 1 PM, not Wednesdays" },
  { window: "September to October",  detail: "Cooler, quieter, fall colour along the river" },
  { window: "November to March",     detail: "Closed for the season" },
];

export default function PlanYourVisit() {
  return (
    <>
      {/* 1. HERO. Text on the left, the autumn driveway photo on the
          right. The image is the literal "you've turned in off Hwy 22"
          moment. Native 1:1; rendered at aspect-square. Photo drops
          UNDER the text on small viewports so the headline + CTA
          stay above the fold. */}
      <section className="pt-32 md:pt-40 pb-16 bg-paper">
        <div className="container-edge grid gap-10 lg:gap-14 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 order-1">
            <p className="eyebrow mb-6">Plan your visit</p>
            <h1
              className="font-display text-granite max-w-[22ch] mb-8"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", lineHeight: "1.02", letterSpacing: "-0.015em" }}
            >
              Three hours from Spokane.<br />Seven from Calgary.<br />Worth the drive.
            </h1>
            <p className="prose-editorial text-granite/85 max-w-2xl">
              Birchbank sits on the west bank of the Columbia River in Genelle, BC, 15 minutes
              from Castlegar, 12 minutes from Trail. This page covers the road and the
              runway. Where to sleep is on{" "}
              <Link href="/stay-and-play" className="underline hover:text-amber">Stay &amp; play</Link>.
              Crossing the border is on{" "}
              <Link href="/usa-visitors" className="underline hover:text-amber">For US visitors</Link>.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <BookButton />
              <a href="#drive-routes" className="btn-ghost">Drive routes →</a>
            </div>
          </div>
          <figure className="lg:col-span-5 order-2 mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative w-full aspect-square overflow-hidden bg-granite/5 border border-granite/10 rounded-sm">
              <Image
                src="/visit/driveway-autumn.webp"
                alt="The Birchbank driveway in autumn, yellow trees lining both sides of the road into the course"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
                priority
                unoptimized
              />
            </div>
            <figcaption className="mt-3 font-mono text-xs text-silt">
              The driveway in mid-October.
            </figcaption>
          </figure>
        </div>
      </section>

      <div className="container-edge"><div className="rule-hair" /></div>

      {/* 2. DRIVE ROUTES */}
      <section id="drive-routes" className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow mb-5">By road</p>
            <h2 className="display-lg font-display mb-5">
              Four ways in.
            </h2>
            <p className="prose-editorial text-granite/85">
              Drive times below are summer and no-traffic estimates. Winter pass closures on
              Hwy 3 (Paulson and Crowsnest) can add an hour. Always check{" "}
              <a href="https://www.drivebc.ca" target="_blank" rel="noopener" className="underline hover:text-amber">
                DriveBC
              </a>{" "}
              before a long haul. Driving from the US? Full US drive times and border detail
              live on{" "}
              <Link href="/usa-visitors" className="underline hover:text-amber">/usa-visitors</Link>.
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
                  <p className="font-mono text-xs text-silt tabular-nums">{r.distance} · {r.time}</p>
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

      {/* 3. AIRPORTS */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow mb-5">By air</p>
            <h2 className="display-lg font-display mb-5">
              Four airports, four routes in.
            </h2>
            <p className="prose-editorial text-granite/85">
              YCG is closest. GEG is best for US visitors. Car rental at all four.
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
                <span className="hidden md:block md:col-span-3 font-mono text-sm text-silt text-right tabular-nums">
                  {a.distance}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. CROSS-BORDER, single tight cross-link line, no cedar block. */}
      <section className="py-12 bg-paper border-t border-granite/10">
        <div className="container-edge">
          <p className="font-mono text-sm text-silt max-w-3xl">
            <span className="text-granite font-semibold">Coming from the US?</span>{" "}
            Border crossings, documents, currency, and Spokane / Colville / Sandpoint
            drive times all live on{" "}
            <Link href="/usa-visitors" className="underline text-amber hover:text-amber-dark">
              /usa-visitors
            </Link>
            .
          </p>
        </div>
      </section>

      {/* 5. WEATHER WINDOW + SEASONAL */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge grid gap-10 md:grid-cols-12 items-center">
          <div className="md:col-span-7">
            <p className="eyebrow mb-5">When to come</p>
            <h2 className="display-lg font-display mb-5">
              April 1 to October 31.
            </h2>
            <p className="prose-editorial text-granite/85 max-w-xl">
              The course averages 213 days a year, opening April 1 and closing October 31.
              Peak summer runs warm and dry. Shoulder weeks, April to early June and
              mid-September to October, play firmer, cooler, cheaper, and less crowded.
              Mid-October is the best stretch for colour along the river.
            </p>
            <p className="mt-6">
              <Link href="/conditions" className="btn-ghost">
                See today&apos;s conditions →
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

      {/* 6. ON ARRIVAL, the practical bit nobody else owns. */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge grid gap-10 md:grid-cols-12 items-start">
          <div className="md:col-span-5">
            <p className="eyebrow mb-5">When you arrive</p>
            <h2 className="display-md font-display mb-5">
              The practical bit.
            </h2>
          </div>
          <div className="md:col-span-7 space-y-5">
            <p className="prose-editorial text-granite/85">
              <span className="font-semibold text-granite">Address.</span> 5500 Highway 22,
              Genelle, BC. Free parking at the clubhouse. Pull straight up to the Pro Shop,
              that&apos;s where you check in.
            </p>
            <p className="prose-editorial text-granite/85">
              <span className="font-semibold text-granite">Pro Shop hours.</span> 8 am to
              dusk, seven days a week through the season. Phone{" "}
              <a href="tel:+12506932255" className="underline hover:text-amber">
                250-693-2255
              </a>
              .
            </p>
            <p className="prose-editorial text-granite/85">
              <span className="font-semibold text-granite">Walking the course.</span>{" "}
              Yes, the course is walkable, the routing returns to the clubhouse at 9 and
              again at 18. Power carts are available at the Pro Shop, $13.50 per rider for
              9, $24 for 18 (tax in).
            </p>
            <p className="prose-editorial text-granite/85">
              <span className="font-semibold text-granite">Bistro at the turn.</span> The
              Bistro is open daily 10 am to 6 pm. Phone{" "}
              <a href="tel:+12506935451" className="underline hover:text-amber">
                250-693-5451
              </a>{" "}
              for a reservation, or walk in.
            </p>
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA */}
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
