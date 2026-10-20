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
 * Explicit image options take priority; the curated portrait map fills
 * additional directory entries while unmatched artists keep monogram art.
 *
 * Entries flagged `needsReview: true` are names we could not confidently
 * classify by genre — they carry no genre claims until confirmed.
 */

import { whatsappLink } from "./site.js";
import { ARTIST_DIRECTORY_PORTRAITS } from "./artistDirectoryPortraits.js";

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
  image: opts.image || ARTIST_DIRECTORY_PORTRAITS[name]?.image || null,
  imagePosition:
    opts.imagePosition || ARTIST_DIRECTORY_PORTRAITS[name]?.position || null,
  imageFit: opts.imageFit || ARTIST_DIRECTORY_PORTRAITS[name]?.fit || null,
  // Required credit for openly licensed photos: { text, href, license, licenseHref }.
  imageCredit: opts.imageCredit || null,
  genres,
  artistType,
  managementType: opts.managementType || "network",
  featured: Boolean(opts.featured),
  country: opts.country || "Pakistan",
  gender: opts.gender || "male",
  genZ: Boolean(opts.genZ),
  // Indian nationals cannot currently obtain permission to perform in Pakistan,
  // so they are offered for international events only. Set explicitly for
  // Indian nationals living elsewhere (country alone is where they are based).
  internationalOnly: Boolean(opts.internationalOnly) || opts.country === "India",
  needsReview: Boolean(opts.needsReview),
  tagline: opts.tagline || null,
  // Other spellings actually in use (press, the artist's own channels). Never
  // a reason for a separate page — they feed search and alternateName only.
  aliases: opts.aliases || [],
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
    image: "/artists/nish-asher-official.jpg",
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
    aliases: ["Muhammad Atif Aslam"],
    bio: "Atif Aslam is an internationally acclaimed Pakistani playback singer and songwriter known for chart-topping hits across South Asia, including Jal Pari, Doorie, Tajdar-e-Haram, and Dil Diyan Gallan. A recipient of the Tamgha-e-Imtiaz, he is one of the most celebrated live concert and playback performers in the region.",
  }),
  A("Rahat Fateh Ali Khan", "Singer", ["Qawwali", "Sufi", "Playback"], {
    featured: true,
    image: "/images/RahatFateh.jpg",
    tagline: "Qawwali & playback legend",
    aliases: ["RFAK", "Rahat Nusrat Fateh Ali Khan"],
    bio: "Ustad Rahat Fateh Ali Khan is a world-renowned Pakistani Sufi and qawwali singer, carrying forward the musical lineage of the Gharana of Nusrat Fateh Ali Khan. Celebrated for iconic qawwalis, television OSTs, and global playback hits such as Afreen Afreen, O Re Piya, and Zaroori Tha, he performs for major international concerts and private mehfils.",
  }),
  A("Abida Parveen", "Singer", ["Sufi"], {
    featured: true,
    gender: F,
    image: "/images/Abidaparveeen.jpg",
    tagline: "Queen of Sufi music",
    bio: "Begum Abida Parveen is Pakistan's foremost Sufi vocalist, revered globally as the Queen of Sufi Music for her spiritual kafi, ghazal, and qawwali renditions. Honoured with the Nishan-i-Imtiaz and Pride of Performance, her legendary repertoire includes Dama Dam Mast Qalandar, Chaap Tilak, and the Coke Studio masterpiece Tu Jhoom.",
  }),
  A("Ali Zafar", "Singer", ["Pop"], {
    featured: true,
    image: "/images/AliZafar.jpg",
    tagline: "Singer, songwriter & actor",
    bio: "Ali Zafar is a celebrated Pakistani pop singer, songwriter, actor, and producer who rose to fame with his breakthrough album Huqa Pani and hit single Channo. A recipient of the Pride of Performance award, he is known for iconic Coke Studio performances like Rockstar and Jhoom, as well as high-energy live concerts and festival headlines.",
  }),
  A("Aima Baig", "Singer", ["Pop", "Playback"], {
    featured: true,
    gender: F,
    image: "/images/Aima.jpg",
    tagline: "Pop & playback star",
    bio: "Aima Baig is an acclaimed Pakistani pop and playback singer known for television soundtracks, Coke Studio highlights including Baazi and Malang, and the PSL anthem Groove Mera. A Tamgha-e-Fakhr-e-Imtiaz honoree and Lux Style Award winner, she is a leading headline vocalist for arena concerts and corporate galas.",
  }),
  A("Asim Azhar", "Singer", ["Pop"], {
    featured: true,
    genZ: true,
    image: "/images/AsimAzhar.jpg",
    tagline: "Pop sensation",
    bio: "Asim Azhar is a leading Pakistani pop singer-songwriter and youth icon, recognized for major hits including Jo Tu Na Mila, Ghalat Fehmi, and the Coke Studio collaboration Tera Woh Pyar. Known for dynamic stage presence and modern melody, he regularly headlines university festivals, corporate shows, and public concerts.",
  }),
  A("Hadiqa Kiani", "Singer", ["Pop", "Folk"], {
    featured: true,
    gender: F,
    image: "/images/Hadiqa.jpg",
    tagline: "Pop & folk powerhouse",
    bio: "Hadiqa Kiani is one of Pakistan's most influential pop and folk vocalists, celebrated for trailblazing albums including Raaz and Roshni and timeless anthems such as Boohey Barian and Dupatta. A Tamgha-e-Imtiaz recipient, she performs an extensive repertoire spanning Urdu, Punjabi, Pashto, and Sufi folk music.",
  }),
  A("Sajjad Ali", "Singer", ["Pop", "Classical"], {
    featured: true,
    image: "/images/SajjadAli.jpg",
    tagline: "Classical & pop maestro",
    bio: "Sajjad Ali is a master Pakistani vocalist, composer, and songwriter whose career spans classical music, pop classics, and semi-classical ghazals. Famed for enduring hits like Babia, Chief Saab, Har Zulm, and Coke Studio's Ronay Na Diya, he brings decades of vocal artistry and live musicianship to stage concerts and corporate galas.",
  }),
  A("Shafqat Amanat Ali", "Singer", ["Classical", "Ghazal", "Playback"], {
    featured: true,
    image: "/images/Shafqat.jpg",
    tagline: "Patiala gharana vocalist",
    bio: "Shafqat Amanat Ali Khan is a distinguished Patiala gharana classical vocalist and former lead singer of Fuzön, renowned for classics such as Aankhon Kay Saagar, Khamaj, Mitwa, and Tere Naina. Awarded the Pride of Performance, he delivers masterclasses in classical fusion, Sufi melody, and playback repertoire.",
  }),
  A("Abrar ul Haq", "Singer", ["Bhangra", "Folk", "Pop"], {
    featured: true,
    image: "/images/AbrarulHaq.jpg",
    tagline: "Punjabi pop pioneer",
    bio: "Abrar ul Haq is Pakistan's undisputed pioneer of modern Punjabi pop and bhangra, rising to fame with his multi-million-selling debut Billo De Ghar and smash hits including Majajani, Nach Punjaban, and Sanu Tere Naal. Awarded the Tamgha-e-Imtiaz, his electrifying concerts are headline attractions for campus festivals and large-scale public events.",
  }),
  A("Bilal Saeed", "Singer", ["Pop", "Bhangra"], {
    featured: true,
    image: "/images/BilalSaeed.jpg",
    tagline: "Singer & producer",
    bio: "Bilal Saeed is a celebrated Pakistani singer-songwriter, producer, and founder of One Two Records, known for chart-topping Punjabi-pop anthems including 12 Saal, Adhi Adhi Raat, and Baari. With a prolific output across independent releases and film soundtracks, he is a major draw for youth concerts and weddings.",
  }),
  A("Falak Shabir", "Singer", ["Pop"], {
    featured: true,
    image: "/images/FalakShabbir.jpg",
    tagline: "Romantic pop vocalist",
    bio: "Falak Shabir is a popular Pakistani pop singer-songwriter renowned for romantic ballads and soulful melodies including Rog, Tera Saath Ho, and Bollywood soundtrack hits like Saajna. Known for intimate acoustic and full-band performances, he is widely booked for weddings, campus concerts, and private functions.",
  }),
  A("Mustafa Zahid", "Singer", ["Rock"], {
    featured: true,
    image: "/images/MustafaZahid.jpg",
    tagline: "Rock vocalist, Roxen",
    aliases: ["Roxen"],
    bio: "Mustafa Zahid is the acclaimed lead vocalist and frontman of rock band Roxen, celebrated for soaring rock vocals on iconic tracks such as Tera Mera Rishta, Toh Phir Aao, Bhula Dena, and Zaroorat. He headlines major live concerts and festivals with an expansive rock and Bollywood playback repertoire.",
  }),
  A("Sahir Ali Bagga", "Singer", ["Pop", "Playback"], {
    featured: true,
    image: "/images/Sahir.jpg",
    tagline: "Composer & singer",
    bio: "Sahir Ali Bagga is a prolific Pakistani music composer, singer, and director recognized for defining television OSTs including Khaani and O Rangreza, as well as Coke Studio hits Baazi and Malang. A recipient of the Tamgha-e-Imtiaz, he performs energetic live sets featuring his most celebrated compositions and folk melodies.",
  }),

  A("Yashal Shahid", "Singer", ["Pop"], {
    gender: F,
    genZ: true,
  }),
  A("AUR", "Band", ["Pop"], {
    gender: G,
    genZ: true,
    image: "/artists/aur.jpg",
    tagline: "Pop duo, Tu Hai Kahan",
    bio: "AUR is a Karachi-based pop music duo whose viral breakout single Tu Hai Kahan achieved over 100 million streams globally and led to an official international release with Zayn Malik. Blending R&B melodies with Urdu pop, they are among the fastest-rising youth sensations in Pakistan's music scene.",
  }),
  A("Naseebo Lal", "Singer", ["Folk"], {
    gender: F,
    tagline: "Punjabi folk & playback legend",
    bio: "Naseebo Lal is an iconic Pakistani Punjabi folk and playback vocalist celebrated for extraordinary vocal power across hundreds of film songs, the PSL anthem Groove Mera, and the Coke Studio Season 14 opener Tu Jhoom alongside Abida Parveen. She is widely booked for Punjabi musical nights, cultural celebrations, and weddings.",
  }),
  A("Afshan Zaibi", "Singer", ["Folk"], {
    gender: F,
    image: "/artists/afshan-zaibi-official.jpg",
  }),
  A("Ahmed Jahanzeb", "Singer", ["Pop", "Playback"], {
    image: "/artists/ahmed-jahanzeb-official.jpg",
  }),
  A("Akhtar Chanal Zahri", "Singer", ["Folk"], {
    image: "/artists/akhtar-chanal-zahri-official.jpg",
  }),
  A("Akram Rahi", "Singer", ["Folk"], {
    image: "/artists/akram-rahi-commons.jpg",
    imageCredit: {
      text: "Akramrahi786",
      href: "https://commons.wikimedia.org/wiki/File:Akram_Rahi.jpg",
      license: "CC BY-SA 4.0",
      licenseHref: "https://creativecommons.org/licenses/by-sa/4.0/",
    },
  }),
  A("Ali Azmat", "Singer", ["Rock"], {
    image: "/artists/ali-azmat-flickr.jpg",
    imageCredit: {
      text: "Muhammad Usama",
      href: "https://www.flickr.com/photos/133433497@N02/18861903050/",
      license: "CC BY 2.0",
      licenseHref: "https://creativecommons.org/licenses/by/2.0/",
      source: "Flickr",
    },
    aliases: ["Junoon"],
    tagline: "Rock icon & Junoon frontman",
    bio: "Ali Azmat is the legendary frontman of Junoon and a pioneer of South Asian Sufi rock, whose voice defined timeless anthems including Sayonee, Jazba-e-Junoon, and Garaj Baras. Renowned for raw stage charisma and powerhouse live performances, he remains one of Pakistan's most commanding festival and concert headliners.",
  }),
  A("Ali Sethi", "Singer", ["Ghazal", "Classical", "Sufi"], {
    image: "/artists/ali-sethi.jpg",
    tagline: "Ghazal & pop fusion vocalist",
    bio: "Ali Sethi is an internationally acclaimed Pakistani vocalist and writer whose revival of classical ghazal and modern ragas culminated in the global smash hit Pasoori. Formally trained in the classical Kirana gharana tradition, he performs worldwide combining South Asian poetic heritage with contemporary indie-pop arrangements.",
  }),
  A("Amanat Ali", "Singer", ["Pop", "Classical"], {
    image: "/artists/amanat-ali-official.jpg",
  }),
  A("Annie Khalid", "Singer", ["Pop"], {
    gender: F,
    country: "UK",
    image: "/artists/annie-khalid-official.jpg",
  }),
  A("Arieb Azhar", "Singer", ["Sufi", "Folk"], {
    image: "/artists/arieb-azhar-official.jpg",
  }),
  A("Arif Lohar", "Singer", ["Folk"], {
    image: "/artists/arif-lohar-commons.jpg",
    imageCredit: {
      text: "PILAC TV",
      href: "https://commons.wikimedia.org/wiki/File:Arif_Lohar_2021.png",
      license: "CC BY 3.0",
      licenseHref: "https://creativecommons.org/licenses/by/3.0/",
    },
    aliases: ["Arif Lohar Chimta"],
    tagline: "Punjabi folk icon & chimta master",
    bio: "Arif Lohar is a celebrated Pakistani folk icon and Pride of Performance recipient, renowned worldwide for energetic stage shows and virtuoso chimta playing on anthems like Alif Allah (Jugni) and Aa Tenu Mauj Karawan. His high-octane folk sets are headline fixtures for cultural festivals, corporate celebrations, and weddings.",
  }),
  A("Asrar", "Singer", ["Sufi"], {
    image: "/artists/asrar.jpg",
    tagline: "Sufi rock & playback vocalist",
    bio: "Asrar (Syed Asrar Shah) is a distinctive Pakistani Sufi singer and songwriter known for gritty, soul-stirring vocals on hits including Shakar Wandan, Sub Aakho Ali Ali, and Coke Studio's Sab Aakhe.",
  }),
  A("Attaullah Khan Esakhelvi", "Singer", ["Folk", "Ghazal"], {
    image: "/artists/attaullah-khan-esakhelvi.jpg",
    aliases: ["Attaullah Esakhelvi", "Attaullah Khan Essa Khelvi"],
    tagline: "Folk legend & Pride of Performance",
    bio: "Attaullah Khan Esakhelvi is a legendary Pakistani folk music maestro and Pride of Performance recipient from Mianwali, holding a Guinness World Record for the most recorded audio albums. Famed for timeless Seraiki and Punjabi classics like Kameez Teri Kaali and Sab Maya Hai, his concerts draw devoted multi-generational audiences.",
  }),
  A("Bohemia", "Rapper", ["Rap / Hip-Hop"], {
    country: "USA",
    aliases: ["Roger David", "The Punjabi Rapper"],
    tagline: "Pioneer of Punjabi rap",
    bio: "Bohemia (Roger David) is the internationally celebrated pioneer of Punjabi rap, creating the genre with seminal albums Vich Pardesan De, Pesa Nasha Pyar, and Da Rap Star. With classic tracks like Kali Denali and Ek Tera Pyar, he commands massive worldwide audiences for international concerts and arena shows.",
  }),
  A("Damia Farooq", "Singer", ["Pop"], { gender: F, genZ: true }),
  A("Dr Masuma Anwar", "Singer", ["Sufi", "Folk"], { gender: F }),
  A("Elizabeth Rai", "Singer", ["Pop"], { gender: F }),
  A("Faakhir Mehmood", "Singer", ["Pop"]),
  A("Farah Anwar", "Singer", ["Pop"], { gender: F }),
  A("Farhan Saeed", "Singer", ["Pop"], {
    image: "/artists/farhan-saeed.jpg",
    aliases: ["Farhan Saeed Butt"],
    tagline: "Pop vocalist & actor",
    bio: "Farhan Saeed is a celebrated Pakistani pop singer, songwriter, and actor, formerly the lead vocalist of Jal Band with hits like Sajni and Woh Lamhe before establishing a prolific solo career with hits including Tu Thodi Der and the award-winning Mere Humsafar OST. He is an in-demand headliner for concerts, weddings, and university shows.",
  }),
  A("Ghulam Ali", "Singer", ["Ghazal"], {
    tagline: "Patiala gharana ghazal maestro",
    bio: "Ustad Ghulam Ali is a legendary Pakistani ghazal maestro of the Patiala gharana, celebrated worldwide for masterful classical phrasing and timeless compositions including Chupke Chupke Raat Din, Hangama Hai Kyon Barpa, and Awargi. A Pride of Performance and Sitara-i-Imtiaz recipient, he is one of South Asia's greatest living classical vocalists.",
  }),
  A("Gul Panra", "Singer", ["Folk", "Pop"], { gender: F }),
  A("Jaz Dhami", "Singer", ["Bhangra"], { country: "UK" }),
  A("Hamid Ali Khan", "Singer", ["Classical", "Ghazal"], {
    tagline: "Patiala gharana classical maestro",
    bio: "Ustad Hamid Ali Khan is a distinguished Pakistani classical vocalist of the Patiala gharana, celebrated for virtuoso khayal, thumri, and ghazal singing. Honoured with the Pride of Performance and Sitara-i-Imtiaz, he represents the pinnacle of classical vocal tradition.",
  }),
  A("Hasan Raheem", "Singer", ["Pop", "Rap / Hip-Hop"], {
    genZ: true,
    image: "/artists/hasan-raheem.jpg",
    tagline: "Alt-pop & R&B artist",
    bio: "Hasan Raheem is a Gilgit-born singer-songwriter who revolutionized modern Pakistani indie-pop and R&B with playful lyricism and smooth melodies on hits like Aisay Kaisay, Joona, and Coke Studio's Peechay Hutt. He is a premier festival headliner known for dynamic live sets and youth appeal.",
  }),
  A("Hina Nasrullah", "Singer", ["Sufi", "Folk"], { gender: F }),
  A("Hira Mani", "Host", [], { gender: F, tagline: "Actor & host" }),
  A("Humaira Arshad", "Singer", ["Folk", "Pop"], { gender: F }),
  A("Jabar Abbas", "Singer", ["Pop", "Playback"]),
  A("Jal Band", "Band", ["Rock", "Pop"], {
    gender: G,
    slug: "jal-band",
    aliases: ["Jal"],
    tagline: "Pop-rock band, Aadat",
    bio: "Jal Band is an influential Pakistani pop-rock band formed in Lahore by guitarist and songwriter Goher Mumtaz, whose debut album Aadat became a defining pop phenomenon across South Asia. With perennial hits including Sajni and Woh Lamhe, the band continues to headline major collegiate festivals and concert tours.",
  }),
  A("Javed Bashir", "Singer", ["Classical", "Sufi"], {
    tagline: "Patiala gharana classical & Sufi vocalist",
    bio: "Ustad Javed Bashir is an acclaimed Pakistani classical, Sufi, and playback singer from the Patiala gharana, known for powerhouse vocals with Mekaal Hasan Band and Coke Studio highlights like Aj Latha Naeeo and Dholna.",
  }),
  A("Jawad Ahmad", "Singer", ["Pop"], {
    tagline: "Pop singer & social activist",
    bio: "Jawad Ahmad is a prominent Pakistani pop singer, songwriter, and musician known for classic patriotic and folk-pop anthems including Mehndi, Dosti, and Uss Rah Par. A Tamgha-e-Imtiaz recipient, he performs widely for corporate galas and concerts.",
  }),
  A("Nadeem Abbas Loonay Wala", "Singer", ["Folk"], {
    aliases: ["Nadeem Abbas", "Nadeem Abbas Loonywala", "Nadeem Abbas Lone"],
    tagline: "Punjabi folk singer",
    bio: "Nadeem Abbas Loonay Wala is a popular Pakistani Punjabi folk singer known for high-spirited hits including Bismillah Karan and Gaddi Tu Manga De.",
  }),
  A("Qurat Ul Ain Balouch", "Singer", ["Pop", "Sufi"], {
    gender: F,
    aliases: ["QB", "Quratulain Balouch", "Quratulain Baloch"],
    tagline: "Powerhouse Sufi & rock vocalist",
    bio: "Qurat Ul Ain Balouch (QB) is an award-winning Pakistani rock and Sufi vocalist famed for her soul-stirring rendition of Woh Humsafar Tha and Coke Studio anthems like Sammi Meri Waar. Known for raw vocal range and commanding stage authority, she is a headliner for concerts, corporate galas, and international tours.",
  }),
  A("Nooran Lal", "Singer", ["Sufi", "Folk"], { gender: F }),
  A("Zeb Bangash", "Singer", ["Folk", "Pop"], { gender: F }),
  A("Meesha Shafi", "Singer", ["Rock", "Pop"], {
    gender: F,
    image: "/artists/meesha-shafi.jpg",
    tagline: "Rock & pop vocalist",
    bio: "Meesha Shafi is a versatile Pakistani singer-songwriter and actress celebrated for bold vocal style and defining Coke Studio performances including Jugni with Arif Lohar and Dasht-e-Tanhai. With work spanning rock, electronic folk, and her solo album Khilnay Ko, she delivers distinctive live performances for premier music events.",
  }),
  A("Momina Mustehsan", "Singer", ["Pop"], {
    gender: F,
    image: "/artists/momina-mustehsan.jpg",
    tagline: "Pop vocalist & songwriter",
    bio: "Momina Mustehsan is a prominent Pakistani singer-songwriter who achieved international acclaim with her Coke Studio debut Afreen Afreen alongside Rahat Fateh Ali Khan and hits like Tera Woh Pyar and Baari. Named to BBC's 100 Women, she is recognized for delicate acoustic melodies and high-profile concert appearances.",
  }),
  A("Shae Gill", "Singer", ["Pop"], {
    gender: F,
    genZ: true,
    image: "/artists/shae-gill.jpg",
    imagePosition: "75% 24%",
    tagline: "Pop & soul vocalist",
    bio: "Shae Gill is a Lahore-born pop and soul vocalist who catapulted to global prominence with the multi-hundred-million-streamed Coke Studio hit Pasoori alongside Ali Sethi. Renowned for warm, emotive tone on tracks like Sukoon and Manzil, she is an acclaimed vocal talent for festivals and marquee events.",
  }),
  A("Eva B", "Rapper", ["Rap / Hip-Hop"], {
    gender: F,
    genZ: true,
    image: "/artists/eva-b.jpg",
    tagline: "Balochi & Urdu rapper",
    bio: "Eva B is a groundbreaking rapper and songwriter from Lyari, Karachi, recognized as the first prominent female Balochi hip-hop artist. Following her breakout on Coke Studio Season 14 with Kana Yaari and her contribution to Marvel Studios' Ms. Marvel soundtrack with Rozi, she brings a powerful, authentic voice to festival stages.",
  }),
  A("Young Stunners", "Band", ["Rap / Hip-Hop"], {
    gender: G,
    genZ: true,
    image: "/artists/young-stunners-new.jpg",
    aliases: ["YS", "Talha Anjum and Talhah Yunus"],
    tagline: "Urdu rap pioneers",
    bio: "Young Stunners (Talha Anjum and Talhah Yunus) are Karachi's trailblazing hip-hop duo who spearheaded the Urdu rap movement in Pakistan with landmark tracks like Burger-e-Karachi, Gumaan, and Afsanay. Dominating streaming charts across South Asia, they headline major music festivals and youth arena concerts nationwide.",
  }),
  A("Umair Jaswal", "Singer", ["Rock"], {
    aliases: ["Qayaas"],
    tagline: "Rock vocalist, Qayaas",
    bio: "Umair Jaswal is an acclaimed Pakistani rock vocalist, songwriter, and actor, known as the frontman of award-winning rock band Qayaas and for the thunderous Coke Studio anthem Sammi Meri Waar with QB. He delivers high-energy rock shows for festivals and large-scale concerts.",
  }),
  A("Rohail Hyatt", "Producer", [], {
    aliases: ["Vital Signs"],
    tagline: "Founder & producer, Coke Studio",
    bio: "Rohail Hyatt is a pioneering Pakistani music producer, composer, and founding member of Vital Signs who conceived and executive produced Coke Studio Pakistan. A towering architect of modern Pakistani music, he remains a revered creative director and keynote figure.",
  }),
  A("Strings", "Band", ["Pop", "Rock"], {
    gender: G,
    tagline: "Pop-rock pioneers",
    bio: "Strings is one of South Asia's most celebrated pop-rock bands, founded in Karachi by Bilal Maqsood and Faisal Kapadia. Renowned for chart-topping albums Duur and Dhaani and for producing four acclaimed seasons of Coke Studio (Seasons 7–10), their legacy of melodic rock defines Pakistani pop history.",
  }),
  A("Bilal Maqsood", "Singer", ["Pop"], {
    aliases: ["Strings"],
    tagline: "Musician, composer & Strings co-founder",
    bio: "Bilal Maqsood is a celebrated Pakistani composer, singer, guitarist, and co-founder of Strings. Following decades of hit albums and directing Coke Studio, he produces solo music and acclaimed children's musical shows.",
  }),
  A("Faisal Kapadia", "Singer", ["Pop"], {
    aliases: ["Strings"],
    tagline: "Vocalist & Strings co-founder",
    bio: "Faisal Kapadia is the distinctive lead vocalist and co-founder of Strings, whose resonant baritone defined hits like Duur, Dhaani, and Zinda Hoon. He continues to release solo music and Coke Studio collaborations.",
  }),
  A("Kaifi Khalil", "Singer", ["Pop", "Folk"], {
    genZ: true,
    image: "/artists/kaifi-khalil.jpg",
    tagline: "Balochi folk-pop singer-songwriter",
    bio: "Kaifi Khalil is a Lyari-born singer-songwriter whose emotional Balochi folk-infused Urdu ballad Kahani Suno 2.0 became an unprecedented international viral sensation. A featured artist on Coke Studio Season 14 with Kana Yaari, he performs intimate acoustic and full-band sets for festivals, campus events, and private functions.",
  }),
  A("Abdul Hannan", "Singer", ["Pop"], {
    genZ: true,
    image: "/artists/abdul-hannan-official.jpg",
    tagline: "Indie-pop singer-songwriter",
    bio: "Abdul Hannan is a Pakistani singer-songwriter whose heartfelt indie-pop releases Bikhra and Iraaday achieved viral global popularity, establishing him as one of Spotify's most-streamed artists in Pakistan. With acoustic-driven melodies and appearances on Coke Studio Season 15, he is an engaging live performer for concerts and campus stages.",
  }),
  A("Shazia Manzoor", "Singer", ["Folk"], { gender: F }),
  A("Malkoo", "Singer", ["Folk"]),
  A("Natasha Baig", "Singer", ["Sufi", "Rock"], { gender: F }),
  A("Annural Khalid", "Singer", ["Pop"], {
    gender: F,
    genZ: true,
    image: "/artists/annural-khalid-official.jpg",
    tagline: "Pop & R&B singer-songwriter",
    bio: "Annural Khalid is a rising Pakistani singer-songwriter from Islamabad blending contemporary R&B rhythms with soulful Urdu pop on tracks like Trust Issues and Kehdena. Named Spotify's EQUAL Pakistan Ambassador, she brings modern melodies and vocal polish to live campus and corporate stages.",
  }),
  A("Shehzad Roy", "Singer", ["Pop"]),
  A("Raafay Israr", "Singer", ["Pop"], { genZ: true }),
  A("Maanu", "Singer", ["Pop", "Rap / Hip-Hop"], {
    genZ: true,
    image: "/artists/maanu.webp",
    tagline: "Indie-pop & R&B singer-songwriter",
    bio: "Maanu (Rehman Afshar) is a Lahore-based singer-songwriter and producer blending indie-pop, hip-hop, and R&B on acclaimed projects like Yain City and Sakuna Bay. With a distinctive melodic style, he is a prominent voice in Pakistan's new pop wave.",
  }),
  A("Jani", "Rapper", ["Rap / Hip-Hop"], { genZ: true }),
  A("Taha G", "Singer", ["Pop"], { genZ: true }),
  A("Fariha Pervez", "Singer", ["Pop", "Ghazal"], { gender: F }),
  A("Afusic", "Singer", ["Pop"], {
    genZ: true,
    image: "/artists/afusic-official.jpg",
    tagline: "Pop & R&B singer-songwriter",
    bio: "Afusic is a rising Pakistani pop and R&B singer-songwriter who gained widespread recognition with the viral crossover single Pal Pal. He performs contemporary pop sets tailored for youth concerts and collegiate festivals.",
  }),
  A("Bayaan", "Band", ["Rock", "Pop"], {
    gender: G,
    genZ: true,
    image: "/artists/bayaan-user.jpg",
    tagline: "Alternative rock band",
    bio: "Bayaan is a Lahore-based alternative rock band and winners of Pepsi Battle of the Bands Season 3, celebrated for poetic Urdu lyricism and soaring sonic arrangements across albums Suno and Mahaal. Their powerful live musicianship makes them a top choice for campus festivals and rock concerts.",
  }),
  A("Samar Jafri", "Singer", ["Pop"], {
    genZ: true,
    image: "/artists/samar-jafri.jpg",
    tagline: "Singer & actor",
    bio: "Samar Jafri is a rising Pakistani pop vocalist, songwriter, and actor known for his breakout performance and soundtrack work on the hit television drama Mayi Ri. A featured artist on Pakistan's new wave discovery rosters, he performs contemporary pop and OST sets for youth events and stage shows.",
  }),
  A("JJ47", "Rapper", ["Rap / Hip-Hop"], { genZ: true }),
  A("Zain Zohaib", "Qawwal", ["Qawwali", "Sufi"], {
    gender: G,
    genZ: true,
    aliases: ["Zain Ali & Zohaib Ali", "Zain Zohaib Qawwal"],
    tagline: "Qawwali duo, Coke Studio artists",
    bio: "Zain Zohaib (Zain Ali and Zohaib Ali) are a prominent Pakistani qawwali duo from a distinguished musical family, grandsons of Nusrat Fateh Ali Khan's senior harmonium player Haji Rehmat Ali Khan. Celebrated for Coke Studio highlights Thagyan with QB and Aayi Aayi, they perform passionate qawwali and Sufi sets for weddings and cultural events.",
  }),
  A("Fareed Ayaz Qawwal", "Qawwal", ["Qawwali", "Sufi"], {
    gender: G,
    aliases: ["Fareed Ayaz Abu Muhammad Qawwal", "Fareed Ayaz & Abu Muhammad"],
    tagline: "Sufi qawwali masters, Delhi gharana",
    bio: "Ustad Fareed Ayaz and Abu Muhammad Qawwal are world-renowned exponents of classical qawwali from the 700-year-old Qawwal Bachhon Ka Gharana of Delhi. Celebrated for intellectual command of Amir Khusrau's poetry and Coke Studio masterpieces like Kangna and Ghar Nari, they headline sacred music festivals worldwide.",
  }),
  A("Nimra Mehra", "Singer", ["Pop"], { gender: F, genZ: true }),
  A("Saira Naseem", "Singer", ["Pop", "Folk"], { gender: F }),
  A("Humaira Channa", "Singer", ["Folk", "Playback"], {
    gender: F,
    tagline: "Playback legend & Pride of Performance",
    bio: "Humaira Channa is a six-time Nigar Award-winning playback singer and Pride of Performance recipient who has recorded over a thousand songs for Pakistani television and cinema.",
  }),
  A("Ali Tariq", "Singer", ["Pop"], {
    tagline: "Pop & OST vocalist",
    bio: "Ali Tariq is a popular Pakistani pop and playback singer known for television OSTs including Deewangi and Khuda Aur Mohabbat.",
  }),
  A("Asif Ali Santoo Khan", "Qawwal", ["Qawwali"], {
    aliases: ["Asif Ali Santoo", "Asif Ali Khan Qawwal"],
    tagline: "Sufi qawwali virtuoso",
    bio: "Asif Ali Santoo Khan is an internationally celebrated Pakistani qawwal and direct disciple of Ustad Nusrat Fateh Ali Khan, renowned for carrying forward the master's impassioned vocal style and complex sargams. He headlines spiritual mehfils, weddings, and international Sufi festivals worldwide.",
  }),
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
  A("Sahara UK", "Band", ["Bhangra", "Pop"], {
    gender: G,
    country: "UK",
    tagline: "UK Bhangra & pop group",
    bio: "Sahara UK is a high-energy UK Bhangra and urban pop band led by Herbie Sahara, famed for massive wedding and dancefloor anthems including Billo Hai, Lal Ghagra, and Soniye Ni Soniye, performing concerts worldwide.",
  }),

  A("Havi", "Singer", ["Pop", "Alternative"], {
    tagline: "Abdur Rahman Sajid",
    aliases: ["HAVI", "Abdur Rahman Sajid", "Abdul Rehman Sajid"],
    bio: "HAVI (Abdur Rahman Sajid) is a Karachi-based singer-songwriter and the former lead vocalist of the rock band AUJ, named Spotify's RADAR Pakistan artist for Q3 2026.",
  }),
  A("Shahzaman Ali Khan", "Qawwal", ["Qawwali", "Sufi"], {
    aliases: ["Shah Zaman", "Shahzaman Fateh Ali Khan"],
    bio: "Shahzaman Ali Khan is a Pakistani qawwali singer and the son of Rahat Fateh Ali Khan, who sang the original soundtrack of the ARY drama Bismil.",
  }),
  A("Tahseen Sakina", "Singer", ["Sufi", "Folk"], {
    gender: F,
    bio: "Tahseen Sakina is a Sufi singer from Gujranwala who performed an Abida Parveen tribute at the UK's Sangam Festival in 2022.",
  }),
  A("Khadija Dilnawaz", "Singer", ["Sufi", "Folk"], {
    gender: F,
    tagline: "Sufi & Punjabi folk vocalist",
    bio: "Khadija Dilnawaz is a Sufi and folk vocalist from Punjab known for performing devotional Sufi kalam and traditional Punjabi folk music at cultural festivals and television broadcasts.",
  }),
  A("Sher Mian Dad Khan", "Qawwal", ["Qawwali", "Sufi"]),
  A("Ayesha Jehanzeb", "Host", [], {
    gender: F,
    tagline: "Television host & anchor",
    bio: "Ayesha Jehanzeb is a prominent Pakistani television host, anchor, and presenter known for hosting Geo News's satirical program Khabarnaak and celebrity interview shows, frequently hosting corporate galas, award ceremonies, and media launches.",
  }),
  A("Priti Kaur", "Singer", ["Ghazal", "Sufi", "Bollywood"], {
    gender: F,
    country: "UK",
    internationalOnly: true,
    bio: "Priti Kaur is a UK-based vocalist performing ghazal, Sufi, devotional and Bollywood repertoire.",
  }),
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
  A("DJ Weaw", "DJ", ["Pop", "Electronic"], {
    gender: F,
    country: "International",
    tagline: "Szilvia Simotics",
    bio: "DJ Weaw (Szilvia Simotics) is an international female DJ and electronic artist performing high-energy commercial pop, EDM, and festival sets for luxury events, private parties, and nightclub engagements worldwide.",
  }),
  A("Tahir Abbas", "Singer", ["Folk", "Pop"], {
    tagline: "Folk-pop singer & lyricist",
    bio: "Tahir Abbas is a Pakistani singer, lyricist, and composer known for revitalizing Punjabi and Saraiki folk-pop with modern arrangements on viral hits including Multan, Motorway, and Ranjhan Yaar.",
  }),
  A("Alka Yagnik", "Singer", ["Playback"], {
    gender: F,
    country: "India",
    image: "/artists/alka-yagnik.jpg",
  }),
  A("Mulazim Hussain", "Singer", ["Sufi", "Folk"]),
  A("Laal Band", "Band", ["Rock", "Sufi"], { gender: G }),
  A("Roxen", "Band", ["Rock"], { gender: G, tagline: "Roxen Band" }),
  A("Shreya Ghoshal", "Singer", ["Playback"], { gender: F, country: "India" }),
  A("Arijit Singh", "Singer", ["Playback"], {
    country: "India",
    image: "/artists/arijit-singh.jpeg",
  }),
  A("Sehar Gul Khan", "Singer", ["Pop"], { gender: F, genZ: true }),
  A("Richa Sharma", "Singer", ["Sufi", "Playback"], {
    gender: F,
    country: "India",
  }),
  A("Suhail Ahmed", "Comedian", [], {
    aliases: ["Azizi"],
    tagline: "Satirist & comedian, Hasb-e-Haal",
    bio: "Suhail Ahmed (Azizi) is one of Pakistan's most celebrated comedians, satirists, and stage actors, famed for his satirical character Azizi on Dunya News' Hasb-e-Haal. Awarded the Pride of Performance, his wit and observational humour make him a distinguished presence for corporate dinners and theatre events.",
  }),
  A("Nasir Chinyoti", "Comedian", []),
  A("Zaw Ali", "Singer", ["Sufi", "Pop"]),
  A("Nirmal Roy", "Singer", ["Pop", "Sufi"]),
  A("Ghafar Lehri", "Comedian", [], {
    tagline: "Stage comedian & mimicry artist",
    bio: "Abdul Ghaffar Lehri is a veteran Pakistani stage comedian and mimicry artist known across Punjab theatre circuits and television comedy programs for sharp wit and character impressions.",
  }),
  A("Hanif Raja", "Comedian", ["Comedy"], {
    bio: "Hanif Raja is a veteran Pakistani stage and television comedian and host, known for the show Chup Chupa Kay.",
  }),
  A("Amanat Chan", "Comedian", [], {
    image: "/artists/amanat-chan-official.jpg",
  }),
  A("Agha Majid", "Comedian", [], { image: "/artists/agha-majid.jpeg" }),
  A("Saleem Albela", "Comedian", []),
  A("Asghar Khoso", "Comedian", [], {
    image: "/artists/asghar-khoso.jpeg",
  }),
  A("Bushra Ansari", "Host", [], {
    gender: F,
    tagline: "Actor, host & comedian",
    bio: "Bushra Ansari is an iconic Pakistani television host, actress, comedian, and writer whose illustrious career spans decades of celebrated television and stage work. Awarded the Pride of Performance and Sitara-i-Imtiaz, she brings warmth and unmatched prestige to corporate galas and award ceremonies.",
  }),
  A("Farah Saadya", "Host", [], {
    gender: F,
    aliases: ["Farah Sadia", "Farah Hussain"],
    tagline: "Television host & compere",
    bio: "Farah Saadya (Farah Sadia) is an established Pakistani television host and compere, widely recognized for hosting popular morning and lifestyle shows across national television. With extensive stage hosting and presenting experience, she is available for corporate conferences, award ceremonies, and private events.",
  }),
  A("Qasim Ali Shah", "Speaker", [], {
    tagline: "Motivational speaker & corporate trainer",
    bio: "Qasim Ali Shah is a prominent Pakistani motivational speaker, corporate trainer, author, and educator who has addressed thousands of professionals and students across Pakistan. He delivers keynote sessions on leadership, personal development, and workplace excellence for corporate conferences and institutions.",
  }),
  A("Neha Kakkar", "Singer", ["Playback", "Pop"], {
    gender: F,
    country: "India",
  }),
  A("Jasmine Sandlas", "Singer", ["Bhangra", "Pop"], {
    gender: F,
    country: "USA",
  }),
  A("Rizwan Muazzam Qawwals", "Qawwal", ["Qawwali", "Sufi"], {
    gender: G,
    aliases: ["Rizwan-Muazzam Qawwali Group", "Rizwan Muazzam"],
    tagline: "World-renowned Sufi qawwali group",
    bio: "Rizwan-Muazzam Qawwals is an internationally acclaimed qawwali ensemble led by brothers Rizwan Ali Khan and Muazzam Ali Khan, nephews and students of Ustad Nusrat Fateh Ali Khan. Recording for Real World Records and headlining WOMAD and international concert halls, they present traditional Sufi qawwali at the highest level.",
  }),
  A("Rafaqat Ali Khan", "Singer", ["Classical", "Sufi"]),
  A("Sadia Anwar", "Singer", ["Pop"], {
    gender: F,
    tagline: "Playback & live vocalist",
    bio: "Sadia Anwar is a Pakistani live vocalist and playback singer performing contemporary Urdu and Punjabi pop hits for corporate events, private functions, and cultural galas.",
  }),
  A("Horeya Asmat", "Dhol Player", ["Sufi", "Folk"], {
    gender: F,
    genZ: true,
    tagline: "Dhol player",
    bio: "Horeya Asmat is a Lahore-based dhol player who performs Sufi and folk sets.",
  }),
  A("Sukhbir", "Singer", ["Bhangra"], { country: "India" }),
  A("Manwa Sisters", "Qawwal", ["Qawwali", "Sufi", "Folk"], {
    gender: G,
    bio: "The Manwa Sisters are a female qawwali trio from Faisalabad.",
  }),
  A("Mazhar Rahi", "Singer", ["Punjabi", "Bhangra", "Folk"], {
    bio: "Mazhar Rahi is a Pakistani Punjabi singer known for songs including Nashe Diye Botle and Bilo Tari Ba Phar Kay.",
  }),
  A("Arishma Maryam", "Dhol Player", ["Folk"], {
    gender: F,
    genZ: true,
    tagline: "Dhol player",
    aliases: ["Arishma"],
    image: "/artists/arishma-maryam-official.jpg",
    bio: "Arishma Maryam is a Lahore-based dhol player who performs at weddings and cultural events.",
  }),
  A("Shakeel Siddiqui", "Comedian", []),
  A("Naseem Vicky", "Comedian", []),
  A("Iftikhar Thakur", "Comedian", []),
  A("Laila Khan", "Singer", ["Folk", "Pop"], { gender: F }),
  A("Komal Rizvi", "Singer", ["Pop"], { gender: F }),
  A("Naeem Abbas Rufi", "Singer", ["Folk"]),
  A("Nabeel Shaukat Ali", "Singer", ["Pop", "Playback"]),
  A("Wahdat Rameez", "Singer", ["Classical", "Sufi", "Folk"], {
    bio: "Wahdat Rameez is a classical, Sufi and folk vocalist from Pakpattan.",
  }),
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
  A("Sanam Marvi", "Singer", ["Sufi", "Folk"], {
    gender: F,
    tagline: "Sufi & folk maestro",
    bio: "Sanam Marvi is an internationally acclaimed Pakistani Sufi and folk vocalist from Sindh, celebrated for authentic renditions of Sufi poetry in Sindhi, Punjabi, and Saraiki across multiple Coke Studio seasons. A Tamgha-e-Imtiaz recipient, she performs globally at major sacred music festivals and cultural galas.",
  }),

  // ---------------------------------------------- second intake (added later)
  A("Sarmad Qadeer", "Singer", ["Pop", "Folk"]),
  A("Alamgir", "Singer", ["Pop"], {
    image: "/artists/alamgir-commons.jpg",
    imageCredit: {
      text: "AlexRic26",
      href: "https://commons.wikimedia.org/wiki/File:Alamgir_4.4.jpg",
      license: "CC0 1.0",
      licenseHref: "https://creativecommons.org/publicdomain/zero/1.0/",
    },
    tagline: "Pioneer of Pakistani pop",
    bio: "Alamgir is widely recognized as the pioneer of Urdu pop music in Pakistan, rising to fame in the 1970s with seminal hits including Albela Rahi, Dekha Na Tha, and Keh Dena. A recipient of the Pride of Performance award, his timeless music laid the foundation for modern South Asian pop.",
  }),
  A("Ali Haider", "Singer", ["Pop"], { image: "/artists/ali-haider-official.jpg" }),
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
  A("Fakir Juman Shah", "Singer", ["Sufi", "Folk"], {
    tagline: "Sindhi Sufi folk vocalist",
    bio: "Fakir Juman Shah is a Sindhi Sufi folk singer celebrated for performing the mystical poetry of Shah Abdul Latif Bhittai and Sachal Sarmast at heritage festivals and Sufi gatherings across Sindh.",
  }),
  A("Abbas Ali Khan", "Singer", ["Sufi", "Pop"], {
    image: "/artists/abbas-ali-khan.jpg",
  }),
  A("Asad Abbas", "Singer", ["Ghazal", "Sufi"], {
    image: "/artists/asad-abbas.jpeg",
  }),
  A("Ali Pervaiz Mehdi", "Singer", ["Ghazal", "Classical"]),
  A("Ustaad Naseer-ud-din Saami", "Singer", ["Classical"]),
  A("Rustam Fateh Ali Khan", "Singer", ["Classical", "Qawwali"]),
  A("Muazzam Ali Khan", "Qawwal", ["Qawwali"]),
  A("Karam Abbas", "Qawwal", ["Qawwali", "Classical"]),
  A("Ghulam Ali Qadri", "Qawwal", ["Qawwali"]),
  A("Riaz Qadri", "Qawwal", ["Qawwali"]),
  A("Asfar Hussain", "Singer", ["Rock", "Pop"], {
    image: "/artists/asfar-hussain-official.jpg",
  }),
  A("Junaid Khan", "Singer", ["Rock", "Pop"]),
  A("Ali Noor", "Singer", ["Rock"], {
    tagline: "Rock vocalist & Noori frontman",
    bio: "Ali Noor is the co-founder, lead vocalist, and guitarist of legendary Pakistani rock band Noori, as well as an accomplished music director on Coke Studio. Known for anthemic rock vocals on tracks like Manwa Re and Paar Chanaa De, he performs dynamic rock and acoustic sets.",
  }),
  A("Ali Hamza", "Singer", ["Rock", "Pop"], {
    image: "/artists/ali-hamza-official.jpg",
  }),
  A("Uzair Jaswal", "Singer", ["Rock", "Pop"]),
  A("Adnan Dhool", "Singer", ["Pop", "Sufi"], {
    image: "/artists/adnan-dhool-official.jpg",
  }),
  A("Faraz Anwar", "Singer", ["Rock"], { tagline: "Guitarist & composer" }),
  A("Farhan Rais Khan", "Singer", ["Classical"], { tagline: "Sitar maestro" }),
  A("Nafees Ahmed", "Singer", ["Classical"], { tagline: "Sitar maestro" }),
  A("Usman Riaz", "Specialty Act", [], {
    tagline: "Director, composer & guitarist",
    bio: "Usman Riaz is an internationally recognized Pakistani director, composer, and fingerstyle acoustic guitarist who founded Mano Animation Studios and directed Pakistan's first hand-drawn anime feature, The Glassworker. A TED Senior Fellow, he presents virtuosic percussive guitar and orchestral performances for prestigious cultural and corporate gatherings.",
  }),
  A("Shani Arshad", "Producer", [], { tagline: "Composer & producer" }),
  A("Talal Qureshi", "Producer", ["Electronic", "Rap / Hip-Hop"], {
    tagline: "Producer & electronic artist",
    bio: "Talal Qureshi is a pioneering Pakistani music producer, DJ, and electronic artist credited with shaping Pakistan's modern electronic and hip-hop landscape through innovative synth production and collaborations with Faris Shafi, Hasan Raheem, and international festivals.",
  }),
  A("Abdullah Siddiqui", "Singer", ["Pop"], {
    genZ: true,
    image: "/artists/abdullah-siddiqui-official.jpg",
  }),
  A("Faris Shafi", "Rapper", ["Rap / Hip-Hop"], {
    image: "/artists/faris-shafi.jpg",
    tagline: "Urdu rap pioneer & lyricist",
    bio: "Faris Shafi is a pioneering Pakistani rapper, lyricist, and actor acclaimed for razor-sharp social commentary, rapid cadence, and groundbreaking singles including Awaam, Introduction, and Coke Studio's Muaziz Saarif. He is a headline live performer at contemporary music and youth festivals across Pakistan.",
  }),
  A("Talha Anjum", "Rapper", ["Rap / Hip-Hop"], {
    genZ: true,
    image: "/artists/talha-anjum.jpg",
    tagline: "Urdu rap lyricist, Young Stunners",
    bio: "Talha Anjum is a Karachi-based rapper, songwriter, and co-founder of Young Stunners, widely regarded as one of South Asia's preeminent Urdu lyricists. Known for introspective poetry and solo masterworks including Open Letter, Mein, and Downers at Dusk, he performs at top-tier arena festivals and concerts.",
  }),
  A("Talhah Yunus", "Rapper", ["Rap / Hip-Hop"], {
    genZ: true,
    image: "/artists/talhah-yunus.jpg",
    tagline: "Rapper & songwriter, Young Stunners",
    bio: "Talhah Yunus is a Karachi-based rapper, melodist, and co-founder of Young Stunners whose technical flow and melodic hooks have driven anthems like Shikwa and PSL's Groove Mera. A central figure in contemporary Pakistani hip-hop, he commands massive festival crowds alongside duo partner Talha Anjum.",
  }),
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
  A("Alycia Dias", "Singer", ["Pop", "Playback"], {
    gender: F,
    image: "/artists/alycia-dias-official.jpg",
    tagline: "Playback & OST vocalist",
    bio: "Alycia Dias is an acclaimed Pakistani playback singer from Karachi, celebrated for award-winning television soundtracks including 'Dil-e-Muztar' (Humsafar) and performances across Coke Studio Pakistan seasons.",
  }),
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
  A("Noori", "Band", ["Rock", "Pop"], {
    gender: G,
    aliases: ["Noori Band"],
    tagline: "Lahore rock pioneers, Manwa Re & Nishaan",
    bio: "Noori is an iconic Lahore-based rock band formed by brothers Ali Noor and Ali Hamza. Widely recognized as pioneers of 21st-century Pakistani rock with landmark albums Suno Ke Main Hun Kaun and Peeli Patti Aur Raja Jani Ki Gol Dunya, their energetic anthems like Manwa Re, Nishaan, and Aik Tha Badshah define generation-spanning live concerts.",
  }),
  A("Junoon", "Band", ["Rock", "Sufi"], {
    gender: G,
    aliases: ["Junoon Band"],
    tagline: "Sufi rock pioneers, Sayonee & Jazba-e-Junoon",
    bio: "Junoon is Pakistan's premier Sufi rock band, founded in 1990 by lead guitarist Salman Ahmad alongside vocalist Ali Azmat and bassist Brian O'Connell. Celebrated internationally as pioneers of Sufi rock, Junoon has delivered legendary cultural anthems including Jazba-e-Junoon, Sayonee, and Yaar Bina, headlining stadium concerts across the world.",
  }),
  A("Mekaal Hasan Band", "Band", ["Rock", "Sufi"], {
    gender: G,
    tagline: "Sufi rock & jazz-fusion band",
    bio: "Mekaal Hasan Band (MHB) is an acclaimed Lahore-based Sufi rock and fusion ensemble founded by guitarist-composer Mekaal Hasan in 2001. Renowned for virtuosic arrangements blending classical Eastern melodies with progressive rock on albums like Sampooran and Saptak, MHB features prominently in festivals across South Asia.",
  }),
  A("Entity Paradigm", "Band", ["Rock"], {
    gender: G,
    aliases: ["EP"],
    tagline: "Rock & nu-metal band, Irtiqa",
    bio: "Entity Paradigm (EP) is a pioneering Pakistani alternative rock and nu-metal band formed in Lahore in 2000 featuring Fawad Khan and Ahmed Ali Butt. Their landmark 2003 debut album Irtiqa and runner-up finish on Pepsi Battle of the Bands established them as cult icons of the Pakistani underground rock movement.",
  }),
  A("Aunty Disco Project", "Band", ["Rock", "Pop"], { gender: G }),
  A("Karavan", "Band", ["Rock"], { gender: G }),
  A("Mizraab", "Band", ["Rock"], { gender: G }),
  A("Overload", "Band", ["Rock", "Folk"], { gender: G }),
  A("Qayaas", "Band", ["Rock"], { gender: G }),
  A("Siege", "Band", ["Rock"], { gender: G }),
  A("Karakoram", "Band", ["Rock"], {
    gender: G,
    tagline: "Alternative rock band, Fitoor",
    bio: "Karakoram is a contemporary Lahore-based alternative rock band fronted by Bilawal Lahooti and Sherry Khattak. Known for hard-hitting riffs, emotive lyrics, and dynamic singles like Fitoor, Toofan, and Coke Studio collaborations, Karakoram is a rising powerhouse in Pakistan's live festival circuit.",
  }),
  A("Kashmir", "Band", ["Rock", "Pop"], {
    gender: G,
    aliases: ["Kashmir - The Band", "Kashmir Band"],
    tagline: "Alternative rock band, Pepsi Battle of the Bands winners",
    bio: "Kashmir - The Band is a Karachi-based alternative rock outfit that rose to national prominence after winning Pepsi Battle of the Bands Season 2 in 2017. Fronted by Bilal Ali, the band is celebrated for introspective lyricism and sonic anthems like Kaghaz Ka Jahaz, Faislay, and Chal Hutt.",
  }),
  A("Auj", "Band", ["Rock"], {
    gender: G,
    tagline: "Rock band, Pepsi Battle of the Bands winners",
    bio: "Auj is a Karachi-based alternative and hard rock band that shot to fame after winning Pepsi Battle of the Bands Season 4 in 2019. Celebrated for powerhouse vocals by Abdul Rehman Sajid and heavy melodic riffs on hits like Raat and Angoothi, Auj delivers high-octane festival performances.",
  }),
  A("Aag", "Band", ["Rock"], {
    gender: G,
    image: "/artists/aag-official.jpg",
    tagline: "Alternative rock band",
    bio: "Aag is an alternative rock duo formed by twin brothers Haroon Sheikh and Usman Sheikh. Known for guitar-driven rock compositions, atmospheric vocals, and high-energy live shows, Aag has contributed prominent tracks to Coke Studio and nationwide corporate tours.",
  }),
  A("Takatak", "Band", ["Rock"], { gender: G }),
  A("Kaavish", "Band", ["Pop"], {
    gender: G,
    tagline: "Semi-classical & contemporary duo",
    bio: "Kaavish is an acclaimed Karachi-based musical duo formed by singer-composer Jaffer Zaidi and Maaz Maudood. Known for soul-stirring semi-classical melodies, acoustic instrumentation, and the beloved album Gunkali alongside Coke Studio hits like Faasle and Tere Pyaar Mein, Kaavish is a hallmark of sophisticated live acoustic concerts.",
  }),
  A("Mauj", "Band", ["Pop", "Rock"], { gender: G }),
  A("SYMT", "Band", ["Rock"], { gender: G }),
  A("Soch", "Band", ["Pop"], { gender: G }),
  A("Sajid & Zeeshan", "Band", ["Pop"], { gender: G }),
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
  A("Mahira Khan", "Performer", [], {
    gender: F,
    tagline: "Actor & cultural icon",
    bio: "Mahira Khan is one of Pakistan's most prominent film and television actors, internationally recognized for Humsafar, Raees, and The Legend of Maula Jatt. A regular presenter and celebrity guest at premier cultural galas, awards, and brand launches, she commands unmatched audience engagement.",
  }),
  A("Fawad Khan", "Performer", [], {
    tagline: "Actor, producer & singer",
    bio: "Fawad Khan is an internationally celebrated Pakistani actor, producer, and singer. Former frontman of rock band Entity Paradigm (EP), he gained widespread acclaim in Humsafar, Zindagi Gulzar Hai, Kapoor & Sons, and The Legend of Maula Jatt, headlining prestigious awards, galas, and corporate events.",
  }),
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
  A("Anwar Maqsood", "Host", [], {
    tagline: "Writer, host & satirist",
    image: "/artists/anwar-maqsood-commons.jpg",
    imageCredit: {
      text: "BBC Urdu",
      href: "https://commons.wikimedia.org/wiki/File:Anwar_Maqsood,_ca._2020.jpg",
      license: "CC BY 3.0",
      licenseHref: "https://creativecommons.org/licenses/by/3.0/",
    },
    bio: "Anwar Maqsood is an iconic Pakistani scriptwriter, satirist, humorist, and television host whose career spans over five decades with legendary classics like Loose Talk, Half Plate, and Fifty Fifty. He is a premier speaker and guest of honor for distinguished literary, cultural, and corporate galas.",
  }),

  // International
  A("Shilpa Rao", "Singer", ["Playback"], { gender: F, country: "India" }),
  A("Arooj Aftab", "Singer", ["Sufi"], {
    gender: F,
    country: "USA",
    internationalOnly: true,
    tagline: "Grammy Award-winning vocalist",
    image: "/artists/arooj-aftab-commons.jpg",
    imageCredit: {
      text: "Philip Romano",
      href: "https://commons.wikimedia.org/wiki/File:AroojAftab-byPhilipRomano.jpg",
      license: "CC BY-SA 4.0",
      licenseHref: "https://creativecommons.org/licenses/by-sa/4.0/",
    },
    bio: "Arooj Aftab is an internationally acclaimed Pakistani vocalist, composer, and music producer based in the United States. The first Pakistani artist to win a Grammy Award (Best Global Music Performance for Mohabbat), her ethereal blend of Sufi poetry, jazz, and neo-classical minimalism headlines major international festivals and premier concert halls.",
  }),
  A("Krewella", "Band", ["Pop"], {
    gender: G,
    country: "USA",
    internationalOnly: true,
    tagline: "Electronic dance music duo",
    bio: "Krewella is a Pakistani-American electronic dance music duo formed by sisters Jahan and Yasmine Yousaf. Renowned for chart-topping international dance-pop anthems like Alive and Live for the Night, as well as their appearance on Coke Studio Pakistan Season 11 with Runaway, they headline major music festivals worldwide.",
  }),
  A("Karpe", "Band", ["Rap / Hip-Hop"], { gender: G, country: "Norway" }),
  A("Amanda Delara", "Singer", ["Pop"], {
    gender: F,
    country: "Norway",
    image: "/artists/amanda-delara.avif",
  }),
  A("Sumru Ağıryürüyen", "Singer", ["Folk"], {
    gender: F,
    country: "Turkey",
    slug: "sumru-agiryuruyen",
  }),
  A("Rostam Mirlashari", "Singer", ["Folk"], { country: "Sweden" }),

  // Formerly unconfirmed artists — approved for publication and indexing.
  A("Riaz Ali Khan", "Singer", ["Classical", "Ghazal"], {
    tagline: "Patiala gharana classical vocalist",
    bio: "Riaz Ali Khan is a classical and ghazal vocalist of the renowned Patiala gharana, son of Ustad Amanat Ali Khan and brother of Shafqat Amanat Ali, carrying forward classical and semi-classical traditions.",
  }),
  A("Asif Hussain Samraat", "Singer", ["Folk", "Semi-classical"], {
    aliases: ["Asif Hussain Samrat"],
    bio: "Asif Hussain Samraat is a folk and semi-classical singer who featured on Coke Studio Pakistan Season 4 in 2011.",
  }),
  A("Tahir Mithu", "Singer", ["Sufi", "Folk"], {
    tagline: "Sindhi folk & Sufi singer",
    bio: "Tahir Mithu is a Sindhi folk and Sufi vocalist from Mirpurkhas, Sindh, acclaimed for his powerful rendition of 'Ambulat' on Coke Studio Pakistan Season 7.",
  }),
  A("Shehroze Hussan", "Singer", ["Classical", "Fusion"], {
    tagline: "Sitar maestro & composer",
    aliases: ["Shehroze Hussain"],
    bio: "Shehroze Hussain is a sitarist and composer from the Senia gharana, son of sitar maestro Ustad Sajjad Hussain, featured on Coke Studio Season 14 ('Mehram', 'Peechay Hutt') and prominent fusion projects.",
  }),
  A("Ali Khan", "Singer", ["Pop"], {
    image: "/artists/ali-khan.webp",
    tagline: "Pop singer-songwriter",
    bio: "Ali Khan is a Pakistani pop singer and songwriter known for his 2006 breakout hit 'Saathiya', which he later performed on Coke Studio Pakistan Season 9 in a memorable collaboration produced by Noori.",
  }),
  A("Jaffer Zaidi", "Singer", ["Pop", "Semi-classical", "Fusion"], {
    bio: "Jaffer Zaidi is a Karachi-born singer-songwriter and composer, the lead vocalist of the band Kaavish and a Coke Studio Pakistan artist.",
  }),
  A("Rizwan Butt", "Singer", ["Pop", "Rock", "Sufi"], {
    bio: "Rizwan Butt is a Lahore-born singer-songwriter and guitarist known for Nescafe Basement and Coke Studio Pakistan.",
  }),
  A("Irteassh", "Band", ["A cappella", "Classical", "Pop"], {
    gender: G,
    bio: "Irteassh is a Karachi-based all-female a cappella group formed in 2017.",
  }),
  A("Waqar Ehsin", "Singer", ["Classical", "Sufi", "Pop"], {
    tagline: "Classical & playback vocalist",
    bio: "Waqar Ehsin is a classical and Sufi playback vocalist trained under Ustad Chhote Ghulam Ali Khan, recognized from Pakistan Idol and featured on Coke Studio Season 10.",
  }),
  A("Kashif Din", "Singer", ["Folk"], {
    bio: "Kashif Din is a singer from Hunza who performed Bo Giyam in Burushaski on Coke Studio Pakistan Season 12.",
  }),
  A("Nimra Rafiq", "Singer", ["Sufi", "Pop"], {
    gender: F,
    aliases: ["Nimra Rafique"],
    bio: "Nimra Rafique is a Pakistani vocalist and Coke Studio backing vocalist.",
  }),
  A("Shahab Hussain", "Singer", ["Pop", "Ghazal"], {
    tagline: "Vocalist & composer",
    bio: "Shahab Hussain is a vocalist, composer, and Coke Studio featured artist who performed 'Aaye Kuch Abr' on Coke Studio Season 12 and contributed backing vocals across multiple seasons.",
  }),
  A("Shamali Afghan", "Singer", ["Pashto", "Folk"], {
    country: "International",
    bio: "Shamali Afghan is a Pashto singer and harmonium player who collaborated with Zeb Bangash on the EP Love Letters from Kabul.",
  }),
  A("Aizaz Sohail", "Singer", ["Classical", "Sufi"], {
    image: "/artists/aizaz-sohail.jpeg",
    tagline: "Sham Chaurasi classical vocalist",
    bio: "Aizaz Sohail is an acclaimed classical vocalist of the Sham Chaurasi gharana and disciple of Ustad Ghulam Hassan Shaggan, performing khayal, thumri, and contemporary fusion, featured on Coke Studio Season 14.",
  }),
  A("Mehdi Maloof", "Singer", ["Pop", "Rock"], {
    tagline: "Indie singer-songwriter",
    bio: "Mehdi Maloof is an Islamabad-based singer-songwriter and poet celebrated in Pakistan's indie music scene, acclaimed for his Coke Studio Season 13 performance of 'Dil Khirki' and viral tracks like 'Gandi Surat'.",
  }),
  A("Noman Ali Rajper", "Singer", ["Sindhi", "Folk", "Fusion"], {
    bio: "Noman Ali Rajper is a Sindhi singer from Khairpur featured on Aayi Aayi, the opening song of Coke Studio Pakistan Season 15.",
  }),
  A("Noorima Rehan", "Singer", ["Folk"], {
    gender: F,
    tagline: "Gilgit-Baltistan folk vocalist",
    bio: "Noorima Rehan is a folk and traditional vocalist from Hunza, Gilgit-Baltistan, who preserves Pamiri, Shina, and Burushaski musical heritage, featured on Coke Studio Season 14 and Season 15 ('Mehmaan').",
  }),
  A("Umair Butt", "Singer", ["Punjabi"], {
    bio: "Umair Butt is a Punjabi singer known for Coke Studio Pakistan's Neray Neray Vas and Blockbuster.",
  }),
  A("Zeeshan Ali", "Singer", ["Classical", "Ghazal", "Sufi"], {
    tagline: "Classical & ghazal vocalist",
    bio: "Zeeshan Ali is a classical and ghazal vocalist and composer from Lahore whose soulful traditional and fusion renditions have earned him widespread acclaim across South Asia and the diaspora, featured on Coke Studio Season 15 with '2AM'.",
  }),
  A("Zoha Waseem", "Singer", ["Pop"], {
    gender: F,
    image: "/artists/zoha-waseem.jpg",
    bio: "Zoha Waseem is a Pakistani singer known for the 2025 hit Majboor with Sheheryar Rehan.",
  }),
  A("Murtaza Qizilbash", "Singer", ["Pop"], {
    aliases: ["Murtaza Qazilbash"],
    image: "/artists/murtaza-qizilbash.jpg",
    bio: "Murtaza Qizilbash is a Lahore-based Urdu singer-songwriter named Spotify's RADAR Pakistan artist for Q2 2026.",
  }),
  A("Ahsan Pervaiz", "Producer", ["Pop", "Rock"], {
    image: "/artists/ahsan-pervaiz.jpeg",
    tagline: "Music producer & composer",
    bio: "Ahsan Pervaiz Mehdi is a Pakistani music producer, composer, and singer, formerly with pop-rock band Roxen, who has produced multi-platinum singles for Bilal Saeed, Asim Azhar, and Falak Shabir.",
  }),

  // ----------------------------------------------- third intake (verified additions)
  A("Umair", "Producer", ["Rap / Hip-Hop", "Pop"], {
    genZ: true,
    image: "/artists/umair.jpg",
    tagline: "Producer & artist",
    aliases: ["Umair Tahir", "Umair Music"],
    bio: "Umair is a leading Pakistani music producer and artist at the center of the South Asian hip-hop and pop renaissance. Ranking among Spotify Pakistan's most-streamed artists in 2024 and 2025, his landmark production credits include the album Rockstar Without a Guitar and collaborative chart-toppers with Talha Anjum, Young Stunners, Hasan Raheem, and Asim Azhar.",
  }),
  A("Ali Soomro", "Producer", ["Pop", "Rap / Hip-Hop"], {
    slug: "alisoomromusic",
    genZ: true,
    image: "/artists/ali-soomro.jpg",
    tagline: "Producer & artist",
    aliases: ["Ali Soomro", "AliSoomroMusic", "ali-soomro"],
    bio: "Ali Soomro (AliSoomroMusic) is a Pakistani music producer and collaborator known for shaping contemporary Urdu pop and hip-hop hits, including chart-topping collaborative records across Spotify Pakistan and digital streaming platforms.",
  }),
  A("Rovalio", "Producer", ["Pop"], {
    genZ: true,
    image: "/artists/rovalio.jpg",
    tagline: "Producer & artist",
    bio: "Rovalio is a Pakistani music producer and artist celebrated for his atmospheric, melodic production on viral hits including 'Bikhra' with Abdul Hannan, shaping the sonic identity of the new wave of Pakistani pop.",
  }),
  A("Sheheryar Rehan", "Singer", ["Pop"], {
    genZ: true,
    image: "/artists/sheheryar-rehan.jpg",
    tagline: "Indie pop singer & songwriter",
    bio: "Sheheryar Rehan is a Pakistani singer-songwriter celebrated for emotional indie-pop songwriting and warm vocal delivery, creating viral streaming releases including the hit 'Majboor' with Zoha Waseem.",
  }),
  A("Hassan & Roshaan", "Band", ["Pop"], {
    gender: G,
    tagline: "Indie-pop duo",
    aliases: ["Hassan and Roshaan"],
    bio: "Hassan & Roshaan are an acclaimed Pakistani indie-pop duo from Lahore, celebrated for their viral masterpiece 'Sukoon' (featuring Shae Gill) which surpassed 50 million streams, featured on Marvel Studios' Ms. Marvel soundtrack, and earned them widespread concert and campus demand across South Asia.",
  }),
  A("Aleemrk", "Rapper", ["Rap / Hip-Hop"], {
    genZ: true,
    tagline: "Urdu rap hitmaker",
    aliases: ["Aleem RK"],
    bio: "Aleemrk is a heavyweight Pakistani rapper and songwriter from Karachi known for chart-topping Urdu hip-hop releases including 'Cold Hours', 'Late Night Thoughts', and 'Afsanay', making him one of the most streamed rap artists in South Asia.",
  }),
  A("Sunny Khan Durrani", "Rapper", ["Rap / Hip-Hop"], {
    tagline: "Conscious rap pioneer",
    aliases: ["SKD", "Sunny Khan Durrani"],
    bio: "Sunny Khan Durrani (SKD) is a pioneering Pakistani rapper, poet, and music producer from Peshawar. Recognized as one of the most influential conscious hip-hop voices in South Asia, he is celebrated for introspective anthems including 'La Haasil' and albums exploring social and philosophical themes.",
  }),
  A("Umer Farooq", "Singer", ["Pop", "Rock"], {
    tagline: "Indie singer & songwriter",
    bio: "Umer Farooq is an indie singer-songwriter and composer from Rawalpindi/Islamabad, widely recognized for soulful, poetic tracks including 'Patang', 'Panchi', and 'Pari'.",
  }),
  A("Call", "Band", ["Rock", "Pop"], {
    slug: "call-the-band",
    gender: G,
    tagline: "Pakistani rock band",
    aliases: ["Call The Band", "Call Band"],
    bio: "Call (Call The Band) is an iconic Pakistani rock band formed in Lahore by producer and guitarist Xulfi, fronted by vocalist Junaid Khan. The band rose to nationwide and South Asian fame with stadium rock anthems including 'Laree Chootee', 'Sab Bhula Kay', and 'Kismat'.",
  }),
  A("Fuzon", "Band", ["Classical", "Rock", "Pop"], {
    gender: G,
    tagline: "Eastern classical & rock fusion",
    aliases: ["Fuzön", "Fuzon Band"],
    bio: "Fuzon is a pioneering Pakistani musical group formed in Karachi in 2001, fusing traditional Eastern classical music with modern rock and pop. Acclaimed across South Asia for evergreen hits including 'Khamaj', 'Mora Saiyaan', and 'Aankhon Ke Saagar'.",
  }),
  A("Tamasha", "Band", ["Rock"], {
    slug: "tamasha-the-band",
    gender: G,
    tagline: "Energetic live rock band",
    aliases: ["Tamasha Band"],
    bio: "Tamasha is a high-octane Pakistani rock band from Karachi, finalists of Pepsi Battle of the Bands Season 3, celebrated for electrifying live performances and tracks like 'Roshni' and 'Sajna'.",
  }),
  A("Badnaam", "Band", ["Rock", "Sufi"], {
    gender: G,
    tagline: "Sufi rock trio",
    aliases: ["Badnaam Band"],
    bio: "Badnaam is a Lahore-based Sufi rock band, runners-up of Pepsi Battle of the Bands Season 2, known for intense live energy and hard-hitting Sufi-rock adaptations including 'Khawaja Kay Diwanay' and 'Bismillah'.",
  }),
  A("Haroon", "Singer", ["Pop"], {
    tagline: "Pop icon & creator",
    aliases: ["Haroon Rashid"],
    bio: "Haroon (Haroon Rashid) is a legendary Pakistani pop singer, composer, and producer. Co-founder of the seminal 90s pop group Awaz and a celebrated solo artist behind hits like 'Mehbooba' and 'Dil Se', he has sold millions of records worldwide.",
  }),
  A("Najam Sheraz", "Singer", ["Pop", "Rock"], {
    tagline: "Pop & spiritual vocalist",
    bio: "Najam Sheraz is a veteran Pakistani singer, composer, and peace activist who gained national prominence with signature pop hits such as 'In Se Nain Mila Ke' and emotional ballads including 'Bheegi Bheegi Raaton Mein'.",
  }),
  A("Rap Demon", "Rapper", ["Rap / Hip-Hop"], {
    genZ: true,
    tagline: "Rapper & lyricist",
    aliases: ["Abdullah Malik", "Rap Demon"],
    bio: "Rap Demon (Abdullah Malik) is a prominent Pakistani rapper and songwriter from Karachi known for razor-sharp technical delivery and chart collaborations including 'Agency' alongside Talha Anjum and Umair.",
  }),
  A("Turhan James", "DJ", ["Electronic", "Pop"], {
    tagline: "EDM DJ & music producer",
    bio: "Turhan James is a leading Pakistani electronic music producer and DJ from Karachi. Renowned for dynamic EDM and deep house productions, he has performed at international festivals including Ultra Abu Dhabi and Solis Festival, opened for Martin Garrix and Tiësto, and collaborated with prominent Pakistani vocalists.",
  }),
  A("SomeWhatSuper", "Band", ["Electronic", "Folk"], {
    gender: G,
    tagline: "Pioneering desi EDM duo",
    aliases: ["Somewhat Super", "Some What Super"],
    bio: "SomeWhatSuper is a pioneering Lahore-based electronic music duo formed by Talha Dar and Feroze Faisal. Famous for fusing desi folk sounds with hard-hitting electronic dance beats, their viral anthem 'The Sibbi Song' (featuring Abid Brohi) gained global recognition on Marvel Studios' Ms. Marvel soundtrack.",
  }),
  A("Abid Brohi", "Rapper", ["Rap / Hip-Hop", "Folk"], {
    tagline: "Balochi folk rapper",
    bio: "Abid Brohi is a trailblazing Balochi rapper and folk artist from Sibbi, Balochistan. He rose to international acclaim with the viral crossover 'The Sibbi Song' produced by SomeWhatSuper and featured on the soundtrack of Marvel Studios' Ms. Marvel.",
  }),
  A("Talwiinder", "Singer", ["Pop", "Rap / Hip-Hop"], {
    country: "USA",
    internationalOnly: true,
    tagline: "Punjabi indie & synth-pop artist",
    aliases: ["Talwinder"],
    bio: "Talwiinder is a US-based Punjabi singer, songwriter, and producer known for his masked stage persona and genre-bending sound fusing Punjabi folk with synth-pop and alternative R&B, featuring on hits like 'Wishes' with Hasan Raheem, 'Dhundhala', and 'Gallan 4'.",
  }),
  A("Karan Aujla", "Singer", ["Bhangra", "Rap / Hip-Hop"], {
    country: "Canada",
    internationalOnly: true,
    tagline: "Punjabi music sensation",
    bio: "Karan Aujla is an internationally acclaimed Indian-born Canadian Punjabi singer, rapper, and songwriter known for global smash hits including 'Tauba Tauba', 'Softly', and 'Making Memories', headlining sold-out arena tours worldwide.",
  }),
  A("Diljit Dosanjh", "Singer", ["Bhangra", "Pop", "Playback"], {
    country: "India",
    internationalOnly: true,
    tagline: "Global Punjabi icon",
    bio: "Diljit Dosanjh is a global Punjabi superstar, singer, and actor who made history as the first Punjabi artist to perform at Coachella. With blockbuster world tours including the Dil-Luminati Tour, he is one of the most sought-after live performers in South Asian entertainment.",
  }),
  A("AP Dhillon", "Singer", ["Pop", "Rap / Hip-Hop"], {
    country: "Canada",
    internationalOnly: true,
    tagline: "Indo-Canadian pop & hip-hop artist",
    aliases: ["Amritpal Singh Dhillon"],
    bio: "AP Dhillon (Amritpal Singh Dhillon) is an Indo-Canadian singer, songwriter, and record producer who transformed contemporary Punjabi music with global viral hits such as 'Brown Munde', 'Excuses', 'With You', and 'Insane'.",
  }),
  A("Anuv Jain", "Singer", ["Pop"], {
    country: "India",
    internationalOnly: true,
    tagline: "Indie-pop singer-songwriter",
    bio: "Anuv Jain is an Indian indie-pop singer-songwriter known for intimate acoustic guitar ballads and poetic storytelling. His viral releases including 'Husn', 'Baarishein', and 'Alag Aasmaan' have made him a marquee headliner for youth concerts and corporate festivals.",
  }),
  A("Sunidhi Chauhan", "Singer", ["Playback", "Pop"], {
    gender: F,
    country: "India",
    internationalOnly: true,
    tagline: "Bollywood live powerhouse",
    bio: "Sunidhi Chauhan is one of India's most celebrated playback singers and dynamic live performers, renowned for electrifying stage presence and a vast catalog of Bollywood, pop, and dance anthems.",
  }),
  A("Sonu Nigam", "Singer", ["Playback", "Pop", "Classical"], {
    country: "India",
    internationalOnly: true,
    tagline: "Legendary playback vocalist",
    bio: "Sonu Nigam is a legendary Indian playback singer and live concert performer with a career spanning over three decades, performing in more than a dozen languages and headlining prestigious concert halls worldwide.",
  }),
  A("Humera Arshad", "Singer", ["Pop", "Ghazal", "Folk"], {
    gender: F,
    tagline: "Pop & ghazal vocalist",
    bio: "Humera Arshad is an acclaimed Pakistani pop and ghazal singer trained under Ustad Nusrat Fateh Ali Khan. With multi-award-winning hits including 'Sada Hoon Apnay Pyar Ki', 'Aashiqan Toon Tan Man', and 'Has Sadqe', she is a celebrated headliner for weddings, private galas, and television broadcasts.",
  }),
  A("Hamza Akram Qawwal", "Qawwal", ["Qawwali", "Sufi"], {
    tagline: "Sufi qawwali ensemble",
    aliases: ["Hamza Akram", "Hamza Akram Qawwal & Brothers"],
    bio: "Hamza Akram Qawwal & Brothers are 26th-generation Sufi qawwali exponents descending from Mian Taansen. Winners of the Lux Style Award for Best Emerging Talent, they have toured extensively across the US, UK, and Middle East, performing classical Sufi poetry and spiritual kalam.",
  }),
  A("Mooroo", "Singer", ["Pop", "Rock"], {
    tagline: "Indie singer-songwriter & producer",
    aliases: ["Taimoor Salahuddin"],
    bio: "Mooroo (Taimoor Salahuddin) is an influential Pakistani indie singer-songwriter, music producer, and filmmaker from Lahore. Celebrated for distinctive narrative songwriting and viral releases including 'Mariam', 'Kahani', 'Tasveer', and 'Bandar', he is a favorite across university and indie music festivals.",
  }),
  A("Shubh", "Singer", ["Rap / Hip-Hop", "Bhangra", "Pop"], {
    country: "Canada",
    internationalOnly: true,
    tagline: "Global Punjabi hip-hop artist",
    aliases: ["Shubhneet Singh"],
    bio: "Shubh (Shubhneet Singh) is an Indian-born Canadian rapper and singer who achieved global streaming dominance with modern Punjabi hip-hop tracks like 'Baller', 'Cheques', 'No Love', and 'Still Rollin', performing for international arena concerts and high-profile private events.",
  }),
  A("Jasleen Royal", "Singer", ["Pop", "Playback"], {
    gender: F,
    country: "India",
    internationalOnly: true,
    tagline: "Bollywood & indie-pop vocalist",
    bio: "Jasleen Royal is a multi-award-winning Indian singer, songwriter, and composer celebrated for viral romance anthems including 'Heeriye', 'Din Shagna Da', and 'Ranjha'. She is one of the most in-demand vocalists for luxury destination weddings and international galas across Dubai, Turkey, and Europe.",
  }),
  A("Prateek Kuhad", "Singer", ["Pop"], {
    country: "India",
    internationalOnly: true,
    tagline: "Global indie-pop singer-songwriter",
    bio: "Prateek Kuhad is an internationally acclaimed indie singer-songwriter praised by Barack Obama and NPR. Known for soulful acoustic compositions including 'cold/mess', 'Kasoor', and 'Tum Jab Paas', he headlines sold-out theater and arena tours across North America, Europe, and Asia.",
  }),
  A("Jay Sean", "Singer", ["Pop", "Rap / Hip-Hop"], {
    country: "UK",
    tagline: "Pioneering British-Asian R&B icon",
    aliases: ["Kamaljit Singh Jhooti"],
    bio: "Jay Sean is a pioneering British-Asian R&B singer and songwriter who made history as the first South Asian solo artist to top the US Billboard Hot 100 with 'Down'. With global hits like 'Ride It' and 'Do You Remember', he is a perennial headliner for international concerts, luxury weddings, and corporate summits.",
  }),
];

