import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const internships = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    company: "Valeo",
    duration: "3 Months",
    paid: true,
    expectedSalary: "$1,200 - $2,000/month",
    requiredSkills: ["React", "JavaScript", "HTML/CSS", "Redux"],
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
    requiredSkills: ["Python", "Machine Learning", "Pandas", "SQL"],
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
    expectedSalary: "$1,500 - $2,500/month",
    requiredSkills: ["React Native", "iOS/Android", "JavaScript", "Firebase"],
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
      <div className="p-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Internship not found</h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-[#00D6A0] underline font-medium"
        >
          ← Go back
        </button>
      </div>
    );
  }

  const handleApplyClick = () => {
    navigate(`/student/apply/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto mt-10 px-6"
      >
        <div className="bg-white rounded-2xl shadow-md p-10">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 text-[#00D6A0] underline font-medium"
          >
            ← Back to List
          </button>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">{internship.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg text-gray-700">
            <p><strong>🏢 Company:</strong> {internship.company}</p>
            <p><strong>💼 Industry:</strong> {internship.industry}</p>
            <p><strong>📍 Location:</strong> {internship.location}</p>
            <p><strong>⏱️ Duration:</strong> {internship.duration}</p>
            <p><strong>💰 Paid:</strong> {internship.paid ? "Yes" : "No"}</p>
            {internship.paid && (
              <p><strong>💵 Expected Salary:</strong> {internship.expectedSalary}</p>
            )}
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">📄 Description</h3>
            <p className="text-gray-600">{internship.description}</p>
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">🛠️ Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {internship.requiredSkills.map((skill, index) => (
                <span 
                  key={index} 
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={handleApplyClick}
            className="mt-10 w-full py-3 bg-gradient-to-r from-[#00D6A0] to-[#2b7de9] text-white rounded-full font-semibold shadow hover:shadow-lg transition-all"
          >
            Apply for this Internship
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default InternshipDetailsPage;