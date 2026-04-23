"use client";

import clsx from "clsx";

type Props = {
  className?: string;
  label?: string;
  variant?: "primary" | "ghost";
};

declare global {
  interface Window {
    chronogolfOpen?: () => void;
  }
}

export default function BookButton({ className, label = "Book a tee time", variant = "primary" }: Props) {
  const handleClick = (e: React.MouseEvent) => {
    if (typeof window !== "undefined" && typeof window.chronogolfOpen === "function") {
      e.preventDefault();
      window.chronogolfOpen();
    }
  };

  return (
    <a
      href="/book"
      onClick={handleClick}
      data-chrono-book
      className={clsx(
        variant === "primary" ? "btn-primary" : "btn-ghost",
        "whitespace-nowrap",
        className,
      )}
    >
      {label}
      <span aria-hidden>→</span>
    </a>
  );
}
