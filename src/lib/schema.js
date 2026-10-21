import { eventPlace, getArtistForEventArtist } from "@/data/events";
import {
  ADDRESS_PARTS,
  EMAIL,
  FOUNDING_YEAR,
  GEO,
  ORGANIZATION_SCHEMA_ID,
  PHONE_PRIMARY,
  SITE_NAME,
  SITE_URL,
  WEBSITE_SCHEMA_ID,
  socialLinks,
} from "@/data/site";

/**
 * The single sitewide business entity, rendered once by the root layout so
 * every page that references ORGANIZATION_SCHEMA_ID resolves on the same URL.
 * Only facts that are visible on the site belong here — no hours (days are
 * unconfirmed), ratings, reviews or extra locations.
 */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "@id": ORGANIZATION_SCHEMA_ID,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo-gold.png`,
  image: `${SITE_URL}/og-default.jpg`,
  description:
    "Artist facilitation and event management company providing singer, celebrity and entertainment bookings across Pakistan.",
  foundingDate: String(FOUNDING_YEAR),
  email: EMAIL,
  telephone: PHONE_PRIMARY.e164,
  address: { "@type": "PostalAddress", ...ADDRESS_PARTS },
  geo: {
    "@type": "GeoCoordinates",
    latitude: GEO.latitude,
    longitude: GEO.longitude,
  },
  areaServed: [
    { "@type": "City", name: "Lahore" },
    { "@type": "Country", name: "Pakistan" },
  ],
  sameAs: [socialLinks.facebook, socialLinks.instagram],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: PHONE_PRIMARY.e164,
    email: EMAIL,
    contactType: "customer service",
    availableLanguage: ["English", "Urdu"],
    areaServed: "PK",
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_SCHEMA_ID,
  url: SITE_URL,
  name: SITE_NAME,
  inLanguage: "en-PK",
  publisher: { "@id": ORGANIZATION_SCHEMA_ID },
};

/** BreadcrumbList from [name, path] pairs; Home is always first. */
export function breadcrumbSchema(trail) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [["Home", ""], ...trail].map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: `${SITE_URL}${path}`,
    })),
  };
}

/**
 * ItemList of Schema.org Event entities for the /work show archive.
 * Links performers to their /artists/[slug] booking profiles and organizer
 * to the verified GnF Events organization entity.
 */
export function eventsArchiveSchema(events, roster = []) {
  const datedEvents = events.filter((e) => Boolean(e.date));
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "GnF Events Show Archive",
    itemListElement: datedEvents.map((event, index) => {
      const performers = event.artists.map((name) => {
        const artist = getArtistForEventArtist(name, roster);
        if (artist) {
          const isBand = artist.artistType === "Band";
          return {
            "@type": isBand ? "MusicGroup" : "Person",
            name: artist.name,
            url: `${SITE_URL}${artist.href}`,
          };
        }
        return {
          "@type": "PerformingGroup",
          name,
        };
      });

      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Event",
          "@id": `${SITE_URL}/work#${event.slug}`,
          url: `${SITE_URL}/work#${event.slug}`,
          name: event.title || event.headline,
          startDate: event.date,
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          eventStatus: "https://schema.org/EventScheduled",
          image: `${SITE_URL}${event.poster}`,
          description: `${event.title || event.headline} in ${eventPlace(event)}, produced by GnF Events.`,
          location: {
            "@type": "Place",
            name: event.venue || eventPlace(event),
            address: {
              "@type": "PostalAddress",
              addressLocality: event.cities[0] || "Lahore",
              addressCountry: event.country === "Pakistan" ? "PK" : event.country,
            },
          },
          performer: performers.length === 1 ? performers[0] : performers,
          organizer: {
            "@id": ORGANIZATION_SCHEMA_ID,
          },
        },
      };
    }),
  };
}

/**
 * ItemList of Schema.org Person / MusicGroup entities for the /artists directory.
 * Establishes the canonical directory catalog for search engines.
 */
export function artistsDirectorySchema(roster = []) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "GnF Events Artist Directory",
    description: "Complete roster of Pakistani and international artists available for booking.",
    numberOfItems: roster.length,
    itemListElement: roster.map((artist, index) => {
      const isBand = artist.artistType === "Band";
      const href = artist.href || `/artists/${artist.slug}`;
      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": isBand ? "MusicGroup" : "Person",
          name: artist.name,
          url: `${SITE_URL}${href}`,
          ...(artist.image ? { image: `${SITE_URL}${artist.image}` } : {}),
          description: artist.tagline || artist.description,
        },
      };
    }),
  };
}
