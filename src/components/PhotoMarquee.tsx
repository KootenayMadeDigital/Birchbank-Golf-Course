"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Aman-style horizontal drag gallery. Real Bistro/course photos from
 * birchbankgolf.com's media library — unchanged URLs, lazy-loaded via next/image.
 */
const PHOTOS = [
  { src: "https://www.birchbankgolf.com/wp-content/uploads/2021/01/Photo-Sep-09-9-43-20-AM.jpg", caption: "The patio, early autumn." },
  { src: "https://www.birchbankgolf.com/wp-content/uploads/2021/01/Photo-Sep-09-10-13-44-AM.jpg", caption: "Mid-morning on the green." },
  { src: "https://www.birchbankgolf.com/wp-content/uploads/2021/01/Photo-Sep-09-9-26-22-AM.jpg", caption: "Opening the Bistro." },
  { src: "https://www.birchbankgolf.com/wp-content/uploads/2021/01/Photo-Sep-09-9-51-50-AM.jpg", caption: "The covered patio." },
  { src: "https://www.birchbankgolf.com/wp-content/uploads/2021/01/Photo-Sep-09-10-24-59-AM.jpg", caption: "The view beyond 18." },
  { src: "https://www.birchbankgolf.com/wp-content/uploads/2021/01/Photo-Sep-09-10-45-54-AM.jpg", caption: "Friday afternoon." },
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
    <section className="py-[var(--spacing-section)]" aria-label="Photographs from the course">
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
            style={{ width: "min(82vw, 38rem)" }}
          >
            <div className="relative aspect-[4/5] bg-granite/5 overflow-hidden">
              <Image
                src={p.src}
                alt={p.caption}
                fill
                sizes="(max-width: 768px) 82vw, 38rem"
                className="object-cover"
                loading={i === 0 ? "eager" : "lazy"}
                unoptimized
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
