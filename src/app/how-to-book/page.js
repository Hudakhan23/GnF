import Link from "next/link";
import BookingButton from "@/components/BookingForm/BookingButton";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import JsonLd from "@/components/JsonLd/JsonLd";
import { ARTIST_OPTIONS, MANAGEMENT } from "@/data/artists";
import {
  ADDRESS,
  EMAIL,
  PHONE_PRIMARY,
  SITE_URL,
  WHATSAPP_GENERAL_MESSAGE,
  telHref,
  whatsappLink,
} from "@/data/site";
import { DEFAULT_OPEN_GRAPH } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import styles from "./page.module.css";

export const metadata = {
  title: "How to Book a Singer or Artist in Pakistan",
  description:
    "How booking an artist through GnF Events works: what to send, how availability is checked, what affects arrangements and fees, and how to reach our Lahore team.",
  alternates: { canonical: "/how-to-book" },
  openGraph: {
    ...DEFAULT_OPEN_GRAPH,
    title: "How to Book a Singer or Artist in Pakistan | GnF Events",
    url: `${SITE_URL}/how-to-book`,
  },
};

const STEPS = [
  {
    title: "Share your event",
    text: "Send the date, city, occasion, venue and expected audience, and the artist you have in mind. Use the enquiry form, WhatsApp, phone or email.",
  },
  {
    title: "Availability check",
    text: "Our team checks the artist's availability and their requirements for your date and city.",
  },
  {
    title: "Confirm & coordinate",
    text: "Once the booking is approved, we align the contract, travel, hospitality and show logistics.",
  },
];

const DETAILS = [
  ["Event date", "Or a date range if it is not fixed yet."],
  ["City and venue", "The venue if it is confirmed."],
  ["Event type", "Concert, university or corporate event, wedding, festival or private event."],
  ["Expected audience", "An approximate number is enough."],
  ["Artist of interest", "One name or a shortlist. If someone is not on our roster, ask anyway."],
  ["Organisation", "If you are booking for a company, university or society."],
];

const FACTORS = [
  "The artist's schedule and availability on your date",
  "The city, and the travel it involves for the artist and their team",
  "Technical requirements for the performance",
  "Hospitality and on-the-day logistics",
];

const BOOKING_FAQS = [
  {
    question: "Can I book an artist who is not listed in your directory?",
    answer:
      "Yes. Even if a specific singer, band, or speaker is not currently listed in our directory, GnF Events maintains extensive relationships across Pakistan's music and entertainment industry and can facilitate bookings for almost any verified performer.",
  },
  {
    question: "How are artist booking fees determined?",
    answer:
      "Artist fees vary based on event date, season, host city, venue capacity, performance duration, and the scale of the accompanying band or production setup. GnF Events negotiates directly with artist management to provide transparent, all-inclusive quotations.",
  },
  {
    question: "Who handles stage sound, lighting, and technical riders?",
    answer:
      "GnF Events provides complete end-to-end event management. We coordinate the artist's technical rider (sound engineering, monitors, microphones, backline instruments) and production setup so your team does not have to manage technical logistics.",
  },
  {
    question: "What is the difference between exclusive representation and network facilitation?",
    answer:
      "Artists marked as 'Exclusive' (such as Nish Asher) are officially managed by GnF Events worldwide. Artists marked as 'Booking Network' are independent performers whom GnF Events coordinates, books, and manages on your behalf through established industry partnerships.",
  },
  {
    question: "How far in advance should I confirm an artist booking?",
    answer:
      "For high-demand wedding season dates (November through February) or major corporate festivals, we recommend locking in artist availability 6 to 12 weeks in advance. For standard private events, 3 to 6 weeks is generally sufficient.",
  },
  {
    question: "Can GnF Events arrange artists for international events outside Pakistan?",
    answer:
      "Yes. GnF Events regularly coordinates international concerts, private destination weddings, and cultural festivals across Dubai, Turkey, the UK, Europe, and North America, handling international riders and travel logistics.",
  },
  {
    question: "How do wedding artist bookings work for Mehndi, Barat, and Walima events?",
    answer:
      "Wedding bookings are tailored to the ceremony format. Mehndi nights typically feature high-energy Bhangra and Punjabi pop performers; Barat receptions favor acoustic and soulful vocalists; Walimas and Sufi musical evenings frequently host traditional Qawwali parties. For peak winter wedding season (November through February), we recommend checking availability 6 to 12 weeks in advance.",
  },
  {
    question: "How does GnF Events support corporate conferences, galas, and tax compliance?",
    answer:
      "For corporate dinners, annual conferences, and brand launches across Pakistan, GnF Events coordinates direct management contracts, official company invoicing, and compliance with provincial tax deduction frameworks (including PRA, SRB, and KPRA withholding taxes), alongside complete sound rider and on-ground stage coordination.",
  },
  {
    question: "Can we book traditional Qawwali parties or Sufi musical ensembles?",
    answer:
      "Yes. GnF Events regularly coordinates celebrated Pakistani Qawwali ensembles (8 to 12-member parties with complete baithak carpet risers, harmonium, and acoustic sound engineering) for corporate Sufi nights, private mehfils, and cultural festivals nationwide.",
  },
];

