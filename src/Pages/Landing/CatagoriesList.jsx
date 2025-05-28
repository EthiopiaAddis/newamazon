
import React from "react";
import CatagoryCard from "../../components/CatagoryCard/CatagoryCard";

const categories = [
  {
    title: "electronics",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  },
  {
    title: "jewelery",
    image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
  },
  {
    title: "men's clothing",
    image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
  },
  {
    title: "women's clothing",
    image: "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
  },
];

const CategoriesList = () => {
  return (
    <div
      className="categories-list"
      style={{ display: "flex", gap: "20px", padding: "20px" }}
    >
      {categories.map(({ title, image }) => (
        <CatagoryCard key={title} title={title} image={image} />
      ))}
    </div>
  );
};

export default CategoriesList;
