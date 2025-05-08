import React from 'react';

const EmailSidebar = ({ folders, selectedFolder, onSelectFolder }) => {
  return (
    <div className="w-1/4 bg-white shadow-lg p-4">
      <h2 className="text-lg font-semibold text-[#00106A] mb-4">Folders</h2>
      <ul>
        {folders.map((folder) => (
          <li key={folder} className="mb-2">
            <button
              onClick={() => onSelectFolder(folder)}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors duration-200 
                ${selectedFolder === folder ? 'bg-[#00F0B5] text-black' : 'hover:bg-gray-100 text-gray-700'}`}
            >
              {folder}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmailSidebar;