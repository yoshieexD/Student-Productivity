import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authStore';
import { FaFacebookMessenger } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io"
import { useMutation, useQueryClient, useQuery } from 'react-query';
import Cookies from 'js-cookie';
import SearchBar from '../shared/SearchBar';
import axios from 'axios';
import { toast } from 'react-toastify';
import NotificationIcon from '../notification/NotificationIcon';
import NotificationCard from '../notification/NotificationCard';
import NotificationList from '../notification/NotificationList';
const api = process.env.REACT_APP_API_URL;
const Header = () => {
    const [userName, setUserName] = useState('');
    const user = useContext(AuthContext);
    const [popover, setPopover] = useState(false);
    const [notifPopOver, setNotifPopover] = useState(false);
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const handlePopover = () => {
        if (popover === true) {
            setPopover(false)
        } else {
            setPopover(true)
        }
    }
    const { data } = useQuery('get-friendreq', async () => {
        const response = await axios.get(`${api}/user/list-friendreq/${user._id}`);
        return response.data
    })
    const handleNotifPopOver = () => {
        if (notifPopOver === true) {
            setNotifPopover(false)
        } else {
            setNotifPopover(true)
        }
    }
    const handleLogout = () => {
        Cookies.remove('id');
        window.location.href = '/';
    }
    const get = useMutation(async () => {
        const response = await axios.get(`${api}/user/find-user?userName=${userName}`);
        return response.data;
    }, {
        onSuccess: (data) => {
            navigate(`/auth/user/${data._id}?userName=${data.userName}`)
        }, onerror: () => {
            toast.error('User doesnt not exist');
        }
    })
    const accept = useMutation(async (friendId) => {
        const response = await axios.post(`${api}/user/accept-friend/${user._id}/${friendId}`);
        return response.data
    }, {
        onSuccess: async () => {
            toast.success('Successfully accept a friend request')
            setNotifPopover(false)
            await queryClient.invalidateQueries('get-friendreq')
        }
    })
    const decline = useMutation(async (friendId) => {
        const response = await axios.post(`${api}/user/decline-friend/${user._id}/${friendId}`);
        return response.data;
    }, {
        onSuccess: async () => {
            toast.success('Successfully decline a friend request')
            setNotifPopover(false)
            await queryClient.invalidateQueries('get-friendreq')
        }
    })

    const handleFindUser = () => {
        get.mutate();
    }
    const handleAccept = (event, e) => {
        event.preventDefault();
        accept.mutate(e._id)
    }
    const handleDecline = (event, e) => {
        event.preventDefault();
        decline.mutate(e._id)
    }
    const handleViewChat = () => {
        navigate(`/auth/chat/${user._id}`);
    }
    return (
        <div className='bg-slate-50 w-full flex justify-between px-5 drop-shadow-sm pt-1 pb-2  '>
            <SearchBar placeholder={"Search a friend"} onclick={handleFindUser} value={userName} name={'userName'} onchange={(e) => setUserName(e.target.value)} />
            <div className='flex space-x-3'>
                <div className='bg-blue-600 p-2 rounded-full cursor-pointer' onClick={handleViewChat}><FaFacebookMessenger className="text-white text-2xl " /></div>
                <NotificationIcon onclick={handleNotifPopOver} />
                <div className='flex my-auto'>
                    <div className='text-gray-800'>{user?.userName}</div>
                    <div onClick={handlePopover}>
                        <IoMdArrowDropdown className='relative cursor-pointer' />
                        {popover && (<div className='absolute right-5 top-12 pt-2 pb-8 px-10 bg-white shadow-sm'>
                            <div className='space-y-2'>
                                <p className='text-lg font-semibold text-blue-600 cursor-pointer hover:underline underline-offset-4' onClick={() => navigate('/auth/profile')}>View Profile</p>
                                <p className='text-sm text-gray-500 cursor-pointer hover:underline underline-offset-4'>Dark Mode</p>
                                <p onClick={handleLogout} className='text-sm text-gray-500 cursor-pointer hover:underline underline-offset-4'>Logout</p>
                            </div>
                        </div>
                        )}
                    </div>
                </div>
                {notifPopOver && (
                    <NotificationCard>
                        {data?.map((e) => {
                            return (
                                <NotificationList key={e._id} name={e.userName} onAccept={(event) => handleAccept(event, e)} onDecline={(event) => handleDecline(event, e)} />
                            )
                        })}
                    </NotificationCard>
                )}
            </div>
        </div >
    );
};

export default Header;