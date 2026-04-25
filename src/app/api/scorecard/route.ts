import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { readFileSync } from "fs";
import path from "path";

/**
 * GET /api/scorecard, returns the Birchbank printed scorecard as a
 * single-download PDF. Two pages:
 *   1. Classic Scorecard (PNG) -- yardages and HCP for all four tees,
 *      par, and ladies' HCP. The card a golfer brings to the first tee.
 *   2. Course Atlas (JPG)      -- the routing diagram, RCGA local
 *      rules, fairway markers, and pin colours.
 *
 * Source images live at public/scorecard/classic.png and
 * public/scorecard/atlas.jpg, committed to this repo so the PDF is
 * self-contained (no runtime fetch from a third-party domain).
 *
 * Rendered on demand at the edge and cached by the CDN for a day.
 * Content-Disposition attachment forces a download rather than inline
 * preview, which is the behavior a golfer printing off a scorecard
 * before their round actually wants.
 */

export const dynamic = "force-static";
export const revalidate = 86400; // 24h

async function buildPdf(): Promise<Uint8Array> {
  const classic = readFileSync(path.join(process.cwd(), "public/scorecard/classic.png"));
  const atlas = readFileSync(path.join(process.cwd(), "public/scorecard/atlas.jpg"));

  const pdf = await PDFDocument.create();
  pdf.setTitle("Birchbank Golf Course. Scorecard");
  pdf.setAuthor("Birchbank Golf Course");
  pdf.setSubject("Printed Birchbank scorecard. Par 72, four sets of tees");
  pdf.setCreator("birchbankgolf.com");
  pdf.setProducer("birchbankgolf.com");
  pdf.setCreationDate(new Date());

  const font = await pdf.embedFont(StandardFonts.Helvetica);

  // Landscape letter (the printed scorecard's native aspect works best here).
  const pageWidth = 792;  // 11in
  const pageHeight = 612; // 8.5in
  const margin = 28;

  type Page = { label: string; bytes: Buffer; kind: "png" | "jpg" };
  const pages: Page[] = [
    { label: "Classic Scorecard, all four tees", bytes: classic, kind: "png" },
    { label: "Course Atlas, routing & local rules", bytes: atlas, kind: "jpg" },
  ];

  for (const { label, bytes, kind } of pages) {
    const page = pdf.addPage([pageWidth, pageHeight]);
    const image =
      kind === "png" ? await pdf.embedPng(bytes) : await pdf.embedJpg(bytes);

    // Fit within margins preserving aspect ratio.
    const maxW = pageWidth - margin * 2;
    const maxH = pageHeight - margin * 2 - 24; // leave room for footer
    const scale = Math.min(maxW / image.width, maxH / image.height);
    const drawW = image.width * scale;
    const drawH = image.height * scale;
    const x = (pageWidth - drawW) / 2;
    const y = (pageHeight - drawH) / 2 + 10;

    page.drawImage(image, { x, y, width: drawW, height: drawH });

    // Page footer with source credit so anyone printing the PDF knows
    // where it came from -- helpful for Pro Shop drop-ins.
    page.drawText("Birchbank Golf Course  ·  5500 Highway 22, Genelle BC  ·  birchbankgolf.com  ·  250-693-2255", {
      x: margin,
      y: margin / 2,
      size: 8,
      font,
      color: rgb(0.55, 0.55, 0.55),
    });
    page.drawText(label, {
      x: pageWidth - margin - 160,
      y: margin / 2,
      size: 8,
      font,
      color: rgb(0.55, 0.55, 0.55),
    });
  }

  return await pdf.save();
}

export async function GET() {
  const bytes = await buildPdf();
  return new NextResponse(bytes as unknown as BodyInit, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="birchbank-scorecard.pdf"',
      "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
