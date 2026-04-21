import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Events calendar",
  description: "Club events at Birchbank Golf Course. Retirees, Men's, and Ladies' club schedules are published in the Public Documents section as they become available.",
  alternates: { canonical: "/events" },
};

export default function Events() {
  return (
    <section className="pt-40 pb-[var(--spacing-section)] container-edge">
      <p className="eyebrow mb-6">Events calendar</p>
      <h1 className="display-xl max-w-[20ch] mb-10">
        Club play, tournaments, private events.
      </h1>

      <p className="prose-editorial max-w-2xl text-granite/85 mb-10">
        Schedules for the Retirees, Men's, and Ladies' clubs are published in the{" "}
        <Link href="/public-documents" className="underline hover:text-amber">
          Public Documents
        </Link>{" "}
        section as they become available. For the most current printed copies, contact the
        Pro Shop directly.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <Link href="/events/book" className="block border border-granite/15 p-10 hover:border-amber transition">
          <p className="eyebrow mb-3">Book your event</p>
          <p className="display-sm font-display mb-3">Tournaments, dinners, functions</p>
          <p className="text-silt">
            Small groups to large tournaments — customized dates, times, and formats.
          </p>
        </Link>
        <Link href="/membership/retirees-club" className="block border border-granite/15 p-10 hover:border-amber transition">
          <p className="eyebrow mb-3">Retirees Club</p>
          <p className="display-sm font-display mb-3">Thursday mornings, April – October</p>
          <p className="text-silt">
            Monthly shotgun tournament with brunch and prizes. Open to retired players.
          </p>
        </Link>
      </div>

      <div className="mt-14 flex flex-wrap gap-4 text-sm">
        <a href="tel:+12506932366" className="btn-ghost">Office · 250-693-2366</a>
        <a href="tel:+12506932255" className="btn-ghost">Pro Shop · 250-693-2255</a>
      </div>
    </section>
  );
}
