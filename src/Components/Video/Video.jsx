import React from 'react'
import styles from './Video.module.css'
import {Mulish, Poppins } from 'next/font/google';
const mulish=Mulish({ subsets: ["latin"], weight: '900', });
const poppins=Poppins({ subsets: ["latin"], weight: '600', });
export default function Video() {
  return (
    <div className={styles.background}>
      <div className={`${styles.text} ${mulish.className}`}>
        <p><span style={{color:"#FD7A03"}}>Show</span> the world</p>
        <p>you know <span className={styles.music}>music</span></p>
        <p className={`${styles.information} ${poppins.className}`}>Join hands with GnF to bring your favorite artists to the global stage. Whether it's concerts, events, or festivals, we help you create unforgettable musical experiences.</p>
      </div>
    </div>
  )
}
