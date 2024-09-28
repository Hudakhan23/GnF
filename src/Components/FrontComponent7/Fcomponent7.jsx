"use client";
import React from "react";
import styles from "./Fcomponent7.module.css";
import { Mulish,Poppins } from "next/font/google";
const mulish=Mulish({ subsets: ["latin"], weight: '800', });
const poppins=Poppins({subsets:["latin"], weight:'600'})
export default function Fcomponent7() {
  return (
    <div className={styles.main}>
      <div className={styles.bg}>
        <p className={`${styles.heading} ${mulish.className}`}>What we do?</p>
        <div className={styles.text1}>
        <p className={`${styles.line} ${poppins.className}`}>
        we connect you with premier singers, comedians, and celebrities worldwide for unforgettable events.
        </p>
        <p className={`${styles.line} ${poppins.className}`}> Our extensive network ensures access to top-tier talent, elevating your occasions</p>
        <p className={`${styles.line} ${poppins.className}`}> with remarkable performances and appearances.</p>
        </div>
      </div>
      <div className={styles.background}>
        <div className={styles.card1}>
          <p className={`${styles.text} ${mulish.className}`}>Singer</p>
          <p className={`${styles.text2} ${mulish.className}`}>Facilitation</p>
          <p className={`${styles.line2} ${poppins.className}`}>
          Access renowned singers to elevate your events with exceptional live performances. We ensure the perfect vocal talent to enhance your occasion.
          </p>
        </div>
        <div className={styles.card2}>
          <p className={`${styles.text} ${mulish.className}`}>Comedian Facilitation</p>
          <p className={`${styles.line2} ${poppins.className}`}>
          We connect you with leading comedians for engaging and memorable performances tailored to your event. Enjoy a night of laughter with top comedic talent.
          </p>
        </div>
        <div className={styles.card3}>
          <p className={`${styles.text} ${mulish.className}`}>Celebrity Appearances</p>
          <p className={`${styles.line2} ${poppins.className}`}>
          Book high-profile celebrities to make your event stand out with exclusive appearances and interactions. Create unforgettable moments with top industry stars.
          </p>
        </div>
        <div className={styles.card3}>
          <p className={`${styles.text} ${mulish.className}`}>Event</p>
          <p className={`${styles.text2} ${mulish.className}`}>Planning</p>
          <p className={`${styles.line2} ${poppins.className}`}>
          We craft every detail with precision, ensuring your event is both seamless and memorable. Trust us to bring your vision to life with creativity and excellence, leaving a lasting impression on your guests.
          </p>
        </div>
        <div className={styles.card2}>
          <p className={`${styles.text} ${mulish.className}`}>Artist</p>
          <p className={`${styles.text2} ${mulish.className}`}>Management</p>
          <p className={`${styles.line2} ${poppins.className}`}>
          We manage top talent with dedication, handling bookings and partnerships to ensure exceptional performances on every stage. Our focus is on maximizing their impact and success.
          </p>
        </div>
        <div className={styles.card1}>
          <p className={`${styles.text} ${mulish.className}`}>Entertainment</p>
          <p className={`${styles.line2} ${poppins.className}`} style={{paddingTop:"30px"}}>
          We deliver unforgettable experiences with a diverse range of talent and events. From captivating performances to engaging shows, our team ensures every event is a standout occasion.
          </p>
        </div>
      </div>
    </div>
  );
}
