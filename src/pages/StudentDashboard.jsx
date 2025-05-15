// src/pages/StudentDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardTopNav from "../components/dashboard/DashboardTopNav";
import StatusHeader from "../components/dashboard/StatusHeader";
import SearchBar from "../components/SearchBar";
import CompanyFilter from "../components/dashboard/CompanyFilter";
import CompanyCard from "../components/dashboard/CompanyCard";
import { motion } from "framer-motion";
import { useToastNotifications } from "../hooks/useToastNotifications";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const { success } = useToastNotifications();

  const [selectedMajor, setSelectedMajor] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [companyFilter, setCompanyFilter] = useState({ industry: "", company: "" });
  const [searchText, setSearchText] = useState("");

  // Dashboard link definitions
  const dashboardLinks = [
    { label: "Internships", path: "/student/internships" },
    { label: "My Applications", path: "/student/my-applications" },
    { label: "Submit Report", path: "/student/report" },
    { label: "Edit Profile", path: "/student/edit-profile" },
    { label: "Evaluation", path: "/student/evaluation" },
    { label: "SCAD Internships", path: "/student/scad-internships" },
    { label: "View Reports", path: "/student/reports" },
  ];

  // Suggested companies data
  const allSuggestedCompanies = [
    { name: "Instabug", industry: "Technology", recommendations: 5 },
    { name: "Valeo", industry: "Technology", recommendations: 4 },
    { name: "IBM", industry: "Technology", recommendations: 5 },
    { name: "BizPros", industry: "Business", recommendations: 3 },
  ];

  // Load profile & show toast
  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("studentProfile")) || {};
    setSelectedMajor(profile.major || "");
    setSelectedSemester(profile.semester || "");
    const timer = setTimeout(() => {
      const msg = "Next internship cycle starts on 1/Jun/2025. Don't miss out!";
      success(msg);
    }, 3000);
    return () => clearTimeout(timer);
  }, [success]);

  // Company filtering
  const handleCompanyFilterChange = e => {
    const { name, value } = e.target;
    setCompanyFilter(f => ({ ...f, [name]: value }));
  };

  const filteredCompanies = allSuggestedCompanies
    .filter(c =>
      (!companyFilter.industry || c.industry === companyFilter.industry) &&
      (!companyFilter.company || c.name === companyFilter.company) &&
      c.name.toLowerCase().includes(searchText.toLowerCase())
    )
    .sort((a, b) => b.recommendations - a.recommendations);

  // Card animation variants
  const variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <DashboardTopNav portalTitle="Student Portal" logoText="ST" />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4 space-y-8">

          {/* Profile */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <StatusHeader major={selectedMajor} semester={selectedSemester} />
          </div>

          {/* Dashboard Links as SCAD‑style cards */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {dashboardLinks.map((link, idx) => (
                <motion.div
                  key={idx}
                  variants={variants}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
                  onClick={() => navigate(link.path)}
                  className="bg-white rounded-xl border border-gray-100 flex flex-col cursor-pointer overflow-hidden transition"
                >
                  {/* gradient accent bar */}
                  <div className="h-2 w-full bg-gradient-to-r from-[#00106A] to-[#0038A0]" />
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-gray-800">{link.label}</h3>
                    {/* spacer */}
                    <div className="flex-1" />
                    <div className="mt-4 text-[#00D6A0] font-medium">Open →</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Suggested Companies */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Suggested Companies</h2>
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex-1 min-w-[200px]">
                <SearchBar
                  value={searchText}
                  onChange={e => setSearchText(e.target.value)}
                  placeHolder="Search company by name..."
                />
              </div>
              <div className="min-w-[200px]">
                <CompanyFilter
                  companyFilter={companyFilter}
                  onFilterChange={handleCompanyFilterChange}
                  companies={allSuggestedCompanies}
                />
              </div>
            </div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {filteredCompanies.length > 0 ? (
                filteredCompanies.map((company, idx) => (
                  <motion.div
                    key={idx}
                    variants={variants}
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
                  >
                    <CompanyCard company={company} />
                  </motion.div>
                ))
              ) : (
                <p className="col-span-full text-center text-gray-500 py-12">
                  No companies match your filters.
                </p>
              )}
            </motion.div>
          </div>

        </div>
      </div>
    </>
  );
}
