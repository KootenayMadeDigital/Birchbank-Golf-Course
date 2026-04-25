import type { Metadata } from "next";
import Link from "next/link";
import MenuPdfCard from "@/components/MenuPdfCard";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Tournaments, group golf, banquets on the covered patio, and the Thursday Retirees Club at Birchbank Golf Course in Genelle, BC. Six verified buffet packages, full bar, and a head pro who picks up the phone.",
  alternates: { canonical: "/events" },
};

/**
 * Events hub. Built strictly from verified sources:
 *
 *   - https://www.birchbankgolf.com/the-bistro/book-your-event/
 *     "From a round of golf for a small group to a large tournament" +
 *     "large covered patio, perfect for summer events"
 *   - https://www.birchbankgolf.com/the-bistro/  (bistro@ email + Bistro Banquet 2026 menu)
 *   - https://www.birchbankgolf.com/retirees-club/  (Thursdays, Apr-Oct, open to non-members)
 *   - https://birchbankretireesclub.blogspot.com (active 2026 recaps; named winners)
 *   - public/bistro/menus/banquet.pdf  (six buffet packages, per-person prices)
 *
 * What we deliberately DON'T claim, because we couldn't verify it:
 *   - Specific Men's Club / Ladies' Night schedules (Public Documents page
 *     still hosts only 2019 PDFs; we don't fabricate current dates)
 *   - office@birchbankgolf.com (no live page lists it)
 *   - Wedding packages (Bistro doesn't market weddings)
 */

const MENUS = {
  banquet: "/bistro/menus/banquet.pdf",
};

const LANES = [
  {
    eyebrow: "Tournaments & group golf",
    title: "Book your event",
    body:
      "From a round for a small group to a large tournament. Customized dates, times, and formats. The Pro Shop and the office build the day around your group.",
    href: "/events/book",
    cta: "See booking details",
  },
  {
    eyebrow: "The Bistro Banquet",
    title: "Six buffets, per-person prices",
    body:
      "Italian Feast, Burger, Roast Beef, Chicken & Ribs, Top Sirloin, Chicken Cordon Bleu. From $35 to $53 a person. Pick a package, confirm your numbers, eat well.",
    href: "/events/book",
    cta: "Banquet packages & prices",
  },
  {
    eyebrow: "Retirees Club Thursdays",
    title: "A weekly tradition, open to all retirees",
    body:
      "Every Thursday morning, April through October. Two-hour reserved tee block. Monthly shotgun tournaments with brunch. Birchbank membership not required.",
    href: "/membership/retirees-club",
    cta: "Retirees Club details",
  },
];

const INCLUDED = [
  {
    title: "Built around your group",
    body:
      "No template. Tell us a date range and a head count, the Pro Shop and the office work back from there.",
  },
  {
    title: "Combine golf with the meal",
    body:
      "Pair a tournament or a half-day outing with a Bistro Banquet buffet. One conversation, one bill.",
  },
  {
    title: "Covered patio for outdoor events",
    body:
      "The Bistro's large covered patio sits one tier above the first green. Perfect for summer gatherings, per the Bistro's own published copy.",
  },
  {
    title: "Fully licensed kitchen and bar",
    body:
      "Four BC drafts, deep can list, real wines, and a bar well that does the Caesar properly. Beverage cart on course in season.",
  },
];

