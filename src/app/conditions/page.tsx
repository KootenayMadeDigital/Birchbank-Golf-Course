import type { Metadata } from "next";
import Link from "next/link";
import BookButton from "@/components/BookButton";
import { fetchBirchbankForecast } from "@/lib/weather";

export const metadata: Metadata = {
  title: "Conditions",
  description:
    "Live weather, 24-hour forecast, and seven-day outlook for Birchbank Golf Course in Genelle, BC. Powered by Environment Canada's GEM model via Open-Meteo.",
  alternates: { canonical: "/conditions" },
};

// Revalidate the whole page every 15 minutes — matches the upstream
// weather fetch cache so the page and the underlying data agree.
export const revalidate = 900;

/**
 * The dedicated conditions dashboard.
 *
 * Home-page ConditionsWidget is a compact "is it a good day to book?"
 * card. This page is the deep version for the obsessive: 24-hour chart,
 * 7-day outlook, golfer-specific commentary ("A three-club day. Hold
 * onto your hat."), and a frank note about what is NOT live (frost
 * delays, cart-path-only calls — those still come from the Pro Shop).
 *
 * Data source: Open-Meteo with Environment Canada's GEM model, same
 * pipeline as the home widget. Fetched server-side and revalidated every
 * 15 minutes.
 */

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

// A one-line human take on whether it's a good golf day. Concrete and
// honest — no hype, no "you'll love it." Derived from precip prob and
// wind max.
function golfDayCall(precip: number, windMax: number, highC: number): string {
  if (precip >= 60) return "Rain likely. Bring layers or reschedule.";
  if (precip >= 30) return "Showers possible. Check back before you leave.";
  if (windMax >= 35) return "Serious wind. Playable, but pick your clubs carefully.";
  if (highC < 8) return "Cold. Layer up; the ball won't travel.";
  if (highC >= 28 && windMax < 10) return "Hot and still. Bring water and a twilight tee time.";
  if (windMax < 15 && precip < 15 && highC >= 14) return "Excellent day to be out here.";
  return "A solid day for golf.";
}

