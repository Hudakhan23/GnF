import Image from "next/image";
import EventArchive from "@/components/EventArchive/EventArchive";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import JsonLd from "@/components/JsonLd/JsonLd";
import { artists } from "@/data/artists";
import {
  EVENTS,
  EVENT_CATEGORIES,
  EVENT_CREDITS,
  EVENT_HOSTS,
  INTERNATIONAL_PARTNERS,
  SIGNATURE_EVENTS,
  categoryLabel,
  eventHeadline,
  eventPlace,
  formatEventDate,
  getArtistForEventArtist,
  getEvent,
  getEventStats,
  isSuperiorEvent,
} from "@/data/events";
import { services } from "@/data/shows";
import {
  ADDRESS,
  EMAIL,
  FOUNDING_YEAR,
  SHOWS_DELIVERED,
  PHONE_PRIMARY,
  SITE_URL,
  WHATSAPP_GENERAL_MESSAGE,
  telHref,
  whatsappLink,
} from "@/data/site";
import { DEFAULT_OPEN_GRAPH } from "@/lib/metadata";
import { breadcrumbSchema, eventsArchiveSchema } from "@/lib/schema";
import styles from "./page.module.css";

const stats = getEventStats();

export const metadata = {
  title: "Our Work — Concerts, Campus Festivals & Corporate Shows",
  description: `${SHOWS_DELIVERED} shows delivered by GnF Events across Pakistan and abroad since ${FOUNDING_YEAR}: concerts, campus festivals, corporate events, private events and international stages, with the original posters.`,
  alternates: { canonical: "/work" },
  openGraph: {
    ...DEFAULT_OPEN_GRAPH,
    title: "Our Work | GnF Events",
    url: `${SITE_URL}/work`,
  },
};

function toArchiveItem(event) {
  const headline = eventHeadline(event);
  const dateLabel = formatEventDate(event);
  const where = eventPlace({ ...event, venue: "" });
  const artistLinks = event.artists
    .map((name) => {
      const a = getArtistForEventArtist(name, artists);
      return a ? { name: a.name, href: a.href, slug: a.slug } : null;
    })
    .filter(Boolean);

  return {
    slug: event.slug,
    poster: event.poster,
    category: event.category,
    categoryLabel: categoryLabel(event.category),
    headline,
    title: event.title,
    dateLabel,
    venue: event.venue,
    where,
    place: eventPlace(event),
    creditLabel: EVENT_CREDITS[event.credit],
    superior: isSuperiorEvent(event),
    artistLinks,
    alt: `Original poster: ${[headline, event.title, where, event.date ? dateLabel : ""].filter(Boolean).join(", ")}`,
  };
}

const archive = EVENTS.map(toArchiveItem);
const categories = EVENT_CATEGORIES.map((category) => ({
  ...category,
  count: EVENTS.filter((event) => event.category === category.key).length,
}));
const signature = SIGNATURE_EVENTS.map((project) => ({
  ...project,
  event: toArchiveItem(getEvent(project.slug)),
  lineup: getEvent(project.slug).artists.join(", "),
}));

const countries = ["Pakistan", ...stats.countriesAbroad];
const partnerEventSlugs = new Set(INTERNATIONAL_PARTNERS.flatMap((partner) => partner.events));
const overseasShows = archive.filter(
  (event) => event.category === "international" && !partnerEventSlugs.has(event.slug),
);

const INTERNATIONAL_MESSAGE =
  "Hi GnF Events, I'd like to discuss booking Pakistani artists for an event abroad.\nEvent / festival: \nCountry & city: \nDate: ";

