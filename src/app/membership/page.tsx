import type { Metadata } from "next";
import Link from "next/link";
import { MEMBERSHIP_TIERS, MEMBERSHIP_BENEFITS, EARLY_BIRD_NOTE } from "@/data/rates";

export const metadata: Metadata = {
  title: "Memberships",
  description: "Full play, couple, family, intermediate, new member, and student memberships at Birchbank Golf Course. All memberships include advance tee time booking and reciprocal rates.",
  alternates: { canonical: "/membership" },
};

export default function Membership() {
  return (
    <>
      <section className="pt-40 pb-16 container-edge">
        <p className="eyebrow mb-6">Memberships</p>
        <h1 className="display-xl max-w-[20ch] mb-10">
          Unlimited play,<br />seven days a week.
        </h1>
        <p className="prose-editorial max-w-2xl text-granite/85">
          Every tier below is a Full Play membership — unlimited access with no
          day-of-week restrictions. Prices shown are as listed on the current
          birchbankgolf.com rate sheet.
        </p>
      </section>

      <section className="pb-[var(--spacing-section)] container-edge">
        <div className="grid gap-4 md:grid-cols-2">
          {MEMBERSHIP_TIERS.map((t) => (
            <div key={t.name} className="border border-granite/15 p-8 flex flex-col">
              <p className="font-display text-2xl mb-2">{t.name}</p>
              <p className="font-mono text-cedar text-xl mb-4">{t.price}</p>
              <p className="text-silt text-sm mb-6 flex-1">{t.blurb}</p>
              <Link href="/contact" className="btn-ghost self-start text-sm">Inquire →</Link>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-12 md:grid-cols-2">
          <div>
            <p className="eyebrow mb-4">All memberships include</p>
            <ul className="space-y-3 prose-editorial text-granite/85 list-disc pl-5">
              {MEMBERSHIP_BENEFITS.map((b) => <li key={b}>{b}</li>)}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-4">Also worth knowing</p>
            <ul className="space-y-3 prose-editorial text-granite/85 list-disc pl-5">
              <li>Member advance tee-time booking via <a href="https://members.chronogolf.com/login" className="underline hover:text-amber">members.chronogolf.com</a>.</li>
              <li>Score entry for handicap via <a href="https://scg.golfcanada.ca" className="underline hover:text-amber">scg.golfcanada.ca</a>.</li>
              <li>Retirees Club programming — see <Link href="/membership/retirees-club" className="underline hover:text-amber">Retirees Club</Link>.</li>
            </ul>
          </div>
        </div>

        <p className="mt-14 text-xs text-silt font-mono border-t border-granite/15 pt-6">
          {EARLY_BIRD_NOTE}
        </p>
      </section>
    </>
  );
}
