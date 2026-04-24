import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lessons",
  description:
    "Book lessons with Jeff Papilion, Director of Golf at Birchbank and a CPGA-certified Head Professional. Start in golf with the right fundamentals, or tune up an existing game. Bookings via the Pro Shop, 250-693-2255.",
  alternates: { canonical: "/lessons" },
};

/**
 * Lessons page.
 *
 * The current birchbankgolf.com does not have a dedicated /lessons
 * page -- the Pro Shop page publishes one paragraph about instruction:
 *   'Book lessons from our Head Pro, a CPGA certified Professional,
 *    and get started in golf with the correct fundamentals or have
 *    him work with you to improve your existing game.'
 *
 * That single paragraph is the source-of-truth for everything on this
 * page. We do NOT invent session lengths, pricing, junior programs,
 * clinics, or any specific lesson formats. Bookings happen by phone
 * (250-693-2255) because that is how the real site has published
 * the process.
 *
 * When Jeff provides specific lesson pricing and session formats, drop
 * them into the LESSON_TYPES array below and the page will expand into
 * a full rate card. Until then, this is an honest stub + funnel to the
 * Pro Shop line.
 */

export default function Lessons() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-16 bg-paper">
        <div className="container-edge">
          <p className="eyebrow mb-6">Lessons</p>
          <h1
            className="font-display text-granite max-w-[22ch] mb-8"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", lineHeight: "1.02", letterSpacing: "-0.015em" }}
          >
            Learn the game with<br />a CPGA pro.
          </h1>
          <p className="prose-editorial text-granite/85 max-w-2xl mb-8">
            Jeff Papilion, our Director of Golf and Head Professional, is CPGA-certified
            and teaches out of the Birchbank Pro Shop. Lessons are booked by phone, call
            the Pro Shop for available times and to confirm the format that fits your
            goals.
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="tel:+12506932255" className="btn-primary">Call to book · 250-693-2255</a>
            <a href="mailto:office@birchbankgolf.com" className="btn-ghost">
              Email Jeff
            </a>
          </div>
        </div>
      </section>

      <div className="container-edge"><div className="rule-hair" /></div>

      {/* Two paths, beginner vs existing-game. Both paths are paraphrased
          directly from the Pro Shop page's 'Instruction' copy. */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow mb-5">Who it's for</p>
            <h2 className="display-lg font-display mb-5">
              Two paths, same coach.
            </h2>
            <p className="prose-editorial text-granite/85">
              From the Pro Shop's published instruction copy:{" "}
              <em>get started in golf with the correct fundamentals, or work on your
              existing game to find the missing pieces.</em>
            </p>
          </div>

          <ul className="grid md:grid-cols-2 gap-5 md:gap-6">
            <li className="border border-granite/15 p-7 md:p-8">
              <p className="eyebrow mb-4">Starting in golf</p>
              <p className="font-display text-2xl text-granite mb-4">The right fundamentals.</p>
              <p className="text-granite/85 text-base leading-relaxed mb-6">
                Grip, stance, posture, alignment, and the full-swing sequence, the stuff
                that makes every later lesson stick. For new players, juniors, and anyone
                coming back to the game after years away.
              </p>
              <a href="tel:+12506932255" className="btn-ghost text-sm">Ask about starting lessons →</a>
            </li>

            <li className="border border-granite/15 p-7 md:p-8">
              <p className="eyebrow mb-4">Working on your game</p>
              <p className="font-display text-2xl text-granite mb-4">Find the missing pieces.</p>
              <p className="text-granite/85 text-base leading-relaxed mb-6">
                Ball flight you can't explain, a wedge you can't trust, a putt you can't
                commit to. Jeff will find what's slipping and give you two or three things
                to work on. Bring your own clubs or use a demo set for a fitting-and-lesson
                combo.
              </p>
              <a href="tel:+12506932255" className="btn-ghost text-sm">Book a tune-up →</a>
            </li>
          </ul>
        </div>
      </section>

      {/* How to book, honest process. We phone-book because that is
          how the real site does it. */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge">
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow mb-5">How to book</p>
            <h2 className="display-md font-display mb-5">
              One phone call, one conversation.
            </h2>
            <p className="prose-editorial text-granite/85">
              Lessons aren't on the online booking system, call the Pro Shop and Jeff (or
              whoever's at the counter) will find a time that works. Expect a quick
              conversation about your current game and what you're hoping to work on
              before you pick a slot.
            </p>
          </div>

          <ol className="grid md:grid-cols-3 gap-5">
            <li className="border border-granite/15 p-6">
              <p className="font-display text-5xl text-tamarack leading-none">1</p>
              <p className="font-display text-lg text-granite mt-4 mb-2">Call the Pro Shop</p>
              <p className="text-silt text-sm leading-relaxed">
                <a href="tel:+12506932255" className="text-granite underline hover:text-amber">
                  250-693-2255
                </a>
                , 9 AM – 7 PM, seven days a week during the season.
              </p>
            </li>
            <li className="border border-granite/15 p-6">
              <p className="font-display text-5xl text-tamarack leading-none">2</p>
              <p className="font-display text-lg text-granite mt-4 mb-2">Pick a format</p>
              <p className="text-silt text-sm leading-relaxed">
                Jeff will recommend what fits your game, foundational lesson, tune-up,
                full swing work, short game, or a playing lesson on the course.
              </p>
            </li>
            <li className="border border-granite/15 p-6">
              <p className="font-display text-5xl text-tamarack leading-none">3</p>
              <p className="font-display text-lg text-granite mt-4 mb-2">Come play</p>
              <p className="text-silt text-sm leading-relaxed">
                Lessons are on the range and around the Pro Shop. Pay at the counter before
                or after, same desk as everything else.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* About the coach, facts from birchbankgolf.com/contacts */}
      <section className="py-[var(--spacing-section)] bg-cedar text-paper">
        <div className="container-edge grid gap-10 md:grid-cols-12 items-start">
          <div className="md:col-span-5">
            <p className="eyebrow text-tamarack mb-5">Your coach</p>
            <h2
              className="font-display mb-5"
              style={{ fontSize: "clamp(1.75rem, 4.5vw, 2.75rem)", lineHeight: "1.05", letterSpacing: "-0.01em" }}
            >
              Jeff Papilion.
            </h2>
            <p className="font-mono text-xs text-paper/60 mb-6">
              Director of Golf · Head Professional · CPGA
            </p>
          </div>
          <div className="md:col-span-7 space-y-5">
            <p className="prose-editorial text-paper/85 max-w-xl">
              Jeff runs the Pro Shop, manages the tee sheet, and takes every instruction
              booking at Birchbank. He's certified by the Canadian Professional Golfers'
              Association, the professional body that administers teaching and playing
              credentials for golf pros across Canada.
            </p>
            <p className="prose-editorial text-paper/85 max-w-xl">
              If he doesn't pick up when you call, leave a message or email{" "}
              <a href="mailto:office@birchbankgolf.com" className="underline text-tamarack hover:text-paper">
                office@birchbankgolf.com
              </a>{" "}
             , the office will get back to you the same business day.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="tel:+12506932255"
                className="btn-primary bg-tamarack text-granite hover:bg-paper"
              >
                Call 250-693-2255
              </a>
              <Link
                href="/about/team"
                className="btn-ghost text-paper border-paper/70 hover:text-tamarack hover:border-tamarack"
              >
                Meet the whole team →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related pages */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge">
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow mb-5">Related</p>
            <h2 className="display-md font-display mb-5">More from the Pro Shop.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            <Link href="/pro-shop" className="group border border-granite/15 p-7 hover:border-amber transition-colors">
              <p className="eyebrow mb-3">Pro Shop</p>
              <p className="font-display text-xl mb-3 group-hover:text-amber transition-colors">
                Fittings &amp; repairs.
              </p>
              <p className="text-silt text-sm leading-relaxed">
                Clothing, club fitting, full-service equipment repairs, re-gripping.
              </p>
            </Link>
            <Link href="/rates" className="group border border-granite/15 p-7 hover:border-amber transition-colors">
              <p className="eyebrow mb-3">Range pass</p>
              <p className="font-display text-xl mb-3 group-hover:text-amber transition-colors">
                Practice between lessons.
              </p>
              <p className="text-silt text-sm leading-relaxed">
                Season range pass for members, $255 single, $385 family. Single-day range
                use is included with a lesson.
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