export default function WorkPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([["Our work", "/work"]])} />
      <JsonLd data={eventsArchiveSchema(EVENTS, artists)} />
      <Header active="work" overlay />
      <main>
        <section className={styles.hero}>
          <Image
            src="/EventHighlights/E14.jpeg"
            alt=""
            fill
            sizes="100vw"
            preload
            className={styles.heroImage}
          />
          <span className={styles.heroShade} />
          <div className={styles.heroContent}>
            <p className="eyebrow">
              Portfolio · Since {FOUNDING_YEAR}
            </p>
            <h1>
              The shows we&apos;ve put <em>on stage</em>
            </h1>
            <p className={styles.lede}>
              Concerts, campus festivals, corporate nights and international
              stages: {SHOWS_DELIVERED} shows across Pakistan and abroad
              since {FOUNDING_YEAR}. Each
              poster here is a GnF Events show, listed with its date, venue and
              line-up as printed on the original artwork.
            </p>
            <div className={styles.actions}>
              <a
                className="btn-gold"
                href={whatsappLink(WHATSAPP_GENERAL_MESSAGE)}
                target="_blank"
                rel="noreferrer"
                data-cta="work_hero"
              >
                Discuss your event
              </a>
              <a className="btn-outline" href="#archive">
                Browse the archive
              </a>
            </div>
            <dl className={styles.stats}>
              <div>
                <dt>Shows delivered since {FOUNDING_YEAR}</dt>
                <dd>{SHOWS_DELIVERED}</dd>
              </div>
              <div>
                <dt>Shows all over Pakistan</dt>
                <dd>Nationwide</dd>
              </div>
              <div>
                <dt>Countries · {countries.join(", ")}</dt>
                <dd>{countries.length}</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="signature-title">
          <div className={styles.heading}>
            <div>
              <p className="eyebrow">Signature projects</p>
              <h2 id="signature-title">Beyond a single night</h2>
            </div>
            <p>
              A headline campus night, a multi-city campus tour and an
              international medical conference. Three different briefs, all
              run by one team.
            </p>
          </div>
          <div className={styles.signatureGrid}>
            {signature.map((project) => (
              <article className={styles.signature} key={project.slug}>
                <a
                  className={styles.signaturePoster}
                  href={`#${project.slug}`}
                  aria-label={`View poster: ${project.title}`}
                >
                  <Image
                    src={project.event.poster}
                    alt={project.event.alt}
                    fill
                    sizes="(max-width: 800px) 100vw, 33vw"
                  />
                </a>
                <div className={styles.signatureBody}>
                  <p className={styles.tag}>{project.tag}</p>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <dl>
                    <dt>When</dt>
                    <dd>{project.when}</dd>
                    <dt>Where</dt>
                    <dd>{project.event.where}</dd>
                    <dt>Line-up</dt>
                    <dd>{project.lineup}</dd>
                  </dl>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="international" className={styles.section} aria-labelledby="international-title">
          <div className={styles.heading}>
            <div>
              <p className="eyebrow">International legacy</p>
              <h2 id="international-title">
                Pakistani artists on <em>stages abroad</em>
              </h2>
            </div>
            <p>
              We have provided artists to Vibrant Brampton Festival and
              Copenhagen Mela across multiple editions, and delivered the
              Pakistan Association of America&apos;s Independence Day concert
              in Michigan.
            </p>
          </div>
          <ul className={styles.intlGrid}>
            {INTERNATIONAL_PARTNERS.map((partner) => (
              <li className={styles.intlCard} key={partner.name}>
                <span className={styles.intlLogo}>
                  <Image src={partner.logo} alt={`${partner.name} logo`} fill sizes="96px" />
                </span>
                <div>
                  <p className={styles.tag}>
                    {partner.city}, {partner.country}
                  </p>
                  <h3>{partner.name}</h3>
                  <p>{partner.role}</p>
                  {partner.events.map((slug) => (
                    <a className={styles.intlLink} href={`#${slug}`} key={slug}>
                      View the {formatEventDate(getEvent(slug)).split(" ").at(-1)} poster →
                    </a>
                  ))}
                </div>
              </li>
            ))}
            {overseasShows.map((event) => (
              <li className={styles.intlCard} key={event.slug}>
                <a className={styles.intlPoster} href={`#${event.slug}`} aria-label={`View poster: ${event.title}`}>
                  <Image src={event.poster} alt={event.alt} fill sizes="96px" />
                </a>
                <div>
                  <p className={styles.tag}>{event.where}</p>
                  <h3>{event.title}</h3>
                  <p>
                    {event.headline} · {event.dateLabel}
                  </p>
                  <a className={styles.intlLink} href={`#${event.slug}`}>
                    View the poster →
                  </a>
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.intlCta}>
            <p>Organising a festival or community event abroad?</p>
            <a
              className="btn-gold"
              href={whatsappLink(INTERNATIONAL_MESSAGE)}
              target="_blank"
              rel="noreferrer"
              data-cta="work_international"
            >
              Discuss an international booking
            </a>
          </div>
        </section>

        <section className={styles.partner} aria-label="Returning partner">
          <div>
            <p className="eyebrow">A returning partner</p>
            <p className={styles.partnerText}>
              Repeat shows for Superior Group of Colleges campuses, from gala
              nights in Lahore to festivals in Faisalabad, Rawalpindi, Sialkot
              and Gujrat.
            </p>
          </div>
          <a className="btn-outline" href="/work?type=superior#archive">
            See these shows
          </a>
        </section>

        <section id="archive" className={styles.section} aria-labelledby="archive-title">
          <div className={styles.heading}>
            <div>
              <p className="eyebrow">The archive</p>
              <h2 id="archive-title">
                Selected shows, <em>newest first</em>
              </h2>
            </div>
            <p>
              A selection from our poster archive. Tap any poster for the full
              artwork, line-up, venue and how GnF Events is credited on it.
            </p>
          </div>
          <EventArchive events={archive} categories={categories} />
        </section>

        <section className={styles.services} aria-labelledby="services-title">
          <div className={styles.servicesInner}>
            <div>
              <p className="eyebrow">What we handle</p>
              <h2 id="services-title">One team from first call to final encore</h2>
              <p>
                Many of the posters above carry the line{" "}
                <em>“Talent acquisition and event powered by GnF Events.”</em>{" "}
                That covers both sides of the job: securing the right artist,
                and running the show around them.
              </p>
            </div>
            <ol>
              {services.map((service, index) => (
                <li key={service.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="hosts-title">
          <p className="eyebrow">On our posters</p>
          <h2 id="hosts-title" className={styles.hostsTitle}>
            Hosts and venues we&apos;ve delivered for
          </h2>
          <ul className={styles.hosts}>
            {EVENT_HOSTS.map((host) => (
              <li key={host}>{host}</li>
            ))}
          </ul>
        </section>

        <section className={styles.cta} aria-labelledby="cta-title" data-cta="work_cta">
          <Image src="/EventHighlights/E12.jpeg" alt="" fill sizes="100vw" />
          <span className={styles.ctaShade} />
          <div className={styles.ctaInner}>
            <div>
              <p className="eyebrow">Your event next</p>
              <h2 id="cta-title">
                Planning a concert, campus festival or <em>corporate night?</em>
              </h2>
              <p>
                Tell us the date, city and the kind of crowd. We&apos;ll come
                back with artist options, availability and how we&apos;d run it.
              </p>
              <div className={styles.actions}>
                <a
                  className="btn-gold"
                  href={whatsappLink(WHATSAPP_GENERAL_MESSAGE)}
                  target="_blank"
                  rel="noreferrer"
                >
                  Discuss your event on WhatsApp
                </a>
                <a className="btn-outline" href="/contact">
                  Send an enquiry
                </a>
              </div>
            </div>
            <address>
              <a className={styles.phone} href={telHref(PHONE_PRIMARY)}>
                {PHONE_PRIMARY.display}
              </a>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              <span>{ADDRESS}</span>
            </address>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
