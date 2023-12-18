import React, { useState } from 'react';
import { FaUser, FaLock } from "react-icons/fa";
import axios from 'axios';
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
const api = process.env.REACT_APP_API_URL;
const Login = () => {
    const [data, setData] = useState({ userName: '', password: '' });
    const mutation = useMutation(
        async () => {
            const response = await axios.post(`${api}/user/login-user`, data);
            return response.data;
        },
        {
            onSuccess: (data) => {
                Cookies.set('id', data.userId, { expires: 7 });
                toast.success('Successfully Login', data);
                setTimeout(() => {
                    window.location.href = '/auth/todo';
                }, 500);
            },
            onError: (error) => {
                toast.error(error.response.data.message);
            }
        }
    )
    const handlePost = (event) => {
        event.preventDefault();
        mutation.mutate();
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    return (
        <div className=' w-1/2'>
            <form onSubmit={handlePost} className='space-y-2'>
                <div className="relative mt-1 p-[10px] block w-full border border-gray-300 rounded-md  ">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUser className="text-gray-400" />
                    </span>
                    <input type="text" name="userName" value={data.userName} onChange={handleChange} className="w-full pl-10 appearance-none focus:outline-none" placeholder='Enter Username' />
                </div>
                <div className="relative mt-1 p-[10px] block w-full border border-gray-300 rounded-md  ">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaLock className="text-gray-400" />
                    </span>
                    <input type="password" name="password" value={data.password} onChange={handleChange} className="w-full pl-10 appearance-none focus:outline-none" placeholder='Enter Password' />
                </div>
                <div className='flex justify-end'>
                    <Link to="/forgot-password" className='text-sm text-gray-400 underline '>Forgot Password?</Link>
                </div>
                <button type="submit" disabled={mutation.isLoading} className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full'>
                    {mutation.isLoading ? 'Signing in...' : 'Sign In'}
                </button>
                <div className='text-sm text-gray-400'>Don't have any account? <Link to="/register" className='text-blue-500'>Sign Up</Link></div>
            </form >
        </div >
    );
};

export default Login;