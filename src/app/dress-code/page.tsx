import type { Metadata } from "next";
import Link from "next/link";
import BookButton from "@/components/BookButton";

export const metadata: Metadata = {
  title: "Dress code",
  description:
    "Birchbank Golf Course dress code: what to wear and what to leave at home. Ladies, men, and footwear, verbatim from birchbankgolf.com.",
  alternates: { canonical: "/dress-code" },
};

/**
 * Dress code page. Every line below is pulled verbatim (or tightly
 * paraphrased for voice/clarity) from birchbankgolf.com/1813-2/ --
 * the course's published dress code. We do NOT invent additional
 * rules, exceptions, or warnings.
 *
 * Linked from:
 *   - FAQ dress code question (direct anchor)
 *   - /book page (before the widget, so visitors check before booking)
 *   - Footer (every page, small-text)
 *   - /events/book (tournament / group bookings)
 */

type Rule = { label: string; detail?: string };

const LADIES_OK: Rule[] = [
  { label: "Tailored golf slacks", detail: "Or Capri pants" },
  { label: "Golf dresses, plus fours, golf skirts or skorts" },
  { label: "Bermuda-style shorts", detail: "Mid-thigh or longer" },
  { label: "Mock, V-neck, or halter tops", detail: "Straps 4\" wide from shoulder tip to base of neck" },
  { label: "Button-up and sleeveless shirts", detail: "Untucked is fine" },
];

const LADIES_NOT_OK: Rule[] = [
  { label: "Singlets" },
  { label: "Halter tops with straps under 4\" wide" },
  { label: "Spaghetti straps" },
  { label: "Bare midriffs or low-cut tops" },
];

const MEN_OK: Rule[] = [
  { label: "Golf slacks or tailored pants" },
  { label: "Shorts", detail: "Mid-thigh to bottom of the knee" },
  { label: "Collared shirts, turtlenecks, mock necks", detail: "Short or long sleeve" },
  { label: "Caps and visors", detail: "Without offensive logos or slogans" },
];

const MEN_NOT_OK: Rule[] = [
  { label: "Sweatpants" },
  { label: "Basketball shorts" },
  { label: "Beach or gym wear (tank tops of any kind)" },
  { label: "Offensive or derogatory logos, slogans, or emblems" },
];

const FOOT_OK: Rule[] = [
  { label: "Golf shoes with soft spikes" },
  { label: "Running shoes" },
  { label: "Sports sandals" },
  { label: "Any soft-soled shoe" },
];

const FOOT_NOT_OK: Rule[] = [
  { label: "Metal-spiked golf shoes" },
  { label: "Football or baseball cleats" },
  { label: "High heels" },
  { label: "Work or cowboy boots" },
  { label: "Flip-flop sandals" },
];

