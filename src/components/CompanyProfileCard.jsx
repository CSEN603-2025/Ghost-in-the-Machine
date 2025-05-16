import React from 'react';

function CompanyProfileCard({ companyInfo }) {
  // Default fallback info
  const defaultInfo = {
    name: "Example Company",
    industry: ["Software", "Business"],
    size: "Medium",
    email: "example@company.com",
    logoUrl: "https://via.placeholder.com/120",
    phone: "+123-458-784",
    website: "companywebsite.com",
    address: "123 Main St, City",
  };

  const info = companyInfo || defaultInfo;

  return (
    <div className="profile-card md:w-full w-[320px] rounded-lg shadow-xl overflow-hidden bg-white flex md:flex-row flex-col items-stretch transition-all duration-300 group md:p-0">
      
      {/* Avatar Section */}
      <div className="avatar md:w-1/3 w-full p-6 flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-gray-200 group-hover:to-gray-300 transition-all duration-300">
        <div className="relative mb-4">
          <img
            src={info.logoUrl}
            alt={`${info.name} Logo`}
            className="size-32 md:size-36 border-4 border-white rounded-full shadow-lg object-contain bg-white group-hover:scale-105 transition-transform duration-300"
          />
          {/* Optional: Online/Status indicator can be added here */}
        </div>
        <div className="text-center">
          <p className="text-xl md:text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">{info.name}</p>
         
        </div>
      </div>

      {/* Details Section */}
      <div className="md:w-2/3 w-full p-6 flex flex-col justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          
          <div className="flex items-center space-x-3">
            <svg className="w-6 h-6 text-blue-500 shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.46 4.383a1 1 0 01-.243 1.12l-2.278 2.278a11.134 11.134 0 005.442 5.442l2.278-2.278a1 1 0 011.12-.243l4.383 1.46a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
            <div>
              <p className="text-xs text-gray-500">Phone</p>
              <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300">{info.phone || defaultInfo.phone}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <svg className="w-6 h-6 text-blue-500 shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300">{info.email}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <svg className="w-6 h-6 text-blue-500 shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            <div>
              <p className="text-xs text-gray-500">Company Size</p>
              <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300">{info.size || "Not Specified"}</p>
            </div>
          </div>

         <div className="flex items-center space-x-3">
  <svg className="w-6 h-6 text-blue-500 shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M9 7h6v4H9V7z"></path></svg>
  <div>
    <p className="text-xs text-gray-500">Industry</p>
    <div className="flex flex-wrap gap-2 mt-1">
      {(Array.isArray(info.industry) ? info.industry : [info.industry || "Not Specified"]).map((ind, idx) => (
        <span
          key={idx}
          className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium"
        >
          {ind}
        </span>
      ))}
    </div>
  </div>
</div>


          {info.website && (
            <div className="flex items-center space-x-3 sm:col-span-2">
              <svg className="w-6 h-6 text-blue-500 shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
              <div>
                <p className="text-xs text-gray-500">Website</p>
                <a href={`http://${info.website}`} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-300">{info.website}</a>
              </div>
            </div>
          )}

          {info.address && (
            <div className="flex items-center space-x-3 sm:col-span-2">
              <svg className="w-6 h-6 text-blue-500 shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              <div>
                <p className="text-xs text-gray-500">Address</p>
                <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300">{info.address}</p>
              </div>
            </div>
          )}
        </div>
      </div>
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
