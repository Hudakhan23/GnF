"use client";
import React from 'react'
import styles from './Events.module.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {Mulish,Poppins } from 'next/font/google';
const mulish=Mulish({ subsets: ["latin"], weight: '800', });
const poppins=Poppins({subsets:["latin"], weight:'600'})
const popins=Poppins({subsets:["latin"], weight:'700'})
export default function Events() {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "0",
        autoplay: true,
        autoplaySpeed: 2000,
    };
    const EventHighlights = [
        "EventHighlights/E1.jpeg",
        "EventHighlights/E2.jpeg",
        "EventHighlights/E3.jpeg",
        "EventHighlights/E4.jpeg",
        "EventHighlights/E5.jpeg",
        "EventHighlights/E6.jpeg",
        "EventHighlights/E7.jpeg",
        "EventHighlights/E8.jpeg",
        "EventHighlights/E9.jpeg",
        "EventHighlights/E10.jpeg",
        "EventHighlights/E11.jpeg",
        "EventHighlights/E12.jpeg",
        "EventHighlights/E13.jpeg",
        "EventHighlights/E14.jpeg",
        "EventHighlights/E15.jpeg",
        "EventHighlights/E16.jpeg",
        "EventHighlights/E17.jpeg",
        "EventHighlights/E18.jpeg",
        "EventHighlights/E19.jpeg",
        "EventHighlights/E20.jpeg",
        "EventHighlights/E21.jpeg",
        "EventHighlights/E22.jpeg",
        "EventHighlights/E23.jpeg",
        "EventHighlights/E24.jpeg",
      ];    
  return (
    <div className={styles.background}>
      <div className={styles.sliderContainer}>
            <Slider {...settings}>
                {EventHighlights.map((show, index) => (
                    <div key={index} className={styles.imageContainer}>
                        <img
                            src={show}
                            alt={`Event Highlight ${index}`}
                            className={styles.image}
                        />
                    </div>
                ))}
            </Slider>
        </div>
        <div className={styles.text}>
          <p className={`${styles.h1} ${mulish.className}`}>GnF Events </p>
          <p className={`${styles.para} ${poppins.className}`}>
            <p className={`${styles.heading} ${popins.className}`}>Your gateway to extraordinary entertainment experiences.</p>
          At GnF Events, we specialize in connecting the world with top&ndash;tier artists, events, and performances. Whether it&apos;s a concert, comedy show, or a special appearance, we ensure a seamless experience from start to finish. With our global reach and expert management, we bring unforgettable moments to life for any occasion, anywhere.
          Our dedicated team works around the clock to curate events that leave a lasting impression. With GnF, you don&apos;t just attend events &ndash; you experience them
          </p>
        </div>
    </div>
  )
}
