import React, { useState } from "react";

const ReportsPage = () => {
  const [reports, setReports] = useState([
    {
      id: 1,
      title: "Internship Report 1",
      status: "Pending",
      comments: "",
    },
    {
      id: 2,
      title: "Internship Report 2",
      status: "Accepted",
      comments: "",
    },
    {
      id: 3,
      title: "Internship Report 3",
      status: "Rejected",
      comments: "The report lacks detailed learning outcomes.",
    },
    {
      id: 4,
      title: "Internship Report 4",
      status: "Flagged",
      comments: "Possible plagiarism detected. Please clarify your sources.",
    },
  ]);

  const [appealMessages, setAppealMessages] = useState({});

  const handleAppealChange = (id, message) => {
    setAppealMessages({ ...appealMessages, [id]: message });
  };

  const handleAppealSubmit = (id) => {
    const message = appealMessages[id];
    if (message) {
      alert(`Appeal submitted for Report ${id}:\n"${message}"`);
      setAppealMessages({ ...appealMessages, [id]: "" });
    }
  };

  return (
    <div style={styles.container}><div className="fixed top-0 left-0 right-0 z-50 w-full bg-[#00106A] py-6 px-6 flex items-center justify-between">

  {/* Empty div for spacing or future icons */}
  <div className="w-1/3" />

  {/* Centered Title */}
  <div className="w-1/3 text-center">
    <h1 className="text-3xl font-bold text-white">My Reports </h1>
  </div>

  {/* Home & Logout Buttons */}
  <div className="w-1/3 flex justify-end space-x-4">
    <button
      onClick={() => window.location.href = "/student"}
      className="bg-gradient-to-r from-[#00F0B5] to-[#00D6A0] hover:from-[#00D6A0] hover:to-[#00F0B5] text-black font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300"
    >
      Home
    </button>
    <button
      onClick={() => {
        localStorage.clear();
        window.location.href = "/";
      }}
      className="bg-gradient-to-r from-red-500 to-red-400 hover:from-red-600 hover:to-red-500 text-white py-2 px-4 rounded-lg shadow-md transition-all duration-300"
    >
      Logout
    </button>
  </div>
</div>


      {reports.map((report) => (
        <div
          key={report.id}
          style={{
            ...styles.card,
            ...(report.status === "Accepted" ? styles.acceptedCard : {}),
          }}
        >
          <h3 style={styles.centerText}>{report.title}</h3>
          <p style={styles.centerText}><strong>Status:</strong> {report.status}</p>

          {(report.status === "Rejected" || report.status === "Flagged") && (
            <div style={styles.centerText}>
              <p style={{ color: "#c00" }}>
                <strong>Comments:</strong> {report.comments}
              </p>
              <textarea
                rows={3}
                placeholder="Write your appeal message here..."
                value={appealMessages[report.id] || ""}
                onChange={(e) => handleAppealChange(report.id, e.target.value)}
                style={styles.textarea}
              />
              <br />
              <button
                onClick={() => handleAppealSubmit(report.id)}
                style={styles.button}
              >
                Submit Appeal
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "120px", // space for navbar
    paddingBottom: "40px",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
  },
  page: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "30px",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
    width: "100%",
    maxWidth: "600px",
  },
  acceptedCard: {
    backgroundColor: "#e8fce8",
    border: "2px solid #2ecc71",
  },
  centerText: {
    textAlign: "center",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginTop: "10px",
    marginBottom: "10px",
    resize: "vertical",
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};


export default ReportsPage;
