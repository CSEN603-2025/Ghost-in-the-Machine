import React, { useState } from 'react';
import ReportCard from './ReportCard';
import Filter from './Filter';
import Pagination from './Pagination';
import ReportDetailsModal from './ReportDetailsModal';

const ReportsList = () => {
    const [reports] = useState([
        {
            id: 1,
            studentName: 'John Doe',
            companyName: 'TechCorp',
            major: 'Computer Science',
            status: 'Pending',
            title: 'Internship Report 1',
            reportContent: 'This is a detailed report...'
        },
        {
            id: 2,
            studentName: 'Jane Smith',
            companyName: 'DesignCo',
            major: 'Graphic Design',
            status: 'Accepted',
            title: 'Internship Report 2',
            reportContent: 'This is another report...'
        },
        // More reports here...
    ]);
    const [filteredReports, setFilteredReports] = useState(reports);
    const [selectedReport, setSelectedReport] = useState(null);

    const handleFilter = (filterData) => {
        const { major, status } = filterData;
        const newFilteredReports = reports.filter(report => {
            return (
                (major ? report.major === major : true) &&
                (status ? report.status === status : true)
            );
        });
        setFilteredReports(newFilteredReports);
    };

    const handleSelectReport = (report) => {
        setSelectedReport(report);
    };

    const handleCloseModal = () => {
        setSelectedReport(null);
    };

    return (
        <div className="reports-list">
            <h1>Internship Reports</h1>
            <Filter onFilter={handleFilter} />
            <div className="report-cards">
                {filteredReports.map(report => (
                    <ReportCard
                        key={report.id}
                        report={report}
                        onSelect={handleSelectReport}
                    />
                ))}
            </div>
            <Pagination />
            {selectedReport && (
                <ReportDetailsModal
                    report={selectedReport}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default ReportsList;
