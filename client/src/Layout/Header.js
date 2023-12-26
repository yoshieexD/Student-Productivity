import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authStore';
import { FaFacebookMessenger } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io"
import { useMutation } from 'react-query';
import Cookies from 'js-cookie';
import SearchBar from '../shared/SearchBar';
import axios from 'axios';
import { toast } from 'react-toastify';
const api = process.env.REACT_APP_API_URL;
const Header = () => {
    const [userName, setUserName] = useState('');
    const [friend, setFriend] = useState([]);
    const user = useContext(AuthContext);
    const [popover, setPopover] = useState(false);
    const navigate = useNavigate();
    const handlePopover = () => {
        if (popover === true) {
            setPopover(false)
        } else {
            setPopover(true)
        }
    }
    const handleLogout = () => {
        Cookies.remove('id');
        window.location.href = '/';
    }
    const get = useMutation(async () => {
        const response = await axios.get(`${api}/user/find-user/${userName}`)
        return setFriend(response.data);
    }, {
        onSuccess: () => {
            console.log(friend._id)
            navigate(`/auth/user/${friend._id}`)
        }, onerror: () => {
            toast.error('User doesnt not exist');
        }
    })
    const handleFindUser = () => {
        get.mutate();
    }
    return (
        <div className='bg-slate-50 w-full flex justify-between px-5 drop-shadow-sm pt-1 pb-2  '>
            <SearchBar placeholder={"Search a friend"} onclick={handleFindUser} value={userName} name={'userName'} onchange={(e) => setUserName(e.target.value)} />
            <div className='flex space-x-3'>
                <div className='bg-blue-600 p-2 rounded-full'><FaFacebookMessenger className="text-white text-2xl" /></div>
                <div className='bg-blue-600 p-2 rounded-full'><IoNotifications className="text-white text-2xl" /></div>
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
            </div>
        </div >
    );
};

export default Header;