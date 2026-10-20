import { artists, isIndexable } from "@/data/artists";
import { imageRightsStatus } from "@/data/imageRights";
import { SITE_URL } from "@/data/site";

export default function sitemap() {
  const staticPages = [
    ["", 1, "weekly"],
    ["/artists", 0.9, "weekly"],
    ["/work", 0.8, "monthly"],
    ["/how-to-book", 0.7, "monthly"],
    ["/about", 0.6, "monthly"],
    ["/contact", 0.8, "monthly"],
  ].map(([path, priority, changeFrequency]) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency,
    priority,
  }));

  // Only pages we want indexed, and only images whose usage rights the
  // business has confirmed (see src/data/imageRights.js).
  const artistPages = artists.filter(isIndexable).map((artist) => ({
    url: `${SITE_URL}${artist.href}`,
    ...(artist.seo?.modified
      ? { lastModified: new Date(artist.seo.modified) }
      : {}),
    changeFrequency:
      artist.managementType === "exclusive" ? "weekly" : "monthly",
    priority: artist.managementType === "exclusive" ? 1 : 0.8,
    ...(imageRightsStatus(artist.image) === "approved"
      ? { images: [`${SITE_URL}${artist.image}`] }
      : {}),
  }));

  return [...staticPages, ...artistPages];
}
