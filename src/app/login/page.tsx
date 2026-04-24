import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Member Portal",
  description:
    "Log in to the Birchbank Member Portal — advance tee-time booking, account management, and reciprocal-club access via Chronogolf.",
  alternates: { canonical: "/login" },
  robots: { index: false, follow: true },
};

/**
 * Members login gateway.
 *
 * Links out to Chronogolf's member portal (members.chronogolf.com/login).
 * We don't redirect immediately because (a) the Chronogolf login domain is
 * cross-origin and a reflexive server redirect makes the back-button
 * behavior confusing, and (b) a one-screen interstitial lets us remind
 * the member what belongs here vs. what belongs in the Pro Shop.
 *
 * Nav and footer both point here; if the Chronogolf endpoint ever moves,
 * we only change one URL.
 */

const CHRONOGOLF_MEMBER_PORTAL = "https://members.chronogolf.com/login";

const MEMBER_TOOLS = [
  {
    title: "Tee-time booking",
    body: "Members book up to 14 days out — two days ahead of public. Same Chronogolf account as the widget.",
    cta: { label: "Open member portal ↗", href: CHRONOGOLF_MEMBER_PORTAL, external: true },
  },
  {
    title: "Enter a score",
    body: "Post rounds at the Golf Canada Score Centre for handicap tracking. Separate from Chronogolf.",
    cta: { label: "Open SCG ↗", href: "https://scg.golfcanada.ca", external: true },
  },
  {
    title: "Retirees Club",
    body: "Schedule, sign-ups, and contacts for the Thursday-morning block. Open to all retired players.",
    cta: { label: "Retirees Club page", href: "/membership/retirees-club", external: false },
  },
  {
    title: "Account questions",
    body: "Billing, membership changes, renewals, receipts. Brenda handles it directly.",
    cta: { label: "Email Accounting", href: "mailto:accounting@birchbankgolf.com", external: true },
  },
];

export default function Login() {
  return (
    <>
      <section className="pt-32 md:pt-40 pb-12 bg-paper">
        <div className="container-edge">
          <p className="eyebrow mb-6">Member Portal</p>
          <h1
            className="font-display text-granite max-w-[20ch] mb-8"
            style={{ fontSize: "clamp(2.5rem, 6.5vw, 4.5rem)", lineHeight: "1.02", letterSpacing: "-0.015em" }}
          >
            Log in to your account.
          </h1>
          <p className="prose-editorial text-granite/85 max-w-2xl">
            Your member account lives on Chronogolf — same login as the tee-time widget. Use
            the button below, or pick a tool from the list to go straight there.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={CHRONOGOLF_MEMBER_PORTAL}
              className="btn-primary"
              target="_blank"
              rel="noopener"
            >
              Log in on Chronogolf ↗
            </a>
            <a href="tel:+12506932255" className="btn-ghost">
              Forgot login? Call 250-693-2255
            </a>
          </div>
        </div>
      </section>

      <div className="container-edge"><div className="rule-hair" /></div>

      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge">
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow mb-5">Member tools</p>
            <h2 className="display-md font-display mb-5">Go straight to what you need.</h2>
          </div>

          <ul className="grid md:grid-cols-2 gap-5 md:gap-6">
            {MEMBER_TOOLS.map((t) => (
              <li key={t.title} className="border border-granite/15 p-7 flex flex-col">
                <p className="font-display text-xl text-granite mb-3">{t.title}</p>
                <p className="text-silt text-sm leading-relaxed mb-6 flex-1">{t.body}</p>
                {t.cta.external ? (
                  <a
                    href={t.cta.href}
                    target={t.cta.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener"
                    className="btn-ghost self-start text-sm"
                  >
                    {t.cta.label}
                  </a>
                ) : (
                  <Link href={t.cta.href} className="btn-ghost self-start text-sm">
                    {t.cta.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <p className="mt-12 text-sm text-silt max-w-2xl">
            Not a member yet?{" "}
            <Link href="/membership" className="underline hover:text-amber">
              See membership tiers
            </Link>
            . Members book 14 days out, get reciprocal rates at participating clubs, and
            receive Pro Shop discounts.
          </p>
        </div>
      </section>
    </>
  );
}
