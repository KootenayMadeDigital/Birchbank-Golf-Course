# Birchbank Golf

A flagship-grade site for Birchbank Golf Course in Castlegar, BC, and the reusable template behind the KMD golf-site offering.

Stack: **Next.js 15 · React 19 · TypeScript · Tailwind 4 · Sanity (opt.) · Vercel · Chronogolf widget · GSAP + Lenis**.

See [Birchbank Golf Course Blueprint.md](./Birchbank%20Golf%20Course%20Blueprint.md) for the full research and strategic doc.

## Running locally

```bash
cp .env.example .env.local    # fill in what you have
npm install
npm run dev                   # http://localhost:3000
```

Scripts:

```bash
npm run dev        # dev server, Turbopack
npm run build      # production build
npm run start      # serve the production build
npm run typecheck  # tsc --noEmit
npm run lint       # next lint
```

## Environment

| Var | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (used by metadata + schema + sitemap). |
| `NEXT_PUBLIC_CHRONOGOLF_CLUB_ID` | Birchbank's Lightspeed/Chronogolf club ID, the widget opens against this. |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Plausible domain for analytics. Leave blank to disable. |
| `SANITY_PROJECT_ID` / `SANITY_DATASET` | Optional, only needed if you wire up the CMS. |
| `RESEND_API_KEY` / `CONTACT_TO_EMAIL` | Optional. Contact & newsletter forms log locally until this is set. |

## The scroll hero

Expects **120 WebP frames** at `/public/hero/0001.webp` → `0120.webp`, plus a single `fallback.jpg` (frame ~60 is the convention). The hero component auto-detects and gracefully falls back to the static image if the frames aren't present.

Production pipeline ([scripts/encode-hero.mjs](./scripts/encode-hero.mjs)):

```bash
# put your Blender PNG renders at ./hero-source/
node scripts/encode-hero.mjs --tiers 960,1280,1920
```

Full spec in blueprint §3.

## Chronogolf integration

The v2 widget loads via `next/script strategy="lazyOnload"` in [src/app/layout.tsx](./src/app/layout.tsx). Every branded "Book a tee time" button in [BookButton.tsx](./src/components/BookButton.tsx) carries the `chrono-bookingbutton` class so the widget binds to it automatically.

- Widget color: `#3C4A35` (cedar)
- Locale: `en-CA`
- Partner API upgrade path: request credentials from Lightspeed at project kickoff; if granted, swap `/book` to a fully custom UI.

## Content

Until Sanity is wired, content lives in typed files:

- [src/data/holes.ts](./src/data/holes.ts), 18 holes with names, yardages, descriptions, pro tips
- [src/data/rates.ts](./src/data/rates.ts), green fees, cart, memberships, promos
- [src/data/faq.ts](./src/data/faq.ts). FAQ (rendered into `FAQPage` schema)

When you're ready for the CMS: see [sanity.config.ts](./sanity.config.ts), everything is wired except the npm packages.

## SEO / AEO

- JSON-LD: `Organization`, `GolfCourse`, `BreadcrumbList`, `FAQPage`, `Event`, all in [src/lib/schema.ts](./src/lib/schema.ts)
- Dynamic `opengraph-image.tsx` on every route
- `sitemap.ts` covers 31 routes + 18 hole pages + journal
- `llms.txt` at `/public/llms.txt` for LLM discoverability

## Accessibility

- Respects `prefers-reduced-motion` globally (hero falls back to still)
- Skip-to-content link
- Focus indicators per WCAG 2.4.11
- Min-44px tap targets on primary CTAs (WCAG 2.5.8)

## Deploy

1. Push to GitHub
2. Import into Vercel
3. Set environment variables
4. Point DNS at Vercel (apex + www, with middleware handling the canonical redirect)

## Credits

Crafted by KMD. Blueprint by the research team; implementation by Claude Code.
