import Image from "next/image";
import clsx from "clsx";

/**
 * Birchbank Golf Club wordmark + tree logo (transparent-background PNG
 * at /public/brand/logo.png, 1200×506).
 *
 * The logo's height is controlled by whichever Tailwind `h-*` class the
 * caller passes in `className`. The image fills that height and keeps
 * its aspect ratio. This lets Nav scale the logo responsively with
 * breakpoint classes instead of a fixed pixel prop, so the logo grows
 * smoothly from phones up through ultra-wide monitors.
 *
 * Variants:
 *   • `flush` — bare logo, used on paper / light backgrounds
 *   • `plate` — logo wrapped in a small paper-colored plate so the dark
 *     ink reads over dark surfaces (hero, footer)
 */
type Props = {
  variant?: "plate" | "flush";
  priority?: boolean;
  className?: string;
};

const LOGO_SRC = "/brand/logo.png";
const INTRINSIC_W = 1200;
const INTRINSIC_H = 506;

export default function Logo({ variant = "flush", priority = false, className }: Props) {
  const img = (
    <Image
      src={LOGO_SRC}
      alt="Birchbank Golf Club"
      width={INTRINSIC_W}
      height={INTRINSIC_H}
      sizes="(min-width: 1536px) 260px, (min-width: 1024px) 220px, 180px"
      priority={priority}
      className="block h-full w-auto"
    />
  );

  if (variant === "plate") {
    return (
      <span
        className={clsx(
          "inline-flex items-center bg-paper rounded-sm px-3 md:px-4 py-1.5 md:py-2 shadow-sm",
          className,
        )}
      >
        {img}
      </span>
    );
  }

  return <span className={clsx("inline-flex", className)}>{img}</span>;
}
