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
  // When this is true, Nav shows its paper/opaque state. When false, it's
  // transparent and sits over whatever's behind (the hero on /, other
  // pages' top content otherwise).
  const [onLight, setOnLight] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // On the home page we keep the nav fully transparent until the ball-into-
    // hole hero has scrolled past the top of the viewport. On every other
    // page there's no hero, so we flip opaque almost immediately.
    const hero = document.querySelector<HTMLElement>('[aria-label="Birchbank Golf — opening sequence"]');

    if (!hero) {
      const onScroll = () => setOnLight(window.scrollY > 20);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    // IntersectionObserver with a negative top rootMargin equal to the nav
    // height — so `isIntersecting` flips to false at the moment the hero's
    // bottom passes underneath the nav. Works identically for the desktop
    // 100vh pinned hero and the mobile 300vh sticky-inner hero.
    const observer = new IntersectionObserver(
      ([entry]) => setOnLight(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-80px 0px 0px 0px" },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  // When the mobile menu is open, force paper background regardless of scroll.
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
      <div className="container-edge flex items-center justify-between h-16 md:h-20">
        <Link
          href="/"
          aria-label="Birchbank Golf Club — home"
          className="flex items-center gap-2"
        >
          <Logo
            variant={light ? "flush" : "plate"}
            height={light ? 40 : 36}
            priority
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={clsx(
                "text-sm hover:text-amber transition-colors",
                light ? "text-granite" : "text-paper/85",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 md:gap-4">
          <SocialLinks
            variant={light ? "dark" : "light"}
            className="hidden md:flex"
            size={16}
          />
          <a
            href="tel:+12506932255"
            className={clsx(
              "hidden xl:inline text-sm hover:text-amber transition-colors",
              light ? "text-granite" : "text-paper/85",
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
            <span className={clsx("block w-5 h-px mb-1", light ? "bg-granite" : "bg-paper")} />
            <span className={clsx("block w-5 h-px mb-1", light ? "bg-granite" : "bg-paper")} />
            <span className={clsx("block w-5 h-px", light ? "bg-granite" : "bg-paper")} />
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-paper border-t border-granite/10">
          <nav className="container-edge py-6 flex flex-col gap-4">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-lg font-display text-granite"
              >
                {l.label}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <BookButton />
              <a href="tel:+12506932255" className="btn-ghost self-start">
                Call Pro Shop · 250-693-2255
              </a>
              <SocialLinks variant="dark" className="mt-2" size={20} />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
