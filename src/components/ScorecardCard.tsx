"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Editorial scorecard card with a built-in lightbox.
 *
 * Click the image (or the "View larger" link) to open a full-screen
 * paper-tinted lightbox; close on Escape, backdrop click, or the X
 * button. The download button serves the file as an attachment.
 *
 * Used on /course (overview) and /course/scorecard for the two
 * printable take-with-you scorecards: the Classic card and the
 * Course Atlas. The image inside the lightbox uses Next/Image with
 * `unoptimized` so the user sees the exact pixels they'd download.
 */
type Props = {
  src: string;
  alt: string;
  title: string;
  caption: string;
  downloadName: string;
  /** 4/3 (atlas) or 5/4 (classic) — drives the aspect-ratio CSS. */
  ratio?: "5/4" | "4/3" | "3/4";
};

export default function ScorecardCard({
  src,
  alt,
  title,
  caption,
  downloadName,
  ratio = "5/4",
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
    ratio === "4/3"
      ? "aspect-[4/3]"
      : ratio === "3/4"
        ? "aspect-[3/4]"
        : "aspect-[5/4]";

  return (
    <figure className="group">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`View larger: ${title}`}
        className={[
          "relative w-full overflow-hidden bg-paper",
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
          className="object-contain p-3 md:p-5 transition-transform duration-500 ease-out group-hover:scale-[1.015]"
        />
        {/* Subtle "view larger" affordance on hover */}
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

      <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 font-mono text-xs text-silt">
        <span className="text-granite/85">{caption}</span>
        <span className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="text-granite hover:text-amber underline underline-offset-2"
          >
            View larger
          </button>
          <span className="text-silt/40" aria-hidden>·</span>
          <a
            href={src}
            download={downloadName}
            className="text-granite hover:text-amber underline underline-offset-2"
          >
            Download ↓
          </a>
        </span>
      </figcaption>

      {/* Lightbox */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title}
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
            {title}
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
          <a
            href={src}
            download={downloadName}
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-5 right-5 md:bottom-7 md:right-7 inline-flex items-center gap-2 px-4 py-2.5 bg-cedar text-paper border-t border-tamarack rounded-sm font-mono text-[11px] uppercase tracking-[0.16em] hover:bg-cedar-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
          >
            Download ↓
          </a>
        </div>
      )}
    </figure>
  );
}
