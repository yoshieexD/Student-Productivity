import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/authStore';
import { useQuery, useMutation } from 'react-query';
import Layout from '../Layout/Layout';
import axios from 'axios';
import { FaUserFriends, FaUserMinus } from 'react-icons/fa';
import { RiUserAddLine } from 'react-icons/ri';
import { IconContext } from 'react-icons';

const api = process.env.REACT_APP_API_URL;

const User = () => {
    const { id } = useParams();
    const user = useContext(AuthContext);

    const { data: checkFriend } = useQuery('check-friend', async () => {
        const response = await axios.get(`${api}/user/check-friend/${user._id}/${id}`);
        return response.data;
    });

    const { data } = useQuery('get-user', async () => {
        const response = await axios.get(`${api}/user/get-user/${id}`);
        return response.data;
    });

    const handleFriend = async () => {
        if (checkFriend === false) {
            await addFriend.mutate();
        } else {
            await UnFriend.mutate();
        }
    };

    const addFriend = useMutation(async () => {
        const response = await axios.post(`${api}/user/add-friend/${user._id}/${id}`);
        return response.data;
    });

    const UnFriend = useMutation(async () => {
        const response = await axios.post(`${api}/user/un-friend/${user._id}/${id}`);
        return response.data;
    });

    return (
        <Layout>
            <div className="container mx-auto mt-8 p-6 bg-white shadow-md rounded-md flex justify-between">
                <h2 className="text-xl font-bold mb-4">{data?.userName}</h2>
                <IconContext.Provider value={{ size: '1.5em', style: { verticalAlign: 'middle' } }}>
                    <div>
                        <button
                            className={`${checkFriend ? 'text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800 w-full' : 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full'} flex justify-center`}
                            onClick={handleFriend}
                        >
                            {checkFriend ? <FaUserMinus /> : <RiUserAddLine />}
                        </button>
                    </div>
                </IconContext.Provider>
            </div>
        </Layout>
    );
};

export default User;
