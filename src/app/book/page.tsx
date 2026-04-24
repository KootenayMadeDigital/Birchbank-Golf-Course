import type { Metadata } from "next";
import Link from "next/link";
import BookButton from "@/components/BookButton";
import { fetchBirchbankWeather } from "@/lib/weather";

export const metadata: Metadata = {
  title: "Book a tee time",
  description:
    "Book a Birchbank tee time directly via Chronogolf, or call the Pro Shop at 250-693-2255. Members book 14 days out, public 7 days. Live weather check before you commit.",
  alternates: { canonical: "/book" },
};

// Revalidate every 15 min so the weather snapshot stays current without a
// fresh upstream hit on every view.
export const revalidate = 900;

const CHRONOGOLF_WIDGET_SRC =
  `https://chronogolf.com/club/${process.env.NEXT_PUBLIC_CHRONOGOLF_CLUB_ID || "738"}/widget?medium=widget&source=club`;

const BOOKING_STEPS = [
  {
    n: "1",
    title: "Pick a tee time",
    body: "Use the widget below or call 250-693-2255. Members book up to 14 days out; public opens 7 days out. Weather for the week is in the sidebar.",
  },
  {
    n: "2",
    title: "Get the confirmation",
    body: "Chronogolf emails you a confirmation with the time, party size, and a cancellation link. Keep it, it's your reference if you need to reach the Pro Shop.",
  },
  {
    n: "3",
    title: "Check in at the Pro Shop",
    body: "Arrive 15 minutes before your tee time. Pay the green fee at the Pro Shop counter (cash, debit, credit all fine). Pick up a scorecard and a pencil, and we'll see you at the first.",
  },
];

const BOOKING_DETAILS = [
  {
    title: "Booking window",
    lines: ["14 days out · members", "7 days out · public"],
  },
  {
    title: "Cancellation",
    lines: ["Free up to 24 hours prior", "No-shows forfeit the green fee"],
  },
  {
    title: "Rain checks",
    lines: ["Honored course-wide", "Ask at the Pro Shop"],
  },
  {
    title: "Group bookings",
    lines: ["4 or more: call the office", "250-693-2366 · weekdays"],
  },
];

function weatherGlyph(code: number): string {
  if (code === 0) return "☀";
  if (code >= 1 && code <= 2) return "⛅";
  if (code === 3) return "☁";
  if (code >= 45 && code <= 48) return "≡";
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return "☂";
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return "❄";
  if (code >= 95) return "⚡";
  return "·";
}

