import {
  ADDRESS_PARTS,
  EMAIL,
  FOUNDING_YEAR,
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
  image: `${SITE_URL}/EventHighlights/E14.jpeg`,
  description:
    "Lahore-based artist facilitation and event management company for singer, celebrity and entertainment bookings in Pakistan.",
  foundingDate: String(FOUNDING_YEAR),
  email: EMAIL,
  telephone: PHONE_PRIMARY.e164,
  address: { "@type": "PostalAddress", ...ADDRESS_PARTS },
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
