"use client";
import React from 'react'
import styles from "./FComponent2.module.css"
export default function FComponent2() {
  return (
   <>
    <div className={styles.main}>
        <div className={styles.pic}>
          <img src="/images/CEO.jpeg" alt="CEO Picture" />
        </div>
        <div className={styles.text}>
            <p className={styles.h1}>Introducing Our CEO </p>
            {/* <p className={styles.h1}>Behind Our Success</p> */}
            <p className={styles.para}>Aamir Mehmood Rana, Founder & CEO of GnF Events, brings over two decades of expertise from Jang Media Group and PTV. His career highlights include leading major projects and expanding his influence in media. Since founding GnF Events in 2016, his vision has transformed the company into a global leader in artist and event management. Aamir&apos;s dedication to excellence, innovation, and strategic growth continues to drive GnF Events' success, ensuring unparalleled service and industry leadership.His relentless pursuit of perfection and ability to adapt to industry trends make him a driving force in the entertainment world. Under his guidance, GnF Events continues to set new standards in event management globally,  consistently exceeding client expectations and delivering unforgettable experiences.</p>
            {/* <button className={styles.btn}>Book an Artist</button> */}
        </div>
    </div>
   </>
  )
}
