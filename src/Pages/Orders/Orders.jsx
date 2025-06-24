// src/Pages/Orders/Orders.jsx
import React, { useEffect, useState } from "react";
import LayOut from "../../components/LayOut/LayOut";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import { db } from "../../Utility/Firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useStateValue } from "../../components/Dataprovider/DataProvider";

function Orders() {
  const [{ user }] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      const ordersRef = collection(db, "users", user.uid, "orders");
      const q = query(ordersRef, orderBy("timestamp", "desc"));
      const snapshot = await getDocs(q);
      setOrders(snapshot.docs.map((doc) => doc.data()));
    };

    fetchOrders();
  }, [user]);

  // Helper to render star icons based on rating number
  const renderStars = (rate) => {
    const fullStars = Math.floor(rate);
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} role="img" aria-label="star" style={{ color: "#f5c518" }}>
          ⭐
        </span>
      );
    }
    return stars;
  };

  return (
    <LayOut>
      <div style={{ padding: "1rem" }}>
        <h2>Your Orders</h2>
        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              style={{
                marginBottom: "1.5rem",
                padding: "1rem",
                border: "1px solid #ddd",
                borderRadius: "8px",
              }}
            >
              <p>
                <strong>Date:</strong>{" "}
                {order.timestamp?.toDate
                  ? order.timestamp.toDate().toLocaleString()
                  : "Unknown date"}
              </p>
              <p>
                <strong>Total:</strong> <CurrencyFormat amount={order.total} />
              </p>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {order.items.map((item, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                        marginRight: "1rem",
                        borderRadius: "8px",
                      }}
                    />
                    <div>
                      <p style={{ margin: 0, fontWeight: "bold" }}>
                        {item.title} x{item.qty}
                      </p>
                      <p style={{ margin: 0 }}>
                        <strong>Price:</strong>{" "}
                        <CurrencyFormat amount={item.price} /> &nbsp;|&nbsp;{" "}
                        <strong>Rating:</strong>{" "}
                        {item.rating?.rate !== undefined
                          ? renderStars(item.rating.rate)
                          : "N/A"}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </LayOut>
  );
}

export default Orders;
