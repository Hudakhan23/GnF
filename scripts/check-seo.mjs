#!/usr/bin/env node
/**
 * Post-build SEO checks against the prerendered HTML in .next/server/app.
 * Run `npm run build` first, then `npm run check:seo`.
 *
 * Verifies: one self-referencing canonical per page (none on 404), robots meta
 * consistent with the sitemap, every sitemap URL exists and is indexable, every
 * indexable artist page has a crawlable <a href> from another page, JSON-LD
 * parses, the Organization entity is defined once per page, and every tel:
 * link is an E.164 number from the approved list.
 */
import fs from "node:fs";
import path from "node:path";

const SITE = "https://www.gnfevents.com.pk";
const APP_DIR = path.join(process.cwd(), ".next/server/app");
const ALLOWED_TEL = new Set(["tel:+923219492571", "tel:+923009492571"]);
const PRIMARY_PHONE = "+923219492571";

const failures = [];
const fail = (msg) => failures.push(msg);

if (!fs.existsSync(APP_DIR)) {
  console.error("No build output found. Run `npm run build` first.");
  process.exit(1);
}

const read = (file) => fs.readFileSync(path.join(APP_DIR, file), "utf8");

// --- collect prerendered pages ------------------------------------------------
const pages = new Map(); // route path -> html
const addPage = (file, route) => pages.set(route, read(file));
addPage("index.html", "/");
for (const name of ["about", "artists", "contact", "how-to-book", "work"]) {
  addPage(`${name}.html`, `/${name}`);
}
for (const file of fs.readdirSync(path.join(APP_DIR, "artists"))) {
  if (file.endsWith(".html")) {
    addPage(`artists/${file}`, `/artists/${file.replace(/\.html$/, "")}`);
  }
}
const notFoundHtml = read("_not-found.html");

const attr = (tag, name) =>
  (tag.match(new RegExp(`${name}="([^"]*)"`)) || [])[1];
const canonicalsOf = (html) =>
  [...html.matchAll(/<link[^>]*rel="canonical"[^>]*>/g)].map((m) => attr(m[0], "href"));
const robotsOf = (html) =>
  [...html.matchAll(/<meta[^>]*name="robots"[^>]*>/g)].map((m) => attr(m[0], "content"));
const hrefsOf = (html) =>
  [...html.matchAll(/<a[^>]*href="([^"]+)"/g)].map((m) => m[1]);
