import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Retirees Club",
  description: "The Birchbank Retirees Club plays every Thursday morning April through October. Open to retired players, a Birchbank Golf Course membership is not required.",
  alternates: { canonical: "/membership/retirees-club" },
};

// Verified from https://www.birchbankgolf.com/retirees-club/
const SCHEDULE = [
  { month: "April", time: "9:30 – 11:30 AM" },
  { month: "May", time: "9:00 – 11:00 AM" },
  { month: "June", time: "8:30 – 10:30 AM" },
  { month: "July & August", time: "8:00 – 10:00 AM" },
];

export default function RetireesClub() {
  return (
    <section className="pt-40 pb-[var(--spacing-section)] container-edge">
      <p className="eyebrow mb-6">Retirees Club</p>
      <h1 className="display-xl max-w-[18ch] mb-10">
        Thursday mornings, April through October.
      </h1>

      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-7 prose-editorial text-granite/85 space-y-6">
          <p>
            Membership in the Retirees Club is open to players who have retired, it does
            not require a Birchbank Golf Course membership. The club plays every Thursday
            morning from April to October with a two-hour reserved block of tee times.
          </p>
          <p>
            Each month there is also a shotgun tournament followed by brunch and a prize
            ceremony. The membership fee supports individual and team prizes for the
            weekly events.
          </p>
          <p>
            A sign-up sheet is posted on the Retirees Bulletin Board from Thursday
            mornings through Sunday mornings. After that window, members must sign up
            through the Pro Shop.
          </p>

          <div className="pt-4 space-y-1 font-mono text-sm">
            <p>
              <span className="text-silt">Email</span>{" "}
              <a href="mailto:birchbankretirees@gmail.com" className="underline hover:text-amber">
                birchbankretirees@gmail.com
              </a>
            </p>
            <p>
              <span className="text-silt">Blog</span>{" "}
              <a
                href="https://birchbankretireesclub.blogspot.com"
                target="_blank"
                rel="noopener"
                className="underline hover:text-amber"
              >
                birchbankretireesclub.blogspot.com ↗
              </a>
            </p>
          </div>

          <Link href="/contact" className="btn-primary mt-4">Contact the club</Link>
        </div>

        <aside className="md:col-span-5 md:sticky md:top-28 md:self-start">
          <div className="border border-granite/15 p-6 font-mono text-sm">
            <p className="eyebrow mb-4">Weekly tee block</p>
            <dl className="space-y-3">
              {SCHEDULE.map((s) => (
                <div key={s.month} className="flex justify-between">
                  <dt className="text-silt">{s.month}</dt>
                  <dd>{s.time}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 pt-4 border-t border-granite/10 text-xs text-silt">
              Thursday mornings · 2-hour reserved tee block
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