export default async function BookPage() {
  const weather = await fetchBirchbankWeather();

  return (
    <>
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-12 bg-paper">
        <div className="container-edge">
          <p className="eyebrow mb-6">Book a tee time</p>
          <h1
            className="font-display text-granite max-w-[22ch] mb-6"
            style={{ fontSize: "clamp(2.25rem, 6.5vw, 4.5rem)", lineHeight: "1.02", letterSpacing: "-0.015em" }}
          >
            Pick a time.<br />We'll see you at the first.
          </h1>
          <p className="prose-editorial text-granite/85 max-w-2xl">
            Book directly with Birchbank, no third-party fees, no surge pricing, the same
            rate you'd pay walking in. If the widget loads slow or your wi-fi's spotty,{" "}
            <a href="tel:+12506932255" className="underline hover:text-amber">call 250-693-2255</a>
            {" "}and we'll do it on the phone.
          </p>
          <p className="mt-5 font-mono text-xs text-silt">
            First time? <Link href="/dress-code" className="text-amber underline hover:text-amber-dark">Check the dress code</Link>
            {" · "}
            <Link href="/plan-your-visit" className="text-amber underline hover:text-amber-dark">Plan your visit</Link>
            {" · "}
            <Link href="/rates" className="text-amber underline hover:text-amber-dark">See all rates</Link>
          </p>
        </div>
      </section>

      <div className="container-edge"><div className="rule-hair" /></div>

      {/* Booking widget + weather + rates sidebar */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge grid gap-8 lg:gap-10 lg:grid-cols-12">
          {/* Chronogolf booking iframe, the actual booking surface. */}
          <div className="lg:col-span-8">
            <p className="eyebrow mb-4">Live tee sheet</p>
            <div className="border border-granite/15 overflow-hidden bg-paper">
              <iframe
                src={CHRONOGOLF_WIDGET_SRC}
                title="Birchbank Golf. Chronogolf tee time booking"
                className="w-full h-[720px] border-0 block bg-paper"
                allow="payment"
              />
            </div>
            <p className="mt-4 font-mono text-xs text-silt">
              Widget provided by Chronogolf (Lightspeed Golf). If it doesn't load within a
              few seconds, call the Pro Shop at{" "}
              <a href="tel:+12506932255" className="underline hover:text-amber">250-693-2255</a>.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <BookButton label="Open booking panel" />
              <a href="tel:+12506932255" className="btn-ghost">Or call · 250-693-2255</a>
            </div>
          </div>

          {/* Sidebar: weather + rates snapshot */}
          <aside className="lg:col-span-4 space-y-6">
            {weather ? (
              <div className="border border-granite/15 p-6 bg-paper">
                <p className="eyebrow text-cedar mb-4">Today's weather</p>
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-display text-5xl text-granite leading-none">
                    {weather.tempC}°
                  </span>
                  <span className="text-silt text-sm">
                    <span className="font-mono text-lg mr-2 text-cedar">{weatherGlyph(weather.conditionCode)}</span>
                    {weather.conditionLabel}
                  </span>
                </div>
                <p className="font-mono text-xs text-silt">
                  Wind <span className="text-granite">{weather.windKmh} km/h {weather.windCardinal}</span>
                </p>
                <p className="font-mono text-xs text-cedar mt-1">{weather.clubCall}</p>
                <p className="font-mono text-xs text-silt mt-3 pt-3 border-t border-granite/10">
                  High {weather.today.highC}° / low {weather.today.lowC}°
                  <span className="mx-2 text-silt/40">·</span>
                  {weather.today.precipProbMax}% precip
                </p>
                <Link
                  href="/conditions"
                  className="mt-4 inline-block font-mono text-xs text-amber hover:underline"
                >
                  7-day forecast →
                </Link>
              </div>
            ) : null}

            <div className="border border-granite/15 p-6 bg-paper">
              <p className="eyebrow text-cedar mb-4">Today's rates</p>
              <dl className="space-y-3 font-mono text-sm">
                <div className="flex justify-between">
                  <dt className="text-silt">18 holes · walking</dt>
                  <dd className="text-granite font-semibold">$80</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-silt">9 holes</dt>
                  <dd className="text-granite font-semibold">$45</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-silt">Twilight · after 3 PM</dt>
                  <dd className="text-granite font-semibold">$45</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-silt">Power cart · 18h</dt>
                  <dd className="text-granite font-semibold">$24/rider</dd>
                </div>
              </dl>
              <Link
                href="/rates"
                className="mt-4 inline-block font-mono text-xs text-amber hover:underline"
              >
                Full rates →
              </Link>
            </div>

            <div className="border border-granite/15 p-6 bg-paper">
              <p className="eyebrow text-cedar mb-4">Questions?</p>
              <p className="text-silt text-sm leading-relaxed mb-4">
                Someone picks up at the Pro Shop every day of the season, 8 am to dusk.
              </p>
              <ul className="space-y-2 font-mono text-xs">
                <li>
                  <span className="text-silt">Pro Shop</span>{" "}
                  <a href="tel:+12506932255" className="text-granite hover:text-amber underline">
                    250-693-2255
                  </a>
                </li>
                <li>
                  <span className="text-silt">Office</span>{" "}
                  <a href="tel:+12506932366" className="text-granite hover:text-amber underline">
                    250-693-2366
                  </a>
                </li>
                <li>
                  <span className="text-silt">Bistro</span>{" "}
                  <a href="tel:+12506935451" className="text-granite hover:text-amber underline">
                    250-693-5451
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* What happens next */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow mb-5">What happens next</p>
            <h2 className="display-lg font-display mb-5">
              Three steps, no surprises.
            </h2>
            <p className="prose-editorial text-granite/85">
              Booking anxiety is a real thing. Here's exactly what to expect from the tap on
              the widget to the walk to the first tee.
            </p>
          </div>

          <ol className="grid md:grid-cols-3 gap-5 md:gap-6">
            {BOOKING_STEPS.map((s) => (
              <li key={s.n} className="border border-granite/15 p-7">
                <p className="font-display text-6xl text-tamarack leading-none">{s.n}</p>
                <p className="font-display text-xl text-granite mt-4 mb-3">{s.title}</p>
                <p className="text-silt text-sm leading-relaxed">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Booking details row */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge">
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow mb-5">Booking details</p>
            <h2 className="display-md font-display mb-5">The fine print, spelled out.</h2>
          </div>

          <ul className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {BOOKING_DETAILS.map((d) => (
              <li key={d.title} className="border-l-2 border-tamarack pl-5">
                <p className="font-display text-lg text-granite mb-3">{d.title}</p>
                {d.lines.map((l, i) => (
                  <p key={i} className={i === 0 ? "text-granite text-sm" : "text-silt text-sm mt-1"}>
                    {l}
                  </p>
                ))}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Final CTA, alternatives */}
      <section className="py-[var(--spacing-section)] bg-cedar text-paper">
        <div className="container-edge grid gap-10 md:grid-cols-12 items-center">
          <div className="md:col-span-7">
            <p className="eyebrow text-tamarack mb-5">Booking for a group?</p>
            <h2
              className="font-display mb-5"
              style={{ fontSize: "clamp(1.75rem, 4.5vw, 2.75rem)", lineHeight: "1.05", letterSpacing: "-0.01em" }}
            >
              Four or more plays best on the phone.
            </h2>
            <p className="prose-editorial text-paper/85 max-w-xl">
              Tournaments, corporate days, weddings, bachelor parties, Saturday foursomes , 
              the office handles groups directly. You'll get a real human, real rates, and
              actual availability instead of a widget.
            </p>
          </div>
          <div className="md:col-span-5 md:text-right space-y-3">
            <a
              href="tel:+12506932366"
              className="btn-primary bg-tamarack text-granite hover:bg-paper inline-block"
            >
              Call the office · 250-693-2366
            </a>
            <br />
            <Link
              href="/events"
              className="btn-ghost text-paper border-paper/70 hover:text-tamarack hover:border-tamarack inline-block"
            >
              Events &amp; tournaments →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
