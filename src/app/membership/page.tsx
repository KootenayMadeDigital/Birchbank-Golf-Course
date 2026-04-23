import type { Metadata } from "next";
import Link from "next/link";
import BookButton from "@/components/BookButton";
import { MEMBERSHIP_TIERS, MEMBERSHIP_BENEFITS, EARLY_BIRD_NOTE } from "@/data/rates";

export const metadata: Metadata = {
  title: "Memberships",
  description:
    "Seven Birchbank membership tiers, from $640 Student to $4,050 Family. Full-play, unlimited rounds, advance booking, reciprocal rates at participating clubs. Fall Early Bird pricing through November 5.",
  alternates: { canonical: "/membership" },
};

/**
 * Memberships page rebuilt around three ideas:
 *
 * 1. Organize by WHO it's for, not by tier name.  The source data lists
 *    seven tiers in no particular order; a visitor doesn't know what
 *    'Intermediate' means without reading seven blurbs. We group into
 *    three audience clusters: Starting out (Student, Intermediate),
 *    Single play (New Member, Single Full Play), Two or more (New
 *    Couple, Couple, Family) so a visitor can self-identify in one scan.
 *
 * 2. Show the math.  Single Full Play is $1,969. At the $80 day rate,
 *    that's 24.6 rounds -- roughly two rounds a month across the 213-
 *    day season to break even. Making this explicit turns a price tag
 *    into a purchase decision.
 *
 * 3. Make the benefits concrete.  The five bullets from MEMBERSHIP_
 *    BENEFITS are fine but vague. We expand each with a specific
 *    verifiable fact (members.chronogolf.com URL, Golf Canada handicap
 *    entry, the range pass price, the Retirees Club link).
 *
 * All prices verified from birchbankgolf.com/memberships -- 2025 Fall
 * Early Bird rates were displayed through Nov 5, 2025. Check with the
 * office for current 2026 prices.
 */

const TIER_GROUPS = [
  {
    key: "starting",
    label: "Starting out",
    blurb: "Student and intermediate tiers for people establishing their game on a budget.",
    tiers: ["Student", "Intermediate (19–29)"] as string[],
  },
  {
    key: "single",
    label: "Single play",
    blurb: "Unlimited rounds for one player. The flagship tier and the re-entry option for returning members.",
    tiers: ["New Member — Single Full Play", "Single — Full Play"],
    feature: "Single — Full Play",
  },
  {
    key: "group",
    label: "Two or more",
    blurb: "Couples and families share the course under one membership.",
    tiers: ["New Couple Members — Full Play", "Couple — Full Play", "Family"],
  },
] as const;

// Math — Single Full Play payback at the $80 walk-up rate.
const SINGLE_FULL_PLAY_PRICE = 1969;
const DAY_RATE = 80;
const PAYBACK_ROUNDS = Math.ceil(SINGLE_FULL_PLAY_PRICE / DAY_RATE); // 25

const BENEFIT_DETAILS: Record<string, string> = {
  "Advance tee time booking":
    "Book up to 14 days ahead via members.chronogolf.com — two days more than public booking.",
  "Member-only Pro Shop discounts":
    "Preferred pricing on apparel, balls, and fittings with our CPGA head pro.",
  "Reciprocal rates at participating golf courses":
    "25% off rack at participating Kootenay and BC Interior courses.",
  "Early payment incentives":
    "Fall Early Bird pricing (listed through November 5 each year) discounts all tiers versus spring rates.",
  "Preferred guest green fee rates":
    "Bring a guest at a member rate rather than the walk-up $80.",
};

