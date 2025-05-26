// src/Pages/Cart.jsx

import React from "react";
import LayOut from "../../components/LayOut/LayOut";
import { useStateValue } from "../../components/Dataprovider/DataProvider";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import Rating from "@mui/material/Rating";
import "./Cart.css";

function Cart() {
  const [{ cart }, dispatch] = useStateValue();

  const calculateTotal = () =>
    cart?.reduce((acc, item) => acc + item.price * item.qty, 0);

  const increaseQty = (id) => {
    dispatch({ type: "INCREASE_QTY", id });
  };

  const decreaseQty = (id) => {
    dispatch({ type: "DECREASE_QTY", id });
  };

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", id });
  };

  return (
    <LayOut>
      <div className="cart_container">
        <div className="cart_left">
          <h1>Hello</h1>
          <h3>Your Shopping Basket</h3>
          <hr />

          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div className="cart_item" key={item.id}>
                <img src={item.image} alt={item.title} className="cart_image" />
                <div className="cart_item_details">
                  <h4>{item.title}</h4>
                  <Rating
                    name="read-only"
                    value={item.rating?.rate || 0}
                    precision={0.5}
                    readOnly
                    size="small"
                  />
                  <p className="cart_price">
                    <CurrencyFormat amount={item.price} /> x {item.qty}
                  </p>
                  <div className="qty_controls">
                    <button onClick={() => decreaseQty(item.id)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => increaseQty(item.id)}>+</button>
                  </div>
                  <button
                    className="remove_btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart_right">
          <div className="subtotal_box">
            <h3>
              Subtotal ({cart.reduce((acc, item) => acc + item.qty, 0)} items):{" "}
              <strong>
                <CurrencyFormat amount={calculateTotal()} />
              </strong>
            </h3>
            <label className="gift_option">
              <input type="checkbox" /> This order contains a gift
            </label>
            <button className="checkout_btn">Proceed to Checkout</button>
          </div>
        </div>
      </div>
    </LayOut>
  );
}

export default Cart;
