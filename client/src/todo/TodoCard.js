import React from 'react';

const TodoCard = ({ children }) => {
    return (
        <div className='bg-white w-[94%] flex  px-2 pt-2 pb-8 rounded-sm  text-base shadow-sm'>
            {children}
        </div>
    );
};

export default TodoCard;