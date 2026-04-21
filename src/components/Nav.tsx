"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import BookButton from "./BookButton";

// Matches the IA on birchbankgolf.com as of April 2026:
// Home · Course (Events Calendar, Rates, Course Layout & Scorecards, Pro Shop, Club History) ·
// Memberships · The Bistro · Book Your Event · Menus · More (Enter Score, Public Documents,
// Retirees Club, More Things To Do) · Contacts · Members Dashboard
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

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-colors duration-300 ${
        scrolled || open ? "bg-paper/95 backdrop-blur-sm border-b border-granite/10" : "bg-transparent"
      }`}
    >
      <div className="container-edge flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="flex items-center gap-2 font-display text-xl tracking-tight">
          <span className="text-cedar">Birchbank</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-granite hover:text-amber transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:+12506932255"
            className="hidden md:inline text-sm text-granite hover:text-amber transition-colors"
          >
            Pro Shop · 250-693-2255
          </a>
          <BookButton className="hidden md:inline-flex" />
          <button
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 -mr-2"
          >
            <span className="block w-5 h-px bg-granite mb-1" />
            <span className="block w-5 h-px bg-granite mb-1" />
            <span className="block w-5 h-px bg-granite" />
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
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
