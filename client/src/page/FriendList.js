import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { AuthContext } from '../context/authStore';
const api = process.env.REACT_APP_API_URL;
const FriendList = () => {
    const user = useContext(AuthContext);
    const { data } = useQuery('get-friend', async () => {
        const response = await axios.get(`${api}/user/list-friend/${user._id}`);
        return response.data
    })
    const handleView = () => {

    }
    return (
        <div>
            {data?.map((e) => {
                return (
                    <div className='flex w-full h-full space-x-4 p-2 '>
                        <div className='w-1/6 h-1/6' >
                            <img src={e.avatar} alt={`${e.userName}'s Avatar`} className='rounded-full cursor-pointer' />
                            <div className='text-sm text-blue-600 font-semibold cursor-pointer' onClick={handleView}>{e.userName}</div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default FriendList;