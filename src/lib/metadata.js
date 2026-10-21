import { SITE_NAME } from "@/data/site";

/**
 * Shared Open Graph defaults. Next.js replaces (not merges) a parent's
 * `openGraph` when a page sets its own, so pages spread this and add `url`.
 * There is deliberately no `url` here — a page without one must not claim
 * the homepage URL.
 */
export const DEFAULT_OPEN_GRAPH = {
  type: "website",
  locale: "en_PK",
  siteName: SITE_NAME,
  title: "Artist Booking in Pakistan | GnF Events",
  description:
    "Bring Pakistan's leading artists to your stage with end-to-end booking and event coordination.",
  images: [
    {
      url: "/og-default.jpg",
      width: 1200,
      height: 630,
      alt: "GnF Events — Artist Booking in Pakistan",
    },
  ],
};
