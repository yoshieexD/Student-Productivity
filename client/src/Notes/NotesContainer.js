import React from 'react';

const truncate = (str, maxlength) => {
    return str.length > maxlength ? str.slice(0, maxlength - 1) + '…' : str;
};

const NotesContainer = ({ title, description, onContextMenu, id, key }) => {
    return (
        <div className='bg-white p-6 rounded-md shadow-md w-1/4' onContextMenu={(event) => onContextMenu(event, id)} key={key}>
            <h2 className='text-2xl font-semibold text-gray-800 mb-2'>{title}</h2>
            <p className='text-gray-600 break-all'>{truncate(description, 50)}</p>
        </div>
    );
};

export default NotesContainer;
