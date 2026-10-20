/** @type {import('next').NextConfig} */

// Artist pages removed from the roster on 2026-10-12 (commits 3f541eb, ce0e88d).
// They were in the sitemap until then, so send any remaining traffic to the
// directory instead of a 404.
const REMOVED_ARTIST_SLUGS = [
  "zeb-and-haniya",
  "falak-ijaz-and-hurya-waqas",
  "magic-and-illusion-show",
  "zuhaib-ramzan-bhatti",
  "mole",
  "ziggy",
];

// Artist pages whose slug changed after a spelling correction.
const RENAMED_ARTIST_SLUGS = {
  "murtaza-qazilbash": "murtaza-qizilbash",
};

const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
];

// Artwork in /public is served by Vercel with "max-age=0, must-revalidate",
// so browsers re-check every image (and every optimized /_next/image
// variant) on each visit. Let them reuse images for a week and refresh in the
// background for a month. Replaced files should get a new file name.
const IMAGE_CACHE_HEADERS = [
  {
    key: "Cache-Control",
    value: "public, max-age=604800, stale-while-revalidate=2592000",
  },
];
const IMAGE_DIRECTORIES =
  "RecentShows|EventHighlights|artists|images|Allies|partners|ContactusBackground|FooterBackground";

const nextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [360, 640, 750, 828, 1080, 1200, 1360, 1920],
    imageSizes: [64, 96, 128, 256, 384],
    // All artwork is served from /public; no remote image hosts are allowed.
  },
  async redirects() {
    return [
      ...REMOVED_ARTIST_SLUGS.map((slug) => ({
        source: `/artists/${slug}`,
        destination: "/artists",
        permanent: true,
      })),
      ...Object.entries(RENAMED_ARTIST_SLUGS).map(([from, to]) => ({
        source: `/artists/${from}`,
        destination: `/artists/${to}`,
        permanent: true,
      })),
    ];
  },
  async headers() {
    return [
      { source: "/:path*", headers: SECURITY_HEADERS },
      { source: `/:dir(${IMAGE_DIRECTORIES})/:file*`, headers: IMAGE_CACHE_HEADERS },
      { source: "/logo-gold.png", headers: IMAGE_CACHE_HEADERS },
    ];
  },
};

export default nextConfig;
