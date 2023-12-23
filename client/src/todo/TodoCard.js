import React from 'react';

const TodoCard = ({ title, key }) => {
    return (
        <div className='bg-white w-[94%] flex  px-2 pt-2 pb-8 rounded-sm  text-base shadow-sm' key={key}>
            {title}
        </div>
    );
};

export default TodoCard;