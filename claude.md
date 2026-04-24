# Birchbank Golf. Project Brain

## Project
Rebuilding birchbankgolf.com as a flagship demo site. Next.js 15 App Router,
React 19, Tailwind 4, Sanity CMS, Vercel, Chronogolf booking widget.

## Reference materials
- /docs/blueprint.md, full research blueprint (READ THIS FIRST)
- /reference/landing-page.html. Claude.ai/design export, source of truth for visual design
- /reference/screenshots/, section-by-section screenshots

## Design system (enforce these)
- Display: GT Sectra (or closest open-source: Fraunces)
- Text: GT America (or Inter as fallback)
- Mono: JetBrains Mono
- Colors: paper #F5F2EA, cedar #3C4A35, granite #2B2A28, silt #8C8A82,
  tamarack #C89B3C, amber #B5691F
- ONE primary CTA per viewport, cedar green filled, amber on hover
- Generous whitespace (min 120px between sections)
- Editorial serif-driven typography
- No stock imagery, no gradient overlays, no icon-heavy feature grids

## Working style
1. Read /docs/blueprint.md and /reference/landing-page.html before any work
2. Match the reference design pixel-for-pixel before adding interactivity
3. Build section by section, ship one before moving to next
4. GSAP ScrollTrigger + Lenis for the ball-into-hole hero
5. Chronogolf widget via next/script strategy="lazyOnload"
6. Preserve the voice from /docs/blueprint.md, no generic golf copy
7. When uncertain, match the reference HTML and ask before deviating

## Never
- Replace handcrafted sections with shadcn/ui defaults
- Add carousels, testimonial sliders, or parallax-for-parallax-sake
- Insert stock icons where typography should do the work
- Use "pristine," "picturesque," "nestled," or other banned clichés
- Generate AI copy for user-facing text without my review