import React from "react";
import styles from "./Fcomponent5.module.css";
export default function Fcomponent5() {
  return (
    <div className={styles.background}>
      <div className={styles.circle}></div>
      <div className={styles.heading}>
        Move will be the <span style={{ color: "#FD7A03" }}>best</span> choice
        for your next <span style={{ color: "#00D1FF" }}>project</span>
        <p className={styles.line1}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam atque
          sapiente ad nam? Possimus officia quasi blanditiis temporibus, at quis
          accusantium deserunt quaerat harum doloribus earum veniam cum tenetur
          explicabo nam! Deleniti possimus
        </p>
        <button className={styles.btn}>Join Now</button>
      </div>
    </div>
  );
}
