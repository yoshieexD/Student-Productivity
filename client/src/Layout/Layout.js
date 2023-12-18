import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
const Layout = ({ children }) => {
    return (
        <div className='bg-gray-100 h-screen overflow-hidden'>
            <Header className="w-full sticky" />
            <div className='flex flex-row space-x-2'>
                <Sidebar />
                <div className='w-4/5 p-4'>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;