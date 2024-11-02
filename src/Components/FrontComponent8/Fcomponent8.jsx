"use client";
import React, { useRef, useState } from "react";
import styles from "./Fcomponent8.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from 'next/image';

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  Autoplay,
  Pagination,
  Navigation,
  EffectCoverflow,
} from "swiper/modules";
import { Mulish, Poppins } from "next/font/google";
const mulish = Mulish({ subsets: ["latin"], weight: "800" });
const poppins = Poppins({ subsets: ["latin"], weight: "600" });
export default function Fcomponent8() {
  const RecentShows = [
    "RecentShows/2Nov2024.jpeg",
    "RecentShows/18Oct2024.jpeg",
    "RecentShows/25Sep2024.png",
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
    <div style={{ backgroundColor: "#FDF9F4", marginTop: "70px" }}>
      <div className={styles.bg}>
        <p className={mulish.className}>Our Recent Events</p>
        <div className={styles.text}>
          <p className={`${styles.line} ${poppins.className}`}>
            Take a glimpse at the vibrant events we&apos;ve recently hosted,
            where star-studded performances and &nbsp;
          </p>
          <p className={`${styles.line} ${poppins.className}`}>
            unforgettable moments came to life. Each poster tells the story of
            an incredible
          </p>
          <p className={`${styles.line} ${poppins.className}`}>
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
          effect="coverflow"
          breakpoints={{
            // Display 1 slide at a time at a max width of 989px
            0: {
              slidesPerView: 1,
            },
            990: {
              slidesPerView: 3,
            },
          }}
          modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
          className={styles.mySwiper}
        >
          {RecentShows.map((show, index) => (
            <SwiperSlide key={index} style={{ objectFit: "contain", margin:"auto"}}>
              {/* <img className={styles.image} src={show} alt={`Recent Show ${index}`} /> */}
              <Image
                className={styles.image}
                src={`/${show}`}
                alt={`Recent Show ${index}`}
                width={1080}
                height={600} 
                quality={100} 
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