// ------------------------------------------------------------------ selectors

export const EXCLUSIVE_ARTISTS = ARTISTS.filter(
  (a) => a.managementType === "exclusive"
);

export const NETWORK_ARTISTS = ARTISTS.filter(
  (a) => a.managementType === "network"
);

export const FEATURED_ARTISTS = ARTISTS.filter((a) => a.featured);

/**
 * The one indexability rule — robots meta, the sitemap and related-artist
 * preference all read it. `needsReview` entries are names whose classification
 * is unconfirmed, so their pages would rest on unverified data; they stay
 * reachable for visitors but are `noindex, follow` and out of the sitemap.
 * A missing genre alone is not a reason: comedians, hosts, actors and
 * producers legitimately have none.
 */
export const isIndexable = (artist) =>
  Boolean(artist?.slug) && !artist.needsReview;

/** Name + slug only — enough for the booking form's artist suggestions. */
export const ARTIST_OPTIONS = ARTISTS.map(({ name, slug }) => ({ name, slug }));

/** The fields the booking dialog needs, so pages don't ship whole profiles. */
export const bookingArtist = ({ name, slug, managementType }) => ({
  name,
  slug,
  managementType,
});

// Stable 32-bit FNV-1a hash, used to break ties without favouring the same
// few popular artists on every page.
const hash = (text) => {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

const areCorporateOrHost = (a, b) =>
  (a.artistType === "Host" || a.artistType === "Speaker") &&
  (b.artistType === "Host" || b.artistType === "Speaker");

const areBothDhol = (a, b) =>
  a.artistType === "Dhol Player" && b.artistType === "Dhol Player";

const areElectronicOrDJ = (a, b) =>
  (a.artistType === "DJ" || (a.genres || []).includes("Electronic")) &&
  (b.artistType === "DJ" || (b.genres || []).includes("Electronic"));

const matchScore = (a, b) =>
  (a.genres || []).filter((g) => (b.genres || []).includes(g)).length * 2 +
  (a.artistType === b.artistType ? 1 : 0) +
  (areCorporateOrHost(a, b) ? 2 : 0) +
  (areBothDhol(a, b) ? 3 : 0) +
  (areElectronicOrDJ(a, b) ? 2.5 : 0) +
  (a.country === b.country ? 0.5 : 0);

const RELATED_LIMIT = 4;
const RELATED_MAX_INBOUND = 16;

/**
 * Related artists, computed once at build time: closest musical match first
 * (shared genres, then same artist type, corporate/speaker synergy, and country),
 * ties broken by a per-page hash with priority for under-linked indexable artists.
 * Ensures every artist receives meaningful internal cross-links without orphans.
 */
const RELATED_BY_SLUG = (() => {
  const inbound = new Map();
  const result = new Map();
  for (const artist of ARTISTS) {
    const ranked = ARTISTS.filter((a) => a.slug !== artist.slug)
      .map((a) => ({
        artist: a,
        score: matchScore(a, artist),
        tie: hash(`${artist.slug}:${a.slug}`),
      }))
      .sort(
        (a, b) =>
          b.score - a.score ||
          Number(isIndexable(b.artist)) - Number(isIndexable(a.artist)) ||
          ((inbound.get(a.artist.slug) || 0) === 0 ? -1 : 0) - ((inbound.get(b.artist.slug) || 0) === 0 ? -1 : 0) ||
          (inbound.get(a.artist.slug) || 0) - (inbound.get(b.artist.slug) || 0) ||
          a.tie - b.tie
      );
    const picks = [];
    for (const { artist: candidate, score } of ranked) {
      if (score < 1) continue;
      if ((inbound.get(candidate.slug) || 0) >= RELATED_MAX_INBOUND) continue;
      picks.push(candidate);
      inbound.set(candidate.slug, (inbound.get(candidate.slug) || 0) + 1);
      if (picks.length === RELATED_LIMIT) break;
    }
    if (picks.length < RELATED_LIMIT) {
      for (const { artist: candidate } of ranked) {
        if (picks.includes(candidate)) continue;
        if ((inbound.get(candidate.slug) || 0) >= RELATED_MAX_INBOUND) continue;
        picks.push(candidate);
        inbound.set(candidate.slug, (inbound.get(candidate.slug) || 0) + 1);
        if (picks.length === RELATED_LIMIT) break;
      }
    }
    result.set(artist.slug, picks);
  }

  // Second pass: Ensure every indexable artist has at least one inbound link from another artist page
  const indexable = ARTISTS.filter(isIndexable);
  const zeroInbound = indexable.filter((a) => (inbound.get(a.slug) || 0) === 0);
  for (const orphan of zeroInbound) {
    let bestHost = null;
    let bestScore = -1;
    for (const host of ARTISTS) {
      if (host.slug === orphan.slug) continue;
      const picks = result.get(host.slug);
      if (picks.includes(orphan)) continue;
      const score = matchScore(host, orphan);
      if (score > bestScore) {
        bestScore = score;
        bestHost = host;
      }
    }
    if (bestHost) {
      const picks = result.get(bestHost.slug);
      let replaceIdx = picks.findIndex((p) => (inbound.get(p.slug) || 0) > 1);
      if (replaceIdx === -1) replaceIdx = picks.length - 1;
      const removed = picks[replaceIdx];
      inbound.set(removed.slug, Math.max(0, (inbound.get(removed.slug) || 1) - 1));
      picks[replaceIdx] = orphan;
      inbound.set(orphan.slug, (inbound.get(orphan.slug) || 0) + 1);
    }
  }

  return result;
})();

export const relatedArtists = (artist) => RELATED_BY_SLUG.get(artist.slug) || [];

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
  { id: "classical", label: "Classical", group: "genre", match: (a) => a.genres.includes("Classical") },
  { id: "ghazal", label: "Ghazal", group: "genre", match: (a) => a.genres.includes("Ghazal") },
  { id: "bhangra", label: "Bhangra", group: "genre", match: (a) => a.genres.includes("Bhangra") },
  { id: "rap", label: "Rap / Hip-Hop", group: "genre", match: (a) => a.genres.includes("Rap / Hip-Hop") },
  { id: "rock", label: "Rock", group: "genre", match: (a) => a.genres.includes("Rock") },
  { id: "electronic", label: "Electronic / EDM", group: "genre", match: (a) => a.genres.includes("Electronic") || a.artistType === "DJ" },
  { id: "bands", label: "Bands", group: "genre", match: (a) => a.artistType === "Band" },

  { id: "female", label: "Female Singers", group: "more", match: (a) => a.gender === "female" },
  { id: "male", label: "Male Singers", group: "more", match: (a) => a.gender === "male" },
  { id: "genz", label: "Gen Z Artists", group: "more", match: (a) => a.genZ },
  { id: "international", label: "International Artists", group: "more", match: (a) => a.country !== "Pakistan" },
  { id: "india", label: "Indian Artists", group: "more", match: (a) => a.country === "India" },
  { id: "uk", label: "UK-Based Artists", group: "more", match: (a) => a.country === "UK" },
  { id: "usa", label: "US-Based Artists", group: "more", match: (a) => a.country === "USA" },
  { id: "canada", label: "Canada-Based Artists", group: "more", match: (a) => a.country === "Canada" },
  { id: "producers", label: "Music Producers", group: "more", match: (a) => a.artistType === "Producer" },
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
    if (
      q &&
      !a.name.toLowerCase().includes(q) &&
      !a.aliases.some((alias) => alias.toLowerCase().includes(q))
    )
      return false;
    if (genreFacets.length && !genreFacets.some((f) => f.match(a))) return false;
    if (moreFacets.length && !moreFacets.every((f) => f.match(a))) return false;
    return true;
  });
};

