import React from 'react';

const AddCard = ({ children, onclick }) => {
    return (
        <div className='text-xs text-gray-500 font-light cursor-pointer' onClick={onclick}>
            {children}
        </div>
    );
};

export default AddCard;