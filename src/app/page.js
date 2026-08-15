import Image from "next/image";
import ArtistCard from "@/components/ArtistCard/ArtistCard";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import JsonLd from "@/components/JsonLd/JsonLd";
import Marquee from "@/components/Marquee/Marquee";
import Reveal from "@/components/Reveal/Reveal";
import { featuredArtists } from "@/data/artists";
import {
  allyLogos,
  marqueeHighlights,
  occasions,
  services,
  showPosters,
} from "@/data/shows";
import {
  ADDRESS,
  EMAIL,
  PHONE_PRIMARY,
  SITE_URL,
  WHATSAPP_URL,
  whatsappLink,
} from "@/data/site";
import styles from "./page.module.css";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "@id": `${SITE_URL}/#organization`,
  name: "GnF Events",
  url: SITE_URL,
  logo: `${SITE_URL}/logo-gold.png`,
  image: `${SITE_URL}/EventHighlights/E14.jpeg`,
  description:
    "Artist facilitation and event management company for singer, celebrity and entertainment bookings in Pakistan and worldwide.",
  foundingDate: "2016",
  email: EMAIL,
  telephone: PHONE_PRIMARY,
  address: {
    "@type": "PostalAddress",
    streetAddress: "93 D, Divine Garden",
    addressLocality: "Lahore",
    addressCountry: "PK",
  },
  areaServed: ["Pakistan", "Lahore", "Karachi", "Islamabad", "Worldwide"],
  sameAs: [
    "https://www.facebook.com/glow.fanz",
    "https://www.instagram.com/gnfeventsofficial",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: PHONE_PRIMARY,
    contactType: "artist booking",
    availableLanguage: ["English", "Urdu"],
    areaServed: "PK",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/#artist-booking-service`,
  name: "Singer and Artist Booking in Pakistan",
  serviceType: "Artist facilitation and event management",
  provider: { "@id": `${SITE_URL}/#organization` },
  areaServed: { "@type": "Country", name: "Pakistan" },
  availableChannel: {
    "@type": "ServiceChannel",
    serviceUrl: `${SITE_URL}/contact`,
    servicePhone: { "@type": "ContactPoint", telephone: PHONE_PRIMARY },
  },
};

