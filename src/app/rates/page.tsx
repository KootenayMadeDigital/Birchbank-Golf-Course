import type { Metadata } from "next";
import BookButton from "@/components/BookButton";
import {
  GREEN_FEES,
  PROMOTIONS,
  CART_FEES,
  PUNCH_PASSES,
  RANGE_PASS,
  LOCKERS,
} from "@/data/rates";

export const metadata: Metadata = {
  title: "Rates",
  description: "Green fees, power cart rates, twilight pricing, punch passes, range passes, and the Beat the Heat promotion at Birchbank Golf Course.",
  alternates: { canonical: "/rates" },
};

function RateList({ title, items }: { title: string; items: { label: string; amount: string; note?: string }[] }) {
  return (
    <div>
      <p className="eyebrow mb-4">{title}</p>
      <ul className="border-t border-granite/15">
        {items.map((r) => (
          <li key={r.label} className="flex items-baseline justify-between gap-6 py-4 border-b border-granite/10">
            <span className="font-sans text-base">
              {r.label}
              {r.note && <span className="block text-xs text-silt mt-1">{r.note}</span>}
            </span>
            <span className="font-mono text-sm whitespace-nowrap">{r.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function RatesPage() {
  return (
    <>
      <section className="pt-40 pb-16 container-edge">
        <p className="eyebrow mb-6">Rates</p>
        <h1 className="display-xl mb-10 max-w-[18ch]">
          Green fees &amp; course rates.
        </h1>
        <p className="prose-editorial max-w-2xl text-granite/85">
          All rates in Canadian dollars. Power cart pricing is per rider, tax included.
          Be sure to ask about our weekend, evening, and holiday specials.
        </p>
      </section>

      <section className="pb-[var(--spacing-section)] container-edge grid gap-14 md:grid-cols-2">
        <RateList title="Green fees" items={GREEN_FEES} />
        <RateList title="Power cart" items={CART_FEES} />
        <RateList title="Punch passes" items={PUNCH_PASSES} />
        <RateList title="Range pass (members only)" items={RANGE_PASS} />
        <RateList title="Lockers" items={LOCKERS} />
      </section>

      <section className="py-16 bg-cedar text-paper">
        <div className="container-edge grid gap-8 md:grid-cols-12 items-center">
          <div className="md:col-span-8">
            <p className="eyebrow text-paper/60 mb-3">{PROMOTIONS[0].window}</p>
            <p className="display-md font-display mb-2">{PROMOTIONS[0].name}</p>
            <p className="text-paper/85">
              {PROMOTIONS[0].price} · {PROMOTIONS[0].includes}.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <BookButton label="Book a tee time" />
          </div>
        </div>
      </section>

      <section className="py-[var(--spacing-section)] container-edge">
        <div className="flex flex-wrap gap-4">
          <BookButton />
          <a href="tel:+12506932255" className="btn-ghost">Or call the Pro Shop · 250-693-2255</a>
        </div>
      </section>
    </>
  );
}
