import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../components/Dataprovider/DataProvider";
import ClipLoader from "react-spinners/ClipLoader";
import { axiosInstance } from "../../API/axios";
import "./Payment.css";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      color: "#32325d",
      "::placeholder": {
        color: "#a0aec0",
      },
    },
    invalid: {
      color: "#fa755a",
    },
  },
};

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [{ cart, user }, dispatch] = useStateValue();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  const total =
    cart.reduce((acc, item) => acc + item.price * item.qty, 0) * 100;

  useEffect(() => {
    const getClientSecret = async () => {
      try {
        const response = await axiosInstance.post("/payments/create", {
          total: Math.floor(total),
        });
        setClientSecret(response.data.clientSecret);
      } catch (err) {
        console.error("Error fetching client secret:", err);
      }
    };

    if (cart.length > 0) {
      getClientSecret();
    }
  }, [cart, total]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      setError("Stripe has not loaded yet.");
      setProcessing(false);
      return;
    }

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user?.email,
        },
      },
    });

    if (payload.error) {
      setError(`Payment failed: ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);

      const newOrder = {
        id: `order_${Date.now()}`,
        items: cart.map((item) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          qty: item.qty,
          image: item.image,
        })),
        total: total / 100,
        status: "paid",
        paymentId: payload.paymentIntent.id,
        timestamp: new Date().toISOString(),
        email: user?.email,
      };

      dispatch({
        type: "ADD_ORDERS",
        payload: [newOrder],
      });

      dispatch({ type: "CLEAR_CART" });
      setTimeout(() => navigate("/orders"), 2000);
    }
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="payment">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit} className="payment__form">
        <CardElement
          options={CARD_ELEMENT_OPTIONS}
          onChange={handleChange}
          className="card-element"
        />
        <div className="payment__priceContainer">
          <h3>Order Total: ${(total / 100).toFixed(2)}</h3>
          <button
            disabled={processing || disabled || succeeded}
            type="submit"
            className="pay-now-btn"
          >
            {processing ? <ClipLoader size={20} color="#fff" /> : "Pay Now"}
          </button>
        </div>
        {error && <div className="payment__error">{error}</div>}
      </form>
      {succeeded && (
        <div className="payment__success">
          <p>Payment succeeded! 🎉</p>
          <p>Redirecting to your orders...</p>
        </div>
      )}
    </div>
  );
};

export default Payment;
