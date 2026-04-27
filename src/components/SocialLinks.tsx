import clsx from "clsx";
import { REVIEW_PLATFORMS } from "@/data/reviews";

/**
 * Lightweight Facebook + Instagram + Tripadvisor icon links. Inline
 * SVG (no icon library). Tripadvisor URL is sourced from
 * src/data/reviews.ts so the same canonical link is used everywhere
 * the platform is referenced on the site.
 */

type Props = {
  variant?: "light" | "dark";
  className?: string;
  size?: number;
};

const iconClass = (v: "light" | "dark") =>
  clsx(
    "inline-flex items-center justify-center w-11 h-11 -m-2.5 transition-colors duration-150",
    v === "light" ? "text-paper/80 hover:text-tamarack" : "text-granite/75 hover:text-amber",
  );

export default function SocialLinks({ variant = "dark", className, size = 18 }: Props) {
  return (
    <div className={clsx("flex items-center gap-3", className)}>
      <a
        href="https://www.facebook.com/BirchbankGolf"
        target="_blank"
        rel="noopener"
        aria-label="Birchbank Golf on Facebook"
        className={iconClass(variant)}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z" />
        </svg>
      </a>
      <a
        href="https://www.instagram.com/birchbankgolf"
        target="_blank"
        rel="noopener"
        aria-label="Birchbank Golf on Instagram"
        className={iconClass(variant)}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          aria-hidden="true"
        >
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      </a>
      <a
        href={REVIEW_PLATFORMS.tripadvisor.readUrl}
        target="_blank"
        rel="noopener"
        aria-label="Birchbank Golf on Tripadvisor"
        className={iconClass(variant)}
      >
        {/* Tripadvisor "binoculars" mark, monochrome glyph */}
        <svg
          width={size + 4}
          height={size}
          viewBox="0 0 28 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <ellipse cx="14" cy="12" rx="12" ry="6.5" />
          <circle cx="9" cy="12" r="3.6" />
          <circle cx="9" cy="12" r="1" fill="currentColor" stroke="none" />
          <circle cx="19" cy="12" r="3.6" />
          <circle cx="19" cy="12" r="1" fill="currentColor" stroke="none" />
        </svg>
      </a>
    </div>
  );
}
