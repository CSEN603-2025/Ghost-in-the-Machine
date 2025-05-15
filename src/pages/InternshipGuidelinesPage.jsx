// src/pages/InternshipGuidelinesPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const videoByMajor = {
  "Computer Engineering": "YnTEXW7RaYY",
  Business:               "YnTEXW7RaYY",
  Pharmacy:               "YnTEXW7RaYY",
  Management:             "YnTEXW7RaYY",
};

const fallbackVideoId = "YnTEXW7RaYY";

export default function InternshipGuidelinesPage() {
  const navigate = useNavigate();
  const [major, setMajor] = useState("Computer Engineering");
  const videoId = videoByMajor[major] || fallbackVideoId;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-12">
      {/* Hero Navbar */}
      <div className="w-full bg-[#00106A]/90 backdrop-blur-md border-b border-white/10 py-4 px-6 flex items-center justify-between sticky top-0 z-50">
        <div className="w-1/3" />
        <h1 className="w-1/3 text-center text-2xl font-bold text-white">Internship Guidelines</h1>
        <div className="w-1/3 flex justify-end space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-gradient-to-r from-[#00F0B5] to-[#00D6A0] text-black font-semibold px-4 py-2 rounded-full shadow hover:shadow-lg transition-all"
          >
            ← Back
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 pt-10 space-y-8">
        {/* Major selector */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Select Your Major</label>
          <select
            value={major}
            onChange={e => setMajor(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00D6A0]/50"
          >
            {Object.keys(videoByMajor).map(mj => (
              <option key={mj} value={mj}>{mj}</option>
            ))}
          </select>
        </div>

        {/* 16:9 Responsive Video */}
        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="Internship Guidelines Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