const jsonLdOf = (html) =>
  [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(
    (m) => m[1]
  );

// --- per-page checks ----------------------------------------------------------
const noindex = new Set();
const canonicalOwners = new Map();
for (const [route, html] of pages) {
  const expected = route === "/" ? SITE : `${SITE}${route}`;
  const canonicals = canonicalsOf(html);
  if (canonicals.length !== 1) fail(`${route}: ${canonicals.length} canonical tags`);
  else if (canonicals[0] !== expected) fail(`${route}: canonical ${canonicals[0]} ≠ ${expected}`);
  if (canonicalOwners.has(canonicals[0])) fail(`${route}: duplicate canonical with ${canonicalOwners.get(canonicals[0])}`);
  canonicalOwners.set(canonicals[0], route);

  const robots = robotsOf(html);
  if (robots.length > 1) fail(`${route}: ${robots.length} robots meta tags`);
  if (robots.some((r) => r.includes("noindex"))) noindex.add(route);

  let orgDefinitions = 0;
  for (const block of jsonLdOf(html)) {
    let data;
    try {
      data = JSON.parse(block);
    } catch {
      fail(`${route}: invalid JSON-LD`);
      continue;
    }
    for (const node of [data].flat()) {
      if (node["@id"] === `${SITE}/#organization` && node.name) {
        orgDefinitions++;
        if (node.telephone !== PRIMARY_PHONE) fail(`${route}: Organization telephone ${node.telephone}`);
      }
    }
  }
  if (orgDefinitions !== 1) fail(`${route}: Organization defined ${orgDefinitions} times`);

  for (const href of hrefsOf(html)) {
    if (href.startsWith("tel:") && !ALLOWED_TEL.has(href)) fail(`${route}: unexpected ${href}`);
  }
}

// --- 404 ----------------------------------------------------------------------
if (canonicalsOf(notFoundHtml).length) fail("404: has a canonical tag");
const notFoundRobots = robotsOf(notFoundHtml);
if (notFoundRobots.length !== 1 || !notFoundRobots[0].includes("noindex")) {
  fail(`404: robots meta ${JSON.stringify(notFoundRobots)}`);
}

// --- sitemap & robots.txt -----------------------------------------------------
const sitemap = read("sitemap.xml.body");
if (!sitemap.startsWith("<?xml") || !sitemap.includes("</urlset>")) fail("sitemap: not a urlset document");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const imageEntries = (sitemap.match(/<image:loc>/g) || []).length;
const sitemapRoutes = new Set(sitemapUrls.map((u) => u.replace(SITE, "") || "/"));
if (sitemapRoutes.size !== sitemapUrls.length) fail("sitemap: duplicate URLs");
for (const route of sitemapRoutes) {
  if (!pages.has(route)) fail(`sitemap: ${route} has no prerendered page`);
  if (noindex.has(route)) fail(`sitemap: ${route} is noindex`);
}
for (const route of pages.keys()) {
  if (!noindex.has(route) && !sitemapRoutes.has(route)) fail(`sitemap: indexable ${route} missing`);
}
const robotsTxt = read("robots.txt.body");
if (!/User-Agent: \*\nAllow: \//.test(robotsTxt)) fail("robots.txt: does not allow all crawlers");
if (!robotsTxt.includes(`Sitemap: ${SITE}/sitemap.xml`)) fail("robots.txt: sitemap line missing");

// --- crawlable artist links ---------------------------------------------------
const artistRoutes = [...pages.keys()].filter((r) => r.startsWith("/artists/"));
const inbound = new Map(artistRoutes.map((r) => [r, new Set()]));
for (const [route, html] of pages) {
  for (const href of hrefsOf(html)) {
    if (inbound.has(href) && href !== route) inbound.get(href).add(route);
  }
}
const directoryLinks = new Set(hrefsOf(pages.get("/artists")).filter((h) => inbound.has(h)));
const indexableArtists = artistRoutes.filter((r) => !noindex.has(r));
for (const route of indexableArtists) {
  if (!inbound.get(route).size) fail(`orphan: ${route} has no crawlable inbound link`);
}
const missingFromDirectory = artistRoutes.filter((r) => !directoryLinks.has(r));
if (missingFromDirectory.length) fail(`/artists HTML missing ${missingFromDirectory.length} artist links`);

// Link instances on /artists by section. Repeats are expected: the
// exclusive spotlight, the first 24 interactive cards and the full A–Z index
// each link the same profiles for different purposes.
const directoryHtml = pages.get("/artists");
const SECTION_MARKERS = [
  ["exclusive spotlight", 'id="exclusive"'],
  ["interactive directory (first page of cards)", 'id="directory"'],
  ["A–Z index", 'aria-labelledby="artist-index-title"'],
]
  .map(([label, marker]) => ({ label, at: directoryHtml.indexOf(marker) }))
  .filter((s) => s.at >= 0)
  .sort((a, b) => a.at - b.at);
const sectionAt = (index) =>
  SECTION_MARKERS.filter((s) => s.at <= index).at(-1)?.label || "page header / hero";
const instances = [...directoryHtml.matchAll(/<a[^>]*href="(\/artists\/[^"]+)"/g)]
  .filter((m) => inbound.has(m[1]))
  .map((m) => ({ href: m[1], section: sectionAt(m.index) }));
const perSection = instances.reduce((acc, i) => ((acc[i.section] = (acc[i.section] || 0) + 1), acc), {});
const perUrl = instances.reduce((acc, i) => acc.set(i.href, (acc.get(i.href) || 0) + 1), new Map());
const repeatedUrls = [...perUrl.values()].filter((n) => n > 1).length;

const relatedInbound = indexableArtists.map(
  (r) => [...inbound.get(r)].filter((src) => src.startsWith("/artists/")).length
);

console.log(`Pages checked:            ${pages.size} (+ 404)`);
console.log(`Artist pages:             ${artistRoutes.length} (${indexableArtists.length} indexable, ${artistRoutes.length - indexableArtists.length} noindex)`);
console.log(`Sitemap URLs:             ${sitemapUrls.length} (image entries: ${imageEntries})`);
console.log(`/artists unique artist URLs: ${directoryLinks.size}`);
console.log(`/artists artist-link instances: ${instances.length} (${repeatedUrls} URLs linked more than once — intentional)`);
for (const [section, count] of Object.entries(perSection)) {
  console.log(`  ${section}: ${count}`);
}
console.log(`Indexable artists with no link from another artist page: ${relatedInbound.filter((n) => n === 0).length}`);

if (failures.length) {
  console.error(`\n${failures.length} problem(s):`);
  for (const f of failures.slice(0, 50)) console.error(`  - ${f}`);
  process.exit(1);
}
console.log("\nAll SEO checks passed.");
