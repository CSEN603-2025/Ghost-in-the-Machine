import React from "react";
import { useParams, Link } from "react-router-dom";

const allSuggestedCompanies = [
  { name: "Valeo", industry: "Technology", recommendations: 4.5 },
  { name: "IBM", industry: "Technology", recommendations: 4.0 },
  { name: "Instabug", industry: "Technology", recommendations: 4.8 },
  { name: "Microsoft", industry: "Technology", recommendations: 4.7 },
  { name: "Siemens", industry: "Engineering", recommendations: 4.3 },
  { name: "Pfizer", industry: "Pharmaceutical", recommendations: 4.2 },
  { name: "Google", industry: "Technology", recommendations: 4.6 },
  { name: "Coca-Cola", industry: "Business", recommendations: 4.1 },
  { name: "Tesla", industry: "Engineering", recommendations: 4.4 },
  { name: "Johnson & Johnson", industry: "Pharmaceutical", recommendations: 4.5 },
];

const CompanyDetailsPage = () => {
  const { companyName } = useParams();
  const company = allSuggestedCompanies.find(c => c.name === companyName);

  if (!company) {
    return (
      <div style={styles.container}>
        <h2>Company not found.</h2>
        <Link to="/student-dashboard">
          <button style={styles.button}>Back to Dashboard</button>
        </Link>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1>{company.name}</h1>
      <p><strong>Industry:</strong> {company.industry}</p>
      <p><strong>Recommendations:</strong> {company.recommendations} / 5</p>

      <Link to="/student-dashboard">
        <button style={styles.button}>Back to Dashboard</button>
      </Link>
    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    textAlign: "left",
    marginTop: "80px",
  },
  button: {
    marginTop: "20px",
    padding: "10px 16px",
    backgroundColor: "#2b7de9",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default CompanyDetailsPage;
