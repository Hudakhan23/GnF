import React from "react";
import styles from "./Footer.module.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
export default function Footer() {
  return (
    <div className={styles.main}>
      <div className={styles.footer}>
        <div className={styles.first}>
          <h1 class={styles.heading}>GnF</h1>
        </div>
        <div className={styles.office}>
          <h1 style={{marginBottom:20 , fontSize:"25px"}}>Office</h1>
          <p><i class="fa-sharp fa-solid fa-location-dot" style={{marginRight:10}}></i>  93 D, Divine Garden Lahore,Pakistan</p>
          <a href="mailto:glowfanzevents@gmail.com" style={{textDecoration:"underline"}}>
            <p><i class="fa-solid fa-envelope" style={{marginRight:10}}></i> glowfanzevents@gmail.com </p>
          </a>
          <p><i class="fa-solid fa-phone" style={{marginRight:10}}></i> 0300 9492571</p>
          <p style={{marginLeft:37}}>0321 9492571</p>
        </div>
        <div className={styles.connection}>
          <p><i class="fa-brands fa-facebook"></i></p>
          <p><i class="fa-brands fa-instagram"></i></p>
          <p><i class="fa-brands fa-whatsapp"></i></p>
        </div>
      </div>
      <hr />
      <div className={styles.info}>
          <p>
            Follow us on social media for the latest updates and events. Contact
            us anytime for more information!
          </p>
          &copy; GnF Events. All rights reserved.
        </div>
    </div>
  );
}
