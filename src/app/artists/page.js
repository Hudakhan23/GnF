import ArtistCard from "@/components/ArtistCard/ArtistCard";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import JsonLd from "@/components/JsonLd/JsonLd";
import { artists } from "@/data/artists";
import { SITE_URL, whatsappLink } from "@/data/site";
import styles from "./page.module.css";

export const metadata = {
  title: "Pakistani Singers & Artists for Booking",
  description:
    "Explore Pakistani singers and performers available for event booking enquiries. Contact GnF Events for artist availability, coordination and event management.",
  alternates: { canonical: "/artists" },
  openGraph: {
    title: "Pakistani Singers & Artists for Booking | GnF Events",
    description:
      "Browse leading Pakistani artists and start an availability enquiry for your wedding, corporate event, concert or private celebration.",
    url: `${SITE_URL}/artists`,
    images: ["/images/AtifAslam.jpg"],
  },
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Pakistani artists for event booking enquiries",
  url: `${SITE_URL}/artists`,
  numberOfItems: artists.length,
  itemListElement: artists.map((artist, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: artist.name,
    url: `${SITE_URL}${artist.href}`,
  })),
};

export default function ArtistsPage() {
  return (
    <>
      <JsonLd data={itemListSchema} />
      <Header active="artists" />
      <main>
        <section className={styles.hero}>
          <p>The roster</p>
          <h1>The most <em>celebrated artists</em> in the industry</h1>
          <div>
            Explore leading Pakistani singers, Sufi voices, pop stars, and live
            performers for weddings, corporate events, concerts, and festivals.
            Open an artist page to send your date, city, and event details.
          </div>
        </section>

        <section className={styles.roster} aria-label="Artist roster">
          <div className={styles.grid}>
            {artists.map((artist, index) => (
              <ArtistCard artist={artist} key={artist.slug} priority={index < 3} />
            ))}
          </div>
          <aside className={styles.customCta}>
            <div>
              <h2>Looking for someone not listed here?</h2>
              <p>
                Our network reaches beyond this roster — singers, bands, comedians,
                and celebrities across Pakistan and abroad.
              </p>
            </div>
            <a
              href={whatsappLink("Hi GnF Events, I'm looking for an artist for my event.")}
              target="_blank"
              rel="noreferrer"
            >
              Ask us on WhatsApp
            </a>
          </aside>
          <p className={styles.disclaimer}>
            Availability is subject to the artist&apos;s schedule and confirmation. GnF
            Events facilitates booking enquiries and event coordination.
          </p>
        </section>
      </main>
      <Footer compact />
    </>
  );
}
