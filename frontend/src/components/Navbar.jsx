import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const loc = useLocation();

  const isHome = loc.pathname === "/";

  const onSearch = (e) => {
    e.preventDefault();
    if (!isHome) return; // 🚫 disable search when not on home
    navigate(`/?q=${encodeURIComponent(q)}`);
  };

  return (
    <nav className="bg-white shadow py-4 w-full">
      <div className="max-w-screen mx-auto px-4 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3">
        {/* --- Logo + Brand --- */}
        <Link to="/" className="flex items-center shrink-0">
          <div className="h-10 w-10 ml-4 rounded-full flex items-center justify-center font-bold overflow-hidden">
            <img
              src="/logo-bi.png"
              alt="BookIt Logo"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="text-lg font-semibold">BookIt</div>
        </Link>

        {/* --- Search Form --- */}
        <form
          onSubmit={onSearch}
          className="flex items-center gap-2 w-full sm:w-auto"
        >
          <input
            value={isHome ? q : ""} // 🔹 clear text when not home
            onChange={(e) => isHome && setQ(e.target.value)} // 🔹 block typing when not home
            placeholder={isHome ? "Search experiences" : ""} // 🔹 remove placeholder when not home
            className="px-4 py-2 rounded-lg shadow-sm bg-gray-200 focus:outline-none w-full sm:w-72"
          />
          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded font-semibold transition whitespace-nowrap"
          >
            Search
          </button>
        </form>
      </div>
    </nav>
  );
}
