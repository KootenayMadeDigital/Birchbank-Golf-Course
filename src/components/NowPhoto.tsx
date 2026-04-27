import Image from "next/image";

/**
 * Single editorial photo card for the /conditions hero. Picks one of three
 * "vibe" shots based on the live Open-Meteo `conditionCode` so the page
 * feels like the course right now, not just a data widget.
 *
 * All three source images are 4:3 landscapes with the mountain in the
 * upper third; we render them in a fixed 4:3 frame with object-cover and
 * object-position biased upward so the peak never gets cropped.
 */

type Props = {
  conditionCode: number;
  isDay?: 0 | 1;
  className?: string;
  /**
   * "card" (default): renders the photo at the parent's width with a
   * paper border + caption beneath. "background": renders the photo
   * absolutely-positioned, filling the parent, decorative-only. The
   * caller is responsible for layering a paper gradient + condition
   * tint on top to keep foreground text legible.
   */
  variant?: "card" | "background";
};

function pickPhoto(code: number, isDay: 0 | 1) {
  // Misty / fog (45-48), light rain / drizzle (51-57, 80) → moody fog shot
  if ((code >= 45 && code <= 48) || (code >= 51 && code <= 57) || code === 80) {
    return {
      src: "/conditions/foggy.webp",
      alt: "Mist and sun rays through the trees, looking toward the green at Birchbank",
    };
  }
  // Heavy rain / snow / thunder → cloudy-leaning shot (no live storm photo)
  if (code >= 61) {
    return {
      src: "/conditions/cloudy.webp",
      alt: "Tall grass in the foreground, fairway and big mountain backdrop at Birchbank",
    };
  }
  // Cloudy (2-3) → cloudy frame
  if (code >= 2 && code <= 3) {
    return {
      src: "/conditions/cloudy.webp",
      alt: "Tall grass in the foreground, fairway and big mountain backdrop at Birchbank",
    };
  }
  // Clear / mostly clear (0-1) → sunny cart-path shot during the day,
  // moody fog at night to avoid pretending it's daylight at midnight.
  if (isDay === 0) {
    return {
      src: "/conditions/foggy.webp",
      alt: "A still, low-light Birchbank morning",
    };
  }
  return {
    src: "/conditions/sunny.webp",
    alt: "Cart path winding past a hazy mountain at Birchbank",
  };
}

export default function NowPhoto({
  conditionCode,
  isDay = 1,
  className = "",
  variant = "card",
}: Props) {
  const { src, alt } = pickPhoto(conditionCode, isDay);

  if (variant === "background") {
    return (
      <div
        aria-hidden
        className={`absolute inset-0 pointer-events-none ${className}`}
      >
        <Image
          src={src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[center_30%] opacity-[0.42]"
          priority
          unoptimized
        />
      </div>
    );
  }

  return (
    <figure className={className}>
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-granite/5 border border-granite/10 rounded-sm">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 360px"
          className="object-cover object-[center_30%]"
          priority
          unoptimized
        />
      </div>
      <figcaption className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-silt">
        Birchbank, today.
      </figcaption>
    </figure>
  );
}
