"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import clsx from "clsx";
import BookButton from "./BookButton";
import SocialLinks from "./SocialLinks";
import Logo from "./Logo";

type NavChild = { href: string; label: string; external?: boolean };
type NavItem = { href: string; label: string; children?: NavChild[] };

/**
 * Top navigation, audience-grouped with dropdowns.
 *
 * Seven top-level items, each a valid landing page. Four of them
 * (Course / Memberships / Events / Visit) have a dropdown that
 * surfaces every important subpage so no part of the site is
 * more than two clicks from the home page.
 *
 * Desktop dropdowns: opened on hover OR on focus-within (keyboard).
 * Mobile menu: all children expanded flat so there's no nested-
 * dropdown tap awkwardness.
 */
const NAV: NavItem[] = [
  {
    href: "/course",
    label: "Course",
    children: [
      { href: "/course", label: "Overview" },
      { href: "/course/scorecard", label: "Full scorecard" },
      { href: "/course/holes/1", label: "Hole by hole" },
      { href: "/course/history", label: "Club history" },
      { href: "/conditions", label: "Today's conditions" },
      { href: "/pro-shop", label: "Pro Shop" },
      { href: "/lessons", label: "Lessons" },
    ],
  },
  { href: "/rates", label: "Rates" },
  {
    href: "/membership",
    label: "Memberships",
    children: [
      { href: "/membership", label: "Membership tiers" },
      { href: "/membership/retirees-club", label: "Retirees Club" },
      { href: "https://members.chronogolf.com/login", label: "Member Portal ↗", external: true },
    ],
  },
  { href: "/bistro", label: "The Bistro" },
  {
    href: "/events",
    label: "Events",
    children: [
      { href: "/events", label: "All events" },
      { href: "/events/book", label: "Book your event" },
      { href: "/events/corporate", label: "Corporate events" },
    ],
  },
  {
    href: "/plan-your-visit",
    label: "Visit",
    children: [
      { href: "/plan-your-visit", label: "Plan your visit" },
      { href: "/stay-and-play", label: "Stay & play" },
      { href: "/usa-visitors", label: "For US visitors" },
      { href: "/dress-code", label: "Dress code" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [onLight, setOnLight] = useState(false);
  const [open, setOpen] = useState(false);

  /**
   * Nav opacity policy.
   *
   * Two rule sets depending on whether the current page has a dark hero
   * backdrop that the nav needs to sit on top of:
   *
   *   1. Home page (has [aria-label="Birchbank Golf, opening sequence"]):
   *      - Transparent at the very top (nav text = paper, reads on the
   *        dark cinematic hero)
   *      - Flips opaque once the AnchorReveal section crosses the viewport
   *        top (hero fully exited)
   *
   *   2. Subpage (no hero element on page): always opaque from the start.
   *      These pages have a paper (cream) background and transparent-mode
   *      would render paper text on paper bg -- invisible. Opaque-by-
   *      default makes every nav item immediately visible.
   */
  useEffect(() => {
    const update = () => {
      const hero = document.querySelector('[aria-label="Birchbank Golf, opening sequence"]');

      // Subpage: always opaque. No dark hero backdrop means we can't
      // run transparent without making text invisible.
      if (!hero) {
        setOnLight(true);
        return;
      }

      // Home page, hard floor at top, transparent over the hero.
      if (window.scrollY < 10) {
        setOnLight(false);
        return;
      }

      // Home page, flip opaque once the anchor-reveal section crosses the top.
      const sentinel = document.getElementById("anchor-heading")?.closest("section");
      if (sentinel) {
        setOnLight(sentinel.getBoundingClientRect().top <= 0);
        return;
      }

      // Fallback (sentinel not mounted yet): keep transparent so the hero
      // stays clean while the page finishes laying out.
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
      <div className="container-edge grid grid-cols-[auto_1fr_auto] items-center gap-6 xl:gap-10 h-16 md:h-18 lg:h-20 xl:h-22 2xl:h-24">
        <Link href="/" aria-label="Birchbank Golf Club, home" className="flex items-center">
          <Logo
            variant={light ? "flush" : "plate"}
            className="h-10 md:h-11 lg:h-12 xl:h-14 2xl:h-16"
            priority
          />
        </Link>

        {/* Desktop nav, dropdowns open on hover / focus-within */}
        <nav className="hidden lg:flex items-center justify-center gap-5 xl:gap-8 2xl:gap-10">
          {NAV.map((item) =>
            item.children ? (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className={clsx(
                    "inline-flex items-center gap-1 text-[15px] xl:text-base whitespace-nowrap hover:text-amber transition-colors py-2",
                    light ? "text-granite" : "text-paper",
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className="text-[0.7em] transition-transform group-hover:rotate-180 group-focus-within:rotate-180 opacity-70"
                  >
                    ▾
                  </span>
                </Link>
                {/* Dropdown panel */}
                <div
                  className={clsx(
                    "invisible opacity-0 pointer-events-none",
                    "group-hover:visible group-hover:opacity-100 group-hover:pointer-events-auto",
                    "group-focus-within:visible group-focus-within:opacity-100 group-focus-within:pointer-events-auto",
                    "absolute top-full left-1/2 -translate-x-1/2 pt-2",
                    "transition-opacity duration-150",
                  )}
                >
                  <div className="min-w-[240px] bg-paper border border-granite/15 shadow-xl rounded-sm py-2">
                    {item.children.map((c) =>
                      c.external ? (
                        <a
                          key={c.href}
                          href={c.href}
                          target="_blank"
                          rel="noopener"
                          className="block px-5 py-2.5 text-sm text-granite hover:bg-cedar/5 hover:text-amber whitespace-nowrap transition-colors"
                        >
                          {c.label}
                        </a>
                      ) : (
                        <Link
                          key={c.href}
                          href={c.href}
                          className="block px-5 py-2.5 text-sm text-granite hover:bg-cedar/5 hover:text-amber whitespace-nowrap transition-colors"
                        >
                          {c.label}
                        </Link>
                      ),
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "text-[15px] xl:text-base whitespace-nowrap hover:text-amber transition-colors py-2",
                  light ? "text-granite" : "text-paper",
                )}
              >
                {item.label}
              </Link>
            ),
          )}
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

          {/* Member Portal, keyline tier 3 treatment (the quiet side door).
              Links directly to Chronogolf's member login (no gateway page). */}
          <a
            href="https://members.chronogolf.com/login"
            target="_blank"
            rel="noopener"
            className={clsx(
              "header-cta header-cta-keyline hidden md:inline-flex",
              light ? "text-granite" : "text-paper",
            )}
          >
            Member Portal
          </a>

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

      {/* Mobile menu, flat expanded layout, no nested tapping */}
      {open && (
        <div className="lg:hidden bg-paper border-t border-granite/10 max-h-[calc(100vh-5rem)] overflow-y-auto">
          <nav className="container-edge py-6 flex flex-col gap-5">
            {NAV.map((item) => (
              <div key={item.href} className="border-b border-granite/10 pb-4">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block text-xl font-display text-granite py-1"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <ul className="mt-2 ml-1 space-y-1">
                    {item.children
                      .filter((c) => c.href !== item.href)
                      .map((c) => (
                        <li key={c.href}>
                          {c.external ? (
                            <a
                              href={c.href}
                              target="_blank"
                              rel="noopener"
                              onClick={() => setOpen(false)}
                              className="block text-sm text-silt hover:text-amber py-1.5"
                            >
                              {c.label}
                            </a>
                          ) : (
                            <Link
                              href={c.href}
                              onClick={() => setOpen(false)}
                              className="block text-sm text-silt hover:text-amber py-1.5"
                            >
                              {c.label}
                            </Link>
                          )}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            ))}
            <div className="pt-4 flex flex-col gap-3 items-start">
              <BookButton />
              <a
                href="https://members.chronogolf.com/login"
                target="_blank"
                rel="noopener"
                onClick={() => setOpen(false)}
                className="header-cta header-cta-keyline text-granite"
              >
                Member Portal
              </a>
              <a href="tel:+12506932255" className="mt-2 text-sm text-silt hover:text-amber">
                Call Pro Shop · 250-693-2255
              </a>
              <SocialLinks variant="dark" className="mt-1" size={22} />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
