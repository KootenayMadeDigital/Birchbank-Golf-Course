import ScrollReveal from "./ScrollReveal";

/**
 * Three verbatim 5-star reviews pulled from GolfPass's Birchbank listing:
 *   https://www.golfpass.com/travel-advisor/courses/26756-birchbank-golf-course
 * Quoted exactly. Reviewer handles are the GolfPass display names.
 */
const REVIEWS = [
  {
    quote:
      "Birchbank is a course that you want to play regularly. It is challenging, has gorgeous views and the staff is very friendly. The course is kept in great shape.",
    author: "mhyham",
    rating: 5,
  },
  {
    quote:
      "This course has awesome views and a nice variety of holes. Great food, the canadian burger is awesome, well kept greens, nice variety of fairways and approach shots.",
    author: "philtowell",
    rating: 5,
  },
  {
    quote:
      "I have golfed this course many times over the past year. The course layout is good and it is always in good condition. It is not the most challenging course in the area but has an intermediate degree of difficulty. The best thing about this course is the staff. They are always friendly and accommodating.",
    author: "thefreeze",
    rating: 5,
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
        <div className="mb-16 max-w-2xl">
          <p className="eyebrow mb-5">From the people who play it</p>
          <h2 id="testimonials-heading" className="display-lg font-display">
            Eighty-plus five-star reviews.
          </h2>
        </div>

        <ScrollReveal stagger className="grid gap-8 md:gap-12 md:grid-cols-3">
          {REVIEWS.map((r) => (
            <figure key={r.author} className="flex flex-col">
              <div
                aria-hidden="true"
                className="font-display text-tamarack leading-none select-none"
                style={{ fontSize: "5rem" }}
              >
                &ldquo;
              </div>
              <blockquote className="mt-2 prose-editorial text-granite/90 text-base md:text-lg flex-1">
                {r.quote}
              </blockquote>
              <figcaption className="mt-6 pt-6 border-t border-granite/15 flex items-center justify-between font-mono text-xs">
                <span className="text-silt">@{r.author}</span>
                <Stars n={r.rating} />
              </figcaption>
            </figure>
          ))}
        </ScrollReveal>

        <p className="mt-12 text-xs text-silt font-mono">
          Reviews from{" "}
          <a
            href="https://www.golfpass.com/travel-advisor/courses/26756-birchbank-golf-course"
            target="_blank"
            rel="noopener"
            className="underline hover:text-amber"
          >
            GolfPass
          </a>
          . Birchbank is also rated on{" "}
          <a
            href="https://www.facebook.com/BirchbankGolf"
            target="_blank"
            rel="noopener"
            className="underline hover:text-amber"
          >
            Facebook
          </a>
          {" "}with 80+ reviews.
        </p>
      </div>
    </section>
  );
}
