import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import API from "../utils/api";
import {Loader} from "lucide-react"
  
import ExperienceCard from "../components/ExperienceCard";

export default function Home() {
  const [exps, setExps] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    API.get("/experiences")
      .then((r) => setExps(r.data.experiences))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const queryParams = new URLSearchParams(location.search);
  const q = queryParams.get("q")?.toLowerCase() || "";

  const filteredExps = exps.filter(
    (e) =>
      e.title.toLowerCase().includes(q) ||
      e.location.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q)
  );

  return (
    <div className="min-h-screen bg-white w-full overflow-x-hidden">
      <div className="max-w-full mx-auto px-2 sm:px-4 py-5">
        {filteredExps.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredExps.map((e) => (
              <ExperienceCard key={e._id} exp={e} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-10">
            {loading ? <Loader className='size-10 animate-spin'/> : ""}
          </div>
        )}
      </div>
    </div>
  );
}
