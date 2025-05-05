import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import ClickableCard from '../components/ClickableCard';
import SearchBar from '../components/SearchBar';

const RegisteredStudents = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState(' ');
    const handleCardClick = (route) => { navigate(route);};

const studentList = [
    {
        header: 'Ahmed Elsayed',
        details: '58-1234 MET',
        nextPage: '/student1'
    },
    {
        header: 'Mohamed Khaled',
        details: '59-4567 IET',
        nextPage: '/student2'
    },
    {
        header: 'Sara Mostafa',
        details: '57-8910 EMS',
        nextPage: '/student3'
    },
    {
        header: 'Nora Samir',
        details: '60-2345 MNGT',
        nextPage: '/student4'
    },
    {
        header: 'Omar Hussein',
        details: '56-6789 BI',
        nextPage: '/student5'
    },
    {
        header: 'Layla Ibrahim',
        details: '55-0123 MET',
        nextPage: '/student6'
    },
];

const filteredStudents = studentList.filter((card) => 
    card.header.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.details.toLowerCase().includes(searchTerm.toLowerCase())
);

return(
    <div className="min-h-screen bg-[#EAEAEA]">
    {/* Top Navbar */}
    <div className="w-full bg-[#00106A] py-6 px-6 flex items-center justify-between">
      <div className="w-1/3" />
      <div className="w-1/3 text-center">
        <h1 className="text-3xl font-bold text-white">SCAD Registered Students</h1>
      </div>
      <div className="w-1/3 flex justify-end space-x-4">
        <button
          onClick={() => navigate('/')}
          className="bg-gradient-to-r from-[#00F0B5] to-[#00D6A0] hover:from-[#00D6A0] hover:to-[#00F0B5] text-black font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300"
        >
          Home
        </button>
        <button
          onClick={() => navigate('/welcome')}
          className="bg-gradient-to-r from-red-500 to-red-400 hover:from-red-600 hover:to-red-500 text-white py-2 px-4 rounded-lg shadow-md transition-all duration-300"
        >
          Logout
        </button>
      </div>
    </div>
    <div className = "px-6 pt-10">
        <SearchBar 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeHolder='Search students...'
        />
    </div>

    {/* Dashboard Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 px-6 pb-12 pt-10">
      {filteredStudents.map((card) => (
        <ClickableCard
          key={card.nextPage}
          header={card.header}
          details={card.details}
          nextPage={card.nextPage}
          onClick={() => handleCardClick(card.nextPage)}
        />
      ))}
    </div>
  </div>
);
};

export default RegisteredStudents;