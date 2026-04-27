"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * A click-to-zoom editorial figure. Renders the image at a constrained
 * size in flow with a paper-on-paper border + caption, and opens a
 * full-screen paper-tinted lightbox on click. Closes on Escape, on
 * backdrop click, or on the X button.
 *
 * Used for cinematic photos where we want presence in the layout
 * without dominating the section: the visitor sees a tasteful
 * editorial moment, can tap to inspect the full resolution.
 */
type Props = {
  src: string;
  alt: string;
  caption?: string;
  /** Aspect ratio for the inline render. e.g. "4/3" | "16/9" | "1/1" */
  aspect?: string;
  /** Optional max-width on the wrapper (Tailwind class, e.g. "max-w-3xl"). */
  maxWidth?: string;
  /** Sizes attribute for the inline image. */
  sizes?: string;
  /** Center-align the figure within its parent. */
  centered?: boolean;
  className?: string;
};

export default function ZoomableFigure({
  src,
  alt,
  caption,
  aspect = "4/3",
  maxWidth = "max-w-3xl",
  sizes = "(max-width: 768px) 100vw, 768px",
  centered = true,
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

  const wrapperClass = `${maxWidth} ${centered ? "mx-auto" : ""} ${className}`.trim();

  return (
    <figure className={wrapperClass}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`View larger: ${alt}`}
        className="group relative block w-full overflow-hidden bg-granite/5 border border-granite/10 rounded-sm cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
        style={{ aspectRatio: aspect }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.015]"
          loading="lazy"
          unoptimized
        />
        {/* "View larger" affordance on hover. */}
        <span
          aria-hidden
          className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-granite/85 text-paper rounded-sm font-mono text-[10px] uppercase tracking-[0.16em] opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200"
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

      {caption && (
        <figcaption className="mt-3 font-mono text-xs text-silt text-center">
          {caption}
        </figcaption>
      )}

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
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
              unoptimized
              priority
            />
          </div>
        </div>
      )}
    </figure>
  );
}
