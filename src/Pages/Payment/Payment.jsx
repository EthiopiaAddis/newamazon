// src/Pages/Payment.jsx
import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { axiosInstance } from "../../API/axios";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../components/Dataprovider/DataProvider";
import "./Payment.css"; // 👈 Import custom CSS

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
        const response = await axiosInstance.post(
          `/payments/create?total=${Math.floor(total)}`
        );
        setClientSecret(response.data.clientSecret);
      } catch (err) {
        console.error("Error fetching client secret", err);
      }
    };

    if (cart.length > 0) {
      getClientSecret();
    }
  }, [cart, total]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

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

      dispatch({
        type: "ADD_ORDERS",
        payload: {
          items: cart,
          timestamp: new Date().toISOString(),
          total: total / 100,
        },
      });

      dispatch({ type: "CLEAR_CART" });
      navigate("/orders");
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
      {succeeded && <p className="payment__success">Payment succeeded! 🎉</p>}
    </div>
  );
};

export default Payment;
