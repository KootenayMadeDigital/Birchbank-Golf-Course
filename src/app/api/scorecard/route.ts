import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { readFileSync } from "fs";
import path from "path";

/**
 * GET /api/scorecard, returns the Birchbank printed scorecard as a
 * single-download PDF. Two pages: inside (scoring grid + all tees) and
 * back (course map + local rules).
 *
 * Source images live at public/scorecard/inside.jpg and
 * public/scorecard/back.jpg -- they are the exact 2020 scorecard
 * JPEGs published by birchbankgolf.com, committed to this repo so the
 * PDF is self-contained (no runtime fetch from a third-party domain).
 *
 * Rendered on demand at the edge and cached by the CDN for a day.
 * Content-Disposition attachment forces a download rather than inline
 * preview, which is the behavior a golfer printing off a scorecard
 * before their round actually wants.
 */

export const dynamic = "force-static";
export const revalidate = 86400; // 24h

async function buildPdf(): Promise<Uint8Array> {
  const inside = readFileSync(path.join(process.cwd(), "public/scorecard/inside.jpg"));
  const back = readFileSync(path.join(process.cwd(), "public/scorecard/back.jpg"));

  const pdf = await PDFDocument.create();
  pdf.setTitle("Birchbank Golf Course. Scorecard");
  pdf.setAuthor("Birchbank Golf Course");
  pdf.setSubject("Printed scorecard (2020 edition). Par 72, five sets of tees");
  pdf.setCreator("birchbankgolf.com");
  pdf.setProducer("birchbankgolf.com");
  pdf.setCreationDate(new Date());

  const font = await pdf.embedFont(StandardFonts.Helvetica);

  // Landscape letter (the printed scorecard's native aspect works best here).
  const pageWidth = 792;  // 11in
  const pageHeight = 612; // 8.5in
  const margin = 28;

  for (const [label, bytes] of [["Inside, scoring grid", inside], ["Back, course map & local rules", back]] as const) {
    const page = pdf.addPage([pageWidth, pageHeight]);
    const image = await pdf.embedJpg(bytes);

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
