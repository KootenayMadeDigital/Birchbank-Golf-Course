"use client";

/**
 * Footer "Return to the first tee" anchor.
 *
 * Sits at the very top of the footer. On click, smoothly scrolls the
 * window to top over ~1.2s. Uses the page's existing Lenis instance if
 * available (desktop, fine-pointer); otherwise falls back to native
 * `scrollTo({ behavior: "smooth" })`.
 *
 * Reduced motion: instant scroll (no smooth behavior).
 */
export default function ReturnToFirstTee() {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <div className="border-b border-paper/10">
      <div className="container-edge py-6">
        <a
          href="#main"
          onClick={handleClick}
          data-cursor-target
          className="link-editorial inline-flex items-center gap-2 text-paper/80 hover:text-paper text-sm md:text-base font-mono uppercase tracking-[0.18em]"
        >
          <span aria-hidden>↑</span>
          <span>Return to the first tee</span>
        </a>
      </div>
    </div>
  );
}
