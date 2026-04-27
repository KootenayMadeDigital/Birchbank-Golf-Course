import type { Metadata } from "next";
import Link from "next/link";
import BookButton from "@/components/BookButton";
import WindCompass from "@/components/WindCompass";
import HourChart from "@/components/HourChart";
import NowPhoto from "@/components/NowPhoto";
import {
  fetchBirchbankForecast,
  findBestWindow,
  findBestDay,
  findBestWindowsThisWeek,
} from "@/lib/weather";

export const metadata: Metadata = {
  title: "Conditions",
  description:
    "Live weather, 24-hour outlook, and 7-day forecast for Birchbank Golf Course in Genelle, BC. Best-window and best-day picks for booking your round.",
  alternates: { canonical: "/conditions" },
};

export const revalidate = 900;

/**
 * Conditions dashboard.
 *
 * The deep version of the home-page conditions widget. Built around
 * three quick decisions a golfer actually makes:
 *
 *   1. Should I play right now? (hero)
 *   2. When today is the best window? (24h chart + best-window band)
 *   3. Which day this week is best? (7-day with a pinned best-day card)
 *
 * Frost delays, cart-path-only calls, green-speed readings, and
 * fairway firmness still come from the Pro Shop, those are judgment
 * calls, not data we'd fake on this page.
 */

function weatherGlyph(code: number, isDay: 0 | 1 = 1): string {
  const day = isDay === 1;
  if (code === 0) return day ? "☀\uFE0F" : "🌙\uFE0F";
  if (code === 1) return day ? "🌤\uFE0F" : "🌙\uFE0F";
  if (code === 2) return day ? "⛅\uFE0F" : "☁\uFE0F";
  if (code === 3) return "☁\uFE0F";
  if (code >= 45 && code <= 48) return "🌫\uFE0F";
  if ((code >= 51 && code <= 57) || code === 80) return "🌦\uFE0F";
  if ((code >= 61 && code <= 67) || (code >= 81 && code <= 82)) return "🌧\uFE0F";
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return "🌨\uFE0F";
  if (code >= 95) return "⛈\uFE0F";
  return "·";
}

function golfDayCall(precip: number, windMax: number, highC: number): string {
  if (precip >= 60) return "Rain likely. Bring layers or reschedule.";
  if (precip >= 30) return "Showers possible. Check back before you leave.";
  if (windMax >= 35) return "Serious wind. Playable, pick your clubs carefully.";
  if (highC < 8) return "Cold. Layer up; the ball won't travel.";
  if (highC >= 28 && windMax < 10) return "Hot and still. Bring water and a twilight tee time.";
  if (windMax < 15 && precip < 15 && highC >= 14) return "Excellent day to be out here.";
  return "A solid day for golf.";
}

// Translate the weather code into a faint hero background tint. Sub-8%
// opacity so the page still reads as paper.
function heroTint(code: number, isDay: 0 | 1 = 1): string {
  if (code === 0 || code === 1) {
    return isDay === 1
      ? "linear-gradient(180deg, rgba(200,155,60,0.07), rgba(245,242,234,0) 60%)"
      : "linear-gradient(180deg, rgba(43,42,40,0.06), rgba(245,242,234,0) 60%)";
  }
  if (code === 2 || code === 3 || (code >= 45 && code <= 48)) {
    return "linear-gradient(180deg, rgba(140,138,130,0.07), rgba(245,242,234,0) 60%)";
  }
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) {
    return "linear-gradient(180deg, rgba(43,42,40,0.06), rgba(245,242,234,0) 60%)";
  }
  return "linear-gradient(180deg, rgba(60,74,53,0.07), rgba(245,242,234,0) 60%)";
}

