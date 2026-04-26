"use client";

import { useEffect, useState } from "react";
import { useNow, getSeasonStatus } from "@/lib/season";
import type { WeatherSnapshot } from "@/lib/weather";
import CountUp from "@/components/CountUp";
import WindCompass from "@/components/WindCompass";

/**
 * Honest "Today at Birchbank" widget.
 *
 * Weather data is sourced from Open-Meteo (Environment Canada's GEM
 * model), fetched via our own /api/weather route which caches 15 minutes
 * at the edge. If the upstream fails, we degrade gracefully, the season
 * + hours block stays visible without fabricating any number.
 *
 * Season utilities (useNow, getSeasonStatus) are shared with AnchorReveal
 * via src/lib/season.ts.
 */

// Colored emoji glyphs. The isDay flag swaps clear / mostly-clear /
// partly-cloudy day icons for nighttime counterparts so 11 PM doesn't
// render as a sun.
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

// Translate the weather code into a faint background wash (kept under 8%
// opacity so the card still reads as paper).
function conditionWash(code: number, isDay: 0 | 1 = 1): string {
  if (code === 0 || code === 1) {
    // Clear: faint amber wash by day, faint granite by night.
    return isDay === 1
      ? "linear-gradient(180deg, rgba(200,155,60,0.07), rgba(245,242,234,0) 65%)"
      : "linear-gradient(180deg, rgba(43,42,40,0.06), rgba(245,242,234,0) 65%)";
  }
  if (code === 2 || code === 3 || (code >= 45 && code <= 48)) {
    // Cloudy / fog: faint silt wash.
    return "linear-gradient(180deg, rgba(140,138,130,0.06), rgba(245,242,234,0) 65%)";
  }
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) {
    // Snow: faint granite wash.
    return "linear-gradient(180deg, rgba(43,42,40,0.06), rgba(245,242,234,0) 65%)";
  }
  // Rain / showers / drizzle / storms: faint cedar wash.
  return "linear-gradient(180deg, rgba(60,74,53,0.07), rgba(245,242,234,0) 65%)";
}

