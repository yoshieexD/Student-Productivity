import React from 'react';
import { FaTimes } from 'react-icons/fa';
const Modals = ({ isOpen, onClose, children, title }) => {
    const modalClasses = isOpen
        ? 'fixed inset-0 flex items-center justify-center'
        : 'hidden';
    return (
        <div>
            <div className={modalClasses}>
                <div className="fixed inset-0 bg-gray-600 opacity-50"></div>
                <div className="bg-white p-4 w-2/6  rounded-lg z-10 flex flex-col">
                    <div className='flex justify-between'>
                        <p>{title}</p>
                        <div className='flex justify-center items-center bg-red-600 p-1 rounded-full'>
                            <button onClick={onClose} className='text-white'><FaTimes /></button>
                        </div>
                    </div>
                    <div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modals;