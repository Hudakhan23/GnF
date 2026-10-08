/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [360, 640, 750, 828, 1080, 1200, 1360, 1920],
    imageSizes: [64, 96, 128, 256, 384],
    remotePatterns: [
      { protocol: "https", hostname: "cdn.platinumlist.net", pathname: "/upload/artist/**" },
      { protocol: "https", hostname: "cdn.prod.website-files.com", pathname: "/**" },
      { protocol: "https", hostname: "is1-ssl.mzstatic.com", pathname: "/image/thumb/**" },
      { protocol: "https", hostname: "cdn-az.allevents.in", pathname: "/events5/banners/**" },
      { protocol: "https", hostname: "fankarlokentertainment.com", pathname: "/wp-content/uploads/2025/09/**" },
      { protocol: "https", hostname: "i1.sndcdn.com", pathname: "/avatars-**" },
      { protocol: "https", hostname: "i.scdn.co", pathname: "/image/**" },
      { protocol: "https", hostname: "image-cdn-ak.spotifycdn.com", pathname: "/image/**" },
    ],
  },
};

export default nextConfig;
