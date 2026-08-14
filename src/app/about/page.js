import Image from "next/image";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import JsonLd from "@/components/JsonLd/JsonLd";
import { aboutHighlights } from "@/data/shows";
import { SITE_URL, WHATSAPP_URL } from "@/data/site";
import styles from "./page.module.css";

export const metadata = {
  title: "About Our Artist & Event Management Team",
  description:
    "Meet GnF Events, a Lahore-based artist facilitation and event management company serving concerts, weddings, corporate events and private celebrations since 2016.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About GnF Events",
    description:
      "Artist facilitation and event management built on trusted coordination, responsive support and memorable productions.",
    url: `${SITE_URL}/about`,
    images: ["/images/CEO-pro.png"],
  },
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About GnF Events",
  url: `${SITE_URL}/about`,
  mainEntity: { "@id": `${SITE_URL}/#organization` },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutSchema} />
      <Header active="about" />
      <main>
        <section className={styles.hero}>
          <p>About GnF Events</p>
          <h1>Your gateway to <em>extraordinary</em> entertainment experiences</h1>
        </section>

        <section className={styles.introduction}>
          <div>
            <h2>Who we are</h2>
            <p>
              GnF Events connects clients with top-tier artists and live performances.
              Whether it&apos;s a concert, wedding, corporate event, comedy show, or a
              special appearance, we coordinate the booking journey and event details
              from enquiry to stage.
            </p>
            <p>
              Our team works around the clock to create experiences that feel smooth
              for the client and memorable for the audience. With GnF, you don&apos;t just
              attend events — you experience them.
            </p>
          </div>
          <div>
            <h2>Our mission</h2>
            <p>
              Our mission is to make trusted entertainment booking accessible for
              events across Pakistan and abroad — from corporate dinners and weddings
              to cruises, private parties, concerts, and festivals.
            </p>
            <div className={styles.stats}>
              <div><strong>2016</strong><span>Founded</span></div>
              <div><strong>24/7</strong><span>Support</span></div>
              <div><strong>Global</strong><span>Reach</span></div>
            </div>
          </div>
        </section>

        <section className={styles.leadership}>
          <div>
            <div className={styles.portrait}>
              <Image
                src="/images/CEO-pro.png"
                alt="Aamir Mehmood Rana, Founder and CEO of GnF Events"
                fill
                sizes="(max-width: 800px) 100vw, 42vw"
              />
            </div>
            <div className={styles.bio}>
              <p>Leadership</p>
              <h2>Aamir Mehmood Rana</h2>
              <strong>Founder & CEO</strong>
              <div>
                Aamir Mehmood Rana brings over two decades of expertise from Jang
                Media Group and PTV. His career includes leading major projects and
                building deep experience across media and live entertainment. Since
                founding GnF Events in 2016, his focus on reliable coordination,
                client service, and ambitious productions has continued to guide the
                company&apos;s growth.
              </div>
            </div>
          </div>
        </section>

        <section className={styles.gallery}>
          <p>Event highlights</p>
          <h2>Moments from our shows</h2>
          <div>
            {aboutHighlights.map((image, index) => (
              <figure key={image}>
                <Image
                  src={image}
                  alt={`GnF Events live production highlight ${index + 1}`}
                  fill
                  sizes="(max-width: 600px) 50vw, (max-width: 900px) 33vw, 25vw"
                />
              </figure>
            ))}
          </div>
        </section>

        <section className={styles.cta}>
          <Image src="/EventHighlights/E14.jpeg" alt="Concert audience" fill sizes="100vw" />
          <span />
          <div>
            <h2>Let&apos;s create your next <em>unforgettable</em> event</h2>
            <div>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">Book via WhatsApp</a>
              <a href="/contact">Contact us</a>
            </div>
          </div>
        </section>
      </main>
      <Footer compact />
    </>
  );
}
