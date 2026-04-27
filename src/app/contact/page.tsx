import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import BookButton from "@/components/BookButton";
import { REVIEW_PLATFORMS } from "@/data/reviews";

export const metadata: Metadata = {
  title: "Contacts",
  description:
    "Birchbank Golf Course · 5500 Highway 22, Genelle, BC. Office 250-693-2366 · Pro Shop 250-693-2255 · Bistro 250-693-5451. Open daily 8 am to dusk, April through October.",
  alternates: { canonical: "/contact" },
};

/**
 * Contact page. Every fact verified against
 * https://www.birchbankgolf.com/contacts/ (the live source of truth).
 *
 * Audience-first IA:
 *   1. Three primary tap-to-call cards (Office / Pro Shop / Bistro) for
 *      the 80% of visitors who want to call.
 *   2. "I want to ___" use-case grid that routes visitors to the
 *      dedicated detail page (book a tee time, banquet, membership,
 *      lessons, stay & play, dress code, FAQ) before they fill out a
 *      form they didn't need.
 *   3. Send-a-message form with subject options that mirror the site IA
 *      and audience-actual reasons (tournament, banquet, membership,
 *      lessons, stay & play, lost-and-found, press).
 *   4. Specialty staff contacts (Jeff / Mike / Brenda) for the 20%
 *      who already know who they're trying to reach.
 *   5. Address + hours card.
 *   6. Post-round review prompt.
 *
 * Pro Shop hours: "Open daily 8am-dusk, April 1-Oct 31; Closed during
 * off season" per the live /contacts/ page. The previous page on this
 * site said "9 am to 7 pm", which was wrong.
 */

const PRIMARY_LINES = [
  {
    label: "Office",
    headline: "Bookings, events, accounts.",
    blurb: "Tournaments, banquets, group golf, billing.",
    tel: "+12506932366",
    display: "250-693-2366",
    email: "office@birchbankgolf.com",
  },
  {
    label: "Pro Shop",
    headline: "Tee times, day-of questions.",
    blurb: "Booking confirmations, group rates, club fittings, lost-and-found.",
    tel: "+12506932255",
    display: "250-693-2255",
    email: "proshop@birchbankgolf.com",
  },
  {
    label: "Bistro",
    headline: "Food, patio, drinks.",
    blurb: "Walk-in dining, take-out, banquet questions, beverage cart on course.",
    tel: "+12506935451",
    display: "250-693-5451",
    email: "bistro@birchbankgolf.com",
  },
];

const ROUTE_ME = [
  { label: "Book a tee time",          href: "/book",                      description: "The Chronogolf widget, all available times." },
  { label: "Plan a banquet or tournament", href: "/events/book",           description: "Six published buffet packages, $35 to $53 a person." },
  { label: "Host a corporate day",     href: "/events/corporate",          description: "B2B venue, course + Bistro, one office to call." },
  { label: "Join as a member",         href: "/membership",                description: "Seven tiers from $640 Student to $4,050 Family." },
  { label: "Take a lesson",            href: "/lessons",                   description: "With Jeff Papilion, CPGA Head Professional." },
  { label: "Plan a visit",             href: "/plan-your-visit",           description: "Drive routes, airports, weather window." },
  { label: "Stay & play",              href: "/stay-and-play",             description: "Partner hotel, the Kootenay Golf Trail." },
  { label: "Coming from the US",       href: "/usa-visitors",              description: "Three crossings, currency, what to bring." },
  { label: "Check the dress code",     href: "/dress-code",                description: "Soft soles, collared shirts, the full code." },
  { label: "Read the FAQ",             href: "/faq",                       description: "Hours, season, ratings, the 1962 story." },
];

// Specialty contacts. Verified verbatim from
// https://www.birchbankgolf.com/contacts/.
const SPECIALTY = [
  {
    name: "Jeff Papilion",
    role: "Director of Golf · CPGA Head Professional",
    items: [
      { label: "Office", value: "250-693-2366", tel: "+12506932366" },
      { label: "Pro Shop", value: "250-693-2255", tel: "+12506932255" },
      { label: "Email", value: "proshop@birchbankgolf.com", mailto: true },
    ],
  },
  {
    name: "Mike DesMarias",
    role: "Course Superintendent",
    items: [
      { label: "Course", value: "250-693-2263", tel: "+12506932263" },
      { label: "Email", value: "course@birchbankgolf.com", mailto: true },
    ],
  },
  {
    name: "Brenda Hyson",
    role: "Accounting",
    items: [
      { label: "Office", value: "250-693-2366", tel: "+12506932366" },
      { label: "Email", value: "accounting@birchbankgolf.com", mailto: true },
    ],
  },
];

