import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import DishCard from "@/components/DishCard";
import BookButton from "@/components/BookButton";
import { REVIEW_PLATFORMS } from "@/data/reviews";

export const metadata: Metadata = {
  title: "The Bistro",
  description:
    "The Birchbank Bistro: covered patio over the course, fully licensed, open daily 10 to 6 from April through October. Burgers, fish and chips, breakfast all day, BC craft beer, and a beverage cart on course. Walk-in friendly. Genelle, BC.",
  alternates: { canonical: "/bistro" },
};

const MENUS = {
  food: "https://www.birchbankgolf.com/wp-content/uploads/2025/09/Fall-Menu-.pdf",
  drinks:
    "https://www.birchbankgolf.com/wp-content/uploads/2024/08/THE-BISTRO-New-Food_Drink-Menu-8.5x14.pdf",
};

/**
 * Six dish photos sit in a magazine-style grid. Captions are honest
 * one-liners drawn from the live Fall menu PDF (Back 9 Burger, Crispy
 * Birdie Burger, Fish n' Chips, Birchbank Clubhouse, All Day Play
 * breakfast, ice cream from Bistro Classics). No invented prices, no
 * fictional dishes. The patio table photo anchors the atmosphere row.
 */
const DISHES = [
  {
    src: "/bistro/breakfast.jpg",
    alt: "Sunny-side eggs, sausage, bacon, tomato and toast on a Bistro plate",
    kicker: "All Day Play",
    caption: "Two eggs, your choice of bacon, ham or sausage, hashbrowns and toast.",
  },
  {
    src: "/bistro/club.jpg",
    alt: "Birchbank Clubhouse triple-decker with bacon, turkey, cheddar and fries on the patio",
    kicker: "Birchbank Clubhouse",
    caption: "Triple-decker with bacon, turkey, cheddar and garlic aioli on toast.",
  },
  {
    src: "/bistro/fish-and-chips.jpg",
    alt: "Battered haddock and fries with coleslaw and a grilled lemon, course window behind",
    kicker: "Fish n' Chips",
    caption: "Battered haddock, coleslaw, tartar, grilled lemon. One piece or two.",
  },
  {
    src: "/bistro/patio-table.jpg",
    alt: "A patio table set with plates and a small dried-flower centrepiece, the course visible beyond",
    kicker: "On the patio",
    caption: "Tables face the first green and the Monashee foothills.",
  },
  {
    src: "/bistro/dessert.jpg",
    alt: "A scoop of vanilla ice cream with wafer cookies on a black napkin and marble counter",
    kicker: "Ice cream",
    caption: "Locally sourced. Ask about today's rotating flavour.",
  },
  {
    src: "/bistro/burger.jpg",
    alt: "Crispy Birdie Burger on a brioche bun with honey mustard slaw and fries on a Bistro plate",
    kicker: "Crispy Birdie",
    caption: "Crispy fried chicken, aged cheddar, bacon, honey mustard slaw, brioche.",
  },
];

