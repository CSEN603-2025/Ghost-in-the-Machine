import React from 'react';

function MainActionButton({children, onClick, type = 'button', style = {}}) {
    return ( <button    
        type = {type}
        onClick = {onClick}
        style = {{ ...styles.button, ...style }}
        >
            {children}
        </button>
     );
}

const styles = {
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#007aff',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        boxShadow: '0 2px 6px rgba(0,122,255,0.3)',
        transition: 'background-color 0.2s ease',
    }
};

export default MainActionButton;