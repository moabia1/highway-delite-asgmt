import React from "react";

export default function QuantitySelector({ qty, setQty }) {
  return (
    <div className="flex items-center gap-1 justify-center">
      <button
        className="flex items-center justify-center"
        onClick={() => setQty(Math.max(1, qty - 1))}
      >
        <span className="border border-gray-400 px-1">-</span>
      </button>
      <div>{qty}</div>
      <button
        className="flex items-center justify-center"
        onClick={() => setQty(qty + 1)}
      >
        <span className="border border-gray-400 px-1">+</span>
      </button>
    </div>
  );
}
