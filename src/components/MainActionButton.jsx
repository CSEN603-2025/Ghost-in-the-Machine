import React from 'react';
import Button from './Button';
import PropTypes from 'prop-types';

function MainActionButton({ children, variant = 'primary', ...props }) {
    // Muted blue theme variants
    const variants = {
        primary:   { backgroundColor: '#027aff', color: 'white', boxShadow: '0 2px 6px rgba(2, 122, 255, 0.5)' },
        secondary: { backgroundColor: '#6B83BF', color: 'white', boxShadow: '0 2px 6px rgba(107, 131, 191, 0.5)' },
        accent:    { backgroundColor: '#8A9CC3', color: 'white', boxShadow: '0 2px 6px rgba(138, 156, 195, 0.5)' },
        danger:    { backgroundColor: '#D9534F', color: 'white', boxShadow: '0 2px 6px rgba(217, 83, 79, 0.5)' }
    };
    const style = variants[variant] || variants.primary;
    return (
        <Button style={style} {...props}>
            {children}
        </Button>
    );
}

// Enumerate allowed variants
MainActionButton.propTypes = {
    variant: PropTypes.oneOf(['primary', 'secondary', 'accent', 'danger']),
    children: PropTypes.node
};
MainActionButton.defaultProps = {
    variant: 'primary'
};

export default MainActionButton;