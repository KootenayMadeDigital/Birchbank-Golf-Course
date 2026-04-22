/**
 * Announcements are surfaced on the home page as a 3-up "What's on" card
 * grid (AnnouncementGrid). Keep the array at exactly 3 for the layout.
 */

export type GridAnnouncement = {
  eyebrow: string;
  title: string;
  body: string;
  cta: { label: string; href: string };
  /** Optional card photograph. Only use with real, attributable imagery. */
  image?: { src: string; alt: string };
};

// Mirrors the four messages rotating on birchbankgolf.com, distilled to three
// evergreen cards. All visible at once — no rotation, no carousel.
export const GRID_ANNOUNCEMENTS: GridAnnouncement[] = [
  {
    eyebrow: "Open now",
    title: "2026 season is open.",
    body: "April 1 through October 31 — 213 days of golf on the Columbia.",
    cta: { label: "Book a tee time", href: "/book" },
    image: {
      src: "/announcements/season.webp",
      alt: "A dew-covered white wooden golf tee in morning grass at sunrise",
    },
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
    // The real Bistro plate from birchbankgolf.com's own slideshow — their
    // food, photographed on-site. Not generated.
    image: {
      src: "https://www.birchbankgolf.com/wp-content/uploads/2021/09/Slide1.jpg",
      alt: "A burger and side salad from the Birchbank Bistro",
    },
  },
];
