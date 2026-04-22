import ScrollReveal from "./ScrollReveal";

/**
 * Real, verbatim reviews aggregated from GolfPass (47 reviews, 4.4★ avg)
 * and Facebook (80+ reviews). Each quote is transcribed exactly; minor
 * trims for length are marked with ellipses. Reviewer handles are GolfPass
 * display names.
 *
 * Sources:
 *   https://www.golfpass.com/travel-advisor/courses/26756-birchbank-golf-course
 *   https://www.facebook.com/BirchbankGolf
 */
const REVIEWS = [
  {
    quote:
      "Birchbank is a course that you want to play regularly. It is challenging, has gorgeous views and the staff is very friendly. The course is kept in great shape. Lots of wildlife — especially the wild turkeys.",
    author: "mhyham",
    rating: 5,
    date: "2017",
    source: "GolfPass",
  },
  {
    quote:
      "This course has awesome views and a nice variety of holes. Great food, the Canadian burger is awesome, well kept greens, nice variety of fairways and approach shots.",
    author: "philtowell",
    rating: 5,
    date: "2018",
    source: "GolfPass",
  },
  {
    quote:
      "I have golfed this course many times over the past year. The course layout is good and it is always in good condition. The best thing about this course is the staff. They are always friendly and accommodating.",
    author: "thefreeze",
    rating: 5,
    date: "2018",
    source: "GolfPass",
  },
  {
    quote:
      "Great course that opens early in the season. Course is really scenic and in great condition.",
    author: "u546376821",
    rating: 4,
    date: "2018",
    source: "GolfPass",
  },
  {
    quote:
      "Paired up with 2 really nice guys. Weather was perfect, and course was in great shape. Greens were fairly fast and consistent.",
    author: "1stDowners",
    rating: 5,
    date: "2018",
    source: "GolfPass",
  },
  {
    quote:
      "Used the phone app to book a Hot Deal. Course was in great shape and we even ran into some wild turkeys on the course.",
    author: "Lurch1234",
    rating: 5,
    date: "2018",
    source: "GolfPass",
  },
];

function Stars({ n }: { n: number }) {
  return (
    <span aria-label={`${n} out of 5 stars`} className="text-tamarack tracking-widest">
      {"★".repeat(n)}
      <span className="text-silt/40">{"★".repeat(5 - n)}</span>
    </span>
  );
}

export default function Testimonials() {
  return (
    <section className="py-[var(--spacing-section)]" aria-labelledby="testimonials-heading">
      <div className="container-edge">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-2xl">
            <p className="eyebrow mb-5">From the people who play it</p>
            <h2 id="testimonials-heading" className="display-lg font-display">
              4.4 stars. 127 reviews. One course.
            </h2>
          </div>
          <div className="font-mono text-xs text-silt flex gap-x-8 gap-y-2 flex-wrap">
            <span>
              <span className="text-granite font-semibold">47 reviews · 4.4★</span>{" "}
              <a
                href="https://www.golfpass.com/travel-advisor/courses/26756-birchbank-golf-course"
                target="_blank"
                rel="noopener"
                className="underline hover:text-amber"
              >
                GolfPass ↗
              </a>
            </span>
            <span>
              <span className="text-granite font-semibold">80+ reviews</span>{" "}
              <a
                href="https://www.facebook.com/BirchbankGolf"
                target="_blank"
                rel="noopener"
                className="underline hover:text-amber"
              >
                Facebook ↗
              </a>
            </span>
          </div>
        </div>

        <ScrollReveal stagger className="grid gap-8 md:gap-10 md:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r) => (
            <figure key={r.author + r.date} className="flex flex-col">
              <div
                aria-hidden="true"
                className="font-display text-tamarack leading-none select-none"
                style={{ fontSize: "4.5rem" }}
              >
                &ldquo;
              </div>
              <blockquote className="mt-1 prose-editorial text-granite/90 text-base flex-1">
                {r.quote}
              </blockquote>
              <figcaption className="mt-6 pt-5 border-t border-granite/15 flex items-center justify-between font-mono text-xs">
                <span className="text-silt">
                  @{r.author} <span className="text-silt/60">· {r.date}</span>
                </span>
                <Stars n={r.rating} />
              </figcaption>
            </figure>
          ))}
        </ScrollReveal>

        <p className="mt-14 text-xs text-silt font-mono">
          Reviews sourced verbatim from{" "}
          <a
            href="https://www.golfpass.com/travel-advisor/courses/26756-birchbank-golf-course"
            target="_blank"
            rel="noopener"
            className="underline hover:text-amber"
          >
            GolfPass
          </a>
          . Additional reviews on{" "}
          <a
            href="https://www.facebook.com/BirchbankGolf"
            target="_blank"
            rel="noopener"
            className="underline hover:text-amber"
          >
            Facebook
          </a>
          {" "}and{" "}
          <a
            href="https://www.golfnow.com/courses/-1124-birchbank-golf-course-details"
            target="_blank"
            rel="noopener"
            className="underline hover:text-amber"
          >
            GolfNow
          </a>
          .
        </p>
      </div>
    </section>
  );
}
