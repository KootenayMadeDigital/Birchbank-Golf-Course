import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Book your event",
  description: "From a round of golf for a small group to a large tournament, book your event at Birchbank Golf Course. Dining and function space in the Bistro.",
  alternates: { canonical: "/events/book" },
};

// All descriptive copy below is quoted or tightly paraphrased from
// https://www.birchbankgolf.com/book-your-event/
export default function BookYourEvent() {
  return (
    <>
      <section className="pt-40 pb-16 container-edge">
        <p className="eyebrow mb-6">Book your event</p>
        <h1 className="display-xl max-w-[22ch] mb-10">
          From small groups to large tournaments.
        </h1>
        <p className="prose-editorial max-w-2xl text-granite/85">
          From a round of golf for a small group to a large tournament, you can book your
          event with the Birchbank Golf Course. We customize dates, times, and formats for
          groups of every size.
        </p>
      </section>

      <section className="pb-[var(--spacing-section)] container-edge grid gap-10 md:grid-cols-2">
        <div className="border border-granite/15 p-10">
          <p className="eyebrow mb-4">Golf events</p>
          <p className="display-sm font-display mb-4">Tournaments &amp; group play</p>
          <p className="text-silt mb-6">
            Customized dates, times, and formats. Call the office or the Pro Shop to
            scope your event.
          </p>
          <div className="space-y-2 font-mono text-sm">
            <p>
              <span className="text-silt">Office</span>{" "}
              <a href="tel:+12506932366" className="hover:text-amber underline">
                250-693-2366
              </a>
            </p>
            <p>
              <span className="text-silt">Pro Shop</span>{" "}
              <a href="tel:+12506932255" className="hover:text-amber underline">
                250-693-2255
              </a>
            </p>
          </div>
        </div>

        <div className="border border-granite/15 p-10">
          <p className="eyebrow mb-4">Dining &amp; social events</p>
          <p className="display-sm font-display mb-4">Bistro for larger groups</p>
          <p className="text-silt mb-6">
            The Bistro dining area can handle larger groups for meals, appetizers, and
            refreshments, as a standalone function or paired with a golf package. The
            large covered patio suits summer gatherings.
          </p>
          <div className="space-y-2 font-mono text-sm">
            <p>
              <span className="text-silt">Bistro</span>{" "}
              <a href="tel:+12506935451" className="hover:text-amber underline">
                250-693-5451
              </a>
            </p>
            <p>
              <a href="mailto:bistro@birchbankgolf.com" className="hover:text-amber underline">
                bistro@birchbankgolf.com
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-cedar text-paper">
        <div className="container-edge grid gap-8 md:grid-cols-12 items-center">
          <div className="md:col-span-8">
            <p className="eyebrow text-paper/60 mb-3">Combine dining with golf</p>
            <p className="display-md font-display">Golf package plus a room for the crew afterward.</p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link href="/contact" className="btn-primary bg-tamarack text-granite hover:bg-paper">Send an inquiry</Link>
          </div>
        </div>
      </section>
    </>
  );
}
