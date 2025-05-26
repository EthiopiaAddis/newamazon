import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import Loader from "../Loader/Loader"; // ✅ import
import "./Product.css";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // ✅ loading state

  useEffect(() => {
    setIsLoading(true); // Start loader
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false); // Stop loader
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false); // Stop loader on error too
      });
  }, []);

  return (
    <div className="product_container">
      {isLoading ? (
        <Loader /> // ✅ show loader
      ) : (
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </div>
  );
};

export default Product;