export default function ConditionsWidget() {
  const now = useNow();
  const season = now ? getSeasonStatus(now) : { label: "Season", detail: "April 1 – October 31" };
  const day = now ? now.toLocaleDateString("en-CA", { weekday: "long", month: "long", day: "numeric" }) : "";
  const time = now ? now.toLocaleTimeString("en-CA", { hour: "numeric", minute: "2-digit" }) : "";
  const open = season.label === "Open";

  const [weather, setWeather] = useState<WeatherSnapshot | null>(null);
  const [glow, setGlow] = useState(false);
  useEffect(() => {
    let cancelled = false;
    let isFirst = true;
    const load = async () => {
      try {
        const res = await fetch("/api/weather");
        if (!res.ok) return;
        const data = (await res.json()) as WeatherSnapshot;
        if (cancelled) return;
        setWeather(data);
        if (!isFirst) {
          setGlow(true);
          setTimeout(() => setGlow(false), 3800);
        }
        isFirst = false;
      } catch {
        /* degrade silently, season + hours stay visible */
      }
    };
    load();
    const id = setInterval(load, 15 * 60 * 1000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  const [tickNow, setTickNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setTickNow(Date.now()), 30 * 1000);
    return () => clearInterval(id);
  }, []);
  const updatedLabel = (() => {
    if (!weather?.fetchedAt) return null;
    const ageSec = Math.max(0, Math.floor((tickNow - new Date(weather.fetchedAt).getTime()) / 1000));
    if (ageSec < 45) return "Updated just now";
    const minutes = Math.round(ageSec / 60);
    if (minutes < 60) return `Updated ${minutes} min ago`;
    const hours = Math.round(minutes / 60);
    return `Updated ${hours} h ago`;
  })();

  // Derive the condition wash once the weather has arrived.
  const wash = weather ? conditionWash(weather.conditionCode, weather.isDay) : null;

  return (
    <aside
      id="conditions-widget"
      aria-label="Live at Birchbank"
      aria-live="polite"
      data-glow={glow ? "true" : "false"}
      className="conditions-widget border border-granite/15 bg-paper rounded-sm p-6 md:p-7 scroll-mt-32 relative overflow-hidden"
    >
      {/* Conditional background wash, sub-8% opacity, behind everything else. */}
      {wash && (
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ background: wash, transition: "background 800ms ease-out" }}
        />
      )}
      <div className="relative">
        <div className="flex items-center justify-between mb-5">
          <p className="eyebrow text-cedar">Live at Birchbank</p>
          <div className="flex items-center gap-2 font-mono text-xs text-silt">
            {open ? (
              <span className="relative inline-flex w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-cedar animate-pulse-live" />
                <span className="relative inline-flex rounded-full w-2 h-2 bg-cedar" />
              </span>
            ) : (
              <span className="relative inline-flex rounded-full w-2 h-2 bg-silt" />
            )}
            {open ? "Live" : "Closed"}
          </div>
        </div>

        <p className="font-mono text-sm text-silt mb-1">{day || <span>&nbsp;</span>}</p>
        <p className="font-mono text-sm text-silt mb-5">{time || <span>&nbsp;</span>}</p>

        {/* Live weather block. Uses CountUp for the temperature so it eases in
          on first arrival and on each refresh. WindCompass sits to the right
          (compact 96 px) so visitors get a feel for wind without clicking
          through to /conditions. */}
        <div className="min-h-[148px] mb-5">
          {weather ? (
            <>
              <div className="flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-5xl text-granite leading-none">
                      <CountUp value={weather.tempC} />°
                    </span>
                    <span className="text-silt text-sm">
                      <span className="font-mono text-lg mr-2 text-cedar">{weatherGlyph(weather.conditionCode, weather.isDay)}</span>
                      {weather.conditionLabel}
                    </span>
                  </div>
                  <p className="mt-3 font-mono text-xs text-silt">
                    <span className="text-cedar">{weather.clubCall}</span>
                  </p>
                  <p className="mt-1 font-mono text-xs text-silt">
                    Today: <span className="text-granite">{weather.today.lowC}° / {weather.today.highC}°</span>
                    <span className="mx-2 text-silt/40">·</span>
                    <span className="text-granite">{weather.today.precipProbMax}%</span> precip
                  </p>
                  <p className="mt-1 font-mono text-xs text-silt">
                    Tomorrow: <span className="text-granite">{weather.tomorrow.conditionLabel.toLowerCase()},</span>{" "}
                    <span className="text-granite">{weather.tomorrow.lowC}° / {weather.tomorrow.highC}°</span>
                  </p>
                </div>
                <div className="shrink-0">
                  <WindCompass
                    bearing={weather.windBearing}
                    kmh={weather.windKmh}
                    cardinal={weather.windCardinal}
                    size={96}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col justify-center gap-1" aria-hidden="true">
              <p className="font-mono text-xs text-silt/60">Loading conditions…</p>
            </div>
          )}
        </div>

        <dl className="grid grid-cols-2 gap-y-5 gap-x-6 font-mono text-sm border-t border-granite/10 pt-5">
          <div className="col-span-2">
            <dt className="text-silt text-xs uppercase tracking-widest mb-1">Season</dt>
            <dd className="font-display text-xl text-granite">{season.label}</dd>
            <dd className="text-silt text-xs mt-1">{season.detail}</dd>
          </div>

          <div>
            <dt className="text-silt text-xs uppercase tracking-widest mb-1">Pro Shop</dt>
            <dd className="font-display text-lg text-granite">8 am to dusk</dd>
            <dd className="text-silt text-xs mt-0.5">7 days</dd>
          </div>

          <div>
            <dt className="text-silt text-xs uppercase tracking-widest mb-1">The Bistro</dt>
            <dd className="font-display text-lg text-granite">10 am – 6 pm</dd>
            <dd className="text-silt text-xs mt-0.5">7 days · licensed</dd>
          </div>
        </dl>

        <a
          href="tel:+12506932255"
          className="mt-4 inline-flex items-center min-h-[44px] py-2 text-sm text-amber hover:underline font-mono"
        >
          Call the Pro Shop · 250-693-2255 →
        </a>
        {updatedLabel && (
          <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-silt/70">
            {updatedLabel}
          </p>
        )}
      </div>
    </aside>
  );
}
