import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import MenuPdfCard from "@/components/MenuPdfCard";

export const metadata: Metadata = {
  title: "Book your event",
  description:
    "From a small group to a large tournament. Six published Bistro Banquet packages from $35 to $53 per person, dining on the covered patio, and golf scoped around your group at Birchbank in Genelle, BC.",
  alternates: { canonical: "/events/book" },
};

/**
 * Booking page. Verified copy:
 *   - "From a round of golf for a small group to a large tournament" is
 *     a direct lift from https://www.birchbankgolf.com/the-bistro/book-your-event/
 *   - Banquet pricing transcribed from public/bistro/menus/banquet.pdf
 *     and src/app/bistro/page.tsx (BANQUET constant). Source PDF footer
 *     reads "Prices do not include taxes or gratuities."
 *   - Phone numbers, bistro@ email per the live Bistro page.
 *
 * Removed for lack of source: head-count thresholds, lead times, deposit
 * policies. Visitors are routed to the office for those.
 */

const MENUS = {
  banquet: "/bistro/menus/banquet.pdf",
};

// Mirrors src/app/bistro/page.tsx BANQUET constant. Single source of
// truth lives there; duplicated here for the standalone events context.
// If you change the bistro page constant, change this one too.
const BANQUET = [
  {
    name: "Top Sirloin Buffet",
    price: "$53",
    items: [
      "Bread and butter",
      "Caesar or mixed greens",
      "Centre-cut top sirloin steak",
      "Roasted potatoes",
      "Seasonal vegetables",
      "Dessert",
    ],
  },
  {
    name: "Chicken & Ribs Buffet",
    price: "$51",
    items: [
      "Caesar or mixed greens",
      "Half rack bourbon BBQ ribs",
      "Lemon-herb roasted chicken",
      "Roasted potatoes",
      "Seasonal vegetables",
      "Dessert",
    ],
  },
  {
    name: "Roast Beef Buffet",
    price: "$49",
    items: [
      "Buns and butter",
      "Caesar or mixed greens",
      "Carved roast beef au jus",
      "Horseradish and mustard",
      "Roast potatoes",
      "Seasonal vegetables",
      "Dessert",
    ],
  },
  {
    name: "Italian Feast Buffet",
    price: "$38",
    items: [
      "Buns and butter",
      "Caesar or mixed greens",
      "Penne and meatballs",
      "Chicken cutlets",
      "Roast potatoes",
      "Seasonal vegetables",
      "Dessert",
    ],
  },
  {
    name: "Chicken Cordon Bleu Buffet",
    price: "$38",
    items: [
      "Bread and butter",
      "Caesar or mixed greens",
      "Housemade chicken cordon bleu",
      "Roasted potatoes",
      "Seasonal vegetables",
      "Dessert",
    ],
  },
  {
    name: "Burger Buffet",
    price: "$35",
    items: [
      "Caesar or mixed greens",
      "Premium beef or crispy chicken burgers",
      "All the fixings, bacon and cheese on brioche buns",
      "French fries",
      "Gravy, ketchup and garlic aioli",
      "Dessert",
    ],
  },
];

