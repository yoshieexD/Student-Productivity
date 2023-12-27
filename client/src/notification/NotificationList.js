import React from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';

const NotificationList = ({ name, onAccept, onDecline, key }) => {
    return (
        <div className='mt-5' key={key}>
            <div className='flex justify-between'>
                <div className="flex flex-col">
                    <p className='italic font-semibold'>{name}</p>
                    <p className='text-sm text-gray-600'>sent you a friend request</p>
                </div>
                <div className=" space-x-2 bg-green">
                    <button className="bg-green-500 text-white p-1 rounded-full hover:bg-green-600 focus:outline-none focus:shadow-outline-green" onClick={onAccept}>
                        <FaCheck className='text-xs' />
                    </button>
                    <button className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600 focus:outline-none focus:shadow-outline-red" onClick={onDecline}>
                        <FaTimes className='text-xs' />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotificationList;
