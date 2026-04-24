# The Birchbank Blueprint: Building the World's Best Golf Course Website

*A flagship research document for birchbankgolf.com, and a sellable template for every 18-hole course in North America.*

---

## Executive summary

This document is the complete research-and-decision foundation for rebuilding **birchbankgolf.com** as both (a) the real customer-facing site for a regional 18-hole course on the Columbia River in Castlegar, BC, and (b) a sellable demo template to pitch to golf courses across the USA and Canada. The brief is explicit: serve a 213-day season, integrate Chronogolf booking without losing brand cohesion, and do it with a scroll-driven signature hero (a ball rolling into the cup) that alone should sell the template.

**The five strategic conclusions driving every recommendation below:**

1. **The ball-into-hole hero is feasible, differentiated, and should be built.** The correct implementation is an **image-sequence canvas scrubbed by GSAP ScrollTrigger**, 120 frames at 1920×1080 sourced from Blender Cycles, delivered as WebP at ~3.5 MB desktop / ~1.2 MB mobile, with a hard fallback to a single still for `prefers-reduced-motion`. This is the Apple/Rolex pattern applied to a subject, a ball rolling 3 feet into a cup, that is almost perfectly suited to it.
2. **Chronogolf must be preserved, and the right integration is Option A: a hybrid.** The widget (the officially supported v2 JS snippet at `https://cdn2.chronogolf.com/widgets/v2`) opens a full-screen overlay from custom, brand-styled "Book a Tee Time" CTAs on the Next.js site. The Partner API exists but is gated to marketplaces; plan as if we won't get it, request access anyway, and upgrade the guest flow to API only if credentials arrive. Members always go to `members.chronogolf.com` (no SSO).
3. **Birchbank's real strategic narrative is "213 days on the Columbia."** It is the defensible, regionally-true, visually rich positioning that works simultaneously for Kootenay locals, BC retirees, interior road-trippers, Albertan weekenders, and, the most underpriced audience, cross-border Washington State golfers 3 hours from Spokane. The Roy-Stone-1962 / community-restoration-2018 heritage story is the supporting authenticity layer no local competitor can replicate.
4. **The stack is settled: Next.js 15 App Router + React 19 + Tailwind 4 + Sanity CMS + Vercel Pro + Chronogolf widget + Mapbox + Mux/YouTube + Resend + Plausible.** Baseline recurring cost ~$60–75 CAD/month. Full stack with optional Mux + Shopify Starter ~$110–140 CAD/month. Core Web Vitals targets: LCP <2.5s, CLS <0.1, INP <200ms, achievable even with the video/canvas hero if the loader is disciplined.
5. **The "I want that for my course" reaction is triggered by three transferable wow moments, not the ball hero alone:** live course conditions widget, real-time tee-sheet preview on homepage, and a genuinely interactive hole-by-hole flyover with custom SVG maps. Those are what close cold emails. The ball hero closes the first 10 seconds of the pitch.

Everything that follows is the evidence, and at the end, the blueprint, sitemap, page-by-page spec, motion direction, typography, palette, photography, copy voice, feature prioritization, and the sellable-template pitch layer.

---

## 1. The world's best golf course websites, what we learned

The research set included Pebble Beach, Bandon Dunes, Cabot Cape Breton, Cabot Saint Lucia, Whistling Straits/Destination Kohler, St Andrews Links, Sand Valley, Kiawah (Ocean Course), Pinehurst, Streamsong, TPC Sawgrass, Cape Kidnappers, Tara Iti, Te Arai Links, Ardfin, Royal County Down, Royal Melbourne, Castle Stuart, Ballyneal, Muirfield Village, Torrey Pines, Augusta/The Masters, Cabot Revelstoke, Predator Ridge, Bear Mountain, Fairmont Banff Springs, Fairmont Jasper Park Lodge, Chambers Bay, Gamble Sands, and the regional competitive set in the Kootenays (golfcastlegar.com, championlakesgolf.ca, granitepointe.ca, redstoneresort.com, kokaneesprings.com, balfourgr.com, christinalakegolf.com).

### Patterns of excellence observed across the elite tier

**One silent hero, full-bleed, long enough to breathe.** Aman, Amangiri, Opus One, Bugatti, Cabot Cape Breton, and Sand Valley all open with a single cinematic frame or ~10-second loop. No text for the first viewport in the most confident cases. The discipline is: the landscape is the product; the visitor is already interested; don't add adjectives.

**Editorial photography, never stock.** Pebble's Lone Cypress stills, Cabot's oceanfront drone frames, Streamsong's phosphate-land geology stills, Sand Valley's "Central Sands" prehistoric framing, every one is shot for the property, often in a single specific condition (mist, first light, October gold). Stock golf imagery is the single most visible marker of a tier drop.

**Hole-by-hole pages that function as listings, not tiles.** Bandon Dunes, Cabot, Streamsong, Pebble Beach, Sand Valley, Pinehurst, Kiawah, Gamble Sands (`gamblesands.com/hole-by-hole-flyovers/`), and Chambers Bay (`store.chambersbaygolf.com/golf-hole-by-hole.html`) each give every hole its own page: yardage table by tee, par, stroke index, aerial or flyover, designer notes, a strategy paragraph. Chambers Bay names every hole ("Blown Out," "Deception Point," "High Dunes," "Free Fall"), which is a textbook move for any course: names beat numbers.

**Booking integration that tries (and often fails) to feel native.** Pebble Beach deep-links to a resort reservation system. Cabot, Sand Valley, and Streamsong all push users into either their resort booking system or a calendar picker that opens in an overlay. Pinehurst uses the Marriott-adjacent booking tech. The pattern is: none of them embed a raw iframe; most open an overlay or a second-step page. The Chronogolf widget pattern (overlay from a custom CTA) is structurally identical to how these elite sites handle it. **This is the bar we can meet.**

**Stay-and-play as a product, not an afterthought.** Cabot's "Getting Here" FAQ discloses four airport tiers, drive times, helicopter charter (Breton Air), and car rental pricing honestly. Bandon's "How to Get to Bandon" covers Southwest Oregon Regional (35 min), Bandon State Airport (10 min, private), Eugene (2.5 hr), Portland (4.5 hr), and a StraightLine Private Air partner. Sand Valley sells drive times from Chicago, Milwaukee, Minneapolis. The pattern: name the airports, name the drive times, name the charter partner, name the car rental range, and don't be precious about it.

**Restraint in copy, specificity in facts.** Bandon Dunes: "Players walk." Augusta: "A tradition unlike any other." Pinehurst: "Cradle of American Golf." Streamsong's "closer than you think" and Cabot's "Never is the game of golf more appealing than when a course is set in a rugged, oceanfront landscape." The trick is one big idea per page, said once, clearly, with specificity backing it.

**Stories, not tours, for the About page.** Streamsong leans into its phosphate-mine origin ("Many millions of years ago, land that is now Streamsong Resort was covered by oceans…"). Sand Valley uses "the prehistoric Central Sands of Wisconsin." Cabot's story is Gaelic-Scottish heritage on Cape Breton. Pebble is the Lone Cypress, Stillwater Cove, Bing Crosby, Palmer and Hogan. **Geography as character is the formula.**

### Common failures even elite sites make

**Slow video heroes.** Many of the top sites still autoplay oversized H.264 hero videos with poor loading strategies, causing LCP regressions on mobile. Pebble Beach and Pinehurst both score below their aesthetic aspirations on Core Web Vitals.

**Booking flows that leak to the vendor domain with no loading-state cohesion.** Almost every elite site hands off to a different-looking interface for actual reservation. Cabot and Sand Valley handle it best because their overlay is visually aligned; most others feel like a seam.

**Overbuilt navigation.** Pinehurst's nav is heavy; Destination Kohler's is sprawling; Pebble's tries to sell 17-Mile Drive, real estate, Spa, and golf in the same top bar. The lesson for Birchbank: single top nav, one primary CTA ("Book a tee time"), everything else in a disciplined second tier.

**Stock fallbacks on secondary pages.** Even Cabot and Pebble drop to generic food photography on their bistro menus. Editorial carries the hero; everyone gets tired by the third subpage.

**Weak regional/Canadian competitive set.** Predator Ridge, Bear Mountain, Fairmont Banff Springs, Cabot Revelstoke, Chambers Bay, Gamble Sands, all have solid sites, but none deliver a signature scroll interaction, none show live course conditions, none integrate a weather-at-tee-time widget, none do a cross-border positioning page. **This is the tier Birchbank can leapfrog.** The BC/PNW regional competitive floor is template-quality, and the ceiling is polished-but-generic. There is room to be the best in the region by a wide margin.

