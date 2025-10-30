import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const onSearch = (e) => {
    e.preventDefault();
    navigate(`/?q=${encodeURIComponent(q)}`);
  };

  return (
    <nav className="bg-white shadow py-4 w-full">
      <div className="max-w-screen mx-auto px-4 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3">
        {/* --- Logo + Brand --- */}
        <Link to="/" className="flex items-center shrink-0">
          <div className="h-10 w-10 rounded-full flex items-center justify-center font-bold overflow-hidden">
            <img
              src="/logo-bi.png"
              alt="BookIt Logo"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="text-lg font-semibold ml-2">BookIt</div>
        </Link>

        {/* --- Search Form --- */}
        <form
          onSubmit={onSearch}
          className="flex items-center gap-2 w-full sm:w-auto"
        >
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search experiences"
            className="px-4 py-2 rounded-lg shadow-sm bg-gray-100 focus:outline-none w-full sm:w-72"
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
