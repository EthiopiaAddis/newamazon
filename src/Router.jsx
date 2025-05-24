import React from "react";
import { Routes, Route } from "react-router-dom";

import Landing from "./Pages/Landing/Landing";
import Result from "./Pages/Results/Results";
import Signup from "./Pages/Auth/SignUp"; // make sure this path matches your folder/files
import ProductDetail from "./Pages/ProductDetail/ProductDetail"; // if you have this page
import Cart from "./Pages/Cart/Cart";
import Orders from "./Pages/Orders/Orders";
import Payment from "./Pages/Payment/Payment";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/category/:catagoryName" element={<Result />} />
      <Route path="/signup" element={<Signup />} /> {/* signup route */}
      <Route path="/product/:productId" element={<ProductDetail />} />{" "}
      {/* product detail route */}
      <Route path="/cart" element={<Cart />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/payment" element={<Payment />} />
    </Routes>
  );
};

export default Router;
