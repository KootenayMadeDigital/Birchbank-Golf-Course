/**
 * The published Birchbank scorecard lives in the Pro Shop and as image files:
 *   https://www.birchbankgolf.com/wp-content/uploads/2020/02/2020-Score-Card-inside.jpg
 *   https://www.birchbankgolf.com/wp-content/uploads/2020/02/2020-score-card-back.jpg
 *
 * The public website does not publish per-hole par, yardage, stroke index,
 * descriptions, or hole names as extractable text. Until that data is
 * transcribed from the scorecard image (or supplied by the course), we ship
 * numbered hole shells — no fabricated yardages, names, or strategy copy.
 */
export type Hole = {
  number: number;
  par: number | null;
  strokeIndex: number | null;
  yardage: { black: number | null; blue: number | null; white: number | null; red: number | null };
  name?: string;
  description?: string;
  proTip?: string;
};

const blank = (number: number): Hole => ({
  number,
  par: null,
  strokeIndex: null,
  yardage: { black: null, blue: null, white: null, red: null },
});

export const HOLES: Hole[] = Array.from({ length: 18 }, (_, i) => blank(i + 1));

// Total par and yardages will be computed once per-hole data is supplied.
export const HOLE_SUMMARY = {
  par: null as number | null,
  yardageBlack: null as number | null,
  yardageBlue: null as number | null,
  yardageWhite: null as number | null,
  yardageRed: null as number | null,
};

export const SCORECARD_IMAGES = {
  inside: "https://www.birchbankgolf.com/wp-content/uploads/2020/02/2020-Score-Card-inside.jpg",
  back: "https://www.birchbankgolf.com/wp-content/uploads/2020/02/2020-score-card-back.jpg",
};

// Confirmed facts from birchbankgolf.com:
//   • June 1, 2018 — reconfigured to resemble the original 1969 layout
//   • New irrigation system includes ponds at holes 12 and 15
export const COURSE_FACTS = {
  reconfiguredOn: "2018-06-01",
  pondsOnHoles: [12, 15] as const,
};
