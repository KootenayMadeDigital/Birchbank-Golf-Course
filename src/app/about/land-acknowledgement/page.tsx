import type { Metadata } from "next";

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
