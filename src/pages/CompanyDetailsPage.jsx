import React from "react";
import { useParams, Link } from "react-router-dom";

const allSuggestedCompanies = [
  {
    name: "Instabug",
    industry: "Technology",
    size: "Medium (51–100 employees)",
    email: "contact@instabug.com",
    phone: "+1 555-123-4567",
    address: "123 Cairo Street, Egypt",
    imageUrl: "/images/instabug.png",
    documentName: "Instabug_Profile.pdf",
    recommendations: 4.8,
  },
  {
    name: "Valeo",
    industry: "Engineering",
    size: "Corporate (>500 employees)",
    email: "hr@valeo.com",
    phone: "+1 555-111-2222",
    address: "56 Smart Village, Giza, Egypt",
    imageUrl: "/images/valeo.png",
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
    imageUrl: "/images/ibm.png",
    documentName: "IBM_Overview.pdf",
    recommendations: 4.0,
  },
];

const CompanyDetailsPage = () => {
  const { companyName } = useParams();
  const company = allSuggestedCompanies.find((c) => c.name === companyName);

  if (!company) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="text-center bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Company not found.</h2>
          <Link to="/student-dashboard">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
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
      <div className="bg-gradient-to-r from-[#00D6A0] to-[#00106A] text-white py-14 mb-8">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-extrabold">{company.name}</h1>
          <p className="text-lg mt-2 opacity-90">Company Overview</p>
        </div>
      </div>

      {/* Company Card */}
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8">
        {company.imageUrl && (
          <img
            src={company.imageUrl}
            alt={`${company.name} logo`}
            className="w-24 h-24 object-cover rounded mb-6"
          />
        )}
        <div className="space-y-2 text-gray-700">
          <p><strong>Industry:</strong> {company.industry}</p>
          <p><strong>Company Size:</strong> {company.size}</p>
          <p><strong>Email:</strong> {company.email}</p>
          <p><strong>Phone:</strong> {company.phone}</p>
          <p><strong>Address:</strong> {company.address}</p>
          <p><strong>Recommendations:</strong> {company.recommendations} / 5</p>
          <p><strong>Document:</strong> {company.documentName}</p>
        </div>

        <Link to="/student-dashboard">
          <button className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Back to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CompanyDetailsPage;
