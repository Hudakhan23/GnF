"use client";
import React from "react";
import styles from "./fcomponent6.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Box } from "@mui/material";

const artistData = [
  { name: "Atif Aslam", img: "images/AtifAslam.jpg" },
  { name: "Rahat Fateh Ali", img: "images/RahatFateh.jpg" },
  { name: "Abida Parveen", img: "images/Abidaparveeen.jpg" },
  { name: "Ali Zafar", img: "images/AliZafar.jpg" },
  { name: "Sajjad Ali", img: "images/SajjadAli.jpg" },
  { name: "Shafqat Amanat Ali", img: "images/Shafqat.jpg" },
  { name: "Abrar ul Haq", img: "images/AbrarulHaq.jpg" },
  { name: "Aima Baig", img: "images/Aima.jpg" },
  { name: "Asim Azhar", img: "images/AsimAzhar.jpg" },
  { name: "Bilal Saeed", img: "images/BilalSaeed.jpg" },
  { name: "Falak Shabbir", img: "images/FalakShabbir.jpg" },
  { name: "Hadiqa Kiani", img: "images/Hadiqa.jpg" },
  { name: "Mustafa Zahid", img: "images/MustafaZahid.jpg" },
  { name: "Sahir Ali Bagga", img: "images/Sahir.jpg" },
];

export default function Fcomponent6() {
  const settings = {
    className: "slider-container",
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 3
  };

  return (
    <div style={{backgroundColor:"#FDF9F4", height:"100vh"}}>
      <div className={styles.text}>
        <p>Popular Artist</p>
        <p className={styles.line}>
        Explore the talents of some of the most celebrated artists in the industry. From soulful melodies to electrifying performances, these singers have left an indelible mark on the world of music. 
        </p>
      </div>
      <Box sx={{ width: "60%", margin: "auto" }}>
        <div className="slider-container">
          <Slider {...settings}>
            {artistData.map((artist, index) => (
              <div key={index} className={styles.artistContainer}>
                <div style={{ width: 250, height: 280 }}>
                  <p className={styles.artistName}>{artist.name}</p>
                  <img
                    src={artist.img}
                    alt={artist.name}
                    className={styles.artistImage}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "15px",
                    }}
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </Box>
    </div>
  );
}
