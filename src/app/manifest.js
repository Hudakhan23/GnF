export default function manifest() {
  return {
    name: "GnF Events — Artist Booking Pakistan",
    short_name: "GnF Events",
    description: "Singer booking, artist facilitation and event management in Pakistan.",
    start_url: "/",
    display: "standalone",
    background_color: "#0E0C09",
    theme_color: "#0E0C09",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
