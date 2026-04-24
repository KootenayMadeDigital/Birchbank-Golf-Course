// All values verified from birchbankgolf.com. April 2026
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://birchbankgolf.com";

export const NAP = {
  name: "Birchbank Golf Course",
  legalName: "Rossland Trail Country Club",
  telephone: "+1-250-693-2366",
  telephoneProShop: "+1-250-693-2255",
  telephoneBistro: "+1-250-693-5451",
  telephoneSuperintendent: "+1-250-693-2263",
  emailOffice: "office@birchbankgolf.com",
  emailProShop: "proshop@birchbankgolf.com",
  emailBistro: "bistro@birchbankgolf.com",
  emailCourse: "course@birchbankgolf.com",
  emailAccounting: "accounting@birchbankgolf.com",
  streetAddress: "5500 Highway 22",
  addressLocality: "Genelle",
  addressRegion: "BC",
  mailingAddress: "PO Box 250, Trail, BC V1R 4L5",
  postalCode: "V0G 1G0",
  addressCountry: "CA",
  // Approx coords for Genelle, BC along Highway 22, confirm before shipping
  latitude: 49.2,
  longitude: -117.7,
  url: SITE,
} as const;

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: NAP.name,
    legalName: NAP.legalName,
    url: NAP.url,
    telephone: NAP.telephone,
    email: NAP.emailOffice,
    address: {
      "@type": "PostalAddress",
      streetAddress: NAP.streetAddress,
      addressLocality: NAP.addressLocality,
      addressRegion: NAP.addressRegion,
      addressCountry: NAP.addressCountry,
    },
    sameAs: [
      "https://www.facebook.com/BirchbankGolf",
      "https://www.instagram.com/birchbankgolf",
    ],
  };
}

export function golfCourseJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "GolfCourse",
    name: NAP.name,
    description:
      "18-hole golf course along the Columbia River in Genelle, BC. Operated by the Rossland Trail Country Club. Back 9 and clubhouse designed by local pro Roy Stone, opened 1969.",
    url: NAP.url,
    telephone: NAP.telephone,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: NAP.streetAddress,
      addressLocality: NAP.addressLocality,
      addressRegion: NAP.addressRegion,
      addressCountry: NAP.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: NAP.latitude,
      longitude: NAP.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        // Verified: "Pro-shop: 9am-7pm 7 days a week" (homepage)
        opens: "09:00",
        closes: "19:00",
        validFrom: "2026-04-01",
        validThrough: "2026-10-31",
      },
    ],
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE}${item.url}`,
    })),
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function eventJsonLd(e: {
  name: string;
  startDate: string;
  endDate?: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: e.name,
    startDate: e.startDate,
    endDate: e.endDate,
    description: e.description,
    url: `${SITE}${e.url}`,
    location: {
      "@type": "Place",
      name: NAP.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: NAP.streetAddress,
        addressLocality: NAP.addressLocality,
        addressRegion: NAP.addressRegion,
        addressCountry: NAP.addressCountry,
      },
    },
  };
}
