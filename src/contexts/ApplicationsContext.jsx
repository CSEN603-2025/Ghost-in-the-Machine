import React, { createContext, useState } from 'react';

// Create Context
export const ApplicationsContext = createContext();

// Create Provider
export const ApplicationsProvider = ({ children }) => {
  const [applications, setApplications] = useState([
    {
      id: 1,
      studentName: 'Ahmed Ali',
      major: 'Computer Engineering',
      email: 'ahmed.ali@gmail.com',
      phone: '+201234567890',
      cv: 'CV_Ahmed.pdf',
      internshipTitle: 'Frontend Developer Intern',
      status: 'Current Intern', // Intern currently working
    },
    {
      id: 2,
      studentName: 'Mona Saeed',
      major: 'Business Administration',
      email: 'mona.saeed@gmail.com',
      phone: '+201098765432',
      cv: 'CV_Mona.pdf',
      internshipTitle: 'Data Analyst Intern',
      status: 'Internship Complete', // Finished internship
    },
    {
      id: 3,
      studentName: 'Khaled Mostafa',
      major: 'Computer Science',
      email: 'khaled.mostafa@gmail.com',
      phone: '+201112223334',
      cv: 'CV_Khaled.pdf',
      internshipTitle: 'Mobile Developer Intern',
      status: 'Pending', // Application still pending
    },
    {
      id: 4,
      studentName: 'Sarah Kamal',
      major: 'Marketing',
      email: 'sarah.kamal@gmail.com',
      phone: '+201234111222',
      cv: 'CV_Sarah.pdf',
      internshipTitle: 'Marketing Intern',
      status: 'Rejected', // Application rejected
    },
    {
      id: 5,
      studentName: 'Omar Hussein',
      major: 'Software Engineering',
      email: 'omar.hussein@gmail.com',
      phone: '+201234333222',
      cv: 'CV_Omar.pdf',
      internshipTitle: 'Backend Developer Intern',
      status: 'Accepted', // Application accepted but not started yet
    },
    {
      id: 6,
      studentName: 'Layla Nasser',
      major: 'Graphic Design',
      email: 'layla.nasser@gmail.com',
      phone: '+201223344556',
      cv: 'CV_Layla.pdf',
      internshipTitle: 'UI/UX Designer Intern',
      status: 'Current Intern', // Intern currently working
    },
    {
      id: 7,
      studentName: 'Youssef Adel',
      major: 'Information Systems',
      email: 'youssef.adel@gmail.com',
      phone: '+201223311556',
      cv: 'CV_Youssef.pdf',
      internshipTitle: 'Data Analyst Intern',
      status: 'Internship Complete', // Finished internship
    },
  ]);

  return (
    <ApplicationsContext.Provider value={{ applications, setApplications }}>
      {children}
    </ApplicationsContext.Provider>
  );
};
