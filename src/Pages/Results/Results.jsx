import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { producturl } from "../../API/endpoint";
import LayOut from "../../components/LayOut/LayOut";
import ProductCard from "../../components/Product/ProductCard";
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
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </LayOut>
  );
};

export default Result;
