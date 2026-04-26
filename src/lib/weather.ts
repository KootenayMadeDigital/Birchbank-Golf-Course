/**
 * Open-Meteo integration for Birchbank Golf Course.
 *
 * Uses Environment Canada's GEM model (`gem_seamless`) as the primary
 * forecast source, it's the authoritative model for Canadian weather
 * and covers the Kootenay region natively. Falls back to the ECMWF
 * blend when GEM is unavailable.
 *
 * No API key, no account. Terms allow non-commercial use up to 10,000
 * requests/day; with a 15-minute server-side revalidation, this works
 * out to 96 requests/day worst case.
 *
 * Location: Genelle, BC, 49.20° N, 117.75° W.
 */

// Genelle, BC, coordinates from the blueprint + verified against maps.
const BIRCHBANK_LAT = 49.2;
const BIRCHBANK_LON = -117.75;

// https://open-meteo.com/en/docs, weather code WMO table.
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
  /** 1 if the snapshot timestamp is daytime, 0 otherwise. */
  isDay: 0 | 1;
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
  /** Today's sunrise / sunset, as wall-clock times in America/Vancouver. */
  sunrise: string;
  sunset: string;
  fetchedAt: string;
};

/**
 * Translates a wind speed into a Bandon-Dunes / Scottish-links style
 * "N-club day" callout. The rule-of-thumb (pro-shop folklore, not
 * meteorology): every ~10 km/h of sustained wind costs you roughly
 * one club of distance on a full shot. We cap at 4 because past that
 * nobody's counting anymore, they're just hanging on.
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
 * network failure, the ConditionsWidget degrades gracefully to
 * season-status-only rather than showing a stale or fake number.
 */
