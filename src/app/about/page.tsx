import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "Birchbank Golf Course is operated by the Rossland Trail Country Club, organized in 1922. The 18-hole course sits along the Columbia River in Genelle, BC.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <>
      <section className="pt-40 pb-16 container-edge">
        <p className="eyebrow mb-6">About</p>
        <h1 className="display-xl max-w-[22ch] mb-10">
          Rossland Trail Country Club,<br />organized 1922.
        </h1>
      </section>

      <section className="pb-[var(--spacing-section)] container-edge grid gap-10 md:grid-cols-12">
        <div className="md:col-span-8 md:col-start-3 prose-editorial text-granite/90 space-y-6">
          <p className="text-xl">
            The Rossland Trail Country Club was organized on April 22, 1922 with 81
            shareholders. The first course operated on Floyd Ranch (Water Hole) above
            Warfield. By 1926, the club had leased land from Cominco and constructed a
            nine-hole course in Rossland.
          </p>
          <p>
            Construction of the Birchbank course began in 1962 on Cominco-leased land
            along the west bank of the Columbia River. The first nine holes were completed
            in 1964; the back nine and clubhouse opened in 1969, designed by local golf
            professional Roy Stone. In 2004, the club purchased the Birchbank property
            from Cominco. The Rossland course closed in 2006 after Cominco sold that land.
          </p>
          <p>
            As of June 1, 2018, Birchbank was reconfigured to resemble the course as it
            was originally built.
          </p>
        </div>
      </section>

      <section className="py-[var(--spacing-section)] bg-cedar text-paper">
        <div className="container-edge grid gap-8 md:grid-cols-3">
          <Link href="/about/team" className="block p-8 border border-paper/20 hover:border-tamarack transition">
            <p className="eyebrow text-paper/60 mb-3">The team</p>
            <p className="display-sm font-display mb-3">Jeff, Mike, and Brenda</p>
            <p className="text-paper/75 text-sm">Director of Golf, Course Superintendent, Accounting.</p>
          </Link>
          <Link href="/course/history" className="block p-8 border border-paper/20 hover:border-tamarack transition">
            <p className="eyebrow text-paper/60 mb-3">Course history</p>
            <p className="display-sm font-display mb-3">A century, in dates</p>
            <p className="text-paper/75 text-sm">1922 · 1962 · 1969 · 2004 · 2018.</p>
          </Link>
          <Link href="/about/land-acknowledgement" className="block p-8 border border-paper/20 hover:border-tamarack transition">
            <p className="eyebrow text-paper/60 mb-3">The land</p>
            <p className="display-sm font-display mb-3">Sinixt and Ktunaxa territory</p>
            <p className="text-paper/75 text-sm">The land Birchbank plays on has been cared for a lot longer than golf has.</p>
          </Link>
        </div>
      </section>
    </>
  );
}
