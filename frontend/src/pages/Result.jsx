import React from "react";
import { useLocation, Link } from "react-router-dom";

export default function Result() {
  const loc = useLocation();
  const state = loc.state || {};
  if (state.success) {
    return (
      <div className="text-center py-20">
        <div className="mx-auto w-20 h-20 rounded-full bg-green-500 flex items-center justify-center text-white text-3xl">
          ✓
        </div>
        <h2 className="text-2xl mt-6">Booking Confirmed</h2>
        <div className="text-gray-600 mt-2">
          Ref ID: {state.booking?._id?.slice(-6).toUpperCase()}
        </div>
        <Link
          to="/"
          className="mt-6 inline-block bg-gray-200 px-4 py-2 rounded"
        >
          Back to Home
        </Link>
      </div>
    );
  } else {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl text-red-500">Booking Failed</h2>
        <p className="mt-3">{state.message || "Something went wrong"}</p>
        <Link
          to="/"
          className="mt-6 inline-block bg-gray-200 px-4 py-2 rounded"
        >
          Back to Home
        </Link>
      </div>
    );
  }
}
