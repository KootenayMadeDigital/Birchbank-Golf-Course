import Image from "next/image";
import clsx from "clsx";

/**
 * The Birchbank Golf Club wordmark/tree logo, sourced from
 * birchbankgolf.com's WordPress media library. It is a JPG with a
 * cream/white background — when we place it over a dark surface (e.g. the
 * transparent nav above the hero), we wrap it in a small paper-colored
 * plate so it reads cleanly.
 */
type Props = {
  variant?: "plate" | "flush";
  height?: number;
  priority?: boolean;
  className?: string;
};

const LOGO_SRC = "https://www.birchbankgolf.com/wp-content/uploads/2019/02/birchbank-ratina-logo.jpg";
const INTRINSIC_W = 1700;
const INTRINSIC_H = 700;

export default function Logo({ variant = "flush", height = 40, priority = false, className }: Props) {
  const width = Math.round((height * INTRINSIC_W) / INTRINSIC_H);

  const img = (
    <Image
      src={LOGO_SRC}
      alt="Birchbank Golf Club"
      width={width}
      height={height}
      sizes={`${width}px`}
      priority={priority}
      unoptimized
      className="block"
    />
  );

  if (variant === "plate") {
    // Paper-colored padded plate — works on any background, including dark hero.
    return (
      <span
        className={clsx(
          "inline-flex items-center bg-paper rounded-sm px-2 py-1 shadow-sm",
          className,
        )}
      >
        {img}
      </span>
    );
  }

  return <span className={clsx("inline-flex", className)}>{img}</span>;
}
