"use client";
import React from "react";
import styles from './Fcomponent9.module.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
export default function Fcomponent9() {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "0",
        autoplay: true,
        autoplaySpeed: 2000,
    };
    const EventHighlights = [
        'EventHighlights/E1.jpeg',
        'EventHighlights/E2.jpeg',
        'EventHighlights/E3.jpeg',
        'EventHighlights/E4.jpeg',
        'EventHighlights/E5.jpeg',
        'EventHighlights/E6.jpeg',
        'EventHighlights/E7.jpeg',
        'EventHighlights/E8.jpeg',
        'EventHighlights/E9.jpeg',
        'EventHighlights/E10.jpeg',
        'EventHighlights/E11.jpeg',
        'EventHighlights/E12.jpeg',
        'EventHighlights/E13.jpeg',
        'EventHighlights/E14.jpeg',
        'EventHighlights/E15.jpeg',
        'EventHighlights/E16.jpeg',
        'EventHighlights/E17.jpeg',
        'EventHighlights/E18.jpeg',
        'EventHighlights/E19.jpeg',
        'EventHighlights/E20.jpeg',
        'EventHighlights/E21.jpeg',
        'EventHighlights/E22.jpeg',
        'EventHighlights/E23.jpeg',
        'EventHighlights/E24.jpeg',
      ];    
  return (
    <div className={styles.background}>
        <div className={styles.bg}>
        <p>Event Highlights</p>
        <div className={styles.text}>
          <p className={styles.line}>
          Explore the memorable moments captured from our recent events. These highlights showcase the energy,
          </p>
          <p className={styles.line}>
          excitement, and unforgettable experiences that made each occasion truly special. 
          </p>
          <p className={styles.line}>
          Relive the magic through our curated collection of event snapshots.
          </p>
        </div>
      </div>
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
    </div>
  )
}

