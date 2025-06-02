import React from "react";
import { FadeLoader } from "react-spinners";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader-container">
      <FadeLoader color="#36d7b7" />
    </div>
  );
};

export default Loader;
