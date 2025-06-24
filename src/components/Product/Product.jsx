import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import Loader from "../Loader/Loader";
import LayOut from "../LayOut/LayOut";
import "./Product.css";

const Product = () => {
  const { id } = useParams(); // get product id from URL
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    if (id) {
      // Fetch single product by id
      axios
        .get(`https://fakestoreapi.com/products/${id}`)
        .then((res) => {
          setProducts([res.data]); // wrap single product in array for mapping
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
        });
    } else {
      // Fetch all products
      axios
        .get("https://fakestoreapi.com/products")
        .then((res) => {
          setProducts(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
        });
    }
  }, [id]);

  return (
    <LayOut>
      <div className="product_container">
        {isLoading ? (
          <Loader />
        ) : products.length === 0 ? (
          <p>No product found.</p>
        ) : (
          products.map((product) => (
            <ProductCard key={product.id} product={product} singleView={!!id} />
          ))
        )}
      </div>
    </LayOut>
  );
};

export default Product;
