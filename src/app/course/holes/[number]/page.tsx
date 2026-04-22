import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { HOLES, SCORECARD_IMAGES } from "@/data/holes";
import BookButton from "@/components/BookButton";
import { breadcrumbJsonLd } from "@/lib/schema";

export function generateStaticParams() {
  return HOLES.map((h) => ({ number: String(h.number) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ number: string }>;
}): Promise<Metadata> {
  const { number } = await params;
  const hole = HOLES.find((h) => h.number === Number(number));
  if (!hole) return {};
  return {
    title: `Hole ${hole.number}`,
    description: `Hole ${hole.number} at Birchbank Golf Course. See the full scorecard for par, yardage, and stroke index.`,
    alternates: { canonical: `/course/holes/${hole.number}` },
  };
}

export default async function HolePage({
  params,
}: {
  params: Promise<{ number: string }>;
}) {
  const { number } = await params;
  const holeNumber = Number(number);
  const hole = HOLES.find((h) => h.number === holeNumber);
  if (!hole) notFound();

  const prev = HOLES.find((h) => h.number === holeNumber - 1);
  const next = HOLES.find((h) => h.number === holeNumber + 1);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", url: "/" },
              { name: "Course", url: "/course" },
              { name: `Hole ${hole.number}`, url: `/course/holes/${hole.number}` },
            ]),
          ),
        }}
      />

      <section className="pt-36 pb-16 container-edge">
        <p className="eyebrow mb-6">
          <Link href="/course" className="hover:text-amber">Course</Link>
          <span className="mx-2 text-silt">/</span>
          Hole {hole.number}
        </p>
        <h1 className="display-xl mb-8">Hole {hole.number}</h1>

        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-8 prose-editorial text-granite/85">
            <p>
              Hole-by-hole yardages, par, stroke index, strategy notes, and pro tips are
              published on the course's scorecard. When the full data is supplied, this
              page will feature the commissioned hero image, flyover video, and a per-hole
              strategy from the pro.
            </p>
            <p className="mt-4">
              For now, the scorecard is viewable in full on the course page.
            </p>
          </div>

          <aside className="md:col-span-4 md:sticky md:top-28 md:self-start">
            <div className="border border-granite/15 p-6 font-mono text-sm">
              <dl className="grid grid-cols-2 gap-y-4 gap-x-6">
                <dt className="text-silt">Par</dt><dd className="text-right text-silt">—</dd>
                <dt className="text-silt">Stroke index</dt><dd className="text-right text-silt">—</dd>
                <dt className="text-silt">Gold</dt><dd className="text-right text-silt">—</dd>
                <dt className="text-silt">Blue</dt><dd className="text-right text-silt">—</dd>
                <dt className="text-silt">Combo</dt><dd className="text-right text-silt">—</dd>
                <dt className="text-silt">White</dt><dd className="text-right text-silt">—</dd>
                <dt className="text-silt">Red</dt><dd className="text-right text-silt">—</dd>
              </dl>
              <p className="mt-4 pt-4 border-t border-granite/10 text-xs text-silt not-italic">
                Awaiting per-hole data from the scorecard.
              </p>
            </div>
            <BookButton className="mt-6 w-full justify-between" />
          </aside>
        </div>
      </section>

      <section className="pb-[var(--spacing-section)] container-edge">
        <p className="eyebrow mb-4">Scorecard reference</p>
        <div className="relative aspect-[16/7] bg-granite/5">
          <Image
            src={SCORECARD_IMAGES.inside}
            alt="Scorecard — inside"
            fill
            sizes="100vw"
            className="object-contain"
            unoptimized
          />
        </div>
      </section>

      <section className="pb-[var(--spacing-section)] container-edge">
        <div className="grid grid-cols-2 border-t border-granite/15 pt-10">
          <div>
            {prev && (
              <Link href={`/course/holes/${prev.number}`} className="block group">
                <p className="eyebrow mb-2 group-hover:text-amber">← Previous hole</p>
                <p className="font-display text-2xl">Hole {prev.number}</p>
              </Link>
            )}
          </div>
          <div className="text-right">
            {next && (
              <Link href={`/course/holes/${next.number}`} className="block group">
                <p className="eyebrow mb-2 group-hover:text-amber">Next hole →</p>
                <p className="font-display text-2xl">Hole {next.number}</p>
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
