import type { Metadata } from "next";
import { REVIEW_PLATFORMS } from "@/data/reviews";

export const metadata: Metadata = {
  title: "Contacts",
  description: "Birchbank Golf Course · 5500 Highway 22, Genelle, BC. Office 250-693-2366 · Pro Shop 250-693-2255 · Bistro 250-693-5451.",
  alternates: { canonical: "/contact" },
};

// Verified from https://www.birchbankgolf.com/contacts/
const PEOPLE = [
  {
    name: "Jeff Papilion",
    role: "Director of Golf / Head Professional",
    phones: [{ label: "Office", number: "250-693-2366", tel: "+12506932366" }, { label: "Pro Shop", number: "250-693-2255", tel: "+12506932255" }],
    emails: ["office@birchbankgolf.com", "proshop@birchbankgolf.com"],
  },
  {
    name: "Mike DesMarias",
    role: "Course Superintendent",
    phones: [{ label: "Course", number: "250-693-2263", tel: "+12506932263" }],
    emails: ["course@birchbankgolf.com"],
  },
  {
    name: "Brenda Hyson",
    role: "Accounting",
    phones: [{ label: "Office", number: "250-693-2366", tel: "+12506932366" }],
    emails: ["accounting@birchbankgolf.com"],
  },
  {
    name: "The Bistro",
    role: "Fully licensed, open daily to the public",
    phones: [{ label: "Bistro", number: "250-693-5451", tel: "+12506935451" }],
    emails: ["bistro@birchbankgolf.com"],
  },
];

export default function Contact() {
  return (
    <section className="pt-40 pb-[var(--spacing-section)] container-edge">
      <p className="eyebrow mb-6">Contacts</p>
      <h1 className="display-xl max-w-[18ch] mb-14">
        Call, email, or drop by.
      </h1>

      <div className="grid gap-12 md:grid-cols-12">
        <aside className="md:col-span-5 space-y-8 font-mono text-sm">
          <div>
            <p className="eyebrow mb-2">Street address</p>
            <p>
              5500 Highway 22<br />
              Genelle, BC<br />
              Canada
            </p>
          </div>
          <div>
            <p className="eyebrow mb-2">Mailing address</p>
            <p>
              Birchbank Golf Course<br />
              PO Box 250<br />
              Trail, BC V1R 4L5
            </p>
          </div>
          <div>
            <p className="eyebrow mb-2">Season</p>
            <p>April 1 – October 31</p>
          </div>
          <div>
            <p className="eyebrow mb-2">Pro Shop hours</p>
            <p>9:00 am – 7:00 pm, 7 days a week (in season)</p>
          </div>
          <div>
            <p className="eyebrow mb-2">Bistro hours</p>
            <p>10:00 am – 6:00 pm, 7 days a week</p>
          </div>
        </aside>

        <div className="md:col-span-7">
          <ul className="space-y-8">
            {PEOPLE.map((p) => (
              <li key={p.name} className="border-t border-granite/15 pt-6">
                <p className="font-display text-2xl">{p.name}</p>
                <p className="eyebrow mt-1 mb-4">{p.role}</p>
                <div className="flex flex-wrap gap-x-8 gap-y-2 font-mono text-sm">
                  {p.phones.map((ph) => (
                    <a key={ph.number} href={`tel:${ph.tel}`} className="hover:text-amber">
                      <span className="text-silt">{ph.label}</span>{" "}
                      <span>{ph.number}</span>
                    </a>
                  ))}
                  {p.emails.map((e) => (
                    <a key={e} href={`mailto:${e}`} className="hover:text-amber underline">
                      {e}
                    </a>
                  ))}
                </div>
              </li>
            ))}
          </ul>

          <form className="mt-12 space-y-5" action="/api/contact" method="post">
            <p className="eyebrow">Or send a message</p>
            <input type="text" name="company" aria-hidden="true" tabIndex={-1} className="hidden" autoComplete="off" />
            <div>
              <label htmlFor="name" className="eyebrow block mb-2">Name</label>
              <input id="name" name="name" required className="w-full bg-paper border border-granite/25 px-4 py-3 focus:outline-none focus:border-amber" />
            </div>
            <div>
              <label htmlFor="email" className="eyebrow block mb-2">Email</label>
              <input id="email" name="email" type="email" required className="w-full bg-paper border border-granite/25 px-4 py-3 focus:outline-none focus:border-amber" />
            </div>
            <div>
              <label htmlFor="topic" className="eyebrow block mb-2">Subject</label>
              <select id="topic" name="topic" className="w-full bg-paper border border-granite/25 px-4 py-3 focus:outline-none focus:border-amber">
                <option>Tee time / general</option>
                <option>Membership</option>
                <option>Lessons</option>
                <option>Event booking</option>
                <option>Bistro</option>
                <option>Pro Shop</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="eyebrow block mb-2">Message</label>
              <textarea id="message" name="message" rows={6} required className="w-full bg-paper border border-granite/25 px-4 py-3 focus:outline-none focus:border-amber" />
            </div>
            <button type="submit" className="btn-primary">Send</button>
          </form>
        </div>
      </div>

      {/* Post-round review prompt, review-generation play.
          Asking after the round, from the audience that already reached
          the contact page, is where reviews actually come from. */}
      <div className="mt-20 border-t border-granite/15 pt-10 max-w-3xl">
        <p className="eyebrow mb-3">How was the round?</p>
        <p className="prose-editorial text-granite/85 mb-5">
          A quick note on Tripadvisor or GolfPass helps the next visitor find us,
          and it tells us what to keep doing.
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
  );
}
