import Link from "next/link";
import SocialLinks from "./SocialLinks";
import Logo from "./Logo";
import ReturnToFirstTee from "./ReturnToFirstTee";

export default function Footer() {
  return (
    <footer className="bg-granite text-paper mt-32">
      <ReturnToFirstTee />
      {/*
        Mobile: 2 columns. Brand block spans both rows at the top, the
        three link sections sit side-by-side in a compact 2-col grid
        beneath, with "More" stretching across the second link row so
        nothing wraps awkwardly. This collapses ~30 stacked items into
        a balanced layout that's about half the previous mobile height.

        Desktop (md+): 4 equal columns as before.
      */}
      <div className="container-edge py-16 md:py-20 grid gap-10 md:gap-12 grid-cols-2 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <Logo variant="plate" className="h-14 md:h-16 mb-6" />
          <p className="text-sm text-paper/75 leading-relaxed">
            5500 Highway 22<br />
            Genelle, BC<br />
            <span className="text-paper/55">Mailing: PO Box 250, Trail, BC V1R 4L5</span>
          </p>
          <a
            href="tel:+12506932366"
            className="flex items-center mt-3 font-mono text-base text-paper/90 hover:text-tamarack min-h-[44px] py-2"
          >
            Office · 250-693-2366
          </a>
          <a
            href="tel:+12506932255"
            className="flex items-center font-mono text-base text-paper/90 hover:text-tamarack min-h-[44px] py-2"
          >
            Pro Shop · 250-693-2255
          </a>
          <a
            href="tel:+12506935451"
            className="flex items-center font-mono text-base text-paper/90 hover:text-tamarack min-h-[44px] py-2"
          >
            Bistro · 250-693-5451
          </a>
          <SocialLinks variant="light" className="mt-8" size={24} />
        </div>

        <div>
          <p className="eyebrow text-paper/60 mb-4">Course</p>
          <ul className="text-base space-y-0">
            <li><Link href="/book" className="link-editorial hover:text-tamarack inline-block py-2">Book a tee time</Link></li>
            <li><Link href="/rates" className="link-editorial hover:text-tamarack inline-block py-2">Rates</Link></li>
            <li><Link href="/course/scorecard" className="link-editorial hover:text-tamarack inline-block py-2">Scorecard</Link></li>
            <li><Link href="/pro-shop" className="link-editorial hover:text-tamarack inline-block py-2">Pro Shop</Link></li>
            <li><Link href="/course/history" className="link-editorial hover:text-tamarack inline-block py-2">Club history</Link></li>
            <li><Link href="/events" className="link-editorial hover:text-tamarack inline-block py-2">Events</Link></li>
            <li><Link href="/lessons" className="link-editorial hover:text-tamarack inline-block py-2">Lessons</Link></li>
            <li><Link href="/dress-code" className="link-editorial hover:text-tamarack inline-block py-2">Dress code</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-paper/60 mb-4">Visit</p>
          <ul className="text-base space-y-0">
            <li><Link href="/plan-your-visit" className="link-editorial hover:text-tamarack inline-block py-2">Plan your visit</Link></li>
            <li><Link href="/stay-and-play" className="link-editorial hover:text-tamarack inline-block py-2">Stay &amp; play</Link></li>
            <li><Link href="/usa-visitors" className="link-editorial hover:text-tamarack inline-block py-2">US visitors</Link></li>
            <li><Link href="/bistro" className="link-editorial hover:text-tamarack inline-block py-2">The Bistro</Link></li>
            <li><Link href="/events/book" className="link-editorial hover:text-tamarack inline-block py-2">Book an event</Link></li>
            <li><Link href="/events/corporate" className="link-editorial hover:text-tamarack inline-block py-2">Corporate events</Link></li>
            <li><Link href="/membership" className="link-editorial hover:text-tamarack inline-block py-2">Memberships</Link></li>
          </ul>
        </div>

        <div className="col-span-2 md:col-span-1">
          <p className="eyebrow text-paper/60 mb-4">More</p>
          <ul className="text-base grid grid-cols-2 md:block">
            <li><a href="https://members.chronogolf.com/login" target="_blank" rel="noopener" className="link-editorial hover:text-tamarack inline-block py-2">Member Portal ↗</a></li>
            <li><a href="https://scg.golfcanada.ca" target="_blank" rel="noopener" className="link-editorial hover:text-tamarack inline-block py-2">Enter score ↗</a></li>
            <li><Link href="/membership/retirees-club" className="link-editorial hover:text-tamarack inline-block py-2">Retirees Club</Link></li>
            <li><Link href="/contact" className="link-editorial hover:text-tamarack inline-block py-2">Contacts</Link></li>
          </ul>
        </div>
      </div>

      <div className="rule-hair bg-paper/15" />
      <div className="container-edge py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-sm text-paper/60">
        <p className="leading-relaxed">© {new Date().getFullYear()} Rossland Trail Country Club · Birchbank Golf Course</p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
          <a href="mailto:office@birchbankgolf.com" className="link-editorial hover:text-tamarack inline-flex items-center min-h-[44px]">office@birchbankgolf.com</a>
          <Link href="/about/land-acknowledgement" className="link-editorial hover:text-tamarack inline-flex items-center min-h-[44px]">Land acknowledgement</Link>
        </div>
      </div>
    </footer>
  );
}
