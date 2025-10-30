const mongoose = require("mongoose");

const SlotSchema = new mongoose.Schema({
  date: String, // e.g. "2025-10-22"
  times: [
    {
      time: String, // "09:00 am"
      capacity: Number,
      price: Number,
      sold: { type: Number, default: 0 },
    },
  ],
});

const ExperienceSchema = new mongoose.Schema({
  title: String,
  slug: String,
  location: String,
  description: String,
  image: String,
  basePrice: Number,
  taxPercent: { type: Number, default: 6 },
  slots: [SlotSchema],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Experience", ExperienceSchema);
