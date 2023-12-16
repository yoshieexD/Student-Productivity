import React, { useState } from 'react';
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import axios from 'axios';
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
const api = process.env.REACT_APP_API_URL;
const Register = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({ email: '', userName: '' });
    const mutation = useMutation(
        async () => {
            const response = await axios.post(`${api}/user/create-user`, data);
            return response.data;
        },
        {
            onSuccess: (data) => {
                toast.success('Successfully Register Account', data);
                setTimeout(() => {
                    navigate('/');
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
                        <MdOutlineAlternateEmail className="text-gray-400" />
                    </span>
                    <input type="email" name="email" value={data.email} onChange={handleChange} className="w-full pl-10 appearance-none focus:outline-none" placeholder='Enter Email' />
                </div>
                <div className="relative mt-1 p-[10px] block w-full border border-gray-300 rounded-md  ">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUser className="text-gray-400" />
                    </span>
                    <input type="text" name="userName" value={data.userName} onChange={handleChange} className="w-full pl-10 appearance-none focus:outline-none" placeholder='Enter Username' />
                </div>
                <button type="submit" disabled={mutation.isLoading} className='bg-neutral-950 w-full text-white text-lg py-2 rounded-md'>
                    {mutation.isLoading ? 'Sending...' : 'Send'}
                </button>
            </form >

        </div >
    );
};

export default Register;