export default function Home() {
  return (
    <>
      <JsonLd data={[organizationSchema, serviceSchema]} />
      <Header active="home" overlay />
      <main>
        <section className={styles.hero}>
          <div className={styles.heroMedia}>
            <Image
              src="/EventHighlights/E14.jpeg"
              alt="Live concert audience at a GnF Events production"
              fill
              sizes="100vw"
              priority
              quality={85}
              className={styles.heroImage}
            />
            <span className={styles.heroShade} />
            <span className={styles.heroSideShade} />
          </div>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>Artist Facilitation · Event Management · Since 2016</p>
            <h1>
              We put Pakistan&apos;s <em>greatest artists</em> on your stage
            </h1>
            <div className={styles.heroBottom}>
              <div className={styles.actions}>
                <a className={styles.primaryButton} href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                  Book an Artist
                </a>
                <a className={styles.secondaryButton} href="/artists">
                  Explore the Roster
                </a>
              </div>
              <p>
                24/7 artist and event management — concerts, corporate dinners,
                weddings, cruises, and festivals, in Pakistan and worldwide.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.ticker} aria-label="Events we serve">
          <Marquee
            items={occasions}
            duration="28s"
            renderItem={(word, index) => (
              <p className={styles.tickerItem} key={`${word}-${index}`} aria-hidden={index >= occasions.length}>
                {word} <span>✦</span>
              </p>
            )}
          />
        </section>

        <Reveal className={`${styles.positioning} ${styles.deferred}`}>
          <h2>Your gateway to extraordinary entertainment experiences</h2>
          <div>
            <p>
              GnF Events connects clients with leading Pakistani singers, performers,
              and celebrities for weddings, corporate events, concerts, and private
              celebrations. From an artist availability enquiry in Lahore, Karachi,
              or Islamabad to end-to-end event coordination, our team keeps every
              detail seamless.
            </p>
            <div className={styles.stats} aria-label="GnF Events at a glance">
              <div><strong>2016</strong><span>Founded</span></div>
              <div><strong>24/7</strong><span>Support</span></div>
              <div><strong>Global</strong><span>Network</span></div>
            </div>
          </div>
        </Reveal>

        <Reveal className={`${styles.artistSection} ${styles.deferred}`}>
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>The roster</p>
              <h2>Featured artists</h2>
            </div>
            <a className={styles.textLink} href="/artists">All artists →</a>
          </div>
          <div className={styles.artistMosaic}>
            {featuredArtists.map((artist, index) => (
              <ArtistCard
                artist={artist}
                featured
                key={artist.slug}
                sizes={index < 3 ? "(max-width: 700px) 100vw, (max-width: 1050px) 50vw, 34vw" : "(max-width: 700px) 100vw, (max-width: 1050px) 50vw, 25vw"}
              />
            ))}
          </div>
        </Reveal>

        <Reveal id="services" className={`${styles.services} ${styles.deferred}`}>
          <div className={styles.serviceInner}>
            <div className={styles.serviceHeading}>
              <div>
                <p className={styles.eyebrow}>What we do</p>
                <h2>
                  Our services. One standard: <em>unforgettable.</em>
                </h2>
              </div>
              <p className={styles.serviceNote}>
                We provide end-to-end management and facilitation to make your
                events iconic — from concept to flawless execution.
              </p>
            </div>
            <div className={styles.serviceGrid}>
              {services.map((service, index) => (
                <article className={styles.serviceCard} key={service.title}>
                  <Image src={service.image} alt={service.alt} fill sizes="(max-width: 800px) 100vw, 50vw" />
                  <span className={styles.cardShade} />
                  <div className={styles.serviceContent}>
                    <p>{String(index + 1).padStart(2, "0")}</p>
                    <h3>{service.title}</h3>
                    <div>{service.description}</div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal id="work" className={`${styles.work} ${styles.deferred}`}>
          <div className={styles.workHeading}>
            <div>
              <p className={styles.eyebrow}>The work</p>
              <h2>Star-studded shows, season after season</h2>
            </div>
            <p>
              Each poster tells the story of an incredible experience, capturing
              the energy of our shows and live productions.
            </p>
          </div>
          <Marquee
            items={showPosters}
            duration="60s"
            pauseOnHover
            className={styles.posterMarquee}
            ariaLabel="Recent GnF Events show posters"
            renderItem={(poster, index) => (
              <div className={styles.poster} key={`${poster}-${index}`} aria-hidden={index >= showPosters.length}>
                <Image src={poster} alt={index < showPosters.length ? `GnF Events recent show poster ${index + 1}` : ""} fill sizes="280px" />
              </div>
            )}
          />
          <Marquee
            items={marqueeHighlights}
            duration="50s"
            reverse
            pauseOnHover
            className={styles.highlightMarquee}
            ariaLabel="Highlights from GnF Events productions"
            renderItem={(highlight, index) => (
              <div className={styles.marqueeHighlight} key={`${highlight}-${index}`} aria-hidden={index >= marqueeHighlights.length}>
                <Image src={highlight} alt={index < marqueeHighlights.length ? `Live event highlight ${index + 1}` : ""} fill sizes="280px" />
              </div>
            )}
          />
        </Reveal>

        <Reveal className={`${styles.leadership} ${styles.deferred}`}>
          <div className={styles.leadershipInner}>
            <div className={styles.ceoImage}>
              <Image
                src="/images/CEO-pro.png"
                alt="Aamir Mehmood Rana, Founder and CEO of GnF Events"
                fill
                sizes="(max-width: 800px) 100vw, 42vw"
              />
            </div>
            <div>
              <p className={styles.eyebrow}>Leadership</p>
              <h2>“You don&apos;t just attend events — you experience them.”</h2>
              <p>
                Aamir Mehmood Rana, Founder & CEO of GnF Events, brings over two
                decades of expertise from Jang Media Group and PTV. Since founding
                GnF Events in 2016, his vision has shaped a trusted artist and event
                facilitation network.
              </p>
              <strong>Aamir Mehmood Rana — Founder & CEO</strong>
              <a className={styles.textLink} href="/about">About GnF →</a>
            </div>
          </div>
        </Reveal>

        <Reveal className={`${styles.allies} ${styles.deferred}`} aria-label="Trusted allies">
          <p>Our trusted allies</p>
          <Marquee
            items={allyLogos}
            duration="40s"
            renderItem={(ally, index) => (
              <div className={styles.ally} key={`${ally}-${index}`} aria-hidden={index >= allyLogos.length}>
                <Image src={ally} alt={index < allyLogos.length ? `GnF Events partner ${index + 1}` : ""} fill sizes="170px" />
              </div>
            )}
          />
        </Reveal>

        <Reveal className={`${styles.cta} ${styles.deferred}`}>
          <Image src="/EventHighlights/E12.jpeg" alt="Concert stage" fill sizes="100vw" />
          <span />
          <div>
            <p className={styles.eyebrow}>Let&apos;s talk</p>
            <h2>Bring your favourite artist to <em>your stage</em></h2>
            <div className={styles.actions}>
              <a
                className={styles.primaryButton}
                href={whatsappLink("Hi GnF Events, I'd like to book an artist for my event.")}
                target="_blank"
                rel="noreferrer"
              >
                Book via WhatsApp
              </a>
              <a className={styles.secondaryButton} href="/contact">Contact us</a>
            </div>
          </div>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
