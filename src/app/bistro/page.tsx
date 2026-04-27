import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import DishCard from "@/components/DishCard";
import MenuPdfCard from "@/components/MenuPdfCard";
import BookButton from "@/components/BookButton";
import { REVIEW_PLATFORMS } from "@/data/reviews";

export const metadata: Metadata = {
  title: "The Bistro",
  description:
    "The Bistro at Birchbank: covered patio over the course, fully licensed, full breakfast, lunch and dinner menu, BC craft beer on draft, and a beverage cart on course. Walk-in friendly. Genelle, BC.",
  alternates: { canonical: "/bistro" },
};

/**
 * All copy on this page is verified against the live PDFs hosted in
 * public/bistro/menus/:
 *   - food-and-drinks.pdf  (The Bistro 2026 Menus, food + drinks)
 *   - banquet.pdf          (Bistro Banquet, six buffet packages)
 * Source originals: birchbankgolf.com/wp-content/uploads/2026/04/...
 *                   and .../2026/03/BISTRO-BANQUET-2026-Menu-Online.pdf
 *
 * No fabricated dish names, no fabricated beer/wine, no weddings claim
 * (the Bistro markets banquets, not weddings, on their published menus).
 */

const MENUS = {
  foodDrinks: "/bistro/menus/food-and-drinks.pdf",
};

/**
 * Six dish photos. Every caption transcribed verbatim or near-verbatim
 * from the 2026 food menu.
 */
const DISHES = [
  {
    src: "/bistro/breakfast.jpg",
    alt: "Two eggs, sausage, bacon, grilled tomato and toast on a Bistro plate",
    kicker: "All Day Play · $18",
    caption:
      "Two eggs any style, your choice of bacon, ham or sausage, home fries and toast.",
  },
  {
    src: "/bistro/club.jpg",
    alt: "Birchbank Clubhouse triple-decker with bacon, turkey, cheddar and fries on the patio",
    kicker: "Birchbank Clubhouse · $21",
    caption:
      "Triple decker. Bacon, turkey, cheddar, lettuce, tomato, garlic aioli, on white or whole wheat.",
  },
  {
    src: "/bistro/fish-and-chips.jpg",
    alt: "Beer-battered snapper and fries with a side salad and a grilled lemon, course window behind",
    kicker: "Fish n' Chips · $19 / $24",
    caption:
      "Beer-battered snapper, fries, coleslaw, tartar, ketchup and lemon. One piece or two.",
  },
  {
    src: "/bistro/dessert.jpg",
    alt: "A scoop of vanilla ice cream with wafer cookies on a black napkin and marble counter",
    kicker: "Ice Cream · $7",
    caption:
      "Locally sourced. Ask your server about today's rotating flavour.",
  },
  {
    src: "/bistro/burger.jpg",
    alt: "Crispy Birdie Burger on a brioche bun with honey mustard slaw and a side salad",
    kicker: "Crispy Birdie Burger · $24",
    caption:
      "Crispy fried chicken, bacon, cheddar, brioche bun, honey mustard coleslaw.",
  },
  {
    src: "/bistro/burger-beer.webp",
    alt: "A burger and fries on a white plate beside a tall pint of beer, the course visible through the patio window",
    kicker: "Burger + a cold one",
    caption:
      "On the patio. The Bistro is fully licensed; four BC craft beers on draft plus a deeper can list.",
  },
];

/**
 * Banquet content (six buffet packages, full per-person pricing, the
 * banquet PDF MenuPdfCard) lives canonically on /events/book. We keep
 * a short cross-link on this page so casual diners who land here can
 * find banquet info, but we do NOT duplicate the package grid here.
 */

