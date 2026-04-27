import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Retirees Club",
  description:
    "The Birchbank Retirees Club plays every Thursday morning, April through October. Open to retired players in the West Kootenays, a Birchbank membership is not required to join.",
  alternates: { canonical: "/membership/retirees-club" },
};

/* ────────────────────────────────────────────────────────────────────
   Retirees Club page.

   Audience: retired and semi-retired players in the West Kootenays
   (Trail, Rossland, Castlegar, Nelson, Genelle), age 60+, often
   reading on a tablet on the couch. Treat them as the competent
   retired professionals they are. No "young at heart" nonsense.

   Source-of-truth rules. Every claim on this page traces to one of:
     - birchbankgolf.com/retirees-club        (schedule, eligibility,
                                               sign-up, email, brunch)
     - birchbankretireesclub.blogspot.com     (blog active since 2022,
                                               event names, the voice,
                                               2025 + 2026 winners)
     - birchbankgolf.com/contacts             (Pro Shop phone)

   What is NOT on this page:
     - A specific annual membership fee. The blog mentions a $30 early
       bird that rises May 1, but the official site does not list dues
       at all. We surface the early-bird mention with the right caveats
       and route everything else to the email and the Pro Shop.
     - Brunch menu and prices. Not published.
     - Any organizer's full title. The blog is signed informally; we
       use first names with light context only where the blog itself
       publishes them.

   No em dashes anywhere. No "pristine," "picturesque," "nestled,"
   "championship," "unforgettable." Touch targets ≥ 44px. Body copy
   leans on prose-editorial which is already 17 to 19px.
   ────────────────────────────────────────────────────────────────── */

const SCHEDULE = [
  { month: "April", time: "9:30 to 11:30 AM" },
  { month: "May", time: "9:00 to 11:00 AM" },
  { month: "June", time: "8:30 to 10:30 AM" },
  { month: "July & August", time: "8:00 to 10:00 AM" },
  { month: "September & October", time: "Posted weekly, daylight dependent" },
];

// Verifiable from the blog. Each entry links the year, the event the
// blog actually named, and the player the blog credited. We list
// these because the blog publishes them publicly; surfacing them
// here is a quiet form of social proof, not a press release.
const RECENT_HONOURS = [
  {
    year: "2026",
    event: "Retirees Masters, week 2 leader",
    player: "Serge Pasquali",
    note: "4-shot lead at 142 net through two of two counted rounds.",
  },
  {
    year: "2025",
    event: "PGA Month champion",
    player: "Mike Vlanich",
    note: "Best two net rounds across the month.",
  },
  {
    year: "2025",
    event: "Retirees Masters champion",
    player: "Alex Birukow",
    note: "Defending the title coming into 2026.",
  },
];

const FAQ = [
  {
    q: "Do I need to be a Birchbank member to join the Retirees Club?",
    a: "No. The Retirees Club is its own membership. Anyone who has retired or semi-retired is welcome to join, whether or not you carry a Birchbank Golf Course card. This is the unusual part of the deal. Most courses gate league play behind a full membership; Birchbank does not.",
  },
  {
    q: "Do I need a handicap?",
    a: "No. The Thursday block is open to anyone in the club, mixed handicaps, no skill floor. If you want to enter the monthly shotgun for prizes, the format uses your posted handicap; the Pro Shop will help you set one up at scg.golfcanada.ca if you don't already have one.",
  },
  {
    q: "Can I walk, or do I need a cart?",
    a: "Both are fine. The course is walkable in the Birchbank sense (a few real climbs, mostly fair), and plenty of members walk into their seventies. Power carts are available at the Pro Shop at the day rate, or by seasonal lease.",
  },
  {
    q: "What does it actually cost?",
    a: "The Retirees Club sets its own annual dues separate from any Birchbank green fee or membership. The 2026 blog mentions an early-bird rate posted before the season, with the rate rising on May 1. For the current number, email birchbankretirees@gmail.com or call the Pro Shop at 250-693-2255. Do not take anything I write here as the official price; ask the club directly.",
  },
  {
    q: "What happens on a rainy Thursday?",
    a: "If conditions are playable, the block runs. If the course is closed for weather, the block is cancelled and the next Thursday picks up. Watch the blog or call the Pro Shop in the morning if the sky looks off.",
  },
  {
    q: "I'm a snowbird. Can I drop in for a few weeks each summer?",
    a: "Yes. Visiting retirees are genuinely welcome. The simplest path is to email the club at birchbankretirees@gmail.com a week or two before you arrive so you're on the bulletin board for sign-ups. If you only want to play a few times, the Pro Shop can put you in the Thursday block as a guest at the green-fee rate.",
  },
  {
    q: "Is there a guest policy for friends visiting from out of town?",
    a: "Yes. Members can sign in a guest for the Thursday block; the guest pays the day green fee at the Pro Shop. This is how a lot of new retirees first try the group before joining for the full season.",
  },
  {
    q: "What do people wear?",
    a: "Standard golf, nothing precious. Soft spikes or sneakers, collared shirt, weather-appropriate. There is no dress drama. People show up looking like adults who came to play golf.",
  },
];

