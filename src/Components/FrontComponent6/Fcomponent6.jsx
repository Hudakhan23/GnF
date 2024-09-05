import React from 'react'
import styles from './fcomponent6.module.css'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Box } from "@mui/material";

const artistData = [
    { name: 'Atif Aslam', img: 'images/Atifaslam.png' },
    { name: 'Aima Baig', img: 'images/Aimabaig.png' },
    { name: 'Abida Parveen', img: 'images/AbidaParveen.png' },
    { name: 'Atif Aslam', img: 'images/Atifaslam.png' },
    { name: 'Aima Baig', img: 'images/Aimabaig.png' }
];

export default function Fcomponent6() {
    const settings = {
        dots:true,
        speed: 500,
        slidesToShow: 3,  // Show 4 images at a time
        slidesToScroll: 1,
    };
  return (
    <div>
        <div className={styles.text}>
        <p>Popular Artist</p>
        <p className={styles.line}>Lorem ipsum dolor sit amet ,cons Lorem ipsum dolor</p>
        </div>
        <Box sx={{ width: "80%", marginTop: "30px", marginLeft:'140px',
            '@media (max-width: 1024px)': {
            margin: 'auto',
            marginTop:'50px'
        }
        }}>
            <Slider {...settings}>
            {artistData.map((artist, index) => (
                        <div key={index} className={styles.artistContainer}>
                            <p className={styles.artistName}>{artist.name}</p>
                            <img
                                src={artist.img}
                                alt={artist.name}
                                className={styles.images}
                            />
                        </div>
                ))}
            </Slider>
        </Box>
    </div>
  )
}