export default async function Conditions() {
  const forecast = await fetchBirchbankForecast();

  return (
    <>
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-12 bg-paper">
        <div className="container-edge">
          <p className="eyebrow mb-6">Conditions</p>
          <h1
            className="font-display text-granite max-w-[20ch] mb-6"
            style={{ fontSize: "clamp(2.25rem, 6.5vw, 4.5rem)", lineHeight: "1.02", letterSpacing: "-0.015em" }}
          >
            Live weather.<br />Seven-day outlook.
          </h1>
          <p className="prose-editorial text-granite/85 max-w-2xl">
            Data from Environment Canada's GEM model via Open-Meteo, updated every 15
            minutes. Frost delays, cart-path-only calls, and same-day tee-sheet status still
            come from the Pro Shop — call ahead on questionable mornings.
          </p>
        </div>
      </section>

      <div className="container-edge"><div className="rule-hair" /></div>

      {/* Current conditions + today's call */}
      {forecast ? (
        <>
          <section className="py-[var(--spacing-section)] bg-paper">
            <div className="container-edge grid gap-10 md:grid-cols-12 items-start">
              <div className="md:col-span-7">
                <p className="eyebrow mb-5">Right now</p>
                <div className="flex items-baseline gap-5 mb-4">
                  <span className="font-display text-7xl md:text-8xl text-granite leading-none">
                    {forecast.now.tempC}°
                  </span>
                  <span className="text-granite text-xl">
                    <span className="font-mono text-3xl mr-2 text-cedar">{weatherGlyph(forecast.now.conditionCode)}</span>
                    {forecast.now.conditionLabel}
                  </span>
                </div>
                <p className="font-mono text-sm text-silt mb-2">
                  Wind <span className="text-granite">{forecast.now.windKmh} km/h {forecast.now.windCardinal}</span>
                  <span className="mx-3 text-silt/40">·</span>
                  <span className="text-cedar">{forecast.now.clubCall}</span>
                </p>
                <p className="font-mono text-xs text-silt">
                  Today's high {forecast.daily[0].highC}° · low {forecast.daily[0].lowC}° · precip {forecast.daily[0].precipProbMax}%
                </p>
              </div>

              <aside className="md:col-span-5 border-l-2 border-tamarack pl-6">
                <p className="eyebrow mb-3">Today's call</p>
                <p className="font-display text-2xl text-granite leading-snug">
                  {golfDayCall(forecast.daily[0].precipProbMax, forecast.daily[0].windMaxKmh, forecast.daily[0].highC)}
                </p>
                <p className="font-mono text-xs text-silt mt-5">
                  Sunrise {forecast.daily[0].sunrise}
                  <span className="mx-2 text-silt/40">·</span>
                  Sunset {forecast.daily[0].sunset}
                  <span className="mx-2 text-silt/40">·</span>
                  {forecast.daily[0].daylightHours}h of daylight
                </p>
              </aside>
            </div>
          </section>

          {/* 24-hour strip */}
          <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
            <div className="container-edge">
              <p className="eyebrow mb-5">Next 24 hours</p>
              <h2 className="display-md font-display mb-8">Hourly outlook.</h2>

              <div className="overflow-x-auto -mx-4 px-4 pb-2">
                <ul className="flex gap-3 min-w-max">
                  {forecast.hourly.map((h) => (
                    <li
                      key={h.time}
                      className="w-[88px] shrink-0 border border-granite/15 p-3 text-center"
                    >
                      <p className="font-mono text-[10px] text-silt uppercase">{h.hourLabel}</p>
                      <p className="font-mono text-2xl text-cedar mt-2 leading-none">{weatherGlyph(h.conditionCode)}</p>
                      <p className="font-display text-xl text-granite mt-2">{h.tempC}°</p>
                      <p className="font-mono text-[10px] text-silt mt-2">
                        {h.precipProb}% · {h.windKmh} km/h
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="font-mono text-xs text-silt mt-4">
                Scroll sideways for the full 24 hours.
              </p>
            </div>
          </section>

          {/* 7-day outlook */}
          <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
            <div className="container-edge">
              <p className="eyebrow mb-5">Seven days out</p>
              <h2 className="display-md font-display mb-8">Plan your week.</h2>

              <ul className="divide-y divide-granite/15 border-t border-b border-granite/15">
                {forecast.daily.map((d) => (
                  <li key={d.date} className="grid grid-cols-12 gap-3 md:gap-5 py-5 items-center">
                    <span className="col-span-3 md:col-span-2 font-display text-lg md:text-xl text-granite">
                      {d.dayLabel}
                    </span>
                    <span className="col-span-1 font-mono text-2xl md:text-3xl text-cedar leading-none text-center">
                      {weatherGlyph(d.conditionCode)}
                    </span>
                    <span className="col-span-5 md:col-span-4 font-mono text-xs md:text-sm text-silt">
                      {d.conditionLabel}
                    </span>
                    <span className="col-span-3 md:col-span-2 font-display text-base md:text-lg text-granite text-right md:text-left">
                      {d.highC}° <span className="text-silt text-sm">/ {d.lowC}°</span>
                    </span>
                    <span className="hidden md:block md:col-span-2 font-mono text-xs text-silt">
                      {d.precipProbMax}% precip
                    </span>
                    <span className="hidden md:block md:col-span-1 font-mono text-xs text-silt text-right">
                      {d.windMaxKmh} km/h
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </>
      ) : (
        <section className="py-[var(--spacing-section)] bg-paper">
          <div className="container-edge border border-granite/15 p-8 max-w-2xl">
            <p className="eyebrow text-amber mb-3">Upstream weather feed unavailable</p>
            <p className="prose-editorial text-granite/85">
              The weather service is temporarily unreachable. For today's conditions and the
              course's own frost-delay status, call the Pro Shop at{" "}
              <a href="tel:+12506932255" className="underline hover:text-amber">250-693-2255</a>.
            </p>
          </div>
        </section>
      )}

      {/* What we don't measure — honesty block */}
      <section className="py-[var(--spacing-section)] bg-cedar text-paper">
        <div className="container-edge grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow text-tamarack mb-5">What's live, what's not</p>
            <h2
              className="font-display mb-5"
              style={{ fontSize: "clamp(1.75rem, 4.5vw, 2.75rem)", lineHeight: "1.05", letterSpacing: "-0.01em" }}
            >
              We're honest about our data.
            </h2>
          </div>
          <div className="md:col-span-7 space-y-6">
            <div className="border-l-2 border-tamarack pl-5">
              <p className="font-display text-lg text-paper mb-1">Live via Open-Meteo (GEM)</p>
              <p className="text-paper/80 text-sm leading-relaxed">
                Temperature, wind speed and direction, precipitation, hourly and daily forecasts
                out to seven days. Updated every 15 minutes.
              </p>
            </div>
            <div className="border-l-2 border-tamarack pl-5">
              <p className="font-display text-lg text-paper mb-1">Call the Pro Shop</p>
              <p className="text-paper/80 text-sm leading-relaxed">
                Frost-delay status, cart-path-only calls, green-speed readings, fairway
                firmness — these are judgment calls from the superintendent and the Pro
                Shop, not things we'd fake with an invented number on this page.
                <a href="tel:+12506932255" className="block mt-2 text-tamarack underline hover:text-paper">
                  250-693-2255 · 9 am – 7 pm, 7 days
                </a>
              </p>
            </div>
            <div className="border-l-2 border-tamarack pl-5">
              <p className="font-display text-lg text-paper mb-1">Historical / averages</p>
              <p className="text-paper/80 text-sm leading-relaxed">
                Peak Kootenay golf weather runs June 15 – September 15. Shoulder seasons play
                firmer and cooler. Average opening day: April 1; average closing: October 31.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge text-center max-w-3xl mx-auto">
          <p className="eyebrow mb-6">Weather's fine — go play</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <BookButton />
            <Link href="/rates" className="btn-ghost">Rates</Link>
            <Link href="/plan-your-visit" className="btn-ghost">Plan your visit →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
