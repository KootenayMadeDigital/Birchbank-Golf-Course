/**
 * Sanity Studio route mount.
 *
 * This file is intentionally inert until the Sanity packages are installed.
 * Uncomment the body once you run:
 *   npm install sanity @sanity/vision next-sanity
 *
 * Until then, visiting /studio returns the Next 404.
 */

import { notFound } from "next/navigation";

// export const dynamic = "force-static";
// export { metadata, viewport } from "next-sanity/studio";
// import { NextStudio } from "next-sanity/studio";
// import config from "../../../../sanity.config";

export default function StudioPage() {
  notFound();
  // return <NextStudio config={config} />;
}
