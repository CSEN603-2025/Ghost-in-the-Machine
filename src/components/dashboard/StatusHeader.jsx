import React from 'react';

const StatusHeader = ({ major, semester, isPro }) => (
  <div>
    <h1 style={{ textAlign: 'left', marginBottom: '10px', fontWeight: 'bold' }}>
      Student Dashboard {isPro && <span style={{ color: 'gold' }}>PRO</span>}
    </h1>
    <h3 style={{ textAlign: 'left' }}>Major: {major}</h3>
    <h3 style={{ textAlign: 'left' }}>Semester: {semester}</h3>
  </div>
);

export default StatusHeader;
