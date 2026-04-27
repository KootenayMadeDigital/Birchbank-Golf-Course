"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Editorial dish card with a built-in lightbox. Mirrors ScorecardCard's
 * pattern (dialog, escape key, backdrop click, body scroll lock) so the
 * whole site uses one zoom interaction. Used on /bistro for the
 * dishes grid and the burger feature.
 *
 * Photo treatment is deliberate: NO gradient overlay on food. The image
 * is the persuasion; the caption is the frame. A hairline border shifts
 * to amber on hover so cards feel pressable without flexing the layout.
 */
type Props = {
  src: string;
  alt: string;
  /** Mono-caps eyebrow above the caption ("Burger", "Breakfast"…). */
  kicker: string;
  /** One editorial line, no price. */
  caption: string;
  /** Aspect ratio. Square is the grid default; "16/9" used by the burger feature. */
  ratio?: "1/1" | "4/5" | "16/9";
  /** Optional priority load (e.g. above-the-fold burger feature). */
  priority?: boolean;
  className?: string;
};

export default function DishCard({
  src,
  alt,
  kicker,
  caption,
  ratio = "1/1",
  priority = false,
  className = "",
}: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const aspectClass =
    ratio === "16/9"
      ? "aspect-[16/9]"
      : ratio === "4/5"
        ? "aspect-[4/5]"
        : "aspect-square";

  return (
    <figure className={`group ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`View larger: ${kicker}, ${caption}`}
        className={[
          "relative w-full overflow-hidden bg-granite/5",
          "border border-granite/15 rounded-sm",
          "transition-all duration-300 ease-out",
          "hover:border-amber hover:shadow-[0_18px_45px_-20px_rgba(43,42,40,0.35)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
          aspectClass,
        ].join(" ")}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
          loading={priority ? "eager" : "lazy"}
          priority={priority}
        />
        <span
          aria-hidden
          className={[
            "absolute bottom-3 right-3 inline-flex items-center gap-1.5",
            "px-2.5 py-1.5 bg-granite/85 text-paper rounded-sm",
            "font-mono text-[10px] uppercase tracking-[0.16em]",
            "opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0",
            "transition-all duration-200",
          ].join(" ")}
        >
          <svg width="11" height="11" viewBox="0 0 11 11" aria-hidden>
            <path
              d="M1 4V1h3 M10 7v3H7 M1 1l3 3 M10 10L7 7"
              stroke="currentColor"
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="square"
            />
          </svg>
          View larger
        </span>
      </button>

      <figcaption className="mt-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-tamarack mb-1">
          {kicker}
        </p>
        <p className="font-display text-[1.05rem] leading-snug text-granite">
          {caption}
        </p>
      </figcaption>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${kicker}: ${caption}`}
          className="fixed inset-0 z-[120] grid place-items-center bg-granite/92 backdrop-blur-sm p-4 md:p-10 animate-[fadeIn_180ms_ease-out]"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
            aria-label="Close"
            className="absolute top-4 right-4 md:top-6 md:right-6 w-11 h-11 inline-flex items-center justify-center text-paper hover:text-tamarack transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber rounded-sm"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
              <path
                d="M3 3 L15 15 M15 3 L3 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="square"
                fill="none"
              />
            </svg>
          </button>
          <p className="absolute top-4 left-4 md:top-6 md:left-6 font-mono text-[11px] uppercase tracking-[0.16em] text-paper/70">
            {kicker}
          </p>
          <div
            className="relative max-w-[100rem] w-full h-full max-h-[88vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 max-w-[88vw] text-center font-display text-[1.05rem] text-paper/90 px-4">
            {caption}
          </p>
        </div>
      )}
    </figure>
  );
}
