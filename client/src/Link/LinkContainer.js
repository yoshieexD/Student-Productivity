import React from 'react';

const LinkContainer = ({ linkName, category, description, className, children, key }) => {
    return (
        <div className={`bg-white rounded-lg py-2 shadow-sm ${className}`} key={key}>
            <div className='flex justify-center  text-sm font-light w-1/4 '>{linkName}</div>
            <div className='flex justify-center  text-sm font-light w-1/4 '>{category}</div>
            <div className=' flex justify-center text-sm font-light w-1/4 '>{description}</div>
            {children}
        </div>
    );
};

export default LinkContainer;