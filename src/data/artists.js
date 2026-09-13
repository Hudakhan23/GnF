/**
 * GnF Events artist roster.
 *
 * managementType is the single source of truth for how an artist may be
 * described anywhere on the site:
 *
 *   "exclusive" — officially managed by GnF Events. Only these artists may
 *                 carry the "Exclusive Artist" badge or any wording that
 *                 implies representation.
 *   "network"   — available through the artist facilitation network. Never
 *                 describe these as managed, signed, or represented by us.
 *
 * Copy for both cases lives in MANAGEMENT (below) — components read from it
 * rather than hardcoding label strings, so the distinction cannot drift.
 *
 * image: null renders a neutral monogram placeholder. To add a real photo,
 * drop the file in /public/artists/ and set image: "/artists/<file>".
 *
 * Entries flagged `needsReview: true` are names we could not confidently
 * classify by genre — they carry no genre claims until confirmed.
 */

import { whatsappLink } from "./site";

export const MANAGEMENT = {
  exclusive: {
    badge: "Exclusive Artist",
    short: "Officially managed by GnF Events",
    statement:
      "Officially managed by GnF Events. All bookings and enquiries for this artist are handled directly by our management team.",
    cta: "Booking Enquiry",
  },
  network: {
    badge: "Artist Network",
    short: "Available through our booking network",
    statement:
      "Available for booking enquiries through our artist facilitation network. GnF Events coordinates the booking, logistics, and hospitality — this artist is not exclusively managed by GnF Events.",
    cta: "Request Booking",
  },
};

const slugify = (name) =>
  name
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// Shorthand: [name, artistType, genres, opts]
const A = (name, artistType, genres = [], opts = {}) => ({
  name,
  slug: opts.slug || slugify(name),
  image: opts.image || null,
  genres,
  artistType,
  managementType: opts.managementType || "network",
  featured: Boolean(opts.featured),
  country: opts.country || "Pakistan",
  gender: opts.gender || "male",
  genZ: Boolean(opts.genZ),
  needsReview: Boolean(opts.needsReview),
  tagline: opts.tagline || null,
  bio: opts.bio || null,
  metaDescription: opts.metaDescription || null,
  seo: opts.seo || null,
  socials: opts.socials || null,
  profile: opts.profile || null,
  gallery: opts.gallery || [],
  videos: opts.videos || [],
});

const F = "female";
const M = "male";
const G = "group";

