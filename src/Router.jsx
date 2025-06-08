import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import Cart from "./Pages/Cart/Cart.jsx";
import Orders from "./Pages/Orders/Orders";
import Payment from "./Pages/Payment/Payment";
import Auth from "./Pages/Auth/SignUp";
import Product from "./components/Product/Product";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/signup" element={<Auth />} />

      {/* Category route uses Product component */}
      <Route path="/category/:title" element={<Product />} />

      {/* Product detail route */}
      <Route path="/product/:id" element={<Product />} />
    </Routes>
  );
};

export default Router;
