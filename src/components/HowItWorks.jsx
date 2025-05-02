import React from 'react';
import { FaUserPlus, FaClipboardList, FaFileSignature, FaCheckCircle } from 'react-icons/fa';

const steps = [
  {
    icon: <FaUserPlus size={32} className="text-[#20368F]" />,
    title: 'Create Your Profile',
    desc: 'Students, companies, and SCAD create accounts and enter essential info.',
  },
  {
    icon: <FaClipboardList size={32} className="text-[#20368F]" />,
    title: 'Apply or Post Internships',
    desc: 'Students browse opportunities while companies post internships with requirements.',
  },
  {
    icon: <FaFileSignature size={32} className="text-[#20368F]" />,
    title: 'Submit & Evaluate',
    desc: 'Reports, progress, and evaluations are submitted digitally during or after internships.',
  },
  {
    icon: <FaCheckCircle size={32} className="text-[#20368F]" />,
    title: 'Track & Review',
    desc: 'SCAD and faculty review everything through a smart dashboard and provide feedback.',
  },
];

const HowItWorks = () => {
  return (
    <div className="bg-white py-20 px-4">
      <div className="max-w-[1240px] mx-auto text-center">
        <h2 className="text-4xl font-bold text-[#000B4F] mb-12">How It Works</h2>
        <div className="grid gap-10 md:grid-cols-4 sm:grid-cols-2">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-[#EBEBEB] rounded-lg shadow-md p-6 hover:shadow-xl transition duration-300 text-left"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-[#20368F]">{step.title}</h3>
              <p className="text-[#323232] text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
