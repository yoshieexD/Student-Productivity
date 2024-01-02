import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import { AuthContext } from '../context/authStore';

const api = process.env.REACT_APP_API_URL;

const ChatSideBar = () => {
    const navigate = useNavigate();
    const user = useContext(AuthContext);

    const { data } = useQuery('get-friend', async () => {
        const response = await axios.get(`${api}/user/list-friend/${user._id}`);
        return response.data;
    });
    const showChat = (friend) => {
        return navigate(`/auth/chat/${user._id}/${friend._id}`);
    }
    return (
        <div className="p-4 bg-gray-200 h-full">
            <h2 className="text-lg font-semibold mb-4">Friend List</h2>
            {data?.map((friend) => (
                <div key={friend._id} className="flex items-center mb-3 cursor-pointer hover:bg-gray-300 p-2 rounded" onClick={() => showChat(friend)}>
                    <img
                        src={friend.avatar}
                        alt={`${friend.userName}'s Avatar`}
                        className="rounded-full w-8 h-8 mr-2"
                    />
                    <p className="text-sm">{friend.userName}</p>
                </div>
            ))}
        </div>
    );
};

export default ChatSideBar;