export default function Events() {
  return (
    <>
      {/* 1. Hero */}
      <section className="pt-32 md:pt-40 pb-16 bg-paper">
        <div className="container-edge">
          <p className="eyebrow mb-6">Events at Birchbank</p>
          <h1
            className="font-display text-granite max-w-[20ch] mb-8"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", lineHeight: "1.02", letterSpacing: "-0.015em" }}
          >
            Tournaments, group golf,<br />and the patio after.
          </h1>
          <p className="prose-editorial text-granite/85 max-w-2xl">
            From a round for a small group to a large tournament, plus six published buffet
            packages on the covered patio. Member-owned, 213 days a year, and a head pro who
            picks up the phone. Call the office at{" "}
            <a href="tel:+12506932366" className="underline hover:text-amber">250-693-2366</a>{" "}
            to start a conversation.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="tel:+12506932366" className="btn-primary">Call the office</a>
            <Link href="/events/book" className="btn-ghost">Book an event →</Link>
          </div>
        </div>
      </section>

      <div className="container-edge"><div className="rule-hair" /></div>

      {/* 2. Three lanes */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow mb-5">Pick the lane</p>
            <h2 className="display-lg font-display mb-5">
              Three ways into Birchbank.
            </h2>
            <p className="prose-editorial text-granite/85">
              Tournament organizers, dining-first groups, and the Thursday-morning
              regulars all share the same course. Start with the lane that fits.
            </p>
          </div>

          <ul className="grid md:grid-cols-3 gap-5 md:gap-6">
            {LANES.map((e) => (
              <li
                key={e.title}
                className="border border-granite/15 p-7 md:p-8 flex flex-col bg-paper hover:border-amber transition-colors"
              >
                <p className="eyebrow mb-3">{e.eyebrow}</p>
                <p className="font-display text-2xl text-granite mb-4 leading-tight">{e.title}</p>
                <p className="text-granite/85 text-base leading-relaxed mb-6 flex-1">{e.body}</p>
                <Link href={e.href} className="btn-ghost self-start text-sm">
                  {e.cta} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. Banquet menu card, the centerpiece */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge">
          <div className="grid gap-10 md:grid-cols-12 items-end mb-10">
            <div className="md:col-span-7">
              <p className="eyebrow mb-5">The food question, answered</p>
              <h2 className="display-lg max-w-[18ch]">
                Open the banquet menu. Prices and dishes inside.
              </h2>
            </div>
            <p className="md:col-span-5 prose-editorial text-granite/85">
              Six buffets, per-person prices, every dish listed. Tournaments, retirements,
              celebrations of life, family reunions. The PDF answers most of what people
              call to ask before they call.
            </p>
          </div>

          <div className="grid gap-6 md:gap-7 md:grid-cols-12">
            <div className="md:col-span-7">
              <MenuPdfCard
                src={MENUS.banquet}
                eyebrow="Banquet · 2026"
                title="The Bistro Banquet"
                description="Six buffet packages for tournaments, corporate days, celebrations of life, retirements, and any other group of size you bring through the door."
                categories={[
                  "Italian Feast · $38",
                  "Burger · $35",
                  "Roast Beef · $49",
                  "Chicken & Ribs · $51",
                  "Top Sirloin · $53",
                  "Cordon Bleu · $38",
                ]}
                downloadName="bistro-2026-banquet-menu.pdf"
              />
            </div>
            <div className="md:col-span-5 flex flex-col justify-center">
              <p className="font-display text-granite leading-snug max-w-[22ch] mb-5"
                style={{ fontSize: "clamp(1.4rem, 2.6vw, 1.85rem)", letterSpacing: "-0.01em" }}
              >
                Top Sirloin tops the menu at $53 a person. Burger Buffet sits at $35. Most groups
                land between.
              </p>
              <p className="font-mono text-xs text-silt leading-relaxed">
                Prices do not include taxes or gratuities. Bookings and questions direct to the
                Bistro at{" "}
                <a href="tel:+12506935451" className="text-granite underline underline-offset-2 hover:text-amber">
                  250-693-5451
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. What every event includes */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow mb-5">What every event includes</p>
            <h2 className="display-lg font-display mb-5">
              The shared baseline.
            </h2>
            <p className="prose-editorial text-granite/85">
              Beyond that, every event is built around the group. Specifics, head counts, format,
              prizes, sponsorship, are scoped on a single call.
            </p>
          </div>

          <ul className="grid md:grid-cols-2 gap-5 md:gap-6">
            {INCLUDED.map((i) => (
              <li key={i.title} className="border border-granite/15 p-7 md:p-8">
                <p className="font-display text-xl text-granite mb-3">{i.title}</p>
                <p className="text-granite/85 text-base leading-relaxed">{i.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Retirees Club Thursdays */}
      <section className="py-[var(--spacing-section)] bg-cedar text-paper">
        <div className="container-edge grid gap-10 md:grid-cols-12 items-start">
          <div className="md:col-span-5">
            <p className="eyebrow text-tamarack mb-5">Thursdays, year after year</p>
            <h2
              className="font-display mb-5"
              style={{ fontSize: "clamp(1.75rem, 4.5vw, 2.75rem)", lineHeight: "1.05", letterSpacing: "-0.01em" }}
            >
              The Retirees Club, open to all retirees.
            </h2>
            <p className="prose-editorial text-paper/85 max-w-md">
              Every Thursday morning from April through October. A two-hour reserved tee
              block. Monthly shotgun tournaments end at the Bistro with brunch. You do
              not need to be a Birchbank member to join.
            </p>
          </div>
          <div className="md:col-span-7 space-y-5">
            <div className="border-l-2 border-tamarack pl-5">
              <p className="font-display text-xl text-paper">Active and well-recorded</p>
              <p className="text-paper/80 text-sm mt-2 leading-relaxed">
                The Retirees Club blog posts weekly recaps with named winners. April 2026
                opened with Masters Month, a four-week net competition. Last year's PGA
                Month champion was Mike Vlanich.
              </p>
            </div>
            <div className="border-l-2 border-tamarack pl-5">
              <p className="font-display text-xl text-paper">How to join</p>
              <p className="text-paper/80 text-sm mt-2 leading-relaxed">
                Email{" "}
                <a
                  href="mailto:birchbankretirees@gmail.com"
                  className="text-tamarack underline underline-offset-2 hover:text-paper"
                >
                  birchbankretirees@gmail.com
                </a>
                , or read the long-form details on the Birchbank Retirees Club page.
              </p>
              <Link
                href="/membership/retirees-club"
                className="inline-block mt-3 text-tamarack underline text-sm hover:text-paper"
              >
                Retirees Club page →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Lead time + how to start */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge grid gap-10 md:grid-cols-12 items-start">
          <div className="md:col-span-5">
            <p className="eyebrow mb-5">How to start</p>
            <h2 className="display-md font-display mb-5">
              One call. One conversation.
            </h2>
            <p className="prose-editorial text-granite/85 max-w-md">
              Events here aren't built through a widget. Call the office, give us a date
              range and a head count, we'll come back with a plan. The earlier the better
              for peak summer Saturdays; shoulder-season weeks open up faster.
            </p>
          </div>
          <div className="md:col-span-7">
            <div className="border border-granite/15 p-7 md:p-9 bg-paper">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-tamarack mb-4">
                The first call
              </p>
              <p className="font-display text-granite leading-snug mb-6"
                style={{ fontSize: "clamp(1.4rem, 2.8vw, 1.95rem)", letterSpacing: "-0.01em" }}
              >
                Office, 250-693-2366. Tell us the week, the head count, and whether you want
                golf, food, or both.
              </p>
              <a href="tel:+12506932366" className="btn-primary">
                Call the office
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Three contact cards */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge">
          <p className="eyebrow mb-6">Reach the right desk</p>
          <div className="grid gap-8 md:grid-cols-3 text-center md:text-left">
            <div className="border border-granite/15 p-7 hover:border-amber transition-colors">
              <p className="eyebrow mb-3">Office</p>
              <a href="tel:+12506932366" className="font-display text-2xl text-granite hover:text-amber tabular-nums">
                250-693-2366
              </a>
              <p className="text-silt text-sm mt-2">Event bookings, tournament coordination</p>
            </div>
            <div className="border border-granite/15 p-7 hover:border-amber transition-colors">
              <p className="eyebrow mb-3">Pro Shop</p>
              <a href="tel:+12506932255" className="font-display text-2xl text-granite hover:text-amber tabular-nums">
                250-693-2255
              </a>
              <p className="text-silt text-sm mt-2">Tee times, group rates, day-of questions</p>
            </div>
            <div className="border border-granite/15 p-7 hover:border-amber transition-colors">
              <p className="eyebrow mb-3">Bistro</p>
              <a href="tel:+12506935451" className="font-display text-2xl text-granite hover:text-amber tabular-nums">
                250-693-5451
              </a>
              <p className="text-silt text-sm mt-2">
                Banquets, patio events, menu planning.{" "}
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
      </section>

      {/* 8. Final CTA */}
      <section className="py-[var(--spacing-section)] bg-cedar text-paper">
        <div className="container-edge text-center max-w-3xl mx-auto">
          <p className="eyebrow text-paper/60 mb-6">Ready when you are</p>
          <h2
            className="font-display mb-8"
            style={{ fontSize: "clamp(2.25rem, 6vw, 4rem)", lineHeight: "1.02", letterSpacing: "-0.02em" }}
          >
            Pick a date.<br />We'll build the day.
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-5">
            <a href="tel:+12506932366" className="btn-primary bg-tamarack text-granite hover:bg-paper">
              Call 250-693-2366
            </a>
            <Link
              href="/events/corporate"
              className="btn-ghost text-paper border-paper/70 hover:text-tamarack hover:border-tamarack"
            >
              Corporate events →
            </Link>
          </div>
          <p className="mt-10 font-mono text-xs text-paper/60">
            5500 Highway 22, Genelle BC. 15 minutes south of Trail, 35 from Castlegar.
          </p>
        </div>
      </section>
    </>
  );
}
