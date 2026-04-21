import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SCORECARD_IMAGES, COURSE_FACTS } from "@/data/holes";

export const metadata: Metadata = {
  title: "Course layout & scorecard",
  description: "The Birchbank Golf Course scorecard. Pick up a printed card in the Pro Shop or view online.",
  alternates: { canonical: "/course/scorecard" },
};

export default function Scorecard() {
  return (
    <section className="pt-36 pb-[var(--spacing-section)] container-edge">
      <p className="eyebrow mb-6">Course layout & scorecard</p>
      <h1 className="display-xl mb-10 max-w-[20ch]">
        Eighteen holes along the Columbia.
      </h1>
      <p className="prose-editorial max-w-2xl text-granite/85 mb-14">
        As of June 1, {new Date(COURSE_FACTS.reconfiguredOn).getFullYear()}, Birchbank has
        been reconfigured to resemble the course as it was originally built. The new
        irrigation system features ponds at holes 12 and 15. Pick up a new scorecard in
        the Pro Shop when you check in.
      </p>

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
        Per-hole yardages and stroke indices are printed on the scorecard above. Once
        transcribed (or supplied by the course), we'll render them as sortable tables and
        individual hole pages.
      </div>

      <div className="mt-12 flex flex-wrap gap-4">
        <Link href="/book" className="btn-primary">Book a tee time</Link>
        <Link href="/course" className="btn-ghost">Course overview</Link>
      </div>
    </section>
  );
}
