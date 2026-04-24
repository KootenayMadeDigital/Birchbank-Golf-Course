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
// evergreen cards. All visible at once, no rotation, no carousel.
export const GRID_ANNOUNCEMENTS: GridAnnouncement[] = [
  {
    eyebrow: "Open now",
    title: "The season is on.",
    body: "April 1 through October 31. Frost delays post before the first tee.",
    cta: { label: "Book a tee time", href: "/book" },
    image: {
      src: "/announcements/season.webp",
      alt: "A dew-covered white wooden golf tee in morning grass at sunrise",
    },
  },
  {
    eyebrow: "Pro Shop",
    title: "8 am to dusk, seven days.",
    body: "Booking, fittings, lessons with our CPGA head pro, club repairs. Walk in or call ahead.",
    cta: { label: "Call 250-693-2255", href: "tel:+12506932255" },
    // Source: birchbankgolf.com homepage slideshow, the "Pro-shop is open
    // 9am-7pm 7 days a week" slide. Their own photograph, used in their
    // current rotation.
    image: {
      src: "/announcements/proshop.webp",
      alt: "The Birchbank Pro Shop",
    },
  },
  {
    eyebrow: "The Bistro",
    title: "Noon to five. Every day.",
    body: "Fully licensed. Covered patio on the river. Catering for member events, weddings, and tournaments.",
    cta: { label: "See the menus", href: "/bistro" },
    image: {
      src: "/bistro/patio.webp",
      alt: "The covered Bistro patio at Birchbank, overlooking the first green with Monashee foothills beyond",
    },
  },
];
