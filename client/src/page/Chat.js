import React, { useState } from 'react';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { useParams, } from 'react-router-dom';
import { FaLocationArrow } from "react-icons/fa";
import Input from '../shared/Input'
import Layout from '../Layout/Layout';
import ChatSideBar from '../chat/ChatSideBar';
import axios from 'axios';
const api = process.env.REACT_APP_API_URL;

const Chat = () => {
    const { userId, friendId } = useParams();
    const [datas, setDatas] = useState({
        content: ''
    });


    const handleChange = (event) => {
        const { name, value } = event.target;
        setDatas((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }
    const queryClient = useQueryClient();
    const post = useMutation(async () => {
        const response = await axios.post(`${api}/chat/create-chat/${userId}/${friendId}`, datas);
        return response.data;
    },
        {
            onSuccess: async () => {
                await queryClient.invalidateQueries('get-chat');
                setDatas({
                    content: ''
                })
            }
        })


    const { data: user } = useQuery(['get-user', userId, friendId], async () => {
        if (friendId !== undefined) {
            const response = await axios.get(`${api}/chat/get-user/${userId}/${friendId}`);
            return response.data;
        }
        return null;
    });

    const { data } = useQuery(['get-chat', userId, friendId], async () => {
        const response = await axios.get(`${api}/chat/get-chat/${userId}/${friendId}`);
        return response.data
    })

    const handleReload = async () => {
        try {
            console.log('hello')
            await queryClient.invalidateQueries('get-user');
        } catch (error) {
            console.error("Error invalidating 'get-user' query:", error);
        }
    };
    const handlePost = (event) => {
        event.preventDefault();
        post.mutate();
    }

    return (
        <Layout>
            <div className='flex h-full w-full '>
                <div className='w-1/5 ' onClick={handleReload}>
                    <ChatSideBar />
                </div>
                <div className='w-4/5'>
                    {/* Chat header */}
                    <div className=' px-4 flex items-center space-x-1 h-1/6'>
                        {user &&
                            <>
                                <div className='h-10 w-10 p-1'>
                                    <img src={user?.receiver?.avatar} alt="friend" className='rounded-full ' />
                                </div>
                                <p className='text-xl font-medium'>{user?.receiver?.userName}</p>
                            </>}
                    </div>

                    {/* chat body*/}
                    <div className='h-2/3 px-4 overflow-y-auto'>
                        <div className="flex flex-col space-y-2">
                            {data?.map((conversation) => (
                                <div key={conversation._id} className="flex flex-col">
                                    {conversation.messages.map((message) => (
                                        <div key={message._id} className={`max-w-2/3 p-3 rounded-lg ${message.sender === userId ? 'bg-green-500 text-white self-end' : 'bg-gray-200 text-gray-800 self-start'}`}>
                                            <p>{message.content}</p>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* chat textfield */}
                    <div className='h-1/6 px-4 flex items-center w-full '>
                        <div className=' w-full flex justify-center space-x-4   '>
                            <Input type={"text"} name={"content"} placeholder={"messages ..."} value={datas.content} onChange={handleChange} required />
                            <div className='flex justify-center items-center cursor-pointer'>
                                <div className='bg-blue-600 py-1 px-2 rounded-lg' onClick={(event) => handlePost(event)}>
                                    <FaLocationArrow className='text-white' />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Chat;