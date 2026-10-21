import Link from "next/link";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { featuredArtists } from "@/data/artists";
import styles from "./not-found.module.css";

export const metadata = {
  title: "Page not found",
  description: "The page you are looking for does not exist on GnF Events.",
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="content" className={styles.main}>
        <p className="eyebrow">404 · Page not found</p>
        <h1>
          This page has <em>left the stage</em>
        </h1>
        <p className={styles.text}>
          The link may be old or mistyped. Browse the full artist roster, or tell
          us who you are looking for and our team will help.
        </p>
        <div className={styles.actions}>
          <Link href="/artists" className="btn-gold">
            Browse all artists
          </Link>
          <Link href="/contact" className="btn-outline">
            Contact our team
          </Link>
        </div>
        <nav className={styles.popular} aria-label="Popular artists">
          <h2>Popular artist pages</h2>
          <ul>
            {featuredArtists.map((artist) => (
              <li key={artist.slug}>
                <Link href={artist.href}>{artist.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </main>
      <Footer compact />
    </>
  );
}
