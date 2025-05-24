import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { producturl } from "../../API/endpoint";
import LayOut from "../../components/LayOut/LayOut";
import "./Results.css";

const Result = () => {
  const { catagoryName } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${producturl}/products/category/${catagoryName}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching category products:", err));
  }, [catagoryName]);

  return (
    <LayOut>
      <div className="result-page">
        <h2 style={{ margin: "20px" }}>Category: {catagoryName}</h2>
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.title} height="150" />
              <h4>{product.title}</h4>
              <p>${product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </LayOut>
  );
};

export default Result;
