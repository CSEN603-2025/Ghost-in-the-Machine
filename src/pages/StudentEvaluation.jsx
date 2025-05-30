import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from 'lucide-react';
import Toast from '../components/Toast';  // تأكد وجود مكون Toast

export default function StudentEvaluation() {
  const [evaluation, setEvaluation] = useState(null);
  const [text, setText] = useState("");
  const [recommend, setRecommend] = useState("yes");
  const [isEditing, setIsEditing] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState(""); // "success" or "error"
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("studentEvaluation"));
    if (stored) {
      setEvaluation(stored);
      setText(stored.text);
      setRecommend(stored.recommend);
      setCompanyName(stored.companyName);
    }
  }, []);

  const validateFields = () => {
    const errors = {};
    if (!companyName.trim()) errors.companyName = "Please enter the company name.";
    if (!text.trim()) errors.text = "Evaluation text is required.";
    if (recommend !== "yes" && recommend !== "no") errors.recommend = "Please select recommend or not.";

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateFields()) return;

    const existing = JSON.parse(localStorage.getItem("studentEvaluations")) || {};
    if (existing[companyName] && !evaluation) {
      setFieldErrors({
        ...fieldErrors,
        companyName: "You have already submitted an evaluation for this company."
      });
      return;
    }

    if (evaluation) {
      // تحديث التقييم
      const updatedEval = { text, recommend, companyName };
      existing[companyName] = updatedEval;
      localStorage.setItem("studentEvaluations", JSON.stringify(existing));
      setEvaluation(updatedEval);
      setIsEditing(false);
      setToastMessage("Evaluation updated successfully.");
      setToastType("success");
    } else {
      // تأكيد الإرسال الجديد
      setShowConfirmModal(true);
    }
  };

  const confirmSubmission = () => {
    const existing = JSON.parse(localStorage.getItem("studentEvaluations")) || {};
    const newEval = { text, recommend, companyName };
    existing[companyName] = newEval;
    localStorage.setItem("studentEvaluations", JSON.stringify(existing));
    setEvaluation(newEval);
    setIsEditing(false);
    setShowConfirmModal(false);
    setToastMessage("Evaluation submitted successfully.");
    setToastType("success");
  };

  const cancelSubmission = () => {
    setShowConfirmModal(false);
  };

  const handleDone = () => {
    localStorage.removeItem("studentEvaluation");
    setToastMessage("Evaluation completed successfully.");
    setToastType("success");
    setTimeout(() => navigate("/student-dashboard"), 1500);
  };

  const handleDelete = () => {
    localStorage.removeItem("studentEvaluation");
    setEvaluation(null);
    setText("");
    setRecommend("yes");
    setCompanyName("");
    setToastMessage("Evaluation deleted successfully.");
    setToastType("error");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden"
      >
        <motion.button
          whileHover={{ x: -5 }}
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 z-30 flex items-center text-white hover:underline"
        >
          <ArrowLeft className="mr-1 w-5 h-5" /> Back
        </motion.button>
        <div className="absolute inset-0 bg-gradient-to-r from-[#00106A] to-[#0038A0] opacity-95" />
        <div className="max-w-4xl mx-auto px-6 py-20 relative z-10 text-center text-white">
          <h1 className="text-5xl font-extrabold mb-4"> Company Evaluation</h1>
          <p className="text-xl opacity-90">
            Share your experience and help future interns decide.
          </p>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-gray-50 to-transparent" />
      </motion.div>

      {/* Card */}
      <div className="max-w-2xl mx-auto px-6 -mt-10 relative z-20 pb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company Name
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => {
                setCompanyName(e.target.value);
                setFieldErrors({...fieldErrors, companyName: ""});
              }}
              placeholder="Enter the company name"
              className="mt-1 w-full rounded-lg border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {fieldErrors.companyName && (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.companyName}</p>
            )}
          </div>

          {evaluation && !isEditing ? (
            <div className="space-y-4">
              <p>
                <strong>Your Evaluation:</strong> {evaluation.text}
              </p>
              <p>
                <strong>Recommend?</strong>{" "}
                {evaluation.recommend === "yes" ? "✅ Yes" : "❌ No"}
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
                <button
                  onClick={handleDone}
                  className="px-4 py-2 bg-gradient-to-r from-[#00106A] to-[#0038A0] text-white rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Your Evaluation
                </label>
                <textarea
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value);
                    setFieldErrors({...fieldErrors, text: ""});
                  }}
                  placeholder="Write your evaluation..."
                  rows={4}
                  className="mt-1 w-full rounded-lg border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {fieldErrors.text && (
                  <p className="mt-1 text-sm text-red-600">{fieldErrors.text}</p>
                )}
              </div>
              <div className="flex items-center space-x-6">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="recommend"
                    value="yes"
                    checked={recommend === "yes"}
                    onChange={() => {
                      setRecommend("yes");
                      setFieldErrors({...fieldErrors, recommend: ""});
                    }}
                    className="form-radio text-blue-600"
                  />
                  <span>Recommend</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="recommend"
                    value="no"
                    checked={recommend === "no"}
                    onChange={() => {
                      setRecommend("no");
                      setFieldErrors({...fieldErrors, recommend: ""});
                    }}
                    className="form-radio text-blue-600"
                  />
                  <span>Don't Recommend</span>
                </label>
              </div>
              {fieldErrors.recommend && (
                <p className="mt-1 text-sm text-red-600">{fieldErrors.recommend}</p>
              )}
              <div className="flex justify-end">
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-gradient-to-r from-[#00106A] to-[#0038A0] text-white rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  {evaluation ? "Update Evaluation" : "Submit Evaluation"}
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Toast Notification using Toast component */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType === "error" ? "error" : "success"}
          containerProps={{ position: 'bottom-left' }}
        />
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-sm w-full shadow-lg text-center space-y-6">
            <p className="text-lg font-semibold">
              Submit? You can only submit once per company.
            </p>
            <div className="flex justify-center gap-6">
              <button
                onClick={confirmSubmission}
                className="px-6 py-2 bg-gradient-to-r from-[#00106A] to-[#0038A0] text-white rounded-lg font-semibold hover:opacity-90 transition"
              >
                Confirm
              </button>
              <button
                onClick={cancelSubmission}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fade out animation keyframes */}
      <style>{`
        @keyframes fadeOut {
          0% { opacity: 1; }
          80% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}