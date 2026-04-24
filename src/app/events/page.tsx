import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Tournaments, group golf, corporate outings, club play, and dining events at Birchbank Golf Course. Book a custom event or see the club schedules.",
  alternates: { canonical: "/events" },
};

/**
 * Events hub.
 *
 * Mirrors the two event surfaces that are live on birchbankgolf.com:
 *   - /the-bistro/book-your-event/  -> custom event bookings (tournaments,
 *     small groups, dining & social functions on the covered patio)
 *   - /pro-shop/events-calendar/    -> club schedules (Retirees / Men's /
 *     Ladies') posted on the Public Documents page
 *
 * We add /events/corporate as a dedicated lane for corporate outings +
 * tournament hosting because the real site only treats those inline
 * under 'large tournaments' in the Book Your Event copy. That's
 * a gap, not a fabrication -- the service exists, it just isn't merchandized.
 */

const EVENT_KINDS = [
  {
    eyebrow: "Tournaments & group golf",
    title: "Book your event",
    body: "From a round for a small group to a large tournament, customized dates, times, and formats. Call the office or the Pro Shop to scope your event.",
    href: "/events/book",
    cta: "See booking details",
  },
  {
    eyebrow: "Corporate outings",
    title: "Host your company's day",
    body: "Corporate tournaments, buyouts, client golf, and Teck-region corporate days. Shotgun start, scrambles, skins games, Bistro catering, prizes.",
    href: "/events/corporate",
    cta: "Plan a corporate event",
  },
  {
    eyebrow: "Dining & social",
    title: "The Bistro's covered patio",
    body: "Larger groups for meals, appetizers, and refreshments, as a standalone function or paired with a golf package. The covered patio suits summer gatherings.",
    href: "/events/book",
    cta: "Dining package details",
  },
  {
    eyebrow: "Club play",
    title: "Retirees, Men's, Ladies'",
    body: "Regular weekly schedules for the three in-club leagues. Retirees on Thursdays, Men's and Ladies' night on their respective evenings. Posted schedules on the Public Documents page.",
    href: "/membership/retirees-club",
    cta: "Retirees Club details",
  },
];

export default function Events() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-16 bg-paper">
        <div className="container-edge">
          <p className="eyebrow mb-6">Events</p>
          <h1
            className="font-display text-granite max-w-[22ch] mb-8"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", lineHeight: "1.02", letterSpacing: "-0.015em" }}
          >
            Tournaments,<br />outings, club play.
          </h1>
          <p className="prose-editorial text-granite/85 max-w-2xl">
            Birchbank hosts custom golf events, corporate outings, dining functions, and
            regular club play. Every event is built to your group, we don't run a cookie-
            cutter package. Call the office at{" "}
            <a href="tel:+12506932366" className="underline hover:text-amber">250-693-2366</a>
            {" "}to start a conversation.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="tel:+12506932366" className="btn-primary">Call the office</a>
            <Link href="/events/book" className="btn-ghost">Book an event →</Link>
          </div>
        </div>
      </section>

      <div className="container-edge"><div className="rule-hair" /></div>

      {/* Four event kinds */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow mb-5">Four kinds of event</p>
            <h2 className="display-lg font-display mb-5">
              Pick the lane that fits.
            </h2>
          </div>

          <ul className="grid md:grid-cols-2 gap-5 md:gap-6">
            {EVENT_KINDS.map((e) => (
              <li key={e.title} className="border border-granite/15 p-7 md:p-8 flex flex-col hover:border-amber transition-colors">
                <p className="eyebrow mb-3">{e.eyebrow}</p>
                <p className="font-display text-2xl text-granite mb-4">{e.title}</p>
                <p className="text-granite/85 text-base leading-relaxed mb-6 flex-1">{e.body}</p>
                <Link href={e.href} className="btn-ghost self-start text-sm">
                  {e.cta} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Club schedules */}
      <section className="py-[var(--spacing-section)] bg-cedar text-paper">
        <div className="container-edge grid gap-10 md:grid-cols-12 items-start">
          <div className="md:col-span-5">
            <p className="eyebrow text-tamarack mb-5">Club schedules</p>
            <h2
              className="font-display mb-5"
              style={{ fontSize: "clamp(1.75rem, 4.5vw, 2.75rem)", lineHeight: "1.05", letterSpacing: "-0.01em" }}
            >
              Retirees, Men's, Ladies'.
            </h2>
            <p className="prose-editorial text-paper/85">
              Three weekly in-club leagues run through the season. Printed schedules are
              available at the course; digital copies go up on the Public Documents page as
              they become available.
            </p>
          </div>
          <div className="md:col-span-7 space-y-5">
            <div className="border-l-2 border-tamarack pl-5">
              <p className="font-display text-xl text-paper">Retirees Club</p>
              <p className="text-paper/80 text-sm mt-1">
                Thursday mornings, April through October. Two-hour reserved tee block. Open
                to retired players whether or not you're a Birchbank member.
              </p>
              <Link href="/membership/retirees-club" className="inline-block mt-3 text-tamarack underline text-sm hover:text-paper">
                Retirees Club page →
              </Link>
            </div>
            <div className="border-l-2 border-tamarack pl-5">
              <p className="font-display text-xl text-paper">Men's Club &amp; Ladies' Night</p>
              <p className="text-paper/80 text-sm mt-1">
                Regular weekly play nights for member leagues. Schedule and start times are
                posted on the printed schedule at the Pro Shop.
              </p>
              <a href="tel:+12506932255" className="inline-block mt-3 text-tamarack underline text-sm hover:text-paper">
                Pro Shop · 250-693-2255 →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-action row */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge grid gap-8 md:grid-cols-3 text-center md:text-left">
          <div className="border border-granite/15 p-7">
            <p className="eyebrow mb-3">Office</p>
            <a href="tel:+12506932366" className="font-display text-2xl text-granite hover:text-amber">
              250-693-2366
            </a>
            <p className="text-silt text-sm mt-2">Event bookings, tournament coordination</p>
          </div>
          <div className="border border-granite/15 p-7">
            <p className="eyebrow mb-3">Pro Shop</p>
            <a href="tel:+12506932255" className="font-display text-2xl text-granite hover:text-amber">
              250-693-2255
            </a>
            <p className="text-silt text-sm mt-2">Tee times, group rates, day-of questions</p>
          </div>
          <div className="border border-granite/15 p-7">
            <p className="eyebrow mb-3">Bistro</p>
            <a href="tel:+12506935451" className="font-display text-2xl text-granite hover:text-amber">
              250-693-5451
            </a>
            <p className="text-silt text-sm mt-2">Catering, patio events, menu planning</p>
          </div>
        </div>
      </section>
    </>
  );
}
