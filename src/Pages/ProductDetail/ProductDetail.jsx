import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { producturl } from "../../API/endpoint";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`${producturl}/products/${productId}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetching product detail:", err));
  }, [productId]);

  if (!product) return <p>Loading product...</p>;

  return (
    <div>
      <h2>{product.title}</h2>
      <img src={product.image} alt={product.title} height="200" />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      {/* add more detail display as needed */}
    </div>
  );
};

export default ProductDetail;
