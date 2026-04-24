import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RouteCurtain from "@/components/RouteCurtain";
import Cursor from "@/components/Cursor";
import { organizationJsonLd, golfCourseJsonLd } from "@/lib/schema";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://birchbankgolf.com"),
  title: {
    default: "Birchbank Golf Course. Rossland Trail Country Club",
    template: "%s · Birchbank Golf Course",
  },
  description:
    "The 18-hole course of the Rossland Trail Country Club, set along the Columbia River in Genelle, BC. Back nine and clubhouse designed by Roy Stone, opened 1969. Open April 1 through October 31.",
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: "Birchbank Golf Course",
    url: "/",
    images: [{ url: "/og/default.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F5F2EA" },
    { media: "(prefers-color-scheme: dark)", color: "#2B2A28" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA">
      <head>
        {/* Fontshare. Gambetta (display serif) + Switzer (sans) + JetBrains Mono */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=gambetta@300,400,500,600,700&f[]=switzer@400,500,600&f[]=jetbrains-mono@400,500&display=swap"
        />

        <link rel="preconnect" href="https://cdn2.chronogolf.com" />
        <link rel="preconnect" href="https://www.chronogolf.com" />
        <link rel="dns-prefetch" href="https://members.chronogolf.com" />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-granite focus:text-paper focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <RouteCurtain />
        <Cursor />

        {/* Chronogolf source trigger, the widget clones whichever element
            has .chrono-bookingbutton and uses that tag as the wrapper for
            the fixed-position panel. Birchbank's live site uses a <div>,
            which flows block-level children (the panel) correctly; using
            an <a> as we did before distorted the panel's layout. This node
            is positioned off-screen but remains in layout so Chronogolf's
            script can find and clone it. */}
        <div className="chrono-bookingbutton" aria-hidden="true">
          Book a Tee-Time
        </div>

        {/* Chronogolf (Lightspeed Golf) booking widget, lazy-loaded.
            Birchbank's public numeric club ID is 738; the widget requires
            a valid clubId or it silently no-ops on click. Locale matches
            their live site (en-US). Theme color = our brand cedar. */}
        <Script id="chronogolf-settings" strategy="lazyOnload">
          {`window.chronogolfSettings = { "clubId": ${process.env.NEXT_PUBLIC_CHRONOGOLF_CLUB_ID || "738"}, "locale": "en-US" };
            window.chronogolfTheme = { "color": "#3C4A35" };`}
        </Script>
        <Script
          id="chronogolf-loader"
          strategy="lazyOnload"
          src="https://cdn2.chronogolf.com/widgets/v2"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(golfCourseJsonLd()) }}
        />

        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
          <Script
            strategy="afterInteractive"
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.js"
          />
        )}

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
