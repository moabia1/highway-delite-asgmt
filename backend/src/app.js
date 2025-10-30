const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
require("dotenv").config();

const experienceRoutes = require("./routes/experiences");
const bookingRoutes = require("./routes/bookings");
const promoRoutes = require("./routes/promo");

const app = express();
app.use(cors({
  origin: "http://localhost:5173"
}));
app.use(express.json());

app.use("/api/experiences", experienceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/promo", promoRoutes);

// connect DB
connectDB().catch((err) => console.error(err));

module.exports = app;
