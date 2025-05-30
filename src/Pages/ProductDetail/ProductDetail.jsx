import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { producturl } from "../../API/endpoint";
import FadeLoader from "react-spinners/FadeLoader";
import Header from "../../components/Header/Header";
import { useStateValue } from "../../components/Dataprovider/DataProvider";
import numeral from "numeral";
import Rating from "@mui/material/Rating";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [{ cart }, dispatch] = useStateValue();

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

  const addToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        rating: product.rating.rate,  // rating is a number
        qty: 1,                       // important: add initial quantity
      },
    });
  };

  return (
    <>
      <Header />
      {isLoading ? (
        <div className="loader-container">
          <FadeLoader color="#000" />
        </div>
      ) : product ? (
        <div className="product-detail-container">
          <img src={product.image} alt={product.title} height="250" />
          <h2>{product.title}</h2>
          <Rating value={product.rating.rate} precision={0.5} readOnly />
          <p className="product-price">Price: {numeral(product.price).format('$0,0.00')}</p>
          <p className="product-description">{product.description}</p>
          <button className="add-to-cart-button" onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      ) : (
        <p>Product not found.</p>
      )}
    </>
  );
};

export default ProductDetail;
