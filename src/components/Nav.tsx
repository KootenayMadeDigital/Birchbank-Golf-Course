"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import clsx from "clsx";
import BookButton from "./BookButton";
import SocialLinks from "./SocialLinks";
import Logo from "./Logo";

const LINKS = [
  { href: "/course", label: "Course" },
  { href: "/rates", label: "Rates" },
  { href: "/membership", label: "Memberships" },
  { href: "/bistro", label: "The Bistro" },
  { href: "/events/book", label: "Book your event" },
  { href: "/plan-your-visit", label: "Visit" },
  { href: "/contact", label: "Contacts" },
];

export default function Nav() {
  const [onLight, setOnLight] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Find the AnchorReveal section by its heading id — that's our "hero
    // has ended" sentinel. We used to walk `hero.nextElementSibling`, but
    // GSAP's pin-spacer wraps the hero in production timing, making that
    // reference null. Querying the sentinel directly by id is immune to
    // whatever GSAP does around it.
    const sentinel =
      document.getElementById("anchor-heading")?.closest("section") as HTMLElement | null;

    const update = () => {
      // Hard floor: within 10px of the very top we're unambiguously on the
      // hero, keep the nav transparent regardless of sentinel geometry.
      if (window.scrollY < 10) {
        setOnLight(false);
        return;
      }
      if (!sentinel) {
        // Pages without a hero — flip after a tiny scroll.
        setOnLight(window.scrollY > 20);
        return;
      }
      // Flip opaque only once the sentinel section's top edge has scrolled
      // past the very top of the viewport (hero fully exited).
      setOnLight(sentinel.getBoundingClientRect().top <= 0);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const light = onLight || open;

  return (
    <header
      className={clsx(
        "fixed top-0 inset-x-0 z-40 transition-colors duration-300",
        light
          ? "bg-paper/95 backdrop-blur-sm border-b border-granite/10"
          : "bg-transparent",
      )}
    >
      <div className="container-edge flex items-center justify-between h-20 md:h-24">
        <Link
          href="/"
          aria-label="Birchbank Golf Club — home"
          className="flex items-center gap-2"
        >
          <Logo
            variant={light ? "flush" : "plate"}
            height={light ? 56 : 52}
            priority
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={clsx(
                "text-base hover:text-amber transition-colors",
                light ? "text-granite" : "text-paper",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 md:gap-5">
          <SocialLinks
            variant={light ? "dark" : "light"}
            className="hidden md:flex"
            size={20}
          />
          <a
            href="tel:+12506932255"
            className={clsx(
              "hidden xl:inline text-base hover:text-amber transition-colors",
              light ? "text-granite" : "text-paper",
            )}
          >
            250-693-2255
          </a>
          <BookButton className="hidden md:inline-flex" />
          <button
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 -mr-2"
          >
            <span className={clsx("block w-6 h-px mb-1.5", light ? "bg-granite" : "bg-paper")} />
            <span className={clsx("block w-6 h-px mb-1.5", light ? "bg-granite" : "bg-paper")} />
            <span className={clsx("block w-6 h-px", light ? "bg-granite" : "bg-paper")} />
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-paper border-t border-granite/10">
          <nav className="container-edge py-6 flex flex-col gap-5">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-xl font-display text-granite"
              >
                {l.label}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <BookButton />
              <a href="tel:+12506932255" className="btn-ghost self-start">
                Call Pro Shop · 250-693-2255
              </a>
              <SocialLinks variant="dark" className="mt-2" size={22} />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