export default function HowToBookPage() {
  const schema = [
    breadcrumbSchema([["How to book", "/how-to-book"]]),
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${SITE_URL}/how-to-book#faq`,
      mainEntity: BOOKING_FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ];

  return (
    <>
      <JsonLd data={schema} />
      <Header />
      <main className={styles.main}>
        <header className={styles.hero}>
          <p className="eyebrow">Booking guide</p>
          <h1>
            How to book an artist with <em>GnF Events</em>
          </h1>
          <p className={styles.lede}>
            GnF Events coordinates artist bookings and event management for
            corporate galas, weddings, campus festivals, and private concerts
            across Pakistan and overseas. Here is how a booking enquiry works,
            from your first message to the show.
          </p>
        </header>

        <section className={styles.section} aria-labelledby="steps-title">
          <h2 id="steps-title">The booking process</h2>
          <ol className={styles.steps}>
            {STEPS.map((step, i) => (
              <li key={step.title}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.section} aria-labelledby="details-title">
          <h2 id="details-title">What to include in your enquiry</h2>
          <dl className={styles.details}>
            {DETAILS.map(([term, note]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{note}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className={styles.section} aria-labelledby="fees-title" id="fees">
          <h2 id="fees-title">What affects arrangements and fees</h2>
          <p>
            Artist availability, fees, travel and technical requirements are
            confirmed only after a formal enquiry. We don&apos;t publish a rate
            list because these depend on:
          </p>
          <ul className={styles.factors}>
            {FACTORS.map((factor) => (
              <li key={factor}>{factor}</li>
            ))}
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="representation-title">
          <h2 id="representation-title">Exclusive and network artists</h2>
          <div className={styles.split}>
            <div>
              <h3>{MANAGEMENT.exclusive.badge}</h3>
              <p>{MANAGEMENT.exclusive.statement}</p>
            </div>
            <div>
              <h3>{MANAGEMENT.network.badge}</h3>
              <p>{MANAGEMENT.network.statement}</p>
            </div>
          </div>
          <p className={styles.note}>
            Each artist page states which applies. You can browse the{" "}
            <Link href="/artists">full artist roster</Link>.
          </p>
        </section>

        <section className={styles.section} aria-labelledby="faq-title" id="faq">
          <h2 id="faq-title">Frequently asked questions</h2>
          <p>
            Key answers to common questions about booking talent, event
            logistics, contracts, and timelines.
          </p>
          <div className={styles.faqList}>
            {BOOKING_FAQS.map((faq) => (
              <article className={styles.faqItem} key={faq.question}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.contact} aria-labelledby="contact-title" data-cta="how_to_book">
          <div>
            <h2 id="contact-title">Start your enquiry</h2>
            <p>
              Office: {ADDRESS}. Call{" "}
              <a href={telHref(PHONE_PRIMARY)}>{PHONE_PRIMARY.display}</a> or
              write to <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
            </p>
          </div>
          <div className={styles.actions}>
            <BookingButton artists={ARTIST_OPTIONS} source="how_to_book">
              Send an enquiry
            </BookingButton>
            <a
              className="btn-outline"
              href={whatsappLink(WHATSAPP_GENERAL_MESSAGE)}
              target="_blank"
              rel="noreferrer"
            >
              Chat on WhatsApp
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
