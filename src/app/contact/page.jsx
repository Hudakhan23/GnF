import ContactForm from "@/components/ContactForm/ContactForm";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import JsonLd from "@/components/JsonLd/JsonLd";
import {
  ADDRESS,
  EMAIL,
  PHONE_PRIMARY,
  PHONE_SECONDARY,
  SITE_URL,
  whatsappLink,
} from "@/data/site";
import styles from "./page.module.css";

export const metadata = {
  title: "Contact for Singer & Artist Booking",
  description:
    "Tell GnF Events your date, city, occasion and preferred singer. Enquire by WhatsApp, phone or email for artist availability and event coordination in Pakistan.",
  alternates: { canonical: "/contact" },
  openGraph: {
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
  mainEntity: { "@id": `${SITE_URL}/#organization` },
};

const contactRows = [
  ["Visit", ADDRESS, null],
  ["Call", "0300 9492571 · 0321 9492571", `tel:${PHONE_SECONDARY}`],
  ["Write", EMAIL, `mailto:${EMAIL}`],
  ["Hours", "Office 12:00 pm – 7:00 pm · Support 24/7", null],
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={contactSchema} />
      <Header active="contact" />
      <main className={styles.main}>
        <section className={styles.contactInfo}>
          <p className={styles.eyebrow}>Contact</p>
          <h1>Tell us about <em>your event</em></h1>
          <p className={styles.intro}>
            Share the occasion, city, preferred date, venue, and the artists you have
            in mind. Our team responds around the clock to singer and celebrity booking
            enquiries across Pakistan.
          </p>
          <div className={styles.rows}>
            {contactRows.map(([label, value, href]) => (
              <div key={label}>
                <h2>{label}</h2>
                {href ? <a href={href}>{value}</a> : <p>{value}</p>}
              </div>
            ))}
          </div>
          <a
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
