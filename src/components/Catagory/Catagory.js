import React from "react";
import { categoryData } from "./CatagoryFullinfo";
import CatagoryCard from "./CatagoryCard";
import "./Caragory.css";

const Catagory = () => {
  return (
    <div className="cat-container">
      {categoryData.map((item, index) => (
        <CatagoryCard key={index} title={item.title} image={item.image} />
      ))}
    </div>
  );
};

export default Catagory;