export async function fetchBirchbankWeather(): Promise<WeatherSnapshot | null> {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", String(BIRCHBANK_LAT));
  url.searchParams.set("longitude", String(BIRCHBANK_LON));
  url.searchParams.set(
    "current",
    "temperature_2m,wind_speed_10m,wind_direction_10m,precipitation,weather_code,is_day",
  );
  url.searchParams.set(
    "daily",
    "temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max,weather_code,sunrise,sunset",
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
    const sunFmt = (iso: string) =>
      new Date(iso).toLocaleTimeString("en-CA", { hour: "numeric", minute: "2-digit" });

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
      isDay: (current.is_day ?? 1) as 0 | 1,
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
      sunrise: sunFmt(daily.sunrise[0]),
      sunset: sunFmt(daily.sunset[0]),
      fetchedAt: new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export type ForecastDay = {
  date: string;
  dayLabel: string;
  highC: number;
  lowC: number;
  precipProbMax: number;
  windMaxKmh: number;
  conditionCode: number;
  conditionLabel: string;
  clubCall: string;
  sunrise: string;
  sunset: string;
  daylightHours: number;
};

export type HourlyPoint = {
  time: string;
  hourLabel: string;
  tempC: number;
  precipProb: number;
  windKmh: number;
  conditionCode: number;
  /** 1 if the hour is daytime (between sunrise and sunset), 0 otherwise. */
  isDay: 0 | 1;
};

export type ForecastSnapshot = {
  now: {
    tempC: number;
    windKmh: number;
    windBearing: number;
    windCardinal: string;
    conditionCode: number;
    conditionLabel: string;
    clubCall: string;
    isDay: 0 | 1;
  };
  hourly: HourlyPoint[];
  daily: ForecastDay[];
  fetchedAt: string;
};

/**
 * Fetch an extended 7-day + hourly forecast for the /conditions dashboard.
 *
 * Returns:
 *   - Current conditions (same shape as the home widget)
 *   - Next 24 hours of hourly data (temp, precip%, wind, condition code)
 *   - Next 7 days of daily outlook (high, low, precip%, wind, sunrise/sunset)
 *
 * Uses the same /v1/forecast endpoint with different hourly/daily params
 * so we keep to a single upstream request per page render.
 */
export async function fetchBirchbankForecast(): Promise<ForecastSnapshot | null> {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", String(BIRCHBANK_LAT));
  url.searchParams.set("longitude", String(BIRCHBANK_LON));
  url.searchParams.set(
    "current",
    "temperature_2m,wind_speed_10m,wind_direction_10m,weather_code,is_day",
  );
  url.searchParams.set(
    "hourly",
    "temperature_2m,precipitation_probability,wind_speed_10m,weather_code,is_day",
  );
  url.searchParams.set(
    "daily",
    "temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max,weather_code,sunrise,sunset,daylight_duration",
  );
  url.searchParams.set("models", "gem_seamless");
  url.searchParams.set("timezone", "America/Vancouver");
  url.searchParams.set("forecast_days", "7");
  url.searchParams.set("wind_speed_unit", "kmh");

  try {
    const res = await fetch(url.toString(), { next: { revalidate: 900 } });
    if (!res.ok) return null;
    const data = await res.json();
    const c = data.current;
    const h = data.hourly;
    const d = data.daily;
    if (!c || !h || !d) return null;

    // Build next 24 hours starting from the current hour.
    const nowIso = c.time; // e.g. "2026-04-23T14:00"
    const nowIdx = h.time.findIndex((t: string) => t >= nowIso);
    const startIdx = nowIdx < 0 ? 0 : nowIdx;
    const endIdx = Math.min(startIdx + 24, h.time.length);
    const hourly: HourlyPoint[] = [];
    for (let i = startIdx; i < endIdx; i++) {
      const t = new Date(h.time[i]);
      hourly.push({
        time: h.time[i],
        hourLabel: t.toLocaleTimeString("en-CA", { hour: "numeric", hour12: true }).replace(/\s?[AP]M/i, (m) => m.toLowerCase().trim()),
        tempC: Math.round(h.temperature_2m[i]),
        precipProb: h.precipitation_probability?.[i] ?? 0,
        isDay: (h.is_day?.[i] ?? 1) as 0 | 1,
        windKmh: Math.round(h.wind_speed_10m[i]),
        conditionCode: h.weather_code[i],
      });
    }

    const daily: ForecastDay[] = [];
    for (let i = 0; i < d.time.length; i++) {
      const dt = new Date(d.time[i] + "T12:00");
      const windMax = Math.round(d.wind_speed_10m_max[i]);
      daily.push({
        date: d.time[i],
        dayLabel: i === 0 ? "Today" : i === 1 ? "Tomorrow" : dt.toLocaleDateString("en-CA", { weekday: "long" }),
        highC: Math.round(d.temperature_2m_max[i]),
        lowC: Math.round(d.temperature_2m_min[i]),
        precipProbMax: d.precipitation_probability_max?.[i] ?? 0,
        windMaxKmh: windMax,
        conditionCode: d.weather_code[i],
        conditionLabel: WEATHER_CODE_MAP[d.weather_code[i]] ?? "Conditions unclear",
        clubCall: clubCall(windMax),
        sunrise: new Date(d.sunrise[i]).toLocaleTimeString("en-CA", { hour: "numeric", minute: "2-digit" }),
        sunset: new Date(d.sunset[i]).toLocaleTimeString("en-CA", { hour: "numeric", minute: "2-digit" }),
        daylightHours: Math.round((d.daylight_duration[i] / 3600) * 10) / 10,
      });
    }

    return {
      now: {
        tempC: Math.round(c.temperature_2m),
        windKmh: Math.round(c.wind_speed_10m),
        windBearing: Math.round(c.wind_direction_10m),
        windCardinal: cardinalFromBearing(c.wind_direction_10m),
        conditionCode: c.weather_code,
        conditionLabel: WEATHER_CODE_MAP[c.weather_code] ?? "Conditions unclear",
        clubCall: clubCall(Math.round(c.wind_speed_10m)),
        isDay: (c.is_day ?? 1) as 0 | 1,
      },
      hourly,
      daily,
      fetchedAt: new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

/**
 * Find the best 3-hour playing window in the next 12 daytime hours.
 * Scoring: lower precip + manageable wind + comfortable temperature wins.
 * Returns null if nothing in the upcoming hourly stretch reads "good."
 */
export function findBestWindow(hourly: HourlyPoint[]): {
  startIdx: number;
  endIdx: number;
  startLabel: string;
  endLabel: string;
} | null {
  const windowSize = 3;
  const horizon = Math.min(hourly.length, 14);
  if (horizon < windowSize) return null;

  let bestScore = Infinity;
  let bestStart = -1;
  for (let i = 0; i + windowSize <= horizon; i++) {
    let score = 0;
    for (let j = 0; j < windowSize; j++) {
      const h = hourly[i + j];
      // Penalize heavy precip
      score += (h.precipProb ?? 0) * 1.4;
      // Penalize strong wind
      score += Math.max(0, h.windKmh - 12) * 1.6;
      // Penalize uncomfortable temps (sweet spot 14–24°C)
      if (h.tempC < 8) score += (8 - h.tempC) * 4;
      else if (h.tempC < 14) score += (14 - h.tempC) * 2;
      else if (h.tempC > 28) score += (h.tempC - 28) * 3;
    }
    if (score < bestScore) {
      bestScore = score;
      bestStart = i;
    }
  }
  if (bestStart < 0) return null;
  return {
    startIdx: bestStart,
    endIdx: bestStart + windowSize,
    startLabel: hourly[bestStart].hourLabel,
    endLabel: hourly[bestStart + windowSize - 1].hourLabel,
  };
}

/**
 * Find the top N best playing windows across the week from the daily
 * outlook. Each window is one day; the "when" within the day is a coarse
 * call (morning if the high arrives midday and wind is calm; afternoon
 * if winds peak early and settle; otherwise just "all day").
 *
 * Used by the /conditions page hero to surface 2-3 specific recommendations
 * like "Tomorrow morning, 7 to 10 a.m." without requiring an extra API call.
 */
export function findBestWindowsThisWeek(
  daily: ForecastDay[],
  topN = 3,
): Array<{ index: number; dayLabel: string; whenLabel: string; reason: string }> {
  if (daily.length === 0) return [];
  const scored = daily.map((d, i) => {
    let score = 0;
    score += (d.precipProbMax ?? 0) * 1.4;
    score += Math.max(0, d.windMaxKmh - 14) * 1.6;
    if (d.highC < 10) score += (10 - d.highC) * 4;
    else if (d.highC < 16) score += (16 - d.highC) * 2;
    else if (d.highC > 28) score += (d.highC - 28) * 3;

    // Coarse time-of-day call. Hot days favour mornings; cool calm days
    // favour mid-day. We keep this restrained, no fake hour-by-hour data.
    let whenLabel = "all day";
    if (d.highC >= 26) whenLabel = "morning, before the heat";
    else if (d.windMaxKmh >= 22) whenLabel = "early, before the wind";
    else if (d.highC < 14) whenLabel = "midday, after the chill";

    const bits: string[] = [];
    if ((d.precipProbMax ?? 0) <= 15) bits.push("dry");
    else if ((d.precipProbMax ?? 0) <= 35) bits.push("mostly dry");
    if (d.windMaxKmh < 12) bits.push("calm");
    else if (d.windMaxKmh < 22) bits.push("light wind");
    if (d.highC >= 16 && d.highC <= 26) bits.push("comfortable");

    return {
      index: i,
      dayLabel: d.dayLabel,
      whenLabel,
      reason: bits.length ? bits.join(", ") : "best on offer",
      score,
    };
  });
  scored.sort((a, b) => a.score - b.score);
  return scored.slice(0, topN).map(({ index, dayLabel, whenLabel, reason }) => ({
    index,
    dayLabel,
    whenLabel,
    reason,
  }));
}

/**
 * Pick the single best day in the 7-day outlook for a round of golf.
 * Same scoring approach as findBestWindow, applied to daily aggregates.
 */
export function findBestDay(daily: ForecastDay[]): {
  index: number;
  reason: string;
} | null {
  if (daily.length === 0) return null;
  let bestIdx = 0;
  let bestScore = Infinity;
  for (let i = 0; i < daily.length; i++) {
    const d = daily[i];
    let score = 0;
    score += (d.precipProbMax ?? 0) * 1.4;
    score += Math.max(0, d.windMaxKmh - 14) * 1.6;
    if (d.highC < 10) score += (10 - d.highC) * 4;
    else if (d.highC < 16) score += (16 - d.highC) * 2;
    else if (d.highC > 28) score += (d.highC - 28) * 3;
    if (score < bestScore) {
      bestScore = score;
      bestIdx = i;
    }
  }
  const d = daily[bestIdx];
  const bits: string[] = [];
  if ((d.precipProbMax ?? 0) <= 15) bits.push("dry");
  else if ((d.precipProbMax ?? 0) <= 35) bits.push("mostly dry");
  if (d.windMaxKmh < 12) bits.push("calm");
  else if (d.windMaxKmh < 22) bits.push("light wind");
  if (d.highC >= 16 && d.highC <= 26) bits.push("comfortable temps");
  else if (d.highC > 26) bits.push("warm");
  return {
    index: bestIdx,
    reason: bits.length ? bits.join(", ") : "the best day on offer",
  };
}
