import type { Metadata } from "next";
import Link from "next/link";
import { SCORECARD_IMAGES, COURSE_FACTS, TEES, HOLE_SUMMARY } from "@/data/holes";
import ScorecardSwitcher from "@/components/ScorecardSwitcher";
import ScorecardCard from "@/components/ScorecardCard";

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

      {/* Printable take-with-you scorecards */}
      <div className="mt-16">
        <div className="mb-8 max-w-2xl">
          <p className="eyebrow mb-4">Print, fold, walk</p>
          <h2 className="display-md font-display mb-4">
            Two cards you can print and bring along.
          </h2>
          <p className="prose-editorial text-granite/85">
            The Classic Scorecard for tracking the round; the Course Atlas for the
            routing, RCGA local rules, fairway markers, and pin colours. Click either
            to view full size, or download to print at home.
          </p>
        </div>
        <div className="grid gap-8 md:gap-10 md:grid-cols-2 items-start">
          <ScorecardCard
            src={SCORECARD_IMAGES.classic}
            alt="Birchbank Classic Scorecard with yardages and HCP for Blue, Combo, White, and Red tees, plus par and ladies' HCP"
            title="Birchbank Classic Scorecard"
            caption="Classic Scorecard · all four tees, par, HCP"
            downloadName="birchbank-classic-scorecard.png"
            ratio="5/4"
          />
          <ScorecardCard
            src={SCORECARD_IMAGES.atlas}
            alt="Birchbank Course Atlas with the routing diagram, RCGA local rules, fairway markers, and flag positions, signed by Director of Golf Jeff Papilion"
            title="Birchbank Course Atlas"
            caption="Course Atlas · routing, local rules, pin colours"
            downloadName="birchbank-course-atlas.jpg"
            ratio="5/4"
          />
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="/api/scorecard"
            download="birchbank-scorecard.pdf"
            className="btn-ghost"
          >
            Both cards as a single PDF ↓
          </a>
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
