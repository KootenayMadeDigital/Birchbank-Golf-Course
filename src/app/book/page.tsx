import type { Metadata } from "next";
import BookButton from "@/components/BookButton";

export const metadata: Metadata = {
  title: "Book a tee time",
  description: "Book directly with Birchbank Golf. Chronogolf-powered. Or call 250-693-2366.",
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  return (
    <section className="pt-40 pb-[var(--spacing-section)] container-edge max-w-3xl">
      <p className="eyebrow mb-6">Book a tee time</p>
      <h1 className="display-xl mb-10 max-w-[16ch]">Choose your time. Play the course.</h1>
      <p className="prose-editorial text-granite/85 mb-10">
        Tee times open 14 days out for members and 7 days out for the public. Use the
        booking window below, or pick up the phone — we always prefer to hear from you.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-16">
        <BookButton label="Open booking" />
        <a href="tel:+12506932366" className="btn-ghost">Call 250-693-2366</a>
      </div>

      {/* Inline booking mount — widget binds here via .chrono-bookingbutton in BookButton.
          The widget opens as an overlay; this anchor is a full-surface alternate. */}
      <div id="chrono-inline" className="min-h-[420px] border border-granite/15 p-8">
        <p className="eyebrow mb-3">Live tee sheet</p>
        <p className="text-silt text-sm">
          The Chronogolf booking overlay will open from the button above. If it doesn't load
          within a few seconds, please call 250-693-2366 — we'll book you directly.
        </p>
      </div>

      <div className="mt-16 grid gap-6 sm:grid-cols-3 text-sm">
        <div>
          <p className="eyebrow mb-2">Booking window</p>
          <p className="text-granite">14 days — members</p>
          <p className="text-silt">7 days — public</p>
        </div>
        <div>
          <p className="eyebrow mb-2">Cancellation</p>
          <p className="text-granite">Free up to 24 hours prior</p>
          <p className="text-silt">No-shows forfeit green fee</p>
        </div>
        <div>
          <p className="eyebrow mb-2">Rain check</p>
          <p className="text-granite">Honored course-wide</p>
          <p className="text-silt">See Pro Shop</p>
        </div>
      </div>
    </section>
  );
}
