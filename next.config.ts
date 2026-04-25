import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(self)" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  {
    // Permissive enough for Chronogolf widget + Plausible + Vercel; tighten once confirmed.
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn2.chronogolf.com https://www.chronogolf.com https://chronogolf.ca https://plausible.io https://va.vercel-scripts.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://api.fontshare.com https://cdn2.chronogolf.com",
      "style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com https://api.fontshare.com https://cdn2.chronogolf.com",
      "font-src 'self' data: https://fonts.gstatic.com https://cdn.fontshare.com https://api.fontshare.com",
      "img-src 'self' data: blob: https://cdn.sanity.io https://www.chronogolf.com https://cdn2.chronogolf.com https://www.birchbankgolf.com https://birchbankgolf.com",
      "connect-src 'self' https://plausible.io https://vitals.vercel-insights.com https://vercel.live https://www.chronogolf.com https://cdn2.chronogolf.com https://api.resend.com",
      // 'self' added so the in-house BookingDrawer can iframe chronogolf.com,
      // and so the MenuPdfCard lightbox can iframe our own /bistro/menus/*.pdf.
      "frame-src 'self' https://www.chronogolf.com https://members.chronogolf.com https://chronogolf.ca",
      // Same-origin <object data="...pdf"> needs object-src 'self', otherwise
      // browsers fall back to the broken-document icon.
      "object-src 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const config: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "www.birchbankgolf.com" },
      { protocol: "https", hostname: "birchbankgolf.com" },
      { protocol: "https", hostname: "birchbankgolfcourse.files.wordpress.com" },
    ],
  },
  async redirects() {
    return [
      { source: "/club-history", destination: "/course/history", permanent: true },
      { source: "/golf", destination: "/course", permanent: true },
      { source: "/rates-and-fees", destination: "/rates", permanent: true },
      { source: "/restaurant", destination: "/bistro", permanent: true },
      { source: "/weddings", destination: "/events/weddings", permanent: true },
      { source: "/tournaments", destination: "/events/corporate", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        source: "/hero/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/og/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default config;