export const ARTISTS = [
  // ---------------------------------------------------------------- exclusive
  A("Nish Asher", "Singer", ["Pop"], {
    managementType: "exclusive",
    featured: true,
    gender: F,
    genZ: true,
    country: "UK",
    image: "/artists/nish-asher.jpeg",
    tagline: "Pop vocalist & OST performer",
    bio: "Nish Asher is a UK-based Pakistani pop singer and OST vocalist known for her distinctive voice, acclaimed television soundtracks, and cross-genre musical style. Beginning her musical journey at just three years old, Nish has collaborated with celebrated names including Rahat Fateh Ali Khan, Ali Zafar, Farhan Saeed, and Asim Azhar. A BBC Asian Network Future Sounds Artist, she performs for audiences across Pakistan and the international music scene.",
    metaDescription:
      "Nish Asher is the UK-based Pakistani pop singer behind the Khuda Aur Mohabbat OST with Rahat Fateh Ali Khan. Explore her music and official worldwide bookings.",
    seo: {
      title: "Nish Asher | Singer, OST Artist & Official Booking",
      modified: "2026-08-15T00:00:00+05:00",
    },
    socials: {
      youtube: "https://www.youtube.com/@NishOfficial",
      spotify: "https://open.spotify.com/artist/1csq4cvlItPMh7H9v1G5UF",
      appleMusic: "https://music.apple.com/gb/artist/nish-asher/1401971246",
    },
    profile: {
      poster: "/artists/nish-asher-management.webp",
      heroTitle: "pop singer & OST artist",
      headline: "Nish Asher: career, OSTs & music",
      summary:
        "Introduced to music by her father at the age of three and performing publicly by six, Nish has built a career spanning television soundtracks, original releases, and live collaborations across Pakistan and the international circuit.",
      stats: [
        { value: "474M+", label: "Khuda Aur Mohabbat OST views" },
        { value: "42M+", label: "Khuda Aur Mohabbat Spotify streams" },
        { value: "97K+", label: "Monthly Spotify listeners" },
      ],
      careerHighlights: [
        "Performed the Khuda Aur Mohabbat OST with Rahat Fateh Ali Khan, surpassing 474 million views on YouTube.",
        "The Khuda Aur Mohabbat Original Score has surpassed 42 million streams on Spotify.",
        "Named a BBC Asian Network Future Sounds Artist in 2021.",
        "Released original music including Mera Mann Dhunde, which surpassed one million YouTube views.",
        "Reached more than 97,000 monthly Spotify listeners in August 2026.",
      ],
      osts: [
        "Khuda Aur Mohabbat",
        "Aye Musht-e-Khaak",
        "Malaal-e-Yaar",
        "Prem Gali",
        "Fairytale",
        "Mohabbat Daagh Ki Surat",
      ],
      collaborations: [
        "Rahat Fateh Ali Khan",
        "Ali Zafar",
        "Farhan Saeed",
        "Asim Azhar",
      ],
      composers: [
        "Naveed Nashad",
        "Adrian David",
        "Sahir Ali Bagga",
        "Shani Arshad",
      ],
      education:
        "Nish studied Vocal Performance and Music Theory at ICMP London, completing her degree-level musical education in 2025.",
      youtube: {
        handle: "@NishOfficial",
        country: "United Kingdom",
        joined: "13 July 2011",
        stats: [
          { value: "86.7K", label: "Subscribers" },
          { value: "93", label: "Videos" },
          { value: "17.9M+", label: "Official channel views" },
        ],
      },
      faqs: [
        {
          question: "Who is Nish Asher?",
          answer:
            "Nish Asher is a UK-based Pakistani pop singer, live performer, and television OST vocalist. She is known for a cross-genre style and collaborations with leading Pakistani singers and composers.",
        },
        {
          question: "Did Nish Asher sing the Khuda Aur Mohabbat OST?",
          answer:
            "Yes. Nish Asher performed the Khuda Aur Mohabbat title song with Rahat Fateh Ali Khan. The official OST has surpassed 474 million views on YouTube.",
        },
        {
          question: "Which Pakistani drama OSTs has Nish Asher sung?",
          answer:
            "Her television soundtrack credits include Khuda Aur Mohabbat, Aye Musht-e-Khaak, Malaal-e-Yaar, Prem Gali, Fairytale, and Mohabbat Daagh Ki Surat.",
        },
        {
          question: "How can I book Nish Asher for an event?",
          answer:
            "Nish Asher is exclusively managed by GnF Events for worldwide bookings. Send the event date, city or country, venue, event type, and audience details to the GnF management team for availability and a formal quote.",
        },
        {
          question: "Where can I listen to Nish Asher?",
          answer:
            "Nish Asher's music is available through her official @NishOfficial YouTube channel, Spotify artist profile, and Apple Music artist profile.",
        },
      ],
    },
  }),

  // ------------------------------------------------------------------ network
  A("Atif Aslam", "Singer", ["Pop", "Playback"], {
    featured: true,
    image: "/images/AtifAslam.jpg",
    tagline: "Playback & pop icon",
  }),
  A("Rahat Fateh Ali Khan", "Singer", ["Qawwali", "Sufi", "Playback"], {
    featured: true,
    image: "/images/RahatFateh.jpg",
    tagline: "Qawwali & playback legend",
  }),
  A("Abida Parveen", "Singer", ["Sufi"], {
    featured: true,
    gender: F,
    image: "/images/Abidaparveeen.jpg",
    tagline: "Queen of Sufi music",
  }),
  A("Ali Zafar", "Singer", ["Pop"], {
    featured: true,
    image: "/images/AliZafar.jpg",
    tagline: "Singer, songwriter & actor",
  }),
  A("Aima Baig", "Singer", ["Pop", "Playback"], {
    featured: true,
    gender: F,
    image: "/images/Aima.jpg",
    tagline: "Pop & playback star",
  }),
  A("Asim Azhar", "Singer", ["Pop"], {
    featured: true,
    genZ: true,
    image: "/images/AsimAzhar.jpg",
    tagline: "Pop sensation",
  }),
  A("Hadiqa Kiani", "Singer", ["Pop", "Folk"], {
    featured: true,
    gender: F,
    image: "/images/Hadiqa.jpg",
    tagline: "Pop & folk powerhouse",
  }),
  A("Sajjad Ali", "Singer", ["Pop", "Classical"], {
    featured: true,
    image: "/images/SajjadAli.jpg",
    tagline: "Classical & pop maestro",
  }),
  A("Shafqat Amanat Ali", "Singer", ["Classical", "Ghazal", "Playback"], {
    featured: true,
    image: "/images/Shafqat.jpg",
    tagline: "Patiala gharana vocalist",
  }),
  A("Abrar ul Haq", "Singer", ["Bhangra", "Folk", "Pop"], {
    featured: true,
    image: "/images/AbrarulHaq.jpg",
    tagline: "Punjabi pop pioneer",
  }),
  A("Bilal Saeed", "Singer", ["Pop", "Bhangra"], {
    featured: true,
    image: "/images/BilalSaeed.jpg",
    tagline: "Singer & producer",
  }),
  A("Falak Shabir", "Singer", ["Pop"], {
    featured: true,
    image: "/images/FalakShabbir.jpg",
    tagline: "Romantic pop vocalist",
  }),
  A("Mustafa Zahid", "Singer", ["Rock"], {
    featured: true,
    image: "/images/MustafaZahid.jpg",
    tagline: "Rock vocalist, Roxen",
  }),
  A("Sahir Ali Bagga", "Singer", ["Pop", "Playback"], {
    featured: true,
    image: "/images/Sahir.jpg",
    tagline: "Composer & singer",
  }),

  A("Yashal Shahid", "Singer", ["Pop"], { gender: F, genZ: true }),
  A("AUR", "Band", ["Pop"], { gender: G, genZ: true }),
  A("Naseebo Lal", "Singer", ["Folk"], { gender: F }),
  A("Afshan Zaibi", "Singer", ["Folk"], {
    gender: F,
    image: "/artists/afshan-zaibi.jpg",
  }),
  A("Ahmed Jahanzeb", "Singer", ["Pop", "Playback"], {
    image: "/artists/ahmed-jahanzeb.jpeg",
  }),
  A("Akhtar Chanal Zahri", "Singer", ["Folk"], {
    image: "/artists/akhtar-chanal-zahri.jpg",
  }),
  A("Akram Rahi", "Singer", ["Folk"], { image: "/artists/akram-rahi.jpeg" }),
  A("Ali Azmat", "Singer", ["Rock"], { image: "/artists/ali-azmat.avif" }),
  A("Ali Sethi", "Singer", ["Ghazal", "Classical", "Sufi"]),
  A("Amanat Ali", "Singer", ["Pop", "Classical"]),
  A("Annie Khalid", "Singer", ["Pop"], { gender: F, country: "UK" }),
  A("Arieb Azhar", "Singer", ["Sufi", "Folk"]),
  A("Arif Lohar", "Singer", ["Folk"]),
  A("Asrar", "Singer", ["Sufi"]),
  A("Attaullah Khan Esakhelvi", "Singer", ["Folk", "Ghazal"]),
  A("Bohemia", "Rapper", ["Rap / Hip-Hop"], { country: "USA" }),
  A("Damia Farooq", "Singer", ["Pop"], { gender: F, genZ: true }),
  A("Dr Masuma Anwar", "Singer", ["Sufi", "Folk"], { gender: F }),
  A("Elizabeth Rai", "Singer", ["Pop"], { gender: F }),
  A("Faakhir Mehmood", "Singer", ["Pop"]),
  A("Farah Anwar", "Singer", ["Pop"], { gender: F }),
  A("Farhan Saeed", "Singer", ["Pop"]),
  A("Ghulam Ali", "Singer", ["Ghazal"]),
  A("Gul Panra", "Singer", ["Folk", "Pop"], { gender: F }),
  A("Jaz Dhami", "Singer", ["Bhangra"], { country: "UK" }),
  A("Hamid Ali Khan", "Singer", ["Classical", "Ghazal"]),
  A("Hasan Raheem", "Singer", ["Pop", "Rap / Hip-Hop"], { genZ: true }),
  A("Hina Nasrullah", "Singer", ["Sufi", "Folk"], { gender: F }),
  A("Hira Mani", "Host", [], { gender: F, tagline: "Actor & host" }),
  A("Humaira Arshad", "Singer", ["Folk", "Pop"], { gender: F }),
  A("Jabar Abbas", "Singer", ["Pop", "Playback"]),
  A("Jal Band", "Band", ["Rock", "Pop"], { gender: G, slug: "jal-band" }),
  A("Javed Bashir", "Singer", ["Classical", "Sufi"]),
  A("Jawad Ahmad", "Singer", ["Pop"]),
  A("Nadeem Abbas Loonay Wala", "Singer", ["Folk"]),
  A("Qurat Ul Ain Balouch", "Singer", ["Pop", "Sufi"], { gender: F }),
  A("Nooran Lal", "Singer", ["Sufi", "Folk"], { gender: F }),
  A("Zeb Bangash", "Singer", ["Folk", "Pop"], { gender: F }),
  A("Meesha Shafi", "Singer", ["Rock", "Pop"], { gender: F }),
  A("Momina Mustehsan", "Singer", ["Pop"], { gender: F }),
  A("Shae Gill", "Singer", ["Pop"], { gender: F, genZ: true }),
  A("Eva B", "Rapper", ["Rap / Hip-Hop"], { gender: F, genZ: true }),
  A("Young Stunners", "Band", ["Rap / Hip-Hop"], { gender: G, genZ: true }),
  A("Umair Jaswal", "Singer", ["Rock"]),
  A("Rohail Hyatt", "Producer", [], { tagline: "Producer & composer" }),
  A("Strings", "Band", ["Pop", "Rock"], { gender: G }),
  A("Bilal Maqsood", "Singer", ["Pop"]),
  A("Faisal Kapadia", "Singer", ["Pop"]),
  A("Kaifi Khalil", "Singer", ["Pop", "Folk"], { genZ: true }),
  A("Abdul Hannan", "Singer", ["Pop"], {
    genZ: true,
    image: "/artists/abdul-hannan.jpg",
  }),
  A("Shazia Manzoor", "Singer", ["Folk"], { gender: F }),
  A("Malkoo", "Singer", ["Folk"]),
  A("Natasha Baig", "Singer", ["Sufi", "Rock"], { gender: F }),
  A("Annural Khalid", "Singer", ["Pop"], {
    gender: F,
    genZ: true,
    country: "USA",
  }),
  A("Shehzad Roy", "Singer", ["Pop"]),
  A("Raafay Israr", "Singer", ["Pop"], { genZ: true }),
  A("Maanu", "Singer", ["Pop", "Rap / Hip-Hop"], { genZ: true }),
  A("Jani", "Rapper", ["Rap / Hip-Hop"], { genZ: true }),
  A("Taha G", "Singer", ["Pop"], { genZ: true }),
  A("Fariha Pervez", "Singer", ["Pop", "Ghazal"], { gender: F }),
  A("Afusic", "Singer", ["Pop"], {
    genZ: true,
    image: "/artists/afusic.jpeg",
  }),
  A("Bayaan", "Band", ["Rock", "Pop"], { gender: G, genZ: true }),
  A("Samar Jafri", "Performer", [], {
    genZ: true,
    tagline: "Actor & performer",
  }),
  A("JJ47", "Rapper", ["Rap / Hip-Hop"], { genZ: true }),
  A("Zain Zohaib", "Singer", ["Pop"], {
    gender: G,
    genZ: true,
    tagline: "Zain Ali & Zohaib Ali",
  }),
  A("Fareed Ayaz Qawwal", "Qawwal", ["Qawwali", "Sufi"], { gender: G }),
  A("Nimra Mehra", "Singer", ["Pop"], { gender: F, genZ: true }),
  A("Saira Naseem", "Singer", ["Pop", "Folk"], { gender: F }),
  A("Humaira Channa", "Singer", ["Folk", "Playback"], { gender: F }),
  A("Ali Tariq", "Singer", ["Pop"]),
  A("Asif Ali Santoo Khan", "Qawwal", ["Qawwali"]),
  A("Shahbaz Fayyaz Qawwal", "Qawwal", ["Qawwali"]),
  A("Akbar Ali Khan", "Qawwal", ["Qawwali", "Classical"], {
    image: "/artists/akbar-ali-khan.jpg",
  }),
  A("Junaid Bashir", "Singer", ["Sufi", "Classical"]),
  A("Faiz Brothers Qawwal", "Qawwal", ["Qawwali"], { gender: G }),
  A("Josh The Band", "Band", ["Bhangra", "Pop"], {
    gender: G,
    country: "Canada",
  }),
  A("Surj RDB", "Singer", ["Bhangra", "Rap / Hip-Hop"], { country: "UK" }),
  A("Manj Musik", "Singer", ["Bhangra", "Rap / Hip-Hop"], { country: "UK" }),
  A("Sahara UK", "Band", ["Bhangra"], { gender: G, country: "UK" }),

  A("Havi", "Singer", [], {
    needsReview: true,
    tagline: "Abdur Rahman Sajid",
  }),
  A("Shahzaman Ali Khan", "Singer", [], { needsReview: true }),
  A("Tahseen Sakina", "Singer", [], { gender: F, needsReview: true }),
  A("Khadija Dilnawaz", "Singer", [], { gender: F, needsReview: true }),
  A("Sher Mian Dad Khan", "Qawwal", ["Qawwali", "Sufi"]),
  A("Ayesha Jehanzeb", "Singer", [], { gender: F, needsReview: true }),
  A("Priti Kaur", "Singer", [], { gender: F, needsReview: true }),
  A("Zack Knight", "Singer", ["Pop"], { country: "UK" }),
  A("Shweta Subram", "Singer", ["Playback", "Pop"], {
    gender: F,
    country: "Canada",
  }),
  A("H-Dhami", "Singer", ["Bhangra"], { country: "UK" }),
  A("Jeffrey Iqbal", "Singer", ["Playback", "Sufi"], { country: "India" }),
  A("Juggy D", "Singer", ["Bhangra"], { country: "UK" }),
  A("Leo Twins", "Band", ["Rock", "Pop"], { gender: G }),
  A("Shuja Haider", "Singer", ["Pop", "Playback"]),
  A("Falak Ijaz & Hurya Waqas", "Qawwal", ["Qawwali"], {
    gender: F,
    tagline: "Female qawwal duo",
  }),
  A("DJ Weaw", "DJ", [], {
    gender: F,
    country: "International",
    tagline: "Szilvia Simotics",
  }),
  A("Tahir Abbas", "Performer", [], { needsReview: true }),
  A("Alka Yagnik", "Singer", ["Playback"], { gender: F, country: "India" }),
  A("Mulazim Hussain", "Singer", ["Sufi", "Folk"]),
  A("Laal Band", "Band", ["Rock", "Sufi"], { gender: G }),
  A("Roxen", "Band", ["Rock"], { gender: G, tagline: "Roxen Band" }),
  A("Shreya Ghoshal", "Singer", ["Playback"], { gender: F, country: "India" }),
  A("Arijit Singh", "Singer", ["Playback"], { country: "India" }),
  A("Sehar Gul Khan", "Singer", ["Pop"], { gender: F, genZ: true }),
  A("Richa Sharma", "Singer", ["Sufi", "Playback"], {
    gender: F,
    country: "India",
  }),
  A("Suhail Ahmed", "Comedian", []),
  A("Nasir Chinyoti", "Comedian", []),
  A("Zaw Ali", "Singer", ["Sufi", "Pop"]),
  A("Nirmal Roy", "Singer", ["Pop", "Sufi"]),
  A("Ghafar Lehri", "Performer", [], { needsReview: true }),
  A("Hanif Raja", "Performer", [], { needsReview: true }),
  A("Amanat Chan", "Comedian", []),
  A("Agha Majid", "Comedian", [], { image: "/artists/agha-majid.jpeg" }),
  A("Saleem Albela", "Comedian", []),
  A("Asghar Khoso", "Comedian", []),
  A("Bushra Ansari", "Host", [], {
    gender: F,
    tagline: "Actor, host & comedian",
  }),
  A("Farah Saadya", "Comedian", [], { gender: F }),
  A("Qasim Ali Shah", "Speaker", [], { tagline: "Motivational speaker" }),
  A("Magic & Illusion Show", "Specialty Act", [], {
    gender: G,
    tagline: "Stage magic & illusion",
  }),
  A("Neha Kakkar", "Singer", ["Playback", "Pop"], {
    gender: F,
    country: "India",
  }),
  A("Jasmine Sandlas", "Singer", ["Bhangra", "Pop"], {
    gender: F,
    country: "USA",
  }),
  A("Rizwan Muazzam Qawwals", "Qawwal", ["Qawwali", "Sufi"], { gender: G }),
  A("Rafaqat Ali Khan", "Singer", ["Classical", "Sufi"]),
  A("Zuhaib Ramzan Bhatti", "Performer", [], { needsReview: true }),
  A("Sadia Anwar", "Performer", [], { gender: F, needsReview: true }),
  A("Horeya Asmat", "Singer", [], { gender: F, genZ: true, needsReview: true }),
  A("Sukhbir", "Singer", ["Bhangra"], { country: "India" }),
  A("Manwa Sisters", "Singer", [], { gender: G, needsReview: true }),
  A("Mazhar Rahi", "Singer", [], { needsReview: true }),
  A("Arishma Maryam", "Singer", [], {
    gender: F,
    genZ: true,
    needsReview: true,
  }),
  A("Shakeel Siddiqui", "Comedian", []),
  A("Naseem Vicky", "Comedian", []),
  A("Iftikhar Thakur", "Comedian", []),
  A("Laila Khan", "Singer", ["Folk", "Pop"], { gender: F }),
  A("Komal Rizvi", "Singer", ["Pop"], { gender: F }),
  A("Naeem Abbas Rufi", "Singer", ["Folk"]),
  A("Nabeel Shaukat Ali", "Singer", ["Pop", "Playback"]),
  A("Wahdat Rameez", "Singer", [], { needsReview: true }),
  A("Mehwish Hayat", "Performer", [], {
    gender: F,
    tagline: "Actor & performer",
  }),
  A("Shahida Mini", "Singer", ["Pop", "Folk"], { gender: F }),
  A("Imran Khan", "Singer", ["Bhangra", "Pop"], {
    country: "Netherlands",
    tagline: "Bhangra & pop vocalist",
  }),
  A("Khalil Haider", "Singer", ["Ghazal"]),
  A("Sara Haider", "Singer", ["Pop"], { gender: F }),
  A("Shabnam Majeed", "Singer", ["Ghazal", "Sufi"], { gender: F }),
  A("Sara Raza Khan", "Singer", ["Sufi", "Pop"], { gender: F }),
  A("Sain Zahoor", "Singer", ["Sufi", "Folk"]),
  A("Raheem Shah", "Singer", ["Folk", "Pop"]),
  A("Sanam Marvi", "Singer", ["Sufi", "Folk"], { gender: F }),

  // ---------------------------------------------- second intake (added later)
  A("Sarmad Qadeer", "Singer", ["Pop", "Folk"]),
  A("Alamgir", "Singer", ["Pop"], { image: "/artists/alamgir.jpg" }),
  A("Ali Haider", "Singer", ["Pop"], { image: "/artists/ali-haider.jpg" }),
  A("Hasan Jahangir", "Singer", ["Pop"]),
  A("Zohaib Hassan", "Singer", ["Pop"]),
  A("Bilal Khan", "Singer", ["Pop"]),
  A("Jimmy Khan", "Singer", ["Pop"]),
  A("Momin Durrani", "Singer", ["Pop"]),
  A("Basit Ali", "Singer", ["Pop"]),
  A("Haroon Shahid", "Singer", ["Pop"]),
  A("Kashif Ali", "Singer", ["Pop"]),
  A("Mohsin Abbas Haider", "Singer", ["Pop"]),
  A("Shiraz Uppal", "Singer", ["Pop", "Playback"]),
  A("Abdullah Qureshi", "Singer", ["Pop"], {
    image: "/artists/abdullah-qureshi.webp",
  }),
  A("Shamoon Ismail", "Singer", ["Pop", "Rock"]),
  A("Danyal Zafar", "Singer", ["Pop"]),
  A("Sanwal Esakhelvi", "Singer", ["Folk", "Pop"]),
  A("Star Shah", "Singer", ["Folk", "Pop"]),
  A("Zahoor", "Singer", ["Folk", "Pop"]),
  A("Babar Mangi", "Singer", ["Folk"]),
  A("Wahab Bugti", "Singer", ["Folk"]),
  A("Nizam Torwali", "Singer", ["Folk"]),
  A("Hamayoon Khan", "Singer", ["Folk", "Pop"]),
  A("Sain Tufail", "Singer", ["Sufi"]),
  A("Fakir Juman Shah", "Singer", ["Sufi", "Folk"], { needsReview: true }),
  A("Abbas Ali Khan", "Singer", ["Sufi", "Pop"], {
    image: "/artists/abbas-ali-khan.jpg",
  }),
  A("Asad Abbas", "Singer", ["Ghazal", "Sufi"]),
  A("Ali Pervaiz Mehdi", "Singer", ["Ghazal", "Classical"]),
  A("Ustaad Naseer-ud-din Saami", "Singer", ["Classical"]),
  A("Rustam Fateh Ali Khan", "Singer", ["Classical", "Qawwali"]),
  A("Muazzam Ali Khan", "Qawwal", ["Qawwali"]),
  A("Karam Abbas", "Qawwal", ["Qawwali", "Classical"]),
  A("Ghulam Ali Qadri", "Qawwal", ["Qawwali"]),
  A("Riaz Qadri", "Qawwal", ["Qawwali"]),
  A("Asfar Hussain", "Singer", ["Rock", "Pop"]),
  A("Junaid Khan", "Singer", ["Rock", "Pop"]),
  A("Ali Noor", "Singer", ["Rock"]),
  A("Ali Hamza", "Singer", ["Rock", "Pop"], {
    image: "/artists/ali-hamza.jpeg",
  }),
  A("Uzair Jaswal", "Singer", ["Rock", "Pop"]),
  A("Adnan Dhool", "Singer", ["Pop", "Sufi"], {
    image: "/artists/adnan-dhool.jpg",
  }),
  A("Faraz Anwar", "Singer", ["Rock"], { tagline: "Guitarist & composer" }),
  A("Farhan Rais Khan", "Singer", ["Classical"], { tagline: "Sitar maestro" }),
  A("Nafees Ahmed", "Singer", ["Classical"], { tagline: "Sitar maestro" }),
  A("Usman Riaz", "Singer", [], { tagline: "Composer & instrumentalist" }),
  A("Shani Arshad", "Producer", [], { tagline: "Composer & producer" }),
  A("Talal Qureshi", "Producer", [], { tagline: "Producer & electronic artist" }),
  A("Abdullah Siddiqui", "Singer", ["Pop"], {
    genZ: true,
    image: "/artists/abdullah-siddiqui.jpeg",
  }),
  A("Faris Shafi", "Rapper", ["Rap / Hip-Hop"]),
  A("Talha Anjum", "Rapper", ["Rap / Hip-Hop"], { genZ: true }),
  A("Talhah Yunus", "Rapper", ["Rap / Hip-Hop"], { genZ: true }),
  A("Young Desi", "Rapper", ["Rap / Hip-Hop"]),

  A("Tina Sani", "Singer", ["Ghazal"], { gender: F }),
  A("Farida Khanum", "Singer", ["Ghazal"], { gender: F }),
  A("Surriya Khanum", "Singer", ["Folk", "Ghazal"], { gender: F }),
  A("Zarsanga", "Singer", ["Folk"], { gender: F }),
  A("Mai Dhai", "Singer", ["Folk"], { gender: F }),
  A("Shamu Bai", "Singer", ["Folk"], { gender: F }),
  A("Farheen Raza Jaffry", "Singer", ["Classical", "Sufi"], { gender: F }),
  A("Noor Zehra", "Singer", ["Classical"], {
    gender: F,
    tagline: "Saagar veena player",
  }),
  A("Haniya Aslam", "Singer", ["Folk", "Pop"], { gender: F }),
  A("Rachel Viccaji", "Singer", ["Pop"], { gender: F }),
  A("Zoe Viccaji", "Singer", ["Pop"], { gender: F }),
  A("Alycia Dias", "Singer", ["Pop"], { gender: F }),
  A("Fizza Javed", "Singer", ["Pop"], { gender: F }),
  A("Samra Khan", "Singer", ["Pop"], { gender: F }),
  A("Natasha Khan", "Singer", ["Pop"], { gender: F }),
  A("Zara Madani", "Singer", ["Pop"], { gender: F }),
  A("Rahma Ali", "Singer", ["Pop"], { gender: F }),
  A("Mishal Khawaja", "Singer", ["Pop"], { gender: F }),
  A("Wajeeha Naqvi", "Singer", ["Pop"], { gender: F }),
  A("Natasha Noorani", "Singer", ["Pop"], { gender: F }),
  A("Zoha Zuberi", "Singer", ["Pop"], { gender: F, genZ: true }),
  A("Risham Faiz Bhutta", "Singer", ["Pop"], { gender: F, genZ: true }),
  A("REHMA", "Singer", ["Pop"], { gender: F, genZ: true }),

  // Bands & groups
  A("Noori", "Band", ["Rock", "Pop"], { gender: G }),
  A("Junoon", "Band", ["Rock", "Sufi"], { gender: G }),
  A("Mekaal Hasan Band", "Band", ["Rock", "Sufi"], { gender: G }),
  A("Entity Paradigm", "Band", ["Rock"], { gender: G }),
  A("Aunty Disco Project", "Band", ["Rock", "Pop"], { gender: G }),
  A("Karavan", "Band", ["Rock"], { gender: G }),
  A("Mizraab", "Band", ["Rock"], { gender: G }),
  A("Overload", "Band", ["Rock", "Folk"], { gender: G }),
  A("Qayaas", "Band", ["Rock"], { gender: G }),
  A("Siege", "Band", ["Rock"], { gender: G }),
  A("Karakoram", "Band", ["Rock"], { gender: G }),
  A("Kashmir", "Band", ["Rock", "Pop"], { gender: G }),
  A("Auj", "Band", ["Rock"], { gender: G }),
  A("Aag", "Band", ["Rock"], { gender: G, image: "/artists/aag.jpeg" }),
  A("Takatak", "Band", ["Rock"], { gender: G }),
  A("Kaavish", "Band", ["Pop"], { gender: G }),
  A("Mauj", "Band", ["Pop", "Rock"], { gender: G }),
  A("Mole", "Band", ["Rock"], { gender: G }),
  A("SYMT", "Band", ["Rock"], { gender: G }),
  A("Soch", "Band", ["Pop"], { gender: G }),
  A("Sajid & Zeeshan", "Band", ["Pop"], { gender: G }),
  A("Zeb and Haniya", "Band", ["Folk", "Pop"], { gender: G }),
  A("The Sketches", "Band", ["Sufi", "Folk"], { gender: G }),
  A("Khumariyaan", "Band", ["Folk"], { gender: G }),
  A("Mughal-e-Funk", "Band", ["Folk"], { gender: G }),
  A("Sounds of Kolachi", "Band", ["Classical", "Folk"], { gender: G }),
  A("Chand Tara Orchestra", "Band", ["Folk", "Rock"], { gender: G }),
  A("Banur's Band", "Band", ["Folk"], { gender: G }),
  A("Bakshi Brothers", "Band", ["Pop"], { gender: G }),
  A("HYDR", "Band", ["Pop"], { gender: G, genZ: true }),
  A("Rozeo", "Band", ["Pop"], { gender: G, genZ: true }),
  A("Justin Bibis", "Band", ["Pop"], { gender: G, genZ: true }),
  A("Lyari Underground", "Band", ["Rap / Hip-Hop"], { gender: G }),
  A("Naseer & Shahab", "Band", ["Pop"], { gender: G }),
  A("Lucky & Naghma", "Band", ["Folk"], { gender: G }),
  A("Harsakhiyan", "Band", ["Folk"], { gender: G }),
  A("Marvi Saiban", "Band", ["Folk"], { gender: G }),
  A("Malang Party", "Band", ["Sufi", "Folk"], { gender: G }),
  A("Chakwal Group", "Band", ["Folk", "Sufi"], { gender: G }),
  A("Barkat Jamal Fakir Troupe", "Band", ["Sufi", "Folk"], { gender: G }),
  A("Gharvi Group", "Band", ["Folk"], { gender: G }),
  A("Niazi Brothers", "Qawwal", ["Qawwali"], { gender: G }),
  A("Butt Brothers", "Qawwal", ["Qawwali"], { gender: G }),
  A("Sabri Sisters", "Qawwal", ["Qawwali"], { gender: G }),

  // Performers, hosts & speakers
  A("Mahira Khan", "Performer", [], { gender: F, tagline: "Actor & performer" }),
  A("Fawad Khan", "Performer", [], { tagline: "Actor & singer" }),
  A("Ahad Raza Mir", "Performer", [], {
    tagline: "Actor & singer",
    image: "/artists/ahad-raza-mir.jpeg",
  }),
  A("Ayesha Omer", "Performer", [], { gender: F, tagline: "Actor & singer" }),
  A("Shahzad Nawaz", "Performer", [], { tagline: "Actor & filmmaker" }),
  A("Nighat Chaudhry", "Performer", [], {
    gender: F,
    tagline: "Classical dancer",
  }),
  A("Anwar Maqsood", "Host", [], { tagline: "Writer, host & satirist" }),

  // International
  A("Shilpa Rao", "Singer", ["Playback"], { gender: F, country: "India" }),
  A("Arooj Aftab", "Singer", ["Sufi"], { gender: F, country: "USA" }),
  A("Krewella", "Band", [], { gender: G, country: "USA", tagline: "DJ duo" }),
  A("Karpe", "Band", ["Rap / Hip-Hop"], { gender: G, country: "Norway" }),
  A("Amanda Delara", "Singer", ["Pop"], { gender: F, country: "Norway" }),
  A("Sumru Ağıryürüyen", "Singer", ["Folk"], {
    gender: F,
    country: "Turkey",
    slug: "sumru-agiryuruyen",
  }),
  A("Rostam Mirlashari", "Singer", ["Folk"], { country: "Sweden" }),

  // Names we could not confidently classify — no genre claims until confirmed.
  A("Riaz Ali Khan", "Singer", [], { needsReview: true }),
  A("Asif Hussain Samraat", "Singer", [], { needsReview: true }),
  A("Tahir Mithu", "Singer", [], { needsReview: true }),
  A("Shehroze Hussan", "Singer", [], { needsReview: true }),
  A("Ali Khan", "Singer", [], {
    needsReview: true,
    image: "/artists/ali-khan.webp",
  }),
  A("Jaffer Zaidi", "Singer", [], { needsReview: true }),
  A("Rizwan Butt", "Performer", [], { needsReview: true }),
  A("Irteassh", "Performer", [], { needsReview: true }),
  A("Waqar Ehsin", "Performer", [], { needsReview: true }),
  A("Kashif Din", "Performer", [], { needsReview: true }),
  A("Nimra Rafiq", "Singer", [], { gender: F, needsReview: true }),
  A("Shahab Hussain", "Singer", [], { needsReview: true }),
  A("Shamali Afghan", "Singer", [], { needsReview: true }),
  A("Aizaz Sohail", "Performer", [], {
    needsReview: true,
    image: "/artists/aizaz-sohail.jpeg",
  }),
  A("Mehdi Maloof", "Performer", [], { needsReview: true }),
  A("Noman Ali Rajper", "Performer", [], { needsReview: true }),
  A("Noorima Rehan", "Singer", [], { gender: F, needsReview: true }),
  A("Umair Butt", "Performer", [], { needsReview: true }),
  A("Zeeshan Ali", "Performer", [], { needsReview: true }),
  A("Zoha Waseem", "Singer", [], { gender: F, needsReview: true }),
  A("Murtaza Qazilbash", "Performer", [], { needsReview: true }),
  A("Ahsan Pervaiz", "Singer", [], {
    needsReview: true,
    image: "/artists/ahsan-pervaiz.jpeg",
  }),
  A("Ziggy", "Performer", [], { needsReview: true }),
];

