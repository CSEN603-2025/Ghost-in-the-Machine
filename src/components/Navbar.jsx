import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="bg-[#000B4F] text-white fixed top-0 left-0 w-full shadow-md z-50">
      <div className="flex justify-between items-center h-20 max-w-[1240px] mx-auto px-6">
        <h1 className="text-3xl font-bold text-[#EBEBEB]">GUC.</h1>

        <ul className="hidden md:flex gap-8 text-[#EBEBEB]">
          <li className="hover:text-[#829CD0] transition duration-300 cursor-pointer">Home</li>
          <li className="hover:text-[#829CD0] transition duration-300 cursor-pointer">About</li>
          <li className="hover:text-[#829CD0] transition duration-300 cursor-pointer">Contact</li>
        </ul>

        <div onClick={handleNav} className="block md:hidden cursor-pointer">
          {!nav ? <AiOutlineMenu size={24} /> : <AiOutlineClose size={24} />}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 left-0 w-[60%] h-full bg-[#20368F] text-white transition-transform duration-500 ${
          nav ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h1 className="text-3xl font-bold m-4 text-[#EBEBEB]">GUC.</h1>
        <ul className="pt-10 uppercase">
          <li className="p-4 border-b border-[#829CD0] hover:text-[#EBEBEB]">Home</li>
          <li className="p-4 border-b border-[#829CD0] hover:text-[#EBEBEB]">About</li>
          <li className="p-4 border-b border-[#829CD0] hover:text-[#EBEBEB]">Contact</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
