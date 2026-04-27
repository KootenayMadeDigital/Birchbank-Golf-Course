import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BookButton from "@/components/BookButton";

export const metadata: Metadata = {
  title: "Club history",
  description:
    "The Rossland Trail Country Club was organized April 22, 1922. Roy Stone designed the back nine and clubhouse, opened April 30, 1969 on Reg Stone Appreciation Night. Restored to Stone's original routing June 1, 2018.",
  alternates: { canonical: "/course/history" },
};

/**
 * Birchbank / Rossland Trail Country Club history.
 *
 * Long-form editorial. Every dated fact below is sourced from one or
 * more of the references listed in the Sources block at the bottom of
 * the page; they're listed there so any reader can verify directly.
 *
 * Voice rules (per blueprint § 8 cliché audit): no "pristine",
 * "majestic", "soul of the game", etc. Specificity over superlatives.
 * Names, dates, dollars, yardages, and direct quotes from primary
 * sources are used verbatim, including 1928 newspaper language.
 */

type Chapter = {
  numeral: string;          // big year(s)
  eyebrow: string;          // "Chapter I · The opening"
  headline: string;         // editorial title
  body: React.ReactNode;
  pull?: { quote: string; cite: string };
};

const CHAPTERS: Chapter[] = [
  {
    numeral: "1922",
    eyebrow: "Chapter I · The opening",
    headline: "Eighty-one shareholders. Fifty-six played.",
    body: (
      <>
        <p>
          The Rossland Trail Country Club was organized on April 22, 1922 with
          S.G. Blaylock as its first president. The first course was on Floyd
          Ranch, the Water Hole, just above Warfield, on land
          loaned by the Consolidated Mining &amp; Smelting Company at $1 a year.
        </p>
        <p>
          The first clubhouse opened that July with afternoon tea and an
          evening dance. The club's first tournament was held September 16,
          1922; entry fee fifty cents.
        </p>
      </>
    ),
  },
  {
    numeral: "1928",
    eyebrow: "Chapter II · Up the hill",
    headline: "A new course, a valley, a log clubhouse.",
    body: (
      <>
        <p>
          A new site was selected in 1927 on the former Endersby Ranch,
          purchased by Cominco and leased to the club. Construction of the new
          log clubhouse cost roughly $8,000. The course measured 2,300 yards
          across nine holes.
        </p>
        <p>
          The clubhouse and course opened together on May 5, 1928. The
          building has been in active use since, in 2010 it was
          formally recognized as a heritage place by the City of Rossland; the
          Canadian Register of Historic Places added it in January 2024 with
          the simple line that it is, today, the oldest remaining golf
          clubhouse in the entire Kootenay region.
        </p>
      </>
    ),
    pull: {
      quote:
        "Over two hundred were present on this occasion and the picturesque setting which the new clubhouse occupies in the valley.",
      cite: "The Rossland Miner, May 1928",
    },
  },
  {
    numeral: "1937-1979",
    eyebrow: "Chapter III · The Stones",
    headline: "Two brothers from Sardis built the West Kootenay golf scene.",
    body: (
      <>
        <p>
          Roy Stone arrived in Trail in the late 1930s, transferring with the
          4X Bakery. His brother Reg followed on May 3, 1939, having sold his
          own bakery to McGavins. Reg had been club champion at sixteen, set a
          course record of thirty-two in 1931, and lost the 1937 Fraser Valley
          Amateur final to &ldquo;Buck&rdquo; Berry on the 45th hole.
        </p>
        <p>
          Reg became Rossland-Trail&rsquo;s first club professional. In 1946
          the brothers founded the Rossland-Trail Open and inaugurated the
          first Pro-Am in the Kootenays. In 1949 Reg moved over to the City of
          Trail&rsquo;s Parks &amp; Recreation Board as superintendent; Roy
          succeeded him as the club&rsquo;s pro and greenskeeper, a role he
          held until his retirement in 1978. Reg retired the following year.
        </p>
        <p>
          Reg&rsquo;s wife Ruby Stone won more than twenty championships in
          Kootenay women&rsquo;s competition over two decades.
        </p>
      </>
    ),
    pull: {
      quote:
        "We&rsquo;d walk with clubs in hand, hitting shots through fields and down the streets.",
      cite: "Roy Stone, on growing up in Sardis",
    },
  },
  {
    numeral: "1962-69",
    eyebrow: "Chapter IV · Down to the river",
    headline: "Roy designs the back nine and a clubhouse.",
    body: (
      <>
        <p>
          By the early 1960s the membership had outgrown nine holes in
          Rossland. Construction of the Birchbank course began in 1962 on
          Cominco-leased property along the west bank of the Columbia, between
          Trail and Castlegar. The first nine holes opened in 1964.
        </p>
        <p>
          Roy designed the back nine and the new clubhouse himself, with
          assistance from Peter McIntyre. The work expanded Rossland-Trail to
          twenty-seven holes during construction and finished in the spring of
          1969.
        </p>
      </>
    ),
    pull: {
      quote:
        "April 30, 1969, Reg Stone Appreciation Night. Thirty years.",
      cite: "Birchbank back-nine grand opening",
    },
  },
  {
    numeral: "2004",
    eyebrow: "Chapter V · The handover",
    headline: "First time the people who played it owned it.",
    body: (
      <>
        <p>
          For more than four decades the property had belonged to Cominco. In
          2004 the Rossland-Trail Country Club purchased the Birchbank
          property outright, the first time the course was owned by
          its members.
        </p>
      </>
    ),
  },
  {
    numeral: "2006-2018",
    eyebrow: "Chapter VI · Stone&rsquo;s routing, restored",
    headline:
      "Rossland closes. Birchbank returns to the way Roy built it.",
    body: (
      <>
        <p>
          In 2006 Cominco sold the Rossland land. The original nine-hole
          course closed; the heritage clubhouse on Endersby Ranch is preserved
          as part of what became Redstone Resort. The club consolidated at
          Birchbank.
        </p>
        <p>
          On June 1, 2018 the course was reconfigured to resemble Roy
          Stone&rsquo;s original 1969 routing. The work also delivered
          rebuilt greens, relocated holes, new bunkers and tees, and the
          irrigation ponds now in play on holes 12 and 15.
        </p>
        <p>
          The course you walk today is the one Roy laid out, on land
          Cominco loaned, owned by the people who play it.
        </p>
      </>
    ),
  },
];

