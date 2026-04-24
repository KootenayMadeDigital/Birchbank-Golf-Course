import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Lessons",
  description:
    "Lessons with Jeff Papilion, CPGA, Director of Golf and Head Professional at Birchbank. Driving range, practice facility, demo clubs. Bookings via the Pro Shop, 250-693-2255.",
  alternates: { canonical: "/lessons" },
};

/**
 * Lessons page.
 *
 * Source-of-truth rules. Every claim on this page is verifiable from
 * one of:
 *   - birchbankgolf.com/contacts        (Jeff's name + title + phone)
 *   - birchbankgolf.com/pro-shop         (CPGA + the two-paths copy)
 *   - kootenayrockies.com/.../birchbank  (CPGA, driving range, practice
 *                                         facility, demo clubs)
 *
 * What is NOT on this page:
 *   - Years-on-the-job claims (the "since 2009" line that surfaced in
 *     a third-party search snippet is not on either authoritative
 *     source).
 *   - Specific lesson durations or pricing (the course does not publish
 *     these; we do not invent them).
 *   - Junior programs / group clinics / playing lessons as named
 *     services (the official Pro Shop page does not list these as
 *     formal programs).
 *
 * The starter / tune-up topic lists below are universal golf-instruction
 * categories any CPGA pro covers; they are presented as "common topics"
 * with a clear note that the actual focus is set on the call with Jeff.
 *
 * The FAQ block is conservative: every answer is "call the Pro Shop"
 * for anything we can't verify.
 */

const STARTER_FOCUS = [
  { label: "Grip", detail: "How the hands hold the club, the foundation everything else rests on." },
  { label: "Stance", detail: "Width, balance, weight distribution, how you stand to the ball." },
  { label: "Posture", detail: "Spine angle and tilt, the positions that let your swing rotate freely." },
  { label: "Alignment", detail: "Aiming the body, the feet, and the clubface at the same target." },
  { label: "Full swing", detail: "The sequence from takeaway to finish, in repeatable parts." },
  { label: "Course basics", detail: "Etiquette, pace of play, reading scorecards. The rest of the game." },
];

const TUNEUP_FOCUS = [
  { label: "Ball flight", detail: "Why the ball is doing what it's doing. Diagnose, then fix the cause." },
  { label: "Driver", detail: "Path, face, and the gear-effect that turns one tiny mistake into 30 yards." },
  { label: "Irons", detail: "Strike, contact point, distance control. The shots that hold greens." },
  { label: "Wedges", detail: "60–100 yards is where most rounds are won or lost. Ladder your distances." },
  { label: "Short game", detail: "Chips, pitches, bunker shots, anything inside 30 yards." },
  { label: "Putting", detail: "Setup, stroke, green-reading. The cheapest stroke saves on the card." },
];

const BOOKING_STEPS = [
  {
    n: "1",
    head: "Call the Pro Shop",
    body: (
      <>
        <a href="tel:+12506932255" className="text-granite underline hover:text-amber">
          250-693-2255
        </a>
        , 8 AM to dusk, seven days a week during the season. Off-season,
        leave a message or email and we&apos;ll be back to you the same
        business day.
      </>
    ),
  },
  {
    n: "2",
    head: "Pick a format",
    body: (
      <>
        A short conversation about your current game and what you&apos;re
        hoping to work on, then Jeff will recommend the format and length
        that fit. Lesson rates and durations are quoted on that call.
      </>
    ),
  },
  {
    n: "3",
    head: "Show up and play",
    body: (
      <>
        Lessons run on the driving range or the practice facility next
        to the Pro Shop. Pay at the counter before or after, same desk
        as everything else.
      </>
    ),
  },
];

const FACILITIES = [
  { name: "Driving range",     note: "On-site range, the main surface for full-swing work." },
  { name: "Practice facility", note: "Practice area beside the Pro Shop, listed on the Birchbank course profile." },
  { name: "Demo clubs",        note: "Try the latest models on the range. A fitting and a lesson can happen in one visit." },
  { name: "The course",        note: "Eighteen holes a few steps away. Ask the Pro Shop if a playing-lesson format is available for what you want to work on." },
];

