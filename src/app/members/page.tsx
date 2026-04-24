import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Members Portal",
  description: "Log in to the Members Portal, enter scores for handicap, and access club documents.",
  alternates: { canonical: "/members" },
};

export default function Members() {
  return (
    <section className="pt-40 pb-[var(--spacing-section)] container-edge max-w-3xl">
      <p className="eyebrow mb-6">Members Portal</p>
      <h1 className="display-xl max-w-[18ch] mb-10">Tools for members.</h1>

      <ul className="space-y-6">
        <li className="border border-granite/15 p-8">
          <p className="font-display text-2xl mb-2">Tee-time booking</p>
          <p className="text-silt text-sm mb-5">
            Advance member booking via Chronogolf.
          </p>
          <a
            href="https://members.chronogolf.com/login"
            target="_blank"
            rel="noopener"
            className="btn-primary"
          >
            Members Portal ↗
          </a>
        </li>

        <li className="border border-granite/15 p-8">
          <p className="font-display text-2xl mb-2">Enter score</p>
          <p className="text-silt text-sm mb-5">
            Post rounds at Golf Canada's Score Centre for handicap tracking.
          </p>
          <a
            href="https://scg.golfcanada.ca"
            target="_blank"
            rel="noopener"
            className="btn-ghost"
          >
            Open SCG ↗
          </a>
        </li>

        <li className="border border-granite/15 p-8">
          <p className="font-display text-2xl mb-2">Retirees Club</p>
          <p className="text-silt text-sm mb-5">
            Schedule, sign-ups, and club contact — open to retired players regardless of
            Birchbank membership.
          </p>
          <Link href="/membership/retirees-club" className="btn-ghost">Visit Retirees Club →</Link>
        </li>

        <li className="border border-granite/15 p-8">
          <p className="font-display text-2xl mb-2">Public documents</p>
          <p className="text-silt text-sm mb-5">
            Retirees, Men's, and Ladies' club schedules are posted in the Public Documents
            section as they become available. For printed copies, contact the Pro Shop.
          </p>
          <a href="tel:+12506932255" className="btn-ghost">Call Pro Shop · 250-693-2255</a>
        </li>
      </ul>
    </section>
  );
}
