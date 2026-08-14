import Image from "next/image";
import { WHATSAPP_URL } from "@/data/site";
import styles from "./Header.module.css";

const links = [
  { label: "Home", href: "/", key: "home" },
  { label: "Artists", href: "/artists", key: "artists" },
  { label: "Services", href: "/#services", key: "services" },
  { label: "Work", href: "/#work", key: "work" },
  { label: "About", href: "/about", key: "about" },
  { label: "Contact", href: "/contact", key: "contact" },
];

function Navigation({ active }) {
  return (
    <nav className={styles.nav} aria-label="Primary navigation">
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
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
      >
        Book an Artist
      </a>
    </nav>
  );
}

export default function Header({ active, overlay = false }) {
  return (
    <header className={`${styles.header} ${overlay ? styles.overlay : ""}`}>
      <div className={styles.inner}>
        <a className={styles.brand} href="/" aria-label="GnF Events home">
          <Image
            src="/logo-gold.png"
            width={52}
            height={52}
            alt="GnF Events"
            className={styles.logo}
            priority
          />
          <span>GnF Events</span>
        </a>

        <div className={styles.desktopNav}>
          <Navigation active={active} />
        </div>

        <details className={styles.mobileMenu}>
          <summary aria-label="Open navigation menu">
            <span />
            <span />
            <span />
          </summary>
          <div className={styles.mobilePanel}>
            <Navigation active={active} />
          </div>
        </details>
      </div>
    </header>
  );
}
