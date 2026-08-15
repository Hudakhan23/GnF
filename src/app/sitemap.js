import { artists } from "@/data/artists";
import { SITE_URL } from "@/data/site";

const lastModified = new Date("2026-08-15T00:00:00+05:00");

export default function sitemap() {
  const staticPages = [
    ["", 1, "weekly"],
    ["/artists", 0.9, "weekly"],
    ["/about", 0.6, "monthly"],
    ["/contact", 0.8, "monthly"],
  ].map(([path, priority, changeFrequency]) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));

  const artistPages = artists.map((artist) => ({
    url: `${SITE_URL}${artist.href}`,
    lastModified: artist.seo?.modified
      ? new Date(artist.seo.modified)
      : lastModified,
    changeFrequency:
      artist.managementType === "exclusive" ? "weekly" : "monthly",
    priority: artist.managementType === "exclusive" ? 1 : 0.8,
    ...(artist.image ? { images: [`${SITE_URL}${artist.image}`] } : {}),
  }));

  return [...staticPages, ...artistPages];
}