export default async function Conditions() {
  const forecast = await fetchBirchbankForecast();
  const bestWindow = forecast ? findBestWindow(forecast.hourly) : null;
  const bestDay = forecast ? findBestDay(forecast.daily) : null;
  const weekWindows = forecast ? findBestWindowsThisWeek(forecast.daily, 3) : [];

  if (!forecast) {
    return (
      <section className="pt-40 py-[var(--spacing-section)] bg-paper">
        <div className="container-edge max-w-2xl">
          <p className="eyebrow text-amber mb-3">Weather upstream unavailable</p>
          <h1 className="display-md font-display mb-5">Conditions feed paused.</h1>
          <p className="prose-editorial text-granite/85">
            The weather service is temporarily unreachable. For today's
            conditions and frost-delay status, call the Pro Shop at{" "}
            <a href="tel:+12506932255" className="link-editorial text-tamarack">
              250-693-2255
            </a>
            .
          </p>
        </div>
      </section>
    );
  }

  const today = forecast.daily[0];
  const todayCall = golfDayCall(today.precipProbMax, today.windMaxKmh, today.highC);
  const tint = heroTint(forecast.now.conditionCode, forecast.now.isDay);

  // Compute the week's high/low envelope so each daily card's range bar
  // can be drawn on a consistent scale.
  const weekHighs = forecast.daily.map((d) => d.highC);
  const weekLows = forecast.daily.map((d) => d.lowC);
  const weekMax = Math.max(...weekHighs);
  const weekMin = Math.min(...weekLows);
  const weekRange = Math.max(1, weekMax - weekMin);

  return (
    <>
      {/* HERO, the big read.
          Layered backdrop, back to front:
            1. NowPhoto background variant (current course "vibe", picked
               by conditionCode + isDay, ~18% opacity)
            2. Paper-fade gradient (stronger on the left where text sits,
               lighter on the right where the WindCompass sits) so the
               temperature + headline + Today's call all keep AA contrast
            3. Existing condition tint as a soft wash on top
            4. Content
          The right column is now just the WindCompass; the photo no
          longer sits beside it as a separate "the vibe" card. */}
      <section
        className="pt-32 md:pt-40 pb-20 bg-paper relative overflow-hidden"
        style={{ backgroundColor: "var(--color-paper)" }}
      >
        <NowPhoto
          conditionCode={forecast.now.conditionCode}
          isDay={forecast.now.isDay}
          variant="background"
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, var(--color-paper) 0%, rgba(245, 242, 234, 0.88) 40%, rgba(245, 242, 234, 0.45) 75%, rgba(245, 242, 234, 0.20) 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ background: tint }}
        />

        <div className="container-edge relative">
          <p className="eyebrow text-cedar mb-6">
            Live at Birchbank · Genelle, BC
          </p>

          <div className="grid gap-12 md:gap-16 lg:grid-cols-12 items-start">
            {/* Big temp + condition + call */}
            <div className="lg:col-span-7">
              <div className="flex items-start gap-6">
                <span
                  className="font-display text-granite leading-[0.85] tabular-nums"
                  style={{ fontSize: "clamp(4rem, 12vw, 9rem)" }}
                >
                  {forecast.now.tempC}°
                </span>
                <span
                  aria-hidden
                  className="font-mono text-cedar leading-none mt-3"
                  style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}
                >
                  {weatherGlyph(forecast.now.conditionCode, forecast.now.isDay)}
                </span>
              </div>
              <p
                className="mt-6 font-display text-granite leading-snug max-w-[20ch]"
                style={{ fontSize: "clamp(1.75rem, 3.4vw, 2.75rem)" }}
              >
                {forecast.now.conditionLabel}.
              </p>
              <p className="mt-4 font-mono text-sm text-silt">
                Today {today.lowC}° / {today.highC}° · precip {today.precipProbMax}% · {forecast.now.clubCall}
              </p>
              <div className="mt-8 border-l-2 border-tamarack pl-5 max-w-xl">
                <p className="eyebrow text-tamarack mb-3">Today's call</p>
                <p
                  className="font-display text-granite leading-snug"
                  style={{ fontSize: "clamp(1.5rem, 2.4vw + 0.5rem, 2.25rem)" }}
                >
                  {todayCall}
                </p>
                {bestWindow && (
                  <p className="mt-5 font-mono text-xs text-silt uppercase tracking-widest">
                    Best window today
                    <span className="block text-granite font-display text-lg normal-case tracking-normal mt-1">
                      {bestWindow.startLabel} to {bestWindow.endLabel}
                    </span>
                  </p>
                )}
              </div>
            </div>

            {/* Wind compass. The "vibe" photo moved to the section
                background (above), so the compass gets the full right
                column without competing for attention. */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
              <div className="w-[clamp(180px,62vw,300px)]">
                <p className="eyebrow mb-5 text-left lg:text-right">Wind</p>
                <WindCompass
                  bearing={forecast.now.windBearing}
                  kmh={forecast.now.windKmh}
                  cardinal={forecast.now.windCardinal}
                />
              </div>
            </div>
          </div>

          {/* Daylight strip */}
          <div className="mt-14 flex flex-wrap items-baseline gap-x-8 gap-y-2 font-mono text-xs uppercase tracking-widest text-silt">
            <span className="text-tamarack">Daylight</span>
            <span><span className="text-granite">↑ {today.sunrise}</span> sunrise</span>
            <span><span className="text-granite">↓ {today.sunset}</span> sunset</span>
            <span><span className="text-granite">{today.daylightHours} h</span> of light today</span>
          </div>
        </div>
      </section>

      {/* BEST WINDOWS THIS WEEK, the headline strip */}
      {weekWindows.length > 0 && (
        <section className="py-14 bg-paper border-t border-granite/10">
          <div className="container-edge">
            <div className="flex flex-wrap items-end justify-between gap-6 mb-8">
              <div>
                <p className="eyebrow text-tamarack mb-3">Best playing windows this week</p>
                <h2 className="display-md font-display max-w-[22ch]">
                  When the course will read best.
                </h2>
              </div>
            </div>
            <ol className="grid gap-5 md:grid-cols-3">
              {weekWindows.map((w, i) => (
                <li
                  key={w.index}
                  className="border border-granite/15 bg-paper p-5 md:p-6 rounded-sm relative"
                >
                  <span className="absolute top-4 right-5 font-mono text-[10px] uppercase tracking-widest text-tamarack">
                    {i === 0 ? "Top pick" : `#${i + 1}`}
                  </span>
                  <p className="font-display text-2xl md:text-3xl text-granite">
                    {w.dayLabel}
                  </p>
                  <p className="font-mono text-xs text-silt uppercase tracking-widest mt-2">
                    {w.whenLabel}
                  </p>
                  <p className="font-mono text-xs text-cedar mt-3">{w.reason}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      <div className="container-edge"><div className="rule-hair" /></div>

      {/* 24-HOUR OUTLOOK, chart + cards */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
            <div>
              <p className="eyebrow text-cedar mb-3">Next 24 hours</p>
              <h2 className="display-md font-display max-w-[20ch]">
                When the wind sits down today.
              </h2>
            </div>
            {bestWindow && (
              <div className="border border-tamarack/50 bg-tamarack/5 px-5 py-4 rounded-sm">
                <p className="font-mono text-[10px] uppercase tracking-widest text-tamarack mb-1">
                  Best 3 hours
                </p>
                <p className="font-display text-xl text-granite leading-tight">
                  {bestWindow.startLabel} to {bestWindow.endLabel}
                </p>
              </div>
            )}
          </div>

          {/* SVG chart */}
          <div className="border border-granite/15 bg-paper p-4 md:p-6 mb-8 overflow-hidden">
            <HourChart hourly={forecast.hourly} bestWindow={bestWindow} />
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-widest text-silt">
              <span className="inline-flex items-center gap-2">
                <span className="inline-block w-3 h-[2px] bg-tamarack" />
                Temperature
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="inline-block w-3 h-2 bg-cedar/30 rounded-sm" />
                Precipitation %
              </span>
              {bestWindow && (
                <span className="inline-flex items-center gap-2">
                  <span className="inline-block w-3 h-3 border border-tamarack/60 bg-tamarack/10" />
                  Best window
                </span>
              )}
              <span className="ml-auto text-silt/70 normal-case tracking-normal">Hover or tap for details.</span>
            </div>
          </div>

          {/* Hour cards (kept for at-a-glance scanning, best-window highlighted) */}
          <div className="overflow-x-auto -mx-4 px-4 pb-2">
            <ul className="flex gap-3 min-w-max">
              {forecast.hourly.map((h, i) => {
                const inBest =
                  bestWindow &&
                  i >= bestWindow.startIdx &&
                  i < bestWindow.endIdx;
                return (
                  <li
                    key={h.time}
                    className={
                      "w-[88px] shrink-0 p-3 text-center border " +
                      (inBest
                        ? "border-tamarack/60 bg-tamarack/5"
                        : "border-granite/15 bg-paper")
                    }
                  >
                    <p className="font-mono text-[10px] text-silt uppercase">
                      {h.hourLabel}
                    </p>
                    <p
                      aria-hidden
                      className="font-mono text-2xl text-cedar mt-2 leading-none"
                    >
                      {weatherGlyph(h.conditionCode, h.isDay)}
                    </p>
                    <p className="font-display text-xl text-granite mt-2">
                      {h.tempC}°
                    </p>
                    <p className="font-mono text-[10px] text-silt mt-2">
                      {h.precipProb}% · {h.windKmh}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
          <p className="font-mono text-xs text-silt mt-4">
            Scroll sideways for the full 24 hours.
          </p>
        </div>
      </section>

      {/* 7-DAY OUTLOOK */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge">
          <p className="eyebrow text-cedar mb-3">Next seven days</p>
          <h2 className="display-md font-display mb-10">
            Plan the week.
          </h2>

          {/* Best day callout */}
          {bestDay && (
            <div className="border border-tamarack/50 bg-tamarack/5 p-6 md:p-7 mb-8 grid gap-5 md:grid-cols-12 items-center">
              <div className="md:col-span-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-tamarack mb-2">
                  Best day this week
                </p>
                <p className="font-display text-3xl md:text-4xl text-granite">
                  {forecast.daily[bestDay.index].dayLabel}
                </p>
              </div>
              <div className="md:col-span-5">
                <p className="font-display text-xl text-granite leading-snug">
                  {forecast.daily[bestDay.index].conditionLabel} ·{" "}
                  {forecast.daily[bestDay.index].highC}° /{" "}
                  {forecast.daily[bestDay.index].lowC}°
                </p>
                <p className="font-mono text-xs text-silt uppercase tracking-widest mt-2">
                  {bestDay.reason}
                </p>
              </div>
              <div className="md:col-span-3 md:text-right">
                <BookButton />
              </div>
            </div>
          )}

          <ul className="divide-y divide-granite/15 border-t border-b border-granite/15">
            {forecast.daily.map((d, i) => {
              const isBest = bestDay && bestDay.index === i;
              const lowPct = ((d.lowC - weekMin) / weekRange) * 100;
              const highPct = ((d.highC - weekMin) / weekRange) * 100;
              return (
                <li
                  key={d.date}
                  className={
                    "grid grid-cols-12 gap-3 md:gap-5 py-5 items-center " +
                    (isBest ? "bg-tamarack/[0.04]" : "")
                  }
                >
                  <span className="col-span-3 md:col-span-2 font-display text-lg md:text-xl text-granite">
                    {d.dayLabel}
                  </span>
                  <span
                    aria-hidden
                    className="col-span-1 font-mono text-2xl md:text-3xl text-cedar leading-none text-center"
                  >
                    {weatherGlyph(d.conditionCode)}
                  </span>
                  <span className="col-span-5 md:col-span-3 font-mono text-xs md:text-sm text-silt">
                    {d.conditionLabel}
                  </span>
                  <span className="col-span-3 md:col-span-2 font-display text-base md:text-lg text-granite text-right md:text-left">
                    <span className="text-silt text-sm">{d.lowC}°</span>{" "}
                    <RangeBar lowPct={lowPct} highPct={highPct} />{" "}
                    {d.highC}°
                  </span>
                  <span className="hidden md:flex md:col-span-2 items-center gap-2 font-mono text-xs text-silt">
                    <PrecipBar pct={d.precipProbMax} />
                    {d.precipProbMax}%
                  </span>
                  <span className="hidden md:flex md:col-span-2 items-center gap-2 font-mono text-xs text-silt justify-end">
                    <WindBar kmh={d.windMaxKmh} />
                    {d.windMaxKmh} km/h
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* WIND MATTERS, mini guide to the club call */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge grid gap-10 md:grid-cols-12 items-start">
          <div className="md:col-span-5">
            <p className="eyebrow text-cedar mb-3">How we read the wind</p>
            <h2 className="display-md font-display max-w-[20ch] leading-tight">
              Every 10 km/h costs you about a club.
            </h2>
            <p className="prose-editorial text-granite/85 mt-5 max-w-md">
              Pro-shop folklore, not meteorology. We surface a one-line
              call so you know what to bring before you check in.
            </p>
          </div>
          <ul className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 font-mono text-sm">
            {[
              ["Under 5 km/h", "Calm."],
              ["5 to 14 km/h", "A one-club day."],
              ["15 to 24 km/h", "A two-club day."],
              ["25 to 34 km/h", "A three-club day."],
              ["35+ km/h", "A four-club day. Hold onto your hat."],
            ].map(([range, call]) => (
              <li key={range} className="flex flex-col gap-1">
                <span className="text-silt text-xs uppercase tracking-widest">
                  {range}
                </span>
                <span className="font-display text-lg text-granite normal-case tracking-normal">
                  {call}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* WHAT'S LIVE, WHAT'S NOT, honesty block */}
      <section className="py-[var(--spacing-section)] bg-cedar text-paper">
        <div className="container-edge grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow text-tamarack mb-5">What's live, what's not</p>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(1.75rem, 4.5vw, 2.75rem)",
                lineHeight: "1.05",
                letterSpacing: "-0.01em",
              }}
            >
              Honest about our data.
            </h2>
          </div>
          <div className="md:col-span-7 space-y-7">
            <div className="border-l-2 border-tamarack pl-5">
              <p className="font-display text-lg text-paper mb-1">
                Live via Open-Meteo (Environment Canada GEM)
              </p>
              <p className="text-paper/80 text-sm leading-relaxed">
                Temperature, wind speed and direction, precipitation, hourly
                and daily forecasts out to seven days. Updated every 15
                minutes.
              </p>
            </div>
            <div className="border-l-2 border-tamarack pl-5">
              <p className="font-display text-lg text-paper mb-1">
                From the Pro Shop
              </p>
              <p className="text-paper/80 text-sm leading-relaxed">
                Frost-delay status, cart-path-only calls, green-speed
                readings, fairway firmness. Judgment calls from the
                superintendent and Pro Shop staff, not numbers we'd invent
                on this page.
              </p>
              <a
                href="tel:+12506932255"
                className="block mt-2 text-tamarack underline hover:text-paper text-sm"
              >
                250-693-2255 · 8 am to dusk, 7 days
              </a>
            </div>
            <div className="border-l-2 border-tamarack pl-5">
              <p className="font-display text-lg text-paper mb-1">
                Season averages
              </p>
              <p className="text-paper/80 text-sm leading-relaxed">
                Peak Kootenay golf weather runs June 15 to September 15.
                Shoulder seasons play firmer and cooler. Average opening:
                April 1; average closing: October 31.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge text-center max-w-3xl mx-auto">
          <p className="eyebrow mb-6">Conditions look good. Go play.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <BookButton />
            <Link href="/rates" className="btn-ghost">Rates</Link>
            <Link href="/plan-your-visit" className="btn-ghost">
              Plan your visit →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function PrecipBar({ pct }: { pct: number }) {
  const w = Math.max(0, Math.min(100, pct));
  return (
    <span className="inline-block w-12 h-1.5 bg-granite/15 relative" aria-hidden>
      <span
        className="absolute inset-y-0 left-0 bg-cedar/60"
        style={{ width: `${w}%` }}
      />
    </span>
  );
}

function WindBar({ kmh }: { kmh: number }) {
  const w = Math.max(0, Math.min(100, (kmh / 40) * 100));
  return (
    <span className="inline-block w-12 h-1.5 bg-granite/15 relative" aria-hidden>
      <span
        className="absolute inset-y-0 left-0 bg-tamarack"
        style={{ width: `${w}%` }}
      />
    </span>
  );
}

/** A horizontal range strip showing the day's low to high relative to the week. */
function RangeBar({ lowPct, highPct }: { lowPct: number; highPct: number }) {
  const left = Math.max(0, Math.min(100, lowPct));
  const right = Math.max(0, Math.min(100, highPct));
  const width = Math.max(2, right - left);
  return (
    <span
      className="inline-block align-middle w-16 h-1 bg-granite/10 relative mx-1"
      aria-hidden
    >
      <span
        className="absolute inset-y-0 bg-tamarack rounded-full"
        style={{ left: `${left}%`, width: `${width}%` }}
      />
    </span>
  );
}
