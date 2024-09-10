import React from "react";
import styles from "./Fcomponent10.module.css";
export default function FComponent10() {
  const Allies = [
    "Allies/Allies1.jpeg",
    "Allies/Allies2.jpeg",
    "Allies/Allies3.jpeg",
    "Allies/Allies4.jpeg",
    "Allies/Allies5.jpeg",
    "Allies/Allies6.jpeg",
    "Allies/Allies7.jpeg",
    "Allies/Allies8.jpeg",
    "Allies/Allies9.jpeg",
    "Allies/Allies10.jpeg",
  ];
  return (
    <div>
      <div className={styles.bg}>
        <p>Our Trusted Allies</p>
      </div>
      <div className={styles.allies}>
        {Allies.map((show, index) => (
          <div key={index} className={styles.main}>
            <img src={show} alt={`Allies ${index}`} className={styles.image} />
          </div>
        ))}
      </div>
    </div>
  );
}
