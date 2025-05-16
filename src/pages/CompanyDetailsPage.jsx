// src/pages/CompanyDetailsPage.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";

const allSuggestedCompanies = [
  // ... keep your existing company list ...
];

const CompanyDetailsPage = () => {
  const { companyName } = useParams();
  const company = allSuggestedCompanies.find(c => c.name === companyName);

  if (!company) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="text-center bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Company not found.</h2>
          <Link to="/student">
            <button className="bg-gradient-to-r from-[#00106A] to-[#0038A0] text-white px-4 py-2 rounded-lg hover:opacity-90 transition">
              Back to Dashboard
            </button>
          </Link>
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

      {/* Company Card */}
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8 space-y-6">
        {company.imageUrl && (
          <img
            src={company.imageUrl}
            alt={`${company.name} logo`}
            className="w-24 h-24 object-cover rounded mb-4 mx-auto"
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
          
          {/* Display user's internship details */}
          <div className="pt-4 border-t border-gray-200 mt-4">
            <h3 className="font-semibold mb-2">Your Internship Details:</h3>
            <p><strong>Role:</strong> {userInternship.role}</p>
            <p><strong>Duration:</strong> {userInternship.duration} months</p>
            <p><strong>Period:</strong> {userInternship.startDate} to {userInternship.endDate}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
          <Link 
            to="/student/report" 
            state={{ 
              company: company.name,
              internship: userInternship
            }}
            className="bg-gradient-to-r from-[#00106A] to-[#0038A0] text-white px-5 py-2 rounded-lg hover:opacity-90 transition text-center"
          >
            Create Report
          </Link>
          <Link 
            to="/student/evaluation"
            state={{ 
              company: company.name,
              internship: userInternship
            }}
            className="bg-gradient-to-r from-[#00106A] to-[#0038A0] text-white px-5 py-2 rounded-lg hover:opacity-90 transition text-center"
          >
            Create Evaluation
          </Link>
        </div>

        <div className="text-center pt-6">
          <Link to="/student">
            <button className="text-gray-600 underline hover:text-gray-800">
              ← Back to Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailsPage;