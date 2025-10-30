import React from "react";

export default function DateSelector({
  dates,
  date,
  setDate,
  setTime,
  setError,
}) {
  return (
    <div className="mt-6">
      <h4 className="font-semibold">Choose date</h4>
      <div className="flex gap-3 mt-3 flex-wrap">
        {dates.map((s) => (
          <button
            key={s.date}
            onClick={() => {
              setDate(s.date);
              setTime("");
              setError("");
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
  );
}