export default function Membership() {
  const tierByName = new Map(MEMBERSHIP_TIERS.map((t) => [t.name, t]));

  return (
    <>
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-16 bg-paper">
        <div className="container-edge">
          <p className="eyebrow mb-6">Memberships</p>
          <h1
            className="font-display text-granite max-w-[20ch] mb-8"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", lineHeight: "1.02", letterSpacing: "-0.015em" }}
          >
            Unlimited play,<br />seven days a week.
          </h1>
          <p className="prose-editorial text-granite/85 max-w-2xl">
            Every tier below is full-play — no day-of-week restrictions, no blackout dates.
            Seven tiers from Student at $640 to Family at $4,050. Fall Early Bird pricing
            runs through November 5 each year.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="tel:+12506932255" className="btn-primary">Call about joining · 250-693-2255</a>
            <Link href="/contact" className="btn-ghost">Or send a message</Link>
          </div>
        </div>
      </section>

      <div className="container-edge"><div className="rule-hair" /></div>

      {/* Payback math — the Kootenay-honest 'show the numbers' block. */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge grid gap-10 md:grid-cols-12 items-center">
          <div className="md:col-span-7">
            <p className="eyebrow mb-5">The math</p>
            <h2 className="display-lg font-display mb-5">
              Single Full Play pays for itself at round {PAYBACK_ROUNDS}.
            </h2>
            <p className="prose-editorial text-granite/85 max-w-xl">
              At the ${DAY_RATE} day rate, ${SINGLE_FULL_PLAY_PRICE.toLocaleString()} is {PAYBACK_ROUNDS} rounds.
              Across a 213-day season, that's a round every nine days — not hard to hit if you
              play regularly. Rounds {PAYBACK_ROUNDS + 1} through whatever are free.
            </p>
          </div>
          <div className="md:col-span-5">
            <div className="border border-granite/15 p-7 bg-paper">
              <p className="font-mono text-xs text-silt uppercase tracking-widest mb-1">Breakeven</p>
              <p className="font-display text-6xl md:text-7xl text-granite leading-none">{PAYBACK_ROUNDS}</p>
              <p className="text-silt text-sm mt-3">rounds at $80 day rate</p>
              <p className="text-silt text-xs mt-5">
                ${SINGLE_FULL_PLAY_PRICE.toLocaleString()} ÷ ${DAY_RATE} = {(SINGLE_FULL_PLAY_PRICE / DAY_RATE).toFixed(1)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tier groups. Each group is its own section with the tier cards. */}
      {TIER_GROUPS.map((group) => {
        const groupTiers = group.tiers.map((name) => tierByName.get(name)).filter(Boolean);
        return (
          <section key={group.key} className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
            <div className="container-edge">
              <div className="mb-12 max-w-2xl">
                <p className="eyebrow mb-5">{group.label}</p>
                <p className="prose-editorial text-granite/85">{group.blurb}</p>
              </div>

              <ul className="grid md:grid-cols-2 gap-5 md:gap-6">
                {groupTiers.map((tier) => {
                  if (!tier) return null;
                  const isFeature = "feature" in group && group.feature === tier.name;
                  return (
                    <li
                      key={tier.name}
                      className={[
                        "p-7 md:p-8 flex flex-col relative",
                        isFeature
                          ? "border-2 border-amber bg-amber/5"
                          : "border border-granite/15",
                      ].join(" ")}
                    >
                      {isFeature && (
                        <span className="absolute -top-3 left-6 bg-amber text-paper font-mono text-[10px] uppercase tracking-widest px-2 py-0.5">
                          Flagship
                        </span>
                      )}
                      <p className="font-display text-2xl text-granite mb-2">{tier.name}</p>
                      <p className="font-display text-5xl text-granite mb-4">{tier.price}</p>
                      <p className="text-silt text-sm mb-6 flex-1 leading-relaxed">{tier.blurb}</p>
                      <div className="flex flex-wrap gap-3">
                        <a
                          href="tel:+12506932255"
                          className={[
                            "inline-flex items-center px-4 py-2 text-sm font-medium transition-colors rounded-sm min-h-[40px]",
                            isFeature
                              ? "bg-amber text-paper hover:bg-amber-dark"
                              : "bg-cedar text-paper hover:bg-amber",
                          ].join(" ")}
                        >
                          Call to join
                        </a>
                        <Link
                          href="/contact"
                          className="inline-flex items-center px-4 py-2 text-sm font-medium text-granite hover:text-amber border-b border-granite/30 hover:border-amber transition-colors"
                        >
                          Email the office
                        </Link>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        );
      })}

      {/* All memberships include — with expanded detail per benefit */}
      <section className="py-[var(--spacing-section)] bg-cedar text-paper">
        <div className="container-edge">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow text-tamarack mb-5">Every tier includes</p>
            <h2 className="display-lg font-display mb-5">
              Five benefits. All concrete.
            </h2>
            <p className="prose-editorial text-paper/85">
              No vague promises — here's what each benefit actually is.
            </p>
          </div>

          <ul className="grid md:grid-cols-2 gap-6 md:gap-8">
            {MEMBERSHIP_BENEFITS.map((b) => (
              <li key={b} className="border-l-2 border-tamarack pl-5">
                <p className="font-display text-xl text-paper mb-2">{b}</p>
                <p className="text-paper/80 text-sm leading-relaxed">{BENEFIT_DETAILS[b]}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Also worth knowing + Retirees Club link */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="eyebrow mb-5">Also worth knowing</p>
            <ul className="space-y-4 prose-editorial text-granite/85">
              <li>
                Advance tee-time booking via{" "}
                <a href="https://members.chronogolf.com/login" className="underline hover:text-amber">
                  members.chronogolf.com
                </a>
                .
              </li>
              <li>
                Score entry for handicap via{" "}
                <a href="https://scg.golfcanada.ca" className="underline hover:text-amber">
                  scg.golfcanada.ca
                </a>
                .
              </li>
              <li>
                Range pass for members: $255 single / $385 family.
              </li>
              <li>
                Personal cart storage (gas $285 / electric $320) plus trackage fee ($225)
                available on a first-come basis.
              </li>
            </ul>
          </div>
          <div className="md:col-span-6">
            <p className="eyebrow mb-5">Retirees Club</p>
            <p className="prose-editorial text-granite/85 mb-6">
              Retired players — including visitors without a Birchbank membership — are
              welcome at the Retirees Club. Thursday mornings, April through October, with
              a two-hour reserved tee block and a social after.
            </p>
            <Link href="/membership/retirees-club" className="btn-ghost">
              About the Retirees Club →
            </Link>
          </div>
        </div>

        <div className="container-edge mt-14">
          <p className="text-xs text-silt font-mono border-t border-granite/15 pt-6">
            {EARLY_BIRD_NOTE}
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-[var(--spacing-section)] bg-cedar text-paper">
        <div className="container-edge text-center max-w-3xl mx-auto">
          <p className="eyebrow text-paper/60 mb-6">Ready to join</p>
          <h2
            className="font-display mb-8"
            style={{ fontSize: "clamp(2.25rem, 6vw, 4rem)", lineHeight: "1.02", letterSpacing: "-0.02em" }}
          >
            The Pro Shop can sign you up today.
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-5">
            <a href="tel:+12506932255" className="btn-primary bg-tamarack text-granite hover:bg-paper">
              Call 250-693-2255
            </a>
            <Link
              href="/contact"
              className="btn-ghost text-paper border-paper/70 hover:text-tamarack hover:border-tamarack"
            >
              Contact form
            </Link>
            <BookButton label="Play first, join later" />
          </div>
          <p className="mt-10 font-mono text-xs text-paper/60 leading-relaxed">
            Pro Shop 9 am – 7 pm · 7 days · 5500 Highway 22, Genelle BC
          </p>
        </div>
      </section>
    </>
  );
}