### Signature interactions worth stealing (and one to invent)

From Apple (AirPods Max rotation, iPhone Pro scroll reveal), canvas image-sequence scrubbing with preloaded JPEGs. From Rolex (watch rotation), same technique, CGI source. From Rivian, long-form scroll storytelling with environment transitions. From Nothing, short video scrubbed by scroll. From Singita, booking/availability integrated into editorial without breaking the mood. From Bandon/Cabot/Streamsong, hole-as-listing with a named identity per hole. From Apple's product pages, sticky metadata sidebars during scroll. From Aman, horizontal drag galleries.

**The one to invent for Birchbank: the ball-into-hole hero.** It is a signature interaction no golf website has attempted, and it is the single asset most likely to produce an immediate "I want that for my course" reaction from any GM who sees it.

### Typography, color, and photography patterns from the elite set

- **Typography pairings** are almost uniformly one display serif + one neutral sans. GT Sectra, Canela, Tiempos Headline, and Schnyder dominate the display-serif side; GT America, Söhne, Inter, and Neue Haas Grotesk dominate the sans side. A handful use monospace for specs (Patek's date ring, Rivian's speedometer). Fluid scales with four sizes maximum.
- **Color palettes** pull from the actual landscape: Aman's sand and clay, Singita's ochre, Rivian's vehicle paint. Earth neutrals with one warm accent (amber, sunrise, gold).
- **Photography direction** is landscape-first, player-as-accent (Rivian, Rolex, Cabot), shot in single conditions (Aman's dawn, Singita's golden hour), with archive material used proudly where heritage exists (Filson, Patek, Pinehurst's 1895 imagery).

---

## 2. Chronogolf integration, the definitive plan

### What Chronogolf/Lightspeed Golf actually supports

The research, verified against `help.chronogolf.com`, `golf-support.lightspeedhq.com`, and `partner-api.docs.chronogolf.com`, confirmed four integration paths:

**A. JavaScript Booking Button Widget v2**, the primary officially supported method. The snippet is the one every Chronogolf-using WordPress site in North America uses today:

```html
<div class="chrono-bookingbutton"></div>
<script>
  window.chronogolfSettings = { "clubId": BIRCHBANK_ID, "locale": "en-CA" };
  window.chronogolfTheme = { "color": "#BIRCHBANKGREEN" };
</script>
<script>!function(d,i){if(!d.getElementById(i)){var s=d.createElement("script");s.id=i,s.src="https://cdn2.chronogolf.com/widgets/v2";var r=d.getElementsByTagName("script")[0];r.parentNode.insertBefore(s,r)}}(document,"chronogolf-js");</script>
```

Theming is limited to one hex color; fonts, layout, and copy in the overlay are Chronogolf's and cannot be overridden (cross-origin iframe blocks CSS injection).

**B. Legacy inline widget** (older plugin), same visual constraints, different DOM hook.

**C. Official WordPress plugin**, injects the v2 snippet; not relevant once we're on Next.js.

**D. Direct link / redirect to `chronogolf.ca/club/birchbank-golf-course`**, what Birchbank currently uses. Worst brand experience because the destination page shows competing courses ("Golf Courses Near Castlegar") and full Chronogolf chrome.

### Is there a public API? Yes, and no.

The **Lightspeed Golf Partner API v2** is real, REST/JSON, OAuth 2.0, documented at `partner-api.docs.chronogolf.com`. Confirmed endpoint tree includes courses, customers, player_types, reservation_requests, payment_confirmations, tee_times availability. Leadingcourses.com integrated it for European distribution. But **access is gated to registered OAuth partners**, typically marketplaces (GolfNow, TeeOff, Leadingcourses), not individual courses. Plan as if we won't be granted credentials.

### The recommendation: Option A (Hybrid), with Option B as an upgrade path

**Option A. Hybrid: custom Next.js shell + native Chronogolf widget, with smart CTAs.**

1. Build 100% of the marketing surface in Next.js on Vercel, home, course, rates, bistro, memberships, events, scorecard, plan-your-visit, history, all branded, fast (LCP target <1.5s).
2. Add the Chronogolf widget script globally in `app/layout.tsx` via `next/script` with `strategy="lazyOnload"` so it doesn't block LCP. Set `clubId`, `locale: "en-CA"`, and `chronogolfTheme.color` to the Birchbank primary brand color.
3. Replace the auto-injected floating button with our own styled "Book a Tee Time" CTAs. The widget binds to any element with class `chrono-bookingbutton`; we can either place that element invisibly and programmatically trigger it from a branded `<button>`, or hook directly into `window.chronogolfOpen` once feature-detected.
4. Keep a separate "Member Login" link opening `members.chronogolf.com/login` in a new tab.
5. Preconnect to `cdn2.chronogolf.com` and `www.chronogolf.com` in `<head>` for fast first-click open.
6. Add a permanent secondary CTA: the phone number **250-693-2366** next to every Book button. Widget failures cannot be dead ends.
7. Track Book-button clicks as GA4/Plausible events; treat them as intent conversions given that completed-booking analytics require the Partner API.

**Option B (upgrade path), request Partner API credentials, build a custom public-rate booking UI.**

Open a request with the Lightspeed account rep simultaneously with project kickoff, citing the site relaunch. If credentials arrive during the project, build a Next.js API route proxying `reservation_requests` and `tee_times` endpoints; move the guest flow to a fully custom booking UI on `birchbankgolf.com/book`; keep members on `members.chronogolf.com`. Do not proxy member bookings, buddy lists, prepaid packages, and 5/7/10/14-day advance windows are too coupled to reimplement.

**Option C, iframe the Chronogolf club page, is rejected.** No CSS control, leaks to competing courses via "Golf Courses Near Castlegar" links, vulnerable to future `frame-ancestors` CSP.

### Booking UX best practices to enforce (even with a vendor overlay)

From the research on foreUP, Sagacity, Golf Geek, NBC Tee It Up, and the Golf Course Technology Reviews rankings: default to today's date; show all tee times with price inline (no second tap to reveal rate); 1/2/3/4 player-count chips not a dropdown; cart/walking toggle before price; 9-vs-18 toggle prominent (Birchbank's $40/$75 split matters); green fee + cart + tax separated, total at bottom; member vs guest visually segregated; show *why* a price is what it is ("Twilight", "Shoulder Peak", "Beat the Heat"); course status (open/frost delay/cart-path-only) and weather at tee time displayed pre-booking; confirmation includes map, directions, arrival-20-min-early, rain check policy, bistro hours, dress code, .ics calendar file; SMS reminder option; 44px tap targets; sticky bottom Book bar on mobile; embed a "next available tee times today" widget on the homepage hero (Option B required for live preview).

### Competitive booking-engine landscape (context, not recommendation)

For the sellable template, the stack needs to support multiple booking engines, not just Chronogolf. The research confirmed that the field splits into:

- **Lightspeed Golf (Chronogolf)**, $200–325/mo; widget + gated Partner API; strongest in Canada.
- **foreUP**, $120–325/mo; open API; losing net clients to Lightspeed and Club Caddie in 2025.
- **GolfNow / EZLinks / Tee It Up (NBC)**, revenue-share; no open API; heavy marketplace cannibalization risk.
- **Club Caddie**, open API; growing 2025.
- **Sagacity Golf**, the revenue-management overlay ranked #1 by Golf Course Technology Reviews 2024.
- **Golf Geek**, best URL branding (`booking.yourcourse.com`); ranked #2.
- **GolfBack**, ranked #3; strong site integration.
- **Teesnap**, best mobile UX of the budget tier.
- **TenFore Golf**, rising upstart.

The template abstraction: build the Book component with a provider prop (`chronogolf` | `foreup` | `clubcaddie` | `golfback` | `teesnap`) and a consistent CTA surface. The same sales pitch then works across any North American course regardless of tee-sheet vendor.

---

## 3. The scroll-driven cinematic hero, feasibility, technique, and fallbacks

The signature concept: a ground-level, grass-perspective shot from beside a golf hole where, as the user scrolls, a ball rolls across the frame and drops into the cup. The verdict from the research: **highly feasible, genuinely differentiated, and should be built.** The subject is nearly ideal for scroll scrubbing, the action is short (1.5–3 seconds of real-world time), contained in the frame, mechanically satisfying in its payoff, and immediately communicates "golf" without a word of copy.

### Technique comparison

