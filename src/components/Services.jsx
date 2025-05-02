import React from 'react';

const Services = () => {
  const cards = [
    {
      title: 'For Students',
      emoji: '🎓',
      desc: 'Browse internships, apply with ease, track your status, submit evaluations, and generate polished reports.',
    },
    {
      title: 'For Companies',
      emoji: '🏢',
      desc: 'Post internships, view applicant profiles, manage intern progress, and submit confidential evaluations.',
    },
    {
      title: 'For SCAD & Faculty',
      emoji: '🧑‍🏫',
      desc: 'Oversee student progress, review reports, view evaluations, manage cycles, and generate real-time statistics.',
    },
  ];

  return (
    <div className="bg-[#EBEBEB] py-20 px-4 text-center">
      <h2 className="text-4xl font-bold text-[#000B4F] mb-12">Who Is This For?</h2>

      <div className="max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-8 hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="text-5xl mb-4">{card.emoji}</div>
            <h3 className="text-xl font-bold text-[#20368F] mb-2">{card.title}</h3>
            <p className="text-[#323232] text-base leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
