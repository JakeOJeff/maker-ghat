# MakerGhat — Our Story

A pixel-accurate Next.js implementation of the "Our Story" page from Figma
(file `3zWPpfgDZLYeNyOFRwX6gO`, frame `1:311` — 1440 × 4503).

```bash
npm run dev     # http://localhost:3000
npm run build
npm start
npm run lint
```

## Stack

Next.js App Router + hand-written CSS. There is **no CSS framework** — Tailwind
was removed from the scaffold (`postcss.config.mjs` is empty and the Tailwind
packages are gone from `package.json`). The only JavaScript on the page is the
nav toggle in `SiteHeader`.

Fonts are the two families used in the Figma file, self-hosted through
`next/font/google`: **Parkinsans** (headings) and **Outfit** (body).

## Layout

```
app/
  layout.tsx                    fonts + document shell
  page.tsx                      composes the three blocks
  styles/tokens.css             :root design tokens, taken from Figma variables
  styles/base.css               reset
  components/
    SiteHeader.tsx  site-header.css    header + hamburger  (Figma 1:374)
    StoryCanvas.tsx story-canvas.css   tabs, hero, story    (Figma 1:311)
    SiteFooter.tsx  site-footer.css    footer               (Figma 1:390)
```

Class names follow BEM (`block__element--modifier`). Every colour, font size,
line height, weight, spacing step, radius and shadow comes from a `:root`
custom property in `styles/tokens.css`.

### The story canvas and `--u`

The story section is one interlocking composition: a dashed green path threads
between the photographs, the doodles and the year markers, so it cannot be
reflowed into a column without redrawing the artwork.

It is therefore laid out on a fixed 1440-wide stage in which every coordinate,
size and font size is expressed in **`--u`, one design pixel**:

```css
--u: min(1px, 100cqw / 1440);
```

At 1440px and wider `--u` is exactly `1px`, so the render is 1:1 with Figma.
Below that, every value shrinks by the same factor and the composition stays
proportionally identical at any width. Coordinates are written as literal Figma
numbers (`left: calc(133 * var(--u))`) so each rule is traceable to the design.

The header and footer are ordinary reflowing components and adapt at the
`1024px` and `768px` breakpoints.

## Assets

`public/assets/` holds the artwork. The SVGs (logo, chevrons, skyline, footer
mark, icons) are Figma exports used as-is. The two raster assets are exact crops
of the 1:1 page render, taken at their Figma coordinates:

| File | Figma node | Region |
| --- | --- | --- |
| `hero-3d-printer.jpg` | `1:366` | x 80, y 391, 1281 × 393 |
| `story-illustration.jpg` | timeline composition | x 33, y 784, 1328 × 3145 |

The illustration starts at x 33 rather than at the panel edge because the
paper-plane doodle in "Group 424" overhangs the cream panel. Every text block
and year marker was knocked out of that crop and is rendered as real HTML on
top, so all copy stays selectable, translatable and screen-reader accessible.

Both are regenerated from the committed source render with:

```bash
npm run build:assets     # scripts/build-figma-assets.mjs
```

`public/assets/raw/` holds the original Figma exports the crops are derived
from. They are kept because the Figma MCP asset URLs expire after about seven
days, but they are **not used by the page** — around 40MB of unreferenced files
currently sit inside `public/`, where Next.js serves them. Moving that folder
somewhere outside `public/` (for example `design/figma-raw/`) would keep the
provenance without shipping it.

## Deviations from the Figma file

Two, both deliberate:

1. **The footer is full-bleed.** In Figma the purple rectangle (`1:404`) is
   `x: -8, w: 1443`, so it stops 5px short of the 1440 frame and leaves a white
   sliver at the right edge. That reads as an artboard artefact rather than
   intent, and it cannot survive a fluid layout.
2. **An invisible node is omitted.** `1:408` is an "Email:" label coloured
   `#4a3a80` on the `#4a3a80` footer — it renders nothing.
3. **The tab shadows are clipped on two sides.** In Figma every tab carries
   `drop-shadow(0 4px 2px rgba(0,0,0,.25))`, which fell downwards onto the
   panel and out to the left of the first tab. Each tab still has its own
   shadow, but `.story-tabs` is extended 20px above the tabs, starts at the
   panel's left edge and is `overflow: hidden` — so the shadow shows above and
   between the tabs, and is cut off dead at the tabs' bottom edge and at the
   panel's left edge.
4. **The header tracks the body grid.** Figma pads the header 40px from the
   frame edge, which on a wide screen strands it against the viewport while the
   body sits centred. It now shares the story canvas' `--u` unit and its 1440
   grid, keeping Figma's 40px inset — so the logo and nav still overhang the
   cream panel by 40px, but follow the body rather than the window edge.

## Not in the Figma file

The frame contains a desktop layout only — there are no tablet or mobile
artboards. The `1024px` hamburger was specified in the brief; everything else
below 1440px is derived proportionally rather than designed. The dropdown
chevron in the header is drawn as in the design, but no open menu panel exists
in the file, so none was invented.

**The year markers are disclosure buttons.** Each marker toggles the frame
filed under that year in Figma (Frame 1114 – 1133) — bulleted lists for
2018 – 2025, a plain paragraph for 2026. One panel is open at a time.

The panel hangs below its marker and breaks out to the right of it: 400 wide
against the 195-wide marker for every year except 2018, whose frame Figma sizes
to 310. The copy is 18/28 `--color-primary-500` on `--color-neutral-200`, 15
padding, 20 radius, bullets as 4px dots at 11 with the text indented to 28 and
12 between items.

Those numbers were measured off screenshots of the year frames rather than read
from the API, because the Figma MCP quota for this account is exhausted. The
marker in each screenshot has known dimensions (195 × 84), which fixes the
scale and makes the rest exact — the two shots were at different zooms and both
resolve the marker to within 0.2px. Rendered line breaks match the design line
for line, including 2018's, which only wraps after "first" because of that
narrower frame.

Opening animates `grid-template-rows` from `0fr` to `1fr`, so a one-line year
and an eleven-line year open at the same rate rather than at a rate set by a
`max-height` ceiling.
