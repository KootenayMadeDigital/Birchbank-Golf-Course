import type { Metadata } from "next";
import BookButton from "@/components/BookButton";

export const metadata: Metadata = {
  title: "Conditions",
  description: "Course status, frost-delay notices, and rate reminders for Birchbank Golf Course.",
  alternates: { canonical: "/conditions" },
};

export const revalidate = 60;

export default function Conditions() {
  return (
    <section className="pt-40 pb-[var(--spacing-section)] container-edge">
      <p className="eyebrow mb-6">Conditions</p>
      <h1 className="display-xl max-w-[22ch] mb-10">
        The Bistro is open. The course is open.
      </h1>

      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-7 space-y-8">
          <p className="prose-editorial text-granite/85">
            The course is open for the 2026 season. Our average season runs April 1
            through October 31 — 213 days. For live course status, frost-delay notices,
            or same-day tee sheet availability, call the Pro Shop.
          </p>

          <div className="border border-granite/15 p-6 font-mono text-sm">
            <p className="eyebrow mb-3 text-cedar">Today</p>
            <p className="text-granite">
              Course open. Season in progress.<br />
              Pro Shop 9:00 am – 7:00 pm.<br />
              Bistro 12:00 pm – 5:00 pm.
            </p>
            <p className="mt-4 pt-4 border-t border-granite/10 text-xs text-silt not-italic">
              Live conditions feed coming soon. For real-time updates today, call the Pro Shop.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <BookButton />
            <a href="tel:+12506932255" className="btn-ghost">Call Pro Shop · 250-693-2255</a>
          </div>
        </div>

        <aside className="md:col-span-5 border border-granite/15 p-6 font-mono text-sm space-y-5">
          <div>
            <p className="eyebrow mb-2">Season</p>
            <p>April 1 – October 31 · 213 days</p>
          </div>
          <div>
            <p className="eyebrow mb-2">Pro Shop</p>
            <p>9:00 am – 7:00 pm · 7 days</p>
          </div>
          <div>
            <p className="eyebrow mb-2">The Bistro</p>
            <p>12:00 pm – 5:00 pm · 7 days</p>
          </div>
          <div>
            <p className="eyebrow mb-2">Course super</p>
            <p><a href="tel:+12506932263" className="underline hover:text-amber">250-693-2263</a> · Mike DesMarias</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
