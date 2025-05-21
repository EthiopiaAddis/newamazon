import React from "react";
import "./CatagoryCard.css";

const CatagoryCard = ({ title, image }) => {
  return (
    <div className="catagory-card">
      <div className="catagory-title">{title}</div>
      <div className="catagory-image-wrapper">
        <img src={image} alt={title} className="catagory-image" />
      </div>
      <a href="#" className="shop-now">
        Shop now
      </a>
    </div>
  );
};

export default CatagoryCard;
