import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/api";
import { ArrowLeft, Loader } from "lucide-react";

import DateSelector from "../components/DateSelector";
import TimeSelector from "../components/TimeSelector";
import BookingCard from "../components/BookingCard";

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

  if (!exp)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

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
      setTimeout(() => setError(""), 3000);
      return;
    }
    setError("");
    navigate("/checkout", {
      state: { experience: exp, date, time, qty, subtotal, taxes, total },
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative mx-8">
      {/* LEFT SIDE */}
      <div className="lg:col-span-2">
        {/* Header */}
        <div
          className="flex items-center gap-1 cursor-pointer text-gray-800 text-md font-medium mb-3 -mt-3"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={20} />
          <span>Details</span>
        </div>

        {/*  Image */}
        <img
          src={exp.image}
          className="w-full h-85 object-cover rounded-lg mb-5"
          alt={exp.title}
        />

        {/* Title & Description */}
        <h2 className="text-2xl font-semibold">{exp.title}</h2>
        <p className="text-gray-500 mt-2">{exp.description}</p>

        {/*  Date & Time Selection */}
        <DateSelector
          dates={dates}
          date={date}
          setDate={setDate}
          setTime={setTime}
          setError={setError}
        />
        <TimeSelector
          dates={dates}
          date={date}
          time={time}
          setTime={setTime}
          setError={setError}
        />

        {/* ℹ️ About */}
        <div className="mt-6">
          <h4 className="font-semibold">About</h4>
          <p className="text-gray-500 bg-gray-200 mt-2 px-3 py-2 rounded-md">
            Scenic routes, trained guides, and safety briefing. Minimum age 10.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE CARD */}
      <BookingCard
        exp={exp}
        qty={qty}
        setQty={setQty}
        subtotal={subtotal}
        taxes={taxes}
        total={total}
        time={time}
        date={date}
        onConfirm={onConfirm}
        error={error}
      />
    </div>
  );
}
