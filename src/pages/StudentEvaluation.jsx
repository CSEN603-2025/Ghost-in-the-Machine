import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StudentEvaluation = () => {
  const [evaluation, setEvaluation] = useState(null);
  const [text, setText] = useState("");
  const [recommend, setRecommend] = useState("yes");
  const [isEditing, setIsEditing] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const navigate = useNavigate();

  // Load evaluation if it exists
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("studentEvaluation"));
    if (stored) {
      setEvaluation(stored);
      setText(stored.text);
      setRecommend(stored.recommend);
      setCompanyName(stored.companyName); // store the company name in state
    }
  }, []);

  const handleSubmit = () => {
    if (!companyName) {
      alert("Please enter the company name.");
      return;
    }

    const existingEvaluation = JSON.parse(localStorage.getItem("studentEvaluations"));
    if (existingEvaluation && existingEvaluation[companyName]) {
      alert("You have already submitted an evaluation for this company.");
      return;
    }

    // Ask for confirmation before submitting
    const confirmSubmit = window.confirm("Are you sure you want to submit this evaluation? You can only submit once per company.");
    if (!confirmSubmit) {
      return; // Do nothing if the user cancels
    }

    const newEval = { text, recommend, companyName };
    const storedEvaluations = existingEvaluation || {};
    storedEvaluations[companyName] = newEval;
    localStorage.setItem("studentEvaluations", JSON.stringify(storedEvaluations));

    setEvaluation(newEval);
    setIsEditing(false);
  };

  const handleSubmitAndNavigate = () => {
    // Optional: You can send the data to a backend here before clearing it
    localStorage.removeItem("studentEvaluation"); // Clear the evaluation
    setEvaluation(null);
    setText("");
    setRecommend("yes");
    setCompanyName(""); // Clear company name after submission
    navigate("/student-dashboard");
  };

  const handleDelete = () => {
    localStorage.removeItem("studentEvaluation");
    setEvaluation(null);
    setText("");
    setRecommend("yes");
    setCompanyName(""); // Clear company name after deletion
  };

  return (
    <div style={styles.container}><div className="fixed top-0 left-0 right-0 z-50 w-full bg-[#00106A] py-6 px-6 flex items-center justify-between">

    {/* Empty div for spacing or future icons */}
    <div className="w-1/3" />
  
    {/* Centered Title */}
    <div className="w-1/3 text-center">
      <h1 className="text-3xl font-bold text-white">Company Evaluation</h1>
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
  
      <input
        type="text"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        placeholder="Enter the company name"
        style={styles.input}
      />

      {evaluation && !isEditing ? (
        <div style={styles.card}>
          <p><strong>Your Evaluation:</strong> {evaluation.text}</p>
          <p><strong>Recommend to others?</strong> {evaluation.recommend === "yes" ? "✅ Yes" : "❌ No"}</p>
          <button onClick={() => setIsEditing(true)} style={styles.button}>Edit</button>
          <button onClick={handleDelete} style={{ ...styles.button, backgroundColor: "#e63946" }}>Delete</button>
          <button onClick={handleSubmitAndNavigate} style={{ ...styles.button, backgroundColor: "#28a745" }}>
            Submit 
          </button>
        </div>
      ) : (
        <div style={styles.form}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your evaluation about the company..."
            style={styles.textarea}
          />
          <div>
            <label>
              <input
                type="radio"
                name="recommend"
                value="yes"
                checked={recommend === "yes"}
                onChange={() => setRecommend("yes")}
              />
              Recommend
            </label>
            <label style={{ marginLeft: "20px" }}>
              <input
                type="radio"
                name="recommend"
                value="no"
                checked={recommend === "no"}
                onChange={() => setRecommend("no")}
              />
              Don't Recommend
            </label>
          </div>
          <button onClick={handleSubmit} style={styles.button}>
            {evaluation ? "Update Evaluation" : "Submit Evaluation"}
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "100px",
    textAlign: "center",
    maxWidth: "600px",
    margin: "0 auto",
  },
  card: {
    backgroundColor: "#f1f1f1",
    padding: "20px",
    borderRadius: "10px",
    marginTop: "20px",
  },
  form: {
    marginTop: "20px",
  },
  textarea: {
    width: "100%",
    height: "120px",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    backgroundColor: "#2b7de9",
    color: "#fff",
    padding: "10px 15px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px",
    marginRight: "10px",
  },
};

export default StudentEvaluation;
