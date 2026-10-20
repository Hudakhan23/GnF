/**
 * The GnF Events show archive — the single source for /work and the home
 * page "work" section.
 *
 * Every entry is transcribed from its original poster in /public/RecentShows/
 * (or details confirmed by the business). Never add an event, artist, venue
 * or figure that is not on a poster or supplied by GnF. Keep entries newest
 * first; `date` is null when the poster has no date.
 *
 * Artist names use one spelling per artist so the stats count people, not
 * spelling variants.
 */

export const EVENT_CATEGORIES = [
  { key: "campus", label: "Campus & Festivals" },
  { key: "concert", label: "Public Concerts" },
  { key: "corporate", label: "Corporate & Conferences" },
  { key: "private", label: "Private Events" },
  { key: "cultural", label: "Qawwali & Classical" },
  { key: "international", label: "International" },
];

/** How GnF Events is credited on the poster itself. */
export const EVENT_CREDITS = {
  production: "Talent acquisition & event production",
  powered: "Event powered by GnF Events",
  presented: "Presented by GnF Events",
  branded: "GnF Events show",
};

const poster = (file) => `/RecentShows/${file}`;

export const EVENTS = [
  { slug: "2026-10-10-ns-chauhan-faisalabad", date: "2026-10-10", artists: ["NS Chauhan"], title: "Live in Faisalabad", venue: "", cities: ["Faisalabad"], country: "Pakistan", category: "concert", credit: "powered", poster: poster("2026-10-10-ns-chauhan-faisalabad.jpeg") },
  { slug: "2026-10-03-gul-panra-psr-conference-peshawar", date: "2026-10-03", artists: ["Gul Panra"], title: "Gul Panra Live — 29th Annual International PSR Conference 2026", venue: "Pakistan Society for Rheumatology", cities: ["Peshawar"], country: "Pakistan", category: "corporate", credit: "powered", poster: poster("2026-10-03-gul-panra-peshawar.jpeg") },
  { slug: "2026-04-25-sarmad-qadeer-alpha-kot-momin", date: "2026-04-25", artists: ["Sarmad Qadeer"], title: "About You — one day, two concerts", venue: "Alpha Group of Colleges", cities: ["Kot Momin"], country: "Pakistan", category: "campus", credit: "powered", poster: poster("2026-04-25-sarmad-qadeer-kot-momin.jpeg") },
  { slug: "2026-04-16-abrar-ul-haq-lahore", date: "2026-04-16", artists: ["Abrar ul Haq"], title: "Live in Lahore — corporate event", venue: "", cities: ["Lahore"], country: "Pakistan", category: "corporate", credit: "branded", poster: poster("2026-04-16-abrar-ul-haq-lahore.jpeg") },
  { slug: "2026-02-14-ali-zafar-apsup-olympiad-lahore", date: "2026-02-14", artists: ["Ali Zafar"], title: "APSUP Olympiad ’26 — Association of Private Sector Universities of Pakistan", venue: "Fortress Stadium", cities: ["Lahore"], country: "Pakistan", category: "campus", credit: "presented", poster: poster("2026-02-14-ali-zafar-apsup-olympiad-lahore.jpeg") },
  { slug: "2026-02-12-falak-shabir-superior-festival-faisalabad", date: "2026-02-12", artists: ["Falak Shabir"], title: "Superior Sports & Cultural Festival 2026", venue: "Superior University", cities: ["Faisalabad"], country: "Pakistan", category: "campus", credit: "branded", poster: poster("2026-02-12-falak-shabir-faisalabad.jpeg") },
  { slug: "2026-02-04-ali-zafar-superior-night-lahore", date: "2026-02-04", artists: ["Ali Zafar"], title: "Superior Night", venue: "Superior — Allied Health Science", cities: ["Lahore"], country: "Pakistan", category: "campus", credit: "branded", poster: poster("2026-02-04-ali-zafar-lahore.jpeg") },
  { slug: "2026-02-02-sahara-uk-faisalabad", date: "2026-02-02", artists: ["Sahara UK"], title: "Live Bhangra", venue: "", cities: ["Faisalabad"], country: "Pakistan", category: "concert", credit: "branded", poster: poster("2026-02-02-sahara-uk-faisalabad.jpeg") },
  { slug: "2026-02-01-sarmad-qadeer-multan", date: "2026-02-01", artists: ["Sarmad Qadeer"], title: "Live Music", venue: "", cities: ["Multan"], country: "Pakistan", category: "concert", credit: "branded", poster: poster("2026-02-01-sarmad-qadeer-multan.jpeg") },
  { slug: "2026-01-30-nimra-mehra-faisalabad", date: "2026-01-30", artists: ["Nimra Mehra"], title: "Live Music — private event", venue: "", cities: ["Faisalabad"], country: "Pakistan", category: "private", credit: "branded", poster: poster("2026-01-30-nimra-mehra-faisalabad.jpeg") },
  { slug: "2026-01-30-humaira-channa-lahore", date: "2026-01-30", artists: ["Humaira Channa"], title: "Live in Lahore", venue: "", cities: ["Lahore"], country: "Pakistan", category: "concert", credit: "branded", poster: poster("2026-01-30-humaira-channa-lahore.jpeg") },
  { slug: "2025-12-24-nabeel-shaukat-ali-gujrat", date: "2025-12-24", artists: ["Nabeel Shaukat Ali"], title: "Live Concert", venue: "Gujrat Superior College", cities: ["Gujrat"], country: "Pakistan", category: "campus", credit: "branded", poster: poster("2025-12-24-nabeel-shaukat-ali-gujrat.jpeg") },
  { slug: "2025-12-22-ns-chauhan-faisalabad", date: "2025-12-22", artists: ["NS Chauhan"], title: "Live Bhangra", venue: "", cities: ["Faisalabad"], country: "Pakistan", category: "concert", credit: "presented", poster: poster("2025-12-22-ns-chauhan-faisalabad.jpeg") },
  { slug: "2025-12-05-ali-badar-miandad-qawwali-lahore", date: "2025-12-05", artists: ["Ali Badar Miandad"], title: "Qawwali Night", venue: "", cities: ["Lahore"], country: "Pakistan", category: "cultural", credit: "powered", poster: poster("2025-12-05-ali-badar-miandad-qawwali.jpeg") },
  { slug: "2025-12-02-ns-chauhan-superior-sialkot", date: "2025-12-02", artists: ["NS Chauhan"], title: "Live Music", venue: "Superior College Sialkot", cities: ["Sialkot"], country: "Pakistan", category: "campus", credit: "powered", poster: poster("2025-12-02-ns-chauhan-sialkot.jpeg") },
  { slug: "2025-11-17-sarmad-qadeer-aspire-lahore", date: "2025-11-17", artists: ["Sarmad Qadeer", "Rohail Waqas", "Hira Khalid"], title: "Live Music", venue: "Aspire Group of Colleges, Lahore campuses", cities: ["Lahore"], country: "Pakistan", category: "campus", credit: "branded", poster: poster("2025-11-17-sarmad-qadeer-aspire-lahore.jpeg") },
  { slug: "2025-09-28-sahir-ali-bagga-lahore", date: "2025-09-28", artists: ["Sahir Ali Bagga"], title: "Live Concert — corporate event", venue: "", cities: ["Lahore"], country: "Pakistan", category: "corporate", credit: "presented", poster: poster("2025-09-28-sahir-ali-bagga-lahore.jpeg") },
  { slug: "2025-04-23-tehsin-sakina-kot-momin", date: "2025-04-23", artists: ["Tehsin Sakina"], title: "Live", venue: "", cities: ["Kot Momin"], country: "Pakistan", category: "concert", credit: "presented", poster: poster("2025-04-23-tehsin-sakina-kot-momin.jpeg") },
  { slug: "2025-04-23-sawal-band-dina", date: "2025-04-23", artists: ["Sawal Band"], title: "Live at Dina", venue: "", cities: ["Dina"], country: "Pakistan", category: "concert", credit: "presented", poster: poster("2025-04-23-sawal-band-dina.jpeg") },
  { slug: "2025-04-12-sahir-ali-bagga-lahore", date: "2025-04-12", artists: ["Sahir Ali Bagga"], title: "Corporate event", venue: "", cities: ["Lahore"], country: "Pakistan", category: "corporate", credit: "presented", poster: poster("2025-04-12-sahir-ali-bagga-lahore.jpeg") },
  { slug: "2025-04-10-nabeel-shaukat-ali-lahore", date: "2025-04-10", artists: ["Nabeel Shaukat Ali"], title: "Live in Lahore — private event", venue: "", cities: ["Lahore"], country: "Pakistan", category: "private", credit: "presented", poster: poster("2025-04-10-nabeel-shaukat-ali-lahore.jpeg") },
  { slug: "2025-02-28-falak-shabir-superior-rawalpindi", date: "2025-02-28", artists: ["Falak Shabir"], title: "Live Music", venue: "Superior College Rawalpindi", cities: ["Rawalpindi"], country: "Pakistan", category: "campus", credit: "powered", poster: poster("2025-02-28-falak-shabir-rawalpindi.jpeg") },
  { slug: "2025-02-23-abrar-ul-haq-superior-musical-concerts", date: "2025-02-23", dateLabel: "23–27 Feb 2025", artists: ["Abrar ul Haq"], title: "Superior Musical Concerts — three-city run", venue: "Superior Group of Colleges & Superior University", cities: ["Manga Mandi", "Faisalabad", "Lahore"], country: "Pakistan", category: "campus", credit: "presented", poster: poster("2025-02-23-abrar-ul-haq-superior-concerts.jpeg") },
  { slug: "2025-02-22-nadeem-abbas-nishtar-multan", date: "2025-02-22", artists: ["Nadeem Abbas Loonywala"], title: "Live Music", venue: "Nishtar Medical University", cities: ["Multan"], country: "Pakistan", category: "campus", credit: "powered", poster: poster("2025-02-22-nadeem-abbas-multan.jpeg") },
  { slug: "2025-02-04-abrar-ul-haq-superior-fest-lahore", date: "2025-02-04", artists: ["Abrar ul Haq"], title: "Music Party — Superior Fest 2025", venue: "Superior Group of Colleges", cities: ["Lahore"], country: "Pakistan", category: "campus", credit: "branded", poster: poster("2025-02-04-abrar-ul-haq-lahore.jpeg") },
  { slug: "2025-02-03-lahore-global-village", date: "2025-02-03", artists: ["Adnan Dhool", "Inzi DX", "Aiza Shah", "Hamda Farooq", "Rizi RJ"], title: "Lahore Global Village", venue: "Lahore Global Village", cities: ["Lahore"], country: "Pakistan", category: "concert", credit: "production", poster: poster("Nodate.jpeg") },
  { slug: "2025-01-26-live-musical-fest-queens-college-gujrat", date: "2025-01-26", artists: ["Subtain Jafri", "Sehar Gul Khan", "Qalb-e-Abbas"], title: "Live Musical Fest — Funfair", venue: "Queens’ College for Women", cities: ["Gujrat"], country: "Pakistan", category: "campus", credit: "branded", poster: poster("2025-01-26-live-musical-fest-gujrat.jpeg") },
  { slug: "2025-01-23-ns-chauhan-faisalabad", date: "2025-01-23", artists: ["NS Chauhan"], title: "Live Bhangra — private event", venue: "", cities: ["Faisalabad"], country: "Pakistan", category: "private", credit: "presented", poster: poster("2025-01-23-ns-chauhan-faisalabad.jpeg") },
  { slug: "2025-01-01-nabeel-shaukat-ali-lahore", date: "2025-01-01", artists: ["Nabeel Shaukat Ali"], title: "Live in Lahore", venue: "", cities: ["Lahore"], country: "Pakistan", category: "concert", credit: "branded", poster: poster("1Jan2025.jpeg") },
  { slug: "2024-12-27-dj-toshi-faisalabad", date: "2024-12-27", artists: ["DJ Toshi"], title: "Live in Faisalabad", venue: "", cities: ["Faisalabad"], country: "Pakistan", category: "concert", credit: "presented", poster: poster("27Dec2024.jpeg") },
  { slug: "2024-12-26-manwa-sisters-faisalabad", date: "2024-12-26", artists: ["Manwa Sisters"], title: "Live in Faisalabad — private event", venue: "", cities: ["Faisalabad"], country: "Pakistan", category: "private", credit: "powered", poster: poster("26Dec2024.jpeg") },
  { slug: "2024-12-21-rasees-ahmad-khan-army-medical-college", date: "2024-12-21", artists: ["Ustad Rasees Ahmad Khan"], title: "Live Music", venue: "Army Medical College", cities: ["Rawalpindi"], country: "Pakistan", category: "cultural", credit: "powered", poster: poster("21Dec2024.jpeg") },
  { slug: "2024-12-14-rasees-ahmad-khan-islamabad", date: "2024-12-14", artists: ["Ustad Rasees Ahmad Khan"], title: "Live in Islamabad", venue: "", cities: ["Islamabad"], country: "Pakistan", category: "cultural", credit: "branded", poster: poster("14Dec2024.jpeg") },
  { slug: "2024-11-30-sarmad-qadeer-superior-kot-momin", date: "2024-11-30", artists: ["Sarmad Qadeer"], title: "Live Music", venue: "Superior College Kot Momin", cities: ["Kot Momin"], country: "Pakistan", category: "campus", credit: "presented", poster: poster("30Nov2024.jpeg") },
  { slug: "2024-11-02-nimra-mehra-waqar-ehsin-gujrat-gymkhana", date: "2024-11-02", artists: ["Nimra Mehra", "Waqar Ehsin"], title: "Live Concert", venue: "Gujrat Gymkhana", cities: ["Gujrat"], country: "Pakistan", category: "concert", credit: "powered", poster: poster("2Nov2024.jpeg") },
  { slug: "2024-10-18-sara-raza-khan-lahore", date: "2024-10-18", artists: ["Sara Raza Khan"], title: "Live Concert", venue: "", cities: ["Lahore"], country: "Pakistan", category: "concert", credit: "powered", poster: poster("18Oct2024.jpeg") },
  { slug: "2024-09-25-sara-raza-khan-lahore", date: "2024-09-25", artists: ["Sara Raza Khan"], title: "Live Music", venue: "", cities: ["Lahore"], country: "Pakistan", category: "concert", credit: "powered", poster: poster("25Sep2024.png") },
  { slug: "2024-08-10-independence-day-concert-michigan", date: "2024-08-10", artists: ["Alamgir", "Inzi DX", "Aiza Shah"], title: "Pakistan Independence Day Celebration Concert", venue: "", cities: ["Michigan"], country: "USA", category: "international", credit: "powered", poster: poster("10Aug2024.jpeg") },
  { slug: "2024-05-04-abrar-ul-haq-lahore", date: "2024-05-04", artists: ["Abrar ul Haq"], title: "Live in Lahore — corporate event", venue: "", cities: ["Lahore"], country: "Pakistan", category: "corporate", credit: "powered", poster: poster("4May2024.jpeg") },
  { slug: "2024-04-27-malkoo-lahore", date: "2024-04-27", artists: ["Malkoo"], title: "Live Concert — corporate event", venue: "", cities: ["Lahore"], country: "Pakistan", category: "corporate", credit: "powered", poster: poster("27April2024.jpeg") },
  { slug: "2024-03-09-live-concert-superior-mandi-bahauddin", date: "2024-03-09", artists: ["Nadeem Abbas Loonywala", "Malkaa", "Shameer Shazil", "Qalb-e-Abbas"], title: "Live Concert", venue: "Superior College Mandi Bahauddin", cities: ["Mandi Bahauddin"], country: "Pakistan", category: "campus", credit: "presented", poster: poster("9March2024.jpeg") },
  { slug: "2024-03-07-live-concert-superior-gujranwala", date: "2024-03-07", artists: ["Nabeel Shaukat Ali", "Afifa Butt", "Shameer Shazil"], title: "Live Concert", venue: "Superior College Gujranwala", cities: ["Gujranwala"], country: "Pakistan", category: "campus", credit: "powered", poster: poster("7March2024.jpeg") },
  { slug: "2024-03-06-nimra-mehra-burewala", date: "2024-03-06", artists: ["Nimra Mehra"], title: "Live Concert", venue: "Burewala Gymkhana Club", cities: ["Burewala"], country: "Pakistan", category: "concert", credit: "branded", poster: poster("6March2024.jpeg") },
  { slug: "2024-03-02-nabeel-shaukat-ali-pgc-lahore", date: "2024-03-02", artists: ["Nabeel Shaukat Ali"], title: "Live Concert", venue: "PGC Jaloo Campus", cities: ["Lahore"], country: "Pakistan", category: "campus", credit: "powered", poster: poster("2March2024.jpeg") },
  { slug: "2024-02-29-live-concert-superior-gujrat", date: "2024-02-29", artists: ["Nabeel Shaukat Ali", "Afifa Butt", "Shameer Shazil", "Waqar Shani"], title: "Live Concert", venue: "Superior College Gujrat", cities: ["Gujrat"], country: "Pakistan", category: "campus", credit: "powered", poster: poster("29Feb2024.jpeg") },
  { slug: "2024-02-17-amanat-ali-lgs-gujrat", date: "2024-02-17", artists: ["Amanat Ali"], title: "Live", venue: "LGS Gujrat", cities: ["Gujrat"], country: "Pakistan", category: "campus", credit: "powered", poster: poster("17Feb2024.jpeg") },
  { slug: "2024-02-15-superior-music-festival", date: "2024-02-15", artists: [], title: "Music Festival", venue: "Superior Group of Colleges", cities: [], country: "Pakistan", category: "campus", credit: "branded", poster: poster("15Feb2024.jpeg") },
  { slug: "2024-02-13-abrar-ul-haq-superior-festival", date: "2024-02-13", artists: ["Abrar ul Haq"], title: "Superior Sports & Cultural Festival 2024", venue: "Superior Group of Colleges", cities: [], country: "Pakistan", category: "campus", credit: "production", poster: poster("13Feb2024.jpeg") },
  { slug: "2024-02-04-bakhtyar-santoo-qawwali-lahore", date: "2024-02-04", artists: ["Bakhtyar Santoo"], title: "Live Qawwali", venue: "", cities: ["Lahore"], country: "Pakistan", category: "cultural", credit: "powered", poster: poster("4aFeb2024.jpeg") },
  { slug: "2024-02-04-falak-shabir-jhelum", date: "2024-02-04", artists: ["Falak Shabir"], title: "Sunday — Live in Jhelum", venue: "", cities: ["Jhelum"], country: "Pakistan", category: "concert", credit: "production", poster: poster("4Feb2024.jpeg") },
  { slug: "2024-01-22-falak-shabir-superior-gala-lahore", date: "2024-01-22", artists: ["Falak Shabir"], title: "Superior Gala — Welcome Party", venue: "PC Hotel Lahore · Superior College Canal Campus", cities: ["Lahore"], country: "Pakistan", category: "campus", credit: "branded", poster: poster("22Jan2024.jpeg") },
  { slug: "2023-12-29-javed-bashir-lahore", date: "2023-12-29", artists: ["Ustad Javed Bashir Khan"], title: "Live Music Concert", venue: "", cities: ["Lahore"], country: "Pakistan", category: "cultural", credit: "production", poster: poster("29Dec2023.jpeg") },
  { slug: "2023-12-28-shahbaz-fayaz-lahore", date: "2023-12-28", artists: ["Shahbaz Fayaz"], title: "Private event", venue: "", cities: ["Lahore"], country: "Pakistan", category: "private", credit: "production", poster: poster("28Dec2023.jpeg") },
  { slug: "2023-12-21-live-concert-punjab-college-nowshera", date: "2023-12-21", artists: ["Nabeel Shaukat Ali", "Inzi DX"], title: "Live Concert", venue: "Punjab College Nowshera", cities: ["Nowshera"], country: "Pakistan", category: "campus", credit: "presented", poster: poster("21Dec2023.jpeg") },
  { slug: "2023-09-29-rdb-faisalabad", date: "2023-09-29", artists: ["RDB"], title: "Live in Faisalabad", venue: "", cities: ["Faisalabad"], country: "Pakistan", category: "concert", credit: "production", poster: poster("29Sep2023.jpeg") },
  { slug: "2023-07-22-falak-shabir-vibrant-brampton-festival", date: "2023-07-22", artists: ["Falak Shabir"], title: "Music Concert — Vibrant Brampton Festival", venue: "Vibrant Brampton Festival", cities: ["Brampton"], country: "Canada", category: "international", credit: "production", poster: poster("22july2023.jpeg") },
];

