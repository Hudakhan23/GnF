import { SITE_URL } from "@/data/site";

/**
 * All search, answer-engine and training crawlers are allowed (no business
 * preference to block training has been stated). Only the enquiry API is
 * excluded — it is a POST endpoint with nothing to index. Do not list private
 * paths here: robots.txt is public.
 */
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
