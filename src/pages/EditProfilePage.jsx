import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Toast from "../components/Toast"; // import Toast

export default function EditProfilePage() {
  const [jobInterests, setJobInterests] = useState("");
  const [internships, setInternships] = useState([
    { company: "", role: "", duration: "", startDate: "", endDate: "", status: "current" },
  ]);
  const [activities, setActivities] = useState("");
  const [major, setMajor] = useState("");
  const [semester, setSemester] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const navigate = useNavigate();

  // Courses by major (unchanged, omitted here for brevity)

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("studentProfile")) || {};
    setJobInterests(stored.jobInterests || "");
    setInternships([
      { company: "", role: "", duration: "", startDate: "", endDate: "", status: "current" }
    ]);
    setActivities(stored.activities || "");
    setMajor(stored.major || "");
    setSemester(stored.semester || "");
  }, []);

  const handleInternshipChange = (i, field, val) => {
    setInternships(prev => {
      const up = [...prev];
      up[i][field] = val;
      return up;
    });
  };

  const addInternship = () => {
    setInternships(prev => [...prev, { 
      company: "", 
      role: "", 
      duration: "", 
      startDate: "", 
      endDate: "", 
      status: "current" 
    }]);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const validNewInternships = internships.filter(x => 
      x.company || x.role || x.duration || x.startDate || x.endDate
    );
    const stored = JSON.parse(localStorage.getItem("studentProfile")) || {};
    const existingValidInternships = stored.internships?.filter(x => 
      x.company || x.role || x.duration || x.startDate || x.endDate
    ) || [];
    const allInternships = [...existingValidInternships, ...validNewInternships];
    localStorage.setItem("studentProfile", JSON.stringify({
      ...stored, 
      jobInterests, 
      internships: allInternships, 
      activities, 
      major, 
      semester
    }));

    // Only added toast notification here
    setToastMessage("Profile saved successfully!");
    setToastType("success");
    setTimeout(() => {
      setToastMessage("");
      setToastType("");
      navigate("/student-dashboard");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero */}
      <motion.div initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} className="relative overflow-hidden">
         <motion.button
  whileHover={{ x: -5 }}
  onClick={() => navigate(-1)}
  className="absolute top-6 left-6 z-30 flex items-center text-white hover:underline"
>
  <ArrowLeft className="mr-1 w-5 h-5" /> Back
</motion.button>
        <div className="absolute inset-0 bg-gradient-to-r from-[#00106A] to-[#0038A0] opacity-95" />
        <div className="max-w-4xl mx-auto px-6 py-20 relative z-10 text-center text-white">
          <h1 className="text-5xl font-extrabold mb-4">🖋️ Edit My Profile</h1>
          <p className="text-xl opacity-90">
            Update your job interests, internships, major, semester, and activities.
          </p>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-gray-50 to-transparent" />
      </motion.div>

      {/* Toast */}
      {toastMessage && (
        <Toast 
          message={toastMessage} 
          type={toastType} 
          onClose={() => setToastMessage("")} 
        />
      )}

      {/* Form */}
      <div className="max-w-3xl mx-auto px-6 -mt-10 relative z-20 pb-16">
        <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} transition={{duration:0.4}}
          className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 space-y-6"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Job Interests</label>
              <input
                value={jobInterests}
                onChange={e => setJobInterests(e.target.value)}
                placeholder="e.g., Frontend, AI, PM"
                className="mt-1 w-full rounded-lg border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Major</label>
                <select value={major} onChange={e => setMajor(e.target.value)}
                  className="mt-1 w-full rounded-lg border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                <select value={semester} onChange={e => setSemester(e.target.value)}
                  className="mt-1 w-full rounded-lg border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select semester</option>
                  {[...Array(10)].map((_,i) => <option key={i}>{i+1}</option>)}
                </select>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Internships</p>
              {internships.map((it,i) => (
                <div key={i} className="space-y-4 mb-4 pb-4 border-b border-gray-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input 
                      placeholder="Company" 
                      value={it.company}
                      onChange={e => handleInternshipChange(i, "company", e.target.value)}
                      className="rounded-lg border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input 
                      placeholder="Role" 
                      value={it.role}
                      onChange={e => handleInternshipChange(i, "role", e.target.value)}
                      className="rounded-lg border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      placeholder="Duration (mo.)" 
                      value={it.duration}
                      onChange={e => handleInternshipChange(i, "duration", e.target.value)}
                      className="rounded-lg border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <select 
                      value={it.status} 
                      onChange={e => handleInternshipChange(i, "status", e.target.value)}
                      className="rounded-lg border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                        onChange={e => handleInternshipChange(i, "startDate", e.target.value)}
                        className="rounded-lg border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">End Date</label>
                      <input 
                        type="date" 
                        value={it.endDate}
                        onChange={e => handleInternshipChange(i, "endDate", e.target.value)}
                        className="rounded-lg border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button 
                type="button" 
                onClick={addInternship}
                className="inline-flex items-center space-x-2 text-[#0038A0] font-medium"
              >
                <span className="text-xl">＋</span>
                <span>Add another internship</span>
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">College Activities</label>
              <textarea 
                value={activities} 
                onChange={e => setActivities(e.target.value)}
                placeholder="e.g., Robotics Club"
                rows={3}
                className="mt-1 w-full rounded-lg border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex justify-end">
              <button 
                type="submit" 
                className="px-6 py-2 bg-gradient-to-r from-[#00106A] to-[#0038A0] text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
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