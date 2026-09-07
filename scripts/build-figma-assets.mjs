/**
 * Derives the two raster page assets from the 1:1 Figma page render.
 *
 *   node scripts/build-figma-assets.mjs
 *
 * Input:  public/assets/raw/_fullpage.jpeg - the export of Figma frame 1:311
 *         ("OurStory", file 3zWPpfgDZLYeNyOFRwX6gO), exactly 1440 x 4503, so
 *         image coordinates are Figma coordinates.
 *
 * Output: public/assets/hero-3d-printer.jpg    the hero photograph (1:366)
 *         public/assets/story-illustration.jpg the illustrated timeline
 *         public/assets/story/*.jpg            the individual photographs
 *
 * The individual photographs are cut back out of the finished illustration for
 * the linear layout used below 1200px, where the composition cannot survive.
 * Their boxes were found by local texture: a photograph has high per-cell
 * variance, while the doodles, the dashed path and the cream ground are flat.
 *
 * The illustration crop starts at x 33 rather than the cream panel edge at
 * x 80, because the paper-plane doodle in "Group 424" overhangs the panel.
 *
 * Every text block and year marker is knocked out of the illustration and
 * filled with the panel cream, so that copy can be rendered as real HTML on
 * top of it. Each knockout was verified to sit on flat cream first, which is
 * why the fills are invisible.
 *
 * Requires sharp (a devDependency; it also ships inside Next.js).
 */

import { statSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import sharp from "sharp";

const SRC = "public/assets/raw/_fullpage.jpeg";
const OUT = "public/assets";

const HERO = { left: 80, top: 391, width: 1281, height: 393 };
const PLATE = { left: 33, top: 784, width: 1328, height: 3145 };

/** The panel cream (#f9f4e8) as it survives JPEG encoding. */
const CREAM = { r: 250, g: 244, b: 232 };

/** Measured ink bounds of each text block, padded by 6px. */
const PAD = 6;
const TEXT_BLOCKS = [
  [134, 858, 215, 29], // "Our mission"
  [134, 920, 395, 125], // mission copy
  [871, 1123, 250, 39], // "Why making?"
  [871, 1185, 361, 128], // why copy
  [220, 1443, 212, 73], // "How did MG start"
  [219, 1546, 344, 128], // how copy
].map(([x, y, w, h]) => [x - PAD, y - PAD, w + PAD * 2, h + PAD * 2]);

/** The nine year markers (Figma 1:854 - 1:862), 195 x 84, padded by 4px. */
const YEAR_MARKERS = [
  [458, 1978], [812, 1972], [859, 2274],
  [486, 2288], [134, 2610], [780, 2638],
  [750, 3089], [234, 2902], [665, 3383],
].map(([x, y]) => [x - 4, y - 4, 203, 92]);

const knockouts = [...TEXT_BLOCKS, ...YEAR_MARKERS].map(([x, y, w, h]) => ({
  input: { create: { width: w, height: h, channels: 3, background: CREAM } },
  left: x - PLATE.left,
  top: y - PLATE.top,
}));

/**
 * The twelve photographs, in illustration coordinates (page coordinates less
 * PLATE.left / PLATE.top). The first three belong to the three narrative
 * sections; the rest sit along the timeline, one per year. Years are matched
 * to photographs by position along the path, which the design does not state
 * explicitly - see README.
 */
const PHOTOS = [
  ["mission", 1040, 72, 272, 168],
  ["why", 112, 328, 344, 216],
  ["how", 672, 648, 584, 400],
  ["y2018", 104, 1216, 296, 224],
  ["y2019", 936, 1288, 320, 152],
  ["y2021", 240, 1560, 168, 240],
  ["y2020", 968, 1584, 272, 224],
  ["y2022", 376, 1872, 264, 200],
  ["y2023", 960, 2056, 288, 184],
  ["y2025", 112, 2224, 368, 328],
  ["y2024", 920, 2360, 336, 200],
  ["y2026", 936, 2704, 288, 216],
];

const jpeg = { quality: 90, chromaSubsampling: "4:4:4" };

await sharp(SRC).extract(HERO).jpeg(jpeg).toFile(`${OUT}/hero-3d-printer.jpg`);
await sharp(SRC).extract(PLATE).composite(knockouts).jpeg({ ...jpeg, quality: 88 })
  .toFile(`${OUT}/story-illustration.jpg`);

await mkdir(`${OUT}/story`, { recursive: true });
for (const [name, left, top, width, height] of PHOTOS) {
  await sharp(`${OUT}/story-illustration.jpg`)
    .extract({ left, top, width, height })
    .jpeg(jpeg)
    .toFile(`${OUT}/story/${name}.jpg`);
}
console.log(`story/*.jpg`.padEnd(26) + ` ${PHOTOS.length} photographs`);

for (const file of ["hero-3d-printer.jpg", "story-illustration.jpg"]) {
  const { width, height } = await sharp(`${OUT}/${file}`).metadata();
  const kb = (statSync(`${OUT}/${file}`).size / 1024).toFixed(0);
  console.log(`${file.padEnd(26)} ${width}x${height}  ${kb}KB`);
}
