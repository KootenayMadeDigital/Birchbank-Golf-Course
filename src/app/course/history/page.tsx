import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Club history",
  description: "The Rossland Trail Country Club was organized on April 22, 1922. Construction of Birchbank began in 1962; Roy Stone designed the back nine and clubhouse, opened 1969.",
  alternates: { canonical: "/course/history" },
};

// All facts below are drawn verbatim from https://www.birchbankgolf.com/club-history/
export default function HistoryPage() {
  return (
    <>
      <section className="pt-40 pb-16 container-edge">
        <p className="eyebrow mb-6">Club history</p>
        <h1 className="display-xl max-w-[20ch] mb-10">
          One hundred years of<br />Rossland Trail golf.
        </h1>
      </section>

      <section className="pb-[var(--spacing-section)] container-edge grid gap-12 md:grid-cols-12">
        <div className="md:col-span-8 md:col-start-3 prose-editorial text-granite/90 space-y-10">
          <div>
            <p className="eyebrow mb-3">In the beginning, the Rossland course</p>
            <p>
              The Rossland Trail Country Club was organized on April 22, 1922. Initial
              membership totalled 81 shareholders, of which 56 were playing members. The
              first course operated on Floyd Ranch (Water Hole) above Warfield. By 1926,
              the club had leased land from Cominco and constructed a nine-hole course in
              Rossland.
            </p>
          </div>

          <div>
            <p className="eyebrow mb-3">Birchbank is added</p>
            <p>
              Construction of the Birchbank course began in 1962 on Cominco-leased
              property. The first nine holes were completed in 1964. The back nine and
              clubhouse opened in 1969, designed by local golf professional Roy Stone. The
              club purchased the Birchbank property from Cominco in 2004.
            </p>
          </div>

          <div>
            <p className="eyebrow mb-3">One great course</p>
            <p>
              The Rossland course closed in 2006 after Cominco sold the land. Birchbank
              has since undergone green reconstruction, hole relocations, new bunkers and
              tees, and a new irrigation system featuring ponds at holes 12 and 15. As of
              June 1, 2018, the course was reconfigured to resemble the layout as it was
              originally built.
            </p>
          </div>
        </div>
      </section>

      <section className="py-[var(--spacing-section)] bg-granite text-paper">
        <div className="container-edge grid gap-12 md:grid-cols-12 items-start">
          <div className="md:col-span-5">
            <p className="eyebrow text-paper/60 mb-5">Timeline</p>
            <p className="display-lg font-display">A century, in dates.</p>
          </div>
          <div className="md:col-span-7">
            <ul className="divide-y divide-paper/20">
              {[
                ["1922", "Rossland Trail Country Club organized, 81 shareholders, 56 playing members."],
                ["1926", "Nine-hole Rossland course constructed on Cominco-leased land."],
                ["1962", "Construction of Birchbank begins on Cominco-leased property."],
                ["1964", "First nine holes at Birchbank completed."],
                ["1969", "Back nine and clubhouse open, designed by Roy Stone."],
                ["2004", "Club purchases Birchbank property from Cominco."],
                ["2006", "Rossland course closes after Cominco sells the land."],
                ["2018", "Birchbank reconfigured to resemble original 1969 layout (June 1)."],
              ].map(([year, event]) => (
                <li key={year} className="grid grid-cols-6 gap-4 py-5">
                  <span className="col-span-1 font-mono text-tamarack">{year}</span>
                  <span className="col-span-5 text-paper/85">{event}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-[var(--spacing-section)] container-edge">
        <p className="eyebrow mb-6">From the archive</p>
        <div className="grid gap-8 md:grid-cols-3">
          <figure>
            <div className="aspect-[4/3] bg-granite/5 relative overflow-hidden">
              <Image
                src="https://www.birchbankgolf.com/wp-content/uploads/2019/02/1948hole1.jpg"
                alt="Rossland course clubhouse and first tee, circa 1948"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
                unoptimized
              />
            </div>
            <figcaption className="mt-3 text-sm text-silt">
              Rossland course clubhouse and 1st tee, c. 1948.
            </figcaption>
          </figure>
          <figure>
            <div className="aspect-[4/3] bg-granite/5 relative overflow-hidden">
              <Image
                src="https://www.birchbankgolf.com/wp-content/uploads/2019/02/samfarming.jpg"
                alt="W.S. Harrison operating a horse-drawn hay rake on the farm at the current Birchbank site"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
                unoptimized
              />
            </div>
            <figcaption className="mt-3 text-sm text-silt">
              W.S. Harrison, horse-drawn hay rake, farmland at the current Birchbank site.
            </figcaption>
          </figure>
          <figure>
            <div className="aspect-[4/3] bg-granite/5 relative overflow-hidden">
              <Image
                src="https://www.birchbankgolf.com/wp-content/uploads/2019/02/roystone2.jpg"
                alt="Roy Stone, CPGA, course designer"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
                unoptimized
              />
            </div>
            <figcaption className="mt-3 text-sm text-silt">Roy Stone, course designer.</figcaption>
          </figure>
        </div>
        <p className="mt-8 text-xs text-silt font-mono">
          Archival images courtesy birchbankgolf.com.
        </p>
      </section>
    </>
  );
}
