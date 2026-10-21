import ContactForm from "@/components/ContactForm/ContactForm";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import JsonLd from "@/components/JsonLd/JsonLd";
import {
  ADDRESS,
  EMAIL,
  ORGANIZATION_SCHEMA_ID,
  PHONE_PRIMARY,
  PHONE_SECONDARY,
  SITE_URL,
  telHref,
  whatsappLink,
} from "@/data/site";
import { DEFAULT_OPEN_GRAPH } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import styles from "./page.module.css";

export const metadata = {
  title: "Contact for Singer & Artist Booking",
  description:
    "Tell GnF Events your date, city, occasion and preferred singer. Enquire by WhatsApp, phone or email for artist availability and event coordination in Pakistan.",
  alternates: { canonical: "/contact" },
  openGraph: {
    ...DEFAULT_OPEN_GRAPH,
    title: "Contact GnF Events for Artist Booking",
    description: "Start a singer, celebrity or event management enquiry in Pakistan.",
    url: `${SITE_URL}/contact`,
  },
};

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact GnF Events for Artist Booking",
  url: `${SITE_URL}/contact`,
  mainEntity: { "@id": ORGANIZATION_SCHEMA_ID },
};

const contactRows = [
  { label: "Visit", items: [{ text: ADDRESS }] },
  {
    label: "Call",
    items: [
      { text: PHONE_PRIMARY.display, href: telHref(PHONE_PRIMARY), note: "Primary · WhatsApp" },
      { text: PHONE_SECONDARY.display, href: telHref(PHONE_SECONDARY) },
    ],
  },
  { label: "Write", items: [{ text: EMAIL, href: `mailto:${EMAIL}` }] },
  { label: "Hours", items: [{ text: "Office 12:00 pm – 7:00 pm · Support 24/7" }] },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={[contactSchema, breadcrumbSchema([["Contact", "/contact"]])]} />
      <Header active="contact" />
      <main id="content" className={styles.main}>
        <section className={styles.contactInfo}>
          <p className={styles.eyebrow}>Contact</p>
          <h1>Tell us about <em>your event</em></h1>
          <p className={styles.intro}>
            Share the occasion, city, preferred date, venue, and the artists you have
            in mind. Our team responds around the clock to singer and celebrity booking
            enquiries across Pakistan.
          </p>
          <div className={styles.rows}>
            {contactRows.map(({ label, items }) => (
              <div key={label} data-cta="contact_details">
                <h2>{label}</h2>
                {items.map(({ text, href, note }) => (
                  <p key={text}>
                    {href ? <a href={href}>{text}</a> : text}
                    {note && <span className={styles.rowNote}> {note}</span>}
                  </p>
                ))}
              </div>
            ))}
          </div>
          <a
            data-cta="contact_page"
            className={styles.whatsapp}
            href={whatsappLink("Hi GnF Events, I'd like to enquire about an artist for my event.")}
            target="_blank"
            rel="noreferrer"
          >
            Chat on WhatsApp
          </a>
        </section>
        <ContactForm />
      </main>
      <Footer compact />
    </>
  );
}