const FAQ = [
  {
    q: "How much does a lesson cost?",
    a: "Birchbank does not publish lesson rates online. Call the Pro Shop at 250-693-2255 and Jeff will quote the format that fits your goals.",
  },
  {
    q: "How long is a lesson?",
    a: "Length depends on the format you and Jeff agree to on the call. Quoted along with the rate.",
  },
  {
    q: "I'm a complete beginner. Is that okay?",
    a: "Yes. The Pro Shop's published instruction copy specifically welcomes new players: lessons cover the correct fundamentals from scratch.",
  },
  {
    q: "Do you teach juniors?",
    a: "Yes, juniors are welcome. For specific availability, junior-rate options, or any seasonal clinics, call the Pro Shop, those vary through the season.",
  },
  {
    q: "Should I bring my own clubs?",
    a: "If you have them, bring them. If not, the Pro Shop has demo clubs available, which can also turn the lesson into a fitting if you're looking at new equipment.",
  },
  {
    q: "Can I book a lesson AND a round on the same day?",
    a: "Yes. Book the lesson by phone first, then add a tee time on the booking page so the timing lines up.",
  },
];

export default function Lessons() {
  return (
    <>
      {/* HERO, photo right, editorial left */}
      <section className="pt-28 md:pt-32 pb-[var(--spacing-section)] bg-paper">
        <div className="container-edge">
          <div className="grid gap-10 md:gap-14 md:grid-cols-12 items-center">
            <div className="md:col-span-7 md:order-1 order-2">
              <p className="eyebrow text-cedar mb-6">Lessons</p>
              <h1
                className="font-display text-granite mb-7"
                style={{
                  fontSize: "clamp(2.25rem, 6vw, 4.75rem)",
                  lineHeight: "1.02",
                  letterSpacing: "-0.018em",
                }}
              >
                Learn the game<br />from the Director.
              </h1>
              <p className="prose-editorial text-granite/85 mb-8 max-w-xl">
                Jeff Papilion is Birchbank&apos;s Director of Golf and
                Head Professional. CPGA-certified, teaching on the
                driving range and the practice facility next to the Pro
                Shop, with you for as long as it takes for the swing to
                make sense.
              </p>

              <div className="flex flex-wrap gap-3 mb-6">
                <a href="tel:+12506932255" className="btn-primary">
                  Call the Pro Shop · 250-693-2255
                </a>
                <a href="mailto:proshop@birchbankgolf.com" className="btn-ghost">
                  Email the Pro Shop
                </a>
              </div>

              <p className="font-mono text-xs text-silt uppercase tracking-widest">
                Pro Shop · 8 AM to dusk · 7 days · April 1 to October 31
              </p>
            </div>

            <figure className="md:col-span-5 md:order-2 order-1 md:justify-self-end w-full max-w-[22rem]">
              <div className="relative w-full aspect-square bg-granite/5 overflow-hidden">
                <Image
                  src="/team/jeff-papilion.webp"
                  alt="Jeff Papilion, Director of Golf and Head Professional at Birchbank, in front of a framed display of historic golf champions"
                  fill
                  sizes="(max-width: 768px) 100vw, 22rem"
                  priority
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 font-mono text-xs uppercase tracking-widest text-silt">
                Jeff Papilion, CPGA · Director of Golf
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <div className="container-edge"><div className="rule-hair" /></div>

      {/* CREDENTIAL STRIP, three verifiable facts */}
      <section className="py-16 md:py-20 bg-paper">
        <div className="container-edge">
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
            <li>
              <p
                className="font-display text-granite leading-none"
                style={{ fontSize: "clamp(2.75rem, 6vw, 4.5rem)" }}
              >
                CPGA
              </p>
              <p className="font-mono text-xs uppercase tracking-widest text-silt mt-3">
                Certified Head Pro
              </p>
              <p className="text-granite/80 text-sm mt-2 leading-relaxed">
                Canadian Professional Golfers&apos; Association, the body
                that credentials teaching pros across the country.
              </p>
            </li>
            <li>
              <p
                className="font-display text-granite leading-none"
                style={{ fontSize: "clamp(2.75rem, 6vw, 4.5rem)" }}
              >
                Apr-Oct
              </p>
              <p className="font-mono text-xs uppercase tracking-widest text-silt mt-3">
                Lesson season
              </p>
              <p className="text-granite/80 text-sm mt-2 leading-relaxed">
                The season runs April through October. Pro Shop hours are
                8 AM to dusk, seven days a week.
              </p>
            </li>
            <li>
              <p
                className="font-display text-granite leading-none tabular-nums"
                style={{ fontSize: "clamp(2.75rem, 6vw, 4.5rem)" }}
              >
                18
              </p>
              <p className="font-mono text-xs uppercase tracking-widest text-silt mt-3">
                Holes for after
              </p>
              <p className="text-granite/80 text-sm mt-2 leading-relaxed">
                Eighteen holes a few steps from the range. Add a tee
                time after your lesson and put the work to use the same
                day.
              </p>
            </li>
          </ul>
        </div>
      </section>

      {/* TWO PATHS */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow text-cedar mb-3">Who it&apos;s for</p>
            <h2 className="display-lg font-display mb-5">
              Two paths, same coach.
            </h2>
            <p className="prose-editorial text-granite/85">
              From the Pro Shop&apos;s published instruction copy:{" "}
              <em>get started in golf with the correct fundamentals, or
              work on your existing game to find the missing pieces.</em>{" "}
              The lists below are common topics in each path; the actual
              focus is set on the call with Jeff.
            </p>
          </div>

          {/* Starter path */}
          <div className="grid md:grid-cols-12 gap-8 md:gap-10 mb-12 md:mb-16">
            <div className="md:col-span-4">
              <p className="eyebrow text-tamarack mb-4">Path one</p>
              <h3 className="font-display text-3xl md:text-4xl text-granite leading-tight mb-4">
                Starting in golf.
              </h3>
              <p className="text-granite/85 leading-relaxed mb-6">
                For new players, juniors, and anyone coming back to the
                game after years away. Six fundamentals, in the order they
                build on each other.
              </p>
              <a href="tel:+12506932255" className="btn-ghost text-sm">
                Book a starter session →
              </a>
            </div>
            <ul className="md:col-span-8 grid sm:grid-cols-2 gap-4 md:gap-5">
              {STARTER_FOCUS.map((f) => (
                <li
                  key={f.label}
                  className="border border-granite/15 p-5 bg-paper"
                >
                  <p className="font-display text-lg text-granite mb-1.5 leading-tight">
                    {f.label}
                  </p>
                  <p className="text-sm text-granite/75 leading-relaxed">
                    {f.detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Tune-up path */}
          <div className="grid md:grid-cols-12 gap-8 md:gap-10">
            <div className="md:col-span-4">
              <p className="eyebrow text-tamarack mb-4">Path two</p>
              <h3 className="font-display text-3xl md:text-4xl text-granite leading-tight mb-4">
                Tuning up your game.
              </h3>
              <p className="text-granite/85 leading-relaxed mb-6">
                For the player who already swings the club. Bring a
                specific problem you want to work on; the conversation
                with Jeff sets the focus from there.
              </p>
              <a href="tel:+12506932255" className="btn-ghost text-sm">
                Book a tune-up →
              </a>
            </div>
            <ul className="md:col-span-8 grid sm:grid-cols-2 gap-4 md:gap-5">
              {TUNEUP_FOCUS.map((f) => (
                <li
                  key={f.label}
                  className="border border-granite/15 p-5 bg-paper"
                >
                  <p className="font-display text-lg text-granite mb-1.5 leading-tight">
                    {f.label}
                  </p>
                  <p className="text-sm text-granite/75 leading-relaxed">
                    {f.detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FACILITIES */}
      <section className="py-[var(--spacing-section)] bg-cedar text-paper">
        <div className="container-edge grid gap-10 md:grid-cols-12 items-start">
          <div className="md:col-span-5">
            <p className="eyebrow text-tamarack mb-3">Where lessons happen</p>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(1.75rem, 4.5vw, 2.75rem)",
                lineHeight: "1.05",
                letterSpacing: "-0.01em",
              }}
            >
              Range, facility, course.
            </h2>
            <p className="prose-editorial text-paper/80 mt-5 max-w-md">
              The driving range and practice facility sit beside the Pro
              Shop; the eighteen holes are a few steps away. The actual
              surface for your lesson is set on the call with Jeff.
            </p>
          </div>
          <ul className="md:col-span-7 space-y-5">
            {FACILITIES.map((f) => (
              <li
                key={f.name}
                className="border-l-2 border-tamarack pl-5"
              >
                <p className="font-display text-xl text-paper leading-tight mb-1">
                  {f.name}
                </p>
                <p className="text-paper/80 text-sm leading-relaxed">
                  {f.note}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* HOW TO BOOK */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow text-cedar mb-3">How to book</p>
            <h2 className="display-md font-display mb-5">
              One phone call, one conversation.
            </h2>
            <p className="prose-editorial text-granite/85">
              Lessons aren&apos;t on the online booking system. Jeff likes
              to talk through what you want before you pick a slot, that
              way you don&apos;t pay for a format that doesn&apos;t fit
              your goals.
            </p>
          </div>

          <ol className="grid md:grid-cols-3 gap-5 md:gap-6">
            {BOOKING_STEPS.map((s) => (
              <li
                key={s.n}
                className="border border-granite/15 p-7 bg-paper"
              >
                <p className="font-display text-tamarack tabular-nums leading-none"
                   style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)" }}>
                  {s.n}
                </p>
                <p className="font-display text-xl text-granite mt-5 mb-3 leading-tight">
                  {s.head}
                </p>
                <p className="text-granite/80 text-sm leading-relaxed">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CONTACT, full set: both phones + both emails */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow text-cedar mb-3">Reach Jeff</p>
            <h2 className="display-md font-display leading-tight">
              Two phones, two emails, one Director.
            </h2>
            <p className="prose-editorial text-granite/85 mt-5 max-w-md">
              The Pro Shop line is fastest during business hours; the
              office line works for everything else.
            </p>
          </div>
          <div className="md:col-span-7 grid sm:grid-cols-2 gap-5 md:gap-6">
            <div className="border border-granite/15 p-6">
              <p className="eyebrow text-tamarack mb-3">Pro Shop</p>
              <p className="font-display text-lg text-granite mb-2">
                Bookings &amp; lessons
              </p>
              <ul className="space-y-2 font-mono text-sm">
                <li>
                  <a href="tel:+12506932255" className="text-granite hover:text-amber underline underline-offset-4">
                    250-693-2255
                  </a>
                </li>
                <li>
                  <a href="mailto:proshop@birchbankgolf.com" className="text-granite hover:text-amber underline underline-offset-4 break-all">
                    proshop@birchbankgolf.com
                  </a>
                </li>
              </ul>
            </div>
            <div className="border border-granite/15 p-6">
              <p className="eyebrow text-tamarack mb-3">Office</p>
              <p className="font-display text-lg text-granite mb-2">
                General &amp; admin
              </p>
              <ul className="space-y-2 font-mono text-sm">
                <li>
                  <a href="tel:+12506932366" className="text-granite hover:text-amber underline underline-offset-4">
                    250-693-2366
                  </a>
                </li>
                <li>
                  <a href="mailto:office@birchbankgolf.com" className="text-granite hover:text-amber underline underline-offset-4 break-all">
                    office@birchbankgolf.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow text-cedar mb-3">FAQ</p>
            <h2 className="display-md font-display leading-tight">
              Common questions, honest answers.
            </h2>
            <p className="text-granite/80 mt-5 leading-relaxed max-w-xs">
              Don&apos;t see what you&apos;re asking? Call the Pro Shop;
              the answer&apos;s probably one sentence away.
            </p>
          </div>
          <ul className="md:col-span-8 divide-y divide-granite/15 border-t border-b border-granite/15">
            {FAQ.map((item) => (
              <li key={item.q} className="py-6">
                <p className="font-display text-lg md:text-xl text-granite mb-2 leading-snug">
                  {item.q}
                </p>
                <p className="text-granite/80 leading-relaxed">{item.a}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* RELATED */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge">
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow text-cedar mb-3">Related</p>
            <h2 className="display-md font-display mb-5">
              Around the Pro Shop.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            <Link href="/pro-shop" className="group border border-granite/15 p-7 hover:border-amber transition-colors">
              <p className="eyebrow mb-3">Pro Shop</p>
              <p className="font-display text-xl mb-3 group-hover:text-amber transition-colors">
                Apparel and fittings.
              </p>
              <p className="text-silt text-sm leading-relaxed">
                Titleist, Callaway, Pinnacle, adidas. Demo clubs and
                full-service equipment repair on the same counter.
              </p>
            </Link>
            <Link href="/rates" className="group border border-granite/15 p-7 hover:border-amber transition-colors">
              <p className="eyebrow mb-3">Range pass</p>
              <p className="font-display text-xl mb-3 group-hover:text-amber transition-colors">
                Practice between lessons.
              </p>
              <p className="text-silt text-sm leading-relaxed">
                Season range pass for members, $255 single, $385 family.
                Single-day range use is included with a lesson.
              </p>
            </Link>
            <Link href="/membership" className="group border border-granite/15 p-7 hover:border-amber transition-colors">
              <p className="eyebrow mb-3">Membership</p>
              <p className="font-display text-xl mb-3 group-hover:text-amber transition-colors">
                Play regularly.
              </p>
              <p className="text-silt text-sm leading-relaxed">
                Seven tiers, from Student at $640 to Family at $4,050.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
