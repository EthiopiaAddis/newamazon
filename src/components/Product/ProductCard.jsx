import React from "react";
import { Link } from "react-router-dom";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import Rating from "@mui/material/Rating";
import "./Product.css";

const ProductCard = ({ product }) => {
  return (
    <div className="product_card">
      <Link
        to={`/product/${product.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <img src={product.image} alt={product.title} />
        <h4>{product.title}</h4>
      </Link>

      <div className="rating_price_wrapper">
        <Rating
          name="read-only"
          value={product.rating?.rate || 0}
          precision={0.5}
          readOnly
          size="small"
        />
        <span className="rating_count">({product.rating?.count || 0})</span>
      </div>

      <p className="product_price">
        <CurrencyFormat amount={product.price} />
      </p>

      <a href="#" className="add_to_cart">
        Add to Cart
      </a>
    </div>
  );
};

export default ProductCard;
