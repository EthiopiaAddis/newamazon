import { Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import Result from "../src/Pages/Results/Results";
import SignUp from "./Pages/Auth/SignUp";
import Orders from "./Pages/Orders/Orders";
import Cart from "./Pages/Cart/Cart";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/category/:catagoryName" element={<Result />} />
      <Route path="/signin" element={<SignUp />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
};

export default Router;