// ------------------------------------------------------------------ selectors

export const EXCLUSIVE_ARTISTS = ARTISTS.filter(
  (a) => a.managementType === "exclusive"
);

export const NETWORK_ARTISTS = ARTISTS.filter(
  (a) => a.managementType === "network"
);

export const FEATURED_ARTISTS = ARTISTS.filter((a) => a.featured);

/** Artists sharing a genre or artistType, nearest matches first. */
export const relatedArtists = (artist, limit = 4) =>
  ARTISTS.filter((a) => a.slug !== artist.slug)
    .map((a) => ({
      artist: a,
      score:
        a.genres.filter((g) => artist.genres.includes(g)).length * 2 +
        (a.artistType === artist.artistType ? 1 : 0) +
        (a.country === artist.country ? 0.5 : 0) +
        (a.featured ? 0.25 : 0) +
        (a.image ? 0.4 : 0),
    }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.artist);

/** The one-line descriptor shown under a name on cards and profiles. */
export const descriptorFor = (artist) =>
  artist.tagline || artist.genres[0] || artist.artistType;

/** Up to two supporting tags for a card — never more, cards stay clean. */
export const cardTags = (artist) => {
  const tags = [];
  if (artist.genres[0]) tags.push(artist.genres[0]);
  else tags.push(artist.artistType);
  if (artist.country !== "Pakistan") tags.push(artist.country);
  else if (artist.genres[1]) tags.push(artist.genres[1]);
  else if (artist.genres[0] && artist.artistType !== "Singer")
    tags.push(artist.artistType);
  return tags.slice(0, 2);
};

const SUITABILITY = {
  Singer: ["Concerts", "Weddings", "Corporate Dinners", "Festivals"],
  Band: ["Concerts", "Festivals", "Corporate Events", "Private Parties"],
  Qawwal: ["Mehfil-e-Sama", "Weddings", "Sufi Nights", "Festivals"],
  Rapper: ["Concerts", "Festivals", "Brand Events", "Private Parties"],
  Comedian: ["Corporate Dinners", "Award Shows", "Private Parties", "Theatre"],
  Host: ["Award Shows", "Corporate Events", "Weddings", "Brand Launches"],
  DJ: ["Weddings", "Club Nights", "Private Parties", "Festivals"],
  "Dhol Player": ["Weddings", "Mehndi Nights", "Processions", "Brand Events"],
  Speaker: ["Corporate Events", "Conferences", "Training Days", "Universities"],
  "Specialty Act": [
    "Corporate Dinners",
    "Private Parties",
    "Brand Activations",
    "Family Events",
  ],
  Producer: ["Concerts", "Festivals", "Brand Collaborations"],
  Performer: ["Award Shows", "Brand Events", "Private Parties", "Appearances"],
};

export const suitabilityFor = (artist) =>
  SUITABILITY[artist.artistType] || SUITABILITY.Performer;

// -------------------------------------------------------------------- facets

/**
 * Filter facets. `group: "genre"` renders as primary chips (OR'd together);
 * `group: "more"` lives in the secondary dropdown and is AND'd with the rest.
 */
export const FACETS = [
  { id: "exclusive", label: "Exclusive Artists", group: "genre", match: (a) => a.managementType === "exclusive" },
  { id: "pop", label: "Pop", group: "genre", match: (a) => a.genres.includes("Pop") },
  { id: "sufi", label: "Sufi", group: "genre", match: (a) => a.genres.includes("Sufi") },
  { id: "qawwali", label: "Qawwali", group: "genre", match: (a) => a.genres.includes("Qawwali") },
  { id: "folk", label: "Folk", group: "genre", match: (a) => a.genres.includes("Folk") },
  { id: "ghazal", label: "Ghazal", group: "genre", match: (a) => a.genres.includes("Ghazal") },
  { id: "bhangra", label: "Bhangra", group: "genre", match: (a) => a.genres.includes("Bhangra") },
  { id: "rap", label: "Rap / Hip-Hop", group: "genre", match: (a) => a.genres.includes("Rap / Hip-Hop") },
  { id: "rock", label: "Rock", group: "genre", match: (a) => a.genres.includes("Rock") },
  { id: "bands", label: "Bands", group: "genre", match: (a) => a.artistType === "Band" },

  { id: "female", label: "Female Singers", group: "more", match: (a) => a.gender === "female" },
  { id: "male", label: "Male Singers", group: "more", match: (a) => a.gender === "male" },
  { id: "genz", label: "Gen Z Artists", group: "more", match: (a) => a.genZ },
  { id: "international", label: "International Artists", group: "more", match: (a) => a.country !== "Pakistan" },
  { id: "india", label: "Indian Artists", group: "more", match: (a) => a.country === "India" },
  { id: "uk", label: "UK-Based Artists", group: "more", match: (a) => a.country === "UK" },
  { id: "usa", label: "US-Based Artists", group: "more", match: (a) => a.country === "USA" },
  { id: "canada", label: "Canada-Based Artists", group: "more", match: (a) => a.country === "Canada" },
  { id: "comedians", label: "Comedians", group: "more", match: (a) => a.artistType === "Comedian" },
  { id: "hosts", label: "Hosts / Comperes", group: "more", match: (a) => a.artistType === "Host" },
  { id: "djs", label: "DJs", group: "more", match: (a) => a.artistType === "DJ" },
  { id: "performers", label: "Performers", group: "more", match: (a) => a.artistType === "Performer" },
  { id: "speakers", label: "Motivational Speakers", group: "more", match: (a) => a.artistType === "Speaker" },
  { id: "dhol", label: "Dhol Players", group: "more", match: (a) => a.artistType === "Dhol Player" },
  { id: "specialty", label: "Fun / Specialty Acts", group: "more", match: (a) => a.artistType === "Specialty Act" },
];

export const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "az", label: "A–Z" },
  { id: "za", label: "Z–A" },
];