export default function Contact() {
  return (
    <>
      {/* 1. HERO with a small "two balls beside the cup" accent on the
          right. Tight 1:1, capped at 200px so it never crowds the
          headline. */}
      <section className="pt-32 md:pt-40 pb-12 bg-paper">
        <div className="container-edge grid gap-8 md:gap-10 md:grid-cols-12 items-end">
          <div className="md:col-span-9 order-1">
            <p className="eyebrow mb-6">Contacts</p>
            <h1
              className="font-display text-granite max-w-[18ch] mb-6"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", lineHeight: "1.02", letterSpacing: "-0.015em" }}
            >
              Call, email, or drop by.
            </h1>
            <p className="prose-editorial text-granite/85 max-w-2xl">
              Three offices, one course. Pick the right one below and somebody
              picks up. If you&apos;re not sure where to start, the Office can
              point you down the hall.
            </p>
          </div>
          <figure className="md:col-span-3 order-2 md:justify-self-end">
            <div className="relative w-full max-w-[200px] aspect-square overflow-hidden bg-granite/5 border border-granite/10 rounded-sm">
              <Image
                src="/contact/balls-green.webp"
                alt="Two golf balls resting next to the cup on a Birchbank green"
                fill
                sizes="200px"
                className="object-cover"
                loading="lazy"
                unoptimized
              />
            </div>
            <figcaption className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-silt">
              Two balls, one cup.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 2. THREE PRIMARY TAP-TO-CALL CARDS */}
      <section className="pb-[var(--spacing-section)] bg-paper">
        <div className="container-edge">
          <ul className="grid md:grid-cols-3 gap-5 md:gap-6">
            {PRIMARY_LINES.map((p) => (
              <li
                key={p.label}
                className="flex flex-col border border-granite/15 p-6 md:p-7 hover:border-amber transition-colors"
              >
                <p className="eyebrow mb-3">{p.label}</p>
                <p className="font-display text-xl text-granite mb-3 leading-tight">
                  {p.headline}
                </p>
                <p className="text-granite/85 text-sm leading-relaxed mb-6 flex-1">
                  {p.blurb}
                </p>
                <a
                  href={`tel:${p.tel}`}
                  className="font-display text-2xl text-granite hover:text-amber tabular-nums block min-h-[44px]"
                >
                  {p.display}
                </a>
                <a
                  href={`mailto:${p.email}`}
                  className="mt-2 font-mono text-xs text-silt hover:text-amber underline underline-offset-2 break-all"
                >
                  {p.email}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. "WHAT DO YOU NEED?" use-case routing */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge">
          <div className="grid gap-10 md:grid-cols-12 items-end mb-10">
            <div className="md:col-span-7">
              <p className="eyebrow mb-5">Find what you need</p>
              <h2 className="display-lg font-display max-w-[18ch]">
                The fastest answer is usually a page away.
              </h2>
            </div>
            <p className="md:col-span-5 prose-editorial text-granite/85">
              The site has a dedicated page for most reasons people get in
              touch. Click straight through, or use the form below if your
              question doesn&apos;t fit a category.
            </p>
          </div>

          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {ROUTE_ME.map((r) => (
              <li key={r.href}>
                <Link
                  href={r.href}
                  className="group block border border-granite/15 px-5 py-4 hover:border-amber transition-colors min-h-[44px]"
                >
                  <p className="font-display text-lg text-granite group-hover:text-amber transition-colors">
                    {r.label}
                    <span aria-hidden className="text-tamarack ml-1.5">→</span>
                  </p>
                  <p className="font-mono text-[11px] text-silt mt-1.5 leading-relaxed">
                    {r.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. SEND A MESSAGE form + ADDRESS / HOURS card sidebar */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge grid gap-10 lg:gap-12 lg:grid-cols-12 items-start">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-5">Send a message</p>
            <h2 className="display-md font-display mb-5 max-w-[20ch]">
              The note lands in the right inbox.
            </h2>
            <p className="prose-editorial text-granite/85 mb-8 max-w-xl">
              Pick a subject, write the question. We&apos;ll get back within a
              business day. For anything urgent, calling is faster.
            </p>
            <ContactForm />
          </div>

          <aside className="lg:col-span-5 lg:pl-6 lg:border-l lg:border-granite/15">
            <div className="space-y-7 font-mono text-sm text-granite/90">
              <div>
                <p className="eyebrow mb-2">Street address</p>
                <p className="leading-relaxed">
                  5500 Highway 22
                  <br />
                  Genelle, BC
                </p>
              </div>
              <div>
                <p className="eyebrow mb-2">Mailing address</p>
                <p className="leading-relaxed">
                  Birchbank Golf Course
                  <br />
                  PO Box 250
                  <br />
                  Trail, BC V1R 4L5
                </p>
              </div>
              <div>
                <p className="eyebrow mb-2">Season</p>
                <p>April 1 to October 31 · 213 days</p>
              </div>
              <div>
                <p className="eyebrow mb-2">Pro Shop hours</p>
                <p>
                  Open daily 8 am to dusk
                  <br />
                  <span className="text-silt">In season. Closed off-season.</span>
                </p>
              </div>
              <div>
                <p className="eyebrow mb-2">Bistro hours</p>
                <p>
                  Open daily 10 am to 6 pm
                  <br />
                  <span className="text-silt">In season.</span>
                </p>
              </div>
              <div className="pt-4 border-t border-granite/15">
                <p className="eyebrow mb-3">Quick action</p>
                <BookButton />
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* 5. SPECIALTY CONTACTS */}
      <section className="py-[var(--spacing-section)] bg-cedar text-paper">
        <div className="container-edge">
          <div className="grid gap-10 md:grid-cols-12 items-end mb-10">
            <div className="md:col-span-7">
              <p className="eyebrow text-tamarack mb-5">By name</p>
              <h2 className="display-lg max-w-[20ch]">
                Already know who you&apos;re trying to reach?
              </h2>
            </div>
            <p className="md:col-span-5 prose-editorial text-paper/85">
              The three people you&apos;re most likely to deal with. Direct
              line, direct email, no front desk in between.
            </p>
          </div>

          <ul className="grid md:grid-cols-3 gap-5 md:gap-6">
            {SPECIALTY.map((p) => (
              <li
                key={p.name}
                className="bg-paper text-granite border border-paper/15 p-6 md:p-7 rounded-sm"
              >
                <p className="font-display text-2xl mb-1">{p.name}</p>
                <p className="eyebrow mb-5">{p.role}</p>
                <ul className="space-y-2 font-mono text-sm">
                  {p.items.map((i) => (
                    <li key={i.value}>
                      <span className="text-silt">{i.label}</span>{" "}
                      {"tel" in i && i.tel ? (
                        <a
                          href={`tel:${i.tel}`}
                          className="text-granite hover:text-amber underline underline-offset-2 tabular-nums"
                        >
                          {i.value}
                        </a>
                      ) : (
                        <a
                          href={`mailto:${i.value}`}
                          className="text-granite hover:text-amber underline underline-offset-2 break-all"
                        >
                          {i.value}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. POST-ROUND REVIEW PROMPT */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge max-w-3xl">
          <p className="eyebrow mb-3">How was the round?</p>
          <p className="prose-editorial text-granite/85 mb-6">
            A quick note on Tripadvisor or GolfPass helps the next visitor
            find us, and it tells us what to keep doing.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-3 font-mono text-sm">
            <a
              href={REVIEW_PLATFORMS.tripadvisor.writeUrl}
              target="_blank"
              rel="noopener"
              className="text-amber hover:text-amber-dark underline underline-offset-2"
            >
              Leave a Tripadvisor review ↗
            </a>
            <a
              href={REVIEW_PLATFORMS.golfpass.readUrl}
              target="_blank"
              rel="noopener"
              className="text-granite hover:text-amber underline underline-offset-2"
            >
              Review on GolfPass ↗
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
    </>
  );
}
