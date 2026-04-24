/**
 * Per-hole scorecard data. Blue, White, and Red tee yardages verified from
 * the published Birchbank scorecard (2020 edition at
 * birchbankgolf.com/wp-content/uploads/2020/02/2020-Score-Card-inside.jpg)
 * cross-referenced against the GolfNow course panel.
 *
 * Gold and Combo:
 *   - Aggregate totals verified via GolfPass course listing (6788 / 6240).
 *   - Per-hole yardage NOT published: the 2020 scorecard shows Blue, Combo
 *     (two rating rows: men's / ladies'), White, Red, but no Gold row.
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
  /** Editorial name for the hole. Only set when verifiable from a source. */
  name?: string;
  /** Editorial description. Only set when verifiable. */
  description?: string;
  /** Quote or paraphrase from Jeff Papilion (CPGA head pro). */
  proTip?: string;
  /**
   * Published photograph of the hole. Credit is mandatory when set , 
   * scoregolf photos must credit Andrew Penner / SCOREGolf.
   */
  photo?: {
    src: string;
    alt: string;
    credit: string;
    source?: { label: string; href: string };
  };
  /** Flags this hole as the course's signature hole (per scoregolf). */
  signature?: boolean;
};

// Editorial facts below are taken from or paraphrased from:
//   https://scoregolf.com/features/golf-course-features/birchbank-a-kootenay-rockies-classic/
//   "Birchbank a Kootenay Rockies classic" by Andrew Penner · Oct 6, 2022
//   Quotes attributed to Jeff Papilion (Director of Golf / CPGA Head Pro)
// Photo credits to Andrew Penner / SCOREGolf are preserved on every use.
export const HOLES: Hole[] = [
  {
    number: 1,  par: 5, yardage: { blue: 483, white: 455, red: 405 }, strokeIndex: 13, strokeIndexForward: 5,
    name: "The opener.",
    description: "A shortish par 5, gettable with two good ones. Jeff flags the opener and the closer as the two holes that 'scream grip it and rip it' at Birchbank.",
  },
  {
    number: 2,  par: 3, yardage: { blue: 160, white: 152, red: 109 }, strokeIndex: 5,  strokeIndexForward: 17,
    name: "The signature.",
    description: "A downhill par 3 with a spectacular view down the Columbia River gorge, one of the best tee shots in the Kootenays. Judge the wind, calibrate the elevation change, pick the right stick.",
    proTip: "The drop changes your yardage more than you think. Take a club less than the flat number, and commit to it.",
    signature: true,
  },
  { number: 3,  par: 4, yardage: { blue: 253, white: 235, red: 235 }, strokeIndex: 17, strokeIndexForward: 13,
    description: "Short, drivable par 4 for the longer hitter. Good players have a real look at eagle here." },
  { number: 4,  par: 4, yardage: { blue: 412, white: 379, red: 379 }, strokeIndex: 9,  strokeIndexForward: 1,
    description: "Par 4, 412 yards from the Blue. Stroke index 1 from the forward tees, the hardest hole for shorter hitters.",
  },
  { number: 5,  par: 4, yardage: { blue: 410, white: 360, red: 330 }, strokeIndex: 7,  strokeIndexForward: 7,
    description: "Par 4, 410 yards. Stroke index 7, middle of the difficulty pack on the front nine.",
  },
  {
    number: 6,  par: 4, yardage: { blue: 413, white: 381, red: 325 }, strokeIndex: 1,  strokeIndexForward: 9,
    name: "The test.",
    description: "Stroke index 1 from the Blue. The hole that tends to decide your card, play it as a comfortable bogey and move on.",
  },
  { number: 7,  par: 3, yardage: { blue: 165, white: 143, red: 143 }, strokeIndex: 15, strokeIndexForward: 15,
    description: "The longest par 3 on the front nine, 165 yards from the Blue. Stroke index 15; more room than it looks.",
  },
  { number: 8,  par: 4, yardage: { blue: 393, white: 345, red: 315 }, strokeIndex: 3,  strokeIndexForward: 3,
    description: "Par 4, 393 yards. Stroke index 3, the third-hardest hole on the card for every tee set.",
  },
  { number: 9,  par: 5, yardage: { blue: 506, white: 472, red: 411 }, strokeIndex: 11, strokeIndexForward: 11,
    description: "The longest par 5 on the front nine, 506 yards from the Blue. Closes the loop back to the clubhouse before you turn for the back.",
  },
  {
    number: 10, par: 4, yardage: { blue: 415, white: 360, red: 360 }, strokeIndex: 10, strokeIndexForward: 8,
    name: "The back-nine opener.",
    description: "The 10th turns the course inland and sets up the toughest stretch on the scorecard. Generous corridor off the tee, the line matters more than the length.",
    photo: {
      src: "/course/holes/hole-10.jpg",
      alt: "The par-4 10th at Birchbank Golf Club, a tree-lined fairway bending toward the green",
      credit: "Photo: Andrew Penner",
      source: {
        label: "SCOREGolf · October 2022",
        href: "https://scoregolf.com/features/golf-course-features/birchbank-a-kootenay-rockies-classic/",
      },
    },
  },
  { number: 11, par: 4, yardage: { blue: 426, white: 350, red: 325 }, strokeIndex: 8,  strokeIndexForward: 10,
    description: "The longest par 4 on the card, 426 yards from the Blue. Stroke index 8; a three-shot hole for most players.",
  },
  {
    number: 12, par: 4, yardage: { blue: 398,             red: 325 }, strokeIndex: 2,  strokeIndexForward: 2,
    name: "First pond.",
    description: "First of two new-irrigation ponds added in 2018. Stroke index 2 from the Blue, the water is front-left; the longer carry is worth the line.",
  },
  { number: 13, par: 4, yardage: { blue: 380,             red: 310 }, strokeIndex: 4,  strokeIndexForward: 4,
    description: "Par 4, 380 yards. Stroke index 4, one of the back nine's trickier holes.",
  },
  { number: 14, par: 3, yardage: { blue: 160,             red: 132 }, strokeIndex: 18, strokeIndexForward: 16,
    description: "Par 3, 160 yards. Stroke index 18, the easiest hole on the card. The only real breather on the back nine.",
  },
  {
    number: 15, par: 4, yardage: { blue: 388,             red: 293 }, strokeIndex: 12, strokeIndexForward: 12,
    name: "Second pond.",
    description: "The second pond, then the walk back along the Columbia, the best river view on the back nine, looking upstream toward the Selkirks.",
    photo: {
      src: "/course/holes/hole-15.jpg",
      alt: "The par-4 15th at Birchbank Golf Club, with the Columbia River in the background",
      credit: "Photo: Andrew Penner",
      source: {
        label: "SCOREGolf · October 2022",
        href: "https://scoregolf.com/features/golf-course-features/birchbank-a-kootenay-rockies-classic/",
      },
    },
  },
  { number: 16, par: 5, yardage: { blue: 533,             red: 422 }, strokeIndex: 16, strokeIndexForward: 6,
    description: "The longest hole on the course, 533 yards, par 5 from the Blue. Stroke index 16; long but not penal.",
  },
  { number: 17, par: 3, yardage: { blue: 180,             red: 125 }, strokeIndex: 14, strokeIndexForward: 18,
    description: "The longest par 3 on the course, 180 yards from the Blue. The penultimate hole; steady from here.",
  },
  {
    number: 18, par: 5, yardage: { blue: 480,             red: 401 }, strokeIndex: 6,  strokeIndexForward: 14,
    name: "The closer.",
    description: "A shortish par 5 to finish, the other hole Jeff flags as a real chance to score. Reward a good drive with a committed second shot.",
  },
];

// Verified aggregate totals.
export const HOLE_SUMMARY = {
  par: 72,
  yardageGold: 6788,  // from GolfPass, per-hole breakdown pending
  yardageBlue: 6555,
  yardageCombo: 6240, // from GolfPass, per-hole breakdown pending
  yardageWhite: 5882, // from GolfPass, per-hole breakdown partial (holes 1–11)
  yardageRed: 5345,
};

/**
 * Course + slope ratings per tee.
 *
 * Source: GolfNow's Birchbank course panel (the most complete public
 * source, confirmed on grassy.golf and cross-referenced against the
 * 2020 printed scorecard).
 *
 * Every tee has both a Men's and Women's rating/slope pair; the course
 * publishes both. We display the primary rating per tee here (Men's for
 * Gold / Blue / White; Women's for Red, the traditional gender-tee
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
//   • June 1, 2018, reconfigured to resemble the original 1969 layout
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
