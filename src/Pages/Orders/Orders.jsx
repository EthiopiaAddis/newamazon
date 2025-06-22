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
                {new Date(order.timestamp).toLocaleString()}
              </p>
              <p>
                <strong>Total:</strong> <CurrencyFormat amount={order.total} />
              </p>
              <ul>
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.title} x{item.qty} —{" "}
                    <CurrencyFormat amount={item.price} />
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
