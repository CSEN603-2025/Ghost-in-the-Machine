import React from 'react';

function CompanyProfileCard({ companyInfo }) {
    // If no companyInfo provided, use default dummy data
    const defaultInfo = {
        name: "Example Company",
        industry: "Software",
        size: "Medium",
        email: "example@company.com",
        logoUrl: "https://via.placeholder.com/120",
    };

    const info = companyInfo || defaultInfo;

    return (
        <div style={styles.card}>
            <img src={info.logoUrl} alt="Company Logo" style={styles.logo} />
            <h2 style={styles.name}>{info.name}</h2>
            <p style={styles.text}><strong>Industry:</strong> {info.industry}</p>
            <p style={styles.text}><strong>Size:</strong> {info.size}</p>
            <p style={styles.text}><strong>Email:</strong> {info.email}</p>
        </div>
    );
}

const styles = {
    card: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        textAlign: 'center',
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        marginBottom: '20px',
        maxWidth: '400px',
        margin: '20px auto',
    },
    logo: {
        width: '120px',
        height: '120px',
        objectFit: 'contain',
        borderRadius: '50%',
        marginBottom: '15px',
        backgroundColor: '#f5f5f5',
        display: 'block',           // ADD THIS
        margin: '0 auto 15px auto', // FIX MARGINS TO CENTER
    },
    name: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '10px',
        color: '#333',
    },
    text: {
        marginBottom: '8px',
        fontSize: '16px',
        color: '#555',
    },
};

export default CompanyProfileCard;
