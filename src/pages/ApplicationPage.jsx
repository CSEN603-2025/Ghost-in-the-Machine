import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Toast from '../components/Toast';

const ApplicationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [files, setFiles] = useState({
    cv: null,
    coverLetter: null,
    certificates: null,
  });
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState(''); // Add toast type state
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFileChange = (e, docType) => {
    setFiles({
      ...files,
      [docType]: e.target.files
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!files.cv) {
      alert("Please upload your CV.");
      return;
    }

    const internships = [
      { internshipId: "1", title: "Software Developer Intern", company: "Tech Co.", duration: "3 months" },
      { internshipId: "2", title: "Data Analyst Intern", company: "DataWorks", duration: "6 months" },
      { internshipId: "3", title: "UI/UX Design Intern", company: "Creative Design Studio", duration: "4 months" }
    ];

    const selectedInternship = internships.find((internship) => internship.internshipId === id);

    const application = {
      internshipId: selectedInternship.internshipId,
      title: selectedInternship.title,
      company: selectedInternship.company,
      duration: selectedInternship.duration,
      status: "pending",
      cv: files.cv[0],
      coverLetter: files.coverLetter ? files.coverLetter[0] : null,
      certificates: files.certificates || [],
    };

    const currentApplications = JSON.parse(localStorage.getItem("applications")) || [];
    currentApplications.push(application);
    localStorage.setItem("applications", JSON.stringify(currentApplications));

    setIsSubmitted(true);

    // Show toast instead of alert
    setToastMessage('Your application has been submitted!');
    setToastType('success');

    // Optionally clear the toast after a few seconds
    setTimeout(() => {
      setToastMessage('');
      setToastType('');
    }, 4000);
  };

  const handleGoBack = () => {
    navigate("/student-dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#00D6A0] to-[#00106A] text-white py-14 mb-8">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-extrabold"> Internship Application</h1>
          <p className="text-lg mt-2 opacity-90">Upload your documents and apply now!</p>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setToastMessage('')}
             containerProps={{ position: "bottom-left" }} 
        />
      )}

      {/* Form */}
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8">
        <button onClick={handleGoBack} className="mb-6 text-[#00D6A0] underline font-medium">
          ← Back to Dashboard
        </button>

        <h2 className="text-2xl font-bold mb-6 text-gray-800">Apply for Internship</h2>

        {isSubmitted ? (
          <div className="text-green-600 text-center font-medium">
            Congratulations! You are now one step closer to your future career.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="cv" className="block text-lg font-semibold mb-1">Upload Your CV (Required)</label>
              <input
                type="file"
                id="cv"
                onChange={(e) => handleFileChange(e, "cv")}
                className="w-full p-3 border border-gray-300 rounded"
                accept=".pdf, .docx"
                required
              />
            </div>

            <div>
              <label htmlFor="coverLetter" className="block text-lg font-semibold mb-1">Upload Cover Letter (Optional)</label>
              <input
                type="file"
                id="coverLetter"
                onChange={(e) => handleFileChange(e, "coverLetter")}
                className="w-full p-3 border border-gray-300 rounded"
                accept=".pdf, .docx"
              />
            </div>

            <div>
              <label htmlFor="certificates" className="block text-lg font-semibold mb-1">Upload Certificates (Optional)</label>
              <input
                type="file"
                id="certificates"
                onChange={(e) => handleFileChange(e, "certificates")}
                className="w-full p-3 border border-gray-300 rounded"
                accept=".pdf, .docx, .jpg, .png"
                multiple
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#00D6A0] to-[#2b7de9] text-white rounded-full font-semibold hover:shadow-lg transition-all"
            >
              Submit Application
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ApplicationPage;