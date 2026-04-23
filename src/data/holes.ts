/**
 * Per-hole scorecard data — Blue, White, and Red tee yardages verified from
 * the published Birchbank scorecard (2020 edition at
 * birchbankgolf.com/wp-content/uploads/2020/02/2020-Score-Card-inside.jpg)
 * cross-referenced against the GolfNow course panel.
 *
 * Gold and Combo:
 *   - Aggregate totals verified via GolfPass course listing (6788 / 6240).
 *   - Per-hole yardage NOT published: the 2020 scorecard shows Blue, Combo
 *     (two rating rows: men's / ladies'), White, Red — but no Gold row.
 *     Gold appears to have been added after the 2020 scorecard went to
 *     print. Per-hole Combo breakdown varies by routing variant; the
 *     scorecard prints the totals but not an extractable per-hole column.
 *   - Sourcing these would require a newer Birchbank scorecard or a direct
 *     transcription from the Pro Shop. Until then, ScorecardSwitcher and
 *     ScorecardCompact surface the aggregate total only for these tees
 *     and disclose that per-hole isn't published.
 *
 * Stroke indexes differ by tee set: Blue uses the men's index; White and Red
 * share the forward-tee index. The scorecard publishes both.
 */

export type TeeKey = "gold" | "blue" | "combo" | "white" | "red";

export type HoleYardage = Partial<Record<TeeKey, number>>;

export type Hole = {
  number: number;
  par: number;
  yardage: HoleYardage;
  /** Stroke index from the Blue (men's) tees. */
  strokeIndex: number;
  /** Stroke index from the White/Red (forward) tees, if different from Blue. */
  strokeIndexForward?: number;
  /** Optional editorial name for the hole (placeholder — not yet published). */
  name?: string;
  /** Optional strategy paragraph (placeholder — not yet published). */
  description?: string;
  /** Optional tip from Jeff Papilion (placeholder — not yet published). */
  proTip?: string;
};

export const HOLES: Hole[] = [
  { number: 1,  par: 5, yardage: { blue: 483, white: 455, red: 405 }, strokeIndex: 13, strokeIndexForward: 5 },
  { number: 2,  par: 3, yardage: { blue: 160, white: 152, red: 109 }, strokeIndex: 5,  strokeIndexForward: 17 },
  { number: 3,  par: 4, yardage: { blue: 253, white: 235, red: 235 }, strokeIndex: 17, strokeIndexForward: 13 },
  { number: 4,  par: 4, yardage: { blue: 412, white: 379, red: 379 }, strokeIndex: 9,  strokeIndexForward: 1 },
  { number: 5,  par: 4, yardage: { blue: 410, white: 360, red: 330 }, strokeIndex: 7,  strokeIndexForward: 7 },
  { number: 6,  par: 4, yardage: { blue: 413, white: 381, red: 325 }, strokeIndex: 1,  strokeIndexForward: 9 },
  { number: 7,  par: 3, yardage: { blue: 165, white: 143, red: 143 }, strokeIndex: 15, strokeIndexForward: 15 },
  { number: 8,  par: 4, yardage: { blue: 393, white: 345, red: 315 }, strokeIndex: 3,  strokeIndexForward: 3 },
  { number: 9,  par: 5, yardage: { blue: 506, white: 472, red: 411 }, strokeIndex: 11, strokeIndexForward: 11 },
  { number: 10, par: 4, yardage: { blue: 415, white: 360, red: 360 }, strokeIndex: 10, strokeIndexForward: 8 },
  { number: 11, par: 4, yardage: { blue: 426, white: 350, red: 325 }, strokeIndex: 8,  strokeIndexForward: 10 },
  { number: 12, par: 4, yardage: { blue: 398,             red: 325 }, strokeIndex: 2,  strokeIndexForward: 2 },
  { number: 13, par: 4, yardage: { blue: 380,             red: 310 }, strokeIndex: 4,  strokeIndexForward: 4 },
  { number: 14, par: 3, yardage: { blue: 160,             red: 132 }, strokeIndex: 18, strokeIndexForward: 16 },
  { number: 15, par: 4, yardage: { blue: 388,             red: 293 }, strokeIndex: 12, strokeIndexForward: 12 },
  { number: 16, par: 5, yardage: { blue: 533,             red: 422 }, strokeIndex: 16, strokeIndexForward: 6 },
  { number: 17, par: 3, yardage: { blue: 180,             red: 125 }, strokeIndex: 14, strokeIndexForward: 18 },
  { number: 18, par: 5, yardage: { blue: 480,             red: 401 }, strokeIndex: 6,  strokeIndexForward: 14 },
];

