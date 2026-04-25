import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Tournaments, group golf, banquets on the covered patio, and the Thursday Retirees Club at Birchbank Golf Course in Genelle, BC. Pick the lane that fits.",
  alternates: { canonical: "/events" },
};

/**
 * Events HUB. Single job: route the visitor to the right detail page in
 * one screen. Detail content lives canonically on:
 *
 *   - /events/book              (banquet packages, MenuPdfCard, golf+dining)
 *   - /events/corporate         (B2B venue confidence, the course as venue)
 *   - /membership/retirees-club (Thursday tradition, blog, schedule)
 *
 * Do NOT duplicate banquet packages, the banquet PDF card, "how to start"
 * cards, or contact strips here. Each lives where it belongs.
 */

const LANES = [
  {
    eyebrow: "Tournaments, group golf & banquets",
    title: "Book your event",
    body:
      "From a small group to a large tournament, plus six published Bistro Banquet packages from $35 to $53 a person. Customized dates, times, and formats.",
    href: "/events/book",
    cta: "Booking & banquet packages",
  },
  {
    eyebrow: "Companies, foundations & teams",
    title: "Corporate events",
    body:
      "Client appreciation days, staff outings, charity tournaments. The course as a venue, the Bistro for the meal after.",
    href: "/events/corporate",
    cta: "Corporate venue details",
  },
  {
    eyebrow: "Open to all retirees",
    title: "Retirees Club, Thursdays",
    body:
      "Every Thursday morning April through October. Two-hour reserved tee block, monthly shotgun tournaments with brunch. Birchbank membership not required.",
    href: "/membership/retirees-club",
    cta: "Retirees Club details",
  },
];

export default function Events() {
  return (
    <>
      {/* 1. Hero */}
      <section className="pt-32 md:pt-40 pb-12 md:pb-16 bg-paper">
        <div className="container-edge">
          <p className="eyebrow mb-6">Events at Birchbank</p>
          <h1
            className="font-display text-granite max-w-[20ch] mb-8"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", lineHeight: "1.02", letterSpacing: "-0.015em" }}
          >
            Tournaments, group golf,<br />and the patio after.
          </h1>
          <p className="prose-editorial text-granite/85 max-w-2xl">
            Three lanes for hosting at Birchbank. Pick the one that fits and
            you&apos;re one click from the detail you actually need.
          </p>
        </div>
      </section>

      {/* 2. Three lanes — the entire job of this page */}
      <section className="pb-[var(--spacing-section)] bg-paper">
        <div className="container-edge">
          <ul className="grid md:grid-cols-3 gap-5 md:gap-6">
            {LANES.map((e) => (
              <li
                key={e.title}
                className="flex"
              >
                <Link
                  href={e.href}
                  className="group flex flex-col w-full border border-granite/15 p-7 md:p-8 bg-paper hover:border-amber transition-colors"
                >
                  <p className="eyebrow mb-3">{e.eyebrow}</p>
                  <p className="font-display text-2xl text-granite mb-4 leading-tight group-hover:text-amber transition-colors">
                    {e.title}
                  </p>
                  <p className="text-granite/85 text-base leading-relaxed mb-6 flex-1">
                    {e.body}
                  </p>
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-granite group-hover:text-amber transition-colors">
                    {e.cta} <span aria-hidden className="text-tamarack">→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. One short contact strip. Not a duplicate of the 3-card grids on the
          detail pages; just a quick "who to call" if the visitor already knows. */}
      <section className="py-12 md:py-14 bg-paper border-t border-granite/10">
        <div className="container-edge">
          <div className="grid gap-6 md:gap-10 md:grid-cols-12 items-baseline">
            <p className="md:col-span-3 eyebrow">Already know who to call?</p>
            <ul className="md:col-span-9 grid sm:grid-cols-3 gap-4 md:gap-6 font-mono text-sm tabular-nums">
              <li>
                <span className="text-silt">Office</span>{" "}
                <a
                  href="tel:+12506932366"
                  className="text-granite underline underline-offset-2 hover:text-amber"
                >
                  250-693-2366
                </a>
              </li>
              <li>
                <span className="text-silt">Pro Shop</span>{" "}
                <a
                  href="tel:+12506932255"
                  className="text-granite underline underline-offset-2 hover:text-amber"
                >
                  250-693-2255
                </a>
              </li>
              <li>
                <span className="text-silt">Bistro</span>{" "}
                <a
                  href="tel:+12506935451"
                  className="text-granite underline underline-offset-2 hover:text-amber"
                >
                  250-693-5451
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
