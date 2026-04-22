import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import { GRID_ANNOUNCEMENTS } from "@/data/announcements";

/**
 * 3-up announcement grid — all three cards visible at once, no rotation.
 * Mirrors the information density of the old slideshow without the
 * accessibility and attention-splitting drawbacks of a carousel.
 */
export default function AnnouncementGrid() {
  return (
    <section className="py-[var(--spacing-section)]" aria-labelledby="announcements-heading">
      <div className="container-edge">
        <div className="mb-14 flex items-end justify-between gap-6 flex-wrap">
          <div>
            <p className="eyebrow mb-4">What's on</p>
            <h2 id="announcements-heading" className="display-md font-display text-granite max-w-[18ch]">
              This week at Birchbank.
            </h2>
          </div>
        </div>

        <ScrollReveal stagger className="grid gap-6 md:grid-cols-3">
          {GRID_ANNOUNCEMENTS.map((a) => {
            const external = a.cta.href.startsWith("tel:") || a.cta.href.startsWith("http");
            const Wrapper: React.ElementType = external ? "a" : Link;
            const props = external ? { href: a.cta.href } : { href: a.cta.href as string };
            return (
              <Wrapper
                key={a.title}
                {...props}
                className="group flex flex-col justify-between border border-granite/12 bg-paper p-8 hover:border-amber transition-colors"
              >
                <div>
                  <p className="eyebrow mb-4 text-amber">{a.eyebrow}</p>
                  <p className="font-display text-granite mb-4" style={{ fontSize: "clamp(1.5rem, 2.2vw, 2rem)", lineHeight: 1.1 }}>
                    {a.title}
                  </p>
                  <p className="text-silt text-sm leading-relaxed">{a.body}</p>
                </div>
                <p className="mt-8 text-sm text-amber group-hover:underline">
                  {a.cta.label} →
                </p>
              </Wrapper>
            );
          })}
        </ScrollReveal>
      </div>
    </section>
  );
}