/** Hand-picked projects shown large at the top of /work. */
export const SIGNATURE_EVENTS = [
  {
    slug: "2026-02-04-ali-zafar-superior-night-lahore",
    tag: "Campus headline · Lahore",
    title: "Superior Night with Ali Zafar",
    summary: "A headline campus night with Ali Zafar for Superior’s Allied Health Science students.",
    when: "4 February 2026",
  },
  {
    slug: "2025-02-23-abrar-ul-haq-superior-musical-concerts",
    tag: "Campus tour · 3 cities",
    title: "Superior Musical Concerts",
    summary: "One headliner taken across three campuses in five days for Superior Group of Colleges and Superior University.",
    when: "23, 24 & 27 February 2025",
  },
  {
    slug: "2026-10-03-gul-panra-psr-conference-peshawar",
    tag: "Conference · International",
    title: "29th Annual International PSR Conference",
    summary: "Live entertainment for the Pakistan Society for Rheumatology’s annual international conference.",
    when: "3 October 2026",
  },
];

/** Shows picked for the home page "work" section, in display order. */
export const HOME_FEATURED_EVENTS = [
  "2026-10-10-ns-chauhan-faisalabad",
  "2026-10-03-gul-panra-psr-conference-peshawar",
  "2026-04-25-sarmad-qadeer-alpha-kot-momin",
  "2026-04-16-abrar-ul-haq-lahore",
  "2026-02-14-ali-zafar-apsup-olympiad-lahore",
  "2025-02-23-abrar-ul-haq-superior-musical-concerts",
];

