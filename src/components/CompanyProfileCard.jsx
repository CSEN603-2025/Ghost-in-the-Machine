import React from 'react';

function CompanyProfileCard({ companyInfo }) {
  // Default fallback info
  const defaultInfo = {
    name: "Example Company",
    industry: "Software",
    size: "Medium",
    email: "example@company.com",
    logoUrl: "https://via.placeholder.com/120",
    phone: "+123-458-784",
    website: "companywebsite.com",
    address: "123 Main St, City",
  };

  const info = companyInfo || defaultInfo;

  return (
    <div className="profile-card w-[300px] rounded-md shadow-xl overflow-hidden z-[100] relative snap-start shrink-0 bg-white flex flex-col items-center justify-center gap-3 transition-all duration-300 group">
      
      {/* Avatar Section */}
      <div className="avatar w-full pt-5 flex items-center justify-center flex-col gap-1">
        <div className="img_container w-full flex items-center justify-center relative z-40 
        after:absolute after:h-[6px] after:w-full after:bg-[#274472] after:top-4 
        after:group-hover:size-[1%] after:delay-300 after:group-hover:delay-0 
        after:group-hover:transition-all after:group-hover:duration-300 after:transition-all after:duration-300 
        before:absolute before:h-[6px] before:w-full before:bg-[#274472] before:bottom-4 
        before:group-hover:size-[1%] before:delay-300 before:group-hover:delay-0 
        before:group-hover:transition-all before:group-hover:duration-300 before:transition-all before:duration-300">
          
          <img
  src={info.logoUrl}
  alt="Company Logo"
  className="size-36 z-40 border-4 border-white rounded-full group-hover:border-8 
  group-hover:transition-all group-hover:duration-300 transition-all duration-300 
  object-contain bg-gray-100"
/>

          {/* Background Decoration */}
          <div className="absolute bg-[#274472] z-10 size-[60%] w-full group-hover:size-[1%] 
          group-hover:transition-all group-hover:duration-300 transition-all duration-300 delay-700 group-hover:delay-0"></div>
        </div>
      </div>

      {/* Headings */}
      <div className="headings text-center leading-4">
        <p className="text-xl font-serif font-semibold text-[#434955]">{info.name}</p>
        <p className="text-sm font-semibold text-[#434955]">{info.industry}</p>
      </div>

      {/* Details List */}
      <div className="w-full items-center justify-center flex">
        <ul className="flex flex-col items-start gap-2 has-[:last]:border-b-0 pb-3 
        *:inline-flex *:gap-2 *:items-center *:justify-center *:border-b-[1.5px] 
        *:border-b-stone-700 *:border-dotted *:text-xs *:font-semibold *:text-[#434955]">

          <li>
            <svg viewBox="0 0 24 24" className="fill-stone-700 group-hover:fill-[#274472]" height="15" width="15" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M19.23 15.26l-2.54-.29c-.61-.07-1.21.14-1.64.57l-1.84 1.84c-2.83-1.44-5.15-3.75-6.59-6.59l1.85-1.85c.43-.43.64-1.03.57-1.64l-.29-2.52c-.12-1.01-.97-1.77-1.99-1.77H5.03c-1.13 0-2.07.94-2 2.07.53 8.54 7.36 15.36 15.89 15.89 1.13.07 2.07-.87 2.07-2v-1.73c.01-1.01-.75-1.86-1.76-1.98z" />
            </svg>
            <p>{info.phone || "+123-458-784"}</p>
          </li>

          <li>
            <svg className="fill-stone-700 group-hover:fill-[#274472]" height="15" width="15" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <path d="M16,14.81,28.78,6.6A3,3,0,0,0,27,6H5a3,3,0,0,0-1.78.6Z" />
              <path d="M16.54,16.84h0l-.17.08-.08,0A1,1,0,0,1,16,17h0a1,1,0,0,1-.25,0l-.08,0-.17-.08h0L2.1,8.26A3,3,0,0,0,2,9V23a3,3,0,0,0,3,3H27a3,3,0,0,0,3-3V9a3,3,0,0,0-.1-.74Z" />
            </svg>
            <p>{info.email}</p>
          </li>

          <li>
  {/* Company Size Icon - People/Group */}
  <svg className="fill-stone-700 group-hover:fill-[#274472]" height="18" width="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 11c1.66 0 3-1.34 3-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 2.07 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
  </svg>
  <p>{info.size || "Medium"}</p>
</li>

<li>
  {/* Company Industry Icon - Building */}
  <svg className="fill-stone-700 group-hover:fill-[#274472]" height="18" width="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7v13h20V7L12 2zm0 2.18L18.74 7H5.26L12 4.18zM12 22v-8h8v8h-8zM4 20v-8h8v8H4z"/>
  </svg>
  <p>{info.industry || "Software"}</p>
</li>

        </ul>
      </div>

      {/* Bottom Line */}
      <hr className="w-full group-hover:h-5 h-3 bg-[#274472] group-hover:transition-all group-hover:duration-300 transition-all duration-300" />
    </div>
  );
}

export default CompanyProfileCard;
