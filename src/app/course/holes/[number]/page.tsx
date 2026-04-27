import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { HOLES } from "@/data/holes";
import BookButton from "@/components/BookButton";
import HoleTeeSwitcher from "@/components/HoleTeeSwitcher";
import RoundProgress from "@/components/RoundProgress";
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
  const title = hole.name ? `${hole.name} · Hole ${hole.number}` : `Hole ${hole.number}. Par ${hole.par}`;
  return {
    title,
    description: `${hole.name ? hole.name + ", " : ""}Par ${hole.par}${blue ? `, ${blue} yards from the Blue tees` : ""}. Stroke index ${hole.strokeIndex} at Birchbank Golf Course.`,
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

  // Front/back marker + round position for the cinematic hero eyebrow.
  const isFront = holeNumber <= 9;
  const nineLabel = isFront ? "FRONT NINE" : "BACK NINE";
  const positionInNine = isFront ? holeNumber : holeNumber - 9;

  // Specials that deserve a micro-badge next to the number.
  const badges: string[] = [];
  if (hole.signature) badges.push("Signature");
  if (hole.strokeIndex === 1) badges.push("Stroke index 1");
  if ((holeNumber === 12 || holeNumber === 15) && !hole.signature) badges.push("Pond in play");

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

      {/* Cinematic hero.
          Massive hole number (display serif) pins the left; the hole
          name, specs, and description occupy the right. Reads like the
          cover of a single-hole zine. */}
      <section className="pt-32 md:pt-36 pb-10 bg-paper">
        <div className="container-edge">
          <nav className="eyebrow mb-8 flex flex-wrap items-center gap-x-3 gap-y-2">
            <Link href="/course" className="hover:text-amber">Course</Link>
            <span className="text-silt/60">/</span>
            <span>{nineLabel} · {positionInNine} of 9</span>
            {badges.map((b) => (
              <span
                key={b}
                className="inline-flex items-center px-2 py-0.5 bg-tamarack text-paper text-[10px] font-mono uppercase tracking-widest rounded-sm"
              >
                {b}
              </span>
            ))}
          </nav>

          <div className="grid gap-6 md:gap-10 md:grid-cols-12 items-start">
            {/* Huge hole number, with optional SVG shape watermark behind */}
            <div className="md:col-span-4 lg:col-span-3">
              <p
                className="font-display text-granite leading-[0.85] tabular-nums"
                style={{
                  fontSize: "clamp(7rem, 22vw, 16rem)",
                  letterSpacing: "-0.04em",
                }}
                aria-hidden
              >
                {String(hole.number).padStart(2, "0")}
              </p>
              <p className="sr-only">Hole {hole.number}</p>
              <p className="font-mono text-xs uppercase tracking-widest text-silt mt-2">
                Par {hole.par} · {hole.yardage.blue} yd · HCP {hole.strokeIndex}
              </p>
            </div>

            {/* Editorial column */}
            <div className="md:col-span-8 lg:col-span-9 md:pt-4">
              {hole.name ? (
                <h1
                  className="font-display text-granite"
                  style={{
                    fontSize: "clamp(2.25rem, 5.5vw, 4.5rem)",
                    lineHeight: "1.02",
                    letterSpacing: "-0.015em",
                  }}
                >
                  {hole.name}
                </h1>
              ) : (
                <h1
                  className="font-display text-granite"
                  style={{
                    fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                    lineHeight: "1.02",
                    letterSpacing: "-0.015em",
                  }}
                >
                  Hole {hole.number} · Par {hole.par}
                </h1>
              )}

              {hole.description && (
                <p className="prose-editorial text-granite/85 mt-6 max-w-2xl">
                  {hole.description}
                </p>
              )}

              {/* Pro tip, only when we have a verified quote/paraphrase. */}
              {hole.proTip && (
                <div className="mt-8 max-w-2xl border-l-2 border-tamarack pl-5">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-tamarack mb-2">
                    From the head pro
                  </p>
                  <p className="prose-editorial text-granite/90 italic">&ldquo;{hole.proTip}&rdquo;</p>
                  <p className="mt-3 font-mono text-xs text-silt">
                    Jeff Papilion · Director of Golf, CPGA
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured photograph, only when credited photo exists. Capped
          at max-w-3xl with a consistent 4/3 frame so the photo reads
          as a contained editorial moment rather than a full-bleed
          marquee that dominates the page flow. The existing .hole-photo
          class preserves the ken-burns CSS animation; border + paper
          background match the rest of the site's editorial cards. */}
      {hole.photo && (
        <section className="pb-12 bg-paper">
          <div className="container-edge">
            <figure className="max-w-3xl mx-auto">
              <div className="hole-photo group relative aspect-[4/3] bg-granite/5 overflow-hidden border border-granite/10 rounded-sm">
                <Image
                  src={hole.photo.src}
                  alt={hole.photo.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover hole-photo__img"
                  priority
                />
              </div>
              <figcaption className="mt-3 font-mono text-xs text-silt text-center">
                {hole.photo.credit}
                {hole.photo.source && (
                  <>
                    {" · "}
                    <a
                      href={hole.photo.source.href}
                      target="_blank"
                      rel="noopener"
                      className="underline hover:text-amber"
                    >
                      {hole.photo.source.label} ↗
                    </a>
                  </>
                )}
              </figcaption>
            </figure>
          </div>
        </section>
      )}

      {/* Interactive tee switcher + Book CTA sidebar */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge grid gap-10 md:grid-cols-12 items-start">
          <div className="md:col-span-8">
            <HoleTeeSwitcher hole={hole} />
          </div>

          <aside className="md:col-span-4 md:sticky md:top-32 self-start">
            <div className="border border-granite/15 bg-paper p-6 md:p-7">
              <p className="eyebrow mb-4 text-cedar">At a glance</p>
              <dl className="grid grid-cols-2 gap-y-4 gap-x-6 font-mono text-sm">
                <dt className="text-silt">Par</dt>
                <dd className="text-right font-display text-xl text-granite">{hole.par}</dd>

                <dt className="text-silt">HCP (Blue)</dt>
                <dd className="text-right font-display text-xl text-granite">{hole.strokeIndex}</dd>

                {hole.strokeIndexForward != null && hole.strokeIndexForward !== hole.strokeIndex && (
                  <>
                    <dt className="text-silt">HCP (fwd)</dt>
                    <dd className="text-right font-display text-xl text-granite">{hole.strokeIndexForward}</dd>
                  </>
                )}

                {hole.yardage.blue != null && (
                  <>
                    <dt className="text-silt">Blue</dt>
                    <dd className="text-right">{hole.yardage.blue} yd</dd>
                  </>
                )}
                {hole.yardage.white != null && (
                  <>
                    <dt className="text-silt">White</dt>
                    <dd className="text-right">{hole.yardage.white} yd</dd>
                  </>
                )}
                {hole.yardage.red != null && (
                  <>
                    <dt className="text-silt">Red</dt>
                    <dd className="text-right">{hole.yardage.red} yd</dd>
                  </>
                )}
              </dl>
            </div>
            <BookButton className="mt-5 w-full justify-between" />
          </aside>
        </div>
      </section>

      {/* Round-progress strip, the 18-dot paper-scorecard margin. */}
      <RoundProgress current={hole.number} />

      {/* Prev / next + scorecard shortcuts */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge">
          <div className="grid grid-cols-2 gap-5 md:gap-8">
            {prev ? (
              <Link
                href={`/course/holes/${prev.number}`}
                className="group block border border-granite/15 p-6 md:p-7 hover:border-amber transition-colors"
              >
                <p className="font-mono text-[11px] uppercase tracking-widest text-silt group-hover:text-amber transition-colors">
                  ← Previous hole
                </p>
                <p className="font-display text-3xl md:text-4xl text-granite mt-3">
                  {String(prev.number).padStart(2, "0")}
                </p>
                <p className="font-display text-lg text-granite/80 mt-1">
                  {prev.name ?? `Par ${prev.par}`}
                </p>
                <p className="font-mono text-xs text-silt mt-3">
                  Par {prev.par}
                  {prev.yardage.blue != null && <> · {prev.yardage.blue} yd</>}
                </p>
              </Link>
            ) : (
              <div />
            )}

            {next ? (
              <Link
                href={`/course/holes/${next.number}`}
                className="group block border border-granite/15 p-6 md:p-7 hover:border-amber transition-colors text-right"
              >
                <p className="font-mono text-[11px] uppercase tracking-widest text-silt group-hover:text-amber transition-colors">
                  Next hole →
                </p>
                <p className="font-display text-3xl md:text-4xl text-granite mt-3">
                  {String(next.number).padStart(2, "0")}
                </p>
                <p className="font-display text-lg text-granite/80 mt-1">
                  {next.name ?? `Par ${next.par}`}
                </p>
                <p className="font-mono text-xs text-silt mt-3">
                  Par {next.par}
                  {next.yardage.blue != null && <> · {next.yardage.blue} yd</>}
                </p>
              </Link>
            ) : (
              <Link
                href="/course"
                className="group block border border-granite/15 p-6 md:p-7 hover:border-amber transition-colors text-right"
              >
                <p className="font-mono text-[11px] uppercase tracking-widest text-silt group-hover:text-amber transition-colors">
                  Round complete →
                </p>
                <p className="font-display text-3xl md:text-4xl text-granite mt-3">18</p>
                <p className="font-display text-lg text-granite/80 mt-1">Back to the course</p>
                <p className="font-mono text-xs text-silt mt-3">
                  Par 72 · 18 holes · Columbia River
                </p>
              </Link>
            )}
          </div>

          {/* Compact scorecard reference */}
          <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-b border-granite/15 py-5 font-mono text-xs md:text-sm text-silt">
            <span className="eyebrow">Scorecard</span>
            <Link href="/course/scorecard" className="text-granite hover:text-amber underline underline-offset-2">
              Full interactive scorecard →
            </Link>
            <a
              href="/api/scorecard"
              download="birchbank-scorecard.pdf"
              className="text-granite hover:text-amber underline underline-offset-2"
            >
              Download scorecard PDF ↓
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
