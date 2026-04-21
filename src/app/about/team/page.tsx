import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The team",
  description: "Meet the staff of Birchbank Golf Course — Jeff Papilion, Mike DesMarias, and Brenda Hyson.",
  alternates: { canonical: "/about/team" },
};

// Verified from https://www.birchbankgolf.com/contacts/
const TEAM = [
  {
    name: "Jeff Papilion",
    role: "Director of Golf · Head Professional (CPGA)",
    contacts: [
      { label: "Office", value: "250-693-2366", href: "tel:+12506932366" },
      { label: "Pro Shop", value: "250-693-2255", href: "tel:+12506932255" },
      { label: "Email", value: "office@birchbankgolf.com", href: "mailto:office@birchbankgolf.com" },
    ],
  },
  {
    name: "Mike DesMarias",
    role: "Course Superintendent",
    contacts: [
      { label: "Course", value: "250-693-2263", href: "tel:+12506932263" },
      { label: "Email", value: "course@birchbankgolf.com", href: "mailto:course@birchbankgolf.com" },
    ],
  },
  {
    name: "Brenda Hyson",
    role: "Accounting",
    contacts: [
      { label: "Office", value: "250-693-2366", href: "tel:+12506932366" },
      { label: "Email", value: "accounting@birchbankgolf.com", href: "mailto:accounting@birchbankgolf.com" },
    ],
  },
];

export default function Team() {
  return (
    <section className="pt-40 pb-[var(--spacing-section)] container-edge">
      <p className="eyebrow mb-6">The team</p>
      <h1 className="display-xl max-w-[22ch] mb-12">
        The people who run the course.
      </h1>

      <ul className="space-y-12">
        {TEAM.map((p) => (
          <li key={p.name} className="border-t border-granite/15 pt-8">
            <p className="font-display text-3xl mb-1">{p.name}</p>
            <p className="eyebrow mb-5">{p.role}</p>
            <ul className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-sm">
              {p.contacts.map((c) => (
                <li key={c.value}>
                  <span className="text-silt">{c.label}</span>{" "}
                  <a href={c.href} className="hover:text-amber underline">
                    {c.value}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
