import React from "react";
import { Link } from "react-router-dom";

export default function ExperienceCard({ exp }) {
  return (
    <div className="bg-gray-50 rounded-xl shadow hover:shadow-md transition w-full">
      <img
        src={exp.image}
        className="w-full h-40 sm:h-44 object-cover rounded-t-xl"
        alt={exp.title}
      />
      <div className="p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
          <h3 className="font-semibold text-base sm:text-lg leading-tight">
            {exp.title}
          </h3>
          <span className="text-xs font-medium bg-gray-200 px-2 py-1 rounded w-fit self-start">
            {exp.location}
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-2 line-clamp-3">
          {exp.description}
        </p>
        <div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <div className="font-normal text-sm sm:text-base">
            From{" "}
            <span className="font-semibold text-lg sm:text-xl text-gray-800">
              ₹{exp.basePrice}
            </span>
          </div>
          <Link
            to={`/details/${exp._id}`}
            className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1.5 rounded-lg text-sm sm:text-md font-semibold text-center w-full sm:w-auto transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
