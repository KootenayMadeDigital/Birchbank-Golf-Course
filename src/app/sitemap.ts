import type { MetadataRoute } from "next";
import { HOLES } from "@/data/holes";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://birchbankgolf.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticPaths = [
    "/",
    "/course",
    "/course/scorecard",
    "/course/history",
    "/rates",
    "/book",
    "/membership",
    "/membership/retirees-club",
    "/pro-shop",
    "/bistro",
    "/events",
    "/events/book",
    "/plan-your-visit",
    "/about",
    "/about/team",
    "/conditions",
    "/faq",
    "/contact",
  ].map((path) => ({
    url: `${SITE}${path}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1.0 : 0.8,
  }));

  const holePaths = HOLES.map((h) => ({
    url: `${SITE}/course/holes/${h.number}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPaths, ...holePaths];
}
