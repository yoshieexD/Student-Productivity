import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTasks, FaClock, FaStickyNote, FaTrophy } from 'react-icons/fa';
import { AiOutlinePaperClip } from "react-icons/ai";

const Sidebar = () => {
    const [hoverNotes, setHoverNotes] = useState(false);
    const NotesStyle = {
        backgroundColor: hoverNotes ? '#8B4513' : '',
    }

    return (
        <div className='w-1/5 h-screen '>
            <div className='w-full p-4 space-y-3'>
                <Link to='/auth/todo' className='flex  py-2 items-center space-x-2 hover:bg-green-600 hover:w-full'>
                    <div className='bg-green-600 p-3 rounded-full'><FaTasks className='text-xl text-white' /></div>
                    <p className='md:text-md md:block font-medium text-gray-700 xxs:hidden'>Todo Board</p>
                </Link>
                <Link to="/auth/pomorodo" className='flex  py-2 items-center space-x-2 hover:bg-red-600 hover:w-full'>
                    <div className='bg-red-600 p-3 rounded-full'><FaClock className='text-xl text-white' /></div>
                    <p className='md:text-md md:block font-medium text-gray-700 xxs:hidden ' >Pomodoro</p>
                </Link>
                <Link to="/auth/notes" className='flex  py-2 items-center space-x-2' style={NotesStyle} onMouseEnter={() => setHoverNotes(true)} onMouseLeave={() => setHoverNotes(false)}>
                    <div style={{ backgroundColor: '#8B4513' }} className=' p-3 rounded-full' ><FaStickyNote className='text-xl text-white' /></div>
                    <p className='md:text-md md:block font-medium text-gray-700 xxs:hidden'>Notes</p>
                </Link>
                <Link to="/auth/link" className='flex  py-2 items-center space-x-2 hover:bg-violet-600 hover:W-full'>
                    <div className='bg-violet-600 p-3 rounded-full'><AiOutlinePaperClip className='text-xl text-white' /></div>
                    <p className='md:text-md md:block font-medium text-gray-700 xxs:hidden'>Link Saved</p>
                </Link>
                <Link to="/auth/leaderboard" className='flex  py-2 items-center space-x-2 hover:bg-yellow-600 hover:w-full'>
                    <div className='bg-yellow-600 p-3 rounded-full'><FaTrophy className='text-xl text-white' /></div>
                    <p className='md:text-md md:block font-medium text-gray-700 xxs:hidden'>Leaderboard</p>
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
