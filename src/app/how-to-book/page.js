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

export default function HowToBookPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([["How to book", "/how-to-book"]])} />
      <Header />
      <main className={styles.main}>
        <header className={styles.hero}>
          <p className="eyebrow">Booking guide</p>
          <h1>
            How to book an artist with <em>GnF Events</em>
          </h1>
          <p className={styles.lede}>
            GnF Events is an artist facilitation and event management company
            based in Lahore. Here is how a booking enquiry works, from your
            first message to the show.
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