| Approach | Verdict for this hero |
|---|---|
| **CSS scroll-timeline / animation-timeline** | Great for secondary reveals (CSS-native in Chrome 115+, Safari 26, Firefox behind flag). Not sufficient for photoreal frame painting. Use for progress bar and peripheral effects. |
| **GSAP ScrollTrigger + ScrollSmoother** | **Primary recommendation.** Universal support, ~23 KB gzip, best-documented scroll library, free since Webflow's 2024 open-sourcing, scriptable fallbacks. Respects `prefers-reduced-motion`. |
| **Lenis (darkroomengineering)** | **Desktop-only companion.** ~4 KB gzip RAF inertia scroll. `smoothWheel: true, smoothTouch: false`, iOS handles touch natively. |
| **Framer Motion scroll-linked** | Good for UI reveals, wrong for scrubbing a 120-frame canvas. |
| **Three.js + R3F ScrollControls** | Overkill for a single beat. Worth adding only if we want real-time grass-wind shader behind the sequence. |
| **Lottie / Rive** | Wrong medium, photoreal grass is the brief. |
| **Video on scroll (`currentTime` scrubbing)** | Rejected. iOS Safari scrubbing is unreliable without every-frame-keyframe encoding; H.264 all-keyframe 1080p/4s is 20–40 MB; H.265/AV1 drops size but breaks Firefox/older Safari scrubbing. |
| **Image sequence scrubbing (Apple technique)** | **The winner.** Universal support, single paint per frame, WebP at 15–40 KB/frame, 1.5–4 MB total payload for 120 frames. |

### Ranked implementation options for the ball-into-hole

1. **Pre-rendered 3D image sequence, canvas-scrubbed (recommended).** Blender 4.x Cycles. Model one cup, one turf patch, the flagpole base, one ball. Light at golden hour with a Poly Haven HDRI. Render 1920×1080 at 30 fps × 4 seconds = 120 frames. Outsource to a freelance 3D artist: budget $1,500–$3,500. Encode with `cwebp -q 82` into three tiers (960/1280/1920). Total weight: ~1.2 MB mobile, ~3.5 MB desktop.
2. **Hybrid, static plate + animated ball sprite.** One hero still shot on a real green (dawn, macro lens) as fixed background; ball position and shadow scroll-driven as a canvas/SVG element, with a 30-frame mini-sequence for the drop moment. Total weight ~300–600 KB. Fastest, most accessible, easiest to art-direct. **Recommended as the mobile fallback.**
3. **Real footage, captured live.** Sony A7S III or FX3 at 120 fps with a Laowa 24mm Probe macro lens. Phantom Miro 311 at 1000 fps if budget allows ($1,500/day rental). Weather-dependent, 50+ takes realistic. Still exports to a frame sequence. Use as the final 10-frame "drop" overlay composited onto the 3D plate for extra authenticity.
4. **Pure WebGL (real-time).** Three.js ball on a CatmullRom curve with instanced grass. Allows user interaction (drag the ball). Photoreal grass at real-time on mid-range phones is still hard. Desktop-only; phase-2 experiment.
5. **AI generation (Sora 2 / Veo 3 / Runway Gen-4).** Use for moodboards and client pre-viz only. 2026 AI video cannot yet deliver frame-accurate ball trajectory on photoreal grass at the fidelity this hero demands. Re-evaluate in 2027.

### Production pipeline

- **Source:** Blender Cycles, 1920×1080, 30 fps, 4 seconds, 128 samples, OptiX denoiser. Estimated render: ~24 hours on an RTX 4080.
- **Encoding:** PNG sequence → WebP via `cwebp -q 82 -m 6 -af`. Generate AVIF siblings with `avifenc -s 6 -q 60` for modern browsers. JPEG fallback for the rare holdout.
- **Delivery:** CDN (Vercel or Cloudflare R2 + Images). `Cache-Control: public, max-age=31536000, immutable`. Preload first ~10 frames via `<link rel="preload" as="image">`; stream the rest behind the fold using an `IntersectionObserver` that starts preloading when the hero zone is within one viewport.
- **Responsive tiers:** pick by `window.devicePixelRatio * window.innerWidth` and `navigator.connection.effectiveType`/`saveData`. On `saveData`, degrade to the Option-2 hybrid fallback (one still + ball sprite).

### Runtime sketch

```js
const frameCount = 120;
const images = Array.from({length: frameCount}, () => new Image());
images.forEach((img, i) => {
  img.decoding = "async";
  img.src = `/hero/${String(i+1).padStart(4,"0")}.webp`;
});
const state = { frame: 0 };
gsap.registerPlugin(ScrollTrigger);
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const lenis = new Lenis({ smoothWheel: true, smoothTouch: false });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.to(state, {
    frame: frameCount - 1, snap: "frame", ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "+=1200", scrub: 0.5, pin: true },
    onUpdate: () => ctx.drawImage(images[state.frame], 0, 0, canvas.width, canvas.height),
  });
}
```

### Pacing, storytelling, and accessibility

**Beat structure (4s / 120 frames):** 0.0–0.8s, ball enters left, slow, low to ground; headline *"Play Birchbank"* fades up. 0.8–2.5s, roll across 60% of frame with a slight lateral wobble from an uneven lie; subhead appears (*"18 holes on the bend of the Columbia"*). 2.5–3.5s, ball hits the edge of the cup, rim-rides two frames, drops. 3.5–4.0s, settle; the "Book a Tee Time" CTA becomes prominent. Map to ~1,000–1,500 px of pinned scroll. Do not exceed 5 seconds; anything longer feels gimmicky and delays the CTA. Show the CTA from frame 60 onward, do not hide it behind the full animation.

