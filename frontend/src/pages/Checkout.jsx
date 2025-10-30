import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../utils/api";

export default function Checkout() {
  const loc = useLocation();
  const navigate = useNavigate();
  const init = loc.state || {};
  const [name, setName] = useState(init.name || "");
  const [email, setEmail] = useState(init.email || "");
  const [promo, setPromo] = useState("");
  const [promoInfo, setPromoInfo] = useState(null);
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");

  const {
    experience,
    date,
    time,
    qty,
    subtotal: initSub,
    taxes: initTaxes,
    total: initTotal,
  } = init;

  const subtotal = initSub || experience?.basePrice * (qty || 1);
  const taxes =
    initTaxes || Math.round(subtotal * (experience?.taxPercent / 100 || 0));
  const total = promoInfo
    ? subtotal + taxes - (promoInfo.discount || 0)
    : subtotal + taxes;

  const applyPromo = async () => {
    try {
      const r = await API.post(`/promo/validate`, { code: promo, subtotal });
      if (r.data.valid) setPromoInfo(r.data);
      else setPromoInfo({ invalid: true });
    } catch {
      setPromoInfo({ invalid: true });
    }
  };

  const validateEmail = (email) => {
    // Basic email regex validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const onPay = async () => {
    setError("");

    if (!name.trim()) {
      setError("Please enter your full name");
      return;
    }
    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!agree) {
      setError("You must agree to the terms and safety policy");
      return;
    }

    try {
      const payload = {
        experienceId: experience._id,
        name,
        email,
        date,
        time,
        qty,
        promo: promoInfo?.code
          ? { code: promoInfo.code, discount: promoInfo.discount }
          : null,
      };
      const r = await API.post("/bookings", payload);
      if (r.data.success) {
        navigate("/result", {
          state: { success: true, booking: r.data.booking },
        });
      } else {
        navigate("/result", {
          state: { success: false, message: r.data.message },
        });
      }
    } catch (err) {
      navigate("/result", {
        state: {
          success: false,
          message: err.response?.data?.message || err.message,
        },
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-gray-100 rounded-xl p-6 h-fit">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-500">Full name</label>
            <input
              className="w-full p-3 rounded bg-gray-200"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="text-sm text-gray-500">Email</label>
            <input
              className="w-full p-3 rounded bg-gray-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
            />
          </div>
        </div>

        <div className="mt-4 flex gap-2 items-center">
          <input
            className="flex-1 p-3 rounded bg-gray-200"
            placeholder="Promo code"
            value={promo}
            onChange={(e) => setPromo(e.target.value)}
          />
          <button
            onClick={applyPromo}
            className="px-5 py-3 bg-black text-white rounded-lg"
          >
            Apply
          </button>
        </div>

        {promoInfo?.invalid && (
          <div className="text-red-500 mt-2">Invalid promo</div>
        )}
        {promoInfo?.discount && (
          <div className="text-green-600 mt-2">
            Discount: ₹{promoInfo.discount}
          </div>
        )}

        {error && <div className="text-red-600 mt-3 font-medium">{error}</div>}

        <div className="mt-4 flex items-center">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
          <div className="ml-2 text-gray-500">
            I agree to the terms and safety policy
          </div>
        </div>
      </div>

      <div className="bg-gray-200 rounded-xl p-4">
        <div className="mt-1 text-gray-600 flex justify-between">
          <span>Experience</span>
          <div className="font-semibold text-black">{experience?.title}</div>
        </div>
        <div className="mt-1 flex justify-between text-gray-600">
          <div>Date</div>
          <div className="font-semibold text-black">{date}</div>
        </div>
        <div className="mt-1 flex justify-between text-gray-600">
          <div>Time</div>
          <div className="font-semibold text-black">{time}</div>
        </div>
        <div className="mt-1 flex justify-between text-gray-600">
          <div>Qty</div>
          <div className="font-medium text-black">{qty}</div>
        </div>

        <div className="mt-1 flex justify-between text-gray-600">
          <div>Subtotal</div>
          <div className="font-medium text-black">₹{subtotal}</div>
        </div>
        <div className="mt-1 flex justify-between text-gray-600">
          <div>Taxes</div>
          <div className="font-medium text-black">₹{taxes}</div>
        </div>
        {promoInfo?.discount && (
          <div className="flex justify-between text-green-600">
            <div>Promo</div>
            <div>-₹{promoInfo.discount}</div>
          </div>
        )}

        <div className="border-t my-3"></div>
        <div className="flex justify-between font-semibold">
          <div>Total</div>
          <div>₹{total}</div>
        </div>

        <button
          onClick={onPay}
          className="mt-4 bg-yellow-400 w-full py-2 rounded font-medium"
        >
          Pay and Confirm
        </button>
      </div>
    </div>
  );
}
