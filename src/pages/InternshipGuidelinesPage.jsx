import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Define video URLs for different majors (all now point to the new video)
const videoByMajor = {
  "Computer Engineering": "YnTEXW7RaYY", // Updated with the new video ID
  "Business": "YnTEXW7RaYY", // Updated with the new video ID
  "Pharmacy": "YnTEXW7RaYY", // Updated with the new video ID
  "Management": "YnTEXW7RaYY", // Updated with the new video ID
};

// Fallback video ID (if the specific video is unavailable)
const fallbackVideoId = "YnTEXW7RaYY"; // This is the fallback to the new video ID

const InternshipGuidelinesPage = () => {
  // State to track selected major
  const [major, setMajor] = useState("Computer Engineering");

  // Get the video for the specific major, or fallback to a general video if not available
  const videoId = videoByMajor[major] || fallbackVideoId;

  const navigate = useNavigate();

  const handleMajorChange = (event) => {
    setMajor(event.target.value);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
        📹 Internship Guidelines Video
      </h2>

      {/* Major selection dropdown */}
      <select
        value={major}
        onChange={handleMajorChange}
        style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc", marginBottom: "20px" }}
      >
        <option value="Computer Engineering">Computer Engineering</option>
        <option value="Business">Business</option>
        <option value="Pharmacy">Pharmacy</option>
        <option value="Management">Management</option>
      </select>

      {/* Video Section */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="Internship Guidelines Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Button to navigate back to the previous page */}
      <button
        onClick={() => navigate(-1)} // This will take you back to the previous page
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#4CAF50",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          textAlign: "center",
        }}
      >
        Back
      </button>
    </div>
  );
};

export default InternshipGuidelinesPage;
