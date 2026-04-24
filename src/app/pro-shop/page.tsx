import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Pro Shop",
  description:
    "The Birchbank Pro Shop. Apparel, hats, balls, and bags from Titleist, Callaway, Pinnacle, and adidas. Club fitting and CPGA-certified instruction. Full repair service. Open seven days, April through October.",
  alternates: { canonical: "/pro-shop" },
};

/**
 * Pro Shop page.
 *
 * The hero photograph (interior.webp) is a real shot of the Birchbank
 * Pro Shop floor: Callaway vest, Titleist staff bag and hats, a Pinnacle
 * ball box, and an adidas display in the back. Brand names surfaced on
 * this page are the ones visible in that photograph, which lets us list
 * actual stocked partners without inventing anything.
 *
 * Service descriptions stay verbatim from the published Pro Shop page
 * at birchbankgolf.com/pro-shop.
 */

const STOCKED_BRANDS = [
  { name: "Titleist", note: "Bags, hats, balls, gloves" },
  { name: "Callaway", note: "Apparel and outerwear" },
  { name: "Pinnacle", note: "Balls and accessories" },
  { name: "adidas",   note: "Bags and apparel" },
];

const SERVICES = [
  {
    title: "Apparel and accessories",
    body:
      "Fully stocked floor across multiple manufacturers. Polos, vests, outerwear, hats, gloves, balls, bags. Sales and seasonal markdowns on the rack year-round.",
    cta: { label: "Call to ask about stock", href: "tel:+12506932255" },
  },
  {
    title: "Club fitting",
    body:
      "Our Head Pro fits the latest models and tunes them to your swing. Try individual demo clubs on the range, or take them out for a full round and feel the difference between models and brands.",
    cta: { label: "Book a fitting", href: "tel:+12506932255" },
  },
  {
    title: "Instruction",
    body:
      "Lessons with Jeff Papilion, our CPGA-certified Head Pro. Start in golf with the right fundamentals, or work on your existing game and find the missing pieces.",
    cta: { label: "See lessons", href: "/lessons" },
  },
  {
    title: "Repair and re-grip",
    body:
      "We repair, re-grip, bend, straighten, and tweak just about any piece of equipment you use. Watch for specials on re-gripping, slippery old grips become a thing of the past.",
    cta: { label: "Drop in or call", href: "tel:+12506932255" },
  },
];