const TIMELINE: Array<[string, string]> = [
  ["April 22, 1922", "Rossland Trail Country Club organized; 81 shareholders, 56 playing members."],
  ["July 1922", "First clubhouse opens with afternoon tea and an evening dance."],
  ["Sept 16, 1922", "First club tournament. Entry fee: 50¢."],
  ["May 5, 1928", "New nine-hole Rossland course + log clubhouse open on the former Endersby Ranch."],
  ["1939", "Reg Stone arrives in Trail (May 3); becomes Rossland-Trail's first club professional."],
  ["1946", "The Stones found the Rossland-Trail Open and the first Pro-Am in the Kootenays."],
  ["1949", "Reg moves to Trail Parks & Rec; Roy Stone takes over as pro and greenskeeper."],
  ["1962", "Construction of Birchbank begins on Cominco-leased land along the Columbia River."],
  ["1964", "First nine holes at Birchbank open."],
  ["April 30, 1969", "Roy Stone's back nine + clubhouse open. The night is dedicated to Reg Stone."],
  ["1978", "Roy Stone retires after 29 years as pro/greenskeeper."],
  ["1979", "Reg Stone retires from the City of Trail."],
  ["2004", "RTCC purchases Birchbank from Cominco, the first member-owned chapter."],
  ["2006", "Cominco sells the Rossland land; the original nine-hole course closes."],
  ["June 1, 2018", "Birchbank reconfigured to resemble Roy Stone's original 1969 routing."],
  ["2024", "1928 Rossland clubhouse formally listed on Canadian Register of Historic Places."],
];

const SOURCES: Array<{ label: string; href: string }> = [
  { label: "Rossland Museum & Discovery Centre · Rossland Trail Country Club", href: "https://www.rosslandmuseum.ca/golf-course" },
  { label: "BC Golf House · The Stones of Trail (March 23, 2017)", href: "https://www.bcgolfhouse.com/the-stones-of-trail" },
  { label: "Canadian Register of Historic Places · Rossland Trail Golf Clubhouse", href: "https://www.historicplaces.ca/en/rep-reg/place-lieu.aspx?id=24115" },
  { label: "Heritage Rossland · Rossland Trail Clubhouse Statement of Significance (2021)", href: "https://heritagerossland.com/Portals/0/2021%20Rossland%20Trail%20Clubhouse%20SOS%20and%20History.pdf" },
];

