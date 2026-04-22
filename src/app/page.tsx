import Link from "next/link";
import Image from "next/image";
import BallIntoHoleHero from "@/components/BallIntoHoleHero";
import BookButton from "@/components/BookButton";
import AnchorReveal from "@/components/AnchorReveal";
import ConditionsWidget from "@/components/ConditionsWidget";
import HolePreview from "@/components/HolePreview";
import PhotoMarquee from "@/components/PhotoMarquee";
import Testimonials from "@/components/Testimonials";
import StickyBookBar from "@/components/StickyBookBar";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <BallIntoHoleHero />

      {/* 2. Anchor — 213 days on the Columbia */}
      <AnchorReveal />

      <div className="container-edge"><div className="rule-hair" /></div>

      {/* 3. Conditions + Next tee time */}
      <section className="py-[var(--spacing-section)]">
        <div className="container-edge grid gap-12 lg:grid-cols-12 items-start">
          <div className="lg:col-span-7">
            <ScrollReveal>
              <p className="eyebrow mb-5">Today at Birchbank</p>
              <h2 className="display-lg font-display mb-6">
                Book the next tee time.
              </h2>
              <p className="prose-editorial text-granite/85 max-w-xl">
                Tee times open online via Chronogolf, or by phone at the Pro Shop. We
                update conditions before the first tee every morning.
              </p>
            </ScrollReveal>

            <ScrollReveal stagger className="mt-10 grid sm:grid-cols-2 gap-4">
              <div className="border border-granite/15 bg-paper p-6">
                <p className="eyebrow mb-3">Next available</p>
                <p className="font-display text-3xl text-granite">8:24 am</p>
                <p className="text-sm text-silt mt-1">Walking · two spots</p>
                <BookButton className="mt-5" label="Take this tee time" />
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
                Par 72.<br />Five sets of tees.
              </p>
            </ScrollReveal>
          </div>
          <div className="md:col-span-7">
            <ScrollReveal>
              <p className="prose-editorial text-paper/85">
                6,788 yards from the Gold tees. 5,345 from the Red. New irrigation with
                ponds at holes 12 and 15. Pick up a printed scorecard at the Pro Shop
                when you check in, or view it online.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/course/scorecard"
                  className="btn-primary bg-tamarack text-granite hover:bg-paper"
                >
                  Scorecard
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
            <p className="eyebrow text-paper/60 mb-6">Ready when you are</p>
            <h2
              className="font-display mb-10"
              style={{ fontSize: "clamp(3rem, 9vw, 7rem)", lineHeight: "0.95", letterSpacing: "-0.02em" }}
            >
              Book a<br />tee time.
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-5">
              <BookButton />
              <a href="tel:+12506932255" className="btn-ghost text-paper border-paper/70 hover:text-tamarack hover:border-tamarack">
                Call Pro Shop · 250-693-2255
              </a>
            </div>
            <p className="mt-10 font-mono text-xs text-paper/60">
              Pro Shop open 9 am – 7 pm, 7 days · Bistro 12 – 5 pm, 7 days
              <br />
              April 1 through October 31
            </p>
          </ScrollReveal>
        </div>
      </section>

      <StickyBookBar />
    </>
  );
}