export default function ProShop() {
  return (
    <>
      {/* HERO , photo-led, two-column on desktop */}
      <section className="pt-28 md:pt-32 pb-[var(--spacing-section)] bg-paper">
        <div className="container-edge">
          <div className="grid gap-10 md:gap-14 md:grid-cols-12 items-center">
            {/* Editorial column */}
            <div className="md:col-span-5 md:order-1 order-2">
              <p className="eyebrow text-cedar mb-6">Pro Shop</p>
              <h1
                className="font-display text-granite mb-7"
                style={{
                  fontSize: "clamp(2.25rem, 5.5vw, 4.5rem)",
                  lineHeight: "1.02",
                  letterSpacing: "-0.018em",
                }}
              >
                Stocked. Fitted.<br />Re-gripped.
              </h1>
              <p className="prose-editorial text-granite/85 mb-7 max-w-md">
                A real shop with a CPGA-certified Head Pro behind the
                counter. Titleist on the table, Callaway on the rack,
                Pinnacle in the bin, and a regripping vise in the back.
              </p>

              <div className="flex flex-wrap gap-3 mb-6">
                <a href="tel:+12506932255" className="btn-primary">
                  Call 250-693-2255
                </a>
                <a href="mailto:proshop@birchbankgolf.com" className="btn-ghost">
                  proshop@birchbankgolf.com
                </a>
              </div>

              <p className="font-mono text-xs text-silt uppercase tracking-widest">
                8 AM to dusk · 7 days · April 1 to October 31
              </p>
            </div>

            {/* Photo column */}
            <figure className="md:col-span-7 md:order-2 order-1">
              <div className="relative aspect-[4/3] bg-granite/5 overflow-hidden">
                <Image
                  src="/pro-shop/interior.webp"
                  alt="The Birchbank Pro Shop floor: Callaway vest, white Titleist polo and bucket hat on a mannequin, navy and pink Titleist staff bag, hats and Pinnacle balls on the table, adidas bags in the back"
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  priority
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 font-mono text-xs text-silt">
                The Pro Shop floor, mid-season.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <div className="container-edge"><div className="rule-hair" /></div>

      {/* WHAT'S STOCKED , brand strip */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge">
          <p className="eyebrow text-cedar mb-3">On the floor</p>
          <h2 className="display-md font-display max-w-[22ch] mb-12">
            What you&rsquo;ll find when you walk in.
          </h2>

          <ul className="grid gap-5 md:gap-6 grid-cols-2 md:grid-cols-4">
            {STOCKED_BRANDS.map((b) => (
              <li
                key={b.name}
                className="border border-granite/15 p-6 md:p-7 flex flex-col"
              >
                <p className="font-display text-2xl md:text-3xl text-granite leading-tight mb-2">
                  {b.name}
                </p>
                <p className="font-mono text-xs uppercase tracking-widest text-silt">
                  {b.note}
                </p>
              </li>
            ))}
          </ul>

          <p className="mt-8 max-w-2xl text-sm text-silt leading-relaxed">
            Selection rotates with the season. Looking for a specific model
            or size? Call ahead, the Head Pro will tell you what&rsquo;s on
            the rack today.
          </p>
        </div>
      </section>

      {/* SERVICES , 4 up */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow text-cedar mb-3">What we do</p>
            <h2 className="display-lg font-display mb-5">
              Four services, one counter.
            </h2>
            <p className="prose-editorial text-granite/85">
              Everything the Pro Shop handles, listed exactly as it&rsquo;s
              described on the counter.
            </p>
          </div>

          <ul className="grid md:grid-cols-2 gap-5 md:gap-6">
            {SERVICES.map((s) => (
              <li
                key={s.title}
                className="border border-granite/15 p-7 md:p-8 flex flex-col bg-paper"
              >
                <p className="font-display text-2xl text-granite mb-4 leading-tight">
                  {s.title}
                </p>
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

      {/* DEMO DAY , annual event */}
      <section className="py-[var(--spacing-section)] bg-cedar text-paper">
        <div className="container-edge grid gap-10 md:grid-cols-12 items-center">
          <div className="md:col-span-7">
            <p className="eyebrow text-tamarack mb-5">Annual event</p>
            <h2
              className="font-display mb-6"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.25rem)",
                lineHeight: "1.05",
                letterSpacing: "-0.01em",
              }}
            >
              Manufacturers&rsquo; Demo Day.
            </h2>
            <p className="prose-editorial text-paper/85 max-w-xl">
              Once a year, the manufacturers&rsquo; reps come to Birchbank and
              bring every model from the new lineup. Hit them all on our
              driving range. No commitment, no pressure, just the latest
              equipment under your hands for an afternoon. Watch the Pro
              Shop page or our social feeds for the date.
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

      {/* MEMBERS NOTE , small block */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge">
          <div className="grid gap-10 md:grid-cols-12 items-start">
            <div className="md:col-span-5">
              <p className="eyebrow text-cedar mb-3">For members</p>
              <h2 className="display-md font-display max-w-[18ch] leading-tight">
                Pro Shop discount comes with the card.
              </h2>
            </div>
            <div className="md:col-span-7">
              <p className="prose-editorial text-granite/85 max-w-xl">
                Membership at Birchbank includes a discount on Pro Shop
                merchandise. The exact rate depends on tier; the front
                counter applies it automatically when you check in.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/membership" className="btn-ghost text-sm">
                  Membership tiers →
                </Link>
                <a href="tel:+12506932255" className="btn-ghost text-sm">
                  Ask the Pro Shop →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge">
          <p className="eyebrow text-cedar mb-3">While you&rsquo;re here</p>
          <h2 className="display-md font-display mb-10">Related pages.</h2>
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
                Jeff Papilion, our Head Pro, takes bookings through the
                Pro Shop line.
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
                Green fees, punch passes, power cart, range pass, and
                lockers.
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
