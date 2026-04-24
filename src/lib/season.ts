/**
 * Birchbank season status, shared by ConditionsWidget and AnchorReveal.
 *
 * The course runs April 1 -> October 31 every year, explicitly documented as
 * "213 days" on birchbankgolf.com. This module turns a Date into a loud
 * single-line status: Day N of 213, N days until open, N days until next
 * season, etc. Everything here is derivable from the visitor's device clock;
 * no API calls, no fabricated green-speed / wind / firmness numbers.
 */

import { useEffect, useState } from "react";

export type SeasonStatus = {
  label: "Open" | "Opens soon" | "Closed for the season" | "Season";
  detail: string;
  dayOfSeason?: number;
  daysRemaining?: number;
};

/**
 * React hook, returns the current Date, updating every minute.
 *
 * Initial state is intentionally null so SSR and first client render
 * agree. Seeding with `new Date()` would trigger hydration mismatch #418
 * because the server's Date and the client's Date are inherently different.
 */
export function useNow(): Date | null {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export function getSeasonStatus(now: Date): SeasonStatus {
  const year = now.getFullYear();
  const openDate = new Date(`${year}-04-01T00:00:00`);
  const closeDate = new Date(`${year}-10-31T23:59:59`);
  const msInDay = 1000 * 60 * 60 * 24;

  if (now < openDate) {
    const daysUntil = Math.ceil((openDate.getTime() - now.getTime()) / msInDay);
    return {
      label: "Opens soon",
      detail: `${daysUntil} day${daysUntil === 1 ? "" : "s"} until the ${year} season opens`,
    };
  }
  if (now > closeDate) {
    const nextOpen = new Date(`${year + 1}-04-01T00:00:00`);
    const daysUntil = Math.ceil((nextOpen.getTime() - now.getTime()) / msInDay);
    return {
      label: "Closed for the season",
      detail: `${year + 1} season opens in ${daysUntil} day${daysUntil === 1 ? "" : "s"}`,
    };
  }

  const dayOfSeason = Math.floor((now.getTime() - openDate.getTime()) / msInDay) + 1;
  const daysRemaining = Math.floor((closeDate.getTime() - now.getTime()) / msInDay);
  return {
    label: "Open",
    detail: `Day ${dayOfSeason} of 213 · ${daysRemaining} day${daysRemaining === 1 ? "" : "s"} remaining this season`,
    dayOfSeason,
    daysRemaining,
  };
}
