import Link from "next/link";
import styles from "./ArtistCard.module.css";
import ArtistPortrait from "./ArtistPortrait";
import { MANAGEMENT, cardTags, descriptorFor } from "@/data/artists";

export default function ArtistCard({ artist, priority }) {
  const isExclusive = artist.managementType === "exclusive";
  const tags = cardTags(artist);

  return (
    <Link href={`/artists/${artist.slug}`} className={styles.card}>
      <div className={styles.media}>
        <ArtistPortrait artist={artist} priority={priority} />
        <div className={styles.scrim} />
        {isExclusive && (
          <span className={styles.badge}>{MANAGEMENT.exclusive.badge}</span>
        )}
      </div>

      <div className={styles.body}>
        <p className={styles.name}>{artist.name}</p>
        <p className={styles.descriptor}>{descriptorFor(artist)}</p>
        <div className={styles.tags}>
          {tags.map((t) => (
            <span key={t} className={styles.tag}>
              {t}
            </span>
          ))}
        </div>
        <span className={styles.cta}>View profile →</span>
      </div>
    </Link>
  );
}
