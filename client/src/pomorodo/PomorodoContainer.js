import React from 'react';

const PomorodoContainer = ({ date, Minutes, Points, className }) => {
    return (
        <div className={`flex justify-around mb-2 bg-gray-300 rounded-lg py-2 shadow-sm  ${className}`}>
            <div className='text-gray-700'>{date}</div>
            <div className='text-gray-700'>{Minutes}</div>
            <div className='text-gray-700 font-semibold italic'>{Points}</div>
        </div>
    );
};

export default PomorodoContainer;