const byName = (a, b) => a.name.localeCompare(b.name);

export const sortArtists = (list, sort) => {
  const out = [...list];
  if (sort === "az") return out.sort(byName);
  if (sort === "za") return out.sort((a, b) => byName(b, a));
  return out.sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    if (Boolean(a.image) !== Boolean(b.image)) return a.image ? -1 : 1;
    return byName(a, b);
  });
};

/**
 * Genre facets are OR'd with one another; every other selected facet is AND'd.
 * So "International Artists" + "Male Singers" narrows, while "Pop" + "Sufi"
 * widens — which is how people expect each control to behave.
 */
export const filterArtists = (list, { query = "", facets = [] } = {}) => {
  const q = query.trim().toLowerCase();
  const selected = FACETS.filter((f) => facets.includes(f.id));
  const genreFacets = selected.filter((f) => f.group === "genre");
  const moreFacets = selected.filter((f) => f.group === "more");

  return list.filter((a) => {
    if (q && !a.name.toLowerCase().includes(q)) return false;
    if (genreFacets.length && !genreFacets.some((f) => f.match(a))) return false;
    if (moreFacets.length && !moreFacets.every((f) => f.match(a))) return false;
    return true;
  });
};

export const facetCount = (facet, list = ARTISTS) =>
  list.filter(facet.match).length;

