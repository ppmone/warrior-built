import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { useTheme } from "@mui/material";
import { carouselData } from "./CarouselData";
import CarouselItem from "./CarouselItem";

const Carousel = () => {
  const theme = useTheme();
  
  const settings = {
    infinite: true,
    speed: 8000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="carousel-wrapper">
      <Slider
        {...settings}
        className="slider-container"
        style={{
          background: 'var(--blueGrey-500)',
          color: "#fff",
          transition: "all .2s",
        }}
      >
        {carouselData.map((data) => {
          return <CarouselItem {...data} key={data.id} />;
        })}
      </Slider>
    </div>
  );
};

export default Carousel;