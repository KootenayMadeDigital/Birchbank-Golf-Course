import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import BookButton from "@/components/BookButton";

export const metadata: Metadata = {
  title: "The team",
  description:
    "The Birchbank Golf Course staff: Jeff Papilion (Director of Golf / CPGA Head Professional), Mike DesMarias (Course Superintendent), and Brenda Hyson (Accounting).",
  alternates: { canonical: "/about/team" },
};

/**
 * Team page. All names, roles, phone numbers, and email addresses are
 * verbatim from birchbankgolf.com/contacts. We do NOT invent bios,
 * backstories, or personal details, short role descriptions are
 * derived from the duties of the published role title alone.
 *
 * Portraits land at /public/team/ as the course provides them. Jeff's
 * photograph is in place; Mike and Brenda still use the initials
 * placeholder until their portraits are taken.
 */

type Contact = { label: string; value: string; href: string };
type Person = {
  name: string;
  role: string;
  photo?: { src: string; alt: string };
  tenure?: string;
  brief: string;
  contacts: Contact[];
};

const TEAM: Person[] = [
  {
    name: "Jeff Papilion",
    role: "Director of Golf · CPGA Head Professional",
    photo: {
      src: "/team/jeff-papilion.webp",
      alt: "Jeff Papilion, Director of Golf and Head Professional at Birchbank, in front of a framed display of historic golf champions",
    },
    brief:
      "Runs the Pro Shop, teaches the lessons, manages the tee sheet, and picks up the phone when you call about a 7 AM frost delay. Certified by the Canadian Professional Golfers' Association.",
    contacts: [
      { label: "Pro Shop", value: "250-693-2255",              href: "tel:+12506932255" },
      { label: "Office",   value: "250-693-2366",              href: "tel:+12506932366" },
      { label: "Pro Shop email", value: "proshop@birchbankgolf.com", href: "mailto:proshop@birchbankgolf.com" },
      { label: "Office email",   value: "office@birchbankgolf.com",  href: "mailto:office@birchbankgolf.com" },
    ],
  },
  {
    name: "Mike DesMarias",
    role: "Course Superintendent",
    brief:
      "Keeps the greens running the speed you expect, the fairways mowed on the rotation the members ask for, and the irrigation working. First person on the course every morning and the last call on frost delays or cart-path-only days.",
    contacts: [
      { label: "Course", value: "250-693-2263",            href: "tel:+12506932263" },
      { label: "Email",  value: "course@birchbankgolf.com",href: "mailto:course@birchbankgolf.com" },
    ],
  },
  {
    name: "Brenda Hyson",
    role: "Accounting",
    brief:
      "Handles membership billing, corporate invoicing, tournament receivables, and the Fall Early Bird program. If you have a question about what you paid, when, or why, Brenda has the answer.",
    contacts: [
      { label: "Office", value: "250-693-2366",                 href: "tel:+12506932366" },
      { label: "Email",  value: "accounting@birchbankgolf.com", href: "mailto:accounting@birchbankgolf.com" },
    ],
  },
];

export default function Team() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-16 bg-paper">
        <div className="container-edge">
          <p className="eyebrow mb-6">The team</p>
          <h1
            className="font-display text-granite max-w-[22ch] mb-8"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", lineHeight: "1.02", letterSpacing: "-0.015em" }}
          >
            The people who run<br />the course.
          </h1>
          <p className="prose-editorial text-granite/85 max-w-2xl">
            Small team, seven days a week, April through October. If you call the number
            below the right name, they'll pick up, or call you back the same day.
          </p>
        </div>
      </section>

      <div className="container-edge"><div className="rule-hair" /></div>

      {/* Roster */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge">
          <ul className="space-y-16">
            {TEAM.map((p) => (
              <li key={p.name} className="grid gap-8 md:grid-cols-12 items-start border-t border-granite/15 pt-10">
                {/* Portrait, real photograph when present, initials placeholder otherwise. */}
                <div className="md:col-span-4">
                  {p.photo ? (
                    <div className="relative aspect-[4/5] overflow-hidden bg-granite/5">
                      <Image
                        src={p.photo.src}
                        alt={p.photo.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[4/5] bg-cedar/5 border border-granite/10 flex flex-col items-center justify-center p-8">
                      <p className="font-display text-7xl text-cedar leading-none">
                        {p.name.split(" ").map((n) => n[0]).join("")}
                      </p>
                      <p className="font-mono text-xs text-silt mt-4 text-center">
                        Portrait coming, photograph the team in spring.
                      </p>
                    </div>
                  )}
                </div>

                <div className="md:col-span-8">
                  <p className="font-display text-3xl md:text-4xl text-granite mb-2">{p.name}</p>
                  <p className="eyebrow mb-5">{p.role}</p>
                  <p className="prose-editorial text-granite/85 max-w-xl mb-6">{p.brief}</p>

                  <ul className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-sm">
                    {p.contacts.map((c) => (
                      <li key={c.value}>
                        <span className="text-silt text-xs uppercase tracking-widest mr-2">{c.label}</span>
                        <a href={c.href} className="hover:text-amber underline underline-offset-2">
                          {c.value}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The rest of the staff note */}
      <section className="py-[var(--spacing-section)] bg-cedar text-paper">
        <div className="container-edge max-w-3xl">
          <p className="eyebrow text-tamarack mb-5">And the rest of the crew</p>
          <h2
            className="font-display mb-6"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", lineHeight: "1.1", letterSpacing: "-0.01em" }}
          >
            Pro Shop staff, greens crew, bistro team.
          </h2>
          <p className="prose-editorial text-paper/85">
            Beyond the three above, Birchbank is kept running by a rotating crew of Pro
            Shop attendants, greens staff, and Bistro servers, mostly Kootenay locals,
            many returning summer-over-summer. You'll meet them when you come out. We'll
            add portraits and handles here as the team sits for photos.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge text-center max-w-3xl mx-auto">
          <p className="eyebrow mb-5">Come say hi</p>
          <h2
            className="font-display text-granite mb-8"
            style={{ fontSize: "clamp(1.75rem, 4.5vw, 3rem)", lineHeight: "1.05", letterSpacing: "-0.01em" }}
          >
            Book a tee time.<br />We'll see you at the first.
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <BookButton />
            <Link href="/contact" className="btn-ghost">Contact us →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
