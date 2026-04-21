# Hero frames

The ball-into-hole scroll hero expects **120 WebP frames** at this path:

```
/public/hero/0001.webp
/public/hero/0002.webp
...
/public/hero/0120.webp
```

Also place a single **fallback.jpg** in this folder — used for `prefers-reduced-motion` and for browsers/users that can't load the sequence. Use frame ~60 (ball already in cup).

## Production spec (from blueprint §3)

- Source: Blender 4.x Cycles, 1920×1080, 30 fps, 4 seconds, 128 samples, OptiX denoiser
- Encoding: `cwebp -q 82 -m 6 -af` from PNG sequence
- Optional responsive tiers: `/hero/960/0001.webp`, `/hero/1280/`, `/hero/1920/`
- Total weight budget: ~1.2 MB mobile, ~3.5 MB desktop
- The component has a graceful fallback until frames are added — the page will still ship.

## Pacing (120 frames / 4s)

- 0–24  ball enters left
- 24–75 roll across frame
- 75–90 rim ride
- 90–120 settle in cup
