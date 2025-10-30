import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/api";

export default function Details() {
  const { id } = useParams();
  const [exp, setExp] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/experiences/${id}`)
      .then((r) => setExp(r.data.experience))
      .catch(() => {});
  }, [id]);

  if (!exp) return <div>Loading...</div>;

  const dates = exp.slots || [];

  const currentPrice = () => {
    const slot = dates.find((s) => s.date === date);
    const t = slot?.times.find((tt) => tt.time === time);
    return t?.price || exp.basePrice;
  };

  const subtotal = currentPrice() * qty || exp.basePrice * qty;
  const taxes = Math.round(subtotal * (exp.taxPercent / 100));
  const total = subtotal + taxes;

  const onConfirm = () => {
    if (!date || !time) {
      setError("⚠️ Please select both date and time before continuing.");
      setTimeout(() => setError(""), 3000); // clear after 3s
      return;
    }
    setError("");
    navigate("/checkout", {
      state: { experience: exp, date, time, qty, subtotal, taxes, total },
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <img
          src={exp.image}
          className="w-full h-85 object-cover rounded-lg"
          alt={exp.title}
        />
        <h2 className="text-2xl font-semibold mt-4">{exp.title}</h2>
        <p className="text-gray-500 mt-2">{exp.description}</p>

        <div className="mt-6">
          <h4 className="font-semibold">Choose date</h4>
          <div className="flex gap-3 mt-3 flex-wrap">
            {dates.map((s) => (
              <button
                key={s.date}
                onClick={() => {
                  setDate(s.date);
                  setTime("");
                  setError(""); // clear error if user selects
                }}
                className={`px-3 py-2 rounded ${
                  date === s.date
                    ? "bg-yellow-400 text-black"
                    : "border-2 border-gray-300"
                }`}
              >
                {s.date}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h4 className="font-semibold">Choose time</h4>
          <div className="flex gap-3 mt-3 flex-wrap">
            {date ? (
              dates
                .find((s) => s.date === date)
                .times.map((t) => (
                  <button
                    key={t.time}
                    onClick={() => {
                      if (t.capacity - (t.sold || 0) <= 0) return;
                      setTime(t.time);
                      setError("");
                    }}
                    className={`px-3 py-2 rounded ${
                      time === t.time
                        ? "bg-yellow-400 text-black"
                        : "border-2 border-gray-300"
                    } ${
                      t.capacity - (t.sold || 0) <= 0
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {t.time}
                    {t.capacity - (t.sold || 0) <= 0 ? (
                      <span className="ml-2 text-xs text-gray-400">
                        Sold out
                      </span>
                    ) : (
                      <span className="ml-2 text-xs text-red-600">
                        {t.capacity - (t.sold || 0)} left
                      </span>
                    )}
                  </button>
                ))
            ) : (
              <div className="text-gray-500">Select date first</div>
            )}
          </div>
        </div>

        <div className="mt-6">
          <h4 className="font-semibold">About</h4>
          <p className="text-gray-500 bg-gray-200 mt-2 px-3 py-2 rounded-md">
            Scenic routes, trained guides, and safety briefing. Minimum age 10.
          </p>
        </div>
      </div>

      <div className="bg-gray-100 rounded-xl shadow p-4 h-fit">
        <div className="flex justify-between">
          <div>Starts at</div>
          <div className="text-md font-medium">₹{exp.basePrice}</div>
        </div>

        <div className="mt-2 flex justify-between items-center">
          <div>Quantity</div>
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
        </div>

        <div className="flex justify-between mt-2">
          <div>Subtotal</div>
          <div>₹{subtotal}</div>
        </div>
        <div className="flex justify-between mt-2">
          <div>Taxes</div>
          <div>₹{taxes}</div>
        </div>

        <div className="border-t my-3 border-gray-400"></div>
        <div className="flex justify-between font-semibold">
          <div>Total</div>
          <div>₹{total}</div>
        </div>

        <button
          onClick={onConfirm}
          className={`mt-4 w-full py-2 rounded ${
            time && date ? "bg-yellow-400" : "bg-gray-300"
          }`}
        >
          Confirm
        </button>

        {error && (
          <div className="text-red-600 text-sm mt-2 text-center">{error}</div>
        )}
      </div>
    </div>
  );
}
