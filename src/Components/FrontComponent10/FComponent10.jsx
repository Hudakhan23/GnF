"use client";
import React from "react";
import styles from "./Fcomponent10.module.css";
import { Mulish } from "next/font/google";
const mulish=Mulish({ subsets: ["latin"], weight: "800" });
export default function FComponent10() {
  const Allies = [
    "Allies/Allies1.png",
    "Allies/Allies2.png",
    "Allies/Allies3.png",
    "Allies/Allies4.png",
    "Allies/Allies5.png",
    "Allies/Allies6.png",
    "Allies/Allies7.png",
    "Allies/Allies8.png",
    "Allies/Allies9.png",
    "Allies/Allies10.png",
    "Allies/Allies11.png",
    "Allies/Allies12.png",
  ];
  return (
    <div className={styles.background}>
      <div className={`${styles.bg} ${mulish.className}`}>
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
