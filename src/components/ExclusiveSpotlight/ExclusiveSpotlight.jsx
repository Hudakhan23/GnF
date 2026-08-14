import Link from "next/link";
import styles from "./ExclusiveSpotlight.module.css";
import ArtistPortrait from "@/components/ArtistCard/ArtistPortrait";
import BookingButton from "@/components/BookingForm/BookingButton";
import { MANAGEMENT, descriptorFor } from "@/data/artists";

/**
 * Editorial treatment for exclusively managed artists. Renders one spotlight
 * block per artist, so adding a second signing needs no redesign.
 */
export default function ExclusiveSpotlight({ artists, allArtists }) {
  if (!artists.length) return null;

  return (
    <section className={styles.section} id="exclusive">
      <div className={styles.aura} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.head}>
          <p className="eyebrow">Exclusive management</p>
          <h2 className={styles.title}>Artists we represent</h2>
          <p className={styles.intro}>
            A small roster of artists whose management sits with GnF Events.
            Every booking, date, and enquiry for these artists is handled
            directly by our team.
          </p>
        </div>

        {artists.map((artist) => (
          <article key={artist.slug} className={styles.spotlight}>
            <div className={styles.mediaWrap}>
              <div className={styles.media}>
                <ArtistPortrait artist={artist} priority />
              </div>
              <span className={styles.badge}>{MANAGEMENT.exclusive.badge}</span>
            </div>

            <div className={styles.content}>
              <p className={styles.descriptor}>{descriptorFor(artist)}</p>
              <h3 className={styles.name}>{artist.name}</h3>
              <p className={styles.statement}>
                {MANAGEMENT.exclusive.statement}
              </p>
              <div className={styles.meta}>
                {artist.genres.map((g) => (
                  <span key={g} className={styles.chip}>
                    {g}
                  </span>
                ))}
                <span className={styles.chip}>{artist.artistType}</span>
                <span className={styles.chip}>{artist.country}</span>
              </div>
              <div className={styles.actions}>
                <BookingButton artist={artist} artists={allArtists}>
                  Book {artist.name}
                </BookingButton>
                <Link
                  href={`/artists/${artist.slug}`}
                  className="btn-outline"
                >
                  View profile
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
