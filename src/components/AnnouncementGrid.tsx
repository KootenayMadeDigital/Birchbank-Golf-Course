import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import { GRID_ANNOUNCEMENTS } from "@/data/announcements";

/**
 * 3-up announcement grid — all three cards visible at once, no rotation.
 * Cards may carry an optional `image` for cards whose message benefits from
 * a photograph (e.g. the Bistro). We only attach real, attributable images;
 * typography-only is the default.
 */
export default function AnnouncementGrid() {
  return (
    <section className="py-[var(--spacing-section)]" aria-labelledby="announcements-heading">
      <div className="container-edge">
        <div className="mb-14 flex items-end justify-between gap-6 flex-wrap">
          <div>
            <p className="eyebrow mb-4">What's on</p>
            <h2 id="announcements-heading" className="display-md font-display text-granite max-w-[22ch]">
              Three things to know before you come up.
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
                className="group flex flex-col overflow-hidden border border-granite/12 bg-paper hover:border-amber transition-colors"
              >
                {a.image && (
                  <div className="relative aspect-[4/3] bg-granite/5 overflow-hidden">
                    <Image
                      src={a.image.src}
                      alt={a.image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      unoptimized
                    />
                  </div>
                )}
                <div className="flex flex-col justify-between flex-1 p-8">
                  <div>
                    <p className="eyebrow mb-4 text-amber">{a.eyebrow}</p>
                    <p
                      className="font-display text-granite mb-4"
                      style={{ fontSize: "clamp(1.5rem, 2.2vw, 2rem)", lineHeight: 1.1 }}
                    >
                      {a.title}
                    </p>
                    <p className="text-silt text-sm leading-relaxed">{a.body}</p>
                  </div>
                  <p className="mt-8 text-sm text-amber group-hover:underline">
                    {a.cta.label} →
                  </p>
                </div>
              </Wrapper>
            );
          })}
        </ScrollReveal>
      </div>
    </section>
  );
}
