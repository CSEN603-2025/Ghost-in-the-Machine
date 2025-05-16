// src/pages/ReportsPage.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import { useToastNotifications } from "../hooks/useToastNotifications";
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Toast from '../components/Toast';  // Import your Toast component

export default function ReportsPage() {
  const navigate = useNavigate();
  const [reports] = useState([
    { id: 1, title: "Internship Report 1", status: "Pending", comments: "" },
    { id: 2, title: "Internship Report 2", status: "Accepted", comments: "" },
    { id: 3, title: "Internship Report 3", status: "Rejected", comments: "Lacks detailed outcomes." },
    { id: 4, title: "Internship Report 4", status: "Flagged", comments: "Possible plagiarism—please clarify sources." },
  ]);
  const [appealMessages, setAppealMessages] = useState({});
  const { info } = useToastNotifications();
  const [notifs, setNotifs] = useState([]);

  // Toast notification state for appeal submit success/fail
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success"); // success or error

  // only once: notify about the first rejected report
  useEffect(() => {
    const rpt = reports.find(r => r.status === "Rejected");
    if (!rpt) return;
    const t = setTimeout(() => {
      const msg = `Your report "${rpt.title}" status has been set to "${rpt.status}".`;
      info(msg);
      setNotifs(n => [...n, { id: Date.now(), message: msg }]);
    }, 100);
    return () => clearTimeout(t);
  }, []); // <-- empty deps

  const handleAppealChange = (id, msg) => {
    setAppealMessages(m => ({ ...m, [id]: msg }));
  };

  const handleAppealSubmit = (id) => {
  const msg = appealMessages[id]?.trim();
  if (!msg) {
    setToastMessage("Appeal message cannot be empty.");
    setToastType("error");
    return;
  }
  // Removed the alert here, only use toast
  setAppealMessages(m => ({ ...m, [id]: "" }));
  setToastMessage("Appeal submitted successfully.");
  setToastType("success");
};

  const handleDownload = rpt => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(rpt.title, 20, 20);
    doc.setFontSize(12);
    doc.text(`Status: ${rpt.status}`, 20, 40);
    doc.text("Comments:", 20, 60);
    doc.text(rpt.comments || "No comments provided.", 20, 70, { maxWidth: 170 });
    doc.save(`${rpt.title.replace(/\s+/g, "_")}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
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
        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
             My Internship Reports
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-blue-100 max-w-2xl mx-auto"
          >
            Review statuses, download PDFs, and submit appeals on flagged or rejected reports.
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent" />
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 -mt-10 relative z-20">
        {/* “Filter” / Info Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-gray-700">
              Showing <span className="font-semibold">{reports.length}</span> reports
            </div>
            {/* could add real filters here later */}
          </div>
        </motion.div>

        {/* Report Cards Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {reports.map(report => (
            <motion.div
              key={report.id}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1 },
              }}
              whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden cursor-pointer transition-all"
            >
              {/* Top accent bar */}
              <div
                className={`h-2 w-full ${
                  report.status === "Accepted"
                    ? "bg-green-400"
                    : report.status === "Rejected"
                    ? "bg-red-400"
                    : report.status === "Flagged"
                    ? "bg-yellow-400"
                    : "bg-gray-400"
                }`}
              />
              <div className="p-6 flex flex-col h-full">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{report.title}</h3>
                <p className="text-gray-600 mb-4"><strong>Status:</strong> {report.status}</p>

                {(report.status === "Rejected" || report.status === "Flagged") && (
                  <>
                    {report.comments && (
                      <p className="text-red-600 mb-4"><strong>Comments:</strong> {report.comments}</p>
                    )}
                    <textarea
                      rows={3}
                      placeholder="Write your appeal message..."
                      value={appealMessages[report.id] || ""}
                      onChange={e => handleAppealChange(report.id, e.target.value)}
                      className="w-full rounded-lg border-gray-300 p-2 mb-4 shadow-sm"
                    />
                    <div className="flex space-x-4">
                      <button
                        onClick={() => handleAppealSubmit(report.id)}
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-[#00F0B5] to-[#00D6A0] text-black font-semibold rounded-lg shadow hover:shadow-lg transition"
                      >
                        Submit Appeal
                      </button>
                      <button
                        onClick={() => handleDownload(report)}
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-green-400 text-white rounded-lg shadow hover:shadow-lg transition"
                      >
                        Download PDF
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType === "error" ? "error" : "success"}
          containerProps={{ position: 'bottom-left' }}
        />
      )}
    </div>
  );
}