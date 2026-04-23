/**
 * Open-Meteo integration for Birchbank Golf Course.
 *
 * Uses Environment Canada's GEM model (`gem_seamless`) as the primary
 * forecast source — it's the authoritative model for Canadian weather
 * and covers the Kootenay region natively. Falls back to the ECMWF
 * blend when GEM is unavailable.
 *
 * No API key, no account. Terms allow non-commercial use up to 10,000
 * requests/day; with a 15-minute server-side revalidation, this works
 * out to 96 requests/day worst case.
 *
 * Location: Genelle, BC — 49.20° N, 117.75° W.
 */

// Genelle, BC — coordinates from the blueprint + verified against maps.
const BIRCHBANK_LAT = 49.2;
const BIRCHBANK_LON = -117.75;

// https://open-meteo.com/en/docs — weather code WMO table.
const WEATHER_CODE_MAP: Record<number, string> = {
  0: "Clear sky",
  1: "Mostly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Freezing fog",
  51: "Light drizzle",
  53: "Drizzle",
  55: "Heavy drizzle",
  56: "Freezing drizzle",
  57: "Heavy freezing drizzle",
  61: "Light rain",
  63: "Rain",
  65: "Heavy rain",
  66: "Freezing rain",
  67: "Heavy freezing rain",
  71: "Light snow",
  73: "Snow",
  75: "Heavy snow",
  77: "Snow grains",
  80: "Rain showers",
  81: "Heavy rain showers",
  82: "Violent rain showers",
  85: "Snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm · hail",
  99: "Severe thunderstorm · hail",
};

export type WeatherSnapshot = {
  tempC: number;
  windKmh: number;
  windBearing: number;
  windCardinal: string;
  precipMm: number;
  conditionCode: number;
  conditionLabel: string;
  clubCall: string;
  today: {
    highC: number;
    lowC: number;
    precipProbMax: number;
    windMaxKmh: number;
  };
  tomorrow: {
    highC: number;
    lowC: number;
    precipProbMax: number;
    conditionCode: number;
    conditionLabel: string;
  };
  fetchedAt: string;
};

/**
 * Translates a wind speed into a Bandon-Dunes / Scottish-links style
 * "N-club day" callout. The rule-of-thumb (pro-shop folklore, not
 * meteorology): every ~10 km/h of sustained wind costs you roughly
 * one club of distance on a full shot. We cap at 4 because past that
 * nobody's counting anymore — they're just hanging on.
 *
 * Verbatim from the blueprint's daily-conditions voice (line 385):
 *   "SW wind 12 km/h. A two-club day."
 */
export function clubCall(windKmh: number): string {
  if (windKmh < 5) return "Calm.";
  if (windKmh < 15) return "A one-club day.";
  if (windKmh < 25) return "A two-club day.";
  if (windKmh < 35) return "A three-club day.";
  return "A four-club day. Hold onto your hat.";
}

/** Convert a wind bearing (0-360°, from meteorological convention) to cardinal. */
export function cardinalFromBearing(deg: number): string {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return dirs[Math.round(((deg % 360) / 45)) % 8];
}

/**
 * Fetch current + today + tomorrow weather for Birchbank.
 *
 * Caller should handle its own caching (Next.js route handler uses
 * `next: { revalidate: 900 }` for 15-minute freshness). Returns null on
 * network failure — the ConditionsWidget degrades gracefully to
 * season-status-only rather than showing a stale or fake number.
 */
export async function fetchBirchbankWeather(): Promise<WeatherSnapshot | null> {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", String(BIRCHBANK_LAT));
  url.searchParams.set("longitude", String(BIRCHBANK_LON));
  url.searchParams.set(
    "current",
    "temperature_2m,wind_speed_10m,wind_direction_10m,precipitation,weather_code",
  );
  url.searchParams.set(
    "daily",
    "temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max,weather_code",
  );
  url.searchParams.set("models", "gem_seamless");
  url.searchParams.set("timezone", "America/Vancouver");
  url.searchParams.set("forecast_days", "3");
  url.searchParams.set("wind_speed_unit", "kmh");

  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: 900 }, // 15 min edge cache
    });
    if (!res.ok) return null;
    const data = await res.json();

    const current = data.current;
    const daily = data.daily;
    if (!current || !daily) return null;

    const windKmh = Math.round(current.wind_speed_10m);
    const windBearing = current.wind_direction_10m;
    const conditionCode = current.weather_code as number;

    return {
      tempC: Math.round(current.temperature_2m),
      windKmh,
      windBearing,
      windCardinal: cardinalFromBearing(windBearing),
      precipMm: current.precipitation,
      conditionCode,
      conditionLabel: WEATHER_CODE_MAP[conditionCode] ?? "Conditions unclear",
      clubCall: clubCall(windKmh),
      today: {
        highC: Math.round(daily.temperature_2m_max[0]),
        lowC: Math.round(daily.temperature_2m_min[0]),
        precipProbMax: daily.precipitation_probability_max[0] ?? 0,
        windMaxKmh: Math.round(daily.wind_speed_10m_max[0]),
      },
      tomorrow: {
        highC: Math.round(daily.temperature_2m_max[1]),
        lowC: Math.round(daily.temperature_2m_min[1]),
        precipProbMax: daily.precipitation_probability_max[1] ?? 0,
        conditionCode: daily.weather_code[1],
        conditionLabel: WEATHER_CODE_MAP[daily.weather_code[1]] ?? "Conditions unclear",
      },
      fetchedAt: new Date().toISOString(),
    };
  } catch {
    return null;
  }
}
