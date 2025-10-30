import React from "react";
import QuantitySelector from "./QuantitySelector";

export default function BookingCard({
  exp,
  qty,
  setQty,
  subtotal,
  taxes,
  total,
  time,
  date,
  onConfirm,
  error,
}) {
  return (
    <div className="bg-gray-100 rounded-xl shadow p-4 h-fit mt-5">
      {/*  Base Price */}
      <div className="flex justify-between">
        <div>Starts at</div>
        <div className="text-md font-medium">₹{exp.basePrice}</div>
      </div>

      {/*  Quantity */}
      <div className="mt-2 flex justify-between items-center">
        <div>Quantity</div>
        <QuantitySelector qty={qty} setQty={setQty} />
      </div>

      {/*  Price Summary */}
      <div className="flex justify-between mt-2">
        <div>Subtotal</div>
        <div>₹{subtotal}</div>
      </div>
      <div className="flex justify-between mt-2">
        <div>Taxes</div>
        <div>₹{taxes}</div>
      </div>

      {/*  Total */}
      <div className="border-t my-3 border-gray-400"></div>
      <div className="flex justify-between font-semibold">
        <div>Total</div>
        <div>₹{total}</div>
      </div>

      {/* Confirm Button */}
      <button
        onClick={onConfirm}
        className={`mt-4 w-full py-2 rounded ${
          time && date ? "bg-yellow-400" : "bg-gray-300"
        }`}
      >
        Confirm
      </button>

      {/*  Error Message */}
      {error && (
        <div className="text-red-600 text-sm mt-2 text-center">{error}</div>
      )}
    </div>
  );
}
