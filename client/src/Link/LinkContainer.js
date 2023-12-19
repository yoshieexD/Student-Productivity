import React from 'react';

const LinkContainer = ({ children, className }) => {
    return (
        <div className={`bg-white rounded-lg py-2 shadow-sm ${className}`}>
            {children}
        </div>
    );
};

export default LinkContainer;