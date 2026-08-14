import { artists } from "@/data/artists";
import { SITE_URL } from "@/data/site";

const lastModified = new Date("2026-08-14T00:00:00+05:00");

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
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...artistPages];
}
