import React from "react";
import { Link } from "react-router-dom";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import Rating from "@mui/material/Rating";
import "./Product.css";

import { useStateValue } from "../Dataprovider/DataProvider.js";
import { actionType } from "../../Utility/ActionType";

const ProductCard = ({ product, singleView }) => {
  const [, dispatch] = useStateValue();

  const addToCart = () => {
    dispatch({
      type: actionType.ADD_TO_CART,
      item: {
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        rating: product.rating,
      },
    });
  };

  return (
    <div className="product_card">
      {!singleView ? (
        <Link
          to={`/product/${product.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <img src={product.image} alt={product.title} />
          <h4>{product.title}</h4>
        </Link>
      ) : (
        <>
          <img src={product.image} alt={product.title} />
          <h2>{product.title}</h2>
          <p className="product_description">{product.description}</p>
        </>
      )}

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

      <button onClick={addToCart} className="add_to_cart">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
