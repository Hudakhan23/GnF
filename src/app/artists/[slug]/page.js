import Image from "next/image";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import JsonLd from "@/components/JsonLd/JsonLd";
import { artists, getArtist } from "@/data/artists";
import { SITE_URL, whatsappLink } from "@/data/site";
import styles from "./page.module.css";

export function generateStaticParams() {
  return artists.map((artist) => ({ slug: artist.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const artist = getArtist(slug);
  if (!artist) return {};

  return {
    title: `Book ${artist.name} for an Event`,
    description: `Enquire about ${artist.name} booking availability for weddings, corporate events and concerts in Pakistan. GnF Events coordinates artist booking and event logistics.`,
    alternates: { canonical: artist.href },
    openGraph: {
      title: `Book ${artist.name} for an Event | GnF Events`,
      description: artist.description,
      url: `${SITE_URL}${artist.href}`,
      images: [{ url: artist.image, alt: `${artist.name} booking enquiry` }],
    },
  };
}

export default async function ArtistBookingPage({ params }) {
  const { slug } = await params;
  const artist = getArtist(slug);
  if (!artist) notFound();

  const bookingUrl = whatsappLink(
    `Hi GnF Events, I want to enquire about booking ${artist.name}. My event date/city is: `,
  );
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `${artist.name} event booking enquiry`,
      description: artist.description,
      url: `${SITE_URL}${artist.href}`,
      image: `${SITE_URL}${artist.image}`,
      serviceType: "Artist booking facilitation",
      areaServed: { "@type": "Country", name: "Pakistan" },
      provider: { "@id": `${SITE_URL}/#organization` },
      about: { "@type": "Person", name: artist.name },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Artists", item: `${SITE_URL}/artists` },
        { "@type": "ListItem", position: 3, name: artist.name, item: `${SITE_URL}${artist.href}` },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={schema} />
      <Header active="artists" />
      <main>
        <section className={styles.hero}>
          <div className={styles.portrait}>
            <Image
              src={artist.image}
              alt={`${artist.name} artist booking enquiry`}
              fill
              priority
              sizes="(max-width: 800px) 100vw, 45vw"
            />
          </div>
          <div className={styles.copy}>
            <nav aria-label="Breadcrumb">
              <a href="/artists">Artists</a><span>/</span><span>{artist.name}</span>
            </nav>
            <p className={styles.eyebrow}>Artist booking enquiry</p>
            <h1>Book <em>{artist.name}</em> for your event</h1>
            <p className={styles.tag}>{artist.tag}</p>
            <p className={styles.intro}>
              Planning a wedding, corporate evening, festival, concert, or private
              celebration? Share your event date, city, venue, and audience details.
              GnF Events will help check {artist.name}&apos;s availability and coordinate
              the booking process, logistics, and hospitality requirements.
            </p>
            <div className={styles.actions}>
              <a href={bookingUrl} target="_blank" rel="noreferrer">Check availability on WhatsApp</a>
              <a href="/contact">Send an enquiry</a>
            </div>
            <dl className={styles.details}>
              <div><dt>Service area</dt><dd>Pakistan & international events</dd></div>
              <div><dt>Response</dt><dd>Booking support available 24/7</dd></div>
              <div><dt>What to send</dt><dd>Date, city, event type, venue & audience</dd></div>
            </dl>
            <p className={styles.disclaimer}>
              Artist availability, fee, travel, and technical requirements are confirmed
              only after a formal enquiry. This page is for booking facilitation and does
              not claim direct artist representation.
            </p>
          </div>
        </section>

        <section className={styles.process}>
          <p className={styles.eyebrow}>How it works</p>
          <h2>A clear route from enquiry to stage</h2>
          <ol>
            <li><span>01</span><h3>Share your event</h3><p>Tell us the date, city, occasion, venue, and expected audience.</p></li>
            <li><span>02</span><h3>Availability check</h3><p>Our team coordinates the artist availability and requirement enquiry.</p></li>
            <li><span>03</span><h3>Confirm & coordinate</h3><p>Once approved, we align contracts, travel, hospitality, and show logistics.</p></li>
          </ol>
        </section>

        <section className={styles.bottomCta}>
          <div>
            <p>Ready to start?</p>
            <h2>Bring {artist.name} to your stage</h2>
          </div>
          <a href={bookingUrl} target="_blank" rel="noreferrer">Start on WhatsApp</a>
        </section>
      </main>
      <Footer compact />
    </>
  );
}
