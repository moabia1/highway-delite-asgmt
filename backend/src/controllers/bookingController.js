const Booking = require("../models/Booking");
const Experience = require("../models/Experience");
const mongoose = require("mongoose");

/*
Basic booking flow:
1. Validate request body
2. Check slot capacity in Experience -> find slot with date & time
3. If remaining capacity >= qty, create booking and update sold count
4. Respond with booking confirmation
*/

exports.createBooking = async (req, res) => {
  const { experienceId, name, email, date, time, qty = 1, promo } = req.body;
  if (!experienceId || !name || !email || !date || !time) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const exp = await Experience.findById(experienceId).session(session);
    if (!exp) throw new Error("Experience not found");

    // find the slot & time
    const slot = exp.slots.find((s) => s.date === date);
    if (!slot) throw new Error("Date not available");

    const timeObj = slot.times.find((t) => t.time === time);
    if (!timeObj) throw new Error("Time not available");

    const remaining = (timeObj.capacity || 1) - (timeObj.sold || 0);
    if (remaining < qty) throw new Error("Not enough slots available");

    // price calc
    const subtotal = (timeObj.price || exp.basePrice) * qty;
    const taxes = Math.round(subtotal * (exp.taxPercent / 100));
    const total = subtotal + taxes;

    // create booking
    const booking = await Booking.create(
      [
        {
          experience: experienceId,
          name,
          email,
          date,
          time,
          qty,
          subtotal,
          taxes,
          total,
          promoApplied: promo || null,
        },
      ],
      { session }
    );

    // increment sold count
    timeObj.sold = (timeObj.sold || 0) + qty;
    await exp.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.json({ success: true, booking: booking[0] });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({ success: false, message: err.message });
  }
};
