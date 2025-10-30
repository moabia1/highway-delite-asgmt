import React from "react";
import { Link } from "react-router-dom";

export default function ExperienceCard({ exp }) {
  return (
    <div className="bg-gray-50 rounded-xl shadow hover:shadow-md transition flex flex-col h-full">
      {/* Image */}
      <img
        src={exp.image}
        className="w-full h-44 object-cover rounded-t-xl"
        alt={exp.title}
      />

      {/* Card Content */}
      <div className="flex flex-col justify-between flex-1 p-4">
        {/* Title & Location */}
        <div>
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-semibold text-lg leading-tight line-clamp-2">
              {exp.title}
            </h3>
            <span className="text-xs font-medium bg-gray-200 px-2 py-1 rounded whitespace-nowrap">
              {exp.location}
            </span>
          </div>

          {/* Description with fixed height */}
          <p className="text-sm text-gray-500 mt-2 line-clamp-3 min-h-12">
            {exp.description}
          </p>
        </div>

        {/* Price & Button Section */}
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm">
            From{" "}
            <span className="font-semibold text-lg text-gray-800">
              ₹{exp.basePrice}
            </span>
          </div>
          <Link
            to={`/details/${exp._id}`}
            className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-lg text-sm font-semibold text-center transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
