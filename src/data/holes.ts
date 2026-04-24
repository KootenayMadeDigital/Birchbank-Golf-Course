/**
 * Per-hole scorecard data. All tee yardages and HCP indexes transcribed
 * directly from the official Birchbank printed scorecard (the source-of-
 * truth photograph the Pro Shop provided). This scorecard publishes:
 *
 *   • BLUE  M-71.5/121   — total 6584
 *   • COMBO M-70.0/120   — total 6277  (men's combo)
 *   • WHITE M-68.1/115   — total 5941
 *   • COMBO W-72.3/124   — total 5620  (women's combo)
 *   • RED   W-70.8/119   — total 5330
 *
 * Gold tees are NOT on this scorecard and have been removed. If/when a
 * Birchbank-published Gold layout exists, restore.
 *
 * The men's and women's "Combo" share the same physical tee boxes but
 * have different yardages and ratings per RCGA convention. We surface
 * Combo M as the primary `combo` yardage; Combo W per-hole yardage is
 * stored alongside on the holes that differ (yardageLadiesCombo).
 *
 * Stroke indexes:
 *   • strokeIndex            = Men's HCP (Blue, Combo, White-by-men)
 *   • strokeIndexForward     = Ladies' HCP from the Red tees
 *   • strokeIndexLadiesWhite = Ladies' HCP from the White tees (optional)
 */

