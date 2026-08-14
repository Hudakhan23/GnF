import { whatsappLink } from "./site";

const artistData = [
  ["atif-aslam", "Atif Aslam", "Playback & pop icon", "/images/AtifAslam.jpg"],
  ["rahat-fateh-ali-khan", "Rahat Fateh Ali Khan", "Qawwali & playback legend", "/images/RahatFateh.jpg"],
  ["abida-parveen", "Abida Parveen", "Queen of Sufi music", "/images/Abidaparveeen.jpg"],
  ["ali-zafar", "Ali Zafar", "Singer, songwriter & actor", "/images/AliZafar.jpg"],
  ["sajjad-ali", "Sajjad Ali", "Classical & pop maestro", "/images/SajjadAli.jpg"],
  ["shafqat-amanat-ali", "Shafqat Amanat Ali", "Patiala gharana vocalist", "/images/Shafqat.jpg"],
  ["abrar-ul-haq", "Abrar ul Haq", "Punjabi pop pioneer", "/images/AbrarulHaq.jpg"],
  ["aima-baig", "Aima Baig", "Pop & playback star", "/images/Aima.jpg"],
  ["asim-azhar", "Asim Azhar", "Pop sensation", "/images/AsimAzhar.jpg"],
  ["bilal-saeed", "Bilal Saeed", "Singer & producer", "/images/BilalSaeed.jpg"],
  ["falak-shabbir", "Falak Shabbir", "Romantic pop vocalist", "/images/FalakShabbir.jpg"],
  ["hadiqa-kiani", "Hadiqa Kiani", "Pop & folk powerhouse", "/images/Hadiqa.jpg"],
  ["mustafa-zahid", "Mustafa Zahid", "Rock vocalist, Roxen", "/images/MustafaZahid.jpg"],
  ["sahir-ali-bagga", "Sahir Ali Bagga", "Composer & singer", "/images/Sahir.jpg"],
];

export const artists = artistData.map(([slug, name, tag, image]) => ({
  slug,
  name,
  tag,
  image,
  href: `/artists/${slug}`,
  bookingUrl: whatsappLink(
    `Hi GnF Events, I'd like to check ${name}'s availability for my event.`,
  ),
  description: `Send GnF Events your event date, city and occasion to enquire about ${name}'s availability and artist booking coordination in Pakistan or abroad.`,
}));

export const featuredArtistSlugs = [
  "atif-aslam",
  "rahat-fateh-ali-khan",
  "abida-parveen",
  "aima-baig",
  "ali-zafar",
  "hadiqa-kiani",
  "asim-azhar",
];

export const featuredArtists = featuredArtistSlugs.map((slug) =>
  artists.find((artist) => artist.slug === slug),
);

export function getArtist(slug) {
  return artists.find((artist) => artist.slug === slug);
}
