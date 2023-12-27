import React from 'react';
import Layout from '../Layout/Layout';
import ChatSideBar from '../chat/ChatSideBar';
const Chat = () => {
    return (
        <Layout>
            <div className='flex h-full w-full space-x-4'>
                <div className='w-1/5'>
                    <ChatSideBar />

                </div>
                <div className='w-4/5'>
                    <p >body</p>
                </div>
            </div>
        </Layout>
    );
};

export default Chat;