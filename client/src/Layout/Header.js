import React, { useContext } from 'react';
import { AuthContext } from '../context/authStore';
import { FaFacebookMessenger } from "react-icons/fa";
import { IoNotifications, IoSearchOutline } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io"

const Header = () => {
    const user = useContext(AuthContext);
    return (
        <div className='bg-slate-50 w-full flex justify-between px-5 drop-shadow-sm pt-1 pb-2'>
            <div className='flex  flex-row items-center border border-gray-300 h-[40px] space-x-1'>
                <IoSearchOutline className='text-gray-400 ml-2' />
                <input type='text' className='appearance-none focus:outline-none h-full bg-slate-50' placeholder='Search...' />
            </div>
            <div className='flex space-x-3'>
                <div className='bg-blue-600 p-2 rounded-full'><FaFacebookMessenger className="text-white text-2xl" /></div>
                <div className='bg-blue-600 p-2 rounded-full'><IoNotifications className="text-white text-2xl" /></div>
                <div className='flex my-auto'>
                    <div className='text-gray-800'>{user.userName}</div>
                    <div style={{ cursor: 'pointer' }}><IoMdArrowDropdown /></div>
                </div>
            </div>
        </div >
    );
};

export default Header;