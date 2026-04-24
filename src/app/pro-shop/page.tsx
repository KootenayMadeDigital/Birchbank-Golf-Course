import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pro Shop",
  description:
    "The Birchbank Pro Shop, fully stocked clothing and accessories, club fitting with the Head Pro, lessons from a CPGA-certified professional, full repair service, and the annual Manufacturers' Demo Day.",
  alternates: { canonical: "/pro-shop" },
};

/**
 * Pro Shop page. Every claim on this page is verified from
 * https://www.birchbankgolf.com/pro-shop/ or the course's Contacts page.
 * No invented pricing, no fabricated brand partnerships, no speculative
 * service offerings.
 *
 * The published Pro Shop page lists four services (Clothing & Accessories,
 * Club Fitting, Instruction, Full Service Shop), we surface all four,
 * plus the "Manufacturers' Demo Day" event that's published on the same
 * page as a recurring annual program.
 */

const SERVICES = [
  {
    title: "Clothing & accessories",
    body:
      "Fully stocked Pro Shop with a variety of clothing manufacturers, good choice of colour, style, and comfort. Always a selection and sales for every budget.",
    cta: { label: "Call 250-693-2255", href: "tel:+12506932255" },
  },
  {
    title: "Club fitting",
    body:
      "Our Head Pro fits the latest models of clubs and fine-tunes them to get the most out of your game. Try our individual demo clubs on the range, or take them out for a full round and feel the difference between models and brands.",
    cta: { label: "Book a fitting", href: "tel:+12506932255" },
  },
  {
    title: "Instruction",
    body:
      "Book lessons with our Head Pro, a CPGA certified professional. Start in golf with the right fundamentals, or work on your existing game to find the missing pieces.",
    cta: { label: "See lessons", href: "/lessons" },
  },
  {
    title: "Full service shop",
    body:
      "We repair, re-grip, bend, straighten, and tweak just about any piece of equipment you use. Watch for specials on re-gripping, make those old, slippery grips a thing of the past.",
    cta: { label: "Drop in or call", href: "tel:+12506932255" },
  },
];

export default function ProShop() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-16 bg-paper">
        <div className="container-edge">
          <p className="eyebrow mb-6">Pro Shop</p>
          <h1
            className="font-display text-granite max-w-[20ch] mb-8"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", lineHeight: "1.02", letterSpacing: "-0.015em" }}
          >
            Clothing, fittings,<br />lessons, repairs.
          </h1>
          <p className="prose-editorial text-granite/85 max-w-2xl mb-8">
            A fully stocked shop with a CPGA-certified head professional behind the counter.
            Open seven days a week, April through October. Call the Pro Shop line to book
            a fitting, schedule a lesson, or drop clubs off for regripping.
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="tel:+12506932255" className="btn-primary">Call 250-693-2255</a>
            <a href="mailto:proshop@birchbankgolf.com" className="btn-ghost">
              proshop@birchbankgolf.com
            </a>
          </div>

          <p className="mt-6 font-mono text-xs text-silt">
            Pro Shop · 9 AM – 7 PM · 7 days · April 1 – October 31
          </p>
        </div>
      </section>

      <div className="container-edge"><div className="rule-hair" /></div>

      {/* Services */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow mb-5">What we do</p>
            <h2 className="display-lg font-display mb-5">
              Four services, one counter.
            </h2>
            <p className="prose-editorial text-granite/85">
              Everything the Pro Shop handles, listed exactly as it's described on the
              counter, and on the current birchbankgolf.com Pro Shop page.
            </p>
          </div>

          <ul className="grid md:grid-cols-2 gap-5 md:gap-6">
            {SERVICES.map((s) => (
              <li key={s.title} className="border border-granite/15 p-7 md:p-8 flex flex-col">
                <p className="font-display text-2xl text-granite mb-4">{s.title}</p>
                <p className="text-granite/85 text-base leading-relaxed mb-6 flex-1">
                  {s.body}
                </p>
                {s.cta.href.startsWith("tel:") || s.cta.href.startsWith("mailto:") ? (
                  <a href={s.cta.href} className="btn-ghost self-start text-sm">
                    {s.cta.label} →
                  </a>
                ) : (
                  <Link href={s.cta.href} className="btn-ghost self-start text-sm">
                    {s.cta.label} →
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Manufacturers' Demo Day, mentioned on the real site's Pro Shop page */}
      <section className="py-[var(--spacing-section)] bg-cedar text-paper">
        <div className="container-edge grid gap-10 md:grid-cols-12 items-center">
          <div className="md:col-span-7">
            <p className="eyebrow text-tamarack mb-5">Annual event</p>
            <h2
              className="font-display mb-5"
              style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)", lineHeight: "1.05", letterSpacing: "-0.01em" }}
            >
              Manufacturers' Demo Day.
            </h2>
            <p className="prose-editorial text-paper/85 max-w-xl">
              Once a year, the manufacturers' reps come to Birchbank and bring every model
              from the new lineup. Hit them all on our driving range, no commitment, no
              pressure, just the latest equipment under your hands for an afternoon.
              Watch the Pro Shop page or our social feeds for the date.
            </p>
          </div>
          <div className="md:col-span-5 md:text-right space-y-3">
            <a
              href="tel:+12506932255"
              className="btn-primary bg-tamarack text-granite hover:bg-paper inline-block"
            >
              Ask about Demo Day
            </a>
            <br />
            <a
              href="https://www.facebook.com/BirchbankGolf"
              target="_blank"
              rel="noopener"
              className="btn-ghost text-paper border-paper/70 hover:text-tamarack hover:border-tamarack inline-block"
            >
              Follow on Facebook ↗
            </a>
          </div>
        </div>
      </section>

      {/* Adjacent pages */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge">
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow mb-5">While you're here</p>
            <h2 className="display-md font-display mb-5">Related pages.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            <Link
              href="/lessons"
              className="group border border-granite/15 p-7 hover:border-amber transition-colors"
            >
              <p className="eyebrow mb-3">Lessons</p>
              <p className="font-display text-xl mb-3 group-hover:text-amber transition-colors">
                With a CPGA pro.
              </p>
              <p className="text-silt text-sm leading-relaxed">
                Jeff Papilion, our Head Pro, takes bookings through the Pro Shop line.
              </p>
            </Link>
            <Link
              href="/rates"
              className="group border border-granite/15 p-7 hover:border-amber transition-colors"
            >
              <p className="eyebrow mb-3">Rates</p>
              <p className="font-display text-xl mb-3 group-hover:text-amber transition-colors">
                Everything, in full.
              </p>
              <p className="text-silt text-sm leading-relaxed">
                Green fees, punch passes, power cart, range pass, and lockers.
              </p>
            </Link>
            <Link
              href="/membership"
              className="group border border-granite/15 p-7 hover:border-amber transition-colors"
            >
              <p className="eyebrow mb-3">Memberships</p>
              <p className="font-display text-xl mb-3 group-hover:text-amber transition-colors">
                Seven tiers.
              </p>
              <p className="text-silt text-sm leading-relaxed">
                Pro Shop discounts are a member benefit. Call to join.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
