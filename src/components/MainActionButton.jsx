import React from 'react';
import Button from './Button';

function MainActionButton({children, ...props}) {
    const style = {
        backgroundColor: '#0077ed',
        color: 'white',
        boxShadow: '0 2px 6px rgba(0, 123, 255, 0.84)'
    };
    return (
        <Button style = {style} {...props}>
            {children}
        </Button>
    );
}

export default MainActionButton;