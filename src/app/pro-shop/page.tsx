import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pro Shop",
  description: "Fully stocked Pro Shop at Birchbank Golf Course — clothing, club fitting, lessons with a CPGA professional, club repair and regripping.",
  alternates: { canonical: "/pro-shop" },
};

// All service descriptions below are quoted or tightly paraphrased from
// https://www.birchbankgolf.com/pro-shop/
export default function ProShop() {
  return (
    <>
      <section className="pt-40 pb-16 container-edge">
        <p className="eyebrow mb-6">Pro Shop</p>
        <h1 className="display-xl max-w-[20ch] mb-10">
          Clothing, fittings, lessons, repairs.
        </h1>
        <p className="prose-editorial max-w-2xl text-granite/85">
          A fully stocked Pro Shop with a variety of clothing manufacturers — a good
          choice of colour, style, and comfort. Demo clubs on the range and for full
          rounds. Annual Manufacturers' Demo Day events.
        </p>
        <div className="mt-6 font-mono text-sm text-silt">
          <a href="tel:+12506932255" className="underline hover:text-amber">
            250-693-2255
          </a>
          <span className="mx-3">·</span>
          <a href="mailto:proshop@birchbankgolf.com" className="underline hover:text-amber">
            proshop@birchbankgolf.com
          </a>
          <span className="mx-3">·</span>
          9:00 am – 7:00 pm, 7 days a week
        </div>
      </section>

      <section className="pb-[var(--spacing-section)] container-edge grid gap-8 md:grid-cols-3">
        <div className="border border-granite/15 p-8">
          <p className="font-display text-2xl mb-3">Lessons</p>
          <p className="text-silt text-sm mb-5">
            Book lessons from our Head Pro, a CPGA certified Professional.
          </p>
          <Link href="/contact" className="btn-ghost text-sm">Inquire →</Link>
        </div>
        <div className="border border-granite/15 p-8">
          <p className="font-display text-2xl mb-3">Club fitting</p>
          <p className="text-silt text-sm mb-5">
            Demo clubs on the range and for full rounds. Annual Manufacturers' Demo Day
            events.
          </p>
          <Link href="/contact" className="btn-ghost text-sm">Book a fitting →</Link>
        </div>
        <div className="border border-granite/15 p-8">
          <p className="font-display text-2xl mb-3">Repair &amp; regripping</p>
          <p className="text-silt text-sm mb-5">
            We repair, re-grip, bend, straighten, and tweak just about any piece of
            equipment.
          </p>
          <Link href="/contact" className="btn-ghost text-sm">Drop in or call →</Link>
        </div>
      </section>
    </>
  );
}
