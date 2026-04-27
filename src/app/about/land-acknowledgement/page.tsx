import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Land acknowledgement",
  description: "Birchbank Golf Course sits within the traditional and unceded territories of the Sinixt (Lakes) and Ktunaxa peoples along the Columbia River.",
  alternates: { canonical: "/about/land-acknowledgement" },
};

// This page is a standing acknowledgement. Specific cultural protocols or Nation
// recognitions should be reviewed and approved by the Nations' offices before
// publication. Draft only.
export default function LandAcknowledgement() {
  return (
    <section className="pt-40 pb-[var(--spacing-section)] container-edge">
      <p className="eyebrow mb-6">Land acknowledgement</p>
      <h1 className="display-xl max-w-[22ch] mb-12">
        The land was here long before the course.
      </h1>

      {/* Quiet contemplative photo: a bench in a birch grove, dappled
          afternoon light. Tone match for the page. */}
      <figure className="max-w-2xl mb-10">
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-granite/5 border border-granite/10 rounded-sm">
          <Image
            src="/about/bench-grove.webp"
            alt="A wooden bench in a grove of birches at Birchbank, dappled afternoon light through the leaves"
            fill
            sizes="(max-width: 768px) 100vw, 672px"
            className="object-cover"
            loading="lazy"
            unoptimized
          />
        </div>
        <figcaption className="mt-3 font-mono text-xs text-silt">
          A grove between the 7th and the 8th.
        </figcaption>
      </figure>

      <div className="max-w-2xl prose-editorial text-granite/90 space-y-6">
        <p>
          Birchbank Golf Course sits within the traditional and unceded territories of the
          Sinixt (sn̓ʕay̓ckstx / Lakes) and Ktunaxa peoples, who have cared for this
          stretch of the Columbia River and its tributaries for generations.
        </p>
        <p>
          We recognize their continuing stewardship of the land we play on.
        </p>

        <p className="pt-6 border-t border-granite/15 text-xs text-silt font-mono not-italic">
          This acknowledgement is a working draft; the course welcomes review and revision
          from the Nations' offices prior to final publication.
        </p>
      </div>
    </section>
  );
}
