"use client";

import { useEffect, useState } from "react";

/**
 * Honest "Today at Birchbank" widget.
 *
 * Everything shown here is a provable fact we control:
 *   • Current date / time (from the visitor's device, updated every minute)
 *   • Season status — derived from the published April 1 → October 31 window
 *   • Pro Shop and Bistro hours — from the Contacts page
 *
 * No invented green-speed / wind / firmness numbers. When real course-status
 * data is wired up (frost delays, cart-path-only days, live weather) this
 * widget's data sources become the place to plug it in.
 */

function useNow() {
  // Initial state is null so SSR and first client render agree — if we
  // seed with `new Date()` the server's Date and the hydrating client's
  // Date differ, which triggers React hydration-mismatch warning #418.
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const tick = () => setNow(new Date());
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function getSeasonStatus(now: Date) {
  const year = now.getFullYear();
  const openDate = new Date(`${year}-04-01T00:00:00`);
  const closeDate = new Date(`${year}-10-31T23:59:59`);
  const msInDay = 1000 * 60 * 60 * 24;

  if (now < openDate) {
    const daysUntil = Math.ceil((openDate.getTime() - now.getTime()) / msInDay);
    return { label: "Opens soon", detail: `${daysUntil} day${daysUntil === 1 ? "" : "s"} until the ${year} season opens` };
  }
  if (now > closeDate) {
    const nextOpen = new Date(`${year + 1}-04-01T00:00:00`);
    const daysUntil = Math.ceil((nextOpen.getTime() - now.getTime()) / msInDay);
    return { label: "Closed for the season", detail: `${year + 1} season opens in ${daysUntil} day${daysUntil === 1 ? "" : "s"}` };
  }

  const daysInto = Math.floor((now.getTime() - openDate.getTime()) / msInDay) + 1;
  const daysLeft = Math.floor((closeDate.getTime() - now.getTime()) / msInDay);
  return { label: "Open", detail: `Day ${daysInto} of 213 · ${daysLeft} day${daysLeft === 1 ? "" : "s"} remaining this season` };
}

export default function ConditionsWidget() {
  const now = useNow();
  // Before first client render `now` is null — render neutral placeholder
  // strings that don't depend on Date-of-now, so SSR and hydration agree.
  const season = now ? getSeasonStatus(now) : { label: "Season", detail: "April 1 – October 31" };
  const day = now ? now.toLocaleDateString("en-CA", { weekday: "long", month: "long", day: "numeric" }) : "";
  const time = now ? now.toLocaleTimeString("en-CA", { hour: "numeric", minute: "2-digit" }) : "";
  const open = season.label === "Open";

  return (
    <aside
      aria-label="Today at Birchbank"
      aria-live="polite"
      className="border border-granite/15 bg-paper rounded-sm p-6 md:p-7"
    >
      <div className="flex items-center justify-between mb-5">
        <p className="eyebrow text-cedar">Today at Birchbank</p>
        <div className="flex items-center gap-2 font-mono text-xs text-silt">
          <span className="relative inline-flex w-2 h-2">
            {open && <span className="absolute inset-0 rounded-full bg-cedar animate-pulse-live" />}
            <span className={`relative inline-flex rounded-full w-2 h-2 ${open ? "bg-cedar" : "bg-silt"}`} />
          </span>
          {open ? "Live" : "Closed"}
        </div>
      </div>

      <p className="font-mono text-sm text-silt mb-1">{day || <span>&nbsp;</span>}</p>
      <p className="font-mono text-sm text-silt mb-5">{time || <span>&nbsp;</span>}</p>

      <dl className="grid grid-cols-2 gap-y-5 gap-x-6 font-mono text-sm">
        <div className="col-span-2">
          <dt className="text-silt text-xs uppercase tracking-widest mb-1">Season</dt>
          <dd className="font-display text-2xl text-granite">{season.label}</dd>
          <dd className="text-silt text-xs mt-1">{season.detail}</dd>
        </div>

        <div>
          <dt className="text-silt text-xs uppercase tracking-widest mb-1">Pro Shop</dt>
          <dd className="font-display text-lg text-granite">9 am – 7 pm</dd>
          <dd className="text-silt text-xs mt-0.5">7 days</dd>
        </div>

        <div>
          <dt className="text-silt text-xs uppercase tracking-widest mb-1">The Bistro</dt>
          <dd className="font-display text-lg text-granite">12 – 5 pm</dd>
          <dd className="text-silt text-xs mt-0.5">7 days · licensed</dd>
        </div>
      </dl>

      <a
        href="tel:+12506932255"
        className="mt-6 inline-block text-xs text-amber hover:underline font-mono"
      >
        Call for today's conditions · 250-693-2255 →
      </a>
    </aside>
  );
}
