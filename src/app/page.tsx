import Link from "next/link";
import BallIntoHoleHero from "@/components/BallIntoHoleHero";
import BookButton from "@/components/BookButton";
import SectionHeading from "@/components/SectionHeading";

export default function Home() {
  return (
    <>
      <BallIntoHoleHero />

      {/* Positioning — quoted from birchbankgolf.com */}
      <section className="py-[var(--spacing-section)]">
        <div className="container-edge grid gap-16 md:grid-cols-12 items-start">
          <div className="md:col-span-7">
            <p className="eyebrow mb-5">Genelle, BC · Since 1962</p>
            <p className="display-md max-w-[22ch] font-display text-granite">
              Birchbank Golf Club,<br />set along the banks<br />of the Columbia River.
            </p>
          </div>
          <div className="md:col-span-5 prose-editorial text-granite/85">
            <p>
              Birchbank is the 18-hole course of the Rossland Trail Country Club, organized
              in 1922. The back nine and clubhouse were designed by local golf professional
              Roy Stone and opened in 1969. The club purchased the property from Cominco in
              2004.
            </p>
            <p className="mt-5">
              Our average season runs from April 1 through October 31 every year — 213
              days of golf.
            </p>
          </div>
        </div>
      </section>

      <div className="container-edge"><div className="rule-hair" /></div>

      {/* Book + rates quick actions */}
      <section className="py-[var(--spacing-section)]">
        <div className="container-edge grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <SectionHeading
              eyebrow="Today"
              title="Book a tee time."
              lede="Tee times can be reserved online via Chronogolf or by phone with the Pro Shop at 250-693-2255."
            />
            <div className="mt-10 flex flex-wrap gap-4">
              <BookButton />
              <a href="tel:+12506932255" className="btn-ghost">Call Pro Shop · 250-693-2255</a>
            </div>
          </div>
          <aside className="md:col-span-5 border border-granite/15 p-6 md:p-7">
            <p className="eyebrow mb-4">Rates at a glance</p>
            <ul className="font-mono text-sm space-y-3">
              <li className="flex justify-between"><span className="text-silt">18 holes · day rate</span><span>$80</span></li>
              <li className="flex justify-between"><span className="text-silt">9 holes</span><span>$45</span></li>
              <li className="flex justify-between"><span className="text-silt">Twilight · after 1 pm</span><span>$55</span></li>
              <li className="flex justify-between"><span className="text-silt">Twilight · after 3 pm</span><span>$45</span></li>
              <li className="flex justify-between"><span className="text-silt">Power cart · 18 / per rider</span><span>$24</span></li>
            </ul>
            <Link href="/rates" className="btn-ghost mt-5 text-sm">All rates →</Link>
          </aside>
        </div>
      </section>

      {/* Course + scorecard */}
      <section className="py-[var(--spacing-section)] bg-cedar text-paper">
        <div className="container-edge grid gap-10 md:grid-cols-12 items-start">
          <div className="md:col-span-5">
            <p className="eyebrow text-paper/60 mb-5">The course</p>
            <p className="display-lg font-display">Eighteen holes, restored to the 1969 routing.</p>
          </div>
          <div className="md:col-span-7 prose-editorial text-paper/85">
            <p>
              As of June 1, 2018, Birchbank has been reconfigured to resemble the course
              as it was originally built. Improvements include green reconstruction, hole
              relocations, new bunkers and tees, and a new irrigation system with ponds
              at holes 12 and 15.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/course/scorecard" className="btn-primary bg-tamarack text-granite hover:bg-paper">
                Scorecard
              </Link>
              <Link href="/course/history" className="btn-ghost text-paper border-paper/60 hover:border-tamarack hover:text-tamarack">
                Club history
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bistro + memberships */}
      <section className="py-[var(--spacing-section)]">
        <div className="container-edge grid gap-8 md:grid-cols-2">
          <Link href="/bistro" className="group block border border-granite/12 p-10 hover:border-amber transition-colors">
            <p className="eyebrow mb-3">The Bistro</p>
            <p className="display-sm font-display mb-4">Fully licensed. Open daily to the public.</p>
            <p className="text-silt">Full menu, covered patio, event catering, beverage cart on course. Open 12 – 5 pm.</p>
            <p className="mt-8 text-sm text-amber group-hover:underline">See menus →</p>
          </Link>
          <Link href="/membership" className="group block border border-granite/12 p-10 hover:border-amber transition-colors">
            <p className="eyebrow mb-3">Memberships</p>
            <p className="display-sm font-display mb-4">Unlimited play, seven days a week.</p>
            <p className="text-silt">Single, Couple, Family, Intermediate, New Member, and Student tiers.</p>
            <p className="mt-8 text-sm text-amber group-hover:underline">See memberships →</p>
          </Link>
        </div>
      </section>
    </>
  );
}
