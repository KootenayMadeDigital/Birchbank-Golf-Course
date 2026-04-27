import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BookButton from "@/components/BookButton";
import {
  MEMBERSHIP_TIERS,
  MEMBERSHIP_BENEFITS,
  EARLY_BIRD_NOTE,
  GREEN_FEES,
  RANGE_PASS,
  CART_FEES,
  LOCKERS,
} from "@/data/rates";

export const metadata: Metadata = {
  title: "Memberships",
  description:
    "Seven Birchbank membership tiers, from $640 Student to $4,050 Family. Unlimited play across the 213-day Columbia River season, advance booking, member-rate guests, reciprocal access. Fall Early Bird pricing through November 5.",
  alternates: { canonical: "/membership" },
};

/* ────────────────────────────────────────────────────────────────────
   Memberships, the long version.

   Page goal: answer every question someone in the West Kootenays (or
   Spokane, or Calgary) could ask about joining Birchbank, without
   inventing a single detail. Everything price-related pulls from
   src/data/rates.ts, the single source of truth.

   Voice: Kootenay-honest, plain, specific. No "championship," no
   "pristine," no em dashes (commas or periods do the work).

   Sections, in scroll order:
     1.  Hero, the three-line answer to "what is this and is it for me"
     2.  Trust strip (member-owned, since 1962, 213 days, CPGA pro)
     3.  Self-identification grid, three honest questions
     4.  The math at four play frequencies
     5.  Tier groupings (Starting out, Single play, Two or more)
     6.  Benefits, deeply concrete
     7.  A Tuesday in June (day-in-the-life vignette)
     8.  Member culture (Retirees Club + reciprocal program)
     9.  What's NOT included (honest)
    10.  How to join, the actual mechanics
    11.  FAQ, semantic <details>/<summary>
    12.  Final CTA, three paths
    13.  Cross-links

   ────────────────────────────────────────────────────────────────── */

const SINGLE_FULL_PLAY_PRICE = 1969;
const FAMILY_PRICE = 4050;
const SINGLE_NEW_PRICE = 1525;
const INTERMEDIATE_PRICE = 1175;
const STUDENT_PRICE = 640;
const DAY_RATE = 80;
const SEASON_DAYS = 213;

// Per-round economics at multiple play frequencies. Each row is the
// cost-per-round of a Single Full Play membership at that play volume,
// versus paying the $80 day rate every time. We round to the nearest
// dollar, no false precision.
const FREQUENCY_ROWS = [
  { rounds: 10, paid: 800,   cost: 197, walkup: 800 },   // light
  { rounds: 25, paid: 2000,  cost: 79,  walkup: 2000 },  // breakeven
  { rounds: 50, paid: 4000,  cost: 39,  walkup: 4000 },  // weekly-ish
  { rounds: 75, paid: 6000,  cost: 26,  walkup: 6000 },  // every-three-days
];

// Self-identification grid. Three honest filters that route a visitor
// to the right tier without making them read seven blurbs.
const SELF_ID = [
  {
    eyebrow: "If you're 18 or under and still in school",
    headline: "Student, $640.",
    body: "Unlimited rounds, all season. The way most Kootenay golfers found the game.",
    target: "#starting",
  },
  {
    eyebrow: "If you're 19 to 29",
    headline: "Intermediate, $1,175.",
    body: "Same unlimited play as Single Full Play, at the rate that protects the next decade of your golf.",
    target: "#starting",
  },
  {
    eyebrow: "If you're a single player who plays 25+ rounds a year",
    headline: "Single Full Play, $1,969.",
    body: "The flagship tier. Pays for itself at round 25, free golf after that.",
    target: "#single",
  },
  {
    eyebrow: "If two of you share a household",
    headline: "Couple, $3,590.",
    body: "Two memberships under one roof, both unlimited, same season.",
    target: "#group",
  },
  {
    eyebrow: "If the kids still live with you",
    headline: "Family, $4,050.",
    body: "Two adults plus dependents under 19. The whole household, every day, all season.",
    target: "#group",
  },
  {
    eyebrow: "If you've been away from the club for two years or more",
    headline: "New Member rates.",
    body: "Reduced re-entry pricing for Single ($1,525) and Couple ($2,780). The course wants you back.",
    target: "#single",
  },
];

const TIER_GROUPS = [
  {
    key: "starting",
    label: "Starting out",
    eyebrow: "Under 30, or under 19",
    blurb:
      "Three tiers built to keep the next generation on the course. Same unlimited play, lower rate, no day-of-week restrictions.",
    tiers: ["Student", "Intermediate (19–29)"] as string[],
  },
  {
    key: "single",
    label: "Single play",
    eyebrow: "One player, all season",
    blurb:
      "Unlimited rounds for one person, seven days a week, April through October. The flagship tier and the re-entry option for returning members.",
    tiers: ["New Member · Single Full Play", "Single · Full Play"],
    feature: "Single · Full Play",
  },
  {
    key: "group",
    label: "Two or more",
    eyebrow: "Couples and families",
    blurb:
      "Share a single membership across the household. Both adults play unlimited; the Family tier adds dependents under 19.",
    tiers: ["New Couple Members · Full Play", "Couple · Full Play", "Family"],
    feature: "Family",
  },
] as const;

