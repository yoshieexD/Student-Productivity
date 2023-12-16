import React, { useState } from 'react';
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaKey, FaLock } from "react-icons/fa";
import axios from 'axios';
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
const api = process.env.REACT_APP_API_URL;
const ForgotPass = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState('send-code');
    const [data, setData] = useState({ email: '', code: '', password: '' });
    const mutation = useMutation(
        async () => {
            console.log('before', step);
            const response = await axios.post(`${api}/user/${step}`, data);
            return response.data;
        },
        {
            onSuccess: (data) => {
                toast.success(`Successfully ${step === 'send-code' ? 'sent verification code to your email' : step === 'check-code' ? 'verified code' : 'changed password'}`, data);
                if (step === 'send-code') {
                    setStep('check-code');
                } else if (step === 'check-code') {
                    setStep('change-pass');
                } else {
                    navigate('/');
                }
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
            {step === 'send-code' && (
                <form onSubmit={handlePost} className='space-y-2'>
                    <div className="relative mt-1 p-[10px] block w-full border border-gray-300 rounded-md  ">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MdOutlineAlternateEmail className="text-gray-400" />
                        </span>
                        <input type="email" name="email" value={data.email} onChange={handleChange} className="w-full pl-10 appearance-none focus:outline-none" placeholder='Enter Email' />
                    </div>
                    <button type="submit" disabled={mutation.isLoading} className='bg-neutral-950 w-full text-white text-lg py-2 rounded-md'>
                        {mutation.isLoading ? 'Sending...' : 'Send'}
                    </button>
                </form >
            )}
            {step === 'check-code' && (
                <form onSubmit={handlePost} className='space-y-2'>
                    <div className="relative mt-1 p-[10px] block w-full border border-gray-300 rounded-md  ">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaKey className="text-gray-400" />
                        </span>
                        <input type="text" name="code" value={data.code} onChange={handleChange} className="w-full pl-10 appearance-none focus:outline-none" placeholder='Enter Verification Code' />
                    </div>
                    <button type="submit" disabled={mutation.isLoading} className='bg-neutral-950 w-full text-white text-lg py-2 rounded-md'>
                        {mutation.isLoading ? 'Verifying...' : 'Verify Code'}
                    </button>
                </form>
            )}
            {step === 'change-pass' && (
                <form onSubmit={handlePost} className='space-y-2'>
                    <div className="relative mt-1 p-[10px] block w-full border border-gray-300 rounded-md  ">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaLock className="text-gray-400" />
                        </span>
                        <input type="password" name="password" value={data.password} onChange={handleChange} className="w-full pl-10 appearance-none focus:outline-none" placeholder='Enter Password' />
                    </div>
                    <button type="submit" disabled={mutation.isLoading} className='bg-neutral-950 w-full text-white text-lg py-2 rounded-md'>
                        {mutation.isLoading ? 'Changing...' : 'Change Password'}
                    </button>
                </form>
            )}
        </div >
    );
};

export default ForgotPass;