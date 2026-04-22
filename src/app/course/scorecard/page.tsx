import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SCORECARD_IMAGES, COURSE_FACTS, TEES, HOLE_SUMMARY } from "@/data/holes";

export const metadata: Metadata = {
  title: "Course layout & scorecard",
  description: "Par 72, 6,788 yards from the Gold tees. Five sets of tees: Gold, Blue, Combo, White, Red. View the full scorecard online or pick up a printed card at the Pro Shop.",
  alternates: { canonical: "/course/scorecard" },
};

export default function Scorecard() {
  return (
    <section className="pt-36 pb-[var(--spacing-section)] container-edge">
      <p className="eyebrow mb-6">Course layout & scorecard</p>
      <h1 className="display-xl mb-10 max-w-[20ch]">
        Par 72. Five sets of tees.
      </h1>
      <p className="prose-editorial max-w-2xl text-granite/85 mb-10">
        As of June 1, {new Date(COURSE_FACTS.reconfiguredOn).getFullYear()}, Birchbank has
        been reconfigured to resemble the course as it was originally built. The new
        irrigation system features ponds at holes 12 and 15. Pick up a new scorecard in
        the Pro Shop when you check in.
      </p>

      <div className="mb-14 border-t border-b border-granite/15 py-6">
        <p className="eyebrow mb-4">Total yardage by tee</p>
        <ul className="grid grid-cols-2 sm:grid-cols-5 gap-y-3 font-mono text-sm">
          {TEES.map((t) => (
            <li key={t.name}>
              <div className="text-silt text-xs">{t.name}</div>
              <div className="font-display text-2xl text-granite">
                {t.total.toLocaleString()}
                <span className="text-silt text-base"> yd</span>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-6 font-mono text-sm text-silt">
          Par <span className="text-granite">{HOLE_SUMMARY.par}</span> · 18 holes
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <figure>
          <p className="eyebrow mb-3">Scorecard — inside</p>
          <div className="bg-granite/5 relative aspect-[16/9]">
            <Image
              src={SCORECARD_IMAGES.inside}
              alt="Birchbank Golf Course scorecard — inside"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
              unoptimized
            />
          </div>
        </figure>
        <figure>
          <p className="eyebrow mb-3">Scorecard — back</p>
          <div className="bg-granite/5 relative aspect-[16/9]">
            <Image
              src={SCORECARD_IMAGES.back}
              alt="Birchbank Golf Course scorecard — back"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
              unoptimized
            />
          </div>
        </figure>
      </div>

      <div className="mt-10 p-6 border border-granite/15 text-sm text-silt">
        Per-hole yardages, pars, and stroke indices are printed on the scorecard above.
        Once transcribed from the image, individual hole pages will light up with
        strategy notes, pro tips, and per-tee yardage tables.
      </div>

      <div className="mt-12 flex flex-wrap gap-4">
        <Link href="/book" className="btn-primary">Book a tee time</Link>
        <Link href="/course" className="btn-ghost">Course overview</Link>
      </div>
    </section>
  );
}
