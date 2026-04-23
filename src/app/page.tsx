import Link from "next/link";
import Image from "next/image";
import BallIntoHoleHero from "@/components/BallIntoHoleHero";
import BookButton from "@/components/BookButton";
import AnchorReveal from "@/components/AnchorReveal";
import AnnouncementGrid from "@/components/AnnouncementGrid";
import ConditionsWidget from "@/components/ConditionsWidget";
import HolePreview from "@/components/HolePreview";
import PhotoMarquee from "@/components/PhotoMarquee";
import Testimonials from "@/components/Testimonials";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <BallIntoHoleHero />

      {/* 2. Anchor — 213 days on the Columbia */}
      <AnchorReveal />

      <div className="container-edge"><div className="rule-hair" /></div>

      {/* 2.5 What's on — the 3-up announcement grid (replaces the old carousel pattern) */}
      <AnnouncementGrid />

      <div className="container-edge"><div className="rule-hair" /></div>

      {/* 3. Book + Rates snapshot + Today-at-Birchbank */}
      <section className="py-[var(--spacing-section)]">
        <div className="container-edge grid gap-12 lg:grid-cols-12 items-start">
          <div className="lg:col-span-7">
            <ScrollReveal>
              <p className="eyebrow mb-5">Today at Birchbank</p>
              <h2 className="display-lg font-display mb-6">
                Book a tee time.
              </h2>
              <p className="prose-editorial text-granite/85 max-w-xl">
                Tee times can be reserved online or by phone with the Pro Shop. We open at
                9 am every day of the season — frost delays and course conditions are
                posted before the first tee.
              </p>
            </ScrollReveal>

            <ScrollReveal stagger className="mt-10 grid sm:grid-cols-2 gap-4">
              <div className="border border-granite/15 bg-paper p-6">
                <p className="eyebrow mb-3">18 holes</p>
                <p className="font-display text-3xl text-granite">$80</p>
                <p className="text-sm text-silt mt-1">Day rate · walking</p>
                <BookButton className="mt-5" />
              </div>
              <div className="border border-amber/40 bg-amber/5 p-6">
                <p className="eyebrow mb-3 text-amber">Twilight</p>
                <p className="font-display text-3xl text-granite">$45</p>
                <p className="text-sm text-silt mt-1">After 3 pm · 18 holes walking</p>
                <Link href="/rates" className="btn-ghost mt-5 text-sm">
                  See all rates &amp; Beat the Heat
                </Link>
              </div>
            </ScrollReveal>

            <div className="mt-8 flex flex-wrap items-center gap-5 text-sm">
              <a href="tel:+12506932255" className="text-granite hover:text-amber underline">
                Or call the Pro Shop · 250-693-2255
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <ScrollReveal>
              <ConditionsWidget />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 4. Heritage editorial */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge grid gap-12 md:grid-cols-12 items-center">
          <div className="md:col-span-7">
            <ScrollReveal>
              <figure>
                <div className="relative aspect-[4/3] bg-granite/5 overflow-hidden">
                  <Image
                    src="https://www.birchbankgolf.com/wp-content/uploads/2019/02/1948hole1.jpg"
                    alt="The original Rossland course clubhouse and first tee, circa 1948"
                    fill
                    sizes="(max-width: 768px) 100vw, 58vw"
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <figcaption className="mt-3 font-mono text-xs text-silt">
                  Rossland course, 1st tee · c. 1948
                </figcaption>
              </figure>
            </ScrollReveal>
          </div>

          <div className="md:col-span-5">
            <ScrollReveal>
              <p className="eyebrow mb-5">A century on the river</p>
              <h2 className="display-md font-display mb-6">
                Designed by a local pro. Restored by a local club.
              </h2>
              <p className="prose-editorial text-granite/85">
                In 1962, Cominco leased a stretch of land between Trail and Castlegar,
                and a local pro named Roy Stone routed nine holes along the west bank
                of the Columbia. Then nine more. The course you walk today is Stone's
                original 1969 routing, restored in 2018.
              </p>
              <Link href="/course/history" className="btn-ghost mt-8">
                Full club history →
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 5. Hole preview */}
      <HolePreview />

      {/* 6. Photo marquee */}
      <PhotoMarquee />

      {/* 7. Course + scorecard — cedar block, polished */}
      <section className="py-[var(--spacing-section)] bg-cedar text-paper">
        <div className="container-edge grid gap-10 md:grid-cols-12 items-start">
          <div className="md:col-span-5">
            <ScrollReveal>
              <p className="eyebrow text-paper/60 mb-5">The scorecard</p>
              <p className="display-lg font-display">
                Par 72.<br />Five sets of tees.<br />One Columbia River.
              </p>
            </ScrollReveal>
          </div>
          <div className="md:col-span-7">
            <ScrollReveal>
              <p className="prose-editorial text-paper/85">
                6,788 yards from the Gold, 5,345 from the Red — a tee for every
                game. Rating 71.5 / slope 121 from the Blue. New irrigation with
                ponds on holes 12 and 15, restored greens, and the original Roy Stone
                routing returned in 2018.
              </p>
              <ul className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-6 font-mono text-sm">
                <li>
                  <p className="text-paper/60 text-xs uppercase tracking-widest mb-1">Gold</p>
                  <p className="font-display text-xl">6,788 yd</p>
                </li>
                <li>
                  <p className="text-paper/60 text-xs uppercase tracking-widest mb-1">Blue</p>
                  <p className="font-display text-xl">6,555 yd</p>
                  <p className="text-paper/60 text-xs mt-0.5">71.5 / 121</p>
                </li>
                <li>
                  <p className="text-paper/60 text-xs uppercase tracking-widest mb-1">White</p>
                  <p className="font-display text-xl">5,882 yd</p>
                  <p className="text-paper/60 text-xs mt-0.5">73.9 / 128</p>
                </li>
                <li>
                  <p className="text-paper/60 text-xs uppercase tracking-widest mb-1">Red</p>
                  <p className="font-display text-xl">5,345 yd</p>
                  <p className="text-paper/60 text-xs mt-0.5">70.8 / 119</p>
                </li>
              </ul>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/course/scorecard"
                  className="btn-primary bg-tamarack text-granite hover:bg-paper"
                >
                  Full scorecard
                </Link>
                <Link
                  href="/course/history"
                  className="btn-ghost text-paper border-paper/60 hover:border-tamarack hover:text-tamarack"
                >
                  Club history
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 8. Bistro + Memberships */}
      <section className="py-[var(--spacing-section)]">
        <div className="container-edge grid gap-8 md:grid-cols-2">
          <ScrollReveal>
            <Link
              href="/bistro"
              className="group block border border-granite/12 overflow-hidden hover:border-amber transition-colors"
            >
              <div className="relative aspect-[5/3] bg-granite/5 overflow-hidden">
                <Image
                  src="https://www.birchbankgolf.com/wp-content/uploads/2021/01/Photo-Sep-09-9-43-20-AM.jpg"
                  alt="The Bistro patio"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  unoptimized
                />
              </div>
              <div className="p-8 md:p-10">
                <p className="eyebrow mb-3">The Bistro</p>
                <p className="display-sm font-display mb-4">
                  Fully licensed. Open daily to the public.
                </p>
                <p className="text-silt">
                  Full menu, covered patio, event catering, beverage cart on course.
                  Open 12 – 5 pm.
                </p>
                <p className="mt-6 text-sm text-amber group-hover:underline">
                  See the menus →
                </p>
              </div>
            </Link>
          </ScrollReveal>

          <ScrollReveal>
            <Link
              href="/membership"
              className="group block border border-granite/12 overflow-hidden hover:border-amber transition-colors"
            >
              <div className="relative aspect-[5/3] bg-cedar overflow-hidden flex items-center justify-center">
                <div className="text-center p-8">
                  <p className="font-mono text-xs tracking-widest uppercase text-tamarack mb-4">
                    Seven membership tiers
                  </p>
                  <p className="font-display text-paper" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1 }}>
                    From $640
                  </p>
                  <p className="font-mono text-xs text-paper/60 mt-3">
                    Student · Intermediate · Family · Couple · Single · New Member · Full Play
                  </p>
                </div>
              </div>
              <div className="p-8 md:p-10">
                <p className="eyebrow mb-3">Memberships</p>
                <p className="display-sm font-display mb-4">
                  Unlimited play, seven days a week.
                </p>
                <p className="text-silt">
                  Seven tiers with transparent pricing. Advance tee time booking and
                  reciprocal rates included.
                </p>
                <p className="mt-6 text-sm text-amber group-hover:underline">
                  See the membership tiers →
                </p>
              </div>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* 8.5 Testimonials */}
      <Testimonials />

      {/* 9. Final book CTA */}
      <section className="py-[var(--spacing-section)] bg-cedar text-paper">
        <div className="container-edge text-center max-w-3xl mx-auto">
          <ScrollReveal>
            <p className="eyebrow text-paper/60 mb-6">Open April through October</p>
            <h2
              className="font-display mb-8"
              style={{ fontSize: "clamp(2.75rem, 8vw, 6rem)", lineHeight: "0.95", letterSpacing: "-0.02em" }}
            >
              Walk the 18.<br />Sit on the patio.<br />Watch the river.
            </h2>
            <p className="prose-editorial text-paper/85 mb-10 max-w-xl mx-auto">
              An 18-hole public-access course on the Columbia River.
              Member-owned since 2004. Routed by Roy Stone, 1962.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-5">
              <BookButton />
              <a
                href="tel:+12506932255"
                className="btn-ghost text-paper border-paper/70 hover:text-tamarack hover:border-tamarack"
              >
                Call Pro Shop · 250-693-2255
              </a>
            </div>
            <p className="mt-10 font-mono text-xs text-paper/60 leading-relaxed">
              Pro Shop 9 am – 7 pm · Bistro 12 – 5 pm · 7 days in season
              <br />
              5500 Highway 22, Genelle BC · 47 reviews · 4.4★ on GolfPass
            </p>
          </ScrollReveal>
        </div>
      </section>

    </>
  );
}
