import React, { useRef, useState } from "react";
import styles from "./Fcomponent8.module.css";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  Autoplay,
  Pagination,
  Navigation,
  EffectCoverflow,
} from "swiper/modules";
export default function Fcomponent8() {
  const RecentShows = [
    "RecentShows/10Aug2024.jpeg",
    "RecentShows/4May2024.jpeg",
    "RecentShows/27April2024.jpeg",
    "RecentShows/9March2024.jpeg",
    "RecentShows/7March2024.jpeg",
    "RecentShows/6March2024.jpeg",
    "RecentShows/2March2024.jpeg",
    "RecentShows/Nodate.jpeg",
    "RecentShows/29Feb2024.jpeg",
    "RecentShows/17Feb2024.jpeg",
    "RecentShows/15Feb2024.jpeg",
    "RecentShows/13Feb2024.jpeg",
    "RecentShows/4aFeb2024.jpeg",
    "RecentShows/4Feb2024.jpeg",
    "RecentShows/22Jan2024.jpeg",
    "RecentShows/29Dec2023.jpeg",
    "RecentShows/28Dec2023.jpeg",
    "RecentShows/21Dec2023.jpeg",
    "RecentShows/29Sep2023.jpeg",
    "RecentShows/22july2023.jpeg",
  ];
  return (
    <div>
      <div className={styles.bg}>
        <p>Our Recent Events</p>
        <div className={styles.text}>
          <p className={styles.line}>
          Take a glimpse at the vibrant events we've recently hosted, where star-studded performances and
          </p>
          <p className={styles.line}>
             unforgettable moments came to life. Each poster tells the story of an incredible
          </p>
          <p className={styles.line}>
            experience, capturing the essence of our spectacular shows.
          </p>
        </div>
      </div>
      <div className={styles.container}>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          slidesPerView={3}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={true}
          effect="coverflow"
          coverflowEffect={{
            depth: 100,
            rotate: 50,
            scale: 1,
            slideShadows: true,
            stretch: 0,
          }}
          modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
          className={styles.mySwiper}
        >
          {RecentShows.map((show, index) => (
            <SwiperSlide key={index}>
              <img className={styles.image} src={show} alt={`Recent Show ${index}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
