import React from 'react';

const Container = ({ children, className }) => {
    return (
        <div className={`bg-white shadow-sm rounded-lg ${className}`}>
            {children}
        </div>
    );
};

export default Container;
