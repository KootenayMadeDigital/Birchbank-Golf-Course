import type { Metadata } from "next";
import Link from "next/link";
import BookButton from "@/components/BookButton";
import { FAQ, FAQ_CATEGORIES } from "@/data/faq";
import { faqJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Everything visitors ask about Birchbank Golf Course. Hours, location, dress code, cart rates, course history, and how to book a tee time.",
  alternates: { canonical: "/faq" },
};

/**
 * FAQ page. One job: searchable Q&A hub.
 *
 * Owns: the question grid + category nav. Cross-links into the dedicated
 * detail pages instead of duplicating their content.
 *
 * Verified facts only:
 *   - Pro Shop hours: 8 am to dusk per CLAUDE.md (NOT 9 AM - 7 PM)
 *   - Bistro hours: 10 am to 6 pm per CLAUDE.md and the Bistro page
 *   - Season: Apr 1 to Oct 31 per birchbankgolf.com
 *
 * FAQPage JSON-LD is a material SEO asset per the blueprint's local-SEO
 * plan; the schema serializes from src/data/faq.ts.
 */

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQ)) }}
      />

      {/* 1. HERO + JUMP NAV */}
      <section className="pt-32 md:pt-40 pb-16 bg-paper">
        <div className="container-edge">
          <p className="eyebrow mb-6">FAQ</p>
          <h1
            className="font-display text-granite max-w-[18ch] mb-8"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", lineHeight: "1.02", letterSpacing: "-0.015em" }}
          >
            Things people ask us.
          </h1>
          <p className="prose-editorial text-granite/85 max-w-2xl mb-10">
            Hours, dress code, cart rates, the 1962 history, and how to get here from
            either side of the border. If your question isn&apos;t below, call the Pro
            Shop. Someone picks up.
          </p>

          <nav aria-label="FAQ categories" className="flex flex-wrap gap-2">
            {FAQ_CATEGORIES.map((c) => (
              <a
                key={c.key}
                href={`#${c.key}`}
                className="inline-flex items-center px-4 py-2 border border-granite/20 hover:border-amber hover:text-amber transition-colors font-mono text-xs uppercase tracking-widest rounded-sm"
              >
                {c.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <div className="container-edge"><div className="rule-hair" /></div>

      {/* 2. CATEGORY SECTIONS */}
      {FAQ_CATEGORIES.map((category) => {
        const items = FAQ.filter((f) => f.category === category.key);
        if (items.length === 0) return null;
        return (
          <section
            key={category.key}
            id={category.key}
            className="py-[var(--spacing-section)] bg-paper scroll-mt-32"
            aria-labelledby={`${category.key}-heading`}
          >
            <div className="container-edge grid gap-10 md:grid-cols-12 items-start">
              <div className="md:col-span-4 md:sticky md:top-32 self-start">
                <p className="eyebrow mb-5">{category.label}</p>
                <h2
                  id={`${category.key}-heading`}
                  className="display-md font-display mb-4"
                >
                  {category.key === "visiting" && "When, where, how."}
                  {category.key === "course"   && "The course itself."}
                  {category.key === "fees"     && "Dollars and equipment."}
                  {category.key === "community" && "The regulars."}
                </h2>
                <p className="text-silt text-sm">{category.blurb}</p>
              </div>

              <div className="md:col-span-8">
                <ul className="divide-y divide-granite/15 border-t border-b border-granite/15">
                  {items.map((f) => (
                    <li key={f.question}>
                      <details className="group py-6">
                        <summary className="flex items-baseline justify-between cursor-pointer list-none gap-6">
                          <span className="font-display text-xl md:text-2xl text-granite group-hover:text-amber transition-colors">
                            {f.question}
                          </span>
                          <span
                            aria-hidden="true"
                            className="font-mono text-amber text-lg shrink-0 transition-transform group-open:rotate-45"
                          >
                            +
                          </span>
                        </summary>
                        <div className="prose-editorial text-granite/85 text-base mt-4 max-w-2xl">
                          {f.answer}
                        </div>
                      </details>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        );
      })}

      {/* 3. QUICK CROSS-LINKS, the 4 dedicated detail pages */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge">
          <p className="eyebrow mb-5">Need more detail?</p>
          <h2 className="display-md font-display mb-8 max-w-2xl">
            Each topic has its own page.
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/plan-your-visit" className="group border border-granite/15 p-5 hover:border-amber transition-colors">
              <p className="font-display text-lg text-granite group-hover:text-amber transition-colors">Plan your visit</p>
              <p className="text-silt text-xs mt-2 leading-relaxed">Drive routes, airports, season window.</p>
            </Link>
            <Link href="/stay-and-play" className="group border border-granite/15 p-5 hover:border-amber transition-colors">
              <p className="font-display text-lg text-granite group-hover:text-amber transition-colors">Stay &amp; play</p>
              <p className="text-silt text-xs mt-2 leading-relaxed">Hotels, dinner, Kootenay Golf Trail.</p>
            </Link>
            <Link href="/usa-visitors" className="group border border-granite/15 p-5 hover:border-amber transition-colors">
              <p className="font-display text-lg text-granite group-hover:text-amber transition-colors">For US visitors</p>
              <p className="text-silt text-xs mt-2 leading-relaxed">Crossings, drive times, currency.</p>
            </Link>
            <Link href="/dress-code" className="group border border-granite/15 p-5 hover:border-amber transition-colors">
              <p className="font-display text-lg text-granite group-hover:text-amber transition-colors">Dress code</p>
              <p className="text-silt text-xs mt-2 leading-relaxed">Acceptable apparel, footwear, exceptions.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. STILL HAVE A QUESTION */}
      <section className="py-[var(--spacing-section)] bg-cedar text-paper">
        <div className="container-edge grid gap-10 md:grid-cols-12 items-center">
          <div className="md:col-span-7">
            <p className="eyebrow text-tamarack mb-5">Still have a question?</p>
            <h2
              className="font-display mb-5"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: "1.02", letterSpacing: "-0.015em" }}
            >
              Call us. Somebody picks up.
            </h2>
            <p className="prose-editorial text-paper/85 max-w-xl">
              The Pro Shop is open 8 am to dusk, seven days a week through the season.
              The Bistro line picks up 10 am to 6 pm. Off-season (November through March),
              leave a voicemail and the office returns calls within a business day.
            </p>
          </div>
          <div className="md:col-span-5 md:text-right">
            <div className="flex flex-wrap md:justify-end gap-4">
              <a href="tel:+12506932255" className="btn-primary bg-tamarack text-granite hover:bg-paper">
                Call 250-693-2255
              </a>
              <Link
                href="/contact"
                className="btn-ghost text-paper border-paper/70 hover:text-tamarack hover:border-tamarack"
              >
                Contact form
              </Link>
            </div>
            <p className="font-mono text-xs text-paper/60 mt-6 tabular-nums">
              Bistro · 250-693-5451<br />
              5500 Highway 22, Genelle BC
            </p>
          </div>
        </div>
      </section>

      {/* 5. FINAL CTA, FAQ-closer flavour */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge text-center max-w-2xl mx-auto">
          <p className="eyebrow mb-5">Answered enough</p>
          <p
            className="font-display text-granite mb-8"
            style={{ fontSize: "clamp(1.75rem, 4.5vw, 3rem)", lineHeight: "1.05", letterSpacing: "-0.01em" }}
          >
            Go ahead and book.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <BookButton />
            <Link href="/rates" className="btn-ghost">See rates →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