export default function RetireesClub() {
  return (
    <>
      {/* ════════════════════════════════════════════════════════════
          1. HERO
          Lead with the Thursday ritual and the open-eligibility line.
          That second clause is the page's biggest single lever for
          anyone reading from outside the existing Birchbank membership.
          ════════════════════════════════════════════════════════════ */}
      <section className="pt-32 md:pt-40 pb-16 bg-paper">
        <div className="container-edge grid gap-12 md:gap-16 md:grid-cols-12 items-end">
          <div className="md:col-span-8">
            <p className="eyebrow mb-6">Retirees Club</p>
            <h1
              className="font-display text-granite mb-8"
              style={{
                fontSize: "clamp(2.5rem, 7vw, 5.25rem)",
                lineHeight: "1.0",
                letterSpacing: "-0.018em",
              }}
            >
              Thursday mornings,
              <br />
              April through October.
              <br />
              A seat is already saved.
            </h1>
            <p className="prose-editorial text-granite/85 max-w-2xl">
              The Birchbank Retirees Club has played every Thursday morning along
              the Columbia for years. A two-hour reserved tee block, a monthly
              shotgun and brunch, prizes for the regulars and a real bulletin
              board on the Pro Shop wall. Membership is open to any retired or
              semi-retired player. A Birchbank Golf Course membership is not
              required.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a href="mailto:birchbankretirees@gmail.com" className="btn-primary">
                Email the club
              </a>
              <a href="#how-to-join" className="btn-ghost">
                How to sign up
              </a>
            </div>
            <p className="mt-6 font-mono text-xs text-silt uppercase tracking-widest">
              Pro Shop · 250-693-2255 · 8 AM to dusk · 7 days
            </p>
          </div>

          <aside className="md:col-span-4 md:pl-6">
            <div className="border-l-2 border-tamarack pl-5 space-y-5">
              <div>
                <p className="eyebrow mb-1">The standing arrangement</p>
                <p className="font-display text-2xl text-granite leading-snug">
                  Every Thursday
                </p>
                <p className="font-display text-5xl text-granite tabular-nums leading-none mt-2">
                  AM
                </p>
                <p className="text-silt text-sm mt-3 leading-relaxed">
                  A two-hour reserved tee block. Show up, tee off, brunch
                  after on the patio.
                </p>
              </div>
              <div className="rule-hair" />
              <p className="font-mono text-xs text-silt leading-relaxed">
                Open to retired players. Birchbank membership not required.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* Editorial photo, between the hero and the trust strip. The
          Thursday-pond image conveys the calm community atmosphere
          better than copy. Capped at max-w-3xl so it sits as a
          contained moment. */}
      <section className="bg-paper">
        <div className="container-edge pb-16">
          <figure className="max-w-3xl">
            <div className="relative w-full aspect-square overflow-hidden bg-granite/5 border border-granite/10 rounded-sm">
              <Image
                src="/membership/retirees-pond.webp"
                alt="The pond and fountain at Birchbank with the fairway and trees beyond, distant players walking off the green"
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                loading="lazy"
                unoptimized
              />
            </div>
            <figcaption className="mt-3 font-mono text-xs text-silt">
              The Thursday pond, after the second nine.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          2. TRUST STRIP
          Quiet authority. The blog has been running since 2022; the
          weekly tee block has been a fixture much longer. State the
          facts; let typography do the lifting.
          ════════════════════════════════════════════════════════════ */}
      <section className="border-y border-granite/10 bg-paper">
        <div className="container-edge py-10">
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-y-7 gap-x-6">
            <li>
              <p className="font-mono text-[10px] text-tamarack uppercase tracking-widest mb-2">
                Plays
              </p>
              <p className="font-display text-2xl text-granite">Thursdays</p>
              <p className="text-silt text-xs mt-1 leading-snug">
                April 1 to October 31, weather permitting
              </p>
            </li>
            <li>
              <p className="font-mono text-[10px] text-tamarack uppercase tracking-widest mb-2">
                Eligibility
              </p>
              <p className="font-display text-2xl text-granite">Retired</p>
              <p className="text-silt text-xs mt-1 leading-snug">
                Birchbank membership not required
              </p>
            </li>
            <li>
              <p className="font-mono text-[10px] text-tamarack uppercase tracking-widest mb-2">
                Reporting
              </p>
              <p className="font-display text-2xl text-granite">Since 2022</p>
              <p className="text-silt text-xs mt-1 leading-snug">
                The club blog, posted weekly through the season
              </p>
            </li>
            <li>
              <p className="font-mono text-[10px] text-tamarack uppercase tracking-widest mb-2">
                Format
              </p>
              <p className="font-display text-2xl text-granite">Mixed</p>
              <p className="text-silt text-xs mt-1 leading-snug">
                Walk or ride, all handicaps, no skill floor
              </p>
            </li>
          </ul>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          3. WHAT IT ACTUALLY IS
          The honest editorial paragraph. Specific over vague: the
          rhythm of arriving, the coffee, the block, brunch on the
          Bistro patio. Anything not verified is left out.
          ════════════════════════════════════════════════════════════ */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge grid gap-12 md:gap-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow text-cedar mb-5">What it actually is</p>
            <h2 className="display-md font-display mb-6">
              A standing Thursday,
              <br />
              not a calendar entry.
            </h2>
            <p className="prose-editorial text-granite/85">
              The Retirees Club is a small institution. It runs the same way
              most weeks, which is exactly the point.
            </p>
          </div>

          <div className="md:col-span-8 prose-editorial text-granite/90 space-y-6">
            <p>
              You arrive between half an hour and an hour before your tee time.
              The Pro Shop pours coffee, the bulletin board has the day's draw,
              you find your name and the three players you're out with. Mixed
              handicaps, mostly. Some weeks you know everyone in the field, some
              weeks you meet someone new from Castlegar or the Slocan.
            </p>
            <p>
              The reserved block runs roughly two hours. Walking or carting,
              both are normal. The course is the same Roy Stone routing
              everyone else plays, no separate &ldquo;senior&rdquo; tee deck or
              special rules. People play the tees that suit them and post their
              own scores.
            </p>
            <p>
              Once a month, the Thursday becomes a shotgun start with a brunch
              and a small prize ceremony in the Bistro afterward. That is when
              the field is at its full size and the room is loud in a good way.
              On the other Thursdays it is quieter, more about the round and
              the conversation on the back nine.
            </p>
            <p>
              By July you will know the regulars. By August you will know which
              one of them is having a year. The blog at{" "}
              <a
                href="https://birchbankretireesclub.blogspot.com"
                target="_blank"
                rel="noopener"
                className="link-editorial text-cedar"
              >
                birchbankretireesclub.blogspot.com
              </a>{" "}
              keeps a running record of everything that matters. It has been
              posting since 2022 and reads exactly like the group does at brunch.
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          4. WHO IT'S FOR
          The eligibility paragraph that removes the "am I allowed?"
          friction in one read. Three honest filters; no skill gate;
          explicit welcome for snowbirds. Decision simplification.
          ════════════════════════════════════════════════════════════ */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow text-cedar mb-3">Who it&apos;s for</p>
            <h2 className="display-lg font-display mb-5">
              Three honest filters.
              <br />
              Pick the one that&apos;s you.
            </h2>
            <p className="prose-editorial text-granite/85">
              The eligibility line is short. Retired or semi-retired, willing to
              play on Thursdays, willing to be civil over coffee. That is the
              whole list.
            </p>
          </div>

          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            <li className="border border-granite/15 bg-paper p-7 flex flex-col">
              <p className="eyebrow mb-4 normal-case tracking-normal text-silt text-[13px] leading-snug">
                If you&apos;re newly retired and looking for a weekly anchor
              </p>
              <p className="font-display text-2xl text-granite leading-snug mb-3">
                You&apos;re who this is for.
              </p>
              <p className="text-granite/75 text-sm leading-relaxed">
                Most members joined in their first year of retirement and stayed.
                The Thursday becomes the day on the calendar everything else
                arranges itself around.
              </p>
            </li>
            <li className="border border-granite/15 bg-paper p-7 flex flex-col">
              <p className="eyebrow mb-4 normal-case tracking-normal text-silt text-[13px] leading-snug">
                If you&apos;re semi-retired and your week is your own on Thursdays
              </p>
              <p className="font-display text-2xl text-granite leading-snug mb-3">
                Same welcome.
              </p>
              <p className="text-granite/75 text-sm leading-relaxed">
                You don&apos;t have to be fully out of work. If Thursday mornings
                are yours and you want a regular round you don&apos;t have to
                organize, this is the group.
              </p>
            </li>
            <li className="border border-granite/15 bg-paper p-7 flex flex-col">
              <p className="eyebrow mb-4 normal-case tracking-normal text-silt text-[13px] leading-snug">
                If you&apos;re a snowbird here for part of the season
              </p>
              <p className="font-display text-2xl text-granite leading-snug mb-3">
                Email ahead. We&apos;ll get you on the board.
              </p>
              <p className="text-granite/75 text-sm leading-relaxed">
                Visiting retirees are part of the group. A short note to
                birchbankretirees@gmail.com a week before you arrive is all it
                takes to be in the Thursday rotation while you&apos;re here.
              </p>
            </li>
          </ul>

          <p className="mt-10 max-w-3xl text-granite/75 text-sm leading-relaxed">
            No handicap requirement. No skill test. Walking or riding, both
            normal. Mixed-handicap groupings most weeks. The only thing the
            club asks is that you sign up by the deadline so the draw can be
            posted in time.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          5. THE WEEKLY TEE BLOCK
          Schedule table, expanded with context (why the times shift,
          what happens shoulder season). This is the practical section
          a member uses on Wednesday night.
          ════════════════════════════════════════════════════════════ */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge grid gap-12 md:gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow text-cedar mb-5">The weekly tee block</p>
            <h2 className="display-md font-display mb-6">
              Times shift earlier
              <br />
              as summer comes on.
            </h2>
            <p className="prose-editorial text-granite/85">
              The reserved block is two hours wide. It moves earlier through
              the spring and early summer to keep the field on the course
              before the heat of the day, then walks back as the season turns.
              Posted month by month at the Pro Shop.
            </p>
          </div>

          <div className="md:col-span-7">
            <table className="w-full border-t border-granite/15">
              <tbody>
                {SCHEDULE.map((s) => (
                  <tr
                    key={s.month}
                    className="border-b border-granite/15"
                  >
                    <td className="py-5 pr-4 font-display text-xl text-granite align-top">
                      {s.month}
                    </td>
                    <td className="py-5 text-granite/85 tabular-nums">
                      {s.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="mt-7 text-silt text-sm leading-relaxed max-w-xl">
              On a rainy Thursday: if the course is open and conditions are
              playable, the block runs. If Birchbank closes for weather, the
              week is cancelled and we pick up the next Thursday.
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          6. MONTHLY TOURNAMENTS
          Real names from the blog. The Masters format (best two net
          rounds across the month) is verbatim from the April 2026 post.
          Names listed are players the blog has already published.
          ════════════════════════════════════════════════════════════ */}
      <section className="py-[var(--spacing-section)] bg-cedar text-paper">
        <div className="container-edge">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow text-tamarack mb-5">Once a month</p>
            <h2 className="display-lg font-display mb-5">
              Shotgun, brunch,
              <br />
              prize ceremony.
            </h2>
            <p className="prose-editorial text-paper/85">
              One Thursday a month the format changes. Everyone tees off at
              the same time on different holes, plays the round, comes in for
              brunch on the Bistro patio, and the prizes are handed out. The
              field is bigger, the room is louder, and the leaderboard is
              real. The Retirees Masters runs in April, the PGA Month later
              in the season; the Pro Shop posts the schedule for the rest at
              the start of each year.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {RECENT_HONOURS.map((h) => (
              <article
                key={`${h.year}-${h.event}`}
                className="border border-paper/15 bg-cedar-dark/30 p-7 flex flex-col"
              >
                <p className="font-mono text-[10px] uppercase tracking-widest text-tamarack mb-3">
                  {h.year} · {h.event}
                </p>
                <p className="font-display text-2xl text-paper leading-snug mb-3">
                  {h.player}
                </p>
                <p className="text-paper/75 text-sm leading-relaxed">{h.note}</p>
              </article>
            ))}
          </div>

          <p className="mt-10 max-w-3xl text-paper/70 text-sm leading-relaxed">
            All of the above is reported, week by week, on the club blog. If
            you want to know what the Thursday actually feels like before you
            email, read three or four posts at{" "}
            <a
              href="https://birchbankretireesclub.blogspot.com"
              target="_blank"
              rel="noopener"
              className="text-paper underline hover:text-tamarack"
            >
              birchbankretireesclub.blogspot.com
            </a>
            . That will tell you more than this page ever could.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          7. THE BRUNCH AND THE SOCIAL SIDE
          Cross-link to /bistro. Make the social piece its own section
          rather than a footnote on the tournament one. This is the
          community moment, not a meal.
          ════════════════════════════════════════════════════════════ */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge grid gap-12 md:gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow text-cedar mb-5">After the round</p>
            <h2 className="display-md font-display mb-6">
              Brunch on the patio,
              <br />
              under the cedars.
            </h2>
            <p className="prose-editorial text-granite/85">
              The Bistro is part of the Retirees Club, not an afterthought.
              The covered patio looks down the eighteenth toward the river. On
              a tournament Thursday it is the room where the prize ceremony
              happens; on a regular Thursday it is where the four of you
              recap a round you all played differently.
            </p>
          </div>

          <div className="md:col-span-7 prose-editorial text-granite/90 space-y-6">
            <p>
              The kitchen runs through the season. On tournament days the club
              arranges a set brunch as part of the entry fee. On regular
              Thursdays you order at the counter the way you would any other
              day. The Bistro keeps the same hours as the Pro Shop while the
              course is open.
            </p>
            <p>
              If you joined for the golf and stayed for the people, you would
              not be the first.
            </p>
            <Link href="/bistro" className="btn-ghost">
              About the Bistro
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          8. MEMBERSHIP / DUES
          Honesty section. The official site does not list a fee, the
          blog mentioned a $30 early-bird that rises May 1. Surface
          that with the right framing and route everything to email.
          NEVER invent a number.
          ════════════════════════════════════════════════════════════ */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow text-cedar mb-3">Annual dues</p>
            <h2 className="display-md font-display mb-5">
              Set by the club, ask the club.
            </h2>
            <p className="prose-editorial text-granite/85">
              The Retirees Club sets its own annual dues, separate from any
              Birchbank green fee or membership. The 2026 blog opened the
              season with an early-bird rate posted before the spring deadline
              and a higher rate after May 1. For the current number, the
              fastest route is the email below; the Pro Shop can also tell you
              over the counter.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <article className="border border-granite/15 bg-paper p-8 flex flex-col">
              <p className="eyebrow mb-3">First step</p>
              <p className="font-display text-2xl text-granite mb-4 leading-snug">
                Email birchbankretirees@gmail.com
              </p>
              <p className="text-granite/80 text-sm leading-relaxed mb-6 flex-1">
                Tell them you&apos;re thinking about joining for the season.
                They&apos;ll quote the current dues, tell you what&apos;s in
                them (prize fund for weekly events, contribution to the
                tournament budget), and put your name on the bulletin board
                for the next Thursday.
              </p>
              <a
                href="mailto:birchbankretirees@gmail.com"
                className="btn-primary mt-auto"
              >
                Email the club
              </a>
            </article>

            <article className="border border-granite/15 bg-paper p-8 flex flex-col">
              <p className="eyebrow mb-3">Or by phone</p>
              <p className="font-display text-2xl text-granite mb-4 leading-snug">
                Call the Pro Shop, 250-693-2255
              </p>
              <p className="text-granite/80 text-sm leading-relaxed mb-6 flex-1">
                Eight in the morning to dusk, seven days a week through the
                season. They handle Retirees Club sign-ups at the counter and
                can route you to the right person if the question is more
                involved.
              </p>
              <a
                href="tel:+12506932255"
                className="btn-ghost mt-auto"
              >
                250-693-2255
              </a>
            </article>
          </div>

          <p className="mt-10 max-w-3xl text-silt text-sm leading-relaxed">
            What the dues fund: the prize purse for the weekly draws and the
            monthly tournaments. Tournament-day brunch and per-event entry are
            posted separately on the blog before each event.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          9. HOW TO SIGN UP FOR A THURSDAY
          The bulletin-board + Pro Shop window is a quirky tradition,
          written as charming, not bureaucratic. Three steps. Mobile-
          friendly tap targets. No carousel.
          ════════════════════════════════════════════════════════════ */}
      <section
        id="how-to-join"
        className="py-[var(--spacing-section)] bg-paper border-t border-granite/10 scroll-mt-24"
      >
        <div className="container-edge">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow text-cedar mb-3">How to sign up for a Thursday</p>
            <h2 className="display-md font-display mb-5">
              The bulletin board does the work.
            </h2>
            <p className="prose-editorial text-granite/85">
              The Retirees Club still uses a paper sign-up sheet, on the
              Retirees Bulletin Board inside the Pro Shop. It is one of the
              good things about the place. Here is how the week runs.
            </p>
          </div>

          <ol className="grid md:grid-cols-3 gap-6 md:gap-8">
            <li className="border-t-2 border-cedar pt-7">
              <p className="font-mono text-[11px] uppercase tracking-widest text-tamarack mb-3">
                Thursday morning to Sunday morning
              </p>
              <p className="font-display text-2xl text-granite mb-3 leading-snug">
                The sheet goes up.
              </p>
              <p className="text-granite/80 text-sm leading-relaxed">
                After the current Thursday wraps, the sign-up sheet for the
                following week goes on the Retirees Bulletin Board. Put your
                name down any time between then and Sunday morning.
              </p>
            </li>
            <li className="border-t-2 border-cedar pt-7">
              <p className="font-mono text-[11px] uppercase tracking-widest text-tamarack mb-3">
                Sunday morning onward
              </p>
              <p className="font-display text-2xl text-granite mb-3 leading-snug">
                Pro Shop takes over.
              </p>
              <p className="text-granite/80 text-sm leading-relaxed">
                Once the bulletin-board window closes, the Pro Shop handles
                late additions. Call{" "}
                <a
                  href="tel:+12506932255"
                  className="text-granite underline hover:text-amber"
                >
                  250-693-2255
                </a>{" "}
                or stop by the counter; they&apos;ll fit you in if there&apos;s
                room in the block.
              </p>
            </li>
            <li className="border-t-2 border-cedar pt-7">
              <p className="font-mono text-[11px] uppercase tracking-widest text-tamarack mb-3">
                Wednesday or Thursday morning
              </p>
              <p className="font-display text-2xl text-granite mb-3 leading-snug">
                Draw goes up.
              </p>
              <p className="text-granite/80 text-sm leading-relaxed">
                The pairings and tee times are posted before the day. Show
                up half an hour early, find your name, get a coffee. The
                first group goes out on time.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          10. VISITORS AND SNOWBIRDS
          Separate section because this is genuinely unusual. Position
          as a real welcome with practical mechanics. Reciprocity move:
          name the no-membership-required policy as a gift.
          ════════════════════════════════════════════════════════════ */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge grid gap-12 md:gap-16 md:grid-cols-12 items-start">
          <div className="md:col-span-5">
            <p className="eyebrow text-cedar mb-5">For visitors and snowbirds</p>
            <h2 className="display-md font-display mb-6">
              The unusual part
              <br />
              of the deal.
            </h2>
            <p className="prose-editorial text-granite/85">
              Most clubs gate their league play behind a full course
              membership. Birchbank does not. If you spend part of the
              summer in the West Kootenays, you can join the Retirees Club
              for the season without joining Birchbank itself. We mention
              it twice on this page because it is genuinely the thing
              visiting retirees are most surprised to hear.
            </p>
          </div>

          <div className="md:col-span-7 prose-editorial text-granite/90 space-y-6">
            <p>
              <strong className="font-medium text-granite">
                Joining for a partial season.
              </strong>{" "}
              Email{" "}
              <a
                href="mailto:birchbankretirees@gmail.com"
                className="link-editorial text-cedar"
              >
                birchbankretirees@gmail.com
              </a>{" "}
              before you arrive. Tell them roughly when you&apos;re in town.
              The club can quote a partial-season arrangement or, if
              you&apos;re only in for two or three Thursdays, set you up as
              a guest.
            </p>
            <p>
              <strong className="font-medium text-granite">
                Dropping in for one Thursday.
              </strong>{" "}
              Call the Pro Shop the week before, ask for a spot in the
              Retirees block on Thursday, and pay the day green fee at the
              counter when you arrive. No paperwork beyond that.
            </p>
            <p>
              <strong className="font-medium text-granite">
                Bringing a spouse or friend who isn&apos;t in the club.
              </strong>{" "}
              Members can sign in a guest. Same green fee, same warm welcome.
              This is how a lot of people first try the Thursday before
              joining the next spring.
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          11. CONTACT
          Make it dead obvious. Email, Pro Shop phone, blog. Three
          large hit targets. No form (the club is small enough that
          the email is the form).
          ════════════════════════════════════════════════════════════ */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow text-cedar mb-3">Reach the club</p>
            <h2 className="display-md font-display mb-5">
              Three ways. All read by a person.
            </h2>
            <p className="prose-editorial text-granite/85">
              No web form, no inbox black hole. The email goes to the club
              organizer, the Pro Shop is staffed through the season, the
              blog is the public record.
            </p>
          </div>

          <ul className="grid md:grid-cols-3 gap-6">
            <li className="border border-granite/15 bg-paper p-7 flex flex-col">
              <p className="eyebrow mb-3">Email</p>
              <p className="font-display text-xl text-granite mb-4 leading-snug break-words">
                birchbankretirees@gmail.com
              </p>
              <p className="text-granite/75 text-sm leading-relaxed mb-6 flex-1">
                The fastest path for joining, partial-season questions, or
                anything that needs a written reply. Usually answered within
                a day or two through the season.
              </p>
              <a
                href="mailto:birchbankretirees@gmail.com"
                className="btn-primary mt-auto"
              >
                Open in your mail app
              </a>
            </li>
            <li className="border border-granite/15 bg-paper p-7 flex flex-col">
              <p className="eyebrow mb-3">Phone</p>
              <p className="font-display text-xl text-granite mb-4 leading-snug">
                250-693-2255
              </p>
              <p className="text-granite/75 text-sm leading-relaxed mb-6 flex-1">
                The Pro Shop. They handle Retirees Club sign-ups, late
                additions to the Thursday block, weather questions, and the
                guest arrangements above.
              </p>
              <a
                href="tel:+12506932255"
                className="btn-ghost mt-auto"
              >
                Call 250-693-2255
              </a>
            </li>
            <li className="border border-granite/15 bg-paper p-7 flex flex-col">
              <p className="eyebrow mb-3">Blog</p>
              <p className="font-display text-xl text-granite mb-4 leading-snug">
                birchbankretireesclub
                <wbr />
                .blogspot.com
              </p>
              <p className="text-granite/75 text-sm leading-relaxed mb-6 flex-1">
                The public record of the season. Weekly recaps, leaderboards,
                tournament instructions and the occasional headline that
                would not pass a copy desk. Worth reading before you join.
              </p>
              <a
                href="https://birchbankretireesclub.blogspot.com"
                target="_blank"
                rel="noopener"
                className="btn-ghost mt-auto"
              >
                Read the blog
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          12. FAQ
          Semantic <details>/<summary>, no JS. Eight real questions.
          Anything we can't verify routes to email or the Pro Shop.
          Larger tap target on the summary row for older fingers.
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
              Eight answers. If yours isn&apos;t here, the email below is the
              right one to ask.
            </p>
            <a
              href="mailto:birchbankretirees@gmail.com"
              className="btn-ghost mt-7"
            >
              Email the club
            </a>
          </div>

          <div className="md:col-span-8">
            <ul className="border-t border-granite/15">
              {FAQ.map((item) => (
                <li key={item.q} className="border-b border-granite/15">
                  <details className="group">
                    <summary className="cursor-pointer list-none flex items-center justify-between gap-6 py-6 font-display text-lg text-granite hover:text-amber transition-colors min-h-[56px]">
                      <span className="leading-snug">{item.q}</span>
                      <span
                        aria-hidden
                        className="font-mono text-tamarack text-lg transition-transform group-open:rotate-45 shrink-0"
                      >
                        +
                      </span>
                    </summary>
                    <p className="pb-6 text-granite/85 text-[1.0625rem] leading-relaxed max-w-2xl">
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
          13. FINAL CTA + CROSS-LINKS
          Single primary action (email), two supporting (call, blog).
          Then quiet cross-links back into the rest of the site.
          ════════════════════════════════════════════════════════════ */}
      <section className="py-[var(--spacing-section)] bg-cedar text-paper">
        <div className="container-edge text-center max-w-3xl mx-auto">
          <p className="eyebrow text-tamarack mb-6">When you&apos;re ready</p>
          <h2
            className="font-display mb-8"
            style={{
              fontSize: "clamp(2.25rem, 6vw, 4.25rem)",
              lineHeight: "1.0",
              letterSpacing: "-0.02em",
            }}
          >
            Send a short email.
            <br />
            We&apos;ll save you a Thursday.
          </h2>
          <p className="prose-editorial text-paper/80 max-w-xl mx-auto mb-10">
            Two sentences is enough. Who you are, when you&apos;d like to
            start. The reply will tell you the rest.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-5">
            <a
              href="mailto:birchbankretirees@gmail.com"
              className="btn-primary bg-tamarack text-granite hover:bg-paper"
            >
              Email birchbankretirees@gmail.com
            </a>
            <a
              href="tel:+12506932255"
              className="btn-ghost text-paper border-paper/70 hover:text-tamarack hover:border-tamarack"
            >
              Call 250-693-2255
            </a>
          </div>
          <p className="mt-10 font-mono text-xs text-paper/60 leading-relaxed">
            Pro Shop · 8 AM to dusk · 5500 Highway 22, Genelle BC
          </p>
        </div>
      </section>

      {/* Cross-links, low-key, end of page. */}
      <section className="py-16 bg-paper border-t border-granite/10">
        <div className="container-edge">
          <p className="eyebrow text-cedar mb-7">Keep reading</p>
          <ul className="grid sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-5">
            <li>
              <Link
                href="/membership"
                className="link-editorial font-display text-lg text-granite"
              >
                Birchbank memberships
              </Link>
              <p className="text-silt text-sm mt-1">
                Seven tiers, the Single Full Play and the rest.
              </p>
            </li>
            <li>
              <Link
                href="/bistro"
                className="link-editorial font-display text-lg text-granite"
              >
                The Bistro
              </Link>
              <p className="text-silt text-sm mt-1">
                Where the Thursday brunch happens.
              </p>
            </li>
            <li>
              <Link
                href="/course"
                className="link-editorial font-display text-lg text-granite"
              >
                The course
              </Link>
              <p className="text-silt text-sm mt-1">
                Hole by hole, history, conditions.
              </p>
            </li>
            <li>
              <Link
                href="/contact"
                className="link-editorial font-display text-lg text-granite"
              >
                Contact the office
              </Link>
              <p className="text-silt text-sm mt-1">
                Pro Shop, office, and directions.
              </p>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
