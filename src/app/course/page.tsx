import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import BookButton from "@/components/BookButton";
import SectionHeading from "@/components/SectionHeading";
import { SCORECARD_IMAGES, COURSE_FACTS } from "@/data/holes";
import { breadcrumbJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "The course",
  description: "Eighteen holes set along the banks of the Columbia River in Genelle, BC. Back nine and clubhouse designed by Roy Stone, opened 1969. Driving range on site.",
  alternates: { canonical: "/course" },
};

export default function CoursePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", url: "/" },
              { name: "Course", url: "/course" },
            ]),
          ),
        }}
      />

      <section className="pt-40 pb-20 container-edge">
        <p className="eyebrow mb-6">The course</p>
        <h1 className="display-xl max-w-[18ch] mb-10">
          Eighteen holes<br />along the Columbia.
        </h1>
        <p className="prose-editorial max-w-2xl text-granite/85">
          Birchbank is the 18-hole course of the Rossland Trail Country Club, set along
          the west bank of the Columbia River in Genelle, BC. Construction began in 1962;
          the first nine holes opened in 1964 and the back nine in 1969, designed by
          local golf professional Roy Stone. A driving range and Pro Shop are on site.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <BookButton />
          <Link href="/course/scorecard" className="btn-ghost">Course layout & scorecard →</Link>
          <Link href="/rates" className="btn-ghost">Rates →</Link>
        </div>
      </section>

      <div className="container-edge"><div className="rule-hair" /></div>

      <section className="py-[var(--spacing-section)] container-edge">
        <SectionHeading
          eyebrow="As it was originally built"
          title="Restored to the 1969 routing."
          lede={`As of June 1, ${new Date(COURSE_FACTS.reconfiguredOn).getFullYear()}, the course was reconfigured to resemble the layout as it was originally built. Improvements since 2004 include green reconstruction, hole relocations, new bunkers and tees, and a new irrigation system with ponds at holes 12 and 15.`}
        />

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <figure>
            <div className="relative aspect-[16/10] bg-granite/5">
              <Image
                src={SCORECARD_IMAGES.inside}
                alt="Birchbank scorecard — inside"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
                unoptimized
              />
            </div>
            <figcaption className="mt-2 text-xs text-silt">Scorecard — inside</figcaption>
          </figure>
          <figure>
            <div className="relative aspect-[16/10] bg-granite/5">
              <Image
                src={SCORECARD_IMAGES.back}
                alt="Birchbank scorecard — back"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
                unoptimized
              />
            </div>
            <figcaption className="mt-2 text-xs text-silt">Scorecard — back</figcaption>
          </figure>
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link href="/course/scorecard" className="btn-primary">Full scorecard</Link>
          <Link href="/course/history" className="btn-ghost">Club history →</Link>
        </div>
      </section>
    </>
  );
}
