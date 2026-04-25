"use client";

import { useEffect, useState } from "react";

/**
 * Editorial PDF menu card with a built-in viewer lightbox.
 *
 * Renders an editorial "menu cover" treatment for a Birchbank Bistro
 * PDF (food, drinks, or banquet). Two CTAs:
 *   - View: opens the PDF in a full-screen lightbox using a <object>
 *     (browsers render the PDF inline; falls back to an iframe).
 *   - Download: serves the file as an attachment with a clean filename.
 *
 * Mirrors the pattern of ScorecardCard.tsx (escape key, backdrop click,
 * body scroll lock) so the same interaction language is reused across
 * the site.
 */
type Props = {
  src: string;
  title: string;
  eyebrow: string;
  /** A short menu-cover description; what the visitor will find inside. */
  description: string;
  /** A handful of categories to anchor the cover; verified from the PDF. */
  categories: string[];
  downloadName: string;
};

export default function MenuPdfCard({
  src,
  title,
  eyebrow,
  description,
  categories,
  downloadName,
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

  return (
    <article className="group flex flex-col h-full bg-paper border border-granite/15 rounded-sm overflow-hidden transition-all duration-300 ease-out hover:border-amber hover:shadow-[0_18px_45px_-20px_rgba(43,42,40,0.35)]">
      {/* Editorial cover. No image; typography does the work. */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`View the ${title}`}
        className="relative flex-1 text-left px-7 py-9 md:px-9 md:py-11 bg-paper border-b border-granite/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-tamarack mb-4">
          {eyebrow}
        </p>
        <h3
          className="font-display text-granite leading-[0.95] mb-5"
          style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.015em" }}
        >
          {title}
        </h3>
        <p className="text-granite/80 text-sm md:text-[0.95rem] leading-relaxed mb-6 max-w-[36ch]">
          {description}
        </p>
        <ul className="flex flex-wrap gap-x-3 gap-y-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-silt">
          {categories.map((c, i) => (
            <li key={c} className="inline-flex items-center">
              {c}
              {i < categories.length - 1 && (
                <span aria-hidden className="ml-3 text-silt/40">·</span>
              )}
            </li>
          ))}
        </ul>

        {/* "View larger" affordance on hover */}
        <span
          aria-hidden
          className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-granite/85 text-paper rounded-sm font-mono text-[10px] uppercase tracking-[0.16em] opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200"
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
          View
        </span>
      </button>

      {/* Footer CTAs */}
      <div className="flex items-stretch divide-x divide-granite/12">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 font-mono text-[11px] uppercase tracking-[0.14em] text-granite hover:text-amber hover:bg-cedar/[0.03] transition-colors min-h-[44px]"
        >
          View menu
          <span aria-hidden className="text-tamarack">→</span>
        </button>
        <a
          href={src}
          download={downloadName}
          className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 font-mono text-[11px] uppercase tracking-[0.14em] text-granite hover:text-amber hover:bg-cedar/[0.03] transition-colors min-h-[44px]"
        >
          Download
          <span aria-hidden className="text-tamarack">↓</span>
        </a>
      </div>

      {/* Lightbox */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className="fixed inset-0 z-[120] grid place-items-center bg-granite/92 backdrop-blur-sm p-3 md:p-8 animate-[fadeIn_180ms_ease-out]"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
            aria-label="Close"
            className="absolute top-4 right-4 md:top-6 md:right-6 w-11 h-11 inline-flex items-center justify-center text-paper hover:text-tamarack transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber rounded-sm z-10"
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
            className="relative w-full h-full max-w-[68rem] max-h-[90vh] bg-paper rounded-sm overflow-hidden shadow-[0_18px_60px_-12px_rgba(0,0,0,0.4)]"
            onClick={(e) => e.stopPropagation()}
          >
            <object
              data={src}
              type="application/pdf"
              className="absolute inset-0 w-full h-full"
              aria-label={title}
            >
              <iframe
                src={src}
                title={title}
                className="absolute inset-0 w-full h-full border-0"
              />
            </object>
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
    </article>
  );
}
