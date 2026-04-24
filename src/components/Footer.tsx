import Link from "next/link";
import SocialLinks from "./SocialLinks";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-granite text-paper mt-32">
      <div className="container-edge py-20 grid gap-12 md:grid-cols-4">
        <div>
          <Logo variant="plate" className="h-14 md:h-16 mb-6" />
          <p className="text-sm text-paper/75 leading-relaxed">
            5500 Highway 22<br />
            Genelle, BC<br />
            <span className="text-paper/55">Mailing: PO Box 250, Trail, BC V1R 4L5</span>
          </p>
          <a
            href="tel:+12506932366"
            className="block mt-4 font-mono text-sm text-paper/90 hover:text-tamarack"
          >
            Office · 250-693-2366
          </a>
          <a
            href="tel:+12506932255"
            className="block font-mono text-sm text-paper/90 hover:text-tamarack"
          >
            Pro Shop · 250-693-2255
          </a>
          <a
            href="tel:+12506935451"
            className="block font-mono text-sm text-paper/90 hover:text-tamarack"
          >
            Bistro · 250-693-5451
          </a>
          <SocialLinks variant="light" className="mt-6" size={20} />
        </div>

        <div>
          <p className="eyebrow text-paper/60 mb-4">Course</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/book" className="link-editorial hover:text-tamarack">Book a tee time</Link></li>
            <li><Link href="/rates" className="link-editorial hover:text-tamarack">Rates</Link></li>
            <li><Link href="/course/scorecard" className="link-editorial hover:text-tamarack">Course layout & scorecard</Link></li>
            <li><Link href="/pro-shop" className="link-editorial hover:text-tamarack">Pro Shop</Link></li>
            <li><Link href="/course/history" className="link-editorial hover:text-tamarack">Club history</Link></li>
            <li><Link href="/events" className="link-editorial hover:text-tamarack">Events calendar</Link></li>
            <li><Link href="/lessons" className="link-editorial hover:text-tamarack">Lessons</Link></li>
            <li><Link href="/dress-code" className="link-editorial hover:text-tamarack">Dress code</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-paper/60 mb-4">Visit</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/plan-your-visit" className="link-editorial hover:text-tamarack">Plan your visit</Link></li>
            <li><Link href="/stay-and-play" className="link-editorial hover:text-tamarack">Stay &amp; play</Link></li>
            <li><Link href="/usa-visitors" className="link-editorial hover:text-tamarack">For US visitors</Link></li>
            <li><Link href="/bistro" className="link-editorial hover:text-tamarack">The Bistro</Link></li>
            <li><Link href="/events/book" className="link-editorial hover:text-tamarack">Book your event</Link></li>
            <li><Link href="/events/corporate" className="link-editorial hover:text-tamarack">Corporate events</Link></li>
            <li><Link href="/membership" className="link-editorial hover:text-tamarack">Memberships</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-paper/60 mb-4">More</p>
          <ul className="space-y-2 text-sm">
            <li><a href="https://members.chronogolf.com/login" target="_blank" rel="noopener" className="link-editorial hover:text-tamarack">Member Portal ↗</a></li>
            <li><a href="https://scg.golfcanada.ca" target="_blank" rel="noopener" className="link-editorial hover:text-tamarack">Enter score ↗</a></li>
            <li><Link href="/membership/retirees-club" className="link-editorial hover:text-tamarack">Retirees Club</Link></li>
            <li><Link href="/contact" className="link-editorial hover:text-tamarack">Contacts</Link></li>
          </ul>
        </div>
      </div>

      <div className="rule-hair bg-paper/15" />
      <div className="container-edge py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-paper/60">
        <p>© {new Date().getFullYear()} Rossland Trail Country Club · Birchbank Golf Course</p>
        <div className="flex items-center gap-6">
          <a href="mailto:office@birchbankgolf.com" className="link-editorial hover:text-tamarack">office@birchbankgolf.com</a>
          <Link href="/about/land-acknowledgement" className="link-editorial hover:text-tamarack">Land acknowledgement</Link>
        </div>
      </div>
    </footer>
  );
}
