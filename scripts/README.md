# Scripts

## `encode-hero.mjs`

Encodes the Blender PNG render sequence into WebP frames for the scroll hero.

```bash
# one-time: install cwebp from https://developers.google.com/speed/webp/download

# put your PNGs at ./hero-source/0001.png … 0120.png, then:
node scripts/encode-hero.mjs

# or with responsive tiers:
node scripts/encode-hero.mjs --tiers 960,1280,1920
```

See the header of the script for all flags.
