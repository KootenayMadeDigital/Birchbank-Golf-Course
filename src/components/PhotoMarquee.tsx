"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Aman-style horizontal drag gallery. Locally-served photographs,
 * optimized through next/image and lazy-loaded below the fold.
 */
const PHOTOS = [
  { src: "/marquee/01.webp", caption: "The course, September light." },
  { src: "/marquee/02.webp", caption: "The Bistro patio." },
  { src: "/marquee/03.webp", caption: "Early morning on the fairway." },
  { src: "/marquee/11.webp", caption: "Mountain green, full sun." },
  { src: "/marquee/04.webp", caption: "Bistro mid-morning." },
  { src: "/marquee/05.webp", caption: "Fairway toward the river." },
  { src: "/marquee/12.webp", caption: "Ball marker on the green." },
  { src: "/marquee/06.webp", caption: "Opening the Bistro." },
  { src: "/marquee/07.webp", caption: "Walking the 18." },
  { src: "/marquee/08.webp", caption: "The covered patio." },
  { src: "/marquee/09.webp", caption: "Course detail." },
  { src: "/marquee/10.webp", caption: "Friday afternoon." },
];

export default function PhotoMarquee() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => setShowHint(el.scrollLeft < 40);
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="py-[var(--spacing-section)]" aria-label="Photographs from Birchbank">
      <div
        ref={scrollerRef}
        className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-6"
        style={{
          scrollbarWidth: "thin",
          paddingInline: "clamp(1.25rem, 4vw, 2.5rem)",
        }}
      >
        {PHOTOS.map((p, i) => (
          <figure
            key={p.src}
            className="flex-none snap-start first:ml-0 last:mr-[clamp(1.25rem,4vw,2.5rem)]"
            style={{ width: "min(84vw, 38rem)" }}
          >
            <div className="relative aspect-[4/5] bg-granite/5 overflow-hidden">
              <Image
                src={p.src}
                alt={p.caption}
                fill
                sizes="(max-width: 768px) 84vw, 38rem"
                className="object-cover"
                loading={i === 0 ? "eager" : "lazy"}
              />
            </div>
            <figcaption className="mt-3 font-mono text-xs text-silt">
              <span className="mr-3">{String(i + 1).padStart(2, "0")} / {String(PHOTOS.length).padStart(2, "0")}</span>
              {p.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      {showHint && (
        <p
          className="container-edge mt-2 text-xs font-mono text-silt flex items-center gap-2 lg:hidden"
          aria-hidden="true"
        >
          <span>← Drag to see more</span>
        </p>
      )}
    </section>
  );
}
