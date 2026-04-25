import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RouteCurtain from "@/components/RouteCurtain";
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
      <body suppressHydrationWarning>
        {/*
          Wrap the entire React-managed UI in a single div so the body
          itself only has ONE child that React owns. Defense-in-depth
          against any third-party DOM injection (browser extensions,
          analytics shims) interfering with React reconciliation.
        */}
        <div id="app-root">
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
        </div>

        {/*
          The Chronogolf body-injected widget script
          (cdn2.chronogolf.com/widgets/v2) is intentionally NOT loaded
          globally. That script physically moves a .chrono-bookingbutton
          element from inside React's tree into a body-level
          .chrono-container it appends after mount. Once React owns a
          node and a third-party script relocates it, the next
          reconciliation throws "Failed to execute 'removeChild' on
          'Node': The node to be removed is not a child of this node",
          which bubbled to error.tsx on every SPA navigation and looked
          to visitors like an intermittent 404.

          Booking is handled instead via /book, which embeds the
          Chronogolf tee-sheet in a plain <iframe>. React owns the
          iframe element; Chronogolf owns its internal document. The
          two never touch each other's DOM. BookButton.tsx links to
          /book and Next.js routes there normally.
        */}

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
