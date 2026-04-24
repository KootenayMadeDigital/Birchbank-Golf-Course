import { NextResponse } from "next/server";
import { fetchBirchbankWeather } from "@/lib/weather";

/**
 * GET /api/weather, returns the current Birchbank weather snapshot.
 *
 * Served from Next.js's data cache at the edge; revalidates every 15
 * minutes via the fetch call inside fetchBirchbankWeather. Upstream
 * failures degrade to 503 with a small JSON body; the client widget
 * handles that by hiding weather-specific rows and keeping the
 * season / hours block visible.
 */
export const revalidate = 900;

export async function GET() {
  const snapshot = await fetchBirchbankWeather();
  if (!snapshot) {
    return NextResponse.json(
      { error: "Weather upstream unavailable" },
      { status: 503 },
    );
  }
  return NextResponse.json(snapshot, {
    headers: {
      "Cache-Control": "public, s-maxage=900, stale-while-revalidate=3600",
    },
  });
}
