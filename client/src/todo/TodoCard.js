import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

const TodoCard = ({ title, description, date }) => {
    const [expired, setExpired] = useState(false);

    useEffect(() => {
        const now = new Date();
        const isExpired = now >= dayjs(date).toDate();
        setExpired(isExpired);
    }, [date]);

    return (
        <div className='bg-white w-[94%] flex px-2 pt-2 pb-2 rounded-sm text-base shadow-sm'>
            <div className='w-full '>
                <div className='flex justify-between '>
                    <h2 className='text-gray-900 text-lg font-semibold leading-snug'>{title}</h2>
                    <div className={`${expired ? 'bg-red-500' : 'bg-green-500'} rounded-lg`}>
                        <p className='text-xs font-semibold text-white '>
                            {dayjs(date).format('MMMM DD YYYY')}
                        </p>
                    </div>
                </div>
                <p className="mt-2 text-sm italic text-gray-400 break-all">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default TodoCard;
