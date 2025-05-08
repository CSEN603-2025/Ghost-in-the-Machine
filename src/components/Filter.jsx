import React, { useState } from 'react';

const Filter = ({ onFilter }) => {
    const [major, setMajor] = useState('');
    const [status, setStatus] = useState('');

    const handleFilter = () => {
        onFilter({ major, status });
    };

    return (
        <div className="filter">
            <label>
                Major:
                <select value={major} onChange={(e) => setMajor(e.target.value)}>
                    <option value="">All</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Graphic Design">Graphic Design</option>
                    {/* Add more majors */}
                </select>
            </label>
            <label>
                Status:
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="">All</option>
                    <option value="Pending">Pending</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Flagged">Flagged</option>
                </select>
            </label>
            <button onClick={handleFilter}>Filter</button>
        </div>
    );
};

export default Filter;
