import Link from "next/link";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  return (
    <footer className="bg-granite text-paper mt-32">
      <div className="container-edge py-20 grid gap-12 md:grid-cols-4">
        <div>
          <p className="font-display text-2xl mb-4">Birchbank</p>
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
            <li><Link href="/book" className="hover:text-tamarack">Book a tee time</Link></li>
            <li><Link href="/rates" className="hover:text-tamarack">Rates</Link></li>
            <li><Link href="/course/scorecard" className="hover:text-tamarack">Course layout & scorecard</Link></li>
            <li><Link href="/pro-shop" className="hover:text-tamarack">Pro Shop</Link></li>
            <li><Link href="/course/history" className="hover:text-tamarack">Club history</Link></li>
            <li><Link href="/events" className="hover:text-tamarack">Events calendar</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-paper/60 mb-4">Visit</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/bistro" className="hover:text-tamarack">The Bistro</Link></li>
            <li><Link href="/bistro/menus" className="hover:text-tamarack">Menus</Link></li>
            <li><Link href="/events/book" className="hover:text-tamarack">Book your event</Link></li>
            <li><Link href="/membership" className="hover:text-tamarack">Memberships</Link></li>
            <li><Link href="/plan-your-visit" className="hover:text-tamarack">More things to do</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-paper/60 mb-4">More</p>
          <ul className="space-y-2 text-sm">
            <li><a href="https://members.chronogolf.com/login" target="_blank" rel="noopener" className="hover:text-tamarack">Members Dashboard ↗</a></li>
            <li><a href="https://scg.golfcanada.ca" target="_blank" rel="noopener" className="hover:text-tamarack">Enter score ↗</a></li>
            <li><Link href="/membership/retirees-club" className="hover:text-tamarack">Retirees Club</Link></li>
            <li><Link href="/contact" className="hover:text-tamarack">Contacts</Link></li>
          </ul>
        </div>
      </div>

      <div className="rule-hair bg-paper/15" />
      <div className="container-edge py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-paper/60">
        <p>© {new Date().getFullYear()} Rossland Trail Country Club · Birchbank Golf Course</p>
        <div className="flex items-center gap-6">
          <a href="mailto:office@birchbankgolf.com" className="hover:text-tamarack">office@birchbankgolf.com</a>
          <Link href="/about/land-acknowledgement" className="hover:text-tamarack">Land acknowledgement</Link>
        </div>
      </div>
    </footer>
  );
}
