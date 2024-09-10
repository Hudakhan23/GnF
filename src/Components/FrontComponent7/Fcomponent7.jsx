import React from "react";
import styles from "./Fcomponent7.module.css";
export default function Fcomponent7() {
  return (
    <>
      <div className={styles.bg}>
        <p className={styles.heading}>What we do?</p>
        <div className={styles.text1}>
        <p className={styles.line}>
        we connect you with premier singers, comedians, and celebrities worldwide for unforgettable events.
        </p>
        <p className={styles.line}> Our extensive network ensures access to top-tier talent, elevating your occasions</p>
        <p className={styles.line}> with remarkable performances and appearances.</p>
        </div>
      </div>
      <div className={styles.background}>
        <div className={styles.card1}>
          <p className={styles.text}>Singer</p>
          <p className={styles.text1}>Facilitation</p>
          <p className={styles.line2}>
          Access renowned singers to elevate your events with exceptional live performances. We ensure the perfect vocal talent to enhance your occasion.
          </p>
        </div>
        <div className={styles.card2}>
          <p className={styles.text}>Comedian Facilitation</p>
          <p className={styles.line2}>
          We connect you with leading comedians for engaging and memorable performances tailored to your event. Enjoy a night of laughter with top comedic talent.
          </p>
        </div>
        <div className={styles.card3}>
          <p className={styles.text}>Celebrity Appearances</p>
          <p className={styles.line2}>
          Book high-profile celebrities to make your event stand out with exclusive appearances and interactions. Create unforgettable moments with top industry stars.
          </p>
        </div>
      </div>
      {/* Add extra cards from 3dm website */}
      <div className={styles.background1}>
        <div className={styles.card3}>
          <p className={styles.text}>Event</p>
          <p className={styles.text1}>Planning</p>
          <p className={styles.line2}>
          We craft every detail with precision, ensuring your event is both seamless and memorable. Trust us to bring your vision to life with creativity and excellence, leaving a lasting impression on your guests.
          </p>
        </div>
        <div className={styles.card2}>
          <p className={styles.text}>Artist</p>
          <p className={styles.text1}>Management</p>
          <p className={styles.line2}>
          We manage top talent with dedication, handling bookings and partnerships to ensure exceptional performances on every stage. Our focus is on maximizing their impact and success.
          </p>
        </div>
        <div className={styles.card1}>
          <p className={styles.text}>Entertainment</p>
          <p className={styles.line2}>
          We deliver unforgettable experiences with a diverse range of talent and events. From captivating performances to engaging shows, our team ensures every event is a standout occasion. Let us elevate your entertainment experience to new heights.
          </p>
        </div>
      </div>
    </>
  );
}
