import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { HOLES, SCORECARD_IMAGES, TEES } from "@/data/holes";
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
  const blue = hole.yardage.blue;
  return {
    title: `Hole ${hole.number} — Par ${hole.par}`,
    description: `Par ${hole.par}${blue ? `, ${blue} yards from the Blue tees` : ""}. Stroke index ${hole.strokeIndex}. Hole ${hole.number} at Birchbank Golf Course.`,
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

  // Hole-specific factual callouts (verified from birchbankgolf.com + scorecard).
  const specialNote = (() => {
    if (holeNumber === 12 || holeNumber === 15) {
      return "New irrigation pond in play from the 2018 reconfiguration.";
    }
    if (hole.strokeIndex === 1) return "The hardest hole on the course (stroke index 1).";
    if (hole.strokeIndex === 18) return "The easiest hole on the course (stroke index 18).";
    if (holeNumber === 1) return "The opening tee — the first of 18 along the Columbia.";
    if (holeNumber === 18) return "The finishing hole, walking back to the clubhouse.";
    return null;
  })();

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
        <h1 className="display-xl mb-4">
          Hole {hole.number}
          <span className="text-silt font-display text-3xl md:text-4xl ml-4">
            · Par {hole.par}
          </span>
        </h1>

        {specialNote && (
          <p className="prose-editorial text-granite/85 mt-2 mb-8 max-w-2xl">{specialNote}</p>
        )}

        <div className="grid gap-10 md:grid-cols-12 mt-8">
          <div className="md:col-span-8">
            <p className="eyebrow mb-4">Yardage &amp; handicap</p>
            <ul className="divide-y divide-granite/12 border-t border-b border-granite/15 font-mono text-sm">
              {TEES.filter((t) => hole.yardage[t.key] != null).map((t) => {
                const y = hole.yardage[t.key];
                const forwardHcp = t.key === "white" || t.key === "red";
                const hcp = forwardHcp ? (hole.strokeIndexForward ?? hole.strokeIndex) : hole.strokeIndex;
                return (
                  <li key={t.key} className="grid grid-cols-3 gap-4 py-4 items-baseline">
                    <span className="text-silt">{t.name}</span>
                    <span className="font-display text-granite text-lg">
                      {y} <span className="text-silt text-sm">yd</span>
                    </span>
                    <span className="text-right text-silt">
                      HCP <span className="text-granite">{hcp}</span>
                    </span>
                  </li>
                );
              })}
            </ul>

            <p className="mt-8 text-sm text-silt">
              Par {hole.par} · Stroke index {hole.strokeIndex} (Blue)
              {hole.strokeIndexForward != null && hole.strokeIndexForward !== hole.strokeIndex && (
                <> / {hole.strokeIndexForward} (White &amp; Red)</>
              )}
            </p>
          </div>

          <aside className="md:col-span-4 md:sticky md:top-28 md:self-start">
            <div className="border border-granite/15 p-6 bg-paper">
              <p className="eyebrow mb-4 text-amber">Quick stats</p>
              <dl className="grid grid-cols-2 gap-y-4 gap-x-6 font-mono text-sm">
                <dt className="text-silt">Par</dt>
                <dd className="text-right font-display text-xl text-granite">{hole.par}</dd>
                <dt className="text-silt">HCP (Blue)</dt>
                <dd className="text-right font-display text-xl text-granite">{hole.strokeIndex}</dd>
                {hole.yardage.blue && (
                  <>
                    <dt className="text-silt">Blue</dt>
                    <dd className="text-right">{hole.yardage.blue} yd</dd>
                  </>
                )}
                {hole.yardage.white && (
                  <>
                    <dt className="text-silt">White</dt>
                    <dd className="text-right">{hole.yardage.white} yd</dd>
                  </>
                )}
                {hole.yardage.red && (
                  <>
                    <dt className="text-silt">Red</dt>
                    <dd className="text-right">{hole.yardage.red} yd</dd>
                  </>
                )}
              </dl>
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
                <p className="font-display text-2xl">
                  Hole {prev.number}
                  <span className="text-silt text-base ml-3">Par {prev.par}</span>
                </p>
              </Link>
            )}
          </div>
          <div className="text-right">
            {next && (
              <Link href={`/course/holes/${next.number}`} className="block group">
                <p className="eyebrow mb-2 group-hover:text-amber">Next hole →</p>
                <p className="font-display text-2xl">
                  Hole {next.number}
                  <span className="text-silt text-base ml-3">Par {next.par}</span>
                </p>
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
