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
    industry: "Technology",
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
  // Add more companies as needed
];

const CompanyDetailsPage = () => {
  const { companyName } = useParams();
  const company = allSuggestedCompanies.find((c) => c.name === companyName);

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
      <h1 style={styles.title}>{company.name}</h1>
      {company.imageUrl && (
        <img
          src={company.imageUrl}
          alt={`${company.name} logo`}
          style={styles.image}
        />
      )}
      <p><strong>Industry:</strong> {company.industry}</p>
      <p><strong>Company Size:</strong> {company.size}</p>
      <p><strong>Email:</strong> {company.email}</p>
      <p><strong>Phone:</strong> {company.phone}</p>
      <p><strong>Address:</strong> {company.address}</p>
      <p><strong>Recommendations:</strong> {company.recommendations} / 5</p>
      <p><strong>Document:</strong> {company.documentName}</p>

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
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "16px",
  },
  image: {
    width: "120px",
    height: "120px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "16px",
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
