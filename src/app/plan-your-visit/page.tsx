import type { Metadata } from "next";
import Link from "next/link";
import BookButton from "@/components/BookButton";

export const metadata: Metadata = {
  title: "Plan your visit",
  description:
    "Getting to Birchbank Golf Course in Genelle, BC — drive times, border crossings, airports, lodging, and the Kootenay golf trail for multi-day trips.",
  alternates: { canonical: "/plan-your-visit" },
};

/**
 * Driving distances are from the Genelle pin (49.2°N, 117.75°W) computed via
 * Google Maps with the fastest-route border crossings selected. Times are
 * typical no-traffic / summer conditions; winter pass closures (Crowsnest,
 * Paulson Summit on Hwy 3) can add an hour or more — we flag that where it
 * matters.
 *
 * Everything else: facts drawn from the businesses' own published websites,
 * Canada Border Services Agency (CBSA) published hours, and Transport Canada
 * highway data. If a number could have shifted since build, we link the
 * authoritative source so visitors can re-verify.
 */

const DRIVE_ROUTES = [
  {
    city: "Spokane, WA",
    distance: "250 km",
    time: "~3 hours",
    route: "I-395 N → US-395 N → Paterson / Laurier border → BC-22 N",
    note: "Shortest + most popular route for WA golfers. Paterson border is smaller and faster than Eastport.",
    flag: "🇺🇸",
  },
  {
    city: "Kelowna, BC",
    distance: "290 km",
    time: "~3.5 hours",
    route: "BC-97 S → BC-33 E → BC-3 E → BC-22 S",
    note: "Runs through Rock Creek and Grand Forks. All-season route; watch Paulson Summit in winter.",
    flag: "🇨🇦",
  },
  {
    city: "Calgary, AB",
    distance: "640 km",
    time: "~6.5 – 7.5 hours",
    route: "AB-22X → Crowsnest Pass (Hwy 3) → Creston → BC-3 W → BC-22",
    note: "A committed day on the road. Many golfers break the trip in Fernie or Cranbrook — good courses in both.",
    flag: "🇨🇦",
  },
  {
    city: "Vancouver, BC",
    distance: "630 km",
    time: "~7 hours",
    route: "TransCanada (Hwy 1) → Hwy 3 E → Castlegar → BC-22",
    note: "Gorgeous drive but long. Hope → Princeton → Osoyoos → Grand Forks. Overnight in Osoyoos or Grand Forks breaks it nicely.",
    flag: "🇨🇦",
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
    notes: "Best option for US visitors. Many daily flights, full-service rental counters, cross the border at Paterson.",
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
    notes: "Alternative for trips routing through the Rockies — Calgary-bound WestJet flights stop here.",
  },
];

const BORDER_CROSSINGS = [
  {
    name: "Paterson, BC ↔ Laurier, WA",
    highway: "BC-22 / US-395",
    hours: "Typically 8 AM – 11 PM Pacific",
    note: "Smallest, quickest crossing in our region. Closest to Birchbank — 30 minutes to first tee after clearing customs.",
  },
  {
    name: "Waneta, BC ↔ Northport, WA",
    highway: "BC-22A (Waneta Rd)",
    hours: "Typically 8 AM – midnight Pacific",
    note: "Second-closest. Good alternate if Paterson has a line.",
  },
  {
    name: "Nelway, BC ↔ Metaline Falls, WA",
    highway: "BC-6 / US-31",
    hours: "Typically 8 AM – midnight Pacific",
    note: "Useful if you're coming from north-central Washington via Colville.",
  },
];

