#!/usr/bin/env node
/**
 * Renders the default social sharing image at public/og-default.jpg
 * (1200×630, the Open Graph / Twitter "summary_large_image" size).
 *
 * Composition: the E14 concert photo, darkened with a gradient so the
 * lettering stays legible in a feed, the gold logo, and the site tagline in
 * the site's display/body typefaces (Cormorant Garamond + Archivo). The
 * fonts are fetched from the google/fonts repository (cached in /tmp) and
 * embedded directly in the SVG as base64 @font-face rules, ensuring self-
 * contained rendering.
 *
 * Usage:  node scripts/generate-og-image.mjs
 */
import { readFile, stat, writeFile } from "node:fs/promises";
import fs from "node:fs";
import path from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";

const WIDTH = 1200;
const HEIGHT = 630;
const GOLD = "#C6A05C";
const CREAM = "#F6F3ED";
const BACKGROUND = "#0E0C09";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE_PHOTO = path.join(root, "public/EventHighlights/E14.jpeg");
const LOGO = path.join(root, "public/logo-gold.png");
const OUTPUT = path.join(root, "public/og-default.jpg");

const FONTS = {
  "CormorantGaramond.ttf":
    "https://raw.githubusercontent.com/google/fonts/main/ofl/cormorantgaramond/CormorantGaramond%5Bwght%5D.ttf",
  "Archivo.ttf":
    "https://raw.githubusercontent.com/google/fonts/main/ofl/archivo/Archivo%5Bwdth%2Cwght%5D.ttf",
};

async function loadFonts() {
  const fontBase64 = {};
  for (const [file, url] of Object.entries(FONTS)) {
    const locations = [path.join(tmpdir(), file), path.join("/tmp", file)];
    const existing = locations.find((p) => fs.existsSync(p) && fs.statSync(p).size > 1000);
    let buf;
    if (existing) {
      buf = await readFile(existing);
    } else {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Font download failed (${res.status}): ${url}`);
      buf = Buffer.from(await res.arrayBuffer());
      await writeFile(locations[0], buf);
    }
    fontBase64[file] = buf.toString("base64");
  }
  return fontBase64;
}

function escapeXml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function overlaySvg(fonts) {
  const title = escapeXml("GnF Events");
  const subtitle = escapeXml("Artist Booking in Pakistan");
  const footer = escapeXml("Singers · Bands · Celebrities · Full Event Production");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <style type="text/css">
      @font-face {
        font-family: "Cormorant Garamond";
        src: url("data:font/ttf;base64,${fonts["CormorantGaramond.ttf"]}") format("truetype");
        font-weight: 500;
        font-style: normal;
      }
      @font-face {
        font-family: "Archivo";
        src: url("data:font/ttf;base64,${fonts["Archivo.ttf"]}") format("truetype");
        font-weight: 500 700;
        font-style: normal;
      }
    </style>
    <linearGradient id="shade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${BACKGROUND}" stop-opacity="0.55"/>
      <stop offset="0.45" stop-color="${BACKGROUND}" stop-opacity="0.72"/>
      <stop offset="1" stop-color="${BACKGROUND}" stop-opacity="0.96"/>
    </linearGradient>
    <linearGradient id="side" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${BACKGROUND}" stop-opacity="0.75"/>
      <stop offset="0.6" stop-color="${BACKGROUND}" stop-opacity="0.15"/>
      <stop offset="1" stop-color="${BACKGROUND}" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#shade)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#side)"/>
  <rect x="0" y="0" width="${WIDTH}" height="6" fill="${GOLD}"/>
  <text x="300" y="318" font-family="Cormorant Garamond" font-weight="500" font-size="128" fill="${CREAM}">${title}</text>
  <rect x="300" y="352" width="72" height="3" fill="${GOLD}"/>
  <text x="300" y="416" font-family="Archivo" font-weight="700" font-size="40" letter-spacing="9" fill="${GOLD}">${subtitle.toUpperCase()}</text>
  <text x="300" y="470" font-family="Archivo" font-weight="500" font-size="21" letter-spacing="3" fill="${CREAM}" fill-opacity="0.82">${footer.toUpperCase()}</text>
  <text x="${WIDTH - 72}" y="${HEIGHT - 42}" text-anchor="end" font-family="Archivo" font-weight="600" font-size="20" letter-spacing="4" fill="${GOLD}">GNFEVENTS.COM.PK</text>
</svg>`;
}

async function main() {
  const fonts = await loadFonts();
  const { default: sharp } = await import("sharp");

  const logo = await sharp(LOGO).resize({ width: 190, height: 190, fit: "inside" }).png().toBuffer();

  await sharp(SOURCE_PHOTO)
    .resize(WIDTH, HEIGHT, { fit: "cover", position: "attention" })
    .modulate({ saturation: 0.9 })
    .composite([
      { input: Buffer.from(overlaySvg(fonts)), top: 0, left: 0 },
      { input: logo, top: 236, left: 80 },
    ])
    .jpeg({ quality: 86, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toFile(OUTPUT);

  const { width, height } = await sharp(OUTPUT).metadata();
  const { size } = await stat(OUTPUT);
  console.log(`Wrote ${path.relative(root, OUTPUT)} (${width}×${height}, ${Math.round(size / 1024)} KB)`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
