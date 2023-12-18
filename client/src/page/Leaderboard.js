import React from 'react';
import Layout from '../Layout/Layout';
import BoardContainer from '../leaderboard/BoardContainer';
const Leaderboard = () => {
    return (
        <Layout>
            <h1 className='text-2xl font-semibold mb-4 text-yellow-600'>Leaderboard</h1>
            <div className='w-full'>
            </div>
            <div className='flex w-full justify-center'>
                <BoardContainer >
                </BoardContainer>
            </div>
        </Layout>
    );
};

export default Leaderboard;