import React from 'react';
import styles from './Fcomponent4.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Fcomponent4() {
  return (
    <div className={styles.background}>
      <div className={styles.card}>
        <div className={styles.icon}>
          <i className="fas fa-guitar" style={{ fontSize: '30px', color: 'white' }}></i>
        </div>
        <p className={styles.text}>Sign in your favorite Singer</p>
        <p className={styles.line2}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, illum?</p>
        <div className={styles.shadow}></div>
      </div>
      <div className={styles.card}>
        <div className={styles.icon2}>
          <i className="fa fa-trophy" style={{ fontSize: '25px', color: 'white' }}></i>
        </div>
        <p className={styles.text}>Be Rewarded with Artist march</p>
        <p className={styles.line2}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, illum?</p>
        <div className={styles.shadow2}></div>
      </div>
      <div className={styles.card}>
        <div className={styles.icon3}>
          <i className="fas fa-user-friends" style={{ fontSize: '20px', color: 'white' }}></i>
        </div>
        <p className={styles.text}>Complete friends and top the leaderboard</p>
        <p className={styles.line2}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, illum?</p>
        <div className={styles.shadow3}></div>
      </div>
    </div>
  );
}

