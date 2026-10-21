import Image from "next/image";
import { WHATSAPP_GENERAL_MESSAGE, whatsappLink } from "@/data/site";
import styles from "./Header.module.css";

const links = [
  { label: "Home", href: "/", key: "home" },
  { label: "Artists", href: "/artists", key: "artists" },
  { label: "Services", href: "/#services", key: "services" },
  { label: "Our Work", href: "/work", key: "work" },
  { label: "About", href: "/about", key: "about" },
  { label: "Contact", href: "/contact", key: "contact" },
];

function Navigation({ active, bookingHref }) {
  return (
    <nav className={styles.nav} aria-label="Primary navigation" data-cta="header">
      {links.map((link) => (
        <a
          href={link.href}
          className={`${styles.navLink} ${active === link.key ? styles.active : ""}`}
          key={link.key}
        >
          {link.label}
        </a>
      ))}
      <a
        className={styles.booking}
        href={bookingHref}
        target="_blank"
        rel="noreferrer"
      >
        Book an Artist
      </a>
    </nav>
  );
}

/**
 * `bookingHref` lets a page swap the generic WhatsApp prefill for a
 * page-specific one (artist pages pass the artist's enquiry message).
 */
export default function Header({
  active,
  overlay = false,
  bookingHref = whatsappLink(WHATSAPP_GENERAL_MESSAGE),
}) {
  return (
    <header className={`${styles.header} ${overlay ? styles.overlay : ""}`}>
      <div className={styles.inner}>
        <a className={styles.brand} href="/" aria-label="GnF Events home">
          <Image
            src="/logo-gold.png"
            width={52}
            height={52}
            alt=""
            className={styles.logo}
            priority
          />
          <span>GnF Events</span>
        </a>

        <div className={styles.desktopNav}>
          <Navigation active={active} bookingHref={bookingHref} />
        </div>

        <details className={styles.mobileMenu}>
          <summary aria-label="Open navigation menu">
            <span />
            <span />
            <span />
          </summary>
          <div className={styles.mobilePanel}>
            <Navigation active={active} bookingHref={bookingHref} />
          </div>
        </details>
      </div>
    </header>
  );
}
