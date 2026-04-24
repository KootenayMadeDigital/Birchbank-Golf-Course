import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schema";

/**
 * Sanity Studio, mounted at /studio (see src/app/studio/[[...tool]]/page.tsx).
 *
 * To activate:
 *   1. Create a Sanity project at https://www.sanity.io
 *   2. Set SANITY_PROJECT_ID and SANITY_DATASET in .env.local
 *   3. npm install sanity @sanity/vision @sanity/image-url next-sanity
 *   4. Visit http://localhost:3000/studio
 */
export default defineConfig({
  name: "birchbank",
  title: "Birchbank Golf CMS",
  projectId: process.env.SANITY_PROJECT_ID || "",
  dataset: process.env.SANITY_DATASET || "production",
  basePath: "/studio",
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
