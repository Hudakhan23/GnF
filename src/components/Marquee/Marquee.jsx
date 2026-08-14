import styles from "./Marquee.module.css";

export default function Marquee({
  items,
  renderItem,
  duration = "40s",
  reverse = false,
  pauseOnHover = false,
  ariaLabel,
  className = "",
}) {
  const loop = [...items, ...items];

  return (
    <div
      className={`${styles.viewport} ${pauseOnHover ? styles.pause : ""} ${className}`}
      aria-label={ariaLabel}
    >
      <div
        className={`${styles.track} ${reverse ? styles.reverse : ""}`}
        style={{ "--marquee-duration": duration }}
      >
        {loop.map((item, index) => renderItem(item, index))}
      </div>
    </div>
  );
}
