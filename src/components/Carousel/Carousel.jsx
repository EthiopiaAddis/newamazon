import React from "react";
import { Carousel as ResponsiveCarousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { images } from "./img/Data";
import "./Carousel.css";

const Carousel = () => {
  return (
    <div className="carousel-wrapper">
      <ResponsiveCarousel
        showThumbs={false}
        infiniteLoop
        autoPlay
        showStatus={false}
        interval={3000}
      >
        {images.map((img, index) => (
          <div className="carousel-slide" key={index}>
            <img src={img} alt={`slide-${index}`} />
          </div>
        ))}
      </ResponsiveCarousel>
    </div>
  );
};

export default Carousel;
