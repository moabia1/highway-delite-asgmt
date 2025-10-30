import React from "react";

export default function TimeSelector({ dates, date, time, setTime, setError }) {
  return (
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
                  <span className="ml-2 text-xs text-gray-400">Sold out</span>
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
  );
}
