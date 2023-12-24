import React from 'react';

const TodoCard = ({ title, key, description }) => {
    return (
        <div className='bg-white w-[94%] flex px-2 pt-2 pb-2 rounded-sm text-base shadow-sm'>
            <div>
                <h2 className='text-gray-900 text-lg font-semibold leading-snug'>{title}</h2>
                <p class="mt-2 text-sm italic text-gray-400 break-all">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default TodoCard;
