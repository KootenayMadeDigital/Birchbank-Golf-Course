#!/usr/bin/env node
/**
 * Encode the Blender PNG render sequence into WebP frames for the scroll hero.
 *
 * Prerequisites:
 *   - Install `cwebp` (from Google's libwebp). On Windows: https://developers.google.com/speed/webp/download
 *   - Place your PNG sequence at `./hero-source/0001.png` → `./hero-source/0120.png`
 *
 * Usage:
 *   node scripts/encode-hero.mjs
 *   node scripts/encode-hero.mjs --source ./my-renders --out ./public/hero --quality 82
 *   node scripts/encode-hero.mjs --tiers 960,1280,1920    # responsive tiers
 *
 * Output:
 *   ./public/hero/0001.webp → 0120.webp (and /960, /1280, /1920 subfolders for tiers)
 */

import { execFile } from "node:child_process";
import { promises as fs } from "node:fs";
import path from "node:path";
import { promisify } from "node:util";

const run = promisify(execFile);
const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, v, i, a) => {
    if (v.startsWith("--")) acc.push([v.slice(2), a[i + 1]]);
    return acc;
  }, []),
);

const SOURCE = path.resolve(args.source || "./hero-source");
const OUT = path.resolve(args.out || "./public/hero");
const QUALITY = String(args.quality || 82);
const TIERS = args.tiers ? args.tiers.split(",").map((n) => parseInt(n, 10)) : [];

async function ensure(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function encodeOne(inPng, outWebp, width) {
  const flags = ["-q", QUALITY, "-m", "6", "-af", "-mt"];
  if (width) flags.push("-resize", String(width), "0");
  flags.push(inPng, "-o", outWebp);
  await run("cwebp", flags);
}

async function main() {
  const files = (await fs.readdir(SOURCE))
    .filter((f) => f.toLowerCase().endsWith(".png"))
    .sort();

  if (!files.length) {
    console.error(`No PNGs in ${SOURCE}. Export your Blender sequence there first.`);
    process.exit(1);
  }

  console.log(`Encoding ${files.length} frame(s) at quality ${QUALITY}…`);
  await ensure(OUT);

  const allWidths = [null, ...TIERS]; // null = full-size into /hero/
  for (const width of allWidths) {
    const dir = width ? path.join(OUT, String(width)) : OUT;
    if (width) await ensure(dir);
    for (const f of files) {
      const num = f.match(/\d+/)?.[0].padStart(4, "0");
      if (!num) continue;
      const out = path.join(dir, `${num}.webp`);
      await encodeOne(path.join(SOURCE, f), out, width);
      process.stdout.write(".");
    }
    process.stdout.write("\n");
  }

  console.log(`Done. Frames at ${OUT}`);
  console.log(`Don't forget to drop a fallback.jpg (frame ~60) in the same folder.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
