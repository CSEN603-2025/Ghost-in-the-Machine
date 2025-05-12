// src/pages/EditProfilePage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function EditProfilePage() {
  const [jobInterests, setJobInterests] = useState("");
  const [internships, setInternships] = useState([
    { company: "", role: "", duration: "", startDate: "", endDate: "", status: "current" },
  ]);
  const [activities, setActivities] = useState("");
  const [major, setMajor] = useState("");
  const [semester, setSemester] = useState("");
  const navigate = useNavigate();

  // load existing profile
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("studentProfile")) || {};
    if (stored.jobInterests) setJobInterests(stored.jobInterests);
    if (stored.internships) setInternships(stored.internships);
    if (stored.activities) setActivities(stored.activities);
    if (stored.major) setMajor(stored.major);
    if (stored.semester) setSemester(stored.semester);
  }, []);

  const handleInternshipChange = (i, field, val) => {
    setInternships((prev) => {
      const up = [...prev];
      up[i][field] = val;
      return up;
    });
  };
  const addInternship = () => {
    setInternships((prev) => [
      ...prev,
      { company: "", role: "", duration: "", startDate: "", endDate: "", status: "current" },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const valid = internships.filter((x) =>
      x.company || x.role || x.duration || x.startDate || x.endDate
    );
    const stored = JSON.parse(localStorage.getItem("studentProfile")) || {};
    localStorage.setItem(
      "studentProfile",
      JSON.stringify({
        ...stored,
        jobInterests,
        internships: valid,
        activities,
        major,
        semester,
      })
    );
    alert("Profile saved successfully!");
    navigate("/student-dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-[#00D6A0] to-[#00106A] text-white py-16 mb-8"
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-extrabold mb-4">🖋️ Edit My Profile</h1>
          <p className="text-lg opacity-90">
            Update your job interests, internships, major, semester, and activities.
          </p>
        </div>
      </motion.div>

      {/* Form Card */}
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-xl shadow-md p-8 space-y-6"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Job Interests */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Job Interests</label>
              <input
                value={jobInterests}
                onChange={(e) => setJobInterests(e.target.value)}
                placeholder="e.g., Frontend, AI, Project Management"
                className="mt-1 block w-full rounded-lg border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-[#00D6A0]/50 focus:border-transparent"
              />
            </div>

            {/* Major & Semester */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Major</label>
                <select
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                  className="mt-1 block w-full rounded-lg border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-[#00D6A0]/50 focus:border-transparent"
                >
                  <option value="">Select your major</option>
                  <option>Computer Engineering</option>
                  <option>Business</option>
                  <option>Pharmacy</option>
                  <option>Management</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Semester</label>
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="mt-1 block w-full rounded-lg border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-[#00D6A0]/50 focus:border-transparent"
                >
                  <option value="">Select semester</option>
                  {[...Array(10)].map((_, i) => (
                    <option key={i}>{i + 1}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Internships Section */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Internships</p>
              {internships.map((it, i) => (
                <div key={i} className="space-y-4 mb-4 pb-4 border-b border-gray-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      placeholder="Company"
                      value={it.company}
                      onChange={(e) => handleInternshipChange(i, "company", e.target.value)}
                      className="rounded-lg border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-[#00D6A0]/50 focus:border-transparent"
                    />
                    <input
                      placeholder="Role"
                      value={it.role}
                      onChange={(e) => handleInternshipChange(i, "role", e.target.value)}
                      className="rounded-lg border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-[#00D6A0]/50 focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      placeholder="Duration (mo.)"
                      value={it.duration}
                      onChange={(e) => handleInternshipChange(i, "duration", e.target.value)}
                      className="rounded-lg border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-[#00D6A0]/50 focus:border-transparent"
                    />
                    <select
                      value={it.status}
                      onChange={(e) => handleInternshipChange(i, "status", e.target.value)}
                      className="rounded-lg border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-[#00D6A0]/50 focus:border-transparent"
                    >
                      <option value="current">Current</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Start Date</label>
                      <input
                        type="date"
                        value={it.startDate}
                        onChange={(e) => handleInternshipChange(i, "startDate", e.target.value)}
                        className="rounded-lg border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-[#00D6A0]/50 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">End Date</label>
                      <input
                        type="date"
                        value={it.endDate}
                        onChange={(e) => handleInternshipChange(i, "endDate", e.target.value)}
                        className="rounded-lg border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-[#00D6A0]/50 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addInternship}
                className="inline-flex items-center space-x-2 text-[#00D6A0] font-medium"
              >
                <span className="text-xl">＋</span>
                <span>Add another internship</span>
              </button>
            </div>

            {/* Activities */}
            <div>
              <label className="block text-sm font-medium text-gray-700">College Activities</label>
              <textarea
                value={activities}
                onChange={(e) => setActivities(e.target.value)}
                placeholder="e.g., Robotics Club, Hackathon Winner"
                rows={3}
                className="mt-1 block w-full rounded-lg border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-[#00D6A0]/50 focus:border-transparent"
              />
            </div>

            {/* Save */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-gradient-to-r from-[#00F0B5] to-[#00D6A0] text-black font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                Save Profile
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
