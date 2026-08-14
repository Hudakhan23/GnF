import Image from "next/image";
import {
  ADDRESS,
  EMAIL,
  PHONE_PRIMARY,
  PHONE_SECONDARY,
  socialLinks,
} from "@/data/site";
import styles from "./Footer.module.css";

const socialEntries = [
  ["Facebook", socialLinks.facebook],
  ["Instagram", socialLinks.instagram],
  ["WhatsApp", socialLinks.whatsapp],
];

export default function Footer({ compact = false }) {
  if (compact) {
    return (
      <footer className={styles.footer}>
        <div className={styles.compact}>
          <p>© {new Date().getFullYear()} GnF Events. All rights reserved.</p>
          <div className={styles.socials}>
            {socialEntries.map(([label, href]) => (
              <a href={href} target="_blank" rel="noreferrer" key={label}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div>
          <a className={styles.brand} href="/">
            <Image src="/logo-gold.png" alt="" width={52} height={52} />
            <span>GnF Events</span>
          </a>
          <p className={styles.description}>
            GnF Events is one of Pakistan&apos;s trusted entertainment booking
            platforms, connecting events with leading singers, bands, comedians,
            and entertainers.
          </p>
        </div>
        <div>
          <h2>Get in touch</h2>
          <address>{ADDRESS}</address>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <a href={`tel:${PHONE_PRIMARY}`}>0300 9492571</a>
          <a href={`tel:${PHONE_SECONDARY}`}>0321 9492571</a>
        </div>
        <div>
          <h2>Business hours</h2>
          <p>Office: 12:00 pm – 7:00 pm</p>
          <p>Support: 24/7, every day</p>
        </div>
        <div>
          <h2>Follow</h2>
          {socialEntries.map(([label, href]) => (
            <a href={href} target="_blank" rel="noreferrer" key={label}>
              {label}
            </a>
          ))}
        </div>
      </div>
      <div className={styles.legal}>
        <p>© {new Date().getFullYear()} GnF Events. All rights reserved.</p>
      </div>
    </footer>
  );
}
