import Link from "next/link";
import { ARTISTS } from "@/data/artists";
import styles from "./ArtistIndex.module.css";

const letterOf = (name) => {
  const first = name.normalize("NFD")[0].toUpperCase();
  return /[A-Z]/.test(first) ? first : "#";
};

const GROUPS = Object.entries(
  [...ARTISTS]
    .sort((a, b) => a.name.localeCompare(b.name))
    .reduce((groups, artist) => {
      const letter = letterOf(artist.name);
      (groups[letter] ||= []).push(artist);
      return groups;
    }, {})
).sort(([a], [b]) => (a === "#" ? 1 : b === "#" ? -1 : a.localeCompare(b)));

/**
 * Server-rendered A–Z list of every artist page. The interactive directory
 * above it shows 24 cards at a time; this list keeps every profile reachable
 * through a plain link in the initial HTML.
 */
export default function ArtistIndex() {
  return (
    <section className={styles.index} aria-labelledby="artist-index-title">
      <p className="eyebrow">A–Z</p>
      <h2 id="artist-index-title" className={styles.title}>
        All {ARTISTS.length} artists by name
      </h2>
      <nav className={styles.letters} aria-label="Jump to letter">
        {GROUPS.map(([letter]) => (
          <a key={letter} href={`#artists-${letter === "#" ? "other" : letter}`}>
            {letter}
          </a>
        ))}
      </nav>
      <div className={styles.groups}>
        {GROUPS.map(([letter, list]) => (
          <div
            key={letter}
            id={`artists-${letter === "#" ? "other" : letter}`}
            className={styles.group}
          >
            <h3>{letter}</h3>
            <ul>
              {list.map((artist) => (
                <li key={artist.slug}>
                  <Link href={`/artists/${artist.slug}`} prefetch={false}>
                    {artist.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
