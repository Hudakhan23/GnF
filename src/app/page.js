import Image from "next/image";
import ArtistCard from "@/components/ArtistCard/ArtistCard";
import Footer from "@/components/Footer/Footer";
import GenZArtistCarousel from "@/components/GenZArtistCarousel/GenZArtistCarousel";
import Header from "@/components/Header/Header";
import JsonLd from "@/components/JsonLd/JsonLd";
import Marquee from "@/components/Marquee/Marquee";
import Reveal from "@/components/Reveal/Reveal";
import { featuredArtists, getArtist, homepageNextWaveArtists } from "@/data/artists";
import {
  EVENTS,
  EVENT_CATEGORIES,
  HOME_FEATURED_EVENTS,
  INTERNATIONAL_PARTNERS,
  SIGNATURE_EVENTS,
  categoryLabel,
  eventHeadline,
  eventPlace,
  formatEventDate,
  getEvent,
  getEventStats,
} from "@/data/events";
import {
  allyLogos,
  marqueeHighlights,
  occasions,
  services,
} from "@/data/shows";
import {
  ORGANIZATION_SCHEMA_ID,
  PHONE_PRIMARY,
  SITE_URL,
  WHATSAPP_GENERAL_MESSAGE,
  whatsappLink,
} from "@/data/site";
import { DEFAULT_OPEN_GRAPH } from "@/lib/metadata";
import styles from "./page.module.css";

export const metadata = {
  alternates: { canonical: "/" },
  openGraph: { ...DEFAULT_OPEN_GRAPH, url: SITE_URL },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/#artist-booking-service`,
  name: "Singer and Artist Booking in Pakistan",
  serviceType: "Artist facilitation and event management",
  provider: { "@id": ORGANIZATION_SCHEMA_ID },
  areaServed: { "@type": "Country", name: "Pakistan" },
  availableChannel: {
    "@type": "ServiceChannel",
    serviceUrl: `${SITE_URL}/contact`,
    servicePhone: { "@type": "ContactPoint", telephone: PHONE_PRIMARY.e164 },
  },
};

const workStats = getEventStats();
const workFeatureProject = SIGNATURE_EVENTS[0];
const workFeature = getEvent(workFeatureProject.slug);
const workEvents = HOME_FEATURED_EVENTS.map(getEvent);
const workCategories = EVENT_CATEGORIES.map((category) => ({
  ...category,
  count: EVENTS.filter((event) => event.category === category.key).length,
}));
const partnerEventSlugs = new Set(INTERNATIONAL_PARTNERS.flatMap((partner) => partner.events));
const workOverseasShows = EVENTS.filter(
  (event) => event.category === "international" && !partnerEventSlugs.has(event.slug),
);

const exclusiveHomeArtist = getArtist("nish-asher");
const nextWaveArtists = homepageNextWaveArtists.map(
  ({
    slug,
    name,
    image,
    imagePosition,
    genres,
    artistType,
    managementType,
    href,
    bookingUrl,
    discoveryDescriptor,
    profile,
    memberLine,
  }) => ({
    slug,
    name,
    image,
    imagePosition,
    genres,
    artistType,
    managementType,
    href,
    bookingUrl,
    discoveryDescriptor,
    memberLine,
    isOstArtist: Boolean(profile?.heroTitle?.includes("OST")),
  }),
);