/**
 * Overseas festivals GnF Events has supplied artists to, as confirmed by the
 * business. `events` links to any archived poster from that festival.
 */
export const INTERNATIONAL_PARTNERS = [
  {
    name: "Vibrant Brampton Festival",
    logo: "/partners/vibrant-brampton.png",
    city: "Brampton",
    country: "Canada",
    role: "Artists provided across multiple editions",
    events: ["2023-07-22-falak-shabir-vibrant-brampton-festival"],
  },
  {
    name: "Copenhagen Mela",
    logo: "/partners/copenhagen-mela.webp",
    city: "Copenhagen",
    country: "Denmark",
    role: "Artists provided across multiple editions",
    events: [],
  },
];

/** Organisations and venues named on the posters. */
export const EVENT_HOSTS = [
  "APSUP — Association of Private Sector Universities of Pakistan",
  "Fortress Stadium, Lahore",
  "Superior Group of Colleges",
  "Superior University",
  "Aspire Group of Colleges",
  "Alpha Group of Colleges",
  "Punjab College Nowshera",
  "PGC Jaloo Campus",
  "LGS Gujrat",
  "Queens’ College for Women, Gujrat",
  "Nishtar Medical University, Multan",
  "Army Medical College, Rawalpindi",
  "Pakistan Society for Rheumatology",
  "Vibrant Brampton Festival, Canada",
  "Copenhagen Mela, Denmark",
  "PC Hotel Lahore",
  "Lahore Global Village",
  "Gujrat Gymkhana",
  "Burewala Gymkhana Club",
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function formatEventDate(event) {
  if (event.dateLabel) return event.dateLabel;
  if (!event.date) return "Date not on poster";
  const [year, month, day] = event.date.split("-").map(Number);
  return `${day} ${MONTHS[month - 1]} ${year}`;
}

export function eventHeadline(event) {
  return event.artists.length ? joinNames(event.artists) : event.title;
}

export function eventPlace(event) {
  const cities = event.cities.join(" · ");
  const where = event.country === "Pakistan" || !cities ? cities : `${cities}, ${event.country}`;
  return [event.venue, where].filter(Boolean).join(" · ");
}

export function joinNames(names) {
  if (names.length < 2) return names.join("");
  return `${names.slice(0, -1).join(", ")} & ${names.at(-1)}`;
}

export const getEvent = (slug) => EVENTS.find((event) => event.slug === slug);

export const categoryLabel = (key) =>
  EVENT_CATEGORIES.find((category) => category.key === key)?.label ?? key;

export const isSuperiorEvent = (event) =>
  /Superior/.test(`${event.title} ${event.venue}`);

/** Figures shown on the site — derived from EVENTS and partners, never typed in. */
export function getEventStats(events = EVENTS, partners = INTERNATIONAL_PARTNERS) {
  const artists = new Set(events.flatMap((event) => event.artists));
  const pakistanCities = new Set(
    events.filter((event) => event.country === "Pakistan").flatMap((event) => event.cities),
  );
  const countriesAbroad = new Set([
    ...events.filter((event) => event.country !== "Pakistan").map((event) => event.country),
    ...partners.map((partner) => partner.country),
  ]);
  const years = events.filter((event) => event.date).map((event) => Number(event.date.slice(0, 4)));
  return {
    shows: events.length,
    artists: artists.size,
    pakistanCities: pakistanCities.size,
    countriesAbroad: [...countriesAbroad],
    superiorShows: events.filter(isSuperiorEvent).length,
    firstYear: Math.min(...years),
    lastYear: Math.max(...years),
  };
}
