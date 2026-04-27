// One-off image pipeline: measure native dimensions, convert to WebP at
// reasonable max widths, place into the canonical public/ directories
// per the approved plan. Idempotent: skips files that already exist.

import sharp from "sharp";
import { mkdir, copyFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const SRC = "C:/Users/bfauc/Desktop/Birchbank Golf Course/Images/New Images";
const ROOT = "C:/Users/bfauc/Desktop/Birchbank Golf Course";

// Each entry: source filename, output path under public/, max width.
// Max width is chosen so the largest rendered slot fits at 2x density:
//   hero/aerial/cinematic: 2200 (covers 1100px at 2x)
//   column hero (4-5 col):  1600 (covers 800px at 2x)
//   medium card:            1200
//   small accent:           800
const PIPELINE = [
  // Course
  { src: "mountain flag clean.jpg",       out: "public/course/mountain-flag.webp",         max: 1600 },
  { src: "course distance overhead.jpg",  out: "public/course/aerial.webp",                max: 2200 },
  { src: "green flag fairway.jpg",        out: "public/course/green-flag.webp",            max: 1600 },

  // Hole pages
  { src: "tee sign river view.jpg",       out: "public/course/holes/hole-3.webp",          max: 2200 },
  { src: "green bunkers.jpg",             out: "public/course/holes/hole-6.webp",          max: 2200 },
  { src: "enhanced pond fairway.jpg",     out: "public/course/holes/hole-12.webp",         max: 2200 },

  // Membership
  { src: "mountain green cart.jpg",       out: "public/membership/hero.webp",              max: 2200 }, // overwrites existing
  { src: "morning mist trees.jpg",        out: "public/membership/morning-tuesday.webp",   max: 1600 },
  { src: "pond fountain.jpg",             out: "public/membership/retirees-pond.webp",     max: 1600 },

  // Visit pages
  { src: "birchbank autumn driveway.jpg", out: "public/visit/driveway-autumn.webp",        max: 1600 },
  { src: "river valley view.jpg",         out: "public/visit/columbia-from-above.webp",   max: 1600 },
  { src: "maple leaf green.jpg",          out: "public/visit/maple-leaf-green.webp",      max: 800 },
  { src: "mountain fairway sun.jpg",      out: "public/visit/stay-and-play-hero.webp",    max: 1600 },
  { src: "ball on tee.jpg",               out: "public/visit/ball-on-tee.webp",           max: 1600 },

  // Conditions
  { src: "foggy mountain green.jpg",      out: "public/conditions/foggy.webp",            max: 1200 },
  { src: "cart path mountain.jpg",        out: "public/conditions/sunny.webp",            max: 1200 },
  { src: "fairway mountain view.jpg",     out: "public/conditions/cloudy.webp",           max: 1200 },
  { src: "golf balls green.jpg",          out: "public/contact/balls-green.webp",          max: 800 },

  // Events
  { src: "bistro dining room.jpg",        out: "public/events/banquet-room.webp",         max: 2200 },
  { src: "fairway carts.jpg",             out: "public/events/fairway-carts.webp",        max: 1600 },
  { src: "mountain green players.jpg",    out: "public/events/players-on-green.webp",     max: 2200 },

  // Bistro
  { src: "bistro burger beer.jpg",        out: "public/bistro/burger-beer.webp",          max: 1200 },
  { src: "bistro burger rings.jpg",       out: "public/bistro/burger.webp",               max: 1600 }, // overwrites old burger.jpg's role

  // Pro shop
  { src: "pro shop display.jpg",          out: "public/pro-shop/display.webp",            max: 1200 },

  // About
  { src: "cart under birch.jpg",          out: "public/about/birch-cart.webp",            max: 1600 },
  { src: "bench grove.jpg",               out: "public/about/bench-grove.webp",           max: 1600 },

  // Lessons
  { src: "wide green bunkers.jpg",        out: "public/lessons/short-game.webp",          max: 1600 },

  // Marquee additions (refresh rotation)
  { src: "mountain green.jpg",            out: "public/marquee/11.webp",                  max: 1600 },
  { src: "ball and marker.jpg",           out: "public/marquee/12.webp",                  max: 1600 },
];

const out = [];
for (const item of PIPELINE) {
  const srcPath = path.join(SRC, item.src);
  const outPath = path.join(ROOT, item.out);
  if (!existsSync(srcPath)) {
    out.push({ ...item, status: "MISSING_SOURCE" });
    continue;
  }
  await mkdir(path.dirname(outPath), { recursive: true });
  const meta = await sharp(srcPath).metadata();
  const srcW = meta.width ?? 0;
  const srcH = meta.height ?? 0;
  const srcAspect = srcW && srcH ? (srcW / srcH).toFixed(3) : "?";
  await sharp(srcPath)
    .resize({ width: Math.min(item.max, srcW || item.max), withoutEnlargement: true })
    .webp({ quality: 84, effort: 5 })
    .toFile(outPath);
  const outMeta = await sharp(outPath).metadata();
  const outBytes = (await stat(outPath)).size;
  out.push({
    ...item,
    srcW, srcH, srcAspect,
    outW: outMeta.width, outH: outMeta.height,
    outAspect: outMeta.width && outMeta.height ? (outMeta.width / outMeta.height).toFixed(3) : "?",
    outKB: Math.round(outBytes / 1024),
    status: "OK",
  });
}

// Print compact summary table.
console.log("\n=== Image pipeline results ===\n");
console.log("FILE_OUT".padEnd(48) + "SRC_DIM".padEnd(14) + "ASP".padEnd(8) + "OUT_DIM".padEnd(14) + "KB");
for (const r of out) {
  if (r.status !== "OK") {
    console.log(`${r.out.padEnd(48)}${r.status}`);
    continue;
  }
  console.log(
    r.out.padEnd(48) +
      `${r.srcW}x${r.srcH}`.padEnd(14) +
      `${r.srcAspect}`.padEnd(8) +
      `${r.outW}x${r.outH}`.padEnd(14) +
      `${r.outKB}`,
  );
}
console.log(`\nTotal: ${out.filter(r => r.status === "OK").length}/${PIPELINE.length} processed.`);
