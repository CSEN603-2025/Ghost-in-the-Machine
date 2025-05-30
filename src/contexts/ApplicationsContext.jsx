import React, { createContext, useState, useEffect } from 'react';

export const ApplicationsContext = createContext();

export const ApplicationsProvider = ({ children }) => {
  
 const [applications, setApplications] = useState(() => {
  const stored = sessionStorage.getItem('applications');
  return stored ? JSON.parse(stored) : defaultApplications;
});


 useEffect(() => {
  sessionStorage.setItem('applications', JSON.stringify(applications));
}, [applications]);

  const [evaluations, setEvaluations] = useState([]);

  return (
    <ApplicationsContext.Provider
      value={{ applications, setApplications, evaluations, setEvaluations }}
    >
      {children}
    </ApplicationsContext.Provider>
  );
};

// Moved your dummy data to a constant for reusability
const defaultApplications = [
  {
    id: 1,
    studentName: 'Ahmed Ali',
    major: 'Computer Engineering',
    email: 'ahmed.ali@gmail.com',
    phone: '+201234567890',
    cv: 'CV_Ahmed.pdf',
    internshipTitle: 'Frontend Developer Intern',
    status: 'Current Intern',
    image: 'https://randomuser.me/api/portraits/men/31.jpg',
  },
  {
    id: 2,
    studentName: 'Mona Saeed',
    major: 'Business Administration',
    email: 'mona.saeed@gmail.com',
    phone: '+201098765432',
    cv: 'CV_Mona.pdf',
    internshipTitle: 'Data Analyst Intern',
    status: 'Internship Complete',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: 3,
    studentName: 'Khaled Mostafa',
    major: 'Computer Science',
    email: 'khaled.mostafa@gmail.com',
    phone: '+201112223334',
    cv: 'CV_Khaled.pdf',
    internshipTitle: 'Devops Intern',
    status: 'Pending',
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
  },
  {
    id: 4,
    studentName: 'Sarah Kamal',
    major: 'Marketing',
    email: 'sarah.kamal@gmail.com',
    phone: '+201234111222',
    cv: 'CV_Sarah.pdf',
    internshipTitle: 'Frontend Developer Intern',
    status: 'Rejected',
    image: 'https://randomuser.me/api/portraits/women/55.jpg',
  },
  {
    id: 5,
    studentName: 'Omar Hussein',
    major: 'Software Engineering',
    email: 'omar.hussein@gmail.com',
    phone: '+201234333222',
    cv: 'CV_Omar.pdf',
    internshipTitle: 'Data Analyst Intern',
    status: 'Accepted',
    image: 'https://randomuser.me/api/portraits/men/23.jpg',
  },
  {
    id: 6,
    studentName: 'Layla Nasser',
    major: 'Graphic Design',
    email: 'layla.nasser@gmail.com',
    phone: '+201223344556',
    cv: 'CV_Layla.pdf',
    internshipTitle: 'Data Analyst Intern',
    status: 'Current Intern',
    image: 'https://randomuser.me/api/portraits/women/33.jpg',
  },
  {
    id: 7,
    studentName: 'Youssef Adel',
    major: 'Information Systems',
    email: 'youssef.adel@gmail.com',
    phone: '+201223311556',
    cv: 'CV_Youssef.pdf',
    internshipTitle: 'Data Analyst Intern',
    status: 'Internship Complete',
    image: 'https://randomuser.me/api/portraits/men/50.jpg',
  },
  {
    id: 8,
    studentName: 'Nada Elsharkawy',
    major: 'Finance',
    email: 'nada.elsharkawy@gmail.com',
    phone: '+201112345678',
    cv: 'CV_Nada.pdf',
    internshipTitle: 'Devops Intern',
    status: 'Accepted',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    id: 9,
    studentName: 'Hassan Farouk',
    major: 'Mechanical Engineering',
    email: 'hassan.farouk@gmail.com',
    phone: '+201123456789',
    cv: 'CV_Hassan.pdf',
    internshipTitle: 'Devops Intern',
    status: 'Pending',
    image: 'https://randomuser.me/api/portraits/men/61.jpg',
  },
  {
    id: 10,
    studentName: 'Dana Amer',
    major: 'Public Relations',
    email: 'dana.amer@gmail.com',
    phone: '+201122334455',
    cv: 'CV_Dana.pdf',
    internshipTitle: 'Frontend Developer Intern',
    status: 'Rejected',
    image: 'https://randomuser.me/api/portraits/women/71.jpg',
  },
  {
    id: 11,
    studentName: 'Ahmed Mohamed',
    major: 'Data Science',
    email: 'ziad.tawfik@gmail.com',
    phone: '+201234555678',
    cv: 'CV_ahmed.pdf',
    internshipTitle: 'Devops Intern',
    status: 'Pending',
    image: 'https://randomuser.me/api/portraits/men/12.jpg',
  },
  {
    id: 12,
    studentName: 'Farida Salem',
    major: 'Architecture',
    email: 'farida.salem@gmail.com',
    phone: '+201224466880',
    cv: 'CV_Farida.pdf',
    internshipTitle: 'Frontend Developer Intern',
    status: 'Pending',
    image: 'https://randomuser.me/api/portraits/women/58.jpg',
  },
];
