"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import clsx from "clsx";
import BookButton from "./BookButton";
import SocialLinks from "./SocialLinks";

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
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onLight = scrolled || open;

  return (
    <header
      className={clsx(
        "fixed top-0 inset-x-0 z-40 transition-colors duration-300",
        onLight
          ? "bg-paper/95 backdrop-blur-sm border-b border-granite/10"
          : "bg-transparent",
      )}
    >
      <div className="container-edge flex items-center justify-between h-16 md:h-20">
        <Link
          href="/"
          className={clsx(
            "flex items-center gap-2 font-display text-xl tracking-tight transition-colors",
            onLight ? "text-cedar" : "text-paper",
          )}
        >
          <span>Birchbank</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={clsx(
                "text-sm hover:text-amber transition-colors",
                onLight ? "text-granite" : "text-paper/85",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 md:gap-4">
          <SocialLinks
            variant={onLight ? "dark" : "light"}
            className="hidden md:flex"
            size={16}
          />
          <a
            href="tel:+12506932255"
            className={clsx(
              "hidden xl:inline text-sm hover:text-amber transition-colors",
              onLight ? "text-granite" : "text-paper/85",
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
            <span className={clsx("block w-5 h-px mb-1", onLight ? "bg-granite" : "bg-paper")} />
            <span className={clsx("block w-5 h-px mb-1", onLight ? "bg-granite" : "bg-paper")} />
            <span className={clsx("block w-5 h-px", onLight ? "bg-granite" : "bg-paper")} />
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
