"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useNow, getSeasonStatus } from "@/lib/season";
import type { WeatherSnapshot } from "@/lib/weather";

/**
 * "Birchbank Now" — sticky concierge strip.
 *
 * Once the visitor has scrolled past 80% of the first viewport, a slim
 * status strip slides down from beneath the header showing real-time
 * conditions: temperature, condition, wind, sunset, open/closed status,
 * plus a single Book CTA that triggers the existing Chronogolf widget.
 *
 * Strict accuracy: every datum here is derived from data we already
 * have (the /api/weather snapshot + the season status helper). We do
 * NOT fabricate greens speed, fairway firmness, or tee-time availability.
 *
 * Hidden on /book (Chronogolf already dominates), /studio (admin), and
 * /conditions (the page itself is the long version of this strip).
 */
const HIDDEN_ROUTES = ["/book", "/studio", "/conditions"];

export default function StatusBar() {
  const pathname = usePathname();
  const now = useNow();
  const season = now ? getSeasonStatus(now) : null;
  const open = season?.label === "Open";

  const [weather, setWeather] = useState<WeatherSnapshot | null>(null);
  const [visible, setVisible] = useState(false);

  // Fetch the same /api/weather endpoint the ConditionsWidget uses.
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch("/api/weather");
        if (!res.ok) return;
        const data = (await res.json()) as WeatherSnapshot;
        if (!cancelled) setWeather(data);
      } catch {
        /* degrade silently */
      }
    };
    load();
    const id = setInterval(load, 15 * 60 * 1000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  // Reveal threshold:
  //   - Home (/) has the BallIntoHoleHero — keep the bar back until the
  //     visitor has truly engaged with the hero (80% of first viewport).
  //   - Every other page has no full-bleed hero, so a small 200px floor
  //     is enough to prevent the bar from competing with the page header
  //     on first paint.
  useEffect(() => {
    const isHome = pathname === "/";
    const threshold = isHome ? Math.round(window.innerHeight * 0.8) : 200;
    const onScroll = () => {
      setVisible(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (HIDDEN_ROUTES.some((r) => pathname === r || pathname.startsWith(r + "/"))) {
    return null;
  }
  if (!season) return null;

  // Trigger the Chronogolf widget (matches the .chrono-bookingbutton hook
  // pattern used elsewhere on the site).
  const handleBook = (e: React.MouseEvent) => {
    e.preventDefault();
    const trigger = document.querySelector<HTMLElement>(".chrono-bookingbutton");
    trigger?.click();
  };

  return (
    <div
      role="status"
      aria-live="polite"
      data-visible={visible}
      className="status-bar"
    >
      <div className="status-bar__inner">
        <span className="status-bar__brand">BIRCHBANK</span>

        {open ? (
          <>
            {weather && (
              <>
                <span className="status-bar__sep" aria-hidden />
                <span className="status-bar__item status-bar__temp">
                  {weather.tempC}°<span className="status-bar__hide-sm"> {weather.conditionLabel.toUpperCase()}</span>
                </span>
                <span className="status-bar__sep status-bar__hide-sm" aria-hidden />
                <span className="status-bar__item status-bar__hide-sm">
                  WIND {weather.windCardinal} {weather.windKmh} KM/H
                </span>
                <span className="status-bar__sep" aria-hidden />
                <span className="status-bar__item">↓{weather.sunset.replace(/\s/g, "")}</span>
              </>
            )}
            <span className="status-bar__sep" aria-hidden />
            <span className="status-bar__pill status-bar__pill--open">OPEN</span>
            <span className="status-bar__sep" aria-hidden />
            <a
              href="/book"
              onClick={handleBook}
              className="status-bar__cta"
              data-cursor-target
            >
              → BOOK A TEE TIME
            </a>
          </>
        ) : (
          <>
            <span className="status-bar__sep" aria-hidden />
            <span className="status-bar__pill status-bar__pill--closed">CLOSED</span>
            <span className="status-bar__sep" aria-hidden />
            <a href="/conditions" className="status-bar__cta" data-cursor-target>
              → CONDITIONS
            </a>
          </>
        )}
      </div>
    </div>
  );
}