// Concrete details per benefit. Replace the official Membership benefits
// list verbatim with verifiable specifics where we have them; everything
// else points at the office.
const BENEFIT_DETAILS: Record<
  string,
  { headline: string; body: string }
> = {
  "Advance tee time booking": {
    headline: "Book ahead, before the public sheet opens.",
    body:
      "Members reserve through members.chronogolf.com on the advance window the Pro Shop sets each season. Public booking opens later. In peak July and August, that gap is what gets you the 8:08 you wanted.",
  },
  "Member-only Pro Shop discounts": {
    headline: "Preferred pricing on apparel, balls, and fittings.",
    body:
      "Member discount is applied at the counter on regular-priced apparel, balls, and accessories. Custom fittings and special orders with Jeff Papilion (CPGA) at the member rate.",
  },
  "Reciprocal rates at participating golf courses": {
    headline: "25% off rack at participating Kootenay clubs.",
    body:
      "Show your Birchbank card at participating courses for 25% off their day rate. The list rotates by season. Call the Pro Shop before you drive to confirm a partner is honoring the agreement that month.",
  },
  "Early payment incentives": {
    headline: "Fall Early Bird, locked in until November 5.",
    body:
      "Pay before the deadline each fall and the listed Early Bird price is yours for the following season. Spring rates are higher. The savings on a Single Full Play covers a Beat the Heat round.",
  },
  "Preferred guest green fee rates": {
    headline: "Bring a guest at the member rate, not $80 walk-up.",
    body:
      "When your brother visits from Calgary or your son flies in from Vancouver, they pay the guest rate the Pro Shop publishes that season, not the day-rate posted on the board.",
  },
};

const FAQ = [
  {
    q: "Do I need a handicap to join?",
    a: "No. Membership is open to anyone who wants to play. If you'd like to start posting scores, members enter rounds for handicap at scg.golfcanada.ca; the Pro Shop will help you get set up.",
  },
  {
    q: "What does 'Family' actually include?",
    a: "Two adults in the same household plus dependents under 19. If your situation is different (adult children at home, blended family, dependents over 19 in school), call the office; the Pro Shop sets the line case-by-case.",
  },
  {
    q: "Are there blackout dates or weekday-only restrictions?",
    a: "No. Every tier on this page is full play, seven days a week. No blackouts, no weekend surcharge, no time-of-day restrictions. The Retirees Club holds a Thursday-morning tee block, all other days are open access.",
  },
  {
    q: "Can I freeze my membership for medical reasons?",
    a: "We don't publish a formal medical-freeze policy. Call the office at 250-693-2366, the Pro Shop handles individual situations directly and has been known to be reasonable.",
  },
  {
    q: "Are payment plans available?",
    a: "Call the office at 250-693-2366 to ask. We do not publish a standard installment plan; arrangements are made between you and the Pro Shop, paid in full before the season starts.",
  },
  {
    q: "Can I prorate a membership if I join mid-season?",
    a: "Mid-season pricing is set by the Pro Shop based on how much of the 213-day season is left when you join. Call 250-693-2366, they'll quote you on the spot.",
  },
  {
    q: "Is there a refund or cancellation policy?",
    a: "Memberships are not refundable as a default. If a serious situation comes up after you've paid, talk to the office. They've been around since 1962; they understand life happens.",
  },
  {
    q: "Does membership include cart fees?",
    a: "No. Cart fees are separate. Power cart is $24 per rider for 18 holes (tax included). If you cart often, the seasonal lease at $635 for one seat or personal cart storage may be worth a look. See the Rates page for the full breakdown.",
  },
  {
    q: "Does membership include the driving range?",
    a: "Range access is a separate member-only purchase: $255 single or $385 family. It's a one-time seasonal pass, not pay-per-bucket. Single-day range use is included with lessons.",
  },
  {
    q: "Can I bring a guest?",
    a: "Yes. Members get a preferred guest rate (set each season, lower than the $80 walk-up) for any guest you sign in at the Pro Shop. There is no published cap on guest rounds; use it generously, that's how new members find us.",
  },
  {
    q: "How do member tournaments work?",
    a: "Member tournaments and league play are organized through the Pro Shop and the member committees (Men's, Ladies', Retirees). Some events have a separate entry fee for prizes and food. The schedule is posted at the start of each season.",
  },
  {
    q: "Can I join from out of province (Alberta, Washington, anywhere)?",
    a: "Yes. We have non-resident members who fly or drive in for stretches of the season. Same tiers, same rates, no residency requirement. If you're coming from Spokane (3 hours) or Calgary (7 hours), the Pro Shop can help plan your run.",
  },
];

