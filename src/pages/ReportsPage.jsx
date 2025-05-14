// src/pages/ReportsPage.jsx
import React, { useState, useEffect, use } from "react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import { useToastNotifications } from "../hooks/useToastNotifications";

export default function ReportsPage() {
  const [reports, setReports] = useState([
    { id: 1, title: "Internship Report 1", status: "Pending", comments: "" },
    { id: 2, title: "Internship Report 2", status: "Accepted", comments: "" },
    { id: 3, title: "Internship Report 3", status: "Rejected", comments: "Lacks detailed outcomes." },
    { id: 4, title: "Internship Report 4", status: "Flagged", comments: "Possible plagiarism—please clarify sources." },
  ]);
  const [appealMessages, setAppealMessages] = useState({});
  const [notification, setNotification] = useState(null);
  const {info} = useToastNotifications();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
        const rpt = reports.find(r => r.status === "Rejected");
        const timer = setTimeout(() => {
        const msg = `Your report "${rpt.title}" status has been set to "${rpt.status}".`;
          info(msg);
          setNotifications(prev => [...prev,{ id: Date.now(), message: msg, date: new Date() }]);
        }, 100);
        return () => clearTimeout(timer);
  }, []);

  const handleAppealChange = (id, msg) => {
    setAppealMessages(m => ({ ...m, [id]: msg }));
  };

  const handleAppealSubmit = id => {
    const msg = appealMessages[id];
    if (msg) {
      alert(`Appeal submitted for Report ${id}:\n"${msg}"`);
      setAppealMessages(m => ({ ...m, [id]: "" }));
    }
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
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#00D6A0] to-[#00106A] text-white py-16 mb-8"
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-extrabold mb-4">📝 My Internship Reports</h1>
          <p className="text-lg opacity-90">
            Review statuses, download PDFs, and submit appeals on flagged or rejected reports.
          </p>
        </div>
      </motion.div>

      {/* Notification */}
      {notification && (
        <div className="max-w-3xl mx-auto mb-6 px-6">
          <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-3 rounded shadow text-center text-sm">
            {notification}
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto px-6 space-y-6">
        {/* Report Cards */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="space-y-6"
        >
          {reports.map(report => (
            <motion.div
              key={report.id}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1 }
              }}
              whileHover={{ scale: 1.02, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
              className={`bg-white rounded-xl p-6 border ${
                report.status === "Accepted"
                  ? "border-green-300 bg-green-50"
                  : "border-gray-200"
              }`}
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
                {report.title}
              </h3>
              <p className="text-center text-gray-600 mb-4">
                <strong>Status:</strong> {report.status}
              </p>

              {(report.status === "Rejected" || report.status === "Flagged") && (
                <div className="space-y-4">
                  <p className="text-red-600 text-center">
                    <strong>Comments:</strong> {report.comments}
                  </p>
                  <textarea
                    rows={3}
                    placeholder="Write your appeal message..."
                    value={appealMessages[report.id] || ""}
                    onChange={e => handleAppealChange(report.id, e.target.value)}
                    className="w-full rounded-lg border-gray-300 p-2 shadow-sm"
                  />
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={() => handleAppealSubmit(report.id)}
                      className="bg-gradient-to-r from-[#00F0B5] to-[#00D6A0] text-black font-semibold py-2 px-6 rounded-full shadow hover:shadow-lg transition-all"
                    >
                      Submit Appeal
                    </button>
                    <button
                      onClick={() => handleDownload(report)}
                      className="bg-gradient-to-r from-green-500 to-green-400 text-white py-2 px-6 rounded-full shadow hover:shadow-lg transition-all"
                    >
                      Download PDF
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
