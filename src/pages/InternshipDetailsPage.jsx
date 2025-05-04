// src/pages/InternshipDetailsPage.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

// Internship data should match what you have in StudentDashboard
const internships = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    company: "Valeo",
    duration: "3 Months",
    paid: true,
    industry: "Technology",
    description: "Work with React to build modern UIs.",
    location: "Cairo",
  },
  {
    id: 2,
    title: "Data Science Intern",
    company: "IBM",
    duration: "2 Months",
    paid: false,
    industry: "Technology",
    description: "Analyze business data and trends using AI tools.",
    location: "Cairo",
  },
  {
    id: 3,
    title: "Mobile App Developer Intern",
    company: "Instabug",
    duration: "3 Months",
    paid: true,
    industry: "Technology",
    description: "Develop and test mobile applications.",
    location: "Giza",
  },
];

const InternshipDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const internship = internships.find((i) => i.id === parseInt(id));

  if (!internship) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-semibold">Internship not found</h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-blue-600 underline"
        >
          Go back
        </button>
      </div>
    );
  }

  const handleApplyClick = () => {
    navigate(`/student/apply/${id}`); // Navigate to the ApplicationPage
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 underline"
      >
        ← Back to List
      </button>
      <h2 className="text-2xl font-bold mb-2">{internship.title}</h2>
      <p className="text-gray-600 mb-1"><strong>Company:</strong> {internship.company}</p>
      <p className="text-gray-600 mb-1"><strong>Industry:</strong> {internship.industry}</p>
      <p className="text-gray-600 mb-1"><strong>Location:</strong> {internship.location}</p>
      <p className="text-gray-600 mb-3"><strong>Duration:</strong> {internship.duration}</p>
      <p className="text-gray-600 mb-3"><strong>Paid:</strong> {internship.paid ? "Yes" : "No"}</p>
      <p className="text-gray-800 mb-4">{internship.description}</p>

      <button 
        onClick={handleApplyClick} 
        className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Apply for this Internship
      </button>
    </div>
  );
};

export default InternshipDetailsPage;
