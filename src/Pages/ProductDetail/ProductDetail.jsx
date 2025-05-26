import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { producturl } from "../../API/endpoint";
import FadeLoader from "react-spinners/FadeLoader";
import "./ProductDetail.css"; // Optional for styling

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${producturl}/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product detail:", err);
        setIsLoading(false);
      });
  }, [productId]);

  return isLoading ? (
    <div className="loader-container">
      <FadeLoader color="#000" />
    </div>
  ) : product ? (
    <div className="product-detail-container">
      <h2>{product.title}</h2>
      <img src={product.image} alt={product.title} height="200" />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
    </div>
  ) : (
    <p>Product not found.</p>
  );
};

export default ProductDetail;
