// src/pages/MyApplicationsPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const hardcodedInternships = [
  { id: 1, title: "Frontend Developer Intern", company: "TechCorp", duration: "3 Months", status: "accepted", startDate: "2025-01-01", endDate: "2025-04-01" },
  { id: 2, title: "Data Analyst Intern", company: "DataWorks", duration: "6 Months", status: "rejected", startDate: "2025-02-15", endDate: "2025-08-15" },
  { id: 3, title: "Backend Intern", company: "Valeo", duration: "2 Months", status: "finalized", startDate: "2025-03-01", endDate: "2025-05-01" },
  { id: 4, title: "UI/UX Design Intern", company: "Creative Design Studio", duration: "4 Months", status: "pending", startDate: "2025-04-01", endDate: "2025-08-01" },
];

const statusStyles = {
  accepted:  { border: "border-green-200", accent: "bg-green-200", text: "text-green-800" },
  rejected:  { border: "border-red-200",   accent: "bg-red-200",   text: "text-red-800"   },
  finalized: { border: "border-blue-200",  accent: "bg-blue-200",  text: "text-blue-800"  },
  pending:   { border: "border-yellow-200",accent: "bg-yellow-200",text: "text-yellow-800"},
};

export default function MyApplicationsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-[#00D6A0] to-[#00106A] text-white py-16 mb-8"
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-extrabold mb-4">📝 My Applications</h1>
          <p className="text-lg opacity-90">
            Here you can review the status of every internship you’ve applied to.
          </p>
        </div>
      </motion.div>

      {/* Applications Grid */}
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {hardcodedInternships.map(app => {
            const styles = statusStyles[app.status] || statusStyles.pending;
            return (
              <motion.div
                key={app.id}
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1 }
                }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
                className={`
                  bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-all duration-300
                  ${styles.border}
                `}
              >
                {/* Top accent bar */}
                <div className={`h-2 w-full ${styles.accent}`} />

                <div className="p-6 flex flex-col h-full">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">{app.title}</h2>
                  <p className="text-gray-600 mb-1"><strong>Company:</strong> {app.company}</p>
                  <p className="text-gray-600 mb-1"><strong>Duration:</strong> {app.duration}</p>
                  <p className="text-gray-600 mb-4">
                    <strong>Dates:</strong> {app.startDate} → {app.endDate}
                  </p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles.accent} ${styles.text}`}>
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Empty State */}
        {hardcodedInternships.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full text-center py-12 text-gray-500"
          >
            You have no applications yet.
          </motion.div>
        )}
      </div>
    </div>
  );
}