export default function Bistro() {
  return (
    <>
      {/* ──────────────────────────────────────────────────────────────
          1. HERO
          Editorial split. Headline, warm subhead, trust line, two CTAs.
          One primary (cedar). One secondary (phone, inline tel).
          The hero scenic photo lives in the next section so its full
          16:9 ratio is preserved, per the user's hard constraint.
          ────────────────────────────────────────────────────────────── */}
      <section className="pt-40 pb-16 container-edge">
        <div className="grid gap-10 lg:grid-cols-12 items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-6">The Bistro at Birchbank</p>
            <h1 className="display-xl max-w-[16ch] mb-8">
              Lunch on the patio. Burgers, beer, the river beyond.
            </h1>
            <p className="prose-editorial max-w-2xl text-granite/85">
              Fully licensed and open to the public, golfers and walk-ins both.
              The kitchen runs from breakfast straight through to dinner, the
              covered patio is open whenever the doors are, and the view earns
              its keep all day.
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
            href={MENUS.food}
            target="_blank"
            rel="noopener"
            className="btn-primary"
          >
            See the food menu (PDF) ↗
          </a>
          <a href="tel:+12506935451" className="btn-ghost">
            Call to book a table · 250-693-5451
          </a>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
          2. THE VIEW
          One full-bleed scenic at native ~16:9. NO cropping. The hero
          visual moment of the page; one editorial line beneath.
          ────────────────────────────────────────────────────────────── */}
      <section className="pb-[var(--spacing-section)]">
        <div className="container-edge">
          <div className="relative w-full aspect-[16/9] overflow-hidden bg-granite/5 border border-granite/10 rounded-sm">
            <Image
              src="/bistro/view-from-patio.jpg"
              alt="A Bistro patio table looking out over the Birchbank fairways with the Monashee foothills beyond"
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover"
              priority
              unoptimized
            />
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-12 items-start">
            <p className="md:col-span-7 prose-editorial text-granite/85">
              The patio sits one tier above the first green. From any table you
              are looking down the front nine, across the Columbia, and up at
              the Monashee foothills. Most days you can hear the river before
              you see it.
            </p>
            <p className="md:col-span-4 md:col-start-9 font-mono text-xs text-silt leading-relaxed">
              Genelle, British Columbia. 15 minutes south of Trail, 35 from
              Castlegar, 50 from the Spokane border crossing.
            </p>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
          3. WHAT'S ON THE MENU
          Editorial intro + 6-photo dishes grid. Each photo opens in a
          lightbox. Captions name real dishes verified from the live
          Fall menu PDF.
          ────────────────────────────────────────────────────────────── */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge">
          <div className="grid gap-10 md:grid-cols-12 items-end mb-12">
            <div className="md:col-span-7">
              <p className="eyebrow mb-5">What's on the menu</p>
              <h2 className="display-lg max-w-[18ch]">
                Honest food, cooked the way you'd hope.
              </h2>
            </div>
            <p className="md:col-span-5 prose-editorial text-granite/85">
              Breakfast, burgers, salads, a fish-and-chips that earns the
              two-piece order, a clubhouse triple-decker, wood-fired pizzas,
              wings, and a daily soup the kitchen is happy to talk you through.
              Vegetarian and gluten-aware options on every section, just ask
              the server.
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
            Photos shot on the patio. Menu changes seasonally; the{" "}
            <a
              href={MENUS.food}
              target="_blank"
              rel="noopener"
              className="text-granite underline underline-offset-2 hover:text-amber"
            >
              full Fall menu (PDF)
            </a>{" "}
            has prices and the daily features.
          </p>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
          4. THE SIGNATURE
          The Crispy Birdie / Back 9 burger pair gets a larger moment.
          One image, one paragraph, one call-out. The home page already
          says "the Canadian burger is the one to order"; this is where
          we deliver on that promise.
          ────────────────────────────────────────────────────────────── */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge">
          <div className="grid gap-10 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7">
              <DishCard
                src="/bistro/burger.jpg"
                alt="Crispy Birdie Burger on a brioche bun with honey mustard slaw, fries and a side salad"
                kicker="The one to order"
                caption="The Crispy Birdie Burger"
                ratio="4/5"
                priority
              />
            </div>
            <div className="lg:col-span-5">
              <p className="eyebrow mb-5">A regular's order</p>
              <h2 className="display-md mb-5 max-w-[16ch]">
                Crispy fried chicken, aged cheddar, bacon, brioche.
              </h2>
              <p className="prose-editorial text-granite/85 mb-6">
                Honey-mustard slaw does the heavy lifting. The brioche bun
                holds. Fries on the side, or sub the Caesar if you're pacing
                yourself for the back nine. Members order it without looking at
                the menu. First-timers usually order it twice.
              </p>
              <p className="prose-editorial text-granite/85 mb-8">
                Prefer a beef patty? The Back 9 Burger runs the same brioche
                with bacon, cheddar, lettuce, tomato, pickles and garlic aioli.
                The Out of Bounds adds ham, extra cheddar and a fried egg, for
                the rounds that earned it.
              </p>
              <a href="tel:+12506935451" className="btn-primary">
                Call to reserve a patio table
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
          5. WHAT'S ON TAP
          Drinks. BC craft pulls verified from the drinks PDF.
          ────────────────────────────────────────────────────────────── */}
      <section className="py-[var(--spacing-section)] bg-cedar text-paper">
        <div className="container-edge">
          <div className="grid gap-10 md:grid-cols-12 items-start">
            <div className="md:col-span-5">
              <p className="eyebrow text-paper/60 mb-5">What's on tap</p>
              <h2 className="display-lg max-w-[14ch] mb-6">
                BC on the taps. The wine list reads sensibly.
              </h2>
              <a
                href={MENUS.drinks}
                target="_blank"
                rel="noopener"
                className="btn-primary bg-tamarack text-granite hover:bg-paper"
              >
                See the drinks menu (PDF) ↗
              </a>
            </div>

            <div className="md:col-span-7 grid sm:grid-cols-2 gap-x-10 gap-y-8 text-paper/90">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-tamarack mb-3">
                  Draft
                </p>
                <ul className="font-display text-[1.05rem] leading-relaxed space-y-1">
                  <li>Nelson Lager</li>
                  <li>Rossland Cream Ale</li>
                  <li>Fernie Hazy IPA</li>
                  <li>Red Truck IPA</li>
                </ul>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-tamarack mb-3">
                  Cans &amp; coolers
                </p>
                <ul className="font-display text-[1.05rem] leading-relaxed space-y-1">
                  <li>Kokanee, Pilsner, Coors Light</li>
                  <li>Corona, Corona 0.0%</li>
                  <li>Okanagan Cider</li>
                  <li>Mott's Caesar, White Claw</li>
                </ul>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-tamarack mb-3">
                  Wine, by the glass &amp; bottle
                </p>
                <ul className="font-display text-[1.05rem] leading-relaxed space-y-1">
                  <li>Copper Moon Pinot Grigio</li>
                  <li>Peller Estates Chardonnay</li>
                  <li>Gehringer Riesling (BC)</li>
                  <li>Bask Pinot Noir, Cab Sauv</li>
                </ul>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-tamarack mb-3">
                  Spirits &amp; the rest
                </p>
                <ul className="font-display text-[1.05rem] leading-relaxed space-y-1">
                  <li>Caesars, Long Islands, well &amp; premium pours</li>
                  <li>Jameson, El Jimador, Crown Royal</li>
                  <li>Pop, juice, coffee</li>
                  <li>Non-alcoholic beer on hand</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
          6. FOR THE ROUND
          Beverage cart on course + the turn between holes 9 and 10.
          ────────────────────────────────────────────────────────────── */}
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
              The beverage cart works the course in season. Cold drinks, snacks,
              the small things that make a hot 11th tee easier to walk onto.
              Wave it down or flag it on the way through.
            </p>
            <p>
              At the turn, between 9 and 10, the Bistro is two minutes from the
              tenth tee box. Phone an order ahead from the ninth green and a
              sandwich is on the bar by the time you walk in.
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

      {/* ──────────────────────────────────────────────────────────────
          7. BRING A GROUP (private events)
          Cedar block treatment. Tightened from the previous page.
          ────────────────────────────────────────────────────────────── */}
      <section className="py-[var(--spacing-section)] bg-cedar text-paper">
        <div className="container-edge grid gap-10 md:grid-cols-12 items-center">
          <div className="md:col-span-7">
            <p className="eyebrow text-paper/60 mb-4">Bring a group</p>
            <h2 className="display-md mb-5 max-w-[20ch]">
              Tournaments, weddings, birthdays, corporate days.
            </h2>
            <p className="prose-editorial text-paper/85 max-w-2xl">
              The dining room and the covered patio together seat real numbers.
              Plated meals, appetizer spreads, late-day refreshments, paired
              with golf or stand-alone. Tournament packages and catering quoted
              over the phone.
            </p>
          </div>
          <div className="md:col-span-5 md:text-right space-y-4">
            <div>
              <Link
                href="/events/book"
                className="btn-primary bg-tamarack text-granite hover:bg-paper"
              >
                Plan an event →
              </Link>
            </div>
            <div className="font-mono text-sm text-paper/70">
              <a
                href="tel:+12506935451"
                className="underline underline-offset-2 hover:text-tamarack"
              >
                Or call the Bistro · 250-693-5451
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
          8. HOURS + HOW TO FIND US
          The decision-simplification card. Hours, phone, email, address,
          parking, dietary, reservations policy. Tabular nums on hours.
          ────────────────────────────────────────────────────────────── */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge">
          <p className="eyebrow mb-6">Hours and how to find us</p>
          <div className="grid gap-10 md:grid-cols-12 border-t border-granite/15 pt-10">
            <div className="md:col-span-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-silt mb-3">
                Hours
              </p>
              <ul className="font-mono text-sm text-granite tabular-nums space-y-1.5">
                <li>Mon to Sun · 10:00 am – 6:00 pm</li>
                <li className="text-silt">Season runs April through October</li>
              </ul>
              <p className="font-mono text-xs text-silt mt-4">
                Kitchen closes at 5:30. Last call follows.
              </p>
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
                <li>Walk-in friendly. Parties of six or more, please call ahead.</li>
                <li>Vegetarian and gluten-aware options on every menu. Ask the kitchen.</li>
                <li>Take-out on most menu items. Order at the bar or by phone.</li>
                <li>Dogs welcome on the patio.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
          9. THE QUOTE
          SCOREGolf, Andrew Penner, October 2022. Citation preserved.
          ────────────────────────────────────────────────────────────── */}
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

      {/* ──────────────────────────────────────────────────────────────
          10. REVIEWS
          Tripadvisor + Facebook prompts.
          ────────────────────────────────────────────────────────────── */}
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

      {/* ──────────────────────────────────────────────────────────────
          11. FINAL CTA + CROSS-LINKS
          Tee time + Bistro phone, with quiet cross-links to events and
          the Retirees Club Thursday lunch tradition.
          ────────────────────────────────────────────────────────────── */}
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
