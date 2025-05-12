import React from 'react';

const CompanyFilter = ({ companyFilter, onFilterChange, companies }) => (
  <div style={styles.filterContainer}>
    <select
      name="industry"
      value={companyFilter.industry}
      onChange={onFilterChange}
      style={styles.filterSelect}
    >
      <option value="">All Industries</option>
      <option value="Technology">Technology</option>
      <option value="Engineering">Engineering</option>
      <option value="Pharmaceutical">Pharmaceutical</option>
      <option value="Business">Business</option>
    </select>

    <select
      name="company"
      value={companyFilter.company}
      onChange={onFilterChange}
      style={styles.filterSelect}
    >
      <option value="">All Companies</option>
      {companies
        .filter((c) => companyFilter.industry === "" || c.industry === companyFilter.industry)
        .map((company) => (
          <option key={company.name} value={company.name}>
            {company.name}
          </option>
        ))}
    </select>
  </div>
);

const styles = {
  filterContainer: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  filterSelect: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
};

export default CompanyFilter;
