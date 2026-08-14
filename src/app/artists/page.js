import ArtistDirectory from "@/components/ArtistDirectory/ArtistDirectory";
import BookingButton from "@/components/BookingForm/BookingButton";
import ExclusiveSpotlight from "@/components/ExclusiveSpotlight/ExclusiveSpotlight";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import JsonLd from "@/components/JsonLd/JsonLd";
import { ARTISTS, EXCLUSIVE_ARTISTS, artists } from "@/data/artists";
import { SITE_URL } from "@/data/site";
import styles from "./page.module.css";

export const metadata = {
  title: "Pakistani Singers & Artists for Booking",
  description:
    "Browse the GnF Events artist network across music, qawwali, entertainment, comedy and international talent. Contact us for artist availability, coordination and event management.",
  alternates: { canonical: "/artists" },
  openGraph: {
    title: "Pakistani Singers & Artists for Booking | GnF Events",
    description:
      "Browse leading Pakistani and international artists, then start an availability enquiry for your wedding, corporate event, concert or festival.",
    url: `${SITE_URL}/artists`,
    images: ["/images/AtifAslam.jpg"],
  },
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Artists available for event booking enquiries",
  url: `${SITE_URL}/artists`,
  numberOfItems: artists.length,
  itemListElement: artists.map((artist, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: artist.name,
    url: `${SITE_URL}${artist.href}`,
  })),
};

const COUNTRIES = new Set(ARTISTS.map((a) => a.country));

export default function ArtistsPage() {
  return (
    <>
      <JsonLd data={itemListSchema} />
      <Header active="artists" />
      <main>
        <section className={styles.hero}>
          <p className={`eyebrow ${styles.heroEyebrow}`}>The roster</p>
          <h1 className={styles.title}>
            Find the right artist for <em>your event</em>
          </h1>
          <p className={styles.introText}>
            Browse our artist network across music, qawwali, entertainment,
            comedy and international talent — then send a booking enquiry
            straight to our team.
          </p>

          <div className={styles.figures}>
            <div>
              <p className={styles.figure}>{ARTISTS.length}</p>
              <p className={styles.figureLabel}>Artists listed</p>
            </div>
            <div>
              <p className={styles.figure}>{COUNTRIES.size}</p>
              <p className={styles.figureLabel}>Countries</p>
            </div>
            <div>
              <p className={styles.figure}>{EXCLUSIVE_ARTISTS.length}</p>
              <p className={styles.figureLabel}>Exclusively managed</p>
            </div>
          </div>

          <div className={styles.heroLinks}>
            <a href="#exclusive" className={styles.jumpGold}>
              Artists we represent →
            </a>
            <a href="#directory" className={styles.jump}>
              Browse the full network →
            </a>
          </div>
        </section>

        <ExclusiveSpotlight artists={EXCLUSIVE_ARTISTS} allArtists={ARTISTS} />

        <section className={styles.directoryHead}>
          <p className="eyebrow">Artist network</p>
          <h2 className={styles.directoryTitle}>
            Available through our booking network
          </h2>
          <p className={styles.directoryNote}>
            These artists are not exclusively managed by GnF Events. We handle
            the approach, booking, coordination, logistics, and hospitality on
            your behalf.
          </p>
        </section>

        <ArtistDirectory />

        <section className={styles.enquiryWrap}>
          <aside className={styles.enquiry}>
            <div>
              <h2 className={styles.enquiryTitle}>
                Looking for someone not listed here?
              </h2>
              <p className={styles.enquiryText}>
                Our network reaches far beyond this roster — singers, bands,
                comedians, and celebrities across Pakistan and abroad.
              </p>
            </div>
            <BookingButton artists={ARTISTS}>Start an enquiry</BookingButton>
          </aside>
          <p className={styles.disclaimer}>
            Availability is subject to the artist&apos;s schedule and
            confirmation. GnF Events facilitates booking enquiries and event
            coordination.
          </p>
        </section>
      </main>
      <Footer compact />
    </>
  );
}