export default function BookYourEvent() {
  return (
    <>
      {/* 1. Hero */}
      <section className="pt-32 md:pt-40 pb-16 bg-paper">
        <div className="container-edge">
          <p className="eyebrow mb-6">Book your event</p>
          <h1
            className="font-display text-granite max-w-[20ch] mb-8"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", lineHeight: "1.02", letterSpacing: "-0.015em" }}
          >
            From a small group<br />to a large tournament.
          </h1>
          <p className="prose-editorial text-granite/85 max-w-2xl">
            Birchbank hosts golf events, banquets on the covered patio, and combinations of
            both. Customized dates, times, and formats. Six Bistro Banquet packages with
            published per-person prices, scoped around your group.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="tel:+12506932366" className="btn-primary">Call the office</a>
            <a href="#packages" className="btn-ghost">See banquet packages →</a>
          </div>
        </div>
      </section>

      <div className="container-edge"><div className="rule-hair" /></div>

      {/* 2. Two paths */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow mb-5">Two paths</p>
            <h2 className="display-lg font-display mb-5">
              Golf, dining, or both.
            </h2>
            <p className="prose-editorial text-granite/85">
              The course and the Bistro share one back office. You can book a tournament,
              a dinner, or, most commonly, the round followed by the patio.
            </p>
          </div>

          <div className="grid gap-5 md:gap-6 md:grid-cols-2">
            <div className="border border-granite/15 p-8 md:p-10 bg-paper hover:border-amber transition-colors">
              <p className="eyebrow mb-4">Golf events</p>
              <p className="display-sm font-display mb-4">Tournaments &amp; group play</p>
              <p className="text-granite/85 leading-relaxed mb-6">
                Customized dates, times, and formats. From a foursome on a Tuesday morning
                to a full shotgun start, the Pro Shop and the office build the day around
                your group.
              </p>
              <div className="space-y-2 font-mono text-sm tabular-nums">
                <p>
                  <span className="text-silt">Office</span>{" "}
                  <a href="tel:+12506932366" className="hover:text-amber underline">
                    250-693-2366
                  </a>
                </p>
                <p>
                  <span className="text-silt">Pro Shop</span>{" "}
                  <a href="tel:+12506932255" className="hover:text-amber underline">
                    250-693-2255
                  </a>
                </p>
              </div>
            </div>

            <div className="border border-granite/15 p-8 md:p-10 bg-paper hover:border-amber transition-colors">
              <p className="eyebrow mb-4">Dining &amp; social events</p>
              <p className="display-sm font-display mb-4">Bistro for larger groups</p>
              <p className="text-granite/85 leading-relaxed mb-6">
                The Bistro handles larger groups for meals, appetizers, and refreshments,
                standalone or paired with a golf package. The large covered patio is purpose-
                built for summer gatherings.
              </p>
              <div className="space-y-2 font-mono text-sm tabular-nums">
                <p>
                  <span className="text-silt">Bistro</span>{" "}
                  <a href="tel:+12506935451" className="hover:text-amber underline">
                    250-693-5451
                  </a>
                </p>
                <p>
                  <a href="mailto:bistro@birchbankgolf.com" className="hover:text-amber underline">
                    bistro@birchbankgolf.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Banquet menu PDF */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge">
          <div className="grid gap-10 md:grid-cols-12 items-end mb-10">
            <div className="md:col-span-7">
              <p className="eyebrow mb-5">The banquet menu</p>
              <h2 className="display-lg max-w-[18ch]">
                Six packages, every dish listed.
              </h2>
            </div>
            <p className="md:col-span-5 prose-editorial text-granite/85">
              Open the PDF on your phone in the office, or download to print and walk into a
              planning meeting. Same menu the Bistro publishes for 2026.
            </p>
          </div>

          <div className="md:max-w-2xl">
            <MenuPdfCard
              src={MENUS.banquet}
              eyebrow="Banquet · 2026"
              title="The Bistro Banquet"
              description="Six buffet packages for tournaments, corporate days, celebrations of life, retirements, and any other group of size you bring through the door."
              categories={[
                "Italian Feast",
                "Burger",
                "Roast Beef",
                "Chicken & Ribs",
                "Top Sirloin",
                "Cordon Bleu",
              ]}
              downloadName="bistro-2026-banquet-menu.pdf"
            />
          </div>
        </div>
      </section>

      {/* 4. Six banquet packages, ordered premium-first to anchor */}
      <section id="packages" className="py-[var(--spacing-section)] bg-paper border-t border-granite/10 scroll-mt-24">
        <div className="container-edge">
          {/* Banquet-room photo: the actual room you're booking, set
              for a group, course visible through the windows. */}
          <figure className="max-w-4xl mx-auto mb-12 md:mb-16">
            <div className="relative w-full aspect-[16/9] overflow-hidden bg-granite/5 border border-granite/10 rounded-sm">
              <Image
                src="/events/banquet-room.webp"
                alt="The Bistro dining room at Birchbank set with white linen, wine glasses, and dried-flower centrepieces, the course visible through the windows"
                fill
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-cover"
                loading="lazy"
              />
            </div>
            <figcaption className="mt-3 font-mono text-xs text-silt text-center">
              The dining room, set for your group.
            </figcaption>
          </figure>

          <div className="grid gap-10 md:grid-cols-12 items-end mb-10">
            <div className="md:col-span-7">
              <p className="eyebrow mb-5">Per-person pricing</p>
              <h2 className="display-lg max-w-[20ch]">
                The full Bistro Banquet, package by package.
              </h2>
            </div>
            <p className="md:col-span-5 prose-editorial text-granite/85">
              Listed premium first. Top Sirloin at $53, the Burger Buffet at $35. Most
              groups land between. Confirm head count when you book; the kitchen prepares
              to your number.
            </p>
          </div>

          <ul className="grid gap-5 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BANQUET.map((b) => (
              <li
                key={b.name}
                className="bg-paper text-granite border border-granite/15 p-6 md:p-7 rounded-sm hover:border-amber transition-colors"
              >
                <div className="flex items-baseline justify-between gap-3 mb-4">
                  <h3 className="font-display text-[1.4rem] md:text-[1.55rem] leading-tight max-w-[14ch]">
                    {b.name}
                  </h3>
                  <p className="font-display text-2xl text-cedar tabular-nums shrink-0">
                    {b.price}
                  </p>
                </div>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-silt mb-3">
                  per person
                </p>
                <ul className="text-sm leading-relaxed text-granite/85 space-y-1">
                  {b.items.map((i) => (
                    <li key={i}>· {i}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <div className="mt-10 grid gap-6 md:grid-cols-12 items-center">
            <p className="md:col-span-7 font-mono text-xs text-silt">
              Prices do not include taxes or gratuities. Pricing transcribed from the 2026
              Bistro Banquet menu (PDF).
            </p>
            <div className="md:col-span-5 md:text-right flex flex-wrap md:justify-end gap-3">
              <a
                href={MENUS.banquet}
                target="_blank"
                rel="noopener"
                className="btn-primary"
              >
                Banquet menu (PDF) ↗
              </a>
              <a href="tel:+12506935451" className="btn-ghost">
                Call · 250-693-5451
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Combine with golf. Cedar block, restructured to a 7/5 grid
          with the fairway-carts photo on the right (two carts in
          formation = group play). CTA stacks below the headline so it
          stays touchable on mobile. */}
      <section className="py-[var(--spacing-section)] bg-cedar text-paper">
        <div className="container-edge grid gap-10 lg:gap-14 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 order-1">
            <p className="eyebrow text-tamarack mb-5">Combine the round with the meal</p>
            <h2
              className="font-display mb-5"
              style={{ fontSize: "clamp(1.75rem, 4.5vw, 2.75rem)", lineHeight: "1.05", letterSpacing: "-0.01em" }}
            >
              Eighteen holes,<br />then a buffet on the patio.
            </h2>
            <p className="prose-editorial text-paper/85 max-w-xl mb-7">
              The most common booking. Tee times in the morning or early afternoon, then
              a Bistro Banquet on the covered patio when the last group walks off the 18th.
              Single conversation with the office, single bill.
            </p>
            <a
              href="tel:+12506932366"
              className="btn-primary bg-tamarack text-granite hover:bg-paper"
            >
              Call the office · 250-693-2366
            </a>
          </div>
          <figure className="lg:col-span-5 order-2 mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-paper/10 border border-paper/10 rounded-sm">
              <Image
                src="/events/fairway-carts.webp"
                alt="Two golf carts on a fairway between rows of evergreens at Birchbank"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
            <figcaption className="mt-3 font-mono text-xs text-paper/60">
              Two carts on the fairway, mid-round.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 6. Lead time + contact */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge">
          <p className="eyebrow mb-6">How to start</p>
          <div className="grid gap-10 md:grid-cols-12 items-start">
            <div className="md:col-span-5">
              <h2 className="display-md font-display mb-5 max-w-[14ch]">
                Pick up the phone.
              </h2>
              <p className="prose-editorial text-granite/85 max-w-md">
                Tell us a date range, a head count, and whether you want golf, food, or
                both. The office quotes the day back as a single package. The earlier in
                the season you call, the more Saturdays are open.
              </p>
            </div>
            <div className="md:col-span-7 grid gap-6 sm:grid-cols-3">
              <div className="border border-granite/15 p-6">
                <p className="eyebrow mb-3">Office</p>
                <a href="tel:+12506932366" className="font-display text-xl text-granite hover:text-amber tabular-nums block">
                  250-693-2366
                </a>
                <p className="text-silt text-sm mt-2 leading-relaxed">
                  Event bookings, tournament coordination
                </p>
              </div>
              <div className="border border-granite/15 p-6">
                <p className="eyebrow mb-3">Pro Shop</p>
                <a href="tel:+12506932255" className="font-display text-xl text-granite hover:text-amber tabular-nums block">
                  250-693-2255
                </a>
                <p className="text-silt text-sm mt-2 leading-relaxed">
                  Tee times, group rates, day-of questions
                </p>
              </div>
              <div className="border border-granite/15 p-6">
                <p className="eyebrow mb-3">Bistro</p>
                <a href="tel:+12506935451" className="font-display text-xl text-granite hover:text-amber tabular-nums block">
                  250-693-5451
                </a>
                <p className="text-silt text-sm mt-2 leading-relaxed">
                  Banquets, patio, menu planning.{" "}
                  <a
                    href="mailto:bistro@birchbankgolf.com"
                    className="underline underline-offset-2 hover:text-amber"
                  >
                    bistro@birchbankgolf.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Final CTA */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge text-center max-w-3xl mx-auto">
          <p className="eyebrow mb-5">Last step</p>
          <h2 className="display-md mb-8 max-w-[22ch] mx-auto">
            One call gets the day on the calendar.
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+12506932366" className="btn-primary">Call 250-693-2366</a>
            <Link href="/events/corporate" className="btn-ghost">Corporate events →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
