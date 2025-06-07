const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Load environment variables

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Use Stripe secret key

const app = express();

// Middleware
app.use(cors({ origin: true }));
app.use(express.json());

// Test endpoint
app.get("/", (req, res) => {
  res.send("🔥 Hello from Firebase Payment API");
});

// Stripe payment intent endpoint
app.post("/payments/create", async (req, res) => {
  const total = req.body.total; // Total amount in cents
  logger.info(`💰 Payment request received for amount >>> $${total}`);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });

    // Send the client secret to the frontend
    res.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    logger.error("Stripe error:", error);
    res.status(400).send({ error: error.message });
  }
});

// Export the function
exports.api = onRequest(app);
