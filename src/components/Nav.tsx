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
  { href: "/events", label: "Events" },
  { href: "/plan-your-visit", label: "Visit" },
  { href: "/contact", label: "Contacts" },
];

export default function Nav() {
  const [onLight, setOnLight] = useState(false);
  const [open, setOpen] = useState(false);

  /**
   * Nav opacity policy — strict.
   *
   * The nav is transparent by default. It can ONLY go opaque when we have
   * a positive signal that the user has scrolled past the hero. If we
   * can't get that signal for any reason, the nav stays transparent.
   *
   * Positive signals, in order of preference:
   *   1. Home page: the AnchorReveal section's top edge has reached the
   *      very top of the viewport (hero fully exited).
   *   2. Non-home page: no hero element exists, so flip opaque once the
   *      user has scrolled more than 20px (the page top has moved).
   *
   * Everything is re-queried on every scroll event so there's no
   * dependency on DOM-at-mount timing — if the sentinel shows up later,
   * the next scroll tick picks it up.
   */
  useEffect(() => {
    const update = () => {
      // Hard floor: at or near the top of the page, always transparent.
      if (window.scrollY < 10) {
        setOnLight(false);
        return;
      }

      // Is there a hero on this page? If not, we're on a secondary page;
      // the nav should flip opaque once the user starts scrolling.
      const hero = document.querySelector('[aria-label="Birchbank Golf — opening sequence"]');
      if (!hero) {
        setOnLight(window.scrollY > 20);
        return;
      }

      // Home page path. Find the sentinel (AnchorReveal section).
      const sentinel = document.getElementById("anchor-heading")?.closest("section");

      if (sentinel) {
        // Ideal: use the sentinel's viewport position as the authoritative
        // "has the hero exited?" check.
        setOnLight(sentinel.getBoundingClientRect().top <= 0);
        return;
      }

      // Sentinel not in the DOM yet. Keep transparent — we have no
      // positive signal to flip opaque, and defaulting to transparent
      // is the safe choice while the hero is still on screen.
      setOnLight(false);
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
      {/*
        Three-column grid layout:
          col 1 (auto)  logo
          col 2 (1fr)   nav links, centered within the column
          col 3 (auto)  social + phone + book CTA
        `gap-8 xl:gap-12` enforces a minimum breathing zone between the
        logo and the first nav item so the logo plate can't crowd it at
        any viewport width.
      */}
      <div className="container-edge grid grid-cols-[auto_1fr_auto] items-center gap-8 xl:gap-12 h-20 md:h-24">
        <Link
          href="/"
          aria-label="Birchbank Golf Club — home"
          className="flex items-center"
        >
          <Logo
            variant={light ? "flush" : "plate"}
            height={light ? 56 : 52}
            priority
          />
        </Link>

        <nav className="hidden lg:flex items-center justify-center gap-6 xl:gap-9 2xl:gap-11">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={clsx(
                "text-[15px] xl:text-base whitespace-nowrap hover:text-amber transition-colors",
                light ? "text-granite" : "text-paper",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 md:gap-5 justify-self-end">
          <SocialLinks
            variant={light ? "dark" : "light"}
            className="hidden md:flex"
            size={20}
          />
          <a
            href="tel:+12506932255"
            className={clsx(
              "hidden 2xl:inline text-base whitespace-nowrap hover:text-amber transition-colors",
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