// Verified aggregate totals.
export const HOLE_SUMMARY = {
  par: 72,
  yardageGold: 6788,  // from GolfPass — per-hole breakdown pending
  yardageBlue: 6555,
  yardageCombo: 6240, // from GolfPass — per-hole breakdown pending
  yardageWhite: 5882, // from GolfPass — per-hole breakdown partial (holes 1–11)
  yardageRed: 5345,
};

/**
 * Course + slope ratings per tee.
 *
 * Source: GolfNow's Birchbank course panel (the most complete public
 * source — confirmed on grassy.golf and cross-referenced against the
 * 2020 printed scorecard).
 *
 * Every tee has both a Men's and Women's rating/slope pair; the course
 * publishes both. We display the primary rating per tee here (Men's for
 * Gold / Blue / White; Women's for Red — the traditional gender-tee
 * assignment). Combo is unisex.
 *
 * Full GolfNow table for reference:
 *   Gold  (M) 72.6 / 125   Gold  (W) 79.6 / 138
 *   Blue  (M) 71.5 / 123   Blue  (W) 78.0 / 136
 *   Combo      70.2 / 122
 *   White (M) 68.5 / 116   White (W) 73.6 / 131
 *   Red   (M) 65.6 / 112   Red   (W) 70.6 / 122
 */
export const TEES = [
  { key: "gold",  name: "Gold",  total: 6788, courseRating: 72.6, slopeRating: 125 },
  { key: "blue",  name: "Blue",  total: 6555, courseRating: 71.5, slopeRating: 123 },
  { key: "combo", name: "Combo", total: 6240, courseRating: 70.2, slopeRating: 122 },
  { key: "white", name: "White", total: 5882, courseRating: 68.5, slopeRating: 116 },
  { key: "red",   name: "Red",   total: 5345, courseRating: 70.6, slopeRating: 122 },
] as const;

export const SCORECARD_IMAGES = {
  inside: "https://www.birchbankgolf.com/wp-content/uploads/2020/02/2020-Score-Card-inside.jpg",
  back: "https://www.birchbankgolf.com/wp-content/uploads/2020/02/2020-score-card-back.jpg",
};

// Confirmed facts from birchbankgolf.com:
//   • June 1, 2018 — reconfigured to resemble the original 1969 layout
//   • New irrigation system includes ponds at holes 12 and 15
//   • Surrounded by the Selkirk and Monashee Mountains (per GolfPass)
export const COURSE_FACTS = {
  reconfiguredOn: "2018-06-01",
  pondsOnHoles: [12, 15] as const,
  mountainRanges: ["Selkirk", "Monashee"] as const,
};

// Helpers for section rendering.
export const FRONT_NINE = HOLES.slice(0, 9);
export const BACK_NINE = HOLES.slice(9, 18);

export function sumYardage(holes: Hole[], key: TeeKey): number | null {
  let total = 0;
  for (const h of holes) {
    const v = h.yardage[key];
    if (v == null) return null;
    total += v;
  }
  return total;
}

export function sumPar(holes: Hole[]): number {
  return holes.reduce((s, h) => s + h.par, 0);
}
