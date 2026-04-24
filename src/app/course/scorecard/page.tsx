import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SCORECARD_IMAGES, COURSE_FACTS, TEES, HOLE_SUMMARY } from "@/data/holes";
import ScorecardSwitcher from "@/components/ScorecardSwitcher";

export const metadata: Metadata = {
  title: "Course layout & scorecard",
  description: "Par 72, 6,584 yards from the Blue tees (rating 71.5 / slope 121). Full per-hole yardage and stroke index for Blue, Combo, White, and Red tees.",
  alternates: { canonical: "/course/scorecard" },
};

export default function Scorecard() {
  return (
    <section className="pt-36 pb-[var(--spacing-section)] container-edge">
      <p className="eyebrow mb-6">Course layout & scorecard</p>
      <h1 className="display-xl mb-10 max-w-[20ch]">Par 72. Four sets of tees.</h1>
      <p className="prose-editorial max-w-2xl text-granite/85 mb-10">
        As of June 1, {new Date(COURSE_FACTS.reconfiguredOn).getFullYear()}, Birchbank has
        been reconfigured to resemble the course as it was originally built. The
        irrigation system features ponds at holes 12 and 15. Pick up a printed card at
        the Pro Shop, or use the full scorecard below.
      </p>

      {/* Totals overview */}
      <div className="mb-14 border-t border-b border-granite/15 py-6">
        <p className="eyebrow mb-4">Total yardage by tee</p>
        <ul className="grid grid-cols-2 sm:grid-cols-5 gap-y-4 gap-x-6 font-mono text-sm">
          {TEES.map((t) => (
            <li key={t.name}>
              <div className="text-silt text-xs">{t.name}</div>
              <div className="font-display text-2xl text-granite">
                {t.total.toLocaleString()}
                <span className="text-silt text-base"> yd</span>
              </div>
              {t.courseRating && (
                <div className="text-silt text-xs mt-1">
                  {t.courseRating.toFixed(1)} / {t.slopeRating}
                </div>
              )}
            </li>
          ))}
        </ul>
        <p className="mt-5 font-mono text-sm text-silt">
          Par <span className="text-granite">{HOLE_SUMMARY.par}</span> · 18 holes · Genelle, BC
        </p>
      </div>

      {/* Interactive scorecard */}
      <div className="mb-16">
        <ScorecardSwitcher initialTee="blue" />
      </div>

      {/* Printed scorecard reference */}
      <div className="mt-16">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <p className="eyebrow">Printed scorecard reference</p>
          <a
            href="/api/scorecard"
            download="birchbank-scorecard.pdf"
            className="font-mono text-xs text-amber hover:text-amber-dark underline underline-offset-2"
          >
            Download scorecard PDF ↓
          </a>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <figure>
            <p className="text-xs text-silt font-mono mb-3">Inside</p>
            <div className="bg-granite/5 relative aspect-[16/9]">
              <Image
                src={SCORECARD_IMAGES.inside}
                alt="Birchbank Golf Course scorecard, inside"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
                unoptimized
              />
            </div>
          </figure>
          <figure>
            <p className="text-xs text-silt font-mono mb-3">Back</p>
            <div className="bg-granite/5 relative aspect-[16/9]">
              <Image
                src={SCORECARD_IMAGES.back}
                alt="Birchbank Golf Course scorecard, back"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
                unoptimized
              />
            </div>
          </figure>
        </div>
      </div>

      <div className="mt-12 flex flex-wrap gap-4">
        <Link href="/book" className="btn-primary">Book a tee time</Link>
        <a
          href="/api/scorecard"
          download="birchbank-scorecard.pdf"
          className="btn-ghost"
        >
          Download scorecard PDF ↓
        </a>
        <Link href="/course" className="btn-ghost">Course overview</Link>
      </div>
    </section>
  );
}