**Accessibility:** `prefers-reduced-motion: reduce` → skip Lenis, disable pinning, serve one high-quality still (frame ~60, ball already in cup). `<h1>` and a visually-hidden `<p>` describe the scene for screen readers. `aria-hidden="true"` on the canvas. CTA is Tab-accessible before any scroll. 4.5:1 contrast for overlay text with a subtle gradient scrim. Provide a "skip intro" affordance that jumps past the pinned zone (Rivian's pattern).

**Mobile specifics:** `pin: true` on iOS Safari 17+ misbehaves during URL-bar show/hide. Mitigate with a shorter non-pinned mobile variant: a 300-vh wrapper with `position: sticky`, no pin, 60-frame sequence at 960×540 (~600 KB total). Test matrix: iPhone 12 mini, iPhone 15 Pro, Pixel 7a, Galaxy A54. Release prior frames via `ImageBitmap.close()` to stay under the ~384 MB iOS tab memory ceiling.

**SEO:** render headline/subhead/CTA as real HTML, not baked-in pixels. Include JSON-LD `GolfCourse` schema independent of the visual. Provide `og:image` using the mid-roll frame.

### Alternative hero concepts ranked (for phase-2 or campaign pages)

1. **Ball-into-hole**, ship this.
2. **First-tee POV** (ball on tee → backswing → impact → flight trace → landing → roll), richer but 8 seconds of scroll; phase-2.
3. **Dawn-round cinematic** (mist, first light, footsteps to first tee), emotionally strong Aman-style hero; pair as hero follow-up section.
4. **Drone flyover of the course on scroll**, classic but generic; use as secondary "Experience the course" section, not signature hero.
5. **18-hole parallax reveal** (dots on a map), excellent informational section, weak emotional hero.
6. **Sunrise-to-sunset time-lapse scrubbed by scroll**, beautiful but doesn't instantly say "golf."
7. **Split-screen seasonal shift** (April green vs October gold), good for a seasons/weather section.

---

## 4. Hole-by-hole storytelling, the "listing" approach

Every elite site treats each hole as its own page, not a dot on a map. The pattern from Bandon, Cabot, Streamsong, Pebble, Sand Valley, Pinehurst, Kiawah, Chambers Bay, and Gamble Sands: named identity + yardage table by tee + aerial/flyover + designer notes + strategy paragraph + pro tip. Chambers Bay names them ("Blown Out," "Deception Point," "High Dunes," "Free Fall"). **Birchbank should name all 18.**

### Interactive map technology comparison

| Approach | Cost | Verdict for Birchbank |
|---|---|---|
| **Custom SVG** rendered from course CAD/GIS data | $0 recurring + 30–60h design | **Recommended.** <30 KB for whole course, infinite zoom, pixel-perfect branding, fully interactive via React, no API calls. Used subtly by Bandon's `coursepreview.golf`. |
| **Mapbox GL JS** | Free under 50K web loads/mo; $5/1K after | Recommended for "Getting Here" location map only, not hole-by-hole. Custom basemap styled to brand. |
| **Google Maps** | Free tier more limited | Use only for `sameAs` schema links; not for site UX. |
| **Custom WebGL 3D course** | $10K–$50K | Phase-2 wow-only; not worth the cost for this audience. |
| **GolfLogix Fly-Over Tool** | ~$39.95/yr membership; full course mapping pricing not public | Useful for reference; embed only if budget is tight on custom flyover production. |

### Flyover production

Drone flyover pricing from vendors (2025–2026 benchmarks): Golf Drone USA from $350 single hole + clubhouse; Recon Aerial tiered 3/6/9/18-hole packages with $499–$899+ full production add; MTD Aerial $125/hr photography + $150 aerial video package; Golfcourseflyovers.co flat rates with 1-week delivery requiring 3 consecutive tee times. **Budget: $3,000–$6,000 for 18 flyovers + a promo reel shot in one day, host on YouTube (primary discoverability surface) + optional Mux for on-site player with `VideoObject` schema.** Golf Digest's "Every Hole At" series (Tom Doak narrating Pacific Dunes, Lorne Rubenstein on Cabot Cliffs, Jim Nantz on Pebble) is the aspirational bar; narration by Birchbank's head pro Jeff Papilion is the authentic bar and the right call.

### Recommended hole page structure for Birchbank

```
/course/holes/[1–18]
```

Each page contains: hero image (commissioned, specific condition, hole 7 in October frost, hole 13 at 8 PM in July); hole name ("The River Bend," "Old 5," "Tamarack Gate") + number + par; sticky metadata sidebar (par, yardage by 4 tees, stroke index, elevation change). Compass/Arc'teryx pattern; one-paragraph strategy narrative (designer's voice or pro's voice); pro tip from Jeff Papilion (callout style); custom SVG hole map with tees/hazards/yardage markers/green complex; embedded flyover video (YouTube + Mux); "previous hole / next hole" nav; breadcrumb schema.

---

## 5. Membership & season pass pages

### Patterns from the research

Private-club pattern (Cabot, Pine Valley, Pinehurst, Muirfield Village), prices hidden, "inquire" flow, waitlist management, member-of-member privileges, social proof heavy on founder/chairman quotes. Discreet pricing is a filter and a sales motion.

Regional semi-private pattern (Predator Ridge, Bear Mountain, Sagebrush), tier table with some pricing shown, benefits enumerated, inquiry form. More transparent than private, less than a daily-fee pass.

Daily-fee season-pass pattern (most relevant for Birchbank), transparent tier pricing, instant-purchase or simple application, minimal friction. This is the pattern Birchbank should use.

### Recommended Birchbank membership structure

Based on the course's real reality, regional, public-access, semi-private culture, existing Retirees Club, 213-day season, Kootenay price sensitivity, offer transparent tiers:

- **Adult (Single)**, full season unlimited play
- **Couple**, two adults, shared household
- **Family**, two adults + dependents under 19
- **Intermediate (19–35)**, reduced rate to build the next generation
- **Junior (under 19)**, entry tier
- **Retirees Club**, preserve the existing identity; weekday-focused benefits
- **Corporate (5-pack)**. Teck Trail / KBRH / Selkirk College target; transferable player cards
- **Non-Resident**, for Albertan/Washington members who visit 4–8 times a season
- **Fall Early Bird**, the existing current promotion; capture pre-season revenue in August/September with a 10–15% discount locked in

Transparent price display on the page, side-by-side comparison table (what's included for each tier), real member testimonials (see the three-part prompt structure in Section 11), instant purchase via Stripe or Chronogolf integration for renewals, inquiry form for first-time applications. Member portal teaser linking to `members.chronogolf.com` for tee booking, score entry (`scg.golfcanada.ca`), and account.

---

## 6. Restaurant, events, pro shop, and destination content

### The Bistro

Single `/bistro` page, not a multi-restaurant grid (Birchbank has one venue). Hero: 10–15 second muted autoplay cinemagraph of the 18th green / Columbia River view through the Bistro windows, the view *is* the product. Hours stated boldly ("Open Daily 12:00pm–5:00pm | Licensed") with automatic off-season swap. Post-round drink narrative, frame the Bistro as "Your 19th Hole" in the Pinehurst-Deuce style. HTML menu, not PDF; structured as Snacks / Shareables / Handhelds / Mains / Kids / Drinks, with signature items marked by a small "Birchbank pick" icon and local sourcing noted (Kootenay breweries, BC wines, earned media for regional travel writers). Reservations: "Walk-ins welcome, for groups of 8+ please call 250-693-2366" is sufficient at this scale; OpenTable is overkill. Private/group section on same page with capacity ("seats up to ~40 for private events") and a short inquiry form. Commission one half-day food photography shoot.

### Weddings and corporate events

Two pages: `/weddings` and `/corporate-events` (or `/tournaments`). Do not build a separate microsite (Predator Ridge's `okanaganweddings.com` is correct for their scale, overkill for Birchbank).

Weddings page: full-width hero of a couple on the 18th green / riverbank at golden hour (commissioned); one-paragraph narrative positioning Birchbank as a **Columbia River wedding venue** (compete on setting, not ballroom); three venue modes (ceremony on course, Bistro reception, tented outdoor) each with photo + capacity + format; preferred-vendor section with 5–8 named Kootenay partners; 2–3 testimonials; short inquiry form (7 fields max); optional PDF "Wedding Planning Guide" lead magnet. **Do not publish firm pricing.** Include one disclosure line: *"Wedding packages start from $75/person for food & beverage. Venue fees vary by season and day."*

Corporate tournaments page: more detail, corporate buyers want specifics. Shotgun minimum group size (60); package tiers with actual pricing (half-day, full-day, with/without F&B); add-ons menu (scoring, signage, tee gifts, contests, cart branding); sample schedule; downloadable tournament PDF brochure (still legitimate here, it gets forwarded internally by HR/event planners); inquiry form. Teck Trail/KBRH/Selkirk College corporate tournament flow is the unclaimed keyword territory.

### Pro Shop + Lessons

Pro Shop page: interior hero + pro helping a customer; hours banner (9am–7pm Daily, seasonal swap); "Featured This Month" carousel of 6 items; brand logo row ("We stock: Titleist, FootJoy, Ping, Callaway, Peter Millar…"); Jeff's Picks section; services strip (fitting, regripping, demo days, special orders); gift card buy button prominent. **E-commerce:** Shopify Buy Button ($5/mo Starter) for ~20–40 curated items + gift cards, not a full store. Rest is "in-store only, call to reserve."

Lessons page: Jeff Papilion (CPGA) bio with headshot, credentials, teaching philosophy in his voice; transparent lesson pricing (industry standard: 30-min $50–80, 60-min $90–140, 3-lesson package 10–15% off, playing lesson 9-hole $150–250, junior group clinic 4-session $100–180); Calendly or Cal.com inline embed for private lesson booking (not a third-party bounce); junior programs, clinics, leagues each get a mini subpage.

### Destination / stay-and-play / tourism, the biggest opportunity

This is where Birchbank has room to dramatically outperform the regional competitive set. No Kootenay course has a proper destination hub. Build `/plan-your-visit` with subsections:

- **By Air:** Castlegar YCG (12 min drive, direct Vancouver via Air Canada Jazz) → Trail Regional YZZ → Spokane GEG (3 hr 6 min, 148 miles, major US hub with direct flights to Seattle/Denver/Minneapolis/Phoenix/LA) → Kelowna YLW (4 hr, regional hub) → Cranbrook YXC (3 hr). **Cross-border note: Spokane-to-Birchbank is shorter than many Americans' commute to their home course, and shorter than Gamble Sands's own drive from Seattle.**
- **By Road:** Drive times from Vancouver (7 hr), Calgary (7 hr), Spokane (3 hr), Coeur d'Alene (3.5 hr), Kelowna (4 hr).
- **Border crossings:** Paterson, Waneta, Nelway, with hours. Trust signal for US golfers.
- **Ground transport:** West Kootenay Adventure Tours shuttle, Castlegar Taxi, rental agencies at YCG.

`/stay-and-play` page: RV Park + round(s) package (unique asset, lean in); 2–3 preferred hotel partners (Sandman, Prestige Lakeside, Best Western Kootenay, Rossland hotels) carded with photo / nightly rate / distance / inclusions / CTA; multi-course Kootenay Golf Trail package partnering with Castlegar GC, Redstone, Christina Lake, Granite Pointe via Kootenay Rockies Tourism's existing infrastructure.

`/local-area-guide`: Castlegar (Sculpturewalk, Doukhobor Discovery Centre, Zuckerberg Island, Millennium Ponds, Brilliant Bridge), Nelson (heritage downtown, craft breweries, Kootenay Lake), Trail (riverfront dining), Rossland (RED Mountain, MTB), BC Ale Trail, wineries, hot springs (Ainsworth, Halcyon, Nakusp), Syringa Provincial Park.

**`/usa-visitors`, the killer page no Kootenay course has.** Border crossing primer, NEXUS/passport guidance, USD-to-CAD exchange context, drive times from Spokane/CDA/Colville, direct comparison to PNW US courses ("Birchbank is closer to Spokane than Gamble Sands is"), Spokane-to-Birchbank stay-and-play packages. SEO target: "golf in Canada from Spokane."

---

## 7. Adjacent-industry inspiration, what we're stealing, from whom, and why

The research deep-dived 39 brands across luxury resorts (Aman, Rosewood, Six Senses, Singita, Nihi, Four Seasons, Amangiri), editorial/film (Apple, Studio Neat, Ritual, Oatly, NYT Interactive, Pitchfork), automotive (Porsche, Rivian, Polestar, Lucid, Bugatti, Zero Motorcycles), real estate (The Agency, Sotheby's, Luxury Portfolio, Compass), outdoor (Patagonia, YETI, Aether, Filson, Arc'teryx, On, Howler Brothers), wine/whisky (Opus One, Dalmore, Macallan, Bruichladdich, Château d'Yquem), and watches (Rolex, Patek Philippe, A. Lange & Söhne, Audemars Piguet).

The highest-leverage transferable patterns:

- **From Aman:** silent heroes, `Meditations`-style editorial dispatches, earth palette pulled from landscape, landscape-over-people photography.
- **From Rosewood:** the "Sense of Place" philosophy, every page must feel unmistakably Kootenay, not generic mountain golf.
- **From Singita:** booking integration that continues the editorial mood rather than bolting a CTA on.
- **From Apple/Rolex:** canvas image-sequence scroll scrubbing as primary hero technique.
- **From Rivian:** monumental typography, earth-tone palette from actual landscape paint, landscape-first photography with player/object as accent, amber sunrise CTA.
- **From Polestar:** single-typeface discipline; more premium than a multi-font system.
- **From Porsche:** fluid type scale (4 sizes max); emotion headline, then specs.
- **From Studio Neat:** permission to be text-first on certain pages (history, About).
- **From Ritual/Patagonia/Bruichladdich:** radical transparency as voice (water use, turf management, wildlife corridors, season-length climate signal, actual pricing).
- **From YETI/Singita:** character-driven portraits of staff and members, shot like editorial, quoted at length.
- **From Filson/Patek:** heritage card. Birchbank since 1962 is enough to earn an archival treatment (the 1963 photo in the Trail Historical Society archive. Cat. No. 1721, is a design asset).
- **From Compass/Arc'teryx:** sticky metadata sidebar on hole pages.
- **From Chateau d'Yquem:** the aphoristic mode, one line per section when the line is right.
- **From Pitchfork:** confidence to rate conditions numerically ("Greens: 10.5. Fairway firmness 7/10. Wind SW 14 km/h. A two-club day.").

---

## 8. Copywriting and editorial voice for Birchbank

### The cliché audit, phrases banned on Birchbank

*Picturesque, pristine, challenging yet fair, majestic, lush tree-lined fairways, manicured greens, a true test of golf, something for every golfer, nestled in, hidden gem, breathtaking views, rolling fairways, strategic layout, world-class, unforgettable round, golfer's paradise, where memories are made, bucket-list destination, championship-caliber, stunning, spectacular, every hole tells a story, true gem of the region, as it was meant to be played (owned by Bandon/Sand Valley), signature hole (overused), experience the tradition, golf the way it used to be.* Also avoid: *gem, jewel, paradise, oasis, sanctuary, haven, retreat, step back in time, journey, soul of the game* (owned by Bandon), *timeless* (use cautiously). The existing `birchbankgolf.com` copy uses "lush, tree-lined fairways", rewrite priority one.

### The Birchbank voice profile

**Five voice adjectives:** understated, Kootenay-rooted, unhurried, welcoming, quietly confident. Sixth (optional): honest, about conditions, pricing, history, and being a regional course proud of it. **Anti-patterns:** resort brochure copy, private-club humble-brag, adjective-stack hyperbole, sports-marketing energy, fake Scottish/heritage imitation, bro-golf meme voice.

**Calibration reference:** "Write it like Patagonia would describe a park + Aman would describe a garden + Bandon Dunes would describe the weather."

### 10 hero headline options

1. *213 days on the Columbia.*
2. *A river runs past it. So does the course.*
3. *Castlegar. 18 holes. One long season.*
4. *Since 1963, the course has followed the river.*
5. *Kootenay golf. No quotes needed.*
6. *Open April. Open October. Open to everyone.*
7. *The longest golf season in the Kootenays. Also the quietest.*
8. *Walk it. The river does.*
9. *A regional course with a world-class view.*
10. *Between two mountains. Beside one river. For sixty years.*

**Top three to A/B test:** #1 (owns the 213 number), #3 (place + reality), #6 (democratic, owns the season).

### Five tagline / positioning lines

1. *The Kootenays run on their own clock.*
2. *Birchbank. Since the river.*
3. *213 days. One river. Your course.*
4. *Open golf, on open ground.*
5. *Castlegar's course on the Columbia.*

### About-page hook

> **In 1962, Cominco leased a stretch of land between Trail and Castlegar, and a local pro named Roy Stone routed nine holes along the west bank of the Columbia. Then nine more.**
>
> Sixty-plus years later, the river is still here. So is the course, reconfigured in 2018 back to Stone's original 1969 routing, still walking the same banks, still catching the same morning light off the Monashees, still open 213 days a year because the Kootenay climate gives us that gift and we'd be foolish not to take it.
>
> Birchbank is a semi-private, public-access 18-hole parkland course. It's the course the people of Trail, Castlegar, Rossland, Nelson, Fruitvale, and Salmo grew up on. It's also, on any given October morning when the tamaracks turn, one of the most quietly beautiful places to hit a golf ball in western Canada.
>
> We're not going to tell you it's world-class. We're going to show you the 6 a.m. mist on the 14th fairway and let you decide.

### Seasonal lines

**April awakening:** *Opening day is a Kootenay holiday. The course opens April 1. The fairways are still firm from winter, the greens are true, and the rates are at their lowest of the year. Bring a jacket. The river is loud this time of year.*

**July peak:** *The course plays fast and the Bistro patio runs late. Long days. Twilight tee times from 4 p.m. Walk it if you can, the 213-day season rewards the people who keep showing up.*

**October gold:** *The tamaracks turn on hole 7. For about three weeks each October, the larches along the river go gold and the course is the best photograph in the Kootenays. Bring a camera. Book a late morning. Stay for the Bistro.*

**November shoulder/close:** *Last rounds before the quiet. We close October 31. Shoulder-season rates all month. The river gets quieter, and so do we, until April.*

**Daily conditions widget voice:** *Friday, 7:14 a.m. Course open. Frost delay lifted 8:30. Greens at 10.2. SW wind 12 km/h. A two-club day.*

### CTA language

Replace "Book Now" / "Play Today" with: **Book a tee time, Walk the 18, See this week's conditions, Join for the season, Reserve a twilight, Plan a Kootenay golf weekend.** Avoid: Experience, Discover, Unlock, Elevate.

### Member/guest testimonial structure

Prompt interviewees three ways: **the moment** (one specific shot, view, or conversation), **the season** (what month/conditions bring them back), **the comparison** (name another course; what does Birchbank do differently). Edit to 40–90 words; keep names, towns, handicaps; shoot real portraits (not phone selfies); 2–3 per page maximum.

Example: *"October 12th, hole 7, late afternoon. The larches had turned. My playing partner lined up a putt, looked up, and just stopped. Said, 'This is the whole reason.' That's the course, it keeps making you stop.". Dave, 9-handicap, Trail*

---

## 9. SEO, owning the winnable keywords

### Local SEO (highest-leverage)

Google Business Profile is non-negotiable. NAP byte-identical across GBP, site footer, JSON-LD, Apple Maps, Bing Places, Castlegar Chamber, Kootenay Rockies Tourism, Golf Canada, BC Golf Guide, Facebook. Primary category Golf Course + secondaries (Golf Club, Golf Instructor, Restaurant, Event Venue, Pro Shop). Weekly posts during season. 50+ geotagged photos. Reserve with Google toggled on via Lightspeed. Pre-seed top-20 FAQs. Automate post-round review requests, target 10+ new Google reviews per month to close the 78-review gap with Granite Pointe.

### Keyword strategy

**Primary (winnable):** "golf Castlegar," "Castlegar golf course," "golf Trail BC," "Birchbank golf," "Rossland Trail Country Club."
**Regional:** "Kootenay golf," "West Kootenay golf courses," "best golf course BC interior," "Rossland golf," "golf near Castlegar airport."
**Destination:** "golf trip British Columbia," "stay and play Kootenay," "BC interior golf package," "Spokane to BC golf," "golf weekend Trail BC."
**Buy-intent modifiers:** "tee times," "rates," "twilight," "membership," "league," "tournament," "wedding venue," "lessons."

Content-to-keyword map, URL structure, and schema markup live in the implementation annex at the end of this report.

### AI search optimization (AEO/GEO/LLMO), 2026

By mid-2025, AI-referred sessions grew 527% YoY, Google AI Overviews now appear on ~55% of searches (and reduce CTR on top-ranking pages by 58%), and ChatGPT handles ~2 billion queries per day. If Birchbank isn't cited by ChatGPT, Perplexity, Gemini, and Google AI Mode for "best golf course Castlegar" or "where to golf near Spokane," it is invisible to a fast-growing share of destination-planning golfers. Concrete actions: question-first H2s on every page ("How long is the Birchbank golf season?", "How do I get from Castlegar Airport to Birchbank?"); factual date-stamped 40–80-word answers below each; an `llms.txt` manifest at root; off-page authority building on GolfPass, BC Golf Guide, Kootenay Rockies Tourism, Destination BC, Golf Canada, ScoreGolf, Reddit r/golf and r/britishcolumbia; pursue a Wikipedia page on "Rossland Trail Country Club"; continue Trail Times press relationship. Of pages cited by ChatGPT, 71% use schema markup. Deploy it.

### Schema to ship

GolfCourse + LocalBusiness (NAP, geo ~49.1°N/-117.7°W, seasonally adjusted hours, `priceRange "$$"`), Restaurant (Bistro separate entity), Event (Rossland-Trail Open + every league/tournament), SportsActivityLocation, Product + Offer (pro shop), FAQPage (rates, membership, visitor info), AggregateRating (from Google reviews), BreadcrumbList, Course (lessons), VideoObject (flyovers), ImageObject (hero photography with `contentLocation`).

---

## 10. Technical stack, final recommendation

| Layer | Choice | Version / Notes |
|---|---|---|
| Framework | **Next.js App Router** on Vercel | 15.4+ (migrate to 16.x when stable mid-2026) |
| Runtime | React | 19.x |
| Language | TypeScript | 5.6+ |
| Styling | Tailwind CSS + shadcn/ui | Tailwind 4.x |
| Animation | GSAP + ScrollTrigger + Lenis + Framer Motion | GSAP 3.13+, Lenis 1.2+, Framer Motion 12.x |
| CMS | **Sanity** | Free tier → Growth $15/seat/mo |
| Hosting | **Vercel Pro** | $20/seat + usage |
| CDN/WAF | Cloudflare free in front of Vercel | DDoS/cost protection |
| Images | `next/image` + Vercel Image Optimization | AVIF/WebP auto |
| Video | YouTube primary; **Mux** optional | |
| Booking | **Chronogolf v2 widget** | Partner API upgrade path |
| E-commerce | Shopify Starter Buy Button (optional) | $5/mo |
| Maps | **Mapbox GL** for location + custom SVG for holes | |
| Search | **Fuse.js** client-side | No Algolia, content volume too small |
| Email | **Resend** + React Email | |
| Forms | Next.js Server Actions | |
| Analytics | Vercel Analytics + **Plausible** | No GA4 |
| Performance | Vercel Speed Insights | |
| Error monitoring | Sentry Developer (free) | |
| Uptime | Better Stack free | |
| SEO | `next-seo` + hand-coded JSON-LD | |
| A11y | axe DevTools + Pa11y in CI | |

**Monthly recurring cost:** Baseline (YouTube only, no Mux) ~$60–75 CAD. Full stack with Mux + Shopify ~$110–140 CAD. Annualized ~$720–$1,680, less than a single Birchbank membership.

**One-time build costs (separate from dev hours):** course photography $2,500–$5,000 (all 18 holes, clubhouse, Bistro, 3 seasonal shoots); drone flyover production $3,000–$6,000 (18 flyovers + promo reel in one day); professional copywriting $2,000–$4,000; 3D Blender hero render outsourced $1,500–$3,500; schema/AEO audit month 3 post-launch $500–$1,500.

### Performance targets

LCP <2.5s, CLS <0.1, INP <200ms at p75. Bundle budgets gzipped: Home ≤120 KB JS / ≤20 KB CSS / ≤180 KB LCP image; Course ≤140 KB / ≤20 KB / ≤200 KB; Book ≤180 KB; Blog ≤100 KB; Map ≤200 KB with Mapbox lazy-loaded. Enforce via `@next/bundle-analyzer` + `size-limit` CI gates. Target usable on 3G (1.6 Mbps / 300 ms RTT) for rural BC / highway planners. Test real devices via Chrome DevTools "Slow 4G" + WebPageTest from Seattle/Vancouver/Calgary nodes.

### Accessibility (WCAG 2.2 AA)

Respect `prefers-reduced-motion` globally. Hero video muted autoplay only with pause/play (WCAG 2.2.2) + static poster for reduced-motion. No flashes >3/sec. 4.5:1 contrast (3:1 large text). Visible focus indicators ≥3:1 (WCAG 2.4.11 new in 2.2). Target size ≥24×24 px (WCAG 2.5.8 new in 2.2). Keyboard nav for every CTA, map marker, gallery image. Radix UI or React Aria primitives for modals/dropdowns/tabs. Test with axe, WAVE, NVDA, VoiceOver, keyboard-only.

---

## 11. Competitive landscape & Birchbank positioning

### The local competitive set

| Course | Site | Strengths | Opportunity for Birchbank |
|---|---|---|---|
| **Castlegar Golf Club** | golfcastlegar.com | Collabo-built, modern, Tee-On booking, RV park, 20 sites, #2 best value Canada claim | No live conditions, no flyover on homepage, bistro reservation not online |
| **Champion Lakes** (Fruitvale) | championlakesgolf.ca | 4.4 Google, 12 reviews | Dated template, thin content |
| **Christina Lake** | christinalakegolf.com | Lakeside, family | Likely template-level |
| **Granite Pointe** (Nelson) | granitepointe.ca | 78 reviews (most in region), 1920 heritage | 3.38 rating, weak CMS, opens April 16 (Birchbank 15 days earlier) |
| **Redstone Resort** (Rossland) | redstoneresort.com | Only Les Furber Signature course in Canada, 4.6 rating, strong real estate focus | Real estate dominates homepage, muddies golf message |
| **Kokanee Springs** (Crawford Bay) | kokaneesprings.com | Regional flagship, Norman Woods design, polished site | 2-hour drive from Castlegar, different trip profile |
| **Balfour** | balfourgr.com | Les Furber, scenic | Dated site |

### SEO gaps Birchbank can own outright

**"Longest golf season Kootenay / BC Interior"**. April 1 open is the earliest confirmed among verified Kootenay competitors (Kokanee April 24, Granite Pointe April 16). Frame carefully: "longest season in the Kootenays" is defensible, "longest in BC" is not (Okanagan courses open mid-March).

**"Cross-border golf Canada from Spokane"**, no Kootenay course targets this keyword space. Birchbank can own it.

**"Corporate golf Trail BC / Teck"**, unclaimed. Teck Trail Operations employs ~2,000; Cominco-to-Teck continuity (Birchbank leased from Cominco 1962, sold to RTCC 2004) is a real narrative thread.

**"Columbia River golf views"**, unique to Birchbank within region. Scenic asset, not hazard. "River views without river risk."

### Birchbank's design history (verified)

Per `birchbankgolf.com/club-history` and Trail Historical Society records: J.D. Anderson owned the land through the 1910s–1930s, later Cominco. Reg Stone was greenskeeper/pro at the original Rossland-Trail Country Club (1939–1949). Construction began 1962; first 9 holes completed 1964; grand opening of the clubhouse April 9, 1965 (architect Allan McCulloch); back 9 + clubhouse addition 1969 designed by Roy Stone (CPGA pro, Reg Stone's brother). Rossland-Trail Country Club purchased the property from Cominco in 2004; the Rossland course was sold in 2006; reconfiguration to Stone's original 1969 routing completed June 1, 2018. **Narrative gold: "Designed in 1962 by local pro Roy Stone. Restored in 2018. Play the course as he built it."** No famous-architect competitor can touch the authenticity of community-owned / community-restored.

### Five positioning statements (choose 1 primary, 2 supporting)

**A. The Season Play (primary):** *"213 days on the Columbia. The longest season in the Kootenays."*
**B. The Heritage Play:** *"Designed in 1962. Restored in 2018. Play Roy Stone's course as he built it."*
**C. The Value Play:** *"Championship golf. Kootenay prices. River views free of charge."* (direct shot at Castlegar GC's value claim)
**D. The Cross-Border Play:** *"Three hours from Spokane. A world away from your Tuesday."* (for `/usa-visitors` + paid Spokane search)
**E. The Community Play:** *"Owned by the people who play it."* (true since 2004; use as supporting line)

---

## 12. Feature prioritization matrix

| Feature | Tier | Rationale |
|---|---|---|
| Chronogolf widget booking | **Must** | Contract requirement + primary revenue |
| Live course conditions widget (temp, wind, UV, greens speed, cart-path status) | **Must**. Birchbank / **Should**, template | Most concrete "useful wow." Reduces pro-shop call load. Universally transferable to any course. |
| Real-time tee-sheet preview on homepage | **Must** | Highest-converting element on any golf site. Lowers friction from homepage to book from 5 clicks to 2. |
| Interactive hole-by-hole pages with custom SVG maps + flyover videos | **Must** | Table stakes at this tier + differentiator vs regional set |
| Golf Canada handicap/score entry link (scg.golfcanada.ca) | **Must** | Already required. For US template: swap to GHIN. |
| Gift card e-commerce | **Must** | Lowest-effort revenue add |
| Member login portal link (members.chronogolf.com) | **Must** | Unavoidable, no SSO |
| Newsletter signup with seasonal-triggered cadence | **Must** | Email still #1 conversion channel |
| Weather-aware hero (seasonal/time-of-day imagery) | **Should** | Modest lift, moderate build cost; Birchbank's 213-day range has vivid variation |
| Weather forecast at tee time | **Should** | Under-utilized; reduces no-shows; Birchbank microclimate differs from Vancouver |
| Frost delay live alerts (SMS subscribe) | **Should**. Birchbank | Real shoulder-season feature |
| Pro shop Shopify Buy Button | **Should** | Lightweight, curated (~20–40 SKUs) |
| Bistro online reservations | **Should** | Competitive gap vs. local set |
| Tournament live leaderboards (BlueGolf embed for Rossland-Trail Open) | **Should** | Birchbank hosts the only 54-hole in BC interior |
| Photo gallery / UGC Instagram feed | **Should** | Cheap (Curator's API / LightWidget), effective |
| Voice-search / schema / FAQ markup | **Should** | 90% of golf sites lack schema, big SEO win |
| Ball-flight / shot-tracer aesthetic accents | **Could** | Low cost motion polish |
| GPS yardage tool | **Could** | Linked out (Arccos, 18Birdies) is better |
| Loyalty/rewards program | **Could** | Only if operationally supported |
| AR hole preview (mobile camera) | **Wow-only** | Demo gold, real usage minimal |
| Virtual course tour (Matterport) | **Wow-only** | Expensive per course; low revisit |
| AI concierge chatbot (FAQ-grounded) | **Wow-only** | Real value limited to answering "is course open," "dress code," "carts available", which are pro-shop call drivers |
| **Golden Hour Live drone timelapse** (new) | **Wow-only** | Automated daily drone hover, 15-sec loop on homepage |
| **Personalized hole recommendations by handicap** (new) | **Wow-only** | "Enter your handicap, here are 3 holes you'll love + 2 to manage." Converts lookers. |
| **AI pre-round brief from Jeff's cloned voice** (new) | **Wow-only** | Day-of tee time, 60s voice brief: "Jeff here. Wind's gusting south at 15. Greens 10.5. See you at 9:04." Opt-in. Unprecedented. |
| **Cross-border currency + crossing-time widget** (new) | **Wow-only** | For US visitors: "Leave Spokane 6:30am for 10:04 tee. Paterson border wait 8 min. USD→CAD $1.37." Uniquely useful. |
| **"Play where locals play" heatmap** (new) | **Could** | Live heatmap of BC/local member play. FOMO for visitors |

---

## 13. The sales/pitch layer, sellable as a template

### Competitive golf-website vendor landscape

- **Lightspeed Golf / Chronogolf templates**, bundled with subscription; WordPress/Divi; template-y. Low end.
- **foreUP website add-on**, homogeneous aesthetic (drone-video hero + 4 tiles); low-mid.
- **Clubessential** ($200/mo → $15–50K/yr for full suite), private-club-only walled ecosystem; overbuilt for public/semi-private.
- **BlueGolf** ($199–$999/yr), tournament-focused; free "course profile" site is templated.
- **ZAG Interactive** (acquired by Marquis 2023), 85% banks/credit unions; effectively no golf portfolio.
- **Buffalo Agency / Buffalo Groupe**. Pinehurst-tier; $10–50K/mo retainers; not SMB-course economics.
- **CourseLogix, RWM Golf, GolfBack Solutions**, low-mid, templated, dated.
- **1Click Golf Design**, limited public footprint; treat as comparable to RWM/CourseLogix at $1.5–3.5K setup + $50–150/mo.
- **Dribbble/Behance independents**, high-design, low-ops; don't carry the full stack.

### The industry's pricing bands (2026)

- **$0–3K (DIY / bundled):** Chronogolf, foreUP, BlueGolf, Wix + Chronogolf widget, where Birchbank has been living.
- **$3K–10K (agency-lite):** RWM, CourseLogix, GolfBack, local freelance, typical regional public course.
- **$10K–25K (regional design shop):** Collabo (built golfcastlegar.com), local creative agencies.
- **$25K–100K (custom for resorts):** Redstone-tier; Buffalo Agency, ZAG, reputable boutiques.
- **$100K+ (flagship):** Pebble, Cabot, Bandon. Buffalo Groupe, Work & Co, Huge.

### KMD's positioning: the gap between $10K templates and $100K agency

**Template pricing tiers (recommended):**

- **Fairway, $4,800 one-time + $95/mo.** Template skin, 5 pages, Chronogolf/foreUP embed, basic Bistro page, newsletter, contact. 3-week turnaround.
- **Championship, $14,500 one-time + $195/mo.** Everything above + custom hole flyover, live conditions widget, gift-card e-commerce, tournament module, 2 rounds of creative, basic SEO. 6-week turnaround.
- **Signature, $38,000+ one-time + $395/mo.** Fully custom design, original photo/drone shoot, AR/Matterport optional, AI concierge, full brand system. 12-week turnaround.

### What triggers "I want that for my course"

Three **transferable wow moments** close cold emails:
1. The live course conditions widget (ticking in real time).
2. The real-time tee-sheet preview on the homepage.
3. The interactive hole-by-hole flyover with custom SVG maps.

One **flagship-only wow** for the big pitch: the AI pre-round brief with cloned head-pro voice. Uniquely demonstrable, uniquely memorable, and cannot be found anywhere else in the industry.

The ball-into-hole hero closes the first 10 seconds. The three transferable wows close the first meeting.

### Sales motion

30-second Loom screen recording as primary ice-breaker (live-conditions ticking → hole flyover → booking flow in <10 seconds). Personalize each send: scrape target course's existing hero image, drop their logo onto the Birchbank skin as a GIF, subject line "Here's what [Cedar Ridge Golf Club] could look like next spring." Social proof ladder: Birchbank → one other Canadian course → one US course = three references breaks the psychological threshold. Pricing anchor: show Signature first, Championship looks reasonable. 10-slide pitch deck (hook, problem, solution, live demo, stack, features, proof/metrics, three tiers, timeline, CTA for 20-minute discovery call).

### "Built by KMD" signaling

Footer: small, tasteful "Crafted by KMD" linking to `kmd.agency/work/birchbank`. That case-study page is the lead-gen asset, a full teardown (wireframes, strategic decisions, results) doubling as "Want this for your course? Get a free teardown of your site." (Comparable precedent: Collabo credits itself in `golfcastlegar.com` footer, one-line tasteful.)

---

## 14. Site architecture (sitemap)

```
/                                  Home (ball-into-hole hero)
/course                            Overview, philosophy, walking ethos
/course/holes/[1-18]              18 individual hole pages
/course/scorecard                  Full scorecard, all 4 tees
/course/flyover                    18-hole video hub
/course/history                    Roy Stone + 2018 restoration + archive
/rates                             Green fees, twilight, Beat the Heat
/book                              Chronogolf widget landing page
/membership                        Tier comparison + Fall Early Bird
/membership/retirees-club          Legacy club identity preserved
/lessons                           Jeff Papilion bio + Calendly
/lessons/juniors                   Summer camps, junior programs
/lessons/clinics                   Women's, short-game, beginner
/leagues                           Men's night, Ladies' night, Mixed
/pro-shop                          Shopify Buy Button + featured items
/bistro                            Menu, hours, "Your 19th Hole"
/events                            Index of tournaments + weddings
/events/rossland-trail-open        Flagship tournament w/ BlueGolf leaderboard
/events/weddings                   Columbia River wedding venue
/events/corporate                  Tournaments, buyouts, Teck corporate
/stay-and-play                     RV park + hotel partners + Kootenay Trail
/plan-your-visit                   Airports, drive times, border, transport
/plan-your-visit/local-area        Castlegar/Nelson/Trail/Rossland guide
/usa-visitors                      Cross-border (USD rates, NEXUS, Spokane)
/about                             Short About + team
/about/team                        Jeff + greenskeeper + bartender portraits
/about/land-acknowledgement        Sinixt/Ktunaxa stewardship recognition
/conditions                        Live widget + greens/fairway status
/journal                           "Dispatches" (Aman Meditations model)
/journal/[slug]                    Blog posts
/faq                               Comprehensive FAQ w/ schema
/contact                           Phone, email, map, form
/members                           Link hub → members.chronogolf.com
```

Legacy URL redirects from the current `birchbankgolf.com` WordPress to this new structure are non-negotiable at launch. Canonicals + BreadcrumbList schema on every non-home page.

---

## 15. Blueprint, the page-by-page decisions in one place

### Typography system
- **Display serif:** GT Sectra (preferred) or Tiempos Headline or Canela, choose one.
- **Text sans:** GT America or Söhne or Inter.
- **Optional mono (scorecards, conditions widget, specs):** Söhne Mono or JetBrains Mono.
- Fluid scale, 4 sizes maximum. Fluid type: `clamp(1rem, 1vw + 0.8rem, 1.125rem)` pattern.

### Color palette (from the Columbia River valley)
- Paper white `#F5F2EA`
- River silt `#8C8A82`
- Tamarack October gold `#C89B3C`
- Cedar green `#3C4A35` (primary brand, likely the Chronogolf widget color)
- Granite shadow `#2B2A28`
- Amber CTA `#B5691F`

### Photography direction
Three dedicated seasonal shoot days: April awakening (low sun, firm turf, jackets), July peak (golden hour, long shadows), October gold (tamaracks turning, mist). One 6 AM dedicated mist/river shoot. One half-day food shoot for the Bistro (burger, a signature shared plate, a draft with the view, the patio at golden hour). One commissioned day of staff/member portraits. Jeff Papilion at the practice green, the greenskeeper at dawn, the Bistro bartender with the view behind, the longest-standing member in the clubhouse. Use the 1963 Trail Historical Society archive photo (Cat. No. 1721) prominently on `/course/history`. No drone-reel montages, one scroll-locked flyover of one signature hole is enough. No stock photography, ever.

### Motion direction
The ball-into-hole canvas image-sequence as signature hero. Lenis on desktop, native on touch. GSAP ScrollTrigger for hole-page reveals and scorecard sticky sidebar. Framer Motion for micro-interactions only. CSS scroll-timeline as progressive enhancement for progress bars. All motion respects `prefers-reduced-motion`. Scroll hero pacing: 4s / 120 frames / 1,200 px pinned. Never exceed 5s. Secondary scroll beats: horizontal gallery drag (Aman/Six Senses pattern) for seasonal photography; sticky metadata sidebar on hole pages (Compass/Arc'teryx).

### Copy voice
Five adjectives (understated, Kootenay-rooted, unhurried, welcoming, quietly confident). Cliché audit enforced in CMS schema (warn on "pristine," "picturesque," "nestled," etc.). One big idea per page. Specificity over superlatives, coordinates, dates, yardages, species names, wind directions. Geography as character.

### Signature hero spec (the ball-into-hole)
Blender Cycles source. 120 frames, 1920×1080, 30 fps, 4 seconds. WebP q=82 in three tiers (960 / 1280 / 1920). Preload first 10 frames; stream rest via IntersectionObserver. GSAP ScrollTrigger scrub (0.5) pinned 1,200 px on desktop; sticky 300-vh non-pinned on mobile. Reduced-motion fallback: frame 60 static. Total weight: ~1.2 MB mobile, ~3.5 MB desktop. Headline *"Play Birchbank"* visible from frame 1; subhead *"18 holes on the bend of the Columbia"* at frame 24; CTA *"Book a Tee Time"* visible from frame 60. Skip-intro affordance available throughout.

### Chronogolf integration spec
Next.js `<Script strategy="lazyOnload" />` loads the v2 widget. Custom "Book a Tee Time" button anywhere on the site binds via `.chrono-bookingbutton` hook. Preconnect to `cdn2.chronogolf.com` and `www.chronogolf.com`. `locale: "en-CA"`. Brand color on widget = Cedar green. Phone 250-693-2366 visible next to every Book CTA as fallback. Plausible/Vercel events on click. Simultaneous Partner API credential request to Lightspeed; upgrade guest flow to API if granted.

### Performance spec
LCP <2.5s on 4G, <1.5s on broadband. CLS <0.1 (reserve skeleton heights for widget and hero). INP <200ms. Gzipped JS budgets enforced in CI via size-limit. Canvas hero does not count as LCP, the H1 text overlay does; LCP image preload is first frame only. Cloudflare free in front of Vercel for DDoS cost-capping. ISR revalidate 60s for conditions/rates; 300s for journal; 3600s for static pages.

### Feature shipping order (phased)
**Phase 1 (Launch, Week 0):** Next.js 15 + Sanity schemas + full site scaffold + Chronogolf widget + 18 hole pages + rates + events + FAQ + journal + full schema + GBP optimization + Cloudflare + the ball-into-hole hero. Redirects from legacy WP live at cutover.
**Phase 2 (Months 1–2):** Commissioned photography + flyovers ingested, `/stay-and-play`, `/plan-your-visit`, `/usa-visitors`, Plausible, Speed Insights, AEO content refresh.
**Phase 3 (Months 3–6):** Pro shop Shopify Buy Button (if desired), custom SVG hole diagrams, newsletter seasonal automation, tournament live leaderboard (BlueGolf embed), review velocity automation, first blog posts.
**Phase 4 (Year 2):** Partner API custom booking flow if credentials arrive; AI pre-round brief; Golden Hour Live drone; handicap-based hole recommendations.

### Success metrics (measure from launch)
Organic sessions 2× in 12 months. "Kootenay golf" top-3 ranking in 12 months. AI Overview / ChatGPT citations for "best golf course Castlegar" in 6 months. GBP directions/calls/website clicks +50% in season 1. Core Web Vitals p75 "Good" across all URLs. Booking conversion rate (site → Chronogolf checkout) benchmarked at launch, improved quarterly. Google reviews velocity 10+/month minimum. Newsletter list 500+ by end of season 1.

---

## Conclusion, the three bets this blueprint makes

**First bet: the scroll-driven ball-into-hole hero is a defensible competitive moat.** It's feasible with 2026 technology (image-sequence canvas + GSAP), it's unique to golf (nobody has built it), it's cheap to produce (~$2,000 3D rendering) relative to its impact, and it is the single most pitchable asset for the template sales motion. Every other course on the continent has a drone video or a looping clubhouse shot; Birchbank has a ball that rolls when you scroll.

**Second bet: "213 days on the Columbia" is the right strategic anchor, and the cross-border Spokane positioning is the undervalued audience.** The season-length claim is regionally defensible, visually evocative, and works across every audience segment. The cross-border play is unclaimed keyword territory and genuinely useful. Spokane is closer to Birchbank than most Americans think, the exchange rate is perennially favorable, and no Kootenay competitor has a `/usa-visitors` page. These two narratives are Birchbank's sharpest competitive weapons.

**Third bet: the "flagship-built-by-locals" story scales as a template sales tool.** If the Birchbank site performs, measured in booking conversion, organic traffic, AI-search visibility, and the subjective "wow" of the scroll hero, then its existence as a live demo on a regional 18-hole daily-fee course becomes the most powerful proof point KMD can show other regional courses. Pebble Beach's site is impressive but unattainable; the Birchbank site is impressive and transparently replicable. That's the template sale. Three transferable wow features (live conditions, tee-sheet preview, hole flyover) close cold emails. The ball hero closes the first ten seconds of the pitch. And the $14,500 Championship tier sits exactly in the price band, between $3K templates and $100K agencies, where most North American courses can actually afford to buy.

Ship the hero, honor Roy Stone's routing, let the river do the selling, and put the 213-day statistic on every page that will carry it.

---

*Research contributors (7 parallel subagents): Chronogolf/Lightspeed integration deep-dive · Scroll-driven cinematic hero feasibility · Restaurant/Events/Pro Shop/Destination patterns · Adjacent industry + editorial voice · SEO + technical stack + performance · Sales/pitch layer + feature matrix + Birchbank positioning · Hole-by-hole + flyover production reference. Key source URLs cited inline throughout.*