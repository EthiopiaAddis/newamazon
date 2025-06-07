// src/Pages/Orders.jsx

import React from "react";
import LayOut from "../../components/LayOut/LayOut";
import { useStateValue } from "../../components/Dataprovider/DataProvider";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";

function Orders() {
  const [{ orders }] = useStateValue();

  return (
    <LayOut>
      <div style={{ padding: "1rem" }}>
        <h2>Your Orders</h2>
        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          orders.map((order, index) => (
            <div
              key={index}
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
                    {item.title} - Qty: {item.qty} -{" "}
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
