import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { producturl } from "../../API/endpoint";
import LayOut from "../../components/LayOut/LayOut";
import ProductCard from "../../components/Product/ProductCard";
import Loader from "../../components/Loader/Loader"; // import your Loader here
import "./Results.css";

const Result = () => {
  const { catagoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // loading state

  useEffect(() => {
    setIsLoading(true); // start loader before fetch

    axios
      .get(`${producturl}/products/category/${catagoryName}`)
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false); // stop loader after fetch success
      })
      .catch((err) => {
        console.error("Error fetching category products:", err);
        setIsLoading(false); // stop loader even on error
      });
  }, [catagoryName]);

  return (
    <LayOut>
      <div className="result-page">
        <h2 style={{ margin: "20px" }}>Category: {catagoryName}</h2>

        {isLoading ? (
          <Loader /> // show loader while loading
        ) : (
          <div className="product-grid">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p>No products found in this category.</p>
            )}
          </div>
        )}
      </div>
    </LayOut>
  );
};

export default Result;
