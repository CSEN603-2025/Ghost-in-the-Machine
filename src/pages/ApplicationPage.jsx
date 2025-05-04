import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ApplicationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [files, setFiles] = useState({
    cv: null,
    coverLetter: null,
    certificates: null,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle file change
  const handleFileChange = (e, docType) => {
    setFiles({
      ...files,
      [docType]: e.target.files
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if CV is uploaded, since it's mandatory
    if (!files.cv) {
      alert("Please upload your CV.");
      return;
    }

    // Hardcoded internships data
    const internships = [
      { internshipId: "1", title: "Software Developer Intern", company: "Tech Co.", duration: "3 months" },
      { internshipId: "2", title: "Data Analyst Intern", company: "DataWorks", duration: "6 months" },
      { internshipId: "3", title: "UI/UX Design Intern", company: "Creative Design Studio", duration: "4 months" }
    ];

    // Find the internship that matches the ID from params
    const selectedInternship = internships.find((internship) => internship.internshipId === id);

    // Save the application to localStorage
    const application = {
      internshipId: selectedInternship.internshipId,
      title: selectedInternship.title,
      company: selectedInternship.company,
      duration: selectedInternship.duration,
      status: "pending",  // Default status is pending
      cv: files.cv[0],
      coverLetter: files.coverLetter ? files.coverLetter[0] : null,
      certificates: files.certificates || [],
    };

    // Retrieve current applications from localStorage, or create a new one if none exists
    const currentApplications = JSON.parse(localStorage.getItem("applications")) || [];
    currentApplications.push(application);
    localStorage.setItem("applications", JSON.stringify(currentApplications));

    setIsSubmitted(true);
    alert("Your application has been submitted!");
  };

  const handleGoBack = () => {
    navigate("/student-dashboard"); // Go back to the Student Dashboard
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <button onClick={handleGoBack} className="mb-4 text-blue-600 underline">
        ← Back to Dashboard
      </button>

      <h2 className="text-3xl font-bold mb-4">Apply for Internship</h2>

      {isSubmitted ? (
        <div className="text-green-600 mt-4">
          <p>Congratulations! You are now one step closer to your future career.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="cv" className="block text-lg font-semibold mb-2">Upload Your CV (Required)</label>
            <input type="file" id="cv" onChange={(e) => handleFileChange(e, "cv")} className="mb-4 p-3 border border-gray-300 rounded" accept=".pdf, .docx" required />
          </div>

          <div className="mb-6">
            <label htmlFor="coverLetter" className="block text-lg font-semibold mb-2">Upload Cover Letter (Optional)</label>
            <input type="file" id="coverLetter" onChange={(e) => handleFileChange(e, "coverLetter")} className="mb-4 p-3 border border-gray-300 rounded" accept=".pdf, .docx" />
          </div>

          <div className="mb-6">
            <label htmlFor="certificates" className="block text-lg font-semibold mb-2">Upload Certificates (Optional)</label>
            <input type="file" id="certificates" onChange={(e) => handleFileChange(e, "certificates")} className="mb-4 p-3 border border-gray-300 rounded" accept=".pdf, .docx, .jpg, .png" multiple />
          </div>

          <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Submit Application
          </button>
        </form>
      )}
    </div>
  );
};

export default ApplicationPage;
