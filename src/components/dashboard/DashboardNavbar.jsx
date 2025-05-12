import React from "react";
import { Link } from "react-router-dom";

const DashboardNavbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full bg-[#00106A] py-6 px-6 flex items-center justify-between">
      <div className="w-1/3" />
      <div className="w-1/3 text-center">
        <h1 className="text-3xl font-bold text-white">Student Dashboard</h1>
      </div>
      <div className="w-1/3 flex justify-end space-x-4">
        <button
          onClick={() => (window.location.href = "/student")}
          className="bg-gradient-to-r from-[#00F0B5] to-[#00D6A0] hover:from-[#00D6A0] hover:to-[#00F0B5] text-black font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300"
        >
          Home
        </button>
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
          className="bg-gradient-to-r from-red-500 to-red-400 hover:from-red-600 hover:to-red-500 text-white py-2 px-4 rounded-lg shadow-md transition-all duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardNavbar;
