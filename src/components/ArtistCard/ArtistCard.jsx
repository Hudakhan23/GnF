import Image from "next/image";
import styles from "./ArtistCard.module.css";

export default function ArtistCard({ artist, featured = false, sizes, priority = false }) {
  return (
    <article className={`${styles.card} ${featured ? styles.featured : ""}`}>
      <a href={artist.href} aria-label={`View ${artist.name} booking details`}>
        <Image
          src={artist.image}
          alt={`${artist.name} — artist booking through GnF Events`}
          fill
          sizes={sizes || "(max-width: 700px) 100vw, (max-width: 1050px) 50vw, 33vw"}
          className={styles.image}
          priority={priority}
        />
        <span className={styles.overlay} />
        <span className={styles.content}>
          <strong>{artist.name}</strong>
          {!featured && <small>{artist.tag}</small>}
          <span>Booking details →</span>
        </span>
      </a>
    </article>
  );
}
