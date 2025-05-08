import React from 'react';
import PropTypes from 'prop-types';

const EmailFilter = ({ folders, selectedFolder, onSelectFolder, searchTerm, onSearchTermChange }) => (
  <div className="flex items-center justify-between bg-white p-4 shadow-md">
    <div className="flex items-center space-x-2">
      <label htmlFor="folder" className="text-sm font-medium text-gray-700">Folder:</label>
      <select
        id="folder"
        value={selectedFolder}
        onChange={(e) => onSelectFolder(e.target.value)}
        className="border-gray-300 rounded-md py-1 px-2 focus:border-[#00106A] focus:ring-[#00106A]"
      >
        {folders.map((folder) => (
          <option key={folder} value={folder}>{folder}</option>
        ))}
      </select>
    </div>
    <div className="flex-1 mx-4">
      <input
        type="text"
        placeholder="Search emails..."
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
        className="w-full border-gray-300 rounded-md py-1 px-2 focus:border-[#00106A] focus:ring-[#00106A]"
      />
    </div>
  </div>
);

EmailFilter.propTypes = {
  folders: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedFolder: PropTypes.string.isRequired,
  onSelectFolder: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  onSearchTermChange: PropTypes.func.isRequired,
};

export default EmailFilter;