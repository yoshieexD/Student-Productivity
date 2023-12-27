import React from 'react';
import { IoNotifications } from "react-icons/io5";
const NotificationIcon = ({ onclick }) => {
    return (
        <button className='bg-blue-600 p-2 rounded-full' onClick={onclick}><IoNotifications className="text-white text-2xl" /></button>
    );
};

export default NotificationIcon;