export default function Home() {
  return (
    <>
      <JsonLd data={serviceSchema} />
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
              Find the right artist. <em>Own the night.</em>
            </h1>
            <div className={styles.heroBottom}>
              <div className={styles.actions}>
                <a
                  className={styles.primaryButton}
                  href={whatsappLink(WHATSAPP_GENERAL_MESSAGE)}
                  target="_blank"
                  rel="noreferrer"
                  data-cta="home_hero"
                >
                  Book an Artist
                </a>
                <a className={styles.secondaryButton} href="/artists">
                  Explore Artists
                </a>
              </div>
              <p>
                Discover and book Pakistani performers for concerts, campus
                shows, weddings, and private events. Our team brings the artist
                and the production together.
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

        <GenZArtistCarousel artists={nextWaveArtists} />

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
              <div><strong>{workStats.countriesAbroad.length + 1}</strong><span>Countries</span></div>
            </div>
          </div>
        </Reveal>

        <Reveal className={`${styles.exclusiveFeature} ${styles.deferred}`}>
          <div className={styles.exclusivePoster}>
            <Image
              src={exclusiveHomeArtist.profile.poster}
              alt="Nish Asher — exclusive artist officially managed by GnF Events"
              fill
              sizes="(max-width: 900px) 100vw, 48vw"
              quality={85}
            />
          </div>
          <div className={styles.exclusiveContent}>
            <p className={styles.eyebrow}>
              Exclusive artist · Worldwide bookings
            </p>
            <h2>
              Nish Asher, <em>officially managed</em> by GnF Events
            </h2>
            <p className={styles.exclusiveLead}>
              A versatile pop vocalist and acclaimed OST performer, Nish Asher
              is known for the Khuda Aur Mohabbat title track with Rahat Fateh
              Ali Khan — now at more than 474 million YouTube views.
            </p>
            <div className={styles.exclusiveMetrics}>
              {exclusiveHomeArtist.profile.stats.map((stat) => (
                <div key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
            <div className={styles.actions}>
              <a
                className={styles.primaryButton}
                href={exclusiveHomeArtist.href}
              >
                View Nish Asher Profile
              </a>
              <a
                className={styles.secondaryButton}
                href={exclusiveHomeArtist.bookingUrl}
                target="_blank"
                rel="noreferrer"
              >
                Book Nish Asher
              </a>
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
              <h2>
                Star-studded shows, <em>season after season</em>
              </h2>
            </div>
            <dl className={styles.workStats}>
              <div><dt>Shows on record</dt><dd>{workStats.shows}</dd></div>
              <div><dt>Cities in Pakistan</dt><dd>{workStats.pakistanCities}</dd></div>
              <div><dt>Countries abroad</dt><dd>{workStats.countriesAbroad.length}</dd></div>
            </dl>
          </div>
          <nav className={styles.workTypes} aria-label="Browse our work by event type">
            {workCategories.map((category) => (
              <a href={`/work?type=${category.key}#archive`} key={category.key}>
                {category.label} <span>{category.count}</span>
              </a>
            ))}
          </nav>
          <div className={styles.workGrid}>
            <a className={styles.workFeature} href={`/work#${workFeature.slug}`}>
              <span className={styles.workPoster}>
                <Image
                  src={workFeature.poster}
                  alt={`Original poster: ${eventHeadline(workFeature)}, ${workFeature.title}, ${formatEventDate(workFeature)}`}
                  fill
                  sizes="(max-width: 700px) 100vw, (max-width: 1050px) 50vw, 34vw"
                />
              </span>
              <span className={styles.workFeatureBody}>
                <span className={styles.workMeta}>Signature · {workFeatureProject.tag}</span>
                <span className={styles.workFeatureTitle}>{workFeatureProject.title}</span>
                <span className={styles.workPlace}>{eventPlace(workFeature)} · {formatEventDate(workFeature)}</span>
              </span>
            </a>
            {workEvents.map((event) => (
              <a className={styles.workCard} href={`/work#${event.slug}`} key={event.slug}>
                <span className={styles.workPoster}>
                  <Image
                    src={event.poster}
                    alt={`Original poster: ${eventHeadline(event)}, ${event.title}, ${formatEventDate(event)}`}
                    fill
                    sizes="(max-width: 700px) 50vw, (max-width: 1050px) 33vw, 22vw"
                  />
                </span>
                <span className={styles.workMeta}>
                  {formatEventDate(event)} · {categoryLabel(event.category)}
                </span>
                <span className={styles.workName}>{eventHeadline(event)}</span>
                <span className={styles.workPlace}>{eventPlace(event)}</span>
              </a>
            ))}
          </div>
          <a className={styles.workIntl} href="/work#international">
            <span className={styles.workIntlLabel}>International legacy</span>
            {INTERNATIONAL_PARTNERS.map((partner) => (
              <span className={styles.workIntlItem} key={partner.name}>
                <Image src={partner.logo} alt="" width={44} height={44} />
                <span>
                  <strong>{partner.name}</strong>
                  {partner.country} · {partner.summary}
                </span>
              </span>
            ))}
            {workOverseasShows.map((event) => (
              <span className={styles.workIntlItem} key={event.slug}>
                <span>
                  <strong>{event.title}</strong>
                  {eventPlace(event)} · {formatEventDate(event)}
                </span>
              </span>
            ))}
            <span className={styles.workIntlMore}>See international work →</span>
          </a>
          <div className={styles.workFooter}>
            <p>
              Concerts, campus festivals, corporate nights, private events and
              international stages, with every poster dated and labelled.
            </p>
            <div className={styles.actions}>
              <a className={styles.primaryButton} href="/work">
                Explore all {workStats.shows} shows
              </a>
              <a
                className={styles.secondaryButton}
                href={whatsappLink(WHATSAPP_GENERAL_MESSAGE)}
                target="_blank"
                rel="noreferrer"
                data-cta="home_work"
              >
                Discuss your event
              </a>
            </div>
          </div>
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
              <div className={styles.ally} key={`${ally.src}-${index}`} aria-hidden={index >= allyLogos.length}>
                <Image src={ally.src} alt={index < allyLogos.length ? ally.name : ""} fill sizes="170px" />
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
                href={whatsappLink(WHATSAPP_GENERAL_MESSAGE)}
                target="_blank"
                rel="noreferrer"
                data-cta="home_cta"
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