export default function Bistro() {
  return (
    <>
      {/* 1. HERO */}
      <section className="pt-40 pb-16 container-edge">
        <div className="grid gap-10 lg:grid-cols-12 items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-6">The Bistro at Birchbank</p>
            <h1 className="display-xl max-w-[16ch] mb-8">
              Lunch on the patio. Burgers, beer, the river beyond.
            </h1>
            <p className="prose-editorial max-w-2xl text-granite/85">
              Fully licensed and open to the public, golfers and walk-ins both.
              Breakfast through dinner from one kitchen, the covered patio open
              whenever the doors are, and the view earns its keep all day.
            </p>
          </div>
          <div className="lg:col-span-5 lg:pl-6">
            <div className="font-mono text-sm text-granite/85 space-y-2 tabular-nums border-l border-granite/15 pl-5">
              <p>
                <span className="text-silt">Open daily</span>{" "}
                <span className="text-granite">10:00 am to 6:00 pm</span>
              </p>
              <p>
                <span className="text-silt">Season</span>{" "}
                <span className="text-granite">April through October</span>
              </p>
              <p>
                <a
                  href="tel:+12506935451"
                  className="text-granite underline underline-offset-2 hover:text-amber"
                >
                  250-693-5451
                </a>
                <span className="mx-2 text-silt/60">·</span>
                <a
                  href="mailto:bistro@birchbankgolf.com"
                  className="text-granite underline underline-offset-2 hover:text-amber"
                >
                  bistro@birchbankgolf.com
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href={MENUS.foodDrinks}
            target="_blank"
            rel="noopener"
            className="btn-primary"
          >
            See the food &amp; drinks menu (PDF) ↗
          </a>
          <a href="tel:+12506935451" className="btn-ghost">
            Call to book a table · 250-693-5451
          </a>
        </div>
      </section>

      {/* 2. THE VIEW */}
      <section className="pb-[var(--spacing-section)]">
        <div className="container-edge">
          {/* Scenic photo, constrained so it sits as a tasteful editorial
              moment rather than a full-bleed wall. Keeps native 16:9, no
              cropping. */}
          <div className="mx-auto max-w-4xl">
            <div className="relative w-full aspect-[16/9] overflow-hidden bg-granite/5 border border-granite/10 rounded-sm">
              <Image
                src="/bistro/view-from-patio.jpg"
                alt="A Bistro patio table looking out over the Birchbank fairways with the Monashee foothills beyond"
                fill
                sizes="(max-width: 768px) 100vw, 56rem"
                className="object-cover"
                priority
              />
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-12 items-start">
              <p className="md:col-span-7 prose-editorial text-granite/85">
                The patio sits one tier above the first green. From any table
                you are looking down the front nine, across the Columbia, and
                up at the Monashee foothills. Most days you can hear the river
                before you see it.
              </p>
              <p className="md:col-span-4 md:col-start-9 font-mono text-xs text-silt leading-relaxed">
                Genelle, British Columbia. 12 minutes south of Trail, 15 from
                Castlegar, 50 from the Spokane border crossing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE MENUS, two PDF cards */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge">
          <div className="grid gap-10 md:grid-cols-12 items-end mb-10">
            <div className="md:col-span-7">
              <p className="eyebrow mb-5">The menu</p>
              <h2 className="display-lg max-w-[18ch]">
                Read on screen, or print for the patio.
              </h2>
            </div>
            <p className="md:col-span-5 prose-editorial text-granite/85">
              The day-to-day 2026 food and drinks menu in one PDF. Open to read,
              or download to bring in. Hosting a group? See{" "}
              <Link href="/events/book" className="underline hover:text-amber">
                /events/book
              </Link>{" "}
              for the banquet packages.
            </p>
          </div>

          <div className="md:max-w-2xl">
            <MenuPdfCard
              src={MENUS.foodDrinks}
              eyebrow="Food & drinks · 2026"
              title="The Bistro Menu"
              description="Breakfast, soup, salads, bowls, handhelds, Bistro classics, desserts, plus the full beer, wine, cocktails and spirits list."
              categories={[
                "Breakfast",
                "Salads & bowls",
                "Handhelds",
                "Classics",
                "Desserts",
                "Beer · wine · spirits",
              ]}
              downloadName="bistro-2026-food-and-drinks-menu.pdf"
            />
          </div>
        </div>
      </section>

      {/* 4. WHAT'S ON THE MENU, dish grid with verified captions */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge">
          <div className="grid gap-10 md:grid-cols-12 items-end mb-12">
            <div className="md:col-span-7">
              <p className="eyebrow mb-5">From the kitchen</p>
              <h2 className="display-lg max-w-[20ch]">
                Honest food, cooked the way you'd hope.
              </h2>
            </div>
            <p className="md:col-span-5 prose-editorial text-granite/85">
              Wagyu burgers, beer-battered snapper, an all-day breakfast plate,
              the Birchbank Clubhouse triple decker, a locally sourced ice
              cream that rotates flavours, and a seasonal soup the kitchen will
              talk you through. All prices on the menu PDF.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {DISHES.map((d) => (
              <DishCard
                key={d.src}
                src={d.src}
                alt={d.alt}
                kicker={d.kicker}
                caption={d.caption}
                ratio="1/1"
              />
            ))}
          </div>

          <p className="mt-10 font-mono text-xs text-silt">
            Photos shot on the patio at Birchbank. Menu changes seasonally; the{" "}
            <a
              href={MENUS.foodDrinks}
              target="_blank"
              rel="noopener"
              className="text-granite underline underline-offset-2 hover:text-amber"
            >
              full 2026 menu (PDF)
            </a>{" "}
            has prices and the daily features.
          </p>
        </div>
      </section>

      {/* 5. THE SIGNATURE BURGER */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge">
          <div className="grid gap-10 lg:gap-14 lg:grid-cols-12 items-center">
            {/* Image column trimmed from 7/12 to 5/12 and the photo
                squared off so the burger is hero-sized without being
                wall-sized. */}
            <div className="lg:col-span-5">
              <DishCard
                src="/bistro/burger.jpg"
                alt="Crispy Birdie Burger on a brioche bun with honey mustard slaw and a side salad"
                kicker="The one to order"
                caption="The Crispy Birdie Burger · $24"
                ratio="1/1"
                priority
              />
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="eyebrow mb-5">A regular's order</p>
              <h2 className="display-md mb-5 max-w-[16ch]">
                Crispy fried chicken, cheddar, bacon, brioche.
              </h2>
              <p className="prose-editorial text-granite/85 mb-6">
                Honey mustard coleslaw does the heavy lifting. The brioche bun
                holds. Fries on the side, mixed greens if you'd rather, or sub
                Caesar for three dollars.
              </p>
              <p className="prose-editorial text-granite/85 mb-8">
                Prefer beef? The Back 9 Burger ($22) is a Wagyu patty with
                bacon, cheddar, lettuce, tomato, pickles and garlic aioli on
                brioche. The Out of Bounds ($24) adds ham, extra cheddar and a
                fried egg, for the rounds that earned it.
              </p>
              <a href="tel:+12506935451" className="btn-primary">
                Call to reserve a patio table
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHAT'S ON TAP, drinks verified from the 2026 PDF */}
      <section className="py-[var(--spacing-section)] bg-cedar text-paper">
        <div className="container-edge">
          <div className="grid gap-10 md:grid-cols-12 items-start">
            <div className="md:col-span-5">
              <p className="eyebrow text-paper/60 mb-5">What's on tap</p>
              <h2 className="display-lg max-w-[14ch] mb-6">
                BC on the taps. The wine list reads sensibly.
              </h2>
              <p className="prose-editorial text-paper/85 mb-7 max-w-md">
                Four Kootenay and East-Kootenay drafts, a deep can list, real
                wines by the glass and the bottle, and a bar well that does the
                Caesar properly.
              </p>
              <a
                href={MENUS.foodDrinks}
                target="_blank"
                rel="noopener"
                className="btn-primary bg-tamarack text-granite hover:bg-paper"
              >
                See the full drinks list (PDF) ↗
              </a>
            </div>

            <div className="md:col-span-7 grid sm:grid-cols-2 gap-x-10 gap-y-8 text-paper/90">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-tamarack mb-3">
                  16oz draft · $7.75
                </p>
                <ul className="font-display text-[1.05rem] leading-relaxed space-y-1">
                  <li>Erie Creek Brewing</li>
                  <li>Fernie Hazy IPA</li>
                  <li>Nelson Loki Lager</li>
                  <li>Rossland Beer Co.</li>
                </ul>
              </div>

              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-tamarack mb-3">
                  Tall cans · $8.50
                </p>
                <ul className="font-display text-[1.05rem] leading-relaxed space-y-1">
                  <li>Rossland Beer Company, seasonal</li>
                  <li>Nelson Brewing Company, seasonal</li>
                </ul>
                <p className="mt-3 font-mono text-[11px] text-paper/55">
                  Ask your server for the rotation.
                </p>
              </div>

              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-tamarack mb-3">
                  Cider, coolers &amp; seltzers
                </p>
                <ul className="font-display text-[1.05rem] leading-relaxed space-y-1">
                  <li>Okanagan Cider</li>
                  <li>NUTRL Vodka Seltzer · White Claw</li>
                  <li>SVNS Hard 7UP · Hey Y'all Hard Iced Tea</li>
                  <li>Matt &amp; Steve's Caesar (473ml)</li>
                </ul>
              </div>

              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-tamarack mb-3">
                  Cocktails &amp; spirits
                </p>
                <ul className="font-display text-[1.05rem] leading-relaxed space-y-1">
                  <li>Caesar &amp; Long Island, $14</li>
                  <li>Bar well 2oz, $12</li>
                  <li>Premium 2oz, $13</li>
                  <li className="text-paper/70 text-sm">
                    Jameson, Sambuca, El Tequileño Reposado
                  </li>
                </ul>
              </div>

              <div className="sm:col-span-2 pt-4 border-t border-paper/15">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-tamarack mb-3">
                  Wine, by the glass &amp; bottle
                </p>
                <div className="grid sm:grid-cols-2 gap-x-10 gap-y-1.5 font-display text-[1.05rem] leading-relaxed">
                  <ul className="space-y-1">
                    <li>Copper Moon Pinot Grigio</li>
                    <li>Peller Estates Sauvignon Blanc</li>
                    <li>Peller Estates Chardonnay</li>
                    <li>Gehringer Riesling</li>
                  </ul>
                  <ul className="space-y-1">
                    <li>Peller Estates Cabernet Merlot</li>
                    <li>Shot In The Dark Cabernet Shiraz</li>
                    <li>Le Volte dell'Ornellaia Sangiovese Blend</li>
                    <li>Frind Estate Winery Rosé</li>
                  </ul>
                </div>
                <p className="mt-3 font-mono text-[11px] text-paper/55">
                  Plus In The Clear Sauv Blanc, Chateau St. Jean Chardonnay,
                  and Bouvet Saumur Brut sparkling on the bottle list.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FOR THE ROUND */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge grid gap-10 md:grid-cols-12 items-start">
          <div className="md:col-span-5">
            <p className="eyebrow mb-5">For the round</p>
            <h2 className="display-md max-w-[14ch] mb-5">
              Drinks on course. Lunch at the turn.
            </h2>
          </div>
          <div className="md:col-span-7 prose-editorial text-granite/85">
            <p>
              The beverage cart works the course in season. Cold drinks and
              snacks; wave it down or flag it on the way through.
            </p>
            <p>
              At the turn between the ninth and tenth, the Bistro is a short
              walk from the tee box. Phone an order ahead and a sandwich is on
              the bar by the time you walk in.
            </p>
            <p className="font-mono text-sm text-silt mt-6">
              <a
                href="tel:+12506935451"
                className="text-granite underline underline-offset-2 hover:text-amber"
              >
                Call ahead · 250-693-5451
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* 8. HOSTING A GROUP, single cross-link card. Banquet detail lives on /events/book. */}
      <section className="py-[var(--spacing-section)] bg-cedar text-paper">
        <div className="container-edge">
          <div className="grid gap-8 md:grid-cols-12 items-center">
            <div className="md:col-span-7">
              <p className="eyebrow text-paper/60 mb-4">Hosting a group?</p>
              <h2
                className="font-display mb-4"
                style={{ fontSize: "clamp(1.75rem, 4.5vw, 2.5rem)", lineHeight: "1.05", letterSpacing: "-0.01em" }}
              >
                Six published banquet packages, $35 to $53 per person.
              </h2>
              <p className="prose-editorial text-paper/85 max-w-xl">
                Tournaments, corporate days, retirements, celebrations of life,
                family reunions. The full per-person pricing, dish lists and
                booking details live on{" "}
                <Link href="/events/book" className="underline hover:text-tamarack">
                  /events/book
                </Link>
                .
              </p>
            </div>
            <div className="md:col-span-5 md:text-right flex flex-wrap md:justify-end gap-3">
              <Link
                href="/events/book"
                className="btn-primary bg-tamarack text-granite hover:bg-paper"
              >
                See banquet packages →
              </Link>
              <a
                href="tel:+12506935451"
                className="btn-ghost text-paper border-paper/70 hover:text-tamarack hover:border-tamarack"
              >
                Or call · 250-693-5451
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 9. HOURS + HOW TO FIND US */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge">
          <p className="eyebrow mb-6">Hours and how to find us</p>
          <div className="grid gap-10 md:grid-cols-12 border-t border-granite/15 pt-10">
            <div className="md:col-span-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-silt mb-3">
                Hours
              </p>
              <ul className="font-mono text-sm text-granite tabular-nums space-y-1.5">
                <li>Open daily · 10:00 am – 6:00 pm</li>
                <li className="text-silt">Season runs April through October</li>
              </ul>
            </div>

            <div className="md:col-span-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-silt mb-3">
                Reach us
              </p>
              <ul className="font-mono text-sm text-granite space-y-1.5">
                <li>
                  <a
                    href="tel:+12506935451"
                    className="underline underline-offset-2 hover:text-amber"
                  >
                    250-693-5451
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:bistro@birchbankgolf.com"
                    className="underline underline-offset-2 hover:text-amber"
                  >
                    bistro@birchbankgolf.com
                  </a>
                </li>
                <li className="text-silt pt-2">
                  5500 Highway 22
                  <br />
                  Genelle, BC
                </li>
                <li className="text-silt">Free parking at the clubhouse.</li>
              </ul>
            </div>

            <div className="md:col-span-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-silt mb-3">
                Good to know
              </p>
              <ul className="font-mono text-sm text-granite/85 space-y-2 leading-relaxed">
                <li>Walk-in friendly. Larger parties, please call ahead.</li>
                <li>
                  Ask the kitchen about dietary preferences; the menu is built
                  to accommodate.
                </li>
                <li>
                  Group bookings &amp; banquet packages, see{" "}
                  <Link
                    href="/events/book"
                    className="underline underline-offset-2 hover:text-amber"
                  >
                    /events/book
                  </Link>
                  .
                </li>
                <li>
                  Tag the Bistro on Instagram, @birchbankgolf.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 10. THE QUOTE, SCOREGolf 2022 */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge max-w-3xl">
          <p className="eyebrow mb-6">From the head pro</p>
          <blockquote className="border-l-2 border-tamarack pl-6 md:pl-8">
            <p
              className="font-display text-granite leading-snug"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", letterSpacing: "-0.01em" }}
            >
              The Bistro, thanks to the delicious food and the huge, covered
              deck, is the perfect spot for your after-golf winddown.
            </p>
            <footer className="mt-5 font-mono text-xs text-silt leading-relaxed">
              Jeff Papilion, Director of Golf · CPGA Head Professional. Quoted in{" "}
              <a
                href="https://scoregolf.com/features/golf-course-features/birchbank-a-kootenay-rockies-classic/"
                target="_blank"
                rel="noopener"
                className="underline hover:text-amber"
              >
                SCOREGolf · October 2022 ↗
              </a>
              , by Andrew Penner.
            </footer>
          </blockquote>
        </div>
      </section>

      {/* 11. REVIEWS */}
      <section className="py-16 bg-paper border-t border-granite/10">
        <div className="container-edge text-center max-w-2xl mx-auto">
          <p className="eyebrow mb-4">Ate something you liked?</p>
          <p className="prose-editorial text-granite/85 mb-5">
            Tell the next visitor about it.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 font-mono text-sm">
            <a
              href={REVIEW_PLATFORMS.tripadvisor.writeUrl}
              target="_blank"
              rel="noopener"
              className="text-amber hover:text-amber-dark underline underline-offset-2"
            >
              Leave a Tripadvisor review ↗
            </a>
            <a
              href={REVIEW_PLATFORMS.facebook.readUrl}
              target="_blank"
              rel="noopener"
              className="text-granite hover:text-amber underline underline-offset-2"
            >
              Review on Facebook ↗
            </a>
          </div>
        </div>
      </section>

      {/* 12. FINAL CTA */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge text-center max-w-3xl mx-auto">
          <p className="eyebrow mb-5">Come for the view, stay for the burger</p>
          <h2 className="display-md mb-8 max-w-[22ch] mx-auto">
            Book a tee time, or just walk in for lunch.
          </h2>
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <BookButton />
            <a href="tel:+12506935451" className="btn-ghost">
              Call the Bistro · 250-693-5451
            </a>
          </div>
          <div className="font-mono text-xs text-silt flex flex-wrap justify-center gap-x-4 gap-y-2">
            <Link href="/events/book" className="hover:text-amber underline underline-offset-2">
              Plan an event
            </Link>
            <span aria-hidden>·</span>
            <Link href="/membership/retirees-club" className="hover:text-amber underline underline-offset-2">
              Retirees Club, Thursdays
            </Link>
            <span aria-hidden>·</span>
            <Link href="/course" className="hover:text-amber underline underline-offset-2">
              The course
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