export default function HistoryPage() {
  return (
    <>
      {/* HERO ─ minimal, one anchor line */}
      <section className="pt-40 pb-20 md:pb-28 bg-paper">
        <div className="container-edge">
          <p className="eyebrow mb-8 text-cedar">
            Rossland Trail Country Club · Est. 1922
          </p>
          <h1
            className="font-display text-granite max-w-[22ch]"
            style={{
              fontSize: "clamp(2.5rem, 6.5vw, 5.5rem)",
              lineHeight: "1.02",
              letterSpacing: "-0.018em",
            }}
          >
            Designed by the Stones.<br />
            Restored by the people<br />
            who play it.
          </h1>
          <p
            className="prose-editorial text-granite/85 mt-10 max-w-2xl"
            style={{ fontSize: "clamp(1.125rem, 1.4vw + 0.7rem, 1.375rem)" }}
          >
            One hundred and four years on the same patch of the Kootenays.
            Two clubhouses, two brothers, one river. The course you walk
            today is the routing Roy Stone laid out in 1969.
          </p>
        </div>
      </section>

      <div className="container-edge"><div className="rule-hair" /></div>

      {/* CHAPTERS ─ each is a numbered editorial block */}
      {CHAPTERS.map((c, i) => (
        <section
          key={i}
          className={`py-[var(--spacing-section)] ${i % 2 === 1 ? "bg-paper" : "bg-paper"}`}
        >
          <div className="container-edge grid gap-10 md:gap-12 md:grid-cols-12">
            {/* Year numeral column */}
            <div className="md:col-span-4 lg:col-span-3">
              <p className="eyebrow text-tamarack mb-4">{c.eyebrow}</p>
              <p
                className="font-display text-granite tabular-nums leading-[0.9]"
                style={{
                  fontSize: "clamp(3.5rem, 8.5vw, 7rem)",
                  letterSpacing: "-0.03em",
                }}
              >
                {c.numeral}
              </p>
            </div>

            {/* Editorial column */}
            <div className="md:col-span-8 lg:col-span-9 md:pt-2">
              <h2
                className="font-display text-granite max-w-[24ch] mb-7"
                style={{
                  fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                  lineHeight: "1.08",
                  letterSpacing: "-0.012em",
                }}
                dangerouslySetInnerHTML={{ __html: c.headline.replace(/&rsquo;/g, "&rsquo;") }}
              />
              <div className="prose-editorial text-granite/85 max-w-2xl space-y-5">
                {c.body}
              </div>

              {c.pull && (
                <figure className="mt-10 max-w-2xl border-l-2 border-tamarack pl-6 md:pl-8">
                  <blockquote
                    className="font-display text-granite italic"
                    style={{
                      fontSize: "clamp(1.25rem, 1.8vw + 0.5rem, 1.625rem)",
                      lineHeight: "1.35",
                    }}
                  >
                    &ldquo;{<span dangerouslySetInnerHTML={{ __html: c.pull.quote }} />}&rdquo;
                  </blockquote>
                  <figcaption className="mt-3 font-mono text-xs uppercase tracking-widest text-silt">
                    {c.pull.cite}
                  </figcaption>
                </figure>
              )}

              {/* Heritage callout, only on Chapter II (1928) */}
              {c.numeral === "1928" && (
                <aside className="mt-10 max-w-2xl border border-tamarack/40 bg-paper p-6 md:p-7">
                  <p className="eyebrow text-tamarack mb-2">
                    Heritage Designation
                  </p>
                  <p className="font-display text-xl text-granite leading-snug mb-2">
                    Rossland Trail Golf Clubhouse · 953 Redstone Drive
                  </p>
                  <p className="text-sm text-granite/80 leading-relaxed">
                    Horizontal log walls, saddle-notched corners, a field-stone
                    chimney, cedar shake roof. Recognized as a heritage place
                    by the City of Rossland in June 2010 and listed on the
                    Canadian Register of Historic Places in January 2024.
                  </p>
                </aside>
              )}
            </div>
          </div>
        </section>
      ))}

      {/* CTA bridge, heritage to today */}
      <section className="py-[var(--spacing-section)] bg-cedar text-paper">
        <div className="container-edge max-w-3xl">
          <p className="eyebrow text-paper/60 mb-5">Today</p>
          <p
            className="font-display text-paper mb-10"
            style={{
              fontSize: "clamp(1.75rem, 3.5vw, 3rem)",
              lineHeight: "1.08",
              letterSpacing: "-0.01em",
            }}
          >
            Play Roy Stone&rsquo;s course as he built it. Walk the same banks
            of the Columbia. The Bistro is at the 18th green when you finish.
          </p>
          <div className="flex flex-wrap gap-4">
            <BookButton />
            <Link
              href="/course"
              className="inline-flex items-center gap-2 px-5 py-3 border border-paper/40 text-paper hover:border-paper hover:bg-paper/5 transition-colors text-sm font-mono uppercase tracking-widest"
            >
              The course →
            </Link>
          </div>
        </div>
      </section>

      {/* TIMELINE ─ full chronology */}
      <section className="py-[var(--spacing-section)] bg-granite text-paper">
        <div className="container-edge grid gap-12 md:grid-cols-12 items-start">
          <div className="md:col-span-4">
            <p className="eyebrow text-paper/60 mb-5">Timeline</p>
            <p className="display-lg font-display text-paper">
              A century, in dates.
            </p>
            <p className="mt-5 text-paper/70 text-sm leading-relaxed max-w-xs">
              Sixteen entries from the founding to the most recent heritage
              listing. Every date is sourced; see the Sources panel below.
            </p>
          </div>
          <div className="md:col-span-8">
            <ul className="divide-y divide-paper/15">
              {TIMELINE.map(([when, what]) => (
                <li key={when} className="grid grid-cols-12 gap-4 py-5">
                  <span className="col-span-12 md:col-span-4 font-mono text-xs md:text-sm uppercase tracking-widest text-tamarack">
                    {when}
                  </span>
                  <span className="col-span-12 md:col-span-8 text-paper/85 text-sm md:text-base leading-relaxed">
                    {what}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ARCHIVE ─ photos */}
      <section className="py-[var(--spacing-section)] bg-paper">
        <div className="container-edge">
          <p className="eyebrow text-cedar mb-3">From the archive</p>
          <h2 className="display-md font-display text-granite max-w-[22ch] mb-12">
            Three photographs the club has kept.
          </h2>

          <div className="grid gap-8 md:gap-10 md:grid-cols-3">
            <figure>
              <div className="aspect-[4/5] bg-granite/5 relative overflow-hidden">
                <Image
                  src="https://www.birchbankgolf.com/wp-content/uploads/2019/02/samfarming.jpg"
                  alt="W.S. Harrison at the reins of a horse-drawn hay rake on the farmland that became the Birchbank course"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-4 text-sm text-granite/80 leading-relaxed">
                <span className="block font-mono text-xs uppercase tracking-widest text-tamarack mb-1">
                  Pre-1962
                </span>
                W.S. Harrison and a horse-drawn hay rake on the farmland that
                later became the Birchbank course.
              </figcaption>
            </figure>

            <figure>
              <div className="aspect-[4/5] bg-granite/5 relative overflow-hidden">
                <Image
                  src="https://www.birchbankgolf.com/wp-content/uploads/2019/02/1948hole1.jpg"
                  alt="Rossland course clubhouse and first tee, circa 1948"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-4 text-sm text-granite/80 leading-relaxed">
                <span className="block font-mono text-xs uppercase tracking-widest text-tamarack mb-1">
                  c. 1948
                </span>
                The Rossland clubhouse and first tee, two decades after it
                opened. The Stones were both at the club by this point.
              </figcaption>
            </figure>

            <figure>
              <div className="aspect-[4/5] bg-granite/5 relative overflow-hidden">
                <Image
                  src="https://www.birchbankgolf.com/wp-content/uploads/2019/02/roystone2.jpg"
                  alt="Roy Stone, CPGA, course designer and longtime Rossland-Trail Country Club professional"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-4 text-sm text-granite/80 leading-relaxed">
                <span className="block font-mono text-xs uppercase tracking-widest text-tamarack mb-1">
                  Roy Stone
                </span>
                Pro and greenskeeper 1949–1978. Designer of the Birchbank
                back nine and clubhouse.
              </figcaption>
            </figure>
          </div>

          <p className="mt-10 text-xs font-mono text-silt">
            Archival photographs from the club archives.
          </p>
        </div>
      </section>

      {/* SOURCES ─ verifiable references */}
      <section className="py-[var(--spacing-section)] bg-paper border-t border-granite/10">
        <div className="container-edge">
          <p className="eyebrow text-cedar mb-5">Sources</p>
          <p className="font-display text-2xl text-granite max-w-2xl mb-8 leading-snug">
            Every date and quote on this page is verifiable. Here&rsquo;s
            where to verify it.
          </p>
          <ul className="space-y-3 max-w-3xl text-sm md:text-base">
            {SOURCES.map((s) => (
              <li key={s.href} className="flex gap-3">
                <span className="font-mono text-xs uppercase tracking-widest text-silt mt-1.5 shrink-0">
                  ↗
                </span>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener"
                  className="link-editorial text-granite hover:text-tamarack"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
