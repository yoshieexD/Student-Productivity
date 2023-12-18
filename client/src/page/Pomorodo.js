import React, { useState } from 'react';
import Layout from '../Layout/Layout';
import Container from '../shared/Container';
import { FaCaretRight, FaCog } from "react-icons/fa";
import { GiLaurelsTrophy } from "react-icons/gi";


const Pomorodo = () => {
    const [start, setStart] = useState(false);
    const handleStart = () => {
        if (start === false) {
            setStart(true)
        } else {
            setStart(false)
        }
    }
    return (
        <Layout>
            <h1 className='text-2xl font-semibold mb-4 text-red-600'>Pomorodo</h1>
            <div className='flex flex-col items-center h-screen'>
                <div className='w-4/5 h-2/5 flex space-x-5'>
                    <Container className='w-1/2 h-full flex flex-col items-center p-4'>
                        <div className='w-full flex justify-between'>
                            <p className='text-sm text-gray-400 italic'>1/4</p>
                            <p><FaCog className='text-gray-700 text-lg cursor-pointer' /></p>
                        </div>
                        <p className='font-bold md:text-9xl text-5xl text-gray-700'>25:00</p>
                        <br />
                        <div className='flex justify-around w-[50%] md:flex-row flex-col'>
                            <button className={start ? 'text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800 w-full' : 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full'} onClick={handleStart}>{start ? 'PAUSE' : 'START'}</button>
                            <p><FaCaretRight className='text-6xl text-gray-700 cursor-pointer' /></p>
                        </div>
                    </Container>
                    <Container className='w-1/2 h-full p-10'>
                        <div className='space-x-4 flex justify-center'>
                            <div className='flex flex-col items-center'>
                                <GiLaurelsTrophy className='text-5xl text-[#ffd700] ml-2' />
                                <div className='ml-4 flex flex-col items-center'>
                                    <p className='text-lg font-semibold'>2 Hour</p>
                                    <p className='text-gray-700 text-xs italic'>12 Points</p>
                                </div>
                            </div>
                            <div className='flex items-center flex-col'>
                                <GiLaurelsTrophy className='text-5xl text-[#c0c0c0] ml-2' />
                                <div className='ml-4 flex flex-col items-center'>
                                    <p className='text-lg font-semibold'>1 Hour</p>
                                    <p className='text-gray-700 text-xs italic'>5 Points</p>
                                </div>
                            </div>

                            <div className='flex items-center flex-col'>
                                <GiLaurelsTrophy className='text-5xl text-[#cd7f32] ml-2' />
                                <div className='ml-4 flex flex-col items-center'>
                                    <p className='text-lg font-semibold'>30 Minutes</p>
                                    <p className='text-gray-700 text-xs italic'>2 Points</p>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className='italic text-xs text-gray-500'>
                            Note: The trophy will be given after you complete all rounds.
                        </div>
                    </Container>
                </div>
            </div>
        </Layout>
    );
};

export default Pomorodo;