/**
 * Usage-rights status for artist portraits.
 *
 * Provenance evidence lives in docs/image-rights/IMAGE-SOURCES.md (kept out of
 * /public so it is never served). Nothing below is a legal determination:
 *
 *   "approved"        — the business has confirmed it may use the image.
 *                       Only these go into the image sitemap.
 *   "client-supplied" — provided by GnF Events, rights not yet confirmed.
 *   "unverified"      — copied from a third-party page with no reuse licence
 *                       recorded, or no provenance at all; replace with a
 *                       licensed or artist-approved press image.
 *
 * Images stay on their pages while the review is in progress; move a path into
 * APPROVED_IMAGES only once permission is confirmed.
 */
// Openly licensed (Wikimedia Commons); the required credit is shown on the
// artist page via `imageCredit` in src/data/artists.js.
export const APPROVED_IMAGES = new Set([
  "/artists/alamgir-commons.jpg",
  "/artists/anwar-maqsood-commons.jpg",
  "/artists/arif-lohar-commons.jpg",
  "/artists/arooj-aftab-commons.jpg",
]);

export const CLIENT_SUPPLIED_IMAGES = new Set([
  "/artists/ayesha-jehanzeb.jpg",
  "/artists/bayaan-user.jpg",
  "/artists/kaifi-khalil.jpg",
  "/artists/shae-gill.jpg",
  "/artists/yashal-shahid.webp",
  "/artists/young-desi.webp",
  "/artists/young-stunners-new.jpg",
  "/artists/zack-knight.webp",
  "/artists/zahoor.webp",
  "/artists/zara-madani.webp",
  "/artists/zarsanga.webp",
  "/artists/zaw-ali.webp",
  "/artists/zeb-bangash.webp",
  "/artists/zoe-viccaji.webp",
  "/artists/zohaib-hassan.webp",
]);

export function imageRightsStatus(src) {
  if (!src) return null;
  if (APPROVED_IMAGES.has(src)) return "approved";
  if (CLIENT_SUPPLIED_IMAGES.has(src)) return "client-supplied";
  return "unverified";
}