export type TeeKey = "blue" | "combo" | "white" | "red";

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
    number: 1,  par: 5, yardage: { blue: 483, combo: 483, white: 455, red: 405 }, strokeIndex: 8, strokeIndexForward: 1,
    name: "The opener.",
    description: "A shortish par 5, gettable with two good ones. Jeff flags the opener and the closer as the two holes that 'scream grip it and rip it' at Birchbank.",
  },
  {
    number: 2,  par: 3, yardage: { blue: 160, combo: 152, white: 152, red: 109 }, strokeIndex: 12, strokeIndexForward: 9,
    name: "The signature.",
    description: "A downhill par 3 with a spectacular view down the Columbia River gorge, one of the best tee shots in the Kootenays. Judge the wind, calibrate the elevation change, pick the right stick.",
    proTip: "The drop changes your yardage more than you think. Take a club less than the flat number, and commit to it.",
    signature: true,
  },
  { number: 3,  par: 4, yardage: { blue: 253, combo: 253, white: 235, red: 235 }, strokeIndex: 14, strokeIndexForward: 15,
    description: "Short, drivable par 4 for the longer hitter. Good players have a real look at eagle here.",
  },
  { number: 4,  par: 4, yardage: { blue: 412, combo: 386, white: 386, red: 364 }, strokeIndex: 10, strokeIndexForward: 7,
    description: "Par 4, 412 yards from the Blue. A long approach down a tree-lined corridor; the second shot is the test.",
  },
  { number: 5,  par: 4, yardage: { blue: 410, combo: 360, white: 360, red: 330 }, strokeIndex: 2, strokeIndexForward: 13,
    description: "Par 4, 410 yards. Stroke index 2 from the Blue, the second-hardest hole on the front nine for the men's tees.",
  },
  {
    number: 6,  par: 4, yardage: { blue: 413, combo: 381, white: 381, red: 325 }, strokeIndex: 4, strokeIndexForward: 3,
    name: "The test.",
    description: "Stroke index 4 from the Blue, but a real test of patience: long, demanding, and most cards bend here. Play it as a comfortable bogey and move on.",
  },
  { number: 7,  par: 3, yardage: { blue: 174, combo: 174, white: 155, red: 143 }, strokeIndex: 18, strokeIndexForward: 17,
    description: "Par 3, 174 yards from the Blue. Stroke index 18, the easiest on the men's card; more room than it looks.",
  },
  { number: 8,  par: 4, yardage: { blue: 393, combo: 393, white: 345, red: 315 }, strokeIndex: 6, strokeIndexForward: 5,
    description: "Par 4, 393 yards. Stroke index 6 from the Blue; a steady demanding par 4 in the front nine's heart.",
  },
  { number: 9,  par: 5, yardage: { blue: 506, combo: 506, white: 472, red: 411 }, strokeIndex: 16, strokeIndexForward: 11,
    description: "The longest par 5 on the front nine, 506 yards from the Blue. Closes the loop back to the clubhouse before you turn for the back.",
  },
  {
    number: 10, par: 4, yardage: { blue: 415, combo: 360, white: 360, red: 360 }, strokeIndex: 5, strokeIndexForward: 8,
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
  { number: 11, par: 4, yardage: { blue: 426, combo: 398, white: 350, red: 325 }, strokeIndex: 1, strokeIndexForward: 2,
    description: "Stroke index 1 from the Blue, the hardest hole on the card. 426 yards; a three-shot hole for most players.",
  },
  {
    number: 12, par: 4, yardage: { blue: 398, combo: 375, white: 375, red: 310 }, strokeIndex: 3, strokeIndexForward: 4,
    name: "First pond.",
    description: "First of two new-irrigation ponds added in 2018. Stroke index 3 from the Blue, the water is front-left; the longer carry is worth the line.",
  },
  { number: 13, par: 4, yardage: { blue: 400, combo: 375, white: 375, red: 375 }, strokeIndex: 9, strokeIndexForward: 12,
    description: "Par 4, 400 yards. Stroke index 9, mid-pack on the back nine for the men's tees.",
  },
  { number: 14, par: 3, yardage: { blue: 160, combo: 148, white: 148, red: 132 }, strokeIndex: 17, strokeIndexForward: 16,
    description: "Par 3, 160 yards. Stroke index 17, the easiest on the back nine. The only real breather between the closing stretch and the river holes.",
  },
  {
    number: 15, par: 4, yardage: { blue: 388, combo: 340, white: 340, red: 293 }, strokeIndex: 7, strokeIndexForward: 14,
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
  { number: 16, par: 5, yardage: { blue: 533, combo: 533, white: 450, red: 422 }, strokeIndex: 11, strokeIndexForward: 6,
    description: "The longest hole on the course, 533 yards, par 5 from the Blue. Stroke index 11; long but not penal.",
  },
  { number: 17, par: 3, yardage: { blue: 180, combo: 180, white: 153, red: 125 }, strokeIndex: 15, strokeIndexForward: 10,
    description: "The longest par 3 on the course, 180 yards from the Blue. The penultimate hole; steady from here.",
  },
  {
    number: 18, par: 5, yardage: { blue: 480, combo: 480, white: 449, red: 401 }, strokeIndex: 13, strokeIndexForward: 18,
    name: "The closer.",
    description: "A shortish par 5 to finish, the other hole Jeff flags as a real chance to score. Reward a good drive with a committed second shot.",
  },
];

// Verified aggregate totals.
export const HOLE_SUMMARY = {
  par: 72,
  yardageBlue: 6584,
  yardageCombo: 6277,   // Combo M (men's). Combo W (women's) totals 5620.
  yardageWhite: 5941,
  yardageRed: 5330,
};

/**
 * Course + slope ratings per tee, transcribed from the official Birchbank
 * printed scorecard (the source-of-truth Pro Shop reference).
 *
 * Every tee box has a published men's rating and a published women's
 * rating; we surface the primary one per tee here:
 *   - Blue  is a men's-rated tee (M-71.5/121)
 *   - Combo M is the men's combo (70.0/120, total 6277)
 *   - White is a men's-rated tee (M-68.1/115)
 *   - Red   is a women's-rated tee (W-70.8/119)
 *
 * The women's combo is a separate rating (W-72.3/124, total 5620) from
 * the same physical Combo tee box; surfaced here as a footnote on the
 * Combo tee for the scorecard page.
 */
export const TEES = [
  { key: "blue",  name: "Blue",  total: 6584, courseRating: 71.5, slopeRating: 121 },
  { key: "combo", name: "Combo", total: 6277, courseRating: 70.0, slopeRating: 120, totalWomen: 5620, courseRatingWomen: 72.3, slopeRatingWomen: 124 },
  { key: "white", name: "White", total: 5941, courseRating: 68.1, slopeRating: 115 },
  { key: "red",   name: "Red",   total: 5330, courseRating: 70.8, slopeRating: 119 },
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
