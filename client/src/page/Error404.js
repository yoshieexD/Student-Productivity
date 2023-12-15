import React from 'react';
import { Link } from 'react-router-dom';
const Error404 = () => {
    return (
        <div className='grid h-screen place-items-center'>
            <div className='space-x-4 space-y-4 flex flex-col items-center'>
                <p className='text-8xl text-gray-700'>404</p>
                <div className='space-y-2 flex flex-col items-center'>
                    <p className='text-xl text-gray-600'>Sorry we couldn't find what you are looking for!</p>
                    <Link to="/" className='text-lg text-gray-600 bg-gray-200 py-1 px-4 rounded-md'>Go back</Link>
                </div>

            </div>
        </div>
    );
};

export default Error404;