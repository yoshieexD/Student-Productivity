import React from 'react';

const TodoContainer = ({ children }) => {
    return (
        <div className='w-3/12 bg-slate-200	 rounded-sm flex flex-col items-center shadow-sm '>
            {children}
        </div>
    );
};

export default TodoContainer;