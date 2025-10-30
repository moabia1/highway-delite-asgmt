const express = require("express");
const cors = require("cors");
const connectDB = require("./db/db");

const experienceRoutes = require("./routes/experiences");
const bookingRoutes = require("./routes/bookings");
const promoRoutes = require("./routes/promo");


// connect DB
connectDB();

const app = express();
app.use(
  cors({
    origin: "https://highway-delite-asgmt.vercel.app",
  })
);
app.use(express.json());

app.use("/api/experiences", experienceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/promo", promoRoutes);


module.exports = app;
