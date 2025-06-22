import React from "react";
import { Carousel as ResponsiveCarousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { img } from "./img/data.js"; // Make sure this matches the file name exactly
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
        {img.map((image, index) => (
          <div className="carousel-slide" key={index}>
            <img src={image} alt={`slide-${index}`} />
          </div>
        ))}
      </ResponsiveCarousel>
    </div>
  );
};

export default Carousel;