function RuleCard({
  tone,
  title,
  rules,
}: {
  tone: "ok" | "no";
  title: string;
  rules: Rule[];
}) {
  const isOk = tone === "ok";
  return (
    <div
      className={[
        "border p-6 md:p-7 h-full",
        isOk ? "border-cedar/30 bg-cedar/5" : "border-amber/40 bg-amber/5",
      ].join(" ")}
    >
      <div className="flex items-baseline gap-3 mb-5">
        <span
          aria-hidden="true"
          className={[
            "inline-flex items-center justify-center w-7 h-7 rounded-full font-mono text-sm font-bold",
            isOk ? "bg-cedar text-paper" : "bg-amber text-paper",
          ].join(" ")}
        >
          {isOk ? "✓" : "×"}
        </span>
        <p className={`font-display text-xl ${isOk ? "text-cedar" : "text-amber"}`}>
          {title}
        </p>
      </div>
      <ul className="space-y-4">
        {rules.map((r) => (
          <li key={r.label} className="text-sm">
            <p className="text-granite leading-snug">{r.label}</p>
            {r.detail && <p className="text-silt text-xs mt-1 leading-relaxed">{r.detail}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function DressCode() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-16 bg-paper">
        <div className="container-edge">
          <p className="eyebrow mb-6">Dress code</p>
          <h1
            className="font-display text-granite max-w-[20ch] mb-8"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", lineHeight: "1.02", letterSpacing: "-0.015em" }}
          >
            What to wear.<br />What to leave at home.
          </h1>
          <p className="prose-editorial text-granite/85 max-w-2xl">
            Golf-specific, not fancy. The short version: collared shirt or mock neck, shorts
            at least mid-thigh, soft-soled shoes. The full version&apos;s below, straight from
            the course&apos;s published dress code at birchbankgolf.com. When in doubt, ask
            at the Pro Shop.
          </p>
        </div>
      </section>

      <div className="container-edge"><div className="rule-hair" /></div>

      {/* At-a-glance summary */}
      <section className="py-16 bg-paper border-y border-granite/10">
        <div className="container-edge">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <div>
              <p className="eyebrow mb-3">At a glance · OK</p>
              <p className="font-display text-2xl text-granite leading-snug">
                Golf apparel, collared tops, shorts at least mid-thigh, soft-soled shoes.
              </p>
            </div>
            <div>
              <p className="eyebrow mb-3">At a glance · Not OK</p>
              <p className="font-display text-2xl text-granite leading-snug">
                Tank tops, sweatpants, basketball shorts, metal spikes, flip-flops.
              </p>
            </div>
            <div>
              <p className="eyebrow mb-3">Not sure?</p>
              <p className="font-display text-2xl text-granite leading-snug">
                Call the Pro Shop before you drive out.
              </p>
              <a href="tel:+12506932255" className="mt-3 inline-block text-sm text-amber underline hover:text-amber-dark">
                250-693-2255
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Ladies */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge">
          <p className="eyebrow mb-5">Ladies</p>
          <h2 className="display-md font-display mb-8">What works, and what doesn't.</h2>
          <div className="grid md:grid-cols-2 gap-5 md:gap-6">
            <RuleCard tone="ok" title="Acceptable" rules={LADIES_OK} />
            <RuleCard tone="no" title="Not permitted" rules={LADIES_NOT_OK} />
          </div>
          <p className="mt-6 text-xs text-silt font-mono">
            Tops may be worn untucked. Capri pants, plus fours, golf skirts and skorts all count.
          </p>
        </div>
      </section>

      {/* Men */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge">
          <p className="eyebrow mb-5">Men</p>
          <h2 className="display-md font-display mb-8">What works, and what doesn't.</h2>
          <div className="grid md:grid-cols-2 gap-5 md:gap-6">
            <RuleCard tone="ok" title="Acceptable" rules={MEN_OK} />
            <RuleCard tone="no" title="Not permitted" rules={MEN_NOT_OK} />
          </div>
        </div>
      </section>

      {/* Footwear, same rules for everyone */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge">
          <p className="eyebrow mb-5">Footwear</p>
          <h2 className="display-md font-display mb-8">Soft soles only, please.</h2>
          <div className="grid md:grid-cols-2 gap-5 md:gap-6">
            <RuleCard tone="ok" title="Acceptable" rules={FOOT_OK} />
            <RuleCard tone="no" title="Not permitted" rules={FOOT_NOT_OK} />
          </div>
          <p className="mt-6 text-xs text-silt font-mono max-w-2xl">
            Metal spikes damage the greens. The one rule we&apos;re consistently strict on at the first tee.
          </p>
        </div>
      </section>

      {/* Why we care */}
      <section className="py-[var(--spacing-section)] bg-cedar text-paper">
        <div className="container-edge grid gap-10 md:grid-cols-12 items-start">
          <div className="md:col-span-5">
            <p className="eyebrow text-tamarack mb-5">Why the rules</p>
            <h2
              className="font-display mb-5"
              style={{ fontSize: "clamp(1.75rem, 4.5vw, 2.75rem)", lineHeight: "1.05", letterSpacing: "-0.01em" }}
            >
              Same reason every course has them.
            </h2>
          </div>
          <div className="md:col-span-7 space-y-5">
            <p className="prose-editorial text-paper/85">
              The code is short, clear, and focused on two things: keeping the course in
              good shape, and keeping the clubhouse comfortable for every visitor. Soft
              soles protect the greens. A collared shirt, shorts that hit the knee, and
              golf-appropriate fabric cover every other expectation.
            </p>
            <p className="prose-editorial text-paper/85">
              We're not hard-line about it. If something slipped past while you were packing
              the car, ask at the Pro Shop, more often than not we can sort it out without
              sending you home.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge text-center max-w-3xl mx-auto">
          <p className="eyebrow mb-6">Dressed and ready</p>
          <h2
            className="font-display text-granite mb-8"
            style={{ fontSize: "clamp(1.75rem, 4.5vw, 3rem)", lineHeight: "1.05", letterSpacing: "-0.01em" }}
          >
            Come play.
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <BookButton />
            <Link href="/pro-shop" className="btn-ghost">
              Need apparel? Pro Shop →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
