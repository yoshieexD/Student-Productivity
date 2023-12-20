import React from 'react';
import Layout from '../Layout/Layout';
import { FaFilter } from 'react-icons/fa';
import SearchBar from '../shared/SearchBar';
import BoardContainer from '../leaderboard/BoardContainer';

const Leaderboard = () => {
    return (
        <Layout>
            <h1 className='text-2xl font-semibold mb-4 text-yellow-600'>Leaderboard</h1>
            <div className='w-full'></div>
            {/* header */}
            <div className='w-full flex justify-center'>
                <div className='w-5/6 flex justify-between'>
                    <button className='bg-gray-700 p-2 rounded-full'>
                        <FaFilter className='text-lg text-white' />
                    </button>
                    <SearchBar placeholder={'Search friend'} />
                </div>
            </div>
            <br />
            {/* body */}
            <div className='w-full flex flex-col items-center'>
                <div className='w-5/6'>
                    <div className='flex justify-around mb-2 '>
                        <div className='text-gray-500 text-sm font-medium'>User Name</div>
                        <div className='text-gray-500 text-sm font-medium'>Points</div>
                    </div>
                </div>
                <div className='w-5/6'>
                    <BoardContainer Name={"test"} Points={"300"} className={"bg-yellow-500"} />
                    <BoardContainer Name={"asdsd"} Points={"200"} className={"bg-blue-500"} />
                    <BoardContainer Name={"Alvin"} Points={"100"} />

                </div>
            </div>
        </Layout>
    );
};

export default Leaderboard;
