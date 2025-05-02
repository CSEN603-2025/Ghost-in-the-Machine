import React from 'react';

function Button({children, onClick, type = 'button', style = {}}){
    return ( <button 
        type = {type}
        onclick = {onclick}
        style = {{...baseStyle, ...style}}
        >
            {children}
        </button>
     );
}

const baseStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
};

export default Button;