/**
 * Announcements — two surfaces:
 *
 * 1. `STRIP_ANNOUNCEMENT` renders in the top strip (AnnouncementBar).
 *    One message at a time. Set to `null` to hide the strip entirely.
 *    Auto-expires once past `activeUntil`.
 *
 * 2. `GRID_ANNOUNCEMENTS` renders in the 3-up grid (AnnouncementGrid) on
 *    the home page. Keep it at exactly 3 for the layout. Evergreen-ish
 *    facts and seasonal items belong here.
 */

export type StripAnnouncement = {
  /** Stable ID; bumping this resets the per-visitor dismissal in sessionStorage. */
  id: string;
  message: string;
  cta?: { label: string; href: string };
  /** ISO timestamp. Strip hides after this time. */
  activeUntil?: string;
};

export type GridAnnouncement = {
  eyebrow: string;
  title: string;
  body: string;
  cta: { label: string; href: string };
};

// Sourced from the current birchbankgolf.com homepage announcements.
// Edit here to update the strip.
export const STRIP_ANNOUNCEMENT: StripAnnouncement | null = {
  id: "season-open-2026",
  message: "Birchbank is open for the 2026 season",
  cta: { label: "Book a tee time", href: "/book" },
  activeUntil: "2026-11-01T00:00:00-08:00",
};

// Mirrors the four messages rotating on birchbankgolf.com, distilled to three
// evergreen cards. All visible at once — no rotation, no carousel.
export const GRID_ANNOUNCEMENTS: GridAnnouncement[] = [
  {
    eyebrow: "Open now",
    title: "2026 season is open.",
    body: "April 1 through October 31 — 213 days of golf on the Columbia.",
    cta: { label: "Book a tee time", href: "/book" },
  },
  {
    eyebrow: "Pro Shop",
    title: "9 am – 7 pm, every day.",
    body: "Tee-time booking, club fittings, lessons with our CPGA Head Pro, and club repairs.",
    cta: { label: "Call 250-693-2255", href: "tel:+12506932255" },
  },
  {
    eyebrow: "The Bistro",
    title: "12 pm – 5 pm, every day.",
    body: "Fully licensed. Full menu, covered patio with a view, event catering available.",
    cta: { label: "See the menus", href: "/bistro" },
  },
];
