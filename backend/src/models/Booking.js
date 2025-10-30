const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  experience: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Experience",
    required: true,
  },
  name: String,
  email: String,
  date: String,
  time: String,
  qty: { type: Number, default: 1 },
  subtotal: Number,
  taxes: Number,
  total: Number,
  promoApplied: { code: String, discount: Number },
  createdAt: { type: Date, default: Date.now },
});

// To help avoid two bookings occupying same slot beyond capacity, we can create a compound index:
BookingSchema.index({ experience: 1, date: 1, time: 1 });

module.exports = mongoose.model("Booking", BookingSchema);
