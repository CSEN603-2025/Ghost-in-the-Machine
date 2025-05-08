import React, { useState } from 'react';

const ReportDetailsModal = ({ report, onClose }) => {
    const [status, setStatus] = useState(report.status);

    const handleChangeStatus = (newStatus) => {
        setStatus(newStatus);
        // Additional logic to update status in the system
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>{report.title}</h2>
                <p><strong>Student:</strong> {report.studentName}</p>
                <p><strong>Company:</strong> {report.companyName}</p>
                <p><strong>Major:</strong> {report.major}</p>
                <p><strong>Status:</strong> {status}</p>
                <p>{report.reportContent}</p>
                <div className="modal-actions">
                    <select value={status} onChange={(e) => handleChangeStatus(e.target.value)}>
                        <option value="Pending">Pending</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Flagged">Flagged</option>
                    </select>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default ReportDetailsModal;
