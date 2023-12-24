import React from 'react';

const NotesContainer = ({ title, description, onContextMenu, id }) => {
    return (
        <div className='bg-white p-6 rounded-md shadow-md w-1/4' onContextMenu={(event) => onContextMenu(event, id)}>
            <h2 className='text-2xl font-semibold text-gray-800 mb-2'>{title}</h2>
            <p className='text-gray-600'>{description}</p>
        </div>
    );
};

export default NotesContainer;
