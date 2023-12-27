import React from 'react';

const NotificationCard = ({ children }) => {
    return (
        <div className='absolute right-20 top-12 pt-2 pb-8 px-10 bg-white shadow-sm'>
            {children}
        </div>
    );
};

export default NotificationCard;