export default function Membership() {
  const tierByName = new Map(MEMBERSHIP_TIERS.map((t) => [t.name, t]));
  const dayRateLabel = GREEN_FEES.find((g) => g.label.includes("18 Holes"))?.amount ?? `$${DAY_RATE}`;
  const rangeSingle = RANGE_PASS.find((r) => r.label.includes("Single"))?.amount ?? "$255";
  const rangeFamily = RANGE_PASS.find((r) => r.label.includes("Family"))?.amount ?? "$385";
  const cart18 = CART_FEES.find((c) => c.label.includes("18 holes"))?.amount ?? "$24";
  const cartLease = CART_FEES.find((c) => c.label.includes("Seasonal"))?.amount ?? "$635";
  const lockerMen = LOCKERS.find((l) => l.label.includes("Men"))?.amount ?? "$53";

  return (
    <>
      {/* ════════════════════════════════════════════════════════════
          1. HERO
          The three-line answer: what it is, who it's for, what it costs.
          ════════════════════════════════════════════════════════════ */}
      <section className="pt-32 md:pt-40 pb-16 bg-paper">
        <div className="container-edge grid gap-12 md:gap-16 md:grid-cols-12 items-end">
          <div className="md:col-span-8">
            <p className="eyebrow mb-6">Memberships · 2026</p>
            <h1
              className="font-display text-granite mb-8"
              style={{
                fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
                lineHeight: "1.0",
                letterSpacing: "-0.018em",
              }}
            >
              Two hundred and thirteen days
              <br />
              on the Columbia.
              <br />
              Yours, if you want them.
            </h1>
            <p className="prose-editorial text-granite/85 max-w-2xl">
              Seven tiers, all unlimited play, no day-of-week restrictions. From a
              Student card at <span className="tabular-nums">${STUDENT_PRICE}</span> to
              a Family membership at <span className="tabular-nums">${FAMILY_PRICE.toLocaleString()}</span>.
              Member-owned, semi-private, public-access, the same routing Roy Stone
              walked in 1962. Fall Early Bird pricing locks the season in until
              November 5.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a href="tel:+12506932255" className="btn-primary">
                Call about joining · 250-693-2255
              </a>
              <a href="#tiers" className="btn-ghost">
                See the seven tiers
              </a>
            </div>
            <p className="mt-6 font-mono text-xs text-silt uppercase tracking-widest">
              Pro Shop · 8 AM to dusk · 7 days · April 1 to October 31
            </p>
          </div>

          <aside className="md:col-span-4 md:pl-6">
            <div className="border-l-2 border-tamarack pl-5 space-y-5">
              <div>
                <p className="eyebrow mb-1">Flagship tier</p>
                <p className="font-display text-2xl text-granite leading-snug">Single Full Play</p>
                <p className="font-display text-5xl text-granite tabular-nums leading-none mt-2">
                  ${SINGLE_FULL_PLAY_PRICE.toLocaleString()}
                </p>
                <p className="text-silt text-sm mt-3 leading-relaxed">
                  Pays for itself at round 25 of the season. Free golf after that.
                </p>
              </div>
              <div className="rule-hair" />
              <p className="font-mono text-xs text-silt leading-relaxed">
                The math: ${SINGLE_FULL_PLAY_PRICE.toLocaleString()} ÷ {dayRateLabel} ={" "}
                <span className="tabular-nums">{(SINGLE_FULL_PLAY_PRICE / DAY_RATE).toFixed(1)}</span>{" "}
                rounds. One round every nine days for the season.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          2. TRUST STRIP
          Member-owned since 2004, original 1962 routing, CPGA head pro,
          213-day season. Authority bar; no logos, no stars, no fluff.
          ════════════════════════════════════════════════════════════ */}
      <section className="border-y border-granite/10 bg-paper">
        <div className="container-edge py-10">
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-y-7 gap-x-6">
            <li>
              <p className="font-mono text-[10px] text-tamarack uppercase tracking-widest mb-2">Since</p>
              <p className="font-display text-2xl text-granite tabular-nums">1962</p>
              <p className="text-silt text-xs mt-1 leading-snug">Roy Stone routed the original nine</p>
            </li>
            <li>
              <p className="font-mono text-[10px] text-tamarack uppercase tracking-widest mb-2">Owned by</p>
              <p className="font-display text-2xl text-granite">Members</p>
              <p className="text-silt text-xs mt-1 leading-snug">Community-restored 2018</p>
            </li>
            <li>
              <p className="font-mono text-[10px] text-tamarack uppercase tracking-widest mb-2">Season</p>
              <p className="font-display text-2xl text-granite tabular-nums">{SEASON_DAYS} days</p>
              <p className="text-silt text-xs mt-1 leading-snug">April 1 through October 31</p>
            </li>
            <li>
              <p className="font-mono text-[10px] text-tamarack uppercase tracking-widest mb-2">Head Pro</p>
              <p className="font-display text-2xl text-granite">Jeff Papilion</p>
              <p className="text-silt text-xs mt-1 leading-snug">CPGA, Director of Golf</p>
            </li>
          </ul>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          3. SELF-IDENTIFICATION GRID
          Six honest one-line filters that route a visitor to the right
          tier in 15 seconds. The hardest part of comparing seven tiers
          is knowing which one is yours; we do that work for you.
          ════════════════════════════════════════════════════════════ */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow text-cedar mb-5">Which tier is yours</p>
            <h2 className="display-lg font-display mb-5">
              Six honest questions.
              <br />
              Pick the one that's you.
            </h2>
            <p className="prose-editorial text-granite/85">
              Reading seven tier blurbs is a chore. Here's the same information
              sorted by who you are. If two answers fit, the lower-priced one
              usually wins; the Pro Shop will tell you on the call.
            </p>
          </div>

          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {SELF_ID.map((s) => (
              <li
                key={s.headline}
                className="border border-granite/15 bg-paper p-7 flex flex-col hover:border-amber/60 transition-colors"
              >
                <p className="eyebrow mb-4 normal-case tracking-normal text-silt text-[13px] leading-snug">
                  {s.eyebrow}
                </p>
                <p className="font-display text-2xl text-granite leading-snug mb-3">
                  {s.headline}
                </p>
                <p className="text-granite/75 text-sm leading-relaxed flex-1">{s.body}</p>
                <a
                  href={s.target}
                  className="mt-5 font-mono text-[11px] uppercase tracking-widest text-cedar hover:text-amber"
                >
                  See this tier →
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          4. THE MATH AT FOUR FREQUENCIES
          Anchor with the highest-value number, then walk down. Members
          who play 25 rounds break even; 50 rounds is $39 a round; 75 is
          $26. The walk-up day rate ($80) is the comparison.
          ════════════════════════════════════════════════════════════ */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow text-cedar mb-3">The math, four ways</p>
            <h2 className="display-lg font-display mb-5">
              ${SINGLE_FULL_PLAY_PRICE.toLocaleString()} divided by your year.
            </h2>
            <p className="prose-editorial text-granite/85">
              A Single Full Play membership is fixed at ${SINGLE_FULL_PLAY_PRICE.toLocaleString()}.
              What changes is how many rounds you play. Below: cost-per-round at four
              honest play frequencies, against the {dayRateLabel} walk-up rate. Round 25
              is breakeven. Everything after that is a course you've already paid for.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-t border-granite/15">
              <thead>
                <tr className="text-left">
                  <th className="font-mono text-[11px] uppercase tracking-widest text-silt py-4 pr-4">
                    Rounds in a season
                  </th>
                  <th className="font-mono text-[11px] uppercase tracking-widest text-silt py-4 pr-4">
                    Membership ÷ rounds
                  </th>
                  <th className="font-mono text-[11px] uppercase tracking-widest text-silt py-4 pr-4">
                    Walk-up at {dayRateLabel}
                  </th>
                  <th className="font-mono text-[11px] uppercase tracking-widest text-silt py-4">
                    What you save
                  </th>
                </tr>
              </thead>
              <tbody>
                {FREQUENCY_ROWS.map((r) => {
                  const isBreakeven = r.rounds === 25;
                  const savings = r.walkup - SINGLE_FULL_PLAY_PRICE;
                  return (
                    <tr
                      key={r.rounds}
                      className={[
                        "border-b border-granite/10",
                        isBreakeven ? "bg-amber/5" : "",
                      ].join(" ")}
                    >
                      <td className="py-5 pr-4 font-display text-2xl text-granite tabular-nums">
                        {r.rounds}
                        {isBreakeven && (
                          <span className="ml-3 font-mono text-[10px] uppercase tracking-widest text-amber">
                            Breakeven
                          </span>
                        )}
                      </td>
                      <td className="py-5 pr-4 text-granite tabular-nums">
                        ${r.cost} per round
                      </td>
                      <td className="py-5 pr-4 text-silt tabular-nums">
                        ${r.walkup.toLocaleString()}
                      </td>
                      <td className="py-5 text-granite tabular-nums">
                        {savings <= 0 ? (
                          <span className="text-silt">
                            Walk-up cheaper by ${Math.abs(savings).toLocaleString()}
                          </span>
                        ) : (
                          <>${savings.toLocaleString()} versus walk-up</>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <p className="mt-7 max-w-3xl text-granite/75 text-sm leading-relaxed">
            For a Family membership at ${FAMILY_PRICE.toLocaleString()}: at 100 combined household
            rounds across the season, that's ${Math.round(FAMILY_PRICE / 100)} per round.
            Two adults playing weekly, plus a kid in summer, gets you there easily.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          5. TIER GROUPINGS
          Three sections, each with its own anchor (#starting, #single,
          #group) so the self-id grid above can deep-link cleanly.
          ════════════════════════════════════════════════════════════ */}
      <div id="tiers" className="container-edge">
        <div className="rule-hair" />
      </div>

      {TIER_GROUPS.map((group) => {
        const groupTiers = group.tiers
          .map((name) => tierByName.get(name))
          .filter(Boolean);
        return (
          <section
            id={group.key}
            key={group.key}
            className="py-[var(--spacing-section)] bg-paper border-t border-granite/10 scroll-mt-24"
          >
            <div className="container-edge">
              <div className="mb-12 max-w-2xl">
                <p className="eyebrow text-cedar mb-5">{group.eyebrow}</p>
                <h2 className="display-md font-display mb-5">{group.label}</h2>
                <p className="prose-editorial text-granite/85">{group.blurb}</p>
              </div>

              <ul className="grid md:grid-cols-2 gap-5 md:gap-6">
                {groupTiers.map((tier) => {
                  if (!tier) return null;
                  const isFeature =
                    "feature" in group && group.feature === tier.name;
                  return (
                    <li
                      key={tier.name}
                      className={[
                        "p-7 md:p-8 flex flex-col relative transition-colors",
                        isFeature
                          ? "border-2 border-amber bg-amber/5"
                          : "border border-granite/15 hover:border-amber/50",
                      ].join(" ")}
                    >
                      {isFeature && (
                        <span className="absolute -top-3 left-6 bg-amber text-paper font-mono text-[10px] uppercase tracking-widest px-2 py-0.5">
                          Flagship
                        </span>
                      )}
                      <p className="font-display text-2xl text-granite mb-2">
                        {tier.name}
                      </p>
                      <p className="font-display text-5xl text-granite tabular-nums mb-4">
                        {tier.price}
                      </p>
                      <p className="text-silt text-sm mb-6 flex-1 leading-relaxed">
                        {tier.blurb}
                      </p>

                      {/* Per-round economics, only where math is honest. */}
                      {tier.name === "Single · Full Play" && (
                        <p className="font-mono text-[11px] uppercase tracking-widest text-tamarack mb-5">
                          50 rounds · $39 each · 75 rounds · $26 each
                        </p>
                      )}
                      {tier.name === "Family" && (
                        <p className="font-mono text-[11px] uppercase tracking-widest text-tamarack mb-5">
                          100 household rounds · $41 each
                        </p>
                      )}
                      {tier.name === "Intermediate (19–29)" && (
                        <p className="font-mono text-[11px] uppercase tracking-widest text-tamarack mb-5">
                          25 rounds · $47 each · half the day rate
                        </p>
                      )}
                      {tier.name === "Student" && (
                        <p className="font-mono text-[11px] uppercase tracking-widest text-tamarack mb-5">
                          15 rounds · $43 each · the rest is free
                        </p>
                      )}

                      <div className="flex flex-wrap gap-3 mt-auto">
                        <a
                          href="tel:+12506932255"
                          className={[
                            "inline-flex items-center px-4 py-2 text-sm font-medium transition-colors rounded-sm min-h-[44px]",
                            isFeature
                              ? "bg-amber text-paper hover:bg-amber-dark"
                              : "bg-cedar text-paper hover:bg-amber",
                          ].join(" ")}
                        >
                          Call to join
                        </a>
                        <Link
                          href="/contact"
                          className="inline-flex items-center px-4 py-2 text-sm font-medium text-granite hover:text-amber border-b border-granite/30 hover:border-amber transition-colors min-h-[44px]"
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

      {/* ════════════════════════════════════════════════════════════
          6. BENEFITS, DEEPLY CONCRETE
          The five MEMBERSHIP_BENEFITS strings, expanded with verifiable
          specifics. Cedar block, paper text. The serif headlines do the
          weight, body copy carries the spec.
          ════════════════════════════════════════════════════════════ */}
      <section className="py-[var(--spacing-section)] bg-cedar text-paper">
        <div className="container-edge">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow text-tamarack mb-5">Every tier includes</p>
            <h2 className="display-lg font-display mb-5">
              Five benefits.
              <br />
              All concrete.
            </h2>
            <p className="prose-editorial text-paper/85">
              No vague promises. Here's what each one is, in numbers.
            </p>
          </div>

          <ul className="grid md:grid-cols-2 gap-y-12 gap-x-12">
            {MEMBERSHIP_BENEFITS.map((b) => {
              const detail = BENEFIT_DETAILS[b];
              return (
                <li key={b} className="border-l-2 border-tamarack pl-6">
                  <p className="eyebrow text-tamarack/80 mb-3">{b}</p>
                  <p className="font-display text-2xl text-paper mb-3 leading-snug">
                    {detail.headline}
                  </p>
                  <p className="text-paper/80 text-sm leading-relaxed">
                    {detail.body}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          7. A TUESDAY IN JUNE
          Day-in-the-life vignette. Specific over vague: park at 7:50,
          first off at 8:08, breakfast sandwich between nines. This IS
          the persuasion; the spec sheet is the proof.
          ════════════════════════════════════════════════════════════ */}
      <section className="py-[var(--spacing-section)] bg-paper">
        {/* Editorial photo above the section: morning mist + sun rays
            through the trees. Source is now 16:9 (1280x720), rendered
            at native aspect, capped at max-w-4xl, centered. */}
        <div className="container-edge mb-12 md:mb-16">
          <figure className="max-w-4xl mx-auto">
            <div className="relative w-full aspect-[16/9] overflow-hidden bg-granite/5 border border-granite/10 rounded-sm">
              <Image
                src="/membership/morning-tuesday.webp"
                alt="Sun rays through the trees on an early-summer morning at Birchbank, light catching the dew"
                fill
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-cover"
                loading="lazy"
                unoptimized
              />
            </div>
            <figcaption className="mt-3 font-mono text-xs text-silt text-center">
              First tee, 7:50 a.m.
            </figcaption>
          </figure>
        </div>
        <div className="container-edge grid gap-12 md:gap-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow text-cedar mb-5">A day with the card</p>
            <h2 className="display-md font-display mb-6">
              A Tuesday in June.
            </h2>
            <p className="prose-editorial text-granite/85">
              Not a marketing promise. The actual rhythm a Birchbank member falls
              into by mid-season, written from the inside.
            </p>
          </div>

          <div className="md:col-span-8">
            <ol className="space-y-8 border-l border-granite/15 pl-7">
              <li>
                <p className="font-mono text-[11px] uppercase tracking-widest text-tamarack mb-2">
                  7:50 AM
                </p>
                <p className="prose-editorial text-granite/90">
                  Park at the Pro Shop. Grab a small bucket on the range pass you
                  bought in April. Twenty balls is enough; the seven-iron is the
                  one you're warming up.
                </p>
              </li>
              <li>
                <p className="font-mono text-[11px] uppercase tracking-widest text-tamarack mb-2">
                  8:08 AM
                </p>
                <p className="prose-editorial text-granite/90">
                  First off the first tee, the time you booked nine days ago when
                  the member sheet opened. The sun is just clearing the Selkirks
                  to the east. Dew on the fairway. Walking.
                </p>
              </li>
              <li>
                <p className="font-mono text-[11px] uppercase tracking-widest text-tamarack mb-2">
                  10:14 AM
                </p>
                <p className="prose-editorial text-granite/90">
                  Through nine. Stop at the Bistro for a breakfast sandwich and a
                  coffee. The covered patio looks down the eighteenth toward the
                  river. You don't need to rush; you've got a tee time, not a
                  reservation.
                </p>
              </li>
              <li>
                <p className="font-mono text-[11px] uppercase tracking-widest text-tamarack mb-2">
                  12:30 PM
                </p>
                <p className="prose-editorial text-granite/90">
                  Walk off the eighteenth four hours and twenty minutes after you
                  arrived. Total spend today: zero, the round is on the card. The
                  range balls were on the season pass. The coffee was nine
                  dollars.
                </p>
              </li>
              <li>
                <p className="font-mono text-[11px] uppercase tracking-widest text-tamarack mb-2">
                  Thursday, same week
                </p>
                <p className="prose-editorial text-granite/90">
                  You do it again. That's the membership. Not the discount, the
                  rhythm.
                </p>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          8. MEMBER CULTURE
          Retirees Club + reciprocal program. Two cards on a paper
          background; both link out to verifiable specifics.
          ════════════════════════════════════════════════════════════ */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow text-cedar mb-3">Member culture</p>
            <h2 className="display-md font-display mb-5">
              The course is the venue.
              <br />
              The members are the club.
            </h2>
            <p className="prose-editorial text-granite/85">
              Two pieces of the membership that don't show up on the price card.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <article className="border border-granite/15 bg-paper p-8 flex flex-col">
              <p className="eyebrow mb-4">Thursday mornings</p>
              <h3 className="font-display text-3xl text-granite mb-4 leading-snug">
                Retirees Club
              </h3>
              <p className="text-granite/85 leading-relaxed mb-6 flex-1">
                A two-hour reserved tee block every Thursday morning, April through
                October. Monthly shotgun tournaments, brunch, prize ceremonies. Open
                to retired players, a Birchbank membership is not required to join
                the Retirees Club. It's the closest thing the course has to a
                Tuesday-night-bowling-league culture.
              </p>
              <Link href="/membership/retirees-club" className="btn-ghost mt-auto">
                About the Retirees Club
              </Link>
            </article>

            <article className="border border-granite/15 bg-paper p-8 flex flex-col">
              <p className="eyebrow mb-4">Reciprocal program</p>
              <h3 className="font-display text-3xl text-granite mb-4 leading-snug">
                25% off rack at participating clubs.
              </h3>
              <p className="text-granite/85 leading-relaxed mb-6 flex-1">
                Show your Birchbank card at participating Kootenay and BC Interior
                courses for 25% off their day rate. The list of partners shifts by
                season as agreements renew. Before you drive an hour, call the Pro
                Shop and ask which courses are honoring the program this month.
              </p>
              <a
                href="tel:+12506932255"
                className="btn-ghost mt-auto"
              >
                Ask the Pro Shop · 250-693-2255
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          9. WHAT'S NOT INCLUDED
          The honesty section. Cart fees, range pass, tournament entries,
          guest fees. Listed up front so no one finds out at the counter.
          ════════════════════════════════════════════════════════════ */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow text-cedar mb-3">In the spirit of plain talk</p>
            <h2 className="display-md font-display mb-5">
              What the card doesn't cover.
            </h2>
            <p className="prose-editorial text-granite/85">
              Memberships are full play. They are not full everything. Here's what
              still costs money, listed before you sign up.
            </p>
          </div>

          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
            <li>
              <p className="font-display text-xl text-granite mb-2">Cart fees</p>
              <p className="text-granite/80 text-sm leading-relaxed">
                Power cart {cart18} per rider for 18 holes, tax included. Seasonal
                cart lease {cartLease} for one seat. Walking is the default and the
                course rewards it.
              </p>
            </li>
            <li>
              <p className="font-display text-xl text-granite mb-2">Range pass</p>
              <p className="text-granite/80 text-sm leading-relaxed">
                Member range pass is {rangeSingle} single or {rangeFamily} family,
                purchased separately. It's a one-time seasonal fee, not pay-per-bucket.
              </p>
            </li>
            <li>
              <p className="font-display text-xl text-granite mb-2">Tournament entries</p>
              <p className="text-granite/80 text-sm leading-relaxed">
                Member tournaments and shotgun events typically have a separate entry
                fee that covers prizes, food, and contests. Check the season schedule
                at the Pro Shop.
              </p>
            </li>
            <li>
              <p className="font-display text-xl text-granite mb-2">Guest fees</p>
              <p className="text-granite/80 text-sm leading-relaxed">
                Guests pay the member-guest rate the Pro Shop sets each season. Lower
                than the {dayRateLabel} walk-up, not zero.
              </p>
            </li>
            <li>
              <p className="font-display text-xl text-granite mb-2">Lockers and storage</p>
              <p className="text-granite/80 text-sm leading-relaxed">
                Men's locker {lockerMen} per season. Personal cart storage and
                trackage are quoted on the Rates page.
              </p>
            </li>
            <li>
              <p className="font-display text-xl text-granite mb-2">Bistro and Pro Shop</p>
              <p className="text-granite/80 text-sm leading-relaxed">
                Food, drinks, balls, gloves, equipment. Members get the Pro Shop
                discount on apparel and accessories; the burger is still six bucks
                either way.
              </p>
            </li>
          </ul>

          <div className="mt-12 pt-7 border-t border-granite/15">
            <p className="text-silt text-sm max-w-3xl leading-relaxed">
              Every dollar above is on the{" "}
              <Link href="/rates" className="link-editorial text-cedar">
                Rates page
              </Link>
              , verified. The membership pays for the golf. The extras are
              optional and clearly priced.
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          10. HOW TO JOIN
          The mechanics. Three numbered steps. Phone first. Walk-in works.
          Office hours stated. What to bring.
          ════════════════════════════════════════════════════════════ */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow text-cedar mb-3">How it actually works</p>
            <h2 className="display-md font-display mb-5">
              Three steps. None of them online.
            </h2>
            <p className="prose-editorial text-granite/85">
              Memberships go through the Pro Shop. There is no web checkout, on
              purpose. The first conversation usually takes ten minutes and sets
              you up for the season.
            </p>
          </div>

          <ol className="grid md:grid-cols-3 gap-6 md:gap-8">
            <li className="border-t-2 border-cedar pt-7">
              <p className="font-mono text-[11px] uppercase tracking-widest text-tamarack mb-3">
                Step 1
              </p>
              <p className="font-display text-2xl text-granite mb-3 leading-snug">
                Call the Pro Shop.
              </p>
              <p className="text-granite/80 text-sm leading-relaxed">
                <a
                  href="tel:+12506932255"
                  className="text-granite underline hover:text-amber"
                >
                  250-693-2255
                </a>
                , 8 AM to dusk, seven days a week during the season. Off-season,
                the office line is{" "}
                <a
                  href="tel:+12506932366"
                  className="text-granite underline hover:text-amber"
                >
                  250-693-2366
                </a>
                . Tell them which tier you're looking at; they'll quote the
                current rate and walk through the rest.
              </p>
            </li>
            <li className="border-t-2 border-cedar pt-7">
              <p className="font-mono text-[11px] uppercase tracking-widest text-tamarack mb-3">
                Step 2
              </p>
              <p className="font-display text-2xl text-granite mb-3 leading-snug">
                Stop in, pay, sign.
              </p>
              <p className="text-granite/80 text-sm leading-relaxed">
                Walk into the Pro Shop at 5500 Highway 22, Genelle. Bring photo ID
                and a credit card. The Family tier needs one parent's ID; Student
                and Intermediate need proof of age. Paperwork takes maybe fifteen
                minutes.
              </p>
            </li>
            <li className="border-t-2 border-cedar pt-7">
              <p className="font-mono text-[11px] uppercase tracking-widest text-tamarack mb-3">
                Step 3
              </p>
              <p className="font-display text-2xl text-granite mb-3 leading-snug">
                Set up the booking account.
              </p>
              <p className="text-granite/80 text-sm leading-relaxed">
                The Pro Shop will get you onto{" "}
                <a
                  href="https://members.chronogolf.com/login"
                  className="text-granite underline hover:text-amber"
                  target="_blank"
                  rel="noopener"
                >
                  members.chronogolf.com
                </a>{" "}
                for tee time booking, and (if you want a handicap){" "}
                <a
                  href="https://scg.golfcanada.ca"
                  className="text-granite underline hover:text-amber"
                  target="_blank"
                  rel="noopener"
                >
                  scg.golfcanada.ca
                </a>{" "}
                for score posting. You're playing the next morning.
              </p>
            </li>
          </ol>

          <p className="mt-12 max-w-3xl text-silt text-sm leading-relaxed">
            Joining mid-season, payment plans, family-tier definitions, and any
            unusual situation are handled directly by the office. Call{" "}
            <a href="tel:+12506932366" className="text-granite underline hover:text-amber">
              250-693-2366
            </a>
            ; they'll answer in two minutes. Memberships are not refundable as a
            default; talk to the office if your circumstances change.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          11. FAQ
          Semantic <details>/<summary>, no JS needed. Twelve real
          questions, answered honestly. Anything we can't verify routes
          to the office.
          ════════════════════════════════════════════════════════════ */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge grid gap-12 md:gap-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow text-cedar mb-5">Frequently asked</p>
            <h2 className="display-md font-display mb-6">
              The questions
              <br />
              we hear most.
            </h2>
            <p className="prose-editorial text-granite/85">
              Twelve answers. If yours isn't here, the Pro Shop will pick up the
              phone in less time than it took to read this paragraph.
            </p>
            <a
              href="tel:+12506932255"
              className="btn-ghost mt-7"
            >
              Call 250-693-2255
            </a>
          </div>

          <div className="md:col-span-8">
            <ul className="border-t border-granite/15">
              {FAQ.map((item) => (
                <li key={item.q} className="border-b border-granite/15">
                  <details className="group">
                    <summary className="cursor-pointer list-none flex items-center justify-between gap-6 py-5 font-display text-lg text-granite hover:text-amber transition-colors min-h-[44px]">
                      <span className="leading-snug">{item.q}</span>
                      <span
                        aria-hidden
                        className="font-mono text-tamarack text-lg transition-transform group-open:rotate-45 shrink-0"
                      >
                        +
                      </span>
                    </summary>
                    <p className="pb-6 text-granite/80 text-[15px] leading-relaxed max-w-2xl">
                      {item.a}
                    </p>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          12. EARLY BIRD STRIP
          The single piece of real, verifiable urgency on the page.
          ════════════════════════════════════════════════════════════ */}
      <section className="py-14 bg-paper">
        <div className="container-edge">
          <div className="border-t border-b border-tamarack/40 py-7 grid gap-5 md:grid-cols-12 md:items-center">
            <div className="md:col-span-9">
              <p className="eyebrow text-tamarack mb-2">Fall Early Bird</p>
              <p className="font-display text-xl md:text-2xl text-granite leading-snug">
                Pay before November 5 and the listed Early Bird rate is yours for
                the following season. Spring rates are higher.
              </p>
            </div>
            <div className="md:col-span-3 md:text-right">
              <a href="tel:+12506932255" className="btn-primary">
                Call to lock it in
              </a>
            </div>
          </div>
          <p className="mt-5 font-mono text-xs text-silt">{EARLY_BIRD_NOTE}</p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          13. FINAL CTA + CROSS-LINKS
          Three paths (call, contact, walk in), then the cross-links to
          Rates, Course, Retirees, Contact, and the USA primer.
          ════════════════════════════════════════════════════════════ */}
      <section className="py-[var(--spacing-section)] bg-cedar text-paper">
        <div className="container-edge text-center max-w-3xl mx-auto">
          <p className="eyebrow text-tamarack mb-6">Ready to join</p>
          <h2
            className="font-display mb-8"
            style={{
              fontSize: "clamp(2.25rem, 6vw, 4.25rem)",
              lineHeight: "1.0",
              letterSpacing: "-0.02em",
            }}
          >
            The Pro Shop can sign you up
            <br />
            this afternoon.
          </h2>
          <p className="prose-editorial text-paper/80 max-w-xl mx-auto mb-10">
            Call, send a message, or walk in. Whichever feels right. The course
            has been here since 1962; it'll wait the ten minutes it takes to do
            this properly.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-5">
            <a
              href="tel:+12506932255"
              className="btn-primary bg-tamarack text-granite hover:bg-paper"
            >
              Call 250-693-2255
            </a>
            <Link
              href="/contact"
              className="btn-ghost text-paper border-paper/70 hover:text-tamarack hover:border-tamarack"
            >
              Send a message
            </Link>
            <BookButton label="Play first, join later" />
          </div>
          <p className="mt-10 font-mono text-xs text-paper/60 leading-relaxed">
            Pro Shop 8 AM to dusk · 7 days · 5500 Highway 22, Genelle BC
          </p>
        </div>
      </section>

      {/* Cross-links, low-key, end of page. */}
      <section className="py-16 bg-paper border-t border-granite/10">
        <div className="container-edge">
          <p className="eyebrow text-cedar mb-7">Keep reading</p>
          <ul className="grid sm:grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-5">
            <li>
              <Link href="/rates" className="link-editorial font-display text-lg text-granite">
                Rates and green fees
              </Link>
              <p className="text-silt text-sm mt-1">Day, twilight, cart, range, lockers.</p>
            </li>
            <li>
              <Link href="/course" className="link-editorial font-display text-lg text-granite">
                The course
              </Link>
              <p className="text-silt text-sm mt-1">Hole by hole, history, conditions.</p>
            </li>
            <li>
              <Link href="/membership/retirees-club" className="link-editorial font-display text-lg text-granite">
                Retirees Club
              </Link>
              <p className="text-silt text-sm mt-1">Thursdays, April through October.</p>
            </li>
            <li>
              <Link href="/usa-visitors" className="link-editorial font-display text-lg text-granite">
                USA visitors
              </Link>
              <p className="text-silt text-sm mt-1">Three hours from Spokane. Border primer.</p>
            </li>
            <li>
              <Link href="/contact" className="link-editorial font-display text-lg text-granite">
                Contact the office
              </Link>
              <p className="text-silt text-sm mt-1">Email, phone, location.</p>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
