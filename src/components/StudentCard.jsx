import React from 'react';
import ClickableCard from './ClickableCard';

const StudentCard = ({name, id, faculty, semester, internshipStatus, onClick}) => {
    const details = `ID: ${id} 
    Faculty: ${faculty}
    Semester: ${semester}
    Internship Status: ${internshipStatus}`;
    return(
        <ClickableCard
            header = {name}
            details = {details}
            nextPage = {nextPage}
            onClick={onClick}
        />
    )
};