import React from "react";
import { Link } from "react-router-dom";
import "./CatagoryCard.css";

const CatagoryCard = ({ title, image }) => {
  return (
    <Link to={`/category/${title}`} className="catagory-card-link">
      <div className="catagory-card">
        <div className="catagory-title">{title}</div>
        <div className="catagory-image-wrapper">
          <img src={image} alt={title} className="catagory-image" />
        </div>
        <div className="shop-now">Shop now</div>
      </div>
    </Link>
  );
};

export default CatagoryCard;
