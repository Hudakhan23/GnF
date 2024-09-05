"use client";
import React from "react";
import styles from "./Fcomponent3.module.css";
export default function Fcomponent3() {
  return (
    <div className={styles.background}>
      <div className={styles.text}>
        <p className={styles.line1}>
          <span style={{ color: "#FD7A03" }}>Show</span> the world
        </p>
        <p className={styles.line1}>
          you know <span className={styles.music}>music</span>
        </p>
        <div className={styles.text2}>
            <p className={styles.line2}>Lorem ipsum dolor sit amet cons Lorem ipsum dolor sit amet c</p>
        </div>
      </div>
    </div>
  );
}
