export const occasions = [
  "Concerts",
  "Corporate Dinners",
  "Weddings",
  "Festivals",
  "Cruises",
  "Private Parties",
];

// Newest event first. Every poster lives in /public/RecentShows/ — swap
// entries here to re-curate the home marquee.
export const showPosters = [
  "2026-04-25-sarmad-qadeer-kot-momin.jpeg",
  "2026-04-16-abrar-ul-haq-lahore.jpeg",
  "2026-02-12-falak-shabir-faisalabad.jpeg",
  "2026-02-04-ali-zafar-lahore.jpeg",
  "2026-02-02-sahara-uk-faisalabad.jpeg",
  "2026-02-01-sarmad-qadeer-multan.jpeg",
  "2026-01-30-nimra-mehra-faisalabad.jpeg",
  "2026-01-30-humaira-channa-lahore.jpeg",
  "2025-12-24-nabeel-shaukat-ali-gujrat.jpeg",
  "2025-12-22-ns-chauhan-faisalabad.jpeg",
  "2025-12-05-ali-badar-miandad-qawwali.jpeg",
  "2025-12-02-ns-chauhan-sialkot.jpeg",
].map((file) => `/RecentShows/${file}`);

export const marqueeHighlights = [1, 3, 4, 5, 7, 9, 11, 12, 14, 17].map(
  (number) => `/EventHighlights/E${number}.jpeg`,
);

export const aboutHighlights = [1, 3, 5, 7, 9, 11, 14, 17].map(
  (number) => `/EventHighlights/E${number}.jpeg`,
);

export const allyLogos = Array.from(
  { length: 12 },
  (_, index) => `/Allies/Allies${index + 1}.png`,
);

export const services = [
  {
    title: "Events Management",
    image: "/EventHighlights/E9.jpeg",
    alt: "Concert stage production managed by GnF Events",
    description:
      "From corporate galas and commercial launches to private concerts and weddings, we handle everything from concept to flawless execution.",
  },
  {
    title: "Singers & Artists Facilitation",
    image: "/images/RahatFateh.jpg",
    alt: "Pakistani artist performing live on stage",
    description:
      "Whether it's a live concert, corporate event, or a private function, we connect you with the perfect voices and performers.",
  },
  {
    title: "Comedians Facilitation",
    image: "/images/TabishHashmi.jpg",
    alt: "Stand-up comedian performing at a GnF Events show",
    description:
      "Professional entertainment and stand-up acts to bring humor, energy, and high engagement to your guests.",
  },
  {
    title: "Celebrity Appearances",
    image: "/images/HaniaAamir.png",
    alt: "Celebrity guest appearance arranged by GnF Events",
    description:
      "Hire top-tier celebrities for brand endorsements, guest appearances, reality shows, or exclusive meet-and-greets.",
  },
];
