// src/pages/CompanyDetailsPage.jsx
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const allSuggestedCompanies = [
  {
    name: "Instabug",
    industry: "Technology",
    size: "Medium (51–100 employees)",
    email: "contact@instabug.com",
    phone: "+1 555-123-4567",
    address: "123 Cairo Street, Egypt",
    imageUrl: "/logos/instabug.png",
    documentName: "Instabug_Profile.pdf",
    recommendations: 4.8,
  },
  {
    name: "Valeo",
    industry: "Technology",
    size: "Corporate (>500 employees)",
    email: "hr@valeo.com",
    phone: "+1 555-111-2222",
    address: "56 Smart Village, Giza, Egypt",
    imageUrl: "/logos/valeo.png",
    documentName: "Valeo_Cert.pdf",
    recommendations: 4.5,
  },
  {
    name: "IBM",
    industry: "Technology",
    size: "Corporate (>500 employees)",
    email: "contact@ibm.com",
    phone: "+1 555-222-3333",
    address: "Tech Park Avenue, Cairo",
    imageUrl: "/logos/ibm.png",
    documentName: "IBM_Overview.pdf",
    recommendations: 4.0,
  },
  {
    name: "BizPros",
    industry: "Business",
    size: "Small (10–50 employees)",
    email: "hello@bizpros.com",
    phone: "+1 555-555-0000",
    address: "Downtown, Cairo",
    imageUrl: "/logos/bizpros.png",
    documentName: "BizPros_Details.pdf",
    recommendations: 3.0,
  },
];

const CompanyDetailsPage = () => {
  const { companyName } = useParams();
  const navigate = useNavigate();

  const storedProfile = JSON.parse(localStorage.getItem("studentProfile")) || {};
  const userInternships = storedProfile.internships || [];

  const userInternship = userInternships.find(
    (i) => i.company === companyName && i.status === "completed"
  );

  const predefinedCompany = allSuggestedCompanies.find((c) => c.name === companyName);

  const company = predefinedCompany || {
    name: companyName,
    industry: userInternship?.industry || "Unknown",
    size: userInternship?.size || "Unknown",
    email: "",
    phone: "",
    address: "",
    imageUrl: "",
    documentName: "",
    recommendations: 0,
  };

  if (!userInternship && !predefinedCompany) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="text-center bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">
            No completed internship found with this company
          </h2>
          <button
            onClick={() => navigate("/student-dashboard")}
            className="bg-gradient-to-r from-[#00106A] to-[#0038A0] text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <motion.button
        whileHover={{ x: -5 }}
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 z-30 flex items-center text-white hover:underline"
      >
        <ArrowLeft className="mr-1 w-5 h-5" /> Back
      </motion.button>

      <div className="bg-gradient-to-r from-[#00106A] to-[#0038A0] text-white py-14 mb-8">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-extrabold">{company.name}</h1>
          <p className="text-lg mt-2 opacity-90">Company Overview</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8 space-y-6">
        {company.imageUrl && (
          <img
            src={company.imageUrl}
            alt={`${company.name} logo`}
             className="w-40 h-40 object-contain rounded bg-gray-100 p-4 mx-auto"
          />
        )}

        <div className="space-y-2 text-gray-700">
          <p><strong>Industry:</strong> {company.industry}</p>
          <p><strong>Company Size:</strong> {company.size}</p>
          {company.email && <p><strong>Email:</strong> {company.email}</p>}
          {company.phone && <p><strong>Phone:</strong> {company.phone}</p>}
          {company.address && <p><strong>Address:</strong> {company.address}</p>}
          {company.recommendations > 0 && (
            <p><strong>Recommendations:</strong> {company.recommendations} / 5</p>
          )}
          {company.documentName && <p><strong>Document:</strong> {company.documentName}</p>}

          {userInternship && (
            <div className="pt-4 border-t border-gray-200 mt-4">
              <h3 className="font-semibold mb-2">Your Internship Details:</h3>
              <p><strong>Role:</strong> {userInternship.role}</p>
              <p><strong>Duration:</strong> {userInternship.duration} months</p>
              <p><strong>Period:</strong> {userInternship.startDate} to {userInternship.endDate}</p>
            </div>
          )}
        </div>

        {/* Show Report & Evaluation only if it's not from the hardcoded list */}
        {userInternship && !predefinedCompany && (
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
            <Link
              to="/student/report"
              state={{
                company: company.name,
                internship: userInternship,
              }}
              className="bg-gradient-to-r from-[#00106A] to-[#0038A0] text-white px-5 py-2 rounded-lg hover:opacity-90 transition text-center"
            >
              Create Report
            </Link>
            <Link
              to="/student/evaluation"
              state={{
                company: company.name,
                internship: userInternship,
              }}
              className="bg-gradient-to-r from-[#00106A] to-[#0038A0] text-white px-5 py-2 rounded-lg hover:opacity-90 transition text-center"
            >
              Create Evaluation
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyDetailsPage;