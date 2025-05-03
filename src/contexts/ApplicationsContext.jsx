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
      status: 'Pending',
    },
    {
      id: 2,
      studentName: 'Mona Saeed',
      major: 'Business Administration',
      email: 'mona.saeed@gmail.com',
      phone: '+201098765432',
      cv: 'CV_Mona.pdf',
      internshipTitle: 'Data Analyst Intern',
      status: 'Accepted',
    },
    {
      id: 3,
      studentName: 'Khaled Mostafa',
      major: 'Computer Science',
      email: 'khaled.mostafa@gmail.com',
      phone: '+201112223334',
      cv: 'CV_Khaled.pdf',
      internshipTitle: 'Mobile Developer Intern',
      status: 'Finalized',
    },
    {
      id: 4,
      studentName: 'Sarah Kamal',
      major: 'Marketing',
      email: 'sarah.kamal@gmail.com',
      phone: '+201234111222',
      cv: 'CV_Sarah.pdf',
      internshipTitle: 'Data Analyst Intern',
      status: 'Pending',
    },
  ]);

  return (
    <ApplicationsContext.Provider value={{ applications, setApplications }}>
      {children}
    </ApplicationsContext.Provider>
  );
};
