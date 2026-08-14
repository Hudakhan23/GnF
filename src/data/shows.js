export const occasions = [
  "Concerts",
  "Corporate Dinners",
  "Weddings",
  "Festivals",
  "Cruises",
  "Private Parties",
];

export const showPosters = [
  "1Jan2025.jpeg",
  "27Dec2024.jpeg",
  "26Dec2024.jpeg",
  "21Dec2024.jpeg",
  "14Dec2024.jpeg",
  "30Nov2024.jpeg",
  "18Oct2024.jpeg",
  "10Aug2024.jpeg",
  "4May2024.jpeg",
  "9March2024.jpeg",
  "29Feb2024.jpeg",
  "4Feb2024.jpeg",
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
    eyebrow: "Pillar one",
    title: "Artist Facilitation",
    image: "/images/RahatFateh.jpg",
    alt: "Pakistani artist performing live on stage",
    description:
      "Singer and comedian facilitation, celebrity appearances, and artist management — availability, coordination, logistics, and hospitality handled end to end.",
    tags: [
      "Singer Facilitation",
      "Comedian Facilitation",
      "Celebrity Appearances",
      "Artist Management",
    ],
  },
  {
    eyebrow: "Pillar two",
    title: "Event Management",
    image: "/EventHighlights/E9.jpeg",
    alt: "Concert stage production managed by GnF Events",
    description:
      "We craft every detail with precision — planning and entertainment for concerts, corporate dinners, weddings, cruises, parties, and festivals.",
    tags: [
      "Event Planning",
      "Entertainment",
      "Concerts & Festivals",
      "Corporate & Private",
    ],
  },
];
