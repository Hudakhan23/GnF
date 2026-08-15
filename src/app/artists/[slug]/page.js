import Image from "next/image";
import { notFound } from "next/navigation";
import ArtistCard from "@/components/ArtistCard/ArtistCard";
import ArtistPortrait from "@/components/ArtistCard/ArtistPortrait";
import BookingButton from "@/components/BookingForm/BookingButton";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import JsonLd from "@/components/JsonLd/JsonLd";
import {
  ARTISTS,
  MANAGEMENT,
  artists,
  getArtist,
  relatedArtists,
  suitabilityFor,
} from "@/data/artists";
import { SITE_URL, whatsappLink } from "@/data/site";
import styles from "./page.module.css";

export function generateStaticParams() {
  return artists.map((artist) => ({ slug: artist.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const artist = getArtist(slug);
  if (!artist) return {};

  const title = artist.seo?.title || `Book ${artist.name} for an Event`;
  const socialTitle = artist.seo?.title || `${title} | GnF Events`;
  const image = artist.image
    ? {
        url: artist.image,
        width: artist.slug === "nish-asher" ? 1125 : undefined,
        height: artist.slug === "nish-asher" ? 1386 : undefined,
        alt: `${artist.name} — ${artist.tag}`,
      }
    : null;

  return {
    title: artist.seo?.title ? { absolute: artist.seo.title } : title,
    description: artist.description,
    alternates: { canonical: artist.href },
    openGraph: {
      title: socialTitle,
      description: artist.description,
      url: `${SITE_URL}${artist.href}`,
      siteName: "GnF Events",
      locale: "en_PK",
      type: "profile",
      images: image ? [image] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: artist.description,
      images: image ? [image] : undefined,
    },
  };
}

/** Neutral, factual intro — we never invent biography we cannot verify. */
function introFor(artist) {
  if (artist.bio) return artist.bio;
  const what = artist.genres.length
    ? `${artist.genres.join(", ").toLowerCase()} ${artist.artistType.toLowerCase()}`
    : artist.artistType.toLowerCase();
  const where =
    artist.country === "Pakistan"
      ? "Pakistan"
      : artist.country === "International"
        ? "the international circuit"
        : artist.country;
  return `${artist.name} is a ${what} from ${where}. Share your event date, city, venue and audience details and GnF Events will handle availability, fees and full event coordination.`;
}

export default async function ArtistBookingPage({ params }) {
  const { slug } = await params;
  const artist = getArtist(slug);
  if (!artist) notFound();

  const isExclusive = artist.managementType === "exclusive";
  const management = MANAGEMENT[artist.managementType];
  const related = relatedArtists(artist);
  const suitability = suitabilityFor(artist);
  const bookingUrl = whatsappLink(
    `Hi GnF Events, I want to enquire about booking ${artist.name}. My event date/city is: `,
  );

  const artistUrl = `${SITE_URL}${artist.href}`;
  const artistId = `${artistUrl}#artist`;
  const imageUrl = artist.image ? `${SITE_URL}${artist.image}` : null;
  const personSchema = {
    "@type": "Person",
    "@id": artistId,
    name: artist.name,
    url: artistUrl,
    ...(artist.profile?.youtube?.handle
      ? { alternateName: artist.profile.youtube.handle }
      : {}),
    ...(artist.bio ? { description: artist.bio } : {}),
    ...(imageUrl
      ? {
          image: {
            "@type": "ImageObject",
            "@id": `${artistUrl}#primary-image`,
            url: imageUrl,
            contentUrl: imageUrl,
            ...(artist.slug === "nish-asher"
              ? { width: 1125, height: 1386 }
              : {}),
            caption: `${artist.name} — ${artist.tag}`,
          },
        }
      : {}),
    jobTitle: artist.profile
      ? ["Singer", "Pop vocalist", "OST performer"]
      : artist.artistType,
    ...(artist.country !== "Pakistan"
      ? {
          homeLocation: {
            "@type": "Country",
            name: artist.country === "UK" ? "United Kingdom" : artist.country,
          },
        }
      : {}),
    ...(artist.socials ? { sameAs: Object.values(artist.socials) } : {}),
    ...(artist.profile
      ? {
          award: "BBC Asian Network Future Sounds Artist 2021",
          affiliation: { "@id": `${SITE_URL}/#organization` },
        }
      : {}),
  };

  const schema = [
    ...(artist.profile
      ? [
          {
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            "@id": `${artistUrl}#profile-page`,
            url: artistUrl,
            name: artist.seo?.title || `${artist.name} artist profile`,
            headline: artist.profile.headline,
            description: artist.description,
            inLanguage: "en-PK",
            ...(artist.seo?.modified
              ? { dateModified: artist.seo.modified }
              : {}),
            ...(imageUrl
              ? { primaryImageOfPage: { "@id": `${artistUrl}#primary-image` } }
              : {}),
            isPartOf: { "@id": `${SITE_URL}/#website` },
            mainEntity: personSchema,
          },
        ]
      : []),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${artistUrl}#booking-service`,
      name: `${artist.name} event booking enquiry`,
      description: artist.description,
      url: artistUrl,
      ...(imageUrl ? { image: imageUrl } : {}),
      serviceType: isExclusive
        ? "Exclusive artist management"
        : "Artist booking facilitation",
      areaServed: [
        { "@type": "Country", name: "Pakistan" },
        { "@type": "Place", name: "Worldwide" },
      ],
      provider: { "@id": `${SITE_URL}/#organization` },
      about: artist.profile ? { "@id": artistId } : personSchema,
      availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: bookingUrl,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Artists",
          item: `${SITE_URL}/artists`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: artist.name,
          item: `${SITE_URL}${artist.href}`,
        },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={schema} />
      <Header active="artists" />
      <main>
        <section className={styles.hero}>
          <div className={styles.portraitWrap}>
            <div className={styles.portrait}>
              <ArtistPortrait artist={artist} priority />
            </div>
            {isExclusive && (
              <span className={styles.badge}>{MANAGEMENT.exclusive.badge}</span>
            )}
          </div>

          <div className={styles.copy}>
            <nav aria-label="Breadcrumb">
              <a href="/artists">Artists</a>
              <span>/</span>
              <span>{artist.name}</span>
            </nav>
            <p className={styles.eyebrow}>
              {isExclusive ? "Exclusive management" : "Artist booking enquiry"}
            </p>
            <h1>
              {artist.profile?.heroTitle ? (
                <>
                  <em>{artist.name}</em> — {artist.profile.heroTitle}
                </>
              ) : (
                <>
                  Book <em>{artist.name}</em> for your event
                </>
              )}
            </h1>
            <p className={styles.tag}>{artist.tag}</p>

            <div className={styles.tags}>
              {artist.genres.map((g) => (
                <span key={g}>{g}</span>
              ))}
              <span>{artist.artistType}</span>
              <span>{artist.country}</span>
            </div>

            <p className={styles.intro}>{introFor(artist)}</p>

            <div
              className={`${styles.management} ${
                isExclusive ? styles.managementExclusive : ""
              }`}
            >
              <p className={styles.managementLabel}>
                {isExclusive ? "Representation" : "Booking status"}
              </p>
              <p>{management.statement}</p>
            </div>

            <div className={styles.actions}>
              <BookingButton artist={artist} artists={ARTISTS}>
                {isExclusive ? `Book ${artist.name}` : "Request booking"}
              </BookingButton>
              <a
                href={bookingUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-outline"
              >
                Enquire on WhatsApp
              </a>
            </div>

            <dl className={styles.details}>
              <div>
                <dt>Service area</dt>
                <dd>Pakistan &amp; international events</dd>
              </div>
              <div>
                <dt>Response</dt>
                <dd>Booking support available 24/7</dd>
              </div>
              <div>
                <dt>What to send</dt>
                <dd>Date, city, event type, venue &amp; audience</dd>
              </div>
            </dl>

            <p className={styles.disclaimer}>
              Artist availability, fee, travel, and technical requirements are
              confirmed only after a formal enquiry.
              {isExclusive
                ? " This artist is managed by GnF Events and booked directly through our team."
                : " This page is for booking facilitation and does not claim direct artist representation."}
            </p>
          </div>
        </section>

        <section className={styles.suitability}>
          <p className={styles.eyebrow}>Event suitability</p>
          <div className={styles.suitabilityList}>
            {suitability.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </section>

        {artist.profile && (
          <section
            className={styles.profileStory}
            id={`${artist.slug}-profile`}
          >
            <div className={styles.profileIntro}>
              <div>
                <p className={styles.eyebrow}>Career &amp; music</p>
                <h2>{artist.profile.headline}</h2>
                <p>{artist.profile.summary}</p>
              </div>
              <dl className={styles.profileStats}>
                {artist.profile.stats.map((stat) => (
                  <div key={stat.label}>
                    <dt>{stat.value}</dt>
                    <dd>{stat.label}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className={styles.profileGrid}>
              <div className={styles.managementPosterWrap}>
                <div className={styles.managementPoster}>
                  <Image
                    src={artist.profile.poster}
                    alt={`${artist.name} exclusive management and worldwide bookings poster`}
                    fill
                    sizes="(max-width: 900px) 100vw, 45vw"
                  />
                </div>
              </div>

              <div className={styles.profileDetails}>
                <article>
                  <h3>Career highlights</h3>
                  <ul>
                    {artist.profile.careerHighlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </article>

                <div className={styles.creditColumns}>
                  <article>
                    <h3>Selected OSTs</h3>
                    <ul>
                      {artist.profile.osts.map((ost) => (
                        <li key={ost}>{ost}</li>
                      ))}
                    </ul>
                  </article>
                  <article>
                    <h3>Collaborations</h3>
                    <ul>
                      {artist.profile.collaborations.map((name) => (
                        <li key={name}>{name}</li>
                      ))}
                    </ul>
                  </article>
                </div>

                <article className={styles.education}>
                  <h3>Musical education &amp; composers</h3>
                  <p>{artist.profile.education}</p>
                  <p>
                    Composer collaborations include{" "}
                    {artist.profile.composers.join(", ")}.
                  </p>
                </article>

                {artist.profile.youtube && (
                  <aside
                    className={styles.youtubePanel}
                    aria-label={`${artist.name} official YouTube channel`}
                  >
                    <div className={styles.youtubeHeading}>
                      <div>
                        <p>Official YouTube channel</p>
                        <h3>{artist.profile.youtube.handle}</h3>
                      </div>
                      <span aria-hidden="true">YouTube</span>
                    </div>

                    <dl className={styles.youtubeStats}>
                      {artist.profile.youtube.stats.map((stat) => (
                        <div key={stat.label}>
                          <dt>{stat.value}</dt>
                          <dd>{stat.label}</dd>
                        </div>
                      ))}
                    </dl>

                    <div className={styles.youtubeMeta}>
                      <span>{artist.profile.youtube.country}</span>
                      <span>Joined {artist.profile.youtube.joined}</span>
                    </div>

                    <p className={styles.youtubeNote}>
                      Channel totals shown here are separate from the 474M+
                      views achieved by the Khuda Aur Mohabbat OST.
                    </p>

                    <a
                      href={artist.socials.youtube}
                      target="_blank"
                      rel="me noreferrer"
                      className={styles.youtubeLink}
                    >
                      Visit {artist.profile.youtube.handle}
                    </a>
                  </aside>
                )}

                <div className={styles.socialActions}>
                  <a
                    href={artist.socials.youtube}
                    target="_blank"
                    rel="me noreferrer"
                  >
                    Watch music on YouTube
                  </a>
                  <a
                    href={artist.socials.spotify}
                    target="_blank"
                    rel="me noreferrer"
                  >
                    Listen on Spotify
                  </a>
                  {artist.socials.appleMusic && (
                    <a
                      href={artist.socials.appleMusic}
                      target="_blank"
                      rel="me noreferrer"
                    >
                      Listen on Apple Music
                    </a>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {artist.profile?.faqs && (
          <section
            className={styles.artistFaq}
            aria-labelledby={`${artist.slug}-faq-heading`}
          >
            <div className={styles.faqHeading}>
              <p className={styles.eyebrow}>Artist information</p>
              <h2 id={`${artist.slug}-faq-heading`}>About {artist.name}</h2>
              <p>
                Quick answers about {artist.name}&apos;s music, OST career, and
                official bookings.
              </p>
            </div>
            <div className={styles.faqGrid}>
              {artist.profile.faqs.map((item) => (
                <article key={item.question}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className={styles.process}>
          <p className={styles.eyebrow}>How it works</p>
          <h2>A clear route from enquiry to stage</h2>
          <ol>
            <li>
              <span>01</span>
              <h3>Share your event</h3>
              <p>
                Tell us the date, city, occasion, venue, and expected audience.
              </p>
            </li>
            <li>
              <span>02</span>
              <h3>Availability check</h3>
              <p>
                Our team coordinates the artist availability and requirement
                enquiry.
              </p>
            </li>
            <li>
              <span>03</span>
              <h3>Confirm &amp; coordinate</h3>
              <p>
                Once approved, we align contracts, travel, hospitality, and show
                logistics.
              </p>
            </li>
          </ol>
        </section>

        {related.length > 0 && (
          <section className={styles.related}>
            <p className={styles.eyebrow}>Similar artists</p>
            <div className={styles.relatedGrid}>
              {related.map((a) => (
                <ArtistCard key={a.slug} artist={a} />
              ))}
            </div>
          </section>
        )}

        <section className={styles.bottomCta}>
          <div>
            <p>Ready to start?</p>
            <h2>Bring {artist.name} to your stage</h2>
          </div>
          <a href={bookingUrl} target="_blank" rel="noreferrer">
            Start on WhatsApp
          </a>
        </section>
      </main>
      <Footer compact />
    </>
  );
}
