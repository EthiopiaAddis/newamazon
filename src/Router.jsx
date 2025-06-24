import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import Cart from "./Pages/Cart/Cart.jsx";
import Orders from "./Pages/Orders/Orders";
import Payment from "./Pages/Payment/Payment";
import Auth from "./Pages/Auth/SignUp";
import Product from "./components/Product/Product";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.js";
import Catagory from "./components/Catagory/Catagory.js"; // <-- Your unified category component

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<Auth />} />

      {/* PROTECTED ROUTES */}
      <Route
        path="/cart"
        element={
          <ProtectedRoute message="You must sign in to view your cart.">
            <Cart />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute message="Please sign in to view your orders.">
            <Orders />
          </ProtectedRoute>
        }
      />
      <Route
        path="/payment"
        element={
          <ProtectedRoute message="Sign in to continue to payment.">
            <Payment />
          </ProtectedRoute>
        }
      />

      {/* PUBLIC ROUTES */}
      <Route path="/category" element={<Catagory />} />
      <Route path="/category/:title" element={<Catagory />} />
      <Route path="/product/:id" element={<Product />} />
    </Routes>
  );
};

export default Router;
