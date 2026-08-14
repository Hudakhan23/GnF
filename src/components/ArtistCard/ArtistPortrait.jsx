import styles from "./ArtistPortrait.module.css";

const initials = (name) =>
  name
    .replace(/[^A-Za-z ]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

// Deterministic per-name tilt so a wall of placeholders still reads as varied.
const angle = (name) => {
  let h = 0;
  for (let i = 0; i < name.length; i += 1) h = (h * 31 + name.charCodeAt(i)) % 360;
  return h;
};

/**
 * Artist portrait. Falls back to a neutral gold monogram when we have no
 * verified photograph — never a stand-in face.
 */
export default function ArtistPortrait({ artist, className = "", priority }) {
  if (artist.image) {
    return (
      <img
        src={artist.image}
        alt={artist.name}
        className={`${styles.image} ${className}`}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    );
  }

  return (
    <div
      className={`${styles.placeholder} ${className}`}
      style={{ "--tilt": `${angle(artist.name)}deg` }}
      role="img"
      aria-label={`${artist.name} — photograph coming soon`}
    >
      <span className={styles.monogram}>{initials(artist.name)}</span>
    </div>
  );
}