export const facetCount = (facet, list = ARTISTS) =>
  list.filter(facet.match).length;

// ----------------------------------------------------------- page metadata

const NATIONALITY = {
  Pakistan: "Pakistani",
  India: "Indian",
  UK: "UK-based",
  USA: "US-based",
  Canada: "Canada-based",
};

/**
 * e.g. "Pakistani Sufi Singer" — built only from roster data, never invented.
 * `inline` lowercases the artist type for use mid-sentence ("Sufi singer").
 */
const describe = (a, { inline = false } = {}) => {
  const genre = a.genres[0];
  const redundant =
    genre &&
    a.artistType.toLowerCase().startsWith(genre.slice(0, 5).toLowerCase());
  const type =
    inline && a.artistType !== "DJ" ? a.artistType.toLowerCase() : a.artistType;
  return [NATIONALITY[a.country], genre && !redundant ? genre : null, type]
    .filter(Boolean)
    .join(" ");
};

// The layout appends " | GnF Events"; drop "for Events" when the result
// would run past ~65 characters in search results.
const seoTitleFor = (a) => {
  const base = `Book ${a.name} – ${describe(a)}`;
  return base.length + " for Events | GnF Events".length <= 65
    ? `${base} for Events`
    : base;
};

const seoDescriptionFor = (a) => {
  const [first, second] = suitabilityFor(a).map((o) => o.toLowerCase());
  return `Book ${a.name}, ${describe(a, { inline: true })}, for ${first} and ${second}. GnF Events in Lahore checks availability through its artist network.`;
};

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
  seoTitle: a.seo?.title || seoTitleFor(a),
  description:
    a.metaDescription ||
    (a.managementType === "exclusive"
      ? `${a.name} is exclusively managed by GnF Events. Send your event date, city and occasion to book directly through our management team.`
      : seoDescriptionFor(a)),
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

