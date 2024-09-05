"use client";
import React from 'react'
import styles from "./FComponent2.module.css"
export default function FComponent2() {
  return (
   <>
    <div className={styles.main}>
        <div className={styles.pic}></div>
        <div className={styles.text}>
            <p className={styles.h1}>GnF Events</p>
            <p className={styles.para}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam libero culpa qui obcaecati unde illo, ipsumoshm temporibus saepe dicta soluta ut pariatur, nihil rationes eaque sint minus eos asperiores harum. dicta soluta ut pariatur,</p>
            <button className={styles.btn}>Book an Artist</button>
        </div>
    </div>
   </>
  )
}