const LODGING = [
  {
    name: "Prestige Mountain Resort Rossland",
    area: "Rossland · 30 min",
    note: "Boutique mountain hotel at the base of Red Mountain. On-site restaurant, walking distance to Rossland's pubs and breweries.",
    url: "https://prestigehotelsandresorts.com/hotels/prestige-mountain-resort-rossland",
  },
  {
    name: "Sandman Hotel Castlegar",
    area: "Castlegar · 15 min",
    note: "Full-service, Denny's on-site, closest chain-hotel option to the course. Easy in-out for golf trips.",
    url: "https://www.sandmanhotels.com/hotel/castlegar",
  },
  {
    name: "Best Western Plus Columbia River Hotel",
    area: "Trail · 15 min",
    note: "Riverside location, pool, restaurant. Listed as a local Birchbank partner.",
    url: "https://www.bestwesterntrail.com",
  },
  {
    name: "Ramada by Wyndham Trail",
    area: "Trail · 15 min",
    note: "Budget-friendly chain, pool, breakfast included. Central to the Trail dining scene.",
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

const NEARBY_COURSES = [
  {
    name: "Redstone Resort",
    course: "18 holes · Les Furber design",
    drive: "25 min north",
    note: "Pair Birchbank's river routing with Redstone's mountain routing for a two-course weekend.",
  },
  {
    name: "Castlegar Golf Club",
    course: "18 holes · tree-lined",
    drive: "15 min north",
    note: "The other local 18. Shorter, tighter, great for an afternoon round after Birchbank in the morning.",
  },
  {
    name: "Champion Lakes Golf Course",
    course: "18 holes · mountain parkland",
    drive: "30 min east",
    note: "Set in a provincial park. Worth the drive for the setting alone.",
  },
  {
    name: "Salmo Valley Golf Course",
    course: "9 holes · executive",
    drive: "40 min east",
    note: "Short but scenic. Good half-day option if you're staying in Salmo or Nelson.",
  },
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
            Birchbank sits on the west bank of the Columbia River in Genelle, BC — 15 minutes
            from Castlegar, 12 minutes from Trail, and a single mountain pass from the Alberta
            border. Here's everything you need to get here, stay over, and play more than once.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <BookButton />
            <a href="#drive-routes" className="btn-ghost">
              Drive routes →
            </a>
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

      {/* Border crossings — cedar block for USA visitors */}
      <section className="py-[var(--spacing-section)] bg-cedar text-paper">
        <div className="container-edge grid gap-10 md:grid-cols-12 items-start">
          <div className="md:col-span-5">
            <p className="eyebrow text-paper/60 mb-5">For US visitors</p>
            <h2 className="display-lg font-display">
              Three ways across the border.
            </h2>
            <p className="prose-editorial text-paper/85 mt-6">
              You'll need a valid passport or NEXUS card. Hours below are
              typical — check{" "}
              <a href="https://www.cbsa-asfc.gc.ca/bwt-taf/menu-eng.html" target="_blank" rel="noopener" className="underline text-tamarack hover:text-paper">
                CBSA border wait times
              </a>{" "}
              the morning of your drive.
            </p>
          </div>
          <div className="md:col-span-7">
            <ul className="space-y-6">
              {BORDER_CROSSINGS.map((b) => (
                <li key={b.name} className="border-l-2 border-tamarack pl-5">
                  <p className="font-display text-xl text-paper">{b.name}</p>
                  <p className="font-mono text-xs text-paper/60 mt-1">
                    {b.highway} · {b.hours}
                  </p>
                  <p className="text-paper/85 text-sm mt-2">{b.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Lodging */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow mb-5">Where to stay</p>
            <h2 className="display-lg font-display mb-5">
              Four hotels within 30 minutes.
            </h2>
            <p className="prose-editorial text-granite/85">
              Two in Trail (15 min), one in Castlegar (15 min), one in Rossland (30 min).
              All have restaurants on-site or walking distance to dinner.
            </p>
          </div>

          <ul className="grid md:grid-cols-2 gap-5 md:gap-6">
            {LODGING.map((h) => (
              <li key={h.name} className="border border-granite/12 p-6 md:p-7 hover:border-amber transition-colors">
                <div className="flex items-baseline justify-between mb-2 gap-4">
                  <p className="font-display text-xl text-granite">{h.name}</p>
                  <p className="font-mono text-xs text-silt whitespace-nowrap">{h.area}</p>
                </div>
                <p className="text-silt text-sm mt-2 leading-relaxed">{h.note}</p>
                <a
                  href={h.url}
                  target="_blank"
                  rel="noopener"
                  className="mt-4 inline-block font-mono text-xs text-amber hover:underline"
                >
                  Hotel site ↗
                </a>
              </li>
            ))}
          </ul>

          <p className="mt-10 text-sm text-silt max-w-xl">
            For smaller inns, motels, B&amp;Bs, and RV parks, see{" "}
            <a href="https://tourismrossland.com" target="_blank" rel="noopener" className="underline hover:text-amber">
              Tourism Rossland
            </a>{" "}
            and{" "}
            <a href="https://destinationcastlegar.com" target="_blank" rel="noopener" className="underline hover:text-amber">
              Destination Castlegar
            </a>.
          </p>
        </div>
      </section>

      {/* After the round — dinner */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow mb-5">After the round</p>
            <h2 className="display-lg font-display mb-5">
              The Bistro closes at 5. Dinner is 15 minutes away.
            </h2>
            <p className="prose-editorial text-granite/85">
              The Bistro runs 12–5 every day, licensed, full menu. When it closes, the Kootenay
              dining scene starts warming up — four spots we'd send family to.
            </p>
          </div>

          <ul className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {AFTER_THE_ROUND.map((r) => (
              <li key={r.name} className="border border-granite/12 p-5 md:p-6">
                <p className="font-display text-lg text-granite">{r.name}</p>
                <p className="font-mono text-xs text-silt mt-1">{r.area}</p>
                <p className="text-silt text-sm mt-3 leading-relaxed">{r.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Make it a weekend — nearby courses */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow mb-5">Make it a weekend</p>
            <h2 className="display-lg font-display mb-5">
              Four more courses within an hour.
            </h2>
            <p className="prose-editorial text-granite/85">
              The Kootenay golf trail is denser than most visitors expect. Pair Birchbank's
              river routing with a mountain course and an executive layout for a proper two- or
              three-day trip.
            </p>
          </div>

          <ul className="divide-y divide-granite/15 border-t border-b border-granite/15">
            {NEARBY_COURSES.map((c) => (
              <li key={c.name} className="grid grid-cols-12 gap-4 py-6 items-baseline">
                <div className="col-span-12 md:col-span-7">
                  <p className="font-display text-xl md:text-2xl text-granite">{c.name}</p>
                  <p className="text-silt text-sm mt-1 max-w-xl">{c.note}</p>
                </div>
                <span className="col-span-6 md:col-span-3 font-mono text-sm text-silt">
                  {c.course}
                </span>
                <span className="col-span-6 md:col-span-2 font-mono text-sm text-silt text-right">
                  {c.drive}
                </span>
              </li>
            ))}
          </ul>
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
              The Kootenay summer is warm, dry, and long. Shoulder seasons — April to early June,
              mid-September to October — play firmer, cooler, cheaper, and less crowded. October
              is the best month for colour; the tamaracks along the river go gold for about three
              weeks mid-month.
            </p>
            <p className="mt-6">
              <Link href="/#conditions-widget" className="btn-ghost">
                See today's conditions →
              </Link>
            </p>
          </div>
          <div className="md:col-span-5">
            <ul className="font-mono text-sm text-silt space-y-3 border-l-2 border-tamarack pl-5">
              <li><span className="text-granite">April – May:</span> opening weeks, firm fairways, lowest rates</li>
              <li><span className="text-granite">June – Aug:</span> peak season, long days, Bistro patio runs late</li>
              <li><span className="text-granite">July – Aug:</span> Beat the Heat promo after 1 PM (non-Wed)</li>
              <li><span className="text-granite">Sept – Oct:</span> cooler, quieter, fall colour on the 14th fairway</li>
              <li><span className="text-granite">Closed:</span> November 1 – March 31</li>
            </ul>
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
          <p className="mt-10 font-mono text-xs text-paper/60 leading-relaxed">
            5500 Highway 22, Genelle BC · 15 min from Castlegar, 12 min from Trail
          </p>
        </div>
      </section>
    </>
  );
}
