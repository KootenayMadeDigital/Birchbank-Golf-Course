/**
 * External review platforms where Birchbank is listed. Canonical URLs
 * live here so trust-stack chips, footer links, and post-round prompts
 * all point at the same places.
 *
 * Review counts are directional, not live, update when you refresh the
 * numbers in the Testimonials component. TripAdvisor is new and
 * deliberately under-sourced on the public site, which is why we surface
 * it in destination-visitor flows (Plan Your Visit, USA Visitors) and
 * post-round prompts (Contact, Bistro) rather than on every page.
 */

export type ReviewPlatform = {
  key: "golfpass" | "facebook" | "tripadvisor";
  name: string;
  readUrl: string;
  writeUrl?: string;
  rating?: string;
  countLabel?: string;
  audience: "all" | "destination" | "local";
};

export const REVIEW_PLATFORMS: Record<ReviewPlatform["key"], ReviewPlatform> = {
  golfpass: {
    key: "golfpass",
    name: "GolfPass",
    readUrl: "https://www.golfpass.com/travel-advisor/courses/26756-birchbank-golf-course",
    rating: "4.4★",
    countLabel: "47 reviews",
    audience: "all",
  },
  facebook: {
    key: "facebook",
    name: "Facebook",
    readUrl: "https://www.facebook.com/BirchbankGolf",
    rating: "82% recommend",
    countLabel: "22 reviews",
    audience: "local",
  },
  tripadvisor: {
    key: "tripadvisor",
    name: "Tripadvisor",
    readUrl:
      "https://www.tripadvisor.ca/Attraction_Review-g181769-d34312143-Reviews-Birchbank_Golf_Club-Trail_Kootenay_Rockies_British_Columbia.html",
    writeUrl:
      "https://www.tripadvisor.ca/UserReview-g181769-d34312143-Birchbank_Golf_Club-Trail_Kootenay_Rockies_British_Columbia.html",
    countLabel: "New on Tripadvisor",
    audience: "destination",
  },
};
