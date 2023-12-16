import React from 'react';

const AddCard = ({ children }) => {
    return (
        <div className='text-xs text-gray-500 font-light mt-2 mb-2'>
            {children}
        </div>
    );
};

export default AddCard;