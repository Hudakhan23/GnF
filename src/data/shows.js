export const occasions = [
  "Concerts",
  "Corporate Dinners",
  "Weddings",
  "Festivals",
  "Cruises",
  "Private Parties",
];

export const marqueeHighlights = [1, 3, 4, 5, 7, 9, 11, 12, 14, 17].map(
  (number) => `/EventHighlights/E${number}.jpeg`,
);

export const aboutHighlights = [1, 3, 5, 7, 9, 11, 14, 17].map(
  (number) => `/EventHighlights/E${number}.jpeg`,
);

// Names read from each logo file; used as alt text so the partners are named.
export const allyLogos = [
  "APEX",
  "Aspire Group of Colleges",
  "Copenhagen Mela Festival",
  "Horizon",
  "LGS",
  "Pakistan Association of America",
  "Punjab Colleges",
  "Queens College for Women",
  "Solvurs",
  "Superior Group of Colleges",
  "Superior University",
  "Vibrant Summer Fest",
].map((name, index) => ({ name, src: `/Allies/Allies${index + 1}.png` }));

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
