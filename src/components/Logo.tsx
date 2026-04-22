import Image from "next/image";
import clsx from "clsx";

/**
 * Birchbank Golf Club wordmark + tree logo. Transparent-background PNG
 * served from /public/brand/logo.png (Next/Image serves AVIF/WebP variants
 * automatically to modern browsers).
 *
 * Two variants:
 *   • `flush` — bare logo, used on paper / light backgrounds
 *   • `plate` — logo wrapped in a small paper-colored plate so the dark
 *     ink reads over dark backgrounds (the hero, the footer)
 */
type Props = {
  variant?: "plate" | "flush";
  height?: number;
  priority?: boolean;
  className?: string;
};

const LOGO_SRC = "/brand/logo.png";
const INTRINSIC_W = 1200;
const INTRINSIC_H = 506;

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
      className="block h-auto w-auto"
      style={{ height }}
    />
  );

  if (variant === "plate") {
    return (
      <span
        className={clsx(
          "inline-flex items-center bg-paper rounded-sm px-3 py-1.5 shadow-sm",
          className,
        )}
      >
        {img}
      </span>
    );
  }

  return <span className={clsx("inline-flex", className)}>{img}</span>;
}