// ---------------------------------------------------- compatibility exports
// Codex's pages/sitemap import { artists, getArtist } — keep those working,
// with the extra fields (href, bookingUrl, description) they rely on.
export const artists = ARTISTS.map((a) => ({
  ...a,
  tag: descriptorFor(a),
  href: `/artists/${a.slug}`,
  bookingUrl: whatsappLink(
    a.managementType === "exclusive"
      ? `Hi GnF Events, I'd like to book ${a.name} for my event.`
      : `Hi GnF Events, I'd like to check ${a.name}'s availability for my event.`
  ),
  description:
    a.metaDescription ||
    (a.managementType === "exclusive"
      ? `${a.name} is exclusively managed by GnF Events. Send your event date, city and occasion to book directly through our management team.`
      : `Send GnF Events your event date, city and occasion to enquire about ${a.name}'s availability through our artist facilitation network.`),
}));

export const getArtist = (slug) => artists.find((a) => a.slug === slug) || null;

// The home mosaic needs seven artists that actually have a photograph.
export const featuredArtistSlugs = [
  "atif-aslam",
  "rahat-fateh-ali-khan",
  "abida-parveen",
  "aima-baig",
  "ali-zafar",
  "hadiqa-kiani",
  "asim-azhar",
];

export const featuredArtists = featuredArtistSlugs
  .map(getArtist)
  .filter(Boolean);
