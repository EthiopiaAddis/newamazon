import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { categoryData } from "./CatagoryFullinfo";
import "./Caragory.css";
import "./CatagoryCard.css"; // for shared styles

const Catagory = () => {
  const { title } = useParams(); // category name
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      if (!title) return;
      setLoading(true);
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        const filtered = data.filter(
          (item) =>
            item.category.toLowerCase() ===
            decodeURIComponent(title).toLowerCase()
        );
        setProducts(filtered);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
      setLoading(false);
    };

    fetchCategoryProducts();
  }, [title]);

  // If no title param → show category cards
  if (!title) {
    return (
      <div className="cat-container">
        {categoryData.map((item, index) => (
          <div key={index} className="catagory-card">
            <a href={`/category/${item.title}`} className="catagory-card-link">
              <div className="catagory-title">{item.title}</div>
              <div className="catagory-image-wrapper">
                <img
                  src={item.image}
                  alt={item.title}
                  className="catagory-image"
                />
              </div>
              <div className="shop-now">Shop now</div>
            </a>
          </div>
        ))}
      </div>
    );
  }

  // If title exists → show filtered products
  return (
    <div style={{ padding: "1rem" }}>
      <h2>Category: {decodeURIComponent(title)}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>No products found for this category.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                width: "250px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "1rem",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={product.image}
                alt={product.title}
                style={{
                  width: "100px",
                  height: "120px",
                  objectFit: "contain",
                  marginBottom: "10px",
                }}
              />
              <h4
                style={{ fontSize: "16px", height: "48px", overflow: "hidden" }}
              >
                {product.title}
              </h4>
              <p style={{ fontWeight: "bold", margin: "0.5rem 0" }}>
                ${product.price}
              </p>
              <div>
                ⭐ {product.rating?.rate || 0} ({product.rating?.count || 0})
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Catagory;
