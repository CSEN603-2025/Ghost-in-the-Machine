import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactTyped } from 'react-typed';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-gradient-to-b from-[#000B4F] to-[#20368F] text-white h-screen w-full overflow-hidden">
      {/* Overlay Graphic Blur */}
      <div className="absolute top-0 left-0 w-full h-full bg-[#000B4F]/60 z-0 backdrop-blur-sm"></div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-[1240px] mx-auto px-6 h-full flex flex-col justify-center items-center text-center">
        <p className="text-[#829CD0] font-semibold uppercase tracking-widest mb-4">
          Empowering Your Internship Journey
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#EBEBEB] leading-tight drop-shadow-md">
          GUC Internship System
        </h1>

        <div className="flex flex-wrap justify-center items-center mt-6 mb-4">
          <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#EBEBEB]">
            For
          </p>
          <ReactTyped
            className="text-xl sm:text-2xl md:text-3xl font-bold text-[#00df9a] ml-3"
            strings={['Students', 'Companies', 'SCAD', 'Faculty']}
            typeSpeed={100}
            backSpeed={60}
            loop
          />
        </div>

        <p className="text-[#c5c5c5] max-w-[700px] mt-4 text-base sm:text-lg px-2">
          Apply, manage, and showcase your internships through a single intuitive platform designed to streamline your academic and professional growth.
        </p>

        <button
          onClick={() => navigate('/welcome')}
          className="mt-8 bg-[#00df9a] text-black px-8 py-3 rounded-md font-semibold text-lg hover:bg-[#1fffb3] transition duration-300 shadow-lg"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Hero;
