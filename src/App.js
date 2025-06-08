import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { DataProvider } from "./components/Dataprovider/DataProvider";
import Router from "./Router";

// Load Stripe with your PUBLIC key
const stripePromise = loadStripe(
  "pk_test_51RVhP9AiTj6b3ZzhDiDQE7N3gILoL3JMGhCSmf2XpugtBRyBuD3ppdMuo5QteYOqnOO4ojXVRd010YFwyVWFAHhN00Xkv6zbAU"
);

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Elements stripe={stripePromise}>
          <Router />
        </Elements>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
