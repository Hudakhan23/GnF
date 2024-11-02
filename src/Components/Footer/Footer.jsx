import React from "react";
import styles from "./Footer.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Comfortaa, Mulish } from "next/font/google";
const mulish = Mulish({ subsets: ["latin"], weight: "600" });
const comfortaa = Comfortaa({ subsets: ["latin"], weight: "600" });
export default function Footer() {
  return (
    <>
      <div className={styles.main}>
      <div className={styles.footer}>
        <div className={`${styles.office} ${mulish.className}`}>
        <h1 style={{marginBottom:10 , fontSize:"25px"}}>Get in Touch</h1>
          <p><i class="fa-sharp fa-solid fa-location-dot" style={{marginRight:10}}></i>  93 D, Divine Garden Lahore,Pakistan</p>
          <a href="mailto:glowfanzevents@gmail.com" style={{textDecoration:"underline"}}>
            <p><i class="fa-solid fa-envelope" style={{marginRight:10}}></i> gnfeventspakistan@gmail.com </p>
          </a>
          <p><i class="fa-solid fa-phone" style={{marginRight:10}}></i> 0300 9492571</p>
          <p style={{marginLeft:37}}>0321 9492571</p>
        </div>
        <div className={`${styles.businesshours} ${mulish.className}`}>
        <h1 style={{marginBottom:15 , fontSize:"25px"}}>Business Hours</h1>
            <p>We&apos;re Available 24x7</p>
            <p>Timing: 12:00 pm to 7:00 pm</p>
            <p>Support Hours: 24/7 everyday</p>
        </div>
        <div className={`${styles.mission} ${mulish.className}`}>
            <h1 style={{marginBottom:10 , fontSize:"25px"}}>Our Mission Statement</h1>
            <p style={{width:"280px", lineHeight:"22px"}}>GnF Events is one of Pakistan&apos;s trusted entertainment booking platform, dedicated to offering the very best singers, bands, comedians, and entertainers for all kinds of events, from corporate dinners and weddings to cruises, parties, and festivals.</p>
        </div>
        <div className={`${styles.connection} ${mulish.className}`}>
        <h1 style={{marginBottom:10 , fontSize:"25px" , display:"block"}}>Connections</h1>
        <div className={styles.icons}>
          <a href="https://www.facebook.com/glow.fanz?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-facebook"></i> </a>
          <a href="https://www.instagram.com/gnfeventsofficial?igsh=MW9ybm9qZmhrcXd5ZA==" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-instagram"></i></a>
          <a  href="https://wa.me/<+923219492571>" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-whatsapp"></i></a>
        </div>
        </div>
      </div>
      <hr />
    </div>
      <div className={styles.bg}>
        <div className={`${styles.info} ${mulish.className}`}>
          <p>
            Follow us on social media for the latest updates and events. Contact
            us anytime for more information!
          </p>
          &copy; GnF Events. All rights reserved.
        </div>
      </div>
    </>
  );
}