// Homepage discovery picks follow the client-provided order.
const homepageNextWavePicks = [
  {
    slug: "young-stunners",
    name: "Young Stunners",
    image: "/artists/young-stunners-new.jpg",
    genres: ["Urdu rap", "Hip-hop"],
    artistType: "Duo",
    memberLine: "Talha Anjum · Talhah Yunus",
    discoveryDescriptor: "Karachi duo at the center of Urdu hip-hop’s new wave.",
  },
  {
    slug: "hasan-raheem",
    name: "Hasan Raheem",
    image: "/artists/hasan-raheem.jpg",
    genres: ["Alt-pop", "R&B"],
    artistType: "Singer · songwriter",
    discoveryDescriptor: "Shape-shifting pop and R&B with a playful edge.",
  },
  {
    slug: "abdul-hannan",
    name: "Abdul Hannan",
    genres: ["Indie pop"],
    artistType: "Singer · songwriter",
    discoveryDescriptor: "Melodic songwriting and intimate, modern pop.",
  },
  {
    slug: "maanu",
    name: "Maanu",
    image: "/artists/maanu.webp",
    genres: ["Indie pop", "R&B"],
    artistType: "Singer · songwriter",
    discoveryDescriptor: "A mellow, genre-blending voice in new Pakistani pop.",
  },
  {
    slug: "umair",
    name: "Umair",
    image: "/artists/umair.jpg",
    genres: ["Hip-hop", "Production"],
    artistType: "Producer · artist",
    discoveryDescriptor: "A sought-after producer shaping contemporary rap and pop.",
  },
  {
    slug: "annural-khalid",
    name: "Annural Khalid",
    genres: ["Pop", "R&B"],
    artistType: "Singer · songwriter",
    discoveryDescriptor: "Soulful vocals and South Asian melodies in modern pop.",
  },
  {
    slug: "afusic",
    name: "Afusic",
    genres: ["Pop", "R&B"],
    artistType: "Singer · songwriter",
    discoveryDescriptor: "A new pop voice behind the global crossover Pal Pal.",
  },
  {
    slug: "alisoomromusic",
    name: "Ali Soomro",
    image: "/artists/ali-soomro.jpg",
    genres: ["Pop", "Production"],
    artistType: "Producer · artist",
    discoveryDescriptor: "Producer and collaborator behind a new wave of pop hits.",
  },
  {
    slug: "kaifi-khalil",
    name: "Kaifi Khalil",
    image: "/artists/kaifi-khalil.jpg",
    genres: ["Pop", "Balochi influences"],
    artistType: "Singer · songwriter",
    discoveryDescriptor: "Expressive songwriting rooted in Balochi and Urdu melody.",
  },
  {
    slug: "bayaan",
    name: "Bayaan",
    image: "/artists/bayaan-user.jpg",
    genres: ["Alternative rock"],
    artistType: "Band",
    discoveryDescriptor: "Lahore’s alternative band with expansive, poetic sound.",
  },
  {
    slug: "samar-jafri",
    name: "Samar Jafri",
    image: "/artists/samar-jafri.jpg",
    genres: ["Pop", "Soundtrack"],
    artistType: "Singer · actor",
    discoveryDescriptor: "A young performer moving between original pop and OSTs.",
  },
  {
    slug: "rovalio",
    name: "Rovalio",
    image: "/artists/rovalio.jpg",
    genres: ["Pop", "Production"],
    artistType: "Producer · artist",
    discoveryDescriptor: "Melodic, atmospheric production across Pakistan’s new pop.",
  },
  {
    slug: "shae-gill",
    name: "Shae Gill",
    image: "/artists/shae-gill.jpg",
    imagePosition: "75% 24%",
    genres: ["Pop", "Soul"],
    artistType: "Singer",
    discoveryDescriptor: "A distinctive pop-soul voice with a cross-border audience.",
  },
  {
    slug: "zoha-waseem",
    name: "Zoha Waseem",
    image: "/artists/zoha-waseem.jpg",
    genres: ["Pop"],
    artistType: "Singer",
    discoveryDescriptor: "A rising pop vocalist with a warm, melodic delivery.",
  },
  {
    slug: "murtaza-qizilbash",
    name: "Murtaza Qizilbash",
    image: "/artists/murtaza-qizilbash.jpg",
    genres: ["Pop"],
    artistType: "Singer · songwriter",
    discoveryDescriptor: "Stripped-back, emotional Urdu pop and ballads.",
  },
  {
    slug: "sheheryar-rehan",
    name: "Sheheryar Rehan",
    image: "/artists/sheheryar-rehan.jpg",
    genres: ["Indie pop"],
    artistType: "Singer · songwriter",
    discoveryDescriptor: "Intimate indie pop built around poetic storytelling.",
  },
];

export const homepageNextWaveArtists = homepageNextWavePicks.map((pick) => {
  const rosterArtist = getArtist(pick.slug);
  const bookingUrl = whatsappLink(
    `Hi GnF Events, I’d like to enquire about booking ${pick.name}${pick.memberLine ? ` (${pick.memberLine})` : ""} for my event. Please let me know the booking options and availability.`
  );

  return {
    ...rosterArtist,
    ...pick,
    image: rosterArtist?.image || pick.image || null,
    href: rosterArtist?.href || null,
    managementType: rosterArtist?.managementType || "network",
    bookingUrl,
  };
});
