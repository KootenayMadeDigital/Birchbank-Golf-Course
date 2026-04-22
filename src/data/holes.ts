/**
 * Totals and tee names verified April 2026 via GolfPass's Birchbank listing:
 *   https://www.golfpass.com/travel-advisor/courses/26756-birchbank-golf-course
 *
 * Per-hole par, yardage, stroke index, and strategy copy are printed on the
 * scorecard image published at birchbankgolf.com but not yet transcribed as
 * text. Until transcription, individual holes ship as numbered shells.
 */
export type Hole = {
  number: number;
  par: number | null;
  strokeIndex: number | null;
  yardage: { gold: number | null; blue: number | null; combo: number | null; white: number | null; red: number | null };
  name?: string;
  description?: string;
  proTip?: string;
};

const blank = (number: number): Hole => ({
  number,
  par: null,
  strokeIndex: null,
  yardage: { gold: null, blue: null, combo: null, white: null, red: null },
});

export const HOLES: Hole[] = Array.from({ length: 18 }, (_, i) => blank(i + 1));

// Verified aggregate totals from GolfPass.
export const HOLE_SUMMARY = {
  par: 72,
  yardageGold: 6788,
  yardageBlue: 6555,
  yardageCombo: 6240,
  yardageWhite: 5882,
  yardageRed: 5345,
};

export const TEES = [
  { name: "Gold", total: 6788 },
  { name: "Blue", total: 6555 },
  { name: "Combo", total: 6240 },
  { name: "White", total: 5882 },
  { name: "Red", total: 5345 },
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
