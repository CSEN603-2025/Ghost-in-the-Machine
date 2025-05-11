// src/pages/MyApplicationsPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const hardcodedInternships = [
  { id: 1, title: "Frontend Developer Intern", company: "TechCorp", duration: "3 Months", status: "accepted" },
  { id: 2, title: "Data Analyst Intern", company: "DataWorks", duration: "6 Months", status: "rejected" },
  { id: 3, title: "Backend Intern", company: "Valeo", duration: "2 Months", status: "finalized" },
  { id: 4, title: "UI/UX Design Intern", company: "Creative Design Studio", duration: "4 Months", status: "pending" },
];

const statusStyles = {
  accepted:    { bg: "bg-green-100", text: "text-green-800" },
  rejected:    { bg: "bg-red-100",   text: "text-red-800"   },
  finalized:   { bg: "bg-blue-100",  text: "text-blue-800"  },
  pending:     { bg: "bg-yellow-100",text: "text-yellow-800"},
};

export default function MyApplicationsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Top Navbar */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full bg-[#00106A]/90 backdrop-blur-md border-b border-white/10 py-4 px-6 flex items-center justify-between sticky top-0 z-50"
      >
        <button
          onClick={() => navigate(-1)}
          className="text-white font-semibold hover:text-gray-200"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold text-white/90">My Applications</h1>
        <div /> {/* spacer */}
      </motion.div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Grid of Application Cards */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {hardcodedInternships.map(app => (
            <motion.div
              key={app.id}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1 }
              }}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
              className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden cursor-pointer transition-all duration-300"
            >
              {/* top accent bar */}
              <div
                className={`h-2 w-full ${
                  statusStyles[app.status]?.bg || "bg-gray-200"
                }`}
              />
              <div className="p-6 flex flex-col h-full">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{app.title}</h2>
                <p className="text-gray-600 mb-1"><strong>Company:</strong> {app.company}</p>
                <p className="text-gray-600 mb-4"><strong>Duration:</strong> {app.duration}</p>
                <div className="mt-auto flex items-center justify-between">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      statusStyles[app.status]?.bg + " " + statusStyles[app.status]?.text
                    }`}
                  >
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </span>
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="text-[#00D6A0] font-medium flex items-center"
                  >
                    Details
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {hardcodedInternships.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500">You have no applications yet.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
